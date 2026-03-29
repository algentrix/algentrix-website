import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

type Testimonial = {
  id: number
  name: string
  role: string
  image: string
  imageAlt: string
  review: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ashram Kale',
    role: 'Director, Kale Brothers',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=96&h=96&fit=crop',
    imageAlt: 'Business technology consulting and data analytics collaboration',
    review:
      'The financial analytics developed on top of our Tally data gave us clear visibility into our business performance. The dashboards and reports helped us make faster financial decisions and improved how we monitor operations across the company.',
  },
  {
    id: 2,
    name: 'Abhijeet Kokate',
    role: 'Founder, Enersoul',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=96&h=96&fit=crop',
    imageAlt: 'Professional workspace and technology consulting collaboration',
    review:
      'Their work helped us significantly improve our internal business processes, including payroll management and employee performance tracking. The systems they implemented brought better structure, transparency, and efficiency to our operations.',
  },
]

const Testimonials: React.FC = () => {
  const [active, setActive] = useState(0)
  const activeRef = useRef(active)
  activeRef.current = active
  const quoteRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  const crossFadeToIndex = useCallback((next: number) => {
    const el = quoteRef.current
    if (!el) {
      setActive(next)
      return
    }
    initGSAP()

    const tl = gsap.timeline()
    tl.to(el, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActive(next)
        setTimeout(() => {
          const q = quoteRef.current
          if (!q) return
          gsap.fromTo(
            q,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            }
          )
        }, 50)
      },
    })
  }, [])

  const switchTo = useCallback(
    (i: number) => {
      if (i === active) return
      crossFadeToIndex(i)
    },
    [active, crossFadeToIndex]
  )

  useEffect(() => {
    const id = window.setInterval(() => {
      const next = (activeRef.current + 1) % testimonials.length
      crossFadeToIndex(next)
    }, 6000)
    return () => clearInterval(id)
  }, [crossFadeToIndex])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    initGSAP()
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heading,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  const t = testimonials[active]

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ag-void px-8 py-28 text-white md:py-32"
    >
      {/* Enhanced background with parallax blurs */}
      <div className="absolute inset-0 bg-gradient-to-br from-ag-void via-ag-deep to-ag-navy" />
      <div className="absolute right-[15%] top-[15%] h-[350px] w-[350px] rounded-full bg-ag-gold/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute left-[10%] bottom-[20%] h-[250px] w-[250px] rounded-full bg-ag-gold-l/5 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />

      <div className="relative mx-auto max-w-6xl">
        <div ref={headingRef} className="mb-16 md:mb-20 text-center opacity-0">
          <p className="font-mono text-ag-gold text-sm uppercase tracking-[0.2em] mb-4">
            Client Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            What our <span className="text-ag-gold">clients say</span>
          </h2>
          <div className="mt-6 h-px max-w-[100px] mx-auto bg-gradient-to-r from-transparent via-ag-gold/30 to-transparent" />
        </div>

        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-12">
          <div
            ref={quoteRef}
            className="relative min-h-[200px] flex flex-col justify-center"
          >
            <div className="mb-4 font-serif text-6xl leading-none text-ag-gold/20 select-none">"</div>

            <blockquote className="font-serif text-xl md:text-2xl italic leading-relaxed text-ag-off mb-8">
              {t.review}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={t.image}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-ag-gold/30"
                  alt={t.imageAlt}
                  loading="lazy"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-ag-gold flex items-center justify-center">
                  <svg className="w-3 h-3 text-ag-void" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              </div>

              <div>
                <p className="font-bold text-ag-white text-lg">{t.name}</p>
                <p className="text-ag-mist">{t.role}</p>
              </div>
            </div>

            <div ref={starsRef} className="mt-7 flex gap-1.5 text-ag-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill="currentColor"
                  className="transition-all duration-300"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchTo(i)}
                className={`relative w-full border px-5 py-4 text-left transition-all duration-300 ${
                  active === i
                    ? 'border-ag-gold/30 bg-ag-navy/60 border-l-[3px] border-l-ag-gold scale-[1.02] shadow-lg shadow-ag-gold/10'
                    : 'border border-white/5 bg-transparent hover:border-ag-gold/20 hover:bg-ag-navy/30'
                }`}
              >
                {active === i && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ag-gold-l via-ag-gold to-ag-gold-d" />
                )}

                <div className={`font-semibold transition-colors duration-300 ${active === i ? 'text-ag-white' : 'text-ag-mist'}`}>
                  {item.name}
                </div>
                <div className="mt-1 text-xs text-ag-fog">{item.role}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
