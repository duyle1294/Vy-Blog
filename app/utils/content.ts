import { CATEGORIES } from '~/data/categories'
import { POSTS } from '~/data/posts'
import type { CategorySlug, Post } from '~/types/content'

type FilterParams = {
  category?: string | null
  query?: string | null
}

export const ALL_CATEGORIES_VALUE = 'all'

export function normalizeCategory(value?: string | null): CategorySlug | typeof ALL_CATEGORIES_VALUE {
  if (!value) {
    return ALL_CATEGORIES_VALUE
  }

  const normalized = value.toLowerCase().trim()
  if (normalized === ALL_CATEGORIES_VALUE) {
    return ALL_CATEGORIES_VALUE
  }

  const category = CATEGORIES.find((item) => item.slug === normalized)
  return category ? category.slug : ALL_CATEGORIES_VALUE
}

export function getCategoryLabel(slug: CategorySlug): string {
  const category = CATEGORIES.find((item) => item.slug === slug)
  return category?.label ?? slug
}

export function formatDate(dateString: string, locale = 'en-US'): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function getSortedPosts(posts: Post[] = POSTS): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getFeaturedPosts(limit = 4): Post[] {
  return getSortedPosts(POSTS)
    .filter((post) => post.featured)
    .slice(0, limit)
}

export function filterPosts({ category, query }: FilterParams, source: Post[] = POSTS): Post[] {
  const normalizedCategory = normalizeCategory(category)
  const normalizedQuery = query?.trim().toLowerCase() ?? ''

  return getSortedPosts(source).filter((post) => {
    const categoryMatches = normalizedCategory === ALL_CATEGORIES_VALUE || post.category === normalizedCategory
    if (!categoryMatches) {
      return false
    }

    if (!normalizedQuery) {
      return true
    }

    const searchText = [post.title, post.excerpt, getCategoryLabel(post.category)].join(' ').toLowerCase()
    return searchText.includes(normalizedQuery)
  })
}

export function getPostBySlug(slug: string, source: Post[] = POSTS): Post | undefined {
  return source.find((post) => post.slug === slug)
}

export function sanitizeHref(href: string): string {
  if (href.startsWith('/')) {
    return href
  }

  if (href.startsWith('mailto:')) {
    return href
  }

  if (href.startsWith('https://')) {
    return href
  }

  return '/'
}
