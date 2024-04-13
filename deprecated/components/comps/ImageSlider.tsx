'use client'
import { Fade } from 'react-slideshow-image'
import { getStrapiMedia } from '@/lib/utils/directus-helpers'
import Image from 'next/image'

interface Image {
  id: number
  attributes: {
    alternativeText: string | null
    caption: string | null
    url: string
  }
}

interface SlidShowProps {
  files: {
    data: Image[]
  }
}

export default function Slideshow({ data }: { data: SlidShowProps }) {
  return (
    <div className='slide-container'>
      <Fade>
        {data.files.data.map((fadeImage: Image, index) => {
          const imageUrl = getStrapiMedia(fadeImage.attributes.url)
          return (
            <div key={index}>
              {imageUrl && (
                <Image
                  className='h-96 w-full rounded-lg object-cover'
                  height={400}
                  width={600}
                  alt='alt text'
                  src={imageUrl}
                />
              )}
            </div>
          )
        })}
      </Fade>
    </div>
  )
}
