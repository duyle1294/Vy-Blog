<script setup lang="ts">
import type { Profile } from '~/types/content'

defineProps<{
  profile: Profile
}>()
</script>

<template>
  <section aria-labelledby="home-about-title" class="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 md:p-8">
    <h2 id="home-about-title" class="text-2xl font-semibold text-[color:var(--color-text)] md:text-3xl">About Vy</h2>
    <p class="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--color-text-muted)]">{{ profile.shortBio }}</p>
    <NuxtLink
      to="/about"
      class="mt-4 inline-flex w-fit items-center rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] transition hover:bg-[color:var(--color-surface-muted)]"
    >
      Read more about Vy
    </NuxtLink>
  </section>
</template>
