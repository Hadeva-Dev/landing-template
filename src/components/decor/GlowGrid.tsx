'use client'
import { useEffect, useRef } from 'react'

export default function GlowGrid() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--x', ((e.clientX - r.left)/r.width*100)+'%')
      el.style.setProperty('--y', ((e.clientY - r.top)/r.height*100)+'%')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])
  return <div ref={ref} className="fixed inset-0 -z-10 grid-bg glow" />
}
