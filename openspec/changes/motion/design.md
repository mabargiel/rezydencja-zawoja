## Context

- **Hero** (`components/home/Hero.tsx`):
  - the poster renders as `SanityImage priority` with an LQIP blur placeholder;
  - `HeroVideo` (a client component) renders the `<video>` only after hydration, and only without reduced motion;
  - the video has no fade, so the visible sequence is: dark, blurred, sharp poster (an abrupt swap), then the video's first frame (another abrupt swap, often with different framing).
- **Sections** are Server Components: `Intro`, `Spa`, `InteriorsTeaser`, `Pricing`, `Location`, `GalleryPreview`, `BookingCta`, `FeatureRow`, `RoomSection`, `KeyFacts`, `SurroundingsIntro`, the contact card, form and directions, and the legal text.
- **Dialogs**: `MobileMenu` and `Lightbox` use native `<dialog>` with `showModal()`.
- **Existing motion**: the navbar background transition, hover zoom on gallery and room tiles, the text-link arrow nudge, and the room nav's fade.

## Goals / Non-Goals

**Goals:**
- No visible flash in the hero on any connection speed.
- A consistent, restrained motion language: short distances, a single easing curve, and nothing that delays reading.
- Server Components stay server-only. Reveals need no client JavaScript.
- With `prefers-reduced-motion: reduce`, nothing moves.

**Non-Goals:**
- Page transitions, parallax, scroll-jacking, or animated numbers.
- Animating anything users must wait for (the form, errors, navigation).

## Decisions

### D1. Motion tokens
In `@theme`:
- `--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)`;
- `--duration-fast: 200ms` (hover), `--duration-base: 450ms` (dialogs, fades), `--duration-slow: 900ms` (hero media, reveals).

Every new transition uses these through Tailwind (`ease-out-soft`, `duration-base`), so motion is tuned in one place.

### D2. Reveal on scroll with CSS scroll-driven animations
- Utilities in `globals.css`:
  - `reveal`: fade from 0 and rise 24px;
  - `reveal-media`: fade and settle from `scale(1.04)`, for images inside an `overflow-hidden` frame.
- Each is driven by `animation-timeline: view()` with `animation-fill-mode: both`, and a range in **pixels**: `entry 0 → entry 160px` for `reveal`, `entry 0 → entry 220px` for `reveal-media`. Percentage ranges scale with element height, which would leave tall blocks that are partly on screen at load (like the legal text) half-transparent until scrolled. A fixed distance means anything already at least 160px into the viewport renders in its final state.
- Both are wrapped in `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`. In any other browser, or with reduced motion, the classes do nothing, and the content is simply visible.
- **Stagger**: siblings shift their range by 40px, 80px or 120px through `reveal-delay-1` to `reveal-delay-3` (`--reveal-shift`), with a `revealDelay(index)` helper for mapped lists.
- Content already in view at load is past its entry range, so it renders in its final state with no flash.
- Applied to the text column and media of each section: headings (through `SectionHeading`), feature cards, room text and mosaics, bedroom cards, the pricing table (as a whole, since table rows don't take transforms reliably), mobile pricing rows, gallery tiles, key facts, and the directions caption and map. Not applied to the hero, the navbar, the footer, the contact card and form (on screen at load, and interactive) or the legal text (long reading content).
- *Alternative: an IntersectionObserver `Reveal` client wrapper.* It works in every browser, including Firefox, where scroll-driven animations aren't reliably available yet. But it wraps server content in client components, needs hydration before anything appears, and risks content staying hidden if JavaScript fails. The CSS route degrades to visible content. If Firefox reveals turn out to matter, a tiny observer fallback can add a class later.

### D3. Hero media sequence (a `HeroMedia` client component)
- `Hero` stays a Server Component and renders `<HeroMedia poster={poster} videoUrl={videoUrl} />` in place of the image and `HeroVideo`.
- **Layers, from the bottom up:**
  1. the hero's `bg-bg-dark`;
  2. the LQIP as a blurred, slightly scaled background on the media frame, visible immediately from the server HTML;
  3. the poster `SanityImage priority`, which starts at `opacity-0` and fades in over `duration-slow` when `onLoad` fires (`next/image` reports cached images too);
  4. the `<video>` (`preload="metadata"`), which starts at `opacity-0` and fades in on the `playing` event, so a video that never plays never shows.
- Reduced motion keeps the current behaviour: no video. The poster then appears without a fade, since `motion-reduce:transition-none` applies.
- The text block and booking bar use a one-time CSS entrance (`animate-rise` with staggered delays, 100–400ms), also disabled under reduced motion.
- **LCP**: the poster is still the priority image and is in the server HTML. The opacity fade doesn't change when it's painted for LCP purposes, because the element is rendered and decoded either way. This gets verified with a Lighthouse run before and after.

### D4. Page header entrance
`PageHeader` uses the same idea without JavaScript: the photo plays a one-time `animate-settle` (from `scale(1.06)` to `1`), and the title block an `animate-rise`. Because the photo already has a blur placeholder, a CSS-only settle is enough here; there's no video to sequence.

### D5. Dialog transitions with `@starting-style`
- Both dialogs animate `opacity` and `transform` on `[open]`, with `@starting-style` for the entry and `transition-behavior: allow-discrete` on `display` and `overlay` for the exit.
  - **The mobile menu** slides from 16px to the right.
  - **The lightbox** scales from 0.98.
- Lightbox photos cross-fade: the non-current preloaded images use `opacity-0` and a transition, instead of `invisible`.
- Where `@starting-style` isn't supported, dialogs simply appear, as they do today.

### D6. Hover feedback
- Hover zoom stays on photos that open something (the gallery, room mosaics and bedroom cards). It is *not* added to `FeatureCard`, `InteriorsTeaser` or `GalleryPreview`: those photos aren't clickable, and a zoom would suggest they are, which conflicts with the spec's "tiles that link or open the lightbox".
- `ButtonPrimary` gets the same arrow nudge as `TextLink` (`ButtonOutline` has no arrow), and both use the motion tokens and `motion-reduce:transition-none`.
- All hover effects are `motion-safe:` only.

### D7. Gallery filter cross-fade
Changing the filter re-keys the grid, so the visible tiles play a short fade (`animate-fade`, `duration-base`). No layout animation, because the masonry re-flows instantly.

## Risks / Trade-offs

- [Firefox users see no scroll reveals] → The content is fully visible, so nothing is lost. A small observer fallback can be added later if needed (D2).
- [Overdoing motion] → Distances stay at 24px or less and durations at 900ms or less. The hero text and media are the only things that animate on load.
- [Scroll-driven animations on long pages could cost frames] → They run on the compositor in supporting browsers, use only opacity and transform, and are checked with a performance profile on the gallery.
- [The `onLoad` fade could hide the poster if the event never fires] → `next/image` fires `onLoad` for cached images, and the LQIP background stays visible underneath, so the worst case is the blurred placeholder, never a black hero.

## Migration Plan

Do `code-cleanup` first, then this change on a fresh branch. Verify with Lighthouse (LCP and CLS unchanged), in Chrome and Safari, and with reduced motion. Rollback is reverting the PR.
