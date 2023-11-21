import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['zh', 'en']

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales })
