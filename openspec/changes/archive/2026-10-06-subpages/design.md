## Context

- The three subpages render `SubPage`, which is just the Page Header with its CMS photo.
- The CMS singletons already hold every body slot:
  - `interiorsPage`: `livingRoom`, `antiques`, `bedrooms`, `comfort`, `relaxation[2]`, `details[4]`;
  - `surroundingsPage`: `babiaGora`, `slopes`, `trails`, `waterfalls`;
  - `galleryPage.photos[]`: 16 curated photos, each with a `category`.
- The season-aware `resolvedSlot` projection, `SanityImage`, `SectionHeading`, `AmenityList`-style patterns and the i18n setup all exist.

Design structure:

- **Wnętrza:** the current design (`zQWfy`, `R7tmq7`, `X8zj38`) is being replaced by a room-by-room tour (D6–D8), designed in pen.dev first. The feature row pattern (a 600×460 photo, gap 80, eyebrow, 40px title, body 16/1.65, `minus` bullets) is kept for Okolica.
- **Okolica:**
  - intro `d5VfA`: a 520px heading at 44px, with lead 18 and body 15.5 on the right;
  - 4 feature rows `fZVdb`, the same pattern;
  - facts `nGbvs`: `bg-dark`, 4 figures (Cormorant 38) separated by left rules.
- **Galeria:**
  - chips `LYvzh`: 10/22 padding; active is `accent` with white text, inactive has a `line` border;
  - grid `MyEiR`: 4 columns, gap 20, filled column by column, heights cycling 360/300/360/300/440/280/400/320/420/300/340/380/440/300/400/300.

## Goals / Non-Goals

**Goals:**
- All three pages match the design at 390px and 1440px, in PL, EN and DE.
- Every photo comes from the CMS and follows the season.
- The gallery works without JavaScript (all photos shown). Filtering and the lightbox are enhancements.

**Non-Goals:**
- Kontakt, CMS-editable body copy, and lightbox zoom or pinch.

## Decisions

### D1. `FeatureRow` for Okolica
Props: `eyebrow`, `title`, `body`, `bullets?`, `photo`, `reverse`. Desktop is `lg:flex-row`, with `reverse` swapping sides (odd rows put the image on the right, as in the design). Mobile stacks the photo above the text. The first photo on each page doesn't use `priority`, because the header photo is the page's main image.

### D2. One query per page, including the header
`interiorsPageQuery`, `surroundingsPageQuery` and `galleryPageQuery` each return `header{ ${resolvedSlot} }` plus the body. The interiors body is `rooms[]{ _key, type, photos[]->{ "_key": _id, ${photoFields} } }` and `bedrooms[]{ _key, name, beds, guests, photo->{…} }`, with localized strings resolved to `$lng` falling back to `pl`. The gallery uses `photos[]->{ "_key": _id, category, ${photoFields} }`. The three pages render `PageHeader` themselves and stop using `SubPage`. Contact keeps `SubPage` until the contact-form change.

### D3. Copy structure
The copy follows the CMS field names:
- `pages.interiors.nav` (the room nav label) and `pages.interiors.rooms.{salon|bedrooms|bathrooms|kitchen|recreation|details}.{name,title,body,facts[]}`, keyed by the CMS room type;
- `pages.surroundings.intro`, `pages.surroundings.rows.{babiaGora|slopes|trails|waterfalls}` and `pages.surroundings.facts[]`;
- `pages.gallery.filters` and `pages.gallery.lightbox`.

Bullets and facts are arrays read with `t(key, { returnObjects: true })`. i18next types them from the Polish catalog, and `satisfies Messages` keeps EN/DE at the same shape. Room copy lives in the catalogs, keyed by room type. The CMS decides which rooms appear, in what order, and with which photos.

### D4. The gallery filter is client-side over server-rendered photos
`GalleryGrid` is a Client Component that receives the resolved photos, category labels and lightbox labels.
- The chips are `<button aria-pressed>` inside a labelled group.
- Filtering hides the other tiles and re-applies the height pattern to the visible set, so the masonry stays balanced.
- All photos are in the server HTML. Without JavaScript the chips do nothing and everything shows.
- Masonry uses CSS `columns-2 lg:columns-4` with `break-inside-avoid`, which matches the design's column-by-column flow.
- *Alternative: `?category=` URLs.* They'd make the page dynamic, or need 5 static variants per language. It's a small curated set, so client filtering is simpler.

### D5. The lightbox is designed first, then built on native `<dialog>`
- Before any code, add a Lightbox frame to `design/rezydencja.pen` for 1440px and 390px: dark full-bleed, the photo contained, close top-right, prev/next arrows, a counter "3 / 16", and the alt text as caption. It needs user approval.
- The implementation is a `Lightbox` Client Component using `<dialog>` with `showModal()`, like the mobile menu. That gives focus trapping, Escape to close and focus return for free.
- Arrow keys move previous/next, and swiping left or right uses pointer events with a 40px threshold. It wraps within the current filter.
- The image loads at `sizes="100vw"` with `object-contain`, through the existing loader. The neighbouring image is preloaded.
- Each gallery tile and Wnętrza room photo is a `<button>` with the photo's alt text as its accessible name, which opens the lightbox at that index within its own set (the filtered gallery, or the room).

