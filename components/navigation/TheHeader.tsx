import { fetchGlobals, fetchNavigationSafe } from '@/lib/utils/directus-api'
import { GlobalsTranslations } from '@/lib/directus-collections'
import Navbar from './Navbar'

export default async function TheHeader({ lang }: { lang: string }) {
  const [globals, navigation] = await Promise.all([
    fetchGlobals(lang),
    fetchNavigationSafe('main', lang),
  ])

  if (!globals || !globals.translations || !globals.translations[0])
    return <p>Please setup valia global data in backend.</p>

  const globalData =
    globals.translations && (globals.translations[0] as GlobalsTranslations)

  if (!navigation)
    return <p>Please setup navigation with main slug in backend. </p>

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
