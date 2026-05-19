import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { LegalSectionContent } from '../../types/legalDocument'

type LegalSectionProps = {
  section: LegalSectionContent
}

export function LegalSection({ section }: LegalSectionProps) {
  return (
    <motion.article
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="legal-section scroll-mt-4 lg:scroll-mt-6 pb-10 mb-10 border-b border-ag-gold/10 last:mb-0 last:pb-0 last:border-b-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
    >
      <h2
        id={`${section.id}-heading`}
        className="font-serif text-xl sm:text-2xl font-semibold text-ag-white tracking-tight mb-5"
      >
        {section.title}
      </h2>

      <div className="privacy-prose space-y-5 text-ag-silver text-[0.95rem] sm:text-base leading-[1.75]">
        {section.intro && <p className="text-ag-off">{section.intro}</p>}

        {section.lists?.map((block) => (
          <div
            key={block.title ?? block.items.join('-')}
            className={block.title ? 'space-y-3' : undefined}
          >
            {block.title && (
              <h3 className="text-base font-semibold text-ag-white">{block.title}</h3>
            )}
            <ul className="list-disc pl-6 space-y-2 marker:text-ag-gold/70">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        {section.contact ? (
          <address className="not-italic border-l-2 border-ag-gold pl-6 space-y-3 text-ag-silver">
            <p className="font-semibold text-ag-white">Algentrix</p>
            <p>
              Website:{' '}
              <a
                href="https://algentrix.com"
                className="text-ag-gold hover:text-ag-gold-l underline underline-offset-2"
                rel="noopener noreferrer"
              >
                https://algentrix.com
              </a>
            </p>
            <p>
              Email:{' '}
              <a
                href="mailto:support@algentrix.com"
                className="text-ag-gold hover:text-ag-gold-l underline underline-offset-2"
              >
                support@algentrix.com
              </a>
            </p>
          </address>
        ) : (
          section.paragraphs?.map((paragraph) => {
            if (section.id === 'privacy-data-protection' && paragraph.includes('Privacy Policy')) {
              return (
                <p key={paragraph}>
                  Use of the Platform is also governed by our{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-ag-gold hover:text-ag-gold-l underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              )
            }
            return <p key={paragraph}>{paragraph}</p>
          })
        )}
      </div>
    </motion.article>
  )
}
