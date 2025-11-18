# Claude AI Context - Landing Page Template Documentation

This document provides comprehensive context for AI assistants working on this landing page template. It covers design philosophy, architecture decisions, customization points, and technical implementation details.

---

## Project Overview

This is a **modern, high-performance landing page template** built with Next.js 14, TypeScript, and Tailwind CSS. It's designed to be easily customizable and production-ready out of the box.

### Key Characteristics
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **UI Components**: shadcn/ui + custom Aceternity components
- **Authentication**: Supabase with Google OAuth
- **Deployment**: Optimized for Netlify/Vercel

---

## Design Philosophy

### 1. **Clean & Professional Aesthetic**
- Minimal color palette focused on grayscale with subtle gradients
- No overwhelming brand colors - designed to be a neutral template
- Professional look suitable for B2B, SaaS, or consumer products

### 2. **Performance First**
- Optimized animations with GPU acceleration
- Lazy loading for heavy components
- Efficient bundle size with tree-shaking
- Image optimization through Next.js

### 3. **User Experience Focus**
- Smooth scroll animations and micro-interactions
- Scroll progress indicator
- Back-to-top button for long pages
- Mobile-responsive throughout

### 4. **Customization-Ready**
- Placeholder content throughout ("Your Brand", "Your Product")
- Modular component structure
- Clear separation of concerns
- Well-documented customization points

---

## Architecture & File Structure

```
landing-hadeva/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main landing page
│   │   ├── privacy/page.tsx      # Privacy policy (generic)
│   │   ├── terms/page.tsx        # Terms of service (generic)
│   │   └── layout.tsx            # Root layout
│   ├── components/
│   │   ├── AnimatedBackground.tsx    # Background animations
│   │   ├── RadialFeatureDisplay.tsx  # How It Works section
│   │   ├── FAQ.tsx                   # FAQ accordion
│   │   ├── ScrollProgress.tsx        # UX enhancement
│   │   ├── BackToTop.tsx            # UX enhancement
│   │   ├── SocialShare.tsx          # Social sharing buttons
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   └── BrandLink.tsx
│   │   └── aceternity/              # Premium UI effects
│   │       ├── spotlight.tsx
│   │       └── background-beams.tsx
│   └── styles/
│       └── globals.css              # Global styles & animations
├── supabase/
│   ├── migrations/                  # Database setup
│   └── README.md                    # Supabase docs
├── public/
│   └── logo.png                     # Brand logo placeholder
└── Configuration files...
```

---

## Design System

### Color Palette

**Primary Colors** (Grayscale Base):
- Black: `#000000` - Primary text, buttons
- Dark Gray: `rgb(17, 24, 39)` - text-gray-900
- Medium Gray: `rgb(55, 65, 81)` - text-gray-700
- Light Gray: `rgb(75, 85, 99)` - text-gray-600
- Slate: `rgb(71, 85, 105)` - text-slate-600

**Accent Colors** (Subtle Gradients):
- Indigo: `#6366F1` - Gradient accents
- Violet: `#8B5CF6` - Gradient midpoints
- Fuchsia: `#D946EF` - Gradient highlights
- Emerald: `#10B981` - Success states
- Teal: `#22D3EE` - Contrast accents

**Background Effects**:
- Soft gradients with 0.05-0.20 opacity
- Multiple layered blobs for depth
- Parallax scrolling effects
- Glass morphism (backdrop-blur)

### Typography

**Font**: System font stack (optimized for performance)
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

**Hierarchy**:
- Hero Title: `text-8xl` (96px) - Ultra large, bold
- Section Headers: `text-6xl` (60px) - Large, attention-grabbing
- Subsections: `text-2xl` (24px) - Medium weight
- Body Text: `text-xl` (20px) - Comfortable reading
- UI Elements: `text-base` (16px) - Standard interface text

### Spacing System

