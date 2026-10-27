<script setup lang="ts">
import type { ArticleBlock } from '~/types/content'
import { sanitizeHref } from '~/utils/content'

defineProps<{
  blocks: ArticleBlock[]
}>()

function toHeadingTag(level: 2 | 3): 'h2' | 'h3' {
  return level === 2 ? 'h2' : 'h3'
}

function isInternalLink(href: string): boolean {
  return href.startsWith('/')
}

function isExternalWebLink(href: string): boolean {
  return href.startsWith('https://')
}
</script>

<template>
  <div class="article-body">
    <template v-for="(block, index) in blocks" :key="`${block.type}-${index}`">
      <p v-if="block.type === 'paragraph'" class="article-body__paragraph">
        {{ block.text }}
      </p>

      <component
        :is="toHeadingTag(block.level)"
        v-else-if="block.type === 'heading'"
        class="article-body__heading"
      >
        {{ block.text }}
      </component>

      <figure v-else-if="block.type === 'quote'" class="article-body__quote">
        <blockquote>
          <p>{{ block.text }}</p>
        </blockquote>
        <figcaption v-if="block.attribution">— {{ block.attribution }}</figcaption>
      </figure>

      <ol
        v-else-if="block.type === 'list' && block.ordered"
        class="article-body__list article-body__list--ordered"
      >
        <li v-for="item in block.items" :key="item">{{ item }}</li>
      </ol>

      <ul v-else-if="block.type === 'list'" class="article-body__list">
        <li v-for="item in block.items" :key="item">{{ item }}</li>
      </ul>

      <figure v-else-if="block.type === 'image'" class="article-body__image">
        <img
          :src="block.image.src"
          :alt="block.image.alt"
          :width="block.image.width"
          :height="block.image.height"
          loading="lazy"
        />
        <figcaption v-if="block.image.caption">{{ block.image.caption }}</figcaption>
      </figure>

      <p v-else-if="block.type === 'link'" class="article-body__link-row">
        <NuxtLink v-if="isInternalLink(sanitizeHref(block.href))" :to="sanitizeHref(block.href)">
          {{ block.text }}
        </NuxtLink>
        <a
          v-else
          :href="sanitizeHref(block.href)"
          :rel="isExternalWebLink(sanitizeHref(block.href)) ? 'noopener noreferrer' : undefined"
          :target="isExternalWebLink(sanitizeHref(block.href)) ? '_blank' : undefined"
        >
          {{ block.text }}
        </a>
      </p>
    </template>
  </div>
</template>

<style scoped>
.article-body {
  display: grid;
  gap: 1rem;
}

.article-body__paragraph,
.article-body__list,
.article-body__quote,
.article-body__link-row {
  font-size: clamp(1rem, 1.7vw, 1.125rem);
  line-height: 1.8;
}

.article-body__heading {
  margin: 0.75rem 0 0;
  font-family: var(--font-display);
  line-height: 1.2;
}

.article-body__heading:is(h2) {
  font-size: clamp(1.55rem, 2.8vw, 2rem);
}

.article-body__heading:is(h3) {
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
}

.article-body__quote {
  margin: 0;
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--color-primary-soft);
  border-radius: var(--radius-sm);
  background: var(--color-surface-muted);
}

.article-body__quote blockquote {
  margin: 0;
}

.article-body__quote figcaption {
  margin-top: 0.45rem;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.article-body__list {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: 0.5rem;
}

.article-body__image {
  margin: 0;
  display: grid;
  gap: 0.45rem;
}

.article-body__image img {
  width: 100%;
  border-radius: var(--radius-md);
}

.article-body__image figcaption {
  color: var(--color-text-muted);
  font-size: 0.92rem;
}

.article-body__link-row a {
  font-weight: 600;
}
</style>