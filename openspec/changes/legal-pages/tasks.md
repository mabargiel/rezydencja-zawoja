## 1. Design (approval gate)

- [x] 1.1 In pen.dev, design the legal page at 1440px and 390px: a compact header without a photo (eyebrow, title, last updated), the text column with H2, H3, paragraph, list and link styles, and the binding-language note. Add the legal links to the footer frames if needed. Screenshot everything for approval
- [x] 1.2 Get the user's approval, apply feedback, and copy the design into `design/`

## 2. CMS

- [x] 2.1 The `legalPage` schema: read-only slug, localized title, `updatedAt`, and `body.{pl,en,de}` Portable Text with the allowed styles. Pin both documents in the structure and disable delete and duplicate. Validate and deploy the schema
- [x] 2.2 Draft the content: rewrite the privacy policy for the new site (D4), carry over the rental terms (D5), and translate both to EN and DE. Resolve the open questions with the owner first
- [x] 2.3 Seed both documents with compact block helpers; confirm the seed is idempotent

## 3. App

- [x] 3.1 `legalPageQuery` (title, `updatedAt`, body in `$lng` with PL fallback, and whether it fell back); run typegen
- [x] 3.2 A `LegalPage` component and the two routes with `generateMetadata`; Portable Text components styled per the design; the binding-language note on EN/DE and on fallback
- [x] 3.3 Catalog keys: page titles, metadata, eyebrow, "last updated", the binding-language note, and footer link labels in PL/EN/DE
- [x] 3.4 Footer legal links next to the copyright, desktop and mobile
- [x] 3.5 The consent label links to the privacy policy (new tab, the click doesn't toggle the checkbox)

## 4. Verification

- [x] 4.1 Compare both pages with the approved design at 1440px and 390px in PL, EN and DE
- [x] 4.2 Check that cookies match the policy (only `lng`), the footer links work on every page, the consent link works, and a Studio edit shows up after publishing
- [ ] 4.3 Run format:check, lint, lint:styles, typecheck, typegen freshness, `sanity schema validate` and build; scan for comments; open a PR; confirm CI and the Vercel preview are green
- [ ] 4.4 Send the privacy policy and the EN/DE texts to the owner for review
