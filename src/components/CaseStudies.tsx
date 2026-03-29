import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

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
  const gridRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !gridRef.current) return
    initGSAP()

    const grid = gridRef.current
    const cards = grid.querySelectorAll<HTMLElement>(':scope > div')

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const resultEl = card.querySelector<HTMLElement>('.result-number')
        gsap.fromTo(
          card,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )

        if (resultEl) {
          gsap.fromTo(
            resultEl,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: 'elastic.out(1, 0.5)',
              delay: i * 0.15 + 0.3,
            }
          )
        }
      })
    }, grid)

    return () => ctx.revert()
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !bgRef.current) return
    initGSAP()

    const bg = bgRef.current
    gsap.to(bg, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: bg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    })
  }, [])

  return (
    <section className="relative py-28 md:py-36 px-8 overflow-hidden" id="case-studies">
      {/* Background animation */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, rgba(201,168,76,0.08) 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 70%, rgba(168,184,204,0.05) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <p className="font-mono text-ag-gold text-sm uppercase tracking-[0.2em] mb-4">
            <span className="inline-block animate-pulse">●</span> Proof in Numbers
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Results That <span className="text-ag-gold">Speak</span>
          </h2>
          <p className="text-ag-silver text-lg max-w-2xl mx-auto leading-relaxed">
            How we helped businesses transform operations and drive measurable outcomes
          </p>
          <div className="mt-8 h-px max-w-[150px] mx-auto bg-gradient-to-r from-transparent via-ag-gold/30 to-transparent" />
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-10">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={i} study={study} />
          ))}
        </div>

        <p className="text-center mt-16 text-ag-mist">
          <Link to="/contact" className="font-semibold text-ag-gold transition-all hover:text-ag-gold-l hover:underline">
            Share your challenge →
          </Link>
          {' '}and let's discuss how we can deliver similar results for your business.
        </p>
      </div>
    </section>
  )
}

function CaseStudyCard({
  study,
}: {
  study: typeof caseStudies[number]
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      scale: 1.01,
      y: -4,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl border border-ag-gold/10 p-6 md:p-8 lg:p-12 bg-gradient-to-br ${study.gradient} transition-all duration-500 ease-out will-change-transform`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ag-gold/0 via-transparent to-ag-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <p className="font-mono text-ag-gold-l text-sm uppercase tracking-[0.15em] mb-4 opacity-80">
          {study.client}
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <p className="text-ag-fog text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-ag-gold/40" /> Problem
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-ag-white mb-6 leading-snug">
              {study.problem}
            </h3>

            <p className="text-ag-fog text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-ag-gold/40" /> Solution
            </p>
            <p className="text-ag-silver text-base leading-relaxed">{study.solution}</p>
          </div>

          <div className="md:text-right md:pl-8 md:border-l md:border-ag-gold/20 relative">
            <p className="text-ag-fog text-xs uppercase tracking-wider mb-3">Result</p>
            <p className="result-number text-ag-gold text-5xl md:text-6xl font-black tabular-nums">
              {study.result}
            </p>
            <p className="text-ag-off text-lg font-medium mt-2">{study.resultLabel}</p>

            {/* Decor corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-ag-gold/30 rounded-tr-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
