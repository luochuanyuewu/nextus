'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GlobalsTranslations, Navigation } from '@/lib/directus-collections'
import NavigationItem from './NavigationItem'
import VIcon from '../base/VIcon'

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
      <Link
        key={text}
        href={href}
        // data-umami-event={`nav-${link.href.replace('/', '')}`}
      >
        <span className={className}>{text}</span>
      </Link>
    </li>
  )
}

export default function Navbar({
  links,
  buttons,
  logoUrl,
  logoText,
  globalData,
  navigation,
}: {
  links?: Array<NavLink>
  buttons?: Array<NavLink>
  logoUrl?: string | null
  logoText?: string | null
  globalData: GlobalsTranslations
  navigation: Navigation
}) {
  // https://reacthustle.com/blog/how-to-close-daisyui-dropdown-with-one-click
  const handleClick = () => {
    const elem = document.activeElement
    if (elem) {
      // @ts-ignore
      elem?.blur()
    }
  }

  return (
    <header>
      <div className='navbar mx-auto max-w-7xl bg-base-100'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#000000'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='3' y1='12' x2='21' y2='12'></line>
                <line x1='3' y1='6' x2='21' y2='6'></line>
                <line x1='3' y1='18' x2='21' y2='18'></line>
              </svg>
            </label>
            <ul
              tabIndex={0}
              onClick={handleClick}
              className='menu-compact menu dropdown-content rounded-box z-10 mt-3 w-52 bg-base-100 p-2 shadow'
            >
              {navigation.items.map((item, index: number) => (
                <li key={index}>
                  <Link
                    href='/'
                    // data-umami-event={`nav-${link.href.replace('/', '')}`}
                  >
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href='/' className='btn btn-ghost text-xl normal-case'>
            {globalData.title}
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            {navigation.items.map((item, index) => (
              <NavigationItem key={index} item={item}></NavigationItem>
            ))}
          </ul>
        </div>

        <div className='navbar-end'>
          <ThemeSwitcher />

          {buttons && (
            <div className='dropdown dropdown-end'>
              <label tabIndex={0} className='btn btn-circle btn-ghost'>
                <VIcon icon='mdi:account-outline'></VIcon>
              </label>
              <ul
                tabIndex={0}
                onClick={handleClick}
                className='menu-compact menu dropdown-content rounded-box z-10 mt-3 w-52 bg-base-100 p-2 shadow'
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