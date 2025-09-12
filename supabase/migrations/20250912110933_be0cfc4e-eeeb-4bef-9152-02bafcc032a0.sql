-- SECURITY FIX: Add password encryption without policy conflicts
-- This migration adds encryption capabilities and secures existing password data

-- Ensure pgcrypto extension is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create encryption function if it doesn't exist
CREATE OR REPLACE FUNCTION public.encrypt_password(password_text TEXT, encryption_key TEXT DEFAULT '')
RETURNS TEXT AS $$
BEGIN
  -- Use SHA-256 hashing with salt for password security
  RETURN encode(digest(password_text || encryption_key || 'waiting_list_salt_2024', 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add encrypted password column if it doesn't exist
ALTER TABLE public.waiting_list ADD COLUMN IF NOT EXISTS encrypted_password TEXT;

-- Encrypt any existing plain text passwords
UPDATE public.waiting_list 
SET encrypted_password = public.encrypt_password(leetcode_password)
WHERE encrypted_password IS NULL 
  AND leetcode_password IS NOT NULL 
  AND leetcode_password != '[ENCRYPTED]';

-- Create secure password verification function
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

-- Create trigger function to auto-encrypt passwords on insert/update
CREATE OR REPLACE FUNCTION public.encrypt_waiting_list_password()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-encrypt password if provided in plain text
  IF NEW.leetcode_password IS NOT NULL 
     AND NEW.leetcode_password != '[ENCRYPTED]' 
     AND (NEW.encrypted_password IS NULL OR NEW.encrypted_password = '') THEN
    NEW.encrypted_password = public.encrypt_password(NEW.leetcode_password);
    NEW.leetcode_password = '[ENCRYPTED]';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS encrypt_password_trigger ON public.waiting_list;
CREATE TRIGGER encrypt_password_trigger
  BEFORE INSERT OR UPDATE ON public.waiting_list
  FOR EACH ROW
  EXECUTE FUNCTION public.encrypt_waiting_list_password();

-- Secure existing plain text passwords
UPDATE public.waiting_list 
SET leetcode_password = '[ENCRYPTED]' 
WHERE leetcode_password != '[ENCRYPTED]' 
  AND encrypted_password IS NOT NULL;

-- Create audit table for security monitoring
CREATE TABLE IF NOT EXISTS public.password_access_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  accessed_record_id UUID,
  access_type TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  success BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit table
ALTER TABLE public.password_access_log ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists to avoid conflicts
DROP POLICY IF EXISTS "Only service role can manage audit logs" ON public.password_access_log;
CREATE POLICY "Service role audit access" ON public.password_access_log
FOR ALL
USING ((auth.jwt() ->> 'role') = 'service_role');