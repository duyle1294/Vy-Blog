<script setup lang="ts">
// Visible from server render (pure CSS animation), hidden once the page and images have loaded.
const done = ref(false)
const gone = ref(false)

onMounted(() => {
  const started = performance.now()
  const MIN_MS = 900
  const MAX_MS = 6000

  const finish = () => {
    const wait = Math.max(0, MIN_MS - (performance.now() - started))
    setTimeout(() => {
      done.value = true
      setTimeout(() => (gone.value = true), 700)
    }, wait)
  }

  if (document.readyState === 'complete') {
    finish()
  } else {
    window.addEventListener('load', finish, { once: true })
    setTimeout(finish, MAX_MS)
  }
})
</script>

<template>
  <div v-if="!gone" class="loader" :class="{ 'is-done': done }" role="status" aria-live="polite">
    <span class="loader__blob loader__blob--1" aria-hidden="true" />
    <span class="loader__blob loader__blob--2" aria-hidden="true" />
    <span class="loader__blob loader__blob--3" aria-hidden="true" />

    <div class="loader__card">
      <div class="loader__ring" aria-hidden="true">
        <img src="/images/loading-avatar.png" alt="" class="loader__portrait" />
      </div>
      <p class="loader__title">Vy’s World</p>
      <p class="loader__text">Watering the garden<span class="loader__dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></p>
      <span class="loader__bar" aria-hidden="true"><span /></span>
      <span class="sr-only">Loading</span>
    </div>

    <span class="loader__leaf loader__leaf--1" aria-hidden="true">🌿</span>
    <span class="loader__leaf loader__leaf--2" aria-hidden="true">🌼</span>
    <span class="loader__leaf loader__leaf--3" aria-hidden="true">☁️</span>
    <span class="loader__leaf loader__leaf--4" aria-hidden="true">✨</span>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: linear-gradient(160deg, var(--color-warm-tint) 0%, var(--color-tint-2) 50%, var(--color-sky-tint) 100%);
  transition: opacity 600ms ease, transform 600ms var(--ease-soft, ease), visibility 600ms;
}

.loader.is-done {
  opacity: 0;
  visibility: hidden;
  transform: scale(1.04);
  pointer-events: none;
}

.loader__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(2px);
  animation: loader-blob 7s ease-in-out infinite alternate;
}

.loader__blob--1 { width: 38vmax; height: 38vmax; top: -10vmax; left: -8vmax; background: color-mix(in srgb, var(--color-accent-warm) 40%, transparent); }
.loader__blob--2 { width: 34vmax; height: 34vmax; bottom: -12vmax; right: -8vmax; background: color-mix(in srgb, var(--color-accent-sky) 53%, transparent); animation-delay: -2s; }
.loader__blob--3 { width: 22vmax; height: 22vmax; bottom: 10vmax; left: 8vmax; background: color-mix(in srgb, var(--color-primary-soft) 33%, transparent); animation-delay: -4s; }

.loader__card {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  width: min(30rem, calc(100vw - 2rem));
  padding: clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3.5rem);
  border-radius: 2.5rem;
  background: color-mix(in srgb, var(--color-surface) 70%, transparent);
  box-shadow: 0 18px 50px color-mix(in srgb, var(--color-primary) 18%, transparent);
  backdrop-filter: blur(6px);
  animation: loader-pop 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.loader__ring {
  position: relative;
  display: grid;
  width: clamp(180px, 32vw, 240px);
  height: clamp(180px, 32vw, 240px);
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--color-primary-soft), var(--color-accent-warm), var(--color-accent-sky), var(--color-accent-coral), var(--color-primary-soft));
  animation: loader-spin 3.2s linear infinite;
}

.loader__ring::before {
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  background: var(--color-surface);
  content: '';
}

.loader__portrait {
  position: relative;
  width: 78%;
  height: 78%;
  object-fit: contain;
  mix-blend-mode: multiply;
  /* counter-rotate so the portrait stays upright while the ring spins */
  animation: loader-spin-reverse 3.2s linear infinite, loader-bob 1.6s ease-in-out infinite;
}

.loader__title {
  margin: 0.9rem 0 0;
  color: var(--color-primary);
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 2.6rem);
  font-weight: 600;
}

.loader__text {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.loader__dots i {
  display: inline-block;
  font-style: normal;
  animation: loader-dot 1.2s ease-in-out infinite;
}

.loader__dots i:nth-child(2) { animation-delay: 0.2s; }
.loader__dots i:nth-child(3) { animation-delay: 0.4s; }

.loader__bar {
  width: min(260px, 80%);
  height: 10px;
  margin-top: 1rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--color-tint);
}

.loader__bar span {
  display: block;
  width: 40%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary-soft), var(--color-accent-warm), var(--color-accent-coral));
  animation: loader-bar 1.4s ease-in-out infinite;
}

.loader__leaf {
  position: absolute;
  font-size: 2rem;
  animation: loader-float 4s ease-in-out infinite;
}

.loader__leaf--1 { top: 18%; left: 20%; }
.loader__leaf--2 { top: 24%; right: 22%; animation-delay: -1s; }
.loader__leaf--3 { bottom: 20%; left: 26%; animation-delay: -2s; }
.loader__leaf--4 { bottom: 26%; right: 24%; animation-delay: -3s; }

@keyframes loader-spin { to { transform: rotate(360deg); } }
@keyframes loader-spin-reverse { to { rotate: -360deg; } }
@keyframes loader-bob { 0%, 100% { translate: 0 0; } 50% { translate: 0 -5px; } }
@keyframes loader-pop { from { opacity: 0; transform: scale(0.8) translateY(12px); } }
@keyframes loader-dot { 0%, 100% { opacity: 0.2; transform: translateY(0); } 50% { opacity: 1; transform: translateY(-3px); } }
@keyframes loader-bar { 0% { transform: translateX(-100%); } 100% { transform: translateX(260%); } }
@keyframes loader-float { 0%, 100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-14px) rotate(6deg); } }
@keyframes loader-blob { to { transform: translate(24px, -18px) scale(1.1); } }

@media (prefers-reduced-motion: reduce) {
  .loader__ring,
  .loader__portrait,
  .loader__leaf,
  .loader__blob {
    animation: none !important;
  }
}
</style>
