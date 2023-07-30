import { fetchGlobals, fetchNavigationSafe } from '@/lib/utils/directus-api'
import {
  GlobalsTranslations,
  NavigationItems,
} from '@/lib/directus-collections'
import MenuItem from '@/components/navigation/MenuItem'
import Link from 'next/link'
import LogoV2 from '@/components/LogoV2'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default async function TheHeader({ lang }: { lang: string }) {
  const [globals, navigation] = await Promise.all([
    fetchGlobals(lang),
    fetchNavigationSafe('main'),
  ])

  const globalData =
    globals.translations && (globals.translations[0] as GlobalsTranslations)
  const navigationItems = navigation.items as NavigationItems[]

  return (
    <div className='pt-1'>
      <header className='relative w-full space-y-4 md:flex md:items-center md:space-x-6 md:space-y-0'>
        <div className='flex items-center rounded-br-xl rounded-tl-xl  md:flex-1 md:justify-between'>
          <Link
            href='/'
            className='inline-flex items-center rounded-lg px-3 py-2 font-bold uppercase  transition duration-150 hover:bg-base-300'
          >
            {/* <LogoV2 className='h-6 ' /> */}
            {globalData.title}
            <span className='sr-only'>{globalData?.title}</span>
          </Link>
          <nav
            className='hidden font-mono md:flex md:space-x-4 lg:space-x-6'
            aria-label='Global'
          >
            {navigationItems &&
              navigationItems.map((item: NavigationItems) => (
                <MenuItem key={item.id} item={item} />
              ))}
          </nav>
          <div className='flex flex-shrink-0 items-center justify-end space-x-2 p-3'>
            {/*<DarkModeToggle className='hidden text-gray-200 hover:text-gray-400 md:block' />*/}
            <ThemeSwitcher></ThemeSwitcher>
          </div>
        </div>
      </header>
    </div>
  )
}
