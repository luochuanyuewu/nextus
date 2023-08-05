'use client'
import Script from 'next/script'

export function GAScript({ id }: { id: string }) {
  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script strategy='lazyOnload' id='ga-script'>
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  )
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function logEvent(
  action: string,
  category: string,
  label: string,
  value: string
) {
  // @ts-ignore
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
