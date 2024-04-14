import directusApi, { fetchGlobals } from '@/data/directus-api'
import { readItems } from '@directus/sdk'
import { Posts } from '@/data/directus-collections'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import GlobalSearch from '@/components/GlobalSearch'
import Categories from '@/components/Categories'
import { deslugify } from '@/lib/utils/strings'
import PostCard from '@/components/PostCard'
import { isEven } from '@/lib/utils/math'
import { getTranslations } from '@/i18n/i18n'

async function getPostsByCategory(categorySlug: string, lang: string) {
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
        category: {
          slug: {
            _eq: categorySlug,
          },
        },
      },
      sort: ['date_published'],

      fields: [
        '*',
        { author: ['*'] },
        { category: ['title', 'slug', 'color'] },
        { translations: ['*'] },
      ],
    })
  )

  // @ts-ignore
  return posts as Array<Posts>
}

export default async function PageRoute({
  params,
}: {
  params: {
    lang: string
    slug: string
  }
}) {
  const posts = await getPostsByCategory(params.slug, params.lang)

  const globals = await fetchGlobals(params.lang)

  const globalData = globals.translations[0]

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
      <section className='relative w-full items-center space-y-12 py-12'>
        <div className='relative grid gap-12 border-b-2 border-base-300 pb-12  md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <TypographyTitle as='p'>{t('posts.search')}</TypographyTitle>
            {/* <GlobalSearch
              placeholder={t('global.search.for_posts')}
              collections={['posts']}
              className='flex'
            /> */}
            <TypographyTitle as='p' className='mt-8'>
              {t('posts.categories')}
            </TypographyTitle>
            <Categories />
          </div>
          <div className='space-y-4 lg:col-span-3'>
            <TypographyTitle as='p'>
              {t('posts.category_for')} {deslugify(params.slug)}
            </TypographyTitle>
            <div className='relative grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4'>
              {posts.map((post: Posts, postIdx: number) => (
                <PostCard
                  key={post.id}
                  post={post}
                  even={isEven(postIdx)}
                  className='col-span-2 border-b border-base-300 pb-6 '
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
