<script setup lang="ts">
import { CATEGORIES } from '~/data/categories'
import { PROFILE } from '~/data/profile'
import ThemeSwitcher from '~/components/layout/ThemeSwitcher.vue'
import { DUMMY_IMAGES, pickDummyImage } from '~/data/images'
import { formatDate, getFeaturedPosts } from '~/utils/content'
import type { CategorySlug } from '~/types/content'

const route = useRoute()
const isHeroMenuOpen = ref(false)

const heroNavItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Travel', to: '/blog?category=travel' },
  { label: 'Experiences', to: '/blog?category=experiences' },
  { label: 'Marketing', to: '/blog?category=marketing' },
  { label: 'Books', to: '/blog?category=books' },
  { label: 'Contact', to: '/contact' }
] as const

const journeyStops = computed(() =>
  CATEGORIES.filter((category) => ['travel', 'experiences', 'books', 'marketing'].includes(category.slug))
)
const featuredPosts = computed(() => getFeaturedPosts(6))
const galleryImages = [0, 1, 2, 3, 4, 5].map((i) => DUMMY_IMAGES[i % DUMMY_IMAGES.length] as string)

const track = ref<HTMLElement | null>(null)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function slide(direction: 1 | -1) {
  const el = track.value
  if (!el) return
  const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
  if (direction === 1 && atEnd) {
    el.scrollTo({ left: 0, behavior: 'smooth' })
  } else if (direction === -1 && el.scrollLeft <= 4) {
    el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
  } else {
    el.scrollBy({ left: direction * (step + 24), behavior: 'smooth' })
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => {
    if (!paused.value) slide(1)
  }, 4500)
})
onBeforeUnmount(() => clearInterval(timer))

function boardLabel(slug: CategorySlug): string {
  if (slug === 'travel') return 'Traveling'
  if (slug === 'experiences') return 'Experiences'
  if (slug === 'books') return 'Books'
  if (slug === 'marketing') return 'Marketing'
  return 'Stories'
}

function boardDescription(slug: CategorySlug): string {
  if (slug === 'travel') return 'Roads, runways and the miles in between.'
  if (slug === 'experiences') return 'Small lessons from everyday adventures.'
  if (slug === 'books') return 'Pages and stories worth revisiting.'
  if (slug === 'marketing') return 'Ideas, campaigns and creative notes.'
  return 'Stories from daily life and meaningful moments.'
}

function boardStopClass(slug: CategorySlug): string {
  if (slug === 'travel') return 'board-stop--travel'
  if (slug === 'experiences') return 'board-stop--experiences'
  if (slug === 'books') return 'board-stop--books'
  if (slug === 'marketing') return 'board-stop--marketing'
  return ''
}

function isHeroActive(to: string): boolean {
  const [path = '/', queryString] = to.split('?')
  if (route.path !== path) {
    return false
  }

  if (!queryString) {
    return route.path === path
  }

  const params = new URLSearchParams(queryString)
  const category = params.get('category')
  return route.query.category === category
}

watch(
  () => route.fullPath,
  () => {
    isHeroMenuOpen.value = false
  }
)

useSeoMeta({
  title: 'Vy’s World — A little green garden',
  description:
    'Vy’s World — stories, experiences, ideas and small moments worth remembering.'
})
</script>

