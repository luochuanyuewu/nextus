import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import GlobalSearch from '@/components/GlobalSearch'
import Link from 'next-intl/link'
import { getTranslator } from 'next-intl/server'
import Image from 'next/image'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import { fetchHelpCollections } from '@/lib/utils/directus-api'

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
  const collections = await fetchHelpCollections(params.lang)

  const t = await getTranslator(params.lang)

  return (
    <PageContainer>
      <header className='border-b pb-8 '>
        <TypographyTitle>{t('help.title')}</TypographyTitle>
        <TypographyHeadline content={t.raw('help.headline')} />
        <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <div className='mt-8 grid gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
        {collections.map(
          (collection) =>
            collection.translations &&
            collection.translations[0] && (
              <div key={collection.id}>
                <div className='card bg-base-200 no-underline transition duration-200 hover:border-accent-focus'>
                  <figure>
                    {collection.cover && (
                      <Image
                        src={getDirectusMedia(collection.cover)}
                        alt='cover'
                        height={500}
                        width={500}
                        className='rounded-xl'
                      ></Image>
                    )}
                  </figure>
                  <div className='card-body'>
                    <h2 className='card-title'>
                      {collection.translations[0].title}
                    </h2>
                    <p> {collection.translations[0].description}</p>
                    <div className='card-actions justify-end'>
                      <button className='btn-l btn btn-primary'>
                        <Link href={`/help/collections/${collection.slug}`}>
                          {t('help.view')}
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </PageContainer>
  )

  return (
    <PageContainer>
      <header className='border-b pb-8 '>
        <TypographyTitle>{t('help.title')}</TypographyTitle>
        <TypographyHeadline content={t.raw('help.headline')} />
        <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <div className='mt-8 grid gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-3'>
        {collections.map(
          (collection) =>
            collection.translations &&
            collection.translations[0] && (
              <Link
                key={collection.id}
                href={`/help/collections/${collection.slug}`}
                className='flex overflow-hidden rounded-bl-xl rounded-tr-xl border border-primary no-underline transition duration-200 hover:border-accent-focus'
              >
                <div className='flex flex-col p-5 sm:p-6'>
                  <div className='flex items-center'>
                    {collection.cover && (
                      <Image
                        src={getDirectusMedia(collection.cover)}
                        alt='cover'
                        height={500}
                        width={500}
                      ></Image>
                    )}
                  </div>
                  <div>
                    <TypographyHeadline
                      content={collection.translations[0].title}
                      size='sm'
                    />
                    <p className='text-md line-clamp-3 font-mono sm:line-clamp-3'>
                      {collection.translations[0].description}
                    </p>
                  </div>
                  <div className='mt-4 font-mono text-sm '>
                    {collection.articles ? collection.articles.length : 0}{' '}
                    {t('help.article_name')}
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    </PageContainer>
  )
}
