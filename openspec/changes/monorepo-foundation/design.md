## Context

Current state (verified 2026-09-25):

```
rezydencja-zawoja/                  no git; holds openspec/ and .claude/
├── rezydencja-zawoja-pl/           git → github.com/mabargiel/rezydencja-zawoja-ui
│     branches: main, fix/form (== main), feature/new-logo (+1 commit)
│     Next 15.3.4 · React 19 · Tailwind 4 · next-sanity 9 · framer-motion
│     Sanity client hardcodes projectId r9qn2ra2 / dataset production
└── rezydencja-zawoja-cms/          git → github.com/mabargiel/rezydencja-zawoja-cms
      branch: main, uncommitted package.json + lock bump
      Sanity 3.99 · schemas: hero, photoGallery
```

Latest versions on npm: `next` 16.3.6, `sanity` 6.16.0, `next-sanity` 13.3.4. Local Node is 25. The design is a pen.dev document, currently at `~/.pencil/documents/480b4496-…/pencil-new.pen`. It is encrypted and can only be read through the Pencil MCP.

## Goals / Non-Goals

**Goals:**
- One repo with the full history of both projects, laid out as `app/`, `cms/`, `design/`, `openspec/`.
- One install and one set of commands at the root.
- A CLAUDE.md that makes later changes consistent without re-explaining conventions.
- Both apps on current major versions, building cleanly and checked by CI.

**Non-Goals:**
- i18next, routing, new UI, new Sanity schemas (the later changes).
- Moving content out of the old Sanity project. It holds only placeholder content; see D8.
- Porting any work from `feature/new-logo`.

## Decisions

### D1. History import with `git filter-repo --to-subdirectory-filter`
Work on a fresh clone of each repo:
1. Rewrite every commit so the files live under `app/` or `cms/`.
2. Add both rewritten clones as remotes of a new root repo.
3. `git merge --allow-unrelated-histories` both `main` branches.

`feature/new-logo` is imported as a branch that points at its rewritten commit. `fix/form` is not imported.
- *Alternative: `git subtree add`.* It keeps history, but `git log -- app/x` doesn't follow files across the subtree boundary, so blame and log for a single file stop working. Rejected.
- *Alternative: `git read-tree --prefix`.* Same problem as subtree. Rejected.
- *Alternative: fresh `git init`.* Loses history, which the user wants kept.

The root folder already exists and holds `openspec/` and `.claude/`. So the new repo is built in a temporary folder and then swapped in for the root `.git`: first move the old sibling folders out to `../_premerge-backup/`, then check out the merged tree. The uncommitted CMS bump is committed in the CMS repo first, so it becomes part of the imported history.

### D2. npm workspaces, not pnpm
Both projects already use npm with `package-lock.json`, and Vercel handles npm workspaces with Root Directory = `app/` without extra setup. pnpm would add a new tool and a new lockfile format for no real gain on a two-package repo. The root `package.json` declares `"workspaces": ["app", "cms"]` and scripts that run `npm run <x> --workspaces --if-present`.
- *Alternative: Turborepo.* Its caching doesn't pay off for two packages. It can be added later without restructuring.

### D3. Tooling config stays per package, except Prettier and `.gitignore`
Next's ESLint config and Sanity's ESLint config have different plugin sets, so each package keeps its own `eslint.config.mjs`. Prettier moves to the root (one `.prettierrc`), because formatting should be identical across packages. `.editorconfig` and `.gitignore` also go at the root. `.idea/` and `.next/` are removed from the index.

### D4. Upgrades: Next 15.3 → 16.x, Sanity 3.99 → 6.x, done after the merge
Upgrading after the merge means the upgrade commits sit on top of the imported history, and each upgrade can be bisected in one repo.
- Next: run `npx @next/codemod@latest upgrade`, then bump `eslint-config-next` and `next-sanity`. `next lint` was removed in Next 16, so the `lint` script switches to `eslint .`. If Next 16 renamed `middleware` to `proxy`, that doesn't matter yet because no middleware exists until i18n-and-shell.
- Sanity: 3 → 6 crosses several majors. Check the official migration notes for each major. The two existing schemas are plain objects, so the likely fixes are wrapping them in `defineType`/`defineField` and updating `sanity.config.ts`/`sanity.cli.ts`. `styled-components` may no longer be needed as a peer dependency.
- The `projectId` and `dataset` move out of the source into `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` (app) and `SANITY_STUDIO_PROJECT_ID` / `SANITY_STUDIO_DATASET` (cms), with `.env.example` files committed.
- Pin the Node version with an `engines` field and `.nvmrc` (Node 24 LTS), so CI, Vercel and local runs match. Local Node 25 still works.

