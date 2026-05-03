# Tasks

Last Updated: 2026-05-03

## Active Task
None — pick the next **execution batch** below (`HANDOFF.md` →
`TASKS.md` → section **Execution batches**).

---

## Execution batches (autonomous / `run-phase*.sh`)

Autonomous harnesses (`./run-phase.sh`, `./run-phase-cursor.sh`) advance
**one batch per iteration**. A **batch** is a defined set of task IDs
meant to finish in **one agent session** before handoff / commit
(ADR-019). This cuts repeated `/ai` context loading and token cost.

**Rules**

- Finish **every** task in the batch to its acceptance criteria (or
  document Blocked with reason) before ending the session.
- Update `TASKS.md`, `HANDOFF.md`, `CURRENT_STATE.md`, and `DONE_LOG.md`
  for the batch; name each constituent task ID in the handoff.
- Do **not** merge tasks across batches or invent new groupings without
  updating this section and ADR-019.

### Phase 1 — Foundation

| Batch ID | Constituent tasks (order) | `run-phase*.sh` runs for full phase |
|----------|---------------------------|-------------------------------------|
| **P1-B1** | P1-T1 → P1-T2 | **1** |

### Phase 2 — Core buildout

| Batch ID | Constituent tasks | Notes |
|----------|-------------------|--------|
| **P2-B1** | P2-T1, P2-T2 | Layout + home. Treat **P2-I5** (nav keyboard / ARIA) as part of **P2-T1** acceptance unless truly blocked — avoid a separate I5-only iteration. |
| **P2-B2** | P2-T3, P2-T4 | Detail-page system, then services hub + all service detail pages in `TASKS.md`. |
| **P2-B3** | P2-T5, P2-T6, P2-T8 | AI Threats, Security Reconnaissance, Story — same static pattern after P2-B2. |
| **P2-B4** | P2-T7 | Compliance hub + framework pages (single large batch). |
| **P2-B5** | P2-T9 | About-us (team) page + imagery. |
| **P2-B6** | P2-T10 | About-this-site page. |
| **P2-B7** | P2-T11, P2-T12 | Contact UI + `/api/contact` Azure Function in one session (larger diff; acceptable per ADR-019). |
| **P2-B8** | P2-T13 | Sitemap, robots, SEO verification, `staticwebapp.config.json` — run after public routes exist. |

**Phase 2 — improvements (default schedule)**

| Item | Default |
|------|---------|
| **P2-I1** | **Superseded** by P1-T1 (`@fontsource` in scaffold, ADR-013). Mark **Done** or **Deferred** with pointer when P1-B1 completes; no standalone run. |
| **P2-I2, P2-I3** | Covered by P2-B7. |
| **P2-I4** | Run as part of **P3-B1** (image pass + audit fixes together). |
| **P2-I5** | Primary work in **P2-B1** / P2-T1; backlog row = gap-fill only if something ships incomplete. |
| **P2-I6** | Run as part of **P3-B1** unless already satisfied during P2-B1 styling. |

**`run-phase*.sh` runs for full Phase 2:** **8**

### Phase 3 — Hardening

| Batch ID | Constituent tasks |
|----------|-------------------|
| **P3-B1** | P3-T1, P3-T2, **P2-I4**, **P2-I6** |
| **P3-B2** | P3-T3 |

**Runs for full Phase 3:** **2**

### Phase 4 — Deployment

| Batch ID | Constituent tasks | Notes |
|----------|-------------------|--------|
| **P4-B1** | P4-T1 | Azure SWA + DNS provisioning; may require human steps in Azure — agent automates what is scriptable and documents the rest. |
| **P4-B2** | P4-T2, P4-T3 | OIDC / deploy workflow + production env configuration. |
| **P4-B3** | P4-T4, P4-T5 | Postmark verification + first production deploy + smoke test. |
| **P4-B4** | P4-T6 | DNS cutover + www→apex verification. |

**Runs for full Phase 4:** **4**

### Phase 5 — Enhancements

Not batch-scheduled (per-request). Do not include in `run-phase*.sh` counts.

### Quick reference: `<num_tasks>` for `run-phase.sh` / `run-phase-cursor.sh`

