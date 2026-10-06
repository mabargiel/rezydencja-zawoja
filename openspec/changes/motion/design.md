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

### D2. Reveal on scroll: side slides with an IntersectionObserver
- **Directional utilities:**
  - `reveal-left` and `reveal-right` slide in from 64px to either side and fade in;
  - `reveal` rises 40px, for grids where a side doesn't make sense (gallery masonry, key facts);
  - `reveal-media` settles from `scale(1.06)`;
  - `reveal-delay-1` to `reveal-delay-3` stagger siblings by 120ms, 240ms and 360ms, with a `revealDelay(index)` helper for mapped lists.
- **Direction per section:** headings come from the left; text beside a photo comes from the opposite side to the photo; alternating Okolica rows mirror; the room mosaic and bedroom cards come from the right; photo frames slide as a whole, so the image isn't clipped inside its box.
- **Mechanism:** a `RevealObserver` client component in the layout.
  - Content is hidden only under `html[data-reveal-ready]`, which the observer sets after marking everything already on screen as shown. Without JavaScript, nothing is ever hidden, and visible content never disappears.
  - Elements are marked with a `data-revealed` attribute, not a class, so React re-renders can't strip it.
  - A `MutationObserver` picks up content added later (gallery tiles after a filter change, streamed content, client-side navigation).
- **Mobile:** `overflow-x: clip` on `html` and `body` stops elements waiting off to the side from creating horizontal scroll, without breaking `position: sticky`.
- *Why not CSS scroll-driven animations (the first attempt)?* Firefox doesn't run them, and the owner tests in Firefox. In Chrome they finished within the first ~50px of scrolling, too subtle to notice.
- Reduced motion: the observer doesn't start, and the hidden-state rules sit behind `prefers-reduced-motion: no-preference`.

### D3. Smooth photo loading: blur-up on every image
- Every `SanityImage` keeps Next.js's blurred LQIP placeholder and gets `data-blur-up`.
- A tiny inline script in `<head>` (`lib/blurUpScript.ts`) runs before any image is parsed. It sets `html[data-blur-up-ready]` and listens, in the capture phase, for each image's `load` (or `error`), marking the image `data-loaded`.
- CSS keeps a photo at `blur(14px) scale(1.06)` until it's marked loaded, then transitions to sharp over 700ms. The placeholder and the arriving photo blend into each other, with no swap or flash. That was the cause of the hero and Location flashes.
- The transition doesn't wait for hydration, and the image is never hidden, so Chrome's LCP counts exactly what it did before. Two rejected variants are recorded here. An opacity fade from 0 removed the images from LCP and made mobile LCP up to 2s worse. A separate placeholder layer was ignored by LCP as too low-detail at full size.
- Without JavaScript, the attribute is never set and photos behave as before.
- **Hero video** (`HeroMedia`): it stays invisible until the `playing` event, then fades in over `--duration-cinematic` (2.8s).
- Hero text and booking bar: a one-time `animate-rise` with staggered delays, disabled under reduced motion.

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
