import React from 'react'

interface BlockContainerProps {
  fullWidth?: boolean
  children?: React.ReactNode
  className?: string
}

function BlockContainer(props: BlockContainerProps) {
  const { fullWidth = false } = props

  const classNames = [
    `py-12 mx-auto ${!fullWidth ? 'lg:px-8 px-6 max-w-7xl' : ''}`,
    props.className,
  ]

  return <section className={classNames.join(' ')}>{props.children}</section>
}

export default BlockContainer
