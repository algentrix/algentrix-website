import { useCallback, useEffect, useState, type RefObject } from 'react'
import type { LegalTocItem } from '../types/legalDocument'

const DESKTOP_MQ = '(min-width: 1024px)'

function getScrollRoot(scrollContainerRef: RefObject<HTMLElement | null>): HTMLElement | null {
  if (typeof window === 'undefined') return null
  if (!window.matchMedia(DESKTOP_MQ).matches) return null
  return scrollContainerRef.current
}

export function useLegalActiveSection(
  scrollContainerRef: RefObject<HTMLElement | null>,
  tocItems: LegalTocItem[],
  defaultSectionId: string,
) {
  const [activeId, setActiveId] = useState(defaultSectionId)

  useEffect(() => {
    const sectionElements = tocItems.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (sectionElements.length === 0) return

    let observer: IntersectionObserver | null = null

    const setupObserver = () => {
      observer?.disconnect()
      const root = getScrollRoot(scrollContainerRef)

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visible.length > 0 && visible[0].target.id) {
            setActiveId(visible[0].target.id)
          }
        },
        {
          root,
          rootMargin: root ? '-8% 0px -45% 0px' : '-18% 0px -58% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        },
      )

      sectionElements.forEach((el) => observer!.observe(el))
    }

    setupObserver()

    const mq = window.matchMedia(DESKTOP_MQ)
    const onBreakpointChange = () => setupObserver()
    mq.addEventListener('change', onBreakpointChange)

    const container = scrollContainerRef.current
    const onScroll = () => {
      if (!getScrollRoot(scrollContainerRef)) return
      const root = scrollContainerRef.current
      if (!root) return

      const rootRect = root.getBoundingClientRect()
      const marker = rootRect.top + root.clientHeight * 0.25

      let currentId = defaultSectionId
      for (const { id } of tocItems) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= marker) {
          currentId = id
        }
      }
      setActiveId(currentId)
    }

    container?.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer?.disconnect()
      mq.removeEventListener('change', onBreakpointChange)
      container?.removeEventListener('scroll', onScroll)
    }
  }, [scrollContainerRef, tocItems, defaultSectionId])

  const scrollToSection = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return

      setActiveId(id)
      history.replaceState(null, '', `#${id}`)

      const scrollRoot = getScrollRoot(scrollContainerRef)

      if (scrollRoot) {
        const rootRect = scrollRoot.getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        const offset = targetRect.top - rootRect.top + scrollRoot.scrollTop - 20
        scrollRoot.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' })
        return
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [scrollContainerRef],
  )

  return { activeId, scrollToSection }
}
