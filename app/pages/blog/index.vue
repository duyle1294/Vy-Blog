<script setup lang="ts">
import CategoryFilter from '~/components/blog/CategoryFilter.vue'
import PostCard from '~/components/blog/PostCard.vue'
import { CATEGORIES } from '~/data/categories'
import { POSTS } from '~/data/posts'
import { pickDummyImage } from '~/data/images'
import type { Category } from '~/types/content'
import {
  ALL_CATEGORIES_VALUE,
  filterPosts,
  formatDate,
  getFeaturedPosts,
  getCategoryLabel,
  normalizeCategory
} from '~/utils/content'

const route = useRoute()
const router = useRouter()

const categoryFromQuery = computed(() => normalizeCategory(asQueryValue(route.query.category)))
const searchQuery = ref(asQueryValue(route.query.q))

const filterCategories = computed<Category[]>(() => {
  const hasLifePosts = POSTS.some((post) => post.category === 'life')

  return CATEGORIES.map((category) => {
    if (category.slug !== 'life') {
      return category
    }

    return {
      ...category,
      navVisible: hasLifePosts
    }
  })
})

const filteredPosts = computed(() =>
  filterPosts({
    category: categoryFromQuery.value,
    query: searchQuery.value
  })
)
const popularPosts = getFeaturedPosts(3)

const selectedCategoryLabel = computed(() => {
  if (categoryFromQuery.value === ALL_CATEGORIES_VALUE) {
    return 'All stories'
  }

  return getCategoryLabel(categoryFromQuery.value)
})

watch(
  () => route.query.q,
  (queryValue) => {
    searchQuery.value = asQueryValue(queryValue)
  }
)

watch(
  () => route.query.category,
  (categoryValue) => {
    const normalizedCategory = normalizeCategory(asQueryValue(categoryValue))
    const rawCategory = asQueryValue(categoryValue)

    if (rawCategory && normalizedCategory === ALL_CATEGORIES_VALUE) {
      router.replace({
        query: {
          ...route.query,
          category: undefined
        }
      })
    }
  },
  { immediate: true }
)

function asQueryValue(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    const firstValue = value[0]
    return typeof firstValue === 'string' ? firstValue : ''
  }

  return ''
}

function updateCategory(value: string) {
  const normalizedCategory = normalizeCategory(value)

  router.push({
    query: {
      ...route.query,
      category: normalizedCategory === ALL_CATEGORIES_VALUE ? undefined : normalizedCategory
    }
  })
}

function applySearch() {
  const normalizedQuery = searchQuery.value.trim()

  router.push({
    query: {
      ...route.query,
      q: normalizedQuery.length ? normalizedQuery : undefined
    }
  })
}

function resetFilters() {
  searchQuery.value = ''
  router.push({ query: {} })
}

useSeoMeta({
  title: () =>
    categoryFromQuery.value === ALL_CATEGORIES_VALUE
      ? 'Stories | Vy’s World'
      : `${getCategoryLabel(categoryFromQuery.value)} stories | Vy’s World`,
  description: () =>
    categoryFromQuery.value === ALL_CATEGORIES_VALUE
      ? 'Browse stories on travel, experiences, books, marketing, and everyday reflections.'
      : `Browse ${getCategoryLabel(categoryFromQuery.value).toLowerCase()} stories in Vy’s calm personal journal.`
})
</script>

<template>
  <div class="blog-list">
    <header class="blog-list__banner">
      <img :src="pickDummyImage('blog-banner')" alt="" />
      <div class="blog-list__banner-copy">
        <p class="blog-list__eyebrow">A journal of small moments</p>
        <h1>All Posts</h1>
        <p>Stories, thoughts, and little things worth remembering.</p>
      </div>
    </header>

    <form v-reveal class="blog-list__search" role="search" @submit.prevent="applySearch">
      <label for="story-search">Search stories</label>
      <div class="blog-list__search-row">
        <input
          id="story-search"
          v-model="searchQuery"
          type="search"
          name="q"
          placeholder="Search by title, topic, or category"
          autocomplete="off"
        />
        <button type="submit">Search</button>
      </div>
    </form>

    <div class="blog-list__layout">
      <aside v-reveal="100" class="blog-list__categories" aria-labelledby="categories-title">
        <h2 id="categories-title">Categories</h2>
        <CategoryFilter
          :categories="filterCategories"
          :selected-category="categoryFromQuery"
          @select="updateCategory"
        />
      </aside>

      <section class="blog-list__stories" aria-labelledby="latest-title">
        <div class="blog-list__section-heading">
          <h2 id="latest-title">Latest Posts</h2>
          <p class="blog-list__results" aria-live="polite">
            {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'story' : 'stories' }}
            <span>· {{ selectedCategoryLabel }}</span>
          </p>
        </div>

        <div v-if="filteredPosts.length" class="blog-list__grid" aria-label="Story list">
          <PostCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
        </div>

        <div v-else class="blog-list__empty" aria-live="polite">
          <h3>No stories found</h3>
          <p>Try another keyword or clear filters to explore all stories.</p>
          <button type="button" @click="resetFilters">Clear search and category</button>
        </div>
      </section>

      <aside v-reveal="200" class="blog-list__popular" aria-labelledby="popular-title">
        <h2 id="popular-title">Featured Posts</h2>
        <ul>
          <li v-for="post in popularPosts" :key="post.slug">
            <NuxtLink :to="`/blog/${post.slug}`" class="blog-list__popular-link">
              <img :src="post.cover.src" :alt="post.cover.alt" loading="lazy" />
              <span>
                <strong>{{ post.title }}</strong>
                <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
              </span>
            </NuxtLink>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.blog-list {
  display: grid;
  gap: clamp(1.4rem, 3vw, 2.25rem);
  padding-bottom: clamp(2.5rem, 5vw, 4rem);
}

