-- Secure waiting_list: encrypt existing passwords, add triggers, and audit verification access
BEGIN;

-- Ensure pgcrypto is available for digest()
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- 1) Backfill encryption for any existing plain-text passwords
UPDATE public.waiting_list
SET encrypted_password = public.encrypt_password(leetcode_password)
WHERE encrypted_password IS NULL
  AND leetcode_password IS NOT NULL
  AND leetcode_password <> '[ENCRYPTED]';

-- Replace plain-text with placeholder after encryption
UPDATE public.waiting_list
SET leetcode_password = '[ENCRYPTED]'
WHERE leetcode_password IS NOT NULL
  AND leetcode_password <> '[ENCRYPTED]';

-- 2) Trigger to auto-encrypt on INSERT/UPDATE
DROP TRIGGER IF EXISTS trg_encrypt_waiting_list_password ON public.waiting_list;
CREATE TRIGGER trg_encrypt_waiting_list_password
BEFORE INSERT OR UPDATE ON public.waiting_list
FOR EACH ROW EXECUTE FUNCTION public.encrypt_waiting_list_password();

-- 3) Keep updated_at accurate
DROP TRIGGER IF EXISTS trg_update_waiting_list_updated_at ON public.waiting_list;
CREATE TRIGGER trg_update_waiting_list_updated_at
BEFORE UPDATE ON public.waiting_list
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) Improve verification to include audit logging
CREATE OR REPLACE FUNCTION public.verify_waiting_list_password(user_id uuid, provided_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  stored_hash TEXT;
  ok BOOLEAN := false;
BEGIN
  -- Only allow service role or admin to verify passwords
  IF NOT (auth.jwt() ->> 'role' = 'service_role' OR has_role(auth.uid(), 'admin'::app_role)) THEN
    PERFORM public.log_password_access(user_id, 'verify_waiting_list_password_denied', false);
    RETURN FALSE;
  END IF;

  SELECT encrypted_password INTO stored_hash 
  FROM public.waiting_list 
  WHERE id = user_id;
  
  IF stored_hash IS NULL THEN
    PERFORM public.log_password_access(user_id, 'verify_waiting_list_password_missing', false);
    RETURN FALSE;
  END IF;
  
  ok := (stored_hash = public.encrypt_password(provided_password));
  PERFORM public.log_password_access(user_id, 'verify_waiting_list_password', ok);
  RETURN ok;
END;
$function$;

COMMIT;