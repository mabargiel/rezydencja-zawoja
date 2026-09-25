## 1. Prepare the source repos

- [x] 1.1 Install `git-filter-repo` (`brew install git-filter-repo`)
- [x] 1.2 In `rezydencja-zawoja-cms`, commit the pending `package.json`/`package-lock.json` bump as `chore(deps): bump sanity dependencies` and push to origin
- [x] 1.3 In `rezydencja-zawoja-pl`, confirm `fix/form` has no commits beyond `main` and push `feature/new-logo` to origin so it survives in the archived repo
- [x] 1.4 Move both original folders to `../_premerge-backup/` (originals stay untouched until section 9)

## 2. Import histories into the monorepo

- [x] 2.1 Make fresh clones of both repos in the scratch dir and run `git filter-repo --to-subdirectory-filter app` (ui) and `--to-subdirectory-filter cms` (cms)
- [x] 2.2 `git init -b main` at the project root, add both rewritten clones as remotes, fetch, and merge `app/main` and then `cms/main` with `--allow-unrelated-histories`
- [x] 2.3 Create the `feature/new-logo` branch from the rewritten `app/feature/new-logo` without merging it; remove the temporary remotes
- [x] 2.4 Verify: `git log --follow app/src/app/page.tsx` reaches `Initial commit from Create Next App`, `git log -- cms/` shows `feat: bootstrap sanity studio`, and there are no nested `.git` dirs
- [x] 2.5 Commit the existing `openspec/` and `.claude/` into the root repo (`chore(repo): add openspec and claude config`)

## 3. Workspace and hygiene

- [x] 3.1 Add a root `package.json` with `"workspaces": ["app", "cms"]`, `engines.node`, and scripts `dev`, `build`, `lint`, `typecheck`, `format`; add `typecheck` (`tsc --noEmit`) to both packages
- [x] 3.2 Delete the package lockfiles, run `npm install` at the root, and commit the single root `package-lock.json`
- [x] 3.3 Add root `.gitignore`, `.editorconfig`, `.nvmrc` (24), and `.gitattributes` (`*.pen binary`); move `.prettierrc` to the root and delete the package copies
- [x] 3.4 `git rm -r --cached` for `.idea/`, `.next/` and `.sanity/` in both packages; verify with the ignored-paths check from the spec
- [x] 3.5 Run `npm run lint`, `npm run typecheck` and `npm run build` at the root and fix anything the move broke

## 4. New Sanity project and environment variables

- [x] 4.1 Create the Sanity project `rezydencja-zawoja` in the btopservice organization with a public `production` dataset; add CORS origins `http://localhost:3000` and `http://localhost:3333`
- [x] 4.2 Download the 3 MP4s and 3 images from the old project's public CDN into the scratch dir, for possible reuse in cms-media-model
- [x] 4.3 Replace the hardcoded `projectId`/`dataset` in `app/src/lib/sanity.ts` with `NEXT_PUBLIC_SANITY_PROJECT_ID`/`NEXT_PUBLIC_SANITY_DATASET`, validated at startup
- [x] 4.4 Do the same in `cms/sanity.config.ts` and `cms/sanity.cli.ts` with `SANITY_STUDIO_PROJECT_ID`/`SANITY_STUDIO_DATASET`
- [x] 4.5 Add `.env.example` to `app/` and `cms/` and create local `.env.local` / `.env` (gitignored); point both at the new project ID; confirm the ID appears only in `.env.example`

## 5. Upgrade Next.js

- [x] 5.1 Run `npx @next/codemod@latest upgrade` in `app/` to reach Next 16.x; bump `eslint-config-next`, `next-sanity` (13.x), React and types
- [x] 5.2 Replace the `next lint` scripts with `eslint .` and update `eslint.config.mjs` for the new flat config
- [x] 5.3 Fix type, lint and build errors; verify `/` (hero video) and `/gallery` render with Sanity data in the browser

## 6. Upgrade Sanity Studio

- [x] 6.1 Read the Sanity v4, v5 and v6 migration notes and bump `sanity` and `@sanity/vision` to 6.x (drop `styled-components` if it's no longer a peer)
- [x] 6.2 Convert `hero` and `photoGallery` to `defineType`/`defineField`; update `sanity.config.ts` and `sanity.cli.ts` for the new API
- [x] 6.3 Run `npm run dev -w cms`, create and publish one `hero` document (1 video) and one `photoGallery` document (2–3 images) as seed content, and confirm there are no schema errors

## 7. Design source and CLAUDE.md

- [x] 7.1 Copy `~/.pencil/documents/480b4496-262a-41df-98f9-ffa4918efbd6/pencil-new.pen` to `design/rezydencja.pen`; confirm the Pencil MCP opens it and finds uR0N6, vgRjs and iq1tP
- [x] 7.2 Write the root `CLAUDE.md` with the sections from design D6: project map, commands, Conventional Commits (types, scopes, examples), TS/React rules, comment and clean-code rules with examples, design source plus token table plus component/screen ID table, i18next and URL-prefix rules, Sanity content rules, OpenSpec workflow
- [x] 7.3 Fill `openspec/config.yaml` `context` with the stack, repo layout, i18n/content decisions and conventions, and add a `rules` entry keeping tasks small

## 8. CI and deployment

- [x] 8.1 Add `.github/workflows/ci.yml`: on PR and push to main, `setup-node` from `.nvmrc` with npm cache, `npm ci`, then lint, typecheck and build
- [x] 8.2 Add `.github/workflows/deploy-studio.yml`: on push to main with `paths: cms/**`, run `npx sanity deploy` using `SANITY_AUTH_TOKEN` and the studio env vars
- [x] 8.3 Set `studioHost: 'rezydencja-zawoja'` in `cms/sanity.cli.ts`; confirm the hostname is free during the first `sanity deploy`

## 9. Publish and cut over

- [ ] 9.1 Create the GitHub repo `mabargiel/rezydencja-zawoja`, push `main` and `feature/new-logo`, and confirm CI is green
- [ ] 9.2 Add the `SANITY_AUTH_TOKEN` secret; confirm the Studio deploy workflow succeeds
- [ ] 9.3a Add the Vercel production and preview domains and `https://rezydencja-zawoja.sanity.studio` to the new project's CORS origins
- [ ] 9.3 Reconnect the Vercel project to the new repo with Root Directory `app/` and the Sanity env vars; confirm a PR preview renders `/`
- [ ] 9.4 After the user confirms, archive `mabargiel/rezydencja-zawoja-ui` and `mabargiel/rezydencja-zawoja-cms` delete `../_premerge-backup/`, and delete the old Sanity project `r9qn2ra2` (old owner's account)
