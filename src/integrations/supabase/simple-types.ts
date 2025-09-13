// Simplified type exports to avoid TypeScript recursion issues with generated types
import type { Database } from './types';

// Direct type aliases that avoid the complex conditional types
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update'];

export type WaitingListEntry = Database['public']['Tables']['waiting_list']['Row'];
export type WaitingListInsert = Database['public']['Tables']['waiting_list']['Insert'];
export type WaitingListUpdate = Database['public']['Tables']['waiting_list']['Update'];

export type LeetcodeRegistration = Database['public']['Tables']['leetcode_registrations']['Row'];
export type LeetcodeRegistrationInsert = Database['public']['Tables']['leetcode_registrations']['Insert'];
export type LeetcodeRegistrationUpdate = Database['public']['Tables']['leetcode_registrations']['Update'];

export type Task = Database['public']['Tables']['tasks']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
export type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type UserRole = Database['public']['Tables']['user_roles']['Row'];
export type UserRoleInsert = Database['public']['Tables']['user_roles']['Insert'];
export type UserRoleUpdate = Database['public']['Tables']['user_roles']['Update'];

// Enums
export type AppRole = Database['public']['Enums']['app_role'];
export type TaskStatus = Database['public']['Enums']['task_status'];

// Re-export the database type itself
export type { Database } from './types';