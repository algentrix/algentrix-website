import { Mail } from 'lucide-react'
import type { LegalTocItem } from '../../types/legalDocument'

type LegalTOCProps = {
  tocItems: LegalTocItem[]
  activeId: string
  onNavigate: (id: string) => void
  ariaLabel?: string
}

function TocLink({
  id,
  title,
  isActive,
  onNavigate,
}: {
  id: string
  title: string
  isActive: boolean
  onNavigate: (id: string) => void
}) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        onNavigate(id)
      }}
      className={`block py-2.5 pl-4 pr-2 text-sm leading-snug border-l-2 transition-colors ${
        isActive
          ? 'border-ag-gold text-ag-white font-medium bg-ag-gold/5'
          : 'border-transparent text-ag-mist hover:text-ag-white hover:border-ag-gold/40'
      }`}
      aria-current={isActive ? 'location' : undefined}
    >
      {title}
    </a>
  )
}

export function LegalTOCMobile({
  tocItems,
  activeId,
  onNavigate,
  ariaLabel = 'Document sections',
}: LegalTOCProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className="lg:hidden sticky top-[72px] z-50 border-b border-ag-gold/15 bg-ag-void/98 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-ag-mist mb-2">
          Contents
        </p>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar touch-pan-x pb-1">
          {tocItems.map(({ id, title }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                onNavigate(id)
              }}
              className={`shrink-0 px-3 py-1.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeId === id
                  ? 'border-ag-gold text-ag-gold'
                  : 'border-transparent text-ag-mist hover:text-ag-white'
              }`}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export function LegalTOCDesktop({
  tocItems,
  activeId,
  onNavigate,
  ariaLabel = 'Table of contents',
}: LegalTOCProps) {
  return (
    <nav aria-label={ariaLabel} className="sticky top-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ag-mist mb-4">
        Contents
      </p>
      <ol className="space-y-0.5 border-l border-ag-gold/15" role="list">
        {tocItems.map(({ id, title }) => (
          <li key={id}>
            <TocLink id={id} title={title} isActive={activeId === id} onNavigate={onNavigate} />
          </li>
        ))}
      </ol>

      <div className="mt-8 pt-6 border-t border-ag-gold/15">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ag-mist mb-3">
          Contact
        </p>
        <a
          href="mailto:support@algentrix.com"
          className="inline-flex items-center gap-2 text-sm text-ag-gold hover:text-ag-gold-l transition-colors"
        >
          <Mail className="w-4 h-4 shrink-0" aria-hidden />
          support@algentrix.com
        </a>
      </div>
    </nav>
  )
}
