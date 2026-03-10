import {
  HiCog6Tooth,
  HiBanknotes,
  HiTruck,
  HiShoppingBag,
  HiCpuChip,
  HiBriefcase,
} from 'react-icons/hi2'

const industries = [
  { icon: HiCog6Tooth, label: 'Manufacturing' },
  { icon: HiBanknotes, label: 'Financial Services' },
  { icon: HiTruck, label: 'Logistics & Supply Chain' },
  { icon: HiShoppingBag, label: 'Retail & Distribution' },
  { icon: HiCpuChip, label: 'Technology Companies' },
  { icon: HiBriefcase, label: 'Professional Services' },
]

export function Expertise() {
  return (
    <section className="py-24 px-8" data-scroll-section id="industries">
      <h2 className="text-3xl font-bold text-center mb-4">
        Industries <span className="text-accent-green">Served</span>
      </h2>
      <p className="text-accent-green text-center mb-12 font-medium">
        Technology solutions designed for industries shaping tomorrow.
      </p>
      <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {industries.map((item, i) => (
          <div key={i} className="p-6 bg-bg-card rounded-xl border border-white/5 flex flex-col items-center gap-3 transition-colors hover:bg-bg-card-hover">
            <item.icon className="text-[#a0a0b0]" size={32} />
            <span className="text-sm font-medium text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
