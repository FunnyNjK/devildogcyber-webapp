# Tasks

Last Updated: 2026-05-05

## Active Task
**Phase 4** — **P4-B2**: **P4-T2** **Done** (repo/deploy wiring + docs). **P4-T3** — human enters SWA + GitHub secrets (**Unattended: No**); see **`DEPLOYMENT.md`** § **P4-B2** and **`HANDOFF.md`**.

---

## Execution batches (autonomous — `./run-phase-cursor.sh N`)

**Primary harness:** `./run-phase-cursor.sh <N>` (Cursor CLI `agent`). Same
batch counts **`N`** apply to `./run-phase.sh` if you use Claude Code instead.

Autonomous harnesses advance **one batch per iteration**. A **batch** is a defined set of task IDs
meant to finish in **one agent session** before handoff / commit
(ADR-019). This cuts repeated `/ai` context loading and token cost.

**Rules**

- Finish **every** task in the batch to its acceptance criteria (or
  document Blocked with reason) before ending the session.
- Update `TASKS.md`, `HANDOFF.md`, `CURRENT_STATE.md`, and `DONE_LOG.md`
  for the batch; name each constituent task ID in the handoff.
- Do **not** merge tasks across batches or invent new groupings without
  updating this section and ADR-019.

### Human pairing vs unattended harness (`run-phase-cursor.sh` / `run-phase.sh`)

Some work **must not** be driven only by the phase scripts: it needs you
(keys in portals, DNS at registrar, Azure admin consent, Postmark
verification, domain decisions). Other work is fine unattended if CI and
repo auth already work.

**Legend**

| Tag | Meaning |
|-----|---------|
| **`Unattended: OK`** | Safe to run under `./run-phase-cursor.sh` (or `./run-phase.sh`) without you at the keyboard (AI reads `/ai`, edits code, runs tests; no live secrets or tenant-only actions required to finish). |
| **`Unattended: Partial`** | AI can do most of the implementation; **you** must supply secrets, approve org settings, confirm domain/DNS choices, run a provider dashboard step, or do a **manual** check (e.g. keyboard walk) before the task is truly **Done**. **Pause the script** for those steps, then resume or run the next batch in chat. |
| **`Unattended: No`** | **Do not** rely on the harness alone for completion. Treat as **pair work**: Cursor/IDE session with the human, or human executes portal/registrar while AI documents. Script may still be used **only** for doc/code prep if `HANDOFF.md` says so. |

**Task matrix (every ID — check before each `./run-phase-cursor.sh` iteration)**

| ID | Unattended | Why |
|----|------------|-----|
| **P0-T1** | OK | Planning-only. |
| **P1-T1** | OK | Scaffold + `.env.example`; no live API keys. |
| **P1-T2** | Partial | First-time GitHub Actions may need org/repo settings (billing, Actions enabled, branch protection). |
| **P2-T1**–**P2-T10** | OK | Code and static content; domain strings in copy are from spec, not live DNS changes. |
| **P2-T11** | Partial | Turnstile hostname allowlist / real widget verification often needs your Cloudflare dashboard + local `.env` secrets (never committed). |
| **P2-T12** | Partial | Postmark + Turnstile **server** secrets for real sends; AI uses mocks in tests — you paste keys in Azure/local when validating. |
| **P2-T13** | Partial | `staticwebapp.config.json` uses real hostnames; file edits OK unattended — **you** confirm DNS/SWA when going live (overlaps P4). |
| **P2-I4** | OK | Code/refactor; Lighthouse targets may need your eye on scores in **P3-T1**. |
| **P2-I5** | Partial | Gap-fill a11y — may include manual keyboard verification with you. |
| **P2-I6** | OK | CSS/tokens; quick OS reduced-motion check is optional with you. |
| **P3-T1** | Partial | Lighthouse interpretation + prod/preview URL context; often automated in CI but **you** confirm “good enough” for launch. |
| **P3-T2** | Partial | Explicit **manual** keyboard / screen-reader walk — not fully automatable. |
| **P3-T3** | OK | Thresholds in repo/CI. |
| **P4-T1** | No | Azure subscription, resource naming, DNS delegation — **you** + AI together. |
| **P4-T2** | Partial | AI edits workflows; **Entra / federated credential** often needs tenant admin (you or IT). |
| **P4-T3** | No | **Typing production secrets** into SWA / GitHub Environments — **you**; AI lists names only. |
| **P4-T4** | No | Postmark sender/DNS verification — **your** inbox or DNS console. |
| **P4-T5** | Partial | Deploy pipeline may need **your** approval click + smoke test observation. |
| **P4-T6** | No | Registrar DNS cutover / go-live window — **you** execute; AI documents checklist. |