| Goal | `<num_tasks>` |
|------|----------------|
| Phase 1 only (from repo ready for P1) | `1` |
| Phase 2 only (Phase 1 already Done) | `8` |
| Phase 3 only (Phase 2 already Done) | `2` |
| Phase 4 only (Phase 3 already Done) | `4` |
| **Phases 1–4 end-to-end** | **`15`** |

---

## Ready

### P1-T1: Scaffold Astro 5 + React 19 + Tailwind 4 project
Status: Ready
Owner: Claude Code
Priority: High
Phase: 1
**Execution batch:** **P1-B1** — finish in the **same** autonomous session as **P1-T2** (see Execution batches).

#### Goal
Create the initial scaffold per `/ai/PROJECT.md` defaults, running natively
in WSL. Wire DevilDog brand tokens into the Tailwind theme so subsequent
page work has the right design primitives available.

#### Scope Included
- `pnpm create astro@latest` (TypeScript strict, no template content beyond
  the minimum)
- Add `@astrojs/react`, `react`, `react-dom`
- Add `@tailwindcss/vite`, configure in `astro.config.ts`
- Add `@astrojs/sitemap`
- Add Vitest, `@testing-library/react`, `@testing-library/jest-dom`
- Add ESLint 9 flat config + `typescript-eslint`
- Add `@fontsource/montserrat` + `@fontsource/open-sans` (per ADR-013)
- Configure Tailwind theme with DevilDog brand tokens from `/ai/PROJECT.md`
  (`--dd-red`, `--dd-red-deep`, `--dd-red-bright`, `--dd-cream`, etc.)
- Add `.env.example` with all variables from `/ai/DEPLOYMENT.md`
- Add `.gitignore` covering `.env.local`, `dist/`, `node_modules/`,
  `.vscode/settings.json`
- Add `package.json` scripts: `dev`, `build`, `preview`, `test`,
  `test:watch`, `lint`, `typecheck`
- Pin pnpm via `packageManager` field
- Verify `pnpm dev`, `pnpm build`, `pnpm test`, `pnpm lint`,
  `pnpm typecheck` all run cleanly

#### Scope Excluded
- Do not build the contact form yet (P2-T12).
- Do not configure Azure resources yet (P4 tasks).
- Do not write page content yet (P2 tasks).
- Do not port assets yet (P2-T1 will pull only what `BaseLayout` needs).

#### Acceptance Criteria
- `pnpm dev` serves a placeholder homepage at `localhost:4321`.
- `pnpm build` produces a `dist/` directory with static assets.
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all exit 0.
- Tailwind theme exposes `bg-dd-red`, `text-dd-cream`, etc. usable from
  `.astro` and `.tsx` files.
- All work happened in `~/repos/devildogcyber-webapp` inside WSL — no
  `/mnt/c` paths appear in any committed file.

#### Test Requirements
- One placeholder Vitest spec (`tests/sanity.test.ts`) exists and passes.

---

### P1-T2: Add GitHub Actions CI workflow
Status: Ready
Owner: Claude Code
Priority: High
Phase: 1
**Execution batch:** **P1-B1** — run **after** P1-T1 acceptance is met in the same session.

#### Goal
Add `.github/workflows/ci.yml` per `/ai/DEPLOYMENT.md`. Wired to run on
`push` and `pull_request`, NOT `workflow_dispatch`-only (per ADR-010).

#### Acceptance Criteria
- CI runs lint, typecheck, test, build on PR and push to `main`.
- pnpm cache restored from lockfile.
- Node 24 used (per ADR-018).
- First PR shows green check.

#### Test Requirements
- Workflow yields a green run on a no-op PR.

---

## Backlog (Phase 2 — Core Buildout)

### P2-T1: BaseLayout, SiteHeader, SiteFooter, base SEO + JSON-LD
Status: Backlog
Owner: any
Priority: High
Phase: 2
**Execution batch:** **P2-B1** (with P2-T2; fold **P2-I5** nav a11y into this task unless blocked).

#### Goal
Build the shared chrome that every page mounts inside, plus the SEO
foundation (per-page metadata helper, JSON-LD for Organization +
WebSite, OG/Twitter defaults).

#### Scope Included
- `src/layouts/BaseLayout.astro` — `<html>`, head, fonts, JSON-LD,
  header slot, main slot, footer slot
- `src/components/SiteHeader.tsx` (React island) — logo, primary nav,
  three dropdown groups, mobile drawer; ported from old site with
  accessibility improvements (P2-I5)
