'use client'
import { useRouter } from '@/lib/navigation'
import React, { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ProseProps {
  content: string | null | undefined
  className?: string
}

function Prose({ content, className }: ProseProps) {
  const contentEl = useRef<HTMLDivElement | null>(null)

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

  return (
    <div
      ref={contentEl}
      className={twMerge(
        'prose prose-sm max-w-none md:prose-base lg:prose-lg prose-headings:font-serif prose-p:font-mono prose-img:rounded-br-3xl prose-img:rounded-tl-3xl prose-img:border-2 prose-img:border-accent',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content ? content : '' }}
    />
  )
}

export default Prose
