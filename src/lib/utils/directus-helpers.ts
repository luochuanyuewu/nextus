import { DirectusFiles, DirectusUsers } from '@/data/directus-collections'

export function getDirectusURL(path = '') {
  return `${
    process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055'
  }${path}`
}

export function getDirectusMedia(
  url: string | DirectusFiles | null | undefined
) {
  if (url == null || typeof url === undefined) {
    return ''
  }
  let localUrl = typeof url === 'string' ? url : url.id

  // Return the full URL if the media is hosted on an external provider
  if (localUrl.startsWith('http') || localUrl.startsWith('//')) {
    return localUrl
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getDirectusURL()}/assets/${url}`
}

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

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time))

export function userName(user: Partial<DirectusUsers>): string {
  if (!user) {
    return 'Unknown User' as string
  }

  if (user.first_name && user.last_name) {
    return `${user.first_name} ${user.last_name}`
  }

  if (user.first_name) {
    return user.first_name
  }

  if (user.email) {
    return user.email
  }

  return 'Unknown User' as string
}
