import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import { getTranslations } from '@/i18n/i18n'
import Image from 'next/image'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import { fetchHelpCollections } from '@/data/directus-api'
import { Link } from '@/lib/navigation'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const { t } = await getTranslations({ locale: params.lang })

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

  const { t } = await getTranslations({ locale: params.lang })

  return (
    <PageContainer>
      <header className='border-b pb-8 '>
        <TypographyTitle>{t('help.title')}</TypographyTitle>
        <TypographyHeadline content={t('help.headline')} />
        {/* <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        /> */}
      </header>
      <div className='mt-8 grid gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-6 md:grid-cols-2 lg:grid-cols-3'>
        {collections.map(
          (collection) =>
            collection.translations &&
            collection.translations[0] && (
              <div key={collection.slug}>
                <div className='hover:border-accent-focus card bg-base-200 no-underline transition duration-200'>
                  <figure>
                    {collection.cover && (
                      <Image
                        priority
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
                        <Link target='_blank' href={`/help/${collection.slug}`}>
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
}
