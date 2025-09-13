-- Fix the search path security issue for the admin view function
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
  WHERE public.has_role(auth.uid(), 'admin'::public.app_role);
$$;