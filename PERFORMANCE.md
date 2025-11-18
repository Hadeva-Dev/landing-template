# Performance Optimization Guide

Your landing page template is already optimized for performance. This guide explains what's implemented and how to maintain/improve it.

---

## Current Performance Optimizations ✅

### 1. **Animation Optimizations**

**Hardware Acceleration**
- All animations use `transform` and `opacity` (GPU-accelerated properties)
- `will-change` hints tell browser to optimize ahead of time
- `translateZ(0)` creates GPU layers
- `backfaceVisibility: hidden` prevents flickering

**Example from codebase:**
```typescript
style={{
  willChange: 'transform, opacity',
  backfaceVisibility: 'hidden',
  transform: 'translateZ(0)'
}}
```

**What NOT to animate:**
- ❌ `width`, `height` - causes layout recalculation
- ❌ `top`, `left` - causes layout recalculation
- ❌ `margin`, `padding` - causes layout recalculation
- ✅ `transform`, `opacity` - GPU accelerated, smooth 60fps

### 2. **Framer Motion Optimizations**

**Viewport-Based Animations**
```typescript
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}  // Only animate once, not on every scroll
```

Benefits:
- Elements only animate when visible
- Saves CPU/GPU for off-screen content
- `once: true` prevents re-triggering

**Layout Animations**
```typescript
<motion.div layout>
```
- Automatically optimized with FLIP technique
- Smooth layout changes without jank

### 3. **Scroll Performance**

**Passive Event Listeners**
```typescript
window.addEventListener('scroll', handler, { passive: true })
```
- Tells browser not to wait for preventDefault()
- Allows smooth scrolling while JS runs
- Reduces scroll jank

**Intersection Observer**
```typescript
// Used in RadialFeatureDisplay
const observer = new IntersectionObserver(callback, { threshold: 0.3 })
```
- More efficient than scroll listeners
- Native browser API, optimized
- Only triggers when needed

### 4. **CSS Optimizations**

**Already Implemented:**
- Custom scrollbar hidden (reduces paint area)
- Smooth scroll with `scroll-behavior: smooth`
- Reduced motion support for accessibility
- GPU-accelerated animations

**Reduced Motion Support:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-* {
    animation: none !important;
  }
}
```
- Respects user accessibility preferences
- Disables animations for sensitive users
- Better battery life on mobile

### 5. **Image Optimization (Setup Required)**

**Next.js Image Component** - Currently not fully utilized

Replace standard `<img>` tags with:
```typescript
import Image from 'next/image'

<Image
  src="/logo.png"
  alt="Logo"
  width={500}
  height={300}
  priority  // For above-fold images
  placeholder="blur"  // Optional blur placeholder
/>
```

Benefits:
- Automatic WebP/AVIF conversion
- Lazy loading by default
- Responsive images
- Prevents layout shift

### 6. **Font Optimization**

**Already Using Next.js Font Optimization:**
```typescript
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
```

Benefits:
- Self-hosted fonts (no Google request)
- Automatic font optimization
- Zero layout shift
- Preloaded in `<head>`

---

## Performance Metrics

### Current Expected Scores

**Lighthouse Scores (Target):**
- 🟢 Performance: 90-100
- 🟢 Accessibility: 95-100
- 🟢 Best Practices: 95-100
- 🟢 SEO: 95-100

**Core Web Vitals (Target):**
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## How to Measure Performance

### 1. Chrome DevTools Lighthouse

```bash
# Run production build
npm run build
npm run start

# Open Chrome DevTools → Lighthouse
# Run audit in "Desktop" and "Mobile" modes
```

### 2. Command Line

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

### 3. Web Vitals

Install the Web Vitals extension:
- Chrome: [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma)

### 4. Production Monitoring

**Vercel Analytics** (if using Vercel):
- Real user monitoring
- Core Web Vitals tracking
- Free with Vercel deployment

**Alternative Tools:**
- Google PageSpeed Insights
- GTmetrix
- WebPageTest.org

---

## Common Performance Issues & Fixes

### Issue 1: Large Images Slowing Load

**Problem:** Using high-resolution images without optimization

**Fix:**
```typescript
// Before
<img src="/hero-image.png" alt="Hero" />

