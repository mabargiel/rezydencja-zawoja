## Why

The old site runs a promo bar above the menu that advertises available dates (Andrzejki, December, the 2027 winter break) and switches its text on set dates. It's a hand-edited WordPress snippet. The new site needs the same tool, but editable by the owner in the Studio, in three languages, without touching code.

## What Changes

- A promo bar above the navbar on every page: a short label, the message (a shorter version on phones), a "Zadzwoń" or "Napisz do nas" button, and a close button.
- A "Pasek promocyjny" document in the Studio: an on/off switch and an ordered list of messages, each with optional "from" and "until" dates. The bar shows the first message whose dates include today, so a season's sequence can be scheduled in advance, like the old snippet's phases.
- A visitor who closes the bar doesn't see that message again; editing it or moving to the next message shows the bar again.
- Seed it with the old site's current three messages (PL and EN from the old site, DE drafted).

## Capabilities

### New Capabilities
- `promo-bar`: the bar, how a message is chosen, dismissal, and its Studio document.

### Modified Capabilities
- `cms-editing`: the Studio lists "Pasek promocyjny".

## Impact

- New: `cms/schemaTypes/singletons/promoBar.ts`; `app/src/components/PromoBar.tsx`, `app/src/lib/promo.ts`.
- Changed: `NavbarFrame.tsx`/`Navbar.tsx` (the bar sits inside the fixed header), `Hero.tsx`, `Pricing.tsx`, `RoomNav.tsx`, `RoomSection.tsx` (offsets follow the bar's height), the layout, queries, types, catalogs, Studio structure.
- Content: the `promoBar` document.
