import {
  HiMagnifyingGlass,
  HiCubeTransparent,
  HiShieldCheck,
  HiArrowPath,
} from 'react-icons/hi2'

const steps = [
  {
    icon: HiMagnifyingGlass,
    title: 'Understand the Business',
    desc: 'Analyze business processes and challenges.',
  },
  {
    icon: HiCubeTransparent,
    title: 'Design Scalable Architecture',
    desc: 'Build systems using modern and scalable technologies.',
  },
  {
    icon: HiShieldCheck,
    title: 'Build Reliable Platforms',
    desc: 'Develop high‑quality, maintainable software.',
  },
  {
    icon: HiArrowPath,
    title: 'Continuous Improvement',
    desc: 'Provide ongoing optimization and support.',
  },
]

import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useStagger } from '../hooks/useStagger'

export function EngineeringApproach() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { once: true })
  useStagger(gridRef, { stagger: 0.1, once: true })

  return (
    <section className="py-28 md:py-32 px-8" id="approach">
      <div ref={headingRef}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          Engineering <span className="text-accent-green">Approach</span>
        </h2>
        <p className="text-accent-green text-center mb-14 font-medium text-lg">
          Engineering systems that grow with your business.
        </p>
      </div>
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="p-8 bg-bg-card rounded-xl border border-white/5 transition-all duration-300 ease-out hover:bg-bg-card-hover hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]">
            <step.icon className="text-text-muted mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-3 text-white">{step.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
