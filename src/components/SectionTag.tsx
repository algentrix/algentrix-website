import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

type SectionTagProps = {
  children: ReactNode
}
/** AG-style uppercase label with gold rule and fade-in animation */
export function SectionTag({ children }: SectionTagProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    initGSAP()

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }
    )
  }, [])

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-ag-gold font-sans opacity-0"
    >
      <span className="inline-block h-px w-6 bg-gradient-to-r from-ag-gold to-ag-gold-l" aria-hidden />
      <span className="relative after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-px after:bg-ag-gold-l after:opacity-50">
        {children}
      </span>
    </div>
  )
}
