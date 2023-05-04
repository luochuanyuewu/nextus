<script lang="ts" setup>

const { data } = await useStrapi(`posts?populate[cover][fields][0]=url`)

const { data: posts, meta } = data.value as any



console.log(JSON.stringify(posts[0]))

</script>

<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col v-for="(post) in posts" :key="post.id" cols="12" sm="4">
        <post-card :img="useStrapiMedia(post.attributes.cover.data.attributes.url)" :title="post.attributes.title"
          :sub-title="post.attributes.subTitle"></post-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
