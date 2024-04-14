'use client'
import Image from 'next/image'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import TypographyProse from '@/components/typography/TypographyProse'
import TypographyTitle from '@/components/typography/TypographyTitle'
import BlockContainer from '@/components/BlockContainer'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import { motion } from 'framer-motion'
import { BlockColumns } from '@/data/directus-collections'

interface ColumnsBlockProps {
  data: BlockColumns
}

function ColumnsBlock({ data }: ColumnsBlockProps) {
  return (
    <BlockContainer className='relative mx-auto w-full max-w-7xl items-center px-5 py-24  md:px-12 lg:px-16'>
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      {data.rows &&
        data.rows.map((row) => (
          <div
            key={row.id}
            className='relative mt-16 flex-col items-start align-middle'
          >
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24'>
              <div className='relative m-auto items-center gap-12 lg:inline-flex'>
                <div className='max-w-xl text-left'>
                  <div>
                    {row.title && (
                      <TypographyTitle>{row.title}</TypographyTitle>
                    )}
                    {row.headline && (
                      <TypographyHeadline content={row.headline} />
                    )}
                    {row.content && (
                      <TypographyProse
                        content={row.content}
                        className='mt-4 font-mono'
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`order-first mt-12 block aspect-square w-full border-2 border-primary p-2  lg:mt-0 ${
                  row.image_position === 'right'
                    ? 'rounded-bl-3xl rounded-tr-3xl lg:order-last'
                    : 'rounded-br-3xl rounded-tl-3xl lg:order-first'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  viewport={{ once: true }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      delay: 0.25,
                      duration: 1,
                    },
                  }}
                  className={`mx-auto h-full w-full bg-gray-100 object-cover object-center  lg:ml-auto ${
                    row.image_position === 'right'
                      ? 'rounded-bl-2xl rounded-tr-2xl'
                      : 'rounded-br-2xl rounded-tl-2xl'
                  }`}
                >
                  <Image
                    width={800}
                    height={800}
                    alt=''
                    src={getDirectusMedia(row.image)}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        ))}
    </BlockContainer>
  )
}

export default ColumnsBlock
