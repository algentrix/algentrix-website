import {
  HiChartBar,
  HiComputerDesktop,
  HiCube,
  HiDevicePhoneMobile,
  HiCog6Tooth,
} from 'react-icons/hi2'
import { HiArrowRight } from 'react-icons/hi'

const services = [
  {
    icon: HiChartBar,
    title: 'AI & Data Analytics',
    desc: 'Predictive analytics, business intelligence dashboards, machine learning models, and data engineering pipelines.',
  },
  {
    icon: HiComputerDesktop,
    title: 'Custom Software Development',
    desc: 'Custom SaaS platforms, enterprise applications, and workflow automation systems.',
  },
  {
    icon: HiCube,
    title: 'ERP Solutions',
    desc: 'ERP implementation, ERP customization, and business process automation.',
  },
  {
    icon: HiDevicePhoneMobile,
    title: 'Mobile Application Development',
    desc: 'Android enterprise applications, workforce management apps, and logistics and operations apps.',
  },
  {
    icon: HiCog6Tooth,
    title: 'IT Consulting',
    desc: 'Digital transformation strategy, technology architecture, and system integration.',
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
