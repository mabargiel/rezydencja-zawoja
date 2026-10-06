## ADDED Requirements

### Requirement: Home sections in design order
The Home page SHALL render, in order: Hero with Booking Bar, Intro, SPA, Interiors teaser, Location panorama, Gallery preview, Pricing, and Booking CTA, followed by the shared Footer. Each section matches its desktop (`iq1tP`) and mobile (`YCfBW`) design at 1440px and 390px.

#### Scenario: Section order
- **WHEN** `/pl` renders
- **THEN** the sections appear in the order above, and the section headings read "Odskocznia od codzienności", "Atrakcje na miejscu i SPA", "Dom z duszą", "Magiczne widoki przez cały rok", "Zajrzyj do środka", "Dom w całości, jasne zasady" and "Góry, cisza i dom tylko dla Was"

#### Scenario: Translated page
- **WHEN** `/de` renders
- **THEN** every section heading, body text, label and link is German, and no Polish copy from the catalogs appears

### Requirement: CMS photos in every section
Every photo on Home SHALL come from the `homePage` slots, resolved for the current season, with localized alt text:
- `intro.house` and `intro.detail` in Intro;
- `spa.saltGrotto`, `spa.hotTub` and `spa.sauna` in the SPA cards;
- `interiors` in the teaser;
- `location` as the panorama background;
- `galleryPreview` in the Gallery preview.

#### Scenario: Seeded Home photos
- **WHEN** `/en` renders with the seeded dataset in summer
- **THEN** the SPA cards show the photos made from `Grota3-1-480x650.jpg`, `bania-wieczorem.jpg` and `IMG_3178-480x650.jpeg`, in that order, with English alt text

### Requirement: SPA features and amenities
The SPA section SHALL show three Feature Cards (salt grotto, hot tub, sauna) with the Lucide icons `gem`, `waves` and `flame`. It SHALL also show six amenity rows (salt-water jacuzzi, billiard room, fitness room, living room with fireplace, viewing terrace, garden grill) with the icons `droplets`, `circle-dot`, `dumbbell`, `flame`, `binoculars` and `cooking-pot`, on the dark background.

#### Scenario: Amenities listed
- **WHEN** the SPA section renders in Polish
- **THEN** it lists "Jacuzzi ze słoną wodą", "Pokój bilardowy", "Sala fitness", "Widokowy salon z kominkiem", "Taras widokowy" and "Ogrodowy grill"

### Requirement: Location facts
The Location section SHALL show the panorama photo under a dark scrim, the heading and body, and five facts: Babia Góra trails, mountain waterfalls, ski lifts, cycling routes, and 100 km from Kraków.

#### Scenario: Readable over the photo
- **WHEN** the Location section renders
- **THEN** its text uses the inverse colours over the scrim, and the body text contrast against the scrimmed photo is at least 4.5:1

### Requirement: Section links
Home links SHALL go to existing pages in the current language:
- "Poznaj dom" and "Zobacz wnętrza" to `/{lng}/interiors`;
- "Pełna galeria" to `/{lng}/gallery`;
- "Sprawdź terminy" and "Napisz do nas" to `/{lng}/contact`.

The Pricing section SHALL have `id="pricing"`.

#### Scenario: Cennik link scrolls to pricing
- **WHEN** a visitor on `/en/interiors` clicks "Prices" in the navbar
- **THEN** they land on `/en#pricing` with the pricing heading visible below the navbar
