<script setup lang="ts">
const { theme, themes, setTheme } = useTheme()
const open = ref(false)
const root = ref<HTMLElement | null>(null)

useHead({ htmlAttrs: { 'data-theme': theme } })

function choose(id: (typeof themes)[number]['id']) {
  setTheme(id)
  open.value = false
}

function onDocClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div ref="root" class="theme-switcher">
    <button
      type="button"
      class="theme-switcher__button"
      aria-haspopup="true"
      :aria-expanded="open"
      aria-label="Change color theme"
      @click="open = !open"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.5-1.9-.3-1 .3-2.1 1.4-2.1H17a4 4 0 0 0 4-4c0-5-4-10-9-10Z" />
        <circle cx="7.5" cy="11" r="1" fill="currentColor" />
        <circle cx="11" cy="7.5" r="1" fill="currentColor" />
        <circle cx="16" cy="8.5" r="1" fill="currentColor" />
      </svg>
    </button>

    <ul v-if="open" class="theme-switcher__menu" role="menu" aria-label="Color themes">
      <li v-for="item in themes" :key="item.id" role="none">
        <button
          type="button"
          role="menuitemradio"
          class="theme-switcher__option"
          :class="{ 'is-active': theme === item.id }"
          :aria-checked="theme === item.id"
          @click="choose(item.id)"
        >
          <span class="theme-switcher__swatch" aria-hidden="true">
            <i v-for="color in item.swatch" :key="color" :style="{ background: color }" />
          </span>
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.theme-switcher {
  position: relative;
}

.theme-switcher__button {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-surface) 90%, transparent);
  color: var(--color-primary);
  cursor: pointer;
  transition: transform 300ms var(--ease-soft), background-color 200ms ease;
}

.theme-switcher__button:hover {
  transform: rotate(-12deg) scale(1.08);
  background: var(--color-tint);
}

.theme-switcher__menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 80;
  display: grid;
  min-width: 13.5rem;
  gap: 0.15rem;
  margin: 0;
  padding: 0.4rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  list-style: none;
  animation: fade-up 250ms var(--ease-soft) both;
}

.theme-switcher__option {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0.65rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.88rem;
  text-align: left;
  cursor: pointer;
}

.theme-switcher__option:hover,
.theme-switcher__option.is-active {
  background: var(--color-tint);
}

.theme-switcher__option.is-active {
  font-weight: 600;
}

.theme-switcher__swatch {
  display: inline-flex;
}

.theme-switcher__swatch i {
  width: 0.9rem;
  height: 0.9rem;
  margin-right: -0.25rem;
  border: 2px solid var(--color-surface);
  border-radius: 50%;
}
</style>
