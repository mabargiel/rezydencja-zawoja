## Context

- The footer design (`vgRjs`, `Stopka Bottom`) has "Polityka prywatności" and "Regulamin najmu" next to the copyright. The coded footer leaves them out because the pages don't exist.
- The old site's texts:
  - **Privacy policy (`/privacy-policy`):**
    - controller: TURAM Agata Małecka-Bargiel, Słoneczna 54, 30-199 Rząska, running Rezydencja Zawoja;
    - legal bases: GDPR Art. 6(1)(b) and 6(1)(c);
    - recipients: accounting, legal, insurance, IT, couriers;
    - retention until claims expire;
    - the rights and a UODO complaint;
    - a generic cookie notice.
  - **Rental terms (`/regulamin-najmu`):**
    - reservation by phone, email or intermediaries;
    - a deposit confirms the booking;
    - cancellation: free from 45 days, 50% at 44–31 days, 100% at 30 days or less;
    - check-in 16:00, check-out 10:00, ID required, at most 10 guests;
    - a 200 PLN charge per unannounced visitor per day, per lost key, and per unauthorised pet;
    - a 1,200 PLN security deposit due 3 days before arrival and returned within 3 days;
    - quiet hours 22:00–7:00, no smoking indoors, fireplace rules, waste sorting;
    - repairs access, Polish law, courts at the property's location, and video monitoring.
- What the new site actually does with personal data:
  - the inquiry form sends two emails through Resend (owner and guest confirmation) and stores nothing;
  - Vercel hosts the site and keeps standard request logs;
  - the only cookie is `lng` (language preference);
  - fonts are self-hosted through `next/font`;
  - the map is a static image, and Google Maps is only a link;
  - Sanity holds no guest data.

## Goals / Non-Goals

**Goals:**
- An accurate privacy policy for the new site, and the existing rental terms, in PL with EN/DE translations.
- The owner can edit both texts in the Studio without a deploy.
- Both pages are reachable from every page through the footer, and the policy is reachable from the consent checkbox.

**Non-Goals:**
- A cookie banner.
- Legal review. The owner checks the draft.
- Keeping old versions of the terms.

## Decisions

### D1. Sanity `legalPage` documents with localized Portable Text
- A `legalPage` document type with:
  - `slug`: `privacy-policy` or `rental-terms`, read-only;
  - `title`: internationalized string;
  - `updatedAt`: date;
  - `body`: an object with `pl`, `en` and `de`, each a Portable Text array limited to normal text, H2, H3, bullet and numbered lists, bold and links.
- PL is required. EN and DE warn when empty, matching `localizedValidation`.
- Two fixed documents, `legalPage.privacy-policy` and `legalPage.rental-terms`, are pinned in the structure as "Polityka prywatności" and "Regulamin najmu". Delete and duplicate are off, like the other singletons.
- *Why not the i18next catalogs?* CLAUDE.md keeps write-once page copy in the catalogs. Legal text is long, structured and likely to be corrected by the owner, which is what the CMS is for.
- *Why not the internationalized-array plugin for the body?* It's configured for strings. A plain object with three block fields is simpler, and the Studio shows each language as its own editor.

### D2. Routes and rendering
- `app/src/app/[lng]/privacy-policy/page.tsx` and `rental-terms/page.tsx` share a `LegalPage` Server Component.
- `legalPageQuery` takes `$slug` and `$lng`, and returns the title, `updatedAt`, and `body[$lng]` with the Polish body as fallback.
- Rendering uses `PortableText` from `next-sanity` with components mapped to the design's typography: H2 and H3 in Cormorant, body text 16/1.7, lists with the `accent-warm` marker, links in `accent`.
- When the visitor's language falls back to Polish, the page says so with the binding-language note.
- `generateMetadata = () => pageMetadata('privacyPolicy' | 'rentalTerms')`, with titles and descriptions in the catalogs.
- Both pages are prerendered statically and revalidate through `SanityLive` like the others.

### D3. Layout (designed in pen.dev first)
- A compact dark header band with no photo: eyebrow, title, and "Ostatnia aktualizacja: {date}".
- A single text column about 760px wide, centred, with padding [80, 120] on desktop and [40, 20] on mobile.
- The binding-language note sits in a bordered box above the text on the EN/DE pages.
- Footer links: "Polityka prywatności · Regulamin najmu" next to the copyright, matching `Stopka Legal`.

### D4. Privacy policy content (draft for the owner)
Sections:
1. Administrator: TURAM Agata Małecka-Bargiel, the address, and biuro@.
2. What data and why:
   - the inquiry form (name, email, phone, dates, guests, message) to answer the inquiry and take steps before a contract, Art. 6(1)(b);
   - booking and stay data to perform the rental contract, 6(1)(b);
   - accounting and tax obligations, 6(1)(c).
3. How the form works: the data is sent by email, not stored on the website, and the visitor gets an automatic confirmation.
4. Recipients and processors:
   - Resend (email delivery), Vercel (hosting) and the email provider;
   - accounting, legal, insurance and IT services when needed;
   - Resend and Vercel are US companies, and transfers rely on the EU–US Data Privacy Framework or standard contractual clauses.
5. Retention: inquiries without a booking for up to 12 months; booking data for the contract and until claims and tax obligations expire.
6. Rights: access, rectification, erasure, restriction, portability and objection, plus a complaint to the President of UODO.
7. Cookies: only `lng`, which remembers the language and is strictly necessary. No analytics and no advertising.
8. Changes to the policy, and the "last updated" date.

### D5. Rental terms content
- Carried over section by section.
- The wording is tidied (consistent "Gość/Właściciel", numbered points), but no rule changes.
- Prices and amounts stay as on the old site.

## Risks / Trade-offs

- [The privacy policy is drafted by Claude] → It's marked as a draft in tasks; the owner reviews it before merge. The facts about the site (Resend, Vercel, a single cookie) are verified against the code.
- [EN/DE legal translations may be imprecise] → Each page states that the Polish version is binding.
- [Portable Text in three languages makes the seed long] → The seed builds blocks from compact helpers (`h2`, `p`, `ul`) rather than raw JSON.

## Open Questions

- **Booking channels:** the old terms list Booking.com and Airbnb as booking channels. Should the new terms keep them (if the listings stay active), or say bookings are direct only?
- **Property address:** the old terms use "Zawoja 2853". The site uses "Zawoja Mosorne 2853, 34-222 Zawoja". Which should the legal texts use?
- **NIP or REGON:** should the controller section show the company's NIP?
