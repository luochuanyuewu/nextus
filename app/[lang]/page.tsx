import React from 'react'
import { fetchPage } from '@/lib/utils/directus-api'
import PageBuilder from '@/components/PageBuilder'

export default async function PageRoute({
  params,
}: {
  params: { lang: string }
}) {
  const page = await fetchPage('home', params.lang)

  if (!page || !page.translations || page.translations.length === 0) return null

  return (
    <>
      <PageBuilder page={page} />
    </>
  )
}
