'use client'
import { useCallback, useEffect, useState } from 'react'
import { fetchAPI } from '@/lib/utils/fetch-api'

import Loader from '../../../components/Loader'
import BlogList from '@/components/deprecated/views/blog-list'
import PageHeader from '../../../components/deprecated/PageHeader'
import Link from 'next-intl/link'

interface Meta {
  pagination: {
    start: number
    limit: number
    total: number
  }
}

export default function BlogHomePage() {
  const [meta, setMeta] = useState<Meta | undefined>()
  const [data, setData] = useState<any>([])
  const [isLoading, setLoading] = useState(true)

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
      const path = `/articles`
      const urlParamsObject = {
        sort: { createdAt: 'desc' },
        populate: {
          cover: { fields: ['url'] },
          category: { populate: '*' },
          authorsBio: {
            populate: '*',
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      }
      const options = { headers: { Authorization: `Bearer ${token}` } }
      const responseData = await fetchAPI(path, urlParamsObject, options)

      if (start === 0) {
        setData(responseData.data)
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data])
      }

      setMeta(responseData.meta)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  }, [fetchData])

  if (isLoading) return <Loader />

  return (
    <div>
      <PageHeader heading='我的文章' text='来看看有趣的东西吧' />

      <section className='container mx-auto space-y-6 p-4 sm:space-y-12'>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-3 lg:gap-4'>
          <div className='col-span-2'>
            <BlogList data={data}>
              {meta!.pagination.start + meta!.pagination.limit <
                meta!.pagination.total && (
                <div className='flex justify-center'>
                  <button
                    type='button'
                    className='rounded-lg px-6 py-3 text-sm hover:underline dark:bg-gray-900 dark:text-gray-400'
                    onClick={loadMorePosts}
                  >
                    加载更多文章...
                  </button>
                </div>
              )}
            </BlogList>
          </div>

          <aside className='sticky top-0 h-screen'>
            <div className='card-compact card mb-4 bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title'>用户中心</h2>
                <p>需要登录才能进入用户中心</p>
                <div className='card-actions justify-end'>
                  <Link href='/login'>
                    <button className='btn btn-primary'>登录</button>
                  </Link>
                  <button className='btn btn-secondary'>注册</button>
                </div>
              </div>
            </div>
            <div className='card-compact card mb-4 bg-base-100 shadow-xl'>
              <div className='card-body'>
                <h2 className='card-title'>网站公告</h2>
                <p>本网站还在积极开发中，如果发现有什么奇怪的，请别见怪哦</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
