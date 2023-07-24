import directusApi from '@/lib/utils/directus-api'
import { readItem, readSingleton } from '@directus/sdk'
import { Globals, NavigationItems } from '@/lib/directus-collections'
import MenuItem from '@/components/navigation/MenuItem'
import VButton from '@/components/base/VButton'
import Link from 'next/link'
import LogoV2 from '@/components/LogoV2'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export default async function TheHeader() {
  const results = await directusApi.request(
    readItem('navigation', 'main', {
      fields: [
        {
          items: ['*', { page: ['slug'] }, { children: ['*'] }],
        },
      ],
    })
  )

  const { items } = results as any

  const global = (await directusApi.request(
    readSingleton('globals')
  )) as Globals

  return (
    <div className='pt-1'>
      <header className='relative w-full space-y-4 md:flex md:items-center md:space-x-6 md:space-y-0'>
        <div className='flex items-center rounded-br-xl rounded-tl-xl  md:flex-1 md:justify-between'>
          <Link href='/' className='px-4 py-4'>
            <LogoV2 className='h-6 ' />
            <span className='sr-only'>{global.title}</span>
          </Link>
          <nav
            className='hidden font-mono md:flex md:space-x-4 lg:space-x-6'
            aria-label='Global'
          >
            {items.map((item: NavigationItems) => (
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
