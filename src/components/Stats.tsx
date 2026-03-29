import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

const STATS = [
  { num: 150, suffix: '+', label: 'Projects Delivered', sub: 'Across 12 industries' },
  { num: 98, suffix: '%', label: 'Client Retention', sub: 'Year-over-year' },
  { num: 40, suffix: '+', label: 'Enterprise Clients', sub: 'Fortune-listed' },
  { num: 8, suffix: '+', label: 'Years of Excellence', sub: 'Since 2016' },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const numsRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return
    initGSAP()

    const section = sectionRef.current
    const cells = section.querySelectorAll<HTMLElement>('.stat-cell')

    const ctx = gsap.context(() => {
      STATS.forEach((s, i) => {
        const el = numsRef.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.fromTo(
          obj,
          { val: 0 },
          {
            val: s.num,
            duration: 2.2,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              once: true,
            },
            onUpdate() {
              el.textContent = `${Math.floor(obj.val)}${s.suffix}`
            },
            onComplete() {
              el.textContent = `${s.num}${s.suffix}`
            },
          }
        )
      })

      gsap.fromTo(
        cells,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-ag-deep border-b border-ag-gold/10 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-ag-gold/5 blur-[100px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-ag-gold-l/5 blur-[100px]" />
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-ag-gold/5 border border-ag-gold/10 max-w-[100vw]">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stat-cell relative overflow-hidden bg-ag-deep px-4 py-12 md:py-14 text-center opacity-0 group cursor-pointer transition-all duration-500 hover:bg-ag-navy/50"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08),transparent_70%)]"
              aria-hidden
            />
            <div className="absolute inset-0 border-t-2 border-ag-gold/0 group-hover:border-ag-gold/30 transition-all duration-500" />

            <span
              ref={(el) => {
                numsRef.current[i] = el;
              }}
              className="relative font-serif block text-[clamp(2rem,4vw,3.5rem)] font-black text-ag-gold leading-none mb-2.5 transition-all duration-300 group-hover:scale-105"
            >
              0{s.suffix}
            </span>
            <span className="relative font-sans text-[13px] font-semibold tracking-[0.04em] text-ag-off block mb-1 transition-colors duration-300 group-hover:text-ag-silver">
              {s.label}
            </span>
            <span className="relative font-sans text-[11px] text-ag-fog transition-colors duration-300 group-hover:text-ag-mist">{s.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
