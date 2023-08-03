import { fetchGlobals, fetchNavigationSafe } from '@/lib/utils/directus-api'
import { GlobalsTranslations } from '@/lib/directus-collections'
import Navbar from './Navbar'

export default async function TheHeader({ lang }: { lang: string }) {
  const [globals, navigation] = await Promise.all([
    fetchGlobals(lang),
    fetchNavigationSafe('main', lang),
  ])

  const globalData =
    globals.translations && (globals.translations[0] as GlobalsTranslations)

  return (
    <>
      <Navbar globalData={globalData} navigation={navigation}></Navbar>
    </>
  )
}
