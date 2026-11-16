## Context

Pages are prerendered and refreshed by Sanity Live. The navbar is fixed to the top; the home hero and the sticky room nav on Wnętrza are offset by its height. The old bar's phases are chosen by the visitor's local date.

## Goals / Non-Goals

**Goals:** owner schedules messages in the Studio; one bar at a time; dismissible; no layout overlap with the navbar or hero text.

**Non-Goals:** several bars at once, images, per-page targeting, analytics on the bar.

## Decisions

### D1. Ordered messages with optional dates
`promoBar` has `enabled` and `messages[]`. Each message: `label`, `text`, optional `shortText` (all localized strings), `showFrom` and `showUntil` (dates, inclusive), and `action` (`call`, `contact` or `none`). The first message whose dates include today wins. A message with no dates always matches, so a fallback goes last. This replaces the snippet's `PHASES` and `HIDE_AFTER` with fields the owner understands.

### D2. Chosen in the browser
As with tracking, a prerendered page can't know today's date, so the client picks the message. The bar renders nothing on the server, and appears right after hydration.

### D3. Inside the fixed header, height exposed as a CSS variable
The bar renders inside the navbar's fixed container, above the menu row, so it scrolls with it and never overlaps it. A `ResizeObserver` writes its height to `--promo-height` on `<html>` (0 when hidden). The hero's top padding, the sticky room nav and the scroll offsets for `#pricing` and room anchors add it. This keeps the fixed-header model and avoids measuring in every component.

### D4. Dismissal keyed to the message version
Closing stores `<message key>:<document _updatedAt>` in localStorage. Editing the document or moving to the next message gives a new value, so the bar returns, which replaces the snippet's manual `VERSION` counter.

### D5. Look
Gold (`accent-warm-light`) bar with dark text, a small dark rounded button and an × button, matching the hero's primary button. Phones show `shortText` (or `text` if empty) and hide the label.

## Risks / Trade-offs

- The bar appears after hydration, which shifts the hero text down by the bar's height on load. The hero centres its text vertically on desktop, so the shift is small; on phones it's one line.
- A message whose dates overlap an earlier one never shows; the Studio list order is the rule, and the field description says so.
