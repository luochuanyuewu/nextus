import React from 'react'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import TypographyProse from '@/components/typography/TypographyProse'
import VButton from '@/components/base/VButton'

interface Cta {
  id: string
  title?: string
  headline?: string
  content?: string
  buttons?: {
    id: string
    label: string
    href: string
    open_in_new_window: boolean
    variant: 'primary' | 'default' | 'outline'
  }[]
}

interface CtaBlockProps {
  data: Cta
}

export default function CtaBlock({ data }: CtaBlockProps) {
  return (
    <BlockContainer className='mx-auto w-full max-w-5xl'>
      <div className='relative overflow-hidden rounded-br-3xl rounded-tl-3xl border-4 border-primary bg-transparent  p-2 '>
        <div className='relative overflow-hidden rounded-br-2xl rounded-tl-2xl px-6 py-8'>
          <div className='absolute inset-0 ' />
          <div className='absolute inset-0 ' />
          <div className='relative md:flex md:items-center md:justify-between md:space-x-4'>
            <div>
              {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
              {data.headline && (
                <TypographyHeadline
                  content={data.headline}
                  className='font-bold'
                />
              )}
              {data.content && (
                <TypographyProse
                  content={data.content}
                  className='mt-2 font-mono'
                />
              )}
            </div>
            <div className='mt-4 flex-shrink-0 md:mt-0'>
              {data.buttons &&
                data.buttons.map((button) => (
                  <VButton
                    key={button.id}
                    href={button.href}
                    target={button.open_in_new_window ? '_blank' : '_self'}
                    size='xl'
                    variant='primary'
                    className='block'
                  >
                    {button.label}
                  </VButton>
                ))}
            </div>
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
