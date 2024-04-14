import React from 'react'
import { Link } from '@/lib/navigation'

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

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? 'link link-hover px-3 py-1 dark:bg-violet-700 dark:text-gray-100'
    : 'link link-hover px-3 py-1 dark:bg-violet-400 dark:text-gray-900'
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[]
  articles: Article[]
  params: {
    slug: string
    category: string
  }
}) {
  return (
    <>
      <div className='card card-compact my-3 w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>分类浏览</h2>
          <div className='flex flex-wrap space-x-2 py-6'>
            {categories.map((category: Category) => {
              if (category.attributes.articles.data.length === 0) return null
              return (
                <Link
                  key={category.id}
                  href={`/p/${category.attributes.slug}`}
                  className={selectedFilter(
                    category.attributes.slug,
                    params.category
                  )}
                >
                  #{category.attributes.name}
                </Link>
              )
            })}
            <Link href={'/p'} className={selectedFilter('', 'filter')}>
              #所有
            </Link>
          </div>
        </div>
      </div>

      <div className='card-compact card w-96 bg-base-100 shadow-xl'>
        <div className='card-body'>
          <h2 className='card-title'>相关内容</h2>
          <ul className='ml-4 list-disc space-y-1'>
            {articles.map((article: Article) => {
              return (
                <li key={article.id}>
                  <Link
                    rel='noopener noreferrer'
                    href={`/p/${params.category}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug &&
                      'text-violet-400'
                    }  transition-colors duration-200 hover:text-violet-400 hover:underline`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )

  return (
    <div className='relative min-h-[365px] rounded-lg p-4 dark:bg-gray-900'>
      <h4 className='text-xl font-semibold'>通过分类浏览</h4>

      <div>
        <div className='flex flex-wrap space-x-2 py-6 dark:border-gray-400'>
          {categories.map((category: Category) => {
            if (category.attributes.articles.data.length === 0) return null
            return (
              <Link
                key={category.id}
                href={`/p/${category.attributes.slug}`}
                className={selectedFilter(
                  category.attributes.slug,
                  params.category
                )}
              >
                #{category.attributes.name}
              </Link>
            )
          })}
          <Link href={'/p'} className={selectedFilter('', 'filter')}>
            #所有
          </Link>
        </div>

        <div className='space-y-2'>
          <h4 className='text-lg font-semibold'>类似文章</h4>
          <ul className='ml-4 list-disc space-y-1'>
            {articles.map((article: Article) => {
              return (
                <li key={article.id}>
                  <Link
                    rel='noopener noreferrer'
                    href={`/p/${params.category}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug &&
                      'text-violet-400'
                    }  transition-colors duration-200 hover:text-violet-400 hover:underline`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
