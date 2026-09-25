## 1. Data and copy

- [ ] 1.1 Add the reusable `resolvedSlot` projection to `queries.ts`, move `pageHeaderQuery` to `header{ ${resolvedSlot} }`, and add `homePageQuery` (Home slots, season-aware hero video + poster, `galleryPreview[]->`, and localized `pricing`); run `npm run typegen`
- [ ] 1.2 Add `home.*` copy to `pl.ts` from the design (hero `qCVqV`, booking bar `MB8Pv`, intro `lugt7`, spa `D7Ndy`, interiors `oq9of`, location `n6ePs`, gallery `FooZ3`, pricing `TIplG`, CTA `Pg9ok`) and `pricing.unit.*`; draft `en.ts` and `de.ts`
- [ ] 1.3 Add a `formatPrice(amount, lng)` helper in `src/lib/` with `Intl.NumberFormat` PLN and no decimals

## 2. Shared components

- [ ] 2.1 `FeatureCard` from `p9n20A` (photo, icon, title, description) and `AmenityRow` from `O7P7qP`/`Ofbwp` (icon + label, light and dark), checked against Pencil screenshots
- [ ] 2.2 Refactor `SubPage` to use the new header projection, with no visual change (confirm on `/pl/interiors`)

## 3. Hero

- [ ] 3.1 `Hero` (`ZGmha` / `v0lRvj`): priority poster `SanityImage`, the design gradient, and the eyebrow, headline and subhead; 900px desktop, 640px mobile
- [ ] 3.2 `HeroVideo` client component: autoplay, muted, loop, `playsInline`, `preload="metadata"`; not rendered with `prefers-reduced-motion: reduce`
- [ ] 3.3 `BookingBar` (`MB8Pv` / `UedD7`): a GET form to `/{lng}/contact` with date inputs (arrival `min` = today), guests 1–10, labelled fields with calendar/user icons, `ButtonPrimary`-styled submit, and a client enhancement that sets `departure.min`

## 4. Content sections

- [ ] 4.1 `Intro` (`lugt7` / `LrWJZ`): light `SectionHeading`, lead, body, two photos, and a `TextLink` to interiors
- [ ] 4.2 `Spa` (`D7Ndy` / `IlApa`): dark heading and body, 3 `FeatureCard`s, and 6 dark `AmenityRow`s
- [ ] 4.3 `InteriorsTeaser` (`oq9of` / `GWaMh`): photo, heading, body, two features, and a link
- [ ] 4.4 `Location` (`n6ePs` / `V8yiy`): full-bleed photo with scrim, heading, body and 5 facts; check text contrast
- [ ] 4.5 `GalleryPreview` (`FooZ3` / `AnXIe`): the 4 CMS photos at the design's staggered heights (440/340/460/360, mobile 2×2) and "Pełna galeria"

## 5. Pricing and CTA

- [ ] 5.1 `Pricing` (`TIplG` / `v9Skvt`, `id="pricing"`, `scroll-margin-top`): header with the CMS year, note, a desktop `<table>` (`V6BKq`), mobile cards (`LuDLV`), the add-on row, 4 facts with icons (`x7OXTH` / `zDT5G`), and the booking box (`DuPmo` / `wGEF3`)
- [ ] 5.2 `BookingCta` (`Pg9ok` / `ocumh`): heading, body, primary and outline-on-light buttons, and phone/email links
- [ ] 5.3 Replace `[lng]/page.tsx` with the sections in design order, using one `sanityFetch(homePageQuery)`

## 6. Verification

- [ ] 6.1 Compare each section at 1440px and 390px in PL, EN and DE with the Pencil screenshots of its desktop and mobile frames, and fix drift
- [ ] 6.2 Hero: poster is the LCP, the video autoplays muted, and with reduced motion there's no video; check the booking bar submit URL with and without JavaScript
- [ ] 6.3 Pricing: seeded values and units in all 3 languages; the table semantics; the Cennik nav link from a subpage lands on `#pricing` below the navbar
- [ ] 6.4 Run format:check, lint, lint:styles, typecheck, typegen freshness and build; scan for comments; open a PR and confirm CI and the Vercel preview are green
- [ ] 6.5 Send the new EN/DE copy to the user for review
