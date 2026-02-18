import React from 'react'
import { LuPlus } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

interface GridContainerProps {
  children: React.ReactNode
  className?: string
}

export const GridContainer = ({ children, className }: GridContainerProps) => {
  return (
    <div
      className={twMerge('mx-auto max-w-7xl border-x border-base-content/5 relative', className)}
    >
      {children}
    </div>
  )
}

interface GridSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  hideBottomBorder?: boolean
}

export const GridSection = ({
  children,
  className,
  id,
  hideBottomBorder = false,
}: GridSectionProps) => {
  return (
    <div id={id} className={twMerge('relative border-b border-base-content/5', className)}>
      {/* Content */}
      {children}

      {/* Corner Markers */}
      {!hideBottomBorder && (
        <>
          {/* Bottom Left */}
          <div className="absolute -bottom-3 -left-3 w-6 h-6 text-primary flex items-center justify-center z-20 pointer-events-none">
            <LuPlus className="w-full h-full" />
          </div>
          {/* Bottom Right */}
          <div className="absolute -bottom-3 -right-3 w-6 h-6 text-primary flex items-center justify-center z-20 pointer-events-none">
            <LuPlus className="w-full h-full" />
          </div>
        </>
      )}
    </div>
  )
}

interface GridCardProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export const GridCard = ({ children, className, title, subtitle }: GridCardProps) => {
  return (
    <div
      className={twMerge(
        'relative border border-base-content/10 bg-base-100/50 backdrop-blur-sm p-6 group',
        className
      )}
    >
      {/* Corner Markers - Top Left */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-primary/50 transition-colors group-hover:border-primary"></div>

      {/* Corner Markers - Top Right */}
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-primary/50 transition-colors group-hover:border-primary"></div>

      {/* Corner Markers - Bottom Left */}
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-primary/50 transition-colors group-hover:border-primary"></div>

      {/* Corner Markers - Bottom Right */}
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-primary/50 transition-colors group-hover:border-primary"></div>

      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-primary">{title}</h3>
          {subtitle && <p className="text-sm text-base-content/70">{subtitle}</p>}
        </div>
      )}

      {children}
    </div>
  )
}
