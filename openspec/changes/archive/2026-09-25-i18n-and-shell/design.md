## Context

- `app/` runs Next 16.3 and React 19.3, but the UI is from before the design: `Hero*`, a `Navbar` linking to routes that don't exist, and `/gallery`. `cms/` has two schemas made for that UI.
- The design (`design/rezydencja.pen`, with photos in `design/images/`) has 5 desktop screens and 5 mobile screens. They share one shell:
  - a transparent navbar over a full-bleed photo header;
  - a `bg-dark` footer;
  - section headings with an eyebrow line;
  - three button styles;
  - Lucide icons (`arrow-right`, `menu`).
- The design copy is Polish. The design has no mobile menu panel and no language switcher.
- Next 16 renamed `middleware.ts` to `proxy.ts`. It also added `next/root-params`, which lets any Server Component read the root dynamic segment (the language) without passing it down as props.

## Goals / Non-Goals

**Goals:**
- A clean `app/src` that contains only design-driven code.
- `/pl`, `/en` and `/de` routes, with detection, a remembered choice and SEO alternates.
- Translation catalogs where a missing key in any language fails the build.
- A shell that matches the design at 390px and 1440px, and behaves sensibly in between.

**Non-Goals:**
- Page bodies: landing sections, feature rows, gallery grid, contact form, map.
- Sanity media schemas and photos (cms-media-model).
- Legal pages (privacy policy, rental terms). There is no content for them yet.
- Localized URL slugs (see D2).

## Decisions

### D1. Clean slate, then build
Delete everything under `app/src` except `lib/env.ts` and `lib/sanity.ts`. Delete everything in `app/public`. Clear `cms/schemaTypes` to an empty list. Delete the Sanity seed documents (`hero`, `photoGallery`) and their 3 assets.
- The Sanity client stays because cms-media-model needs it right away. Deleting and re-adding it would be churn.
- An empty schema list still gives a valid Studio that builds and deploys.

### D2. Route layout: `app/[lng]/…`, with the same English slugs in every language
```
app/src/app/
  [lng]/
    layout.tsx            <html lang>, fonts, Navbar, Footer, generateStaticParams
    page.tsx              Home
    interiors/page.tsx    Wnętrza
    surroundings/page.tsx Okolica
    gallery/page.tsx      Galeria
    contact/page.tsx      Kontakt
    not-found.tsx
  proxy.ts  (in src/)
```
The same slug in every language keeps one route tree and one typed `Route` union, and the language switcher only has to swap the first path segment.
- *Alternative: localized slugs (`/pl/wnetrza`, `/de/innenraeume`).* Slightly better for local SEO, but it needs a slug map, rewrites in the proxy, and a mapping step for every link and for the switcher. It can be added later without moving files. Deferred (open question).
- Cennik has no page. The link goes to `/{lng}#pricing`, a section the landing-page change will add.

### D3. Language detection in `proxy.ts`
- A path without a language prefix redirects (307) to `/{lng}{path}`. The language is picked in this order:
  1. a `lng` cookie, if it holds a supported value;
  2. `Accept-Language`, matched with `negotiator` and `@formatjs/intl-localematcher` against `['pl', 'en', 'de']`;
  3. `en`.
- A path with a language prefix passes through. If the prefix differs from the cookie, the response sets `lng={prefix}` (1-year max-age, `SameSite=Lax`). That's how the choice is remembered: the switcher is a plain link, and visiting `/de/...` records the choice. No client JS is needed.
- The matcher skips `_next`, static files (anything with a file extension) and `/api`.
- *Alternative: a redirect in `next.config`.* It can't read headers dynamically. Rejected.

### D4. i18next on the server only, no react-i18next
- `src/i18n/server.ts` exposes `getT()`. It reads the language with `await lng()` from `next/root-params`, gets a per-language i18next instance (created once and memoized), and returns its `t`.
- Server Components call `const t = await getT()`.
- Client Components (the mobile menu) receive translated strings as props.

This keeps i18next out of the client bundle, and the shell has almost no client code. If a later change needs translations inside an interactive component, react-i18next can be added then.
- *Alternative: react-i18next everywhere, with a client provider.* It ships the catalogs and i18next to every page for no benefit on a mostly-static site. Rejected.

CLAUDE.md's "i18next (react-i18next)" line is updated to describe this.

### D5. Typed catalogs as TypeScript modules
```
src/i18n/
  config.ts          languages = ['pl','en','de'] as const, defaultLanguage = 'en'
  messages/pl.ts     export const pl = {...} as const        ← source of truth (design copy)
  messages/en.ts     export const en = {...} satisfies Messages
  messages/de.ts     export const de = {...} satisfies Messages
  types.ts           type Messages = DeepStringRecord<typeof pl>; i18next CustomTypeOptions
```
- Because of `satisfies Messages`, a key missing from `en` or `de` is a type error. So `typecheck` (and CI) catches incomplete translations.
- `CustomTypeOptions` types the keys passed to `t()`, so a typo is caught at compile time.
- Namespaces are top-level keys (`nav`, `footer`, `pages.interiors`, …), all in one i18next namespace, because the whole catalog is small.
- *Alternative: JSON files.* No compile-time completeness check. Rejected.

