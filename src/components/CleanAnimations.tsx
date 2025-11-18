'use client'

import { useEffect, useState } from 'react'

export default function MinimalAnimations() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.008]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgb(99, 102, 241) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgb(156, 163, 175) 1px, transparent 0)
          `,
          backgroundSize: '60px 60px, 120px 120px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Very subtle flowing paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1400 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
          opacity: 0.012
        }}
      >
        <defs>
          <linearGradient id="subtleGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="subtleGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#475569" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        
        {/* Minimal curved paths */}
        <path
          d="M0 300 Q 350 200 700 300 Q 1050 400 1400 300"
          stroke="url(#subtleGradient1)"
          strokeWidth="1"
          fill="none"
        >
          <animate 
            attributeName="opacity" 
            values="0.5;1;0.5" 
            dur="20s" 
            repeatCount="indefinite"
          />
        </path>
        
        <path
          d="M0 500 Q 350 600 700 500 Q 1050 400 1400 500"
          stroke="url(#subtleGradient2)"
          strokeWidth="1"
          fill="none"
        >
          <animate 
            attributeName="opacity" 
            values="1;0.3;1" 
            dur="25s" 
            repeatCount="indefinite"
            begin="5s"
          />
        </path>
      </svg>

      {/* Barely visible floating dots */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      >
        <div 
          className="absolute w-1 h-1 bg-slate-400 rounded-full opacity-[0.018]"
          style={{
            top: '20%',
            left: '10%',
            animation: 'float 12s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-indigo-500 rounded-full opacity-[0.024]"
          style={{
            top: '60%',
            left: '80%',
            animation: 'float 15s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-slate-500 rounded-full opacity-[0.015]"
          style={{
            top: '30%',
            left: '70%',
            animation: 'float 18s ease-in-out infinite',
            animationDelay: '7s'
          }}
        />
      </div>

      {/* Ultra-subtle gradient overlay */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.006]"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgb(99, 102, 241) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgb(156, 163, 175) 0%, transparent 40%)
          `,
          transform: `translateY(${scrollY * 0.03}px) scale(1.1)`,
        }}
      />
    </div>
  )
}