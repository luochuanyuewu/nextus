import qs from 'qs'

export function getStrapiURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) {
    return url
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('en-US', options)
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    }

    // Build request URL
    const queryString = qs.stringify(urlParamsObject)
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ''}`
    )}`

    const isServer = typeof window === 'undefined'

    const requestUrlRaw = `${getStrapiURL(
      `/api${path}${queryString ? `?${qs.stringify(urlParamsObject, { encode: false })}` : ''}`
    )}`

    console.log(
      `${isServer ? 'ServerSide请求:' : 'ClientSide请求:'}` + requestUrlRaw
    )

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    )
  }
}
