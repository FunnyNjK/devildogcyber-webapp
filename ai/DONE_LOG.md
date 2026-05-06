# Done Log

Last Updated: 2026-05-06

## 2026-05-06 — **P4-B3** complete: **`/contact`** + Postmark on production domain

- Human confirmed form submit on **`https://devildogcyber.com/contact`** → email delivery; Postmark **Activity** shows sends.
- Fix path: **server** secrets (**`POSTMARK_*`**, **`TURNSTILE_SECRET_KEY`**, etc.) in **Azure SWA** → **Environment variables** (**Production**), not GitHub-only — documented **`DEPLOYMENT.md`** **GitHub vs Azure** (**commit `5a0698b`**).
- **`/ai`**: **P4-T4**, **P4-T5** → **Done**; **HANDOFF**/**CURRENT_STATE**/**TASKS**/**ROADMAP** updated. Commit **`c3735cd`**.

## 2026-05-06 — Legacy marketing site removed from **Azure Government**

- Human decommissioned old site in **Azure Gov** tenant. Current production for **`devildogcyber-webapp`** is **Azure Public** SWA **`devildogcyber`** (**ADR-023**). **`HANDOFF.md`** / **`CURRENT_STATE.md`** updated.

## 2026-05-05 — **P4-T3** / **P4-B2** closed (human secrets + prod smoke)

- Human added SWA application settings + GitHub **`PUBLIC_TURNSTILE_SITE_KEY`**.
- **curl** smoke: **`GET https://polite-sky-09fcf0610.7.azurestaticapps.net/`** **200**; **`GET …/contact`** **200**; **`POST …/api/contact`** body **`{"company_website":"https://bot.example"}`** → **`{"ok":true}`** (honeypot path).
- **`/ai`**: **P4-T3** → **Done**; **Blocked** cleared; **HANDOFF**/**CURRENT_STATE**/**TASKS**/**ROADMAP** → **P4-B3** active. Commits **`ce4e79e`**, **`88e996f`**.
- **Remaining:** real browser **`/contact`** submit → **`CONTACT_EMAIL_TO`** + Postmark sender verification (**P4-B3**).

## 2026-05-05 — P4-B2 (automatable): **P4-T2** Done; **P4-T3** human checklist

- **`ci.yml`**: Build step **`PUBLIC_TURNSTILE_SITE_KEY: ${{ secrets.PUBLIC_TURNSTILE_SITE_KEY }}`** — parity with **`deploy.yml`** when the repo secret is set.
- **`DEPLOYMENT.md`**: new § **P4-B2 — SWA Configuration + GitHub Build secret (human checklist)** (Portal env vars, GitHub secret, Turnstile hosts, smoke steps).
- **`README.md`**: documents **`PUBLIC_TURNSTILE_SITE_KEY`** + pointer to checklist.
- **`/ai`**: **`TASKS.md`** — **P4-T2** → **Done**; **Blocked** = **P4-T3**; **`HANDOFF.md`**, **`CURRENT_STATE.md`** updated. **P4-T3** remains open until human completes Portal/GitHub + smoke **`/contact`**. Commits **`7a85a94`**, **`7edb564`** (DONE_LOG hash correction).

## 2026-05-06 — CHAT_END: **`TESTING.md`** typecheck / CI notes

- Documented **`astro sync`** in **`pnpm typecheck`**; corrected **Known Testing Gaps** (axe in CI, contrast manual). No code changes.

## 2026-05-06 — P4-B1 / P4-T1: SWA live + GitHub Deploy green

- Azure: **`devil-web-rg`**, **`devildogcyber`** (**Standard**, **centralus**); default URL **`https://polite-sky-09fcf0610.7.azurestaticapps.net`**. Human: **`AZURE_STATIC_WEB_APPS_API_TOKEN`** in GitHub.
- **Deploy** run **25405261583** succeeded after: **`pnpm/action-setup`** fix (**`56ae3df`**), **`astro sync`** in **`typecheck`** (**`79398f1`**), **`app_location: dist`** for prebuilt Astro (**`8a5c2da`**).
- Planning: **`TASKS.md`** **P4-T1** → **Done**; **`HANDOFF.md`**, **`CURRENT_STATE.md`** updated.

## 2026-05-06 — Deploy workflow: app_location dist + typecheck astro sync

- **`pnpm typecheck`:** run **`astro sync`** first (gitignored **`.astro/types`**); **`import.meta.glob`** types require it on fresh CI checkouts — **`package.json`** **`typecheck`** script updated.
- **SWA deploy:** **`app_location: dist`** + **`skip_app_build: true`** (was **`/`** + **`output_location: dist`**, which uploaded repo root and failed “no index.html”).

## 2026-05-06 — GitHub Actions: pnpm setup fix (**ci.yml** + **deploy.yml**)

- **`pnpm/action-setup@v4`** failed when both **`with: version: 10`** and **`package.json`** **`packageManager`** (`pnpm@10.12.1`) were set — removed explicit **`version`** so Corepack resolves from **`packageManager`**.
- Human added **`AZURE_STATIC_WEB_APPS_API_TOKEN`**; **Deploy** should pass after this push (verify in Actions).

## 2026-05-06 — Azure SWA provisioned (**P4-T1** — GitHub token pending)

- **`devil-web-rg`** + **`devildogcyber`** (**Standard**, **centralus**) in subscription **`179ae124-553a-42c7-89cd-0d665cddef65`**; default hostname **`polite-sky-09fcf0610.7.azurestaticapps.net`**. Provisioning via **Azure MCP** + **`az`** (resource group did not exist prior).
- **Follow-up:** repository secret added by human; **Deploy** unblocked after **pnpm** workflow fix (see newer **DONE_LOG** entry same day).

