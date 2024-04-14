'use client'
import React, { useState } from 'react'
import VIcon from '@/components/base/VIcon'

interface Props {
  title: string
  children?: React.ReactNode
}

export function VAccordion({ title, children }: Props) {
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div
        className={`rounded-br-3xl rounded-tl-3xl border-2 p-2 transition duration-200 ${
          open ? 'border-gray-500' : 'border-transparent'
        }`}
      >
        <div className='relative rounded-br-2xl rounded-tl-2xl  px-6 py-4 '>
          <dt className='text-lg leading-7'>
            <button
              className='flex w-full items-start justify-between text-left font-mono focus:outline-none dark:focus:text-accent'
              onClick={handleToggle}
            >
              <span className='font-bold '>{title}</span>
              <span className='flex items-center'>
                {!open && (
                  <VIcon
                    icon='heroicons:plus'
                    className='h-8 w-8 rounded-full fill-current text-accent'
                  />
                )}
                {open && (
                  <VIcon
                    icon='heroicons:minus'
                    className='h-8 w-8 rounded-full fill-current text-accent'
                  />
                )}
              </span>
            </button>
          </dt>
          {open && (
            <dd className='mt-2'>
              <div className='prose text-left font-serif '>{children}</div>
            </dd>
          )}
        </div>
      </div>
    </div>
  )
}
