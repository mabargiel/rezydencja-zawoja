## ADDED Requirements

### Requirement: Pricing from the CMS
The Pricing section SHALL render the year, every rate (period, minimum stay, price, extra-person surcharge), every add-on and every stay fact from the `pricing` document, with localized text in the page's language falling back to Polish. It SHALL also render the translated header, note and phone/email booking box.

#### Scenario: A price change needs no deploy
- **WHEN** an editor changes the Standard rate amount from 1500 to 1600 and publishes
- **THEN** a fresh load of `/pl` shows the new price without a redeploy

### Requirement: Localized money and units
Amounts SHALL be formatted as PLN with the page language's number format and no decimals. Units SHALL come from the translation catalogs. A rate's price SHALL show its unit only when it's per night, and the surcharge SHALL always show its unit.

#### Scenario: Polish rates
- **WHEN** `/pl` renders the seeded pricing
- **THEN** the Standard row reads "1500 zł / doba" (with the locale's thousands separator), and the Week row reads "8000 zł" with the surcharge "+ 200 zł / tydzień"

#### Scenario: English rates
- **WHEN** `/en` renders the seeded pricing
- **THEN** the Standard row's price uses the English PLN format with "/ night", and its period reads "Standard"

### Requirement: Responsive pricing layout
At 1024px and up, rates SHALL render as a semantic table with column headers, matching `V6BKq`. Below 1024px they SHALL render as one card per rate, matching `LuDLV`.

#### Scenario: Table semantics
- **WHEN** the desktop pricing is inspected
- **THEN** it's a `<table>` with `<th scope="col">` headers for period, minimum stay, price and surcharge
