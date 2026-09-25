## Why

The site is about to be rebuilt from a new pen.dev design. Right now the code lives in two separate git repos, `rezydencja-zawoja-pl` and `rezydencja-zawoja-cms`, which sit side by side in an untracked parent folder with `openspec/`. The project has no CLAUDE.md, no CI, and both frameworks are over a year old. This change is the first of six: it builds the base the other five depend on (i18n-and-shell, cms-media-model, landing-page, subpages, contact-form). Doing it first means every later change lands in one repo, follows one set of rules, and runs through one CI pipeline.

## What Changes

- **BREAKING (repo layout)**: merge both repos into one git repo at the project root, keeping both histories. `rezydencja-zawoja-pl` moves to `app/` and `rezydencja-zawoja-cms` moves to `cms/`. Before the merge:
  - commit the pending CMS dependency bump;
  - drop `fix/form`, which is identical to `main`;
  - keep `feature/new-logo` as an unmerged branch, because the new design replaces it.
- Point the monorepo at a new GitHub remote and archive the two old repos.
- Add a root npm workspace with shared scripts (`dev`, `build`, `lint`, `typecheck`, `format`), one Prettier config and a root `.gitignore`. Stop tracking `.idea/` and `.next/`.
- Add the pen.dev design file to the repo as `design/rezydencja.pen`.
- Add a root `CLAUDE.md` covering:
  - conventional commits;
  - React and TypeScript practices;
  - no AI-style or obvious comments, and clean code;
  - how to read the design, only through the Pencil MCP, with design tokens, component IDs and screen IDs;
  - the i18n rule: i18next, `/pl` `/en` `/de` URL prefix, `Accept-Language` detection, EN fallback;
  - the content rule: every image, video and price comes from Sanity.
- Upgrade Next.js from 15.3 to the current stable release and Sanity Studio from 3.99 to the current release, and fix what breaks. Existing pages must still build and render.
- Fill in `openspec/config.yaml` with the project context: stack and conventions.
- Add GitHub Actions CI that runs lint, typecheck and build for `app/` and `cms/`, and deploys the Studio with `sanity deploy` on `main`. Configure the Vercel project with root directory `app/`.

## Capabilities

### New Capabilities
- `repository-structure`: the monorepo layout, workspace scripts, the history-preserving import, and where the design source lives.
- `contributor-guidelines`: CLAUDE.md rules for commits, code style, comments, and using the design, i18n and CMS.
- `continuous-integration`: required CI checks for app and cms, Studio deployment, and Vercel build settings.

### Modified Capabilities
<!-- none: openspec/specs/ is empty -->

## Impact

- **Git/GitHub**: new root repo and remote. The old repos `mabargiel/rezydencja-zawoja-ui` and `mabargiel/rezydencja-zawoja-cms` become read-only archives. Local clones of the old repos stop being the place to work.
- **Sanity**: a new project `rezydencja-zawoja` in the `btopservice` organization replaces `r9qn2ra2`, which is owned by another account and holds only placeholder content. The project ID changes.
- **Vercel**: the project's Root Directory changes to `app/` and it is linked to the new repo.
- **Dependencies**: major-version bumps of `next`, `eslint-config-next`, `next-sanity`, `sanity` and `@sanity/vision`. Lockfiles are replaced by a single root lockfile.
- **Tooling**: `git-filter-repo` is needed locally for the import (install with Homebrew).
- **Out of scope**: i18next setup, new UI and new Sanity schemas. Those come in the later changes.