**Operational rule for any AI run**

Before starting a batch in `./run-phase-cursor.sh`, read this matrix. If **any**
constituent task is **No** or **Partial** and the human has **not** already
completed the hands-on parts, either: (1) **skip** that batch in the script
and work with the human in a normal chat session first, or (2) run the
script only for the **OK** sub-portion and leave `HANDOFF.md` in **Blocked**
with “needs human: …” until unblocked.

### Phase 1 — Foundation

| Batch ID | Constituent tasks (order) | Harness iterations (`N`) for full phase |
|----------|---------------------------|-------------------------------------|
| **P1-B1** | P1-T1 → P1-T2 | **1** (`./run-phase-cursor.sh 1`) |

### Phase 2 — Core buildout

| Batch ID | Constituent tasks | Notes |
|----------|-------------------|--------|
| **P2-B1** | P2-T1, P2-T2 | Layout + home. Treat **P2-I5** (nav keyboard / ARIA) as part of **P2-T1** acceptance unless truly blocked — avoid a separate I5-only iteration. |
| **P2-B2** | P2-T3, P2-T4 | Detail-page system, then services hub + all service detail pages in `TASKS.md`. |
| **P2-B3** | P2-T5, P2-T6, P2-T8 | AI Threats, Security Reconnaissance, Story — same static pattern after P2-B2. |
| **P2-B4** | P2-T7 | Compliance hub + framework pages (single large batch). |
| **P2-B5** | P2-T9 | About-us (team) page + imagery. |
| **P2-B6** | P2-T10 | `/about` (legacy marketing About page). |
| **P2-B7** | P2-T11, P2-T12 | Contact UI + `/api/contact` Azure Function in one session (larger diff; acceptable per ADR-019). |
| **P2-B8** | P2-T13 | Sitemap, robots, SEO verification, `staticwebapp.config.json` — run after public routes exist. |

**Phase 2 — improvements (default schedule)**

| Item | Default |
|------|---------|
| **P2-I1** | **Done** at **P1-B1** — `@fontsource` in `src/styles/global.css`; Lighthouse / no Google Fonts verified in **P3-T1**. |
| **P2-I2, P2-I3** | **Done** (2026-05-03) — shipped in **P2-B7**. |
| **P2-I4** | **Done** (2026-05-05) — **`P3-B1`**; see **`HANDOFF.md`** for asset copy + Lighthouse follow-up. |
| **P2-I5** | Primary work landed in **P2-B1** / P2-T1; backlog row = gap-fill only if a11y gaps remain after **P3-T2**. |
| **P2-I6** | **Done** (2026-05-05) — **`P3-B1`** (**`prefers-reduced-motion`**, **`focus-visible`** in **`global.css`**). |

**Harness iterations for full Phase 2** (e.g. `./run-phase-cursor.sh 8`): **8**

### Phase 3 — Hardening

| Batch ID | Constituent tasks |
|----------|-------------------|
| **P3-B1** | P3-T1, P3-T2, **P2-I4**, **P2-I6** |
| **P3-B2** | P3-T3 |

**Harness iterations for full Phase 3** (e.g. `./run-phase-cursor.sh 2`): **2**

### Phase 4 — Deployment

