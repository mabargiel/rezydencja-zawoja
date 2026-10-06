## Why

The site grew page by page over six changes, and some patterns were written more than once:
- the eyebrow markup appears in 8 components;
- `{{placeholder}}` filling appears in 4 places;
- localized links are built by hand in a dozen files;
- seed helpers are copied between scripts;
- a few props and branches nothing uses.

None of it is broken, but each duplicate is a place where the next change can drift. Before the motion change touches most components, this one tidies the codebase without changing what visitors see.

## What Changes

**No visible or behavioural change.** Every page must render the same HTML apart from class order, and the same pages must be prerendered.

- **Shared building blocks:**
  - an `Eyebrow` component (`tone`: light or dark, `size`: section or header) replacing the 8 copies;
  - a `DashList` for the minus-bullet lists in `FeatureRow` and `RoomSection`;
  - `GalleryGrid` uses the existing `PhotoTile`;
  - one `chipClass` for the gallery filters and the room nav chips;
  - a `StepButton` for the lightbox's four previous/next buttons.
- **One source for repeated values:**
  - a `localizedPath(language, page)` helper replaces hand-built `/${language}/…` links, including the hardcoded `/contact`, `/interiors` and `/gallery`;
  - `emailHref` sits next to `phoneHref`;
  - `BookingBar` uses `today()` and `maxGuests` from `lib/inquiry`;
  - the ISO-date check and the name length limit are each defined once.
- **Simpler i18n wiring:**
  - the two identical "Powiększ zdjęcie: {{alt}}" keys become one `lightbox.openPhoto`, returned with the other lightbox labels, which removes the `openPhoto` prop from four components;
  - a small `fillTemplate` replaces the four ad-hoc `.replace('{{…}}')` calls.
- **Dead code and unused props removed:**
  - `SectionHeading`'s `as` and `id`;
  - `AmenityList`'s `tone` and its unused light branch;
  - the duplicate Escape handler in the lightbox (the native dialog close already calls `onClose`);
  - the needless `roomTypes` export.
- **Types derived instead of hand-written**: the pricing `Unit`, the gallery `Category` and `GalleryPhoto`, and `GalleryPreview`'s photo type.
- **CMS tidy-up:**
  - one `polishText` helper for schema previews instead of three copies;
  - `photoList` reused for room photos;
  - Studio languages derived from `constants.languages`;
  - the seed scripts share one localized-array builder, one `upsertPhoto` and one `photoId`.
- **Latent bug**: `useSectionInView` keys its cache by section id only, although callers watch the same id with different margins. It is now keyed by id and margin.
- **Comments**: the six remaining comments are all "why" notes. Each is either removed, by moving the reason into a name (e.g. `azureMaxWidth`, `isDefinitelyRateLimited`), or cut to one line where the constraint can't be named.
- **Dependencies**: `@sanity/image-url` is imported by the app but only installed by accident, through another package. It is declared explicitly.
- **Keeping it clean**: [knip](https://knip.dev) is added with a config that knows the CMS scripts and the image loader are entry points, and runs in CI, so unused files, exports and dependencies fail the build from now on.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `continuous-integration`: the CI checks requirement adds the unused-code check (knip).

## Impact

- **app/**: about 25 files touched, mostly smaller. New files: `components/Eyebrow.tsx`, `components/DashList.tsx`, `lib/template.ts`.
- **cms/**: schema helpers and seed scripts. The schema output is identical; `sanity schema validate` and a schema diff confirm it.
- **CI**: one new step. Root `package.json` gets `knip` as a dev dependency, and a `knip.json`.
- **Risk**: low. Every change is a refactor guarded by typecheck, lint and a before/after comparison of the built pages.
