const stats = [
  { value: '50', label: 'Happy Customer' },
  { value: '20+', label: 'Project Completed' },
  { value: '10+', label: 'Years of Experience' },
  { value: '90%', label: 'Success Rate' },
]

export function Stats() {
  return (
    <section className="py-16 px-8" data-scroll-section>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 bg-bg-card rounded-xl border border-white/5 text-center">
            <span className="block text-4xl font-bold text-accent-green mb-2">{stat.value}</span>
            <span className="text-[#a0a0b0] text-[0.95rem]">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
