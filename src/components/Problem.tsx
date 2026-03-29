import { useRef, useLayoutEffect } from 'react'
import {
  HiClock,
  HiArrowsPointingOut,
  HiBanknotes,
  HiAcademicCap,
} from 'react-icons/hi2'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

const challenges = [
  {
    icon: HiClock,
    title: 'Slow Development',
    desc: 'Lengthy delivery cycles and bottlenecks that delay your time to market.',
  },
  {
    icon: HiArrowsPointingOut,
    title: 'Poor Scalability',
    desc: 'Systems that struggle to grow with your business and handle increased load.',
  },
  {
    icon: HiBanknotes,
    title: 'High Costs',
    desc: 'Overspending on maintenance, rework, and inefficient technology choices.',
  },
  {
    icon: HiAcademicCap,
    title: 'Lack of Expertise',
    desc: 'Difficulty finding and retaining skilled talent for complex tech projects.',
  },
]

export function Problem() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !gridRef.current) return
    initGSAP()

    const grid = gridRef.current
    const cards = grid.querySelectorAll<HTMLElement>(':scope > div')

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, grid)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !bgRef.current) return
    initGSAP()

    const bg = bgRef.current
    gsap.to(bg, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: bg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  return (
    <section className="relative py-28 md:py-32 px-8 overflow-hidden" id="challenges">
      {/* Animated background */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
                       radial-gradient(ellipse at 70% 50%, rgba(168,184,204,0.04) 0%, transparent 60%)`,
        }}
      />

      <div
        ref={headingRef}
        className="relative text-center mb-16 md:mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Challenges Businesses <span className="text-ag-gold">Face Today</span>
        </h2>
        <p className="text-ag-silver text-lg max-w-2xl mx-auto">
          Common pain points we help organizations overcome
        </p>
        <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-ag-gold/30 to-transparent" />
      </div>

      <div
        ref={gridRef}
        className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {challenges.map((item, i) => (
          <ChallengeCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

function ChallengeCard({
  item,
  index
}: {
  item: typeof challenges[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    initGSAP()

    const card = cardRef.current
    const icon = iconRef.current
    if (!card || !icon) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        icon,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: index * 0.1,
        }
      )
    }, card)

    return () => ctx.revert()
  }, [index])

  const onEnter = () => {
    const card = cardRef.current
    const icon = iconRef.current
    if (!card || !icon) return
    gsap.to(icon, { scale: 1.15, duration: 0.4, ease: 'power2.out' })
    gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' })
  }

  const onLeave = () => {
    const card = cardRef.current
    const icon = iconRef.current
    if (!card || !icon) return
    gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="group relative p-5 md:p-8 bg-ag-navy/50 backdrop-blur-sm rounded-xl border border-ag-gold/10 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-ag-gold/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] cursor-pointer overflow-hidden"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ag-gold/0 via-transparent to-ag-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        ref={iconRef}
        className="relative w-14 h-14 rounded-xl bg-ag-gold/8 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-ag-gold/12"
      >
        <item.icon className="text-ag-gold-l" size={28} />
      </div>

      <h3 className="relative text-lg font-semibold mb-3 text-ag-white transition-colors duration-300 group-hover:text-ag-gold-l">
        {item.title}
      </h3>

      <p className="relative text-ag-mist text-sm leading-relaxed">{item.desc}</p>
    </div>
  )
}
