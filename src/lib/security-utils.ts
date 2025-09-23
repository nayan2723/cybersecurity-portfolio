/**
 * Security utility functions for input validation and sanitization
 */

// Common patterns for detecting potential security threats
const SUSPICIOUS_PATTERNS = {
  script: /<script|javascript:|data:|vbscript:|on\w+\s*=/i,
  html: /<[^>]*>/g,
  sql: /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b)/i,
  xss: /[<>\"'&]/g
};

/**
 * Validates and sanitizes text input to prevent XSS and other attacks
 */
export const sanitizeTextInput = (input: string): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  // Remove HTML tags and suspicious patterns
  return input
    .replace(SUSPICIOUS_PATTERNS.html, '')
    .replace(/javascript:|data:|vbscript:/gi, '')
    .trim();
};

/**
 * Validates email format with security considerations
 */
export const validateSecureEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  // Check for suspicious patterns
  if (SUSPICIOUS_PATTERNS.script.test(email)) return false;
  
  // RFC-compliant email validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Checks if text contains suspicious patterns
 */
export const containsSuspiciousContent = (text: string): boolean => {
  return Object.values(SUSPICIOUS_PATTERNS).some(pattern => 
    pattern instanceof RegExp && pattern.test(text)
  );
};

/**
 * Rate limiting helper - checks if action is within limits
 */
export const isWithinRateLimit = (
  lastAction: Date | null, 
  minIntervalMs: number = 1000
): boolean => {
  if (!lastAction) return true;
  return Date.now() - lastAction.getTime() >= minIntervalMs;
};

/**
 * Generates a secure error ID for logging purposes
 */
export const generateErrorId = (): string => {
  return crypto.randomUUID();
};