<template>
  <div class="home-shell">
    <section class="hero-board" aria-labelledby="hero-title">
      <div class="hero-board-bg" aria-hidden="true">
        <img src="/images/home/1hero-images.png" alt="" />
      </div>

      <header class="hero-header">
        <NuxtLink class="hero-brand" to="/" aria-label="Vy's World home">Vy<span>’s</span> World</NuxtLink>

        <button
          type="button"
          class="hero-menu-toggle"
          :aria-expanded="isHeroMenuOpen"
          aria-controls="hero-site-menu"
          :aria-label="isHeroMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          @click="isHeroMenuOpen = !isHeroMenuOpen"
        >
          <span class="sr-only">Toggle navigation</span>
          <i />
          <i />
        </button>

        <nav id="hero-site-menu" class="hero-nav" :class="{ 'is-open': isHeroMenuOpen }" aria-label="Primary navigation">
          <NuxtLink
            v-for="item in heroNavItems"
            :key="item.to"
            :to="item.to"
            :class="{ 'is-active': isHeroActive(item.to) }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <ThemeSwitcher class="hero-theme" />
      </header>

      <div class="hero-content">
        <h1 id="hero-title" class="wind-text">
          <span class="wind-word" style="--wind-delay: 0s">Be</span>
          <span class="wind-word" style="--wind-delay: 0.4s">your</span><br />
          <span class="wind-word wind-word--accent" style="--wind-delay: 0.8s">authentic</span>
          <span class="wind-word" style="--wind-delay: 1.2s">self.</span>
        </h1>
        <a class="scroll-note" href="#board">Let’s share stories</a>
      </div>

      <p class="hero-caption wind-text">
        <span class="wind-word" style="--wind-delay: 0.2s">be</span>
        <span class="wind-word" style="--wind-delay: 0.5s">kind</span>
        <span class="wind-word" style="--wind-delay: 0.8s">and</span>
        <span class="wind-word" style="--wind-delay: 1.1s">have</span>
        <span class="wind-word" style="--wind-delay: 1.4s">courage</span>
      </p>

    </section>

    <section id="board" class="board-section" aria-labelledby="board-title">
      <div v-reveal class="board" aria-labelledby="board-title">
        <div class="board-bg" aria-hidden="true">
          <img src="/images/home/2boar-images.png" alt="" />
        </div>
        <p class="eyebrow board-caption">A little route through Vy’s world</p>
        <h2 id="board-title" class="board-title">Get on board</h2>
        <span class="board-plane" aria-hidden="true">✈</span>
        <svg class="board-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M15,28 C3,48 42,42 58,33 C80,29 60,62 52,61 C12,84 30,88 48,90 C51,90 60,90 69,66 C69,42 88,40 72,90" />
        </svg>

        <NuxtLink
          v-for="stop in journeyStops"
          :key="stop.slug"
          class="board-stop"
          :class="boardStopClass(stop.slug)"
          :to="`/blog?category=${stop.slug}`"
        >
          <span class="board-pin" aria-hidden="true" />
          <span class="board-photo">
            <img :src="pickDummyImage(stop.slug)" :alt="`${stop.label} stories illustration`" />
          </span>
          <span class="board-tag">
            <span class="board-label">{{ boardLabel(stop.slug) }}</span>
            <span class="board-desc">{{ boardDescription(stop.slug) }}</span>
          </span>
        </NuxtLink>
      </div>
    </section>

    <section id="welcome" class="home-section">
      <div class="home-page-shell welcome">
        <div v-reveal class="welcome-art">
          <span class="welcome-blob" aria-hidden="true" />
          <img src="/images/vy-portrait.png" alt="Line illustration of Vy" />
        </div>
        <div v-reveal="150" class="welcome-copy">
          <p class="eyebrow">A little about me</p>
          <h2>Welcome to my little garden.</h2>
          <p>
            I’m {{ PROFILE.displayName }}. {{ PROFILE.shortBio }} Stay a while, take a breath, and follow
            whatever feels interesting.
          </p>
          <NuxtLink class="text-link" to="/about">Discover more <span aria-hidden="true">→</span></NuxtLink>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="home-page-shell">
        <div v-reveal class="section-heading">
          <p class="eyebrow">Fresh from the garden</p>
          <h2 class="display">Latest stories</h2>
          <p>Notes from trips, shelves, workdays and all the in-between moments.</p>
        </div>

        <div class="slider" role="region" aria-roledescription="carousel" aria-label="Latest stories" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
          <div ref="track" class="post-grid slider-track" tabindex="0">
            <article v-for="post in featuredPosts" :key="post.slug" class="post-card">
              <NuxtLink class="post-image" :to="`/blog/${post.slug}`" :aria-label="`Read ${post.title}`">
                <img :src="post.cover.src" :alt="post.cover.alt" loading="lazy" />
              </NuxtLink>
              <div class="post-card-body">
                <p class="eyebrow">{{ boardLabel(post.category) }}</p>
                <h3>
                  <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
                </h3>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <div class="post-meta">
                  <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
                  <NuxtLink :to="`/blog/${post.slug}`">Read story <span aria-hidden="true">→</span></NuxtLink>
                </div>
              </div>
            </article>
          </div>
          <div class="slider-controls">
            <button type="button" aria-label="Previous stories" @click="slide(-1)">←</button>
            <button type="button" aria-label="Next stories" @click="slide(1)">→</button>
          </div>
        </div>

        <p class="stories-link-wrap">
          <NuxtLink class="text-link" to="/blog">See all stories <span aria-hidden="true">→</span></NuxtLink>
        </p>
      </div>
    </section>
    
    <section class="home-section home-topics-section" aria-labelledby="home-topics-title">
      <div class="home-page-shell">
        <div v-reveal class="section-heading">
          <p class="eyebrow">Find your next read</p>
          <h2 id="home-topics-title" class="display">Explore by topic</h2>
        </div>
        <nav class="home-topic-list" aria-label="Explore story topics">
          <NuxtLink
            v-for="(category, index) in journeyStops"
            :key="category.slug"
            v-reveal="index * 100"
            class="home-topic-link"
            :to="`/blog?category=${category.slug}`"
          >
            <span class="home-topic-link__mark" aria-hidden="true">✳</span>
            <span class="home-topic-link__copy">
              <span class="home-topic-link__name">{{ category.label }}</span>
              <span class="home-topic-link__description">{{ category.description }}</span>
            </span>
            <span class="home-topic-link__arrow" aria-hidden="true">↗</span>
          </NuxtLink>
        </nav>
      </div>
    </section>

    <section class="home-section contact-cta">
      <div v-reveal class="home-page-shell">
        <p class="eyebrow">A note is always welcome</p>
        <h2 class="display">Let’s stay connected.</h2>
        <p>Have a story to share, a book to recommend, or simply want to say hello?</p>
        <NuxtLink class="button button--light" to="/contact">Contact me <span aria-hidden="true">&nbsp;→</span></NuxtLink>
      </div>
    </section>

    <section class="home-section gallery-section" aria-labelledby="gallery-title">
      <div class="home-page-shell">
        <div v-reveal class="section-heading">
          <p class="eyebrow">Little moments</p>
          <h2 id="gallery-title" class="display">Gallery</h2>
        </div>
        <ul class="gallery">
          <li v-for="(item, index) in galleryImages" :key="index" v-reveal="index * 80" :class="`gallery-item gallery-item--${index + 1}`">
            <img :src="item" alt="Moment from Vy’s journeys" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-shell {
  width: 100%;
  max-width: 1420px;
  padding-inline: 20px;
  box-sizing: border-box;
  margin-inline: auto;
}

