'use client'
import { useCallback, useEffect, useState } from 'react'
import { fetchAPI } from '@/deprecated/lib/strapi-helpers'

import Loader from '@/components/Loader'
import CourseList from '@/deprecated/components/views/course-list'
import PageHeader from '@/deprecated/components/PageHeader'

interface Meta {
  pagination: {
    start: number
    limit: number
    total: number
  }
}

export default function CourseHomePage() {
  const [meta, setMeta] = useState<Meta | undefined>()
  const [data, setData] = useState<any>([])
  const [isLoading, setLoading] = useState(true)

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true)
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
      const path = `/courses`
      const urlParamsObject = {
        sort: { createdAt: 'desc' },
        populate: {
          cover: { fields: ['url'] },
          // category: { populate: "*" },
          // authorsBio: {
          //     populate: "*",
          // },
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

  function loadMoreCourses(): void {
    const nextCourses = meta!.pagination.start + meta!.pagination.limit
    fetchData(nextCourses, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))
  }, [fetchData])

  if (isLoading) return <Loader />

  return (
    <div>
      <PageHeader heading='我的课程' text='来看看有趣的视频吧' />
      <CourseList data={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className='flex justify-center'>
            <button
              type='button'
              className='rounded-lg px-6 py-3 text-sm hover:underline dark:bg-gray-900 dark:text-gray-400'
              onClick={loadMoreCourses}
            >
              加载更多课程...
            </button>
          </div>
        )}
      </CourseList>
    </div>
  )
}
