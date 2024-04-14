import { i18nRouter } from 'next-i18n-router'
import i18nConfig from './i18n/i18nConfig'

import { NextRequest } from 'next/server'

// const intlMiddleware = createMiddleware({
//   // A list of all locales that are supported
//   locales: locales,
//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: process.env.NEXT_PUBLIC_LOCALE_DEFAULT || 'en',
//   localePrefix: 'as-needed',
//   localeDetection: false,
// })

export function middleware(request: NextRequest) {
  return i18nRouter(request, { ...i18nConfig })
}

// applies this middleware only to files in the app directory

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|static|_vercel|.*\\..*).*)'],
}
