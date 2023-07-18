import directusApi from '@/app/[lang]/utils/directus-api'
import { readItems } from '@directus/sdk'
import { Project } from '@/types/schemas'
import { getDirectusMedia } from '@/app/[lang]/utils/api-helpers'
import TypographyHeadline from '@/app/[lang]/components/typography/TypographyHeadline'
import PageContainer from '@/app/[lang]/components/PageContainer'
import TypographyProse from '@/app/[lang]/components/typography/TypographyProse'
import GalleryBlock from '@/app/[lang]/components/blocks/GalleryBlock'
import TypographyTitle from '@/app/[lang]/components/typography/TypographyTitle'

export default async function PageRoute({ params }: { params: any }) {
  const projects = await directusApi.request(
    readItems('projects', {
      filter: { slug: { _eq: params.slug } },
      limit: 1,
      // @ts-ignore
      fields: ['*', 'gallery.directus_files_id.*'],
    })
  )

  if (projects.length === 0) return null

  const project = projects[0] as Project

  return (
    <div className='py-12'>
      <div className='relative flex h-[400px] items-center justify-center overflow-hidden rounded-bl-[48px] rounded-tr-[48px]'>
        <img
          className='absolute inset-0 h-full w-full object-cover'
          src={getDirectusMedia(project.image) || ''}
        />
        <div className='absolute inset-0 bg-gray-900 opacity-75' />
        <div className='relative mx-auto max-w-3xl overflow-hidden rounded-bl-3xl rounded-tr-3xl bg-gray-900 bg-opacity-50 p-8'>
          <TypographyHeadline
            content={project.title}
            className='text-white'
            size='xl'
          />
          <p className='font-display mt-4 font-mono font-semibold text-gray-300 md:text-lg'>
            {project.summary}
          </p>
        </div>
      </div>
      <main className='relative'>
        <PageContainer className='mx-auto max-w-6xl md:flex'>
          <main className='p-4'>
            <article className='w-full'>
              {/* Main */}
              <TypographyProse content={project.content} />
            </article>

            {project.gallery && project.gallery.length > 0 && (
              <GalleryBlock
                className='mt-8 overflow-hidden rounded-bl-3xl rounded-tr-3xl bg-white dark:bg-gray-800'
                data={{
                  id: project.id,
                  title: 'Gallery',
                  gallery_items: project.gallery,
                }}
              />
            )}
          </main>
          <aside className=''>
            <div className='flex-shrink-0 space-y-8 rounded-bl-2xl rounded-tr-2xl border-2 p-4 dark:border-gray-700 md:w-[300px]'>
              <div>
                <TypographyTitle>Client</TypographyTitle>
                <p className='font-mono font-bold dark:text-white'>
                  {project.client}
                </p>
              </div>
              <div>
                <TypographyTitle>Built With</TypographyTitle>
                {project.built_with &&
                  project.built_with.map((item, itemIdx) => (
                    <div className='mt-2' key={itemIdx}>
                      {/*<VBadge size="lg" color="#0f172a">*/}
                      {/*    {item}*/}
                      {/*</VBadge>*/}
                    </div>
                  ))}
              </div>
              <div>
                <TypographyTitle>Cost</TypographyTitle>
                <p className='font-mono font-bold dark:text-white'>
                  {project.cost}
                </p>
              </div>
            </div>
          </aside>
        </PageContainer>
      </main>
    </div>
  )
}
