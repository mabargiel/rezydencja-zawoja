## Context

- Home is currently a `PageHeader` stub. The shell (Navbar, Footer, tokens, i18n), the CMS model (`homePage` slots, `videoSlot`, `pricing`) and the seeded content already exist.
- The design has 8 sections before the footer. Desktop is `iq1tP` (1440): hero 900 tall, then intro, SPA, interiors teaser, location panorama, gallery, pricing and CTA. Mobile is `YCfBW` (390), with the same order and stacked layouts.
- The design's reusable components: Feature Card `p9n20A`, Amenity Row `O7P7qP`/`Ofbwp`, Pricing Table `m4W0t2`, Booking Bar `MB8Pv`, plus the Section Heading and Buttons that are already built.
- Every icon is Lucide: calendar, user, arrow-right, gem, waves, flame, droplets, circle-dot, dumbbell, binoculars, cooking-pot, clock-4, shield-check, paw-print, wifi, phone and mail.

## Goals / Non-Goals

**Goals:**
- Home matches the design at 390px and 1440px, and holds up in between.
- All copy is translated; all photos, the video and the prices come from the CMS and follow the season.
- The page stays static, is served from the CDN, and updates live through `defineLive` when content changes.
- The hero's poster is the LCP image, so the page is fast before the video starts.

**Non-Goals:**
- The contact form (the booking bar only hands off to it).
- Availability checks or a calendar.
- Animations beyond hover states and the video.

## Decisions

### D1. One reusable season-aware projection
```groq
const resolvedSlot = `"photo": select(${isWinter} && defined(winterPhoto) => winterPhoto->, photo->)${photo}`
*[_id == "homePage"][0]{
  intro{ house{ ${resolvedSlot} }, detail{ ${resolvedSlot} } }, …
}
```
Inside a slot's own projection, `photo` and `winterPhoto` refer to that slot, so one constant string serves every slot. TypeGen resolves `const` template interpolation but not function calls, which is why this is a string and not a helper function. `pageHeaderQuery` moves to `header{ ${resolvedSlot} }` for consistency.

### D2. A single `homePageQuery`
It fetches the Home slots, `hero` (video URL for the season, plus the poster slot), `galleryPreview[]->` photos, and `*[_id == "pricing"][0]` with localized fields, all in one request. It uses `$lng` and falls back to `pl`. Sections receive typed slices of the result as props. There's one `sanityFetch` per page, which keeps `defineLive` tagging simple.

### D3. Hero video
- A `<video autoPlay muted loop playsInline preload="metadata" poster={posterUrl}>` with the CMS file URL. The poster is also rendered as a priority `SanityImage` underneath, so the LCP isn't the video.
- A tiny Client Component (`HeroVideo`) checks `prefers-reduced-motion`. If it's set, the video element isn't rendered and the priority poster stays visible.
- The winter video is used when the season is winter and one exists. That's resolved in GROQ like photos.
- *Alternative: stream from Mux or a video CDN.* Overkill for one short clip. The Sanity file CDN is fine at this traffic.

### D4. The booking bar is a GET form
```html
<form action="/{lng}/contact" method="get">
  <input type="date" name="arrival" min={today}> <input type="date" name="departure">
  <select name="guests">1–10</select> <button>Sprawdź termin</button>
</form>
```
- Native inputs are accessible, work on mobile with the OS date picker, and need no JavaScript or date library.
- The styling follows `MB8Pv`: a white bar, a calendar icon per field, uppercase labels in Jost 11, values in Jost 15, and the primary button.
- A small client enhancement sets `departure.min` from the chosen arrival. Without JavaScript, the form still submits.
- *Alternative: a custom date-range picker.* It adds a dependency and accessibility work for no gain at this stage.

### D5. Pricing rendered from the CMS; units and money through i18next and `Intl`
- `pricing.unit.night|stay|week|weekend` is `zł / doba`, `/ night`, `/ Nacht` and so on.
- Amounts use `Intl.NumberFormat(lng, { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 })`. That gives "1 500 zł" in `pl`, "PLN 1,500" in `en` and "1.500 zł" in `de`. The design's Polish copy shows "1500 zł / doba", and the tiny difference is accepted for correct localization.
- A rate's price shows the unit only when it's per night (`night`), matching the design's "8000 zł" for a week. The surcharge always shows its unit.
- The table header, note and booking box come from i18next; the year comes from the CMS.
- Desktop (`lg+`) uses a semantic `<table>` from `V6BKq`. Mobile uses one card per rate (`LuDLV`) with the same data.

### D6. Section components
`src/components/home/`: `Hero`, `BookingBar`, `Intro`, `Spa`, `InteriorsTeaser`, `Location`, `GalleryPreview`, `Pricing`, `BookingCta`. Plus shared `FeatureCard` (`p9n20A`) and `AmenityRow` (`O7P7qP` light, `Ofbwp` dark) in `src/components/`. Every component is a Server Component except `HeroVideo` and the booking bar's date-min enhancement.

### D7. Links
- "Poznaj dom" and "Zobacz wnętrza" go to `/{lng}/interiors`, and "Pełna galeria" to `/{lng}/gallery`.
- "Sprawdź terminy" and "Napisz do nas" go to `/{lng}/contact`. The contact change can later give them `#form` and `?intent=` variations.
- The pricing section has `id="pricing"`, which the nav's Cennik link targets. Scroll offset is handled with `scroll-margin-top`.

## Risks / Trade-offs

- [Autoplaying video costs data on mobile] → `preload="metadata"`, the poster shows first, and the clip is short. If needed later, a smaller mobile rendition can be added as a `<source media>`.
- [`Intl` currency formatting differs slightly from the design's "1500 zł"] → Accepted. It's correct for each language, and Polish differs only by the thousands separator.
- [Date inputs look different across browsers] → Only the wrapper is styled, following the design. The OS picker is kept for accessibility.
- [The design's placeholder values ("12 gru 2026") aren't real defaults] → The fields start empty with translated placeholders. Arrival can't be in the past.

## Migration Plan

1. Add the queries and catalog keys, then build the sections one by one against the design.
2. Replace the Home stub.
3. Verify, open a PR, and merge. The Vercel deploy and live updates follow automatically.

## Open Questions

- Should "Sprawdź terminy" and "Napisz do nas" lead to different places (for example a booking platform)? For now both go to Contact.
