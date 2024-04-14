import { getDirectusURL } from '@/lib/utils/directus-helpers'
import {
  authentication,
  createDirectus,
  readItems,
  readSingleton,
  RequestTransformer,
  rest,
  RestCommand,
} from '@directus/sdk'
import {
  Forms,
  Globals,
  HelpArticles,
  HelpCollections,
  Navigation,
  Pages,
  Posts,
} from '@/data/directus-collections'
import { DirectusSchema } from '@/data/directus-schema'

const withRequestCallback = function <Schema extends object, Output>(
  onRequest: RequestTransformer,
  getOptions: RestCommand<Output, Schema>
): RestCommand<Output, Schema> {
  return () => {
    const options = getOptions()
    options.onRequest = onRequest
    return options
  }
}

const withRevalidate = function <Schema extends object, Output>(
  getOptions: RestCommand<Output, Schema>,
  revalidate: number
): RestCommand<Output, Schema> {
  return () => {
    const options = getOptions()
    options.onRequest = (options: RequestInit) => {
      return { ...options, next: { revalidate: revalidate } }
    }
    return options
  }
}

const directusApi = createDirectus<DirectusSchema>(getDirectusURL())
  .with(
    rest({
      onRequest: (currentOptions: RequestInit) => {
        const defaultRevalidate =
          process.env.API_CACHE_DISABLED === 'true' ? 0 : 10
        const shouldOverrideRevalidate =
          process.env.API_CACHE_DISABLED === 'true'
            ? true
            : !currentOptions.next || !currentOptions.next.revalidate

        if (shouldOverrideRevalidate) {
          return {
            ...currentOptions,
            next: { revalidate: defaultRevalidate },
          }
        }
        return currentOptions
      },
    })
  )
  .with(authentication('json', { autoRefresh: false }))

directusApi.setToken(process.env.DIRECTUS_ADMIN_TOKEN || '')

const fetchGlobals = async function name(lang: string) {
  return (await directusApi.request(
    withRevalidate(
      readSingleton('globals', {
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: lang,
              },
            },
          },
        },
        fields: [
          '*',
          {
            translations: [
              '*',
              { project_setting: ['*'] },
              { blog_setting: ['*'] },
            ],
          },
        ],
      }),
      60
    )
  )) as Globals
}

const fetchNavigationSafe = async function name(slug: string, lang: string) {
  const navigations = await directusApi.request(
    withRevalidate(
      readItems('navigation', {
        limit: 1,
        filter: {
          language: {
            code: {
              _eq: lang,
            },
          },
          slug: {
            _eq: slug,
          },
        },
        fields: [
          '*',
          {
            items: [
              '*',
              { page: ['slug'] },
              { children: ['*', { page: ['slug'] }] },
            ],
            language: ['code'],
          },
          {},
        ],
      }),
      60
    )
  )
  //@ts-ignore
  return navigations[0] as Navigation
}

const fetchForm = async function (id: string, languages_code?: string) {
  const forms = (await directusApi.request(
    withRevalidate(
      readItems('forms', {
        fields: ['*'],
        filter: {
          key: {
            _eq: id,
          },
        },
        limit: 1,
      }),
      120
    )
  )) as Forms[]

  return forms[0]
}

async function fetchHelpCollections(lang: string) {
  const collections = await directusApi.request(
    readItems('help_collections', {
      filter: {},
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: lang,
            },
          },
        },
      },
      fields: ['cover', 'slug', { translations: ['title', 'description'] }],
    })
  )

  // @ts-ignore
  return collections as HelpCollections[]
}

async function fetchHelpCollection(slug: string, lang: string) {
  const collections = await directusApi.request(
    withRevalidate(
      readItems('help_collections', {
        filter: {
          _and: [
            {
              slug: {
                _eq: slug,
              },
            },
          ],
        },
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: lang,
              },
            },
          },
        },
        limit: 1,
        fields: ['slug', 'cover', { translations: ['title', 'description'] }],
      }),
      60
    )
  )

  if (collections.length === 0) return null

  return collections[0] as HelpCollections
}

