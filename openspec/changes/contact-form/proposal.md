## Why

Kontakt is the only way to book: the Home booking bar and every "Napisz do nas" button lead there, but the page still renders only its header. Guests need a form that reaches the owner's inbox, prefilled with the dates they already picked, plus the address, phone, check-in times and directions shown in the design.

## What Changes

- **Kontakt page body** (`McNXT` / `a7yX5j`):
  - the inquiry form next to a dark contact card on desktop; the card comes first on mobile;
  - the contact card: address, phone, email, check-in and check-out hours, and a "Zadzwoń teraz" button;
  - a directions section: eyebrow, title, coordinates linking to Google Maps, and a map with the "Rezydencja Zawoja" marker. The map is a static image generated from **Azure Maps**, centred on 49.64051614064316, 19.558586753262016, and stored in the CMS as `contactPage.map`.
- **Inquiry form**:
  - fields: name, phone, email, arrival, departure, adults, children, an optional message, and a required consent checkbox;
  - prefilled from the booking bar's `?arrival=&departure=&guests=` (guests go to adults);
  - validated on the server, with field errors and a form-level error that points to phone and email;
  - a confirmation state after sending;
  - works without JavaScript.
- **Delivery through Resend**: a server action sends a plain-text email in Polish to the owner, with the guest's email as Reply-To and the site language noted. A honeypot field filters bots.
- **Design first**: the design has no message field, error states or success state yet. They're added in pen.dev and approved before code.
- **Map generation**: a CMS script fetches the static map from the Azure Maps Render API and uploads it as the `contactPage.map` photo, so the Azure key never reaches the browser. The seed reuses that photo instead of the design's map screenshot.
- **Config**: address, check-in times and map coordinates go to `app/src/config/site.ts`. New env vars are `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and an optional `CONTACT_TO_EMAIL` override in `app/`, and `AZURE_MAPS_KEY` in `cms/`.

## Capabilities

### New Capabilities
- `contact-page`: Kontakt layout, contact card, call button, and directions with the Azure Maps image.
- `contact-form`: inquiry fields, prefill from the booking bar, validation, Resend delivery, spam protection, and the sent and error states.

### Modified Capabilities
None. The booking bar already hands off the query parameters, and the `contactPage.map` slot already exists in the CMS. Only its seeded content changes.

## Impact

- **app/**:
  - the contact page moves off `SubPage`;
  - new components `ContactCard`, `ContactForm` (client) and `Directions`;
  - a server action `sendInquiry`;
  - a `contactPageQuery`;
  - new catalog keys in PL/EN/DE;
  - new dependencies `resend` and `zod`.
- **cms/**: a `map` script that generates and uploads the Azure Maps image; the seed points `contactPage.map` at it.
- **Azure** (owner): an Azure Maps account key for the map script. It's only needed when the map is regenerated, not at runtime.
- **Vercel**: `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` for Production and Preview.
- **Resend / DNS** (owner): a Resend account and verification of `rezydencjazawoja.pl` (SPF/DKIM records) so mail can be sent from the site's domain.
- **design/rezydencja.pen**: the message field, error and success states at 1440px and 390px.
- **Out of scope**: legal pages (the consent text links to the privacy policy once that page exists), a confirmation email to the guest, and booking or availability calendars.
