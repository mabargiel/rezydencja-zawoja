## 1. Content

- [x] 1.1 Choose the masters: the owner's retouched `IMG_8297` for desktop, `IMG_8296` for mobile
- [x] 1.2 Upload them as `photo` documents with PL, EN and DE alt text and hotspots
- [ ] 1.3 Reference them from `homePage.heroDesktop` and `heroMobile` (saved as a draft; needs publishing before merge)

## 2. Schema

- [x] 2.1 Add the two slots to `homePage`; remove `hero` and `videoSlot`
- [x] 2.2 Update the query and regenerate types

## 3. App

- [x] 3.1 Rewrite `HeroMedia` as a server component with `<picture>`; remove the video and unused motion tokens
- [x] 3.2 Place the photo beside the text on desktop and below it on phones, fading into a sky gradient; rework the scrim
- [x] 3.3 New hero copy and layout: eyebrow, headline, facts line, "Napisz do nas" and "Zadzwoń" buttons in PL, EN and DE
- [x] 3.4 Remove the booking bar and its copy
- [x] 3.5 Check layout and contrast at 375, 1440 and 1920px
- [x] 3.6 Check that a phone downloads only the mobile image, and compare LCP with `main`

## 4. Ship

- [x] 4.1 Run format:check, lint, lint:styles, knip, typecheck and build
- [ ] 4.2 Open a PR; confirm CI and the Vercel preview are green
- [ ] 4.3 After merge, redeploy the Studio and archive this change
