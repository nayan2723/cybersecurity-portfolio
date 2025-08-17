import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, apostrophes, and hyphens'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .max(254, 'Email must be less than 254 characters')
    .email('Please enter a valid email address'),
  
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .regex(/^[^<>]*$/, 'Subject cannot contain HTML tags'),
  
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters')
    .regex(/^[^<>]*$/, 'Message cannot contain HTML tags')
});

export type ContactFormData = z.infer<typeof contactFormSchema>;