Uses Tailwind's default spacing scale (4px increments):
- Sections: `py-24` (96px vertical padding)
- Cards: `p-8` (32px padding)
- Buttons: `px-6 py-2.5` (24px horizontal, 10px vertical)
- Grid gaps: `gap-8` (32px)

---

## Component Design Decisions

### 1. **AnimatedBackground** (formerly SkimlyBackground)

**Purpose**: Creates an engaging, dynamic background without being distracting

**Technical Implementation**:
- Multiple gradient blobs with different animation timings
- Diagonal ribbons with parallax scroll effects
- Fine grid overlay for subtle structure
- Floating orbs with independent animations
- SVG path animations for flowing lines
- Scroll-reactive transformations

**Performance Optimizations**:
- CSS transforms (GPU accelerated)
- `will-change` hints for smooth animations
- Parallax calculations throttled to scroll events
- Opacity transitions instead of color changes

**Customization Points**:
- Gradient colors in blob definitions
- Animation durations (15s, 20s, 25s cycles)
- Parallax scroll multipliers (0.02-0.08)
- Opacity values for intensity

### 2. **Navigation Bar**

**Design**:
- Fixed position with blur backdrop (`backdrop-blur-md`)
- Glass morphism effect (`bg-white/80`)
- Minimal with focus on CTA button

**Sign In Button**:
- Black gradient background (`from-gray-900 via-black to-gray-800`)
- Permanent glossy shine overlay (`from-white/50 via-white/20 to-white/5`)
- Hover shimmer animation (sweeping gradient)
- Rounded-full shape for modern look
- Scale animation on hover (1.05x)

**Rationale**: The prominent, glossy black button creates a strong visual anchor and clear call-to-action without competing with content.

### 3. **Hero Section**

**Structure**:
```
1. Hero Title (black text)
2. Emphasized Line (gradient text)
3. Subtitle (medium gray)
4. Description paragraph
5. CTA button
6. Feature pills
```

**Aceternity Spotlight**:
- Adds premium "spotlight" effect from top-left
- Subtle purple glow (`fill="rgba(99, 102, 241, 0.3)"`)
- Creates depth and draws attention to hero content

**Feature Pills**:
- Quick benefit highlights
- Icon + text combination
- Hover scale effect
- Glass morphism background

### 4. **Problem Section**

**Animation Strategy**:
- "Magnetic reveal" effect on scroll
- Three cards animate from different directions:
  - Left card: slides in from left with rotation
  - Center card: scales up from center
  - Right card: slides in from right with rotation
- Staggered delays (0.1s, 0.2s, 0.3s)

**Performance**:
- `viewport={{ once: true }}` - animate only on first view
- `backfaceVisibility: 'hidden'` - prevents flickering
- `willChange` hints for smooth transforms

### 5. **RadialFeatureDisplay**

**Design Pattern**: Circular/radial layout for "How It Works"
- Central hub with radiating feature nodes
- Orbital animation paths
- Connecting lines between elements
- Hover interactions on each node

**Purpose**: Unique visual alternative to standard step-by-step layouts

### 6. **Features Carousel**

**Implementation**: Embla Carousel (shadcn/ui)
- Auto-playing with 4-second intervals
- Loop enabled for continuous browsing
- Touch/swipe enabled on mobile
- Centered alignment
- Navigation arrows

**Cards**:
- Glass morphism background
- Icon placeholders (gradient squares)
- Title, subtitle, content structure
- Metric badges

### 7. **FAQ Section**

**Component**: Custom accordion
- Smooth expand/collapse animations
- Chevron rotation indicators
- Alternating card backgrounds for visual rhythm

### 8. **Get Started CTA**

**Aceternity Background Beams**:
- Animated light beam effects
- Dark background (`bg-gray-900/90`)
- Creates urgency and focus
- Premium feel

---

## Animation System

### Global Animations (globals.css)

**1. Aurora Wave**
```css
@keyframes aurora-wave {
  0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
  50% { opacity: 0.8; transform: scale(1.05) rotate(2deg); }
}
```
- Subtle pulsing effect for backgrounds
- 15s duration

