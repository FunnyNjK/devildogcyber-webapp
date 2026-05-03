# AI Handoff

Last Updated: 2026-05-03

## Current State Summary
**P1-B1** complete: Astro + Tailwind + tokens + scripts + **P1-T2** CI. Next unit: **P2-B1** (layout + home). Legacy site `~/repos/devildog` remains read-only reference.

## Last Completed Task
**P1-B1:** **P1-T1** (scaffold) + **P1-T2** (`ci.yml`) — Done 2026-05-03. See `DONE_LOG.md`.

## Active Task
None — next batch **P2-B1** (`P2-T1` → `P2-T2` same session).

## Next Recommended Task
**P2-B1:** **P2-T1** then **P2-T2** per `/ai/TASKS.md`. Fold **P2-I5** into **P2-T1** acceptance where feasible.

## What Is Blocked
Nothing on the AI side. Azure (**P4-B1**) is production-only.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md`; honor `/ai/AI_RULES.md`, `/ai/DEV_ENVIRONMENT.md`.
- Batch IDs only as listed in `TASKS.md` (ADR-019).

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview.

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — all exit 0 (2026-05-03, WSL).
