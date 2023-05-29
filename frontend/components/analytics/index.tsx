import { UmamiScript } from './Umami'

let isProduction = process.env.NODE_ENV === 'production'

export function Analytics() {

    if (isProduction) {
        // let { analytics } = siteMetadata
        // let { simpleAnalytics, umamiWebsiteId, googleAnalyticsId } = analytics

        return <UmamiScript />
        // return (
        //     <>
        //         {simpleAnalytics && <SimpleAnalyticsScript />}
        //         {umamiWebsiteId && <UmamiScript />}
        //         {googleAnalyticsId && <GAScript />}
        //     </>
        // )
    }
    return null
}
