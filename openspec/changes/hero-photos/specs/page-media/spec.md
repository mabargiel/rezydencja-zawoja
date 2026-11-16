## MODIFIED Requirements

### Requirement: Page media singletons
The dataset SHALL contain one document each for `homePage`, `interiorsPage`, `surroundingsPage`, `galleryPage` and `contactPage`, at those fixed IDs, with these fields:
- `homePage`: `heroDesktop`, `heroMobile`, `intro.house`, `intro.detail`, `spa.saltGrotto`, `spa.hotTub`, `spa.sauna`, `interiors`, `location`, `galleryPreview` (up to 4 photos);
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
