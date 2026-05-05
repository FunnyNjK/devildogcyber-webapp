# Deployment

Last Updated: 2026-05-06

## Deployment Status

Production target is **Azure Static Web Apps Standard** (~USD 9/mo hosting plan)
in **Central US**, with CI/CD from **GitHub**
[FunnyNjK/devildogcyber-webapp](https://github.com/FunnyNjK/devildogcyber-webapp)
(`main` = production). **Confirmed subscription:** `179ae124-553a-42c7-89cd-0d665cddef65`.

**P4-T1** (provision SWA in Azure) remains **human-paired** — run
**`scripts/azure/provision-swa.sh`** after **`az login`** / **`az account set`**, or use the Portal checklist below. **P4-T1** is **Done** when the SWA exists in **`devil-web-rg`**, the default **`*.azurestaticapps.net`** URL responds, and **`AZURE_STATIC_WEB_APPS_API_TOKEN`** is stored in GitHub (**Repository secrets**). Custom DNS (GoDaddy + Azure Portal) can follow in **P4-T6** without blocking the first deploy.

See **ADR-023** for naming, region, SKU, and subscription.

---

## Target Azure resources (P4-T1)

| Item | Value |
|------|--------|
| Subscription | `179ae124-553a-42c7-89cd-0d665cddef65` |
| Region | **Central US** (`centralus`) |
| Resource group | **`devil-web-rg`** |
| Static Web App name | **`devildogcyber`** |
| SKU | **Standard** |
| GitHub repo | [FunnyNjK/devildogcyber-webapp](https://github.com/FunnyNjK/devildogcyber-webapp) |

---

## Target Environments

- **Local development:** WSL Ubuntu, native processes (`pnpm dev`).
  No Docker for the app itself. Production-like build is **`pnpm build`**
  (`astro build` + **`pnpm --filter api build`**, which bundles `api/contact/index.js`).
  Optional local SWA emulator via **`swa start ./dist --api-location api --swa-config-location ./dist`**.
  The emulator may **not** match Azure’s **`trailingSlash: "never"`** behavior (`/contact` ↔ `/contact/`) despite the same **`staticwebapp.config.json`** — rely on **`pnpm build`** (runs **`scripts/verify-build-seo.ts`**) and a deployed smoke check (**P4**).
- **Staging:** Azure SWA **preview** environments (PR builds; **Standard** tier).
- **Production:** Azure SWA production slot; custom domain **`devildogcyber.com`**
  with **`www` → apex** (Portal **default domain** + **`staticwebapp.config.json`** — **ADR-021**).

---

## CI/CD

GitHub Actions, two workflows:

### `.github/workflows/ci.yml`

Triggers: `push`, `pull_request`. Runs:

- pnpm install (cache: `pnpm-lock.yaml`)
- lint, typecheck, build, test

Fails the PR if any step fails. Per **ADR-010**, not `workflow_dispatch`-only.

### `.github/workflows/deploy.yml`

Triggers: `push` to **`main`**, and **`pull_request`** (open/sync/reopen/close).

- Runs the same install → lint → typecheck → **`pnpm build`** → **`pnpm test`** as CI.
- Deploys with **`Azure/static-web-apps-deploy@v1`**:
  - **`app_location`:** `/`
  - **`api_location`:** `api`
  - **`output_location`:** `dist`
  - **`skip_app_build: true`** (build runs in the workflow).
  - **`production_branch`:** `main`

**GitHub repository secrets:**

| Secret | How to obtain |
|--------|----------------|
| **`AZURE_STATIC_WEB_APPS_API_TOKEN`** | **Required** for deploy. Azure Portal → Static Web App **`devildogcyber`** → **Manage deployment token** → **GitHub** → **Settings** → **Secrets and variables** → **Actions**. |
| **`PUBLIC_TURNSTILE_SITE_KEY`** | **Recommended** before go-live. Cloudflare Turnstile **site** key (public). Set on the **Deploy** workflow **Build** step so **`contact.astro`** embeds the widget; omit only if you accept placeholder behavior until **P4-T3**. |

The [Static Web Apps deploy action](https://github.com/Azure/static-web-apps-deploy) uses this token to upload **`dist/`** and the **managed API** bundle. It is **not** the same as Entra OIDC variables; you can still use **Azure MCP** / **Entra** for portal RBAC, app registration, or future **`azure/login`** steps — see **P4-T2+** below.

---

## Secrets and Configuration

- Do not commit secrets.
- Local secrets: **`.env.local`** (gitignored).
- **SWA “Configuration”** blade: Function + frontend-related app settings (Postmark, Turnstile, etc.).
- **GitHub Actions:** **`AZURE_STATIC_WEB_APPS_API_TOKEN`** (deploy). Optional later: Entra **`AZURE_CLIENT_ID`**, **`AZURE_TENANT_ID`**, **`AZURE_SUBSCRIPTION_ID`** if you add **`azure/login`** or other Azure Resource Manager automation (**ADR-006**).

### Required application settings (SWA / build)

| Name | Where used | Notes |
|------|------------|--------|
| `POSTMARK_SERVER_TOKEN` | Azure Function | Postmark server API token. |
| `POSTMARK_FROM_EMAIL` | Azure Function | Verified sender. |
| `CONTACT_EMAIL_TO` | Azure Function | Inbox for submissions. |
| `TURNSTILE_SECRET_KEY` | Azure Function | Turnstile **secret** (server). |
| `PUBLIC_TURNSTILE_SITE_KEY` | Frontend build | Astro **`PUBLIC_`** → client (**GitHub Actions** env for production build, or SWA build-time config). |
| `CONTACT_RATE_LIMIT_MAX` | Azure Function | Default e.g. `5`. |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | Azure Function | Default e.g. `600000`. |
| `CONTACT_HONEYPOT_FIELD_NAME` | Function + form | Default e.g. `company_website`. |

---

## Deployment Commands (local dry-run)

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
swa start dist --api-location api      # optional local emulator
```

---

## P4-T1 — Provision SWA (human-paired; **`Unattended: No`**)

**Goal:** **`devil-web-rg`** + **`devildogcyber`** (**Standard**, **centralus**) exist; default hostname works; deployment token added to GitHub.

### Option A — Azure CLI (WSL)

```bash
cd ~/repos/devildogcyber-webapp
az login
az account set --subscription 179ae124-553a-42c7-89cd-0d665cddef65
export AZURE_SUBSCRIPTION_ID=179ae124-553a-42c7-89cd-0d665cddef65   # optional; reinforces subscription
./scripts/azure/provision-swa.sh
```

Script defaults: **`devil-web-rg`**, **`devildogcyber`**, **`centralus`**, **`Standard`**. Overrides: **`AZURE_RG`**, **`AZURE_SWA_NAME`**, **`AZURE_LOCATION`**, **`AZURE_SKU`**.

### Option B — Azure Portal

1. Subscription **`179ae124-553a-42c7-89cd-0d665cddef65`**.
2. Resource group **`devil-web-rg`**, region **Central US**.
3. Create **Static Web App** named **`devildogcyber`**, SKU **Standard**, **no** built-in GitHub source (use this repo’s **`deploy.yml`**).
4. **Manage deployment token** → GitHub secret **`AZURE_STATIC_WEB_APPS_API_TOKEN`**.

### DNS / custom domain (deferrable)

- **Smoke test:** `https://<defaultHostname>.azurestaticapps.net` — no DNS change.
- **Production domain:** When ready, use Azure **Custom domains** + your DNS host (**GoDaddy**): add **TXT** / **CNAME** (or apex ALIAS) per the Portal. Apex + **`www`** cutover and **default domain** = apex are **P4-T6** (**ADR-021**).

### Acceptance (**P4-T1**)

- [ ] SWA **`devildogcyber`** in **`devil-web-rg`**, subscription above.
- [ ] Default hostname loads.
- [ ] **`AZURE_STATIC_WEB_APPS_API_TOKEN`** set on [FunnyNjK/devildogcyber-webapp](https://github.com/FunnyNjK/devildogcyber-webapp).
- [ ] Push to **`main`** runs **Deploy** workflow successfully (after token).

---

## P4-T2+ — Entra (optional), app settings, Postmark, go-live

1. **Entra app registration** + **federated credential** (if you use OIDC for **`azure/login`** or ARM — subject example: `repo:FunnyNjK/devildogcyber-webapp:ref:refs/heads/main`). **Not** required solely for **`Azure/static-web-apps-deploy@v1`** if the deployment token secret is set.
2. Grant the identity **Static Web App Contributor** (or least privilege) on **`devildogcyber`** if using it for automation.
3. Optional GitHub **variables**: **`AZURE_CLIENT_ID`**, **`AZURE_TENANT_ID`**, **`AZURE_SUBSCRIPTION_ID`**.
4. SWA **Configuration**: application settings from the table above; align **Node 24** Functions runtime in Portal (**ADR-018**).
5. **Custom domains** in Portal; DNS at **GoDaddy** per Azure instructions; set **default domain** to apex (**ADR-021**).

---

## DNS (registrar: GoDaddy)

Domain records for **`devildogcyber.com`** will be maintained in **GoDaddy** (per project owner). During **P4-T6**, point apex / **`www`** at the SWA hostname Azure provides (often CNAME to **`<name>.azurestaticapps.net`**, or apex ALIAS / forwarding per GoDaddy + Microsoft docs). Until then, the site is available on the ***.azurestaticapps.net** URL.

---

## Rollback Plan

- Revert a bad commit on **`main`** and redeploy via Actions.
- Use the SWA **Environments** blade for manual rollback to a prior deployment.
- If DNS was switched at **GoDaddy**, you can revert records there during a migration window.

---

## Operational Notes

- **Standard** tier: suitable for production traffic, more preview capacity, and features vs **Free**; see [Azure Static Web Apps pricing](https://azure.microsoft.com/pricing/details/app-service/static/).
- Custom domain: CNAME / TXT (or apex ALIAS) + automatic managed certificate in Azure.
- Function logs: SWA **Functions** blade or Application Insights if enabled.
- Postmark (**`POSTMARK_FROM_EMAIL`**) should remain verified for **`devildogcyber.com`** if the domain is unchanged.
