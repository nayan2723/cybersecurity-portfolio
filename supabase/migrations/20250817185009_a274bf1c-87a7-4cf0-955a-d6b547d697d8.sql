-- Fix function search path security warnings
ALTER FUNCTION public.sanitize_contact_input() SET search_path = 'public';
ALTER FUNCTION public.cleanup_old_rate_limits() SET search_path = 'public';