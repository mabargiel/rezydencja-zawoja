## 1. Baseline

- [x] 1.1 Build `main` and save the prerendered HTML of every route as a baseline

## 2. Shared components and helpers

- [x] 2.1 `Eyebrow` (tone, size) replacing the 8 copies; `DashList` in FeatureRow and RoomSection; `PhotoTile` in GalleryGrid; `chipClass` for gallery filters and room chips; `StepButton` in Lightbox
- [x] 2.2 `localizedPath`, with Navbar passing `homeHref` and `bookHref` to MobileMenu; `emailHref`; replace every hand-built `/${language}…` and `mailto:`
- [x] 2.3 `lightbox.openPhoto` in PL/EN/DE (remove the two page keys), returned by `getLightboxLabels`; drop the `openPhoto` props; `fillTemplate` in `lib/template.ts`
- [x] 2.4 `lib/inquiry`: export `today`, `maxGuests`, `maxNameLength` and `isIsoDate`; use them in BookingBar, PrefilledContactForm, ContactForm and the schema

## 3. Dead code, types and fixes

- [x] 3.1 Remove `SectionHeading` `as`/`id`, `AmenityList` `tone`, the lightbox Escape keydown, and the `roomTypes` export
- [x] 3.2 Derive the pricing `Unit`, the gallery `Category` and `GalleryPhoto`, and the `GalleryPreview` photo type from the query results
- [x] 3.3 Key the `useSectionInView` cache by id and margin
- [x] 3.4 Apply the comment decisions (D7): rename `isDefinitelyRateLimited`; `azureMaxWidth` and `designMapRatio`; one-line why-comments only where needed
- [x] 3.5 Declare `@sanity/image-url` in `app/package.json`

## 4. CMS

- [x] 4.1 `polishText` in `schemaTypes/localized.ts`; `photoList` for room photos; `defaultLanguages` from `constants`; confirm the extracted schema is unchanged and `sanity schema validate` passes
- [x] 4.2 Seed helpers: `scripts/localized.ts` (the `Localized` type, `localizedArray` and `photoId`), `upsertPhoto` in `seed.ts`, and shared legal contact links; typecheck the scripts

## 5. Unused-code check

- [x] 5.1 Add `knip` and `knip.json` (entry points: app routes, the image loader, CMS scripts and config; ignore the generated types), an `npm run knip` script, and a CI step; the run is clean

## 6. Verification

- [x] 6.1 Build again and diff the prerendered HTML against the baseline (class order normalised); only the expected differences remain
- [x] 6.2 Lightbox in a visible browser: open, keyboard, swipe, close button, Escape, reopen; gallery filters; room nav; contact form
- [x] 6.3 Run format:check, lint, lint:styles, knip, typecheck and build; open a PR; confirm CI and the Vercel preview are green
