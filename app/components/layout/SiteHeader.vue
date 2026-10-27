<script setup lang="ts">
import MobileNavigation from '~/components/layout/MobileNavigation.vue'
import { PRIMARY_NAVIGATION } from '~/data/categories'
import type { NavigationItem } from '~/types/content'

const route = useRoute()
const isMenuOpen = ref(false)

function isActive(item: NavigationItem): boolean {
  const [path = '/', queryString] = item.to.split('?')

  if (item.exact && route.path !== path) {
    return false
  }

  if (!item.exact && route.path !== path) {
    return false
  }

  if (!queryString) {
    return item.exact ? route.path === path : route.path.startsWith(path)
  }

  const params = new URLSearchParams(queryString)
  const category = params.get('category')
  return route.query.category === category
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function onEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  }
)

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <header class="site-header">
    <div class="page-container site-header__inner">
      <NuxtLink to="/" class="site-header__brand" aria-label="Vy's World home page"><span class="site-header__logo" aria-hidden="true">Vy</span>Vy’s World</NuxtLink>

      <nav class="site-header__desktop-nav" aria-label="Primary">
        <ul class="site-header__nav-list">
          <li v-for="item in PRIMARY_NAVIGATION" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="site-header__link"
              :class="{ 'is-active': isActive(item) }"
              :aria-current="isActive(item) ? 'page' : undefined"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="site-header__menu-button"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-mobile-nav"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        @click="toggleMenu"
      >
        {{ isMenuOpen ? 'Close' : 'Menu' }}
      </button>
    </div>

    <div class="page-container" v-if="isMenuOpen">
      <MobileNavigation :items="PRIMARY_NAVIGATION" :is-active="isActive" @close="closeMenu" />
    </div>
  </header>
</template>
