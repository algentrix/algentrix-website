export function Partners() {
  const partners = ['Kale Brothers', 'Enersoul', 'And many more']

  return (
    <section className="py-16 overflow-hidden" data-scroll-section>
      <h2 className="font-mono text-2xl font-bold py-10 text-center text-matrix-green tracking-tight drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">Client List</h2>
      <div className="relative">
        <div className="flex animate-scroll-partners w-max">
          {[...partners, ...partners].map((name, i) => (
            <div key={i} className="flex-shrink-0 px-12 py-6 mx-4 bg-bg-card rounded-xl flex items-center justify-center min-w-[200px]">
              <span className="font-serif text-xl font-semibold text-[#a0a0b0]">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
