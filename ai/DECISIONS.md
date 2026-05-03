# Architecture Decision Records

Last Updated: 2026-05-03

This file records decisions that affect architecture, dependencies, security,
deployment, testing, or scope. The first block of ADRs (ADR-001 through
ADR-010) are pre-populated cross-project defaults baked into this starter.
Project-specific decisions begin at ADR-011.

To override a baked-in default for a specific project, write a new ADR with
status "Accepted" that supersedes the original. Do NOT edit the baked-in
ADRs except to mark them "Superseded" and add a pointer to the new one.

---

## ADR-001: WSL-native development, no Docker for dev
Date: 2026-05-02
Status: Accepted

### Decision
All development (dev server, tests, build, lint, type-check) runs as native
processes inside WSL Ubuntu. Docker is reserved exclusively for hosting
external dependencies the app talks to (databases, queues, cache).

### Reason
Mixed dev environments (host Windows + WSL + Docker containers) create
ambiguous file paths and confuse AI agents into editing the wrong copy of a
file. WSL2 native filesystem is fast (5-20x faster than `/mnt/c`), and
modern editor tooling (VS Code/Cursor WSL Remote) handles the host/guest
boundary cleanly without containers.

### Tradeoffs
- Slightly different from prod if prod runs in containers — mitigated by
  keeping app code framework-aware but environment-agnostic.
- Onboarding requires a working WSL setup. Documented in `/ai/DEV_ENVIRONMENT.md`.

---

## ADR-002: Static-first frontend with Astro 5 + React 19 islands
Date: 2026-05-02
Status: Accepted

### Decision
Use Astro 5 as the page framework. Static content lives in `.astro` files;
interactive components are React 19 mounted as islands.

### Reason
Marketing/static sites benefit from pre-rendered HTML for SEO, fast first
paint, and minimal JS shipped to the client. Astro is purpose-built for this
shape, supports React for the parts that need interactivity, and outputs
real static files that drop into Azure SWA's static hosting at the free tier.

Considered and rejected:
- **Next.js with `output: 'export'`** — works, but adds framework complexity
  for capabilities (SSR, ISR, middleware) we don't need.
- **Next.js with `output: 'standalone'`** — requires a Node host, not a
  static-hosting fit; doesn't deploy cleanly to SWA's free static tier.
- **Vite + React SPA** — works but ships an empty HTML shell, hurts SEO
  and first paint, no SSR.

### Tradeoffs
- Astro is less ubiquitous than Next.js; some Next-specific features
  (middleware, ISR, server actions) don't exist. Acceptable for this class
  of project.
- Mental model: pages are `.astro`, components are React. Mild context shift,
  documented in `/ai/PROJECT.md`.

---

## ADR-003: Tailwind 4 via the official Vite plugin
Date: 2026-05-02
Status: Accepted

### Decision
Use Tailwind 4 with the `@tailwindcss/vite` plugin (Astro 5 supports Vite
plugins natively).

### Reason
Tailwind 4 is the current major version. The Vite plugin avoids PostCSS
configuration entirely. Aligns with where the rest of the JS ecosystem is
heading.

### Tradeoffs
None significant. Tailwind 4 has minor breaking changes from v3
(documented in their migration guide); new projects start clean.

---

## ADR-004: pnpm as the only package manager
Date: 2026-05-02
Status: Accepted

### Decision
Use pnpm exclusively. Never commit `package-lock.json` or `yarn.lock`. The
`packageManager` field in `package.json` pins the pnpm version.

### Reason
- Faster, disk-efficient (content-addressed store, hard-linked).
- Strict by default — no phantom hoisted dependencies.
- A previous project in the user's portfolio shipped both `pnpm-lock.yaml`
  AND `package-lock.json`; the lockfiles drifted between local and CI builds.
  Choosing one and enforcing it eliminates that class of bug.

### Tradeoffs
- Some npm-only tooling occasionally has pnpm-incompatibility quirks.
  Resolved case-by-case.

---

## ADR-005: Azure Static Web Apps with managed Functions API
Date: 2026-05-02
Status: Accepted

