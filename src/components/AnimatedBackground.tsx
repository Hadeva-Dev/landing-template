'use client'

import { useEffect, useState } from 'react'

// Animated background with soft gradients, blobs, and grid
export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Avoid SSR/CSR mismatches by rendering only after mount
  if (!mounted) return null

  // Calculate scroll progress (0 to 1) for smooth transitions
  const scrollProgress = Math.min(scrollY / 2000, 1)
  const midScrollProgress = Math.min(Math.max((scrollY - 1000) / 2000, 0), 1)
  const lateScrollProgress = Math.min(Math.max((scrollY - 2000) / 2000, 0), 1)

  return (
    <div className="background-animations">
      {/* Aurora gradient wash - smoothly transitions based on scroll */}
      <div
        className="absolute inset-0 animate-aurora-wave transition-opacity duration-1000"
        style={{
          background:
            'linear-gradient(120deg, rgba(99,102,241,0.08), rgba(139,92,246,0.07) 40%, rgba(217,70,239,0.06))',
          opacity: 1 - scrollProgress * 0.5,
        }}
      />

      {/* Diagonal gradient ribbons - smoothly fade and morph on scroll */}
      <div
        className="absolute -inset-x-20 -top-24 h-56 rotate-[-6deg] animate-ribbon-medium transition-all duration-1000"
        style={{
          background:
            'linear-gradient(90deg, rgba(16,185,129,0.12), rgba(56,189,248,0.12), rgba(99,102,241,0.12))',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          opacity: 1 - scrollProgress * 0.6,
          transform: `translateY(${scrollY * 0.3}px) rotate(-6deg)`,
        }}
      />
      <div
        className="absolute -inset-x-24 top-40 h-60 rotate-[8deg] animate-ribbon-slow animation-delay-3000 transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg,
            rgba(${99 + scrollProgress * 40}, ${102 - scrollProgress * 20}, ${241 - scrollProgress * 40}, ${0.10 + midScrollProgress * 0.05}),
            rgba(${139 - scrollProgress * 30}, ${92 + scrollProgress * 40}, ${246 - scrollProgress * 50}, 0.11),
            rgba(${236 - scrollProgress * 50}, ${72 + scrollProgress * 60}, ${153 + scrollProgress * 40}, 0.10))`,
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          opacity: 0.7 + midScrollProgress * 0.3,
          transform: `translateY(${scrollY * 0.2}px) rotate(8deg)`,
        }}
      />
      <div
        className="absolute -inset-x-16 top-80 h-40 rotate-[-10deg] animate-ribbon-fast animation-delay-6000 transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg,
            rgba(${34 + lateScrollProgress * 60}, ${211 - lateScrollProgress * 80}, ${238 - lateScrollProgress * 100}, 0.10),
            rgba(${99 + lateScrollProgress * 40}, ${102 + lateScrollProgress * 20}, ${241 - lateScrollProgress * 50}, 0.09),
            rgba(${139 - lateScrollProgress * 40}, ${92 + lateScrollProgress * 80}, ${246 - lateScrollProgress * 50}, 0.11))`,
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          opacity: 0.5 + lateScrollProgress * 0.5,
          transform: `translateY(${scrollY * 0.15}px) rotate(-10deg)`,
        }}
      />

      {/* Gradient blobs (indigo/violet/fuchsia) */}
      <div
        className="absolute -top-20 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl animate-seamless-flow"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(99,102,241,0.22), transparent 60%)',
          transform: `translateY(${scrollY * 0.06}px)`
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[38rem] h-[38rem] rounded-full blur-3xl animate-seamless-flow animation-delay-3000"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(139,92,246,0.2), transparent 60%)',
          transform: `translateY(${scrollY * 0.04}px)`
        }}
      />
      <div
        className="absolute bottom-[-8rem] left-1/3 w-[32rem] h-[32rem] rounded-full blur-3xl animate-seamless-flow animation-delay-6000"
        style={{
          background: 'radial-gradient(circle at 40% 60%, rgba(217,70,239,0.18), transparent 60%)',
          transform: `translateY(${scrollY * 0.02}px)`
        }}
      />
      {/* Teal/Cyan contrast blob */}
      <div
        className="absolute bottom-24 right-1/4 w-[24rem] h-[24rem] rounded-full blur-3xl animate-seamless-flow animation-delay-8000"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.14), transparent 60%)',
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      />

      {/* Fine grid overlay to add structure */}
      <div
        className="absolute inset-0 grid-bg opacity-[0.08]"
        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
      />

      {/* Gentle dotted field */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="absolute w-2 h-2 rounded-full bg-indigo-400/60 animate-floating-orb" style={{ top: '20%', left: '12%' }} />
        <div className="absolute w-2 h-2 rounded-full bg-violet-400/60 animate-floating-orb animation-delay-2000" style={{ top: '55%', left: '82%' }} />
        <div className="absolute w-2 h-2 rounded-full bg-fuchsia-400/60 animate-floating-orb animation-delay-4000" style={{ top: '35%', left: '68%' }} />
        <div className="absolute w-2 h-2 rounded-full bg-teal-400/60 animate-floating-orb animation-delay-6000" style={{ top: '72%', left: '28%' }} />
      </div>

      {/* Subtle flowing path accent */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <defs>
          <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d="M-100 150 Q 200 50 450 180 Q 650 280 850 160 Q 1050 40 1250 140 Q 1450 240 1700 120"
          stroke="url(#gradientLine)"
          strokeWidth="1.5"
          fill="none"
          className="animate-dynamic-flow"
        />
        {/* Secondary accent path with teal tint */}
        <path
          d="M-120 240 Q 180 120 420 230 Q 640 320 860 210 Q 1080 100 1300 200 Q 1520 300 1720 180"
          stroke="rgba(34,211,238,0.5)"
          strokeWidth="1"
          fill="none"
          className="animate-dynamic-flow"
          style={{ animationDuration: '20s' }}
        />
      </svg>

      {/* Subtle noise overlay for depth */}
      <div className="noise-overlay" />
    </div>
  )
}
