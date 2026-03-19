import { useState, useRef, useEffect } from 'react'
import { HiEnvelope } from 'react-icons/hi2'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbdzylqr'
const THANK_YOU_URL = '/thank-you'

const SERVICE_OPTIONS = [
  'Data Analytics & Dashboards',
  'Business Intelligence (Power BI / Reporting)',
  'Data Engineering & Data Warehousing',
  'Custom Software Development',
  'System Integration (Tally / Zoho / APIs)',
  'Process Automation',
  'IT Consulting',
  'Other',
] as const

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypotRef.current?.value) return
    setStatus('sending')

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: formData.message,
      }

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setFormData({ name: '', phone: '', email: '', company: '', service: '', message: '' })
        window.location.href = THANK_YOU_URL
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const ref = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !contentRef.current || !ref.current) return
    initGSAP()
    const el = contentRef.current
    const section = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        }
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 md:py-32 px-8 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-green/15 via-accent-purple/20 to-accent-blue/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_30%,rgba(0,255,136,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_70%,rgba(139,92,246,0.12),transparent_50%)]" />
      <div className="absolute inset-0 border-y border-accent-green/20" />

      <div ref={contentRef} className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        <div>
          <h2 className="text-[2.25rem] md:text-[3rem] font-bold mb-5 tracking-tight text-white">
            Let&apos;s Build Something <span className="hero-gradient-text">Great Together</span>
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-8">
            Ready to transform your business with the right technology? Start with a free, no-obligation call.
          </p>
          <a
            href="mailto:contact@algentrix.com"
            className="inline-flex items-center gap-3 py-4 px-6 rounded-xl bg-white/5 border border-white/10 text-white font-medium transition-all hover:bg-accent-green/10 hover:border-accent-green/30 hover:text-accent-green"
          >
            <HiEnvelope size={22} />
            <span>contact@algentrix.com</span>
          </a>
        </div>

        <form className="p-8 bg-bg-card/95 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col gap-4 shadow-[0_0_40px_rgba(0,0,0,0.3)]" onSubmit={handleSubmit}>
          <input type="text" name="_gotcha" ref={honeypotRef} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-text-muted-soft"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-text-muted-soft"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-text-muted-soft"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-text-muted-soft"
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select Service
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-bg-card text-white">
                {opt}
              </option>
            ))}
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-text-muted-soft resize-y min-h-[100px]"
            rows={4}
          />
          {status === 'error' && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="py-4 px-8 btn-gradient text-bg-dark font-bold rounded-[10px] text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Book a Consultation'}
          </button>
        </form>
      </div>
    </section>
  )
}
