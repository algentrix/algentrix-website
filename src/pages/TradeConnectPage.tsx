import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FileText,
  MessageCircle,
  Phone,
  Sheet,
  Truck,
} from 'lucide-react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const SHOTS = '/products/tradeconnect'

const heroFlow = [
  'RFQ',
  'Supplier Reply',
  'Negotiation',
  'Sauda',
  'PO',
  'Dispatch',
  'Trade File',
]

const problemCards = [
  { icon: MessageCircle, title: 'WhatsApp', text: 'Supplier conversations' },
  { icon: Phone, title: 'Phone Calls', text: 'Negotiation and follow-ups' },
  { icon: Sheet, title: 'Excel', text: 'Rates and calculations' },
  { icon: FileText, title: 'Documents', text: 'POs, invoices and weighment' },
  { icon: Truck, title: 'Truck Coordination', text: 'Dispatch and delivery' },
]

const steps = [
  {
    n: '01',
    title: 'Buyer Requirement',
    text: 'Capture what the buyer needs.',
  },
  {
    n: '02',
    title: 'Supplier Sourcing',
    text: 'Send a WhatsApp RFQ to selected suppliers.',
  },
  {
    n: '03',
    title: 'Supplier Replies',
    text: 'YES / NO / CALL and commercial replies come back into the same requirement.',
  },
  {
    n: '04',
    title: 'Sauda',
    text: 'Lock rate, quantity, trucks and freight.',
  },
  {
    n: '05',
    title: 'Purchase Order',
    text: 'Generate the PO and send it directly to the supplier.',
  },
  {
    n: '06',
    title: 'Dispatch',
    text: 'Assign trucks and follow: Loading → In Transit → Delivered.',
  },
  {
    n: '07',
    title: 'Trade Register',
    text: 'Keep documents, weighment, payments and trade status together.',
  },
]

const whatsappFlow = [
  'WhatsApp RFQ',
  'Supplier YES / NO / CALL',
  'Commercial Reply',
  'Negotiation',
  'Sauda',
  'PO',
]

const recordFlow = [
  'WhatsApp message',
  'Requirement',
  'Supplier Response',
  'Negotiation',
  'Sauda',
  'PO',
  'Dispatch',
  'Trade File',
]

const audiences = [
  'Steel & Metal Traders',
  'Commodity Traders',
  'Regional Distributors',
  'Family-Owned Trading Businesses',
  'WhatsApp-Driven Trading Desks',
  'Truck-Coordinating Traders',
]

const values = [
  {
    title: 'Source Faster',
    text: 'Reach multiple suppliers from one requirement.',
  },
  {
    title: 'Respond Faster',
    text: 'Bring supplier responses into one workspace.',
  },
  {
    title: 'Control Every Trade',
    text: 'Track Sauda, PO, trucks and documents.',
  },
  {
    title: 'Know Your Margin',
    text: 'See purchase value, transport cost, other costs, sale value and estimated margin.',
  },
]

const showcase = [
  {
    src: `${SHOTS}/04-requirement-workspace-suppliers.png`,
    width: 1664,
    height: 936,
    title: 'Requirement workspace',
    caption: 'Source from multiple suppliers from one requirement.',
    alt: 'TradeConnect requirement workspace listing seven steel scrap suppliers with rates and reply status',
  },
  {
    src: `${SHOTS}/05-supplier-whatsapp-responses.png`,
    width: 1664,
    height: 936,
    title: 'Supplier responses',
    caption: 'Supplier responses come back into the requirement.',
    alt: 'TradeConnect showing supplier rates, rejections, and a call reply on the same steel scrap requirement',
  },
  {
    src: `${SHOTS}/06-sauda-deal.png`,
    width: 1664,
    height: 936,
    title: 'Sauda',
    caption: 'Turn negotiation into a confirmed trade.',
    alt: 'TradeConnect Sauda panel for a confirmed steel scrap purchase order',
  },
  {
    src: `${SHOTS}/07-purchase-order.png`,
    width: 1920,
    height: 820,
    title: 'Purchase order',
    caption: 'Generate professional Purchase Orders.',
    alt: 'Sample TradeConnect purchase order for steel scrap with fictional demo company details',
  },
  {
    src: `${SHOTS}/08-dispatch-truck-summary.png`,
    width: 1920,
    height: 1080,
    title: 'Dispatch',
    caption: 'Track loading, transit and delivery.',
    alt: 'TradeConnect dispatch board with trucks in loading, in transit, and delivered stages',
  },
  {
    src: `${SHOTS}/10-trade-register-file.png`,
    width: 1920,
    height: 1080,
    title: 'Trade register',
    caption: 'Know the cost, revenue, documents and margin of every trade.',
    alt: 'TradeConnect trade file showing quantity, rates, freight, weighment, payments and documents',
  },
]