// After
import Image from 'next/image'
<Image
  src="/hero-image.png"
  alt="Hero"
  width={1200}
  height={630}
  priority
  quality={85}  // Reduce quality slightly (default 75)
/>
```

**Or use manual optimization:**
```bash
# Install image optimizer
npm install -D sharp

# Or use online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (Mac)
```

### Issue 2: Too Many Animations Running

**Problem:** Animations running even when off-screen

**Fix:** Already implemented with `whileInView`
```typescript
// Animations only trigger when visible
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
```

### Issue 3: Layout Shift from Images

**Problem:** Images load and push content down (bad CLS score)

**Fix:** Always specify width/height
```typescript
// Bad - causes layout shift
<img src="/logo.png" alt="Logo" />

// Good - reserves space
<Image src="/logo.png" width={200} height={100} alt="Logo" />
```

### Issue 4: Slow Initial Load

**Potential causes:**
1. Large JavaScript bundle
2. Unoptimized images
3. Too many animations on first paint

**Fixes:**

**1. Code Splitting**
```typescript
// Lazy load components not needed immediately
import dynamic from 'next/dynamic'

const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <p>Loading...</p>
})
```

**2. Reduce Initial Animations**
```typescript
// Remove animations from hero section if needed
// Or add delays to stagger them
transition={{ delay: 0.5 }}
```

### Issue 5: Mobile Performance

**Problem:** Animations janky on mobile devices

**Fix:** Reduce animation complexity on mobile
```typescript
// In globals.css (already implemented)
@media (max-width: 768px) {
  .animate-seamless-flow {
    animation-duration: 25s; // Slower = less CPU
  }

  .background-animations svg {
    opacity: 0.7; // Less intense
  }
}
```

---

## Production Build Optimizations

### 1. Bundle Analysis

```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Update next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})

# Run analysis
ANALYZE=true npm run build
```

### 2. Compression

**Vercel/Netlify:** Automatic gzip/brotli compression

**Self-hosted (Nginx):**
```nginx
# Enable gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
```

### 3. Caching Strategy

**Next.js Automatic Caching:**
- Static pages: Cached indefinitely
- API routes: No cache by default
- Images: Cached with immutable headers

**Custom Headers (next.config.js):**
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ]
  },
}
```

---

## Image Optimization Checklist

### Before Adding Images:

