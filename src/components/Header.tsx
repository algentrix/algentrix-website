import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import AnimatedButton from './button/AnimatedButton'
import { AgMagneticButton } from './ag'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const h = () => setIsMobile(mq.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

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

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !navRef.current) return
    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches
    if (!isDesktop()) return

    initGSAP()
    const nav = navRef.current
    const links = nav.querySelectorAll<HTMLElement>('a')
    if (links.length === 0) return

    gsap.set(links, { opacity: 0, y: -12, scale: 0.98 })
    const tween = gsap.to(links, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      stagger: 0.05,
      delay: 0.2,
      ease: 'power3.out',
    })
    return () => {
      tween.kill()
    }
  }, [])

  const headerSurface =
    scrolled || isMobile
      ? 'bg-[rgba(2,4,10,0.94)] backdrop-blur-[24px] border-b border-ag-gold/15'
      : 'bg-transparent border-b border-transparent'

  return (
    <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ease-out ${headerSurface}`}>
      <div className="max-w-7xl mx-auto px-8 h-[72px] flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="font-serif text-[1.2rem] font-bold text-ag-white">
            Algen<span className="text-ag-gold">trix</span>
          </span>
        </Link>

        <nav
          ref={navRef}
          className={`flex gap-9 fixed top-[72px] left-0 right-0 flex-col py-8 px-8 bg-ag-void/98 border-b border-ag-gold/10 shadow-lg transition-all duration-300 md:static md:flex-row md:py-0 md:px-0 md:bg-transparent md:border-0 md:shadow-none md:translate-y-0 md:opacity-100 md:pointer-events-auto z-[999] ${
            !isMenuOpen ? '-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto' : 'translate-y-0 opacity-100 pointer-events-auto'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={getNavHref(link.href)}
              className="font-sans text-[11px] font-medium tracking-[0.14em] uppercase text-ag-mist transition-colors hover:text-ag-white"
              onClick={(e) => handleNavClickOrClose(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <AgMagneticButton>
            <AnimatedButton />
          </AgMagneticButton>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 bg-transparent p-3 h-12 w-12 touch-manipulation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <span className={`block w-6 h-0.5 bg-ag-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ag-white transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ag-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </div>
    </header>
  )
}
