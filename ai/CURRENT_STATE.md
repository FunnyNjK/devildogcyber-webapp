# Current State

Last Updated: 2026-05-05

## Current Phase
**Phase 4** — **P4-B2** **Done** (**P4-T2**, **P4-T3**). Next: **P4-B3** (**P4-T4**, **P4-T5**).

## Current Task
**P4-B3:** Postmark/sender verification + real **`/contact`** submit + confirm **Deploy** after secrets.

## What Exists Now
- **Azure:** **`devil-web-rg`**, SWA **`devildogcyber`** (**Standard**, **centralus**); site **`https://polite-sky-09fcf0610.7.azurestaticapps.net`** (default hostname).
- **CI/CD:** **`ci.yml`**, **`deploy.yml`** green on **`main`**; repo secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`**.
- **P1–P3** deliverables: per **`DONE_LOG.md`**.

## What Works
`pnpm lint` / **`typecheck`** / **`test`** / **`build`** (with **Node 24**); GitHub **CI** + **Deploy**.

## What Is Not Built Yet
Full **contact** happy-path confirmation (Turnstile + Postmark) under **P4-B3**; **GoDaddy** DNS / apex (**P4-T6**).

## Known Problems
Raster assets may be missing under **`src/assets/images/devildog/...`**.

## Important Files or Folders
**`.github/workflows/deploy.yml`**, **`/ai/DEPLOYMENT.md`**, **`api/contact/`**.

## Next Recommended Action
Submit **`/contact`** on **`*.azurestaticapps.net`**; verify inbox; Postmark dashboard sender/DKIM as needed (**P4-T4**).