.home-section {
  padding: clamp(32px, 4vw, 52px) 0;
}

/* Entrance animations */
.hero-board-bg img {
  animation: hero-drift 24s ease-in-out infinite alternate;
}

.hero-brand,
.hero-nav a {
  animation: fade-down 700ms var(--ease-soft) both;
}

.hero-nav a:nth-child(2) { animation-delay: 80ms; }
.hero-nav a:nth-child(3) { animation-delay: 160ms; }
.hero-nav a:nth-child(4) { animation-delay: 240ms; }
.hero-nav a:nth-child(5) { animation-delay: 320ms; }
.hero-nav a:nth-child(6) { animation-delay: 400ms; }
.hero-nav a:nth-child(7) { animation-delay: 480ms; }

.hero-content h1 {
  animation: fade-up 1000ms var(--ease-soft) 200ms both;
}

.scroll-note {
  animation: fade-up 900ms var(--ease-soft) 700ms both;
}

.hero-caption {
  animation: fade-up 1000ms var(--ease-soft) 1000ms both;
}

.board-stop {
  transition: transform 400ms var(--ease-soft);
}

.board-stop:hover .board-photo {
  transform: rotate(0deg) scale(1.05);
}

.board-photo {
  transition: transform 500ms var(--ease-soft);
}

