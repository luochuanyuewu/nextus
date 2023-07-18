import directusApi from '@/app/[lang]/utils/directus-api'
import { readItems } from '@directus/sdk'
import { Category } from '@/types/schemas'
import Link from 'next/link'
import VBadge from '@/app/[lang]/components/base/VBadge'

async function fetchData() {
  const categories = await directusApi.request(readItems('categories'))

  return categories as Array<Category>
}

export default async function Categories() {
  const categories = await fetchData()

  return (
    <div className='mt-4 flex flex-col space-y-2'>
      {categories.map((category) => {
        return (
          <Link
            key={category.id}
            href={`/posts/categories/${category.id}`}
            className='font-mono hover:opacity-80 dark:text-gray-200'
          >
            <VBadge color={category.color} size='lg'>
              {category.title}
            </VBadge>
          </Link>
        )
      })}
    </div>
  )
}
