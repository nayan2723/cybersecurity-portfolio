-- Add length constraints and input validation to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD CONSTRAINT name_length_check CHECK (char_length(name) <= 100 AND char_length(name) >= 1),
ADD CONSTRAINT email_length_check CHECK (char_length(email) <= 254 AND char_length(email) >= 5),
ADD CONSTRAINT subject_length_check CHECK (char_length(subject) <= 200 AND char_length(subject) >= 1),
ADD CONSTRAINT message_length_check CHECK (char_length(message) <= 5000 AND char_length(message) >= 10);

-- Add email format validation
ALTER TABLE public.contact_submissions 
ADD CONSTRAINT email_format_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Create function to sanitize input data
CREATE OR REPLACE FUNCTION sanitize_contact_input()
RETURNS TRIGGER AS $$
BEGIN
  -- Remove potential XSS content and trim whitespace
  NEW.name = trim(regexp_replace(NEW.name, '<[^>]*>', '', 'g'));
  NEW.email = lower(trim(NEW.email));
  NEW.subject = trim(regexp_replace(NEW.subject, '<[^>]*>', '', 'g'));
  NEW.message = trim(regexp_replace(NEW.message, '<[^>]*>', '', 'g'));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for input sanitization
CREATE TRIGGER sanitize_contact_data
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION sanitize_contact_input();

-- Create rate limiting table
CREATE TABLE public.contact_rate_limit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET NOT NULL,
  submission_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on rate limiting table
ALTER TABLE public.contact_rate_limit ENABLE ROW LEVEL SECURITY;

-- Create policy for rate limiting (only functions can access)
CREATE POLICY "Only authenticated functions can access rate limit data"
ON public.contact_rate_limit
FOR ALL
USING (false);

-- Create cleanup function for old rate limit entries
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.contact_rate_limit 
  WHERE window_start < now() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;