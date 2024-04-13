import React from 'react'
import { fetchPage } from '@/data/directus-api'
import PageBuilder from '@/components/PageBuilder'

type Props = {
  params: { slug: string; lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: string }
}) {
  const page = await fetchPage(params.slug, params.lang)

  if (!page || !page.translations || page.translations.length === 0)
    return { title: 'unknown page.' }

  return {
    title: page.translations[0].title,
  }
}

export default async function PageRoute({ params }: Props) {
  const page = await fetchPage(params.slug, params.lang)

  if (!page || !page.translations || page.translations.length === 0) return null

  return <PageBuilder page={page} />
}