export async function fetchHelpArticles(collectionSlug: string, lang: string) {
  const articles = await directusApi.request(
    withRevalidate(
      readItems('help_articles', {
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: lang,
              },
            },
          },
        },
        filter: {
          help_collection: {
            slug: {
              _eq: collectionSlug,
            },
          },
        },
        fields: ['id', 'slug', { translations: ['title', 'summary'] }],
      }),
      60
    )
  )

  if (articles.length === 0) return null

  return articles
}

async function fetchHelpArticle(
  collectionSlug: string,
  slug: string,
  lang: string
) {
  const articles = await directusApi.request(
    readItems('help_articles', {
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _eq: 'published',
        },
        translations: {
          _nnull: true,
        },
        help_collection: {
          slug: {
            _eq: collectionSlug,
          },
        },
      },
      deep: {
        help_collection: {
          _filter: {
            translations: {
              _nnull: true,
            },
          },
          translations: {
            _filter: {
              _and: [
                {
                  languages_code: {
                    _eq: lang,
                  },
                },
              ],
            },
            _limit: 1,
          },
        },
        translations: {
          _filter: {
            languages_code: {
              _eq: lang,
            },
          },
        },
      },
      limit: 1,
      fields: [
        '*',
        {
          help_collection: ['slug', 'id', { translations: ['title'] }],
        },
        { owner: ['first_name', 'last_name', 'avatar'] },
        { translations: ['content', 'languages_code', 'summary', 'title'] },
      ],
    })
  )
  // @ts-ignore
  return articles[0] as HelpArticles
}

async function fetchPost(slug: string, lang: string) {
  const posts = await directusApi.request(
    readItems('posts', {
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: lang,
            },
          },
        },
      },
      filter: { slug: { _eq: slug } },
      limit: 1,
      fields: [
        '*',
        { seo: ['*'] },
        { author: ['avatar', 'first_name', 'last_name'] },
        { category: ['title', 'slug', 'color'] },
        { translations: ['*'] },
      ],
    })
  )

  if (posts.length === 0) return null

  return posts[0] as Posts
}

async function fetchPage(slug: string, lang: string) {
  const pages = await directusApi.request(
    readItems('pages', {
      filter: {
        slug: { _eq: slug },
      },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: lang,
            },
          },
        },
      },
      fields: [
        '*',
        { seo: ['*'] },
        {
          translations: [
            '*',
            {
              blocks: [
                'collection',
                {
                  item: {
                    block_hero: ['*'],
                    block_faqs: ['*'],
                    block_features: ['*'],
                    block_quote: ['*'],
                    block_columns: ['*', { rows: ['*'] }],
                    block_form: ['*', { form: ['*'] }],
                    block_testimonials: [
                      '*',
                      { testimonials: ['*', { testimonial: ['*'] }] },
                    ],
                    block_logocloud: ['*', { logos: [{ file: ['*'] }] }],
                    block_team: ['*'],
                    block_cta: ['*'],
                    block_richtext: ['*'],
                    block_steps: ['*', { steps: ['*'] }],
                    block_gallery: [
                      '*',
                      { gallery_items: ['*', { directus_files_id: ['*'] }] },
                    ],
                    block_cardgroup: [
                      '*',
                      { posts: [{ posts_id: ['*', { translations: ['*'] }] }] },
                    ],
                    block_html: ['*'],
                    block_video: ['*'],
                  },
                },
              ],
            },
          ],
        },
      ],
      limit: 1,
    })
  )

  // @ts-ignore
  return pages[0] as Pages
}

export default directusApi

export {
  fetchGlobals,
  fetchNavigationSafe,
  fetchForm,
  fetchHelpArticle,
  fetchHelpCollection,
  fetchHelpCollections,
  fetchPage,
  fetchPost,
}
