'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

interface ProseProps {
  content: string
  className?: string
}

function Prose({ content, className }: ProseProps) {
  const contentEl = useRef<HTMLDivElement | null>(null)
  //   const config = useRuntimeConfig(); // Assuming `useRuntimeConfig` is a custom hook

  const router = useRouter()
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  useEffect(() => {
    if (!contentEl.current) return

    // Intercept all the local links
    const anchors = contentEl.current.getElementsByTagName('a')

    Array.from(anchors).forEach((anchor) => {
      const url = anchor.getAttribute('href')
      if (!url) return

      // Skip external links
      if (!url.startsWith(siteUrl) && !url.startsWith('/')) return
      const path = url.replace(siteUrl, '')

      // Add onClick event to anchor
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        router.push(url)
      })
    })
  }, [router, siteUrl])

  const classNames = [
    'prose prose-sm md:prose-base lg:prose-lg dark:prose-invert prose-img:rounded-br-3xl prose-img:rounded-tl-3xl prose-img:border-2 prose-img:border-gray-500 prose-headings:font-serif prose-p:font-mono',
    className,
  ]

  return (
    <div
      ref={contentEl}
      className={classNames.join(' ')}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default Prose
