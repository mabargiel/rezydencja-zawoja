## Context

A read-only review of `app/src` and `cms/` found:
- duplicated markup (the eyebrow in 8 components, the dash list in 2, the gallery tile, chips, and lightbox step buttons);
- duplicated values (localized hrefs, `mailto:`, `today()`, the 10-guest limit, the ISO-date check, the 100-character name limit);
- inconsistent i18n wiring for "open photo";
- unused props (`SectionHeading.as` and `.id`, `AmenityList.tone`);
- hand-written types;
- copied CMS and seed helpers;
- one latent cache-key bug in `useSectionInView`.

The review also confirmed what's clean and stays as it is:
- every colour token and catalog key is used;
- there are no unsafe casts or non-null `!`;
- the client boundaries are already minimal;
- the server action and schema split are sound;
- the different lightbox host states are justified.

knip reports one real undeclared dependency (`@sanity/image-url`) and false positives for the CMS scripts and `imageLoader.ts`, which are entry points.

## Goals / Non-Goals

**Goals:**
- Each repeated pattern lives in one place, with a name.
- No dead props, exports or branches; knip in CI keeps it that way.
- Rendered output is unchanged.

**Non-Goals:**
- Visual or copy changes.
- Restructuring folders.
- New abstractions for code that appears only once, such as a `useLightbox` hook or merged text-column components whose heading sizes differ.
- Replacing the GROQ `coalesce` constants with functions. Sanity typegen can't resolve call expressions inside `defineQuery`.

## Decisions

### D1. Small presentational components, not variants of large ones
- `Eyebrow({ tone: 'light' | 'dark', size?: 'section' | 'header', children })` renders the rule and the uppercase label.
- `DashList({ items, className })` renders the minus-icon list. The parent passes the list spacing, which differs per design frame. The item text is 13.5px on mobile and 14.5px on desktop in both designs. FeatureRow's 14px on mobile was a mismatch, and is now corrected to 13.5px.
- `StepButton({ direction, onClick, label, size })` sits inside `Lightbox.tsx`, since it isn't reused elsewhere.
- `chipClass(isActive)` lives in `components/chip.ts`.
- **Why**: each is a leaf with one job. They follow the existing `PhotoTile` and `SectionHeading` pattern, and keep the Server and Client split intact, because none needs state.

### D2. `localizedPath` and contact hrefs in `config/site.ts`
- `localizedPath(language: Language, page: PageKey) => \`/${language}${pagePaths[page]}\``.
- Navbar passes `homeHref` and `bookHref` down to `MobileMenu`, instead of the menu building them.
- `emailHref` sits next to `phoneHref`.
- `metadata.ts` keeps building alternates per language through the same helper.

### D3. Lightbox labels own "open photo"
- `lightbox.openPhoto` ("Powiększ zdjęcie: {{alt}}") replaces `pages.interiors.openPhoto` and `pages.gallery.openPhoto` in all three catalogs.
- `getLightboxLabels()` returns it as a template, like `counter`.
- `fillTemplate(template, values)` in `lib/template.ts` fills `{{key}}` placeholders on the client: in the lightbox counter, tile labels and bedroom card labels.
- The consent label keeps its `split('{{link}}')`, because it needs JSX between the parts.

### D4. Validation constants in one module
`lib/inquiry.ts` exports `today`, `maxGuests`, `maxNameLength` and `isIsoDate`, used by the schema, `PrefilledContactForm`, `BookingBar` and `ContactForm`. `isoDatePattern` becomes private.

### D5. Types from data
- Pricing `Unit` comes from `HomePageQueryResult`.
- The gallery `Category` and `GalleryPhoto` come from `GalleryPageQueryResult`.
- `GalleryPreview` uses `KeyedPhoto`.
- Typecheck guards each swap.

### D6. `useSectionInView` cache key
The module-level map is keyed by `${id}|${rootMargin}`, and cleanup no longer deletes the entry. The desktop and mobile "Cennik" links watch the same id with the same margin, so a per-key delete would still let one unmount wipe the other's state. A new observer reports the current intersection straight away, so a kept entry can't go stale. There's no behaviour change in today's usage.

### D7. Comments
For each of the six:
- **`contact/actions.ts`**: rename to `isDefinitelyRateLimited`. The fail-open rule is then in the name, and the comment goes.
- **`RoomNav.tsx`**: a one-line reason for the lowest-quarter threshold, which can't be named.
- **`inquiryEmails.ts`**: one line on why the confirmation carries no visitor text. It's a security constraint.
- **`lib/inquiry.ts`**: one line on the timezone.
- **`cms/scripts/map.ts`**: `azureMaxWidth` and `designMapRatio` constants, and the comment goes.
- **`seedLegalPages.ts`**: one line on `createIfNotExists`.

This follows CLAUDE.md: only "why" comments that names can't express.

### D8. CMS and seed helpers
- `schemaTypes/localized.ts` exports `polishText(items)`, used by the `interiorsPage`, `pricing` and `photo` previews.
- `scripts/localized.ts` exports the `Localized` type, `localizedArray(text)` and `photoId`, used by `seed.ts`, `seed-legacy.ts`, `seed-map.ts`, `seedLegalPages.ts` and `map.ts`.
- `seed.ts` gets `upsertPhoto(id, source, photo)` for the two photo loops.
- The `email` and `phone` links move to `scripts/legal/contact.ts`.

### D9. knip
- `knip.json` defines the workspaces:
  - **app**: entry points are the Next app routes and `src/sanity/imageLoader.ts`; `src/sanity/types.ts` is ignored.
  - **cms**: entry points are `scripts/*.ts`, `sanity.config.ts` and `sanity.cli.ts`.
- A root `npm run knip` script runs it, and CI runs it after lint.
- Any finding that remains is a deliberate exception, listed in the config with a reason.

## Risks / Trade-offs

- [A refactor subtly changes markup] → Build before and after, then diff the prerendered HTML of every route (`.next/server/app/**/*.html`) with class order normalised. Only the expected differences may remain.
- [Removing the Escape keydown changes lightbox closing] → The native `cancel` → `close` → `onClose` path stays. This is verified in a visible browser with keyboard, swipe and the close button. Earlier tests ran in a hidden tab, where `close` events don't fire.
- [knip false positives block CI] → The entry points are configured first, and the PR shows a clean knip run.

## Migration Plan

Merge this before `motion`, which will rebase on it. Rollback is reverting the PR; there are no data or schema changes.
