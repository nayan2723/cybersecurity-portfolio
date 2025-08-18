// Global TypeScript type definitions

export interface Theme {
  id: 'light' | 'dark' | 'hacker';
  name: string;
  icon: string;
}

export interface SocialLink {
  icon: React.ReactNode;
  title: string;
  url: string;
  color?: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string;
  link: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

export interface NavigationItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

// Error boundary types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Theme colors
export type CyberColors = 'cyber-green' | 'cyber-blue' | 'cyber-purple' | 'neon-pink';

// Component variants
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'neon' | 'success';
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'neon';

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

// Rate limiting
export interface RateLimit {
  limit: number;
  remaining: number;
  reset: number;
}

export default {};