import React from 'react'
import BlockContainer from '../BlockContainer'
import TypographyHeadline from '../typography/TypographyHeadline'
import TypographyProse from '../typography/TypographyProse'
import TypographyTitle from '../typography/TypographyTitle'

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
