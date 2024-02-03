import { fetchGlobals, fetchNavigationSafe } from '@/lib/utils/directus-api'
import { GlobalsTranslations } from '@/lib/directus-collections'
import Navbar from './Navbar'

export default async function TheHeader({ lang }: { lang: string }) {
  const [globals, navigation] = await Promise.all([
    fetchGlobals(lang),
    fetchNavigationSafe('main', lang),
  ])

  if (!globals || !globals.translations || !globals.translations[0])
    return <div>Please setup valia global data in backend.</div>

  const globalData =
    globals.translations && (globals.translations[0] as GlobalsTranslations)

  if (!navigation)
    return <div>Please setup navigation with main slug in backend. </div>

  return (
    <>
      <Navbar
        lang={lang}
        globalData={globalData}
        navigation={navigation}
      ></Navbar>
    </>
  )
}
