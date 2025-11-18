'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Clock, Lock } from 'lucide-react'

const features = [
  {
    id: 1,
    title: 'Feature One',
    description: 'Brief description of your first key feature and how it helps your customers.',
    icon: Search,
    gradient: 'from-indigo-500 to-violet-500',
    color: 'indigo',
  },
  {
    id: 2,
    title: 'Feature Two',
    description: 'Brief description of your second key feature and how it helps your customers.',
    icon: FileText,
    gradient: 'from-violet-500 to-purple-500',
    color: 'violet',
  },
  {
    id: 3,
    title: 'Feature Three',
    description: 'Brief description of your third key feature and how it helps your customers.',
    icon: Clock,
    gradient: 'from-teal-500 to-cyan-500',
    color: 'teal',
  },
  {
    id: 4,
    title: 'Feature Four',
    description: 'Brief description of your fourth key feature and how it helps your customers.',
    icon: Lock,
    gradient: 'from-orange-500 to-pink-500',
    color: 'orange',
  },
]

export default function RadialFeatureDisplay() {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [rotation, setRotation] = useState(-90) // Start at -90 so first feature is on top
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleFeatureClick = (index: number) => {
    const currentIndex = selectedFeature
    const diff = index - currentIndex
    setRotation((prev) => prev + (diff * -90))
    setSelectedFeature(index)
  }

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of component is visible
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Auto-cycle through features - infinite rotation (only when visible)
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setSelectedFeature((prev) => (prev + 1) % features.length)
      setRotation((prev) => prev - 90) // Always rotate -90 degrees for infinite loop
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [isVisible])

  const radius = 270 // Distance from center

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto h-[800px] md:h-[900px] flex items-center justify-center px-4">
      {/* Center Display - Selected Feature Details */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFeature}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/40 max-w-sm text-center pointer-events-auto"
          >
            <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${features[selectedFeature].gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              {(() => {
                const Icon = features[selectedFeature].icon
                return <Icon className="w-10 h-10 text-white" />
              })()}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {features[selectedFeature].title}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              {features[selectedFeature].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rotating Circle with Feature Icons */}
      <motion.div
        className="relative w-full h-full z-10"
        animate={{ rotate: rotation }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          mass: 1
        }}
      >
        {features.map((feature, index) => {
          const angle = (index * 90 * Math.PI) / 180
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.button
              key={feature.id}
              onClick={() => handleFeatureClick(index)}
              className="absolute top-1/2 left-1/2 cursor-pointer group z-30"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotate the icon so it stays upright */}
              <motion.div
                animate={{ rotate: -rotation }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                  mass: 1
                }}
              >
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                    selectedFeature === index
                      ? 'ring-4 ring-white ring-offset-2 ring-offset-gray-100 scale-110'
                      : 'hover:shadow-xl'
                  }`}
                >
                  {(() => {
                    const Icon = feature.icon
                    return <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  })()}
                </div>

                {/* Feature label */}
                <div className="mt-3 w-max -ml-2">
                  <p className={`text-sm md:text-base font-semibold transition-colors duration-300 ${
                    selectedFeature === index ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {feature.title}
                  </p>
                </div>
              </motion.div>

            </motion.button>
          )
        })}

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20" />
      </motion.div>
    </div>
  )
}
