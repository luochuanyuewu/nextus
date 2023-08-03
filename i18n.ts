import NextIntlMiddlewareConfig from 'next-intl/dist/middleware/NextIntlMiddlewareConfig'
import { getRequestConfig } from 'next-intl/server'

export const i18n: NextIntlMiddlewareConfig = {
  // A list of all locales that are supported
  locales: ['en', 'zh'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'zh',
}

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}.json`)).default,
}))
