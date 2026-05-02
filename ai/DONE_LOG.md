# Done Log

## 2026-05-02 — P0-T1: Initialize project-specific AI files
- Catalogued the legacy DevilDog site at `~/repos/devildog` (Next.js 15,
  App Router, Azure App Service deploy with Postmark + Turnstile contact
  workflow). Read-only inspection only.
- Updated `/ai/PROJECT.md` with project-specific scope, target users,
  primary goals, explicit non-goals, brand tokens (DevilDog reds, cream,
  Montserrat / Open Sans), and repository structure including the
  `src/content/` addition.
- Updated `/ai/CURRENT_STATE.md` to reflect end-of-Phase-0 state and
  point at P1-T1 as the next task.
- Updated `/ai/ARCHITECTURE.md` with the DevilDog-specific system
  diagram, page list, security model, www→apex redirect strategy, and
  external-service table.
- Updated `/ai/ROADMAP.md`: Phase 0 done; Phase 2 broken into 13 page
  tasks (P2-T1 … P2-T13) and 6 improvement tasks (P2-I1 … P2-I6); Phase
  3/4/5 outlined.
- Updated `/ai/TASKS.md`: Phase 1 (P1-T1 scaffold, P1-T2 CI) marked
  Ready with full acceptance criteria and test requirements; Phase 2
  page-by-page tasks queued in Backlog with dependencies; Phase 3/4
  tasks outlined; P0-T1 moved to Done.
- Updated `/ai/TESTING.md` with DevilDog-specific test surface: legacy
  validation port, contact endpoint six-branch coverage, no-orphan-link
  content tests, Postmark/Turnstile/rate-limit mocking strategy.
- Updated `/ai/DEPLOYMENT.md` with the eight required environment
  variables, Azure SWA setup steps, OIDC federation subject string,
  DNS plan, and rollback procedure.
- Added project-specific ADRs to `/ai/DECISIONS.md`:
  - ADR-011: Evolve, don't clone — modernize design while preserving
    brand and IA.
  - ADR-012: Typed content modules in `src/content/`, no CMS.
  - ADR-013: Self-hosted fonts via `@fontsource`, not Google Fonts CDN.
  - ADR-014: `www` → apex 301 lives in `staticwebapp.config.json`,
    not in code.
  - ADR-015: Single source of truth for contact validation —
    `src/lib/contactValidation.ts`.
- Created `/ai/MIGRATION_INVENTORY.md` covering: page mapping (27 user
  pages + 1 API route), asset mapping (34 image files), content mapping
  (typed module ports), drop list (Docker, Next config, App Service
  workflow, runtime turnstile-config endpoint, etc.), improvement list
  (linked to P2-I* tasks), and migration risks.
- Updated `/ai/HANDOFF.md` to brief the next AI on context, hard rules,
  and next recommended task (P1-T1 scaffold).

## 2026-05-02 — Workflow setup (pre-existing)
- Created customized AI project starter for WSL-native dev with Astro 5 +
  React 19 + Tailwind 4 + Azure SWA stack.
- Added `/ai/START_HERE.md` as the single AI entry point.
- Added cross-project rules in `/ai/AI_RULES.md` and `/ai/DEV_ENVIRONMENT.md`.
- Pre-populated cross-project ADRs ADR-001 through ADR-010.
- Added project planning, architecture, task, testing, deployment, decision,
  and handoff files.
