## Why

Wnętrza, Okolica and Galeria currently show only their Page Header. The design has full bodies for all three, and the CMS slots and gallery photos behind them are already seeded. For Wnętrza, the owner doesn't want to repeat the old site's alternating rows. It becomes a room-by-room tour with a new design, so guests see each room's photos together and groups can see where everyone sleeps. This change makes the site complete apart from the contact form.

## What Changes

- **Feature row** (Okolica only): a photo plus eyebrow, 40px title, body and bullets (Lucide `minus`). It alternates sides on desktop and stacks photo-first on mobile.
- **Wnętrza, redesigned as a room-by-room tour** instead of the old site's alternating rows. It's designed in pen.dev first and approved before any code.
  - **Room navigation**, always within reach:
    - a chip row at the top (Salon, Sypialnie, Łazienki, Kuchnia, Rozrywka, Detale);
    - on desktop, once it has scrolled away, a compact rail fixed on the right edge;
    - on mobile, the chip row sticks below the navbar.

    It jumps to any room and highlights the room in view.
  - One **room section** per type, in CMS order: an editorial mosaic (1 large plus 2–3 smaller photos), the room name, a short text, and 2–3 key facts.
  - The **Sypialnie** section shows **bedroom cards** (photo, name, bed setup and guest count) so groups can plan who sleeps where.
  - Any room photo opens the shared lightbox, showing that room's photos.
- **Okolica** (`z1yziP` / `QNeFv`):
  - an intro: heading, lead, body;
  - 4 feature rows: Babia Góra, ski slopes, Babia Góra Trails, waterfalls and chapels;
  - a dark band of 4 key figures (100 km, 1725 m, 20 km, 18 km).
- **Galeria** (`V6NL6` / `PfDER`):
  - category chips (All, Interiors, Spa, Terrace & garden, Surroundings);
  - a masonry grid of the curated `galleryPage.photos` in CMS order, using the design's tile heights;
  - filtering happens client-side, and all photos show without JavaScript.
- **Lightbox**: designed in pen.dev first, then built. It opens a photo full-screen from the gallery or a Wnętrza room, with previous/next, close, a counter and the alt text as caption. It supports keyboard, swipe and the browser's modal `<dialog>`, and stays within the active filter.
- **CMS**: `interiorsPage` replaces its fixed slots (`livingRoom`, `antiques`, `bedrooms`, `comfort`, `relaxation`, `details`) with:
  - `rooms[]`: room type plus ordered photos;
  - `bedrooms[]`: localized name and bed setup, guest count, photo.

  The seed is updated. The bedroom details start as placeholders until the owner provides them.
- **Data**: one typed query per page (header plus body, season-aware through the existing `resolvedSlot`). The gallery query includes each photo's category.
- **Copy**: all body text in PL/EN/DE, with EN/DE drafted for review.

## Capabilities

### New Capabilities
- `interiors-page`: the Wnętrza room tour: room nav, room sections, bedroom cards.
- `surroundings-page`: Okolica intro, attractions and key figures.
- `gallery-page`: category filters, masonry grid and lightbox.

### Modified Capabilities
- `page-media`: `interiorsPage` changes from fixed slots to `rooms[]` and `bedrooms[]`, and the seed requirement changes to match.

## Impact

- **cms/**: `interiorsPage` schema and seed; the schema is redeployed.
- **app/**:
  - new components `FeatureRow`, `RoomNav` (client: top row, right rail, sticky mobile row), `RoomSection`, `BedroomCard`, `SurroundingsIntro`, `KeyFacts`, `GalleryGrid` (client) and `Lightbox` (client);
  - the three pages switch from `SubPage` to their own layouts;
  - new queries, regenerated types and catalog keys.
- **design/rezydencja.pen**: gains a new Wnętrza layout and a Lightbox frame (desktop and mobile).
- **Out of scope**: Kontakt (contact-form change), editing body copy in the CMS.
