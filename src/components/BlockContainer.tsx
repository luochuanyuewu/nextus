import React from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

interface BlockContainerProps {
  fullWidth?: boolean
  children?: React.ReactNode
  className?: string
}

function BlockContainer(props: BlockContainerProps) {
  const { fullWidth = false } = props

  return (
    <section
      className={twMerge(
        clsx({
          'max-w-7xl px-6 lg:px-8': !fullWidth,
        }),
        'container mx-auto py-12',
        props.className
      )}
    >
      {props.children}
    </section>
  )
}

export default BlockContainer
