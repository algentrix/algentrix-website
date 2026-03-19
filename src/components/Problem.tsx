import { useRef } from 'react'
import {
  HiClock,
  HiArrowsPointingOut,
  HiBanknotes,
  HiAcademicCap,
} from 'react-icons/hi2'
import { useReveal } from '../hooks/useReveal'
import { useStagger } from '../hooks/useStagger'

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
  useReveal(headingRef, { once: true })
  useStagger(gridRef, { stagger: 0.1, once: true })

  return (
    <section className="py-28 md:py-32 px-8 overflow-hidden" id="challenges">
      <div ref={headingRef} className="text-center mb-16 md:mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Challenges Businesses <span className="text-accent-green">Face Today</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Common pain points we help organizations overcome
        </p>
      </div>

      <div
        ref={gridRef}
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {challenges.map((item, i) => (
          <div
            key={i}
            className="group p-6 md:p-8 bg-bg-card rounded-xl border border-white/5 relative transition-all duration-300 ease-out hover:-translate-y-2 hover:border-accent-green/20 hover:shadow-[0_0_40px_rgba(0,255,136,0.08)]"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-5 group-hover:bg-accent-green/15 transition-colors duration-300">
              <item.icon className="text-accent-green" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-white">{item.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
