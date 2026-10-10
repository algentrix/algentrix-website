import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

type WorkItem = {
  name: string
  summary: string
  flow?: string[]
  detail?: string
  href?: string
  linkLabel?: string
  standalonePage?: boolean
}

const works: WorkItem[] = [
  {
    name: 'Tiger Fitness',
    summary: 'Connected Gym Management — Web & Mobile',
    flow: ['Onboarding', 'Memberships', 'Billing', 'Coaching', 'Check-in', 'Progress'],
    detail: 'A React staff workspace and member portal, plus a Flutter member app, connected through one shared .NET API. Explore the web and mobile experiences in the full case study.',
    href: '/case-studies/tiger-fitness/',
    linkLabel: 'View case study',
    standalonePage: true,
  },
  {
    name: 'TradeConnect',
    summary: 'B2B Commodity Trading Operations',
    flow: ['WhatsApp', 'Supplier Response', 'Sauda', 'PO', 'Dispatch', 'Trade Register'],
    href: '/tradeconnect',
  },
  {
    name: 'WorkPulse',
    summary: 'Workforce & Attendance Management',
    flow: ['Attendance', 'Tasks', 'Payroll', 'Reports', 'Workforce Operations'],
  },
  {
    name: 'Digital Audit',
    summary: 'Digital & IT Health Check for Businesses',
    detail: 'Identify manual processes, technology gaps, security risks and opportunities for improvement.',
  },
]

function WorkCard({ item }: { item: WorkItem }) {
  const body = (
    <>
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ag-gold">
        {item.href ? 'Product' : 'Coming soon'}
      </p>
      <h2 className="mt-4 font-serif text-3xl text-white">{item.name}</h2>
      <p className="mt-3 text-[16px] leading-relaxed text-ag-silver">{item.summary}</p>
      <p className="mt-6 text-sm leading-relaxed text-ag-mist">{item.detail ?? item.flow?.join(' → ')}</p>
      <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-ag-gold">
        {item.href ? (item.linkLabel ?? `View ${item.name}`) : 'Coming soon'}
      </p>
    </>
  )

  // Standalone case studies load their own document and bundled assets.
  if (item.href && item.standalonePage) {
    return (
      <a
        href={item.href}
        className="block border border-ag-gold/30 bg-[#100e08] px-6 py-7 transition-colors hover:border-ag-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ag-gold"
      >
        {body}
      </a>
    )
  }

  if (item.href) {
    return (
      <Link
        to={item.href}
        className="block border border-ag-gold/30 bg-[#100e08] px-6 py-7 transition-colors hover:border-ag-gold"
      >
        {body}
      </Link>
    )
  }

  return <article className="border border-white/10 bg-white/5 px-6 py-7">{body}</article>
}

export function WorksPage() {
  return (
    <div className="relative z-10 bg-ag-void text-ag-white">
      <Header />
      <main>
        <section className="px-5 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-36">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold">Works</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-6xl">What We've Built</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ag-silver">
              Practical digital products and business systems built around real-world workflows.
            </p>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {works.map((item) => (
                <WorkCard key={item.name} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
