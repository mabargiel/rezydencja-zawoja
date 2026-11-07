## Context

The hero is 900px tall on desktop and 640px on mobile. On desktop the text sits in the centre; on mobile it's left-aligned, and the booking bar takes y 468–612, so only narrow strips of the photo stay uncovered.

## Decisions

### D1. New slots instead of reusing `hero.poster`
`heroDesktop` and `heroMobile` are new top-level `mediaSlot` fields. Both publish safely before the code ships, because the live site ignores unknown fields; merging the PR is the go-live moment. Winter variants come with `mediaSlot`.

### D2. Art direction with `<picture>`
`getImageProps` builds both source sets. `next/image` can't express art direction, and two `display: none` toggled images would download both. The `<img>` isn't lazy and has `fetchPriority="high"`, so it stays the LCP element. `<picture>` gets no automatic preload, so `preload()` from `react-dom` adds one per breakpoint, with `media` keeping each browser to one download.

Each breakpoint needs its own LQIP and hotspot: the placeholders are background layers toggled by breakpoint, and `object-position` comes from CSS variables. If one slot is empty, the other is used for both.

### D3. Legibility: a focus layer in the scrim, not a darker photo
A radial layer behind the text darkens the text zone and leaves the edges of the photo bright. Its strength is the lowest that clears the eyebrow target: at 65% the house lost its warm glow, so it's 45%. It's in the scrim, so it holds for any future photo, including a winter one.

### D4. Masters are graded outside the repo
Photos stay in Sanity. Masters are 3840×2400 and 1440×2361, sRGB JPEG, cropped to the slot shape. The Sanity CDN handles resizing and format.

## Risks

- Merging before `homePage` is published leaves the hero with no photo. Publish the draft first; it's additive, so it doesn't change the live site.
- Removing the fields shows an "unknown field" notice for `hero` in the Studio. It's harmless, and it keeps the video reference for later.
