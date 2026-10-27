<script setup lang="ts">
import ArticleBody from '~/components/blog/ArticleBody.vue'
import { POSTS } from '~/data/posts'
import { formatDate, getCategoryLabel, getPostBySlug } from '~/utils/content'

definePageMeta({
  validate: (route) => {
    const param = route.params.slug
    const slug = Array.isArray(param) ? (param[0] ?? '') : (param ?? '')
    return Boolean(getPostBySlug(slug))
  }
})

const route = useRoute()

const slug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '')
})

const post = computed(() => getPostBySlug(slug.value))
const relatedPosts = computed(() =>
  post.value
    ? POSTS.filter((item) => item.category === post.value?.category && item.slug !== post.value.slug).slice(0, 3)
    : []
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Story not found',
    fatal: true
  })
}

useSeoMeta({
  title: () => `${post.value?.title ?? 'Story'} | Vy’s World`,
  description: () => post.value?.excerpt ?? 'Read a story from Vy’s journal.'
})
</script>

<template>
  <article class="story-detail">
    <nav class="story-detail__crumb" aria-label="Breadcrumb">
      <NuxtLink to="/blog">← Back to stories</NuxtLink>
    </nav>

    <figure v-reveal class="story-detail__cover">
      <img :src="post.cover.src" :alt="post.cover.alt" />
      <figcaption v-if="post.cover.caption">{{ post.cover.caption }}</figcaption>
    </figure>

    <div class="story-detail__reading-column">
      <header class="story-detail__header">
        <p class="story-detail__category">{{ getCategoryLabel(post.category) }}</p>
        <h1>{{ post.title }}</h1>
        <div class="story-detail__meta">
          <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
          <span v-if="post.readingTimeMinutes">· {{ post.readingTimeMinutes }} min read</span>
        </div>
      </header>

      <ArticleBody :blocks="post.blocks" />

      <footer class="story-detail__footer">
        <NuxtLink to="/blog">Back to all stories →</NuxtLink>
      </footer>
    </div>

    <section v-if="relatedPosts.length" v-reveal class="story-detail__related" aria-labelledby="related-stories-title">
      <div class="story-detail__related-heading">
        <h2 id="related-stories-title">Related stories</h2>
        <NuxtLink :to="`/blog?category=${post.category}`">View all <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <div class="story-detail__related-grid">
        <NuxtLink
          v-for="related in relatedPosts"
          :key="related.slug"
          class="story-detail__related-card"
          :to="`/blog/${related.slug}`"
        >
          <img :src="related.cover.src" :alt="related.cover.alt" loading="lazy" />
          <span>{{ related.title }}</span>
          <time :datetime="related.publishedAt">{{ formatDate(related.publishedAt) }}</time>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>

<style scoped>
.story-detail {
  display: grid;
  gap: clamp(1rem, 2vw, 1.5rem);
  padding-bottom: clamp(2.25rem, 5vw, 3.5rem);
}

.story-detail__crumb {
  font-size: 0.95rem;
}

.story-detail__crumb a {
  text-decoration: none;
  font-weight: 600;
}

.story-detail__header {
  width: min(var(--reading-max), 100%);
  margin-inline: auto;
  display: grid;
  gap: 0.6rem;
}

.story-detail__category {
  width: fit-content;
  margin: 0;
  padding: 0.22rem 0.65rem;
  border-radius: 999px;
  background: #e7f0e6;
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.story-detail__header h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.2vw, 3.2rem);
  line-height: 1.1;
}

.story-detail__meta {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.story-detail__cover {
  width: 100%;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.story-detail__cover img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 8;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.story-detail__cover figcaption {
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

.story-detail__footer a {
  font-weight: 600;
  text-decoration: none;
}

.story-detail__reading-column {
  width: min(var(--reading-max), 100%);
  margin-inline: auto;
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.story-detail__related {
  display: grid;
  gap: 1rem;
  margin-top: clamp(1rem, 3vw, 2rem);
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}

.story-detail__related-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.story-detail__related-heading h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
}

.story-detail__related-heading a {
  font-size: 0.85rem;
  text-decoration: none;
}

.story-detail__related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.story-detail__related-card {
  display: grid;
  gap: 0.4rem;
  color: var(--color-text);
  text-decoration: none;
}

.story-detail__related-card img {
  width: 100%;
  aspect-ratio: 1.55 / 1;
  border-radius: 10px;
  object-fit: cover;
}

.story-detail__related-card span {
  font-family: var(--font-display);
  font-size: 1.05rem;
  line-height: 1.2;
}

.story-detail__related-card time {
  color: var(--color-text-muted);
  font-size: 0.72rem;
}

@media (max-width: 767px) {
  .story-detail__related-grid {
    grid-template-columns: 1fr;
  }

  .story-detail__related-card {
    grid-template-columns: 90px 1fr;
    align-items: center;
  }

  .story-detail__related-card img {
    grid-row: span 2;
  }
}
</style>