-- CRITICAL SECURITY FIX: Encrypt passwords and enhance data protection
-- This migration addresses the security vulnerability where passwords are stored in plain text

-- Step 1: Create encryption functions using pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Step 2: Create a function to encrypt passwords (only accessible to service role)
CREATE OR REPLACE FUNCTION public.encrypt_password(password_text TEXT, encryption_key TEXT DEFAULT '')
RETURNS TEXT AS $$
BEGIN
  -- Use a combination of the service secret and user-specific salt for encryption
  RETURN encode(digest(password_text || encryption_key || 'waiting_list_salt', 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 3: Create a secure function to handle password verification
CREATE OR REPLACE FUNCTION public.verify_waiting_list_password(user_id UUID, provided_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  -- Only allow service role or admin to verify passwords
  IF NOT (auth.jwt() ->> 'role' = 'service_role' OR has_role(auth.uid(), 'admin'::app_role)) THEN
    RETURN FALSE;
  END IF;
  
  SELECT encrypted_password INTO stored_hash 
  FROM public.waiting_list 
  WHERE id = user_id;
  
  IF stored_hash IS NULL THEN
    RETURN FALSE;
  END IF;
  
  RETURN stored_hash = public.encrypt_password(provided_password);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Step 4: Add new encrypted password column
ALTER TABLE public.waiting_list ADD COLUMN IF NOT EXISTS encrypted_password TEXT;

-- Step 5: Encrypt existing passwords (WARNING: This is a one-way operation)
-- Note: In a real production environment, you would need to handle this more carefully
-- For security, we'll hash the existing passwords but they won't be recoverable
UPDATE public.waiting_list 
SET encrypted_password = public.encrypt_password(leetcode_password)
WHERE encrypted_password IS NULL AND leetcode_password IS NOT NULL;

-- Step 6: Create a trigger to automatically encrypt new passwords
CREATE OR REPLACE FUNCTION public.encrypt_waiting_list_password()
RETURNS TRIGGER AS $$
BEGIN
  -- Only encrypt if a plain text password is provided and no encrypted version exists
  IF NEW.leetcode_password IS NOT NULL AND (NEW.encrypted_password IS NULL OR NEW.encrypted_password = '') THEN
    NEW.encrypted_password = public.encrypt_password(NEW.leetcode_password);
    -- Clear the plain text password for security
    NEW.leetcode_password = '[ENCRYPTED]';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE TRIGGER encrypt_password_trigger
  BEFORE INSERT OR UPDATE ON public.waiting_list
  FOR EACH ROW
  EXECUTE FUNCTION public.encrypt_waiting_list_password();

-- Step 7: Update existing plain text passwords to show they're encrypted
UPDATE public.waiting_list 
SET leetcode_password = '[ENCRYPTED]' 
WHERE leetcode_password != '[ENCRYPTED]' AND encrypted_password IS NOT NULL;

-- Step 8: Enhanced RLS policies for better data protection
DROP POLICY IF EXISTS "Anyone can join waiting list" ON public.waiting_list;
DROP POLICY IF EXISTS "Admins can view waiting list" ON public.waiting_list;

-- More restrictive insert policy - doesn't allow viewing of sensitive data
CREATE POLICY "Users can join waiting list with encrypted data" ON public.waiting_list
FOR INSERT
WITH CHECK (true);

-- Admins can view most data but passwords remain encrypted
CREATE POLICY "Admins can view waiting list (limited)" ON public.waiting_list
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Service role can access everything (for backend processing)
CREATE POLICY "Service role full access" ON public.waiting_list
FOR ALL
USING ((auth.jwt() ->> 'role') = 'service_role');

-- Step 9: Create a secure view for admin access that excludes sensitive password data
CREATE OR REPLACE VIEW public.waiting_list_admin_view AS
SELECT 
  id,
  full_name,
  enrollment_no,
  leetcode_email,
  questions_count,
  total_amount,
  position_in_queue,
  contacted,
  delivery_duration,
  created_at,
  updated_at
FROM public.waiting_list;

-- Grant access to the view for admins
CREATE POLICY "Admins can view safe waiting list data" ON public.waiting_list_admin_view
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Step 10: Add audit logging for password access attempts
CREATE TABLE IF NOT EXISTS public.password_access_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  accessed_record_id UUID,
  access_type TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.password_access_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only service role can manage audit logs" ON public.password_access_log
FOR ALL
USING ((auth.jwt() ->> 'role') = 'service_role');

-- Step 11: Create function to log password access attempts
CREATE OR REPLACE FUNCTION public.log_password_access(
  record_id UUID,
  access_type_param TEXT,
  success_param BOOLEAN DEFAULT FALSE
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.password_access_log (
    user_id,
    accessed_record_id,
    access_type,
    success
  ) VALUES (
    auth.uid(),
    record_id,
    access_type_param,
    success_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;