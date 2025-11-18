-- Session tracking and security features
-- This migration adds session management and security monitoring

-- Create table to track user sessions (optional, for analytics)
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  sign_in_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  sign_out_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for user_sessions
CREATE POLICY "Users can view own sessions"
  ON public.user_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can insert sessions (application logic)
-- Users cannot directly insert sessions for security
CREATE POLICY "Service role can insert sessions"
  ON public.user_sessions
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Users can update their own sessions (e.g., sign out)
CREATE POLICY "Users can update own sessions"
  ON public.user_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS user_sessions_user_id_idx ON public.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS user_sessions_is_active_idx ON public.user_sessions(is_active);

-- Create table for failed login attempts (security)
CREATE TABLE IF NOT EXISTS public.failed_login_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address INET,
  attempted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  reason TEXT
);

-- Enable Row Level Security (admins only)
ALTER TABLE public.failed_login_attempts ENABLE ROW LEVEL SECURITY;

-- No public access to failed login attempts (admins can access via service role)

-- Create index for security monitoring
CREATE INDEX IF NOT EXISTS failed_login_attempts_email_idx ON public.failed_login_attempts(email);
CREATE INDEX IF NOT EXISTS failed_login_attempts_attempted_at_idx ON public.failed_login_attempts(attempted_at);

-- Create function to clean up old sessions (older than 90 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM public.user_sessions
  WHERE sign_in_at < (now() - INTERVAL '90 days');

  DELETE FROM public.failed_login_attempts
  WHERE attempted_at < (now() - INTERVAL '30 days');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: Set up a cron job or periodic function to call cleanup_old_sessions()
