# Copilot Instructions — Vy Personal Blog

## 1. Purpose

Build **Vy's personal blog and light portfolio**: a calm, personal space for stories, life experiences, travel, books, marketing, and personal growth.

The website should feel like:

> **A little green garden on the internet where people can slow down, read, explore, and share stories.**

Prioritize this order:

1. Content and reading experience
2. Personal identity
3. Beautiful, natural imagery
4. Typography and whitespace
5. Simple navigation
6. Decorative details
7. Animation

Do not turn this into a corporate portfolio, SaaS landing page, travel booking site, news site, social network, or UI showcase.

## 2. Source of Truth

Read these documents before making significant product or design changes:

- `vy-blog-requirements.md`: Vy's product, visual, and content requirements.
- `ui-wireframe.md`: the active UI specification and component/page guidance.
- `Projectbackground.md`: technical architecture and long-term CMS plan.
- `project-proposal-vy.md`: roles, phases, cost constraints, and operational expectations.

When requirements conflict, use this priority:

1. The latest direct user request
2. `vy-blog-requirements.md` and `ui-wireframe.md` for UI/UX decisions
3. `project-proposal-vy.md` for delivery phases and costs
4. `Projectbackground.md` for architecture and future CMS direction

## 3. People and Responsibilities

- **Vy** owns content and personal identity: provides articles, images, feedback, and publishing decisions.
- **Duy** owns implementation: system architecture, UI, frontend, future CMS integration, deployment, monitoring, and technical documentation.
- Refer to the content owner simply as **Vy**. Do not use formal titles such as “Ms. Vy”.

## 4. Delivery Scope and Phases

### Current default scope: UI Demo / Phase 1

Unless explicitly instructed otherwise, build the **public UI only**:

- Home
- Blog List
- Blog Detail
- About
- Contact
- Global Header, Footer, and mobile navigation
- Responsive layouts for desktop, tablet, and mobile
- Reusable components, theme/design tokens, realistic sample content, and image placeholders

For this UI-demo scope, **do not implement**:

- Supabase
- Authentication
- Database or API routes
- Admin CMS
- Tiptap
- File/image upload
- Search backend
- Production analytics

Use mock data and local/sample images until a later request enables backend work.

### Phase 2: Admin and CMS

Implement only when explicitly requested:

- Admin login and post management
- Tiptap rich-text editor
- Draft and publish workflow
- Media upload to Supabase Storage
- Category/tag management
- Basic theme management

Tiptap content must be stored as structured JSON, not presentation-coupled HTML. The public Nuxt renderer maps JSON nodes to semantic HTML and applies the active theme through CSS/design tokens.

### Phase 3: Scale and operations

Implement only as usage requires:

- Image compression/transforms and CDN strategy
- Cache and static/ISR rendering strategy
- Analytics, monitoring, alerts, and backups
- Advanced search and content tooling

Before adding paid infrastructure, identify the measurable trigger and present the expected cost to Vy.

## 5. Technology Decisions

Use the following stack when implementation begins:

- **Framework:** Nuxt 4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend/CMS phase:** Supabase (Auth, Postgres, Storage) and Tiptap
- **Hosting:** Vercel

Guidelines:

- Prefer Nuxt-native patterns and server rendering suitable for SEO.
- Keep dependencies minimal; do not add a large UI library without a clear need.
- Build composable, accessible Vue components with explicit TypeScript types.
- Use semantic HTML and meaningful component names.
- Keep theme values centralized in Tailwind/design tokens. Do not hard-code palette values repeatedly through pages or content.

## 6. Visual Direction

### Design character

The design must be:

- Fresh, natural, warm, personal, and calm
- Friendly and welcoming, with calm energy
- Editorial and content-focused rather than corporate
- Simple enough to maintain, but polished enough to represent Vy professionally

Avoid:

- Excessive cards, badges, gradients, shadows, or decorative sections
- Neon, cyberpunk, futuristic, generic SaaS, or corporate visual language
- Heavy parallax, flashing, spinning, or frequent animation
- Dense layouts and small, low-contrast typography

### Preferred palette

Use a soft, garden-inspired theme as the primary direction:

| Token purpose | Suggested color |
| --- | --- |
| Warm background | `#FAFBF7` |
| Soft leaf green | `#8FBF9F` |
| Deep green | `#477A5B` |
| Sky blue | `#B9DDF2` |
| Soft yellow | `#F4D98B` |
| Optional peach accent | `#E9A36A` |
| Primary text | `#34443A` |
| Muted text | `#7B877F` |

Green, sky blue, warm white, and soft yellow are the default direction. Use orange/peach sparingly as an accent only.

### Images and illustration

Prefer natural, bright, airy, warm imagery:

- Nature: sky, clouds, grass, trees, flowers, morning light
- Travel: streets, architecture, landscapes, food, small moments
- Daily life: books, coffee, desk, personal objects, quiet routines

If illustration is needed, prefer watercolor, hand-drawn, soft digital-painting, or editorial styles. Do not use generic 3D corporate illustration.

## 7. UX and Page Requirements

### Global navigation

Use a simple navigation model:

`Home`, `About`, `Travel`, `Experiences`, `Marketing`, `Books`, `Contact`.