**2. Ribbon Animations**
```css
animate-ribbon-slow (25s)
animate-ribbon-medium (20s)
animate-ribbon-fast (15s)
```
- Diagonal gradient ribbons
- Different speeds create depth

**3. Seamless Flow**
```css
@keyframes seamless-flow
```
- Continuous circular motion for blobs
- 25s duration with easing

**4. Floating Orbs**
```css
@keyframes floating-orb
```
- Vertical floating motion
- 6s duration with ease-in-out

**5. Dynamic Flow**
```css
@keyframes dynamic-flow
```
- SVG path animation (stroke-dashoffset)
- 30s continuous animation

### Framer Motion Variants

**Fade In Up**:
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```
- Standard entry animation
- Used for most content sections

**Staggered Children**:
```typescript
transition={{ delay: 0.1 * index }}
```
- Creates cascading effect
- Used in problem cards, feature pills

**Scroll-Triggered**:
```typescript
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```
- Animates when scrolling into view
- Performance: only animates once

---

## Technical Decisions

### 1. **Next.js App Router**

**Why**:
- Modern React Server Components
- Better performance with streaming
- Improved SEO capabilities
- Simpler data fetching patterns

**Trade-offs**:
- Newer API (less community examples)
- Some libraries need 'use client' directive

### 2. **Tailwind CSS**

**Why**:
- Rapid development
- Consistent design system
- Small bundle size (tree-shaking)
- Easy to customize

**Custom Configuration**:
```js
// Extended colors
colors: {
  sage: { /* custom green tones */ }
}

// Custom animations
animation: {
  'aurora-wave': 'aurora-wave 15s ease-in-out infinite',
  // ... more
}
```

### 3. **Framer Motion**

**Why**:
- Declarative animation API
- Great TypeScript support
- Performance optimized
- Scroll animations built-in

**Best Practices Used**:
- `layout` prop for smooth layout changes
- `whileHover`/`whileTap` for interactions
- `viewport={{ once: true }}` for performance
- Hardware-accelerated transforms

### 4. **shadcn/ui Components**

**Why**:
- Copy-paste components (not npm package)
- Full customization control
- Radix UI primitives (accessible)
- Tailwind-based styling

**Components Used**:
- Button
- Card
- Carousel
- (Easy to add more as needed)

### 5. **Supabase Authentication**

**Why**:
- Free tier generous
- Built-in auth UI
- Row Level Security
- Real-time capabilities
- PostgreSQL database

**Security Approach**:
- RLS enabled on all tables
- Users can only access own data
- Service role for privileged operations
- Automatic profile creation via triggers

---

## Performance Optimizations

### 1. **Image Optimization**
```js
// next.config.js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}
```

### 2. **Animation Performance**
- CSS transforms (GPU accelerated)
- `will-change` hints
- `backfaceVisibility: hidden`
- Reduced motion queries support

### 3. **Code Splitting**
- Dynamic imports for heavy components
- Route-based splitting (Next.js automatic)
- Lazy loading for below-fold content

### 4. **Bundle Optimization**
```js
poweredByHeader: false,
compress: true,
```

### 5. **Security Headers**
```js
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Customization Guide

### Quick Start: Rebrand the Template

**1. Update Branding** (15 minutes)
```typescript
// src/app/page.tsx
- Logo: Replace /public/logo.png
- Brand name: Search "Your Brand" and replace
- Colors: Update tailwind.config.ts
```

**2. Update Content** (30 minutes)
```typescript
// Hero section
- Hero title: "Your Hero Title"
- Subtitle: "With a Subtitle"
- Description paragraph

// Problem section (3 cards)
- Problem One, Two, Three

// How It Works (RadialFeatureDisplay)
- Features array

// Features carousel
- features array with titles/descriptions

// FAQ
- FAQ data array
```

**3. Configure Authentication** (20 minutes)
```bash
# Update environment variables
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-secret

# Run Supabase migrations
# See supabase/README.md
```

