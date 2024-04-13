import { DirectusUsers, Posts } from '@/data/directus-collections'
import { Link } from '@/lib/navigation'
import Image from 'next/image'

import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import VBadge from '@/components/base/VBadge'
import { truncateString } from '@/lib/utils/strings'
import { isObject } from '@/lib/utils/objects'
import VAvatar from '@/components/base/VAvatar'

interface PostCardProps {
  post: Posts
  className?: string
  even?: boolean
}

function PostCard({ post, even, className }: PostCardProps) {
  if (!post.translations || post.translations.length === 0) return null

  return (
    <figure className={`group flex flex-col ${className}`}>
      <Link href={`/posts/${post.slug}`}>
        <div
          className={[
            even
              ? 'rounded-br-3xl rounded-tl-3xl'
              : 'rounded-bl-3xl rounded-tr-3xl',
            'hover:border-accent-focus relative h-56 w-full overflow-hidden border-2 border-transparent p-2 transition duration-150',
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
              className='h-full w-full object-cover transition-opacity duration-300 hover:opacity-75'
              width={500}
              height={500}
              src={getDirectusMedia(post.image)}
              alt=''
            />
            <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            {post.category && (
              <VBadge
                size='lg'
                color={post.category?.color ?? ''}
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
        <p className='mt-5 font-serif text-xl font-semibold group-hover:text-accent'>
          {post.translations[0].title}
        </p>
        <p className='mt-3 font-mono text-sm '>
          {truncateString(post.translations[0].summary ?? '', 150)}
        </p>
      </Link>

      {isObject(post.author) && (
        <VAvatar
          className='mt-4'
          size='sm'
          author={post.author as DirectusUsers}
        />
      )}
    </figure>
  )
}

export default PostCard
