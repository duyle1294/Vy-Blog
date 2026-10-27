<script setup lang="ts">
import { getCategoryLabel, formatDate } from '~/utils/content'
import type { Post } from '~/types/content'

defineProps<{
  post: Post
}>()
</script>

<template>
  <article v-reveal class="blog-card">
    <NuxtLink class="blog-card__image-wrap" :to="`/blog/${post.slug}`" tabindex="-1" aria-hidden="true">
      <img class="blog-card__image" :src="post.cover.src" :alt="post.cover.alt" loading="lazy" />
    </NuxtLink>

    <div class="blog-card__content">
      <p class="blog-card__category">{{ getCategoryLabel(post.category) }}</p>
      <h3>{{ post.title }}</h3>
      <p class="blog-card__excerpt">{{ post.excerpt }}</p>
      <p class="blog-card__meta">{{ formatDate(post.publishedAt) }}</p>
      <NuxtLink class="blog-card__link" :to="`/blog/${post.slug}`">Read story <span aria-hidden="true">→</span></NuxtLink>
    </div>
  </article>
</template>
