import directusApi from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import PageContainer from '@/components/PageContainer'
import TypographyTitle from '@/components/typography/TypographyTitle'
import TypographyHeadline from '@/components/typography/TypographyHeadline'
import { Project } from '@/lib/schemas'
import Link from 'next/link'
import { isEven } from '@/lib/utils/math'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import VBadge from '@/components/base/VBadge'
import Image from 'next/image'

type Props = {
  params: { slug: string; lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PageRoute({ params }: Props) {
  const projects = await directusApi.request(
    readItems('projects', {
      filter: {
        // status: { _eq: 'published' },
      },
      fields: [],
    })
  )

  return (
    <PageContainer>
      <header className='border-b-2 border-gray-300 pb-6 dark:border-gray-700'>
        <TypographyTitle>Agency Projects</TypographyTitle>
        <TypographyHeadline content='<p>We kill it for you <em>(our clients)</em>.</p>' />
      </header>
      <section className='relative w-full items-center py-12'>
        <TypographyTitle>Latest Projects</TypographyTitle>
        <div className='mt-4 grid gap-6 md:grid-cols-3'>
          {(projects as any).map((project: Project, projectIdx: number) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className={[
                isEven(projectIdx)
                  ? 'rounded-br-3xl rounded-tl-3xl'
                  : 'rounded-bl-3xl rounded-tr-3xl',
                'relative mb-6 block w-full overflow-hidden border-2 border-transparent p-2 transition duration-300 hover:border-gray-300 dark:hover:border-gray-600',
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
                <div className='absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100 dark:bg-gray-900 dark:bg-opacity-75'>
                  <div className='p-8'>
                    <TypographyTitle>{project.client}</TypographyTitle>
                    <TypographyHeadline content={project.title} />
                    <div className='mt-2'>
                      {project.built_with?.map((item, itemIdx) => (
                        <VBadge
                          key={itemIdx}
                          className='mb-2 mr-2'
                          size='lg'
                          color='#0f172a'
                        ></VBadge>
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
