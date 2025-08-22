import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse and validate request body
    const formData: ContactFormData = await req.json();

    // Basic server-side validation
    if (!formData.name?.trim() || formData.name.length > 100) {
      throw new Error('Invalid name');
    }
    if (!formData.email?.trim() || formData.email.length > 254 || !formData.email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (!formData.subject?.trim() || formData.subject.length > 200) {
      throw new Error('Invalid subject');
    }
    if (!formData.message?.trim() || formData.message.length < 10 || formData.message.length > 5000) {
      throw new Error('Invalid message');
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Don't expose detailed error messages to prevent information leakage
    const publicErrorMessage = error.message?.includes('Invalid') || error.message?.includes('Rate limit') 
      ? error.message 
      : 'An error occurred while processing your request. Please try again later.';
    
    return new Response(
      JSON.stringify({ 
        error: publicErrorMessage
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});