import React from 'react'
import BlockContainer from '@/components/BlockContainer'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import TypographyProse from '@/components/typography/TypographyProse'
import TypographyTitle from '@/components/typography/TypographyTitle'

interface RichText {
  id: string
  title: string
  headline: string
  content: string
}

interface RichTextBlockProps {
  data: RichText
}

function RichTextBlock({ data }: RichTextBlockProps) {
  return (
    <BlockContainer>
      <div className='text-center'>
        {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
        {data.headline && (
          <TypographyHeadline content={data.headline} size='xl' />
        )}
      </div>
      <TypographyProse
        content={data.content}
        className='mx-auto mt-8 font-mono'
      />
    </BlockContainer>
  )
}

export default RichTextBlock