- On desktop, show clear text navigation.
- On mobile, use an accessible hamburger menu.
- Use a simple personal logo such as `Vy` or `Vy's World`; do not create a corporate logo.

### Home

The homepage should communicate within seconds who Vy is, what is shared, and why visitors should explore.

Required content flow:

1. Hero with a short personal quote/tagline and calm nature visual
2. Garden-style introduction / welcome message
3. Category exploration
4. Featured/latest stories
5. Journey or category-route section
6. Short About preview
7. Friendly Contact CTA
8. Footer

### Blog list

- Provide category filtering UI and a search UI affordance (mocked in demo scope).
- A post card includes image, category, title, short excerpt, date, and quiet `Read story →` CTA.
- Do not overload cards with metadata or visual treatments.
- Use a 2–3 column grid on desktop and one column on mobile.

### Blog detail

Reading experience takes priority over decoration:

- Show category, title, date, cover image, article, inline images, and optional captions.
- Keep content width around `680px–760px` on desktop.
- Use readable body type around `18px` desktop with `1.7–1.9` line-height; use `16px–18px` on mobile.
- Use elegant sans-serif or a considered serif/sans pairing. Keep headings editorial but legible.
- Keep imagery natural, with light corner rounding and minimal shadow.

### About

Create a soft, simple portfolio rather than a traditional corporate CV:

- Introduction / who Vy is
- Experience and selected projects or journey
- Skills as typography or light chips, never percentage/progress bars
- Interests and contact CTA

### Contact

- Use a friendly, human tone such as “Let's connect.”
- Include email/social links and a simple form UI (`Name`, `Email`, `Message`) in demo scope.

## 8. Responsive, Accessibility, and Motion

### Responsive behavior

- Desktop: `>= 1024px`
- Tablet: `768px–1023px`
- Mobile: `< 768px`

Design mobile intentionally; do not simply shrink desktop. Preserve readable text, generous spacing, useful image proportions, and accessible navigation.

### Accessibility

- Use semantic landmarks, correct heading hierarchy, descriptive labels, and visible keyboard focus.
- Provide meaningful `alt` text for content images; decorative images should use empty alt text.
- Maintain accessible text contrast on light backgrounds.
- Make menus, controls, and forms keyboard usable.

### Motion

Allowed motion is subtle and purposeful: fade, soft slide-up, small image scale on hover, and gentle page transitions.

- Duration: roughly `200ms–600ms`.
- Respect `prefers-reduced-motion`.
- No flashing, aggressive parallax, continuous movement, or distracting animations.

## 9. Content Model and Future Rendering Rules

When Phase 2 begins:

- Tiptap gives Vy a Word/Google Docs-like editing experience for headings, text, lists, quotes, and images.
- Tiptap saves a structured document JSON (AST), metadata, and image URLs; it must not persist editor styling as the public design.
- Images upload to Supabase Storage; store only the image metadata/URL in the post record/document JSON.
- The public renderer transforms supported JSON nodes into sanitized semantic HTML.
- The theme system controls final typography, color, spacing, image treatment, and responsive behavior.
- A content change must not require a theme change, and a theme change must not require rewriting posts.

Test the renderer with headings, paragraphs, lists, quotes, code, links, images, captions, and any enabled embeds before enabling publishing.

## 10. Cost and Scale Guardrails

- The first month is expected to be the largest cost because of the one-month Claude Code development subscription (~`$100`) and optional domain registration (~`$10–20/year`).
- Initial Vercel and Supabase usage should remain on free tiers where feasible.
- Target ongoing hosting/database cost below `$10/month`, excluding Claude Code.
- Optimize image size (WebP/AVIF where compatible), lazy-load noncritical images, and cache public pages before introducing paid services.

Escalate and seek approval before paid upgrades. Typical review triggers:

- Supabase Storage exceeds approximately `10 GB` or image egress exceeds approximately `100 GB/month`.
- Public traffic reaches approximately `10k–50k` pageviews/month, or CDN/image egress approaches `200–500 GB/month`.
- Build, serverless function, database, or backup limits show sustained pressure.

When a trigger is reached, propose the smallest effective option first: compression, caching, static rendering, image CDN, then upgraded Vercel/Supabase plans if necessary.

## 11. Quality Bar and Working Process

Before coding:

1. Inspect the existing project structure and read relevant requirements.
2. Create a concise implementation plan for multi-step work.
3. Reuse existing tokens/components before adding new abstractions.

During implementation:

1. Build global layout and design tokens first.
2. Complete and verify one major page before moving to the next.
3. Use realistic Vietnamese or English sample content matching Vy's topics.
4. Check desktop, tablet, and mobile layouts.
5. Test the narrowest relevant command first, then broader checks when available.

Before handoff:

1. Run formatting, type checking, tests, and/or build commands that exist in the repository.
2. Do not fix unrelated errors unless requested.
3. Summarize changed files, verification performed, and any known limitation.

## 12. Non-Negotiable Decisions

- Favor readability over visual effects.
- Favor maintainable, reusable UI over one-off decorative code.
- Favor calm personal identity over corporate polish.
- Favor realistic content flow over placeholder-heavy marketing sections.
- Keep the current UI demo free of backend/CMS complexity unless the request explicitly enters Phase 2.