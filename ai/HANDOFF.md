# AI Handoff

Last Updated: 2026-05-05

## Current State Summary
**Phase 3 batch 1 Done** (**P3-B1**: **P3-T1**, **P3-T2**, **P2-I4**, **P2-I6**). **`ContentImage.astro`** + **`src/lib/contentImages.ts`** (**ADR-022**); **`sharp`**; LCP **`<link rel="preload" as="image">`** on **`/`** + detail heroes; global **`prefers-reduced-motion`** overrides; axe on **`dist/**/*.html`** (**`tests/a11y/dist-html-axe.test.ts`**, **`color-contrast`** excluded under JSDOM). CI order: **Build → Test** so axe runs against built HTML. **Site header** logo remains a React **`<img>`** (tiny asset).

## Last Completed Task
**P3-B1** — Done 2026-05-05 (implementation + checks); see **`DONE_LOG.md`**.

## Active Task
**P3-B2** — **P3-T3** (bundle size budget).

## Next Recommended Task
**`./run-phase-cursor.sh 1`** for **P3-B2** only (or **`2`** if replaying full Phase 3), per **`TASKS.md`**.

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
- **P3-B2** (**P3-T3** only) is **Unattended: OK** — safe to complete via harness if scope stays on bundle budgets.

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview; SWA CLI schema lags **Node 24** — runtime set in Azure (**P4-T1**).

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` (includes axe on **dist** after build) — all exit 0 (2026-05-05, WSL).
