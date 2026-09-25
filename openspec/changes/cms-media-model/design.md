## Context

- The Sanity project `oavmm529` has an empty `production` dataset (public read) and an empty schema list. The Studio is standalone in `cms/` (Sanity 6), and the app uses `next-sanity` 13.
- The design uses 32 photos across 5 desktop screens and their mobile versions. Many are reused: the living-room photo appears in 4 slots, the antique cabinet in 4, and the winter view in 3. The Home hero is a "Hero Drone Video" frame with the night photo `dom-noca1.jpeg` as its still.
- Decisions already made:
  - winter variants per slot, with one site-wide season switch;
  - pricing lives in this change;
  - the Studio UI is in Polish;
  - copy stays in i18next (only image alt text and pricing text are localized in Sanity).

## Goals / Non-Goals

**Goals:**
- Every photo is uploaded once and reused by reference.
- One click in the Studio switches the whole site between summer and winter.
- Typed queries from GROQ to React, with CI catching schema/query drift.
- Content changes show up on the live site without a redeploy.
- After seeding, the dataset reproduces the design's photo placement exactly.

**Non-Goals:**
- Rendering page bodies (landing-page and subpages changes). This change only wires Page Header photos.
- Visual editing / Presentation tool, draft previews.
- Per-language photos. Photos are the same in every language; only alt text differs.

## Decisions

### D1. Photo library + referencing slots
```
photo (document)                      mediaSlot (object)
  image    image, hotspot, required     photo        → photo, required
  alt      internationalizedArrayString winterPhoto  → photo, optional
           (pl required, en/de warn)
  category interiors | spa |          videoSlot (object)
           terraceGarden | surroundings video        file mp4/webm, required
                                        winterVideo  file, optional
                                        poster       mediaSlot, required
```
Slots reference `photo` documents, so reuse costs nothing and alt text is written once. Deleting a used photo is blocked by Sanity's reference integrity.
- *Alternative: inline `image` fields per slot.* The same photo would be re-uploaded and its alt text re-typed up to 4 times. Rejected.

### D2. Season switch in a `siteSettings` singleton; resolved in GROQ
`siteSettings.season` is `summer | winter`, defaulting to `summer`. Each query resolves slots in one round trip:
```groq
{ "season": *[_id == "siteSettings"][0].season } { ...,
  "header": *[_id == "interiorsPage"][0].header {
    "photo": select(^.season == "winter" && defined(winterPhoto) => winterPhoto->, photo->)
  }
}
```
A shared GROQ fragment `resolvedPhoto` keeps this consistent everywhere. The same pattern applies to `videoSlot`.
- *Alternative: resolve in TypeScript after fetching both photos.* That doubles the payload and spreads the logic around. Rejected.
- *Alternative: switch automatically by date.* The user chose the manual switch, because snow doesn't follow the calendar.

### D3. Page singletons named after content, not layout
| Singleton (fixed `_id`) | Fields |
| --- | --- |
| `homePage` | `hero` (videoSlot); `intro.house`, `intro.detail`; `spa.saltGrotto`, `spa.hotTub`, `spa.sauna`; `interiors`; `location`; `galleryPreview` (array of photo refs, max 4) |
| `interiorsPage` | `header`; `livingRoom`, `antiques`, `bedrooms`, `comfort`; `relaxation` (2 slots); `details` (4 slots) |
| `surroundingsPage` | `header`; `babiaGora`, `slopes`, `trails`, `waterfalls` |
| `galleryPage` | `header`; `photos` (ordered array of photo refs, drag to reorder) |
| `contactPage` | `header`; `map` |

The named fields match the i18next copy keys the later changes will use (e.g. `pages.interiors.livingRoom.title`). Each section's photo and text then pair by name, not by array index. Fixed-count groups (`relaxation`, `details`) are arrays with exact-length validation.

### D4. Pricing as structured data, units rendered by i18next
```
pricing (singleton)
  year        number
  rates[]     period (i18n string), minimumStay (i18n string),
              amount (number), unit (night | stay | week | weekend),
              extraPerson { amount, unit (stay | week | weekend | night) }
  addOns[]    name (i18n string), note (i18n string), amount, unit
  facts[]     label (i18n string), value (i18n string)
```
Amounts are numbers, formatted in PLN with `Intl.NumberFormat`. Units come from i18next (`zł / doba`, `/ night`, `/ Nacht`), so a price change is one number and no translation work.
- *Alternative: free-text price strings ("1500 zł / doba").* Easy to type, but each price has to be edited three times, and there are no numbers to validate. Rejected.

