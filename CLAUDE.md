# Rezydencja Zawoja

Marketing site for a guesthouse in Zawoja (Babia Góra, Poland). No on-site booking: guests reach out via the contact form, phone, Booking.com or Airbnb. Trilingual: PL, EN, DE.

## Project map

```
app/        Next.js 16 (App Router, React 19, Tailwind 4) — the public site
cms/        Sanity Studio 6 — media and pricing
design/     rezydencja.pen — the pen.dev design, source of truth for UI
openspec/   change proposals, specs and tasks (OpenSpec)
```

npm workspaces; one lockfile at the root. Node version is pinned in `.nvmrc`.

## Commands

Run from the repo root:

| Command                               | What it does                      |
| ------------------------------------- | --------------------------------- |
| `npm run dev`                         | app on :3000 and Studio on :3333  |
| `npm run dev:app` / `npm run dev:cms` | one of them                       |
| `npm run lint`                        | ESLint in both workspaces         |
| `npm run lint:styles`                 | Stylelint on CSS                  |
| `npm run typecheck`                   | `tsc --noEmit` in both workspaces |
| `npm run build`                       | production build of both          |
| `npm run format`                      | Prettier over the repo            |
| `npm run format:check`                | Prettier check without writing    |

Before committing, `format:check`, `lint`, `lint:styles`, `typecheck` and `build` must pass; CI runs the same five.

Environment: copy `app/.env.example` → `app/.env.local` and `cms/.env.example` → `cms/.env`.

## Commits

