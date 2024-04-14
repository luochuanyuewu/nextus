'use client'
import { motion } from 'framer-motion'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import BlockContainer from '@/components/BlockContainer'

interface Quote {
  id: string
  headline: string
  title: string
  subtitle: string
  content: string
  image: string
  background_color: string
}

interface QuoteBlockProps {
  data: Quote
}

export default function QuoteBlock({ data }: QuoteBlockProps) {
  return (
    <BlockContainer className='relative bg-base-200 px-6 py-10 md:px-16 md:py-16 lg:px-28 lg:py-24'>
      {data.image && (
        <div
          className='absolute inset-0 z-0 opacity-25'
          style={{
            backgroundImage: `url(${getDirectusMedia(data.image)})`,
            backgroundColor: data.background_color,
          }}
        />
      )}
      <div className='relative mx-auto max-w-screen-2xl'>
        <div className='my-24'>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: true }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.25,
              },
            }}
            className='pl-3 indent-3 font-serif text-4xl italic leading-tight md:pl-6 md:-indent-6 md:text-6xl md:leading-tight xl:w-3/4'
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></motion.div>

          <div className='mt-6 flex justify-end'>
            <div className='word-spacing-tight w-full pl-3 text-right font-mono text-sm font-bold uppercase tracking-widest sm:w-1/2 sm:text-left md:pl-0 lg:w-2/5 lg:text-base xl:w-1/3 2xl:w-1/4'>
              <div className='rounded-xl rounded-bl-none'>
                {data.title && <div className='text-accent'>{data.title}</div>}
                {data.subtitle && <div>{data.subtitle}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockContainer>
  )
}
