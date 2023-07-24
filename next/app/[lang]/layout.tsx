import type { Metadata } from 'next'

import './globals.css'
import { i18n } from '@/i18n-config'
import directusApi from '@/lib/utils/directus-api'
import { readSingleton } from '@directus/sdk'
import { Globals } from '@/lib/directus-collections'
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
  const global = (await directusApi.request(
    readSingleton('globals')
  )) as Globals

  // const { url } = favicon.data.attributes;
  // const url = new URL(favicon, `${getDirectusURL()}/assets/`)
  return {
    title: {
      template: `%s | ${global.title}`,
      default: global.title || FALLBACK_SEO.title,
    },
    description: global.description,
    openGraph: { images: getDirectusMedia(global.og_image || '') },
    icons: {
      // icon: [url],
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
          <TheHeader />
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
