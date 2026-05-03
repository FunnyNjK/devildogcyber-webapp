# Architecture

Last Updated: 2026-05-03

## Architecture Status
Project-specific architecture documented. Default pattern from the starter
applies, with project-specific notes for content modeling, brand tokens,
www→apex redirect, and the contact endpoint.

---

## System Overview

```
   Browser
      |
      | HTTPS (free SSL via SWA)
      v
   Cloudflare DNS (devildogcyber.com)
      |
      v
   Azure Static Web Apps (single resource)
   ├── Static hosting (Astro-built HTML/JS/CSS, pre-rendered)
   |     ├── Pages: home, services hub + 11 service detail pages,
   |     |          compliance hub + 8 framework pages,
   |     |          story, about-us (team), about, contact
   |     ├── Hydrated React islands: SiteHeader (mobile menu, dropdowns),
   |     |                           ContactForm + TurnstileWidget
   |     └── Self-hosted fonts (Montserrat, Open Sans) via @fontsource
   |
   ├── Managed API (Azure Functions v4, Node 24 ESM)
   |     └── POST /api/contact
   |           ├── verify Turnstile token (server-side)
   |           ├── reject if honeypot field is non-empty
   |           ├── apply rate limit (per-IP sliding window, in-memory)
   |           ├── send transactional email via Postmark
   |           └── return JSON status
   |
   └── SWA routes config: 301 from www.devildogcyber.com → devildogcyber.com
```

External services:
- **Postmark** — transactional email API (existing DevilDog account, sender
  re-verification required for the new SWA-hosted origin if DKIM domain stays
  the same it should be a no-op).
- **Cloudflare Turnstile** — invisible CAPTCHA, server-verified.
- **GitHub** — source control, CI/CD via Actions.
- **Azure** — hosting (SWA static + managed Functions).
- **Cloudflare** — DNS (existing zone for `devildogcyber.com`).

---

## Major Components

### `src/pages/` — Astro pages
Static HTML pages, pre-rendered at build time. **`index.astro`**, **`about.astro`**, and **`contact.astro`** (stub until **P2-B7**); every entry in the
typed `detailPages` array emits a static HTML file via **`[...slug].astro`**
(`getStaticPaths()` joins each slug segment with `/`). Detail heroes default to the split gradient layout; **`hero.layout: 'backdrop'`** (used on **`/about-us`**) renders the legacy-style full-bleed photo + overlay. Templates
consume `src/components/detail/*` Astro partials (`DetailPageSections.astro`,
`DetailSplitSection.astro`, `DetailPageCta.astro`). React islands hydrate only
where needed (currently `SiteHeader`). Remaining conventions follow
`/ai/MIGRATION_INVENTORY.md` for IA parity.

### `src/content/` — Typed content modules
TypeScript modules holding site copy: **`siteContent.ts`** (nav, footer, home-adjacent copy), **`aboutPageContent.ts`** (**`/about`**, **P2-T10**), and **`detailPages.ts`** (all catch-all detail payloads, including **`/about-us`** team members inline). **`contactContent.ts`** and shared **`contactValidation.ts`** land with **P2-B7**. Mirrors the legacy module shape; strict typing (`as const satisfies readonly DetailPage[]`) preserved because it caught real content bugs.

### `src/components/` — React islands
Interactive UI only. Two known islands at v1:
- `SiteHeader.tsx` — primary nav with hover/click dropdowns and mobile drawer.
- `ContactForm.tsx` (+ `TurnstileWidget.tsx`) — contact submission with
  client-side validation, Turnstile token, error/success states.

### `src/layouts/` — Astro layouts
- `BaseLayout.astro` — `<html>`, head metadata, fonts, JSON-LD, header,
  footer, slot.
- Optional sub-layouts as patterns repeat across detail pages.

### `src/lib/` — Shared frontend utilities
Types and validation shared between client form and server endpoint
(`contactValidation.ts`), SEO helpers, slug helpers, content selectors.
No framework code.

### `api/contact/` — Contact form endpoint
Single Azure Function HTTP trigger. Receives form POST, runs honeypot →
rate limit → Turnstile verify → Postmark send. Business logic in
`api/contact/lib/` for unit-testability without function-runtime
dependencies. Validation schema imported from `src/lib/contactValidation.ts`
(shared) so client and server stay in sync.

### `tests/` — Test suite
Vitest specs. Mirrors `src/` structure. Coverage targets in `/ai/TESTING.md`.

---

## Data Flow

