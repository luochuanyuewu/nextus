// import the original type declarations
import 'i18next'

type Messages = typeof import('@/i18n/messages/en/translation.json')

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    // defaultNS: 'translation'
    // custom resources type
    resources: {
      translation: Messages
    }
    // other
  }
}
