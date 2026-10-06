## Why

The contact form collects names, emails and phone numbers, so the site needs a privacy policy before it replaces the old one, and guests should be able to read the rental terms before they book. The footer design already shows "Polityka prywatności" and "Regulamin najmu", but neither page exists yet, and the form's consent checkbox has nothing to link to.

## What Changes

- **Two new pages** in every language, both linked from the footer:
  - `/{lng}/privacy-policy` ("Polityka prywatności");
  - `/{lng}/rental-terms` ("Regulamin najmu").
- **Privacy policy, rewritten for the new site.** The old WordPress text describes a different setup. The new one covers:
  - the controller (TURAM Agata Małecka-Bargiel);
  - what the inquiry form collects and why, and the legal bases;
  - that inquiries are emailed through Resend and not stored by the site;
  - hosting on Vercel;
  - the single language-preference cookie, with no analytics and no marketing cookies, so no consent banner is needed;
  - retention, the guest's rights and the complaint route to UODO.
- **Rental terms carried over from the old site**: reservation and deposit, cancellation (45/31/30 days), arrival and departure, scope and price, the guest's obligations, and final provisions. The wording is cleaned up, but the rules don't change.
- **Content in Sanity, not the catalogs.** Legal text changes over time and the owner should be able to correct it without a deploy. A `legalPage` document type holds a title, a "last updated" date and the body as rich text in PL, EN and DE. The seed creates both documents.
- **EN/DE are convenience translations** drafted by Claude. Each page states that the Polish version is binding.
- **Footer**: the legal links from the design (`Stopka Legal`) next to the copyright.
- **Consent checkbox**: the words "przetwarzanie moich danych" link to the privacy policy in a new tab.
- **Design first**: a legal page layout at 1440px and 390px in pen.dev (header without a photo, a readable text column, heading and list styles), approved before code.

## Capabilities

### New Capabilities
- `legal-pages`: the privacy policy and rental terms pages, their CMS model and seed, the layout and the binding-language note.

### Modified Capabilities
- `site-shell`: the Footer requirement gains the legal links.
- `contact-form`: the Inquiry fields requirement gains the consent link to the privacy policy.

## Impact

- **cms/**: a `legalPage` document type (two fixed documents, pinned in the structure), with localized rich text and the seed content.
- **app/**:
  - the two routes;
  - a `LegalPage` component rendering Portable Text with the design's typography;
  - `legalPageQuery`;
  - footer links;
  - the consent label with a link;
  - catalog keys for the titles, metadata and the binding-language note.
- **design/rezydencja.pen**: the legal page frames.
- **Owner review**: the privacy policy is a draft for the owner to check. It isn't legal advice.
- **Out of scope**: a cookie banner (not needed for a functional-only cookie) and versioned history of past terms.
