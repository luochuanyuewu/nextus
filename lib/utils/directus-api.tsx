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
import { DirectusSchema, Navigation } from '@/lib/directus-collections'

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
  return await directusApi.request(
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
              {
                project_setting: ['*'],
                blog_setting: ['*'],
              },
            ],
          },
        ],
      }),
      60
    )
  )
}

const fetchNavigation = async function name(id: string) {
  const nav = (await directusApi.request(
    readItem('navigation', id, {
      fields: [
        {
          items: ['*', { page: ['slug'] }, { children: ['*'] }],
        },
      ],
    })
  )) as Navigation
  return nav
}

const fetchNavigationSafe = async function name(id: string) {
  return await directusApi.request(
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
  )
}

const fetchForm = async function (id: string, languages_code?: string) {
  const forms = await directusApi.request(
    readItems('forms', {
      fields: ['*'],
      filter: {
        key: {
          _eq: id,
        },
      },
      limit: 1,
    })
  )

  return forms[0]
}

export default directusApi

export { fetchGlobals, fetchNavigationSafe, fetchForm }
