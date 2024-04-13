import { UmamiScript } from './UmamiAnalytics'
import { GAScript } from './GoogleAnalytics'
import { fetchGlobalData } from '@/data/fetch-globals'

let isProduction = process.env.NODE_ENV === 'production'

export async function Analytics({ lang }: { lang: string }) {
  const { globalData } = await fetchGlobalData({ locale: lang })

  if (isProduction) {
    return (
      <>
        {/* {globals.baidu_analytics_id && <BaiduAnalyticsScript />} */}
        {globalData.umami_analytics_id && (
          <UmamiScript
            id={globalData.umami_analytics_id}
            src={globalData.umami_script_url}
          />
        )}
        {globalData.google_analytics_id && (
          <GAScript id={globalData.google_analytics_id} />
        )}
      </>
    )
  }
  return null
}
