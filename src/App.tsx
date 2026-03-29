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
    description: 'Privacy policy for Algentrix technology consulting and software services.',
    canonical: `${BASE_URL}/privacy-policy`,
  },
  '/terms': {
    title: 'Terms and Conditions | Algentrix',
    description: 'Terms and conditions for Algentrix technology consulting and software services.',
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

function LegalPage({ title, content }: { title: string; content: string }) {
  return (
    <>
      <Header />
      <main className="min-h-screen py-32 px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">{title}</h1>
          <p className="text-text-muted leading-relaxed">{content}</p>
        </div>
      </main>
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
        <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" content="This page contains the privacy policy for Algentrix. Contact us at contact@algentrix.com for more information." />} />
        <Route path="/terms" element={<LegalPage title="Terms and Conditions" content="This page contains the terms and conditions for Algentrix services. Contact us at contact@algentrix.com for more information." />} />
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
