/* eslint-disable @next/next/no-img-element */
'use client' // add this line make famer-motion works.

import React from 'react'
import BlockContainer from '@/app/[lang]/components/blocks/BlockContainer'
import TypographyTitle from '@/app/[lang]/components/typography/TypographyTitle'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'
import { getDirectusMedia } from '@/app/[lang]/utils/api-helpers'
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
      <div className='mt-8 flow-root lg:mt-10'>
        <div className='grid gap-4 md:grid-cols-4 md:gap-8'>
          {data.logos.map(({ file }, fileIdx) => (
            <motion.div
              key={file.id}
              className='flex items-center justify-center rounded-bl-3xl rounded-tr-3xl border-2 border-gray-200 p-8 dark:border-gray-700 dark:bg-gray-200'
              initial={{
                opacity: 0,
                y: 100,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
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
