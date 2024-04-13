import Image from 'next/image'
import { getStrapiMedia } from '@/lib/utils/directus-helpers'

interface Testimonial {
  text: string
  authorName: string
  picture: {
    data: {
      id: string
      attributes: {
        name: string
        alternativeText: string
        url: string
      }
    }
  }
}

interface TestimonialsProps {
  data: {
    id: string
    title: string
    description: string
    testimonials: Testimonial[]
  }
}

function Testimonial({ text, authorName, picture }: Testimonial) {
  const imageUrl = getStrapiMedia(picture.data.attributes.url)
  return (
    <div className='mx-12 flex flex-col items-center lg:mx-0'>
      <div className='flex items-center'>
        <div className='my-6'>
          <Image
            src={imageUrl || ''}
            alt={picture.data.attributes.alternativeText || 'none provided'}
            className='inline-block h-32 w-32 rounded-full'
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className='relative text-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='currentColor'
          className='absolute left-0 top-0 h-8 w-8 '
        >
          <path d='M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z'></path>
          <path d='M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z'></path>
        </svg>
        <p className='px-6 py-1 text-lg italic'>{text}</p>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='currentColor'
          className='absolute bottom-0 right-0 h-8 w-8'
        >
          <path d='M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z'></path>
          <path d='M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z'></path>
        </svg>
      </div>
      <span className='my-2 h-1 w-12 rounded-lg '></span>
      <p>{authorName}</p>
    </div>
  )
}

export default function Testimonials({ data }: TestimonialsProps) {
  return (
    <section className='m:py-12 lg:py-24'>
      <div className='container mx-auto space-y-2 py-4 text-center'>
        <h1 className='text-center text-4xl font-semibold leading-none'>
          {data.title}
        </h1>
        <p className='mt-4 text-center text-lg'>{data.description}</p>
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-8 md:px-10 md:pb-10 lg:grid-cols-2 lg:gap-20'>
        {data.testimonials.map((testimonial: Testimonial, index: number) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </section>
  )
}
