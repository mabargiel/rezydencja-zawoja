## Why

The shell is live, but every photo slot is empty: Page Headers fall back to the dark gradient. Photos, video and prices are the content that actually changes on this site, especially between summer and winter. The design uses 32 real photos, often the same photo in several places. So the CMS needs a model that stores each photo once, lets any slot swap to a winter version, and holds the yearly pricing table. The landing-page and subpage changes that follow can then just query it.

## What Changes

- **Photo library**: a `photo` document holds each image once, with hotspot, trilingual alt text (PL required) and a gallery category (interiors, spa, terrace & garden, surroundings). Slots reference photos instead of re-uploading them.
- **Seasonal slots**: every image slot has a default photo and an optional winter photo, and the hero has an optional winter video. A `siteSettings` singleton with `season: summer | winter` switches the whole site at once. Slots without a winter variant keep their default.
- **Page media singletons** named after what the photos show, not the layout:
  - `homePage`: hero video + poster, intro, spa (grotto, hot tub, sauna), interiors teaser, location panorama, gallery preview;
  - `interiorsPage`: header, 4 feature rooms, relaxation, details;
  - `surroundingsPage`: header, 4 attractions;
  - `galleryPage`: header, plus an ordered, curated list of photos;
  - `contactPage`: header, map.
- **Pricing** singleton `pricing`: the year, 7 seasonal rate rows (localized period and minimum stay, amount, unit, extra-person surcharge), the paid add-on (hot tub with jacuzzi), and the stay facts (check-in/out, deposit, pets, Wi-Fi & parking) as localized label/value pairs.
- **Studio in Polish**: the `@sanity/locale-pl-pl` UI translation and Polish titles. A custom structure groups the Season setting, Pages, Pricing, Photo library and Videos, with singletons pinned to fixed IDs.
- **Seed**: a script uploads the 32 photos from `design/images/` with drafted PL/EN/DE alt text and categories. It fills every slot exactly as the design shows it and fills the pricing from the design. The hero gets the old site's drone video as a placeholder.
- **App**:
  - Sanity TypeGen types, committed, with CI failing if they're stale;
  - a `defineLive` data layer and an image URL helper, plus a `SanityImage` component using hotspot and blur placeholder;
  - season-aware GROQ;
  - Page Headers on Interiors, Surroundings, Gallery and Contact show their CMS photo.
- **Clean-up**: `next.config` `remotePatterns` stays scoped to `cdn.sanity.io/images/oavmm529/**`.

## Capabilities

### New Capabilities
- `media-library`: photo documents, trilingual alt text, gallery categories and curated gallery order.
- `seasonal-media`: the season switch and the default/winter resolution for images and video.
- `page-media`: which slots each page has, and how the app queries and renders them.
- `pricing-content`: the pricing model and its localized fields.
- `cms-editing`: Studio language, structure, singletons and the seed script.

### Modified Capabilities
- `site-shell`: the Page Header requirement changes from "optional image, falls back to `bg-dark`" to "shows the page's CMS header photo, resolved for the current season, with `bg-dark` only when the slot is empty".

## Impact

- **cms/**: new schemas, `sanity.config.ts` plugins (`@sanity/locale-pl-pl`, `sanity-plugin-internationalized-array`), a custom structure, TypeGen config, and a seed script under `cms/scripts/`.
- **app/**:
  - `src/sanity/` gets the client, live, image and queries modules, plus the generated `sanity.types.ts`;
  - the layout renders `<SanityLive />`;
  - the Page Header callers pass photos.
- **Dataset**: about 32 image assets and 1 video, 6 singletons (site settings, 4 pages, pricing) plus the gallery page, and 32 photo documents.
- **CI**: adds a TypeGen freshness check.
- **Out of scope**: page body sections (landing-page and subpages changes), the contact form and a real map embed.