### Contact form submission
1. User loads `/contact`. Form is a hydrated React island.
2. Turnstile widget produces a token client-side.
3. Form POSTs `{ name, email, companyName, message, turnstileToken, hp }` to
   `/api/contact`. `hp` is the honeypot — must be empty.
4. Azure Function:
   - rejects if honeypot non-empty (200 OK with `{ ok: true }` to avoid
     signaling bot detection)
   - rejects if rate limit exceeded (429)
   - calls Cloudflare Turnstile verify endpoint with the token + secret + IP
   - if verified, calls Postmark send endpoint with templated email
   - returns `{ ok: true }` or `{ ok: false, reason: '...' }`
5. React component shows success or generic-error UI (no detailed server
   error leaked to client).

### Page render
1. CI builds static HTML via `astro build`.
2. SWA serves files from CDN. React islands hydrate as needed.
3. `/api/contact` is the only server-touched route.

---

## Security Model

- **Secrets** live in environment variables, never in source.
  - Local: `.env.local` (gitignored)
  - SWA: configured via Azure Portal or `swa-cli`
  - GitHub Actions: federated OIDC + Azure secrets (no static client secrets)
- **CORS** is implicit — same-origin from the SWA-served frontend.
- **Rate limiting** is enforced server-side; client-side advisory only.
  In-memory per-instance (acceptable for marketing site traffic; revisit
  with an ADR if scaling out).
- **Honeypot** is a hidden form field that real users never fill.
- **PII** in form submissions is forwarded to Postmark; not persisted on
  Azure. No analytics, no logs of message body content.
- **Turnstile keys** — site key is public; secret key is server-only.
- **Server error messages** to the client are intentionally neutral
  ("Something went wrong, please try again later") to avoid information
  disclosure. Detail stays in Application Insights / Function logs.

---

## SEO and canonical URL strategy

- One canonical domain: `devildogcyber.com`.
- `www.devildogcyber.com` 301-redirects to apex via SWA `staticwebapp.config.json`
  redirect rule (the old site did this with a Next.js proxy redirect; SWA
  handles it natively).
- Each page sets `<link rel="canonical">` to the apex URL.
- `/sitemap.xml` and `/robots.txt` generated at build (Astro's
  `@astrojs/sitemap` integration).
- Structured data: Organization (ProfessionalService) and WebSite JSON-LD
  injected via `BaseLayout` (ported from `src/features/site/seo.ts`).
- Open Graph and Twitter card metadata per page (default OG image is the
  DevilDog "looking up trees" hero image).

---

## External Services

| Service              | Purpose                            | Where keys live                            |
| -------------------- | ---------------------------------- | ------------------------------------------ |
| Postmark             | Transactional email                | env: `POSTMARK_SERVER_TOKEN`               |
| Cloudflare Turnstile | Bot mitigation                     | env: `TURNSTILE_SECRET_KEY` (server)       |
|                      |                                    | env: `PUBLIC_TURNSTILE_SITE_KEY` (client)  |
| Azure SWA            | Static hosting + managed API       | Azure portal config                        |
| Cloudflare DNS       | Apex + www DNS records             | Cloudflare dashboard                       |
| GitHub Actions       | CI/CD                              | OIDC federation; no client secrets in repo |

---

## Repository Structure
See `/ai/PROJECT.md` for the canonical default structure. The `src/content/`
folder is the project-specific addition (typed content modules ported from
the old site's `src/features/site/`).

---

## Architecture Rules

- Keep business logic out of UI components. UI components consume hooks
  and utilities from `src/lib/`.
- Keep secrets out of source control.
- Document new dependencies in `/ai/DECISIONS.md`.
- Document architecture changes via ADR before or during implementation.
- The contact endpoint logic must be unit-testable in isolation from the
  Azure Functions runtime (extract into `api/contact/lib/`).
- Validation lives in `src/lib/contactValidation.ts` and is imported by
  both the React form and the Azure Function — single source of truth.
- One canonical implementation per concern. If something is needed in two
  places, extract to a shared module, do not duplicate.
- Content is typed. Page-level copy lives in `src/content/`, never inline
  in components or `.astro` files (mirrors the old site's pattern,
  preserved because it caught content drift bugs).

---

## Open Architecture Questions
- **Rate-limit storage**: in-memory per-function-instance is fine at our
  expected traffic. If we ever scale to >1 instance routinely, switch to
  Azure Table Storage or Cosmos. Tracked as a Phase-3 follow-up, not v1.
- **Analytics**: deferred. Open question is whether to add
  Plausible / Cloudflare Web Analytics (privacy-respecting, no consent
  banner needed) before launch or after.
