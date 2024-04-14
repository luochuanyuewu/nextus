import React from 'react'
import { twMerge } from 'tailwind-merge'
import './TypographyHeadline.css'
interface HeadlineProps {
  content?: string | null
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
    <>
      {content && (
        <div
          className={twMerge(
            getClassNames(),
            'font-serif font-bold leading-snug tracking-tight ',
            props.className
          )}
          dangerouslySetInnerHTML={renderContent()}
        ></div>
      )}
      {!content && (
        <div
          className={twMerge(
            getClassNames(),
            'font-serif font-bold leading-snug tracking-tight ',
            props.className
          )}
        >
          {props.children}
        </div>
      )}
    </>
  )
}

export default TypographyHeadline
