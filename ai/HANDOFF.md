# AI Handoff

Last Updated: 2026-05-03

## Current State Summary
**Phase 2 Done** (**P2-B8**, **P2-T13**): **`public/robots.txt`** + **`astro.config`** sitemap serialization (apex URLs without bogus trailing slashes, home `…/`), **`pnpm build`** runs **`scripts/verify-build-seo.ts`**. **`public/staticwebapp.config.json`** — **`trailingSlash: "never"`**, **`forwardingGateway`** hosts; **ADR-021**: www→apex via SWA **default domain** (+ **`swa`** emulator trailing-slash quirks).

## Last Completed Task
**P2-B8** — **P2-T13** — Done 2026-05-03; see **`DONE_LOG.md`**.

## Active Task
**P3-B1** — **P3-T1** / **P3-T2** + **P2-I4** + **P2-I6**.

## Next Recommended Task
Phase 3 hardened pass: Lighthouse, axe/keyboard polish, Astro `<Image>` + motion/focus follow-ups (**`TASKS.md`** batch).

## What Is Blocked
Nothing AI-side.

## Important Instructions for Next AI
- Read **`/ai/START_HERE.md`**; honor **`AI_RULES.md`**, **`DEV_ENVIRONMENT.md`**.
- Batches per **`TASKS.md`** (ADR-019).

## Known Risks
Image rights; Postmark/DKIM before **P4-B4**; Turnstile allowlist for SWA preview; SWA CLI schema lags **Node 24** — runtime set in Azure (**P4-T1**).

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — all exit 0 (2026-05-03, WSL).
