import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import { useReveal } from '../hooks/useReveal'
import {
  HiChartBar,
  HiCpuChip,
  HiCube,
  HiBolt,
  HiShieldCheck,
} from 'react-icons/hi2'

const panels = [
  {
    icon: HiChartBar,
    title: 'Data to Decisions',
    desc: 'Transform raw business data into actionable insights with dashboards and analytics that drive strategy.',
    accent: 'from-accent-green/20 to-emerald-500/10',
  },
  {
    icon: HiCpuChip,
    title: 'Scalable Architecture',
    desc: 'Systems built for growth. Modern stacks, clean architecture, and infrastructure that scales with you.',
    accent: 'from-accent-purple/20 to-violet-500/10',
  },
  {
    icon: HiCube,
    title: 'Seamless Integration',
    desc: 'Connect Tally, ERPs, APIs, and internal tools into one cohesive technology ecosystem.',
    accent: 'from-accent-blue/20 to-blue-500/10',
  },
  {
    icon: HiBolt,
    title: 'Automation First',
    desc: 'Reduce manual work. Automate workflows, reporting, and processes so your team focuses on what matters.',
    accent: 'from-accent-orange/20 to-amber-500/10',
  },
  {
    icon: HiShieldCheck,
    title: 'Reliable Operations',
    desc: 'Technical support and maintenance that keep your systems running smoothly, 24/7.',
    accent: 'from-cyan-500/20 to-teal-500/10',
  },
]

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  useReveal(headingRef, { once: true })

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = () => setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !trackRef.current) return
    const isMobile = () => window.matchMedia('(max-width: 767px)').matches
    if (isMobile()) return

    initGSAP()
    const section = sectionRef.current
    const track = trackRef.current

    const ctx = gsap.context(() => {
      const getScrollDistance = () => {
        const trackWidth = track.scrollWidth
        const viewportWidth = window.innerWidth
        return Math.max(0, trackWidth - viewportWidth)
      }

      const scrollDistance = getScrollDistance()

      if (scrollDistance <= 0) return

      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative bg-bg-dark overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full blur-[120px] bg-accent-purple/15 opacity-60" />
        <div className="absolute bottom-1/4 right-0 w-[250px] h-[250px] rounded-full blur-[100px] bg-accent-blue/15 opacity-60" />
      </div>

      <div
        ref={headingRef}
        className="relative z-10 pt-20 pb-12 px-8 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Built for <span className="text-accent-green">modern</span> business
        </h2>
        <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
          Technology solutions that scale with your ambitions
        </p>
      </div>

      <div className={`relative h-[60vh] min-h-[400px] md:min-h-[480px] flex items-center ${isMobile ? 'overflow-x-auto overflow-y-hidden snap-x snap-mandatory' : 'overflow-hidden'}`}>
        <div
          ref={trackRef}
          className={`flex gap-6 pl-8 pr-8 md:pl-16 md:pr-16 ${isMobile ? 'flex-1 min-w-max py-4' : 'absolute left-0 top-1/2 -translate-y-1/2 will-change-transform'}`}
          style={!isMobile ? { width: 'max-content' } : undefined}
        >
          {panels.map((panel, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[min(85vw,320px)] md:w-[380px] lg:w-[420px] h-[min(55vh,320px)] md:h-[360px] rounded-2xl border border-white/10 bg-bg-card/80 backdrop-blur-sm p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-bg-card ${isMobile ? 'snap-center' : ''}`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${panel.accent} border border-white/5 mb-6`}>
                <panel.icon className="text-white/90" size={28} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">
                  {panel.title}
                </h3>
                <p className="text-text-muted text-sm md:text-base leading-relaxed">
                  {panel.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[20vh] min-h-[120px]" aria-hidden="true" />
    </section>
  )
}
