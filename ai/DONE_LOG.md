# Done Log

Last Updated: 2026-05-03

## 2026-05-03 — P2-B7: P2-T11 + P2-T12 `/contact` + **`POST /api/contact`**

- **`src/content/contactContent.ts`**, **`src/pages/contact.astro`** — marketing contact hero + sidebar CTA (**`Turnstile` + Postmark teaser copy** toned), **`ContactForm`** island (**`client:visible`**).
- **`src/components/ContactForm.tsx`**, **`src/components/TurnstileWidget.tsx`**, **`src/lib/contactValidation.ts`** — legacy validation rules (**ADR‑015**) + honeypot (field name **`CONTACT_HONEYPOT_FIELD_NAME`**, surfaced from Astro env at build-time).
- **`api/contact`** — Azure Functions v4 **`app.http('contact')`** (**`route: 'contact'`** ⇒ **`POST /api/contact`**), libs for Postmark / Turnstile / sliding-window limiter (**`CONTACT_RATE_LIMIT_*`**, keyed by **`cf-connecting-ip` / `x-forwarded-for` first hop**).
- **`api/scripts/bundle-contact.mjs`** + **`esbuild`** — emits **`contact/index.js`** (gitignored artifact) importing shared **`src/lib/contactValidation.ts`** (**ADR‑020**).
- **`pnpm-workspace.yaml`**, **`api/package.json`**; root **`pnpm build`** now chains **`pnpm --filter api build`** after Astro.
- Tests: **`tests/lib/contactValidation.test.ts`**, **`tests/components/ContactForm.test.tsx`**, **`tests/components/TurnstileWidget.test.tsx`**, **`api/contact/lib/*.test.ts`**, **`tests/api/contact-handler.integration.test.ts`**.
- Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL).
- Implementation commit: **`05fc62f`**

## 2026-05-03 — P2-B6: P2-T10 `/about` (legacy marketing About page)
- **`src/content/aboutPageContent.ts`** — SEO + hero + **`aboutPagePrinciples`** (moved off **`siteContent.ts`**); story teaser pulls **`storyContent`** for single source with home/story IA.
- **`src/pages/about.astro`** — ports legacy **`(marketing)/about/page.tsx`** structure: gradient hero with **Back Home**, three principle cards, image + **`The DevilDog Story`** paragraphs.
- **Tests:** **`tests/content/navLinks.test.ts`** — asserts **`about.astro`** registers static **`/about`** (P2-B6 regression).
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL).
- Implementation commit: `6c45a6d`
- Documentation follow-up (DONE_LOG commit hash correction): `e20489d`

## 2026-05-03 — P2-B5: P2-T9 About-us (team) parity + UX polish
- **`hero.layout?: 'backdrop'`** on **`DetailPage`** — **`src/pages/[...slug].astro`** renders full-bleed hero (photo at 40% opacity + gradient overlay + copy) matching legacy **`DetailPage.tsx`**; **`/about-us`** sets **`layout: 'backdrop'`** (split gradient hero unchanged for other detail pages).
- **`DetailPageSections.astro`** — **`kind: 'team'`** reworked to vertical **`TeamCard`**-style articles (portrait strip **`h-80`**, role uppercase, name + bio + bordered cream highlight pills); section shell matches legacy transparent padding (no outer bordered panel).
- **Tests:** **`tests/content/navLinks.test.ts`** — asserts **`/about-us`** exists on **`detailPages`** map.
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL).
- Implementation commit: `9489120`
- Documentation follow-up (DONE_LOG hash after amend): `ae2294f`

