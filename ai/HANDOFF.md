# AI Handoff

Last Updated: 2026-05-06

## Current State Summary
**P4-B2** **Done** (**P4-T2**, **P4-T3**): SWA + GitHub secrets applied; prod quick smoke OK (**GET /** **`/contact`** **200**; honeypot **POST** **`{"ok":true}`**). SWA **`https://polite-sky-09fcf0610.7.azurestaticapps.net`**.

**Ops (2026-05-06):** Legacy marketing site removed from **Azure Government**. Production target for this repo is **Azure Public** SWA **`devildogcyber`** only (**ADR-023**). If DNS still pointed at the old Gov endpoint, **GoDaddy** records must target the **new** SWA / custom-domain instructions only.

## Last Completed Task
**P4-T3** — production configuration + human secrets (2026-05-05); **`DONE_LOG.md`**.

## Active Task
**P4-B3** — **P4-T4** / **P4-T5**: Postmark sender verification in prod; one real **`/contact`** submit (Turnstile + email receipt); confirm latest **Deploy** run green after secret changes.

## Next Recommended Task
Browser: submit **`/contact`** on deploy URL; check **`CONTACT_EMAIL_TO`**. Then **P4-T4** checklist in Postmark (DKIM/sender if needed). **P4-T6** GoDaddy when cutting over apex.

## What Is Blocked
None.

### Human follow-up (Partial — **P3-B1**)
Assets, Lighthouse on deploy URL, manual a11y, reduced-motion spot-check.

## Important Instructions for Next AI
Read **`/ai/START_HERE.md`**. **P4-B3** is **No**/**Partial** — pair for Postmark dashboard + one human-visible contact submit; document **`DONE_LOG`** when **P4-T4**/**P4-T5** close.

## Known Risks
Turnstile host allowlist for **`*.azurestaticapps.net`**; Postmark/DKIM at go-live; Functions **Node 24** in Portal (**ADR-018**).

## Tests / Checks Last Run
**curl** prod **GET /** **`/contact`** **200**; **POST /api/contact** honeypot **`{"ok":true}`** (2026-05-05). Re-run **Deploy** on **`main`** after adding **`PUBLIC_TURNSTILE_SITE_KEY`** if not already green.
