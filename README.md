# Rezydencja Zawoja

Website for [Rezydencja Zawoja](https://rezydencjazawoja.pl), a guesthouse at the foot of Babia Góra. It's a brochure site in Polish, English and German. Bookings happen off-site, by phone, the contact form, Booking.com or Airbnb.

- **Site:** https://rezydencja-zawoja-chi.vercel.app
- **Studio:** https://rezydencja-zawoja.sanity.studio

## Architecture

```
                 ┌──────────────────────────┐
  Visitor ──────▶│  Vercel                  │
                 │  app/  Next.js 16        │
                 │  Server Components       │
                 └────────────┬─────────────┘
                              │ GROQ (server-side)
                              ▼
                 ┌──────────────────────────┐        ┌─────────────────────┐
                 │  Sanity Content Lake     │◀───────│  Sanity Studio      │
                 │  project oavmm529        │  edit  │  cms/               │
                 │  dataset production      │        │  *.sanity.studio    │
                 └────────────┬─────────────┘        └─────────────────────┘
                              │
                              ▼
                   cdn.sanity.io (images, video)
```

| Part        | Tech                                                      | What it does                                                       |
| ----------- | --------------------------------------------------------- | ------------------------------------------------------------------ |
| `app/`      | Next.js 16 (App Router), React 19, TypeScript, Tailwind 4 | The public site, rendered on the server and hosted on Vercel       |
| `cms/`      | Sanity Studio 6                                           | Editing UI for photos, videos and pricing, hosted on sanity.studio |
| `design/`   | pen.dev (`rezydencja.pen`)                                | Source of truth for the UI; read through the Pencil MCP            |
| `openspec/` | OpenSpec                                                  | Change proposals, specs and task lists                             |

### Where content lives

The site's text rarely changes. Photos, video and prices do, often by season. So:

- **Sanity** holds images, videos and pricing. Editors change these in the Studio without a deploy.
- **The repo** holds page copy and UI text, as i18next translation catalogs (PL/EN/DE). Changing text means a code change.

### Languages

Every page is served under `/pl`, `/en` or `/de`. A visit to `/` redirects based on the browser's language, falling back to English. This is being built in the `i18n-and-shell` change.

## Getting started

Requires Node 24 (see `.nvmrc`).

```bash
npm install
cp app/.env.example app/.env.local
cp cms/.env.example cms/.env
npm run dev
```

The site runs at http://localhost:3000 and the Studio at http://localhost:3333.

| Command                                | What it does                  |
| -------------------------------------- | ----------------------------- |
| `npm run dev`                          | Start the site and the Studio |
| `npm run lint` / `npm run lint:styles` | ESLint / Stylelint            |
| `npm run typecheck`                    | TypeScript check              |
| `npm run build`                        | Production build of both      |
| `npm run format`                       | Format with Prettier          |

## Deployment

- **Site:** Vercel builds `app/` on every push. `main` goes to production, and pull requests get preview deployments.
- **Studio:** GitHub Actions runs `sanity deploy` when `cms/` changes on `main`.
- **CI:** every pull request runs Prettier, ESLint, Stylelint, typecheck and build.

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org). Code conventions, the design reference and the i18n rules are in [CLAUDE.md](CLAUDE.md).
