## Why

The app still runs code written before the pen.dev design existed: a video hero, a navbar with routes that don't exist (`/rooms`, `/blog`), a masonry gallery, and Sanity schemas shaped for them. None of it follows the design, and none of it is translated. Every later page (landing, subpages, contact) sits inside the same shell: the transparent navbar over a photo, the dark footer, the page header and the shared type and colour system. Every one of them also needs the `/pl` `/en` `/de` routing. So this change clears the old code and builds that shell first, from the design only.

## What Changes

- **BREAKING**: delete all pre-design code:
  - `app/src/components/*`, `app/src/app/gallery`, `app/src/lib/queries.ts` and `app/src/lib/schemas.ts`;
  - the Next.js starter SVGs and the old logo in `app/public`;
  - the Sanity schemas `hero` and `photoGallery`, plus the 2 seed documents and 3 assets in the dataset;
  - the `framer-motion` dependency.

  The Sanity client and env setup stay, because cms-media-model uses them next.
- Upgrade every dependency to its latest version. Three documented exceptions stay pinned:
  - ESLint stays on 9, because the plugins `eslint-config-next` bundles don't support 10;
  - TypeScript stays on 6.0, because typescript-eslint supports <6.1;
  - `@types/node` matches Node 24 LTS.
- Language routing:
  - Every page moves under `app/[lng]/` for `pl`, `en` and `de`.
  - A `proxy.ts` redirects any path without a language to one picked from a `lng` cookie first, then `Accept-Language`, then `en`.
  - Every page declares `<html lang>` and `hreflang` alternates, including `x-default`.
- Translations with i18next, rendered on the server:
  - Catalogs are typed TypeScript modules, so a missing key in any language fails `typecheck`.
  - I draft EN and DE from the design's Polish copy, for your review.
- Design tokens:
  - All colours from the design become Tailwind 4 `@theme` tokens.
  - Fonts load through `next/font`, with the `latin-ext` subset for Polish characters: Cormorant Garamond for display and Jost for body text.
- Shell components built from the design:
  - Navbar (`uR0N6`, mobile `o3r0vL`), with the active link shown in `accent-warm`;
  - Footer (`vgRjs`, mobile `O6EcDO`);
  - Page Header (`E3j9wx`, mobile `V8PYt`);
  - Section Heading, light and dark (`znsFD` / `iZvba`);
  - Buttons: Primary `Fw8hs`, Outline `Asguq`, Text Link `rZiGf`;
  - icons from `lucide-react`, as the design uses.
- Design the two missing pieces in pen.dev first, then build them: the mobile menu that the hamburger opens, and a PL/EN/DE language switcher. The design has neither.
- Route stubs for Home, Wnętrza, Okolica, Galeria and Kontakt, each with its translated Page Header copy. Cennik links to the pricing section on Home. The page bodies come in later changes.

## Capabilities

### New Capabilities
- `i18n-routing`: language-prefixed routes, detection and redirect, the remembered language choice, `hreflang`, and typed translation catalogs.
- `site-shell`: design tokens, fonts, Navbar (desktop and mobile menu), language switcher, Footer, Page Header, Section Heading and Buttons.

### Modified Capabilities
- `repository-structure`:
  - The "Current framework versions" requirement changes from "keep the old pages working" to "latest versions, with the documented exceptions".
  - "Design source is versioned in the repo" now includes `design/images/`.

## Impact

- **app/**: the source tree is replaced. The new dependencies are `i18next`, `@formatjs/intl-localematcher`, `negotiator` and `lucide-react`; `framer-motion` goes. Every URL changes: `/` redirects to a language, and `/gallery` becomes `/{lng}/gallery`.
- **cms/**: the schema list becomes empty until cms-media-model. The Studio still builds and deploys.
- **Sanity dataset**: the seed documents and assets are deleted.
- **design/rezydencja.pen**: gains a Mobile Menu frame and a Language Switcher component.
- **CLAUDE.md**: the i18n section is updated to describe how translations are actually implemented.
- **Out of scope**: page bodies (landing sections, room features, gallery grid, contact form), Sanity media schemas, and legal pages.