.board-pin {
  animation: pin-bob 3.2s ease-in-out infinite;
}

.welcome-art img,
.post-image img {
  transition: transform 800ms var(--ease-soft);
}

.welcome-art:hover img,
.post-card:hover .post-image img {
  transform: scale(1.06);
}

.post-card {
  transition: transform 400ms var(--ease-soft);
}

.post-card:hover {
  transform: translateY(-6px);
}

.post-image {
  border-radius: 20px;
  box-shadow: var(--shadow-card);
}

.button {
  transition: transform 300ms var(--ease-soft), box-shadow 300ms ease;
}

.button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-soft);
}

.home-topic-link__mark {
  transition: transform 500ms var(--ease-soft), background-color 300ms ease;
}

.home-topic-link:hover .home-topic-link__mark {
  transform: rotate(90deg) scale(1.1);
  background: var(--color-accent-warm);
}

.home-topic-link__arrow {
  transition: transform 300ms var(--ease-soft);
}

.home-topic-link:hover .home-topic-link__arrow {
  transform: translate(3px, -3px);
}

@keyframes hero-drift {
  from { transform: scale(1); }
  to { transform: scale(1.05); }
}

@keyframes nudge {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

@keyframes pin-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.display {
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--color-primary);
  font-weight: 700;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.text-link:hover {
  gap: 12px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border: 1px solid var(--color-primary);
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.button--light {
  background: var(--color-surface);
  color: var(--color-primary);
}

.hero-board {
  position: relative;
  width: 100%;
  min-height: 960px;
  overflow: hidden;
  border-radius: 28px;
  background: var(--color-tint-2);
}

.hero-board-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-board-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.hero-header {
  position: absolute;
  z-index: 6;
  top: 0;
  left: 0;
  right: 0;
  width: min(1180px, calc(100% - 48px));
  margin-inline: auto;
  padding: 26px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.hero-brand {
  padding: 8px 22px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-surface) 88%, transparent);
  box-shadow: 0 6px 18px color-mix(in srgb, var(--color-text) 12%, transparent);
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 25px;
  line-height: 1;
  letter-spacing: -0.04em;
  text-decoration: none;
}

.hero-brand span {
  font-style: italic;
}

.hero-nav {
  display: flex;
  align-items: center;
  gap: 26px;
  font-size: 13px;
  font-weight: 600;
}

.hero-nav a {
  color: var(--color-surface);
  text-decoration: none;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.hero-nav a:hover,
.hero-nav a.is-active {
  color: var(--color-accent-warm);
}

.hero-menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  padding: 10px;
  border: 1px solid color-mix(in srgb, var(--color-surface) 70%, transparent);
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface) 82%, transparent);
}

.hero-menu-toggle i {
  display: block;
  width: 19px;
  height: 1.5px;
  margin: 5px auto;
  background: var(--color-text);
}

.hero-content {
  position: absolute;
  z-index: 2;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);
  width: min(1180px, calc(100% - 48px));
  text-align: center;
}

.hero-content h1 {
  margin: 0;
  color: #fff;
  font-family: var(--font-display);
  font-size: clamp(40px, 6vw, 96px);
  line-height: 0.96;
  letter-spacing: -0.03em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
}

