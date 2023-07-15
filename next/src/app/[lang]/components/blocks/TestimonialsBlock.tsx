'use client'
import React, { useRef, useState } from 'react'
import VIcon from '@/app/[lang]/components/base/VIcon'
import TypographyTitle from '@/app/[lang]/components/typography/TypographyTitle'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'
import BlockContainer from '@/app/[lang]/components/blocks/BlockContainer'
import { getDirectusMedia } from '@/app/[lang]/utils/api-helpers'

interface Testimonial {
  id: string | number
  title: string
  subtitle: string
  image: string
  company: string
  company_logo: string
  link: string
  content: string
}

interface TestimonialsBlockProps {
  id: string
  title?: string
  headline?: string
  subtitle?: string
  testimonials: { testimonial: Testimonial }[]
}

interface Props {
  data: TestimonialsBlockProps
}

export const TestimonialsBlock: React.FC<Props> = ({ data }) => {
  const testimonialContainer = useRef<HTMLDivElement>(null)
  const testimonialRefs = useRef<HTMLDivElement[]>([])
  const [currentItemIdx, setCurrentItemIdx] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const testimonialWidth = testimonialRefs.current[0].offsetWidth
    const testimonialCenter = testimonialWidth / 2
    const scrollLeft = e.currentTarget.scrollLeft
    const scrollCenter = scrollLeft + testimonialCenter
    const closestTestimonial = Math.round(scrollCenter / testimonialWidth)

    if (scrollLeft === 0) {
      setCurrentItemIdx(0)
    } else if (
      scrollLeft + e.currentTarget.offsetWidth + 1 >=
      e.currentTarget.scrollWidth
    ) {
      setCurrentItemIdx(testimonialRefs.current.length - 1)
    } else {
      setCurrentItemIdx(closestTestimonial)
    }
  }

  const handleIndicatorButton = (index: number) => {
    if (testimonialContainer.current && testimonialRefs.current[index]) {
      testimonialContainer.current.scrollLeft =
        testimonialRefs.current[index].offsetLeft - 16
    }
  }

  const handleNavButton = (direction: 'left' | 'right') => {
    if (
      testimonialContainer.current &&
      testimonialRefs.current[currentItemIdx]
    ) {
      if (direction === 'left') {
        testimonialContainer.current.scrollLeft -=
          testimonialRefs.current[currentItemIdx].offsetWidth
      } else {
        testimonialContainer.current.scrollLeft +=
          testimonialRefs.current[currentItemIdx].offsetWidth
      }
    }
  }

  return (
    <BlockContainer className='relative overflow-hidden' fullWidth>
      <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent' />
      <div className='grain-bg absolute inset-0 dark:opacity-20' />

      <div className='relative space-y-4 pt-16 text-center'>
        <TypographyTitle>{data.title}</TypographyTitle>
        <TypographyHeadline content={data.headline as string} size='xl' />

        <p className='mx-auto max-w-3xl text-center leading-7'>
          {data.subtitle}
        </p>
      </div>
      <div className='relative mt-4'>
        <div className='flex items-center justify-end space-x-8 px-6'>
          <div className='inline-flex space-x-2'>
            {data.testimonials.map((item, itemIdx) => (
              <button
                key={item.testimonial.id}
                className={`flex h-3 w-12 items-center justify-center hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 ${
                  itemIdx === currentItemIdx
                    ? 'bg-accent'
                    : 'bg-gray-500 bg-opacity-50 dark:bg-gray-900'
                }`}
                onClick={() => handleIndicatorButton(itemIdx)}
              />
            ))}
          </div>
          <div className='flex space-x-2 justify-self-end'>
            <button
              disabled={currentItemIdx === 0}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => handleNavButton('left')}
            >
              <VIcon
                icon='heroicons:arrow-left'
                className='h-5 w-5 text-white'
              />
            </button>
            <button
              disabled={currentItemIdx === data.testimonials.length - 1}
              className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => handleNavButton('right')}
            >
              <VIcon
                icon='heroicons:arrow-right'
                className='h-5 w-5 text-white'
              />
            </button>
          </div>
        </div>
        <div
          className='scrollbar-hide flex w-full snap-x space-x-6 overflow-x-auto scroll-smooth px-4 py-6 pb-24 md:px-6 md:pt-8 lg:px-8'
          ref={testimonialContainer}
          onScroll={handleScroll}
        >
          {data.testimonials.map(({ testimonial }, itemIdx) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                if (el) testimonialRefs.current[itemIdx] = el
              }}
              className='md:w[450px] relative flex w-[350px] flex-shrink-0 snap-center flex-col justify-between overflow-hidden bg-white p-8 shadow-md odd:rounded-br-3xl odd:rounded-tl-3xl even:rounded-bl-3xl even:rounded-tr-3xl dark:bg-gray-900 lg:w-[600px]'
            >
              <div
                className='prose-sm prose relative font-mono dark:prose-invert md:prose-base'
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              />

              <div className='mt-4 flex space-x-2 border-t border-gray-300 pt-6 dark:border-gray-700'>
                {testimonial.image ? (
                  <img
                    className='inline-block h-16 w-16 rounded-full border'
                    src={getDirectusMedia(testimonial.image)}
                    alt=''
                  />
                ) : (
                  <VIcon
                    icon='ic:baseline-account-circle'
                    className='inline-block h-16 w-16 rounded-full border text-gray-300'
                  />
                )}

                <div className='relative'>
                  <p className='font-serif font-bold text-gray-900 dark:text-white lg:text-2xl'>
                    {testimonial.title}
                  </p>
                  <p className='font-mono text-sm text-gray-700 dark:text-gray-300 lg:text-lg'>
                    {testimonial.subtitle} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BlockContainer>
  )
}
