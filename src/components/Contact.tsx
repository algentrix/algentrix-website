import { useState } from 'react'
import { HiEnvelope } from 'react-icons/hi2'

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setStatus('idle')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const params = new URLSearchParams()
      params.append('form-name', 'contact')
      params.append('name', `${formData.firstName} ${formData.lastName}`.trim())
      params.append('email', formData.email)
      params.append('phone', formData.phone)
      params.append('message', formData.message)

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })

      if (res.ok) {
        setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' })
        setStatus('success')
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
          <h2 className="text-[2.25rem] font-bold mb-4">Let&apos;s Build Intelligent Technology Together</h2>
          <p className="text-[#a0a0b0] text-[1.05rem] leading-relaxed mb-8">
            The future belongs to businesses powered by intelligent systems.
          </p>
          <div className="flex flex-col gap-4">
            <a href="mailto:contact@algentrix.com" className="flex items-center gap-3 text-[#a0a0b0] transition-colors hover:text-accent-orange">
              <HiEnvelope size={20} />
              <span>contact@algentrix.com</span>
            </a>
          </div>
        </div>

        <form className="p-8 bg-bg-card rounded-2xl border border-white/5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Name"
            value={formData.firstName}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
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
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="py-4 px-5 bg-black/30 border border-white/10 rounded-[10px] text-white text-base placeholder:text-[#a0a0b0] resize-y min-h-[100px]"
            rows={4}
          />
          {status === 'success' && (
            <p className="text-accent-green text-sm">Thank you! Your message has been sent.</p>
          )}
          {status === 'error' && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="py-4 px-8 bg-accent-orange text-bg-dark font-bold rounded-[10px] text-base transition-all hover:-translate-y-0.5 hover:shadow-glow-orange disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? 'Sending...' : 'Request Consultation'}
          </button>
        </form>
      </div>
    </section>
  )
}
