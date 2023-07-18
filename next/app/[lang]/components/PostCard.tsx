import { Post } from '@/types/schemas'
import Link from 'next/link'
import Image from 'next/image'

import { getDirectusMedia } from '@/app/[lang]/utils/api-helpers'
import VBadge from '@/app/[lang]/components/base/VBadge'
import { truncateString } from '@/app/[lang]/utils/strings'
import { isObject } from '@/app/[lang]/utils/objects'
import VAvatar from '@/app/[lang]/components/base/VAvatar'

interface PostCardProps {
  post: Post
  className?: string
  even?: boolean
}

function PostCard({ post, even, className }: PostCardProps) {
  return (
    <figure className={`group flex flex-col ${className}`}>
      <Link href={`/posts/${post.slug}`}>
        <div
          className={[
            even
              ? 'rounded-br-3xl rounded-tl-3xl'
              : 'rounded-bl-3xl rounded-tr-3xl',
            'relative h-56 w-full overflow-hidden border-2 border-transparent p-2 transition duration-150 hover:border-gray-300 dark:hover:border-gray-700',
          ].join(' ')}
        >
          <div
            className={[
              even
                ? 'rounded-br-2xl rounded-tl-2xl'
                : 'rounded-bl-2xl rounded-tr-2xl',
              'group relative block h-full w-full overflow-hidden',
            ].join(' ')}
          >
            <Image
              className='h-full w-full object-cover saturate-0 transition-opacity duration-300 group-hover:opacity-75'
              width={500}
              height={500}
              src={getDirectusMedia(post.image)}
              alt=''
            />
            <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            {post.category && (
              <VBadge
                size='lg'
                color={post.category.color}
                className={[
                  even ? 'rounded-br-lg' : 'rounded-bl-lg',
                  'absolute bottom-0 left-0 mb-4 ml-4',
                ].join(' ')}
              >
                {post.category.title}
              </VBadge>
            )}
          </div>
        </div>
      </Link>

      <Link className='h-full' href={`/posts/${post.slug}`}>
        {/* Icon */}
        <p className='mt-5 font-serif text-xl font-semibold text-gray-900 group-hover:text-accent dark:text-white'>
          {post.title}
        </p>
        <p className='mt-3 font-mono text-sm text-gray-500 dark:text-gray-300'>
          {truncateString(post.summary, 150)}
        </p>
      </Link>

      {isObject(post.author) && (
        <VAvatar className='mt-4' size='sm' author={post.author} />
      )}
    </figure>
  )
}

export default PostCard
