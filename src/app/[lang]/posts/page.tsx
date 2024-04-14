import { readItems } from '@directus/sdk'
import { Posts } from '@/data/directus-collections'
import directusApi from '@/data/directus-api'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import Categories from '@/components/Categories'
import FeaturePostCard from '@/components/FeaturePostCard'
import PostCard from '@/components/PostCard'
import { isEven } from '@/lib/utils/math'
import { getTranslations } from '@/i18n/i18n'
import { fetchGlobalData } from '@/data/fetch-globals'

async function fetchData(lang: string) {
  const posts = await directusApi.request(
    readItems('posts', {
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _starts_with: lang,
            },
          },
        },
      },
      filter: {
        status: { _eq: 'published' },
      },
      sort: ['date_published'],
      fields: [
        '*',
        { author: ['*'] },
        { category: ['title', 'slug', 'color'] },
        { translations: ['title', 'summary'] },
      ],
    })
  )

  //@ts-ignore
  return posts as Array<Posts>
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const { t } = await getTranslations({ locale: params.lang })

  return {
    title: t('posts.page_title'),
  }
}

export default async function PageRoute({
  params,
}: {
  params: { lang: string }
}) {
  const [posts, { globalData }] = await Promise.all([
    fetchData(params.lang),
    fetchGlobalData({ locale: params.lang }),
  ])

  const { t } = await getTranslations({ locale: params.lang })

  return (
    <PageContainer>
      <header className='border-b border-base-300 pb-6 '>
        <TypographyTitle>
          {globalData.blog_setting.title || 'Nextus blog'}
        </TypographyTitle>
        {globalData.blog_setting.headline && (
          <TypographyHeadline
            content={globalData.blog_setting.headline}
          ></TypographyHeadline>
        )}
      </header>
      <section className='relative w-full space-y-12 py-12'>
        <div className='relative grid w-full gap-12 border-b-2 border-base-300 pb-12  md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <TypographyTitle>{t('posts.search')}</TypographyTitle>
            {/* <GlobalSearch
              placeholder={t('global.search.for_posts')}
              collections={['posts']}
              className='flex'
            /> */}
            <TypographyTitle className='mt-8'>
              {t('posts.categories')}
            </TypographyTitle>
            <Categories />
          </div>
          <div className='space-y-4 lg:col-span-3'>
            <TypographyTitle>{t('posts.featured')}</TypographyTitle>
            <FeaturePostCard post={posts[0]} />
          </div>
        </div>
        <div className='space-y-4'>
          <TypographyTitle>{t('posts.latest')}</TypographyTitle>
          <div className='relative grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {posts.map((post, postIdx) => (
              <PostCard
                key={post.id}
                post={post}
                even={isEven(postIdx)}
                className={`border-b border-base-300 pb-6  ${
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
