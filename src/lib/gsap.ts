import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

let isRegistered = false

/**
 * Registers GSAP plugins safely.
 * Safe for SSR - only runs in browser.
 */
function registerPlugins(): void {
  if (typeof window === 'undefined') return
  if (isRegistered) return

  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)
  isRegistered = true
}

/**
 * Initialize GSAP with ScrollTrigger.
 * Call once when the app mounts (e.g. in a root component or main.tsx).
 * SSR-safe: no-op on server.
 */
export function initGSAP(): void {
  if (typeof window === 'undefined') return
  registerPlugins()
}

/**
 * Hook to initialize GSAP in useLayoutEffect.
 * Runs before paint, avoiding flash of un-animated content.
 * SSR-safe: no-op on server.
 */
export function useGSAP(): void {
  useLayoutEffect(() => {
    initGSAP()
  }, [])
}

/**
 * Get GSAP instance. Plugins must be registered first via initGSAP().
 */
export function getGSAP() {
  return gsap
}

/**
 * Get ScrollTrigger. Plugins must be registered first via initGSAP().
 */
export function getScrollTrigger() {
  return ScrollTrigger
}

export { gsap, ScrollTrigger }
