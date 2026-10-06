## 1. Foundations

- [ ] 1.1 Motion tokens in `globals.css` (easing and durations), plus the `rise`, `settle` and `fade` keyframes and `animate-*` utilities, all disabled under reduced motion
- [ ] 1.2 The `reveal`, `reveal-media` and `reveal-delay-*` utilities with `@supports (animation-timeline: view())` and reduced-motion guards
- [ ] 1.3 Record a Lighthouse baseline for `/pl` and `/pl/gallery` (LCP, CLS)

## 2. Hero and headers

- [ ] 2.1 `HeroMedia` client component: the LQIP background, the poster fading in on `onLoad`, and the video fading in on `playing`; remove `HeroVideo`
- [ ] 2.2 Hero text and booking bar entrance (`animate-rise`, staggered)
- [ ] 2.3 `PageHeader` entrance: the photo `animate-settle` and the title block `animate-rise`

## 3. Reveals

- [ ] 3.1 Home: Intro, Spa, InteriorsTeaser, Pricing (staggered rows), Location, GalleryPreview, BookingCta, and the `SectionHeading` reveal
- [ ] 3.2 Subpages: FeatureRow, SurroundingsIntro, KeyFacts, RoomSection (text, mosaic tiles, bedroom cards), and GalleryGrid tiles
- [ ] 3.3 Kontakt and legal: the contact card, the form column, Directions, and legal text blocks

## 4. Dialogs and interactions

- [ ] 4.1 MobileMenu: fade and slide in and out with `@starting-style`
- [ ] 4.2 Lightbox: fade and scale in and out; photo cross-fade instead of `invisible`
- [ ] 4.3 Hover zoom on FeatureCard, InteriorsTeaser and GalleryPreview tiles; arrow nudge on `ButtonPrimary` and `ButtonOutline`
- [ ] 4.4 Gallery filter cross-fade

## 5. Verification

- [ ] 5.1 Chrome and Safari: reveals, hero sequence on a throttled connection (no flash), dialogs, hovers; Firefox (or an unsupported browser) shows all content
- [ ] 5.2 Reduced motion: nothing moves, all content visible, no video
- [ ] 5.3 Lighthouse after: LCP and CLS not worse than the baseline; poster still the LCP element
- [ ] 5.4 Run format:check, lint, lint:styles, typecheck and build; scan for comments; open a PR; confirm CI and the Vercel preview are green