### Decision
Deploy frontend as static files to Azure Static Web Apps. Deploy the contact
endpoint as the SWA managed API (Azure Functions v4, Node 24 LTS ESM).
Dev / CI / Functions runtime all on the same Node major. (See ADR-018 for
the Node 22→24 bump.)

### Reason
- Free SSL on custom domains.
- Free tier covers small marketing sites.
- Single deploy artifact (one repo, one workflow, one URL).
- The user has existing comfort with Azure deployments.

### Tradeoffs
- Vendor lock to Azure. Acceptable for the marketing-site class of project.
- Free tier has bandwidth/request limits; standard tier upgrade is a
  one-line change in the SWA resource.

---

## ADR-006: GitHub Actions deployment with OIDC federated auth
Date: 2026-05-02
Status: Accepted

### Decision
GitHub Actions deploys to Azure SWA using OIDC federated credentials. No
static service principal client secrets in repo or repo secrets.

### Reason
OIDC federation is the modern Azure auth pattern: no secret to rotate, no
secret to leak. The user's existing `devildog` project already uses this
pattern.

### Tradeoffs
- Requires a one-time federated credential setup in Azure AD (5-minute task
  per project). Documented in `/ai/DEPLOYMENT.md`.

---

## ADR-007: Postmark + Cloudflare Turnstile + honeypot + rate limiting
Date: 2026-05-02
Status: Accepted

### Decision
Contact form uses Postmark for delivery, Cloudflare Turnstile for bot
mitigation, an unrendered honeypot field as a second layer, and per-IP
rate limiting on the function.

### Reason
- Postmark: reliable transactional delivery, simple API.
- Turnstile: invisible-by-default, no Google dependency (vs reCAPTCHA),
  privacy-respecting.
- Honeypot + rate limit: cheap defense in depth against the bots that
  bypass Turnstile.

### Tradeoffs
- Two third-party services to maintain accounts for.
- Postmark is paid above small volume — free tier covers ~100 emails/month
  per server. For higher volume, switch to a paid plan or different ESP and
  add an ADR.

---

## ADR-008: TypeScript strict, ESM only, ES2022 target
Date: 2026-05-02
Status: Accepted

### Decision
All new code is TypeScript with strict mode. ESM only — no CommonJS
`require()`. Compilation target ES2022.

### Reason
Strict TS catches real bugs cheaply. ESM is the JS standard; CJS is
legacy. ES2022 covers Node 24+ and modern browsers without polyfill noise.

### Tradeoffs
- Some older npm packages still ship CJS-only. Resolved per-package; if
  truly stuck, document in an ADR.

---

## ADR-009: Vitest 3+ for unit and component tests
Date: 2026-05-02
Status: Accepted

### Decision
Use Vitest 3+ as the only test runner. No Jest, no Mocha. Component tests
use `@testing-library/react` + `@testing-library/jest-dom`.

### Reason
- Native ESM support (matches the rest of the toolchain).
- Vite-based, shares Astro's underlying build.
- Faster than Jest for small projects.
- One runner = one config = less drift.

### Tradeoffs
- Some Jest-only ecosystem packages need adapters. Rare in practice.

---

## ADR-010: CI runs on push and pull_request, not workflow_dispatch
Date: 2026-05-02
Status: Accepted

### Decision
The CI workflow (`ci.yml`) is `on: [push, pull_request]`. It is NOT
`workflow_dispatch`-only. Quality gates fire on every PR and merge to main.

### Reason
A previous project had `ci.yml` set to `workflow_dispatch` only, which meant
test failures only surfaced during deploys — past the point where they
should have blocked the merge. Standard CI hygiene says gates run on PRs.

### Tradeoffs
- Slightly more Actions minutes consumed. Negligible at this scale.

---

## ADR-011: Evolve, don't clone — modernize design while preserving brand and IA
Date: 2026-05-02
Status: Accepted

