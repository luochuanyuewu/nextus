import React from 'react'
import { fetchGlobals, fetchPage } from '@/lib/utils/directus-api'
import PageBuilder from '@/components/PageBuilder'
import { getTranslator } from 'next-intl/server'
import { GlobalsTranslations } from '@/lib/directus-collections'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const globals = await fetchGlobals(params.lang)
  if (!globals.translations || globals.translations.length <= 0)
    return {
      title: 'Home | Nextus',
    }
  const data = globals.translations[0] as GlobalsTranslations

  const t = await getTranslator(params.lang)

  return {
    title: `${t('global.home_title')} | ${data.title} ${data.tagline} `,
  }
}

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
