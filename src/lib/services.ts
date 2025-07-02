import { supabase } from "./supabase";
import type {
  Job,
  JobApplication,
  Company,
  Institute,
  UserProfile,
} from "./supabase";

export const jobService = {
  // Get all jobs
  async getAllJobs() {
    const { data, error } = await supabase
      .from("jobs")
      .select(
        `
        *,
        employer:users!employer_id(full_name, email),
        company:companies!employer_id(name, logo_url)
      `,
      )
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get jobs by employer
  async getJobsByEmployer(employerId: string) {
    const { data, error } = await supabase
      .from("jobs")
      .select("*, applications:job_applications(count)")
      .eq("employer_id", employerId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Create new job
  async createJob(job: Omit<Job, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("jobs")
      .insert([job])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update job
  async updateJob(id: string, updates: Partial<Job>) {
    const { data, error } = await supabase
      .from("jobs")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete job
  async deleteJob(id: string) {
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) throw error;
  },

  // Search jobs
  async searchJobs(query: string, location?: string, jobType?: string) {
    let queryBuilder = supabase
      .from("jobs")
      .select(
        `
        *,
        employer:users!employer_id(full_name, email),
        company:companies!employer_id(name, logo_url)
      `,
      )
      .eq("status", "active");

    if (query) {
      queryBuilder = queryBuilder.or(
        `title.ilike.%${query}%,description.ilike.%${query}%,required_skills.cs.{${query}}`,
      );
    }

    if (location) {
      queryBuilder = queryBuilder.ilike("location", `%${location}%`);
    }

    if (jobType) {
      queryBuilder = queryBuilder.eq("job_type", jobType);
    }

    const { data, error } = await queryBuilder.order("created_at", {
      ascending: false,
    });

    if (error) throw error;
    return data || [];
  },
};

export const applicationService = {
  // Apply for job
  async applyForJob(jobId: string, candidateId: string, coverLetter?: string) {
    const { data, error } = await supabase
      .from("job_applications")
      .insert([
        {
          job_id: jobId,
          candidate_id: candidateId,
          cover_letter: coverLetter,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get applications by candidate
  async getApplicationsByCandidate(candidateId: string) {
    const { data, error } = await supabase
      .from("job_applications")
      .select(
        `
        *,
        job:jobs(title, company:companies!employer_id(name), location, salary_min, salary_max)
      `,
      )
      .eq("candidate_id", candidateId)
      .order("applied_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get applications for employer's jobs
  async getApplicationsByEmployer(employerId: string) {
    const { data, error } = await supabase
      .from("job_applications")
      .select(
        `
        *,
        candidate:users!candidate_id(full_name, email),
        candidate_profile:user_profiles!candidate_id(avatar_url, bio, skills, resume_url),
        job:jobs!job_id(title, id)
      `,
      )
      .in(
        "job_id",
        supabase.from("jobs").select("id").eq("employer_id", employerId),
      )
      .order("applied_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Update application status
  async updateApplicationStatus(id: string, status: JobApplication["status"]) {
    const { data, error } = await supabase
      .from("job_applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const profileService = {
  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = not found
    return data;
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from("user_profiles")
      .upsert([
        {
          user_id: userId,
          ...updates,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get company profile
  async getCompanyProfile(userId: string) {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  // Update company profile
  async updateCompanyProfile(userId: string, updates: Partial<Company>) {
    const { data, error } = await supabase
      .from("companies")
      .upsert([
        {
          user_id: userId,
          ...updates,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get institute profile
  async getInstituteProfile(userId: string) {
    const { data, error } = await supabase
      .from("institutes")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data;
  },

  // Update institute profile
  async updateInstituteProfile(userId: string, updates: Partial<Institute>) {
    const { data, error } = await supabase
      .from("institutes")
      .upsert([
        {
          user_id: userId,
          ...updates,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const adminService = {
  // Get all users for super admin
  async getAllUsers() {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
        *,
        profile:user_profiles(*),
        company:companies(*),
        institute:institutes(*)
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Update user status
  async updateUserStatus(userId: string, verified: boolean) {
    const { data, error } = await supabase
      .from("users")
      .update({ verified })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get platform statistics
  async getStatistics() {
    const [users, jobs, applications, companies] = await Promise.all([
      supabase.from("users").select("id", { count: "exact" }),
      supabase.from("jobs").select("id", { count: "exact" }),
      supabase.from("job_applications").select("id", { count: "exact" }),
      supabase.from("companies").select("id", { count: "exact" }),
    ]);

    return {
      totalUsers: users.count || 0,
      totalJobs: jobs.count || 0,
      totalApplications: applications.count || 0,
      totalCompanies: companies.count || 0,
    };
  },
};

export const blogService = {
  // Get published blog posts
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        `
        *,
        author:users!author_id(full_name)
      `,
      )
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get blog post by ID
  async getPostById(id: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        `
        *,
        author:users!author_id(full_name)
      `,
      )
      .eq("id", id)
      .eq("published", true)
      .single();

    if (error) throw error;
    return data;
  },
};

export const testimonialService = {
  // Get featured testimonials
  async getFeaturedTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select(
        `
        *,
        user:users!user_id(full_name, email)
      `,
      )
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },
};
