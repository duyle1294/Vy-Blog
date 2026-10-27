import type { Category, NavigationItem } from '~/types/content'

export const CATEGORIES: Category[] = [
  {
    slug: 'travel',
    label: 'Travel',
    description: 'Notes from places, tiny routes, and moments on the road.',
    navVisible: true,
    journeyVisible: true
  },
  {
    slug: 'experiences',
    label: 'Experiences',
    description: 'Life lessons and gentle reflections from daily living.',
    navVisible: true,
    journeyVisible: true
  },
  {
    slug: 'marketing',
    label: 'Marketing',
    description: 'Simple thoughts on storytelling, content, and strategy.',
    navVisible: true,
    journeyVisible: true
  },
  {
    slug: 'books',
    label: 'Books',
    description: 'Books that leave a warm and useful aftertaste.',
    navVisible: true,
    journeyVisible: true
  },
  {
    slug: 'life',
    label: 'Life',
    description: 'Quiet life updates and seasonal notes.',
    navVisible: false,
    journeyVisible: false
  }
]

export const PRIMARY_NAVIGATION: NavigationItem[] = [
  { label: 'Home', to: '/', exact: true },
  { label: 'About', to: '/about', exact: true },
  { label: 'Travel', to: '/blog?category=travel' },
  { label: 'Experiences', to: '/blog?category=experiences' },
  { label: 'Marketing', to: '/blog?category=marketing' },
  { label: 'Books', to: '/blog?category=books' },
  { label: 'Contact', to: '/contact', exact: true }
]

export const FOOTER_NAVIGATION: NavigationItem[] = [
  { label: 'Home', to: '/', exact: true },
  { label: 'Blog', to: '/blog', exact: true },
  { label: 'About', to: '/about', exact: true },
  { label: 'Contact', to: '/contact', exact: true }
]
