import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import { Post } from '@/lib/schemas'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import GlobalSearch from '@/components/GlobalSearch'
import Categories from '@/components/Categories'
import { deslugify } from '@/lib/utils/strings'
import PostCard from '@/components/PostCard'
import { isEven } from '@/lib/utils/math'

async function getPostsByCategory(categorySlug: string) {
  const posts = await directusApi.request(
    readItems('posts', {
      filter: {
        category: {
          slug: {
            _eq: categorySlug,
          },
        },
      },
      sort: ['date_published'],

      fields: [
        '*',
        'author.*',
        'category.title',
        'category.slug',
        'category.color',
      ],
    })
  )

  return posts as Array<Post>
}

export default async function PageRoute({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const posts = await getPostsByCategory(params.slug)

  return (
    <PageContainer>
      <header className='border-b-2 border-gray-300 pb-6 dark:border-gray-700'>
        <TypographyTitle>Agency Blog</TypographyTitle>
        <TypographyHeadline content='<p>Articles on <em>development</em>, marketing, and more.</p>' />
        <div></div>
      </header>
      <section className='relative w-full items-center space-y-12 py-12'>
        <div className='relative grid gap-12 border-b-2 border-gray-300 pb-12 dark:border-gray-700 md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <TypographyTitle
              as='p'
              className='text-gray-700 dark:text-gray-400'
            >
              Search
            </TypographyTitle>
            <GlobalSearch collections={['posts']} className='flex' />
            <TypographyTitle
              as='p'
              className='mt-8 text-gray-700 dark:text-gray-400'
            >
              Categories
            </TypographyTitle>
            <Categories />
          </div>
          <div className='space-y-4 lg:col-span-3'>
            <TypographyTitle as='p'>
              Articles for Category: {deslugify(params.slug)}
            </TypographyTitle>
            <span>{}</span>
            <div className='relative grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {posts.map((post: Post, postIdx: number) => (
                <PostCard
                  key={post.id}
                  post={post}
                  even={isEven(postIdx)}
                  className='col-span-2 border-b border-gray-300 pb-6 dark:border-gray-700'
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
