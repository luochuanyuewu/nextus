// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL || 'http://localhost:1337',
        }
    },
    css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify']
    },
    vite: {
        define: {
            'process.env.DEBUG': false
        }
    }
})
