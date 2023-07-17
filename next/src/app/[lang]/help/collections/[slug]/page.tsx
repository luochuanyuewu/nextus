import GlobalSearch from '@/app/[lang]/components/GlobalSearch'
import PageContainer from '@/app/[lang]/components/PageContainer'
import VBreadcrumbs from '@/app/[lang]/components/base/VBreadcrumbs'
import VIcon from '@/app/[lang]/components/base/VIcon'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'
import directusApi from '@/app/[lang]/utils/directus-api'
import { convertIconName } from '@/app/[lang]/utils/strings'
import { HelpCollection } from '@/types/schemas'
import { readItems } from '@directus/sdk'
import Link from 'next/link'

export default async function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const collections = (await directusApi.request(
    readItems('help_collections', {
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
      limit: 1,
      fields: [
        '*',
        'articles.slug',
        'articles.title',
        'articles.id',
        'articles.summary',
      ],
    })
  )) as Array<HelpCollection>

  if (collections.length === 0) return null

  const collection = collections[0]

  return (
    <PageContainer>
      <header className='border-b border-gray-300 pb-8 dark:border-gray-700'>
        <GlobalSearch
          placeholder='Search for articles'
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <section className='mt-8 max-w-full'>
        <VBreadcrumbs
          items={[
            { title: 'All Collections', href: '/help' },
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

              <div className='text-md font-mono text-gray-500'>
                <p>{collection.description}</p>
              </div>
            </div>
            <div className='mt-5 font-mono text-gray-500'>
              {collection.articles && collection.articles.length} articles
            </div>
          </div>
          <div className='flex flex-col gap-5 rounded-br-xl rounded-tl-xl border-2 p-2 dark:border-gray-600'>
            {collection.articles &&
              collection.articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/help/articles/${article.slug}`}
                  className='flex flex-col rounded-br-lg rounded-tl-lg p-3 transition duration-150 hover:bg-accent/30 dark:hover:bg-gray-900'
                >
                  <div className='flex items-center justify-between'>
                    <div>
                      <TypographyHeadline content={article.title} size='sm' />
                      <p className='mt-2 font-mono text-sm text-gray-500'>
                        {article.summary}
                      </p>
                    </div>
                    <VIcon
                      icon='heroicons:arrow-right'
                      className='h-6 w-6 dark:text-gray-300'
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
