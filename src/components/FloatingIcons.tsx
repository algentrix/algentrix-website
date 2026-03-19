import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { initGSAP } from "../lib/gsap"
import { FaFigma, FaCode, FaPaintBrush } from "react-icons/fa"
import { HiCpuChip, HiChartBarSquare } from "react-icons/hi2"

const OFFSETS = [0, 1.256, 2.512, 3.768, 5.024]

const FloatingIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const radiusRef = useRef(260)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      radiusRef.current = mobile ? 145 : 260
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    initGSAP()
    const icons = iconRefs.current.filter(Boolean) as HTMLDivElement[]
    if (icons.length === 0) return

    const angleObj = { angle: 0 }
    const duration = isMobile ? 14 : 12

    const tween = gsap.to(angleObj, {
      angle: Math.PI * 2,
      duration,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        const r = radiusRef.current
        const a = angleObj.angle
        icons.forEach((el, i) => {
          const theta = a + OFFSETS[i]
          gsap.set(el, { x: r * Math.cos(theta), y: r * Math.sin(theta) })
        })
      },
    })

    return () => { tween.kill() }
  }, [isMobile])

  const iconClass = `absolute left-1/2 top-1/2 bg-[#111] rounded-xl text-white border border-white/10 -translate-x-1/2 -translate-y-1/2 ${isMobile ? "p-2" : "p-4"}`

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="relative w-0 h-0">
        <div ref={(el) => { iconRefs.current[0] = el }} className={iconClass}>
          <FaFigma size={isMobile ? 24 : 48} />
        </div>
        <div ref={(el) => { iconRefs.current[1] = el }} className={iconClass}>
          <FaCode size={isMobile ? 20 : 40} />
        </div>
        <div ref={(el) => { iconRefs.current[2] = el }} className={iconClass}>
          <FaPaintBrush size={isMobile ? 20 : 40} />
        </div>
        <div ref={(el) => { iconRefs.current[3] = el }} className={iconClass}>
          <HiCpuChip size={isMobile ? 20 : 40} className="text-cyan-400" />
        </div>
        <div ref={(el) => { iconRefs.current[4] = el }} className={iconClass}>
          <HiChartBarSquare size={isMobile ? 20 : 40} className="text-emerald-400" />
        </div>
      </div>
    </div>
  )
}

export default FloatingIcons