**Default: do not run Phase 4 batches unattended end-to-end.** Pair with the
human per the matrix above (`P4-T*` includes multiple **No** / **Partial**).

| Batch ID | Constituent tasks | Notes |
|----------|-------------------|--------|
| **P4-B1** | P4-T1 | Azure SWA provisioning + GitHub **`AZURE_STATIC_WEB_APPS_API_TOKEN`**; custom DNS can follow (**P4-T6**). |
| **P4-B2** | P4-T2, P4-T3 | **`deploy.yml`** is in repo; human: Entra/OIDC if desired + SWA **Configuration** / typed secrets (**P4-T3**). |
| **P4-B3** | P4-T4, P4-T5 | Postmark verification + first production deploy + smoke test. |
| **P4-B4** | P4-T6 | DNS cutover + www→apex verification. |

**Harness iterations for full Phase 4** (e.g. `./run-phase-cursor.sh 4`): **4**

### Phase 5 — Enhancements

Not batch-scheduled (per-request). Do not include harness `N` counts.

### Quick reference: `./run-phase-cursor.sh N`

Run from repo root (where `/ai/` lives). **`N`** = number of batch iterations.
Claude Code users: same **`N`** with `./run-phase.sh`.

| Goal | Command |
|------|---------|
| Phase 1 only (from repo ready for P1) | `./run-phase-cursor.sh 1` |
| Phase 2 only (Phase 1 already Done) | `./run-phase-cursor.sh 8` |
| Phase 3 only (Phase 2 already Done) | `./run-phase-cursor.sh 2` |
| Phase 4 only (Phase 3 already Done) | `./run-phase-cursor.sh 4` |
| **Phases 1–4 end-to-end** | **`./run-phase-cursor.sh 15`** |

---

## Ready
**P4-T3** (finishes **P4-B2**): human completes **`DEPLOYMENT.md`** § **P4-B2** (GitHub **`PUBLIC_TURNSTILE_SITE_KEY`**, SWA application settings, Turnstile hosts, smoke **`/contact`**). Then **P4-B3** (**P4-T4**, **P4-T5**).

## Done (recent)

### P3-B2 (2026-05-05)
**P3-T3** — Hydrated **JS gzip** budgets: **`scripts/js-budget.config.json`** (default **72 KiB** total per page, **_contact_ 75 KiB**, largest single chunk **≈62 KiB**); **`scripts/check-js-budget.mjs`** walks **`dist/**/*.html`**, unions **`/_astro/*.js`** island entries + static **Vite** `from"./…js"` graph, fails **`pnpm build`** on breach. **Human:** none for this task (**Unattended: OK**).

### P3-B1 (2026-05-05)
**P3-T1**, **P3-T2**, **P2-I4**, **P2-I6** — Implemented **`ContentImage.astro`** + **`getImage`** LCP preload on home/detail heroes; global reduced-motion strip; axe on **`dist/**/*.html`** ( **`color-contrast`** off under JSDOM); CI runs **Build → Test** so axe executes. Remaining human work for **Partial** tasks: Lighthouse on real/preview URLs; keyboard + screen-reader walk + contrast; copy rasters into **`src/assets/images/devildog/...`** (see **ADR-022**, **`HANDOFF.md`**).

## Backlog (Phase 2 — Improvements, in addition to ports)

### P2-I1: Self-hosted fonts via `@fontsource` (per ADR-013)
Status: Done (2026-05-03). Fonts imported in `src/styles/global.css` at **P1-B1**; **Partial:** human confirms no Google Fonts request + Lighthouse thresholds on deploy (**P3-T1** follow-up).

### P2-I2: Honeypot field on contact form
Done (2026-05-03) — **`P2-B7`**.

### P2-I3: Per-IP sliding-window rate limiter on `/api/contact`
Done (2026-05-03) — **`P2-B7`**.

### P2-I4: Image optimization pass
Status: Done (2026-05-05) — batch **P3-B1**; human: copy image binaries + confirm Lighthouse scores on deploy.
Phase: 2
**Scheduling:** Default **P3-B1** with P3-T1 / P3-T2 (see Execution batches).
**Unattended script:** **OK** (see matrix; confirm Lighthouse with human if needed).

