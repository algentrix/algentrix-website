import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { initGSAP } from '../lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !barRef.current) return
    initGSAP()

    const bar = barRef.current

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-[9999] h-0.5 origin-left"
      style={{
        background: 'linear-gradient(90deg, #c9a84c, #e8c96a, #8a6f2e)',
        boxShadow: '0 0 10px rgba(201, 168, 76, 0.5)',
        transform: 'scaleX(0)',
      }}
    />
  )
}
