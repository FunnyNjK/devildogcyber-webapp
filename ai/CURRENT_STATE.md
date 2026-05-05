# Current State

Last Updated: 2026-05-05

## Current Phase
**Phase 4** — **P4-T2** **Done**; **P4-B2** blocked on **P4-T3** (human secrets). Next: **P4-B3** after **P4-T3** smoke.

## Current Task
**P4-T3:** Human completes **`DEPLOYMENT.md`** § **P4-B2** (SWA env vars + GitHub **`PUBLIC_TURNSTILE_SITE_KEY`**); smoke **`/contact`**.

## What Exists Now
- **Azure:** **`devil-web-rg`**, SWA **`devildogcyber`** (**Standard**, **centralus**); site **`https://polite-sky-09fcf0610.7.azurestaticapps.net`** (default hostname).
- **CI/CD:** **`ci.yml`**, **`deploy.yml`** green on **`main`**; repo secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`**.
- **P1–P3** deliverables: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`** (with **Node 24**); GitHub **CI** + **Deploy**.

## What Is Not Built Yet
Production **Configuration** still pending human (**P4-T3**); **GoDaddy** DNS / apex (**P4-T6**); full **contact** E2E in prod after secrets.

## Known Problems
Raster assets may be missing under **`src/assets/images/devildog/...`**.

## Important Files or Folders
**`.github/workflows/deploy.yml`**, **`/ai/DEPLOYMENT.md`**, **`api/contact/`**.

## Next Recommended Action
Follow **`DEPLOYMENT.md`** § **P4-B2** (checklist). Then **P4-B3** Postmark verification + deploy smoke.
