import directusApi, { fetchGlobals } from '@/lib/utils/directus-api'
import { readItems } from '@directus/sdk'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const pages = [
  //     {
  //       slug: 'page-1',
  //       title: 'page 1',
  //       translations: [
  //         {
  //           language_code: 'zh',
  //           content: '中文内容',
  //         },
  //         { language_code: 'en', content: 'EnglishContent' },
  //       ],
  //     },
  //     {
  //       slug: 'page-2',
  //       title: 'page 2',
  //       translations: [
  //         {
  //           language_code: 'zh',
  //           content: '中文内容',
  //         },
  //         { language_code: 'en', content: 'EnglishContent' },
  //       ],
  //     },
  //   ]

  const fetchPages = async function () {
    return await directusApi.request(
      readItems('pages', {
        fields: ['slug', 'date_updated', { translations: ['languages_code'] }],
      })
    )
  }

  const fetchPosts = async function () {
    return await directusApi.request(
      readItems('posts', {
        fields: ['slug', 'date_updated'],
      })
    )
  }

  const fetchProjects = async function () {
    return await directusApi.request(
      readItems('projects', {
        fields: ['slug', 'date_updated'],
      })
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // common pages.

  const allRootPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
  ]

  const locales = ['zh', 'en']
  const routes = ['/', '/projects', '/posts', '/help']

  locales.forEach((locale) => {
    routes.forEach((route) => {
      allRootPages.push({
        url: `${baseUrl}/${locale}${route}`,
        //@ts-ignore
        lastModified: new Date(),
      })
    })
  })

  const [posts, pages, projects] = await Promise.all([
    fetchPosts(),
    fetchPages(),
    fetchProjects(),
  ])

  const allPosts: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `${baseUrl}/posts/${post.slug}`,
      //@ts-ignore
      lastModified: new Date(post.date_updated),
    }
  })

  const allPages: MetadataRoute.Sitemap = []

  pages.forEach((page) => {
    page.translations?.forEach((translation) => {
      allPages.push({
        url: `${baseUrl}/${translation.languages_code}/${page.slug}`,
        //@ts-ignore
        lastModified: new Date(page.date_updated),
      })
    })
  })

  const allProjects: MetadataRoute.Sitemap = projects.map((project) => {
    return {
      url: `${baseUrl}/projects/${project.slug}`,
      //@ts-ignore
      lastModified: new Date(project.date_updated),
    }
  })

  return [...allRootPages, ...allPosts, ...allPages, ...allProjects]
}
