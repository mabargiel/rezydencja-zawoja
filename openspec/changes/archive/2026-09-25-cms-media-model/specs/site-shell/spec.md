## MODIFIED Requirements

### Requirement: Page Header
Subpages SHALL open with the Page Header from design node `E3j9wx` (460px tall on desktop) and `V8PYt` (400px on mobile). It shows a translated eyebrow, title and intro over the page's header photo from the CMS, resolved for the current season, under the design's dark gradient. It SHALL fall back to `bg-dark` only when the page's header slot is empty.

#### Scenario: Interiors header copy
- **WHEN** `/pl/interiors` renders
- **THEN** the header shows the eyebrow "WNĘTRZA", the title "Dom z duszą, pokój po pokoju" and the intro from `q2jEWP`

#### Scenario: Header photo from the CMS
- **WHEN** `/en/surroundings` renders with the seeded dataset in summer
- **THEN** the header background is the photo made from `zimowy-widok2-800x800.jpg`, with English alt text, and it loads with priority
