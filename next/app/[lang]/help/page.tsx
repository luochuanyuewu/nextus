import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import { HelpCollection } from '@/lib/schemas'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import GlobalSearch from '@/components/GlobalSearch'
import Link from 'next/link'
import VIcon from '@/components/base/VIcon'
import { convertIconName } from '@/lib/utils/strings'

export default async function HelpCenterPage() {
  const collections = (await directusApi.request(
    readItems('help_collections', {
      filter: {
        articles: {
          _nnull: true,
        },
      },
    })
  )) as Array<HelpCollection>

  return (
    <PageContainer className='max-w-7xl'>
      <header className='border-b border-gray-300 pb-8 dark:border-gray-700'>
        <TypographyTitle>Help Center</TypographyTitle>
        <TypographyHeadline content='<p>How can we <em>help</em> you?</p>' />
        <GlobalSearch
          placeholder='Search for articles'
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <div className='mt-8 grid gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-3'>
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/help/collections/${collection.slug}`}
            className='flex overflow-hidden rounded-bl-xl rounded-tr-xl border bg-white no-underline transition duration-200 hover:border-accent dark:border-gray-600 dark:bg-gray-800 dark:hover:border-accent'
          >
            <div className='flex flex-col p-5 sm:p-6'>
              <div className='flex items-center'>
                {collection.icon && (
                  <VIcon
                    icon={convertIconName(collection.icon)}
                    className='h-10 w-10 text-accent'
                  />
                )}
              </div>
              <div>
                <TypographyHeadline content={collection.title} size='sm' />
                <p className='text-md line-clamp-3 font-mono text-gray-500 dark:text-gray-300 sm:line-clamp-3'>
                  {collection.description}
                </p>
              </div>
              <div className='mt-4 font-mono text-sm text-gray-500 dark:text-gray-300'>
                {collection.articles ? collection.articles.length : 0} articles
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
