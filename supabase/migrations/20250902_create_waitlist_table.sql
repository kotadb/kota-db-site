-- Create waitlist table for email capture
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source TEXT DEFAULT 'landing_page',
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  ip_address INET,
  user_agent TEXT,
  confirmed BOOLEAN DEFAULT false,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed BOOLEAN DEFAULT false,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for common queries
CREATE INDEX idx_waitlist_email ON public.waitlist(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist(created_at DESC);
CREATE INDEX idx_waitlist_confirmed ON public.waitlist(confirmed);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert their email
CREATE POLICY "Allow anonymous users to join waitlist" ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users (admin) to view all waitlist entries
CREATE POLICY "Allow authenticated users to view waitlist" ON public.waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Add constraint to ensure email is valid format
ALTER TABLE public.waitlist
  ADD CONSTRAINT email_format_check 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add comment to table
COMMENT ON TABLE public.waitlist IS 'Pre-launch waitlist for KotaDB';
