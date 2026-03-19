import {
  HiCog6Tooth,
  HiBanknotes,
  HiTruck,
  HiShoppingBag,
  HiCpuChip,
  HiBriefcase,
} from 'react-icons/hi2'

const industries = [
  { icon: HiCog6Tooth, label: 'Manufacturing' },
  { icon: HiBanknotes, label: 'Financial Services' },
  { icon: HiTruck, label: 'Logistics & Supply Chain' },
  { icon: HiShoppingBag, label: 'Retail & Distribution' },
  { icon: HiCpuChip, label: 'Technology Companies' },
  { icon: HiBriefcase, label: 'Professional Services' },
]

import { useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useStagger } from '../hooks/useStagger'

export function Expertise() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { once: true })
  useStagger(gridRef, { stagger: 0.06, once: true })

  return (
    <section className="py-28 md:py-32 px-8" id="industries">
      <div ref={headingRef}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
          Industries <span className="text-accent-green">Served</span>
        </h2>
        <p className="text-accent-green text-center mb-14 font-medium text-lg">
          Technology solutions for industries that drive growth.
        </p>
      </div>
      <div ref={gridRef} className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {industries.map((item, i) => (
          <div key={i} className="p-6 bg-bg-card rounded-xl border border-white/5 flex flex-col items-center gap-3 transition-all duration-300 ease-out hover:bg-bg-card-hover hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]">
            <item.icon className="text-text-muted" size={32} />
            <span className="text-sm font-medium text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
