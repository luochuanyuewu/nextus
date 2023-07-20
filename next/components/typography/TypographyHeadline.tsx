import React from 'react'
import { twMerge } from 'tailwind-merge'

interface HeadlineProps {
  content?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  children?: React.ReactNode
}

function TypographyHeadline(props: HeadlineProps) {
  const { content, size = 'md' } = props

  const getClassNames = () => {
    switch (size) {
      case 'xs':
        return 'text-xl'
      case 'sm':
        return 'text-2xl'
      case 'md':
        return 'text-3xl'
      case 'lg':
        return 'text-4xl'
      case 'xl':
        return 'text-5xl'
      default:
        return 'text-3xl'
    }
  }

  const renderContent = () => {
    return { __html: content ?? '' }
  }

  return (
    <div
      className={twMerge(
        getClassNames(),
        'color-em font-serif font-bold leading-snug tracking-tight dark:text-white',
        props.className
      )}
      dangerouslySetInnerHTML={renderContent()}
    />
  )
}

export default TypographyHeadline
