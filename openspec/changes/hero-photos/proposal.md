## Why

The owner has dropped the hero video for now, and has reworked the hero: her retouched blue-hour photo of the house, with the copy on the left over the sky. Marketing feedback asks for the next step to be a conversation, so the hero leads with "Napisz do nas" and "Zadzwoń" instead of a date picker. A still photo also loads faster than the video and can be composed around the text.

## What Changes

- **BREAKING (content model):** remove the video from the Home hero and from the Studio. The `hero` field and the `videoSlot` type go; the data and the uploaded video stay in the dataset, so it can come back.
- Add two seasonal image slots, `heroDesktop` and `heroMobile`, and serve them through `<picture>`, so a phone downloads only the mobile image.
- New hero layout: left-aligned eyebrow, headline "Dom Premium & SPA na wyłączność", a facts line (300 m² · 5 sypialni · do 10 osób), and two buttons, "Napisz do nas" (contact form) and "Zadzwoń" (phone). Site fonts, colours and buttons stay.
- The photo sits beside the text on desktop and below it on phones, fading into a sky-coloured background, so the text sits on sky and the whole house stays visible.
- **BREAKING (UI):** remove the booking bar from the hero. The contact form keeps its prefill from query parameters.
- Content: the owner's retouched `IMG_8297` for desktop, `IMG_8296` (same evening, portrait) for mobile.

## Capabilities

### New Capabilities

- `hero-photo`: the Home hero's art-directed photo, layout, calls to action, load behaviour and text legibility.

### Modified Capabilities

- `hero-video`: all requirements removed; replaced by `hero-photo`.
- `booking-bar`: all requirements removed.
- `home-page`: the hero no longer contains the booking bar.
- `contact-form`: the prefill is described by its query parameters, not by the booking bar.
- `seasonal-media`: the hero video slot no longer exists.
- `page-media`: `homePage` holds `heroDesktop` and `heroMobile` instead of `hero`.

## Impact

- `app/src/components/home/Hero.tsx`, `HeroMedia.tsx`, `SanityImage.tsx`, `BookingBar.tsx` (removed), `app/src/sanity/queries.ts`, `types.ts`, `[lng]/page.tsx`, `globals.css`, the three message catalogs.
- `cms/schemaTypes/singletons/homePage.ts`; `objects/videoSlot.ts` removed. The Studio needs redeploying after merge.
- Content: two `photo` documents, referenced from the new `homePage` fields. They're additive, so the live site doesn't change until this is merged.
