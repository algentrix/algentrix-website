import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { initGSAP, ScrollTrigger } from '../lib/gsap'
const panels = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-4-4-3 3" />
        <circle cx="7" cy="7" r="2" />
        <circle cx="17" cy="13" r="2" />
      </svg>
    ),
    title: 'Data-Driven Intelligence',
    desc: 'Transform raw business data into actionable insights with predictive analytics and real-time dashboards that empower C-suite decisions.',
    gradient: 'from-emerald-500/15 via-ag-navy/90 to-cyan-500/10',
    iconGradient: 'from-emerald-400 to-cyan-500',
    borderColor: 'hover:border-emerald-500/30',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: 'Cloud-Native Architecture',
    desc: 'Scalable, resilient infrastructure designed for growth. Modern cloud stacks that handle your business at any scale with 99.9% uptime.',
    gradient: 'from-violet-500/15 via-ag-navy/90 to-purple-500/10',
    iconGradient: 'from-violet-400 to-purple-500',
    borderColor: 'hover:border-violet-500/30',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    title: 'AI & Intelligent Automation',
    desc: 'Machine learning solutions that eliminate friction, automate repetitive tasks, and create sustainable competitive advantages.',
    gradient: 'from-amber-500/15 via-ag-navy/90 to-orange-500/10',
    iconGradient: 'from-amber-400 to-orange-500',
    borderColor: 'hover:border-amber-500/30',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 7l-8-4-8 4M4 7l8 4 8-4M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
        <path d="M12 11c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z" />
      </svg>
    ),
    title: 'Seamless Integration',
    desc: 'Unify your entire technology stack. Connect ERPs, APIs, legacy systems, and cloud services into one cohesive ecosystem.',
    gradient: 'from-cyan-500/15 via-ag-navy/90 to-blue-500/10',
    iconGradient: 'from-cyan-400 to-blue-500',
    borderColor: 'hover:border-cyan-500/30',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Enterprise-Grade Security',
    desc: 'Security-first development with end-to-end encryption, compliance frameworks, and proactive threat monitoring.',
    gradient: 'from-rose-500/15 via-ag-navy/90 to-red-500/10',
    iconGradient: 'from-rose-400 to-red-500',
    borderColor: 'hover:border-rose-500/30',
  },
]

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
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

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !trackRef.current) return
    const isMobileView = () => window.matchMedia('(max-width: 767px)').matches
    if (isMobileView()) return

    initGSAP()
    const section = sectionRef.current
    const track = trackRef.current
    const cards = track.querySelectorAll('[data-card]')

    /** Center first card in the section viewport (desktop); must run before measuring scrollWidth. */
    const applyTrackPadding = () => {
      const firstCard = track.querySelector('[data-card]') as HTMLElement | null
      const viewW = section.clientWidth
      const cardW = firstCard?.offsetWidth ?? 440
      const pad = Math.max(32, (viewW - cardW) / 2)
      track.style.paddingLeft = `${pad}px`
    }

    applyTrackPadding()

    const ctx = gsap.context(() => {

      /** Horizontal px the track must move after the hold phase. */
      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth
        const viewW = Math.min(section.clientWidth || document.documentElement.clientWidth, window.innerWidth)
        return Math.max(0, trackWidth - viewW)
      }

      if (getScrollDistance() <= 0) return

      /**
       * Pin height (vertical scroll budget) vs horizontal travel.
       */
      const PIN_SCROLL_MULTIPLIER = 1.72
      /** First portion of pinned scroll: no horizontal movement — first card stays fully on screen. */
      const HOLD_RATIO = 0.22

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance() * PIN_SCROLL_MULTIPLIER}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.25,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            const moveP = p <= HOLD_RATIO ? 0 : (p - HOLD_RATIO) / (1 - HOLD_RATIO)
            const index = Math.round(moveP * (panels.length - 1))
            setActiveIndex(Math.min(panels.length - 1, Math.max(0, index)))
          },
        },
      })

      tl.fromTo(track, { x: 0 }, { x: 0, duration: HOLD_RATIO, ease: 'none' })
      tl.to(track, {
        x: () => -getScrollDistance(),
        duration: 1 - HOLD_RATIO,
        ease: 'none',
      })

      // Animate cards as they enter (synced to horizontal phase)
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: 'left 65%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      return () => {
        tl.scrollTrigger?.kill()
        track.style.paddingLeft = ''
      }
    }, section)

    const onResize = () => {
      applyTrackPadding()
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [isMobile])

  // Mobile snap scroll handler
  useEffect(() => {
    if (!isMobile || !trackRef.current) return

    const track = trackRef.current
    const handleScroll = () => {
      const scrollLeft = track.scrollLeft
      const cardWidth = track.querySelector('[data-card]')?.clientWidth || 0
      const gap = 24 // gap-6 = 24px
      const totalCardWidth = cardWidth + gap
      const index = Math.round(scrollLeft / totalCardWidth)
      setActiveIndex(Math.max(0, Math.min(index, panels.length - 1)))
    }

    track.addEventListener('scroll', handleScroll)
    return () => track.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative bg-ag-void overflow-hidden pb-20 md:pb-28"
    >
      {/* Animated background with depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-ag-gold/5 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ag-gold-l/5 blur-[130px] rounded-full animate-pulse" style={{ animationDuration: '10s' }} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Header */}
      <div
        ref={headingRef}
        className="relative z-10 pt-24 pb-16 px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-ag-gold" />
              <span className="text-ag-gold text-xs font-mono uppercase tracking-[0.25em]">
        Capabilities
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-ag-gold" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white leading-tight">
            Technology That
            <br />
            <span className="text-gradient-accent">Powers Growth</span>
          </h2>

          <p className="text-ag-silver text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed for enterprise-scale challenges, delivering measurable outcomes across your organization.
          </p>
        </div>
      </div>

      {/* Horizontal scroll: desktop track is position:absolute, so this wrapper needs min-height in flow or the next section slides under the cards */}
      <div
        className={`relative ${isMobile ? '' : 'min-h-[min(60vh,420px)] md:min-h-[460px] pb-28'}`}
      >
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-ag-gold/10">
          <div
            className="h-full bg-gradient-to-r from-ag-gold via-ag-gold-l to-ag-gold transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / panels.length) * 100}%` }}
          />
        </div>

        <div
          ref={trackRef}
          className={`flex gap-6 ${isMobile
            ? 'overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-8 px-4 md:px-8'
            : 'absolute left-0 top-0 will-change-transform pr-8 md:pr-16 pb-16'
          }`}
          style={!isMobile ? { width: 'max-content' } : undefined}
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              data-card
              className={`flex-shrink-0 w-[85vw] sm:w-[min(90vw,380px)] md:w-[440px] h-[min(55vh,380px)] sm:h-[min(60vh,420px)] rounded-3xl border border-ag-gold/10 bg-gradient-to-br ${panel.gradient} backdrop-blur-sm p-6 sm:p-8 md:p-10 flex flex-col relative group overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-ag-gold/30 shadow-xl ${isMobile ? 'snap-center' : ''}`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ag-gold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ag-gold/5 to-transparent rounded-br-full opacity-50" />

              {/* Icon container with animation */}
              <div className="relative mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${panel.iconGradient} p-[1px] shadow-lg group-hover:shadow-[0_0_40px_rgba(201,168,76,0.3)] transition-all duration-500`}>
                  <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${panel.gradient} flex items-center justify-center`}>
                    <div className="text-ag-white">
                      {panel.icon}
                    </div>
                  </div>
                </div>
                <div className={`absolute -inset-1 bg-gradient-to-br ${panel.iconGradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <div className={`w-12 h-0.5 bg-gradient-to-r ${panel.iconGradient.replace('from-', 'from-').replace('to-', 'to-')} mb-4 rounded-full opacity-60`} />
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-ag-gold-l transition-colors duration-300">
                    {panel.title}
                  </h3>
                </div>
                <p className="text-ag-mist text-base leading-relaxed">
                  {panel.desc}
                </p>
              </div>

              {/* Number indicator */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-ag-gold/10 flex items-center justify-center">
                <span className="text-sm font-bold text-ag-gold font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${panel.iconGradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>

        {/* Navigation dots — in flow on mobile; pinned to bottom of min-height area on desktop */}
        <div
          className={`z-10 flex justify-center gap-2 ${
            isMobile ? 'mt-8 px-8 pb-8' : 'absolute bottom-10 left-0 right-0'
          }`}
        >
          {panels.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isMobile && trackRef.current) {
                  const card = trackRef.current.children[i] as HTMLElement
                  card?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
                }
              }}
              className={`transition-all duration-300 ${
                activeIndex === i
                  ? 'w-8 h-2 rounded-full bg-gradient-to-r from-ag-gold to-ag-gold-l'
                  : 'w-2 h-2 rounded-full bg-ag-gold/30 hover:bg-ag-gold/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint for desktop — above dots / bottom padding so it doesn’t collide with next section */}
      {!isMobile && (
        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2 text-ag-fog text-xs uppercase tracking-widest animate-pulse md:bottom-24">
          <span>Scroll horizontally</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      )}
    </section>
  )
}
