## MODIFIED Requirements

### Requirement: Navbar
Every page SHALL show the Navbar from design node `uR0N6`. It SHALL stay fixed to the top of the viewport while the page scrolls. Over the page's first section, before any scrolling, it is transparent as in `uR0N6`. Once the page is scrolled, it SHALL switch to the design's scrolled state: a translucent `bg-dark` background with a backdrop blur and reduced vertical padding.

At viewport widths of 1024px and up it shows the logo, links to Dom, Wnętrza, Okolica, Galeria, Cennik and Kontakt, the language switcher, and a "REZERWUJ" outline button linking to the contact page. Below 1024px it shows the logo and a menu button (`o3r0vL`).

The link for the current page SHALL use `accent-warm` and `aria-current="page"`. Cennik SHALL link to the pricing section on Home. On Home, while the pricing section crosses the middle of the viewport, Cennik SHALL be the active link instead of Dom.

#### Scenario: Desktop active link
- **WHEN** `/pl/interiors` is viewed at 1440px
- **THEN** the navbar matches `uR0N6` (padding 28/64, links in Jost 14 with 1.5 tracking) and "Wnętrza" is `accent-warm` with `aria-current="page"`

#### Scenario: Translated labels
- **WHEN** `/en/interiors` is viewed
- **THEN** the links and CTA are in English, and the CTA links to `/en/contact`

#### Scenario: Sticky with blurred background
- **WHEN** a visitor scrolls any page down by more than a few pixels
- **THEN** the navbar stays at the top of the viewport with a translucent dark, blurred background, and returns to transparent when scrolled back to the top

#### Scenario: Cennik active on the pricing section
- **WHEN** a visitor scrolls Home until the pricing section crosses the middle of the viewport, or arrives at `/pl#pricing`
- **THEN** "Cennik" is `accent-warm` with `aria-current="location"` and "Dom" is not highlighted, in both the desktop navbar and the mobile menu

#### Scenario: Leaving the pricing section
- **WHEN** the visitor scrolls on to the booking CTA below the pricing section
- **THEN** "Dom" is active again and "Cennik" is not
