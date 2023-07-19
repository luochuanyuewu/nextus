import Image from 'next/image'
import { Post } from '@/lib/schemas'
import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import { Metadata } from 'next'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import Link from 'next/link'
import VBadge from '@/components/base/VBadge'
import VAvatar from '@/components/base/VAvatar'
import VIcon from '@/components/base/VIcon'
import { calculateReadTime } from '@/lib/utils/strings'
import { getRelativeTime } from '@/lib/utils/time'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import PageContainer from '@/components/PageContainer'
import TypographyProse from '@/components/typography/TypographyProse'

async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await directusApi.request(
    readItems('posts', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: [
        '*',
        'seo.*',
        'author.*',
        'category.title',
        'category.slug',
        'category.color',
      ],
    })
  )

  if (posts.length === 0) return null

  return posts[0]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await getPostBySlug(params.slug)
  if (page == null) {
    return {
      title: 'unknown post.',
    }
  }
  return {
    title: page.seo?.title,
    description: page.seo?.meta_description,
  }
}

export default async function PageRoute({
  params,
}: {
  params: { slug: string }
}) {
  const page = await getPostBySlug(params.slug)

  if (page == null) return null

  return (
    <div>
      <article className=''>
        {/* Featured Image Full Width */}
        <header>
          <div className='md:flex'>
            {/* Post Image */}
            <div className='relative w-full max-w-3xl pt-6 md:px-6'>
              <div className='relative mx-auto h-[300px] w-full overflow-hidden rounded-bl-3xl bg-cover dark:outline-gray-800 md:h-[450px]'>
                <Image
                  src={getDirectusMedia(page.image)}
                  width={500}
                  height={500}
                  className='h-full w-full object-cover saturate-0 dark:brightness-90'
                  alt=''
                />
                <div className='absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-900 mix-blend-multiply' />
              </div>
            </div>
            {/* Post Meta */}
            <div className='mt-12 hidden space-y-6 p-8 md:block'>
              {page.category && (
                <Link
                  href={`/posts/categories/${page.category.slug}`}
                  className='inline-block hover:opacity-90'
                >
                  <VBadge size='lg' color={page.category.color}>
                    {page.category.title}
                  </VBadge>
                </Link>
              )}
              {page.author && <VAvatar author={page.author} />}
              <div className='space-y-2'>
                <p className='flex font-mono text-gray-500 dark:text-gray-300'>
                  <VIcon icon='heroicons:clock' className='mr-2 h-6 w-6' />
                  {calculateReadTime(page.content)}
                </p>
                <p className='flex font-mono text-gray-500 dark:text-gray-300'>
                  <VIcon icon='heroicons:calendar' className='mr-2 h-6 w-6' />
                  {getRelativeTime(page.date_published)}
                </p>
              </div>
            </div>
          </div>
          {/* Title Container */}
          <div className='relative mx-auto -mt-12 w-full max-w-4xl overflow-hidden rounded-br-3xl rounded-tl-3xl border-2 border-accent p-2 text-gray-900 md:-mt-32'>
            <div className='relative overflow-hidden rounded-br-2xl rounded-tl-2xl px-8 py-8 md:px-16 md:py-12'>
              <div className='absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-accent dark:from-gray-700 dark:via-gray-900 dark:to-accent' />
              <div className='grain-bg absolute inset-0 dark:opacity-20' />
              <div className='relative'>
                <div className='flex justify-between'></div>
                <TypographyHeadline content={page.title} size='lg' />

                <p className='font-display mt-4 font-mono font-semibold dark:text-gray-200 md:text-lg'>
                  {page.summary}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-6 block px-6 md:hidden'>
            {page.author && <VAvatar author={page.author} />}
            <div className='mt-4 flex justify-between border-b pb-4 dark:border-gray-700'>
              <div className='space-y-2'>
                <p className='flex font-mono text-gray-500 dark:text-gray-300'>
                  <VIcon icon='heroicons:clock' className='mr-2 h-6 w-6' />
                  {calculateReadTime(page.content)}
                </p>
                <p className='flex font-mono text-gray-500 dark:text-gray-300'>
                  <VIcon icon='heroicons:calendar' className='mr-2 h-6 w-6' />
                  {getRelativeTime(page.date_published)}
                </p>
              </div>
              {page.category && (
                <Link
                  href={`/posts/categories/${page.category.slug}`}
                  className='inline-block hover:opacity-90'
                >
                  <VBadge size='lg' color={page.category.color}>
                    {page.category.title}
                  </VBadge>
                </Link>
              )}
            </div>
          </div>
        </header>

        <PageContainer>
          <main className='mx-auto w-full max-w-4xl'>
            {/* Main */}
            <TypographyProse content={page.content} />
          </main>
          <aside>{/* <TableOfContents toc={tableOfContents.toc} /> */}</aside>
        </PageContainer>
      </article>
    </div>
  )
}
