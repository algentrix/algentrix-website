import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { initGSAP } from '../lib/gsap'

gsap.registerPlugin(Draggable, InertiaPlugin)

const partners = [
  'Kale Brothers',
  'Enersoul',
  'Marne associates & co',
  'Tiger Fitness',
  'And many more',
]

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!trackRef.current || !wrapperRef.current) return
    initGSAP()

    const track = trackRef.current
    const isMobile = window.innerWidth < 768

    const getWidth = () => track.scrollWidth / 2

    const ctx = gsap.context(() => {
      // 🔁 Auto scroll (slower on mobile for smoother feel)
      tweenRef.current = gsap.to(track, {
        x: () => -getWidth(),
        duration: isMobile ? 40 : 25,
        ease: 'none',
        repeat: -1,
      })

      // 🖱️ Draggable with inertia
      const resume = () => tweenRef.current?.resume()
      Draggable.create(track, {
        type: 'x',
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          tweenRef.current?.pause()
        },
        onRelease: resume,
        onThrowComplete: resume,
        onDrag() {
          gsap.set(track, { x: this.x })
        },
        onThrowUpdate() {
          gsap.set(track, { x: this.x })
        },
        bounds: {
          minX: -getWidth(),
          maxX: 0,
        },
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const items = [...partners, ...partners]

  return (
    <section className="py-20 overflow-hidden relative">
      <h2 className="font-mono text-2xl font-bold py-10 text-center text-matrix-green tracking-tight drop-shadow-[0_0_10px_rgba(0,255,65,0.6)]">
        Trusted by Businesses
      </h2>

      <div
        ref={wrapperRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Fade edges (premium touch) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          {items.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-12 py-6 mx-4 bg-bg-card rounded-xl flex items-center justify-center min-w-[200px] transition-all duration-300 ease-out hover:scale-110 text-text-muted hover:text-accent-green grayscale hover:grayscale-0 border border-white/5 hover:border-accent-green/40 cursor-pointer backdrop-blur-md"
            >
              <span className="font-serif text-xl font-semibold tracking-wide">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}