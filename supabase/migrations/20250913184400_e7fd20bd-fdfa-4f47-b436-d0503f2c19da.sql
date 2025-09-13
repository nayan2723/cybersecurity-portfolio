-- Fix search path for the prevent_plaintext_passwords function
CREATE OR REPLACE FUNCTION public.prevent_plaintext_passwords()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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