## Why

Wnętrza, Okolica and Galeria currently show only their Page Header. The design has full bodies for all three, and the CMS slots and gallery photos behind them are already seeded. This change makes the site complete apart from the contact form.

## What Changes

- **Feature row** (shared by Wnętrza and Okolica): a photo plus eyebrow, 40px title, body and optional bullets (Lucide `minus`). It alternates sides on desktop and stacks photo-first on mobile.
- **Wnętrza** (`qf7cQ` / `qTweU`):
  - 4 feature rows: living room, antiques, bedrooms, bathrooms (no bullets);
  - a dark "relaxation" band: text plus 2 photos;
  - a "details" row: heading plus 4 photos.
- **Okolica** (`z1yziP` / `QNeFv`):
  - an intro: heading, lead, body;
  - 4 feature rows: Babia Góra, ski slopes, Babia Góra Trails, waterfalls and chapels;
  - a dark band of 4 key figures (100 km, 1725 m, 20 km, 18 km).
- **Galeria** (`V6NL6` / `PfDER`):
  - category chips (All, Interiors, Spa, Terrace & garden, Surroundings);
  - a masonry grid of the curated `galleryPage.photos` in CMS order, using the design's tile heights;
  - filtering happens client-side, and all photos show without JavaScript.
- **Lightbox**: designed in pen.dev first, then built. It opens a photo full-screen from the gallery, with previous/next, close, a counter and the alt text as caption. It supports keyboard, swipe and the browser's modal `<dialog>`, and stays within the active filter.
- **Data**: one typed query per page (header plus body slots, season-aware through the existing `resolvedSlot`). The gallery query includes each photo's category.
- **Copy**: all body text in PL/EN/DE, with EN/DE drafted for review.

## Capabilities

### New Capabilities
- `interiors-page`: Wnętrza body sections and their CMS photos.
- `surroundings-page`: Okolica intro, attractions and key figures.
- `gallery-page`: category filters, masonry grid and lightbox.

### Modified Capabilities
<!-- none: site-shell's Page Header and route requirements already cover these pages' shells -->

## Impact

- **app/**:
  - new components `FeatureRow`, `RelaxationBand`, `DetailsRow`, `SurroundingsIntro`, `KeyFacts`, `GalleryGrid` (client) and `Lightbox` (client);
  - the three pages switch from `SubPage` to their own layouts;
  - new queries, regenerated types and catalog keys.
- **design/rezydencja.pen**: gains a Lightbox frame (desktop and mobile).
- **CMS**: no schema changes.
- **Out of scope**: Kontakt (contact-form change), editing body copy in the CMS.
