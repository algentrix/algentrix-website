import type { ReactNode, RefObject } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../Header'
import { Footer } from '../Footer'

type LegalPageLayoutProps = {
  hero: ReactNode
  mobileToc: ReactNode
  desktopToc: ReactNode
  contentScrollRef: RefObject<HTMLDivElement | null>
  panelId: string
  panelLabel: string
  children: ReactNode
  footerLinks?: ReactNode
}

export function LegalPageLayout({
  hero,
  mobileToc,
  desktopToc,
  contentScrollRef,
  panelId,
  panelLabel,
  children,
  footerLinks,
}: LegalPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[72px] bg-ag-void lg:h-[100dvh] lg:flex lg:flex-col lg:overflow-hidden">
        <motion.div className="shrink-0">{hero}</motion.div>
        <motion.div className="shrink-0 lg:hidden">{mobileToc}</motion.div>

        <motion.div className="w-full px-6 sm:px-8 pb-8 lg:pb-6 lg:flex-1 lg:min-h-0 lg:overflow-hidden">
          <motion.div
            className="max-w-7xl mx-auto lg:h-full lg:grid lg:grid-cols-[minmax(220px,280px)_1fr] lg:gap-16 xl:gap-20 lg:min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <aside className="hidden lg:block min-h-0 overflow-y-auto pr-2 legal-panel-scroll">
              {desktopToc}
            </aside>

            <motion.div
              ref={contentScrollRef}
              id={panelId}
              role="region"
              aria-label={panelLabel}
              tabIndex={-1}
              className="lg:h-full lg:min-h-0 lg:overflow-y-auto overflow-x-hidden lg:overscroll-contain pr-1 lg:pr-3 lg:scroll-smooth legal-panel-scroll"
            >
              {children}
              {footerLinks}
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
