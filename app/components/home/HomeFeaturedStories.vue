<script setup lang="ts">
import type { Post } from '~/types/content'

defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <section aria-labelledby="home-featured-title" class="space-y-4">
    <div class="flex items-end justify-between gap-4">
      <h2 id="home-featured-title" class="text-2xl font-semibold text-[color:var(--color-text)] md:text-3xl">Featured stories</h2>
      <NuxtLink to="/blog" class="text-sm font-semibold text-[color:var(--color-primary)] hover:underline">View all</NuxtLink>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
  </section>
</template>
