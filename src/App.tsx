import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import Hero from './components/Hero'
import { Problem } from './components/Problem'
import { HowWeWork } from './components/HowWeWork'
import { Services } from './components/Services'
import { CaseStudies } from './components/CaseStudies'
import { Showcase } from './components/Showcase'
import { Support } from './components/Support'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import Testimonials from './components/Testimonials'
import { ThankYou } from './components/ThankYou'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsAndConditions } from './pages/TermsAndConditions'
import { SEO } from './components/SEO'
import { Starfield } from './components/Starfield'
import { Stats } from './components/Stats'
import { AgCustomCursor, AgMarquee } from './components/ag'
import { ScrollProgress } from './components/ScrollProgress'

const BASE_URL = 'https://algentrix.com'

const PAGE_SEO: Record<string, { title: string; description: string; canonical?: string }> = {
  '/': {
    title: 'Algentrix | Technology Consulting, Analytics & Technical Support',
    description: 'Algentrix provides technology consulting, analytics solutions, enterprise software development, system integration, and reliable technical support for modern businesses.',
    canonical: `${BASE_URL}/`,
  },
  '/services': {
    title: 'Technology Services | Analytics, Software Development & IT Support',
    description: 'Explore Algentrix services including analytics dashboards, enterprise software development, system integration, automation, and technical support.',
    canonical: `${BASE_URL}/services`,
  },
  '/about': {
    title: 'About Algentrix | Technology Consulting Company',
    description: 'Learn about Algentrix, a technology consulting company delivering analytics solutions, enterprise software systems, and technical support services.',
    canonical: `${BASE_URL}/about`,
  },
  '/contact': {
    title: 'Contact Algentrix | Book a Consultation',
    description: 'Contact Algentrix to discuss technology consulting, analytics solutions, custom software development, or technical support services.',
    canonical: `${BASE_URL}/contact`,
  },
  '/thank-you': {
    title: 'Thank You | Algentrix',
    description: 'Thank you for contacting Algentrix. Our team will contact you within 24 hours.',
    canonical: `${BASE_URL}/thank-you`,
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Algentrix',
    description:
      'Learn how Algentrix collects, uses, stores, and protects user information for WorkPulse attendance and workforce management solutions.',
    canonical: `${BASE_URL}/privacy-policy`,
  },
  '/terms': {
    title: 'Terms & Conditions | Algentrix',
    description:
      'Read the Terms & Conditions for using the Algentrix website and WorkPulse attendance and workforce management platform.',
    canonical: `${BASE_URL}/terms`,
  },
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AgMarquee />
        <Stats />
        <Problem />
        <HowWeWork />
        <Services />
        <CaseStudies />
        <Showcase />
        <Support />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function ScrollToSection({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const el = document.getElementById(sectionId)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [sectionId])
  return <HomePage />
}

function ThankYouPage() {
  return (
    <>
      <Header />
      <ThankYou />
      <Footer />
    </>
  )
}

function AppWithSEO() {
  const location = useLocation()
  const seo = PAGE_SEO[location.pathname] ?? PAGE_SEO['/']

  return (
    <>
      <AgCustomCursor />
      <Starfield />
      <ScrollProgress />
      <SEO title={seo.title} description={seo.description} canonical={seo.canonical} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ScrollToSection sectionId="services" />} />
        <Route path="/about" element={<ScrollToSection sectionId="about" />} />
        <Route path="/contact" element={<ScrollToSection sectionId="contact" />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppWithSEO />
    </BrowserRouter>
  )
}

export default App