### D6. The Wnętrza room model in the CMS
```
interiorsPage
  header      mediaSlot
  rooms[]     type: salon | kitchen | bedrooms | recreation | bathrooms   (unique)
              photos: photo refs (1–16, ordered; the first is the large mosaic tile)
  bedrooms[]  name (i18n string), beds (i18n string, e.g. "Dwa łóżka pojedyncze"),
              guests (number 1–4), photos: photo refs (1–12; the first is the card photo)
```
- The CMS controls which rooms show, their order and their photos. The text for each room type is in i18next. Room types are a fixed list with a uniqueness rule.
- Interior photos don't change with the season, so rooms use plain photo references rather than seasonal slots. The header stays a seasonal slot.
- Bed setup is free text in three languages, because the combinations vary. Guests is a number shown with a `user` icon ("3"), which avoids plural forms that differ between languages.
- The old fixed slots are removed from the schema, and the seed writes the new shape with `createOrReplace`. Nothing else reads them: Home uses `homePage.interiors`.
- **Content comes from the old site.** rezydencjazawoja.pl already groups 54 room photos by room and describes each bedroom (Apartament with a sitting room and a double bed; bedrooms 2 and 5 with a double bed and TV; 3 and 4 with two single beds; 2 guests each). `cms/scripts/seed-legacy.ts` lists the 42 photos we didn't have yet, with alt text, and the seed downloads and uploads them from the old site's URLs. The 12 already in the library are reused. The room list and order follow the old site: Salon, Kuchnia, Sypialnie, Rozrywka, Łazienki. The antique pieces belong to the Apartament, so there's no separate "Detale" room. The room copy is rewritten from the old site's facts, including which floor each room is on.
- *Alternative: a `room` field on every photo, queried by room.* That spreads the curation across 32 photo documents and loses per-room ordering. Rejected.

### D7. Room sections and mosaic
- Each room renders as a `<section id={type}>` with an eyebrow (the room name), a title, a short body, facts as a dotted inline list, and a mosaic.
- The mosaic: on desktop, 1 large tile (2 rows) plus up to 3 smaller ones. With 1 photo it's a single wide image; with 2 photos, 2 equal tiles. On mobile, the large tile is on top and the rest form a 2-column row.
- The Sypialnie section adds a row of `BedroomCard`s under the mosaic, scrolling horizontally on mobile. Each card is a button that opens the lightbox with that bedroom's photos.
- The exact look comes from the approved pen.dev design (task 3.1).

### D8. Room navigation: a top chip row, then a right-side rail while scrolling
- **Top row.** Below the Page Header, `RoomNav` renders a horizontal row of chips for the rooms present, in CMS order. They're anchor links to `#<type>`, so they work without JavaScript.
- **Desktop right rail (≥ `lg`).** Once the top row has scrolled out of view, a compact vertical rail appears fixed on the right edge, vertically centred: short room labels, each with a dot, on a translucent `bg`/blur background. It fades out again when the top row returns or the room sections end (at the footer).
- **Mobile (< `lg`).** The chip row sticks below the fixed navbar and scrolls horizontally. The active chip is scrolled into view. A right rail would cover the photos at 390px.
- **Active room.** Everywhere, the room crossing the middle of the viewport is highlighted (`accent-warm` / filled dot) with `aria-current="location"`, reusing `useSectionInView`.
- **Visibility.** The rail's visibility uses the same observer approach, watching the top row and the end of the room list. Everything is one small Client Component that receives the translated room names as props.
- **Accessibility.** The rail is a `<nav>` with its own label and appears only after the top row is gone, so screen readers and keyboard users don't meet duplicate navigation at the same time. Room sections use `scroll-margin-top` so jumps land below the navbar and the sticky mobile row.
- The rail's exact look comes from the approved pen.dev design (task 3.1).

## Risks / Trade-offs

- [Tile heights are fixed and ignore the photo's aspect ratio, so the crop relies on the hotspot] → That matches the design, and the hotspot-based `object-position` from `SanityImage` keeps subjects in frame.
- [Hiding tiles with `display: none` inside CSS columns re-flows the columns] → Intended: the filtered set re-balances into the columns.
- [The new Wnętrza has no approved design yet] → Task 3.1 designs it in pen.dev for desktop and mobile, together with the lightbox, and code waits for approval.
- [The seed depends on the old site being online for the legacy photos] → It's a one-time migration: once seeded, Sanity holds the files. The old site stays up until the new one launches.
- [Typing bullets through `returnObjects`] → If i18next's typing fights it, fall back to fixed keys (`bullets.0`, `bullets.1`, `bullets.2`). It's a local change inside the catalogs.

## Migration Plan

1. Change the CMS schema and seed.
2. Design the new Wnętrza and the lightbox in pen.dev, and get approval.
3. Build Okolica (`FeatureRow`), then Wnętrza, then the gallery with the lightbox.
4. Verify and open a PR from `feat/subpages`. `main` is protected.

## Open Questions

- The look of the Wnętrza tour and the lightbox is settled by the approval step (task 3.1).
