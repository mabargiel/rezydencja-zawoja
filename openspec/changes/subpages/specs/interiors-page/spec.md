## ADDED Requirements

### Requirement: Room-by-room tour
Below its Page Header, the Wnętrza page SHALL show one section per entry in `interiorsPage.rooms`, in CMS order. Each section has the room's translated name as eyebrow, a title, a short body, 2–3 key facts, and a mosaic of that room's photos, with the first photo as the large tile. The layout SHALL match the approved Wnętrza design in `design/rezydencja.pen` at 1440px and 390px.

#### Scenario: Seeded rooms in order
- **WHEN** `/pl/interiors` renders with the seeded dataset
- **THEN** the sections appear as Salon, Sypialnie, Łazienki, Kuchnia, Rozrywka, Detale, each with its own photos

#### Scenario: CMS controls rooms
- **WHEN** an editor removes the Kuchnia room from `interiorsPage.rooms` and publishes
- **THEN** a fresh load shows no Kuchnia section and no Kuchnia entry in the room navigation, without a redeploy

#### Scenario: Room photo opens the lightbox
- **WHEN** a visitor activates the second photo of the Salon mosaic
- **THEN** the lightbox opens on that photo and previous/next moves only through the Salon photos

### Requirement: Bedroom cards
The Sypialnie section SHALL show one card per entry in `interiorsPage.bedrooms`, with its photo (or a neutral tile when the bedroom has none yet), localized name, localized bed setup, and guest count shown as a number next to a person icon. The cards form a row on desktop and scroll horizontally on mobile.

#### Scenario: Bedroom card content
- **WHEN** a bedroom has name "Sypialnia 1", beds "łóżko podwójne" and 2 guests
- **THEN** its card shows the photo, "Sypialnia 1", "łóżko podwójne" and "2" with a person icon, and the icon has a translated accessible label

### Requirement: Room navigation always within reach
The page SHALL show a row of room chips (one per room present, in CMS order) below the Page Header, linking to each room section. At 1024px and up, once that row has scrolled out of view, a compact room rail SHALL appear fixed on the right edge of the viewport, and SHALL hide again when the row is back in view or the room sections have ended. Below 1024px, the chip row SHALL stick below the navbar instead. The room crossing the middle of the viewport SHALL be highlighted with `aria-current="location"` in whichever navigation is visible.

#### Scenario: Desktop rail appears while scrolling
- **WHEN** a visitor at 1440px scrolls down until the chip row leaves the viewport
- **THEN** the right-side rail appears, and clicking "Łazienki" in it scrolls to the Łazienki section below the navbar

#### Scenario: Active room follows scrolling
- **WHEN** the Sypialnie section crosses the middle of the viewport
- **THEN** "Sypialnie" is highlighted with `aria-current="location"` and no other room is

#### Scenario: Mobile sticky row
- **WHEN** a visitor at 390px scrolls through the rooms
- **THEN** the chip row stays pinned below the navbar and the active chip is scrolled into view within the row

#### Scenario: Works without JavaScript
- **WHEN** the page loads with JavaScript disabled
- **THEN** the chip row is visible and its links jump to each room section
