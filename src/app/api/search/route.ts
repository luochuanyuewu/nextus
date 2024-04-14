import directusApi from '@/data/directus-api'
import { NextRequest, NextResponse } from 'next/server'
import { getQuery } from 'ufo'
import { readItems } from '@directus/sdk'
/**
 * @todo fix translation fields.
 * */
function mapEntity({
  entity,
  type,
  urlPattern,
  description = '',
  image = '',
}: {
  entity: any
  type: string
  urlPattern: string
  description?: string
  image?: string
}) {
  return {
    type,
    title: entity.title,
    description,
    image,
    url: urlPattern.replace(':slug', entity.slug),
  }
}

function mapResults(collection: string, results: any[]) {
  const mapping = {
    posts: (post: any) =>
      mapEntity({
        entity: post,
        type: 'post',
        urlPattern: '/posts/:slug',
        description: post.summary,
        image: post.image,
      }),
    projects: (project: any) =>
      mapEntity({
        entity: project,
        type: 'project',
        urlPattern: '/projects/:slug',
        description: project.summary,
        image: project.image,
      }),
    pages: (page: any) =>
      mapEntity({
        entity: page,
        type: 'page',
        urlPattern: '/:slug',
      }),
    categories: (category: any) =>
      mapEntity({
        entity: category,
        type: 'category',
        urlPattern: '/posts/categories/:slug',
      }),
    help_articles: (article: any) =>
      mapEntity({
        entity: article,
        type: 'article',
        urlPattern: '/help/articles/:slug',
        description: '',
        image: '',
      }),
  }

  // @ts-ignore
  return results.map(mapping[collection])
}

type CollectionType =
  | 'posts'
  | 'pages'
  | 'categories'
  | 'projects'
  | 'help_articles'

function validCollections(collections: any): CollectionType[] {
  if (typeof collections === 'string') {
    collections = [collections]
  }

  if (
    !collections ||
    (collections as Array<any>).every(
      (collection: string) =>
        !['posts', 'projects', 'pages', 'categories', 'help_articles'].includes(
          collection
        )
    )
  ) {
    throw new Error('Invalid or missing collections param')
  }

  return collections as CollectionType[]
}

export async function GET(req: NextRequest, ctx: { params: any }) {
  const query = getQuery(req.url)

  let { collections, search, raw } = query

  const newCollections = validCollections(collections)

  const results = await Promise.all(
    newCollections.map(async (collection) => {
      const res = await directusApi.request(
        readItems(collection, { search: search ? search.toString() : '' })
      )

      if (raw) {
        return res
      } else {
        return mapResults(collection, res)
      }
    })
  )

  return NextResponse.json(results.flat())
}
