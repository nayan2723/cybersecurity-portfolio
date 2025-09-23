-- Fix security issue: Remove direct admin access to sensitive fields in waiting_list table
-- Admins should only access data through the secure get_waiting_list_admin_view() function

-- Drop the existing admin SELECT policy that allows access to all fields
DROP POLICY IF EXISTS "Admins can view waiting list (non-sensitive fields only)" ON public.waiting_list;

-- Create a new restrictive policy that only allows service role access for direct queries
-- Admins must use the get_waiting_list_admin_view() function which filters out sensitive data
CREATE POLICY "Service role and encrypted data access only" 
ON public.waiting_list 
FOR SELECT 
USING (
  -- Only service role can directly access the table
  (auth.jwt() ->> 'role'::text) = 'service_role'::text
);

-- Ensure the secure admin view function exists and is properly secured
-- This function already excludes leetcode_password and encrypted_password fields
CREATE OR REPLACE FUNCTION public.get_waiting_list_admin_view()
RETURNS TABLE(
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
SET search_path = 'public'
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
  WHERE public.has_role(auth.uid(), 'admin'::public.app_role);
$$;

-- Grant execute permission to authenticated users (admins will be able to call this function)
GRANT EXECUTE ON FUNCTION public.get_waiting_list_admin_view() TO authenticated;