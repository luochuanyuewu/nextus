'use client'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { Combobox } from '@headlessui/react'
import { getDirectusMedia } from '@/lib/utils/directus-helpers'
import VIcon from '@/components/base/VIcon'
import qs from 'qs'
import { truncateString } from '@/lib/utils/strings'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useRouter } from '@/lib/navigation'

type CollectionType =
  | 'posts'
  | 'pages'
  | 'categories'
  | 'projects'
  | 'help_articles'

interface GlobalSearchProps {
  collections: CollectionType[]
  placeholder?: string
  className?: string
}

export default function GlobalSearch({
  collections,
  placeholder,
  className,
}: GlobalSearchProps) {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<Array<any>>([])
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const { t } = useTranslation()

  const [, cancelSearch] = useDebounce(
    () => {
      search()
    },
    500,
    [query]
  )

  const search = async () => {
    setLoading(true)
    try {
      const encodedCollections = collections
        .map((collection) => encodeURIComponent(collection))
        .join(',')

      const queryString = qs.stringify(
        {
          search: query,
          collections: encodedCollections,
        },
        { encode: false }
      )
      const response = await fetch(`/api/search?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selected) {
      router.push(selected.url)
    }
  }, [selected, router])

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className={`relative mt-2 w-full ${className}`}>
        <Combobox.Input
          placeholder={placeholder}
          className='input input-bordered w-full pr-10'
          onChange={(event) => setQuery(event.target.value)}
          value={query}
        />
        {query.length > 0 && (
          <button
            className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'
            onClick={() => setQuery('')}
          >
            <VIcon
              icon='heroicons:x-mark'
              className='h-5 w-5'
              aria-hidden='true'
            />
          </button>
        )}
        <Combobox.Options className='scrollbar-hide absolute z-50 mt-10 max-h-[300px] w-full overflow-auto rounded-bl-xl border border-base-300  bg-base-300 pt-2 shadow-md  sm:text-sm'>
          <div className='relative space-y-2  px-2'>
            {loading && (
              <div className='flex h-12 w-full items-center justify-center'>
                <span className='loading loading-spinner text-warning'></span>
              </div>
            )}
            {results.map((hit) => (
              <Combobox.Option key={hit.id} value={hit}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      active ? 'bg-accent' : ''
                    } relative flex w-full cursor-pointer items-start space-x-3 overflow-hidden rounded-bl rounded-tr p-2 text-left`}
                  >
                    {hit.image ? (
                      <Image
                        width={40}
                        height={40}
                        className='h-10 w-10 flex-shrink-0 rounded-bl rounded-tr object-cover duration-300'
                        src={getDirectusMedia(hit.image)}
                        alt=''
                      ></Image>
                    ) : (
                      <div className='h-10 w-10 rounded-bl rounded-tr ' />
                    )}
                    <p className='font-mono text-sm font-semibold  group-hover:text-accent '>
                      {truncateString(hit.title, 50)}
                    </p>
                  </li>
                )}
              </Combobox.Option>
            ))}
            <div className='t w-full border-t py-2 text-center font-mono'>
              {results.length > 0
                ? t('global.search.end')
                : t('global.search.no')}
            </div>
          </div>
          <div className='justify-centerfont-mono sticky bottom-0 flex h-12 w-full items-center' />
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
