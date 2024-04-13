import { readItems } from '@directus/sdk'
import directusApi from './directus-api'

export { fetchProjectsData, fetchProjectData }
export type Data = Awaited<ReturnType<typeof fetchProjectsData>>

const fetchProjectsData = async ({ locale }: PageContextServer) => {
  const projects = await directusApi.request(
    readItems('projects', {
      filter: {
        status: { _eq: 'published' },
      },
      fields: ['*'],
    })
  )
  return projects
}

const fetchProjectData = async ({ locale, slug }: PageContextServer) => {
  const projects = await directusApi.request(
    readItems('projects', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: ['*', { gallery: [{ directus_files_id: ['*'] }] }],
    })
  )

  return projects[0]
}
