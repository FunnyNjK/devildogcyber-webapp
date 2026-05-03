# AI Handoff

Last Updated: 2026-05-03

## Current State Summary
DevilDog Cybersecurity rebuild — planning updated for **execution batches**
(ADR-019). Legacy site at `~/repos/devildog` is read-only reference.
Phase 0 done. Next harness unit: **P1-B1** (scaffold + CI in one session).

## Last Completed Task
**P0-T1: Initialize project-specific AI files** — Done 2026-05-02. See `DONE_LOG.md`.

## Active Task
None — next unit is **P1-B1** (`P1-T1` then `P1-T2` same session).

## Next Recommended Task
**P1-B1:** Complete **P1-T1** (Astro + Tailwind + tokens + scripts green),
then **P1-T2** (GitHub Actions CI). Update `TASKS.md`, `HANDOFF.md`,
`CURRENT_STATE.md`, `DONE_LOG.md` once both are **Done**. Batch tables:
`/ai/TASKS.md` → *Execution batches*.

## What Is Blocked
Nothing on the AI side. Azure provisioning (**P4-B1**) is for production only.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md`; honor `/ai/AI_RULES.md`, `/ai/DEV_ENVIRONMENT.md`.
- Only combine task IDs when they share a **batch ID** in `TASKS.md` (ADR-019).
- Legacy repo `~/repos/devildog`: content/assets only; evolve per ADR-011.

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview.

## Tests / Checks Last Run
None (planning-only since P0-T1).
