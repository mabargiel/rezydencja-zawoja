# contributor-guidelines Specification

## Purpose
TBD - created by archiving change monorepo-foundation. Update Purpose after archive.
## Requirements
### Requirement: Root CLAUDE.md exists
The repository SHALL have a `CLAUDE.md` at the root that covers the project map, commands, commit convention, TypeScript/React rules, comment and clean-code rules, design source usage, i18n rules, content rules and the OpenSpec workflow.

#### Scenario: Required sections present
- **WHEN** a contributor opens `CLAUDE.md`
- **THEN** it has a section for each topic listed above

### Requirement: Conventional Commits
CLAUDE.md SHALL require Conventional Commits (`type(scope): subject`) with the scopes `app`, `cms`, `design`, `ci` and `repo`, and SHALL list the allowed types.

#### Scenario: Commit format documented
- **WHEN** a contributor reads the commit section
- **THEN** it shows the format, the allowed types (`feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`, `perf`, `ci`, `build`) and at least one example per scope

### Requirement: TypeScript and React rules
CLAUDE.md SHALL state these rules:
- strict TypeScript, with no `any` and no non-null assertions without a reason;
- Server Components by default, and `'use client'` only for interactivity;
- named exports, except where Next.js requires default exports;
- explicit props types;
- data fetching in server code;
- no `useEffect` for derivable state;
- Tailwind with design tokens, never raw hex values in components.

#### Scenario: Rules documented
- **WHEN** a contributor reads the TypeScript/React section
- **THEN** every rule above is stated

### Requirement: No AI-style comments
CLAUDE.md SHALL forbid comments that restate code, narrate changes ("added X", "now uses Y") or address the reader as an assistant. Comments are allowed only to explain non-obvious intent or constraints.

#### Scenario: Comment rule documented
- **WHEN** a contributor reads the comments section
- **THEN** it lists the forbidden comment kinds with an example of each and the allowed case

### Requirement: Design reference instructions
CLAUDE.md SHALL:
- name `design/rezydencja.pen` as the design source of truth;
- state that the file is read only through the Pencil MCP, never with file-read tools;
- list the design tokens (colors and font families) and the reusable component and screen node IDs;
- require UI to match the design's text, spacing, typography and radii.

#### Scenario: Token and ID tables
- **WHEN** a contributor reads the design section
- **THEN** it contains every color token from the design with its hex value, the two font families, the reusable component IDs (Navbar uR0N6, Button Primary Fw8hs, Button Outline Asguq, Button Text Link rZiGf, Section Heading znsFD/iZvba, Booking Bar MB8Pv, Feature Card p9n20A, Pricing Table m4W0t2, Amenity Row O7P7qP/Ofbwp, Footer vgRjs) and the desktop and mobile screen IDs

### Requirement: i18n and content rules
CLAUDE.md SHALL state:
- UI text is translated with i18next into PL, EN and DE;
- routes are prefixed with `/pl`, `/en` or `/de`;
- a request to `/` is redirected based on `Accept-Language`, falling back to EN;
- no user-visible string is hardcoded in components;
- images, videos and pricing come from Sanity, while page copy lives in i18next catalogs.

#### Scenario: Rules documented
- **WHEN** a contributor reads the i18n and content sections
- **THEN** every rule above is stated

