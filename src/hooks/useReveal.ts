import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

export interface UseRevealOptions {
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animation duration (seconds) */
  duration?: number
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string
  /** ScrollTrigger end position */
  end?: string
  /** Y offset for initial position (default: 40) */
  y?: number
  /** Run animation once or reverse on scroll up (default: true) */
  once?: boolean
  /** Easing function (default: 'power3.out') */
  ease?: string
}

const DEFAULT_OPTIONS: Required<UseRevealOptions> = {
  delay: 0,
  duration: 0.6,
  start: 'top 85%',
  end: 'bottom 15%',
  y: 40,
  once: true,
  ease: 'power3.out',
}

/**
 * Fade + upward reveal animation triggered on scroll.
 * Cleans up ScrollTrigger and tweens on unmount.
 */
export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseRevealOptions = {}
): void {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const el = ref.current
    if (!el) return

    initGSAP()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: opts.y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: opts.duration,
          delay: opts.delay,
          ease: opts.ease as gsap.EaseString,
          scrollTrigger: {
            trigger: el,
            start: opts.start,
            end: opts.end,
            toggleActions: opts.once ? 'play none none none' : 'play none none reverse',
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        }
      )
    }, el)

    return () => {
      ctx.revert()
    }
  }, [ref, opts.delay, opts.duration, opts.start, opts.end, opts.y, opts.once, opts.ease])
}
