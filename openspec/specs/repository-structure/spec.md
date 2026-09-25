# repository-structure Specification

## Purpose
TBD - created by archiving change monorepo-foundation. Update Purpose after archive.
## Requirements
### Requirement: Single monorepo layout
The project SHALL be one git repository whose root contains `app/` (Next.js site), `cms/` (Sanity Studio), `design/` (design source), `openspec/`, and a root `CLAUDE.md`.

#### Scenario: Fresh clone
- **WHEN** a contributor clones the repository
- **THEN** the root contains `app/`, `cms/`, `design/rezydencja.pen`, `openspec/`, `CLAUDE.md` and `package.json`, and there are no nested `.git` directories

### Requirement: History of both original repositories is preserved
The repository SHALL contain the full commit history of `rezydencja-zawoja-ui` and `rezydencja-zawoja-cms`, rewritten so each commit's files are under `app/` or `cms/` respectively.

#### Scenario: Following a file across the merge
- **WHEN** a contributor runs `git log --follow app/src/app/page.tsx`
- **THEN** the output includes commits made before the monorepo existed, including `Initial commit from Create Next App`

#### Scenario: CMS history present
- **WHEN** a contributor runs `git log -- cms/`
- **THEN** the output includes `feat: bootstrap sanity studio`

#### Scenario: Obsolete branch preserved without merging
- **WHEN** a contributor lists branches
- **THEN** `feature/new-logo` exists, its files are under `app/`, and its commit is not an ancestor of `main`

### Requirement: Root workspace commands
The root `package.json` SHALL declare npm workspaces `app` and `cms` and provide `dev`, `build`, `lint`, `typecheck` and `format` scripts that run across the workspaces. There SHALL be exactly one lockfile, at the root.

#### Scenario: One install
- **WHEN** a contributor runs `npm ci` at the root
- **THEN** dependencies for both `app` and `cms` are installed and no package-level lockfile exists

#### Scenario: Whole-repo checks
- **WHEN** a contributor runs `npm run lint`, `npm run typecheck` and `npm run build` at the root
- **THEN** each command runs for both workspaces and exits 0

### Requirement: No IDE or build output tracked
The repository SHALL NOT track `.idea/`, `.next/`, `dist/`, `node_modules/`, `.sanity/` or `.env*` files other than `.env.example`.

#### Scenario: Ignored paths
- **WHEN** a contributor runs `git ls-files | grep -E '(^|/)(\.idea|\.next|node_modules|\.sanity)/'`
- **THEN** the command prints nothing

### Requirement: Sanity connection comes from the environment
The app and the Studio SHALL read the Sanity project ID and dataset from environment variables, with the expected variables listed in a committed `.env.example` in each package.

#### Scenario: Source contains no project ID
- **WHEN** a contributor searches `app/src` and `cms/*.ts` for the project ID
- **THEN** there are no matches, and the value appears only in `.env.example` files

### Requirement: Sanity project owned by the btopservice organization
The app and the Studio SHALL use a Sanity project named `rezydencja-zawoja` in the `btopservice` organization, with a public-read `production` dataset, and `mbargiel@btopservice.net` SHALL be an administrator of it.

#### Scenario: Project reachable with the team account
- **WHEN** the Sanity MCP, logged in as `mbargiel@btopservice.net`, lists projects
- **THEN** `rezydencja-zawoja` appears with a `production` dataset, and its ID matches the one in `.env.example`

#### Scenario: Local development allowed by CORS
- **WHEN** the app on `http://localhost:3000` or the Studio on `http://localhost:3333` calls the Sanity API
- **THEN** the request is not blocked by CORS

### Requirement: Current framework versions
Every dependency in `app` and `cms` SHALL be on its latest published version, with only these documented exceptions:
- `eslint` stays on 9.x while `eslint-config-next`'s bundled plugins don't support ESLint 10;
- `typescript` stays on 6.0.x while typescript-eslint supports only TypeScript below 6.1;
- `@types/node` matches the Node major version in `.nvmrc`.

The app SHALL contain no code from before the design.

#### Scenario: No outdated dependencies beyond the exceptions
- **WHEN** a contributor runs `npm outdated --workspaces`
- **THEN** the only packages listed are `eslint`, `typescript`, `@types/node` and packages whose latest version requires ESLint 10 or TypeScript 7

#### Scenario: No pre-design code remains
- **WHEN** a contributor searches `app/src` and `cms/schemaTypes`
- **THEN** there are no `Hero`, `HeroClient`, `HeroOverlay` or `photoGallery` symbols, no `framer-motion` import, and no Next.js starter SVGs in `app/public`

#### Scenario: Studio builds with the current schema set
- **WHEN** `npm run build -w cms` runs
- **THEN** the Studio builds and `npx sanity schema validate` reports 0 errors

### Requirement: Design source is versioned in the repo
The pen.dev design SHALL be stored at `design/rezydencja.pen`, with every image it references in `design/images/`, and `.pen` and image files SHALL be marked as binary in `.gitattributes`.

#### Scenario: Design readable through the MCP
- **WHEN** the Pencil MCP opens `design/rezydencja.pen`
- **THEN** the components `Navbar` (uR0N6) and `Footer` (vgRjs) and the screen `Rezydencja Zawoja Landing` (iq1tP) are present

#### Scenario: Design images resolve
- **WHEN** the Pencil MCP screenshots the node `jfJ6e` (Intro Images)
- **THEN** the photos render instead of empty image fills

