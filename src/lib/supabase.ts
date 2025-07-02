import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bgwrbfcroxvpufprgypk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnd3JiZmNyb3h2cHVmcHJneXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0OTc2ODcsImV4cCI6MjA2NzA3MzY4N30.yNKjkXZeijCc_6OYY98ALj9e-S5paqKAdg4swE0ohV0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  email: string;
  role: "candidate" | "employer" | "institute" | "super_admin";
  created_at: string;
  full_name?: string;
  phone?: string;
  location?: string;
  verified?: boolean;
}

export interface UserProfile {
  id: string;
  user_id: string;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  experience_years?: number;
  education?: string;
  resume_url?: string;
  video_profile_url?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  employer_id: string;
  title: string;
  description: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  job_type: "full-time" | "part-time" | "contract" | "internship";
  remote_allowed: boolean;
  required_skills: string[];
  experience_required: string;
  status: "active" | "paused" | "closed";
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  candidate_id: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired";
  cover_letter?: string;
  applied_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  industry?: string;
  size?: string;
  location?: string;
  created_at: string;
}

export interface Institute {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  website?: string;
  logo_url?: string;
  type: "university" | "college" | "training_center" | "skill_center";
  location?: string;
  accreditation?: string;
  created_at: string;
}
