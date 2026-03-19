import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useStagger } from '../hooks/useStagger'

const caseStudies = [
  {
    client: 'Manufacturing Co.',
    problem: 'Manual data entry across Tally, Excel, and ERP caused delays and errors. Reports took days to compile.',
    solution: 'Built an integrated data pipeline and custom dashboards that sync data in real time and automate reporting.',
    result: '30%',
    resultLabel: 'reduction in operational costs',
    gradient: 'from-accent-purple/20 via-bg-card to-accent-blue/10',
  },
  {
    client: 'Retail Chain',
    problem: 'Inventory and sales data lived in silos. Stockouts and overstocking were common, hurting margins.',
    solution: 'Unified POS, inventory, and e-commerce systems with a central analytics platform and automated alerts.',
    result: '45%',
    resultLabel: 'faster decision-making',
    gradient: 'from-accent-green/15 via-bg-card to-accent-blue/15',
  },
  {
    client: 'Professional Services Firm',
    problem: 'Scattered spreadsheets and email for project tracking. No visibility into resource utilization or profitability.',
    solution: 'Developed a custom project management and time-tracking system with real-time dashboards and billing integration.',
    result: '25%',
    resultLabel: 'increase in billable hours captured',
    gradient: 'from-accent-orange/15 via-bg-card to-accent-purple/15',
  },
]

export function CaseStudies() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { once: true })
  useStagger(gridRef, { stagger: 0.12, once: true })

  return (
    <section className="py-28 md:py-36 px-8 overflow-hidden" id="case-studies">
      <div ref={headingRef} className="text-center mb-16 md:mb-24">
        <p className="text-accent-green font-mono text-sm uppercase tracking-widest mb-4">Proof in Numbers</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Results That <span className="text-accent-green">Speak</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          How we helped businesses transform operations and drive measurable outcomes
        </p>
      </div>

      <div ref={gridRef} className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-10">
        {caseStudies.map((study, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl border border-white/5 p-8 md:p-12 bg-gradient-to-br ${study.gradient} transition-all duration-500 ease-out hover:scale-[1.02] hover:border-accent-green/25 hover:shadow-[0_0_60px_rgba(0,255,136,0.15)]`}
          >
            <div className="relative z-10">
              <p className="font-mono text-accent-green text-sm uppercase tracking-wider mb-4">{study.client}</p>
              <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Problem</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
                {study.problem}
              </h3>
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div>
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Solution</p>
                  <p className="text-white/90 text-base leading-relaxed">{study.solution}</p>
                </div>
                <div className="md:text-right md:pl-8 md:border-l md:border-white/10">
                  <p className="text-text-muted text-xs uppercase tracking-wider mb-2">Result</p>
                  <p className="text-accent-green text-4xl md:text-5xl font-bold tabular-nums">
                    {study.result}
                  </p>
                  <p className="text-white/90 text-lg font-medium mt-1">{study.resultLabel}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-14 text-text-muted">
        <Link to="/contact" className="text-accent-green hover:underline font-semibold">
          Share your challenge →
        </Link>
        {' '}and let's discuss how we can deliver similar results for your business.
      </p>
    </section>
  )
}
