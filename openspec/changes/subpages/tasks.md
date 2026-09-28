## 1. Data and copy

- [ ] 1.1 Add `interiorsPageQuery`, `surroundingsPageQuery` and `galleryPageQuery` (header plus body slots through `resolvedSlot`; gallery photos with `category`); run `npm run typegen`
- [ ] 1.2 Add body copy to `pl.ts` from the design (Wnętrza `zQWfy`, `R7tmq7`, `X8zj38`; Okolica `d5VfA`, `fZVdb`, `nGbvs`; Galeria `LYvzh` plus lightbox labels) with bullets as arrays; draft `en.ts` and `de.ts`; confirm `t(…, { returnObjects: true })` types the bullets

## 2. Shared pieces

- [ ] 2.1 `FeatureRow` from the design's feature row (photo 600×460, gap 80, eyebrow, Cormorant 40 title, body 16/1.65, `minus` bullets; `reverse` prop; mobile photo-first per `P8SWn` / `a4wouB`)
- [ ] 2.2 Move each of the three pages off `SubPage` to render `PageHeader` from its own query; confirm the headers are unchanged

## 3. Wnętrza

- [ ] 3.1 4 feature rows in `zQWfy` order with alternating sides and CMS photos (comfort row without bullets)
- [ ] 3.2 `RelaxationBand` (`R7tmq7` / `la8hF`): dark band, text, 2 photos
- [ ] 3.3 `DetailsRow` (`X8zj38` / `I0Ck5D`): heading plus 4 photos (a row on desktop, 2×2 on mobile)

## 4. Okolica

- [ ] 4.1 `SurroundingsIntro` (`d5VfA` / `c6QbYA`): heading at left, lead and body at right
- [ ] 4.2 4 attraction feature rows (`fZVdb` / `a4wouB`) with CMS photos
- [ ] 4.3 `KeyFacts` (`nGbvs` / `a8QVU`): dark band with 4 figures, rules on desktop, 2×2 on mobile

## 5. Galeria

- [ ] 5.1 Design the Lightbox (desktop 1440 and mobile 390 frames) in pen.dev with the existing tokens and icons; screenshot for approval
- [ ] 5.2 Get the user's approval, apply feedback, and copy the design into `design/`
- [ ] 5.3 `GalleryGrid` client component: chips (`LYvzh`) as `aria-pressed` buttons, CSS-columns masonry (4/2) with the design height cycle re-applied to the visible set, and every photo in the server HTML
- [ ] 5.4 `Lightbox` from the approved design: `<dialog>` + `showModal()`, prev/next with wrap inside the current filter, arrow keys, swipe, counter, caption, labelled controls, focus return, and neighbour preload

## 6. Verification

- [ ] 6.1 Compare all three pages at 1440px and 390px in PL, EN and DE with their desktop and mobile frames (use the iframe method; hidden tabs don't animate)
- [ ] 6.2 Gallery: all photos without JavaScript; each filter shows only its category; lightbox keyboard, swipe, wrap-within-filter and focus return
- [ ] 6.3 Run format:check, lint, lint:styles, typecheck, typegen freshness and build; scan for comments; open a PR from `feat/subpages` and confirm CI and the Vercel preview are green
- [ ] 6.4 Send the new EN/DE body copy to the user for review
