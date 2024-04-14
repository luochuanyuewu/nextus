'use client'
import { useTranslation } from 'react-i18next'
import i18nConfig from '@/i18n/i18nConfig'
import VIcon from '@/components/base/VIcon'
import { usePathname, useRouter } from '@/lib/navigation'
import { useTransition } from 'react'

export default function LocaleSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLocale = i18n.language
  const locale = i18n.language

  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const currentPathname = usePathname()

  const setLang = (langItem: string) => {
    const newLocale = langItem

    // Set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`

    startTransition(() => {
      // Redirect to the new locale path
      if (
        currentLocale === i18nConfig.defaultLocale &&
        !i18nConfig.prefixDefault
      ) {
        router.push('/' + newLocale + currentPathname)
      } else {
        router.push(
          currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
        )
      }

      router.refresh()
    })
  }

  const localeMapping = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
  ]

  return (
    <div title='Change Language' className='dropdown dropdown-end'>
      <div tabIndex={0} className='btn btn-ghost normal-case'>
        <span className='hidden font-normal md:inline'>
          {t('global.locale_switcher.label')}
        </span>
        <VIcon className='h-6 w-6' icon='mdi:language' />
      </div>
      <div className='dropdown-content top-px z-50 mt-16 w-56 overflow-y-auto rounded-box bg-base-200 text-base-content shadow'>
        <ul className='menu menu-sm gap-1' tabIndex={0}>
          {i18nConfig.locales.map((cur: string) => {
            const language = localeMapping.find((item) => item.code === cur)
            if (!language) {
              return null
            }
            return (
              <li key={cur}>
                <button
                  disabled={isPending}
                  className={locale === cur ? 'active' : ''}
                  onClick={() => setLang(cur)}
                >
                  {language.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
