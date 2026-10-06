## Context

- `/[lng]/contact` renders `SubPage` (only the Page Header).
- The booking bar submits with GET to `/{lng}/contact?arrival=YYYY-MM-DD&departure=YYYY-MM-DD&guests=N`, and works without JavaScript.
- The CMS already has `contactPage.header` and `contactPage.map`, a seasonal slot seeded with `map-zawoja-2.png`.
- Phone and email live in `app/src/config/site.ts`.
- Design `McNXT` (1440px):
  - content row: padding 100/120, gap 64;
  - form column (fill): eyebrow "Formularz zapytania", a 38px title, labelled fields (Jost 12 labels with tracking 1, uppercase; white boxes with a `line` border, padding 14/16, text 15); two-column rows for phone/email, the dates and adults/children; the consent checkbox; a full-width `accent` "Wyślij zapytanie" button with an arrow;
  - a 440px `bg-dark` card: padding 44, gap 28, a 28px title, four info rows (a 40px translucent icon tile, a `accent-warm` label of 11px with tracking 2, a 15.5px value), and an `accent-warm` "Zadzwoń teraz" button;
  - directions: a caption bar with padding 44/120, a top border, a 34px title on the left and the coordinates link on the right; then a 560px map image with a centred dark "Rezydencja Zawoja" pill above an `accent-warm` pin.
- Design `a7yX5j` (390px): content padding 40/20/48, gap 36; the card (padding 28, gap 24) comes before the form; the caption stacks; the map is 320px.

## Goals / Non-Goals

**Goals:**
- An inquiry reaches the owner's inbox reliably, and replying goes straight to the guest.
- The page stays statically prerendered and matches the design in PL, EN and DE.
- The form works without JavaScript, including the server-side error and success states.

**Non-Goals:**
- A confirmation email to the guest.
- Availability checks or a booking calendar.
- Legal pages: the consent text gets its privacy link when they exist.
- Captcha.

## Decisions

### D1. Server Action + `useActionState`, progressive enhancement
`sendInquiry(previous, formData)` is a server action in `app/src/app/[lng]/contact/actions.ts`. `ContactForm` is a Client Component that uses `useActionState(sendInquiry, initial)` and `useFormStatus` for the pending button. Without JavaScript, the form posts natively and the page re-renders with the returned state.
- The action returns codes, not text: `{ status: 'idle' | 'invalid' | 'failed' | 'sent', errors?: Partial<Record<Field, ErrorCode>>, values? }`. The client maps the codes to translated strings it receives as props, so the action doesn't need the language.
- The returned `values` refill the fields after a failed submit.
- *Alternative: a route handler and `fetch`.* It needs JavaScript and duplicates what server actions already provide.

### D2. Validation with zod, shared shape
One zod schema validates on the server:
- `name`: 2–100 characters;
- `email`: valid;
- `phone`: optional, 6–30 characters of digits, spaces, `+ ( ) -`;
- `arrival` and `departure`: optional ISO dates; departure after arrival; arrival not in the past;
- `adults` 1–10 and `children` 0–10, with adults + children ≤ 10 (the house sleeps 10);
- `message`: optional, ≤ 2000 characters;
- `consent`: must be checked.

The browser gets matching native attributes (`required`, `type="email"`, `min`/`max`, `maxLength`) for instant feedback. The server stays the source of truth.
- *Alternative: hand-written checks.* zod keeps the rules in one readable place, and `flatten()` gives the per-field codes.

### D3. Prefill without making the page dynamic
Reading `searchParams` in the page would make Kontakt dynamic. Instead:
- `ContactForm` reads them with `useSearchParams()`;
- it's wrapped in `<Suspense>`, whose fallback is the same form with empty defaults;
- the static HTML has a usable empty form, and the client fills in `arrival`, `departure` and `adults` (from `guests`) after hydration;
- invalid or past values are ignored.

Without JavaScript the fields start empty, and the guest retypes the dates. That's acceptable, because the form itself still works.

### D4. Delivery through Resend
- `resend.emails.send` with:
  - `from: CONTACT_FROM_EMAIL`, e.g. `Rezydencja Zawoja <formularz@rezydencjazawoja.pl>`;
  - `to: CONTACT_TO_EMAIL ?? site.email`;
  - `replyTo`: the guest's email;
  - a subject like `Zapytanie: 12.12–16.12.2026, 6 os. — Jan Kowalski`;
  - a plain-text body: Polish labels, every field, and the site language (PL/EN/DE), so the owner knows which language to reply in.
- Plain text avoids an HTML template dependency and renders everywhere.
- `RESEND_API_KEY` is read only in the server action. A missing key or a Resend error returns `failed`, and the UI shows the phone and email as a fallback. The error is logged with `console.error`, so it shows in the Vercel logs.
- `CONTACT_TO_EMAIL` lets Preview deployments send to a test inbox.
- *Alternative: an SMTP/nodemailer setup.* Resend is the user's choice, has a small SDK and handles SPF/DKIM through domain verification.