### Decision
The DevilDog rebuild preserves the existing brand identity, copy, and
information architecture (navigation, page list, URL structure) from the
legacy site at `~/repos/devildog`, but does not preserve the existing
visual design or component implementations. Typography rhythm, spacing
scale, mobile UX, accessibility behavior, and component patterns are
re-thought from scratch on Astro 5 + Tailwind 4.

### Reason
- The brand (DevilDog reds, Marine-rooted voice) and IA (services,
  compliance, story, team, contact) are working — re-doing them would be
  pure churn with no business value.
- The visual design carries Bootstrap-era choices (heavy CTAs, mouse-first
  dropdowns, CDN font load, raw `<img>` tags) that hurt Lighthouse
  scores, accessibility, and mobile UX. Astro + Tailwind 4 give us a
  clean base to do better without fighting legacy patterns.
- Cloning pixel-for-pixel would also constrain us into JavaScript-heavy
  patterns Astro is built to avoid (everything-is-a-component,
  client:load by default).

### Tradeoffs
- The new site will look related but not identical to the old one —
  marketing should be informed before launch. Preserved: logo, color
  palette, typography families, copy, page list. Re-thought: hero
  composition, card layouts, button styles, nav behavior on touch.
- More design judgment required during P2. Mitigated by referencing the
  old site as a content/IA source of truth and treating new design as a
  greenfield modernization (not a redesign that needs marketing approval
  for every change — small visual evolution, large UX win).

### Related Tasks
P2-T1 through P2-T13 — every page port is an evolve-not-clone operation.

---

## ADR-012: Typed content modules in `src/content/`, no CMS
Date: 2026-05-02
Status: Accepted

### Decision
All site copy lives in TypeScript modules under `src/content/`
(`siteContent.ts`, `detailPages.ts`, `contactContent.ts`,
`teamMembers.ts`). Pages and components import from these modules.
No CMS, no MDX, no headless content service.

### Reason
- The legacy site uses the same pattern (`src/features/site/siteContent.ts`,
  `detailPages.ts`) and it has worked well: copy lives next to types, drift
  is caught at compile time, content review happens via PRs.
- A CMS adds an account, an editor experience, and a content cache —
  none of which marketing has asked for and all of which add deploy-time
  surface area.
- Typed modules also make the no-orphan-link test trivial (iterate over
  the typed nav arrays, assert each href exists). This caught real bugs
  in the legacy site.

### Tradeoffs
- Non-engineer content edits require a PR. Acceptable for a marketing
  site that updates copy a few times per quarter; revisit if cadence
  changes.
- If editorial workflow becomes a real pain point, MDX is the next step
  before a CMS — less moving parts.

### Related Tasks
P2-T1, P2-T3, P2-T4 through P2-T10 — every content port lands here.

---

## ADR-013: Self-hosted fonts via `@fontsource`, not Google Fonts CDN
Date: 2026-05-02
Status: Accepted

### Decision
Montserrat (display) and Open Sans (body) are loaded from
`@fontsource/montserrat` and `@fontsource/open-sans` and bundled with
the build. No external request to `fonts.googleapis.com`.

### Reason
- The legacy site loads both families from Google's CDN, which costs a
  third-party DNS lookup, a TLS handshake, and a render-blocking CSS
  fetch on first paint.
- Self-hosting via `@fontsource` keeps the font binaries inside the SWA
  static bundle, served by the same CDN as the rest of the site, with
  proper `font-display: swap` and the option to subset.