.hero-caption {
  position: absolute;
  z-index: 2;
  right: calc(4% + 18px);
  bottom: 18%;
  margin: 0;
  color: var(--color-text);
  font-family: 'Caveat', cursive;
  font-size: clamp(20px, 2.4vw, 30px);
  line-height: 1;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 2px color-mix(in srgb, var(--color-surface) 25%, transparent);
}

.wind-word {
  display: inline-block;
  animation: wind-sway 4.5s ease-in-out infinite;
  animation-delay: var(--wind-delay, 0s);
  transform-origin: 50% 100%;
  margin-right: 12px;
}

.wind-word--accent {
  color: var(--color-accent-warm);
}

@keyframes wind-sway {
  0%,
  100% {
    transform: rotate(-1.6deg) translateY(0);
  }
  50% {
    transform: rotate(1.6deg) translateY(-3px);
  }
}

.scroll-note {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: clamp(20px, 4vw, 46px);
  color: var(--color-text);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.scroll-note::after {
  content: '→';
  color: var(--color-pin);
  font-size: 18px;
}

.board {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 1120px;
  margin-inline: auto;
  border-radius: 0;
  border: 0;
  background: var(--color-warm-tint);
  box-shadow: none;
  overflow: hidden;
}

.board-section {
  position: relative;
  z-index: 5;
  margin-top: -42px;
  padding: 0;
}

.board-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.board-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.board-caption {
  position: absolute;
  z-index: 2;
  top: calc(9% + 12px);
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  color: var(--color-text);
  font-size: clamp(11px, 1.2vw, 14px);
  letter-spacing: 0.08em;
}

.board-title {
  position: absolute;
  z-index: 2;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  width: 100%;
  color: var(--color-text);
  text-align: center;
  font-family: 'Caveat', cursive;
  font-size: clamp(40px, 5.4vw, 66px);
  line-height: 0.95;
  letter-spacing: 0.04em;
}

.board-plane {
  position: absolute;
  z-index: 2;
  top: 18%;
  left: 50%;
  color: var(--color-primary);
  font-size: clamp(24px, 3.8vw, 48px);
  transform: translateX(-50%) rotate(8deg);
  animation: board-float 5s ease-in-out infinite;
}

@keyframes board-float {
  0%,
  100% {
    transform: translateX(-50%) translateY(0) rotate(8deg);
  }
  50% {
    transform: translateX(-50%) translateY(-10px) rotate(8deg);
  }
}

.board-path {
  position: absolute;
  top: 24%;
  left: 6%;
  z-index: 1;
  width: 88%;
  height: 69%;
}

.board-path path {
  fill: none;
  stroke: var(--color-pin);
  stroke-width: 1.5;
  stroke-dasharray: 2 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: roadmap-dash 24s linear infinite;
}

@keyframes roadmap-dash {
  to {
    stroke-dashoffset: -66;
  }
}

.board-stop {
  position: absolute;
  z-index: 2;
  --stop-x: 50%;
  --stop-y: 50%;
  top: var(--stop-y);
  left: var(--stop-x);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(238px, 22vw);
  color: var(--color-text);
  text-align: center;
  text-decoration: none;
  transform: translate(-50%, -84%);
  transition: transform 0.2s ease;
}

.board-stop:hover {
  transform: translate(-50%, calc(-84% - 4px));
}

.board-stop--travel {
  --stop-x: 22%;
  --stop-y: 44%;
}

.board-stop--experiences {
  --stop-x: 64%;
  --stop-y: 44%;
}

.board-stop--books {
  --stop-x: 35%;
  --stop-y: 69%;
}

.board-stop--marketing {
  --stop-x: 69%;
  --stop-y: 86%;
}

.board-pin {
  position: relative;
  z-index: 3;
  order: 3;
  margin-top: 12px;
  width: clamp(34px, 3.5vw, 44px);
  height: clamp(46px, 4.7vw, 56px);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 86'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ff3b5b'/%3E%3Cstop offset='55%25' stop-color='%23e51a43'/%3E%3Cstop offset='100%25' stop-color='%23c90f34'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M32 0c17.7 0 32 13.8 32 30.8 0 20-16.2 30.8-32 55.2C16.2 61.6 0 50.8 0 30.8 0 13.8 14.3 0 32 0Z' fill='url(%23g)'/%3E%3Ccircle cx='32' cy='30' r='11.5' fill='%23fff'/%3E%3Cpath d='M7 29.5C7 14.7 18.2 3.5 32 3.5' fill='none' stroke='%23ff8ca1' stroke-width='4' stroke-linecap='round' opacity='.45'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
  filter: drop-shadow(0 4px 8px rgba(162, 36, 47, 0.28));
}

.board-photo {
  display: block;
  width: min(214px, 100%);
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 7px solid #fff;
  border-radius: 18px;
  box-shadow: 0 12px 20px color-mix(in srgb, var(--color-text) 20%, transparent);
  transform: rotate(-4deg);
}

.board-stop--experiences .board-photo,
.board-stop--marketing .board-photo {
  transform: rotate(4deg);
}

.board-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.board-tag {
  display: flex;
  flex-direction: column;
  order: 2;
  width: 92%;
  gap: 4px;
  margin-top: 8px;
  padding: 6px 10px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--color-surface) 93%, transparent);
  box-shadow: 0 6px 12px color-mix(in srgb, var(--color-text) 12%, transparent);
}

