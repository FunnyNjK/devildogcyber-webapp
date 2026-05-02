# Roadmap

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

Tasks (one per page or major section, sized for one focused session):
- P2-T1: Layout, header, footer, base SEO + JSON-LD
- P2-T2: Home page
- P2-T3: Detail-page system (one Astro template, content-driven)
- P2-T4: Services hub + Services detail pages (executive, maritime trio,
         identity, monitoring, risk, controls, training, watchdog, docs,
         penetration testing — 11 detail pages)
- P2-T5: AI Threats top-level page
- P2-T6: Security Reconnaissance top-level page
- P2-T7: Compliance hub + framework pages (CMMC, CMMI, NIST 800-171,
         GLBA, HIPAA, HITRUST, ISO 27001/27002 — 8 pages)
- P2-T8: Story page
- P2-T9: About-us (team) page
- P2-T10: About page (about this site)
- P2-T11: Contact page (form UI, validation, Turnstile widget)
- P2-T12: `/api/contact` Azure Function (Postmark + Turnstile +
          honeypot + rate limit + tests)
- P2-T13: SEO finalization (sitemap, robots, JSON-LD, canonical,
          OG/Twitter, www→apex redirect)

Improvement-list tasks queued in addition to the page ports:
- P2-I1: Self-hosted fonts via `@fontsource` (kill Google Fonts CDN call)
- P2-I2: Honeypot field on contact form
- P2-I3: Per-IP sliding-window rate limiter on `/api/contact`
- P2-I4: Image optimization pass (responsive `srcset`, AVIF/WebP, lazy)
- P2-I5: Accessibility pass on nav dropdowns (keyboard, ARIA, focus
         management) — old site is mouse-first
- P2-I6: Reduced-motion + focus-visible styling tokens

## Phase 3: Hardening and Testing
Status: Backlog

Goals:
- Test coverage targets met (`/ai/TESTING.md`).
- Error handling reviewed.
- WCAG AA accessibility audit + fixes.
- Lighthouse audit and fixes (targets in PROJECT.md).
- Bundle size budget enforced.

## Phase 4: Deployment and Operations
Status: Backlog

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
