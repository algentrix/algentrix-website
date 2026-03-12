import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AnimatedButton from './button/AnimatedButton'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#industries', label: 'Industries' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isThankYou = location.pathname === '/thank-you'

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const getNavHref = (href: string) => (isThankYou ? (href === '#contact' ? '/#contact' : '/') : href)
  const handleNavClickOrClose = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isThankYou) setIsMenuOpen(false)
    else handleNavClick(e, href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-[rgba(10,10,15,0.9)] backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="font-mono text-lg font-semibold text-matrix-green tracking-tight drop-shadow-[0_0_8px_rgba(0,255,65,0.5)] hover:text-accent-green transition-colors" onClick={() => setIsMenuOpen(false)}>
          <span className="text-white/90">[</span>Algentrix<span className="text-white/90">]</span>
        </Link>

        <nav className={`flex gap-6 fixed top-[60px] left-0 right-0 flex-col py-8 px-8 bg-bg-dark border-b border-white/5 shadow-lg transition-all duration-300 md:static md:flex-row md:py-0 md:px-0 md:bg-transparent md:border-0 md:shadow-none md:gap-8 md:translate-y-0 md:opacity-100 md:pointer-events-auto z-[999] ${!isMenuOpen ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getNavHref(link.href)}
              className="text-[#a0a0b0] text-[0.95rem] font-medium transition-colors hover:text-white"
              onClick={(e) => handleNavClickOrClose(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <AnimatedButton />
        </div>

        <button
          className="md:hidden flex flex-col justify-center gap-1.5 bg-transparent p-2 -mr-2 h-10 w-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>
    </header>
  )
}
