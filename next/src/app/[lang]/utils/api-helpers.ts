export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export function getDirectusURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055"
  }${path}`;
}

export function getDirectusURLOld(path = "") {
  return `${
    process.env.NEXT_PUBLIC_DIRECTUS_URL_OLD || "http://localhost:8055"
  }${path}`;
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getStrapiURL()}${url}`;
}

export function getDirectusMedia(url: string | null) {
  if (url == null) {
    return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${getDirectusURL()}/assets/${url}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// ADDS DELAY TO SIMULATE SLOW API REMOVE FOR PRODUCTION
export const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(1), time));
