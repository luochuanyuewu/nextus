import Link from 'next-intl/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GlobalsTranslations, Navigation } from '@/lib/directus-collections'
import VIcon from '@/components/base/VIcon'
import NavigationItems from './NavigationItems'
import { getTranslator } from 'next-intl/server'
import LocaleSwitcher from '../LocaleSwitcher'

interface NavLink {
  id: number
  href: string
  new_tab: boolean
  text: string
}

function NavLink({ href, text }: NavLink) {
  const path = usePathname()
  let className = clsx('', path === href ? 'btn-activate' : '')
  return (
    <li>
      <Link key={text} href={href}>
        <span className={className}>{text}</span>
      </Link>
    </li>
  )
}

export default async function Navbar({
  buttons,
  globalData,
  navigation,
  lang,
}: {
  buttons?: Array<NavLink>
  logoUrl?: string | null
  logoText?: string | null
  globalData: GlobalsTranslations
  navigation: Navigation
  lang: string
}) {
  const t = await getTranslator(lang, 'global')

  return (
    <header>
      <div className='navbar mx-auto max-w-7xl bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <VIcon
                className='h-6 w-6'
                icon='fluent:navigation-16-filled'
              ></VIcon>
            </label>
            <NavigationItems
              tabIndex={0}
              className='menu dropdown-content rounded-box menu-sm z-50 mt-3 w-52 bg-base-100 p-2 shadow'
              mobile
              items={navigation.items}
            />
          </div>
          <Link href='/' className='btn btn-ghost text-xl normal-case'>
            {globalData.title}
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <NavigationItems
            className='menu menu-horizontal px-1'
            items={navigation.items}
          />
        </div>

        <div className='navbar-end'>
          <ThemeSwitcher title={t('theme')} />
          <LocaleSwitcher></LocaleSwitcher>
          {buttons && (
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-circle btn-ghost'>
                <VIcon icon='mdi:account-outline'></VIcon>
              </label>
              <ul
                tabIndex={0}
                className='menu-compact menu dropdown-content rounded-box z-50 mt-3 w-52 bg-base-100 p-2 shadow'
              >
                {buttons.map((item: NavLink, index: number) => (
                  <NavLink key={index} {...item} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
