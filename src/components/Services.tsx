import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  HiChartBar,
  HiComputerDesktop,
  HiCube,
  HiDevicePhoneMobile,
  HiCog6Tooth,
  HiLightBulb,
} from 'react-icons/hi2'
import { HiArrowRight } from 'react-icons/hi'
import { useReveal } from '../hooks/useReveal'
import { useStagger } from '../hooks/useStagger'

const services = [
  {
    icon: HiChartBar,
    title: 'Data Analytics & Dashboards',
    short: 'Turn business data into clear insights with powerful dashboards.',
    extended: 'We build custom analytics solutions using modern BI tools, real-time dashboards, and automated reporting that help you spot trends, track KPIs, and make data-driven decisions faster.',
  },
  {
    icon: HiComputerDesktop,
    title: 'Enterprise Software Development',
    short: 'Custom-built software for complex business operations.',
    extended: 'From CRM and ERP modules to workflow automation platforms, we design and develop scalable software that integrates with your existing systems and grows with your organization.',
  },
  {
    icon: HiCube,
    title: 'System Integration',
    short: 'Connect Tally, ERP, APIs, and internal tools seamlessly.',
    extended: 'We unify your technology stack—connecting accounting software, ERPs, e-commerce platforms, and custom APIs—so data flows smoothly across your business without manual re-entry.',
  },
  {
    icon: HiDevicePhoneMobile,
    title: 'Process Automation',
    short: 'Reduce manual work and improve efficiency.',
    extended: 'We identify repetitive tasks and automate them with RPA, workflow engines, and custom scripts—freeing your team to focus on higher-value work while reducing errors and delays.',
  },
  {
    icon: HiCog6Tooth,
    title: 'Technical Support & Maintenance',
    short: 'Reliable support to keep systems stable and running.',
    extended: 'Our support team provides proactive monitoring, quick issue resolution, and regular maintenance to minimize downtime and ensure your critical systems perform at their best.',
  },
  {
    icon: HiLightBulb,
    title: 'Technology Consulting',
    short: 'Expert guidance to choose and implement the right solutions.',
    extended: 'We help you evaluate options, plan roadmaps, and avoid costly mistakes—from vendor selection and architecture design to migration strategies and digital transformation.',
  },
]

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { once: true })
  useStagger(gridRef, { stagger: 0.08, once: true })

  return (
    <section className="py-28 md:py-32 px-8" id="services">
      <div ref={headingRef}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Core Services</h2>
        <p className="text-accent-green text-center mb-14 font-medium text-lg">From Data to Decisions.</p>
      </div>
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div
            key={i}
            className="group p-8 bg-bg-card rounded-xl border border-white/5 relative transition-all duration-300 ease-out hover:bg-bg-card-hover hover:scale-[1.03] hover:-translate-y-4 hover:border-accent-green/30 hover:shadow-[0_0_40px_rgba(0,255,136,0.12)]"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-green/10 flex items-center justify-center mb-5 group-hover:bg-accent-green/15 transition-colors duration-300">
              <service.icon className="text-accent-green" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-3 text-white">{service.title}</h3>
            <p className="text-text-muted text-sm leading-relaxed mb-3">{service.short}</p>
            <div className="overflow-hidden transition-all duration-300 ease-out max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100">
              <p className="text-text-muted text-sm leading-relaxed pt-3 border-t border-white/5 mt-2">
                {service.extended}
              </p>
            </div>
            <HiArrowRight className="absolute bottom-6 right-6 text-accent-orange opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={20} />
          </div>
        ))}
      </div>
      <p className="text-center mt-14 text-text-muted">
        <Link to="/contact" className="text-accent-orange hover:underline font-medium">Book a consultation</Link>
        {' '}to discuss your technology consulting and system integration needs.
      </p>
    </section>
  )
}
