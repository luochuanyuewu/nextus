'use client'
import { Icon } from '@iconify/react'

interface IconProps {
  className?: string
  icon: string
}

export default function VIcon(props: IconProps) {
  return <Icon className={props.className} icon={props.icon}></Icon>
}
