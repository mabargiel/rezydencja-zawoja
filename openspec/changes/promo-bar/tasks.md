## 1. Studio

- [x] 1.1 Add the `promoBar` singleton with the message list, Polish labels and validation
- [x] 1.2 List it after Sezon and register it as a singleton
- [x] 1.3 Validate the schema; seed the old site's three messages (PL, EN, DE)

## 2. App

- [x] 2.1 Query the bar and regenerate types
- [x] 2.2 `lib/promo.ts`: pick the current message, dismissal storage
- [x] 2.3 `PromoBar` client component inside the navbar's fixed container, with `--promo-height`
- [x] 2.4 Offset the hero, the sticky room nav and anchor scroll targets by `--promo-height`
- [x] 2.5 Translations for the close and action labels

## 3. Verify and ship

- [x] 3.1 Check at 375 and 1440px: no overlap, close persists, phases switch by date, off hides it
- [x] 3.2 Run format:check, lint, lint:styles, knip, typecheck and build
- [ ] 3.3 Open a PR; after merge, redeploy the Studio
