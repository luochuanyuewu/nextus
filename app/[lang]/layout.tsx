import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import './globals.css'
import { fetchGlobals } from '@/lib/utils/directus-api'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import TheHeader from '@/components/navigation/TheHeader'
import TheFooter from '@/components/navigation/TheFooter'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { Analytics } from '@/components/analytics'
import { GlobalsTranslations } from '@/lib/directus-collections'
import { NextIntlClientProvider } from 'next-intl'

const FALLBACK_SEO = {
  title: 'Nextus',
  description: 'Nextus is awesome!',
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const globals = await fetchGlobals(params.lang)
  if (!globals.translations || globals.translations.length <= 0)
    return FALLBACK_SEO
  const data = globals.translations[0] as GlobalsTranslations
  const url = getDirectusMedia(globals.favicon)
  return {
    title: {
      template: `%s | ${data?.title ?? 'Nextus'}`,
      default: data.title || 'Nextus',
    },
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    ),
    description: data.description,
    openGraph: { images: getDirectusMedia(data.og_image || '') },
    icons: {
      icon: [url],
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${params.lang}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={params.lang}>
      <head></head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <main className='min-h-screen overflow-hidden bg-base-100 antialiased'>
            <TheHeader lang={params.lang} />
            {children}
            <TheFooter lang={params.lang} />
          </main>
          <ScrollToTopButton></ScrollToTopButton>
          <Analytics lang={params.lang} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
