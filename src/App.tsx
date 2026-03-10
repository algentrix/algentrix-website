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

function App() {
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

export default App
