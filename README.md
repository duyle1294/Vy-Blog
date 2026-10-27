# Vy Blog — Phase 1 Scaffold

This repository now contains the real application scaffold for the public site using **Nuxt 4 + TypeScript + Tailwind CSS**, aligned with `docs/agent-work-orders.md` (`WO-01`).

## Prerequisites

- Node.js: **>= 22.19.0** (current environment in this workspace is Node 20.18.0, which is below Nuxt 4 requirement)
- npm: latest stable that matches your Node runtime

If you use `nvm`:

```bash
nvm install 22.19.0
nvm use 22.19.0
node -v
```

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Checks

```bash
npm run typecheck
npm run build
npm run preview
```

## Notes

- Prototype/static assets are preserved and not removed by WO-01.
- Phase 1 scope remains public UI only; no backend/CMS/auth/API work is included.
- In the current workspace runtime (Node 20.18.0), `npm run typecheck` and `npm run build` fail because Nuxt 4 toolchain requires newer Node. Re-run checks after upgrading Node to `>=22.19.0`.
