import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaFigma, FaCode, FaPaintBrush } from "react-icons/fa"
import { HiCpuChip, HiChartBarSquare } from "react-icons/hi2"

const radius = 260

const FloatingIcons: React.FC = () => {

  const [angle, setAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.02)
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const getPosition = (offset: number) => {
    const x = radius * Math.cos(angle + offset)
    const y = radius * Math.sin(angle + offset)
    return { x, y }
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

      <motion.div
        className="absolute bg-[#111] p-4 rounded-xl text-white border border-white/10"
        animate={getPosition(0)}
      >
        <FaFigma size={48} />
      </motion.div>

      <motion.div
        className="absolute bg-[#111] p-4 rounded-xl text-white border border-white/10"
        animate={getPosition(1.2)}
      >
        <FaCode size={40} />
      </motion.div>

      <motion.div
        className="absolute bg-[#111] p-4 rounded-xl text-white border border-white/10"
        animate={getPosition(2.4)}
      >
        <FaPaintBrush size={40} />
      </motion.div>

      <motion.div
        className="absolute bg-[#111] p-4 rounded-xl text-white border border-white/10"
        animate={getPosition(3.6)}
      >
        <HiCpuChip size={40} className="text-cyan-400" />
      </motion.div>

      <motion.div
        className="absolute bg-[#111] p-4 rounded-xl text-white border border-white/10"
        animate={getPosition(4.8)}
      >
        <HiChartBarSquare size={40} className="text-emerald-400" />
      </motion.div>

    </div>
  )
}

export default FloatingIcons