- Removing Google Fonts also avoids passing visitor IPs to Google for
  every page load (privacy posture matters for a security firm's site).

### Tradeoffs
- Adds two npm packages and a small amount of bundle size. Net
  Lighthouse Performance gain expected because the render-blocking
  third-party CSS request goes away.

### Related Tasks
P1-T1 (install), P2-T1 (wire into BaseLayout), P2-I1 (verify in audit).

---

## ADR-014: `www` → apex 301 lives in `staticwebapp.config.json`, not in code
Date: 2026-05-02
Status: Accepted

### Decision
The **`www` → apex** redirect stays out of application code; it is enforced
by **Azure Static Web Apps**: **`staticwebapp.config.json`** declares
**`forwardingGateway.allowedForwardedHosts`** plus **`trailingSlash`**
normalization, while the **hostname** 301 is completed by setting the **apex
custom domain as the default domain** on the SWA resource (**ADR-021** —
path-only **`routes`** entries do not inspect the HTTP Host header alone).

### Reason
- The legacy site implements this via a Next.js `proxy.ts`, which only
  fires after the request hits the Node origin — adds a hop and only
  works when the App Service is up.
- SWA's edge-level redirect rules fire at the CDN, never reach the
  Function runtime, and survive scenarios where the origin is down.
- One config file is easier to reason about than a request handler.

### Tradeoffs
- The redirect lives in infra config rather than code, so a developer
  reading only `src/` won't see it. Mitigated by documenting it here and
  in `/ai/ARCHITECTURE.md`.

### Related Tasks
P2-T13 (SEO finalization), P4-T6 (DNS cutover).

---

## ADR-015: Single source of truth for contact validation — `src/lib/contactValidation.ts`
Date: 2026-05-02
Status: Accepted

### Decision
The contact form's validation rules (field lengths, email regex,
Turnstile-token-required flag) live in one TypeScript module at
`src/lib/contactValidation.ts`. The React form imports it for client-side
checks. The Azure Function imports it for server-side checks.

### Reason
- The legacy site already does this (`src/features/contact/contactValidation.ts`)
  and it prevents the classic "client says valid, server says invalid"
  drift bug.
- Sharing the module also means the same Vitest spec covers both client
  and server validation logic — no duplicated test surface.
- Astro + SWA managed Functions live in the same monorepo, so import
  works cleanly without a publish-to-npm step.

### Tradeoffs
- The Azure Function bundle pulls in code from `src/`, which slightly
  blurs the API/UI boundary. Acceptable: the module is pure functions
  with no DOM or framework imports.

### Related Tasks
P2-T11 (form), P2-T12 (function).

---

## ADR-018: Node 24 LTS end-to-end (dev, CI, Functions runtime)
Date: 2026-05-02
Status: Accepted
Supersedes the Node 22 references in ADR-005.

### Decision
Use Node 24 LTS for everything: local dev, CI runners, and the Azure
Functions runtime backing the SWA managed API. To be pinned via:

- `package.json` → `engines.node: ">=24"` (set in P1-T1 scaffold)
- `.nvmrc` → `24`
- `.github/workflows/ci.yml` → `setup-node` reads `engines.node`
- Azure Functions runtime version → set to Node 24 in the SWA resource
  configuration during P4-T1 (provision step)

### Reason
- Node 24 became the active LTS; Azure Functions v4 supports Node 24.
- Aligning dev / CI / production on the same Node major eliminates a
  whole class of "works locally, breaks on cold start" surprises.
- Aligns this project with the cross-portfolio "always on the latest
  supported Node major" posture.

### Tradeoffs
- Locks the project to whatever Azure Functions currently certifies. If
  Azure ever pulls Node 24 support before Node 26 is GA, we'd need to
  step back — minor risk.
- Some `node_modules` packages may not yet declare Node 24 in their
  `engines`. CI catches the obvious cases; subtle issues surface in
  Dependabot PRs.

### Related Tasks
- P1-T1 (set `engines.node` to `>=24`, `.nvmrc` to `24`)
- P1-T2 (CI uses Node 24)
- P2-T12 (Azure Function endpoint — confirm `node_modules` resolve
  cleanly under Node 24)
- P4-T1 (set Functions runtime version to Node 24 in SWA config)

### Related ADRs
- ADR-005 (Azure SWA + managed Functions API) — Node 22 reference there
  is superseded; left in place per the "do not edit baked-in ADRs" rule.
- ADR-008 (TypeScript strict, ESM, ES2022) — ES2022 target stays;
  comfortable on Node 24.

---

## ADR-019: Autonomous execution batches for harness runs
Date: 2026-05-03
Status: Accepted

