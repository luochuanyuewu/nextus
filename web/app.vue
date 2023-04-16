<template>
  <div>
    <NuxtWelcome />
    <p>{{ data}}</p>
  </div>
</template>

<script setup lang="ts">
const {data} = await useFetch(()=> `http://localhost:1337/api/home-page`)
console.log(data)
</script>