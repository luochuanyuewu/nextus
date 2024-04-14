'use client'
import { cn } from '@/lib/utils/tw'
import { Link } from '@/lib/navigation'
import React, { MouseEventHandler } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'outline' | 'danger' | 'link' | string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  block?: boolean
  target?: string
  href?: string
  className?: string
  onClick?: MouseEventHandler<any> | undefined
  children: React.ReactNode
}

function VButton(props: ButtonProps) {
  const {
    type = 'button',
    variant = 'default',
    size = 'md',
    loading,
    disabled,
    block,
    target,
    href,
    children,
  } = props

  const buttonClasses = cn(
    'btn',
    variant ? `btn-${variant}` : '',
    size ? `btn-${size}` : ''
  )

  return (
    <div>
      {href && (
        <Link
          href={href as any}
          target={target}
          className={buttonClasses}
          onClick={props.onClick}
        >
          {children}
        </Link>
      )}
      {!href && (
        <button
          className={buttonClasses}
          disabled={disabled}
          type={type}
          onClick={props.onClick}
        >
          {children}
        </button>
      )}
    </div>
  )
}

export default VButton
