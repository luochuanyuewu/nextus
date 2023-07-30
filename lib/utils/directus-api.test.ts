import { createDirectus, rest, authentication, readItems } from '@directus/sdk'
import { getDirectusURL } from './api-helpers'

export interface Seo {
  canonical_url: string
  id: string
  meta_description: string
  no_follow: boolean
  no_index: boolean
  sitemap_change_frequency: string
  sitemap_priority: number
  title: string
}

export interface Categories {
  color: string
  content: string
  id: string
  seo: Seo
  slug: string
  sort: number
  title: string
}

export interface Posts {
  category: Categories
  content: string
  date_created: string
  date_published: string
  date_updated: string
  id: string
  seo: Seo
  slug: string
  sort: number
  status: string
  summary: string
  title: string
  user_created: string
  user_updated: string
}

interface Schema {
  posts: Posts[]
  seo: Seo[]
  categories: Categories[]
}

const directusApi = createDirectus<Schema>(getDirectusURL()).with(rest())

async function Example(slug: string) {
  const posts = await directusApi.request(
    readItems('posts', {
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: [
        '*',
        { seo: ['*'] },
        { category: ['title', 'slug', 'color', 'content'] },
      ],
    })
  )
  if (posts.length === 0) return null

  return posts[0]
}
