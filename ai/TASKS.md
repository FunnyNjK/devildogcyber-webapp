# Tasks

Last Updated: 2026-05-03

## Active Task
**P2-B3** — run **P2-T5**, **P2-T6**, and **P2-T8** together (same batch).

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
| **P2-I1** | **Done** at **P1-B1** — `@fontsource` in `src/styles/global.css`; Lighthouse / no Google Fonts verified in **P3-T1**. |
| **P2-I2, P2-I3** | Covered by P2-B7. |
| **P2-I4** | Run as part of **P3-B1** (image pass + audit fixes together). |
| **P2-I5** | Primary work landed in **P2-B1** / P2-T1; backlog row = gap-fill only if a11y gaps remain after **P3-T2**. |
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
None — next batch (**P2-B3**) entries remain in Phase 2 Backlog below until picked up.

## Backlog (Phase 2 — Core Buildout)

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
Status: Done (2026-05-03). Fonts imported in `src/styles/global.css` at **P1-B1**; confirm no Google Fonts request + Lighthouse under **P3-T1**.

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

### P1-T1: Scaffold Astro 5 + React 19 + Tailwind 4 project — Done; see `DONE_LOG.md`.
### P1-T2: Add GitHub Actions CI workflow — Done; see `DONE_LOG.md`.
### P2-T1: BaseLayout, SiteHeader, SiteFooter, base SEO + JSON-LD — Done; see `DONE_LOG.md`.
### P2-T2: Home page — Done; see `DONE_LOG.md`.
### P2-T3: Detail-page system (`detailPages`, `[...slug].astro`, section renderer, nav invariant test, `/about` + `/contact` stubs) — Done; see `DONE_LOG.md`.
### P2-T4: Services imagery + URLs via detail system (`public/images/devildog/pages/`, legacy team photos for `/about-us`) — Done; see `DONE_LOG.md`.

### P0-T1: Initialize project-specific AI files
Status: Done
Completed: 2026-05-02
Outcome: All `/ai/*.md` files updated for the DevilDog rebuild;
`MIGRATION_INVENTORY.md` created; ADR-011 through ADR-015 added; Phase 1
+ Phase 2 tasks queued. See `/ai/DONE_LOG.md`.
