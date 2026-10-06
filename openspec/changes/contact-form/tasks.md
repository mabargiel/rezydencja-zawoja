## 1. Design (approval gate)

- [x] 1.0 Map script `cms/scripts/map.ts`: fetch the Azure Maps static image centred on 49.64051614064316, 19.558586753262016, upload it as `photo-azure-map` (hotspot centred, PL/EN/DE alt), point `contactPage.map` at it, and make `seed.ts` reuse it. Add `AZURE_MAPS_KEY` to `cms/.env.example`. Needs the key from the owner. Put the generated map into the Kontakt frames in pen.dev
- [x] 1.1 In pen.dev, add to Kontakt at 1440px and 390px: an optional message textarea, field error states, the form-level failure message (with the phone and email), the sending button state and the sent confirmation. Reuse the tokens, fonts and icons, and screenshot everything for approval
- [x] 1.2 Get the user's approval, apply feedback, and copy the design into `design/`

## 2. Setup

- [x] 2.1 Add `resend` and `zod` to `app/`. Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL` to `app/.env.example`
- [x] 2.2 Add the address, check-in and check-out times, coordinates and `mapsHref` to `app/src/config/site.ts`
- [x] 2.3 Add `contactPageQuery` (header and map through `resolvedSlot`) and run `npm run typegen`
- [x] 2.4 Add the `pages.contact` copy to `pl.ts` (form, errors, sent, card, directions) and draft `en.ts` and `de.ts`

## 3. Page

- [x] 3.1 Move the contact page off `SubPage`. Render `PageHeader`, the content row and `Directions`
- [x] 3.2 `ContactCard`: the info rows with icons, `tel:` and `mailto:` links, and "Zadzwoń teraz"
- [x] 3.3 `Directions`: the caption with the coordinates link, and the CMS map image with the marker and attribution, linking to Google Maps

## 4. Form and delivery

- [x] 4.1 The zod schema and the `sendInquiry` server action: validation codes, the honeypot, the plain-text email through Resend with Reply-To and the site language, and a `failed` result when the key is missing or Resend errors
- [x] 4.2 `ContactForm` (client): `useActionState`, `useFormStatus` pending button, translated field errors, values kept after errors, the sent state with focus, and native constraint attributes
- [x] 4.3 Prefill from `useSearchParams()` inside `<Suspense>`, with the empty form as fallback; ignore invalid values

## 5. Verification

- [x] 5.1 Compare with the approved design at 1440px and 390px in PL, EN and DE
- [ ] 5.2 Behaviour:
  - prefill from the booking bar;
  - each validation error;
  - success and failure (missing key);
  - the honeypot;
  - no request to Azure from the page;
  - without JavaScript;
  - a real send to a test inbox through Resend
- [ ] 5.3 Owner checkpoint: create the Resend account, verify `rezydencjazawoja.pl`, and add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (and `CONTACT_TO_EMAIL` for Preview) in Vercel
- [ ] 5.4 Run format:check, lint, lint:styles, typecheck, typegen freshness and build; scan for comments; open a PR from `feat/contact-form`; confirm CI and the Vercel preview are green, and send one inquiry from the preview
- [ ] 5.5 Send the new EN/DE copy for review
