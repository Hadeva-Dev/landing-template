'use client'

import { useEffect } from 'react'
import initializeSecurity from '@/lib/security'

/**
 * SecurityProvider Component
 * Initializes client-side security protections on mount
 */
export default function SecurityProvider() {
  useEffect(() => {
    // Initialize security measures
    initializeSecurity({
      disableConsole: true,        // Disable console.log in production
      detectDevTools: true,         // Warn users about DevTools
      preventInjection: true,       // Block eval() and Function()
      disableRightClick: false,     // Don't disable right-click (annoying for users)
      disableShortcuts: false,      // Don't disable shortcuts (annoying for users)
      sanitizeHTML: true,           // Remove HTML comments
      preventDebugger: false        // Don't use debugger detection (performance hit)
    })
  }, [])

  // This component doesn't render anything
  return null
}
