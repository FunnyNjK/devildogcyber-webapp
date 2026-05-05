# AI Handoff

Last Updated: 2026-05-05

## Current State Summary
**Phase 3 complete** (**P3-B1**, **P3-B2**). **P3-T3:** **`scripts/js-budget.config.json`** + **`scripts/check-js-budget.mjs`** — hydrated React island JS (gzip) per route + max single chunk; **`pnpm build`** fails on breach. Earlier **P3-B1** deliverables unchanged (**`ContentImage`**, axe, etc.).

## Last Completed Task
**P3-B2** — **P3-T3** — Done 2026-05-05; see **`DONE_LOG.md`**.

## Active Task
**Phase 4** — **P4-B1** (**P4-T1**), **Unattended: No** (Azure SWA + DNS — pair with human).

## Next Recommended Task
**P4-T1** per **`TASKS.md`** with human in the loop; do **not** mark **Done** from harness alone without completed Azure/DNS steps (**matrix:** **P4-T1**).

## What Is Blocked
Nothing — repo work is unblocked.

### Human follow-up (Partial tasks from **P3-B1**)
Complete these before treating launch hardening as signed off:
1. **Assets:** Copy raster files from the legacy site into **`src/assets/images/devildog/`** using the same paths as today’s **`/images/devildog/...`** URLs (mirror **`home/`**, **`pages/`**, **`team/`**, logos). Until then, **`ContentImage`** falls back to plain **`<img>`** (no AVIF/WebP from the pipeline). Optionally also keep **`public/images/...`** for deployment if you serve static files outside the optimized pipeline.
2. **P3-T1 (Lighthouse):** Run Chrome Lighthouse (or CI LHCI if you add it later) against **production** or **SWA preview** URLs; confirm **Performance** ≥ 95 home / ≥ 90 detail and **Accessibility / SEO / Best Practices** ≥ 95 as in **`TASKS.md`**.
3. **P3-T2 (Manual a11y):** Keyboard walk (Tab / Shift+Tab, Enter, Escape, arrows in nav), plus a short screen-reader pass; verify **color contrast** in real browsers (axe in JSDOM skips **color-contrast**).
4. **P2-I6 (optional):** With OS “reduce motion” enabled, spot-check that hover/translate feels acceptable (global CSS already short-circuits transitions).

## Important Instructions for Next AI
- Read **`/ai/START_HERE.md`**; honor **`AI_RULES.md`**, **`DEV_ENVIRONMENT.md`**.
- **Phase 4** tasks include **Unattended: No** / **Partial** — follow the **Human pairing vs unattended harness** matrix in **`TASKS.md`** before using **`./run-phase-cursor.sh`**.

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview; SWA CLI schema lags **Node 24** — runtime set in Azure (**P4-T1**).

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` — all exit 0 (2026-05-05, WSL).
