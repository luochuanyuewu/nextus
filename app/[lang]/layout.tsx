import type { Metadata } from 'next'

import './globals.css'
import { fetchGlobals } from '@/lib/utils/directus-api'
import { getDirectusMedia } from '@/lib/utils/api-helpers'
import TheHeader from '@/components/navigation/TheHeader'
import TheFooter from '@/components/navigation/TheFooter'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { Analytics } from '@/components/analytics'

const FALLBACK_SEO = {
  title: 'Directus Starter Next',
  description: 'Directus Starter Next',
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const globals = await fetchGlobals(params.lang)

  if (!globals.translations || globals.translations.length <= 0)
    return FALLBACK_SEO

  const data = globals.translations[0]
  const url = getDirectusMedia(data.favicon)
  return {
    title: {
      template: `%s | ${data.title}`,
      default: data.title,
    },
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
  return (
    <html lang={params.lang}>
      <head></head>
      <body>
        <main className='flex min-h-screen flex-col overflow-hidden bg-base-100 antialiased transition duration-150'>
          {/* <div
            id='mouseLight'
            className='mouse-gradient absolute top-0 h-[200px] w-[200px] rounded-full transition-opacity'
            // style="opacity: 0"
          /> */}
          <TheHeader lang={params.lang} />
          <div className=''>{children}</div>
          <TheFooter />
        </main>

        {/* {notificationBanner && <Banner data={notificationBanner} />} */}

        <ScrollToTopButton></ScrollToTopButton>
        <Analytics />
      </body>
    </html>
  )
}

// export async function generateStaticParams() {
//   return i18n.locales.map((locale) => ({ lang: locale }))
// }
