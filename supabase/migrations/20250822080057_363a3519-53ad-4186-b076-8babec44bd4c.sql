-- Fix critical rate limiting RLS policy
DROP POLICY IF EXISTS "Only authenticated functions can access rate limit data" ON public.contact_rate_limit;

-- Create a proper policy that allows service role access for rate limiting
CREATE POLICY "Service role can manage rate limit data" 
ON public.contact_rate_limit 
FOR ALL 
USING (
  -- Allow service role (used by edge functions) full access
  auth.jwt() ->> 'role' = 'service_role' OR
  -- Deny all other access
  false
);

-- Improve contact submissions security with better validation trigger
CREATE OR REPLACE FUNCTION public.enhanced_sanitize_contact_input()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  -- More comprehensive sanitization
  NEW.name = trim(regexp_replace(NEW.name, '<[^>]*>|javascript:|data:|vbscript:', '', 'gi'));
  NEW.email = lower(trim(regexp_replace(NEW.email, '<[^>]*>', '', 'g')));
  NEW.subject = trim(regexp_replace(NEW.subject, '<[^>]*>|javascript:|data:|vbscript:', '', 'gi'));
  NEW.message = trim(regexp_replace(NEW.message, '<[^>]*>|javascript:|data:|vbscript:', '', 'gi'));
  
  -- Validate email format more strictly
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Check for suspicious patterns
  IF NEW.message ~* '(script|iframe|object|embed|form)' THEN
    RAISE EXCEPTION 'Message contains potentially harmful content';
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Replace the old trigger with the enhanced one
DROP TRIGGER IF EXISTS sanitize_contact_input_trigger ON public.contact_submissions;
CREATE TRIGGER enhanced_sanitize_contact_input_trigger
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.enhanced_sanitize_contact_input();