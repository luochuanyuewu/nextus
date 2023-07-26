import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import PageContainer from '@/components/PageContainer'
import GlobalSearch from '@/components/GlobalSearch'
import VBreadcrumbs from '@/components/base/VBreadcrumbs'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import VAvatar from '@/components/base/VAvatar'
import TypographyProse from '@/components/typography/TypographyProse'
import { markdownToHtml } from '@/lib/utils/markdown'

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const articles = await directusApi.request(
    readItems('help_articles', {
      filter: {
        slug: {
          _eq: params.slug,
        },
      },
      limit: 1,
      fields: [
        '*',
        { help_collection: ['slug', 'title', 'id'] },
        { owner: ['first_name', 'last_name', 'avatar'] },
      ],
    })
  )

  if (articles.length === 0) return null

  const article = articles[0]
  return (
    <PageContainer>
      <header className='border-b  pb-8 '>
        <GlobalSearch
          placeholder='Search for articles'
          collections={['help_articles']}
          className='flex'
        />
      </header>
      <section className='mt-8 max-w-full'>
        <div className='flex flex-row-reverse justify-between'>
          <div className='sticky mt-16 self-start max-lg:hidden'>
            {/* Table of Contents */}
          </div>
          <div className='z-3 lg:max-w-160 relative w-full'>
            <div className='lg:max-w-160 flex pb-6 max-md:pb-2'>
              <VBreadcrumbs
                items={[
                  { title: 'All Collections', href: '/help' },
                  {
                    title: article.help_collection?.title || 'undefined',
                    href: `/help/collections/${
                      article.help_collection?.slug || 'undefined'
                    }`,
                  },
                  { title: article.title || 'undefined' },
                ]}
              />
            </div>
            <div className=''>
              <div className='article'>
                <div className='mb-10 max-lg:mb-6'>
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                      {article.title && (
                        <TypographyHeadline content={article.title} />
                      )}
                      {article.summary && (
                        <p className='font-mono'>{article.summary}</p>
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
                    {article.content && (
                      <TypographyProse
                        content={markdownToHtml(article.content)}
                      />
                    )}
                  </article>
                </div>
              </div>
            </div>
            <hr className='mt-12 dark:border-base-300' />
            {/* Feedback Widget */}
            {/*<HelpFeedback*/}
            {/*  className='mt-4'*/}
            {/*  title={article.title}*/}
            {/*  url={`/help/articles/${article.slug}`}*/}
            {/*/>*/}
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
