## Context

The hero fills the viewport (at least 640px on phones, 720px on desktop). The owner's photo is 4:3 and the house fills nearly its whole width, so full-bleed on a 16:10 screen the text would sit over the eaves and the roof would be cropped.

## Decisions

### D1. New slots instead of reusing `hero.poster`
`heroDesktop` and `heroMobile` are new top-level `mediaSlot` fields. Both publish safely before the code ships, because the live site ignores unknown fields; merging the PR is the go-live moment. Winter variants come with `mediaSlot`.

### D2. Art direction with `<picture>`
`getImageProps` builds both source sets. `next/image` can't express art direction, and two `display: none` toggled images would download both. The `<img>` isn't lazy and has `fetchPriority="high"`, so it stays the LCP element. `<picture>` gets no automatic preload, so `preload()` from `react-dom` adds one per breakpoint, with `media` keeping each browser to one download.

Each breakpoint needs its own LQIP and hotspot: the placeholders are background layers toggled by breakpoint, and `object-position` comes from CSS variables. If one slot is empty, the other is used for both.

### D3. Legibility: the photo fades into sky, the text sits on the sky
On desktop the photo starts 18% from the left and its left edge fades out through a mask into a gradient in the photo's own sky colours. On phones it fills the lower 62% and fades out upward. The text sits on that sky, and the whole house stays in frame at 16:10, 16:9 and on phones. A dark scrim on the text side, and a band behind the nav, keep contrast without darkening the house. This replaced an earlier full-bleed layout with a radial focus layer, which made bright photos either too dark or too busy behind the text.

### D5. Conversation instead of a date picker
Marketing found that returning visitors stall before getting in touch, so the hero offers "Napisz do nas" (contact form) and "Zadzwoń" (phone) instead of the booking bar. On phones the call button shows only its label, so both fit; the number shows from `lg` up.

### D4. Masters are graded outside the repo
Photos stay in Sanity. Masters are the owner's retouched 4032×3024 desktop photo and a 3024×4032 mobile photo, sRGB JPEG. The Sanity CDN handles resizing and format.

## Risks

- Merging before `homePage` is published leaves the hero with no photo. Publish the draft first; it's additive, so it doesn't change the live site.
- Removing the fields shows an "unknown field" notice for `hero` in the Studio. It's harmless, and it keeps the video reference for later.
