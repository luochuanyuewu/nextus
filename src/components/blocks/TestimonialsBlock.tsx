'use client'
import React, { useRef, useState } from 'react'
import VIcon from '@/components/base/VIcon'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import BlockContainer from '@/components/BlockContainer'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import Image from 'next/image'

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

interface Testimonials {
  id: string
  title?: string
  headline?: string
  subtitle?: string
  testimonials: { testimonial: Testimonial }[]
}

interface TestimonialsBlockProps {
  data: Testimonials
}

export default function TestimonialsBlock({ data }: TestimonialsBlockProps) {
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
      <div className='absolute inset-0 ' />
      <div className='absolute inset-0 ' />

      <div className='relative space-y-4 pt-16 text-center'>
        <TypographyTitle>{data.title}</TypographyTitle>
        <TypographyHeadline content={data.headline as string} size='xl' />

        <p className='mx-auto max-w-4xl text-center leading-7'>
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
                  itemIdx === currentItemIdx ? 'bg-accent' : 'bg-base-200'
                }`}
                onClick={() => handleIndicatorButton(itemIdx)}
              />
            ))}
          </div>
          <div className='flex space-x-2 justify-self-end'>
            <button
              disabled={currentItemIdx === 0}
              className='flex h-10 w-10 items-center justify-center rounded-full  disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => handleNavButton('left')}
            >
              <VIcon icon='heroicons:arrow-left' className='h-5 w-5' />
            </button>
            <button
              disabled={currentItemIdx === data.testimonials.length - 1}
              className='flex h-10 w-10 items-center justify-center rounded-full  disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => handleNavButton('right')}
            >
              <VIcon icon='heroicons:arrow-right' className='h-5 w-5 ' />
            </button>
          </div>
        </div>
        <div
          className='scrollbar-hide flex w-full snap-x space-x-6 overflow-x-auto scroll-smooth px-4 py-6 md:px-6 md:pt-8 lg:px-8'
          ref={testimonialContainer}
          onScroll={handleScroll}
        >
          {data.testimonials.map(({ testimonial }, itemIdx) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                if (el) testimonialRefs.current[itemIdx] = el
              }}
              className='md:w[450px] relative flex w-[350px] flex-shrink-0 snap-center flex-col justify-between overflow-hidden bg-base-200  p-8 shadow-md odd:rounded-br-3xl odd:rounded-tl-3xl even:rounded-bl-3xl even:rounded-tr-3xl  lg:w-[600px]'
            >
              <div
                className='prose prose-sm relative font-mono md:prose-base'
                dangerouslySetInnerHTML={{ __html: testimonial.content }}
              />

              <div className='mt-4 flex space-x-2 border-t pt-6'>
                {testimonial.image ? (
                  <Image
                    className='inline-block h-16 w-16 rounded-full border'
                    width={50}
                    height={50}
                    src={getDirectusMedia(testimonial.image)}
                    alt=''
                  />
                ) : (
                  <VIcon
                    icon='ic:baseline-account-circle'
                    className='inline-block h-16 w-16 rounded-full border '
                  />
                )}

                <div className='relative'>
                  <p className='font-serif font-bold  lg:text-2xl'>
                    {testimonial.title}
                  </p>
                  <p className='font-mono text-sm lg:text-lg'>
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
