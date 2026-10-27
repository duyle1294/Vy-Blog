<script setup lang="ts">
import type { Category, CategorySlug } from '~/types/content'

const props = defineProps<{
  categories: Category[]
  selectedCategory: CategorySlug | 'all'
}>()

const emit = defineEmits<{
  select: [value: CategorySlug | 'all']
}>()

const visibleCategories = computed(() => props.categories.filter((category) => category.navVisible))
</script>

<template>
  <div class="category-filter" role="group" aria-label="Filter stories by category">
    <button
      type="button"
      class="category-filter__button"
      :class="{ 'is-active': selectedCategory === 'all' }"
      :aria-pressed="selectedCategory === 'all'"
      @click="emit('select', 'all')"
    >
      All
    </button>

    <button
      v-for="category in visibleCategories"
      :key="category.slug"
      type="button"
      class="category-filter__button"
      :class="{ 'is-active': selectedCategory === category.slug }"
      :aria-pressed="selectedCategory === category.slug"
      @click="emit('select', category.slug)"
    >
      {{ category.label }}
    </button>
  </div>
</template>
