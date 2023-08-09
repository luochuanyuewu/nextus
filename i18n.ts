import { getRequestConfig } from 'next-intl/server'

//TODO maybe an env?
export const locales = ['en', 'zh']

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}.json`)).default,
}))
