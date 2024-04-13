import { readItems } from '@directus/sdk'
import directusApi from './directus-api'

export { fetchCategorizedPostsData }

export type CategorizedPostsData = Awaited<
  ReturnType<typeof fetchCategorizedPostsData>
>

const fetchCategorizedPostsData = async ({
  locale,
  slug,
}: PageContextServer) => {
  const posts = await directusApi.request(
    readItems('posts', {
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _starts_with: locale,
            },
          },
        },
      },
      filter: {
        category: {
          slug: {
            _eq: slug,
          },
        },
      },
      sort: ['date_published'],

      fields: [
        '*',
        { author: ['*'] },
        { category: ['title', 'slug', 'color'] },
        { translations: ['content', 'summary', 'title'] },
      ],
    })
  )

  // @ts-ignore
  return posts as Array<Posts>
}

async function getPostsByCategory(categorySlug: string, lang: string) {}
