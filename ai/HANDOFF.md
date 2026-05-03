# AI Handoff

Last Updated: 2026-05-02

## Current State Summary
DevilDog Cybersecurity rebuild — initialized. All `/ai/*.md` files are
project-specific. Legacy site at `~/repos/devildog` (Next.js 15 + App
Service) is catalogued in `MIGRATION_INVENTORY.md`. No application code
exists yet. Phase 0 closed; Phase 1 (scaffold + CI) is ready.

## Last Completed Task
**P0-T1: Initialize project-specific AI files** — Done 2026-05-02. Full
deliverable list in `DONE_LOG.md`.

## Active Task
None — pick up P1-T1 next.

## Next Recommended Task
**P1-T1: Scaffold Astro 5 + React 19 + Tailwind 4 + TypeScript project.**
Wire DevilDog brand tokens (`--dd-red`, `--dd-cream`, etc.) into the
Tailwind theme so subsequent page work has the design primitives ready.
Pin `engines.node: ">=24"` and `.nvmrc: 24` per ADR-018. See `TASKS.md`
for full acceptance criteria. Do NOT start Phase 2 page work until
P1-T1 and P1-T2 (CI) are both green.

## What Is Blocked
- Nothing on the AI side. Azure resource provisioning (P4-T1) is a
  prerequisite for production deploy but not for any P1 / P2 / P3 work.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md` first; honor `/ai/AI_RULES.md` and
  `/ai/DEV_ENVIRONMENT.md` (WSL-native, no Docker for app, no `/mnt/c`).
- New hard rules (added 2026-05-02): push after every commit; archive
  Done tasks from `TASKS.md` to `DONE_LOG.md`; keep `CURRENT_STATE.md`
  ≤ 80 lines and `HANDOFF.md` ≤ 50 lines; `Last Updated` date on every
  planning file you change.
- Legacy repo at `~/repos/devildog` is **read-only**. Use as reference
  for *what it is*, not for *how it has to look* (ADR-011: evolve,
  don't clone). Copy CONTENT and ASSETS only.
- Do NOT install dependencies during P0/P1 planning chats. Install
  during P1-T1 when the scaffold is being created.
- Per ADR-018, `engines.node: ">=24"` from day one — do not pin to 22.

## Known Risks
- Image-rights assumed clear (live on prod today). Verify with marketing
  if any image is replaced during P2-I4.
- Postmark sender verification expected to pass through unchanged if
  the apex domain DKIM stays in DNS. Confirm before P4-T6 cutover.
- Turnstile hostname allowlist needs to include the SWA preview-environment
  pattern before P2-T11 testing in a preview env.

## Tests / Checks Last Run
None. Planning-only session.