Replace raw `<img>` with Astro's `<Image>` (or hand-tuned `srcset`),
serve AVIF/WebP, set explicit width/height, lazy-load below the fold.
Acceptance: Lighthouse Performance ≥ 90 on every page; LCP image is
preloaded on home + each detail page hero. **Shipped:** **`ContentImage.astro`**, **`src/lib/contentImages.ts`**, **`sharp`**, LCP **`<link rel="preload">`** + **React header logo** still plain **`<img>`** (optional follow-up).

### P2-I5: Accessibility pass on nav dropdowns
Status: Backlog
Phase: 2
**Scheduling:** Primary work in **P2-B1** / **P2-T1** acceptance. Use this backlog row only for gap-fill if P2-B1 shipped with nav a11y incomplete.
**Unattended script:** **Partial** — manual keyboard / screen-reader verification with human.

Keyboard support (Tab/Shift-Tab, Enter/Space toggle, Esc close, arrow
navigation between items), correct ARIA (`aria-expanded`, `aria-haspopup`,
`role="menu"` if appropriate), focus-visible outlines. Acceptance: axe
core reports zero serious/critical violations on `/` and `/contact`.

### P2-I6: Reduced-motion + focus-visible styling tokens
Status: Done (2026-05-05) — batch **P3-B1**; optional: human toggles OS “reduce motion” once.
Phase: 2
**Scheduling:** Default **P3-B1** unless already satisfied during **P2-B1**.
**Unattended script:** **OK** (optional OS setting check with human).

Respect `prefers-reduced-motion` for any transitions over 200ms. Add a
sitewide focus-visible ring using brand red. Acceptance: with
"prefer reduced motion" set in OS, no animated transitions over 200ms run. **Shipped:** **`@media (prefers-reduced-motion: reduce)`** collapses transitions/animations in **`global.css`**; **`focus-visible`** ring already uses **`--dd-red-bright`**.

---

## Backlog (Phase 3 — Hardening)

### P3-T1: Lighthouse audit pass
Status: Done (automatable scope, 2026-05-05) — batch **P3-B1**; **Partial:** human runs Lighthouse on prod/preview and signs off on thresholds.
Phase: 3 · **Execution batch:** **P3-B1** (with P3-T2, P2-I4, P2-I6).
**Unattended script:** **Partial** — CI/automation can run audits; human confirms launch bar and prod/preview URLs.
Hit Performance ≥ 95 home / ≥ 90 detail; Accessibility ≥ 95 sitewide;
SEO ≥ 95 sitewide; Best Practices ≥ 95 sitewide. **Shipped:** image pipeline + preload + CI build/test order; no Lighthouse CLI in-repo.

### P3-T2: Accessibility audit pass (axe + manual keyboard walk)
Status: Done (automatable scope, 2026-05-05) — batch **P3-B1**; **Partial:** human keyboard + screen-reader + contrast pass.
Phase: 3 · **Execution batch:** **P3-B1** (with P3-T1, P2-I4, P2-I6).
**Unattended script:** **Partial** — axe can be automated; **manual keyboard walk requires human**.
Zero serious/critical violations on every public route. **Shipped:** **`tests/a11y/dist-html-axe.test.ts`** (serious/critical; **`color-contrast`** disabled under JSDOM — verify in browser).

### P3-T3: Bundle size budget
Status: Done (2026-05-05) — batch **P3-B2**.
Phase: 3 · **Execution batch:** **P3-B2**.
**Unattended script:** **OK**.
Document per-page JS budget; fail build above threshold. **Shipped:** **`scripts/js-budget.config.json`**, **`scripts/check-js-budget.mjs`**, chained at end of **`pnpm build`**.

---

## Backlog (Phase 4 — Deployment)

