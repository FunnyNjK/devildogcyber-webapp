# Done Log

Last Updated: 2026-05-03

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
