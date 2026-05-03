# AI Handoff

Last Updated: 2026-05-03

## Current State Summary
**P2-B5** complete (**P2-T9**): `/about-us` uses optional **`hero.layout: 'backdrop'`** (full-bleed dimmed photo + gradient, matching legacy detail hero) and **team** section cards reworked to legacy vertical layout (portrait strip, role eyebrow, pill highlights). **`navLinks`** asserts `/about-us`.

## Last Completed Task
**P2-B5:** **P2-T9** — Done 2026-05-03. See `DONE_LOG.md`.

## Active Task
**P2-B6** — **P2-T10** About-this-site (`/about`) page.

## Next Recommended Task
Execute **P2-B6**: standalone **`/about`** Astro page vs legacy IA and content port.

## What Is Blocked
Nothing on the AI side. Azure (**P4-B1**) is production-only.

## Important Instructions for Next AI
- Read `/ai/START_HERE.md`; honor `/ai/AI_RULES.md`, `/ai/DEV_ENVIRONMENT.md`.
- Batch IDs only as listed in `TASKS.md` (ADR-019).

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview.

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — all exit 0 (2026-05-03, WSL).
