## Why

Home is the page most visitors land on, and right now it's a temporary header with the hero copy. The design (`iq1tP` desktop, `YCfBW` mobile) defines 8 sections above the footer. The CMS already holds their photos, the hero video and the 2026 pricing. Building Home turns the site from a shell into something that can replace the WordPress site.

## What Changes

- **Hero** (`ZGmha` / `v0lRvj`): a full-height drone video (muted, looping, `playsInline`) with the CMS poster, the design's gradient, and the eyebrow, headline and subhead. Reduced-motion visitors get the poster only.
- **Booking bar** (`MB8Pv`, mobile `UedD7`): arrival and departure date fields, guests (1–10), and "Sprawdź termin". It's a plain form that navigates to `/{lng}/contact?arrival=…&departure=…&guests=…`, so it works without JavaScript and the contact change can prefill from it.
- **Intro "O rezydencji"** (`lugt7` / `LrWJZ`): heading, lead, body, two photos, and a link to Interiors.
- **SPA** (`D7Ndy` / `IlApa`): a dark section with three Feature Cards (salt grotto, hot tub, sauna) and six amenity rows with Lucide icons.
- **Interiors teaser "Dom z duszą"** (`oq9of` / `GWaMh`): a photo, two features and a link.
- **Location panorama** (`n6ePs` / `V8yiy`): a full-bleed photo with a scrim, heading, body and 5 facts.
- **Gallery preview** (`FooZ3` / `AnXIe`): the 4 CMS-curated photos in the design's staggered heights, and a link to the full gallery.
- **Pricing** (`TIplG` / `v9Skvt`, anchor `#pricing`):
  - the year, rates, add-on and stay facts come from the CMS;
  - units and PLN formatting are localized;
  - a table on desktop, cards on mobile, plus the phone/email booking box.
- **Booking CTA** (`Pg9ok` / `ocumh`): heading, body, "Sprawdź terminy" and "Napisz do nas" buttons, and contact links.
- **Copy**: all section text in the PL/EN/DE catalogs, with EN/DE drafted for review.
- **Data**: one typed `homePageQuery` resolves every Home slot for the season, the gallery preview and the pricing in a single request, using a reusable `resolvedSlot` projection. The existing Page Header query moves to that projection too.

## Capabilities

### New Capabilities
- `home-page`: the section order, content, links, responsive behaviour and anchors of the Home page.
- `hero-video`: video playback, poster, season and reduced-motion behaviour.
- `booking-bar`: the date/guest form and its hand-off to the contact page.
- `pricing-display`: how CMS pricing is rendered and localized.

### Modified Capabilities
<!-- none: page-media's query requirements already cover typed, season-aware fetching -->

## Impact

- **app/**:
  - new section components under `src/components/home/`, plus a `FeatureCard` and `AmenityRow` built from the design's components;
  - `[lng]/page.tsx` is rewritten;
  - `queries.ts` gets `resolvedSlot` and `homePageQuery`;
  - the catalogs gain the `home.*` and `pricing.*` keys.
- **Dependencies**: none new (`lucide-react` is already installed).
- **CMS**: no schema changes.
- **Out of scope**: the contact form that reads the booking parameters (contact-form change), the subpage bodies (subpages change), and a real availability calendar.
