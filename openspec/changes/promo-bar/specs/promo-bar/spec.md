## ADDED Requirements

### Requirement: Promo bar
When `promoBar.enabled` is on and a message matches today, every page SHALL show a promo bar above the navbar menu with the message's label, its text (its short text on phones, falling back to the text), an action button and a translated close button. The `call` action SHALL be a `tel:` link to the site phone number, `contact` SHALL link to the contact page, and `none` SHALL show no button. The bar SHALL NOT overlap the menu or the hero text.

#### Scenario: Current message
- **WHEN** `/pl` loads on 20.11.2026 and the first message runs until 30.11.2026
- **THEN** the bar shows that message's Polish text and a "Zadzwoń" button linking to `tel:+48500290390`

#### Scenario: Switched off
- **WHEN** `promoBar.enabled` is off
- **THEN** no bar shows and the navbar sits at the top of the page

### Requirement: Scheduled messages
The bar SHALL show the first message, in Studio order, whose `showFrom` and `showUntil` dates (inclusive, either optional) include the visitor's current date. If none match, no bar SHALL show. Changes in the Studio SHALL take effect without a redeploy.

#### Scenario: Next phase
- **WHEN** the first message ends on 30.11.2026 and the second runs 1–22.12.2026
- **THEN** on 1.12.2026 the bar shows the second message

### Requirement: Dismissal
The close button SHALL hide the bar and remember that for the current message version. The bar SHALL show again when a different message becomes current or the document is edited.

#### Scenario: Closed bar stays closed
- **WHEN** a visitor closes the bar and opens another page
- **THEN** the bar doesn't show

#### Scenario: New phase after closing
- **WHEN** a visitor closed the November message and returns in December
- **THEN** the December message shows

### Requirement: Studio document
A `promoBar` document, "Pasek promocyjny", SHALL hold `enabled` and an ordered list of messages, each with a localized `label` and `text` (Polish required), an optional localized `shortText`, optional `showFrom` and `showUntil` dates (until not before from), and `action` (`call`, `contact` or `none`, default `call`).

#### Scenario: Invalid dates
- **WHEN** an editor sets `showUntil` before `showFrom`
- **THEN** the Studio blocks publishing with a validation error
