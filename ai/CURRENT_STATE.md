# Current State

Last Updated: 2026-05-02

## Current Phase
Phase 0 — Project Initialization (P0-T1 in progress; closes at end of this session)

## Current Task
P0-T1: Initialize project-specific AI files (this session)

## What Exists Now
- `/ai/` planning files customized for this project (DevilDog Cybersecurity
  marketing rebuild on Astro 5 + React 19 + Tailwind 4 + Azure SWA).
- Cross-project ADRs ADR-001 through ADR-010 baked in.
- Project-specific ADRs ADR-011 through ADR-015 added (see DECISIONS.md).
- `/ai/MIGRATION_INVENTORY.md` documenting page mapping, asset mapping,
  content mapping, drop list, and improvement list relative to the old
  Next.js site at `~/repos/devildog`.
- No application code yet. No `package.json`, no `astro.config.ts`,
  no scaffold, no CI workflow.

## What Works
- The AI workflow is fully briefed for the DevilDog rebuild.
- The next AI tool can pick up P1-T1 (scaffold) directly from `TASKS.md`.

## What Is Not Built Yet
- Astro project scaffold (P1-T1).
- GitHub Actions CI workflow (P1-T2).
- Any pages, components, or content modules.
- Contact-form Azure Function.
- Azure SWA resource and DNS for `devildogcyber.com`.

## Known Problems
- None at the planning level.
- Risks tracked in `/ai/MIGRATION_INVENTORY.md` (image rights, Postmark
  sender re-verification, www→apex redirect path on SWA).

## Important Files or Folders
- `/ai/START_HERE.md` — main AI entry file
- `/ai/PROJECT.md` — DevilDog project definition, brand tokens, non-goals
- `/ai/MIGRATION_INVENTORY.md` — page/asset/content map from old to new
- `/ai/AI_RULES.md` — hard rules (WSL-native, no Docker for dev)
- `/ai/DEV_ENVIRONMENT.md` — dev setup and conventions
- `/ai/DECISIONS.md` — cross-project + project-specific ADRs (011+)
- `/ai/TASKS.md` — Ready / Backlog / Done tracker
- `/ai/HANDOFF.md` — resume context
- Old reference repo (read-only): `~/repos/devildog`

## Next Recommended Action
Start P1-T1: scaffold the Astro 5 + React 19 + Tailwind 4 + TypeScript
project per the structure in `PROJECT.md`. Do not begin Phase 2 page work
until the scaffold and CI are green.
