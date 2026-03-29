import { useLayoutEffect, useRef } from 'react'
import {
  HiMagnifyingGlass,
  HiCubeTransparent,
  HiShieldCheck,
  HiArrowPath,
} from 'react-icons/hi2'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

const steps = [
  {
    icon: HiMagnifyingGlass,
    title: 'Understand the Business',
    desc: 'Analyze business processes, identify challenges, and define clear objectives for transformation.',
  },
  {
    icon: HiCubeTransparent,
    title: 'Design Scalable Architecture',
    desc: 'Build future‑proof systems using modern, cloud-native technologies that scale effortlessly.',
  },
  {
    icon: HiShieldCheck,
    title: 'Build Reliable Platforms',
    desc: 'Develop high‑quality, maintainable software with robust security and performance.',
  },
  {
    icon: HiArrowPath,
    title: 'Continuous Improvement',
    desc: 'Provide ongoing optimization, support, and iterative enhancements for sustained success.',
  },
]

export function EngineeringApproach() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    initGSAP()
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!section || !left || !right) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    tl.fromTo(left, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' })
      .fromTo(
        right,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0.2
      )

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [])

  const leftSteps = steps.slice(0, 2)
  const rightSteps = steps.slice(2, 4)

  return (
    <section ref={sectionRef} className="relative px-8 py-28 md:py-32 bg-ag-void overflow-hidden" id="approach">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/4 w-48 h-48 bg-ag-gold/3 blur-[80px]" />
        <div className="absolute right-0 bottom-1/4 w-56 h-56 bg-ag-gold-l/3 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-ag-gold to-transparent mx-auto mb-4" />
            <p className="text-ag-gold font-mono text-sm uppercase tracking-wider">Our Process</p>
          </div>
          <h2 className="mb-5 text-3xl font-bold tracking-tight text-ag-white md:text-4xl">
            Engineering <span className="text-ag-gold">Excellence</span>
          </h2>
          <p className="text-ag-silver text-lg max-w-2xl mx-auto">
            A structured, collaborative approach to delivering solutions that drive real business outcomes.
          </p>
        </div>

        <div className="grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div ref={leftRef} className="space-y-6 opacity-0">
            {leftSteps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i} />
            ))}
          </div>
          <div ref={rightRef} className="space-y-6 opacity-0">
            {rightSteps.map((step, i) => (
              <StepCard key={step.title} step={step} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  index
}: {
  step: typeof steps[number]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  const onEnter = () => {
    const card = cardRef.current
    const icon = iconRef.current
    if (!card || !icon) return

    gsap.to(card, { y: -6, duration: 0.3, ease: 'power2.out' })
    gsap.to(icon, { rotate: 10, scale: 1.15, duration: 0.3, ease: 'power2.out' })
  }

  const onLeave = () => {
    const card = cardRef.current
    const icon = iconRef.current
    if (!card || !icon) return

    gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
    gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-xl border border-ag-gold/10 bg-ag-deep/80 backdrop-blur-sm p-6 md:p-8 transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ag-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div
        ref={iconRef}
        className="relative mb-5 inline-flex w-14 h-14 items-center justify-center rounded-lg bg-ag-gold/5 transition-all duration-300 group-hover:bg-ag-gold/10 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.15)]"
      >
        <step.icon className="text-ag-gold" size={28} />
        <div className="absolute inset-0 rounded-lg border border-ag-gold/20 group-hover:border-ag-gold/30 transition-all" />
      </div>

      <h3 className="mb-3 text-lg font-semibold text-ag-white transition-colors duration-300 group-hover:text-ag-gold-l">
        {step.title}
      </h3>

      <p className="text-sm leading-relaxed text-ag-mist">{step.desc}</p>

      <div className="absolute top-4 right-4 text-4xl font-serif font-black text-ag-gold/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}
