<script setup lang="ts">
import type { NavigationItem } from '~/types/content'

defineProps<{
  items: NavigationItem[]
  isActive: (item: NavigationItem) => boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <nav id="primary-mobile-nav" class="mobile-navigation" aria-label="Primary">
    <ul class="mobile-navigation__list">
      <li v-for="item in items" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="mobile-navigation__link"
          :class="{ 'is-active': isActive(item) }"
          :aria-current="isActive(item) ? 'page' : undefined"
          @click="emit('close')"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
