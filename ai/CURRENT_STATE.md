# Current State

Last Updated: 2026-05-06

## Current Phase
**Phase 4** — **P4-B1**–**P4-B3** **Done**. **P4-B4** (**P4-T6**) = final **www**→apex / default-domain sign-off (**ADR-021**) + optional rollback drill per **`ROADMAP.md`**. **Phase 5** = optional enhancements (backlog only).

## Current Task
**P4-T6** — human: confirm **`www.devildogcyber.com`** **301**→ apex, Portal **default** custom domain = apex, TLS healthy; registrar matches Azure.

## What Exists Now
- **Azure (commercial):** SWA **`devildogcyber`** (**`devil-web-rg`**, **Standard**, **centralus**); production **`https://devildogcyber.com`** + **`/contact`** → Postmark verified (2026-05-06). Default hostname still available for smoke.
- **CI/CD:** **`ci.yml`**, **`deploy.yml`** on **`main`**; **`DEPLOYMENT.md`** documents **GitHub vs Azure** env split for the API.
- **Phases 0–3** and **P4** batches **P4-B1**–**P4-B3**: **Done** per **`TASKS.md`**.

## What Works
Core site, managed **`POST /api/contact`**, Turnstile + Postmark on prod, GitHub **Deploy**.

## What Is Not Built Yet / Follow-up (not all blocking launch)
- **P4-T6** formal checklist + **rollback** test once (**`DEPLOYMENT.md`**).
- **P3** **Partial:** Lighthouse on prod URL, manual keyboard/SR/contrast (**`HANDOFF.md`**).
- **P2-I5** gap-fill (nav a11y) if issues found.
- **P5-T1** housekeeping (dead `getDetailPageBySlug` + orphan **`doctor.jpg`** + README) — **Backlog**, **`TASKS.md`**.
- **P5-T2** activate **`ContentImage`** / **`astro:assets`** pipeline by populating **`src/assets/images/...`** (closes asset-copy half of **P3-B1** Partial follow-up) — **Backlog**, **`TASKS.md`**.
- **Phase 5** enhancements (analytics, alerting, blog, etc.) — **per-request only**.

## Known Problems
Raster assets may be missing under **`src/assets/images/devildog/...`** (**ADR-022** fallback to **`public/`**).

