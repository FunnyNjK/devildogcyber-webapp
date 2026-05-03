# Deployment

Last Updated: 2026-05-03

## Deployment Status
Project-specific deployment plan documented. Resource provisioning in
Azure happens during P4-T1 (not now).

---

## Target Environments

- **Local development:** WSL Ubuntu, native processes (`pnpm dev`).
  No Docker for the app itself. Production-like build is **`pnpm build`**
  (`astro build` + **`pnpm --filter api build`**, which bundles `api/contact/index.js`).
  Optional local SWA emulator via **`swa start ./dist --api-location api --swa-config-location ./dist`**.
The emulator may **not** match Azure’s **`trailingSlash: "never"`** behavior (`/contact` ↔ `/contact/`) despite the same **`staticwebapp.config.json`** — rely on **`pnpm build`** (runs **`scripts/verify-build-seo.ts`**) and a deployed smoke check (**P4**).
- **Staging:** Azure SWA preview environment (auto-created per PR).
- **Production:** Azure SWA production environment, custom domain
  `devildogcyber.com` with `www` 301-redirected to apex.

Planned Azure resource (created in P4-T1):
- Resource group: `rg-devildogcyber-prod` (US South Central, region TBC)
- SWA resource name: `swa-devildogcyber-prod`
- Tier: **Free** to start; upgrade to Standard if SWA preview environments,
  bandwidth, or staging needs grow.

---

## CI/CD

GitHub Actions, two workflows:

### `.github/workflows/ci.yml`
Triggers: `push`, `pull_request`. Runs:
- pnpm install (with cache keyed on `pnpm-lock.yaml`)
- lint (ESLint 9 flat config)
- typecheck (`tsc --noEmit` + `pnpm --filter api typecheck`)
- test (Vitest, `--run`)
- build (`pnpm build` → `astro build` + managed API bundle under `api/`)

Fails the PR if any step fails. Per ADR-010, this is NOT
`workflow_dispatch`-only.

### `.github/workflows/deploy.yml`
Triggers: `push` to `main`. Runs:
- All CI steps (or depends on `ci.yml` succeeding)
- Authenticates to Azure via OIDC (federated credentials, ADR-006)
- Deploys via `Azure/static-web-apps-deploy@v1` action

PR builds use the SWA preview environment automatically (managed by the
SWA action).

---

## Secrets and Configuration

- Do not commit secrets.
- Local secrets live in `.env.local` (gitignored).
- Azure-side secrets configured via the SWA resource's "Configuration"
  blade.
- GitHub Actions auth uses OIDC federation — no static service principal
  client secrets in repo secrets.

### Required Environment Variables

The list below covers everything the new project will need. Items marked
"new vs old site" call out variables we are adding that did not exist in
`~/repos/devildog`. The `.env.local` and `.env.example` files get created
in P1-T1 (scaffold), not now.

| Name                              | Where used               | Notes                                                                  |
| --------------------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `POSTMARK_SERVER_TOKEN`           | Azure Function (server)  | Postmark "Servers" → API tokens. Reuses existing DevilDog server.      |
| `POSTMARK_FROM_EMAIL`             | Azure Function (server)  | Verified sender signature in Postmark (existing).                      |
| `CONTACT_EMAIL_TO`                | Azure Function (server)  | Inbox that receives form submissions (existing recipient).             |
| `TURNSTILE_SECRET_KEY`            | Azure Function (server)  | Cloudflare Turnstile dashboard. Reuses existing site if hostname OK.   |
| `PUBLIC_TURNSTILE_SITE_KEY`       | Frontend build           | Astro convention: `PUBLIC_` prefix exposes the var to the client.      |
| `CONTACT_RATE_LIMIT_MAX`          | Azure Function (server)  | **New vs old site.** Default: `5` (requests per window).               |
| `CONTACT_RATE_LIMIT_WINDOW_MS`    | Azure Function (server)  | **New vs old site.** Default: `600000` (10 min).                       |
| `CONTACT_HONEYPOT_FIELD_NAME`     | Azure Function + form    | **New vs old site.** Default: `company_website`. Field name only — not a secret, but env-driven so it can be rotated if scrapers learn it. |

Notes:
- The legacy site used `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; Astro convention
  uses `PUBLIC_` instead. Renaming during the rebuild is intentional.
- The legacy site used `POSTMARK_SERVER_TOKEN` (kept) and
  `POSTMARK_FROM_EMAIL` + `CONTACT_EMAIL_TO` (kept).
- The legacy site had no rate-limit and no honeypot env vars — the new
  site adds both per ADR-007.
- No Postmark template ID variable: the function builds the email body
  inline (matches the legacy site's pattern, simpler to test, no template
  to keep in sync). If we ever move to Postmark templates, add
  `POSTMARK_TEMPLATE_ID` and an ADR.

---

## Deployment Commands (local dry-run)

These run inside WSL, never in Docker:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
swa start dist --api-location api      # local SWA emulator (optional)
```

---

## Initial Azure Setup (one-time per project)

Done outside the AI workflow during P4-T1, but documented here for
completeness:

1. Create the SWA resource in Azure portal (`swa-devildogcyber-prod`,
   Free tier).
2. Create an Azure AD app registration for the GitHub deploy.
3. Configure federated credential on the app registration:
   - Issuer: `https://token.actions.githubusercontent.com`
   - Subject: `repo:<owner>/devildogcyber-webapp:ref:refs/heads/main`
   - Audience: `api://AzureADTokenExchange`
4. Grant the app registration "Static Web App Contributor" on the SWA
   resource.
5. Add repo variables in GitHub:
   - `AZURE_CLIENT_ID`
   - `AZURE_TENANT_ID`
   - `AZURE_SUBSCRIPTION_ID`
6. Configure runtime environment variables in the SWA resource (the eight
   variables above).
7. Add custom domain `devildogcyber.com` in the SWA "Custom domains"
   blade; verify via TXT or CNAME per Azure's instructions.
8. Add `www.devildogcyber.com` as a custom domain, then set **`devildogcyber.com`**
   as the **default domain** in the SWA **Custom domains** blade so all other
   hostnames 301 to apex with paths preserved (**ADR‑021**).

---

## DNS

DNS for `devildogcyber.com` is managed at Cloudflare (existing zone).
Cutover from the old App Service deploy to the new SWA happens during
P4-T6:

- Apex: ALIAS / flattened CNAME → `<swa-name>.azurestaticapps.net`
- `www`: CNAME → `<swa-name>.azurestaticapps.net`

The old App Service can be decommissioned after the new site has been
green for at least one week post-cutover (rollback safety).

---

## Rollback Plan

- SWA deployments are immutable per-commit. Roll back by reverting the
  offending commit on `main` and letting CI/CD redeploy.
- For emergency manual rollback, use the SWA resource's "Environments"
  blade in Azure portal to swap to a previous deployment.
- During the migration window, the old App Service stays running and DNS
  can be flipped back at Cloudflare in <5 minutes if anything is wrong.

---

## Operational Notes

- SWA free tier: 100 GB bandwidth/month, 0.5 GB storage, 2 staging envs.
  Sufficient for a marketing site at low traffic. Upgrade to Standard
  ($9/month) if more preview envs or higher bandwidth are needed.
- Custom domain requires CNAME to the `*.azurestaticapps.net` host plus a
  TXT record for verification. SSL is automatic.
- Function logs visible in the SWA resource's "Functions" blade or via
  Application Insights if enabled.
- Postmark sender (`POSTMARK_FROM_EMAIL`) should already be verified
  against `devildogcyber.com`'s DKIM in the existing Postmark account;
  no re-verification needed if the domain stays the same.
