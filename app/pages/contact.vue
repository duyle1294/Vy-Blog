<script setup lang="ts">
import { pickDummyImage } from '~/data/images'

const demoNoticeVisible = ref(false)

useSeoMeta({
  title: 'Contact | Vy’s World',
  description: 'Send a note through the contact form demo on Vy’s World.'
})

function showDemoNotice() {
  demoNoticeVisible.value = true
}
</script>

<template>
  <div class="contact-page">
    <header class="contact-page__intro">
      <img class="contact-page__bg" :src="pickDummyImage('contact-banner')" alt="" />
      <p class="contact-page__eyebrow">A little note goes a long way</p>
      <h1>Let’s connect.</h1>
      <p>If a story resonated with you or you have a book to recommend, leave a note.</p>
    </header>

    <div class="contact-page__layout">
      <form v-reveal class="contact-page__form" @submit.prevent="showDemoNotice">
        <h2>Send a message</h2>

        <div class="contact-page__field">
          <label for="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autocomplete="name" required />
        </div>

        <div class="contact-page__field">
          <label for="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autocomplete="email" required />
        </div>

        <div class="contact-page__field">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="5" minlength="10" required />
          <span class="contact-page__hint">Please write at least 10 characters.</span>
        </div>

        <button class="contact-page__submit" type="submit">Send message <span aria-hidden="true">→</span></button>

        <p v-if="demoNoticeVisible" class="contact-page__notice" role="status" aria-live="polite">
          This is a demo form. Your message has not been sent or stored.
        </p>
        <p v-else class="contact-page__privacy-note">
          Demo only — this form does not send or store your details.
        </p>
      </form>

      <aside v-reveal="150" class="contact-page__aside" aria-labelledby="contact-aside-title">
        <span class="contact-page__aside-mark" aria-hidden="true">✳</span>
        <p class="contact-page__eyebrow">A quiet reminder</p>
        <h2 id="contact-aside-title">Take your time.</h2>
        <p>
          This little corner is still growing. For now, the form is here to show how getting in touch
          will feel when contact details are ready.
        </p>
        <NuxtLink to="/blog">Explore the journal <span aria-hidden="true">→</span></NuxtLink>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  display: grid;
  gap: clamp(2rem, 5vw, 3.5rem);
  padding-block: 0.5rem clamp(2.5rem, 5vw, 4rem);
}

.contact-page__intro {
  position: relative;
  display: grid;
  min-height: clamp(200px, 27vw, 290px);
  align-content: center;
  justify-items: center;
  gap: 0.65rem;
  overflow: hidden;
  padding: 2rem 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface-muted);
  text-align: center;
}

.contact-page__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: slow-zoom 18s ease-in-out infinite alternate;
}

.contact-page__intro::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 35%, transparent), color-mix(in srgb, var(--color-bg) 80%, transparent));
  content: '';
}

.contact-page__intro > :not(.contact-page__bg) {
  position: relative;
  z-index: 1;
}

.contact-page__intro::after {
  position: absolute;
  right: -3rem;
  bottom: -5rem;
  width: 16rem;
  height: 16rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary-soft) 18%, transparent);
  content: '';
}

.contact-page__eyebrow {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.contact-page__intro h1,
.contact-page__aside h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.3rem, 5.5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.contact-page__intro > p:last-child {
  max-width: 48ch;
  color: var(--color-text-muted);
}

.contact-page__layout {
  display: grid;
  gap: 2rem;
  align-items: start;
}

.contact-page__form {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
}

.contact-page__form h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
}

.contact-page__field {
  display: grid;
  gap: 0.4rem;
}

.contact-page__field label {
  font-size: 0.85rem;
  font-weight: 600;
}

.contact-page__field input,
.contact-page__field textarea {
  width: 100%;
  min-height: 2.8rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  font: inherit;
}

.contact-page__field textarea {
  min-height: 9rem;
  resize: vertical;
}

.contact-page__hint,
.contact-page__privacy-note {
  color: var(--color-text-muted);
  font-size: 0.78rem;
}

.contact-page__submit {
  display: inline-flex;
  min-height: 2.85rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-inline: 1.25rem;
  border: 0;
  border-radius: 999px;
  background: var(--color-primary);
  color: white;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
}

.contact-page__notice {
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-size: 0.88rem;
}

.contact-page__aside {
  display: grid;
  justify-items: start;
  gap: 0.75rem;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
}

.contact-page__aside-mark {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-primary);
}

.contact-page__aside h2 {
  font-size: 1.9rem;
}

.contact-page__aside > p:not(.contact-page__eyebrow) {
  color: var(--color-text-muted);
  font-size: 0.92rem;
  line-height: 1.7;
}

.contact-page__aside a {
  margin-top: 0.25rem;
  font-size: 0.88rem;
  font-weight: 700;
  text-decoration: none;
}

@media (min-width: 768px) {
  .contact-page__layout {
    grid-template-columns: minmax(0, 1.3fr) minmax(250px, 0.8fr);
    gap: clamp(2rem, 7vw, 6rem);
  }
}
.contact-page__intro > :not(.contact-page__bg)  {
  -webkit-text-stroke: 4px #fff;
  paint-order: stroke fill;
}
</style>