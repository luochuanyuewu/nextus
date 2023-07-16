'use client'
import React, { useMemo, useRef } from 'react'
import BlockContainer from '@/app/[lang]/components/blocks/BlockContainer'
import TypographyTitle from '@/app/[lang]/components/typography/TypographyTitle'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'
import TypographyProse from '@/app/[lang]/components/typography/TypographyProse'
import { getDirectusMedia } from '@/app/[lang]/utils/api-helpers'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { isEven } from '../../utils/math'

interface Step {
  id: string
  title: string
  content: string
  image: string
}

interface StepsBlockProps {
  id: string
  title?: string
  headline?: string
  steps: Step[]
  show_step_numbers?: boolean
  alternate_image_position?: boolean
}

interface Props {
  data: StepsBlockProps
}

export default function StepsBlock({ data }: Props) {
  return (
    <BlockContainer className='mx-auto max-w-4xl text-center'>
      {data.title && <TypographyTitle>{data.title}</TypographyTitle>}
      {data.headline && <TypographyHeadline content={data.headline} />}
      <div className='mt-8'>
        {data.steps.map((step, stepIdx) => (
          <div key={stepIdx}>
            <motion.div
              initial={{
                opacity: 0,
                scale: 1,
                x: isEven(stepIdx) ? -200 : 200,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3,
                },
              }}
              viewport={{ once: true }}
              className={`relative p-6 ring-2 ring-accent md:flex md:space-x-8 ${
                isEven(stepIdx)
                  ? 'mr-8 rounded-br-3xl rounded-tl-3xl'
                  : 'ml-8 rounded-bl-3xl rounded-tr-3xl'
              } ${
                isEven(stepIdx) && !data.alternate_image_position
                  ? 'md:flex-row'
                  : 'md:flex-row-reverse md:space-x-reverse'
              }`}
            >
              <div className='flex-shrink-0'>
                <Image
                  className={`h-32 w-full object-cover dark:brightness-90 md:h-full md:w-48 ${
                    isEven(stepIdx)
                      ? 'rounded-br-xl rounded-tl-xl'
                      : 'rounded-bl-xl rounded-tr-xl'
                  }`}
                  width={200}
                  height={200}
                  alt=''
                  src={getDirectusMedia(step.image)}
                />
              </div>

              <div className='mt-4 w-full text-left md:mt-0'>
                {data.show_step_numbers && (
                  <div className='font-mono text-sm font-bold uppercase tracking-wide text-primary'>
                    Step {stepIdx + 1}
                  </div>
                )}
                <h3 className='mt-2 font-serif text-3xl font-bold dark:text-white'>
                  {step.title}
                </h3>
                <TypographyProse
                  content={step.content}
                  className='mt-4 font-mono'
                />
              </div>
            </motion.div>

            {/* <!-- Animation Timeline --> */}
            {stepIdx !== data.steps.length - 1 && (
              <svg
                className='steps-animation m-0 mx-auto h-16 stroke-current text-accent md:h-20'
                viewBox='0 0 60 200'
              >
                <line
                  className='path'
                  x1='15'
                  x2='15'
                  y1='0'
                  y2='200'
                  strokeWidth='8'
                  strokeLinecap='square'
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </BlockContainer>
  )
}
