const TICKER = [
  'Data Analytics',
  'Cloud Architecture',
  'AI & Automation',
  'Technology Consulting',
  'Technical Support',
  'Systems Integration',
  'Business Intelligence',
  'Digital Transformation',
]

/** AG.zip-style infinite ticker */
export function AgMarquee() {
  const items = [...TICKER, ...TICKER]
  return (
    <div
      className="border-y border-ag-gold/10 bg-ag-deep py-[17px] overflow-hidden"
      aria-hidden
    >
      <div className="flex w-max animate-ag-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`font-sans text-[10px] font-semibold tracking-[0.18em] uppercase px-9 ${
              i % 2 === 0 ? 'text-ag-mist' : 'text-ag-gold-d'
            }`}
          >
            {item}
            <span className="ml-9 text-ag-fog">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
