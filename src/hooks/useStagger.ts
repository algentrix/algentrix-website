import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

export interface UseStaggerOptions {
  /** Delay between each child (seconds) */
  stagger?: number
  /** Delay before first child animates (seconds) */
  delay?: number
  /** Animation duration per element (seconds) */
  duration?: number
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string
  /** ScrollTrigger end position */
  end?: string
  /** Y offset for initial position (default: 30) */
  y?: number
  /** Run animation once or reverse on scroll up (default: true) */
  once?: boolean
  /** Child selector - animate direct children by default */
  selector?: string
}

const DEFAULT_OPTIONS: Required<Omit<UseStaggerOptions, 'selector'>> & Pick<UseStaggerOptions, 'selector'> = {
  stagger: 0.1,
  delay: 0,
  duration: 0.5,
  start: 'top 85%',
  end: 'bottom 15%',
  y: 30,
  once: true,
  selector: '',
}

/**
 * Animate a list of elements with stagger effect on scroll.
 * Targets container's children (or selector). Cleans up on unmount.
 */
export function useStagger<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseStaggerOptions = {}
): void {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const el = ref.current
    if (!el) return

    initGSAP()

    const targets = opts.selector ? el.querySelectorAll<HTMLElement>(opts.selector) : el.children

    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: opts.y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: opts.duration,
          delay: opts.delay,
          stagger: opts.stagger,
          ease: 'power3.out',
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
  }, [ref, opts.stagger, opts.delay, opts.duration, opts.start, opts.end, opts.y, opts.once, opts.selector])
}
