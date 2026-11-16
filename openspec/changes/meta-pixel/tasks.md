## 1. Studio

- [x] 1.1 Add the `tracking` singleton (enabled, pixelId, activeFrom, activeUntil, consentMonths) with Polish labels and validation
- [x] 1.2 List it after Sezon in the desk structure and register it as a singleton
- [x] 1.3 Validate the schema; create the `tracking` document with the old site's pixel ID, switched off

## 2. App

- [x] 2.1 Query the tracking settings and regenerate types
- [x] 2.2 Consent storage and pixel module: read/write the decision, expiry, inject `fbq` once, `track()`
- [x] 2.3 Consent banner client component with PL/EN/DE copy, mounted in the layout
- [x] 2.4 PageView on load and on client navigation
- [x] 2.5 Contact on `tel:`/`mailto:` clicks; Lead when the contact form is sent
- [x] 2.6 "Ustawienia cookies" button in the footer

## 3. Content

- [x] 3.1 Draft the updated privacy policy (PL, EN, DE) in Sanity, unpublished

## 4. Verify and ship

- [x] 4.1 Check: no Meta requests before consent or after Reject; PageView and Contact after Accept; banner hidden when disabled or outside dates (Lead checked in code only: a test submission would send a real email)
- [x] 4.2 Run format:check, lint, lint:styles, knip, typecheck and build
- [ ] 4.3 Open a PR; after merge, redeploy the Studio
- [ ] 4.4 Go-live (owner): publish the privacy policy, switch tracking on, confirm events in Meta Events Manager
