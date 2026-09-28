## Context

- The three subpages render `SubPage`, which is just the Page Header with its CMS photo.
- The CMS singletons already hold every body slot:
  - `interiorsPage`: `livingRoom`, `antiques`, `bedrooms`, `comfort`, `relaxation[2]`, `details[4]`;
  - `surroundingsPage`: `babiaGora`, `slopes`, `trails`, `waterfalls`;
  - `galleryPage.photos[]`: 16 curated photos, each with a `category`.
- The season-aware `resolvedSlot` projection, `SanityImage`, `SectionHeading`, `AmenityList`-style patterns and the i18n setup all exist.

Design structure:

- **Wnętrza content `zQWfy`:** padding 110/120, gap 96 between 4 feature rows.
  - Each row: a 600×460 photo, gap 80, then text (eyebrow, 40px title, body 16/1.65, 3 bullets with a `minus` icon).
  - Relaxation `R7tmq7`: `bg-dark`, 480px text plus 2 photos 400 tall.
  - Details `X8zj38`: a heading at 36px plus 4 photos 300 tall.
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

### D1. One `FeatureRow` component for both pages
Props: `eyebrow`, `title`, `body`, `bullets?`, `photo`, `reverse`. Desktop is `lg:flex-row`, with `reverse` swapping sides (odd rows put the image on the right, as in the design). Mobile stacks the photo above the text. The first photo on each page doesn't use `priority`, because the header photo is the page's main image.

### D2. One query per page, including the header
`interiorsPageQuery`, `surroundingsPageQuery` and `galleryPageQuery` each return `header{ ${resolvedSlot} }` plus the body slots. Arrays use `relaxation[]{ _key, ${resolvedSlot} }`. The gallery uses `photos[]->{ "_key": _id, category, ${photoFields} }`. The three pages render `PageHeader` themselves and stop using `SubPage`. Contact keeps `SubPage` until the contact-form change.

### D3. Copy structure
The copy follows the CMS field names:
- `pages.interiors.rows.{livingRoom|antiques|bedrooms|comfort}.{eyebrow,title,body,bullets?}`, plus `relaxation` and `details`;
- `pages.surroundings.intro`, `pages.surroundings.rows.{babiaGora|slopes|trails|waterfalls}` and `pages.surroundings.facts[]`;
- `pages.gallery.filters` and `pages.gallery.lightbox`.

Bullets are arrays read with `t(key, { returnObjects: true })`. i18next types them from the Polish catalog, and `satisfies Messages` keeps EN/DE at the same shape. `comfort` has no `bullets` key, matching the design.

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
- Each gallery tile is a `<button>` with the photo's alt text as its accessible name, which opens the lightbox at that index.

## Risks / Trade-offs

- [Tile heights are fixed and ignore the photo's aspect ratio, so the crop relies on the hotspot] → That matches the design, and the hotspot-based `object-position` from `SanityImage` keeps subjects in frame.
- [Hiding tiles with `display: none` inside CSS columns re-flows the columns] → Intended: the filtered set re-balances into the columns.
- [Typing bullets through `returnObjects`] → If i18next's typing fights it, fall back to fixed keys (`bullets.0`, `bullets.1`, `bullets.2`). It's a local change inside the catalogs.

## Migration Plan

1. Add the queries and copy, then build the shared `FeatureRow`, then Wnętrza, then Okolica.
2. Design the lightbox, get approval, then build the gallery.
3. Verify and open a PR from `feat/subpages`. `main` is protected.

## Open Questions

- None blocking. The lightbox look is settled by the approval step in D5.
