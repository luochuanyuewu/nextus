'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import VIcon from './base/VIcon'
import { useRouter,usePathname } from 'next/navigation'

export default function LocaleSwitcher() {
  const t = useTranslations('global.locale_switcher')
  const [isPending, startTransition] = useTransition()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const setLang = (langItem: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: langItem })
    })
  }

  return (
    <div title='Change Language' className='dropdown-end dropdown'>
      <div tabIndex={0} className='btn btn-ghost normal-case'>
        <span className='hidden font-normal md:inline'>{t('label')}</span>
        <VIcon className='h-6 w-6' icon='mdi:language'></VIcon>
      </div>
      <div className='dropdown-content rounded-box top-px z-50 mt-16 w-56 overflow-y-auto bg-base-200 text-base-content shadow'>
        <ul className='menu menu-sm gap-1' tabIndex={0}>
          {['zh', 'en'].map((cur) => (
            <li key={cur}>
              <button
                disabled={isPending}
                className={locale === cur ? 'active' : ''}
                onClick={() => setLang(cur)}
              >
                {t('locale', { locale: cur })}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
