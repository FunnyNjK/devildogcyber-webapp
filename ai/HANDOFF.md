# AI Handoff

Last Updated: 2026-05-03

## Current State Summary
**P2-B1** complete (layout, SEO, home). Next unit: **P2-B2** (detail system + services port). Legacy site `~/repos/devildog` remains read-only reference.

## Last Completed Task
**P2-B1:** **P2-T1** + **P2-T2** — Done 2026-05-03. See `DONE_LOG.md`.

## Active Task
**P2-B2** — run **P2-T3** then **P2-T4** (both in **Ready** in `TASKS.md`).

## Next Recommended Task
**P2-B2:** **P2-T3** (detail-page system) then **P2-T4** (services hub + imagery) per `/ai/TASKS.md`.

## What Is Blocked
Nothing on the AI side. Azure (**P4-B1**) is production-only.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md`; honor `/ai/AI_RULES.md`, `/ai/DEV_ENVIRONMENT.md`.
- Batch IDs only as listed in `TASKS.md` (ADR-019).

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview.

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — all exit 0 (2026-05-03, WSL). Lighthouse targets for `/` (Performance / Accessibility ≥ 95) not run in CI — verify in **P3-T1** or locally before launch.
