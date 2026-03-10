import {
  HiCog6Tooth,
  HiChartBarSquare,
  HiSquare3Stack3D,
} from 'react-icons/hi2'

const solutions = [
  {
    icon: HiCog6Tooth,
    title: 'Business Automation',
    desc: 'Reduce manual work and increase operational efficiency.',
  },
  {
    icon: HiChartBarSquare,
    title: 'Data‑Driven Decision Platforms',
    desc: 'Turn raw data into meaningful insights that support strategic decisions.',
  },
  {
    icon: HiSquare3Stack3D,
    title: 'Scalable Digital Platforms',
    desc: 'Technology platforms designed for long‑term business growth.',
  },
]

export function Portfolio() {
  return (
    <section className="py-24 px-8 relative overflow-hidden" data-scroll-section id="solutions">
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-30 pointer-events-none top-1/2 -right-24 -translate-y-1/2 bg-[rgba(139,92,246,0.4)]" />

      <h2 className="text-3xl font-bold text-center mb-4">
        Solutions
      </h2>
      <p className="text-accent-green text-center mb-12 font-medium">
        Intelligent systems designed for real business impact.
      </p>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {solutions.map((solution, i) => (
          <div key={i} className="p-8 bg-bg-card rounded-xl border border-white/5 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
            <solution.icon className="text-[#a0a0b0] mb-4" size={40} />
            <h3 className="text-lg font-semibold mb-3">{solution.title}</h3>
            <p className="text-[#a0a0b0] text-sm leading-relaxed">{solution.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
