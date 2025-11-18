'use client'

import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ChevronRight, Menu, X, Sparkles, Rocket, Target } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import AnimatedBackground from '@/components/AnimatedBackground'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Spotlight } from '@/components/aceternity/spotlight'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'

// Dynamic imports for heavy components (code splitting)
const BackgroundBeams = dynamic(() => import('@/components/aceternity/background-beams').then(mod => ({ default: mod.BackgroundBeams })), { ssr: false })
const RadialFeatureDisplay = dynamic(() => import('@/components/RadialFeatureDisplay'), { ssr: false })
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false })

/**
 * TEMPLATE LANDING PAGE
 *
 * Customization Guide:
 * 1. Update branding (logo, company name, colors)
 * 2. Replace placeholder text with your content
 * 3. Customize color gradients in tailwind.config.ts
 * 4. Update feature icons and descriptions
 * 5. Configure waitlist form behavior
 * 6. Update footer links (privacy, terms)
 */

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isWaitlistExpanded, setIsWaitlistExpanded] = useState(false)
  const [carouselApi, setCarouselApi] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    school: '',
    gradeLevel: '',
    graduationYear: '',
    intendedMajor: '',
    scholarshipGoals: ''
  })

  const features = [
    {
      title: "Feature Highlight One",
      subtitle: "Benefit Category",
      content: "Detailed explanation of how this feature helps your customers achieve their goals.",
      metric: "Key metric"
    },
    {
      title: "Feature Highlight Two",
      subtitle: "Another Benefit",
      content: "Explanation of the second major benefit and how it solves customer problems.",
      metric: "Success metric"
    },
    {
      title: "Feature Highlight Three",
      subtitle: "Third Benefit",
      content: "Description of the third compelling reason to choose your product or service.",
      metric: "Result metric"
    }
  ]

  useEffect(() => {
    if (!carouselApi) return

    carouselApi.on("select", () => {
      setCurrentTestimonial(carouselApi.selectedScrollSnap())
    })

    // Auto-play
    const autoplay = setInterval(() => {
      carouselApi.scrollNext()
    }, 4000)

    return () => clearInterval(autoplay)
  }, [carouselApi])

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    if (!isWaitlistExpanded) {
      // First click - expand the form
      setIsWaitlistExpanded(true)
      setFormData(prev => ({ ...prev, email }))
      setIsSubmitting(false)
      return
    }

    // Simulate submission without backend
    setTimeout(() => {
      setMessage('Thank you for your interest! We\'ll be in touch soon.')
      setEmail('')
      setFormData({
        email: '',
        fullName: '',
        school: '',
        gradeLevel: '',
        graduationYear: '',
        intendedMajor: '',
        scholarshipGoals: ''
      })
      setIsWaitlistExpanded(false)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen relative">
      {/* UX Enhancements */}
      <ScrollProgress />
      <BackToTop />

      {/* Animated Background */}
      <AnimatedBackground />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center"
                >
                  {/* Using next/image for optimized loading */}
                  <Image
                    src="/logo.png"
                    alt="Your Brand logo"
                    width={40}
                    height={40}
                    className="object-contain"
                    priority
                  />
                  <span className="text-2xl font-semibold tracking-tight text-black">Your Brand</span>
                </motion.div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <a href="/signin" className="px-6 py-2.5 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:via-gray-900 hover:to-black relative overflow-hidden group">
                  <span className="relative z-10">Sign In</span>
                  {/* Permanent intense shine covering more area */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-white/5 opacity-70"></div>
                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </a>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden bg-white border-t border-gray-100"
              >
                <div className="px-4 py-4 space-y-3">
                  <a href="#get-started" className="block py-2 text-gray-600">Get Started</a>
                  <a
                    href="/signin"
                    className="block w-full text-center px-6 py-3 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-gray-800 hover:via-gray-900 hover:to-black relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign In</span>
                    {/* Permanent shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-white/5 opacity-70"></div>
                    {/* Hover shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </a>
                </div>
              </motion.div>
            )}
        </div>
      </nav>

      {/* Hero Section (fluid) with Aceternity Spotlight */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Aceternity Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="rgba(99, 102, 241, 0.3)"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight text-gray-900">
              <span className="block">Your Hero Title</span>
              <span className="block text-gradient-primary">Goes Here</span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-gray-700 mt-2">
                With a Subtitle
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Compelling description of your product or service goes here.
            </p>
          </motion.div>

          {/* Dashboard Preview Image */}
          {false && (<motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-24 flex justify-center relative"
          >
            {/* Very subtle glow behind preview to keep it integrated */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/10 via-violet-200/10 to-fuchsia-200/10 blur-3xl" />
            <div className="relative max-w-6xl w-full">
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-white/30 px-6 py-4 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-black">Dashboard Preview</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Live Demo</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left side - Usage metrics */}
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl p-6 transition-all duration-200 bg-white/40 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br from-emerald-100 to-green-100">
                              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-600">Applications</p>
                              <p className="text-3xl font-bold text-slate-900">23</p>
                              <div className="flex items-center text-sm text-emerald-600 font-medium">
                                <span className="mr-1">↗</span>
                                <span>+4 this week</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-xl p-6 transition-all duration-200 bg-white/40 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br from-sage-100 to-emerald-100">
                              <svg className="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-600">Awards Found</p>
                              <p className="text-3xl font-bold text-gradient-primary">$47K</p>
                              <div className="flex items-center text-sm text-emerald-600 font-medium">
                                <span className="mr-1">↗</span>
                                <span>12 matches</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 border border-white/20">
                        <h4 className="font-bold text-slate-900 mb-4">Application Progress</h4>
                        <div className="h-36 bg-white rounded-lg border border-emerald-200/40 shadow-inner">
                          {/* Enhanced SVG Chart */}
                          <svg className="w-full h-full p-2" viewBox="0 0 200 80" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.18"/>
                                <stop offset="50%" stopColor="#059669" stopOpacity="0.12"/>
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
                              </linearGradient>
                              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#10B981"/>
                                <stop offset="50%" stopColor="#059669"/>
                                <stop offset="100%" stopColor="#10B981"/>
                              </linearGradient>
                              <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            </defs>
                            {/* Grid lines */}
                            <line x1="0" y1="20" x2="200" y2="20" stroke="#E5E7EB" strokeWidth="1"/>
                            <line x1="0" y1="40" x2="200" y2="40" stroke="#E5E7EB" strokeWidth="1"/>
                            <line x1="0" y1="60" x2="200" y2="60" stroke="#E5E7EB" strokeWidth="1"/>
                            {/* Chart line with glow */}
                            <path d="M0 70 L25 65 L50 45 L75 35 L100 25 L125 30 L150 20 L175 15 L200 10" 
                                  stroke="url(#lineGradient)" strokeWidth="3" fill="none" filter="url(#glow)"/>
                            {/* Chart area fill */}
                            <path d="M0 70 L25 65 L50 45 L75 35 L100 25 L125 30 L150 20 L175 15 L200 10 L200 80 L0 80 Z" 
                                  fill="url(#chartGradient)"/>
                            {/* Enhanced data points */}
                            <circle cx="25" cy="65" r="3" fill="#10B981" stroke="white" strokeWidth="2"/>
                            <circle cx="50" cy="45" r="3" fill="#059669" stroke="white" strokeWidth="2"/>
                            <circle cx="75" cy="35" r="3" fill="#10B981" stroke="white" strokeWidth="2"/>
                            <circle cx="100" cy="25" r="3" fill="#059669" stroke="white" strokeWidth="2"/>
                            <circle cx="125" cy="30" r="3" fill="#10B981" stroke="white" strokeWidth="2"/>
                            <circle cx="150" cy="20" r="3" fill="#059669" stroke="white" strokeWidth="2"/>
                            <circle cx="175" cy="15" r="3" fill="#10B981" stroke="white" strokeWidth="2"/>
                            <circle cx="200" cy="10" r="3" fill="#059669" stroke="white" strokeWidth="2"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Recent activity */}
                    <div className="space-y-8">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl p-6 transition-all duration-200 bg-white/40 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br from-teal-100 to-cyan-100">
                              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-600">Deadlines</p>
                              <p className="text-3xl font-bold text-slate-900">8</p>
                              <div className="flex items-center text-sm text-amber-600 font-medium">
                                <span className="mr-1">⚠</span>
                                <span>Next: 5 days</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-xl p-6 transition-all duration-200 bg-white/40 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm bg-gradient-to-br from-blue-100 to-indigo-100">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-600">Essays Written</p>
                              <p className="text-3xl font-bold text-slate-900">12</p>
                              <div className="flex items-center text-sm text-blue-600 font-medium">
                                <span className="mr-1">✓</span>
                                <span>3 reviewed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50/60 via-green-50/50 to-teal-50/40 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-emerald-200/40">
                        <h4 className="font-bold text-slate-900 mb-4">Recent Activity</h4>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-green-50/50 transition-colors">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-700 font-medium">Essay submitted</span>
                            <span className="text-gray-500 ml-auto">2 min ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">New scholarship match</span>
                            <span className="text-gray-500 ml-auto">15 min ago</span>
                          </div>
                          <div className="flex items-center space-x-3 text-sm p-2 rounded-lg hover:bg-emerald-50/50 transition-colors">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span className="text-gray-700 font-medium">Application completed</span>
                            <span className="text-gray-500 ml-auto">1 hour ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>)}
          
          {/* Waitlist Button - Using shadcn/ui Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Button
              size="lg"
              className="px-10 py-7 text-lg rounded-full shadow-lg hover:shadow-xl"
              asChild
            >
              <Link href="#get-started" className="inline-flex items-center">
                Get Started
                <ChevronRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 flex flex-wrap justify-center gap-8 text-gray-600"
          >
            {/* Quick Benefits Pills - Customize icons and text */}
            <motion.div
              className="flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-white/40"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-600" />
              </div>
              <span className="font-medium text-gray-800">Feature Benefit One</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-white/40"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-sm">
                <Rocket className="w-4 h-4 text-green-600" />
              </div>
              <span className="font-medium text-gray-800">Feature Benefit Two</span>
            </motion.div>
            <motion.div
              className="flex items-center space-x-3 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-white/40"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-medium text-gray-800">Feature Benefit Three</span>
          </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Problem{' '}
              <span className="text-gray-800">We Solve</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Description of the pain points your customers face
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* OPTIMIZED MAGNETIC REVEAL - Hardware accelerated with will-change */}
            <motion.div
              initial={{ opacity: 0, x: -60, y: 30, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad for smooth deceleration
              }}
              viewport={{ once: true }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">Problem One</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Description of the first major problem your customers encounter.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">Problem Two</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Description of the second major challenge they face.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, y: 30, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true }}
              style={{
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-md border border-white/20 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">Problem Three</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Description of the third pain point that needs solving.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works - Circular/Radial Layout */}
      <section id="solution" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 relative z-10"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Simple explanation of your solution and how it helps customers.
            </p>
          </motion.div>

          {/* Circular/Radial Feature Layout */}
          <div className="-mt-16">
            <RadialFeatureDisplay />
          </div>

        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
                Our Product
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Key reasons why customers love what we offer
            </p>
          </motion.div>

          {/* Embla Carousel Implementation - Auto-sliding */}
          <div className="max-w-5xl mx-auto relative z-10">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <Card className="bg-white/60 backdrop-blur-md border-white/20 shadow-lg">
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-2xl flex items-center justify-center shadow-sm">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg"></div>
                          </div>
                        </div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-lg sm:text-xl text-indigo-600 font-semibold">
                          {feature.subtitle}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                          {feature.content}
                        </p>
                        <div className="inline-flex items-center px-5 py-2.5 bg-white text-gray-900 rounded-full text-lg font-bold border-2 border-gray-200 shadow-sm">
                          {feature.metric}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Get Started CTA Section with Aceternity Background Beams */}
      <section id="get-started" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900/90 rounded-3xl p-16 text-center text-white relative overflow-hidden shadow-xl"
          >
            {/* Aceternity Background Beams */}
            <BackgroundBeams className="absolute inset-0 opacity-40" />
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
                Ready to Get Started?
              </h2>
              <p className="text-xl sm:text-2xl mb-12 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Start using our product today and transform the way you work
              </p>

              <motion.a
                href="https://app.example.com/signup"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white text-indigo-600 font-bold text-lg rounded-full hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center"
              >
                Get Started
                <ChevronRight className="ml-2 w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            </div>
            <p className="text-center text-gray-600">&copy; 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
