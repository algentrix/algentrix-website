import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'
import AnimatedButton from './button/AnimatedButton'
import { AgMagneticButton } from './ag'

const navLinks = [
  { label: 'Home', to: '/', hash: '#home' },
  { label: 'About', to: '/about', hash: '#about' },
  { label: 'Services', to: '/services', hash: '#services' },
  { label: 'Works', to: '/works' },
  { label: 'Contact', to: '/contact', hash: '#contact' },
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

  const onHome = location.pathname === '/'
  const consultationHref = onHome ? '#contact' : '/contact'

  const handleHashClick = (event: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault()
    setIsMenuOpen(false)
    const el = document.querySelector(hash)
    if (!(el instanceof HTMLElement)) return
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80)
    window.scrollTo({ top, behavior: 'smooth' })
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
          className={`fixed top-[72px] left-0 right-0 z-[999] flex flex-col gap-6 bg-ag-void/98 px-8 py-8 shadow-lg border-b border-ag-gold/10 transition-all duration-300 md:static md:flex-row md:items-center md:gap-4 md:bg-transparent md:px-0 md:py-0 md:border-0 md:shadow-none md:translate-y-0 md:opacity-100 md:pointer-events-auto lg:gap-7 ${
            !isMenuOpen ? '-translate-y-full opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto' : 'translate-y-0 opacity-100 pointer-events-auto'
          }`}
        >
          {navLinks.map((link) => {
            const className = `font-sans text-[11px] font-medium tracking-[0.14em] uppercase transition-colors hover:text-ag-white ${
              location.pathname === link.to ? 'text-ag-gold' : 'text-ag-mist'
            }`
            if (onHome && link.hash) {
              return (
                <a key={link.label} href={link.hash} className={className} onClick={(event) => handleHashClick(event, link.hash)}>
                  {link.label}
                </a>
              )
            }
            return (
              <Link key={link.label} to={link.to} className={className} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            )
          })}
          <div className="pt-2 md:hidden" onClick={() => setIsMenuOpen(false)}>
            <AnimatedButton href={consultationHref} />
          </div>
        </nav>

        <div className="hidden md:block">
          <AgMagneticButton>
            <AnimatedButton href={consultationHref} />
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
