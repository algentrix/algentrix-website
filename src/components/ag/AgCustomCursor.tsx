import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../../lib/gsap'

const INTERACTIVE_SEL =
  'a[href], button, input, textarea, select, label[for], [role="button"], [data-ag-cursor-hover]'

/**
 * Fine-pointer only: gold dot + lagging ring (see AG reference `App.jsx` Cursor).
 * Sets `ag-cursor-active` on the document element.
 */
export function AgCustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fine = window.matchMedia('(pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    initGSAP()
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const root = document.documentElement
    root.classList.add('ag-cursor-active')

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let hoverInteractive = false

    const setHover = (next: boolean) => {
      if (next === hoverInteractive) return
      hoverInteractive = next
      gsap.to(ring, {
        width: next ? 52 : 36,
        height: next ? 52 : 36,
        borderColor: next ? 'rgba(201,168,76,0.85)' : 'rgba(201,168,76,0.45)',
        duration: 0.22,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: next ? 1.2 : 1,
        duration: 0.18,
        ease: 'power2.out',
      })
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null
      if (el?.closest(INTERACTIVE_SEL)) setHover(true)
    }

    const onOut = (e: MouseEvent) => {
      const from = e.target as Element | null
      const to = e.relatedTarget as Element | null
      if (!from?.closest(INTERACTIVE_SEL)) return
      if (to?.closest(INTERACTIVE_SEL)) return
      setHover(false)
    }

    const tick = () => {
      gsap.set(dot, { x: mx, y: my, xPercent: -50, yPercent: -50 })
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      gsap.set(ring, { x: rx, y: ry, xPercent: -50, yPercent: -50 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, true)
    document.addEventListener('mouseout', onOut, true)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver, true)
      document.removeEventListener('mouseout', onOut, true)
      gsap.ticker.remove(tick)
      root.classList.remove('ag-cursor-active')
    }
  }, [])

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[99999]" aria-hidden>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-ag-gold"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-ag-gold/50"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}
