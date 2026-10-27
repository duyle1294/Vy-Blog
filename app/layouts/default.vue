<script setup lang="ts">
import SiteFooter from '~/components/layout/SiteFooter.vue'
import SiteHeader from '~/components/layout/SiteHeader.vue'

const route = useRoute()
const isHomeRoute = computed(() => route.path === '/')
</script>

<template>
  <div class="site-shell">
    <SiteHeader v-if="!isHomeRoute" />

    <main id="main-content" class="site-main" :class="{ 'site-main--flush': isHomeRoute }" tabindex="-1">
      <div v-if="!isHomeRoute" class="page-container">
        <slot />
      </div>
      <slot v-else />
    </main>

    <SiteFooter />
  </div>
</template>