### D5. Spam protection: a honeypot
- A visually hidden `website` input (`tabIndex={-1}`, `autoComplete="off"`, `aria-hidden`) is part of the form.
- If it's filled, the action returns `sent` without sending anything, so bots get no signal.
- Combined with server validation, this is enough for a small guesthouse site.
- If spam appears, a rate limit (Vercel firewall rule on the action's POST) or Turnstile can be added later.

### D6. Page structure and data
- `contactPageQuery` returns `header{ ${resolvedSlot} }` and `map{ ${resolvedSlot} }`.
- The page renders: `PageHeader`, then the content row (`ContactForm` + `ContactCard`, with the card first on mobile through `order` utilities), then `Directions`.
- New `site.ts` entries:
  - `address` (two lines);
  - `checkIn: '16:00'` and `checkOut: '10:00'`;
  - `coordinates: { lat: 49.64051614064316, lng: 19.558586753262016 }`;
  - `mapsHref`, a Google Maps search URL built from the coordinates.
- Translated labels come from the catalogs: "Przyjazd od {{time}}".
- The map is the CMS image (`SanityImage`, cover; D8). The marker is markup on top of it, and the whole image links to `mapsHref` in a new tab.

### D8. Map: an Azure Maps static image, generated once and stored in the CMS
- `cms/scripts/map.ts` (`npm run map -w cms`) calls the Azure Maps Render API (`GET https://atlas.microsoft.com/map/static`, current `api-version`):
  - centre at 19.558586753262016, 49.64051614064316 (lng, lat), so the house is exactly in the middle;
  - a zoom that shows Zawoja and Babia Góra, picked while building;
  - the road style, with labels in Polish;
  - the widest size the API allows, at the design's 1440×560 aspect ratio;
  - no pin drawn by Azure, because the design's marker is markup.
- The script uploads the PNG as a `photo` document (`photo-azure-map`, category surroundings, PL/EN/DE alt text) with the hotspot at the centre. It then points `contactPage.map.photo` at it. Running it again replaces the image in place.
- `seed.ts` uses `photo-azure-map` for `contactPage.map` when it exists, and falls back to the design screenshot `map-zawoja-2.png`, so the seed stays runnable without an Azure key.
- Because the hotspot is centred, the 390×320 mobile crop of the wide image keeps the house in the middle, under the marker.
- **Key:** `AZURE_MAPS_KEY` is in `cms/.env` only, sent as the `subscription-key` header. Nothing on the site calls Azure at runtime: no key in the browser, no per-visit cost, and the image is served and resized by the Sanity CDN like every other photo.
- **Attribution:** Azure Maps' terms require the copyright notice. If the returned image doesn't already include it, `Directions` shows a small "© Microsoft, © TomTom" caption in the corner of the map.
- *Alternative: a route handler proxying Azure on each request.* It keeps the image always current, but adds a runtime dependency and cost for a map that never changes.
- *Alternative: an embedded interactive map.* It needs third-party cookies and a consent decision, and it's heavier. The static image matches the design.

### D7. Copy structure
`pages.contact` gains:
- `form.{eyebrow,title,name,phone,email,arrival,departure,adults,children,message,consent,submit,sending}`, with placeholders;
- `errors.{required,email,phone,dateOrder,datePast,guests,consent,tooLong,failed}`;
- `sent.{title,body,again}`;
- `card.{address,phone,email,stay,checkIn,checkOut,call}`;
- `directions.{eyebrow,title,open}`.

PL is the source; EN and DE are drafted for review.

## Risks / Trade-offs

- [Azure's static image size limit is below 2× of 1440px] → On high-density desktop screens the map is slightly upscaled. That's acceptable for a map; if it looks soft, render two halves and stitch them in the script.

- [Domain not verified in Resend at launch] → Resend only sends from verified domains. Until the owner adds the DNS records, Preview can use `onboarding@resend.dev` with `CONTACT_TO_EMAIL` set to the Resend account's own address. Production waits for verification, which is a task with an owner checkpoint.
- [Prefill needs JavaScript] → Accepted (D3). The form is fully usable without it.
- [The honeypot doesn't stop targeted spam] → Server validation limits payload size. Escalation paths are listed in D5.
- [Email deliverability] → Verified SPF/DKIM, a plain-text body, and Reply-To rather than a spoofed From.

## Migration Plan

1. Generate the Azure map (owner provides `AZURE_MAPS_KEY`) and put it into the design.
2. Design the message field and the error and success states in pen.dev, and get approval.
3. Build the page and the form with the action. Test locally with a Resend test key and `CONTACT_TO_EMAIL`.
4. The owner creates the Resend account and verifies the domain. Add the env vars in Vercel (Production + Preview).
5. Open a PR from `feat/contact-form`, and send a real inquiry from the Vercel preview before merging.

Rollback: revert the PR. Contact goes back to the header-only stub, and nothing else depends on it.

## Resolved Questions

- Inquiries go to `biuro@rezydencjazawoja.pl` in production (`site.email`).
- The owner manages DNS for `rezydencjazawoja.pl` and adds the Resend records (task 5.3).
