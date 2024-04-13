import Image from 'next/image'
import { Link } from '@/lib/navigation'
import {
  formatDate,
  getDirectusMedia,
  getStrapiMedia,
} from '@/lib/utils/directus-helpers'
import { DirectusUsers, Posts } from '@/data/directus-collections'
import { getRelativeTime } from '@/lib/utils/time'

const createExcerpt = (
  content: string,
  maxNumberOfWords: number,
  trailingIndicator = '...'
) => {
  const listOfWords = content.trim().split(' ')
  const truncatedContent = listOfWords.slice(0, maxNumberOfWords).join(' ')
  const excerpt = truncatedContent + trailingIndicator
  const output = listOfWords.length > maxNumberOfWords ? excerpt : content

  return output
}

export default function PostList({
  data: posts,
  children,
}: {
  data: Posts[]
  children?: React.ReactNode
}) {
  return (
    <div>
      <section>
        <ul>
          {posts.map((post) => {
            const imageUrl = getDirectusMedia(post.image)

            const category = post.category
            const authorsBio = post.author as DirectusUsers

            const avatarUrl = getDirectusMedia(authorsBio.avatar)

            return (
              <li key={post.id} className=''>
                <article className='card card-compact mb-2 shadow-md'>
                  <div className='card-body'>
                    <div className='grid grid-cols-1 flex-row items-center md:grid-cols-4'>
                      <Link
                        className='hidden md:inline '
                        href={`p/${category?.slug}/${post.slug}`}
                      >
                        {imageUrl && (
                          <Image
                            alt='presentation'
                            width='208'
                            height='128'
                            className='mr-2 h-32 w-52 rounded-md'
                            src={imageUrl}
                          />
                        )}
                      </Link>
                      <div className='col-span-3 mx-1 flex flex-grow flex-col'>
                        <div className='mt-3 flex flex-col'>
                          <h1 className='text-2xl font-bold'>
                            <Link href={`p/${category?.slug}/${post.slug}`}>
                              <span className='badge badge-secondary mx-1'>
                                {post.category?.title || 'category_title'}
                              </span>
                              {post.translations &&
                                post.translations[0] &&
                                post.translations[0].title}
                            </Link>
                          </h1>
                          <p className='prose mx-2 mt-2'>
                            {(post.translations &&
                              post.translations[0] &&
                              post.translations[0].summary) ??
                              'summary'}
                          </p>
                        </div>
                        <div className='mt-4 flex items-center justify-end gap-2'>
                          <div className='flex items-center gap-1'>
                            {avatarUrl && (
                              <Image
                                alt='avatar'
                                width='50'
                                height='50'
                                src={avatarUrl}
                                className='h-10 w-10 rounded-full object-cover'
                              />
                            )}
                            {authorsBio && <span>{authorsBio.first_name}</span>}
                          </div>
                          <span className='text-sm'>
                            {post.date_published &&
                              getRelativeTime(post.date_published)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </section>
      {children && children}
    </div>
  )
}
