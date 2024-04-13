import React from 'react'

import ArticleSelect from '@/deprecated/components/ArticleSelect'
import { fetchAPI } from '@/deprecated/lib/strapi-helpers'

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
    const options = { headers: { Authorization: `Bearer ${token}` } }

    const categoriesResponse = await fetchAPI(
      '/categories',
      { populate: '*' },
      options
    )

    const articlesResponse = await fetchAPI(
      '/articles',
      filter
        ? {
            filters: {
              category: {
                name: filter,
              },
            },
          }
        : {},
      options
    )

    return {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
    }
  } catch (error) {
    console.error(error)
  }
}

interface Category {
  id: number
  attributes: {
    name: string
    slug: string
    articles: {
      data: Array<{}>
    }
  }
}

interface Article {
  id: number
  attributes: {
    title: string
    slug: string
  }
}

interface Data {
  articles: Article[]
  categories: Category[]
}

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode
  params: {
    slug: string
    category: string
  }
}) {
  const { category } = params
  const { categories, articles } = (await fetchSideMenuData(category)) as Data

  return (
    <section className='container mx-auto'>
      <div className='grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-4'>
        <div className='col-span-2'>{children}</div>
        <aside className='sticky top-0 h-screen'>
          <ArticleSelect
            categories={categories}
            articles={articles}
            params={params}
          />
        </aside>
      </div>
    </section>
  )
}