.board-label {
  font-size: clamp(11px, 1.1vw, 14px);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
}

.board-desc {
  font-size: clamp(10px, 0.9vw, 12px);
  line-height: 1.25;
  color: var(--color-text);
}

.welcome {
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(32px, 8vw, 112px);
  align-items: center;
}

.welcome-art {
  min-height: 390px;
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: var(--color-sky-tint);
  box-shadow: var(--shadow-soft);
}

.welcome-art img {
  width: 100%;
  height: 100%;
  min-height: 390px;
  object-fit: cover;
}

.welcome-copy h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  line-height: 1.05;
  letter-spacing: -0.01em;
}

.welcome-copy p {
  max-width: 48ch;
  margin: 1rem 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.75;
}

.section-heading {
  max-width: 640px;
  margin-bottom: 1.5rem;
}

.section-heading p {
  max-width: 52ch;
  margin: 0.5rem 0 0;
  color: var(--color-text-muted);
  font-size: 1rem;
}

.slider-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 8px;
}

.slider-track::-webkit-scrollbar {
  display: none;
}

.slider-track .post-card {
  flex: 0 0 calc((100% - 48px) / 3);
  scroll-snap-align: start;
}

.slider-controls {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.slider-controls button {
  width: 44px;
  height: 44px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 18px;
  cursor: pointer;
  transition: background-color 250ms ease, transform 250ms var(--ease-soft);
}

.slider-controls button:hover {
  background: var(--color-primary);
  color: #fff;
  transform: scale(1.08);
}

.welcome-art {
  display: grid;
  place-items: end center;
  min-height: 380px;
  background: transparent !important;
  box-shadow: none !important;
  overflow: visible !important;
}

.welcome-blob {
  position: absolute;
  inset: 18% 8% 0 0;
  border-radius: 48% 52% 44% 56% / 55% 45% 55% 45%;
  background: linear-gradient(160deg, var(--color-sky-tint), var(--color-tint-2) 90%);
  animation: blob 12s ease-in-out infinite alternate;
}

.welcome-art img {
  position: relative;
  mix-blend-mode: multiply;
  width: min(380px, 100%) !important;
  height: auto !important;
  min-height: 0 !important;
  object-fit: contain !important;
  animation: float-y 6s ease-in-out infinite;
}

.welcome-art:hover img {
  transform: none !important;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: clamp(120px, 16vw, 200px);
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.gallery-item {
  overflow: hidden;
  border-radius: 18px;
  box-shadow: var(--shadow-card);
}

.gallery-item--1 { grid-column: span 2; grid-row: span 2; }
.gallery-item--4 { grid-column: span 2; }

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms var(--ease-soft);
}

.gallery-item:hover img {
  transform: scale(1.08);
}

@keyframes blob {
  to { border-radius: 56% 44% 52% 48% / 44% 56% 44% 56%; }
}

@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (max-width: 1023px) {
  .slider-track .post-card { flex-basis: calc((100% - 24px) / 2); }
}

@media (max-width: 767px) {
  .slider-track .post-card { flex-basis: 86%; }
  .gallery { grid-template-columns: repeat(2, 1fr); }
  .gallery-item--1 { grid-column: span 2; grid-row: span 1; }
  .gallery-item--4 { grid-column: span 1; }
}

.hero-caption,
.scroll-note,
.board-caption,
.board-title {
  -webkit-text-stroke: 5px #fff;
  paint-order: stroke fill;
}

.board-caption,
.scroll-note {
  -webkit-text-stroke-width: 4px;
}

.post-grid-unused {
  display: grid;
}

.post-image {
  display: block;
  position: relative;
  height: auto;
  aspect-ratio: 1.45 / 1;
  overflow: hidden;
  border-radius: 12px;
  background: var(--color-tint);
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-card-body {
  padding: 15px 2px 8px;
}

.post-card h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.25;
  letter-spacing: 0;
}

.post-card h3 a {
  color: var(--color-text);
  text-decoration: none;
}

.post-card h3 a:hover {
  color: var(--color-primary);
}

.post-excerpt {
  margin: 13px 0 18px;
  color: var(--color-text-muted);
  font-size: 14px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--color-text-muted);
  font-size: 12px;
}

