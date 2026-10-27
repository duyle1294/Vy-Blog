<script setup lang="ts">
import AppLoader from '~/components/layout/AppLoader.vue'
</script>

<template>
  <AppLoader />
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
