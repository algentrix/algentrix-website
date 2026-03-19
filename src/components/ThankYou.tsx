import { Link } from 'react-router-dom'

export function ThankYou() {
  return (
    <section className="min-h-screen flex items-center justify-center px-8 py-28 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-35 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-accent-purple/40 via-accent-blue/30 to-accent-orange/20" />
      <div className="max-w-[600px] mx-auto text-center relative">
        <h1 className="text-[2.5rem] sm:text-[3rem] font-bold mb-6 tracking-tight">Thank You</h1>
        <p className="text-text-muted text-[1.1rem] leading-relaxed mb-10">
          Thank you for contacting Algentrix.
          <br />
          Our team will contact you within 24 hours.
        </p>
        <Link
          to="/"
          className="inline-block py-4 px-8 btn-gradient text-bg-dark font-bold rounded-[10px] text-base transition-all hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
