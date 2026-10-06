## Why

The site is complete but static. Sections appear all at once, and the Home hero flashes on load: the poster photo jumps from blurred to sharp, then the video pops in on top with different framing as soon as its first frame decodes. Restrained motion would make the house feel calmer and more premium, which is the same mood the design aims for: content easing in as you scroll, a hero that settles in smoothly, and dialogs that open instead of appearing.

## What Changes

- **Smooth hero load (Home):**
  - the dark hero shows the poster's blurred placeholder;
  - the sharp poster fades in over it once it has loaded;
  - the video fades in over the poster only once it is actually playing, so it never pops in or flashes black;
  - the eyebrow, headline, intro and booking bar ease up in a short stagger.
- **Reveal on scroll:** section headings, text blocks, images, cards and table rows fade and rise slightly as they enter the viewport. Siblings are staggered, for example the feature cards, mosaic tiles and pricing rows. This uses CSS scroll-driven animations, so there's no JavaScript and no layout shift. Where a browser doesn't support them, content simply shows without the animation.
- **Page headers (subpages):** the header photo settles from a slight zoom, and the title block eases up, matching the Home hero.
- **Dialogs:** the mobile menu fades and slides in, and the lightbox fades in with the photo scaling up slightly. Both animate out when closed. Lightbox photos cross-fade when moving between them.
- **Small interactions:**
  - photo tiles that aren't zoomable yet get the subtle hover zoom used in the gallery (feature cards, the interiors teaser, the gallery preview);
  - primary and outline buttons nudge their arrow on hover, like the text links;
  - the gallery cross-fades when a filter changes.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, none of this runs. Content shows immediately, and dialogs open without movement. The hero video already stays off.
- **Motion tokens:** one easing curve and three durations in `globals.css`, so every animation feels like the same family.

## Capabilities

### New Capabilities
- `motion`: the site-wide motion rules: reveal on scroll, page-header entrance, dialog transitions, hover feedback, motion tokens, and the reduced-motion guarantee.

### Modified Capabilities
- `hero-video`: the "Poster first and LCP" requirement gains the fade-in sequence (placeholder, then poster, then video), and the video stays invisible until it plays.

## Impact

- **app/**:
  - `globals.css` gets the motion tokens, keyframes and the `reveal` utilities;
  - a small client `HeroMedia` component replaces `HeroVideo`, handling the poster load and video playing events;
  - the reveal classes are added to existing section components;
  - dialog styles in `MobileMenu` and `Lightbox`;
  - hover classes on `FeatureCard`, `InteriorsTeaser`, `GalleryPreview` and the buttons in `Actions.tsx`.
- **No new dependencies**, and no animation library.
- **Performance:** animations use only `opacity` and `transform`; the poster stays the priority LCP image; the scroll reveals run off the main thread where supported.
- **Out of scope:** page-to-page transitions (React's View Transitions are still experimental in Next 16), parallax, and animated counters.
