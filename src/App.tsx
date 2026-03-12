import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import Hero from './components/Hero'
import { Partners } from './components/Partners'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Services } from './components/Services'
import { Portfolio } from './components/Portfolio'
import { Expertise } from './components/Expertise'
import { EngineeringApproach } from './components/EngineeringApproach'
import { Support } from './components/Support'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import Testimonials from './components/Testimonials'
import { ThankYou } from './components/ThankYou'

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <WhyChooseUs />
        <Services />
        <Portfolio />
        <Expertise />
        <EngineeringApproach />
        <Support />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  )
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

export default App
