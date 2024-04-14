import { Resource, createInstance, i18n } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '@/i18n/i18nConfig'

export { initTranslations, getTranslations }

async function getTranslations(config: {
  locale: string
  // namespaces?: Array<string>
  i18nInstance?: i18n
  resources?: Resource
}) {
  return await initTranslations(
    config.locale,
    // config.namespaces,
    config.i18nInstance,
    config.resources
  )
}

async function initTranslations(
  locale: string,
  // namespaces?: Array<string>,
  i18nInstance?: i18n,
  resources?: Resource
) {
  i18nInstance = i18nInstance || createInstance()
  i18nInstance.use(initReactI18next)
  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/i18n/messages/${language}/${namespace}.json`)
      )
    )
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: 'translation',
    // defaultNS: namespaces[0],
    // fallbackNS: namespaces[0],
    // ns: ['trasnlation'],
    preload: resources ? [] : i18nConfig.locales,
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  }
}
