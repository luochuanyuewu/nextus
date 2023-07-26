import React from 'react'
import BlockContainer from '../BlockContainer'
import TypographyHeadline from '../typography/TypographyHeadline'
import TypographyTitle from '../typography/TypographyTitle'
import VGallery from '../base/VGallery'

export interface Gallery {
  id: string
  title?: string
  headline?: string
  gallery_items: Array<{
    directus_files_id:
      | string
      | {
          id: string
          title?: string
          description?: string
          tags?: string
        }
  }>
}

interface GalleryBlockProps {
  className?: string
  data: Gallery
}

function GalleryBlock({ data, className }: GalleryBlockProps) {
  return (
    <div className={className}>
      <BlockContainer>
        {/* Title */}
        {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
        {data.headline && <TypographyHeadline content={data.headline} />}
        {data.gallery_items.length > 0 && (
          <VGallery
            items={data.gallery_items.map((item) => {
              return item.directus_files_id as any
            })}
          />
        )}
      </BlockContainer>
    </div>
  )
}

export default GalleryBlock