- `src/components/SiteFooter.tsx` — likely Astro (no interactivity needed)
- `src/lib/seo.ts` — `buildPageMetadata()`, `getOrganizationJsonLd()`,
  `getWebsiteJsonLd()` (port from `~/repos/devildog/src/features/site/seo.ts`)
- `src/content/siteContent.ts` — port `siteMetadata`, `primaryNavigation`,
  `navigationGroups`, `socialLinks`, `footerContact`, `footerLinkGroups`
- Port logo + at minimum one OG fallback image to `public/images/devildog/`

#### Acceptance Criteria
- Visiting `/` renders header, footer, and one placeholder paragraph.
- View-source shows JSON-LD Organization + WebSite blocks, canonical link,
  OG/Twitter meta, valid title.
- Mobile nav opens/closes, dropdowns operable with keyboard (Tab, Enter,
  Esc, arrow keys), focus trap not required but focus-visible is correct.
- Lighthouse Accessibility score ≥ 95 on `/`.

#### Test Requirements
- Component test: `SiteHeader` opens dropdown on click + closes on Esc +
  closes on outside click.
- Component test: mobile menu toggle.
- Snapshot or unit test for `buildPageMetadata` output shape.

---

### P2-T2: Home page
Status: Backlog
Owner: any
Priority: High
Phase: 2
**Execution batch:** **P2-B1** (with P2-T1).

#### Goal
Port the home page (hero, mission, feature cards, service highlights, CTA)
from the old site, using the new design language (improved spacing,
typography rhythm, mobile-first).

#### Scope Included
- `src/pages/index.astro`
- Required content imported from `src/content/siteContent.ts`
  (`heroContent`, `missionContent`, `featureCards`, `serviceHighlights`)
- Port required home imagery to `public/images/devildog/home/`

#### Acceptance Criteria
- Page renders all sections from the old `HomePage.tsx`.
- All visible copy matches what's in `~/repos/devildog/src/features/site/siteContent.ts`
  (catch drift via `tests/content/siteContent.test.ts`).
- Lighthouse Performance ≥ 95 on `/`.
- No layout shift on load (CLS = 0).

#### Test Requirements
- Content unit test asserting `featureCards` + `serviceHighlights` shapes.

---

### P2-T3: Detail-page system (template + content driver)
Status: Backlog
Owner: any
Priority: High
Phase: 2
**Execution batch:** **P2-B2** (with P2-T4).

#### Goal
Replicate the legacy site's `[...slug]/page.tsx` pattern as Astro pages
that pre-render every detail-page slug from a single typed content array.

#### Scope Included
- Port `~/repos/devildog/src/features/site/detailPages.ts` →
  `src/content/detailPages.ts` (verbatim copy + types)
- `src/pages/[...slug].astro` with `getStaticPaths()` driven by
  `detailPages` slugs
- `src/components/DetailPage.tsx` (or `DetailPage.astro`) rendering all
  section kinds: `split`, `cards`, `list`, `team`
- CTA component shared between detail pages and home

#### Acceptance Criteria
- Visiting any slug from `detailPages` (e.g. `/services/identity-management`,
  `/compliance/cmmc`, `/services/maritime/yacht-services`) renders correctly.
- Build pre-renders all detail pages — no SSR fallback.
- Section kinds (`split`, `cards`, `list`, `team`) all render with
  consistent typography and spacing.

#### Test Requirements
- Unit test asserting every navigation link in `navigationGroups` resolves
  to either a real Astro page or a slug present in `detailPages`.

---

### P2-T4: Services hub + service detail pages content port
Status: Backlog
Owner: any
Priority: Medium
Phase: 2
Depends on: P2-T3
**Execution batch:** **P2-B2** (with P2-T3 — implement system first, then this port).

Port content + assets for: services overview, executive services, yacht /
port / ship-builder maritime trio, identity management, security monitoring,
risk assessment, security controls, training, watchdog cloud, documentation,
penetration testing.

#### Acceptance Criteria
- All 11 service detail pages render via the P2-T3 system.
- Required imagery present in `public/images/devildog/pages/`.
- Internal links between services resolve.

---

### P2-T5: AI Threats page
Status: Backlog
Phase: 2 — Depends on P2-T3.
**Execution batch:** **P2-B3** (with P2-T6, P2-T8).