### D5. Design file in the repo
Copy `pencil-new.pen` to `design/rezydencja.pen`. The share URL goes into CLAUDE.md as a secondary reference. The repo copy is the source of truth for implementation, because MCP tool calls need a file path and a path inside the repo is stable. It is a binary file, so mark it `binary` in `.gitattributes`. It is small enough that Git LFS isn't needed.

### D6. CLAUDE.md at the root, short and rule-based
Sections:
1. Project map
2. Commands
3. Commit convention (Conventional Commits, scopes `app`, `cms`, `design`, `ci`, `repo`)
4. TypeScript/React rules
5. Comments and clean code
6. Design source and how to read it, with the token table and component/screen ID table
7. i18n rules (i18next, `/[lng]` segment, detection plus EN fallback, no hardcoded UI strings)
8. Content rules (images, video and pricing from Sanity; UI copy in i18next catalogs)
9. OpenSpec workflow

`app/` and `cms/` don't get their own CLAUDE.md for now. One file is easier to keep accurate.

### D8. New Sanity project instead of moving the old one
The old project `r9qn2ra2` belongs to a Sanity account that `mbargiel@btopservice.net` can't reach. It holds 2 placeholder documents (`hero`, `photoGallery`), 3 MP4s and 3 images (about 8 MB). So a new project, `rezydencja-zawoja`, is created in the `btopservice` organization (`oBxFSoHc8`) with a `production` dataset. The dataset is public-read, because the site only reads published media. CORS origins: `http://localhost:3000`, `http://localhost:3333`, the Vercel domains and the Studio host. The existing `hero`/`photoGallery` documents are not migrated. The 3 videos and 3 images are downloaded from the public CDN into the scratch dir, so the cms-media-model change can re-upload whichever are worth keeping.
- *Alternative: transfer `r9qn2ra2` to btopservice.* This needs the old owner's login and admin roles in both organizations, and it carries nothing worth keeping. Rejected.

The old project is left untouched (the old site may still read it) and can be deleted after cut-over.

### D7. CI with GitHub Actions
- `ci.yml` runs on PRs and on pushes to `main`: `npm ci`, then `lint`, `typecheck` and `build` for both workspaces. It uses a Node version matrix of one (the `.nvmrc` version) and caches npm.
- `deploy-studio.yml` runs on pushes to `main` that change `cms/**`: `npx sanity deploy` with the `SANITY_AUTH_TOKEN` secret.
- The app is deployed by the Vercel Git integration, not by Actions, with Root Directory = `app/` and preview deploys on PRs. A GitHub Actions deploy would duplicate what Vercel already does.

## Risks / Trade-offs

- [The import goes wrong, or the root `.git` swap loses local state] → Work only on fresh clones and keep the original folders untouched in `../_premerge-backup/` until the monorepo is pushed and verified. Only then delete them.
- [Sanity 3 → 6 has breaking changes the Studio code doesn't show until runtime] → After the upgrade, run `sanity dev`, open both document types, and check that existing documents still load and edit. Pin the exact version that passed.
- [Next 16 breaks `next-sanity` or framer-motion] → Upgrade the three together and check `next build` plus the `/` and `/gallery` pages in the browser.
- [The new remote breaks Vercel's link to the old repo] → Reconnect Vercel only after CI on the new repo is green. The old deployment stays live until then.
- [The `.pen` file in the repo drifts from the file the designer keeps editing in pen.dev] → CLAUDE.md says the repo copy is authoritative for implementation. Refreshing it is an explicit `chore(design):` commit.

## Migration Plan

1. Back up the originals to `../_premerge-backup/`.
2. Build the merged repo and verify it: `git log --follow app/src/app/page.tsx` shows history from before the merge.
3. Restructure the workspace, then upgrade, then add CLAUDE.md, then CI. Commit each step separately.
4. Create a new GitHub repo, push, and confirm CI is green.
5. Repoint Vercel (Root Directory `app/`), add the Sanity env vars and `SANITY_AUTH_TOKEN`, and confirm the preview deploy works.
6. Archive the two old GitHub repos and delete the local backup.

Rollback: until step 6, the old repos and the Vercel project on the old repo are untouched. Rolling back means pointing Vercel back at the old repo.

## Resolved Questions

- New GitHub repo: `mabargiel/rezydencja-zawoja` (confirmed 2026-09-25).
- Studio hostname: `rezydencja-zawoja` → `rezydencja-zawoja.sanity.studio` (confirmed 2026-09-25). Hosted on the new project (D8), so the name has no prior claim from this project.
