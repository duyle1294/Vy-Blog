<script setup lang="ts">
import type { Category } from '~/types/content'

defineProps<{
  categories: Category[]
}>()
</script>

<template>
  <section aria-labelledby="home-topics-title" class="space-y-4">
    <div class="flex items-end justify-between gap-4">
      <h2 id="home-topics-title" class="text-2xl font-semibold text-[#34443a] md:text-3xl">Explore by topic</h2>
      <NuxtLink to="/blog" class="text-sm font-semibold text-[#477a5b] hover:underline">All stories</NuxtLink>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/blog?category=${category.slug}`"
        class="rounded-xl border border-[#dbe4da] bg-[#fffefa] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
      >
        <p class="text-base font-semibold text-[#34443a]">{{ category.label }}</p>
        <p class="mt-1 text-sm leading-relaxed text-[#637169]">{{ category.description }}</p>
      </NuxtLink>
    </div>
  </section>
</template>