## 2026-05-03 — P2-B4: P2-T7 Compliance hub + framework pages
- **Finding:** Full hub + framework payloads for `/compliance` and `/compliance/*` frameworks were already in the verbatim **`detailPages`** port (**P2-B2**); **`public/images/devildog/pages`** already included referenced assets (`compliance.jpg`, `badge.jpeg`, `hitrust.jpg`, `iso.jpg`, `finance.jpg`, `healthcare.jpg`, military/finance imagery for CMMC/NIST/etc.).
- **Tests:** `tests/content/navLinks.test.ts` — explicit regression that `/compliance` plus `/compliance/cmmc`, `/compliance/cmmi`, `/compliance/nist-800-171`, `/compliance/glba`, `/compliance/hipaa`, `/compliance/hitrust`, `/compliance/iso-27001-27002` exist on the `detailPages` map (IA drift guard).
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL).
- Implementation commit: `b52049a`
- Documentation follow-up (DONE_LOG hash chain on **main`): `0fa6a9c`, `a9952ce`

## 2026-05-03 — P2-B3: P2-T5 AI Threats + P2-T6 Security Recon + P2-T8 Story
- **Finding:** Full page copy and imagery for `/ai-threats`, `/security-reconnaissance`, and `/story` were already shipped in the verbatim **`detailPages`** port (**P2-B2**); no content deltas required beyond acceptance documentation.
- **Tests:** `tests/content/navLinks.test.ts` — explicit regression that those three paths exist on the `detailPages` map (IA drift guard).
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL).
- Implementation commit: `af62e1b`
- Documentation follow-up (DONE_LOG commit hash correction): `9959802`

## 2026-05-03 — P2-B2: P2-T3 detail system + P2-T4 services port
- **`src/content/detailPages.ts`** — verbatim legacy port from `~/repos/devildog/src/features/site/detailPages.ts` (typed `detailPages`, helpers, frameworks, maritime builders, `/about-us` team payloads).
- **Routing:** `src/pages/[...slug].astro` with `getStaticPaths()` emitting every slug (static output; `/about` + `/contact` stubs avoid dead nav targets until **P2-B6/P2-B7**).
- **Presentation:** `src/components/detail/DetailPageSections.astro`, `DetailSplitSection.astro` (split column order parity with legacy DetailPage.tsx), `DetailPageCta.astro`.
- **Assets:** Legacy `public/images/devildog/pages/*` copied; `public/images/devildog/team/*` for leadership imagery referenced by detail content.
- **Tests:** `tests/content/navLinks.test.ts` verifies every `navigationGroups` href resolves to `detailPages` or a literal `src/pages/*.astro` route; collision guard versus catch-all duplicates.
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL).
- Implementation commit: `12788f7`
- Documentation follow-up fixing the DONE_LOG hash after amend: `ba9eaed`

## 2026-05-02 — P0-T1: Initialize project-specific AI files
- Catalogued the legacy DevilDog site at `~/repos/devildog` (Next.js 15,
  App Router, Azure App Service deploy with Postmark + Turnstile contact
  workflow). Read-only inspection only.
- Updated `/ai/PROJECT.md` with project-specific scope, target users,
  primary goals, explicit non-goals, brand tokens (DevilDog reds, cream,
  Montserrat / Open Sans), and repository structure including the
  `src/content/` addition.
- Updated `/ai/CURRENT_STATE.md` to reflect end-of-Phase-0 state and
  point at P1-T1 as the next task.
- Updated `/ai/ARCHITECTURE.md` with the DevilDog-specific system
  diagram, page list, security model, www→apex redirect strategy, and
  external-service table.
- Updated `/ai/ROADMAP.md`: Phase 0 done; Phase 2 broken into 13 page
  tasks (P2-T1 … P2-T13) and 6 improvement tasks (P2-I1 … P2-I6); Phase
  3/4/5 outlined.
- Updated `/ai/TASKS.md`: Phase 1 (P1-T1 scaffold, P1-T2 CI) marked
  Ready with full acceptance criteria and test requirements; Phase 2
  page-by-page tasks queued in Backlog with dependencies; Phase 3/4
  tasks outlined; P0-T1 moved to Done.
- Updated `/ai/TESTING.md` with DevilDog-specific test surface: legacy
  validation port, contact endpoint six-branch coverage, no-orphan-link
  content tests, Postmark/Turnstile/rate-limit mocking strategy.
- Updated `/ai/DEPLOYMENT.md` with the eight required environment
  variables, Azure SWA setup steps, OIDC federation subject string,
  DNS plan, and rollback procedure.
- Added project-specific ADRs to `/ai/DECISIONS.md`:
  - ADR-011: Evolve, don't clone — modernize design while preserving
    brand and IA.
  - ADR-012: Typed content modules in `src/content/`, no CMS.
  - ADR-013: Self-hosted fonts via `@fontsource`, not Google Fonts CDN.
  - ADR-014: `www` → apex 301 lives in `staticwebapp.config.json`,
    not in code.
  - ADR-015: Single source of truth for contact validation —
    `src/lib/contactValidation.ts`.
- Created `/ai/MIGRATION_INVENTORY.md` covering: page mapping (27 user
  pages + 1 API route), asset mapping (34 image files), content mapping
  (typed module ports), drop list (Docker, Next config, App Service
  workflow, runtime turnstile-config endpoint, etc.), improvement list
  (linked to P2-I* tasks), and migration risks.
- Updated `/ai/HANDOFF.md` to brief the next AI on context, hard rules,
  and next recommended task (P1-T1 scaffold).

## 2026-05-03 — P2-B1: P2-T1 layout/SEO + P2-T2 home
- **P2-T1:** `src/layouts/BaseLayout.astro` (canonical, OG/Twitter, dual JSON-LD); `src/components/SiteHeader.tsx` (default export for Astro, `client:load`, disclosure dropdowns with outside-click + Esc, arrow-key link nav, mobile drawer); `src/components/SiteFooter.astro`; `src/lib/seo.ts` (`buildPageMetadata`, org/website JSON-LD, absolute asset URLs); `src/content/siteContent.ts` (nav, footer, home-adjacent copy ported from legacy); `public/images/devildog/logo-white.png` + `public/images/devildog/home/*`; global `:focus-visible` ring in `src/styles/global.css`.
- **P2-T2:** `src/pages/index.astro` — hero, feature cards, mission + service highlights, story sections; `src/components/home/ServiceHighlightIcon.astro`.
- **Tests:** `tests/lib/seo.test.ts`, `tests/components/SiteHeader.test.tsx`, `tests/content/siteContent.test.ts`.
- Lighthouse ≥ 95 on `/` (Performance / Accessibility) not run in CI — track under **P3-T1** / local verification.
- Commit: `9002155`

## 2026-05-03 — Planning: execution batches (ADR-019)
- Added **Execution batches** section and per-task **Execution batch** /
  **Scheduling** lines to `/ai/TASKS.md` (P1–P4 batch IDs, `<num_tasks>`
  quick reference, Phase 5 note).
- Updated `/ai/ROADMAP.md` with batch counts per phase and Phase 2 batch list.
- Updated `/ai/HANDOFF.md` and `/ai/CURRENT_STATE.md` for **P1-B1** next.
- Updated `/ai/START_HERE.md` scope rule (section 7) to allow batched task
  IDs per `TASKS.md`.
- Added **ADR-019** to `/ai/DECISIONS.md`.

## 2026-05-03 — P1-B1: P1-T1 scaffold + P1-T2 CI
- **P1-T1:** Astro **5.18**, React **19**, Tailwind **4** via `@tailwindcss/vite`, `@astrojs/react`, `@astrojs/sitemap`, `@fontsource` Montserrat/Open Sans, DevilDog `@theme` + `:root` tokens in `src/styles/global.css`, Vitest + Testing Library jest-dom (`tests/sanity.test.ts`), ESLint 9 flat (`typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-react-hooks`), `.env.example` (eight vars), `.nvmrc` / `engines.node` **24+**, placeholder `src/pages/index.astro`, `public/favicon.svg`.
- **P1-T2:** `.github/workflows/ci.yml` — `push` + `pull_request`, pnpm **10**, Node **24**, `pnpm install --frozen-lockfile`, lint, typecheck, test, build.
- **P2-I1** row closed in `TASKS.md` (fonts at scaffold).
- Commit: `f6b9656`

## 2026-05-02 — Workflow setup (pre-existing)
- Created customized AI project starter for WSL-native dev with Astro 5 +
  React 19 + Tailwind 4 + Azure SWA stack.
- Added `/ai/START_HERE.md` as the single AI entry point.
- Added cross-project rules in `/ai/AI_RULES.md` and `/ai/DEV_ENVIRONMENT.md`.
- Pre-populated cross-project ADRs ADR-001 through ADR-010.
- Added project planning, architecture, task, testing, deployment, decision,
  and handoff files.
