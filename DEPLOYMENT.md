# Deployment Guide

Complete guide to deploying your landing page template to production.

---

## Prerequisites

Before deploying, ensure you have:
- ✅ Node.js 18+ installed
- ✅ Git repository initialized
- ✅ All placeholder content replaced with your actual content
- ✅ Environment variables configured

---

## Option 1: Deploy to Vercel (Recommended)

**Why Vercel?**
- Built for Next.js (same company)
- Free tier with generous limits
- Automatic deployments on git push
- Global CDN
- Zero configuration needed

### Step 1: Prepare Your Project

```bash
# Install dependencies
npm install

# Test build locally
npm run build

# Test production locally
npm run start
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

**Option A: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click "Deploy"

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Step 4: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add your variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Redeploy for changes to take effect

### Step 5: Add Custom Domain

1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourdomain.com`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (usually 5-60 minutes)

**DNS Records Example:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Option 2: Deploy to Netlify

**Why Netlify?**
- Great for static sites
- Free tier available
- Form handling built-in
- Easy rollbacks

### Step 1: Build Configuration

Create `netlify.toml` in your project root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy

**Option A: Using Netlify Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub
4. Select your repository
5. Build settings are auto-detected
6. Click "Deploy site"

**Option B: Using Netlify CLI**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

### Step 3: Environment Variables

In Netlify Dashboard:
1. Site settings → Environment variables
2. Add your variables (same as Vercel)

---

## Option 3: Deploy to Your Own Server (VPS)

**For Digital Ocean, AWS EC2, Linode, etc.**

### Step 1: Server Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2
```

### Step 2: Deploy Your App

```bash
# Clone your repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "landing-page" -- start
pm2 save
pm2 startup
```

### Step 3: Configure Nginx

```bash
# Install Nginx
sudo apt-get install nginx

# Create config
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 4: Add SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

---

## Option 4: Deploy to GitHub Pages (Static Export)

**Note:** Next.js requires static export for GitHub Pages.

### Step 1: Configure Static Export

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
}

module.exports = nextConfig
```

### Step 2: Build and Deploy

```bash
# Build static export
npm run build

# Files will be in the 'out' directory
# Push to gh-pages branch
npm install -g gh-pages

# Deploy
gh-pages -d out
```

### Step 3: Configure GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from branch
3. Branch: `gh-pages` / `root`
4. Save

Your site will be at: `https://yourusername.github.io/repository-name`

---

## Environment Variables Reference

Create `.env.local` file (never commit this):

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# API Keys (if needed)
# NEXT_PUBLIC_API_KEY=your_key_here
```

**Important:**
- Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Never commit `.env.local` to git (already in `.gitignore`)
- Set production values in your hosting dashboard

---

## Pre-Deployment Checklist

Before going live, verify:

### Content
- [ ] Replace all "Your Brand" placeholder text
- [ ] Update meta tags (title, description, keywords)
- [ ] Add your logo and favicon
- [ ] Create OG image (1200x630px)
- [ ] Update footer links (Privacy, Terms)
- [ ] Replace example URLs (signup, demo, social links)

### Configuration
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Update Google Analytics ID (if using)
- [ ] Configure proper error pages (404, 500)
- [ ] Set up monitoring/error tracking

### Performance
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Test on mobile devices
- [ ] Verify images are optimized
- [ ] Check page load times
- [ ] Test in different browsers

### SEO
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt allows indexing
- [ ] Test meta tags with social media validators
- [ ] Ensure canonical URLs are correct

### Security
- [ ] Enable HTTPS/SSL
- [ ] Set proper CORS headers
- [ ] Configure CSP headers (optional)
- [ ] Remove any debug code/console.logs

---

## Post-Deployment

### Monitor Your Site

**Google Search Console**
1. Add your property
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Monitor indexing status

**Analytics**
- Verify Google Analytics is tracking
- Set up conversion goals
- Monitor traffic sources

**Performance Monitoring**
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- GTmetrix

### Set Up Continuous Deployment

With Vercel/Netlify:
- Every push to `main` branch auto-deploys
- Preview deployments for pull requests
- Instant rollbacks if needed

### Backups

- Code is backed up in GitHub
- Database backups (if applicable)
- Regular snapshots of server (if self-hosted)

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Ensure they start with `NEXT_PUBLIC_`
- Restart dev server after adding new variables
- In production, redeploy after adding variables

### 404 on Refresh (Client-Side Routing)

For Netlify, add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

For Nginx, already configured in the example above.

### Images Not Loading

- Verify image paths are correct (`/public/image.png` → `/image.png`)
- Check if images are in `public` folder
- For static export, use `unoptimized: true` in next.config.js

---

## Cost Estimates

### Vercel (Recommended for Most)
- **Hobby (Free):**
  - 100GB bandwidth/month
  - 6000 build minutes/month
  - Unlimited sites
  - Perfect for most landing pages

- **Pro ($20/month):**
  - 1TB bandwidth
  - Better analytics
  - Password protection

### Netlify
- **Free:**
  - 100GB bandwidth/month
  - 300 build minutes/month
  - Similar to Vercel Free

### Self-Hosted VPS
- **Digital Ocean Droplet:** $6-12/month
- **AWS Lightsail:** $3.50-10/month
- **Linode:** $5-10/month

**Recommendation:** Start with Vercel/Netlify free tier. Upgrade only if you exceed limits.

---

## Support Resources

- **Next.js Docs:** https://nextjs.org/docs/deployment
- **Vercel Support:** https://vercel.com/support
- **Netlify Docs:** https://docs.netlify.com
- **GitHub Pages:** https://pages.github.com

---

## Quick Deploy Commands

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod

# Self-hosted (after initial setup)
git pull
npm install
npm run build
pm2 restart landing-page
```

Your landing page is now live! 🚀
