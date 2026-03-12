import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaFigma, FaCode, FaPaintBrush } from "react-icons/fa"
import { HiCpuChip, HiChartBarSquare } from "react-icons/hi2"

const FloatingIcons: React.FC = () => {
  const [angle, setAngle] = useState(0)
  const [radius, setRadius] = useState(260)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setRadius(mobile ? 145 : 260)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.015)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const getPosition = (offset: number) => {
    const a = angle + offset
    return {
      x: radius * Math.cos(a),
      y: radius * Math.sin(a),
    }
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="relative w-0 h-0">
        <motion.div
          className={`absolute left-1/2 top-1/2 bg-[#111] rounded-xl text-white border border-white/10 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'p-2' : 'p-4'}`}
          animate={getPosition(0)}
        >
          <FaFigma size={isMobile ? 24 : 48} />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 top-1/2 bg-[#111] rounded-xl text-white border border-white/10 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'p-2' : 'p-4'}`}
          animate={getPosition(1.256)}
        >
          <FaCode size={isMobile ? 20 : 40} />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 top-1/2 bg-[#111] rounded-xl text-white border border-white/10 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'p-2' : 'p-4'}`}
          animate={getPosition(2.512)}
        >
          <FaPaintBrush size={isMobile ? 20 : 40} />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 top-1/2 bg-[#111] rounded-xl text-white border border-white/10 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'p-2' : 'p-4'}`}
          animate={getPosition(3.768)}
        >
          <HiCpuChip size={isMobile ? 20 : 40} className="text-cyan-400" />
        </motion.div>

        <motion.div
          className={`absolute left-1/2 top-1/2 bg-[#111] rounded-xl text-white border border-white/10 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'p-2' : 'p-4'}`}
          animate={getPosition(5.024)}
        >
          <HiChartBarSquare size={isMobile ? 20 : 40} className="text-emerald-400" />
        </motion.div>
      </div>
    </div>
  )
}

export default FloatingIcons
