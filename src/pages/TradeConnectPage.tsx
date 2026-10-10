import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { initGSAP, ScrollTrigger } from '../lib/gsap'
import './tradeconnect-case.css'

const ASSET = '/products/tradeconnect/case'

const screens = [
  {
    key: 'workspace',
    index: '01',
    title: 'Requirement workspace',
    hint: 'Demand, replies and the next action',
    label: 'REQUIREMENT / SUPPLIER CONVERSATIONS',
    description: 'One place to source suppliers, review replies and continue into commercial decisions.',
  },
  {
    key: 'calls',
    index: '02',
    title: "Today's Calls",
    hint: 'Supplier readiness & follow-ups',
    label: 'DAILY WORK / EXPECTED MATERIAL',
    description: 'Prioritised supplier outreach: callbacks, production readiness and follow-ups.',
  },
  {
    key: 'deal',
    index: '03',
    title: 'Sauda & purchase order',
    hint: 'Commercial terms, made explicit',
    label: 'COMMERCIAL / CONFIRM AND FORMALIZE',
    description: 'Review agreed terms, confirm allocation and carry the deal forward into a purchase order.',
  },
  {
    key: 'dispatch',
    index: '04',
    title: 'Dispatch workspace',
    hint: 'Trucks, drivers and delivery stages',
    label: 'EXECUTION / DISPATCH DETAILS',
    description: 'Transporter, vehicle and driver details alongside recorded delivery stages.',
  },
] as const

const steps = [
  {
    tab: 'Requirement',
    label: 'CAPTURE BUYER DEMAND',
    title: 'Start with a clear requirement.',
    description:
      'Record buyer, material, quantity, rate, destination and trade date. Matching material, destination and date can be grouped into a demand pool.',
    tags: ['Buyer', 'Material & quantity', 'Destination'],
    caption: 'THE DEMAND THAT STARTS THE TRADE',
    image: 'requirements',
    imageTitle: 'Requirements',
    alt: 'TradeConnect requirements showcase highlighting filters, buyer demand, quantities and truck status',
  },
  {
    tab: 'Source',
    label: 'REACH THE RIGHT SUPPLIERS',
    title: 'Keep the conversation connected.',
    description:
      'Plan a WhatsApp RFQ, select suppliers and review delivery and responses. Record availability, counteroffers and proposed truck quantities in the same workspace.',
    tags: ['RFQ broadcast', 'Replies', 'Negotiation'],
    caption: 'THE CONVERSATIONS THAT SHAPE THE DEAL',
    image: 'supplier-responses',
    imageTitle: 'Supplier responses',
    alt: 'TradeConnect supplier responses showcase highlighting rates, availability and WhatsApp replies',
  },
  {
    tab: 'Sauda',
    label: 'CONFIRM COMMERCIAL TERMS',
    title: 'Turn agreement into Sauda.',
    description:
      'Review rate, quantity, truck count and freight. A draft keeps the proposed terms available for review. Confirming Sauda locks allocation and unlocks PO generation.',
    tags: ['Review terms', 'Confirm Sauda', 'Lock allocation'],
    caption: 'THE DECISION THAT COMMITS THE QUANTITY',
    image: 'trade-register',
    imageTitle: 'Trade register / Sauda',
    alt: 'TradeConnect trade register showcase highlighting agreed terms, quantities, margins and connected dispatch',
  },
  {
    tab: 'Purchase order',
    label: 'FORMALIZE THE AGREEMENT',
    title: 'Give the handoff a shared record.',
    description:
      'Preview and generate the purchase order, send it to the supplier and track confirmation. The PO becomes the commercial input for the dispatch workspace.',
    tags: ['PO preview', 'Supplier confirmation', 'Dispatch input'],
    caption: 'THE RECORD THAT CARRIES THE TERMS',
    image: 'purchase-order',
    imageTitle: 'Purchase order',
    alt: 'TradeConnect purchase order showcase highlighting quantity, rate, GST, trucks and freight',
  },
  {
    tab: 'Dispatch',
    label: 'COORDINATE THE TRUCKS',
    title: 'Move from terms to transport.',
    description:
      'Choose a transporter, assign vehicles and capture driver details. Advance each truck through recorded field stages and flag issues that need attention.',
    tags: ['Transporter', 'Driver contact', 'Truck stages'],
    caption: 'THE TRUCKS THAT MOVE THE MATERIAL',
    image: 'dispatch',
    imageTitle: 'Dispatch & trucks',
    alt: 'TradeConnect dispatch showcase highlighting truck details and recorded delivery status',
  },
  {
    tab: 'Delivered',
    label: 'COMPLETE THE HANDOFF',
    title: 'Bring the journey through delivery.',
    description:
      'Advance from In Transit to Reached Buyer and Delivered as field updates arrive. The requirement retains the commercial and execution context of the trade.',
    tags: ['Reached buyer', 'Delivered', 'Trade history'],
    caption: 'THE FINAL HANDOFF, STILL CONNECTED',
    image: 'trade-register',
    imageTitle: 'Delivered / trade register',
    alt: 'TradeConnect trade register showcase showing delivered quantity, completed truck and trade details',
  },
] as const

