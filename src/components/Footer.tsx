import { Link } from 'react-router-dom'
import { FaLinkedinIn } from 'react-icons/fa'

const isExternalLink = (href: string) => href.startsWith('#') || href.startsWith('http')

const servicesLinks = [
  { label: 'Data Analytics & Dashboards', href: '/services' },
  { label: 'Enterprise Software Development', href: '/services' },
  { label: 'System Integration', href: '/services' },
  { label: 'Process Automation', href: '/services' },
  { label: 'Technical Support', href: '/services' },
  { label: 'Technology Consulting', href: '/services' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '#contact' },
  { label: 'Talk to Our Experts', href: '/contact' },
]

const legalLinks = [
  { label: 'Terms and Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

export function Footer() {
  return (
    <footer className="py-20 pt-10 px-8 bg-bg-card border-t border-white/5" >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-16">
        <div>
          <Link to="/" className="font-mono text-lg font-semibold text-matrix-green tracking-tight drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] hover:text-accent-green transition-colors inline-block mb-4">
            <span className="text-white/90">[</span>Algentrix<span className="text-white/90">]</span>
          </Link>
          <p className="text-text-muted text-[0.95rem] leading-relaxed mb-6 max-w-[320px]">
            Algentrix provides technology consulting, data analytics solutions, enterprise software development, system integration services, business automation, and technical support services for modern businesses.
          </p>
          <div className="flex gap-4">
            <a href="https://linkedin.com/company/algentrix" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[10px] bg-white/5 flex items-center justify-center text-text-muted transition-all hover:bg-accent-orange hover:text-bg-dark" aria-label="LinkedIn">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="text-base font-semibold mb-4 text-white/90">Services</h4>
            <ul className="list-none">
              {servicesLinks.map((link) => (
                <li key={link.label} className="mb-2">
                  <Link to={link.href} className="text-text-muted text-sm transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-white/90">Company</h4>
            <ul className="list-none">
              {companyLinks.map((link) => (
                <li key={link.label} className="mb-2">
                  {isExternalLink(link.href) ? (
                    <a href={link.href} className="text-text-muted text-sm transition-colors hover:text-white">{link.label}</a>
                  ) : (
                    <Link to={link.href} className="text-text-muted text-sm transition-colors hover:text-white">{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-4 text-white/90">Legal</h4>
            <ul className="list-none">
              {legalLinks.map((link) => (
                <li key={link.label} className="mb-2">
                  <Link to={link.href} className="text-text-muted text-sm transition-colors hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center">
        <p className="text-text-muted text-sm">
          © {new Date().getFullYear()} Algentrix. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
