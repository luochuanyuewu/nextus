import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import PageContainer from '@/components/PageContainer'
import GlobalSearch from '@/components/GlobalSearch'
import VBreadcrumbs from '@/components/base/VBreadcrumbs'
import VIcon from '@/components/base/VIcon'
import { convertIconName } from '@/lib/utils/strings'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import Link from 'next-intl/link'
import { HelpArticles } from '@/lib/directus-collections'
import { getTranslator } from 'next-intl/server'

export default async function CollectionPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const collections = await directusApi.request(
    readItems('help_collections', {
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
      limit: 1,
      fields: ['*', { articles: ['slug', 'title', 'id', 'summary'] }],
    })
  )

  if (collections.length === 0) return null

  const collection = collections[0]

  const t = await getTranslator(params.lang)

  return (
    <PageContainer>
      <header className='border-b border-base-300 pb-8 '>
        <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <section className='mt-8 max-w-full'>
        <VBreadcrumbs
          items={[
            { title: t('help.all_collections'), href: '/help' },
            {
              title: collection.title || '',
              href: `/help/collections/${collection.slug}`,
            },
          ]}
        />
        <div className='flex flex-col gap-10 pt-4 max-sm:gap-8 max-sm:pt-2'>
          <div>
            <div className='mb-5'>
              {collection.icon && (
                <VIcon
                  icon={convertIconName(collection.icon)}
                  className='h-9 w-9 text-accent sm:h-10 sm:w-10'
                />
              )}
            </div>
            <div className='flex flex-col'>
              <TypographyHeadline content={collection.title} />

              <div className='text-md font-mono '>
                <p>{collection.description}</p>
              </div>
            </div>
            <div className='mt-5 font-mono '>
              {collection.articles && (collection.articles as any).length}{' '}
              articles
            </div>
          </div>
          <div className='flex flex-col gap-5 rounded-br-xl rounded-tl-xl border-2 p-2 '>
            {collection.articles &&
              (collection.articles as any).map((article: HelpArticles) => (
                <Link
                  key={article.id}
                  href={`/help/articles/${article.slug}`}
                  className='flex flex-col rounded-br-lg rounded-tl-lg p-3 transition duration-150 hover:bg-accent/30 '
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <TypographyHeadline content={article.title} size='sm' />
                      <p className='mt-2 font-mono text-sm '>
                        {article.summary}
                      </p>
                    </div>
                    <VIcon icon='heroicons:arrow-right' className='h-6 w-6 ' />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
