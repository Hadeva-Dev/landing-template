# SEO Setup Guide

Your landing page template comes with pre-configured SEO infrastructure. Follow this guide to customize it for your project.

## Quick Setup Checklist

### 1. Update Metadata (`src/app/layout.tsx`)

Replace these placeholder values:

```typescript
title: "Your Brand - Landing Page Template"
description: "Your product description here"
keywords: "your, relevant, keywords"
```

### 2. Environment Variables

Create a `.env.local` file:

```bash
# Production URL (replace with your actual domain)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Social Media Handles

Update in `layout.tsx`:

```typescript
twitter: {
  creator: "@yourbrand",  // Your Twitter handle
  site: "@yourbrand",
}
```

### 4. OpenGraph Images

Create these images in your `/public` folder:

- **og-image.png** - 1200x630px (for social sharing)
- **favicon.ico** - 32x32px or 16x16px
- **icon-512.png** - 512x512px
- **icon-192.png** - 192x192px
- **apple-touch-icon.png** - 180x180px

### 5. Structured Data

Update the JSON-LD schema in `layout.tsx`:

```typescript
{
  "@type": "Organization",
  "name": "Your Brand",
  "description": "Your organization description",
  "sameAs": [
    "https://twitter.com/yourbrand",
    "https://linkedin.com/company/yourbrand"
  ]
}
```

## What's Already Configured

✅ Next.js Metadata API
✅ OpenGraph tags for social sharing
✅ Twitter Card tags
✅ Schema.org structured data (JSON-LD)
✅ Robots.txt directives
✅ Canonical URLs
✅ Google Analytics (optional, via env variable)
✅ Responsive favicon/icons

## Testing Your SEO

### Tools to Use:

1. **OpenGraph Preview**: https://opengraph.xyz/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **Google Rich Results Test**: https://search.google.com/test/rich-results
4. **Meta Tags Inspector**: https://metatags.io/

### Local Testing:

```bash
npm run build
npm run start
```

Then visit:
- View source: View the `<head>` tags
- Lighthouse: Check SEO score in Chrome DevTools

## Additional Recommendations

### For Production:

1. **Create a sitemap** - Add `sitemap.xml` generation
2. **Add robots.txt** - Create `/public/robots.txt`
3. **Enable HTTPS** - Required for modern SEO
4. **Page speed** - Optimize images and code splitting
5. **Mobile-friendly** - Already responsive, but test on real devices

### Content SEO:

- Write unique, descriptive titles (50-60 characters)
- Meta descriptions should be compelling (150-160 characters)
- Use header tags (H1, H2, H3) semantically
- Add alt text to all images
- Ensure fast page load times

## Need Help?

- Next.js Metadata Docs: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Schema.org Types: https://schema.org/docs/schemas.html
- Google SEO Guide: https://developers.google.com/search/docs
