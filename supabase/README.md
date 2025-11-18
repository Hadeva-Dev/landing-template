# Supabase Database Setup

This directory contains SQL migrations for setting up authentication and user management with Supabase.

## Migrations Overview

### 1. `20250101000001_initial_auth_setup.sql`
Sets up the core authentication infrastructure:
- **profiles table**: Extends `auth.users` with additional user information
- **RLS policies**: Ensures users can only access their own data
- **Triggers**: Automatically creates profile when user signs up
- **Indexes**: Optimizes database queries

### 2. `20250101000002_google_oauth.sql`
Configures Google OAuth authentication:
- **google_oauth_users table**: Tracks Google OAuth connections
- **RLS policies**: Secures Google OAuth data
- **Triggers**: Updates last sign-in timestamp
- **Indexes**: Optimizes lookups by user_id and google_id

### 3. `20250101000003_sessions_and_security.sql`
Adds session management and security features:
- **user_sessions table**: Tracks active user sessions (optional analytics)
- **failed_login_attempts table**: Monitors failed login attempts
- **Cleanup function**: Removes old sessions and login attempts
- **Security monitoring**: Helps detect suspicious activity

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste each migration file in order
4. Click **Run** for each migration

### Option 2: Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

### Option 3: Manual SQL Execution
Connect to your Supabase database and run each SQL file in numerical order.

## Google OAuth Configuration

After running the migrations, configure Google OAuth in Supabase:

1. Go to **Authentication** > **Providers** in Supabase Dashboard
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - Client ID: `208305766943-6h83caina8lgj9250pj37jo6gcasv8d4.apps.googleusercontent.com`
   - Client Secret: (from your Google Cloud Console)
4. Add authorized redirect URI:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

## Database Schema

### Tables Created:
- `public.profiles` - User profile information
- `public.google_oauth_users` - Google OAuth tracking
- `public.user_sessions` - Session management
- `public.failed_login_attempts` - Security monitoring

### Row Level Security:
All tables have RLS enabled to ensure data privacy and security.

## Maintenance

### Cleaning Up Old Data
Run the cleanup function periodically to remove old sessions and failed login attempts:

```sql
SELECT public.cleanup_old_sessions();
```

Consider setting up a cron job or using Supabase Edge Functions to automate this.

## Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
OAUTH_REDIRECT_URI=https://yourdomain.com/auth/callback
```

## Troubleshooting

### Migration Fails
- Ensure migrations are run in numerical order
- Check for existing tables/functions that might conflict
- Verify you have proper permissions

### RLS Policies Not Working
- Ensure RLS is enabled on all tables
- Check that `auth.uid()` matches the user's UUID
- Test policies using the Supabase dashboard

### Google OAuth Not Working
- Verify Google OAuth is enabled in Supabase
- Check redirect URIs match exactly
- Ensure client ID and secret are correct
