## 1. Studio foundation

- [x] 1.1 Install `@sanity/locale-pl-pl` and `sanity-plugin-internationalized-array` (languages `pl`, `en`, `de`; field type `string`; every localized field is short text) in `cms/`, and register both in `sanity.config.ts`
- [x] 1.2 Add shared schema types: `mediaSlot` (photo + optional winterPhoto refs) and `videoSlot` (video file + optional winterVideo + poster `mediaSlot`), with Polish titles and previews
- [x] 1.3 Add the `photo` document: image with hotspot, `alt` (internationalized string; `pl` required, `en`/`de` warning), `category` list; the preview shows the image, Polish alt and category

## 2. Content schemas

- [x] 2.1 Add the `siteSettings` singleton (`season`: summer/winter, default summer) and the `pricing` singleton (year, rates, addOns, facts) per design D4, with number-only amounts and unit lists
- [x] 2.2 Add `homePage`, `interiorsPage`, `surroundingsPage`, `galleryPage` and `contactPage` with the named slots from design D3, including the exact-length validation on `relaxation` (2) and `details` (4) and the max 4 on `galleryPreview`
- [x] 2.3 Add the custom structure (Sezon, Strony ▸ 5 pages, Cennik, Biblioteka zdjęć), with singletons pinned to fixed IDs and filtered out of "new document"
- [x] 2.4 Run `npx sanity schema validate`, then `sanity schema deploy`; open the Studio and check that every label is Polish and that only `photo` can be created

## 3. Seed

- [x] 3.1 Write `cms/scripts/seed-map.ts`: the 32 photo files with category and drafted PL/EN/DE alt text (written after looking at each photo), the slot → file mapping from the design inventory (`iq1tP`, `qf7cQ`, `V6NL6`, `z1yziP`, `McNXT`), and the design's gallery order
- [x] 3.2 Write `cms/scripts/seed.ts`: upload assets, `createOrReplace` photos with IDs `photo-<stem>`, the singletons, the hero `videoSlot` from the old `video1.mp4`, and `pricing` from the Cennik design values (`TIplG`)
- [x] 3.3 Run the seed against `production`, run it a second time, and confirm the document and asset counts are unchanged

## 4. App data layer

- [ ] 4.1 Configure TypeGen in `cms/sanity.cli.ts` (scan `../app/src`, output `../app/src/sanity/types.ts`); add a root `typegen` script and a CI step that fails on a stale diff
- [ ] 4.2 Add `app/src/sanity/`: `client.ts`, `live.ts` (`defineLive`), `image.ts` (`urlFor`), and `queries.ts` with a shared `resolvedPhoto` fragment (season-aware, alt in `$lng` falling back to `pl`); move `lib/sanity.ts` and `lib/env.ts` into it
- [ ] 4.3 Render `<SanityLive />` in `[lng]/layout.tsx`, and restrict `remotePatterns` to `/images/oavmm529/**`
- [ ] 4.4 Add a `SanityImage` component (hotspot crop at the rendered size, `auto('format')`, LQIP blur, localized alt), and change `PageHeader`'s `image` prop to take a resolved photo

## 5. Wire Page Headers

- [ ] 5.1 Add a header query for each subpage and pass the photo to `PageHeader` on interiors, surroundings, gallery and contact (`E3j9wx` / `V8PYt` with the image under the scrim), with `priority` loading
- [ ] 5.2 Check in the browser at 390px and 1440px against the design's header screenshots (`qf7cQ`, `z1yziP`, `V6NL6`, `McNXT` headers)

## 6. Verification

- [ ] 6.1 Season check: publish `season: winter` with a winter photo on one header, confirm that page switches and a page without a variant doesn't, then set the season back to summer
- [ ] 6.2 Check that alt text is localized in the rendered HTML of `/de/interiors` and falls back to Polish on a photo without English alt text
- [ ] 6.3 Run format:check, lint, lint:styles, typecheck, typegen freshness and build; open a PR and confirm CI and the Vercel preview are green
- [ ] 6.4 Ask the user to review the drafted alt texts and pricing in the Studio
