<script setup lang="ts">
import type { Category } from '~/types/content'

defineProps<{
  stops: Category[]
}>()
</script>

<template>
  <section aria-labelledby="home-journey-title" class="rounded-2xl border border-[#dbe4da] bg-[#fffefa] p-6 md:p-8">
    <h2 id="home-journey-title" class="text-2xl font-semibold text-[#34443a] md:text-3xl">A gentle journey through topics</h2>
    <p class="mt-2 max-w-3xl text-base text-[#637169]">
      A small map-style route to discover stories, one quiet stop at a time.
    </p>

    <ol class="mt-6 grid gap-4 md:grid-cols-2">
      <li
        v-for="(stop, index) in stops"
        :key="stop.slug"
        class="relative rounded-xl border border-[#dbe4da] bg-[#f4f7f1] p-4"
      >
        <span
          aria-hidden="true"
          class="absolute -left-2 top-1/2 hidden h-px w-4 border-t-2 border-dashed border-[#8fbf9f] md:block"
          v-if="index > 0"
        />
        <p class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#e9a36a] text-xs font-semibold text-white">
          {{ index + 1 }}
        </p>
        <h3 class="mt-2 text-lg font-semibold text-[#34443a]">{{ stop.label }}</h3>
        <p class="mt-1 text-sm leading-relaxed text-[#637169]">{{ stop.description }}</p>
        <NuxtLink :to="`/blog?category=${stop.slug}`" class="mt-3 inline-flex text-sm font-semibold text-[#477a5b] hover:underline">
          Visit {{ stop.label }} →
        </NuxtLink>
      </li>
    </ol>
  </section>
</template>
