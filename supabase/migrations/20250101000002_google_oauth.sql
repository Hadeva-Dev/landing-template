-- Google OAuth configuration
-- This migration sets up tables for tracking Google OAuth sign-ins

-- Create table to track Google OAuth connections
CREATE TABLE IF NOT EXISTS public.google_oauth_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  google_user_id TEXT NOT NULL UNIQUE,
  google_email TEXT,
  google_picture_url TEXT,
  connected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.google_oauth_users ENABLE ROW LEVEL SECURITY;

-- Create policies for google_oauth_users
CREATE POLICY "Users can view own Google OAuth data"
  ON public.google_oauth_users
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Google OAuth data"
  ON public.google_oauth_users
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Google OAuth data"
  ON public.google_oauth_users
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS google_oauth_users_user_id_idx ON public.google_oauth_users(user_id);
CREATE INDEX IF NOT EXISTS google_oauth_users_google_id_idx ON public.google_oauth_users(google_user_id);

-- Create function to update last_sign_in timestamp
CREATE OR REPLACE FUNCTION public.update_google_oauth_sign_in()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.google_oauth_users
  SET last_sign_in = timezone('utc'::text, now())
  WHERE user_id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to update last sign in on auth
DROP TRIGGER IF EXISTS on_google_user_sign_in ON auth.users;
CREATE TRIGGER on_google_user_sign_in
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (NEW.last_sign_in_at IS DISTINCT FROM OLD.last_sign_in_at)
  EXECUTE FUNCTION public.update_google_oauth_sign_in();
