import { fetchHelpCollection } from '@/lib/utils/directus-api'
import PageContainer from '@/components/PageContainer'
import GlobalSearch from '@/components/GlobalSearch'
import VBreadcrumbs from '@/components/base/VBreadcrumbs'
import VIcon from '@/components/base/VIcon'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import Link from 'next-intl/link'
import { HelpArticles } from '@/lib/directus-collections'
import { getTranslator } from 'next-intl/server'
import Image from 'next/image'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import LangRedirect from '@/components/navigation/LangRedirect'

export default async function CollectionPage({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const collection = await fetchHelpCollection(params.slug, params.lang)

  if (!collection) return null

  if (!collection.translations || collection.translations.length == 0)
    return <LangRedirect lang={params.lang}></LangRedirect>

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
              title: collection.translations[0].title || '',
              href: `/help/collections/${collection.slug}`,
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
              {collection.articles && (collection.articles as any).length}{' '}
              {t('help.article_name')}
            </div>
          </div>
          <div className='flex flex-col gap-5 rounded-br-xl rounded-tl-xl border-2 p-2 '>
            {collection.articles &&
              (collection.articles as any).map(
                (article: HelpArticles) =>
                  article.translations &&
                  article.translations[0] && (
                    <div key={article.id}>
                      <Link
                        href={`/help/articles/${article.slug}`}
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
