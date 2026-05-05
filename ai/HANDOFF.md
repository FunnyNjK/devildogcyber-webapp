# AI Handoff

Last Updated: 2026-05-05

## Current State Summary
**P4-T2** **Done** (repo): **`deploy.yml`** + **`ci.yml`** Turnstile build parity; **`DEPLOYMENT.md`** § **P4-B2** human checklist. **P4-T3** **Blocked** until secrets are entered (**Unattended: No**). SWA **`devildogcyber`** live at **`https://polite-sky-09fcf0610.7.azurestaticapps.net`**.

## Last Completed Task
**P4-B2** (automatable) — **P4-T2** — deploy/CI wiring + **P4-B2** checklist docs (2026-05-05); see **`DONE_LOG.md`**. **P4-T1** remains Done from prior session.

## Active Task
**P4-T3** — finish **P4-B2**: Portal **Environment variables** + GitHub **`PUBLIC_TURNSTILE_SITE_KEY`**; Turnstile host allowlist; smoke **`/contact`**.

## Next Recommended Task
Human runs **`DEPLOYMENT.md`** § **P4-B2**, then mark **P4-T3** / **P4-B2** Done after smoke + email receipt. Next batch: **P4-B3** (**P4-T4**, **P4-T5**). **GoDaddy** = **P4-T6**.

## What Is Blocked
**P4-T3** — needs live secrets and Portal steps (see **`DEPLOYMENT.md`** § **P4-B2**).

### Human follow-up (Partial — **P3-B1**)
Assets, Lighthouse on deploy URL, manual a11y, reduced-motion spot-check.

## Important Instructions for Next AI
Read **`/ai/START_HERE.md`**. **P4-T3** is **No** — pair with human for Portal/GitHub; do not mark **Done** until **`POST /api/contact`** smoke succeeds.

## Known Risks
Turnstile host allowlist for **`*.azurestaticapps.net`**; Postmark/DKIM at go-live; Functions **Node 24** in Portal (**ADR-018**).

## Tests / Checks Last Run
Local **`pnpm lint`** + **`typecheck`** OK this session; **`pnpm build`** / full **`pnpm test`** require **Node 24** (sandbox had Node **20**). **`main`** pushed (**`7edb564`**). Prior **Deploy** success: run **25405261583** (2026-05-06).