### Decision
Define **execution batches** in `/ai/TASKS.md`: named groups of existing
task IDs (e.g. **P1-B1** = P1-T1 + P1-T2) that may be completed in **one**
autonomous agent session (one `run-phase.sh` / `run-phase-cursor.sh`
iteration) before handoff and git commit. Batching reduces repeated
full-context reads of `/ai/*.md` and lowers token spend. Phase-level
**batch counts** are documented in `/ai/ROADMAP.md` and the quick-reference
table in `/ai/TASKS.md`.

### Reason
Sequential single-task runs re-pay the same planning context every loop.
Grouping tasks that are already ordered by dependency (scaffold then CI,
layout then home, contact UI then API, etc.) preserves safety while cutting
overhead.

### Tradeoffs
- Larger diffs per commit; review burden may increase.
- A partial failure can stall multiple task IDs until resolved — mitigated
  by keeping batches dependency-safe and documenting Blocked state clearly.
- Any batch change must update `TASKS.md`, `ROADMAP.md`, and this ADR in
  lockstep.

### Related Tasks
All phases; canonical list under *Execution batches* in `/ai/TASKS.md`.

---

## ADR-020: Bundle `/api/contact` with esbuild to import shared repo validation (ADR-015)

Date: 2026-05-03
Status: Accepted

### Decision
The managed Azure Function (**`POST /api/contact`**) imports **`src/lib/contactValidation.ts`**. Produce the deployable **`api/contact/index.js`** via **`esbuild`** (**`api/scripts/bundle-contact.mjs`**) with **`@azure/functions`** marked external while inlining repo-owned modules. **`api/package.json`** `build` invokes the bundle script; **`pnpm build`** chains **`astro build`** then **`pnpm --filter api build`**. Artifact **`contact/index.js` (+ `.map`)** stays **gitignored** and regenerates locally / in CI every build.

### Reason
Shipping TypeScript imports that traverse **`src/` from `api/contact/`** relies on brittle zip layouts for SWA-managed Functions; bundling materializes **`ADR-015` single-module validation**, pins the runtime graph, and still keeps Azure’s runtime-provided **`@azure/functions`** outside the bundle footprint.

### Tradeoffs
Adds **`esbuild`** as an **`api`** devDependency; slightly longer **`pnpm build`**.

### Related Tasks
**P2-T12**; **`pnpm-workspace.yaml`**, **`api/`** package, **`api/scripts/bundle-contact.mjs`**, root **`package.json`** `build` script.

---

## ADR-021: Canonical host www→apex + staticwebapp.config.json (clarifies ADR-014)

Date: 2026-05-03
Status: Accepted

### Decision
- **`staticwebapp.config.json`** declares **`trailingSlash: "never"`** plus **`forwardingGateway.allowedForwardedHosts`** for **`devildogcyber.com`** and **`www.devildogcyber.com`** where proxy headers apply.
- The **hostname** redirect **`www.devildogcyber.com` → apex** is enforced by setting the **apex custom domain as the default domain** on the Static Web Apps resource (301 with path preserved); see [Manage the default domain in Azure Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain-default). Path-only **`routes`** do not match the HTTP Host header by themselves.
- **`platform.apiRuntime`** is **not** pinned in-repo: the SWA CLI schema through v2.0.9 rejects **`node:24`** even where production supports Node 24 (**ADR-018**); set the Functions Node 24 runtime in Azure during provisioning (**P4-T1**).

### Reason
Keeps config aligned with Microsoft’s routing model and the apex canonical strategy in **`PROJECT.md`**, and documents why **`swa`** local emulation can differ from production for trailing-slash behavior.

### Tradeoffs
Portal “Set default” step required for production host canonicalization (**P4-T6**). Local emulator may still redirect **`/contact` → `/contact/`** despite **`trailingSlash: "never"`** — verify on the deployed SWA host.

### Related Tasks
**P2-T13**, **P4-T6**, **ADR-014**.

---

## ADR Template

## ADR-XXX: Title
Date: YYYY-MM-DD
Status: Proposed | Accepted | Rejected | Superseded

### Decision
TBD

### Reason
TBD

### Tradeoffs
TBD

### Related Tasks
TBD
