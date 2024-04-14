import { notFound } from 'next/navigation'

import './globals.css'
import TheHeader from '@/components/navigation/TheHeader'
import TheFooter from '@/components/navigation/TheFooter'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { Analytics } from '@/components/analytics'
import { initTranslations } from '@/i18n/i18n'
import TranslationsProvider from '@/components/global/TranslationsProvider'
import { Metadata } from 'next'
import { fetchGlobalData } from '@/data/fetch-globals'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'

const FALLBACK_SEO = {
  title: 'Nextus',
  description: 'Nextus is awesome!',
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  try {
    const { globalData } = await fetchGlobalData({ locale: params.lang })

    const url = getDirectusMedia(globalData.favicon)
    return {
      title: {
        template: `%s | ${globalData.tagline ?? 'Nextus'}`,
        default: globalData.title || 'Nextus',
      },
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
      ),
      description: globalData.description,
      openGraph: { images: getDirectusMedia(globalData.og_image || '') },
      icons: url || null,
    }
  } catch (error) {
    return FALLBACK_SEO
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { resources } = await initTranslations(params.lang)

  return (
    <html lang={params.lang}>
      <head></head>
      <body>
        <TranslationsProvider locale={params.lang} resources={resources}>
          <main className='min-h-screen overflow-hidden bg-base-100 antialiased'>
            <TheHeader lang={params.lang} />
            {children}
            <TheFooter lang={params.lang} />
          </main>
          <ScrollToTopButton></ScrollToTopButton>
          <Analytics lang={params.lang} />
        </TranslationsProvider>
      </body>
    </html>
  )
}
