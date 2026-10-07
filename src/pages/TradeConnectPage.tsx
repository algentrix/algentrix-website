import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Check,
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

const audiences = [
  'Steel & Metal Traders',
  'Commodity Traders',
  'Regional Distributors',
  'Family-Owned Trading Businesses',
  'WhatsApp-Driven Trading Desks',
]

const erpItems = ['Finance', 'Accounting', 'Inventory', 'Enterprise records']
const crmItems = ['Customers', 'Leads', 'Sales', 'Follow-ups']
const tradeItems = [
  'Buyer Requirements',
  'Supplier Sourcing',
  'WhatsApp Responses',
  'Negotiation',
  'Sauda',
  'PO',
  'Dispatch',
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

function ProductShot({
  label,
  title,
  text,
  points,
  src,
  alt,
  width,
  height,
  imageLeft = false,
  className = '',
}: {
  label: string
  title: string
  text: string
  points?: string[]
  src: string
  alt: string
  width: number
  height: number
  imageLeft?: boolean
  className?: string
}) {
  return (
    <article
      className={`mx-auto grid max-w-[1680px] items-center gap-10 lg:gap-12 ${
        imageLeft
          ? 'lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]'
          : 'lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]'
      } ${className}`}
    >
      <div className={imageLeft ? 'lg:order-2' : undefined}>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-ag-gold-d">{label}</p>
        <h3 className="mt-3 max-w-xl font-serif text-3xl sm:text-4xl">{title}</h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-[#3e4a59]">{text}</p>
        {points ? (
          <ul className="mt-8 space-y-3 text-[16px] leading-relaxed text-[#3e4a59]">
            {points.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check className="h-4 w-4 shrink-0 text-ag-gold-d" strokeWidth={2.25} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <figure className={`m-0 w-full min-w-0 max-w-[850px] ${imageLeft ? 'mr-auto lg:order-1' : 'ml-auto'}`}>
        <picture>
          <source srcSet={src.replace(/\.jpg$/, '.webp')} type="image/webp" />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full rounded-2xl object-contain shadow-[0_16px_36px_-22px_rgba(0,0,0,0.45)]"
          />
        </picture>
      </figure>
    </article>
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
        <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 md:pr-24 lg:pb-28 lg:pt-32">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-ag-gold/10 blur-3xl" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
          </div>
          <div className="relative mx-auto grid max-w-[1680px] items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12">
            <Reveal>
              <p className="font-serif text-[1.85rem] font-semibold tracking-[0.04em] text-ag-gold sm:text-4xl lg:text-[2.6rem]">TradeConnect</p>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-ag-silver sm:text-lg">
                WhatsApp-first trading operations for B2B commodity businesses.
              </p>
              <h1 className="mt-5 max-w-xl font-serif text-[2.35rem] font-semibold leading-[1.05] text-white sm:text-5xl lg:text-[3.35rem]">
                Your Business Runs on WhatsApp.
                <span className="mt-2 block text-ag-off">Your Software Should Work With It.</span>
              </h1>
              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ag-mist">
                Connect buyer requirements, supplier sourcing, WhatsApp conversations, Sauda, purchase orders, trucks and trade records in one trading workspace.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GoldButton href="#how-it-works">See How TradeConnect Works</GoldButton>
                <GhostButton href="/contact">Talk to Algentrix</GhostButton>
              </div>
            </Reveal>
            <Reveal className="min-w-0">
              <figure className="m-0 w-full">
                <picture>
                    <source srcSet={`${SHOTS}/tradeconnect-hero.webp?v=2`} type="image/webp" />
                    <img
                      src={`${SHOTS}/tradeconnect-hero.jpg?v=2`}
                    alt="TradeConnect industrial desk: WhatsApp supplier replies, a requirements screen, a purchase order, and a truck leaving for Mumbai"
                    width={1024}
                    height={576}
                    fetchPriority="high"
                    decoding="async"
                    className="h-auto w-full rounded-2xl object-contain shadow-[0_16px_36px_-22px_rgba(0,0,0,0.45)]"
                  />
                </picture>
              </figure>
            </Reveal>
          </div>
          <div className="relative mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6">
            <FlowLine items={heroFlow} />
          </div>
        </section>

        <section className="bg-[#f6f3ec] px-5 py-16 text-[#141920] sm:px-8 md:pr-24 lg:py-20">
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

        <section className="bg-[#f6f3ec] px-5 py-16 text-[#141920] sm:px-8 md:pr-24 lg:py-20">
          <div className="mx-auto grid max-w-[1680px] items-center gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-12">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">WhatsApp</p>
              <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Don't Replace WhatsApp.
                <span className="block">Connect It.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-[#3e4a59]">
                Your traders don't need another app to talk to suppliers.
              </p>
              <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-[#3e4a59]">
                TradeConnect connects WhatsApp communication to the trading workflow.
              </p>
              <ul className="mt-8 space-y-3 text-[16px] leading-relaxed text-[#3e4a59]">
                {[
                  'Send RFQs to multiple suppliers',
                  'Receive supplier rates and availability',
                  'Compare responses in TradeConnect',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-ag-gold-d" strokeWidth={2.25} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="min-w-0">
              <figure className="m-0 w-full">
                <picture>
                  <source srcSet={`${SHOTS}/tradeconnect-whatsapp.webp`} type="image/webp" />
                  <img
                    src={`${SHOTS}/tradeconnect-whatsapp.jpg`}
                    alt="WhatsApp request for steel scrap reaching several suppliers, with their rates compared on the TradeConnect supplier response screen"
                    width={1024}
                    height={576}
                    className="h-auto w-full rounded-2xl object-contain shadow-[0_16px_36px_-22px_rgba(0,0,0,0.45)]"
                  />
                </picture>
              </figure>
            </Reveal>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 bg-[#07101c] px-5 py-16 sm:px-8 md:pr-24 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold">The workflow</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                One Requirement. One Workspace. One Trade.
              </h2>
            </Reveal>
            <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

        <section className="bg-white px-5 py-16 text-[#141920] sm:px-8 md:pr-24 lg:py-20">
          <div className="mx-auto max-w-[1680px]">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">The product</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                The trading desk, on one screen.
              </h2>
            </Reveal>
          </div>
          <ProductShot
            className="mt-12"
            label="01 — Requirement Workspace"
            title="Know Every Requirement. From Demand to Dispatch."
            text="Create buyer requirements, track supplier progress and see what is pending, confirmed or ready for dispatch."
            src={`${SHOTS}/tradeconnect-requirements.jpg`}
            alt="TradeConnect requirements list on a laptop, with filters, buyer quantities, truck counts, and negotiation, PO, and dispatch statuses"
            width={1024}
            height={576}
          />
          <ProductShot
            className="mt-16 lg:mt-20"
            imageLeft
            label="02 — Supplier Responses"
            title="Every Supplier Response. In One Place."
            text="See supplier rates, availability and response status without searching through WhatsApp conversations."
            points={[
              'Compare supplier rates',
              'See availability and response status',
              'Follow up directly on WhatsApp',
            ]}
            src={`${SHOTS}/tradeconnect-supplier-responses.jpg`}
            alt="TradeConnect supplier responses for a steel scrap requirement, with rates, availability, and a WhatsApp reply"
            width={1024}
            height={576}
          />
          <ProductShot
            className="mt-16 lg:mt-20"
            label="03 — Purchase Order"
            title="Turn a Confirmed Deal Into a Purchase Order."
            text="Create the PO with material, quantity, rate, GST, freight and payment terms — connected to the trade."
            src={`${SHOTS}/tradeconnect-purchase-order.jpg`}
            alt="TradeConnect purchase order for steel scrap, showing quantity, rate, GST, truck count, and freight"
            width={1024}
            height={577}
          />
          <ProductShot
            className="mt-16 lg:mt-20"
            imageLeft
            label="04 — Dispatch & Trucks"
            title="Know Where Every Truck Stands."
            text="Track loading, in-transit and delivered vehicles with transporter, driver, destination and communication details."
            src={`${SHOTS}/tradeconnect-dispatch.jpg`}
            alt="TradeConnect dispatch board with trucks in loading, in transit, and delivered, plus truck details and status"
            width={1024}
            height={576}
          />
          <ProductShot
            className="mt-16 lg:mt-20"
            label="05 — Trade Register"
            title="Know Your Trade. From Purchase to Profit."
            text="Keep purchase, sale, transport, payments, documents, weight differences and margin together in one trade record."
            src={`${SHOTS}/tradeconnect-trade-register.jpg`}
            alt="TradeConnect trade register for a delivered steel scrap sauda, with quantity, rates, margin, payments, and the truck"
            width={1024}
            height={576}
          />
        </section>

        <section className="bg-ag-void px-5 py-16 sm:px-8 md:pr-24 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold">Why TradeConnect</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Not Another ERP.
                <span className="block">Not Another CRM.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-ag-silver">TradeConnect manages the operational trading workflow.</p>
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <div className="border border-white/10 bg-white/5 p-7">
                <h3 className="font-serif text-2xl text-ag-off">Traditional ERP</h3>
                <ul className="mt-6 space-y-3">
                  {erpItems.map((item) => (
                    <li key={item} className="border-b border-white/10 pb-3 text-ag-mist">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-white/10 bg-white/5 p-7">
                <h3 className="font-serif text-2xl text-ag-off">CRM</h3>
                <ul className="mt-6 space-y-3">
                  {crmItems.map((item) => (
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
          </div>
        </section>

        <section className="bg-white px-5 py-16 text-[#141920] sm:px-8 md:pr-24 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ag-gold-d">Who it is for</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                Built for trading desks that already run on WhatsApp.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map((name) => (
                <article key={name} className="border border-black/10 bg-[#f6f3ec] px-5 py-6">
                  <h3 className="font-serif text-2xl leading-snug">{name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#02040a] px-5 py-20 sm:px-8 md:pr-24 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Still Running Your Trading Desk on WhatsApp, Calls and Excel?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-ag-silver">
              See how TradeConnect can fit the way your trading team already works.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GoldButton href="/contact">Book a TradeConnect Demo</GoldButton>
              <GhostButton href="/contact">Talk to Algentrix</GhostButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
