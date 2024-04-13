'use client'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import VVideo from '@/components/base/VVideo'
import { useMemo } from 'react'

interface Video {
  id: string
  title?: string
  headline?: string
  type: string
  video_file?: string
  video_url?: string
}

interface VideoBlockProps {
  data: Video
}

export default function VideoBlock({ data }: VideoBlockProps) {
  const url = useMemo(() => {
    if (data.type === 'file' && data.video_file) {
      return getDirectusMedia(data.video_file)
    }
    if (data.type === 'url' && data.video_url) {
      return data.video_url
    }
    return null
  }, [data.type, data.video_file, data.video_url])

  return (
    <BlockContainer className='mx-auto max-w-4xl py-12 text-center'>
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      <div className='relative'>
        <div className='absolute inset-0 h-full w-full translate-x-4 translate-y-4 rounded-br-2xl rounded-tl-2xl border-2 border-gray-500/75' />

        {url && (
          <VVideo
            className='relative mt-4 overflow-hidden rounded-br-xl rounded-tl-xl'
            url={url}
            title={data.title}
          />
        )}
      </div>
    </BlockContainer>
  )
}
