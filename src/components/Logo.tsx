import React from 'react'
import { Link } from '@/lib/navigation'
import Image from 'next/image'

export default function Logo({
  src,
  children,
}: {
  src: string | null
  children?: React.ReactNode
}) {
  return (
    <Link href='/'>
      <div
        className='flex items-center justify-between'
        data-umami-event='logo'
      >
        <div className='mr-3 flex items-center justify-center'>
          {src && (
            <Image
              src={src}
              alt='logo'
              width={45}
              height={45}
              className='rounded-full'
            />
          )}
          <div className='ml-2'>{children}</div>
        </div>
      </div>
    </Link>
  )
}
