# Skimly Landing Page Setup

## Quick Start

### 1. Environment Setup

1. Copy `.env.example` to `.env.local`
2. Update the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**📋 See `CREDENTIALS.md` for your specific database credentials and connection string.**

### 2. Set up Database Tables

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the query to create all necessary tables

### 3. Configure Custom Email Service

**By default, Skimly uses a custom email service instead of Supabase's built-in emails.**

1. **Choose your email provider:**
   - **SendGrid** (recommended): [sendgrid.com](https://sendgrid.com/)
   - **AWS SES**: [aws.amazon.com/ses/](https://aws.amazon.com/ses/)
   - **Resend**: [resend.com](https://resend.com/)
   - **Nodemailer**: [nodemailer.com](https://nodemailer.com/)

2. **Update the email service:**
   - Edit `src/lib/email-service.ts`
   - Replace the `sendEmail` method with your provider's implementation
   - Add your API keys to `.env.local`

3. **Example SendGrid implementation:**
   ```typescript
   private async sendEmail(emailData: EmailData): Promise<void> {
     const sgMail = require('@sendgrid/mail');
     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
     
     await sgMail.send({
       to: emailData.to,
       from: 'noreply@yourdomain.com',
       subject: emailData.subject,
       html: emailData.html,
       text: emailData.text,
     });
   }
   ```

### 4. Configure Authentication

1. In Supabase dashboard, go to Authentication → Providers
2. Enable Email provider (should be enabled by default)
3. **Enable Google OAuth:**
   - Go to Authentication → Providers → Google
   - Toggle "Enable" to ON
   - Add your Google OAuth credentials:
     - **Client ID**: Your Google OAuth client ID
     - **Client Secret**: Your Google OAuth client secret
   - Set **Redirect URL** to: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Configure email templates if desired
5. Set your site URL in Authentication → URL Configuration:
   - Site URL: `http://localhost:3000` (for development)
   - Add `http://localhost:3000/dashboard` to Redirect URLs

### 5. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application Type to "Web application"
6. Add Authorized redirect URIs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - `http://localhost:3000/auth/callback` (for development)
7. Copy the Client ID and Client Secret to use in Supabase

### 6. Run the Application

```bash
# Install dependencies (if not already installed)
bun install

# Run the development server
bun dev
```

The application will be available at `http://localhost:3000`

## Features

- **Landing Page**: Modern, responsive design with smooth animations
- **Waitlist**: Email capture stored in Supabase
- **Authentication**: Email/password, magic link, and Google OAuth support
- **Dashboard**: Protected route with user session management

## Testing

1. Visit the landing page at `http://localhost:3000`
2. Try joining the waitlist with your email
3. Click "Login" to access the authentication page
4. Create an account or sign in
5. Access the dashboard at `/dashboard` when logged in

## Deployment

This app is configured for deployment on Netlify. The `netlify.toml` file is already set up.

## Support

For any issues with the Skimly platform, please contact support.
