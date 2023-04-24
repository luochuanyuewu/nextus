<template>
  <v-app id="SimpleLayout">
    <v-main>
      <v-container fluid>
        <v-row class=" ">
          <v-col>
            <nuxt-link to="/" class="d-flex justify-center">
              <img :src="site ? site.logo : '/logo.png'" class="logo" alt="logo" />
            </nuxt-link>
            <div class="d-flex justify-center">
              {{ site ? site.subTitle : '这里是古莫拉哦~' }}
            </div>
          </v-col>
        </v-row>
        <slot />
      </v-container>
    </v-main>
    <v-footer>
      <v-col>
        <div class="d-flex justify-center">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="d-flex justify-center">
          {{ site ? site.copyright : '古莫拉版权所有' }}
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { AppConfig } from 'nuxt/schema'

const appConfig: AppConfig = useAppConfig()
console.log(appConfig.)

const { data } = await useFetch('http://localhost:1337/api/site-configuration')
const site = (data.value as any).data.attributes
console.log(JSON.stringify(site))

// definePageMeta({
//   name: 'simple-layout'
// })
</script>

<style lang="scss" scoped></style>