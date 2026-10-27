<script setup lang="ts">
import { CATEGORIES } from '~/data/categories'
import { DUMMY_IMAGES } from '~/data/images'
import { PROFILE } from '~/data/profile'

const topics = CATEGORIES.filter((category) => category.navVisible)
const moments = [0, 1, 2, 0].map((i) => DUMMY_IMAGES[i % DUMMY_IMAGES.length] as string)

const journey = [
  { title: 'Travel', text: 'Explore the world and different cultures, one slow trip at a time.' },
  { title: 'Learn', text: 'Always curious, always growing through books and everyday experiences.' },
  { title: 'Create', text: 'Share stories and ideas through writing, marketing notes and small projects.' }
]

useSeoMeta({
  title: 'About | Vy’s World',
  description: 'A little introduction to Vy’s personal journal and the stories shared here.'
})
</script>

<template>
  <div class="about-page">
    <section class="about-hero" aria-labelledby="about-title">
      <div v-reveal class="about-hero__art">
        <span class="about-hero__blob" aria-hidden="true" />
        <img src="/images/loading-avatar.png" alt="Line illustration of Vy" />
      </div>

      <div v-reveal="150" class="about-hero__copy">
        <p class="eyebrow">About me</p>
        <h1 id="about-title">Hi, I’m {{ PROFILE.displayName }}.</h1>
        <p class="about-hero__lead">{{ PROFILE.shortBio }}</p>
        <ul class="about-hero__chips" aria-label="Interests">
          <li v-for="interest in PROFILE.interests" :key="interest">{{ interest }}</li>
        </ul>
        <NuxtLink class="about-link" to="/blog">Browse the stories <span aria-hidden="true">→</span></NuxtLink>
      </div>
    </section>

    <section class="about-section" aria-labelledby="journey-title">
      <h2 id="journey-title" v-reveal class="about-section__title">My Journey</h2>
      <ol class="about-journey">
        <li v-for="(step, index) in journey" :key="step.title" v-reveal="index * 120">
          <span class="about-journey__mark" aria-hidden="true">{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      </ol>
    </section>

    <section class="about-section" aria-labelledby="topics-title">
      <h2 id="topics-title" v-reveal class="about-section__title">What you’ll find here</h2>
      <nav class="about-topics" aria-label="Journal topics">
        <NuxtLink
          v-for="(topic, index) in topics"
          :key="topic.slug"
          v-reveal="index * 100"
          class="about-topic"
          :to="`/blog?category=${topic.slug}`"
        >
          <strong>{{ topic.label }}</strong>
          <span>{{ topic.description }}</span>
        </NuxtLink>
      </nav>
    </section>

    <section class="about-section" aria-labelledby="moments-title">
      <h2 id="moments-title" v-reveal class="about-section__title">My Favorite Moments</h2>
      <ul class="about-moments">
        <li v-for="(src, index) in moments" :key="index" v-reveal="index * 100">
          <img :src="src" alt="A favorite moment from Vy’s journeys" loading="lazy" />
        </li>
      </ul>
    </section>

    <section v-reveal class="about-cta">
      <h2>Good stories are better shared.</h2>
      <NuxtLink class="about-button" to="/contact">Say hello <span aria-hidden="true">→</span></NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  display: grid;
  gap: clamp(2rem, 4vw, 3.25rem);
  padding-block: 0.5rem clamp(1.5rem, 3vw, 2.5rem);
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.about-hero {
  display: grid;
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: center;
  padding: clamp(1.25rem, 3vw, 2.5rem);
  border-radius: var(--radius-lg);
  background: linear-gradient(160deg, var(--color-tint-2), var(--color-sky-tint));
}

.about-hero__art {
  position: relative;
  display: grid;
  place-items: end center;
  min-height: 300px;
}

.about-hero__blob {
  position: absolute;
  inset: 6% 8% 0;
  border-radius: 48% 52% 44% 56% / 55% 45% 55% 45%;
  background: color-mix(in srgb, var(--color-surface) 65%, transparent);
  animation: blob 12s ease-in-out infinite alternate;
}

.about-hero__art img {
  position: relative;
  width: min(320px, 85%);
  mix-blend-mode: multiply;
  animation: float-y 6s ease-in-out infinite;
}

.about-hero h1 {
  margin: 0;
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  line-height: 1.05;
}

.about-hero__lead {
  max-width: 48ch;
  margin-top: 1rem;
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.75;
}

.about-hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.25rem 0 0;
  padding: 0;
  list-style: none;
}

.about-hero__chips li {
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-surface) 80%, transparent);
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 500;
}

.about-link,
.about-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  color: var(--color-primary);
  font-weight: 700;
  text-decoration: none;
  transition: gap 250ms var(--ease-soft), transform 250ms var(--ease-soft);
}

.about-link:hover {
  gap: 0.8rem;
}

.about-section__title {
  margin: 0 0 1.25rem;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.about-journey {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-journey li,
.about-topic {
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition: transform 350ms var(--ease-soft), box-shadow 350ms var(--ease-soft);
}

.about-journey li:hover,
.about-topic:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-soft);
}

.about-journey__mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 50%;
  background: var(--color-accent-warm);
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 700;
}

.about-journey h3 {
  margin: 0.75rem 0 0.35rem;
  font-size: 1.25rem;
}

.about-journey p,
.about-topic span {
  color: var(--color-text-muted);
  font-size: 0.92rem;
  line-height: 1.6;
}

.about-topics {
  display: grid;
  gap: 1rem;
}

.about-topic {
  display: grid;
  gap: 0.3rem;
  color: inherit;
  text-decoration: none;
}

.about-topic strong {
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: 1.2rem;
}

.about-moments {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-moments li {
  overflow: hidden;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.about-moments img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 700ms var(--ease-soft);
}

.about-moments li:hover img {
  transform: scale(1.08);
}

.about-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: var(--radius-lg);
  background: var(--color-tint-2);
}

.about-cta h2 {
  max-width: 20ch;
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
}

.about-button {
  justify-content: center;
  margin: 0;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  background: var(--color-primary);
  color: #fff;
}

.about-button:hover {
  color: #fff;
  transform: translateY(-3px);
}

@keyframes blob {
  to { border-radius: 56% 44% 52% 48% / 44% 56% 44% 56%; }
}

@keyframes float-y {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (min-width: 768px) {
  .about-hero {
    grid-template-columns: 0.9fr 1.1fr;
  }

  .about-journey {
    grid-template-columns: repeat(3, 1fr);
  }

  .about-topics,
  .about-moments {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
