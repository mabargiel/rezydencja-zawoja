## MODIFIED Requirements

### Requirement: Page media singletons
The dataset SHALL contain one document each for `homePage`, `interiorsPage`, `surroundingsPage`, `galleryPage` and `contactPage`, at those fixed IDs, with these fields:
- `homePage`: `hero` (video slot with poster), `intro.house`, `intro.detail`, `spa.saltGrotto`, `spa.hotTub`, `spa.sauna`, `interiors`, `location`, `galleryPreview` (up to 4 photos);
- `interiorsPage`: `header`; `rooms`, an ordered list of rooms, each with a unique `type` (`salon`, `bedrooms`, `bathrooms`, `kitchen`, `recreation` or `details`) and 1–8 ordered photo references; and `bedrooms`, an ordered list of bedrooms, each with a localized `name`, a localized `beds` description, `guests` (1–4) and an optional photo reference;
- `surroundingsPage`: `header`, `babiaGora`, `slopes`, `trails`, `waterfalls`;
- `galleryPage`: `header`, `photos` (ordered);
- `contactPage`: `header`, `map`.

#### Scenario: Duplicate room type
- **WHEN** an editor adds a second `bedrooms` room to `interiorsPage.rooms`
- **THEN** the Studio blocks publishing with a validation error

#### Scenario: Room without photos
- **WHEN** an editor saves a room with no photos
- **THEN** the Studio blocks publishing with a validation error

### Requirement: Seed reproduces the design
The seed SHALL fill every slot with the photo the design shows in that position, and the gallery with the design's 16 photos in the design's order. For `interiorsPage` it SHALL create the six rooms in the order Salon, Sypialnie, Łazienki, Kuchnia, Rozrywka, Detale, each with its matching library photos. It SHALL also create five bedrooms with placeholder names and bed descriptions, to be replaced by the owner.

#### Scenario: Interiors header photo
- **WHEN** the seeded `interiorsPage.header` is queried
- **THEN** it references the photo made from `apartament-zabytkowy-kredens5.jpg`

#### Scenario: Seeded rooms
- **WHEN** the seeded `interiorsPage.rooms` is queried
- **THEN** it has six rooms, and the `bedrooms` room's photos come from `IMG_7886.jpeg`, `Sypialnia406.jpg`, `sypialnia413.jpg` and `sypialnia513.jpeg`

#### Scenario: Gallery order
- **WHEN** the seeded `galleryPage.photos` is queried
- **THEN** the first three photos come from `salon-widok2-2048x1152.jpg`, `Sypialnia406.jpg` and `grill01.jpeg`
