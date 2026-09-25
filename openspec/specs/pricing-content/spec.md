# pricing-content Specification

## Purpose
TBD - created by archiving change cms-media-model. Update Purpose after archive.
## Requirements
### Requirement: Structured pricing
A `pricing` singleton SHALL hold the pricing year and a list of rates. Each rate has a localized period name, a localized minimum stay, a numeric amount with a unit (`night`, `stay`, `week` or `weekend`), and an extra-person surcharge with its own amount and unit. It SHALL also hold paid add-ons (localized name and note, amount, unit) and stay facts (localized label and value pairs).

#### Scenario: Seeded rates
- **WHEN** the seeded `pricing` is queried
- **THEN** it has year 2026 and 7 rates, including "Boże Narodzenie i Sylwester" at 2500 per night with a 200 per night surcharge

#### Scenario: Price must be a number
- **WHEN** an editor types "1500 zł" into an amount
- **THEN** the Studio rejects it because the field only accepts numbers

### Requirement: Pricing queryable per language
The app SHALL be able to query pricing with every localized field resolved to the page's language, falling back to Polish.

#### Scenario: English pricing
- **WHEN** the pricing query runs with `$lng = "en"`
- **THEN** period names, minimum stays, add-on names and facts are returned in English where present

