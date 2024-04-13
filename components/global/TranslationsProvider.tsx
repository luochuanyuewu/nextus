'use client'

import { I18nextProvider } from 'react-i18next'
import { initTranslations } from '@/i18n/i18n'
import { Resource, createInstance } from 'i18next'
import React, { ComponentProps } from 'react'

type Props = Omit<ComponentProps<typeof I18nextProvider>, 'i18n'> & {
  /** This is automatically received when being rendered from a Server Component. In all other cases, e.g. when rendered from a Client Component, a unit test or with the Pages Router, you can pass this prop explicitly. */
  locale: string
  // namespaces?: Array<string>
  resources?: Resource
}

export default function TranslationsProvider({
  children,
  locale,
  // namespaces,
  resources,
}: Props) {
  const i18n = createInstance()

  initTranslations(locale, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