## 2026-05-06 — Phase 4 infra alignment (**P4-T1** still open)

- **ADR-023** — Subscription **`179ae124-553a-42c7-89cd-0d665cddef65`**, **`devil-web-rg`**, SWA **`devildogcyber`**, **Standard**, **`centralus`**, GitHub [FunnyNjK/devildogcyber-webapp](https://github.com/FunnyNjK/devildogcyber-webapp); **GoDaddy** for DNS when cutting over; deploy via **`AZURE_STATIC_WEB_APPS_API_TOKEN`**.
- **`.github/workflows/deploy.yml`** — build + **`Azure/static-web-apps-deploy@v1`** (`/`, **`api`**, **`dist`**, **`skip_app_build`**); PR preview + close job.
- **`scripts/azure/provision-swa.sh`** — defaults match **ADR-023**; **`AZURE_SKU`** override supported.
- **`/ai/DEPLOYMENT.md`**, **`ARCHITECTURE.md`** (DNS), **`HANDOFF.md`**, **`CURRENT_STATE.md`**, **`TASKS.md`** updated.
- **Human still required:** create SWA + GitHub secret + green deploy (**P4-T1**).

## 2026-05-05 — P4-T1 repository prep (task **not** closed)

- **`scripts/azure/provision-swa.sh`** — idempotent **`az group create`** + **`az staticwebapp create`** (**Free**, no GitHub source); prints **default hostname** for smoke tests (**P4-T1**).
- **`/ai/DEPLOYMENT.md`** — **P4-T1** human checklist (CLI vs Portal, DNS vs **P4-T6**); **P4-T2+** OIDC/deploy section; **`deploy.yml`** noted as **planned** until **P4-T2**.
- **Human still required** for **P4-T1** **Done:** **`az login`**, subscription, create/verify SWA — see **`HANDOFF.md`** (DNS may be **GoDaddy**, **P4-T6**).

## 2026-05-05 — P3-B2: P3-T3 (bundle size budget)

- **`scripts/js-budget.config.json`** — gzip budgets: **`defaultMaxTotalGzipBytes`** 72000 (~default island pages), **`/contact`** override 75000, **`maxSingleChunkGzipBytes`** 62000 (React client chunk).
- **`scripts/check-js-budget.mjs`** — scans each **`dist/**/*.html`** for **`/_astro/*.js`**, transitively follows **`from"./…js"`** / dynamic imports in emitted chunks, sums **gzip** bytes per route; **`pnpm build`** fails on overflow.
- **`package.json`** **`build`** — runs checker after **`verify-build-seo.ts`**.
- **`eslint.config.js`** — lint **`scripts/**/*.{ts,mjs}`**.
- Checks: **`pnpm lint`**, **`pnpm typecheck`**, **`pnpm build`**, **`pnpm test`** (WSL). Implementation commit: **`0f6a724`**.

## 2026-05-05 — P3-B1: P3-T1 + P3-T2 + P2-I4 + P2-I6

- **`src/components/ContentImage.astro`**, **`src/lib/contentImages.ts`**, **`src/assets/images/`** (placeholder), **`sharp`** — optimized AVIF/WebP when rasters live under **`src/assets/images/devildog/...`** (**ADR-022**); otherwise fallback **`<img src="/images/...">`**.
- **`src/pages/index.astro`**, **`src/pages/[...slug].astro`**, **`BaseLayout.astro`**: **`getImage`** LCP preload + **`lcpPreloadHref`** prop; detail + home heroes use **`ContentImage`**.
- **`src/components/detail/*.astro`**, **`about.astro`**, **`SiteFooter.astro`**: **`ContentImage`**. **`SiteHeader.tsx`** keeps **`<img>`** logo.
- **`src/styles/global.css`**: **`prefers-reduced-motion`** strips transitions/animations.
- **`tests/a11y/dist-html-axe.test.ts`** (**Vitest**, **`node`**, **`jsdom`**, **axe-core**); serious/critical only; **`color-contrast`** off for JSDOM.
- **`.github/workflows/ci.yml`**: **Build → Test**.
- Checks: **`pnpm lint`**, **`pnpm typecheck`**, **`pnpm build`**, **`pnpm test`** (WSL). Implementation commit: **`11e44eb`**.
- Follow-up docs: **`5275879`** — **`ARCHITECTURE.md`** / **`ROADMAP.md`** aligned with **P3-B1** (CHAT_END handoff refresh).

## 2026-05-03 — P2-B8: P2-T13 SEO baseline + **`staticwebapp.config.json`**

- **`public/robots.txt`**, **`public/staticwebapp.config.json`** (copied to **`dist/`**): **`trailingSlash: "never"`**, **`forwardingGateway.allowedForwardedHosts`** (apex + **`www`**); host-level **`www` → apex** complements Portal **default domain** (**ADR-021**, **DEPLOYMENT.md**).
- **`astro.config.ts`**: **`@astrojs/sitemap`** **`serialize`** — normalize home to **`https://devildogcyber.com/`**, strip trailing slashes on other **`loc`** values so sitemap matches **`BaseLayout`** canonicals.
- **`scripts/verify-build-seo.ts`**: invoked at end of **`pnpm build`**; asserts **sitemap-*** **`<loc>`** set equals **`/` + `/about` + `/contact` + `detailPages`**, **`robots.txt`** points at **`sitemap-index.xml`**, and SWA config **`trailingSlash`**.
- **`tests/deploy/sitePublicSurface.test.ts`**, **`eslint.config.js`** **`scripts/**`** globals.
- Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` (WSL). **`@azure/static-web-apps-cli` v2.0.9** may still **301** **`/contact` → `/contact/`** locally; production behavior is authoritative.
- Implementation commit: **`21c24a6`**; **`DONE_LOG`** hash line: **`815e710`**

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
