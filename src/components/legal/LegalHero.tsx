import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

type LegalHeroProps = {
  title: string
  effectiveDate: string
  subtitle: string
  titleId?: string
}

export function LegalHero({
  title,
  effectiveDate,
  subtitle,
  titleId = 'legal-hero-title',
}: LegalHeroProps) {
  return (
    <section
      aria-labelledby={titleId}
      className="border-b border-ag-gold/15 bg-gradient-to-b from-ag-deep/40 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-16">
        <motion.div
          className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ag-mist mb-3">
              Algentrix · Legal
            </p>
            <h1
              id={titleId}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ag-white tracking-tight leading-tight mb-4"
            >
              {title}
            </h1>
            <p className="text-base sm:text-lg text-ag-gold font-medium mb-2">
              Effective {effectiveDate}
            </p>
            <p className="text-ag-silver text-base sm:text-lg leading-relaxed max-w-2xl">{subtitle}</p>
          </div>

          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            aria-hidden
          >
            <motion.div className="relative w-44 h-44 xl:w-52 xl:h-52">
              <div className="absolute inset-0 rounded-full bg-ag-gold/10 blur-2xl" />
              <div className="relative flex h-full w-full items-center justify-center rounded-2xl border border-ag-gold/20 bg-ag-navy/60 backdrop-blur-sm">
                <FileText className="w-20 h-20 xl:w-24 xl:h-24 text-ag-gold/80 stroke-[1.25]" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