### P4-T3: Production env-var configuration in SWA
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B2** (**P4-T2** **Done**).
**Unattended script:** **No** — **you** enter secrets in Azure/GitHub; AI must not fake Done without confirmation. **Checklist:** **`DEPLOYMENT.md`** § **P4-B2**.

### P4-T4: Postmark sender verification confirmed in production
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B3** (with P4-T5).
**Unattended script:** **No** — Postmark/DNS inbox steps **require human**.

### P4-T5: First production deploy + smoke test
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B3** (with P4-T4).
**Unattended script:** **Partial** — pipeline may need **your** approval + observed smoke test.

### P4-T6: DNS cutover + www→apex verification
Status: Backlog · Phase: 4 · **Execution batch:** **P4-B4**.
**Unattended script:** **No** — registrar / go-live **requires human**; AI documents checklist only.

---

## Blocked
**P4-T3** — production secrets and Portal configuration (**Unattended: No**). Follow **`/ai/DEPLOYMENT.md`** § **P4-B2**; confirm **`POST /api/contact`** + inbox delivery before marking **Done**.

## Review
None.

## Done

### P1-T1: Scaffold Astro 5 + React 19 + Tailwind 4 project — Done; see `DONE_LOG.md`.
### P1-T2: Add GitHub Actions CI workflow — Done; see `DONE_LOG.md`.
### P2-T1: BaseLayout, SiteHeader, SiteFooter, base SEO + JSON-LD — Done; see `DONE_LOG.md`.
### P2-T2: Home page — Done; see `DONE_LOG.md`.
### P2-T3: Detail-page system (`detailPages`, `[...slug].astro`, section renderer, nav invariant test, `/about` + `/contact` stubs) — Done; see `DONE_LOG.md`.
### P2-T4: Services imagery + URLs via detail system (`public/images/devildog/pages/`, legacy team photos for `/about-us`) — Done; see `DONE_LOG.md`.
### P2-T5: AI Threats page — Done; see `DONE_LOG.md`.
### P2-T6: Security Reconnaissance page — Done; see `DONE_LOG.md`.
### P2-T8: Story page — Done; see `DONE_LOG.md`.
### P2-T7: Compliance hub + framework pages — Done; see `DONE_LOG.md`.
### P2-T9: About-us (team) page — Done; see `DONE_LOG.md`.
### P2-T10: `/about` (legacy marketing About page) — Done; see `DONE_LOG.md`.
### P2-T11: Contact page (React island + validation + Turnstile) — Done; see `DONE_LOG.md`.
### P2-T12: `/api/contact` Azure Function (Postmark, Turnstile, honeypot, rate limit) — Done; see `DONE_LOG.md`.
### P2-T13: SEO finalization — Done; see `DONE_LOG.md`.

### P3-T3: Bundle size budget — Done; see `DONE_LOG.md`.

### P4-T2: Configure deploy.yml (+ optional OIDC) — Done 2026-05-06 (chat): **`deploy.yml`** production path via **`AZURE_STATIC_WEB_APPS_API_TOKEN`** (**ADR-023**); **`ci.yml`** Build passes **`PUBLIC_TURNSTILE_SITE_KEY`** when set (parity with **Deploy**). Entra / **`azure/login`** remains optional (**ADR-006**); tenant admin not required for stock SWA deploy.

### P4-T1: Provision Azure SWA + GitHub deploy — Done 2026-05-06; **`devildogcyber`**, **`devil-web-rg`**, **`AZURE_STATIC_WEB_APPS_API_TOKEN`**, green **Deploy** (`https://polite-sky-09fcf0610.7.azurestaticapps.net`); commits **`56ae3df`**, **`79398f1`**, **`8a5c2da`**. **P4-T6** DNS remains.

### P0-T1: Initialize project-specific AI files
Status: Done
Completed: 2026-05-02
Outcome: All `/ai/*.md` files updated for the DevilDog rebuild;
`MIGRATION_INVENTORY.md` created; ADR-011 through ADR-015 added; Phase 1
+ Phase 2 tasks queued. See `/ai/DONE_LOG.md`.
