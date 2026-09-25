## MODIFIED Requirements

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
