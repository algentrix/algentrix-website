import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LegalHero } from '../components/legal/LegalHero'
import { LegalPageLayout } from '../components/legal/LegalPageLayout'
import { LegalSection } from '../components/legal/LegalSection'
import { LegalTOCDesktop, LegalTOCMobile } from '../components/legal/LegalTOC'
import { useLegalActiveSection } from '../hooks/useLegalActiveSection'
import {
  TERMS_ABOUT_ID,
  TERMS_EFFECTIVE_DATE,
  TERMS_INTRO,
  TERMS_SECTIONS,
  TERMS_TOC_ITEMS,
} from '../data/termsPolicyContent'

export function TermsAndConditions() {
  const contentScrollRef = useRef<HTMLDivElement>(null)
  const { activeId, scrollToSection } = useLegalActiveSection(
    contentScrollRef,
    TERMS_TOC_ITEMS,
    TERMS_ABOUT_ID,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LegalPageLayout
      hero={
        <LegalHero
          title="Terms & Conditions"
          effectiveDate={TERMS_EFFECTIVE_DATE}
          subtitle="Rules and responsibilities for using the Algentrix website and WorkPulse workforce management platform."
          titleId="terms-hero-title"
        />
      }
      mobileToc={
        <LegalTOCMobile
          tocItems={TERMS_TOC_ITEMS}
          activeId={activeId}
          onNavigate={scrollToSection}
          ariaLabel="Terms and conditions sections"
        />
      }
      desktopToc={
        <LegalTOCDesktop
          tocItems={TERMS_TOC_ITEMS}
          activeId={activeId}
          onNavigate={scrollToSection}
          ariaLabel="Terms and conditions table of contents"
        />
      }
      contentScrollRef={contentScrollRef}
      panelId="terms-content-panel"
      panelLabel="Terms and conditions content"
      footerLinks={
        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            to="/privacy-policy"
            className="inline-flex items-center text-sm font-medium text-ag-gold hover:text-ag-gold-l transition-colors"
          >
            Privacy Policy →
          </Link>
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-ag-mist hover:text-ag-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      }
    >
      <section
        id={TERMS_ABOUT_ID}
        aria-labelledby="about-terms-heading"
        className="legal-section scroll-mt-4 lg:scroll-mt-6 pb-10 mb-10 border-b border-ag-gold/10"
      >
        <h2
          id="about-terms-heading"
          className="font-serif text-xl sm:text-2xl font-semibold text-ag-white tracking-tight mb-5"
        >
          About these Terms
        </h2>
        <div className="privacy-prose space-y-5 text-ag-silver text-[0.95rem] sm:text-base leading-[1.75]">
          {TERMS_INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-ag-off">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {TERMS_SECTIONS.map((section) => (
        <LegalSection key={section.id} section={section} />
      ))}
    </LegalPageLayout>
  )
}
