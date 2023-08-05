import { fetchGlobals } from '@/lib/utils/directus-api'
import { UmamiScript } from './UmamiAnalytics'
import { GAScript } from './GoogleAnalytics'

let isProduction = process.env.NODE_ENV === 'production'

export async function Analytics({ lang }: { lang: string }) {
  const globals = await fetchGlobals(lang)

  if (isProduction) {
    return (
      <>
        {/* {globals.baidu_analytics_id && <BaiduAnalyticsScript />} */}
        {globals.umami_analytics_id && (
          <UmamiScript
            id={globals.umami_analytics_id}
            src={globals.umami_script_url}
          />
        )}
        {globals.google_analytics_id && (
          <GAScript id={globals.google_analytics_id} />
        )}
      </>
    )
  }
  return null
}
