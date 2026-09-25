## 1. Clean slate

- [x] 1.1 Delete `app/src/components/*`, `app/src/app/gallery`, `app/src/app/page.tsx`, `app/src/app/layout.tsx`, `app/src/lib/queries.ts`, `app/src/lib/schemas.ts` and everything in `app/public`; keep `lib/env.ts` and `lib/sanity.ts`
- [x] 1.2 Delete `cms/schemaTypes/hero.ts` and `photoGallery.ts`, export an empty `schemaTypes` list, and confirm `npx sanity schema validate` and `npm run build -w cms` pass
- [x] 1.3 Delete the Sanity documents `hero` and `photoGallery` and their 3 assets from `oavmm529/production`; confirm the dataset has no documents left
- [x] 1.4 Uninstall `framer-motion`; upgrade every dependency to its latest version apart from the exceptions (ESLint 9, TypeScript 6.0, `@types/node` 24); refresh `allowScripts`; confirm `npm outdated --workspaces` lists only the exceptions

## 2. i18n foundation

- [x] 2.1 Install `i18next`, `negotiator`, `@types/negotiator` and `@formatjs/intl-localematcher`; add `src/i18n/config.ts` (`languages`, `defaultLanguage`, `isLanguage` guard)
- [x] 2.2 Add `src/i18n/messages/pl.ts` with all shell copy taken from the design: nav (`uR0N6`), CTA, footer (`vgRjs`), the Page Header copy for interiors (`q2jEWP`), gallery (`I6nLg8`), surroundings (`KHrRC`) and contact (`z08EQV`), the Home temporary header (`qCVqV`), and meta titles and descriptions
- [x] 2.3 Draft `messages/en.ts` and `messages/de.ts` with `satisfies Messages`; add `types.ts` with the `Messages` type and i18next `CustomTypeOptions`; confirm that removing one `de` key fails `typecheck`
- [x] 2.4 Add `src/i18n/server.ts` with `getT()` built on `next/root-params` `lng()` and one memoized i18next instance per language
- [x] 2.5 Add `src/proxy.ts` (cookie → `Accept-Language` → `en` redirect, cookie refresh on prefixed paths, matcher that skips `_next`, `api` and files); check every i18n-routing scenario with `curl`

## 3. Tokens, fonts and layout

- [x] 3.1 Rewrite `globals.css`: `@theme` colour tokens from the design variables, `--font-display` and `--font-body`, a base body style (`bg`, `text-primary`, Jost), and a focus-visible ring using `accent-warm`
- [x] 3.2 Add `app/[lng]/layout.tsx`: `<html lang>`, Cormorant Garamond and Jost via `next/font` (`latin-ext`), `generateStaticParams` for the 3 languages, and a `notFound()` guard for unknown values
- [x] 3.3 Add `src/lib/metadata.ts` with a helper that builds a translated title, description and `alternates.languages` (+ `x-default`) for a path; use it in every page
- [x] 3.4 Add `src/config/site.ts` (phone, email, routes list with segment and catalog key) and copy `design/images/logo-light.svg` to `app/public/brand/` (every placement is on a dark background, so `logo-dark` is left out) and build `app/icon.svg` from it

## 4. Shared components

- [x] 4.1 `SectionHeading` with `light` and `dark` variants, matching `znsFD` / `iZvba` (eyebrow rule 26×2, eyebrow Jost 12 with 5 tracking, headline Cormorant 54/1.05, title rule 56×2); check with a Pencil screenshot side by side
- [x] 4.2 `ButtonPrimary` (`Fw8hs`), `ButtonOutline` (`Asguq`) and `TextLink` (`rZiGf`), with `lucide-react` `ArrowRight`, rendered as links, with a focus-visible style
- [x] 4.3 `PageHeader` matching `E3j9wx` (desktop 460) and `V8PYt` (mobile 400): eyebrow, title, intro, optional image under the design gradient, `bg-dark` fallback

## 5. Navbar, switcher and menu

- [ ] 5.1 Design the Language Switcher component (desktop nav and mobile menu variants) and the Mobile Menu frame (390×844) in `design/rezydencja.pen` through the Pencil MCP, reusing the tokens, and screenshot them for approval
- [ ] 5.2 Get the user's approval of 5.1 (update the design with their feedback) and commit the design as `feat(design): …`
- [x] 5.3 `Navbar` server component matching `uR0N6` (desktop ≥ lg) and `o3r0vL` (mobile), with a `NavLink` client leaf using `useSelectedLayoutSegment` for `accent-warm` + `aria-current`, the Cennik link to `/{lng}#pricing`, and the CTA to `/{lng}/contact`
- [x] 5.4 `LanguageSwitcher` built from the approved design: links to the current path in each language, active language marked, works without JS
- [x] 5.5 `MobileMenu` client component from the approved design: dialog semantics, focus handling, Escape, scroll lock, closes on navigation; labels passed from the server as props

## 6. Footer and pages

- [x] 6.1 `Footer` matching `vgRjs` (desktop) and `O6EcDO` (mobile): logo, translated address, `tel:`/`mailto:` links, nav, copyright with the current year, no legal links
- [x] 6.2 Route stubs: `[lng]/page.tsx` (temporary header from the `qCVqV` hero copy), and `interiors`, `surroundings`, `gallery` and `contact`, each with its `PageHeader` copy and `generateMetadata`; plus `[lng]/not-found.tsx` in the shell
- [ ] 6.3 Update CLAUDE.md's i18n section: server-side `getT()`, typed catalogs, how to add a key in all 3 languages, no react-i18next in client code

## 7. Verification

- [ ] 7.1 Browser check at 390px and 1440px for all 5 routes in PL, EN and DE against the design screenshots (`YCfBW`/`iq1tP` header areas, `V8PYt`/`E3j9wx`, `vgRjs`/`O6EcDO`); fix any drift
- [x] 7.2 Check the mobile menu with the keyboard (open, Escape, focus return) and by tapping links (closes, scroll unlocked)
- [ ] 7.3 `npm run build`: confirm all 15 pages are static, check the `hreflang` tags in the HTML, and confirm `Innenräume` is absent from `.next/static/chunks`
- [ ] 7.4 Run format:check, lint, lint:styles, typecheck and build at the root; push a branch, open a PR, and confirm CI is green before merging
- [ ] 7.5 Send the EN/DE catalogs to the user for review and apply their corrections
