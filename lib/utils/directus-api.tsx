import { getDirectusURL } from './api-helpers'
import {
  authentication,
  createDirectus,
  readItem,
  readItems,
  readSingleton,
  RequestTransformer,
  rest,
  RestCommand,
} from '@directus/sdk'
import { Forms, Globals, Navigation, Pages } from '@/lib/directus-collections'
import { DirectusSchema } from '@/lib/directus-schema'

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
        const defaultRevalidate = process.env.API_CACHE_DISABLED ? 0 : 10
        const shouldOverrideRevalidate = process.env.API_CACHE_DISABLED
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
          // @ts-ignore
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

const fetchNavigation = async function name(id: string) {
  const nav = await directusApi.request(
    readItem('navigation', id, {
      fields: [
        {
          items: ['*', { page: ['slug'] }, { children: ['*'] }],
        },
      ],
    })
  )
  return nav
}

const fetchNavigationSafe = async function name(id: string) {
  const nav = (await directusApi.request(
    withRevalidate(
      readItem('navigation', id, {
        fields: [
          '*',
          {
            items: ['*', { page: ['slug'] }, { children: ['*'] }],
          },
        ],
      }),
      60
    )
  )) as Navigation
  return nav
}

const fetchForm = async function (id: string, languages_code?: string) {
  const forms = (await directusApi.request(
    readItems('forms', {
      fields: ['*'],
      filter: {
        key: {
          _eq: id,
        },
      },
      limit: 1,
    })
  )) as Forms[]

  return forms[0]
}

async function fetchHelpArticles(slug: string) {
  const articles = await directusApi.request(
    readItems('help_articles', {
      filter: {
        slug: {
          _eq: slug,
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
  return articles
}

async function fetchPage(slug: string, lang: string) {
  const pages = await directusApi.request(
    readItems('pages', {
      filter: {
        slug: { _eq: slug },
      },
      deep: {
        // @ts-ignore
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
                    block_cardgroup: ['*', { posts: [{ posts_id: ['*'] }] }],
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
  fetchNavigation,
  fetchHelpArticles,
  fetchPage,
}
