import 'server-only'

import { fetchForm, fetchGlobals, fetchNavigationSafe } from './directus-api'

export { data as fetchGlobalData }
export type Data = Awaited<ReturnType<typeof data>>

const data = async ({ locale }: PageContextServer) => {
  const [globals, mainNav, footerNav, form] = await Promise.all([
    fetchGlobals(locale),
    fetchNavigationSafe('main', locale),
    fetchNavigationSafe('footer', locale),
    fetchForm('newsletter'),
  ])

  const {
    translations: { 0: globalDetails },
    ...remainingGlobals
  } = globals

  return {
    globalData: {
      ...remainingGlobals,
      ...globalDetails,
    },
    mainNavData: mainNav,
    footerNavData: footerNav,
    newsLetter: form,
  }
}
