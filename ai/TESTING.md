# Testing Strategy

Last Updated: 2026-05-03

## Testing Status
Project-specific strategy documented. Defaults from the starter apply with
DevilDog-specific notes for content drift, the contact endpoint branches,
and the navigation/IA invariants.

---

## Required Test Types

### Unit tests (required)
- `src/lib/contactValidation.ts` + **`tests/lib/contactValidation.test.ts`** — legacy rules ported verbatim (boundary coverage + mandatory Turnstile token when flagged).
- `src/lib/seo.ts` — output shape for `buildPageMetadata`,
  `getOrganizationJsonLd`, `getWebsiteJsonLd`.
- **`tests/content/navLinks.test.ts`** (landed **P2-B2**, extended **P2-B3**, **P2-B4**, **P2-B5**, **P2-B6**) — proves every href
  under `navigationGroups` resolves either to `/` + non-dynamic `*.astro`
  routes or to a slash path synthesized from `detailPages` (plus a guard so
  static pages never collide with the catch-all emitter); asserts batch routes
  `/ai-threats`, `/security-reconnaissance`, `/story`; compliance hub `/compliance`
  and frameworks `/compliance/cmmc`, `.../cmmi`, `.../nist-800-171`, `.../glba`,
  `.../hipaa`, `.../hitrust`, `.../iso-27001-27002`; **`/about-us`** (**P2-B5**); static **`/about`** (**P2-B6**). Extend this pattern
  to `primaryNavigation`, footer groups, and CTA blocks inside page content once
  those surfaces freeze.
- `api/contact/lib/postmark.ts` — config validation, body building,
  HTML escaping, error handling.
- `api/contact/lib/turnstile.ts` — config validation, success path,
  failure path, missing-config path, network-error path.
- `api/contact/lib/rateLimit.ts` — sliding window bookkeeping (**`rateLimit.test.ts`**, deterministic `now()` injectable per test harness).

### Component tests (required for interactive components)
- `SiteHeader.tsx` — dropdown open/close (mouse + keyboard), mobile drawer
  toggle, Esc closes dropdowns, clicking a link closes the menu.
- `ContactForm.tsx` — validation errors per field, submit-success path,
  submit-error path, Turnstile token required, honeypot present in DOM.
- `TurnstileWidget.tsx` — **P2-T11**: missing-site-key affordance (**`tests/components/TurnstileWidget.test.tsx`**); token handshake covered indirectly via mocked widget in **`ContactForm`** specs.

### Integration tests (**P2-T12**, `tests/api/contact-handler.integration.test.ts`)
Exercises **`handleContactSubmission`** for:
1. valid payload → 200 + Turnstile + Postmark `fetch` called
2. honeypot non-empty → 200 + no outbound `fetch`
3. rate limit exceeded → 429
4. Turnstile verification fails → 400 `{ ok: false }` (without Postmark dispatch)
5. Postmark HTTP error → 500 neutral copy
6. payload fails validation → generic 400 (`ok: false`; body must not echo field-level `"Please …"` strings)

### End-to-end (deferred)
- Skipped at v1. If added later, use Playwright in `tests/e2e/` and run
  in a separate CI job.

### CI checks (required)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test` (Vitest --run)
- `pnpm build` — includes **`node --experimental-strip-types scripts/verify-build-seo.ts`**, which asserts **`dist/sitemap-*.xml`** `<loc>` URLs match **`detailPages` + `/` + `/about` + `/contact`**, validates **`dist/robots.txt`** references **`sitemap-index.xml`**, and checks **`dist/staticwebapp.config.json`** **`trailingSlash`**. (**P2‑T13**)

---

## Testing Rules

- Every implementation task must include test expectations (see `TASKS.md`).
- Bug fixes should include regression tests.
- Refactors must preserve behavior unless explicitly approved.
- Do not delete or weaken tests just to make a build pass.
- Tests run as native Node processes in WSL — no Docker, no test runners
  in containers.
- Validation logic lives in `src/lib/contactValidation.ts` and is the
  single source of truth (per ADR-015). Both client and server tests
  consume the same module.

---

## Test Commands (default `package.json` scripts)

```bash
pnpm test                  # vitest --run
pnpm test:watch            # vitest
pnpm lint                  # eslint .
pnpm typecheck             # `tsc --noEmit` + `pnpm --filter api typecheck`
pnpm build                 # `astro build` + `pnpm --filter api build` (esbuild bundle)
```

API workspace (`pnpm-workspace.yaml` → **`api`** package):

```bash
pnpm --filter api typecheck
pnpm --filter api build
```

---

## Mock Strategy

- **Postmark:** mock `fetch` calls to `https://api.postmarkapp.com/email`
  via `vi.mock` or MSW. Don't hit the real Postmark API in tests.
- **Turnstile:** mock `fetch` calls to
  `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
- **Rate limiter:** in-memory store with deterministic time control via
  `vi.useFakeTimers()`.
- **Astro `<Image>`:** if a component test pulls in an Astro image, stub
  to a plain `<img>` to keep Vitest fast.

---

## Coverage Expectations

- `src/lib/` and `api/contact/lib/`: target ≥ 80% line coverage.
- Components: behavior coverage > line coverage. One test per meaningful
  user flow, not one test per component file.
- Content modules: drift catchers (link-resolves test, image-exists test
  if practical) more valuable than pure type tests.

---

## Known Testing Gaps

- No accessibility automation in CI yet (axe-core integration tracked as
  P3-T2). Manual audit + Lighthouse counts as the v1 gate.
- No visual regression testing. Marketing-site scope; revisit if design
  churn becomes painful.
