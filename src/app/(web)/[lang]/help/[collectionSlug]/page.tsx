import { fetchHelpArticles, fetchHelpCollection } from '@/data/directus-api'
import PageContainer from '@/components/PageContainer'
import GlobalSearch from '@/components/GlobalSearch'
import VBreadcrumbs from '@/components/base/VBreadcrumbs'
import VIcon from '@/components/base/VIcon'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import { Link } from '@/lib/navigation'
import { HelpArticles } from '@/data/directus-collections'
import { getTranslations } from '@/i18n/i18n'
import Image from 'next/image'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import LangRedirect from '@/components/navigation/LangRedirect'

export default async function CollectionPage({
  params,
}: {
  params: { lang: string; collectionSlug: string }
}) {
  const collectionData = fetchHelpCollection(params.collectionSlug, params.lang)
  const articlesData = fetchHelpArticles(params.collectionSlug, params.lang)

  let [collection, articles] = await Promise.all([collectionData, articlesData])

  if (!collection) return null

  if (
    !collection.translations ||
    collection.translations.length == 0 ||
    !collection.translations[0]
  )
    return <LangRedirect lang={params.lang}></LangRedirect>

  const { t } = await getTranslations({ locale: params.lang })

  let count = 0
  articles?.forEach((article) => {
    if (
      article.translations &&
      article.translations?.length > 0 &&
      article.translations[0]
    ) {
      count++
    }
  })

  return (
    <PageContainer>
      {/* <header className='border-b border-base-300 pb-8 '>
        <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        />
      </header> */}
      <section className='mt-8 max-w-full'>
        <VBreadcrumbs
          items={[
            { title: t('help.all_collections'), href: '/help' },
            {
              title: collection.translations[0].title || '',
              href: `/help/${collection.slug}`,
            },
          ]}
        />
        <div className='flex flex-col gap-10 pt-4 max-sm:gap-8 max-sm:pt-2'>
          <div>
            <div className='mb-5'>
              {collection.cover && (
                <Image
                  src={getDirectusMedia(collection.cover)}
                  width={500}
                  height={500}
                  alt='cover'
                  className='mx-auto'
                ></Image>
              )}
            </div>
            <div className='flex flex-col'>
              <TypographyHeadline content={collection.translations[0].title} />

              <div className='text-md font-mono '>
                <p>{collection.translations[0].description}</p>
              </div>
            </div>
            <div className='mt-5 font-mono'>
              {count} {t('help.article_name')}
            </div>
          </div>
          <div className='flex flex-col gap-5 rounded-br-xl rounded-tl-xl border-2 p-2 '>
            {articles &&
              (articles as any).map(
                (article: HelpArticles) =>
                  article.translations &&
                  article.translations[0] && (
                    <div key={article.id}>
                      <Link
                        prefetch={false}
                        href={`/help/${collection?.slug}/${article.slug}`}
                        className='flex flex-col rounded-br-lg rounded-tl-lg p-3 transition duration-150 hover:bg-accent/30 '
                      >
                        <div className='flex items-center justify-between'>
                          <div>
                            <TypographyHeadline
                              content={article.translations[0].title}
                              size='sm'
                            />
                            <p className='mt-2 font-mono text-sm '>
                              {article.translations[0].summary}
                            </p>
                          </div>
                          <VIcon
                            icon='heroicons:arrow-right'
                            className='h-6 w-6 '
                          />
                        </div>
                      </Link>
                    </div>
                  )
              )}
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
