import createMiddleware from 'next-intl/middleware'
import { locales } from './lib/navigation'

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: process.env.NEXT_PUBLIC_LOCALE_DEFAULT || 'en',
  localePrefix: 'as-needed',
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