.blog-list__banner {
  position: relative;
  display: grid;
  min-height: clamp(190px, 25vw, 280px);
  place-items: center;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  text-align: center;
}

.blog-list__banner::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, color-mix(in srgb, var(--color-bg) 70%, transparent), color-mix(in srgb, var(--color-bg) 44%, transparent));
  content: '';
}

.blog-list__banner img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.blog-list__banner-copy {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 0.55rem;
  padding: 1rem;
}

.blog-list__eyebrow {
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-list__banner h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5vw, 3.7rem);
  line-height: 1.05;
}

.blog-list__banner-copy > p:last-child {
  color: var(--color-text-muted);
}

.blog-list__search {
  display: grid;
  gap: 0.5rem;
  max-width: 36rem;
}

.blog-list__search label {
  font-weight: 600;
}

.blog-list__search-row {
  display: flex;
  gap: 0.5rem;
}

.blog-list__search-row input {
  min-height: 2.6rem;
  min-width: 0;
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  padding: 0.55rem 0.75rem;
  color: var(--color-text);
}

.blog-list__search-row button,
.blog-list__empty button {
  min-height: 2.6rem;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.blog-list__search-row button {
  padding-inline: 1rem;
}

.blog-list__layout {
  display: grid;
  align-items: start;
  gap: 2rem;
}

.blog-list__categories,
.blog-list__popular {
  display: grid;
  gap: 0.8rem;
}

.blog-list__categories h2,
.blog-list__popular h2,
.blog-list__section-heading h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 400;
}

.blog-list__categories :deep(.category-filter) {
  display: grid;
  gap: 0.3rem;
}

.blog-list__categories :deep(.category-filter__button) {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  min-height: 2.65rem;
  padding-inline: 0.7rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  text-align: left;
}

.blog-list__categories :deep(.category-filter__button::before) {
  content: '·';
  margin-right: 0.65rem;
  color: var(--color-primary-soft);
  font-size: 1.3rem;
  line-height: 1;
}

.blog-list__categories :deep(.category-filter__button.is-active) {
  background: var(--color-tint);
  color: var(--color-primary);
  font-weight: 700;
}

.blog-list__section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.55rem;
}

.blog-list__results {
  color: var(--color-text-muted);
  font-size: 0.82rem;
  white-space: nowrap;
}

.blog-list__grid {
  display: grid;
}

.blog-list__grid :deep(.blog-card) {
  display: grid;
  grid-template-columns: minmax(90px, 170px) minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding-block: 0.8rem;
  border: 0;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;
  background: transparent;
}

.blog-list__grid :deep(.blog-card__image) {
  aspect-ratio: 4 / 3;
  border-radius: 10px;
}

.blog-list__grid :deep(.blog-card__content) {
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: 0.3rem 0.75rem;
  padding: 0;
}

.blog-list__grid :deep(.blog-card__category) {
  grid-column: 1 / -1;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
}

.blog-list__grid :deep(.blog-card h3) {
  grid-column: 1 / -1;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1.6vw, 1.45rem);
  font-weight: 400;
  line-height: 1.2;
}

.blog-list__grid :deep(.blog-card__excerpt) {
  grid-column: 1 / -1;
  font-size: 0.85rem;
  line-height: 1.5;
}

.blog-list__grid :deep(.blog-card__meta) {
  font-size: 0.72rem;
}

.blog-list__grid :deep(.blog-card__link) {
  justify-self: end;
  font-size: 0.8rem;
  text-decoration: none;
}

.blog-list__popular ul {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.blog-list__popular-link {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 0.65rem;
  align-items: center;
  color: var(--color-text);
  text-decoration: none;
}

.blog-list__popular-link img {
  width: 72px;
  aspect-ratio: 1;
  border-radius: 8px;
  object-fit: cover;
}

.blog-list__popular-link span {
  display: grid;
  gap: 0.2rem;
}

.blog-list__popular-link strong {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.2;
}

.blog-list__popular-link time {
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

.blog-list__empty {
  display: grid;
  gap: 0.75rem;
  padding: 1.1rem 0;
}

.blog-list__empty h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 400;
}

.blog-list__empty p {
  color: var(--color-text-muted);
}

@media (min-width: 768px) {
  .blog-list__layout {
    grid-template-columns: minmax(145px, 0.65fr) minmax(0, 2fr);
  }
}

@media (min-width: 1024px) {
  .blog-list__layout {
    grid-template-columns: minmax(145px, 0.65fr) minmax(0, 2fr) minmax(185px, 0.9fr);
    gap: 1.75rem;
  }

  .blog-list__popular {
    padding-left: 1.25rem;
    border-left: 1px solid var(--color-border);
  }
}

@media (max-width: 767px) {
  .blog-list__grid :deep(.blog-card) {
    grid-template-columns: 100px minmax(0, 1fr);
    gap: 0.75rem;
  }

  .blog-list__grid :deep(.blog-card__content) {
    grid-template-columns: 1fr;
  }

  .blog-list__grid :deep(.blog-card__meta),
  .blog-list__grid :deep(.blog-card__link) {
    justify-self: start;
  }

  .blog-list__popular {
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }
}
.blog-list__banner-copy h1,
.blog-list__banner-copy p {
  -webkit-text-stroke: 4px #fff;
  paint-order: stroke fill;
}
</style>