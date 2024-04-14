import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import PageContainer from '@/components/PageContainer'
import TypographyProse from '@/components/typography/TypographyProse'
import GalleryBlock from '@/components/blocks/GalleryBlock'
import TypographyTitle from '@/components/typography/TypographyTitle'
import Image from 'next/image'
import { getTranslations } from '@/i18n/i18n'
import { fetchProjectData } from '@/data/fetch-projects'

export default async function PageRoute({ params }: { params: any }) {
  const project = await fetchProjectData({
    locale: params.lang,
    slug: params.slug,
  })

  const { t } = await getTranslations({ locale: params.lang })

  return (
    <div className='py-12'>
      <div className='relative flex h-[400px] items-center justify-center overflow-hidden rounded-bl-[48px] rounded-tr-[48px]'>
        <Image
          width={2000}
          height={2000}
          alt=''
          className='absolute inset-0 h-full w-full object-cover'
          src={getDirectusMedia(project.image) || ''}
        />
        <div className='absolute inset-0 bg-base-300 opacity-50' />
        <div className='relative mx-auto max-w-4xl overflow-hidden rounded-bl-3xl rounded-tr-3xl bg-base-100 bg-opacity-50 p-8'>
          <TypographyHeadline content={project.title} size='xl' />
          <p className='mt-4 font-mono md:text-lg'>{project.summary}</p>
        </div>
      </div>
      <main className='relative'>
        <PageContainer>
          <main className='p-4'>
            <article className='mx-auto w-full max-w-4xl'>
              <TypographyProse content={project.content} />
            </article>

            {project.gallery && project.gallery.length > 0 && (
              <GalleryBlock
                className='mt-8 overflow-hidden rounded-bl-3xl rounded-tr-3xl '
                data={{
                  id: project.id,
                  title: t('projects.gallery'),
                  gallery_items: project.gallery as any,
                }}
              />
            )}
          </main>
          <aside className=''>
            <div className='flex-shrink-0 space-y-8 rounded-bl-2xl rounded-tr-2xl border-2 border-accent p-4 md:w-[300px]'>
              {project.client && (
                <div>
                  <TypographyTitle>{t('projects.client')}</TypographyTitle>
                  <p className='font-mono font-bold '>{project.client}</p>
                </div>
              )}

              {project.built_with && (
                <div>
                  <TypographyTitle>{t('projects.build_with')}</TypographyTitle>
                  {project.built_with.map((item, itemIdx) => (
                    <div className='mt-2' key={itemIdx}>
                      <div className='badge badge-neutral'>{item}</div>
                    </div>
                  ))}
                </div>
              )}

              {project.cost && (
                <div>
                  <TypographyTitle>{t('projects.cost')}</TypographyTitle>
                  <p className='font-mono font-bold '>{project.cost}</p>
                </div>
              )}
            </div>
          </aside>
        </PageContainer>
      </main>
    </div>
  )
}