### P2-T6: Security Reconnaissance page
Status: Backlog
Phase: 2 — Depends on P2-T3.
**Execution batch:** **P2-B3** (with P2-T5, P2-T8).

### P2-T7: Compliance hub + framework pages
Status: Backlog
Phase: 2 — Depends on P2-T3.
**Execution batch:** **P2-B4**.
Pages: compliance overview, CMMC, CMMI, NIST 800-171, GLBA, HIPAA, HITRUST,
ISO 27001/27002.

### P2-T8: Story page
Status: Backlog
Phase: 2 — Depends on P2-T3.
**Execution batch:** **P2-B3** (with P2-T5, P2-T6).

### P2-T9: About-us (team) page
Status: Backlog
Phase: 2 — Depends on P2-T3. Port team imagery to
`public/images/devildog/team/`.
**Execution batch:** **P2-B5**.

### P2-T10: About page (about this site)
Status: Backlog
Phase: 2 — Standalone Astro page; old equivalent is `/about`.
**Execution batch:** **P2-B6**.

### P2-T11: Contact page (UI only)
Status: Backlog
Owner: any
Priority: High
Phase: 2
**Execution batch:** **P2-B7** (with P2-T12 in one session).

#### Goal
Build the contact page with form UI, client-side validation, and the
Turnstile widget. Pair with P2-T12 for the server endpoint.

#### Scope Included
- `src/pages/contact.astro`
- `src/components/ContactForm.tsx` (React island)
- `src/components/TurnstileWidget.tsx`
- `src/lib/contactValidation.ts` — port from
  `~/repos/devildog/src/features/contact/contactValidation.ts` (used by
  both client and server, per ADR-015)
- Port `contactPageContent` from old repo

#### Acceptance Criteria
- Client validation matches the legacy rules (name 2–100, email regex,
  company 2–120, message 20–4000, Turnstile token required).
- Submitting without a Turnstile token shows the verification error.
- Honeypot field present in the rendered HTML but not visible to users.

#### Test Requirements
- Unit tests on `contactValidation.ts` (port the existing test file too).
- Component tests on `ContactForm` for validation, submit-success, and
  submit-error paths (mock `/api/contact`).

---

### P2-T12: `/api/contact` Azure Function (Postmark + Turnstile + honeypot + rate limit)
Status: Backlog
Owner: any
Priority: High
Phase: 2
Depends on: P2-T11 (implement after UI in same **P2-B7** session).
**Execution batch:** **P2-B7** (with P2-T11).

#### Goal
Build the SWA managed-API endpoint that receives contact submissions and
dispatches via Postmark, with Turnstile, honeypot, and rate limiting.

#### Scope Included
- `api/contact/function.json` + `api/contact/index.ts` (HTTP trigger)
- `api/contact/lib/postmark.ts` — port from
  `~/repos/devildog/src/features/contact/postmark.ts`
- `api/contact/lib/turnstile.ts` — port from
  `~/repos/devildog/src/features/contact/turnstile.ts`
- `api/contact/lib/rateLimit.ts` — new (per-IP sliding window in memory)
- Shared validation imported from `src/lib/contactValidation.ts`
- `api/package.json` with minimal deps

#### Acceptance Criteria
- POST `/api/contact` with valid body + token returns `{ ok: true }` and
  triggers a Postmark send (verifiable by test fixture, real call mocked).
- Honeypot filled → `{ ok: true }` with no email send (silent reject).
- Rate limit exceeded → 429.
- Turnstile failure → `{ ok: false }`.
- Server-side validation rejects malformed payloads with a generic
  message (no field-by-field info disclosure beyond what client already
  knows).

#### Test Requirements
- Unit tests on each `lib/` module (mocking `fetch` for Postmark +
  Turnstile, fake timers for rate limit).
- Integration test on the function handler covering all six branches
  (valid, honeypot, rate-limit, turnstile-fail, postmark-fail, missing
  fields).

---

### P2-T13: SEO finalization
Status: Backlog
Owner: any
Priority: Medium
Phase: 2
**Execution batch:** **P2-B8**.

#### Goal
Generate `sitemap.xml` and `robots.txt`, verify per-page metadata, OG
images, JSON-LD, canonical tags. Add `staticwebapp.config.json` with
the www→apex 301 redirect (replaces the old Next.js `proxy.ts`).

