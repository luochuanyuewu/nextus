'use client'
import { Icon } from '@iconify/react'

interface IconProps {
  className?: string
  width?: string | number
  height?: string | number
  icon: string
}

export default function VIcon(props: IconProps) {
  return (
    <Icon
      width={props.width}
      height={props.height}
      className={props.className}
      icon={props.icon}
    ></Icon>
  )
}
