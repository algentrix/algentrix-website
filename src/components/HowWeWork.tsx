import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/useReveal'
import {
  HiMagnifyingGlass,
  HiPencilSquare,
  HiCpuChip,
  HiRocketLaunch,
} from 'react-icons/hi2'

const steps = [
  {
    icon: HiMagnifyingGlass,
    title: 'Discovery',
    desc: 'We analyze your business needs, challenges, and goals.',
  },
  {
    icon: HiPencilSquare,
    title: 'Design',
    desc: 'We architect the right solution for your context.',
  },
  {
    icon: HiCpuChip,
    title: 'Develop',
    desc: 'We build and implement with quality and care.',
  },
  {
    icon: HiRocketLaunch,
    title: 'Deploy',
    desc: 'We launch, support, and optimize ongoing.',
  },
]

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const lineForegroundRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { once: true })

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !stepsRef.current) return
    initGSAP()

    const section = sectionRef.current
    const stepEls = stepsRef.current.querySelectorAll<HTMLElement>('[data-step]')
    const iconEls = stepsRef.current.querySelectorAll<HTMLElement>('[data-step-icon]')
    const lineForeground = lineForegroundRef.current
    const dot = dotRef.current

    if (stepEls.length === 0) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: isDesktop ? 'top 25%' : 'top 40%',
          scrub: isDesktop ? 1.2 : 2,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })

      const activationPositions = [0.08, 0.33, 0.58, 0.83]
      const glowFilter = 'drop-shadow(0 0 10px rgba(0,255,136,0.7)) drop-shadow(0 0 20px rgba(0,255,136,0.4))'

      stepEls.forEach((el) => {
        gsap.set(el, { opacity: 0.45, scale: 0.92 })
      })
      iconEls.forEach((icon) => {
        if (isDesktop) gsap.set(icon, { filter: 'drop-shadow(0 0 0 transparent)' })
      })

      if (lineForeground && isDesktop) {
        tl.fromTo(
          lineForeground,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'none' },
          0
        )
      }
      if (dot && isDesktop) {
        tl.fromTo(
          dot,
          { left: '0%' },
          { left: '100%', duration: 1, ease: 'none' },
          0
        )
      }

      stepEls.forEach((el, i) => {
        const icon = iconEls[i]
        const pos = isDesktop ? activationPositions[i] : i * 0.2
        const duration = isDesktop ? 0.15 : 0.32

        tl.to(el, { opacity: 1, scale: 1, duration, ease: 'power2.out' }, pos)
        if (icon && isDesktop) {
          tl.to(icon, { filter: glowFilter, duration, ease: 'power2.out' }, pos)
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-28 md:py-32 px-8 overflow-hidden">
      <div className="absolute left-[20%] top-[30%] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-[15%] bottom-[20%] w-[250px] h-[250px] bg-accent-blue/15 blur-[100px] rounded-full pointer-events-none" />

      <div ref={headingRef} className="relative text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          How We <span className="text-accent-green">Work</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          A clear process from discovery to deployment
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Horizontal line from Discovery to Deploy - desktop only */}
        <div className="absolute hidden md:block left-0 right-0 top-8 h-0.5 z-0 overflow-visible" aria-hidden>
          <div className="absolute inset-0 bg-accent-green/20" />
          <div
            ref={lineForegroundRef}
            className="absolute left-0 top-0 h-full bg-accent-green/50"
            style={{ width: '0%' }}
          />
          <div
            ref={dotRef}
            className="absolute top-1/2 w-2.5 h-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-accent-green shadow-[0_0_12px_rgba(0,255,136,0.8)]"
            style={{ left: '0%' }}
            aria-hidden
          />
        </div>
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-0 relative"
        >
          {steps.map((step, i) => (
            <div key={i} className="relative flex md:flex-col">
              {/* Mobile: vertical connector line */}
              {i > 0 && (
                <div
                  className="absolute left-8 top-0 w-0.5 h-6 bg-accent-green/30 md:hidden -translate-y-full"
                  aria-hidden
                />
              )}
              <div
                data-step
                className="relative z-10 flex flex-row md:flex-col gap-6 md:gap-0 items-start md:items-center text-left md:text-center px-0 md:px-4 py-8 md:py-0 border-b md:border-b-0 border-white/5 last:border-b-0"
              >
                <div data-step-icon className="flex-shrink-0 w-16 h-16 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center">
                  <step.icon className="text-accent-green" size={28} />
                </div>
                <div className="flex-1 md:flex-initial pt-1">
                  <h3 className="text-lg font-semibold mb-2 text-white">{step.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
