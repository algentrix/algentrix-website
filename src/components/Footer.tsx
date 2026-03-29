import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedinIn, FaEnvelope, FaPhone } from 'react-icons/fa'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

const isExternalLink = (href: string) => href.startsWith('#') || href.startsWith('http')

const servicesLinks = [
  { label: 'Data Analytics', href: '/services' },
  { label: 'Technology Consulting', href: '/services' },
  { label: 'AI & Automation', href: '/services' },
  { label: 'Cloud Architecture', href: '/services' },
  { label: 'Systems Integration', href: '/services' },
  { label: 'Managed Support', href: '/services' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !footerRef.current) return
    initGSAP()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer
      ref={footerRef}
      className="relative py-24 px-8 bg-ag-void border-t border-ag-gold/10 overflow-hidden opacity-0"
    >
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-ag-gold/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ag-gold-l/5 blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-16 mb-12">
          {/* Brand column */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center mb-5 group"
            >
              <span className="font-serif text-[1.2rem] font-bold text-ag-white group-hover:text-ag-gold-l transition-colors">
                Algen<span className="text-ag-gold group-hover:text-ag-gold-l transition-colors">trix</span>
              </span>
            </Link>

            <p className="text-ag-mist text-sm leading-relaxed mb-6 max-w-[300px]">
              Partnering with enterprise leaders to architect data-driven advantage — from analytics infrastructure to AI-powered operations.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              <a
                href="mailto:contact@algentrix.com"
                className="inline-flex items-center gap-3 text-ag-silver hover:text-ag-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-ag-gold/10 flex items-center justify-center group-hover:bg-ag-gold/20 transition-colors">
                  <FaEnvelope size={14} className="text-ag-gold" />
                </div>
                <span className="text-sm">contact@algentrix.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center gap-3 text-ag-silver hover:text-ag-gold transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-ag-gold/10 flex items-center justify-center group-hover:bg-ag-gold/20 transition-colors">
                  <FaPhone size={14} className="text-ag-gold" />
                </div>
                <span className="text-sm">+1 (234) 567-890</span>
              </a>
            </div>

            <div className="flex gap-3">
              <a
                href="https://linkedin.com/company/algentrix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-ag-gold/5 border border-ag-gold/10 flex items-center justify-center text-ag-mist transition-all hover:bg-ag-gold hover:text-ag-void hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={16} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-ag-gold">Services</h4>
              <ul className="space-y-2.5">
                {servicesLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-ag-mist hover:text-ag-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-ag-gold">Company</h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    {isExternalLink(link.href) ? (
                      <a
                        href={link.href}
                        className="text-sm text-ag-mist hover:text-ag-white transition-colors hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-ag-mist hover:text-ag-white transition-colors hover:translate-x-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-5 text-ag-gold">Legal</h4>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-ag-mist hover:text-ag-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-ag-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ag-fog text-xs">
            © {currentYear} Algentrix. All rights reserved.
          </p>
          <p className="text-ag-fog text-xs">
            Crafted with <span className="text-ag-gold">♥</span> for excellence
          </p>
        </div>
      </div>
    </footer>
  )
}
