import { fetchHelpArticle } from '@/data/directus-api'
import PageContainer from '@/components/PageContainer'
import GlobalSearch from '@/components/GlobalSearch'
import VBreadcrumbs from '@/components/base/VBreadcrumbs'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import VAvatar from '@/components/base/VAvatar'
import TypographyProse from '@/components/typography/TypographyProse'
import { getTranslations } from '@/i18n/i18n'
import LangRedirect from '@/components/navigation/LangRedirect'

export default async function ArticlePage({
  params,
}: {
  params: { lang: string; collectionSlug: string; articleSlug: string }
}) {
  const article = await fetchHelpArticle(
    params.collectionSlug,
    params.articleSlug,
    params.lang
  )

  if (!article.translations || article.translations.length === 0) {
    return <LangRedirect lang={params.lang}></LangRedirect>
  }

  const { t } = await getTranslations({ locale: params.lang })

  return (
    <PageContainer>
      {/* <header className='border-b  pb-8 '>
        <GlobalSearch
          placeholder={t('global.search.for_help_articles')}
          collections={['help_articles']}
          className='flex'
        />
      </header> */}
      <section className='mt-8 max-w-full'>
        <div className='flex flex-row-reverse justify-between'>
          <div className='sticky mt-16 self-start max-lg:hidden'>
            {/* Table of Contents */}
          </div>
          <div className='z-3 lg:max-w-160 relative w-full'>
            <div className='lg:max-w-160 flex pb-6 max-md:pb-2'>
              <VBreadcrumbs
                items={[
                  { title: t('help.all_collections'), href: '/help' },
                  {
                    title:
                      article.help_collection.translations[0].title ||
                      'undefined',
                    href: `/help/${
                      article.help_collection.slug || 'undefined'
                    }`,
                  },
                  { title: article.translations[0].title || 'undefined' },
                ]}
              />
            </div>
            <div className=''>
              <div className='article'>
                <div className='mb-10 max-lg:mb-6'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      {article.translations[0].title && (
                        <TypographyHeadline
                          content={article.translations[0].title}
                        />
                      )}
                      {article.translations[0].summary && (
                        <p className='font-mono'>
                          {article.translations[0].summary}
                        </p>
                      )}
                    </div>
                    {article.owner && <VAvatar author={article.owner} />}
                  </div>
                </div>
                <div className='flex-col'>
                  <div className='text-md mb-7 ml-0 lg:hidden'>
                    {/* Table of Contents */}
                  </div>
                  <article>
                    {article.translations[0].content && (
                      <TypographyProse
                        content={article.translations[0].content}
                      />
                    )}
                  </article>
                </div>
              </div>
            </div>
            <hr className='mt-12' />
            {/* Feedback Widget */}
            {/*<HelpFeedback*/}
            {/*  className='mt-4'*/}
            {/*  title={article.title}*/}
            {/*  url={`/help/${article.help_collection.slug}/${article.slug}`}*/}
            {/*/>*/}
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
