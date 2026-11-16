## Context

The old site uses PixelYourSite with "prior consent": the pixel waits for the cookie plugin's accept. It sends only `PageView`. The new site is static (pages are prerendered and refreshed by Sanity Live), has no consent banner, and its privacy policy states that it sets only the `lng` cookie.

## Goals / Non-Goals

**Goals:** pixel only after consent; owner can switch it on or off and schedule it from the Studio; Lead and Contact events for K2; no effect on page speed before consent.

**Non-Goals:** Google Analytics or other trackers; the Meta Conversions API (server-side events); Advanced Matching (sending hashed email or phone); a full consent platform with per-vendor choices.

## Decisions

### D1. Own banner, one "marketing" category
Only one optional purpose exists, so the banner offers Accept and Reject with equal weight, plus a link to the privacy policy. A consent platform such as Cookiebot would add cost and a foreign look for a single switch.

### D2. Settings in a separate Studio document
`tracking` ("Pliki cookies i Piksel Meta") sits next to Sezon. Fields: `enabled` (boolean, default off), `pixelId` (digits, required when enabled), `activeFrom` and `activeUntil` (optional datetimes), `consentMonths` (1–24, default 12). A separate document keeps the season switch simple.

### D3. Date window checked in the browser
Pages are prerendered, so a server-side date check would go stale until the next publish. The layout passes the settings to a small client component, which compares them with the current time. Outside the window, no banner shows and no pixel loads.

### D4. Decision in localStorage, not a cookie
The decision (`accepted` or `rejected`, a timestamp, and the pixel ID it applies to) is stored in localStorage under `rz-consent`. It never needs to reach the server. It expires after `consentMonths`, and changing the pixel ID asks again. The privacy policy names it.

### D5. Loading the pixel
After Accept (now or remembered), the standard `fbq` snippet is injected once, `fbq('init', id)` runs, then `PageView`. A `usePathname` effect sends `PageView` on each client navigation. Nothing from Meta loads before consent. Reject or withdrawal sets the decision and reloads the page, which is the reliable way to unload the script.

### D6. Events
- `Lead`: `ContactForm` fires once when the server action returns `sent`. No form data is sent.
- `Contact`: one document-level click listener matches `a[href^="tel:"]` and `a[href^="mailto:"]`, which covers the hero, footer, contact page and mobile menu.
`track()` does nothing unless the pixel is loaded, so callers never check consent.

### D7. Privacy policy
The Polish text is drafted from the existing structure: section 7 is rewritten (the `lng` cookie, the consent entry, and the Meta Pixel cookies `_fbp` and `fr`, with purpose, legal basis art. 6(1)(a) GDPR, withdrawal through the footer link), and Meta Platforms Ireland Ltd. joins the recipients in section 4, with transfers to the US under the Data Privacy Framework. EN and DE follow. It's saved as a Sanity draft, so nothing changes until the owner publishes.

## Risks / Trade-offs

- Fewer tracked visitors than without a banner. That's the legal requirement, and it matches the old site.
- The pixel goes live only when the owner switches `enabled` on. Seeding it off means merging changes nothing visible.
- The privacy policy must be published at the same moment the pixel is switched on; the Studio description for `enabled` says so.
- Ad blockers stop the pixel regardless of consent.