**4. Deploy** (10 minutes)
```bash
# Netlify
netlify deploy --prod

# Or Vercel
vercel --prod
```

### Advanced Customization

**Change Color Scheme**:
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        50: '#...',
        100: '#...',
        // ... full scale
      }
    }
  }
}
```

**Modify Animations**:
```css
/* globals.css */
@keyframes your-animation {
  /* keyframes */
}

.animate-your-animation {
  animation: your-animation 10s ease infinite;
}
```

**Add New Sections**:
```typescript
// src/app/page.tsx
<section className="py-24 px-4">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    {/* Your content */}
  </motion.div>
</section>
```

---

## Common Development Tasks

### Adding a New Page

```bash
# Create new route
mkdir src/app/about
touch src/app/about/page.tsx
```

```typescript
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About content</div>
}
```

### Adding shadcn/ui Component

```bash
npx shadcn-ui@latest add dialog
# Component added to src/components/ui/dialog.tsx
```

### Modifying Navigation

```typescript
// src/app/page.tsx - Line ~151
<div className="hidden md:flex items-center space-x-8">
  <a href="#features">Features</a>
  <a href="#pricing">Pricing</a>
  {/* Add more links */}
</div>
```

### Changing Background Colors

```typescript
// AnimatedBackground.tsx
// Modify blob gradients
style={{
  background: 'radial-gradient(circle, rgba(YOUR,COLORS,HERE,0.22), transparent 60%)'
}}
```

---

## Database Schema (Supabase)

### Tables

**public.profiles**
```sql
id UUID PRIMARY KEY (references auth.users)
email TEXT UNIQUE NOT NULL
full_name TEXT
avatar_url TEXT
created_at TIMESTAMP
updated_at TIMESTAMP
```

**public.google_oauth_users**
```sql
id UUID PRIMARY KEY
user_id UUID UNIQUE (references auth.users)
google_user_id TEXT UNIQUE
google_email TEXT
google_picture_url TEXT
connected_at TIMESTAMP
last_sign_in TIMESTAMP
```

**public.user_sessions**
```sql
id UUID PRIMARY KEY
user_id UUID (references auth.users)
ip_address INET
user_agent TEXT
sign_in_at TIMESTAMP
sign_out_at TIMESTAMP
is_active BOOLEAN
```

**public.failed_login_attempts**
```sql
id UUID PRIMARY KEY
email TEXT
ip_address INET
attempted_at TIMESTAMP
reason TEXT
```

### RLS Policies

All tables have Row Level Security enabled:
- Users can only access their own data
- Service role has full access
- failed_login_attempts has no public access

---

## Environment Variables

### Required for Production

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
OAUTH_REDIRECT_URI=https://yourdomain.com/auth/callback

# Optional
REQUIRE_WAITLIST_APPROVAL=false
ALLOW_INVITED_LOGIN=true
```

### Development

```env
# .env.local (not committed)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key
OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Update all "Your Brand" placeholders
- [ ] Replace logo.png with actual logo
- [ ] Customize colors in tailwind.config.ts
- [ ] Update privacy policy and terms of service
- [ ] Add actual FAQ content
- [ ] Configure Google OAuth in Supabase
- [ ] Run Supabase migrations
- [ ] Test authentication flow
- [ ] Update environment variables
- [ ] Test on mobile devices

### Netlify Deployment

```toml
# netlify.toml (already configured)
[build]
  command = "bun run build"
  publish = "out"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Performance Checks

- [ ] Lighthouse score > 90
- [ ] Images optimized (WebP/AVIF)
- [ ] No console errors
- [ ] Smooth animations (60fps)
- [ ] Fast Time to Interactive

---

## Known Limitations & Future Enhancements

### Current Limitations

1. **Authentication**: Only Google OAuth (email/password can be added)
2. **CMS**: No content management system (static content)
3. **Analytics**: No built-in analytics (add PostHog/Google Analytics)
4. **Internationalization**: English only (i18n can be added)
5. **Dark Mode**: Not implemented (design system supports it)

