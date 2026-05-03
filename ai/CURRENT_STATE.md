# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 2 — Core buildout (**in progress**). **P2-B1** Done; next batch **P2-B2**.

## Current Task
Pick up **P2-B2** (`P2-T3` + `P2-T4`): detail-page system + services content port. See `/ai/TASKS.md` → *Execution batches*.

## What Exists Now
- **P2-B1:** `BaseLayout.astro` + `SiteFooter.astro` + `SiteHeader` (React island, keyboard/disclosure nav); `src/lib/seo.ts` (metadata + JSON-LD); `src/content/siteContent.ts` (nav, footer, home copy); home page in `src/pages/index.astro` (hero, feature cards, mission, service highlights, story); `public/images/devildog/` logo + `home/` imagery; tests: `tests/lib/seo.test.ts`, `tests/components/SiteHeader.test.tsx`, `tests/content/siteContent.test.ts`.
- Still from **P1-B1:** Astro 5 + React 19 + Tailwind 4, Vitest/ESLint, CI `ci.yml`, `@fontsource` in `global.css`.

## What Works
- `/` renders full chrome + home sections; build outputs JSON-LD, canonical, OG/Twitter tags.
- `pnpm dev`, `pnpm build`, full script suite green locally.

## What Is Not Built Yet
- Detail routes (`[...slug]`), remaining pages, contact API, SWA deploy (rest of Phase 2–4).

## Known Problems
- None at repo level. Nav header links point at routes not yet implemented until **P2-B2+** (expected).

## Important Files or Folders
- `src/layouts/BaseLayout.astro`, `src/components/SiteHeader.tsx`, `src/pages/index.astro`, `src/content/siteContent.ts`, `src/lib/seo.ts`
- `/ai/HANDOFF.md` — resume pointer

## Next Recommended Action
Run **P2-B2**: implement **P2-T3** (`detailPages.ts`, `[...slug].astro`, detail renderer) then **P2-T4** (services pages + `public/images/devildog/pages/`).