- [ ] Resize to actual display size (don't use 4000px image for 400px display)
- [ ] Compress images (TinyPNG, Squoosh, ImageOptim)
- [ ] Convert to modern formats (WebP, AVIF)
- [ ] Use appropriate formats:
  - **Photos:** JPG or WebP
  - **Graphics/Logos:** PNG or SVG
  - **Icons:** SVG (vector, scalable)

### Recommended Sizes:

| Purpose | Dimensions | Format |
|---------|-----------|--------|
| OG Image | 1200x630 | JPG/PNG |
| Hero Image | 1920x1080 | WebP/JPG |
| Logo | 512x512 | PNG/SVG |
| Icons | SVG or 64x64 | SVG/PNG |
| Favicon | 32x32 | ICO/PNG |

### Image Optimization Tools:

**Online:**
- Squoosh.app (Google)
- TinyPNG.com
- Compressor.io

**CLI:**
```bash
# Install Sharp
npm install sharp

# Optimize script
const sharp = require('sharp');
sharp('input.jpg')
  .resize(1200)
  .webp({ quality: 85 })
  .toFile('output.webp');
```

---

## Font Loading Optimization

**Already Optimized:**
```typescript
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap', // Prevents invisible text
  preload: true,   // Preloads font
})
```

**If Adding Custom Fonts:**
```typescript
import localFont from 'next/font/local'

const myFont = localFont({
  src: './my-font.woff2',
  display: 'swap',
  weight: '400 700', // Variable font weights
})
```

---

## Third-Party Scripts Optimization

**Google Analytics** (already optimized):
```typescript
// Only loads if env variable is set
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
    strategy="afterInteractive" // Loads after page is interactive
  />
)}
```

**Best Practices for Scripts:**
- Use `strategy="afterInteractive"` for analytics
- Use `strategy="lazyOnload"` for non-critical scripts
- Avoid `strategy="beforeInteractive"` unless necessary

---

## Mobile Performance Best Practices

### Already Implemented:
✅ Responsive animations (reduced on mobile)
✅ Passive scroll listeners
✅ Touch-friendly tap targets (buttons 44x44px minimum)
✅ Reduced motion support

### Additional Tips:

**1. Test on Real Devices**
- Chrome DevTools mobile simulation is not enough
- Test on actual phones (iOS Safari, Chrome Android)

**2. Reduce Animation Intensity**
```css
@media (max-width: 768px) {
  .background-animations div[class*="blur-3xl"] {
    filter: blur(40px); // Less blur = better performance
  }
}
```

**3. Lazy Load Below-Fold Content**
```typescript
// For content far down the page
viewport={{ once: true, margin: "200px" }}
```

---

## Performance Monitoring in Production

### Set Up Real User Monitoring (RUM)

**Vercel Analytics** (Built-in if using Vercel):
```typescript
// No setup needed, automatically tracks:
// - Core Web Vitals
// - Page load times
// - Real user data
```

**Google Analytics 4:**
- Already configured if you set `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Automatically tracks Web Vitals

### Monitor These Metrics:

**Critical:**
- LCP (Largest Contentful Paint) - Should be < 2.5s
- FID (First Input Delay) - Should be < 100ms
- CLS (Cumulative Layout Shift) - Should be < 0.1

**Important:**
- TTFB (Time to First Byte) - Should be < 600ms
- FCP (First Contentful Paint) - Should be < 1.8s
- INP (Interaction to Next Paint) - Should be < 200ms

---

## Performance Budget

Set limits to prevent regression:

```javascript
// lighthouse-budget.json
{
  "resourceSizes": [
    {
      "resourceType": "script",
      "budget": 300 // KB
    },
    {
      "resourceType": "image",
      "budget": 500
    },
    {
      "resourceType": "total",
      "budget": 1000
    }
  ],
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 2000 // ms
    },
    {
      "metric": "interactive",
      "budget": 3500
    }
  ]
}
```

Run with budget:
```bash
lighthouse http://localhost:3000 --budget-path=lighthouse-budget.json
```

---

## Quick Performance Checklist

Before deploying:

### Images
- [ ] All images compressed
- [ ] Using next/image where possible
- [ ] Width/height specified to prevent layout shift
- [ ] Priority images marked with `priority` prop
- [ ] Favicon and OG images optimized

### Code
- [ ] Production build tested (`npm run build`)
- [ ] No console.logs in production
- [ ] Unused dependencies removed
- [ ] Bundle size checked (<300KB initial JS)

### Animations
- [ ] Using transform/opacity (not width/left/top)
- [ ] `whileInView` with `once: true` where appropriate
- [ ] Reduced motion support tested
- [ ] Mobile performance verified

### Fonts
- [ ] Using Next.js font optimization
- [ ] `display: swap` enabled
- [ ] Only loading required font weights

### Monitoring
- [ ] Analytics configured
- [ ] Error tracking set up (optional)
- [ ] Lighthouse score > 90 on mobile

---

## Tools & Resources

**Performance Testing:**
- Lighthouse (Chrome DevTools)
- WebPageTest.org
- Google PageSpeed Insights
- GTmetrix

**Image Optimization:**
- Squoosh.app
- TinyPNG.com
- Sharp (npm package)

**Monitoring:**
- Vercel Analytics
- Google Analytics 4
- Sentry (error tracking)

**Learning:**
- web.dev/vitals
- Next.js Performance Docs
- MDN Performance Guides

---

## Summary

Your template is already optimized with:
✅ Hardware-accelerated animations
✅ Viewport-based loading
✅ Passive scroll listeners
✅ Font optimization
✅ Reduced motion support
✅ Mobile-responsive animations

**Main areas to optimize when using:**
1. Add real images with next/image
2. Compress all images before upload
3. Test on real mobile devices
4. Monitor Core Web Vitals in production

**Target Performance:**
- Lighthouse Score: 90-100
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

Your landing page should achieve these targets with minimal additional optimization! 🚀
