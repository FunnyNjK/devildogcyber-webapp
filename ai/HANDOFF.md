# AI Handoff

## Last Updated
2026-05-02

## Current State Summary
The DevilDog Cybersecurity rebuild has been initialized. All `/ai/*.md`
files are project-specific. The legacy site at `~/repos/devildog`
(Next.js 15 + App Service) has been catalogued in
`/ai/MIGRATION_INVENTORY.md` and the rebuild plan is queued in
`/ai/TASKS.md` and `/ai/ROADMAP.md`. No application code exists yet;
the next step is the Astro 5 scaffold (P1-T1).

## Last Completed Task
P0-T1: Initialize project-specific AI files (Done 2026-05-02). See
`/ai/DONE_LOG.md` for the deliverable list.

## Current Task
None active — pick up P1-T1 next.

## Next Recommended Task
P1-T1: Scaffold Astro 5 + React 19 + Tailwind 4 + TypeScript project
in this directory, wiring DevilDog brand tokens into the Tailwind theme.
Follow `/ai/TASKS.md` for full scope and acceptance criteria. Do NOT
begin Phase 2 page work until P1-T1 and P1-T2 (CI) are both green.

## What Works
- AI workflow files all DevilDog-specific.
- Brand identity (colors, fonts) documented in `/ai/PROJECT.md`.
- Page-by-page port plan in `/ai/MIGRATION_INVENTORY.md`.
- Asset list (34 image files) ready to copy as part of P2-T1 / P2-T4 /
  P2-T7 / P2-T9.
- Cross-project ADRs (001–010) plus project-specific ADRs (011–015)
  cover every non-default decision.

## What Is Blocked
- Nothing on the AI side. Azure resource provisioning (P4-T1) is a
  prerequisite for production deploy but not for any P1 / P2 / P3 work.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md` first.
- Follow the Context Loading Order in section 3.
- Honor `/ai/AI_RULES.md` and `/ai/DEV_ENVIRONMENT.md` as non-negotiable
  (WSL-native dev, no Docker for app, no `/mnt/c` paths, pnpm only).
- The legacy repo at `~/repos/devildog` is **read-only**. Do not modify it.
- Page content is being ported (`/ai/MIGRATION_INVENTORY.md`), but the
  visual design is being modernized (ADR-011: evolve, don't clone). Use
  the legacy site as reference for *what it is*, not for *how it has to look*.
- Do NOT install dependencies during P0/P1 planning chats. Install during
  P1-T1 when the scaffold is being created.
- Update `/ai/CURRENT_STATE.md`, `/ai/TASKS.md`, `/ai/HANDOFF.md`, and
  `/ai/DONE_LOG.md` before ending any work session.

## Files Changed Recently (this session)
- `/ai/PROJECT.md` — DevilDog-specific scope, brand tokens, non-goals
- `/ai/CURRENT_STATE.md` — Phase-0 → end-of-Phase-0 state
- `/ai/ARCHITECTURE.md` — DevilDog-specific architecture, page list,
  www→apex redirect, security model
- `/ai/ROADMAP.md` — Phase 0 done; Phases 1–5 sized for this rebuild
- `/ai/TASKS.md` — Phase 1 (scaffold + CI) Ready; Phase 2 (13 page tasks
  + 6 improvement tasks) queued; Phase 3/4 outlined
- `/ai/TESTING.md` — DevilDog-specific test surface (validation port,
  contact-endpoint branches, no-orphan-link content tests)
- `/ai/DEPLOYMENT.md` — env var table, Azure SWA setup steps, DNS notes
- `/ai/DECISIONS.md` — ADR-011 through ADR-015 added
- `/ai/MIGRATION_INVENTORY.md` — created (page/asset/content mapping +
  drop list + improvement list + risks)
- `/ai/HANDOFF.md` — this file
- `/ai/DONE_LOG.md` — P0-T1 entry added

## Tests or Checks Last Run
None. Planning-only session.

## Known Risks
- Image-rights assumed clear (live on prod today). Verify with marketing
  if any image is replaced during P2-I4.
- Postmark sender verification expected to pass through unchanged if the
  apex domain DKIM stays in DNS. Confirm before P4-T6 cutover.
- Turnstile hostname allowlist needs to include the SWA preview-environment
  pattern before P2-T11 testing in a preview env.
- If next AI proposes Docker for development, push back and reference
  `/ai/AI_RULES.md` and ADR-001.
