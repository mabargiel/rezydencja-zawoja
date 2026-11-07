## Why

The owner has decided to drop the hero video for now. A still photo also suits the page better: it loads faster and can be composed for the text and booking bar on top of it, which a video can't. One photo can't serve both shapes, though: the desktop hero is wide, the mobile hero is tall, and on a phone the text and booking bar cover most of the frame.

## What Changes

- **BREAKING (content model):** remove the video from the Home hero and from the Studio. The `hero` field and the `videoSlot` type go; the data and the uploaded video stay in the dataset, so it can come back.
- Add two seasonal image slots, `heroDesktop` and `heroMobile`, and serve them through `<picture>`, so a phone downloads only the mobile image.
- Strengthen the hero scrim behind the text: it's thinnest exactly where the eyebrow sits, and a bright sky needs more than the video did.
- Use two graded crops of the owner's "dom wieczorem" photo as the content.

## Capabilities

### New Capabilities

- `hero-photo`: the Home hero's art-directed photo, its load behaviour and text legibility.

### Modified Capabilities

- `hero-video`: all requirements removed; replaced by `hero-photo`.
- `seasonal-media`: the hero video slot no longer exists.
- `page-media`: `homePage` holds `heroDesktop` and `heroMobile` instead of `hero`.

## Impact

- `app/src/components/home/Hero.tsx`, `HeroMedia.tsx`, `SanityImage.tsx`, `app/src/sanity/queries.ts`, `types.ts`, `[lng]/page.tsx`, `globals.css`.
- `cms/schemaTypes/singletons/homePage.ts`; `objects/videoSlot.ts` removed. The Studio needs redeploying after merge.
- Content: two new `photo` documents, referenced from the new `homePage` fields. They're additive, so the live site doesn't change until this is merged.