const erpItems = ['Records', 'Finance', 'Customers', 'Enterprise processes']
const tradeItems = [
  'Requirements',
  'Supplier sourcing',
  'WhatsApp communication',
  'Negotiation',
  'Sauda',
  'PO',
  'Trucks',
  'Trade Register',
]

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function GoldButton({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center justify-center min-h-12 px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase bg-ag-gold text-ag-void transition-colors hover:bg-ag-gold-l'
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  const className =
    'inline-flex items-center justify-center min-h-12 px-6 py-3 text-[12px] font-semibold tracking-[0.14em] uppercase border border-ag-gold/50 text-ag-white transition-colors hover:border-ag-gold hover:text-ag-gold-l'
  if (href.startsWith('/')) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

function FlowLine({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 text-[12px] font-medium tracking-wide ${
              light
                ? 'bg-white text-[#1c2430] ring-1 ring-black/10'
                : 'bg-white/10 text-ag-white ring-1 ring-white/15'
            }`}
          >
            {item}
          </span>
          {index < items.length - 1 ? (
            <span className={light ? 'text-[#9aa3af]' : 'text-ag-gold/80'} aria-hidden>
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

function ShotFrame({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width: number
  height: number
}) {
  return (
    <div className="rounded-2xl bg-[#e7edf3] p-2 shadow-[0_28px_70px_-28px_rgba(2,4,10,0.55)] ring-1 ring-black/10 sm:p-3">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-xl"
        loading="lazy"
      />
    </div>
  )
}

function SupplierReplyCard() {
  const replies = [
    {
      who: 'Sunrise Industrial Traders',
      place: 'Pune',
      text: 'Yes. We can offer ₹31.10 / KG.',
      tone: 'yes' as const,
    },
    {
      who: 'Bharat Alloy Suppliers',
      place: 'Raipur',
      text: 'No.',
      tone: 'no' as const,
    },
    {
      who: 'Western Steel Corporation',
      place: 'Durg',
      text: 'No stock this week.',
      tone: 'no' as const,
    },
    {
      who: 'Deccan Metal Supply',
      place: 'Nagpur',
      text: 'Please call the yard before noon.',
      tone: 'call' as const,
    },
  ]

  return (
    <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[28px] bg-[#101816] shadow-[0_30px_80px_-30px_rgba(2,4,10,0.7)] ring-1 ring-black/20">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#c9a84c]">Example replies</p>
          <p className="mt-1 font-serif text-lg text-white">Steel Scrap · Mumbai</p>
        </div>
        <p className="text-right text-[11px] leading-snug text-white/55">
          100 MT
          <br />
          Fictional demo
        </p>
      </div>
      <div className="space-y-3 px-4 py-4">
        <div className="ml-8 rounded-2xl rounded-tr-sm bg-[#1f6b45] px-3.5 py-3 text-sm leading-relaxed text-white">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">RFQ</p>
          Steel Scrap requirement for Mumbai. Please share availability and rate.
        </div>
        {replies.map((reply) => (
          <div key={reply.who} className="mr-6 rounded-2xl rounded-tl-sm bg-[#1c2622] px-3.5 py-3 text-sm text-[#e7efe9]">
            <p className="text-[12px] font-semibold text-white">{reply.who}</p>
            <p className="text-[11px] text-white/45">{reply.place}</p>
            <p className="mt-1.5 leading-relaxed">{reply.text}</p>
            <p
              className={`mt-2 inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                reply.tone === 'yes'
                  ? 'bg-emerald-400/15 text-emerald-200'
                  : reply.tone === 'call'
                    ? 'bg-amber-300/15 text-amber-100'
                    : 'bg-white/10 text-white/55'
              }`}
            >
              {reply.tone === 'yes' ? 'Yes' : reply.tone === 'call' ? 'Call' : 'No'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TradeConnectPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative z-10 bg-ag-void text-ag-white">
      <Header />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 lg:pb-28 lg:pt-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-ag-gold/10 blur-3xl" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold">TradeConnect</p>
              <h1 className="mt-5 max-w-xl font-serif text-[2.35rem] font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[3.35rem]">
                Your Business Runs on WhatsApp.
                <span className="mt-2 block text-ag-off">Your Software Should Work With It.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ag-silver">
                TradeConnect — WhatsApp-first trading operations for B2B commodity businesses.
              </p>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ag-mist">
                Connect buyer requirements, supplier sourcing, WhatsApp conversations, Sauda, Purchase Orders, trucks and trade records in one simple trading workspace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GoldButton href="#how-it-works">See How TradeConnect Works</GoldButton>
                <GhostButton href="/contact">Talk to Algentrix</GhostButton>
              </div>
            </Reveal>
            <Reveal>
              <figure>
                <div className="rounded-2xl bg-[#dfe6ee] p-2 shadow-[0_40px_90px_-36px_rgba(0,0,0,0.75)] ring-1 ring-white/10 sm:p-3">
                  <img
                    src={`${SHOTS}/04-requirement-workspace-suppliers.png`}
                    alt="TradeConnect requirement workspace for a steel scrap requirement, with supplier rates and statuses"
                    width={1664}
                    height={936}
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <figcaption className="mt-3 text-[12px] tracking-wide text-ag-mist">
                  One requirement. Multiple suppliers. Rates and replies in the same workspace.
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="relative mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6">
            <FlowLine items={heroFlow} />
          </div>
        </section>

        <section className="bg-[#f6f3ec] px-5 py-20 text-[#141920] sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">The desk today</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Your Trade Is Probably Spread Across Five Places.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {problemCards.map((card) => (
                <article key={card.title} className="border border-black/10 bg-white px-5 py-6">
                  <card.icon className="h-5 w-5 text-ag-gold-d" strokeWidth={1.75} aria-hidden />
                  <h3 className="mt-5 font-serif text-2xl">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4d5968]">{card.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-2xl font-serif text-2xl leading-snug text-[#141920]">
              TradeConnect brings the operational workflow together.
            </p>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 bg-[#07101c] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold">How it works</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                One Requirement. One Workspace. One Trade.
              </h2>
            </Reveal>
            <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <li key={step.n} className="border border-white/10 bg-white/5 px-5 py-6">
                  <p className="font-mono text-[12px] text-ag-gold">{step.n}</p>
                  <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ag-mist">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#f6f3ec] px-5 py-20 text-[#141920] sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">WhatsApp</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Don't Replace WhatsApp.
                <span className="block">Connect It.</span>
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#3e4a59]">
                Your traders don't need another app to talk to suppliers.
              </p>
              <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-[#3e4a59]">
                TradeConnect connects WhatsApp communication to the trading workflow.
              </p>
              <div className="mt-8">
                <FlowLine items={whatsappFlow} light />
              </div>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#5c6876]">
                The card is an example built from the fictional demo desk — Sunrise, Bharat Alloy, Western Steel and Deccan Metal Supply answering one steel scrap requirement.
              </p>
            </Reveal>
            <Reveal>
              <SupplierReplyCard />
            </Reveal>
          </div>
        </section>

        <section className="bg-white px-5 py-20 text-[#141920] sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">The product</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                The trading desk, on one screen.
              </h2>
            </Reveal>
            <div className="mt-16 space-y-20 lg:space-y-28">
              {showcase.map((shot, index) => {
                const reversed = index % 2 === 1
                return (
                  <article
                    key={shot.src}
                    className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${reversed ? '' : ''}`}
                  >
                    <div className={reversed ? 'lg:order-2' : ''}>
                      <p className="font-mono text-[12px] text-ag-gold-d">0{index + 1}</p>
                      <h3 className="mt-3 font-serif text-3xl sm:text-4xl">{shot.title}</h3>
                      <p className="mt-4 max-w-md text-lg leading-relaxed text-[#3e4a59]">{shot.caption}</p>
                    </div>
                    <div className={reversed ? 'lg:order-1' : ''}>
                      <ShotFrame src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-ag-void px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold">Positioning</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-6xl">
                Not Another ERP.
                <span className="block">Not Another CRM.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-ag-silver">Built for the operational layer of commodity trading.</p>
            </Reveal>
            <div className="mt-8 max-w-3xl space-y-4 text-[16px] leading-relaxed text-ag-mist">
              <p>Traditional ERP and CRM systems can manage enterprise records, finance and customer processes.</p>
              <p>But trading teams still need to source material, call suppliers, negotiate rates and arrange trucks.</p>
              <p className="text-ag-off">TradeConnect connects that operational layer.</p>
            </div>
            <div className="mt-8 grid gap-3 text-[15px] text-ag-silver sm:grid-cols-3">
              <p>Your team keeps using WhatsApp.</p>
              <p>Your business gets a structured workflow.</p>
              <p>Your owner gets visibility.</p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <div className="border border-white/10 bg-white/5 p-7">
                <h3 className="font-serif text-2xl text-ag-off">Traditional ERP / CRM</h3>
                <ul className="mt-6 space-y-3">
                  {erpItems.map((item) => (
                    <li key={item} className="border-b border-white/10 pb-3 text-ag-mist">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-ag-gold/40 bg-[#100e08] p-7">
                <h3 className="font-serif text-2xl text-ag-gold-l">TradeConnect</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {tradeItems.map((item) => (
                    <li key={item} className="border border-ag-gold/15 px-3 py-2 text-sm text-ag-off">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-12 max-w-3xl font-serif text-3xl leading-snug text-white">
              WhatsApp becomes the communication layer.
              <span className="block text-ag-gold-l">TradeConnect becomes the workflow layer.</span>
            </p>
            <p className="mt-6 text-lg text-ag-silver">Keep using WhatsApp. Get the structure of software.</p>
          </div>
        </section>

        <section className="bg-[#f6f3ec] px-5 py-20 text-[#141920] sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                A Supplier's Response Shouldn't Disappear Into a Chat.
              </h2>
            </Reveal>
            <div className="mt-10">
              <FlowLine items={recordFlow} light />
            </div>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#3e4a59]">
              The business remembers what happened — not just the person who handled the WhatsApp conversation.
            </p>
          </div>
        </section>

        <section className="bg-white px-5 py-20 text-[#141920] sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">Built for B2B Trading Businesses</h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((name) => (
                <article key={name} className="border border-black/10 bg-[#f6f3ec] px-5 py-6">
                  <h3 className="font-serif text-2xl leading-snug">{name}</h3>
                </article>
              ))}
            </div>
            <p className="mt-10 max-w-3xl text-[16px] leading-relaxed text-[#3e4a59]">
              Built around the way Indian trading businesses work. Flexible enough for commodity workflows beyond India.
            </p>
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-[#3e4a59]">
              The workspace uses the language of the desk: Sauda, parties, freight, trucks, GSTIN, LR and e-Way, with quantity in MT.
            </p>
          </div>
        </section>

        <section className="bg-[#07101c] px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                From Trading Conversations to Business Visibility.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {values.map((item) => (
                <article key={item.title} className="border border-white/10 px-6 py-7">
                  <h3 className="font-serif text-3xl text-ag-gold-l">{item.title}</h3>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ag-silver">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f6f3ec] px-5 py-20 text-[#141920] sm:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">Algentrix</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              TradeConnect Is One Example of What Algentrix Builds.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-[#3e4a59]">
              We help businesses convert existing workflows into practical digital products — without forcing them into a rigid one-size-fits-all system.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#3e4a59]">
              If a business process still runs across WhatsApp + Excel + Phone Calls + Documents, Algentrix can turn that workflow into practical software.
            </p>
            <p className="mt-8 font-serif text-2xl">Have a workflow that needs to be digitized?</p>
            <div className="mt-6">
              <GoldButton href="/contact">Talk to Algentrix</GoldButton>
            </div>
          </div>
        </section>

        <section className="bg-[#02040a] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-serif text-4xl text-white sm:text-5xl">TradeConnect</p>
            <p className="mt-4 text-lg text-ag-silver">WhatsApp-first trading operations.</p>
            <div className="mt-8 flex justify-center">
              <FlowLine items={['RFQ', 'Reply', 'Sauda', 'PO', 'Dispatch', 'Trade File']} />
            </div>
            <div className="mt-10">
              <GoldButton href="/contact">Talk to Algentrix</GoldButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
