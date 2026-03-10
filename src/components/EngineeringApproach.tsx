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

export function EngineeringApproach() {
  return (
    <section className="py-24 px-8" data-scroll-section id="approach">
      <h2 className="text-3xl font-bold text-center mb-4">
        Engineering <span className="text-accent-green">Approach</span>
      </h2>
      <p className="text-accent-green text-center mb-12 font-medium">
        Engineering systems that grow with your business.
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="p-8 bg-bg-card rounded-xl border border-white/5 transition-all hover:bg-bg-card-hover hover:-translate-y-1">
            <step.icon className="text-[#a0a0b0] mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
            <p className="text-[#a0a0b0] text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
