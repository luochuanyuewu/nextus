import React from 'react'
import { getContrastColor } from '@/lib/utils/color'

interface BadgeProps {
  color: string
  size: string
  className?: string
  children?: React.ReactNode
}

const colorMappings = {
  default: 'bg-gray-100 text-gray-800',
  gray: 'bg-gray-100 text-gray-800',
  green: 'bg-green-100 text-green-800',
  purple: 'bg-purple-100 text-purple-800',
  blue: 'bg-blue-100 text-blue-800',
  amber: 'bg-amber-100 text-amber-800',
  orange: 'bg-orange-100 text-orange-800',
  red: 'bg-red-100 text-red-800',
  indigo: 'bg-indigo-100 text-indigo-800',
  violet: 'bg-violet-100 text-violet-800',
  pink: 'bg-primary-100 text-accent',
  yellow: 'bg-yellow-100 text-yellow-800',
}

function VBadge({
  color = 'default',
  size = 'sm',
  children,
  className,
}: BadgeProps) {
  const classNames = [
    'inline-flex items-center font-serif font-medium',
    `${color === 'gray' ? `bg-gray-100 text-gray-800` : ''}`,
    `${color === 'green' ? `bg-green-100 text-green-800` : ''}`,
    `${color === 'purple' ? `bg-purple-100 text-purple-800` : ''}`,
    `${color === 'blue' ? `bg-blue-100 text-blue-800` : ''}`,
    `${color === 'amber' ? `bg-amber-100 text-amber-800` : ''}`,
    `${color === 'orange' ? `bg-orange-100 text-orange-800` : ''}`,
    `${color === 'red' ? `bg-red-100 text-red-800` : ''}`,
    `${color === 'indigo' ? `bg-indigo-100 text-indigo-800` : ''}`,
    `${color === 'violet' ? `bg-violet-100 text-violet-800` : ''}`,
    `${color === 'pink' ? `bg-primary-100 text-accent` : ''}`,
    `${color === 'yellow' ? `bg-yellow-100 text-yellow-800` : ''}`,
    `${size === 'sm' ? 'px-2 py-0.5 text-xs' : ''}`,
    `${size === 'lg' ? ' px-2.5 py-0.5' : ''}`,
    className,
  ]

  return (
    <span
      style={{
        backgroundColor: color,
        color: getContrastColor(color),
      }}
      className={classNames.join(' ')}
    >
      {children}
    </span>
  )
}

export default VBadge
