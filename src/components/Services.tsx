import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import { SectionTag } from './SectionTag'

/** Aligned with AG.zip `SVCS` + reference card (index / title / desc / tags) */
const SERVICES = [
  {
    n: '01',
    title: 'Data Analytics',
    desc: 'End-to-end analytics ecosystems — from data warehousing and ETL pipelines to predictive modeling and real-time dashboards that power C-suite decisions.',
    tags: ['Business Intelligence', 'Predictive Models', 'Data Engineering'],
  },
  {
    n: '02',
    title: 'Technology Consulting',
    desc: 'Strategic advisory across digital transformation, cloud migration, technology selection, and organisational change — grounded in measurable business outcomes.',
    tags: ['Digital Transformation', 'Cloud Strategy', 'IT Roadmapping'],
  },
  {
    n: '03',
    title: 'AI & Automation',
    desc: 'Deploy intelligent automation and machine learning solutions that eliminate friction, surface insights, and create sustainable competitive moats.',
    tags: ['Machine Learning', 'RPA', 'NLP Solutions'],
  },
  {
    n: '04',
    title: 'Cloud Architecture',
    desc: 'Design and implement resilient, scalable cloud infrastructure across AWS, Azure, and GCP — optimised for performance, security, and total cost of ownership.',
    tags: ['AWS', 'Azure', 'GCP', 'FinOps'],
  },
  {
    n: '05',
    title: 'Systems Integration',
    desc: 'Seamless connectivity across your entire technology landscape. API design, legacy modernisation, and enterprise platform integration with zero data loss.',
    tags: ['API Design', 'ETL Pipelines', 'Legacy Modernisation'],
  },
  {
    n: '06',
    title: 'Managed Support',
    desc: '24/7 enterprise-grade technical support with defined SLAs, proactive monitoring, incident response, and a dedicated team that knows your systems inside out.',
    tags: ['24/7 Support', 'SLA Management', 'Monitoring'],
  },
] as const


function ServiceCard({
  item,
  index,
}: {
  item: (typeof SERVICES)[number]
  index: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    initGSAP()
    const card = rootRef.current
    if (!card) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none',
      }
    })

    tl.fromTo(card,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay: (index % 3) * 0.1,
      }
    )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [index])

  const onEnter = () => {
    setHover(true)
    const card = rootRef.current
    const bar = barRef.current
    const icon = iconRef.current
    if (!card || !bar) return

    gsap.to(bar, { scaleX: 1, duration: 0.4, ease: 'power3.out' })
    gsap.to(card, {
      backgroundColor: 'rgba(10, 22, 40, 0.7)',
      y: -6,
      duration: 0.4,
      ease: 'power2.out'
    })
    if (icon) {
      gsap.to(icon, { rotate: 5, scale: 1.1, duration: 0.3, ease: 'power2.out' })
    }
  }

  const onLeave = () => {
    setHover(false)
    const card = rootRef.current
    const bar = barRef.current
    const icon = iconRef.current
    if (!card || !bar) return

    gsap.to(bar, { scaleX: 0, duration: 0.3, ease: 'power3.in' })
    gsap.to(card, {
      backgroundColor: 'transparent',
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
    if (icon) {
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
    }
  }

  return (
    <div
      ref={rootRef}
      className="service-card relative overflow-hidden border-b border-r border-ag-gold/10 px-6 md:px-9 py-8 md:py-11 opacity-0 group"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-ag-gold/0 to-ag-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        ref={barRef}
        className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-ag-gold to-ag-gold-l"
        aria-hidden
      />

      <div
        ref={iconRef}
        className="mb-6 relative w-12 h-12 rounded-lg bg-ag-gold/5 flex items-center justify-center transition-all duration-300"
      >
        <div className="w-6 h-6 rounded-full bg-ag-gold/20" />
      </div>

      <div className="mb-1 font-mono text-[10px] font-bold tracking-[0.25em] text-ag-gold-d opacity-60">
        {item.n}
      </div>

      <h3
        className={`mb-4 font-serif text-[1.5rem] font-bold leading-[1.2] tracking-[-0.01em] transition-all duration-300 ${
          hover ? 'text-ag-white translate-x-1' : 'text-ag-off'
        }`}
      >
        {item.title}
      </h3>

      <p className="mb-6 font-sans text-[0.9375rem] font-light leading-[1.85] text-ag-mist transition-colors duration-300">
        {item.desc}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className={`rounded-sm border px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
              hover
                ? 'border-ag-gold/40 bg-ag-gold/5 text-ag-gold-l'
                : 'border-ag-gold/10 text-ag-fog'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Services() {
  const headRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !headRef.current) return
    initGSAP()
    const head = headRef.current
    const tween = gsap.fromTo(
      head,
      { y: 48, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: head, start: 'top 85%' },
      }
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-ag-void px-[5%] py-24 md:py-28" id="services">
      <div
        className="pointer-events-none absolute right-[-5%] top-[20%] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(201,168,76,0.04),transparent_70%)]"
        aria-hidden
      />

      <div ref={headRef} className="relative mx-auto mb-14 max-w-7xl opacity-0">
        <SectionTag>Capabilities</SectionTag>
        <h2 className="mt-5 font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-[1.05] tracking-[-0.02em] text-ag-white">
          What we
          <br />
          <em className="font-serif not-italic text-ag-gold">deliver</em>
        </h2>
        <div
          className="mt-3.5 h-px max-w-[100px] bg-gradient-to-r from-ag-gold to-transparent opacity-45"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 border-t border-l border-ag-gold/10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((item, i) => (
          <ServiceCard key={item.n} item={item} index={i} />
        ))}
      </div>

      <p className="relative mx-auto mt-14 max-w-7xl text-center text-ag-silver">
        <Link to="/contact" className="font-medium text-ag-gold transition-colors hover:text-ag-gold-l hover:underline">
          Book a consultation
        </Link>{' '}
        to discuss your technology consulting and system integration needs.
      </p>
    </section>
  )
}
