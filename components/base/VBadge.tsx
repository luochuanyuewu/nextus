import React from 'react'
import { getContrastColor } from '@/lib/utils/color'
import clsx from 'clsx'

interface BadgeProps {
  color?: string
  size: string
  className?: string
  children?: React.ReactNode
}

function VBadge({
  color = 'default',
  size = 'sm',
  children,
  className,
}: BadgeProps) {
  const badgeColor = clsx({
    'bg-gray-100 text-gray-800': !color || color === '',
    'bg-gray-100 text-gray-80': color === 'gray',
    'bg-green-100 text-green-800': color === 'gray',
    'bg-purple-100 text-purple-800': color === 'purple',
    'bg-blue-100 text-blue-800': color === 'blue',
    'bg-amber-100 text-amber-800': color === 'amber',
    'bg-orange-100 text-orange-800': color === 'orange',
    'bg-red-100 text-red-800': color === 'red',
    'bg-indigo-100 text-indigo-800': color === 'indigo',
    'bg-violet-100 text-violet-800': color === 'violet',
    'bg-primary-100 text-accent': color === 'pink',
    'bg-yellow-100 text-yellow-800': color === 'yellow',
    'px-2 py-0.5 text-xs': size === 'sm',
    'px-2.5 py-0.5': size === 'lg',
  })

  return (
    <span
      style={{
        backgroundColor: color,
        color: getContrastColor(color),
      }}
      className={clsx(
        'inline-flex items-center font-serif font-medium',
        className,
        badgeColor
      )}
    >
      {children}
    </span>
  )
}

export default VBadge
