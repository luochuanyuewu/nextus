import { useEffect } from 'react'
import Image from 'next/image'
import { getDirectusMedia } from '../../utils/api-helpers'
import { userName } from '../../utils/user-name'
import { User } from '@/types/schemas'

interface AvatarProps {
  author: Partial<User>
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

function VAvatar({ author, size = 'md', className }: AvatarProps) {
  useEffect(() => {
    // withDefaults is not available in React, you may need to manually set the default values for props if needed
    // withDefaults(defineProps<AvatarProps>(), {
    //   size: 'md',
    // });
  }, [])

  return (
    <div
      className={`group flex flex-none items-center dark:text-gray-100 ${className}`}
    >
      <div className='mr-3'>
        <Image
          className={[
            size === 'sm' ? 'h-8 w-8 sm:h-10 sm:w-10' : '',
            size === 'md' ? 'h-10 w-10 sm:h-14 sm:w-14' : '',
            size === 'lg' ? 'h-12 w-12 sm:h-16 sm:w-16' : '',
            'rounded-full object-cover dark:brightness-90',
          ].join(' ')}
          src={author.avatar_url ?? getDirectusMedia(author.avatar)}
          alt=''
        />
      </div>

      <div
        className={[
          size === 'sm' ? 'text-sm sm:text-base' : '',
          size === 'md' ? 'text-base sm:text-lg' : '',
          size === 'lg' ? 'text-lg sm:text-xl' : '',
          'word-spacing-tight font-serif font-bold',
        ].join(' ')}
      >
        {userName(author)}

        {author.title && (
          <span
            className={[
              size === 'sm' ? 'text-xs' : '',
              size === 'md' ? 'text-sm' : '',
              '',
              'block pt-0.5 font-mono font-bold uppercase tracking-widest',
            ].join(' ')}
          >
            {author.title}
          </span>
        )}
      </div>
    </div>
  )
}

export default VAvatar
