import Image from 'next/image'
import { DirectusUsers, Posts } from '@/lib/directus-collections'
import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import { Metadata } from 'next'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import Link from 'next-intl/link'
import VBadge from '@/components/base/VBadge'
import VAvatar from '@/components/base/VAvatar'
import VIcon from '@/components/base/VIcon'
import { calculateReadTime } from '@/lib/utils/strings'
import { getRelativeTime } from '@/lib/utils/time'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import PageContainer from '@/components/PageContainer'
import TypographyProse from '@/components/typography/TypographyProse'

async function getPostBySlug(slug: string, lang: string) {
  const posts = await directusApi.request(
    readItems('posts', {
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: lang,
            },
          },
        },
      },
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: [
        '*',
        { seo: ['*'] },
        { author: ['*'] },
        { category: ['title', 'slug', 'color'] },
        { translations: ['*'] },
      ],
    })
  )
  if (posts.length === 0) return null

  return posts[0] as Posts
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, params.lang)
  if (post == null) {
    return {
      title: 'a post',
    }
  }
  return {
    title: post.seo?.title,
    description: post.seo?.meta_description,
  }
}

export default async function PageRoute({
  params,
}: {
  params: { slug: string; lang: string }
}) {
  const post = await getPostBySlug(params.slug, params.lang)

  if (post == null || !post.translations || !post.translations[0]) return null

  return (
    <div>
      <article className=''>
        {/* Featured Image Full Width */}
        <header>
          <div className='md:flex'>
            {/* Post Image */}
            <div className='relative w-full max-w-3xl pt-6 md:px-6'>
              <div className='relative mx-auto h-[300px] w-full overflow-hidden rounded-bl-3xl bg-cover md:h-[450px]'>
                <Image
                  src={getDirectusMedia(post.image)}
                  width={500}
                  height={500}
                  className='h-full w-full object-cover'
                  alt=''
                />
                <div className='absolute inset-0' />
              </div>
            </div>
            {/* Post Meta */}
            <div className='mt-12 hidden space-y-6 p-8 md:block'>
              {post.category && (
                <Link
                  href={`/posts/categories/${post.category.slug}`}
                  className='inline-block hover:opacity-90'
                >
                  <VBadge size='lg' color={post.category.color ?? ''}>
                    {post.category.title}
                  </VBadge>
                </Link>
              )}
              {post.author && <VAvatar author={post.author as DirectusUsers} />}
              <div className='space-y-2'>
                <p className='flex font-mono '>
                  <VIcon icon='heroicons:clock' className='mr-2 h-6 w-6' />
                  {post.translations[0].content &&
                    calculateReadTime(post.translations[0].content)}
                </p>
                <p className='flex font-mono '>
                  <VIcon icon='heroicons:calendar' className='mr-2 h-6 w-6' />
                  {post.date_published && getRelativeTime(post.date_published)}
                </p>
              </div>
            </div>
          </div>
          {/* Title Container */}
          <div className='relative mx-auto -mt-12 w-full max-w-4xl overflow-hidden rounded-br-3xl rounded-tl-3xl border-2 border-accent p-2  md:-mt-32'>
            <div className='relative overflow-hidden rounded-br-2xl rounded-tl-2xl px-8 py-8 md:px-16 md:py-12'>
              <div className='absolute inset-0 bg-base-200' />
              <div className='absolute inset-0 ' />
              <div className='relative'>
                <div className='flex justify-between'></div>
                <TypographyHeadline
                  content={post.translations[0].title}
                  size='lg'
                />
                <p className='mt-4 md:text-lg'>
                  {post.translations[0].summary}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-6 block px-6 md:hidden'>
            {post.author && <VAvatar author={post.author as DirectusUsers} />}
            <div className='mt-4 flex justify-between border-b pb-4 '>
              <div className='space-y-2'>
                <p className='flex font-mono '>
                  <VIcon icon='heroicons:clock' className='mr-2 h-6 w-6' />
                  {calculateReadTime(post.translations[0].content ?? '')}
                </p>
                <p className='flex font-mono'>
                  <VIcon icon='heroicons:calendar' className='mr-2 h-6 w-6' />
                  {getRelativeTime(post?.date_published ?? '')}
                </p>
              </div>
              {post.category && (
                <Link
                  href={`/posts/categories/${post.category.slug}`}
                  className='inline-block hover:opacity-90'
                >
                  <VBadge size='lg' color={post.category?.color ?? ''}>
                    {post.category.title}
                  </VBadge>
                </Link>
              )}
            </div>
          </div>
        </header>

        <PageContainer>
          <main className='mx-auto w-full max-w-4xl'>
            {/* Main */}
            <TypographyProse content={post.translations[0].content} />
          </main>
          <aside>{/* <TableOfContents toc={tableOfContents.toc} /> */}</aside>
        </PageContainer>
      </article>
    </div>
  )
}
