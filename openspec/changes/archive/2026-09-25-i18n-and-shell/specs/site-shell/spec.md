## ADDED Requirements

### Requirement: Design tokens and fonts
The app SHALL expose every colour variable from the design (`bg`, `bg-dark`, `surface`, `text-primary`, `text-secondary`, `text-inverse`, `text-inverse-dim`, `accent`, `accent-warm`, `accent-warm-deep`, `line`) as Tailwind theme colours with the design's values. It SHALL load Cormorant Garamond as the display font and Jost as the body font with the `latin-ext` subset. Components SHALL NOT contain raw hex colours.

#### Scenario: Polish glyphs use the web font
- **WHEN** a heading containing "Wnętrza" renders
- **THEN** the "ę" renders in Cormorant Garamond, not a fallback font

#### Scenario: No raw colours in components
- **WHEN** `app/src/components` is searched for `#[0-9a-fA-F]{3,8}`
- **THEN** there are no matches

### Requirement: Navbar
Every page SHALL show the Navbar from design node `uR0N6` over its first section. At viewport widths of 1024px and up it shows the logo, links to Dom, Wnętrza, Okolica, Galeria, Cennik and Kontakt, the language switcher, and a "REZERWUJ" outline button linking to the contact page. Below 1024px it shows the logo and a menu button (`o3r0vL`). The link for the current page SHALL use `accent-warm` and `aria-current="page"`. Cennik SHALL link to the pricing section on Home.

#### Scenario: Desktop active link
- **WHEN** `/pl/interiors` is viewed at 1440px
- **THEN** the navbar matches `uR0N6` (padding 28/64, links in Jost 14 with 1.5 tracking) and "Wnętrza" is `accent-warm` with `aria-current="page"`

#### Scenario: Translated labels
- **WHEN** `/en/interiors` is viewed
- **THEN** the links and CTA are in English, and the CTA links to `/en/contact`

### Requirement: Mobile menu
Below 1024px, the menu button SHALL open a full-screen menu that matches the approved Mobile Menu design in `design/rezydencja.pen`. It contains the nav links, the language switcher and the CTA, and it is an accessible modal dialog.

#### Scenario: Keyboard use
- **WHEN** a keyboard user opens the menu and presses Escape
- **THEN** focus moves into the menu on open, the menu closes on Escape, and focus returns to the menu button

#### Scenario: Navigating closes the menu
- **WHEN** a user taps a link in the open menu
- **THEN** the new page loads with the menu closed and page scrolling unlocked

### Requirement: Language switcher
The Navbar and mobile menu SHALL include a PL / EN / DE switcher that matches the approved Language Switcher design. Each option is a link to the current page in that language. The current language is marked with `accent-warm` and `aria-current="true"`. It works without JavaScript.

#### Scenario: Switch keeps the page
- **WHEN** a visitor on `/pl/surroundings` selects "DE"
- **THEN** they land on `/de/surroundings`

### Requirement: Footer
Every page SHALL end with the Footer from design node `vgRjs` (desktop) and `O6EcDO` (mobile). It has the logo, translated address, the phone as a `tel:` link, the email as a `mailto:` link, the nav links, and a copyright line with the current year. Links to pages that don't exist yet SHALL be left out.

#### Scenario: Contact links
- **WHEN** the footer renders
- **THEN** "+48 500 290 390" links to `tel:+48500290390` and "biuro@rezydencjazawoja.pl" links to `mailto:biuro@rezydencjazawoja.pl`

### Requirement: Page Header
Subpages SHALL open with the Page Header from design node `E3j9wx` (460px tall on desktop) and `V8PYt` (400px on mobile). It shows a translated eyebrow, title and intro, with an optional background image under the design's dark gradient, and falls back to `bg-dark` when there's no image.

#### Scenario: Interiors header copy
- **WHEN** `/pl/interiors` renders
- **THEN** the header shows the eyebrow "WNĘTRZA", the title "Dom z duszą, pokój po pokoju" and the intro from `q2jEWP`

### Requirement: Shared typography and actions
The app SHALL provide `SectionHeading` in light and dark variants (`znsFD` / `iZvba`), and `ButtonPrimary` (`Fw8hs`), `ButtonOutline` (`Asguq`) and `TextLink` (`rZiGf`) with the Lucide `arrow-right` icon where the design shows one. Each renders as a link when given `href`. Each has a visible focus style.

#### Scenario: Primary button matches the design
- **WHEN** a `ButtonPrimary` with a label and `href` renders
- **THEN** it is an `<a>` with an `accent` background, 16/32 padding, Jost 13 medium with 2 tracking, and an arrow icon 16px wide

### Requirement: Route stubs
The routes Home, `interiors`, `surroundings`, `gallery` and `contact` SHALL exist in every language, each rendering the shell and its translated header copy from the design, until later changes fill in the page bodies.

#### Scenario: All routes respond
- **WHEN** each of the 5 routes is requested in each of the 3 languages
- **THEN** all 15 responses are 200 and are prerendered statically
