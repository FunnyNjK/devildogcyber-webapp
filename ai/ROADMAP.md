# Roadmap

Last Updated: 2026-05-03

## Phase 0: Project Initialization
Status: Done

Goals:
- Convert starter files into project-specific planning files for the
  DevilDog Cybersecurity rebuild.
- Catalog the old Next.js site at `~/repos/devildog`.
- Define migration scope and improvement opportunities.

Deliverables (all complete):
- `PROJECT.md` filled in (DevilDog rebuild scope, brand tokens, non-goals).
- `MIGRATION_INVENTORY.md` created (page/asset/content map, drop list,
  improvement list).
- ADR-011 through ADR-015 added (design direction, content model,
  font hosting, www→apex on SWA, validation single source of truth).
- Phase 1 + Phase 2 tasks queued in `TASKS.md`.

## Phase 1: Foundation
Status: Ready

**Autonomous runs (batches):** **1** — **P1-B1** (P1-T1 + P1-T2). See
`/ai/TASKS.md` → *Execution batches* and ADR-019.

Goals:
- Scaffold Astro 5 + React 19 + Tailwind 4 + TypeScript per `/ai/PROJECT.md`.
- Wire brand tokens into Tailwind theme (DevilDog reds, cream, fonts).
- Add Vitest, ESLint 9 flat config.
- Add `.env.example` with all variables from `/ai/DEPLOYMENT.md`.
- First passing CI run on a placeholder homepage.

Deliverables:
- `pnpm dev` runs the placeholder homepage in WSL at `localhost:4321`.
- `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass.
- GitHub Actions `ci.yml` passes on push.

## Phase 2: Core Buildout — pages, content, contact form
Status: Backlog

**Autonomous runs (batches):** **8** — **P2-B1** … **P2-B8** (grouped task
IDs in `/ai/TASKS.md`). Phase 2 improvement rows **P2-I\*** default into
those batches or Phase 3 as listed there — not separate harness counts.

Goals:
- Port content modules from the old site into `src/content/` (typed).
- Port image assets to `public/images/devildog/`.
- Build `BaseLayout`, `SiteHeader` (with mobile nav), `SiteFooter`.
- Build the home page and About page.
- Build the catch-all detail-page system (replicating the old site's
  `[...slug]/page.tsx` pattern as Astro static pages or a single dynamic
  Astro page that pre-renders all detail-page slugs).
- Build the contact page + form + Azure Function endpoint.
- Wire Postmark, Turnstile, honeypot, rate limiting.
- Add SEO baseline: per-page metadata, JSON-LD, sitemap, robots,
  www→apex redirect via `staticwebapp.config.json`.

Task IDs (grouped for autonomous runs — see `/ai/TASKS.md` *Execution batches*):
- **P2-B1:** P2-T1, P2-T2 — layout + home (nav a11y **P2-I5** folded into T1)
- **P2-B2:** P2-T3, P2-T4 — detail system + services port
- **P2-B3:** P2-T5, P2-T6, P2-T8 — AI Threats, Security Recon, Story
- **P2-B4:** P2-T7 — compliance hub + frameworks
- **P2-B5:** P2-T9 — team page
- **P2-B6:** P2-T10 — about this site
- **P2-B7:** P2-T11, P2-T12 — contact UI + managed API
- **P2-B8:** P2-T13 — SEO + sitemap + robots + `staticwebapp.config.json`

Improvement rows **P2-I1** … **P2-I6** — schedule per `/ai/TASKS.md`
(superseded, bundled into P2-B7 / P3-B1, or folded into P2-B1); not extra
harness iterations by default.

## Phase 3: Hardening and Testing
Status: Backlog

**Autonomous runs (batches):** **2** — **P3-B1** (P3-T1, P3-T2, P2-I4, P2-I6),
**P3-B2** (P3-T3).

Goals:
- Test coverage targets met (`/ai/TESTING.md`).
- Error handling reviewed.
- WCAG AA accessibility audit + fixes.
- Lighthouse audit and fixes (targets in PROJECT.md).
- Bundle size budget enforced.

## Phase 4: Deployment and Operations
Status: Backlog

**Autonomous runs (batches):** **4** — **P4-B1** … **P4-B4** (see `TASKS.md`).

Goals:
- Provision Azure SWA resource (start on free tier).
- Set up OIDC federation in Azure AD app registration for the GitHub deploy.
- First production deploy.
- DNS cutover for `devildogcyber.com` and `www.devildogcyber.com`.
- Postmark sender verification confirmed against the SWA-hosted origin.
- Document release process.

Deliverables:
- Live site at `https://devildogcyber.com`.
- `https://www.devildogcyber.com` 301s to apex.
- Contact form delivers test email via Postmark in production.
- Turnstile blocks unverified submissions in production.
- Rate limiter enforces per-IP limits.
- Rollback plan tested at least once.

## Phase 5: Enhancements (post-launch, optional)
Status: Backlog

Goals (all open / per-request):
- Privacy-respecting analytics (Plausible or Cloudflare Web Analytics).
- Contact failure alerting (Postmark webhook → Slack or email).
- Add a blog or news section if marketing wants one.
- Convert any remaining detail content into MDX if editor experience needs it.
