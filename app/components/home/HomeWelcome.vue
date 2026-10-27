<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section aria-labelledby="home-welcome-title" class="rounded-2xl bg-[#f4f7f1] p-6 md:p-8">
    <h2 id="home-welcome-title" class="text-2xl font-semibold text-[#34443a] md:text-3xl">{{ title }}</h2>
    <p class="mt-3 max-w-3xl text-base leading-relaxed text-[#56635b] md:text-lg">{{ description }}</p>
  </section>
</template>
