import { readItems } from '@directus/sdk'
import { Post } from '@/types/schemas'
import directusApi from '@/app/[lang]/utils/directus-api'
import PageContainer from '@/app/[lang]/components/PageContainer'
import TypographyTitle from '@/app/[lang]/components/typography/TypographyTitle'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'
import GlobalSearch from '@/app/[lang]/components/GlobalSearch'
import Categories from '@/app/[lang]/components/Categories'
import FeaturePostCard from '@/app/[lang]/components/FeaturePostCard'
import PostCard from '@/app/[lang]/components/PostCard'
import { isEven } from '@/app/[lang]/utils/math'

async function fetchData() {
  const posts = await directusApi.request(
    readItems('posts', {
      filter: {
        // status: { _eq: 'published' },
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

export default async function PageRoute() {
  const posts = await fetchData()

  return (
    <PageContainer>
      <header className='border-b border-gray-300 pb-6 dark:border-gray-700'>
        <TypographyTitle>Agency Blog</TypographyTitle>
        <TypographyHeadline>
          <p>
            Articles on <em>development</em>, marketing, and more.
          </p>
        </TypographyHeadline>
      </header>
      <section className='relative w-full space-y-12 py-12'>
        <div className='relative grid w-full gap-12 border-b-2 border-gray-300 pb-12 dark:border-gray-700 md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <TypographyTitle className='text-gray-700 dark:text-gray-400'>
              Search
            </TypographyTitle>
            <GlobalSearch collections={['posts']} className='flex' />
            <TypographyTitle className='mt-8 text-gray-700 dark:text-gray-400'>
              Categories
            </TypographyTitle>
            <Categories />
          </div>
          <div className='space-y-4 lg:col-span-3'>
            <TypographyTitle>Featured Article</TypographyTitle>
            <FeaturePostCard post={posts[0]} />
          </div>
        </div>
        <div className='space-y-4'>
          <TypographyTitle>Latest & Greatest</TypographyTitle>
          <div className='relative grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {posts.map((post, postIdx) => (
              <PostCard
                key={post.id}
                post={post}
                even={isEven(postIdx)}
                className={`border-b border-gray-300 pb-6 dark:border-gray-700 ${
                  postIdx < 2 ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