### Potential Enhancements

1. Add email/password authentication
2. Integrate PostHog analytics
3. Add blog section with MDX
4. Implement dark mode toggle
5. Add testimonials with real user data
6. Create admin dashboard
7. Add A/B testing framework
8. Implement waitlist with email notifications
9. Add more OAuth providers (GitHub, Apple)
10. Create component library documentation

---

## Troubleshooting

### Common Issues

**Issue**: Animations are choppy
- **Solution**: Check browser DevTools Performance tab, reduce `will-change` usage, disable animations on low-powered devices

**Issue**: Supabase RLS policies blocking queries
- **Solution**: Check auth.uid() matches user_id, verify policies in Supabase dashboard

**Issue**: OAuth redirect not working
- **Solution**: Verify redirect URIs match exactly in Google Cloud Console and Supabase

**Issue**: Build errors with Framer Motion
- **Solution**: Ensure components using Framer Motion have 'use client' directive

**Issue**: Tailwind classes not applying
- **Solution**: Check globals.css import order, run `npm run build` to regenerate CSS

---

## Code Style & Conventions

### React Components

```typescript
// Use functional components with TypeScript
export default function ComponentName() {
  // Hooks at top
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {}

  // Return JSX
  return <div>...</div>
}
```

### Naming Conventions

- **Components**: PascalCase (`AnimatedBackground.tsx`)
- **Functions**: camelCase (`handleSubmit`)
- **CSS Classes**: kebab-case via Tailwind
- **Files**: kebab-case for utilities, PascalCase for components

### TypeScript

- Use interfaces for props
- Avoid `any` type
- Use type inference where possible
- Export types when used across files

---

## Testing Strategy

### Recommended Tests (not implemented)

1. **Unit Tests**: Jest + React Testing Library
   - Component rendering
   - Event handlers
   - Utility functions

2. **Integration Tests**: Playwright/Cypress
   - User flows (sign up, sign in)
   - Form submissions
   - Navigation

3. **Visual Regression**: Percy/Chromatic
   - Ensure UI consistency
   - Catch unintended style changes

4. **Performance Tests**: Lighthouse CI
   - Monitor performance scores
   - Detect regressions

---

## Additional Resources

### Documentation Files

- `README.md` - Basic setup instructions
- `DEPLOYMENT.md` - Deployment guide
- `PERFORMANCE.md` - Performance optimization details
- `BACKGROUND-CUSTOMIZATION.md` - Background animation guide
- `UX-FEATURES.md` - UX enhancement documentation
- `SEO-SETUP.md` - SEO configuration
- `supabase/README.md` - Database setup

### External Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase](https://supabase.com/docs)

---

## Design Inspiration & Credits

### UI Component Libraries Used
- **shadcn/ui**: Core UI components
- **Aceternity UI**: Premium effects (Spotlight, Background Beams)
- **Lucide Icons**: Icon library

### Design Patterns
- **Glass Morphism**: Backdrop blur effects throughout
- **Gradient Accents**: Subtle color highlights
- **Micro-interactions**: Hover states, scale animations
- **Progressive Disclosure**: FAQ accordions, expandable sections

### Animation Inspiration
- Modern SaaS landing pages
- Apple product pages (smooth scrolling)
- Linear.app (clean animations)

---

## Conclusion

This template is designed to be a **solid foundation** for modern landing pages. It prioritizes:

1. **Performance**: Fast load times, smooth animations
2. **Security**: Proper RLS, authentication best practices
3. **Customizability**: Easy to rebrand and modify
4. **Developer Experience**: Clean code, good documentation
5. **User Experience**: Smooth interactions, clear CTAs

When working with this template, focus on:
- Keeping the clean aesthetic
- Maintaining performance optimizations
- Following established patterns
- Updating placeholder content with real data

The template is production-ready but should be customized to match your specific brand and product needs.

---

**Last Updated**: 2025-01-17
**Template Version**: 1.0.0
**Maintained By**: Development Team
