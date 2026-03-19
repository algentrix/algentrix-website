import { HiEnvelope, HiClock, HiBuildingOffice2 } from 'react-icons/hi2'

const supportTiers = [
  {
    icon: HiEnvelope,
    title: 'Standard Support',
    desc: 'Email support and issue resolution within 24 hours.',
  },
  {
    icon: HiClock,
    title: 'Professional Support',
    desc: 'Priority support and monitoring with response within 8 hours.',
  },
  {
    icon: HiBuildingOffice2,
    title: 'Enterprise Support',
    desc: 'Dedicated support, architecture consultation, and SLA response within 2 hours.',
  },
]

import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useStagger } from '../hooks/useStagger'

export function Support() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { once: true })
  useStagger(gridRef, { stagger: 0.1, once: true })

  return (
    <section className="py-28 md:py-32 px-8 relative overflow-hidden" id="support">
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none top-1/2 -left-24 -translate-y-1/2 bg-[rgba(59,130,246,0.3)]" />
      <div ref={headingRef}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          Support & Service <span className="text-accent-green">Levels</span>
        </h2>
        <p className="text-accent-green text-center mb-14 font-medium text-lg">
          Reliable support for systems that power your business.
        </p>
      </div>
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {supportTiers.map((tier, i) => (
          <div key={i} className="p-8 bg-bg-card rounded-xl border border-white/5 transition-all duration-300 ease-out hover:bg-bg-card-hover hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]">
            <tier.icon className="text-text-muted mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-3 text-white">{tier.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{tier.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
