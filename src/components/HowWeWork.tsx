import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import { SectionTag } from './SectionTag'

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    title: 'Discovery',
    desc: 'Deep dive into your business objectives, challenges, and existing systems. We analyze requirements, identify opportunities, and define clear success metrics.',
    number: '01',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    title: 'Design',
    desc: 'Architect scalable solutions tailored to your context. We create detailed technical specs, wireframes, and implementation roadmaps aligned with your goals.',
    number: '02',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4" />
        <path d="M14 12h4" />
        <path d="M12 6v4" />
        <path d="M12 14v2" />
      </svg>
    ),
    title: 'Develop',
    desc: 'Build with precision using modern tech stacks. Agile development, continuous integration, and rigorous testing ensure high-quality, maintainable code.',
    number: '03',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Deploy & Scale',
    desc: 'Launch with confidence. We handle deployment, monitoring, and provide ongoing support. Iterate based on real-world performance and user feedback.',
    number: '04',
  },
]

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = () => setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return
    initGSAP()
    const section = sectionRef.current
    const heading = headingRef.current

    const ctx = gsap.context(() => {
      // Heading animation
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !stepsRef.current) return
    initGSAP()

    const section = sectionRef.current
    const stepsContainer = stepsRef.current
    const stepCards = stepsContainer.querySelectorAll<HTMLElement>('[data-step-card]')
    const lineForeground = timelineRef.current?.querySelector<HTMLElement>('.timeline-progress')
    const dot = timelineRef.current?.querySelector<HTMLElement>('.timeline-dot')

    if (stepCards.length === 0) return

    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches

      // Set initial states
      stepCards.forEach((card) => {
        gsap.set(card, { opacity: 0.4, scale: 0.95, y: 30 })
      })

      if (isDesktop && lineForeground && dot) {
        // Desktop: Animated timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 20%',
            scrub: 1.5,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const progress = self.progress
              const activeIndex = Math.floor(progress * steps.length)
              setActiveStep(Math.max(0, Math.min(activeIndex, steps.length - 1)))
            },
          },
        })

        // Animate line progress
        tl.fromTo(
          lineForeground,
          { width: '0%' },
          { width: '100%', duration: 1, ease: 'none' },
          0
        )

        // Animate dot movement
        tl.fromTo(
          dot,
          { left: '0%' },
          { left: '100%', duration: 1, ease: 'none' },
          0
        )

        // Animate each step
        stepCards.forEach((card, i) => {
          const pos = 0.1 + i * 0.25
          tl.to(card, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: 'power3.out',
          }, pos)
        })

        return () => tl.kill()
      } else {
        // Mobile: Simple staggered animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })

        stepCards.forEach((card, i) => {
          tl.to(
            card,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            i * 0.15
          )
        })

        return () => tl.kill()
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden bg-ag-void"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-[10%] top-[20%] w-72 h-72 bg-ag-gold/5 blur-[120px] rounded-full animate-pulse"
          style={{ animationDuration: '10s' }}
        />
        <div
          className="absolute right-[10%] bottom-[20%] w-64 h-64 bg-ag-gold-l/5 blur-[100px] rounded-full animate-pulse"
          style={{ animationDuration: '12s' }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20">
          <div className="mb-6 inline-block">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-6 bg-gradient-to-r from-transparent to-ag-gold" />
              <span className="text-ag-gold text-xs font-mono uppercase tracking-[0.25em]">
                Our Process
              </span>
              <div className="h-px w-6 bg-gradient-to-l from-transparent to-ag-gold" />
            </div>
            <SectionTag>How We Work</SectionTag>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
            From Concept to
            <br />
            <span className="text-gradient-accent">Reality</span>
          </h2>

          <p className="text-ag-silver text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A structured, collaborative approach that transforms your vision into measurable outcomes.
          </p>
        </div>

        {/* Desktop Timeline */}
        {!isMobile && (
          <div
            ref={timelineRef}
            className="hidden md:block absolute left-0 right-0 top-[160px] h-0.5 z-0 overflow-visible"
            aria-hidden
          >
            <div className="absolute inset-0 bg-ag-gold/10" />
            <div
              className="timeline-progress absolute left-0 top-0 h-full bg-gradient-to-r from-ag-gold via-ag-gold-l to-ag-gold origin-left"
              style={{ width: '0%' }}
            />
            <div
              className="timeline-dot absolute top-1/2 w-3 h-3 -translate-y-1/2 -translate-x-1/2 rounded-full bg-ag-gold shadow-[0_0_20px_rgba(201,168,76,0.9)]"
              style={{ left: '0%' }}
            />
          </div>
        )}

        {/* Steps grid */}
        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-6 relative"
        >
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Mobile connector line */}
              {i > 0 && (
                <div className="absolute left-8 top-0 w-0.5 h-6 bg-ag-gold/20 -translate-y-full md:hidden" />
              )}

              <div
                data-step-card
                className="relative group cursor-pointer"
              >
                {/* Desktop: connector line between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-ag-gold/10 -translate-x-1/2 z-0">
                    <div
                      className="h-full bg-gradient-to-r from-ag-gold/20 to-transparent origin-left transition-all duration-700 group-hover:from-ag-gold/40"
                      style={{ width: isMobile ? '0%' : '0%' }}
                    />
                  </div>
                )}

                <div className="relative bg-ag-navy/40 backdrop-blur-sm rounded-2xl border border-ag-gold/10 p-6 md:p-8 transition-all duration-500 hover:border-ag-gold/30 hover:bg-ag-navy/60 hover:shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
                  {/* Decorative gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ag-gold/0 via-transparent to-ag-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-14 h-14 flex items-center justify-center">
                    <div className="relative z-10 w-10 h-10 rounded-full bg-ag-gold/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-xs font-black text-ag-void font-mono">
                        {step.number}
                      </span>
                    </div>
                    {/* Sparkle effect */}
                    <div className="absolute w-2 h-2 bg-ag-gold-l rounded-full top-0 right-2 opacity-0 group-hover:opacity-100 animate-pulse" />
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4 w-16 h-16 rounded-xl bg-gradient-to-br from-ag-gold/10 to-ag-gold/5 border border-ag-gold/20 flex items-center justify-center group-hover:border-ag-gold/40 group-hover:bg-ag-gold/15 transition-all duration-300 group-hover:scale-105">
                    <div className="text-ag-gold-l">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-ag-gold-l transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-ag-mist leading-relaxed text-sm md:text-base">
                      {step.desc}
                    </p>
                  </div>

                  {/* Active indicator (for desktop scroll) */}
                  {!isMobile && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ag-gold/0 via-ag-gold/50 to-ag-gold/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop active step indicator */}
        {!isMobile && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-ag-navy/50 backdrop-blur-sm border border-ag-gold/20">
              <div className="w-2 h-2 rounded-full bg-ag-gold animate-pulse" />
              <span className="text-sm font-medium text-ag-silver">
                Current Focus: <span className="text-ag-gold font-bold">{steps[activeStep].title}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-only vertical line */}
      <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-ag-gold/10 -z-10" />
    </section>
  )
}
