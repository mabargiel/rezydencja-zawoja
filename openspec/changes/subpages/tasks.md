## 1. CMS: room model

- [ ] 1.1 Change the `interiorsPage` schema to `header` + `rooms[]` (unique `type` from salon, bedrooms, bathrooms, kitchen, recreation, details; 1–8 ordered photo refs) + `bedrooms[]` (localized `name` and `beds`, `guests` 1–4, optional photo), with Polish titles and previews; remove the old fixed slots; validate and deploy the schema
- [ ] 1.2 Update `seed-map.ts` and `seed.ts`: six rooms in tour order with their library photos, and five placeholder bedrooms (4 with the bedroom photos, 1 without); re-run the seed and confirm it's idempotent

## 2. Data and copy

- [ ] 2.1 Add `interiorsPageQuery` (header, rooms with photos, localized bedrooms), `surroundingsPageQuery` and `galleryPageQuery` (photos with `category`); run `npm run typegen`
- [ ] 2.2 Add copy to `pl.ts`: Wnętrza room nav label and per-room `name`, `title`, `body`, `facts[]`, and bedroom labels; Okolica (`d5VfA`, `fZVdb`, `nGbvs`); Galeria filters (`LYvzh`) and lightbox labels. Draft `en.ts` and `de.ts`, and confirm `returnObjects` arrays are typed

## 3. Design (approval gate)

- [ ] 3.1 In pen.dev, design at 1440px and 390px:
  - the new Wnętrza body: top chip row, room section with mosaic variants (1, 2, 3+ photos), Sypialnie bedroom cards, desktop right-side room rail, mobile sticky chip row;
  - the Lightbox (dark, contained photo, close, prev/next, counter, caption).

  Reuse the tokens, fonts and icons, and screenshot everything for approval.
- [ ] 3.2 Get the user's approval, apply feedback, and copy the design into `design/`

## 4. Okolica

- [ ] 4.1 Move the three pages off `SubPage` so each renders `PageHeader` from its own query; confirm the headers are unchanged
- [ ] 4.2 `FeatureRow` (`fZVdb` / `a4wouB`), `SurroundingsIntro` (`d5VfA` / `c6QbYA`) and `KeyFacts` (`nGbvs` / `a8QVU`), with the 4 attraction rows using their CMS photos

## 5. Lightbox and Galeria

- [ ] 5.1 `Lightbox` from the approved design: `<dialog>` + `showModal()`, prev/next with wrap inside the given photo set, arrow keys, swipe, counter, caption, labelled controls, focus return, neighbour preload
- [ ] 5.2 `GalleryGrid`: chips (`LYvzh`) as `aria-pressed` buttons, CSS-columns masonry (4/2) with the design height cycle re-applied to the visible set, tiles as buttons opening the lightbox within the filter, and all photos in the server HTML

## 6. Wnętrza

- [ ] 6.1 `RoomSection` + mosaic per the approved design, with each photo opening the lightbox limited to that room
- [ ] 6.2 `BedroomCard`s in the Sypialnie section (row on desktop, horizontal scroll on mobile, neutral tile without a photo, translated guest icon label)
- [ ] 6.3 `RoomNav`:
  - a top chip row (anchor links, works without JavaScript);
  - a desktop right rail shown while the row is out of view and hidden after the rooms end;
  - a mobile sticky row below the navbar;
  - the active room (`aria-current="location"`) through `useSectionInView`;
  - `scroll-margin-top` on sections.

## 7. Verification

- [ ] 7.1 Compare all three pages at 1440px and 390px in PL, EN and DE with the approved and existing frames (iframe method, instant scrolling)
- [ ] 7.2 Wnętrza: room order follows the CMS; the rail appears and hides at the right moments; the active room follows scrolling; the mobile row sticks; links work without JavaScript. Gallery: all photos without JavaScript, filters, and lightbox keyboard, swipe, wrap and focus return
- [ ] 7.3 Run format:check, lint, lint:styles, typecheck, typegen freshness and build; scan for comments; open a PR from `feat/subpages` and confirm CI and the Vercel preview are green
- [ ] 7.4 Send the new EN/DE copy for review, and ask the owner for the real bedroom setup (name, beds and guests for each of the 5 bedrooms) and a photo for the fifth bedroom
