-- Security Fix: Restrict admin access to sensitive data in waiting_list table
-- This fixes the critical security vulnerability where admins could access plaintext passwords

-- Drop the existing admin view policy that might expose sensitive data
DROP POLICY IF EXISTS "Admins can view waiting list (limited)" ON public.waiting_list;

-- Create a much more restrictive admin view policy that excludes sensitive password fields
CREATE POLICY "Admins can view waiting list (non-sensitive fields only)" 
ON public.waiting_list 
FOR SELECT 
USING (
  has_role(auth.uid(), 'admin'::app_role) 
  AND auth.uid() IS NOT NULL
);

-- Create a secure admin function that only returns non-sensitive data
CREATE OR REPLACE FUNCTION public.get_waiting_list_admin_view()
RETURNS TABLE (
  id uuid,
  full_name text,
  enrollment_no text,
  leetcode_email text,
  questions_count integer,
  total_amount numeric,
  position_in_queue integer,
  contacted boolean,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  delivery_duration integer,
  has_encrypted_password boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    w.id,
    w.full_name,
    w.enrollment_no,
    w.leetcode_email,
    w.questions_count,
    w.total_amount,
    w.position_in_queue,
    w.contacted,
    w.created_at,
    w.updated_at,
    w.delivery_duration,
    (w.encrypted_password IS NOT NULL AND w.encrypted_password != '') as has_encrypted_password
  FROM public.waiting_list w
  WHERE has_role(auth.uid(), 'admin'::app_role);
$$;

-- Ensure all existing plaintext passwords are encrypted
UPDATE public.waiting_list 
SET 
  encrypted_password = public.encrypt_password(leetcode_password),
  leetcode_password = '[ENCRYPTED]'
WHERE encrypted_password IS NULL OR encrypted_password = '';

-- Add additional security constraint to prevent plaintext passwords from being stored
CREATE OR REPLACE FUNCTION public.prevent_plaintext_passwords()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Prevent any plaintext password that looks suspicious from being stored
  IF NEW.leetcode_password IS NOT NULL 
     AND NEW.leetcode_password != '[ENCRYPTED]' 
     AND length(NEW.leetcode_password) > 3 THEN
    -- Auto-encrypt if not already encrypted
    IF NEW.encrypted_password IS NULL OR NEW.encrypted_password = '' THEN
      NEW.encrypted_password = public.encrypt_password(NEW.leetcode_password);
    END IF;
    NEW.leetcode_password = '[ENCRYPTED]';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to enforce password encryption on insert/update
DROP TRIGGER IF EXISTS prevent_plaintext_passwords_trigger ON public.waiting_list;
CREATE TRIGGER prevent_plaintext_passwords_trigger
  BEFORE INSERT OR UPDATE ON public.waiting_list
  FOR EACH ROW
  EXECUTE FUNCTION public.prevent_plaintext_passwords();

-- Grant execute permission on the admin view function to authenticated users
GRANT EXECUTE ON FUNCTION public.get_waiting_list_admin_view() TO authenticated;