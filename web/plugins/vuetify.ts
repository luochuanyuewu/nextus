import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi, aliases } from 'vuetify/iconsets/mdi'
import 'vuetify/styles'
export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        icons: {
            defaultSet: 'mdi',
            aliases: aliases,
            sets: {
                mdi
            }
        },
        ssr: true,
        components,
        directives,
    })

    nuxtApp.vueApp.use(vuetify)
})
