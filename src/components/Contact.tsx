import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientButton } from '@/components/ui/gradient-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, Loader2, X } from 'lucide-react';
import ResumeButton from '@/components/ui/resume-button';
import { useToast } from '@/hooks/use-toast';
import { contactFormSchema, type ContactFormData } from '@/lib/contact-validation';
import { sanitizeTextInput, validateSecureEmail, containsSuspiciousContent } from '@/lib/security-utils';
import QRBusinessCard from '@/components/QRBusinessCard';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRickRoll, setShowRickRoll] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Client-side security validation
      if (containsSuspiciousContent(data.name) || 
          containsSuspiciousContent(data.subject) || 
          containsSuspiciousContent(data.message)) {
        throw new Error('Invalid content detected. Please remove any HTML tags or scripts.');
      }
      
      if (!validateSecureEmail(data.email)) {
        throw new Error('Please enter a valid email address.');
      }
      
      // Sanitize inputs before sending
      const sanitizedData = {
        name: sanitizeTextInput(data.name),
        email: data.email.toLowerCase().trim(),
        subject: sanitizeTextInput(data.subject),
        message: sanitizeTextInput(data.message)
      };
      
      // Call MongoDB API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      // Check if response is OK before parsing JSON
      if (!response.ok) {
        // Try to parse error message from response
        let errorMessage = 'Failed to send message. Please try again later.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Parse successful response
      const result = await response.json();

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      // Show rick roll after successful submission
      setShowRickRoll(true);
      
      form.reset();
    } catch (error: any) {
      console.error('Contact form error:', error);
      
      // Extract meaningful error message
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.message) {
        // Use the error message from API if available
        if (error.message.includes('Rate limit')) {
          errorMessage = 'Too many submissions. Please wait before sending another message.';
        } else if (error.message.includes('Invalid')) {
          errorMessage = error.message;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          // For other errors, use generic message (detailed error logged server-side)
          errorMessage = 'Failed to send message. Please try again later.';
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'nayankshitij128@gmail.com',
      link: 'mailto:nayankshitij128@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '+91-9100606434',
      link: 'tel:+919100606434'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: 'Greater Noida, India',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub',
      url: 'https://github.com/nayan2723',
      color: 'hover:text-foreground'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nayan-kshitij',
      color: 'hover:text-cyber-blue'
    }
  ];

  // Rick Roll Modal Component
  const RickRollModal = () => (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full">
        <GradientButton
          onClick={() => setShowRickRoll(false)}
          className="absolute -top-12 right-0"
          size="sm"
        >
          <X className="w-4 h-4 mr-2" />
          Close
        </GradientButton>
        <div className="relative w-full">
          <video
            autoPlay
            loop
            controls
            className="w-full h-auto rounded-lg"
            muted={false}
          >
            <source src="/rickroll.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-center mt-4 text-white">
          <p className="text-xl font-bold">Thanks for reaching me, now get rick rolled :) 🎵</p>
          <p className="text-sm opacity-75 mt-2">Hope you enjoyed that!</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showRickRoll && <RickRollModal />}
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GET IN <span className="text-primary">TOUCH</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Ready to collaborate on cybersecurity projects or discuss opportunities? 
            I'm always open to interesting conversations and new challenges.
          </p>
          <div className="w-24 h-1 bg-cyber-gradient mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Send Message</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                         <FormItem>
                           <FormControl>
                             <Input
                               placeholder="Your Name"
                               className="bg-background/50 border-border/50 focus:border-primary"
                               aria-label="Full name"
                               autoComplete="name"
                               {...field}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                         <FormItem>
                           <FormControl>
                             <Input
                               type="email"
                               placeholder="Your Email"
                               className="bg-background/50 border-border/50 focus:border-primary"
                               aria-label="Email address"
                               autoComplete="email"
                               {...field}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                       <FormItem>
                         <FormControl>
                           <Input
                             placeholder="Subject"
                             className="bg-background/50 border-border/50 focus:border-primary"
                             aria-label="Message subject"
                             {...field}
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                       <FormItem>
                         <FormControl>
                           <Textarea
                             placeholder="Your Message"
                             rows={6}
                             className="bg-background/50 border-border/50 focus:border-primary"
                             aria-label="Message content"
                             {...field}
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                    )}
                  />
                  
                  <GradientButton 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </GradientButton>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center gap-4 p-4 cyber-card hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="text-primary group-hover:text-accent transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{info.title}</h4>
                      <p className="text-foreground/70">{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 cyber-card hover:scale-110 transition-all duration-300 ${social.color}`}
                    title={social.title}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-6">Quick Contact</h3>
              <p className="text-foreground/70 mb-4 text-sm">
                Perfect for conferences and networking events - scan to save my contact info instantly!
              </p>
              <QRBusinessCard />
            </div>

            <Card className="cyber-card">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-primary mb-4">
                  Let's Build Something Secure Together
                </h4>
                <p className="text-foreground/70 mb-6">
                  Whether you're looking for a cybersecurity consultant, a developer for your next project, 
                  or just want to discuss the latest in cybersecurity trends, I'm here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <ResumeButton 
                    variant="primary" 
                    size="sm"
                    text="View My Resume"
                    className="flex-1"
                  />
                  <GradientButton 
                    variant="variant"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open('https://www.linkedin.com/in/nayan-kshitij', '_blank')}
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn Profile
                  </GradientButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;