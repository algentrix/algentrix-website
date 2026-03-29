import type { ReactNode } from 'react'
import { AgMagneticField } from './AgMagneticField'

/** Nav CTA / hero CTAs — `MagBtn` strength (0.28) + elastic return. */
export function AgMagneticButton({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <AgMagneticField strength={0.28} className={`inline-flex ${className}`}>
      {children}
    </AgMagneticField>
  )
}
