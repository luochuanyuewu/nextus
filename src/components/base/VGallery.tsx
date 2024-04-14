'use client'
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'
import BlockContainer from '@/components/BlockContainer'
import VIcon from '@/components/base/VIcon'
import Image from 'next/image'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import VBadge from '@/components/base/VBadge'

interface GalleryProps {
  items: Array<{
    id?: string
    title?: string
    description?: string
    tags?: string[]
  }>
}

function VGallery({ items }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentItemIdx, setCurrentItemIdx] = useState(0)

  const currentItem = useMemo(() => {
    return items[currentItemIdx]
  }, [items, currentItemIdx])

  const next = () => {
    setCurrentItemIdx((prevIdx) =>
      prevIdx === items.length - 1 ? 0 : prevIdx + 1
    )
  }

  const prev = () => {
    setCurrentItemIdx((prevIdx) =>
      prevIdx === 0 ? items.length - 1 : prevIdx - 1
    )
  }

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const onKeydown = (e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape') {
      toggle()
    }
    if (e.key === 'ArrowRight') {
      next()
    }
    if (e.key === 'ArrowLeft') {
      prev()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeydown)
    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [])

  return (
    <>
      <BlockContainer>
        {/* Gallery */}
        <div className='mt-4 gap-4 md:columns-3'>
          {items.map((item, itemIdx) => (
            <button
              key={itemIdx}
              onClick={() => {
                setCurrentItemIdx(itemIdx)
                toggle()
              }}
              className={`${
                itemIdx % 2 === 0
                  ? 'rounded-br-3xl rounded-tl-3xl'
                  : 'rounded-bl-3xl rounded-tr-3xl'
              } hover:border-accent-focus group relative mb-6 block w-full overflow-hidden border-2 border-transparent p-2 transition duration-300`}
            >
              <div
                className={`${
                  itemIdx % 2 === 0
                    ? 'rounded-br-2xl rounded-tl-2xl'
                    : 'rounded-bl-2xl rounded-tr-2xl'
                } group relative block w-full overflow-hidden`}
              >
                <Image
                  src={getDirectusMedia(item.id as any)}
                  width='800'
                  height='800'
                  alt=''
                  className='w-full object-cover transition duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-neutral bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100'>
                  <VIcon
                    icon='heroicons:magnifying-glass-plus'
                    className='text-accent-focus h-12 w-12'
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </BlockContainer>
      {/* Gallery Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gray-900 bg-opacity-75'>
          {/* Tips for using the gallery */}
          <div className='absolute left-4 top-4 z-50 hidden font-mono text-white md:block'>
            <div className='rounded-br-3xl rounded-tl-3xl bg-gray-900 p-4'>
              <p>Press 'esc' to close</p>
              <p>Press 'left' or 'right' to navigate</p>
            </div>
          </div>
          <div className='absolute bottom-4 right-4 z-50 font-mono text-white'>
            {currentItem &&
              currentItem.tags &&
              currentItem.tags.map((tag, tagIdx) => (
                <VBadge key={tagIdx} size='lg' className='rounded-br-xl'>
                  {tag}
                </VBadge>
              ))}
          </div>
          <div className='relative flex h-full w-full max-w-7xl flex-col items-center justify-center'>
            <button
              onClick={toggle}
              className='absolute right-4 top-4 z-50 rounded-bl-xl rounded-tr-xl bg-accent p-4 text-2xl text-white transition duration-300 hover:bg-opacity-75'
            >
              <div>
                <span className='sr-only'>Close</span>
                <VIcon icon='heroicons:x-mark' className='h-6 w-6' />
              </div>
            </button>
            <div className='flex h-full w-full items-center justify-center'>
              <button
                onClick={prev}
                className='absolute left-4 z-50 rounded-bl-xl rounded-tr-xl bg-accent p-4 text-2xl text-white transition duration-300 hover:bg-opacity-75'
              >
                <span className='sr-only'>Previous</span>
                <VIcon icon='heroicons:arrow-left' className='h-6 w-6' />
              </button>
              <button
                onClick={next}
                className='absolute right-4 z-50 rounded-br-xl rounded-tl-xl bg-accent p-4 text-2xl text-white transition duration-300 hover:bg-opacity-75'
              >
                <span className='sr-only'>Next</span>
                <VIcon icon='heroicons:arrow-right' className='h-6 w-6' />
              </button>
              {/* Image */}
              <div className='relative flex items-center justify-center'>
                <div className='relative h-full w-full p-20'>
                  {/* Metadata */}
                  <div className='flex'>
                    <p className='track inline-block rounded-tl-3xl bg-gray-900 px-6 py-2 font-serif font-bold text-white'>
                      {currentItem.title}
                    </p>
                    {currentItem.description && (
                      <p className='hidden flex-1 bg-gray-700 px-6 py-2 font-mono text-white md:inline-block'>
                        {currentItem.description}
                      </p>
                    )}
                  </div>
                  {items.map((item, itemIdx) => (
                    <Image
                      key={itemIdx}
                      width={800}
                      height={800}
                      alt=''
                      style={{
                        display: currentItemIdx === itemIdx ? 'block' : 'none',
                      }}
                      src={getDirectusMedia(item.id || null)}
                      className='w-full rounded-br-3xl object-contain'
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VGallery
