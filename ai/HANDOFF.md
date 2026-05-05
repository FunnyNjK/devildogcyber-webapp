# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**Phase 3** complete. **Phase 4** — **P4-T1** (**Unattended: No**). Owner confirmed Azure targets (**ADR-023**): subscription **`179ae124-553a-42c7-89cd-0d665cddef65`**, **`devil-web-rg`**, SWA **`devildogcyber`**, **Standard**, **centralus**, GitHub [FunnyNjK/devildogcyber-webapp](https://github.com/FunnyNjK/devildogcyber-webapp). Repo now has **`.github/workflows/deploy.yml`** + updated **`scripts/azure/provision-swa.sh`** + **`/ai/DEPLOYMENT.md`**.

## Last Completed Task
**P3-B2** — **P3-T3** — Done 2026-05-05; see **`DONE_LOG.md`**.

## Active Task
**P4-B1** (**P4-T1**): human provisions SWA (script or Portal), adds GitHub secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`**, confirms first **Deploy** workflow success on **`main`**. Custom domain via **GoDaddy** + Azure can wait (**P4-T6**).

## Next Recommended Task
**P4-B2**: SWA **Configuration** app settings (Postmark, Turnstile, build-time **`PUBLIC_*`** if needed), Entra/OIDC only if you add **`azure/login`** — see **`DEPLOYMENT.md`** **P4-T2+**.

## What Is Blocked
**P4-T1** **Done** blocked until Azure resource exists + deployment token secret is set + deploy workflow green (DNS at GoDaddy not required for first cut).

### Human follow-up (Partial tasks from **P3-B1**)
See prior **`HANDOFF`** bullets (assets, Lighthouse, manual a11y, reduced-motion spot-check).

## Important Instructions for Next AI
- Read **`/ai/START_HERE.md`**; honor **`AI_RULES.md`**, **`DEV_ENVIRONMENT.md`**.
- **Phase 4** matrix in **`TASKS.md`** — no marking **P4-T1** **Done** without human Azure/GitHub steps.

## Known Risks
Image rights; Postmark/DKIM before go-live; **Turnstile** allowlist for SWA ***.azurestaticapps.net** preview + production hostname; SWA CLI vs **Node 24** runtime — set in Portal (**ADR-018**).

## Tests / Checks Last Run
`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm test` — all exit 0 (2026-05-05, WSL, Node 24).
