-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('candidate', 'employer', 'institute', 'super_admin')),
  full_name VARCHAR(255),
  phone VARCHAR(20),
  location VARCHAR(255),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create User Profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  avatar_url TEXT,
  bio TEXT,
  skills TEXT[],
  experience_years INTEGER,
  education TEXT,
  resume_url TEXT,
  video_profile_url TEXT,
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  logo_url TEXT,
  industry VARCHAR(100),
  size VARCHAR(50),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Institutes table
CREATE TABLE IF NOT EXISTS public.institutes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  logo_url TEXT,
  type VARCHAR(50) CHECK (type IN ('university', 'college', 'training_center', 'skill_center')),
  location VARCHAR(255),
  accreditation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  salary_min INTEGER,
  salary_max INTEGER,
  job_type VARCHAR(20) CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship')),
  remote_allowed BOOLEAN DEFAULT false,
  required_skills TEXT[],
  experience_required VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Job Applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
  candidate_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  cover_letter TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(job_id, candidate_id)
);

-- Create Blog Posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  category VARCHAR(100),
  tags TEXT[],
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  featured BOOLEAN DEFAULT false,
  company_name VARCHAR(255),
  position VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view public profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid()::text = id::text);

-- Create policies for user_profiles table
CREATE POLICY "Profiles are viewable by everyone" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Create policies for companies table
CREATE POLICY "Companies are viewable by everyone" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Users can update own company" ON public.companies FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own company" ON public.companies FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Create policies for institutes table
CREATE POLICY "Institutes are viewable by everyone" ON public.institutes FOR SELECT USING (true);
CREATE POLICY "Users can update own institute" ON public.institutes FOR UPDATE USING (auth.uid()::text = user_id::text);
CREATE POLICY "Users can insert own institute" ON public.institutes FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Create policies for jobs table
CREATE POLICY "Jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Employers can manage own jobs" ON public.jobs FOR ALL USING (auth.uid()::text = employer_id::text);

-- Create policies for job_applications table
CREATE POLICY "Applications viewable by job owner and applicant" ON public.job_applications FOR SELECT USING (
  auth.uid()::text = candidate_id::text OR 
  auth.uid()::text IN (SELECT employer_id::text FROM public.jobs WHERE id = job_id)
);
CREATE POLICY "Candidates can apply for jobs" ON public.job_applications FOR INSERT WITH CHECK (auth.uid()::text = candidate_id::text);
CREATE POLICY "Applications can be updated by applicant and employer" ON public.job_applications FOR UPDATE USING (
  auth.uid()::text = candidate_id::text OR 
  auth.uid()::text IN (SELECT employer_id::text FROM public.jobs WHERE id = job_id)
);

-- Create policies for blog_posts table
CREATE POLICY "Published posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Authors can manage own posts" ON public.blog_posts FOR ALL USING (auth.uid()::text = author_id::text);

-- Create policies for testimonials table
CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Users can manage own testimonials" ON public.testimonials FOR ALL USING (auth.uid()::text = user_id::text);

-- Insert sample data
INSERT INTO public.users (id, email, role, full_name, phone, location, verified) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'rajesh.kumar@email.com', 'candidate', 'Rajesh Kumar', '+91-9876543210', 'Pune, Maharashtra', true),
('550e8400-e29b-41d4-a716-446655440002', 'priya.sharma@email.com', 'candidate', 'Priya Sharma', '+91-9876543211', 'Jaipur, Rajasthan', true),
('550e8400-e29b-41d4-a716-446655440003', 'amit.patel@techcorp.com', 'employer', 'Amit Patel', '+91-9876543212', 'Mumbai, Maharashtra', true),
('550e8400-e29b-41d4-a716-446655440004', 'dr.singh@ruraltech.edu', 'institute', 'Dr. Ravi Singh', '+91-9876543213', 'Chandigarh', true),
('550e8400-e29b-41d4-a716-446655440005', 'admin@graminhire.com', 'super_admin', 'Platform Admin', '+91-9876543214', 'Delhi', true);

-- Insert sample companies
INSERT INTO public.companies (user_id, name, description, industry, size, location) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'TechCorp Solutions', 'Leading technology solutions provider', 'Technology', '50-200', 'Mumbai, Maharashtra');

-- Insert sample institutes
INSERT INTO public.institutes (user_id, name, description, type, location) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'Rural Technology Institute', 'Bridging the gap between rural talent and technology', 'training_center', 'Chandigarh');

-- Insert sample jobs
INSERT INTO public.jobs (employer_id, title, description, location, salary_min, salary_max, job_type, required_skills) VALUES
('550e8400-e29b-41d4-a716-446655440003', 'Frontend Developer', 'Join our team to build amazing web applications', 'Mumbai, Maharashtra', 400000, 800000, 'full-time', ARRAY['React', 'JavaScript', 'CSS']);

-- Insert sample testimonials
INSERT INTO public.testimonials (user_id, content, rating, company_name, position, featured) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'GraminHire helped me find the perfect job opportunity!', 5, 'TechCorp Solutions', 'Software Developer', true);
