import createMiddleware from 'next-intl/middleware'
import { locales } from './lib/navigation'
import { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: process.env.NEXT_PUBLIC_LOCALE_DEFAULT || 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(request.nextUrl.pathname)
  if (!shouldHandle) return

  return intlMiddleware(request)
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
