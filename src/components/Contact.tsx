import { useState, useRef } from 'react'
import { HiEnvelope } from 'react-icons/hi2'

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

  return (
    <section className="py-24 px-8 relative overflow-hidden" data-scroll-section id="contact">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 pointer-events-none top-1/2 -right-36 -translate-y-1/2 bg-gradient-to-br from-accent-purple/40 via-accent-blue/30 to-accent-orange/20" />

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative">
        <div>
          <h2 className="text-[2.25rem] font-bold mb-4">Ready to improve your technology systems?</h2>
          <p className="text-[#a0a0b0] text-[1.05rem] leading-relaxed mb-8">
            Let&apos;s discuss how we can help your business grow.
          </p>
          <div className="flex flex-col gap-4">
            <a href="mailto:contact@algentrix.com" className="flex items-center gap-3 text-[#a0a0b0] transition-colors hover:text-accent-orange">
              <HiEnvelope size={20} />
              <span>contact@algentrix.com</span>
            </a>
          </div>
        </div>

        <form className="p-8 bg-bg-card rounded-2xl border border-white/5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="_gotcha" ref={honeypotRef} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0]"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0]"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0]"
          />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0] appearance-none cursor-pointer"
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
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0] resize-y min-h-[100px]"
            rows={4}
          />
          {status === 'error' && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="py-4 px-8 bg-accent-orange text-bg-dark font-bold rounded-[10px] text-base transition-all hover:-translate-y-0.5 hover:shadow-glow-orange disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Book a Consultation'}
          </button>
        </form>
      </div>
    </section>
  )
}
