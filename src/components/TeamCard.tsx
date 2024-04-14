/* eslint-disable @next/next/no-img-element */
'use client'
import { motion } from 'framer-motion'
import { Team } from '@/data/directus-collections'
import { CSSProperties, useState } from 'react'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import { Link } from '@/lib/navigation'
import VIcon from '@/components/base/VIcon'

interface TeamCardProps {
  person: Team
  style?: CSSProperties | undefined
}

export default function TeamCard({ person, style }: TeamCardProps) {
  const [flipped, setFlipped] = useState(false)

  function handleCardClick() {
    setFlipped(!flipped)
  }

  return (
    <div
      className='animate-fade-in cursor-pointer select-none opacity-0'
      style={style}
      onClick={handleCardClick}
    >
      <div className='group relative h-full w-full overflow-hidden rounded-br-3xl rounded-tl-3xl'>
        {/* Front of Team Card */}
        <img
          className='h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0'
          src={getDirectusMedia(person.image || '')}
          alt=''
        />

        {/* Back of Team Card */}
        {flipped && (
          <motion.div
            className='absolute inset-0 bg-accent'
            initial={{
              opacity: 0,
              y: 100,
              x: 100,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              transformOrigin: 'bottom right',
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              x: 100,
              y: 100,
              transformOrigin: 'bottom right',
            }}
          >
            <div className='relative p-4'>
              <p className='font-mono uppercase tracking-wider'>Links</p>
              <div className='mt-2 space-y-4'>
                {person.social_media &&
                  person.social_media.map((link) => (
                    <Link
                      key={link.service}
                      className='flex border border-gray-900'
                      href={link.url || ''}
                      target='_blank'
                    >
                      <div className='flex w-14 flex-none items-center justify-center border-r border-black text-black'>
                        <VIcon
                          className='h-8 w-8 text-gray-900 hover:opacity-75'
                          icon={`uil:${link.service}`}
                        />
                      </div>
                      <div className='flex flex-col justify-center overflow-hidden py-2 pl-3 pr-2 md:py-3'>
                        <div className='word-spacing-tight truncate pb-1 font-mono text-lg font-semibold uppercase leading-none tracking-tight text-black'>
                          {link.service}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className='absolute bottom-4 left-7 right-7 z-10'>
          <h3 className='text-shadow leading-tight-2 2xl:leading-tight-2 pb-2 font-serif text-3xl font-extralight text-white 2xl:text-4xl'>
            {person.name}
          </h3>
          <p className='word-spacing-tight font-mono text-sm font-bold uppercase tracking-widest text-accent'>
            {person.job_title}
          </p>
        </div>

        <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-black opacity-80'></div>
      </div>
    </div>
  )
}
