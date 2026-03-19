import { useRef, useEffect, useCallback, useState } from 'react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { initGSAP } from '../lib/gsap'

gsap.registerPlugin(Draggable, InertiaPlugin)

type Partner = {
  name: string
  logo?: string
}

const partners: Partner[] = [
  { name: 'Kale Brothers', logo: '/logos/kale-brothers.png' },
  { name: 'Enersoul', logo: '/logos/enersoul.png' },
  { name: 'Marne associates & co', logo: '/logos/marne.png' },
  { name: 'Tiger Fitness', logo: '/logos/tiger-fitness.png' },
  { name: 'And many more' },
]

function TrustedByCard({ partner }: { partner: Partner }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="trusted-by-card group shrink-0 px-6 py-4 mx-3 bg-bg-card rounded-xl flex items-center justify-center min-w-[150px] h-[60px] transition-all duration-300 ease-out hover:scale-[1.02] text-text-muted grayscale hover:grayscale-0 border border-white/5 hover:border-accent-green/30 cursor-pointer backdrop-blur-sm hover:shadow-[0_0_30px_rgba(0,255,136,0.15)]"
      title="What we built for them"
    >
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          decoding="async"
          className={`max-h-8 max-w-[110px] object-contain transition-opacity duration-300 ${imgError ? 'hidden' : ''}`}
          onError={() => setImgError(true)}
        />
      ) : null}
      {(imgError || !partner.logo) && (
        <span className="font-serif text-sm font-semibold tracking-wide text-center">
          {partner.name}
        </span>
      )}
    </div>
  )
}

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const resumeRef = useRef<() => void>(() => {})

  const resume = useCallback(() => {
    tweenRef.current?.resume()
  }, [])

  useEffect(() => {
    resumeRef.current = resume
  }, [resume])

  useEffect(() => {
    if (!trackRef.current || !wrapperRef.current) return
    initGSAP()

    const track = trackRef.current
    const isMobile = window.innerWidth < 768

    const getWidth = () => track.scrollWidth / 2

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        x: () => -getWidth(),
        duration: isMobile ? 40 : 25,
        ease: 'none',
        repeat: -1,
      })

      const doResume = () => resumeRef.current?.()
      let hasPaused = false

      Draggable.create(track, {
        type: 'x',
        inertia: true,
        allowNativeTouchScrolling: true,
        minimumMovement: 5,
        onPress() {
          hasPaused = false
        },
        onDrag() {
          if (!hasPaused) {
            hasPaused = true
            tweenRef.current?.pause()
          }
          gsap.set(track, { x: this.x })
        },
        onRelease: doResume,
        onThrowComplete: doResume,
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
    <section className="py-14 overflow-hidden relative" aria-label="Trusted by">
      <h2 className="font-mono text-2xl font-bold py-6 text-center text-matrix-green tracking-tight drop-shadow-[0_0_10px_rgba(0,255,65,0.6)]">
        Trusted by Businesses
      </h2>

      <div
        ref={wrapperRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* Fade edges - gradient mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-32 z-10 trusted-by-fade-left" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-32 trusted-by-fade-right" aria-hidden />

        <div ref={trackRef} className="flex w-max will-change-transform">
          {items.map((partner, i) => (
            <TrustedByCard key={`${partner.name}-${i}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}
