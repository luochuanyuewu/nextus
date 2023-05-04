<script lang="ts" setup>

const props = defineProps({
  img: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true,
    default: 'PostTitle'
  },
  subTitle: {
    type: String,
    required: true,
    default: 'PostSubTitle'
  }
})
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-img v-if="img" class="align-end text-white" height="200" :src="img" cover>
    </v-img>
    <v-card-title>{{ title }}</v-card-title>

    <v-card-subtitle class="pt-4">
      {{ subTitle }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn :ripple="false" variant="text" color="grey">
        View
      </v-btn>

      <v-btn :ripple="false" variant="text" color="grey">
        Hits
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
