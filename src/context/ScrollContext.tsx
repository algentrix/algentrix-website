import { createContext, useContext, useRef, useEffect, type ReactNode } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

type ScrollContextType = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  scroll: React.RefObject<InstanceType<typeof LocomotiveScroll> | null>
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollInstanceRef = useRef<InstanceType<typeof LocomotiveScroll> | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    scrollInstanceRef.current = new LocomotiveScroll({
      el,
      smooth: false,
      smartphone: { smooth: false },
      tablet: { smooth: false, breakpoint: 1024 },
    })

    return () => {
      scrollInstanceRef.current?.destroy()
      scrollInstanceRef.current = null
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollRef, scroll: scrollInstanceRef }}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScroll() {
  return useContext(ScrollContext)
}