### D6. Tokens in Tailwind 4 `@theme`, named as in the design
`globals.css` defines `--color-bg`, `--color-bg-dark`, `--color-surface`, `--color-text-primary`, `--color-text-secondary`, `--color-text-inverse`, `--color-text-inverse-dim`, `--color-accent`, `--color-accent-warm`, `--color-accent-warm-deep` and `--color-line`, plus `--font-display` and `--font-body` mapped to the `next/font` variables.
- Keeping the design's names makes `bg-bg-dark` and `text-text-inverse` read awkwardly, but every class maps one-to-one back to a design variable. That's worth more here than nicer names.
- Type sizes, letter spacing and paddings from the design are used as arbitrary values (`text-[13px] tracking-[2px]`) inside the component that owns them. They aren't promoted to global tokens until a second component needs the same value.

### D7. Fonts
`next/font/google` loads:
- Cormorant Garamond, weights 400, 500 and 600 plus italic 400;
- Jost, weights 300, 400 and 500.

Both use `subsets: ['latin', 'latin-ext']`, which Polish (ą, ę, ł, ż…) and German need, with `display: 'swap'`.

### D8. Navbar
- The Navbar is `absolute` over the first section of every page (the Page Header, or the Home hero later), with the `text-inverse` colour scheme from `uR0N6`.
- Desktop (≥ `lg`): logo, 6 links (Jost 14, 1.5 tracking), the language switcher, then the outline "REZERWUJ" CTA linking to `/{lng}/contact`. The active link uses `accent-warm`. The shared layout doesn't know the current path, so each link is a tiny Client Component, `NavLink`, that compares `useSelectedLayoutSegment()` with its own segment and sets `aria-current="page"`. The rest of the Navbar stays a Server Component.
- Mobile (< `lg`): logo plus the Lucide `menu` icon (`o3r0vL`). The icon opens `MobileMenu`, a small Client Component.
- The logo is `design/images/logo-light.svg`, copied to `app/public/brand/`. It's a fixed brand asset, not content, so it doesn't belong in Sanity.

### D9. Design the missing pieces in pen.dev before building them
Before writing their code, add to `design/rezydencja.pen`:
- a **Mobile Menu** frame (390×844) opened from `YCfBW`'s nav: full-screen `bg-dark`, links in the display font, the language switcher and the CTA;
- a **Language Switcher** component: `PL · EN · DE` in Jost 12 with 2 tracking, the active language in `accent-warm`, in both desktop nav and mobile menu variants.

The user approves them, and then the code follows the design as usual. This keeps "the design is the source of truth" true for everything that ships.

Accessibility for the mobile menu:
- `role="dialog"` with `aria-modal`, and the trigger's `aria-expanded`;
- Escape closes it, focus moves into the menu on open and back to the trigger on close;
- body scroll is locked while it's open, and it closes on navigation.

### D10. Page Header without CMS photos for now
`PageHeader` (`E3j9wx`, 460px desktop, `V8PYt` 400px mobile) takes `eyebrow`, `title`, `intro` and an optional `image`.
- Until cms-media-model, `image` is absent and the header shows the design's dark gradient over `bg-dark`.
- Using `design/images` directly would break the rule that content lives in Sanity.
- Home gets a temporary header built from the hero headline copy, replaced by the real hero in landing-page.

### D11. Footer
Built from `vgRjs` (desktop) and `O6EcDO` (mobile):
- brand logo, address (translated), phone as a `tel:` link, email as a `mailto:` link, the nav links, and the copyright with the current year.
- The phone and email are not translated. They live in `src/config/site.ts`.
- The legal links ("Polityka prywatności", "Regulamin najmu") are **left out** until those pages exist (open question). A link that 404s is worse than no link.

### D12. SEO
- `generateMetadata` in each page returns a translated `title` and `description`.
- `alternates.languages` lists `pl`, `en` and `de` for the same path, plus `x-default` → `/en/...`.
- `generateStaticParams` in `[lng]/layout.tsx` returns the three languages, so every page is static.

## Risks / Trade-offs

- [`next/root-params` is new, and its behavior may change in minor releases] → It's only used in `getT()` and the layout. If it breaks, fall back to passing `lng` from `params`: a one-file change.
- [An `Accept-Language` redirect on `/` can confuse crawlers] → `hreflang` alternates plus `x-default` tell search engines which URL is which. The redirect is 307, not 301, so it isn't cached as permanent.
- [The English slugs look foreign to Polish visitors] → Accepted for now and listed as an open question. Moving to localized slugs later doesn't move any files.
- [The mobile menu and switcher designs are my additions, not the designer's] → Their look is approved in pen.dev before any code is written (D9).
- [Deleting the Sanity seed data] → It's placeholder content, and the old files also exist in the old project and the scratch download.

## Migration Plan

1. Delete the old code and upgrade dependencies, then commit. The site shows a 404 until step 3; that's fine because nobody uses the Vercel URL yet.
2. Add the i18n config, catalogs, `getT` and the proxy.
3. Add tokens, fonts, and the layout with Navbar, Footer and route stubs.
4. Design the mobile menu and switcher in pen.dev, get approval, then build them.

Rollback: revert the commits. Nothing outside the repo depends on the old URLs.

## Open Questions

- Localized URL slugs (`/pl/wnetrza`, `/de/innenraeume`) instead of the shared English ones?
- Legal pages: will you supply the privacy policy and rental terms text? Until then, the footer leaves those links out.
