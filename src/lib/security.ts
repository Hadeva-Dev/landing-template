/**
 * Client-Side Security Protections
 * Prevents common console injection and debugging attacks
 */

// Disable console methods in production
export function disableConsoleInProduction() {
  if (process.env.NODE_ENV === 'production') {
    const noop = () => {}
    const consoleProxy = new Proxy(console, {
      get(target, prop) {
        // Allow errors to be logged
        if (prop === 'error' || prop === 'warn') {
          return target[prop as keyof Console]
        }
        return noop
      }
    })

    Object.defineProperty(window, 'console', {
      value: consoleProxy,
      writable: false,
      configurable: false
    })
  }
}

// Detect and warn about DevTools
export function detectDevTools() {
  if (process.env.NODE_ENV === 'production') {
    const threshold = 160
    let devtoolsOpen = false

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      const orientation = widthThreshold ? 'vertical' : 'horizontal'

      if (!(heightThreshold && widthThreshold) &&
          ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
           widthThreshold || heightThreshold)) {
        if (!devtoolsOpen) {
          devtoolsOpen = true
          console.warn('%cStop!', 'color: red; font-size: 40px; font-weight: bold;')
          console.warn('%cThis is a browser feature intended for developers.', 'font-size: 18px;')
          console.warn('%cIf someone told you to copy-paste something here, it is a scam.', 'font-size: 16px;')
          console.warn('%cPasting anything here could give attackers access to your account.', 'font-size: 16px; color: red;')
        }
      } else {
        devtoolsOpen = false
      }
    }

    setInterval(checkDevTools, 1000)
  }
}

// Prevent common injection patterns
export function preventConsoleInjection() {
  if (process.env.NODE_ENV === 'production') {
    // Disable eval
    Object.defineProperty(window, 'eval', {
      value: function() {
        throw new Error('eval() is disabled for security reasons')
      },
      writable: false,
      configurable: false
    })

    // Disable Function constructor
    const OriginalFunction = window.Function
    Object.defineProperty(window, 'Function', {
      value: function(...args: any[]) {
        throw new Error('Function constructor is disabled for security reasons')
      },
      writable: false,
      configurable: false
    })

    // Prevent setTimeout/setInterval with string arguments
    const originalSetTimeout = window.setTimeout
    const originalSetInterval = window.setInterval

    window.setTimeout = function(handler: any, ...args: any[]) {
      if (typeof handler === 'string') {
        throw new Error('setTimeout with string is disabled for security reasons')
      }
      return originalSetTimeout(handler, ...args)
    } as typeof setTimeout

    window.setInterval = function(handler: any, ...args: any[]) {
      if (typeof handler === 'string') {
        throw new Error('setInterval with string is disabled for security reasons')
      }
      return originalSetInterval(handler, ...args)
    } as typeof setInterval
  }
}

// Disable right-click (optional - can be annoying for users)
export function disableRightClick() {
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      return false
    })
  }
}

// Disable keyboard shortcuts for DevTools
export function disableDevToolsShortcuts() {
  if (process.env.NODE_ENV === 'production') {
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        return false
      }
      // Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
      // Ctrl+S
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault()
        return false
      }
    })
  }
}

// Obfuscate sensitive data in HTML
export function sanitizeHTML() {
  if (process.env.NODE_ENV === 'production') {
    // Remove comments
    const comments = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_COMMENT,
      null
    )
    const commentNodes: Node[] = []
    let currentNode = comments.nextNode()
    while (currentNode) {
      commentNodes.push(currentNode)
      currentNode = comments.nextNode()
    }
    commentNodes.forEach(node => node.remove())
  }
}

// Prevent debugger statements
export function preventDebugger() {
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      // This creates a performance penalty if debugger is open
      const start = performance.now()
      debugger
      const end = performance.now()

      if (end - start > 100) {
        // Debugger detected
        window.location.href = '/'
      }
    }, 1000)
  }
}

// Initialize all security measures
export function initializeSecurity(options: {
  disableConsole?: boolean
  detectDevTools?: boolean
  preventInjection?: boolean
  disableRightClick?: boolean
  disableShortcuts?: boolean
  sanitizeHTML?: boolean
  preventDebugger?: boolean
} = {}) {
  const {
    disableConsole: shouldDisableConsole = true,
    detectDevTools: shouldDetectDevTools = true,
    preventInjection: shouldPreventInjection = true,
    disableRightClick: shouldDisableRightClick = false, // Can be annoying for users
    disableShortcuts: shouldDisableShortcuts = false,  // Can be annoying for users
    sanitizeHTML: shouldSanitizeHTML = true,
    preventDebugger: shouldPreventDebugger = false    // Can cause performance issues
  } = options

  if (shouldDisableConsole) disableConsoleInProduction()
  if (shouldDetectDevTools) detectDevTools()
  if (shouldPreventInjection) preventConsoleInjection()
  if (shouldDisableRightClick) disableRightClick()
  if (shouldDisableShortcuts) disableDevToolsShortcuts()
  if (shouldSanitizeHTML) sanitizeHTML()
  if (shouldPreventDebugger) preventDebugger()
}

// TypeScript declarations
declare global {
  interface Window {
    Firebug?: {
      chrome?: {
        isInitialized?: boolean
      }
    }
  }
}

export default initializeSecurity
