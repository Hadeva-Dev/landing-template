"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode
  duration?: number
  rx?: string
  ry?: string
  [key: string]: any
}) => {
  return (
    <button
      {...otherProps}
      className={cn(
        "relative bg-transparent p-[1px] overflow-hidden",
        otherProps.className
      )}
    >
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          style={{
            background: `
              linear-gradient(
                90deg,
                #a78bfa,
                #c084fc,
                #e879f9,
                #f472b6,
                #fb7185
              )
            `,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <div className="relative bg-slate-900 rounded-[inherit] p-4">
        {children}
      </div>
    </button>
  )
}

export const BorderBeam = ({
  size = 200,
  duration = 15,
  delay = 9,
  borderWidth = 2,
  colorFrom = "#a78bfa",
  colorTo = "#e879f9",
}: {
  size?: number
  duration?: number
  delay?: number
  borderWidth?: number
  colorFrom?: string
  colorTo?: string
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${colorFrom}, ${colorTo})`,
          borderRadius: "inherit",
          opacity: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "linear",
        }}
      />
    </div>
  )
}
