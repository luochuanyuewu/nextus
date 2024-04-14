import React from 'react'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import { VAccordion } from '@/components/base/VAccordion'

interface Faq {
  title?: string
  answer?: string
}

interface FaqsBlockProps {
  id: string
  title?: string
  headline?: string
  faqs?: Faq[]
}

interface Props {
  data: FaqsBlockProps
}

export default function FaqsBlock({ data }: Props) {
  return (
    <BlockContainer className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8'>
      <div className='mx-auto max-w-4xl text-center'>
        {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
        {data.headline && <TypographyHeadline content={data.headline} />}
        <div className='mt-6 pt-6'>
          <dl className='space-y-6'>
            {data.faqs?.map((item, itemIdx) => (
              <VAccordion key={itemIdx} title={item.title || 'title'}>
                {item.answer}
              </VAccordion>
            ))}
          </dl>
        </div>
      </div>
    </BlockContainer>
  )
}
