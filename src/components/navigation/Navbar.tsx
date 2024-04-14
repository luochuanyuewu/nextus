import { Link, usePathname } from '@/lib/navigation'
import clsx from 'clsx'
import { ThemeSwitcher } from '@/components/global/ThemeSwitcher'
import { GlobalsTranslations, Navigation } from '@/data/directus-collections'
import VIcon from '@/components/base/VIcon'
import NavigationItems from '@/components/navigation/NavigationItems'
import { getTranslations } from '@/i18n/i18n'
import LocaleSwitcher from '@/components/global/LocaleSwitcher'
import { ComponentProps } from 'react'

type NavLinkProps = {
  id: number
  href: string
  new_tab: boolean
  text: string
}

function NavLink({ href, text }: NavLinkProps) {
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

type NavBarProps = {
  buttons?: Array<NavLinkProps>
  logoUrl?: string | null
  logoText?: string | null
  title: string
  navigation: Navigation
  locale: string
}

export default async function Navbar({
  buttons,
  title,
  navigation,
  locale: lang,
}: NavBarProps) {
  const { t } = await getTranslations({ locale: lang })

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
            {navigation.items && navigation.items.length > 0 && (
              <NavigationItems
                tabIndex={0}
                className='menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
                mobile
                items={navigation.items}
              />
            )}
          </div>
          <Link href='/' className='btn btn-ghost text-xl normal-case'>
            {title}
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <NavigationItems
            className='menu menu-horizontal px-1'
            items={navigation.items}
          />
        </div>

        <div className='navbar-end'>
          <ThemeSwitcher title={t('global.theme')} />
          <LocaleSwitcher></LocaleSwitcher>
          {buttons && (
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-circle btn-ghost'>
                <VIcon icon='mdi:account-outline'></VIcon>
              </label>
              <ul
                tabIndex={0}
                className='menu-compact menu dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
              >
                {buttons.map((item: NavLinkProps, index: number) => (
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
