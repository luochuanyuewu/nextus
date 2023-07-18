import React from 'react'

interface TitleProps {
  as?: 'h1' | 'h2' | 'p'
  className?: string
  children?: React.ReactNode
}

function TypographyTitle({ as = 'h2', className, children }: TitleProps) {
  const classNames = `font-mono font-bold tracking-wider uppercase text-accent ${
    className || ''
  }`

  switch (as) {
    case 'h1':
      return <h1 className={classNames}>{children}</h1>
    case 'h2':
      return <h2 className={classNames}>{children}</h2>
    case 'p':
      return <p className={classNames}>{children}</p>
  }
}

export default TypographyTitle
