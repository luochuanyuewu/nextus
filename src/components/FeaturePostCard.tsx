import Image from 'next/image'
import { DirectusUsers, Posts } from '@/data/directus-collections'
import { Link } from '@/lib/navigation'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import VBadge from '@/components/base/VBadge'
import { truncateString } from '@/lib/utils/strings'
import VAvatar from '@/components/base/VAvatar'

const FeaturePostCard = ({ post }: { post: Posts }) => {
  if (!post.translations || post.translations.length === 0) return null

  return (
    <figure className='relative space-x-2 rounded-bl-3xl rounded-tr-3xl border-2 border-accent p-2 md:flex'>
      <Link className='group' href={`/posts/${post.slug}`}>
        <div className='relative h-[300px] w-[300px] overflow-hidden rounded-bl-2xl duration-300'>
          <Image
            width={500}
            height={500}
            className='h-full w-full object-cover transition-opacity duration-300 hover:opacity-75'
            src={getDirectusMedia(post.image)}
            alt=''
          />
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          {post.category && (
            <VBadge
              size='lg'
              color={post.category?.color ?? ''}
              className='absolute bottom-0 left-0 mb-4 ml-4 rounded-bl-lg'
            >
              {post.category.title}
            </VBadge>
          )}
        </div>
      </Link>

      <div className='group relative overflow-hidden rounded-tl-3xl rounded-tr-3xl px-8 transition duration-300'>
        <Link className='g relative block' href={`/posts/${post.slug}`}>
          <p className='mt-5 font-serif text-3xl font-semibold  transition duration-300 group-hover:text-accent '>
            {post.translations[0].title}
          </p>
          <p className='mt-3 font-mono text-sm '>
            {truncateString(post.translations[0].summary, 150)}
          </p>
        </Link>
        {post.author && (
          <VAvatar
            className='relative mt-4'
            size='sm'
            author={post.author as DirectusUsers}
          />
        )}
      </div>
    </figure>
  )
}

export default FeaturePostCard