function Wordmark() {
  return (
    <>
      Algen<span>trix</span>
      <i aria-hidden="true">✳</i>
    </>
  )
}

export function TradeConnectPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const introPlayed = useRef(false)
  const [screenIndex, setScreenIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showMotionToggle, setShowMotionToggle] = useState(false)
  const [preview, setPreview] = useState<{ src: string; title: string } | null>(null)

  const screen = screens[screenIndex]
  const step = steps[stepIndex]
  const stepNumber = String(stepIndex + 1).padStart(2, '0')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    html.style.scrollPaddingTop = '95px'
    html.style.scrollBehavior = paused || reduced ? 'auto' : 'smooth'
    return () => {
      html.style.scrollPaddingTop = ''
      html.style.scrollBehavior = ''
    }
  }, [paused])

  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    let ticking = false
    const progress = () => {
      const length = document.documentElement.scrollHeight - window.innerHeight
      const value = length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0
      bar.style.transform = `scaleX(${value})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(progress)
      }
    }
    progress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', progress)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', progress)
    }
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setShowMotionToggle(!reduced.matches)
    sync()
    reduced.addEventListener('change', sync)
    if (reduced.matches || paused) {
      return () => reduced.removeEventListener('change', sync)
    }

    initGSAP()
    const playIntro = !introPlayed.current
    introPlayed.current = true
    let ambient: gsap.core.Timeline | undefined

    const ctx = gsap.context(() => {
      if (playIntro) {
        gsap
          .timeline({ defaults: { ease: 'power3.out', clearProps: 'opacity,transform' } })
          .from('.hero-meta', { y: 10, opacity: 0, duration: 0.6 })
          .from('.hero-copy .eyebrow', { y: 15, opacity: 0, duration: 0.6 }, 0.15)
          .from('.hero-line', { y: 35, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.25)
          .from('.hero-description, .pill-link', { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.55)
          .from('.hero-map', { opacity: 0, y: 18, duration: 1 }, 0.4)
      }
      ambient = gsap.timeline({ repeat: -1, yoyo: true }).to('.map-core', {
        boxShadow: '0 0 70px #bded5628',
        duration: 5,
        ease: 'sine.inOut',
      })
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 22,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          immediateRender: false,
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: element, start: 'top 93%', once: true },
        })
      })
    }, root)

    const onVisibility = () => ambient?.paused(document.hidden || paused)
    document.addEventListener('visibilitychange', onVisibility)
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      reduced.removeEventListener('change', sync)
      ctx.revert()
    }
  }, [paused])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!preview || !dialog) return
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()
    return () => {
      document.body.style.overflow = ''
    }
  }, [preview])

  function openPreview(src: string, title: string, opener: HTMLElement) {
    openerRef.current = opener
    setPreview({ src, title })
  }

  function closePreview() {
    dialogRef.current?.close()
  }

  return (
    <div ref={rootRef} className={paused ? 'tc-page motion-paused' : 'tc-page'}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div ref={progressRef} className="reading-progress" aria-hidden="true" />
      <header className="site-header">
        <div className="header-wrap">
          <Link className="wordmark" to="/" aria-label="Algentrix home">
            <Wordmark />
          </Link>
          <nav aria-label="Case study navigation">
            <a href="#experience">The product</a>
            <a href="#workflow">The workflow</a>
            <a href="#watch">Watch</a>
            <a href="#foundation">The build</a>
          </nav>
          <div className="header-actions">
            <button
              className="motion-toggle"
              type="button"
              hidden={!showMotionToggle}
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? 'Resume motion' : 'Pause motion'}
            </button>
            <Link className="contact-link" to="/contact">
              Let’s talk <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="wrap">
            <div className="hero-meta">
              <Link to="/works">SELECTED WORK ↗</Link>
              <span>COMMODITY TRADING / PRODUCT ENGINEERING</span>
              <span>ALGENTRIX CASE STUDY</span>
            </div>
            <div className="hero-layout">
              <div className="hero-copy">
                <p className="eyebrow">
                  <span className="status-dot" aria-hidden="true" /> TRADECONNECT
                </p>
                <h1 id="hero-title">
                  <span className="hero-line">Every trade.</span>
                  <span className="hero-line">
                    <em>Connected.</em>
                  </span>
                </h1>
                <p className="hero-description">
                  From buyer demand to delivered.
                  <br />
                  A shared workspace for the conversations,
                  <br className="desktop-break" /> decisions and trucks that move trade forward.
                </p>
                <a className="pill-link" href="#experience">
                  Explore the product <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="hero-map" aria-label="TradeConnect connects buyer demand, supplier sourcing and dispatch">
                <div className="map-orbit orbit-one" aria-hidden="true" />
                <div className="map-orbit orbit-two" aria-hidden="true" />
                <svg className="map-lines" viewBox="0 0 460 410" aria-hidden="true">
                  <path d="M230 204L86 73M230 204L376 73M230 204L376 335M230 204L86 335" />
                  <circle cx="230" cy="204" r="100" />
                  <circle cx="230" cy="204" r="151" strokeDasharray="3 9" />
                </svg>
                <div className="map-core">
                  <span aria-hidden="true">↗</span>
                  <b>TradeConnect</b>
                  <small>ONE SHARED WORKSPACE</small>
                </div>
                <div className="map-node node-buyer">
                  <span>01 / DEMAND</span>
                  <b>Buyer requirement</b>
                  <small>Material · Qty · Destination</small>
                </div>
                <div className="map-node node-supplier">
                  <span>02 / SOURCE</span>
                  <b>Supplier conversations</b>
                  <small>WhatsApp · Replies · Terms</small>
                </div>
                <div className="map-node node-deal">
                  <span>03 / CONFIRM</span>
                  <b>Sauda & PO</b>
                  <small>The commercial handoff</small>
                </div>
                <div className="map-node node-delivery">
                  <span>04 / DELIVER</span>
                  <b>Truck dispatch</b>
                  <small>Assigned → Delivered</small>
                </div>
              </div>
            </div>
            <div className="hero-stage">
              <div className="stage-label">
                <span>A CLOSER LOOK AT THE WORKSPACE</span>
                <span>DESIGNED AROUND THE TRADE ↗</span>
              </div>
              <div className="device-scene">
                <button
                  className="browser-device hero-browser"
                  type="button"
                  aria-label="Enlarge requirement workspace screenshot"
                  onClick={(event) =>
                    openPreview(
                      `${ASSET}/web-workspace.jpg`,
                      'Requirement workspace — local application capture',
                      event.currentTarget,
                    )
                  }
                >
                  <span className="browser-chrome">
                    <span aria-hidden="true">● ● ●</span>
                    <span>TRADECONNECT / REQUIREMENT WORKSPACE</span>
                    <span aria-hidden="true">⤢</span>
                  </span>
                  <img
                    src={`${ASSET}/web-workspace.jpg`}
                    width={1440}
                    height={920}
                    alt="Actual TradeConnect supplier workspace with demo supplier offers and quoted rates"
                  />
                </button>
                <button
                  className="phone-device hero-phone"
                  type="button"
                  aria-label="Enlarge responsive dispatch screenshot"
                  onClick={(event) =>
                    openPreview(
                      `${ASSET}/mobile-dispatch.jpg`,
                      'Dispatch — responsive web application capture',
                      event.currentTarget,
                    )
                  }
                >
                  <img
                    src={`${ASSET}/mobile-dispatch.jpg`}
                    width={390}
                    height={844}
                    alt="Actual TradeConnect mobile truck board showing demo vehicles in transit and loading"
                  />
                </button>
                <div className="floating-note">
                  <span aria-hidden="true">↔</span>
                  <div>
                    <b>Context travels with the trade.</b>
                    <small>Requirement → Sauda → Dispatch</small>
                  </div>
                </div>
              </div>
              <p className="reference-note">
                Actual local application captures using an isolated demo database. Click a screen to explore.
              </p>
            </div>
          </div>
        </section>

        <div className="scope-strip">
          <div className="wrap scope-grid">
            <div>
              <span>THE PRODUCT</span>
              <b>TradeConnect</b>
            </div>
            <div>
              <span>THE PEOPLE</span>
              <b>Trading desks · Owners · Transport teams</b>
            </div>
            <div>
              <span>THE EXPERIENCE</span>
              <b>Responsive web workspace</b>
            </div>
            <div>
              <span>THE FOUNDATION</span>
              <b>React · .NET · SQL Server</b>
            </div>
          </div>
        </div>

        <section className="section cream" id="overview" aria-labelledby="overview-title">
          <div className="wrap">
            <div className="section-label">
              <span>01 / THE CHALLENGE</span>
              <span>KEEP THE WHOLE TRADE IN VIEW</span>
            </div>
            <div className="editorial-head">
              <h2 id="overview-title" data-reveal>
                Trade moves fast.
                <br />
                <em>Context should keep up.</em>
              </h2>
              <div className="editorial-copy" data-reveal>
                <p>
                  A buyer needs material. Suppliers respond with rates and availability. A deal is agreed, a purchase
                  order is issued and trucks begin moving. Every step creates another handoff.
                </p>
                <p>
                  TradeConnect brings those handoffs into one requirement workspace, with the language and working
                  habits of Indian commodity traders at its centre.
                </p>
              </div>
            </div>
            <div className="challenge-grid">
              <article data-reveal>
                <span className="card-index">01 / DEMAND</span>
                <h3>Capture the ask once.</h3>
                <p>Keep buyer, material, quantity, destination and trade date together as sourcing begins.</p>
              </article>
              <article data-reveal>
                <span className="card-index">02 / CONVERSATION</span>
                <h3>Keep replies in context.</h3>
                <p>Connect supplier outreach, counteroffers and proposed quantities to the requirement they serve.</p>
              </article>
              <article data-reveal>
                <span className="card-index">03 / EXECUTION</span>
                <h3>Carry the deal forward.</h3>
                <p>Move confirmed commercial terms through PO creation and the delivery stages of each truck.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section experience" id="experience" aria-labelledby="experience-title">
          <div className="wrap">
            <div className="section-label">
              <span>02 / THE PRODUCT EXPERIENCE</span>
              <span>THE WORK, CONNECTED</span>
            </div>
            <div className="section-heading">
              <h2 id="experience-title" data-reveal>
                A busy trading desk.
                <br />
                <em>A clearer next step.</em>
              </h2>
              <p data-reveal>
                A focused workspace for the people making the calls, agreeing the terms and coordinating delivery.
                Explore four moments in the product.
              </p>
            </div>
            <div className="web-showcase" data-reveal>
              <div className="screen-selector" role="group" aria-label="Choose a product reference">
                {screens.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    className={index === screenIndex ? 'screen-choice active' : 'screen-choice'}
                    aria-pressed={index === screenIndex}
                    onClick={() => setScreenIndex(index)}
                  >
                    <span>{item.index}</span>
                    <b>{item.title}</b>
                    <small>{item.hint}</small>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>
              <div className="web-preview">
                <button
                  className="browser-device gallery-browser"
                  type="button"
                  aria-label={`Enlarge ${screen.title} screenshot`}
                  onClick={(event) =>
                    openPreview(`${ASSET}/web-${screen.key}.jpg`, `${screen.title} — local application capture`, event.currentTarget)
                  }
                >
                  <span className="browser-chrome">
                    <span aria-hidden="true">● ● ●</span>
                    <span>{screen.label}</span>
                    <span aria-hidden="true">⤢</span>
                  </span>
                  <img
                    src={`${ASSET}/web-${screen.key}.jpg`}
                    width={1440}
                    height={920}
                    alt={`Actual local TradeConnect ${screen.title} capture with demo data`}
                    loading="lazy"
                  />
                </button>
                <div className="screen-caption">
                  <p aria-live="polite">{screen.description}</p>
                  <span>APPLICATION CAPTURE / DEMO DATA</span>
                </div>
              </div>
            </div>
            <div className="feature-grid">
              <article data-reveal>
                <span className="feature-icon" aria-hidden="true">
                  ↗
                </span>
                <h3>WhatsApp, in the workflow.</h3>
                <p>
                  Send RFQs to selected suppliers from the requirement workspace. Delivery and replies support the
                  sourcing conversation.
                </p>
                <div className="small-tags">
                  <span>Broadcast</span>
                  <span>Supplier replies</span>
                  <span>Negotiation</span>
                </div>
              </article>
              <article data-reveal>
                <span className="feature-icon" aria-hidden="true">
                  ◇
                </span>
                <h3>Confirm with clarity.</h3>
                <p>
                  Review rate, quantity, truck count and freight. Confirming Sauda locks allocation before the purchase
                  order handoff.
                </p>
                <div className="small-tags">
                  <span>Sauda</span>
                  <span>Allocation</span>
                  <span>Purchase order</span>
                </div>
              </article>
              <article data-reveal>
                <span className="feature-icon" aria-hidden="true">
                  →
                </span>
                <h3>Know the next truck stage.</h3>
                <p>
                  Assign transporters and vehicles, capture driver contact and update field progress from assignment
                  through delivery.
                </p>
                <div className="small-tags">
                  <span>Truck board</span>
                  <span>Driver contact</span>
                  <span>Need Attention</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section journey cream" id="workflow" aria-labelledby="workflow-title">
          <div className="wrap">
            <div className="section-label">
              <span>03 / THE CONNECTED WORKFLOW</span>
              <span>FROM THE FIRST ASK TO THE FINAL HANDOFF</span>
            </div>
            <div className="section-heading">
              <h2 id="workflow-title" data-reveal>
                One requirement.
                <br />
                <em>The whole journey.</em>
              </h2>
              <p data-reveal>
                Each decision builds on the one before it. Select a stage to follow the trade through the workspace.
              </p>
            </div>
            <div className="workflow-tabs" role="group" aria-label="Explore trading stages">
              {steps.map((item, index) => (
                <button
                  key={item.tab}
                  type="button"
                  className={index === stepIndex ? 'active' : undefined}
                  aria-pressed={index === stepIndex}
                  onClick={() => setStepIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item.tab}
                </button>
              ))}
            </div>
            <div className="workflow-panel">
              <div>
                <p className="eyebrow">
                  {stepNumber} / {step.label}
                </p>
                <h3>{step.title}</h3>
                <p aria-live="polite">{step.description}</p>
                <div className="small-tags">
                  {step.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <figure className="workflow-visual">
                <button
                  className="workflow-image-button"
                  type="button"
                  aria-label={`Enlarge ${step.imageTitle} product showcase`}
                  onClick={(event) =>
                    openPreview(
                      `${ASSET}/tradeconnect-${step.image}.webp`,
                      `${step.imageTitle} — supplied product showcase`,
                      event.currentTarget,
                    )
                  }
                >
                  <img
                    src={`${ASSET}/tradeconnect-${step.image}.webp`}
                    width={1024}
                    height={576}
                    alt={step.alt}
                    loading="lazy"
                  />
                  <span className="workflow-enlarge" aria-hidden="true">
                    ⤢
                  </span>
                </button>
                <figcaption>
                  <span className="workflow-counter" aria-hidden="true">
                    {stepNumber}
                  </span>
                  <span className="workflow-caption">{step.caption}</span>
                  <span className="workflow-image-hint">CLICK TO ENLARGE ↗</span>
                </figcaption>
              </figure>
            </div>
            <p className="workflow-note">
              Quantity follows truck count × actual load per truck. A proposal or draft Sauda does not allocate demand;
              confirmation does.
            </p>
          </div>
        </section>

        <section className="section mobile-section" id="mobile" aria-labelledby="mobile-title">
          <div className="wrap mobile-layout">
            <div className="mobile-copy">
              <div className="section-label">
                <span>04 / AWAY FROM THE DESK</span>
              </div>
              <h2 id="mobile-title" data-reveal>
                The work keeps moving.
                <br />
                <em>So can you.</em>
              </h2>
              <p data-reveal>
                A responsive web experience keeps daily calls and dispatch context accessible on smaller screens.
                Purposeful navigation puts the daily work close at hand.
              </p>
              <div className="mobile-benefits">
                <article data-reveal>
                  <span>01</span>
                  <div>
                    <h3>Make the next call.</h3>
                    <p>Supplier readiness and callback queues help the desk focus its outreach.</p>
                  </div>
                </article>
                <article data-reveal>
                  <span>02</span>
                  <div>
                    <h3>Follow the handoff.</h3>
                    <p>Truck and driver details remain connected to the PO and requirement.</p>
                  </div>
                </article>
                <article data-reveal>
                  <span>03</span>
                  <div>
                    <h3>Speak the trader’s language.</h3>
                    <p>Sauda, MT, parties and freight keep the experience grounded in daily work.</p>
                  </div>
                </article>
              </div>
              <p className="reference-note">
                Actual responsive web captures from the local application using demo data. The mobile experience shown
                is the web app.
              </p>
            </div>
            <div className="mobile-pair" data-reveal>
              <figure>
                <button
                  className="phone-device"
                  type="button"
                  aria-label="Enlarge responsive Today's Calls screenshot"
                  onClick={(event) =>
                    openPreview(
                      `${ASSET}/mobile-calls.jpg`,
                      "Today's Calls — responsive web application capture",
                      event.currentTarget,
                    )
                  }
                >
                  <img
                    src={`${ASSET}/mobile-calls.jpg`}
                    width={390}
                    height={844}
                    alt="Actual mobile web view of demo supplier outreach and availability actions"
                    loading="lazy"
                  />
                </button>
                <figcaption>01 / DAILY OUTREACH</figcaption>
              </figure>
              <figure>
                <button
                  className="phone-device"
                  type="button"
                  aria-label="Enlarge responsive dispatch screenshot"
                  onClick={(event) =>
                    openPreview(
                      `${ASSET}/mobile-dispatch.jpg`,
                      'Dispatch — responsive web application capture',
                      event.currentTarget,
                    )
                  }
                >
                  <img
                    src={`${ASSET}/mobile-dispatch.jpg`}
                    width={390}
                    height={844}
                    alt="Actual mobile web truck board with demo driver details and delivery actions"
                    loading="lazy"
                  />
                </button>
                <figcaption>02 / DISPATCH CONTEXT</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="section foundation" id="foundation" aria-labelledby="foundation-title">
          <div className="wrap">
            <div className="section-label">
              <span>05 / BEHIND THE EXPERIENCE</span>
              <span>BUILT FOR CONNECTED OPERATIONS</span>
            </div>
            <div className="section-heading">
              <h2 id="foundation-title" data-reveal>
                Focused on the surface.
                <br />
                <em>Connected underneath.</em>
              </h2>
              <p data-reveal>
                A responsive React frontend connects to a shared .NET API and SQL Server foundation. Identity, business
                rules and operational records support the entire trade.
              </p>
            </div>
            <div className="architecture" data-reveal>
              <div className="architecture-node">
                <span>THE WORKSPACE</span>
                <b>React + TypeScript</b>
                <small>Responsive web · TanStack Query</small>
              </div>
              <span className="architecture-arrow" aria-hidden="true">
                →
              </span>
              <div className="architecture-node core-node">
                <span>THE BUSINESS LOGIC</span>
                <b>ASP.NET Core 9</b>
                <small>Identity · Requirements · Sauda · Dispatch</small>
              </div>
              <span className="architecture-arrow" aria-hidden="true">
                →
              </span>
              <div className="architecture-node">
                <span>THE SHARED RECORD</span>
                <b>SQL Server</b>
                <small>Entity Framework Core</small>
              </div>
            </div>
            <div className="engineering-grid">
              <article data-reveal>
                <span>01 / ACCESS</span>
                <h3>Responsibility shapes access.</h3>
                <p>Trading, transport and administration roles guide which tools are available to each person.</p>
              </article>
              <article data-reveal>
                <span>02 / COMMUNICATION</span>
                <h3>Outreach meets operations.</h3>
                <p>MSG91 WhatsApp integration supports supplier RFQs and document handoffs when configured.</p>
              </article>
              <article data-reveal>
                <span>03 / EXECUTION</span>
                <h3>Rules protect the handoff.</h3>
                <p>
                  Confirmed allocation and active-trip checks help keep commercial quantities and truck assignments
                  coherent.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section cream" id="outcomes" aria-labelledby="outcomes-title">
          <div className="wrap">
            <div className="section-label">
              <span>06 / PRODUCT OUTCOMES</span>
              <span>PRACTICAL VALUE AT EVERY HANDOFF</span>
            </div>
            <div className="editorial-head">
              <h2 id="outcomes-title" data-reveal>
                Less lost context.
                <br />
                <em>More connected work.</em>
              </h2>
              <div className="editorial-copy" data-reveal>
                <p>
                  The result is a product foundation that connects sourcing, commercial agreement and physical delivery
                  around the same requirement.
                </p>
              </div>
            </div>
            <div className="outcome-grid">
              <article data-reveal>
                <span aria-hidden="true">↗</span>
                <div>
                  <h3>A daily starting point.</h3>
                  <p>Prioritised calls and supplier availability give the desk an actionable route into the day.</p>
                </div>
              </article>
              <article data-reveal>
                <span aria-hidden="true">↔</span>
                <div>
                  <h3>Conversations with context.</h3>
                  <p>Supplier responses and negotiation stay attached to the buyer demand behind them.</p>
                </div>
              </article>
              <article data-reveal>
                <span aria-hidden="true">◇</span>
                <div>
                  <h3>A defined commercial handoff.</h3>
                  <p>Sauda confirmation and PO generation make agreed terms explicit before dispatch begins.</p>
                </div>
              </article>
              <article data-reveal>
                <span aria-hidden="true">→</span>
                <div>
                  <h3>Delivery progress in view.</h3>
                  <p>Per-PO truck boards connect transport assignment and recorded stages through delivery.</p>
                </div>
              </article>
            </div>
            <p className="evidence-note">
              These outcomes describe implemented capabilities. Time savings, revenue growth and efficiency improvements
              have not been independently measured. All screen values are demo data from an isolated local database.
            </p>
          </div>
        </section>

        <section className="section product-details" aria-labelledby="details-title">
          <div className="wrap details-layout">
            <div>
              <p className="eyebrow">A LITTLE MORE CONTEXT</p>
              <h2 id="details-title">
                The details.
                <br />
                <em>Made clear.</em>
              </h2>
            </div>
            <div className="faq">
              <details>
                <summary>Who is TradeConnect built for?</summary>
                <p>
                  Internal teams at Indian commodity trading businesses: sales operators, owners and transport managers
                  coordinating buyer requirements, supplier sourcing and delivery.
                </p>
              </details>
              <details>
                <summary>How does WhatsApp fit into the product?</summary>
                <p>
                  The requirement workspace supports supplier RFQ broadcasts, replies and commercial document handoffs
                  through configured messaging services. Provider setup and approved templates govern availability.
                </p>
              </details>
              <details>
                <summary>What connects Sauda, purchase orders and dispatch?</summary>
                <p>
                  They continue from the requirement workspace. Confirming Sauda locks allocation, purchase orders
                  formalize the commercial terms, and per-PO truck boards support delivery execution.
                </p>
              </details>
              <details>
                <summary>Does the dispatch board show live GPS?</summary>
                <p>
                  The current workflow records field stages such as Loading, In Transit and Delivered. It does not imply
                  live GPS tracking.
                </p>
              </details>
              <details>
                <summary>Are these live product screenshots?</summary>
                <p>
                  The desktop gallery and mobile views are captured directly from the local TradeConnect application
                  using an isolated demo database. The journey section uses supplied product showcase images. Mobile
                  views show the actual responsive web interface.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section className="section video-section" id="watch" aria-labelledby="watch-title">
          <div className="wrap">
            <div className="section-label">
              <span>WATCH TRADECONNECT</span>
              <span>HINDI AND ENGLISH</span>
            </div>
            <div className="section-heading">
              <h2 id="watch-title" data-reveal>
                See the workflow.
                <br />
                <em>In your language.</em>
              </h2>
              <p data-reveal>
                Two walkthroughs of the same connected trade, from the buyer requirement through supplier replies, Sauda,
                purchase orders and dispatch.
              </p>
            </div>
            <div className="video-grid">
              <figure className="video-card" data-reveal>
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/Fbf4uYsDDV4"
                    title="TradeConnect walkthrough in Hindi"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>01 / HINDI</span>
                  <span>हिन्दी</span>
                </figcaption>
              </figure>
              <figure className="video-card" data-reveal>
                <div className="video-frame">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/caGtRpeT9rc"
                    title="TradeConnect walkthrough in English"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <figcaption>
                  <span>02 / ENGLISH</span>
                  <span>WALKTHROUGH</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="cta" aria-labelledby="cta-title">
          <div className="wrap">
            <p className="eyebrow">LET’S BUILD WHAT’S NEXT</p>
            <h2 id="cta-title" data-reveal>
              Your business.
              <br />
              <em>Better connected.</em>
            </h2>
            <div className="cta-bottom">
              <p>
                A product built around the way your people work.
                <br />
                From the first conversation to the final handoff.
              </p>
              <Link className="cta-link" to="/contact">
                Discuss your project <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <span className="cta-watermark" aria-hidden="true">
            Algentrix
          </span>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Link className="wordmark" to="/">
            Algen<span>trix</span>
          </Link>
          <span>TradeConnect / Product engineering case study</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        className="screen-dialog"
        aria-labelledby="dialog-title"
        onClose={() => {
          document.body.style.overflow = ''
          setPreview(null)
          openerRef.current?.focus({ preventScroll: true })
          openerRef.current = null
        }}
        onClick={(event) => {
          const dialog = event.currentTarget
          const rect = dialog.getBoundingClientRect()
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          ) {
            dialog.close()
          }
        }}
      >
        <div className="dialog-bar">
          <h2 id="dialog-title">{preview?.title ?? 'Product reference'}</h2>
          <button className="dialog-close" type="button" aria-label="Close screen preview" onClick={closePreview}>
            Close ×
          </button>
        </div>
        <div className="dialog-image-wrap">
          <img className="dialog-image" src={preview?.src ?? `${ASSET}/web-workspace.jpg`} alt={preview?.title ?? ''} />
        </div>
        <p>Product reference with demo data. Escape closes the preview.</p>
      </dialog>
    </div>
  )
}
