import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../../lib/gsap'

type AgMagneticFieldProps = {
  children: ReactNode
  className?: string
  /** 0.28 matches AG `MagBtn`; use lower for wide fields */
  strength?: number
}

/**
 * Same interaction as AG `MagBtn` in App.jsx: field shifts slightly toward the pointer,
 * then springs back with `elastic.out` on leave (reads as a subtle “shake” / wobble).
 */
export function AgMagneticField({
  children,
  className = '',
  strength = 0.16,
}: AgMagneticFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = rootRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      gsap.to(el, {
        x: dx * strength,
        y: dy * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    },
    [strength]
  )

  const onLeave = useCallback(() => {
    const el = rootRef.current
    if (!el) return
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    initGSAP()
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [onMove, onLeave])

  return (
    <div ref={rootRef} className={`ag-magnetic-field will-change-transform ${className}`}>
      {children}
    </div>
  )
}
