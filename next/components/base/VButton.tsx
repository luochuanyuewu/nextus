import Link from 'next/link'
import React, { MouseEventHandler } from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'outline' | 'danger' | string
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

  const buttonClasses = [
    'btn',
    variant === 'default' && 'btn-default',
    variant === 'primary' && 'btn-primary',
    variant === 'outline' && 'btn-outline',
    variant === 'danger' && 'btn-danger',
    size === 'xs' && 'btn-xs',
    size === 'sm' && 'btn-sm',
    size === 'md' && 'btn-md',
    size === 'lg' && 'btn-lg',
    size === 'xl' && 'btn-xl',
    block && 'btn-block',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
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
    </>
  )
}

export default VButton
