import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import { HelpCollections } from '@/lib/directus-collections'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import GlobalSearch from '@/components/GlobalSearch'
import Link from 'next-intl/link'
import VIcon from '@/components/base/VIcon'
import { convertIconName } from '@/lib/utils/strings'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const t = await getTranslator(params.lang)

  return {
    title: t('help.page_title'),
  }
}

export default async function HelpCenterPage({
  params,
}: {
  params: { lang: string }
}) {
  const collections = (await directusApi.request(
    readItems('help_collections', {
      filter: {
        articles: {
          _nnull: true,
        },
      },
    })
  )) as Array<HelpCollections>

  const t = await getTranslator(params.lang)

  return (
    <PageContainer className='max-w-7xl'>
      <header className='border-b  pb-8 '>
        <TypographyTitle>{t('help.title')}</TypographyTitle>
        <TypographyHeadline content={t.raw('help.headline')} />
        <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <div className='mt-8 grid gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-3'>
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/help/collections/${collection.slug}`}
            className='flex overflow-hidden rounded-bl-xl rounded-tr-xl border border-primary no-underline transition duration-200 hover:border-accent-focus'
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
                <p className='text-md line-clamp-3 font-mono sm:line-clamp-3'>
                  {collection.description}
                </p>
              </div>
              <div className='mt-4 font-mono text-sm '>
                {collection.articles ? collection.articles.length : 0} articles
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageContainer>
  )
}
