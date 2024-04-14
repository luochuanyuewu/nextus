'use client'
import Script from 'next/script'

export function UmamiScript({ id, src }: { id: string; src?: string }) {
  return (
    <Script
      async
      data-website-id={id}
      src={src ? src : 'https://analytics.umami.is/script.js'}
    />
  )
}
