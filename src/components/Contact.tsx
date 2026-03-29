import { useState, useRef, useLayoutEffect } from 'react'
import { HiEnvelope } from 'react-icons/hi2'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import { AgMagneticField } from './ag'
import { SectionTag } from './SectionTag'

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
  const decorativeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    initGSAP()
    const section = ref.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      const decorative = decorativeRef.current
      if (decorative) {
        gsap.to(decorative, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden" id="contact">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-ag-void" />
      <div className="absolute inset-0 bg-gradient-to-br from-ag-gold/5 via-transparent to-ag-gold-l/5 opacity-50" />

      {/* Animated blur orbs */}
      <div
        ref={decorativeRef}
        className="absolute left-[5%] top-[20%] w-64 h-64 bg-ag-gold/8 blur-[100px] rounded-full"
        aria-hidden
      />
      <div
        className="absolute right-[10%] bottom-[30%] w-80 h-80 bg-ag-gold-l/6 blur-[120px] rounded-full animate-pulse"
        style={{ animationDuration: '8s' }}
        aria-hidden
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center"
        >
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-block">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-gradient-to-r from-transparent to-ag-gold" />
                <span className="text-ag-gold text-xs font-mono uppercase tracking-[0.2em]">
                  Get in Touch
                </span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent to-ag-gold" />
              </div>
              <SectionTag>Let's Connect</SectionTag>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
              Let&apos;s Build <span className="text-gradient-accent">Great Things</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl mt-2 block text-ag-silver font-light">
                Together
              </span>
            </h2>

            <p className="text-ag-mist text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Have a project in mind? We&apos;d love to hear about it. Let&apos;s discuss how we can help transform your business with cutting-edge technology solutions.
            </p>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto lg:mx-0">
              <div className="group p-5 rounded-xl border border-ag-gold/10 bg-ag-deep/50 backdrop-blur-sm hover:border-ag-gold/30 transition-all duration-300 hover:bg-ag-deep/80 cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-ag-gold/10 flex items-center justify-center mb-3 group-hover:bg-ag-gold/20 transition-colors">
                  <HiEnvelope className="text-ag-gold" size={22} />
                </div>
                <p className="text-xs text-ag-fog uppercase tracking-wider mb-1">Email</p>
                <p className="text-ag-white font-medium">contact@algentrix.com</p>
              </div>

              <div className="group p-5 rounded-xl border border-ag-gold/10 bg-ag-deep/50 backdrop-blur-sm hover:border-ag-gold/30 transition-all duration-300 hover:bg-ag-deep/80 cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-ag-gold/10 flex items-center justify-center mb-3 group-hover:bg-ag-gold/20 transition-colors">
                  <svg className="text-ag-gold" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <p className="text-xs text-ag-fog uppercase tracking-wider mb-1">Phone</p>
                <p className="text-ag-white font-medium">+1 (234) 567-890</p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-ag-mist">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ag-gold animate-pulse" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-ag-gold-l animate-pulse" style={{ animationDelay: '1s' }} />
                <span>Free consultation</span>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="relative">
            {/* Decorative corner elements */}
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-ag-gold/30 rounded-tl-xl" />
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-ag-gold/30 rounded-br-xl" />

            <form
              className="relative bg-ag-deep/80 backdrop-blur-2xl rounded-2xl border border-ag-gold/15 p-6 md:p-8 lg:p-10 shadow-2xl"
              onSubmit={handleSubmit}
            >
              {/* Form header */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-ag-white mb-2">Start a Conversation</h3>
                <p className="text-ag-mist text-sm">Tell us about your project and we'll get back to you shortly.</p>
              </div>

              {/* Form fields */}
              <div className="space-y-5">
                <input type="text" name="_gotcha" ref={honeypotRef} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                  />
                </div>

                <FormField
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  type="email"
                />

                <FormField
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                />

                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ag-fog mb-2">
                    Service Interest
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full py-4 px-5 bg-ag-navy/50 border border-ag-gold/20 rounded-xl text-ag-white appearance-none cursor-pointer transition-all hover:border-ag-gold/40 focus:border-ag-gold focus:outline-none focus:ring-2 focus:ring-ag-gold/20"
                    >
                      <option value="" disabled className="bg-ag-deep">
                        Select a service
                      </option>
                      {SERVICE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-ag-deep text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-ag-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-ag-fog mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Describe your project, goals, and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full py-4 px-5 bg-ag-navy/50 border border-ag-gold/20 rounded-xl text-white resize-none transition-all hover:border-ag-gold/40 focus:border-ag-gold focus:outline-none focus:ring-2 focus:ring-ag-gold/20 min-h-[120px]"
                    rows={4}
                  />
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative w-full py-5 px-8 bg-gradient-to-r from-ag-gold-d via-ag-gold to-ag-gold-l text-ag-void font-bold rounded-xl text-base md:text-lg transition-all hover:scale-[1.01] hover:shadow-[0_0_50px_rgba(201,168,76,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-ag-void" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Book a Consultation</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-ag-gold-l via-ag-gold to-ag-gold-d opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mt-16 flex items-center justify-center">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-ag-gold/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text'
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  placeholder: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-ag-fog mb-2">
        {label}
      </label>
      <AgMagneticField className="w-full">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full py-4 px-5 bg-ag-navy/50 border border-ag-gold/15 rounded-xl text-ag-white transition-all hover:border-ag-gold/30 focus:border-ag-gold focus:outline-none focus:ring-2 focus:ring-ag-gold/20 placeholder:text-ag-fog/60"
        />
      </AgMagneticField>
    </div>
  )
}
