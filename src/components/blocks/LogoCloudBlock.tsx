/* eslint-disable @next/next/no-img-element */
'use client' // add this line make famer-motion works.

import React from 'react'
import BlockContainer from '@/components/BlockContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface LogoCloudBlockProps {
  id: string
  headline?: string
  title?: string
  logos: Array<{
    file: {
      id: string
    }
  }>
}

interface Props {
  data: LogoCloudBlockProps
}

export default function LogoCloudBlock({ data }: Props) {
  return (
    <BlockContainer className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      <div className='mt-8  lg:mt-10'>
        <div className='grid gap-4 md:grid-cols-4 md:gap-8'>
          {data.logos.map(({ file }, fileIdx) => (
            <motion.div
              key={file.id}
              className='flex items-center justify-center rounded-bl-3xl rounded-tr-3xl border-2 bg-white p-8'
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25 + 0.1 * fileIdx,
              }}
            >
              <img className='h-12' src={getDirectusMedia(file.id)} alt='' />
            </motion.div>
          ))}
        </div>
      </div>
    </BlockContainer>
  )
}
