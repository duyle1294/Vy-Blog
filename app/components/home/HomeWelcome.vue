<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section aria-labelledby="home-welcome-title" class="rounded-2xl bg-[color:var(--color-surface-muted)] p-6 md:p-8">
    <h2 id="home-welcome-title" class="text-2xl font-semibold text-[color:var(--color-text)] md:text-3xl">{{ title }}</h2>
    <p class="mt-3 max-w-3xl text-base leading-relaxed text-[color:var(--color-text-muted)] md:text-lg">{{ description }}</p>
  </section>
</template>
