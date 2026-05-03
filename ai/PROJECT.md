# Project

Last Updated: 2026-05-02

## Project Name
DevilDog Cybersecurity Web App (`devildogcyber-webapp`)

## Application Description
Public marketing website for **DevilDog Cybersecurity**, a veteran-led
cybersecurity services firm. The site presents the company's services,
compliance practice areas, story, and leadership team, and provides a
single contact form for prospective clients. There is no authentication,
no customer portal, no database, no e-commerce.

This repository is a **rebuild** of the existing site at
`~/repos/devildog` (Next.js 15 + App Router, deployed to Azure App Service).
The existing site is being rebuilt on a static-first stack (Astro 5 + React 19
islands + Tailwind 4 + Azure Static Web Apps managed Functions API) to lower
hosting cost, simplify deployment, eliminate the Docker/standalone packaging
work currently required for App Service, and modernize the front-end design
without losing the existing brand identity, copy, or information architecture.

## Problem Being Solved
- The current Next.js + App Service stack is overweight for a
  marketing-only site (Oryx packaging, `@swc/helpers` runtime issues,
  standalone-output complexity, paid App Service plan).
- The contact form is the only dynamic piece — that fits Azure SWA's
  managed-API model with a single Azure Function instead of a Node host.
- Brand and content are good and should be preserved; the visual design,
  spacing, typography, mobile UX, accessibility, and Lighthouse scores
  are all areas to modernize on the rebuild.

## Target Users
- **Primary:** Prospective clients evaluating DevilDog for cybersecurity
  and compliance work — heads of security, IT leaders, executives,
  and operations leaders in regulated industries (defense, healthcare,
  financial services, maritime).
- **Secondary:** Compliance auditors, partners, and recruits doing due
  diligence on the firm.

## Primary Goals
- Preserve DevilDog brand identity, copy, navigation, and information
  architecture from the existing site.
- Modernize the visual design (typography rhythm, spacing scale,
  component patterns), mobile UX, and accessibility.
- Hit strong Lighthouse scores (Performance / Accessibility / SEO ≥ 95
  on the homepage, ≥ 90 on detail pages).
- Keep the contact-form flow working end-to-end with the same providers
  (Postmark + Cloudflare Turnstile) and add server-side rate limiting +
  honeypot.
- Replace the App Service deployment with Azure Static Web Apps
  (free or standard tier) using a single GitHub Actions workflow with
  OIDC federated auth.
- Preserve SEO signals: same canonical URLs, same `robots.txt` /
  `sitemap.xml` structure, same canonical-domain redirect from
  `www.devildogcyber.com` to `devildogcyber.com`.

