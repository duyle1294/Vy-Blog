<script setup lang="ts">
import { FOOTER_NAVIGATION } from '~/data/categories'
import { PROFILE } from '~/data/profile'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="page-container site-footer__inner">
      <div>
        <p class="site-footer__brand">{{ PROFILE.displayName }}</p>
        <p class="site-footer__tagline">A little green garden on the internet.</p>
      </div>

      <nav class="site-footer__nav" aria-label="Footer">
        <NuxtLink
          v-for="item in FOOTER_NAVIGATION"
          :key="item.to"
          :to="item.to"
          class="site-footer__nav-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="site-footer__meta">
        <span class="site-footer__meta-text">© {{ currentYear }} {{ PROFILE.displayName }}</span>
      </div>
    </div>
  </footer>
</template>