.post-meta a {
  color: var(--color-primary);
  font-weight: 700;
}

.stories-link-wrap {
  margin-top: 38px;
  text-align: right;
}

.home-topics-section {
  padding-top: clamp(38px, 5vw, 64px);
  padding-bottom: clamp(54px, 7vw, 90px);
  background: var(--color-surface-muted);
}

.home-topic-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.home-topic-link {
  display: flex;
  min-height: 110px;
  align-items: center;
  gap: 12px;
  padding: 18px 16px;
  border-right: 1px solid var(--color-border);
  color: var(--color-text);
  text-decoration: none;
  transition: background-color 180ms ease;
}

.home-topic-link:first-child {
  border-left: 1px solid var(--color-border);
}

.home-topic-link:hover {
  background: var(--color-surface);
}

.home-topic-link__mark {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  border-radius: 50%;
  background: var(--color-tint);
  color: var(--color-primary);
  font-size: 1rem;
}

.home-topic-link__copy {
  display: grid;
  gap: 3px;
}

.home-topic-link__name {
  font-family: var(--font-display);
  font-size: 1.15rem;
}

.home-topic-link__description {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  line-height: 1.4;
}

.home-topic-link__arrow {
  align-self: flex-start;
  margin-left: auto;
  color: var(--color-primary);
}

.about-preview {
  display: grid;
  grid-template-columns: 0.75fr 1.25fr;
  gap: clamp(28px, 8vw, 110px);
  align-items: center;
}

.about-preview-note {
  display: grid;
  gap: 12px;
  padding: clamp(22px, 3vw, 40px);
  border-left: 3px solid var(--color-primary-soft);
  background: var(--color-surface-muted);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.1;
}

.about-preview-note span {
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  line-height: 1.6;
  text-transform: uppercase;
}

.about-preview h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(43px, 5vw, 66px);
  line-height: 1;
  letter-spacing: -0.025em;
}

.about-preview p {
  max-width: 460px;
  margin: 20px 0 30px;
  color: var(--color-text-muted);
  font-size: 18px;
}

