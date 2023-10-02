import createMiddleware from 'next-intl/middleware'

//TODO maybe an env?
export const locales = ['en', 'zh']

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: process.env.NEXT_PUBLIC_LOCALE_DEFAULT || 'en',
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
