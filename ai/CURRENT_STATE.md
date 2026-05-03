# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 1 — Foundation (**Done**). Phase 2 — Core buildout (**Ready**): next batch **P2-B1**.

## Current Task
Pick up **P2-B1** (`P2-T1` + `P2-T2`): layout + home. See `/ai/TASKS.md` → *Execution batches*.

## What Exists Now
- Astro **5.18** + React **19** + Tailwind **4** (`@tailwindcss/vite`) + `@astrojs/react`, `@astrojs/sitemap`.
- DevilDog tokens in `src/styles/global.css` (`@theme` + `:root` CSS vars); `@fontsource` Montserrat / Open Sans.
- Vitest + Testing Library (jest-dom), ESLint 9 flat + `typescript-eslint` + `eslint-plugin-astro`, `tests/sanity.test.ts`.
- `.env.example` (eight vars per `DEPLOYMENT.md`), `.nvmrc` **24**, `engines.node` **>=24**.
- CI: `.github/workflows/ci.yml` — Node **24**, pnpm **10** cache, lint / typecheck / test / build on `push` + `pull_request`.

## What Works
- `pnpm dev` (placeholder `/`), `pnpm build` → `dist/` + sitemap, full script suite green locally.

## What Is Not Built Yet
- Real pages, content modules, contact API, SWA deploy (Phases 2–4).

## Known Problems
- None at scaffold level. CI must run on GitHub after push (first green run validates workflow).

## Important Files or Folders
- `astro.config.ts`, `src/pages/index.astro`, `src/styles/global.css`
- `.github/workflows/ci.yml`
- `/ai/HANDOFF.md` — resume pointer

## Next Recommended Action
Run **P2-B1**: `P2-T1` (BaseLayout, header, footer, SEO) then `P2-T2` (home page) in one session.
