import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

export interface UseParallaxOptions {
  /** Vertical movement amount in pixels (positive = down on scroll) */
  speed?: number
  /** ScrollTrigger start position (default: 'top bottom') */
  start?: string
  /** ScrollTrigger end position (default: 'bottom top') */
  end?: string
  /** Link animation progress to scroll (default: true) */
  scrub?: boolean | number
}

const DEFAULT_OPTIONS: Required<UseParallaxOptions> = {
  speed: 50,
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
}

/**
 * Subtle vertical parallax movement linked to scroll.
 * Uses scrub for smooth scroll-linked animation. Cleans up on unmount.
 */
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseParallaxOptions = {}
): void {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const el = ref.current
    if (!el) return

    initGSAP()

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: opts.speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: opts.start,
          end: opts.end,
          scrub: opts.scrub,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })
    }, el)

    return () => {
      ctx.revert()
    }
  }, [ref, opts.speed, opts.start, opts.end, opts.scrub])
}