#### Acceptance Criteria
- `dist/sitemap-index.xml` includes every public page.
- `dist/robots.txt` references the sitemap.
- `staticwebapp.config.json` redirects `www.devildogcyber.com` → apex
  with 301 (verified via local SWA emulator).

---

## Backlog (Phase 2 — Improvements, in addition to ports)

### P2-I1: Self-hosted fonts via `@fontsource` (per ADR-013)
Status: Backlog
Phase: 2
**Scheduling:** **Superseded** by **P1-T1** / **P1-B1** (fonts added at scaffold per ADR-013). Close this row when scaffold ships; no separate batch.

Replace Google Fonts CDN call with `@fontsource/montserrat` and
`@fontsource/open-sans`. Acceptance: Lighthouse no longer flags
"render-blocking resources" for fonts; no third-party request to Google
Fonts in network panel.

### P2-I2: Honeypot field on contact form
Covered by P2-T11 + P2-T12 acceptance criteria.

### P2-I3: Per-IP sliding-window rate limiter on `/api/contact`
Covered by P2-T12 acceptance criteria.

### P2-I4: Image optimization pass
Status: Backlog
Phase: 2
**Scheduling:** Default **P3-B1** with P3-T1 / P3-T2 (see Execution batches).

Replace raw `<img>` with Astro's `<Image>` (or hand-tuned `srcset`),
serve AVIF/WebP, set explicit width/height, lazy-load below the fold.
Acceptance: Lighthouse Performance ≥ 90 on every page; LCP image is
preloaded on home + each detail page hero.

### P2-I5: Accessibility pass on nav dropdowns
Status: Backlog
Phase: 2
**Scheduling:** Primary work in **P2-B1** / **P2-T1** acceptance. Use this backlog row only for gap-fill if P2-B1 shipped with nav a11y incomplete.

Keyboard support (Tab/Shift-Tab, Enter/Space toggle, Esc close, arrow
navigation between items), correct ARIA (`aria-expanded`, `aria-haspopup`,
`role="menu"` if appropriate), focus-visible outlines. Acceptance: axe
core reports zero serious/critical violations on `/` and `/contact`.

### P2-I6: Reduced-motion + focus-visible styling tokens
Status: Backlog
Phase: 2
**Scheduling:** Default **P3-B1** unless already satisfied during **P2-B1**.

Respect `prefers-reduced-motion` for any transitions over 200ms. Add a
sitewide focus-visible ring using brand red. Acceptance: with
"prefer reduced motion" set in OS, no animated transitions over 200ms run.

---

## Backlog (Phase 3 — Hardening)

### P3-T1: Lighthouse audit pass
Status: Backlog · Phase: 3 · **Execution batch:** **P3-B1** (with P3-T2, P2-I4, P2-I6).
Hit Performance ≥ 95 home / ≥ 90 detail; Accessibility ≥ 95 sitewide;
SEO ≥ 95 sitewide; Best Practices ≥ 95 sitewide.

### P3-T2: Accessibility audit pass (axe + manual keyboard walk)
Status: Backlog · Phase: 3 · **Execution batch:** **P3-B1** (with P3-T1, P2-I4, P2-I6).
Zero serious/critical violations on every public route.

### P3-T3: Bundle size budget
Status: Backlog · Phase: 3 · **Execution batch:** **P3-B2**.
Document per-page JS budget; fail build above threshold.

---

## Backlog (Phase 4 — Deployment)

### P4-T1: Provision Azure SWA resource + DNS
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B1**.

### P4-T2: Configure OIDC federated credential and deploy.yml
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B2** (with P4-T3).

### P4-T3: Production env-var configuration in SWA
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B2** (with P4-T2).

### P4-T4: Postmark sender verification confirmed in production
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B3** (with P4-T5).

### P4-T5: First production deploy + smoke test
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B3** (with P4-T4).

### P4-T6: DNS cutover + www→apex verification
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B4**.

---

## Blocked
None.

## Review
None.

## Done

### P0-T1: Initialize project-specific AI files
Status: Done
Completed: 2026-05-02
Outcome: All `/ai/*.md` files updated for the DevilDog rebuild;
`MIGRATION_INVENTORY.md` created; ADR-011 through ADR-015 added; Phase 1
+ Phase 2 tasks queued. See `/ai/DONE_LOG.md`.
