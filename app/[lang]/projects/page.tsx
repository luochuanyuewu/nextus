import directusApi, { fetchGlobals } from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import { Projects } from '@/lib/directus-collections'
import Link from 'next-intl/link'
import { isEven } from '@/lib/utils/math'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import Image from 'next/image'
import { getTranslator } from 'next-intl/server'

type Props = {
  params: { slug: string; lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const t = await getTranslator(params.lang)

  return {
    title: t('projects.page_title'),
  }
}

export default async function PageRoute({ params }: Props) {
  const projects = await directusApi.request(
    readItems('projects', {
      filter: {
        status: { _eq: 'published' },
      },
      fields: ['*'],
    })
  )

  const globals = await fetchGlobals(params.lang)

  const globalData = globals.translations[0]

  const t = await getTranslator(params.lang, 'projects')

  return (
    <PageContainer>
      <header className='border-b-2 border-base-300 pb-6 '>
        <TypographyTitle>
          {globalData.project_setting.title || 'Nextus Projects'}
        </TypographyTitle>
        {globalData.project_setting.headline && (
          <TypographyHeadline content={globalData.project_setting.headline} />
        )}
      </header>
      <section className='relative w-full items-center py-12'>
        <TypographyTitle>{t('latest')}</TypographyTitle>
        <div className='mt-4 grid gap-6 md:grid-cols-3'>
          {(projects as any).map((project: Projects, projectIdx: number) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className={[
                isEven(projectIdx)
                  ? 'rounded-br-3xl rounded-tl-3xl'
                  : 'rounded-bl-3xl rounded-tr-3xl',
                'relative mb-6 block w-full overflow-hidden border-2 border-transparent p-2 transition duration-300 hover:border-accent-focus',
              ].join(' ')}
            >
              <div
                className={[
                  isEven(projectIdx)
                    ? 'rounded-br-2xl rounded-tl-2xl'
                    : 'rounded-bl-2xl rounded-tr-2xl',
                  'group relative h-56 overflow-hidden',
                ].join(' ')}
              >
                <Image
                  src={getDirectusMedia(project.image) as any}
                  width={500}
                  height={500}
                  alt=''
                  className='object-cover transition duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100 '>
                  <div className='p-8'>
                    <TypographyTitle>{project.client}</TypographyTitle>
                    <TypographyHeadline className='text-primary'>
                      {project.title}
                    </TypographyHeadline>
                    <div className='mt-2 flex flex-auto'>
                      {project.built_with?.map((item, itemIdx) => (
                        <div className='mt-2' key={itemIdx}>
                          <div className='badge badge-neutral mb-2 mr-2 items-center  font-serif font-medium'>
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  )
}
