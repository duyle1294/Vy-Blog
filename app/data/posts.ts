import type { Post } from '~/types/content'
import { DUMMY_IMAGES } from '~/data/images'

export const POSTS: Post[] = [
  {
    slug: 'a-morning-walk-in-da-lat',
    title: 'A Morning Walk in Da Lat',
    excerpt: 'Fog, pine trees, and a slow walk that reset my week.',
    category: 'travel',
    publishedAt: '2026-09-20',
    readingTimeMinutes: 6,
    featured: true,
    cover: {
      src: DUMMY_IMAGES[0],
      alt: 'Pine trees on a misty Da Lat morning road',
      caption: 'Early light and cool air in Da Lat.'
    },
    blocks: [
      { type: 'paragraph', text: 'I started at 6AM when the streets were still mostly quiet.' },
      { type: 'heading', level: 2, text: 'Small details I noticed' },
      { type: 'list', items: ['Fresh bread smell from a corner bakery', 'Tiny flower stalls opening one by one', 'Morning mist lifting from pine hills'] },
      { type: 'quote', text: 'Travel does not need to be far to feel new.' },
      {
        type: 'image',
        image: {
          src: DUMMY_IMAGES[1],
          alt: 'Local bakery with warm lights in early morning',
          caption: 'A bakery stop before the uphill road.'
        }
      },
      { type: 'link', text: 'Back to stories', href: '/blog' }
    ]
  },
  {
    slug: 'building-a-gentle-weekly-rhythm',
    title: 'Building a Gentle Weekly Rhythm',
    excerpt: 'A practical way to balance deep work and rest.',
    category: 'experiences',
    publishedAt: '2026-09-11',
    readingTimeMinutes: 5,
    featured: true,
    cover: {
      src: DUMMY_IMAGES[2],
      alt: 'Notebook and coffee on a wooden desk'
    },
    blocks: [
      { type: 'paragraph', text: 'I now plan my week around energy, not just tasks.' },
      { type: 'heading', level: 2, text: 'What changed' },
      { type: 'list', ordered: true, items: ['One anchor goal each day', 'One offline block each evening', 'One no-plan half day on weekend'] }
    ]
  },
  {
    slug: 'writing-clearer-brand-stories',
    title: 'Writing Clearer Brand Stories',
    excerpt: 'Simple messaging beats complicated cleverness every time.',
    category: 'marketing',
    publishedAt: '2026-08-30',
    featured: false,
    cover: {
      src: DUMMY_IMAGES[0],
      alt: 'Open laptop with notes about brand storytelling'
    },
    blocks: [
      { type: 'paragraph', text: 'A clear sentence can save weeks of campaign confusion.' }
    ]
  },
  {
    slug: 'three-books-for-slower-thinking',
    title: 'Three Books for Slower Thinking',
    excerpt: 'Books that help me think with more patience and depth.',
    category: 'books',
    publishedAt: '2026-08-17',
    featured: false,
    cover: {
      src: DUMMY_IMAGES[1],
      alt: 'Stack of books with soft daylight on a table'
    },
    blocks: [{ type: 'paragraph', text: 'I revisit these titles whenever life feels too noisy.' }]
  },
  {
    slug: 'a-short-note-on-personal-growth',
    title: 'A Short Note on Personal Growth',
    excerpt: 'Consistency is quiet, and that is exactly why it works.',
    category: 'life',
    publishedAt: '2026-08-09',
    featured: false,
    cover: {
      src: DUMMY_IMAGES[2],
      alt: 'Open journal with handwritten notes'
    },
    blocks: [{ type: 'paragraph', text: 'Small promises kept daily become identity over time.' }]
  },
  {
    slug: 'one-day-food-trail-in-hue',
    title: 'One-Day Food Trail in Hue',
    excerpt: 'A simple route for discovering flavors without rushing.',
    category: 'travel',
    publishedAt: '2026-07-26',
    readingTimeMinutes: 7,
    featured: false,
    cover: {
      src: DUMMY_IMAGES[0],
      alt: 'Street food stall in Hue during late afternoon'
    },
    blocks: [{ type: 'paragraph', text: 'I planned only three stops and left room for surprises.' }]
  },
  {
    slug: 'slow-mornings-by-the-lake',
    title: 'Slow Mornings by the Lake',
    excerpt: 'Coffee, mist on the water, and nowhere to be.',
    category: 'travel',
    publishedAt: '2026-07-12',
    readingTimeMinutes: 6,
    featured: true,
    cover: {
      src: DUMMY_IMAGES[0],
      alt: 'Calm lake at sunrise with soft mist'
    },
    blocks: [
      { type: 'paragraph', text: 'Coffee, mist on the water, and nowhere to be. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'what-i-learned-from-a-failed-campaign',
    title: 'What I Learned from a Failed Campaign',
    excerpt: 'Notes on listening first and launching second.',
    category: 'marketing',
    publishedAt: '2026-07-03',
    readingTimeMinutes: 5,
    featured: true,
    cover: {
      src: DUMMY_IMAGES[1],
      alt: 'Notebook with campaign sketches'
    },
    blocks: [
      { type: 'paragraph', text: 'Notes on listening first and launching second. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'the-book-i-keep-lending-out',
    title: 'The Book I Keep Lending Out',
    excerpt: 'A small story about a paperback that travels more than I do.',
    category: 'books',
    publishedAt: '2026-06-24',
    readingTimeMinutes: 4,
    featured: true,
    cover: {
      src: DUMMY_IMAGES[2],
      alt: 'Worn paperback on a sunny windowsill'
    },
    blocks: [
      { type: 'paragraph', text: 'A small story about a paperback that travels more than I do. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'a-weekend-without-a-phone',
    title: 'A Weekend Without a Phone',
    excerpt: 'What I noticed when the screen stayed in the drawer.',
    category: 'experiences',
    publishedAt: '2026-06-15',
    readingTimeMinutes: 5,
    featured: true,
    cover: {
      src: DUMMY_IMAGES[0],
      alt: 'Hands holding a cup of tea outdoors'
    },
    blocks: [
      { type: 'paragraph', text: 'What I noticed when the screen stayed in the drawer. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'chasing-waterfalls-in-the-north',
    title: 'Chasing Waterfalls in the North',
    excerpt: 'Mud, moss, and the sound of water that clears the head.',
    category: 'travel',
    publishedAt: '2026-06-02',
    readingTimeMinutes: 8,
    featured: false,
    cover: {
      src: DUMMY_IMAGES[1],
      alt: 'Waterfall surrounded by green forest'
    },
    blocks: [
      { type: 'paragraph', text: 'Mud, moss, and the sound of water that clears the head. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'small-rituals-for-a-calmer-week',
    title: 'Small Rituals for a Calmer Week',
    excerpt: 'Five tiny habits that keep my days soft around the edges.',
    category: 'life',
    publishedAt: '2026-05-21',
    readingTimeMinutes: 4,
    featured: false,
    cover: {
      src: DUMMY_IMAGES[2],
      alt: 'Desk with a plant and a notebook'
    },
    blocks: [
      { type: 'paragraph', text: 'Five tiny habits that keep my days soft around the edges. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'reading-by-the-window',
    title: 'Reading by the Window',
    excerpt: 'Why the best reading spot is usually the simplest one.',
    category: 'books',
    publishedAt: '2026-05-10',
    readingTimeMinutes: 3,
    featured: false,
    cover: {
      src: DUMMY_IMAGES[0],
      alt: 'Chair beside a bright window'
    },
    blocks: [
      { type: 'paragraph', text: 'Why the best reading spot is usually the simplest one. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  },
  {
    slug: 'a-brand-is-a-promise',
    title: 'A Brand Is a Promise',
    excerpt: 'Thinking about trust before logos, colors, or slogans.',
    category: 'marketing',
    publishedAt: '2026-04-28',
    readingTimeMinutes: 5,
    featured: false,
    cover: {
      src: DUMMY_IMAGES[1],
      alt: 'Sketchbook with brand notes'
    },
    blocks: [
      { type: 'paragraph', text: 'Thinking about trust before logos, colors, or slogans. This is sample copy that will be replaced with Vy\u2019s own story.' },
      { type: 'heading', level: 2, text: 'A few thoughts' },
      { type: 'paragraph', text: 'Slow down, notice the details, and write down what stays with you.' },
      { type: 'quote', text: 'Small moments are the ones we remember longest.' }
    ]
  }
]