## Explicit Non-Goals
- No authentication, no user accounts, no admin panel.
- No database. No CMS — content lives in the repo as typed TypeScript
  modules (the old site's pattern, kept).
- No blog, no marketing automation, no analytics platform integration
  in v1 (deferred to a Phase 5 task if requested).
- No e-commerce.
- No internationalization (English / `en-US` only).
- No port of the existing Next.js code itself — the new project is a
  greenfield Astro 5 build that reuses content and assets from the old
  repo, not its components.
- No Docker for the application. (DB containers don't apply here either —
  there is no DB.)

---

## Default Tech Stack (override per-project via ADR if needed)

### Frontend
- **Astro 5** as the page framework (static-first, fast).
- **React 19** for interactive components, mounted as Astro islands via
  `@astrojs/react`. Static content stays as `.astro` files.
- **Tailwind 4** via the `@tailwindcss/vite` plugin (Astro 5's Vite-native
  Tailwind integration).
- **TypeScript strict mode**, ES2022 target, ESM only.

### Backend (contact form / dynamic pieces only)
- **Azure Functions v4** (Node 24 LTS, ESM) deployed as the Azure SWA managed API.
  Dev / CI / Functions runtime all on Node 24 — see ADR-018.
- All business logic (Postmark send, Turnstile verify, IP extraction,
  rate-limit check) extracted into a `lib/` folder for testability.
- No database in this default. Add one only if the project requires it (and
  add an ADR documenting why).

### Database
- **None.** This project is marketing-only; no persistence required.

### Authentication
- **None.** This site is fully public.

### Email
- **Postmark** (transactional). Templates managed in Postmark dashboard;
  template IDs referenced via env vars. Reuses the existing DevilDog
  Postmark server and verified sender signature.

### Bot mitigation
- **Cloudflare Turnstile** (server-side verification in the Azure Function).
- Honeypot field as a second layer (new — old site did not have one).
- Rate limiting on the function (per IP, sliding window — new).

### Testing
- **Vitest 3+** for unit and component tests.
- **@testing-library/react + @testing-library/jest-dom** for component tests.
- **ESLint 9 flat config** + **typescript-eslint** for lint.
- All tests run as native Node processes in WSL — no Docker, no test runners
  in containers.

### Package management
- **pnpm 10+** (corepack-managed, version pinned in `packageManager` field).
- Single lockfile (`pnpm-lock.yaml`). Never commit a second lockfile.

### Deployment
- **Azure Static Web Apps** (start on free tier; upgrade to standard if
  bandwidth or staging needs grow).
- Deployment via **GitHub Actions with OIDC federated auth** — no static
  service principal secrets in repo.
- Custom domain `devildogcyber.com` + free SSL provided by SWA.
- `www.devildogcyber.com` configured to 301 to apex (preserved from old site).

### CI
- GitHub Actions workflow runs on every PR and push to `main`:
  - lint
  - typecheck
  - test
  - build
- Workflow is `on: [push, pull_request]`, NOT `workflow_dispatch`-only.

---

## Repository Structure (default)

```
.
├── ai/                        # this folder; AI workflow files
├── public/                    # static assets (favicons, robots.txt, etc.)
│   └── images/devildog/       # brand/site imagery (ported from old repo)
├── src/
│   ├── components/            # React components (interactive islands)
│   ├── content/               # typed content modules (siteContent.ts, detailPages.ts)
│   ├── layouts/               # Astro layouts
│   ├── lib/                   # shared utilities, types, validation
│   ├── pages/                 # Astro pages (.astro files)
│   └── styles/
├── api/                       # Azure Functions (managed API)
│   ├── contact/
│   │   ├── function.json
│   │   ├── index.ts
│   │   └── lib/               # business logic, unit-testable
│   └── package.json           # API has its own deps (kept minimal)
├── tests/                     # Vitest specs (mirrors src/ structure)
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
├── astro.config.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── eslint.config.js           # flat config
├── vitest.config.ts
├── .env.example               # checked in
├── .env.local                 # gitignored
└── README.md
```

---

## Brand Identity (preserved from existing site)

Tokens come from the existing `src/styles/globals.css` in the legacy repo
and remain authoritative for the rebuild. Document them once here so the
scaffold can wire them into Tailwind 4 theme config.

| Token              | Value      | Notes                                |
| ------------------ | ---------- | ------------------------------------ |
| `--dd-red`         | `#6c0404`  | Primary brand red (header, CTAs)     |
| `--dd-red-deep`    | `#2a0505`  | Footer / dark gradients              |
| `--dd-red-bright` | `#b01116`  | Accent / hover / focus               |
| `--dd-cream`       | `#f8f1ef`  | Light background                     |
| `--dd-copy`        | `#18181b`  | Body text                            |
| `--dd-muted`       | `#5b5560`  | Secondary text                       |
| `--dd-border`      | `rgba(108,4,4,0.14)` | Faint dividers              |
| `--dd-ink`         | `#090909`  | Hard-contrast accents                |

Typography:
- Display: **Montserrat** (600, 700, 800)
- Body: **Open Sans** (400, 500, 600, 700)

Note: ADR-011 defines whether the rebuild uses Google Fonts CDN, hosted
copies, or `@fontsource` — currently CDN-loaded in the old site, which we
will move to self-hosted via `@fontsource` for performance and privacy.

---

## Non-Negotiables

- Keep scope controlled.
- Preserve brand identity, content, and IA from the existing site
  (see `/ai/MIGRATION_INVENTORY.md`).
- Update `/ai` project files after every meaningful change.
- Do not add dependencies without documenting the decision in
  `/ai/DECISIONS.md`.
- Tests or validation steps are required before marking tasks complete.
- Honor `/ai/AI_RULES.md` and `/ai/DEV_ENVIRONMENT.md` (WSL-native, no Docker
  for app, no `/mnt/c` paths).
- Do not modify the old reference repo at `~/repos/devildog`.
