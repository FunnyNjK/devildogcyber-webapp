# Current State

Last Updated: 2026-05-03

## Current Phase
Phase 1 — Foundation (**Ready**). Phase 0 complete.

## Current Task
**P1-B1** next (constituents: **P1-T1**, **P1-T2** in one autonomous session).
See `/ai/TASKS.md` → *Execution batches* and ADR-019.

## What Exists Now
- Full `/ai/` planning set for the DevilDog Astro + SWA rebuild.
- ADRs through **ADR-019** (autonomous execution batches).
- **Execution batch** tables in `TASKS.md` for `run-phase.sh` /
  `run-phase-cursor.sh` counts.
- No application scaffold yet (P1-T1 not started). No CI workflow (P1-T2).

## What Works
- AI workflow, migration inventory, and batched task schedule are aligned.

## What Is Not Built Yet
- Astro project, pages, contact API, Azure SWA (see `ROADMAP.md`).

## Known Problems
- None at planning level. Risks in `MIGRATION_INVENTORY.md`.

## Important Files or Folders
- `/ai/START_HERE.md` — entry file
- `/ai/TASKS.md` — tasks + **Execution batches** (harness `<num_tasks>`)
- `/ai/HANDOFF.md` — resume pointer
- `/ai/ROADMAP.md` — phase batch counts
- `/ai/DECISIONS.md` — ADR-019
- Old site (read-only): `~/repos/devildog`

## Next Recommended Action
Run **P1-B1**: scaffold per `TASKS.md` / `PROJECT.md`, then CI per
`DEPLOYMENT.md`. Do not start Phase 2 until P1-B1 is Done.
