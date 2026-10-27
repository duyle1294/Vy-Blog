<script setup lang="ts">
defineProps<{
  quote: string
  imageSrc: string
  imageAlt: string
}>()
</script>

<template>
  <section aria-labelledby="home-hero-title" class="grid gap-6 rounded-2xl border border-[#dbe4da] bg-[#fffefa] p-5 shadow-sm md:grid-cols-2 md:p-8">
    <div class="flex flex-col justify-center gap-4">
      <p class="inline-flex w-fit rounded-full bg-[#f4d98b]/40 px-3 py-1 text-sm font-medium text-[#34443a]">
        Vy’s personal journal
      </p>
      <h1 id="home-hero-title" class="text-3xl font-semibold leading-tight text-[#34443a] md:text-4xl">
        A calm place to read, reflect, and explore.
      </h1>
      <p class="text-lg leading-relaxed text-[#56635b]">“{{ quote }}”</p>
      <NuxtLink
        to="/blog"
        class="inline-flex w-fit items-center rounded-full border border-[#477a5b] px-5 py-2 text-sm font-semibold text-[#477a5b] transition hover:bg-[#477a5b] hover:text-white"
      >
        Explore stories
      </NuxtLink>
    </div>

    <figure class="overflow-hidden rounded-xl border border-[#dbe4da] bg-[#f4f7f1]">
      <img :src="imageSrc" :alt="imageAlt" class="h-full min-h-[220px] w-full object-cover" />
    </figure>
  </section>
</template>
