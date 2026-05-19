import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { LegalPageLayout } from '../components/legal/LegalPageLayout'
import { PrivacyHero } from '../components/privacy/PrivacyHero'
import { PrivacySection } from '../components/privacy/PrivacySection'
import { PrivacyTOCDesktop, PrivacyTOCMobile } from '../components/privacy/PrivacyTOC'
import { useLegalActiveSection } from '../hooks/useLegalActiveSection'
import {
  PRIVACY_ABOUT_ID,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  PRIVACY_TOC_ITEMS,
} from '../data/privacyPolicyContent'

export function PrivacyPolicy() {
  const contentScrollRef = useRef<HTMLDivElement>(null)
  const { activeId, scrollToSection } = useLegalActiveSection(
    contentScrollRef,
    PRIVACY_TOC_ITEMS,
    PRIVACY_ABOUT_ID,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <LegalPageLayout
      hero={<PrivacyHero />}
      mobileToc={<PrivacyTOCMobile activeId={activeId} onNavigate={scrollToSection} />}
      desktopToc={<PrivacyTOCDesktop activeId={activeId} onNavigate={scrollToSection} />}
      contentScrollRef={contentScrollRef}
      panelId="privacy-content-panel"
      panelLabel="Privacy policy content"
      footerLinks={
        <div className="pt-4 flex flex-wrap gap-4">
          <Link
            to="/terms"
            className="inline-flex items-center text-sm font-medium text-ag-mist hover:text-ag-white transition-colors"
          >
            Terms & Conditions →
          </Link>
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-ag-gold hover:text-ag-gold-l transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      }
    >
      <section
        id={PRIVACY_ABOUT_ID}
        aria-labelledby="about-policy-heading"
        className="privacy-section scroll-mt-4 lg:scroll-mt-6 pb-10 mb-10 border-b border-ag-gold/10"
      >
        <h2
          id="about-policy-heading"
          className="font-serif text-xl sm:text-2xl font-semibold text-ag-white tracking-tight mb-5"
        >
          About this Policy
        </h2>
        <div className="privacy-prose space-y-5 text-ag-silver text-[0.95rem] sm:text-base leading-[1.75]">
          {PRIVACY_INTRO.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-ag-off">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {PRIVACY_SECTIONS.map((section) => (
        <PrivacySection key={section.id} section={section} />
      ))}
    </LegalPageLayout>
  )
}
