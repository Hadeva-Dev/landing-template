import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from '@/components/ui/Toaster'
import SecurityProvider from '@/components/SecurityProvider'

const inter = Inter({ subsets: ["latin"] });

/**
 * SEO METADATA TEMPLATE
 *
 * CUSTOMIZE THESE VALUES for your specific project:
 * 1. Update title, description, keywords
 * 2. Replace "Your Brand" with actual brand name
 * 3. Update metadataBase with your production URL
 * 4. Add proper social media handles (@yourhandle)
 * 5. Update image paths to your actual OG images (1200x630px recommended)
 */
export const metadata: Metadata = {
  title: "Your Brand - Landing Page Template",
  description: "A beautiful, modern landing page template with animations and SEO optimization. Customize this description for your product or service.",
  keywords: "landing page, template, saas, product, service, startup",
  authors: [{ name: "Your Brand" }],
  creator: "Your Brand",
  publisher: "Your Brand",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Your Brand - Landing Page Template",
    description: "A beautiful, modern landing page template with animations and SEO optimization. Customize this description for your product or service.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: "Your Brand",
    images: [
      {
        url: "/og-image.png", // Create a 1200x630px image
        width: 1200,
        height: 630,
        alt: "Your Brand - Landing Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Brand - Landing Page Template",
    description: "A beautiful, modern landing page template with animations and SEO optimization.",
    images: ["/og-image.png"],
    creator: "@yourbrand", // Update with your Twitter handle
    site: "@yourbrand",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data (Schema.org JSON-LD) - Customize for your product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Your Brand",
              "description": "Brief description of your organization or product",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
              "sameAs": [
                "https://twitter.com/yourbrand",
                "https://linkedin.com/company/yourbrand",
                "https://github.com/yourbrand"
              ]
            })
          }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <SecurityProvider />
        <ToasterProvider>
          {children}
        </ToasterProvider>
      </body>
    </html>
  );
}
