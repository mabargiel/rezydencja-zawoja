## MODIFIED Requirements

### Requirement: Page media singletons
The dataset SHALL contain one document each for `homePage`, `interiorsPage`, `surroundingsPage`, `galleryPage` and `contactPage`, at those fixed IDs, with these fields:
- `homePage`: `hero` (video slot with poster), `intro.house`, `intro.detail`, `spa.saltGrotto`, `spa.hotTub`, `spa.sauna`, `interiors`, `location`, `galleryPreview` (up to 4 photos);
- `interiorsPage`: `header`; `rooms`, an ordered list of rooms, each with a unique `type` (`salon`, `kitchen`, `bedrooms`, `recreation` or `bathrooms`) and 1–16 ordered photo references; and `bedrooms`, an ordered list of bedrooms, each with a localized `name`, a localized `beds` description, `guests` (1–4) and 1–12 ordered photo references;
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
The seed SHALL fill every slot with the photo the design shows in that position, and the gallery with the design's 16 photos in the design's order. For `interiorsPage` it SHALL import the room photos from the old site (rezydencjazawoja.pl) into the photo library with PL/EN/DE alt text, reusing photos the library already has. It SHALL create five rooms in the old site's order (Salon, Kuchnia, Sypialnie, Rozrywka, Łazienki) with the old site's photo grouping, and five bedrooms with the old site's names, bed setups (2 guests each) and photos.

#### Scenario: Interiors header photo
- **WHEN** the seeded `interiorsPage.header` is queried
- **THEN** it references the photo made from `apartament-zabytkowy-kredens5.jpg`

#### Scenario: Seeded rooms
- **WHEN** the seeded `interiorsPage.rooms` is queried
- **THEN** it has five rooms in the order salon, kitchen, bedrooms, recreation, bathrooms, and every photo reference resolves

#### Scenario: Seeded bedrooms
- **WHEN** the seeded `interiorsPage.bedrooms` is queried
- **THEN** the first bedroom is "Apartament" with 7 photos including the antique cabinet, and bedrooms 3 and 4 have "Dwa łóżka pojedyncze"

#### Scenario: Gallery order
- **WHEN** the seeded `galleryPage.photos` is queried
- **THEN** the first three photos come from `salon-widok2-2048x1152.jpg`, `Sypialnia406.jpg` and `grill01.jpeg`