[Conventional Commits](https://www.conventionalcommits.org): `type(scope): subject`

- Types: `feat`, `fix`, `refactor`, `perf`, `style`, `test`, `docs`, `build`, `ci`, `chore`
- Scopes: `app`, `cms`, `design`, `ci`, `repo`
- Subject in imperative mood, lowercase, no trailing period, ≤ 72 chars. Body explains why, when it isn't obvious.
- One logical change per commit.

```
feat(app): add language switcher to navbar
fix(cms): require alt text on gallery images
chore(design): refresh rezydencja.pen from pen.dev
ci(ci): cache npm in workflow
build(repo): bump next to 16.4
```

## TypeScript and React

- `strict` TypeScript. No `any`; use `unknown` and narrow. No non-null `!` unless the invariant is guaranteed and obvious.
- Server Components by default. Add `'use client'` only for state, effects, event handlers or browser APIs, and push it to the smallest leaf component.
- Fetch data in server code (Server Components, route handlers, server actions), never in client effects.
- Named exports. Default exports only where Next.js requires them (`page`, `layout`, `not-found`, etc.).
- Every component has an explicit props type. Derive types from data (`typeof`, `ReturnType`, Sanity typegen) instead of duplicating them.
- Don't use `useEffect` for state that can be derived during render. Don't mirror props into state.
- Keep components small and single-purpose; extract when a piece is reused or a file stops fitting on one screen.
- Styling with Tailwind utilities mapped to design tokens. Never hardcode hex values, font names or magic spacing in components.
- Use `next/image` for images and `next/font` for fonts.
- Accessible by default: semantic elements, labelled controls, alt text, visible focus states.

## Comments and clean code

Code should explain itself through names and structure. Write a comment only to explain **why** something non-obvious is the way it is (a constraint, a workaround, a business rule).

Do not write:

```ts
// Import the Image component          ← restates the code
// Added language detection            ← narrates a change (that's for the commit message)
// Now uses the new client             ← same
// This function returns the hero data ← restates the name
// TODO: maybe refactor later          ← vague; open an OpenSpec task instead
```

Allowed:

```ts
// Sanity CDN caches for 60s; use the API host so editors see publishes immediately in preview
```

Also:

- No dead code, no commented-out code, no unused exports.
- Descriptive names over abbreviations. Booleans read as questions (`isOpen`, `hasVideo`).
- Early returns over nested conditionals.
- No speculative abstraction: build for what the design needs now.

## Design

`design/rezydencja.pen` is the source of truth for UI. Share link: https://app.pen.dev/s/QQKLBqJMwyUed6lsdV-DNk-Vs6VG-7FoClIR3SEwBIs

- `.pen` files are encrypted. Read them **only through the Pencil MCP** (`mcp__pencil__*` tools, `filePath` = absolute path to `design/rezydencja.pen`). Never use Read/Grep on them.
- Useful calls in `execute`: `Get(id, {depth: 5})` for structure, `Get(id, {resolveVariables: true})` for computed values, `TakeScreenshot([id])` for visuals, `GetVariables()` for tokens.
- Match the design's text, spacing, typography, radii, icons and responsive behavior. Desktop frames are 1440px wide, mobile frames 390px.
- When the design changes in pen.dev, replace the file in a `chore(design):` commit.

### Tokens

| Token              | Value              |
| ------------------ | ------------------ |
| `bg`               | `#F4F1EA`          |
| `bg-dark`          | `#1E241F`          |
| `surface`          | `#FFFFFF`          |
| `text-primary`     | `#22271F`          |
| `text-secondary`   | `#565A4E`          |
| `text-inverse`     | `#F7F5EF`          |
| `text-inverse-dim` | `#F7F5EFC7`        |
| `accent`           | `#3E4F41`          |
| `accent-warm`      | `#B99A5F`          |
| `accent-warm-deep` | `#7A5D2E`          |
| `line`             | `#DDD8CC`          |
| `font-display`     | Cormorant Garamond |
| `font-body`        | Jost               |

### Reusable components

| Component        | Node ID           |
| ---------------- | ----------------- |
| Navbar           | `uR0N6`           |
| Button Primary   | `Fw8hs`           |
| Button Outline   | `Asguq`           |
| Button Text Link | `rZiGf`           |
| Section Heading  | `znsFD`, `iZvba`  |
| Booking Bar      | `MB8Pv`           |
| Feature Card     | `p9n20A`          |
| Pricing Table    | `m4W0t2`          |
| Amenity Row      | `O7P7qP`, `Ofbwp` |
| Footer           | `vgRjs`           |

The component board is `FWOuz`.

### Screens

| Page    | Desktop  | Mobile   |
| ------- | -------- | -------- |
| Home    | `iq1tP`  | `YCfBW`  |
| Wnętrza | `qf7cQ`  | `qTweU`  |
| Galeria | `V6NL6`  | `PfDER`  |
| Okolica | `z1yziP` | `QNeFv`  |
| Kontakt | `McNXT`  | `a7yX5j` |

## i18n

- Languages: `pl`, `en`, `de`. Translations use **i18next** (`react-i18next`).
- Every route lives under a language segment: `/pl/...`, `/en/...`, `/de/...`.
- A request without a language prefix is redirected based on `Accept-Language`; if nothing matches, fall back to `en`.
- Every page emits `hreflang` alternates for all three languages. The navbar has a PL/EN/DE switcher.
- No user-visible string is hardcoded in a component, including `alt`, `aria-label` and metadata. Everything goes through the i18next catalogs.
- The design's copy is Polish. EN and DE are drafted by Claude and reviewed by the owner.

## Content

- **Sanity** holds all images, videos and pricing (seasonal rows with translated labels). Localized fields in Sanity carry all three languages.
- **i18next catalogs** in `app/` hold page copy and UI text. It's write-once content, versioned in git.
- Fetch Sanity data in server code with typed GROQ queries. Never hardcode asset URLs.
- The Studio lives in `cms/`. Schema changes go through `defineType` / `defineField` and must pass `npx sanity schema validate`.

## Workflow

Non-trivial work goes through OpenSpec: `/opsx:propose` → `/opsx:apply` → `/opsx:archive`. Keep `openspec/changes/<name>/tasks.md` checkboxes in sync with the work.
