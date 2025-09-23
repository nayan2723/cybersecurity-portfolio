import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const securityHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'none'; script-src 'none';",
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role for rate limiting access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    console.log(`Contact form submission from IP: ${clientIP}`);

    // Check rate limiting
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from('contact_rate_limit')
      .select('submission_count')
      .eq('ip_address', clientIP)
      .gte('window_start', oneHourAgo);

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    const totalSubmissions = rateLimitData?.reduce((sum, record) => sum + record.submission_count, 0) || 0;

    if (totalSubmissions >= 3) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before submitting another message.' 
        }),
        { 
          status: 429, 
          headers: securityHeaders
        }
      );
    }

    // Parse and validate request body
    const formData: ContactFormData = await req.json();

    // Enhanced server-side validation with security checks
    if (!formData.name?.trim() || formData.name.length > 100) {
      throw new Error('Invalid name');
    }
    
    // Check for suspicious patterns in name
    if (/[<>\"'&]/.test(formData.name) || /javascript:|data:|vbscript:/i.test(formData.name)) {
      throw new Error('Invalid name format');
    }
    
    if (!formData.email?.trim() || formData.email.length > 254 || !formData.email.includes('@')) {
      throw new Error('Invalid email');
    }
    
    // Enhanced email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }
    
    if (!formData.subject?.trim() || formData.subject.length > 200) {
      throw new Error('Invalid subject');
    }
    
    // Check for suspicious patterns in subject and message
    if (/[<>]/.test(formData.subject) || /javascript:|data:|vbscript:/i.test(formData.subject)) {
      throw new Error('Invalid subject format');
    }
    
    if (!formData.message?.trim() || formData.message.length < 10 || formData.message.length > 5000) {
      throw new Error('Invalid message');
    }
    
    if (/javascript:|data:|vbscript:|<script|<iframe|<object/i.test(formData.message)) {
      throw new Error('Message contains invalid content');
    }

    // Insert contact submission (triggers will handle sanitization)
    const { error: insertError } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      });

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to save contact submission');
    }

    // Update rate limiting
    const { error: rateLimitInsertError } = await supabase
      .from('contact_rate_limit')
      .insert({
        ip_address: clientIP,
        submission_count: 1,
        window_start: new Date().toISOString()
      });

    if (rateLimitInsertError) {
      console.error('Rate limit insert error:', rateLimitInsertError);
    }

    // Clean up old rate limit entries
    await supabase.rpc('cleanup_old_rate_limits');

    console.log(`Contact form submission successful from IP: ${clientIP}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully' 
      }),
      { 
        headers: securityHeaders
      }
    );

  } catch (error) {
    // Structured error logging without exposing sensitive details
    const errorId = crypto.randomUUID();
    console.error(`[${errorId}] Contact form error:`, {
      message: error.message,
      timestamp: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || 'unknown'
    });
    
    // Don't expose detailed error messages to prevent information leakage
    const publicErrorMessage = error.message?.includes('Invalid') || error.message?.includes('Rate limit') 
      ? error.message 
      : 'An error occurred while processing your request. Please try again later.';
    
    return new Response(
      JSON.stringify({ 
        error: publicErrorMessage,
        errorId: errorId // For support purposes
      }),
      { 
        status: 400, 
        headers: securityHeaders
      }
    );
  }
});