### D5. Localized text: `sanity-plugin-internationalized-array`
Configured with a static list `pl`, `en`, `de` and field types `string` and `text`. Validation requires `pl` and warns when `en` or `de` are missing. The plugin (v5) stores the language code in each item's `language` field, so queries pick `alt[language == $lng][0].value` and fall back to `pl`.
- *Alternative: an object with `pl`, `en` and `de` fields.* Sanity's own guidance advises against it because of attribute limits at scale. It's fine at this size, but the plugin gives a better editing UI and is the documented pattern. Chosen: the plugin.

### D6. Studio in Polish with a custom structure
`@sanity/locale-pl-pl`, with all schema titles and descriptions in Polish. The structure:
```
Sezon (siteSettings)
Strony ▸ Strona główna · Wnętrza · Okolica · Galeria · Kontakt
Cennik
Biblioteka zdjęć (photo list, filterable by category)
```
Singletons use `S.document().documentId(...)` and are hidden from the "new document" menu, following Sanity's singleton pattern.

### D7. Data layer in the app: `defineLive`, typed with TypeGen
- `app/src/sanity/`:
  - `client.ts` (`useCdn: true`, `apiVersion: '2026-09-01'`);
  - `live.ts` (`defineLive`, no token: the dataset is public and only published content is shown);
  - `image.ts` (`@sanity/image-url` builder);
  - `queries.ts` (`defineQuery`);
  - `types.ts` (generated).
- `<SanityLive />` renders in `[lng]/layout.tsx`, so pages stay static and revalidate when content changes, including the season switch.
- TypeGen config lives in `cms/sanity.cli.ts` with `path: '../app/src/**/*.{ts,tsx}'` and `generates: '../app/src/sanity/types.ts'`. The generated file is committed. CI runs `npm run typegen` and fails on `git diff --exit-code`.
- *Alternative: time-based ISR, or a webhook to `revalidateTag`.* ISR delays the season switch. A webhook needs a secret, a route and Sanity webhook setup. `defineLive` is the documented default with no extra infrastructure. Chosen.

### D8. `SanityImage` component
It wraps `next/image`: `src` from `urlFor(photo).width(w).height(h).fit('crop').auto('format')`, which respects hotspots; `alt` in the current language; and a blur placeholder from `asset->metadata.lqip`. `PageHeader`'s `image` prop becomes this photo type. `next.config` `remotePatterns` is limited to `/images/oavmm529/**`.

### D9. Seed script
`cms/scripts/seed.ts`, run with `npx sanity exec scripts/seed.ts --with-user-token`:
1. Upload each file in `design/images/` except logos, with `sanity.imageAsset` deduplicated by content hash.
2. Create `photo` documents with deterministic IDs (`photo-<file-stem>`), drafted PL/EN/DE alt text, and a category.
3. Create the singletons, with slots mapped to the design's placement (the inventory in `seed-map.ts`).
4. Upload the old site's `video1.mp4` as the hero placeholder video.
5. Create `pricing` from the design's Cennik values.

It's idempotent: deterministic IDs plus `createOrReplace`, so re-running it resets the seed content.

## Risks / Trade-offs

- [`defineLive` adds a small client script for live updates] → It's a few KB and keeps pages static. It can be swapped for webhook revalidation later without touching queries.
- [The editor forgets to switch the season back] → The Studio shows the current season on the first screen. Automatic date switching can be added later as a fallback.
- [Drafted alt texts need a human check] → The seed puts them in, and the owner reviews them in the Studio. Alt text is secondary to page copy.
- [The old placeholder video isn't the final drone video] → Listed as an open question. Replacing it is a Studio upload, not code.
- [TypeGen output drifts from schema/queries] → The CI freshness check.
- [The internationalized-array plugin's compatibility with Sanity 6] → Check the peer range before installing, and fall back to a localized object type if it isn't compatible.

## Migration Plan

1. Add schemas, plugins and structure; deploy the schema (`sanity schema deploy`) and the Studio (CI).
2. Run the seed locally against `production`, which is empty.
3. Ship the app changes. Page Headers show photos.

Rollback: revert the app commits. The dataset can be cleared with `sanity dataset delete`/recreate, since nothing else depends on it yet.

## Open Questions

- Where does the final drone video come from? Until it's replaced, the seed uses the old site's `video1.mp4`.
- Are the seasonal rate names in the design final ("Święta wiosenne", "Wakacje i ferie")? The seed uses them as they are.