.contact-cta {
  background: var(--color-surface-muted);
  text-align: center;
}

.contact-cta .display {
  color: var(--color-text);
}

.contact-cta p {
  max-width: 460px;
  margin: 20px auto 30px;
  color: var(--color-text);
}

@media (max-width: 1023px) {
  .hero-board {
    min-height: 760px;
  }

  .hero-header {
    width: min(1180px, calc(100% - 36px));
    padding-top: 18px;
  }

  .hero-menu-toggle {
    display: inline-block;
  }

  .hero-nav {
    position: absolute;
    top: 76px;
    right: 0;
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 14px;
    border-radius: 14px;
    background: color-mix(in srgb, var(--color-text) 90%, transparent);
  }

  .hero-nav.is-open {
    display: flex;
  }

  .hero-caption {
    bottom: 7%;
    right: 16px;
  }

  .board-section {
    margin-top: -30px;
    padding-top: 0;
  }

  .board {
    width: min(1100px, calc(100% - 8px));
    min-height: 860px;
  }

  .board-caption {
    top: calc(5% + 12px);
  }

  .board-title {
    top: 10.4%;
  }

  .board-path {
    top: 29%;
    left: 2%;
    width: 96%;
    height: 60%;
  }

  .board-stop {
    width: min(206px, 31vw);
  }

  .board-stop--travel {
    --stop-x: 24%;
    --stop-y: 46%;
  }

  .board-stop--experiences {
    --stop-x: 70%;
    --stop-y: 46%;
  }

  .board-stop--books {
    --stop-x: 33%;
    --stop-y: 71%;
  }

  .board-stop--marketing {
    --stop-x: 69%;
    --stop-y: 87%;
  }

  .post-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .welcome,
  .about-preview {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .home-topic-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .home-topic-link:nth-child(3) {
    border-left: 1px solid var(--color-border);
  }
}

@media (max-width: 767px) {
  .home-shell {
    padding-inline: 12px;
  }

  .home-page-shell {
    width: min(1120px, calc(100% - 2rem));
  }

  .hero-board {
    min-height: 620px;
    border-radius: 14px;
  }

  .hero-header {
    width: calc(100% - 24px);
  }

  .hero-brand {
    font-size: 21px;
    padding: 7px 16px;
  }

  .hero-content {
    top: 30%;
    width: calc(100% - 24px);
  }

  .hero-caption {
    display: none;
  }

  .board-section {
    margin-top: -18px;
    padding-top: 0;
  }

  .board {
    width: calc(100% - 8px);
    min-height: 760px;
    border-radius: 0;
  }

  .board-caption {
    top: calc(5.2% + 12px);
  }

  .board-title {
    top: 11.2%;
    font-size: clamp(36px, 11vw, 52px);
  }

  .board-plane {
    top: 18.2%;
  }

  .board-stop {
    width: min(188px, 70vw);
  }

  .board-path {
    top: 31%;
    left: -8%;
    width: 116%;
    height: 56%;
  }

  .board-stop--travel {
    --stop-x: 28%;
    --stop-y: 48%;
  }

  .board-stop--experiences {
    --stop-x: 72%;
    --stop-y: 48%;
  }

  .board-stop--books {
    --stop-x: 34%;
    --stop-y: 74%;
  }

  .board-stop--marketing {
    --stop-x: 71%;
    --stop-y: 90%;
  }

  .post-grid {
    grid-template-columns: 1fr;
  }

  .home-topic-list {
    grid-template-columns: 1fr;
  }

  .home-topic-link,
  .home-topic-link:first-child,
  .home-topic-link:nth-child(3) {
    min-height: 84px;
    border-right: 1px solid var(--color-border);
    border-left: 1px solid var(--color-border);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wind-word,
  .board-plane,
  .board-path path {
    animation: none !important;
  }
}
</style>
