import React from 'react'
import { fetchPage } from '@/lib/utils/directus-api'
import PageBuilder from '@/components/PageBuilder'

type Props = {
  params: { slug: string; lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function PageRoute({ params }: Props) {
  const page = await fetchPage(params.slug, params.lang)

  if (!page || !page.translations || page.translations.length === 0) return null

  return <PageBuilder page={page} />
}
