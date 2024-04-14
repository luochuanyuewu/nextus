import React from 'react'
import { fetchPage } from '@/data/directus-api'
import { getTranslations } from '@/i18n/i18n'
import LangRedirect from '@/components/navigation/LangRedirect'
import PageBuilder from '@/components/PageBuilder'
import { fetchGlobalData } from '@/data/fetch-globals'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}) {
  const { globalData } = await fetchGlobalData({ locale: params.lang })

  const { t } = await getTranslations({ locale: params.lang })
  return {
    title: `${t('global.home_title')} | ${globalData.tagline} `,
  }
}

export default async function PageRoute({
  params,
}: {
  params: { lang: string }
}) {
  const page = await fetchPage('home', params.lang)

  if (!page) return null

  if (!page.translations || page.translations.length === 0)
    return <LangRedirect lang={params.lang}></LangRedirect>

  return (
    <>
      <PageBuilder page={page} />
    </>
  )
}
