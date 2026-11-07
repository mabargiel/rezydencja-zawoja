## 1. Content

- [x] 1.1 Choose, crop and grade the desktop and mobile masters
- [x] 1.2 Upload them as `photo` documents with PL, EN and DE alt text and hotspots
- [ ] 1.3 Reference them from `homePage.heroDesktop` and `heroMobile` (saved as a draft; needs publishing before merge)

## 2. Schema

- [x] 2.1 Add the two slots to `homePage`; remove `hero` and `videoSlot`
- [x] 2.2 Update the query and regenerate types

## 3. App

- [x] 3.1 Rewrite `HeroMedia` as a server component with `<picture>`; remove the video and unused motion tokens
- [x] 3.2 Add the focus layer to the hero scrim
- [x] 3.3 Check contrast at 390, 1440, 1920 and 2560px
- [x] 3.4 Check that a phone downloads only the mobile image, and compare LCP with `main`

## 4. Ship

- [x] 4.1 Run format:check, lint, lint:styles, knip, typecheck and build
- [ ] 4.2 Open a PR; confirm CI and the Vercel preview are green
- [ ] 4.3 After merge, redeploy the Studio and archive this change
