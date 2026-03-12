import {
  HiChartBar,
  HiComputerDesktop,
  HiCube,
  HiDevicePhoneMobile,
  HiCog6Tooth,
  HiLightBulb,
} from 'react-icons/hi2'
import { HiArrowRight } from 'react-icons/hi'

const services = [
  {
    icon: HiChartBar,
    title: 'Data Analytics & Dashboards',
    desc: 'Turn business data into clear insights with powerful dashboards and reporting tools.',
  },
  {
    icon: HiComputerDesktop,
    title: 'Enterprise Software Development',
    desc: 'Custom-built software designed to support complex business operations and workflows.',
  },
  {
    icon: HiCube,
    title: 'System Integration',
    desc: 'Connect your business systems such as Tally, ERP platforms, APIs, and internal tools to create a seamless technology ecosystem.',
  },
  {
    icon: HiDevicePhoneMobile,
    title: 'Process Automation',
    desc: 'Reduce manual work and improve efficiency by automating key business processes.',
  },
  {
    icon: HiCog6Tooth,
    title: 'Technical Support & Maintenance',
    desc: 'Reliable technical support to maintain system stability, resolve issues quickly, and ensure continuous business operations.',
  },
  {
    icon: HiLightBulb,
    title: 'Technology Consulting',
    desc: 'Expert guidance to help businesses choose, design, and implement the right technology solutions.',
  },
]

export function Services() {
  return (
    <section className="py-24 px-8" data-scroll-section id="services">
      <h2 className="text-3xl font-bold text-center mb-4">Core Services</h2>
      <p className="text-accent-green text-center mb-12 font-medium">From Data to Decisions.</p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <div key={i} className="p-8 bg-bg-card rounded-xl border border-white/5 relative transition-all hover:bg-bg-card-hover hover:-translate-y-1">
            <service.icon className="text-[#a0a0b0] mb-4" size={28} />
            <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
            <p className="text-[#a0a0b0] text-sm leading-relaxed">{service.desc}</p>
            <HiArrowRight className="absolute bottom-6 right-6 text-accent-orange" size={20} />
          </div>
        ))}
      </div>
    </section>
  )
}
