export type CategorySlug = 'travel' | 'experiences' | 'marketing' | 'books' | 'life'

export interface Category {
  slug: CategorySlug
  label: string
  description: string
  navVisible: boolean
  journeyVisible: boolean
}

export interface ContentImage {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'image'; image: ContentImage }
  | { type: 'link'; text: string; href: string }

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: CategorySlug
  publishedAt: string
  readingTimeMinutes?: number
  cover: ContentImage
  featured: boolean
  blocks: ArticleBlock[]
}

export interface Profile {
  displayName: string
  shortBio: string
  aboutParagraphs: string[]
  interests: string[]
  email?: string
  socialLinks?: Array<{ label: string; href: string }>
  portrait?: ContentImage
}

export interface NavigationItem {
  label: string
  to: string
  exact?: boolean
}
