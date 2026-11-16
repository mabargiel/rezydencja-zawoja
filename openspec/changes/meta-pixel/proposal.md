## Why

The Meta ad campaigns (K1 traffic, K2 remarketing) depend on the Meta Pixel that the old WordPress site loads after cookie consent. Without it on the new site, remarketing audiences stop growing when the domain switches over. Marketing also wants to measure inquiries and calls, which the old site never tracked.

## What Changes

- Load the Meta Pixel (ID `1207988243645288`, the one on the old site) only after the visitor accepts marketing cookies.
- Add our own cookie consent banner, in the site's style and in PL, EN and DE: "Akceptuję" and "Odrzucam", equally prominent. The choice is remembered and can be changed from a "Ustawienia cookies" link in the footer.
- Send `PageView` on every page, including client-side navigation; `Lead` when the contact form is sent; `Contact` when a phone or email link is clicked.
- Control it from the Studio: a new "Pliki cookies i Piksel Meta" settings document with an on/off switch, the pixel ID, optional start and end dates for when the banner and pixel are active, and how many months a decision is remembered.
- Update the privacy policy (a Sanity draft for the owner to review and publish) to describe the pixel, the consent and Meta as a recipient.

## Capabilities

### New Capabilities
- `cookie-consent`: the consent banner, how a decision is stored, remembered and changed, and its Studio controls.
- `meta-pixel`: loading the pixel after consent and the events it sends.

### Modified Capabilities
- `site-shell`: the footer gains a "Ustawienia cookies" link.
- `cms-editing`: the Studio lists the new settings document.
- `legal-pages`: the privacy policy describes the Meta Pixel and consent instead of stating there is no tracking.

## Impact

- New: `cms/schemaTypes/singletons/tracking.ts`; app components for the banner, pixel loader and click tracking; a `lib` module for consent storage and pixel calls.
- Changed: `cms/structure.ts`, `cms/constants.ts`, `cms/schemaTypes/index.ts`; `app/src/app/[lng]/layout.tsx`, `Footer.tsx`, `ContactForm.tsx`, `queries.ts` and generated types, the three message catalogs.
- Content: the `tracking` document (seeded disabled), and a draft of the privacy policy in all three languages.
- Third party: `connect.facebook.net` script and `facebook.com/tr` requests, only after consent.
- Before go-live, the owner checks the pixel in Meta Events Manager and updates the K1/K2 ad links.
