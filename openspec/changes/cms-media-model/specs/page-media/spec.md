## ADDED Requirements

### Requirement: Page media singletons
The dataset SHALL contain one document each for `homePage`, `interiorsPage`, `surroundingsPage`, `galleryPage` and `contactPage`, at those fixed IDs, with these slots:
- `homePage`: `hero` (video slot with poster), `intro.house`, `intro.detail`, `spa.saltGrotto`, `spa.hotTub`, `spa.sauna`, `interiors`, `location`, `galleryPreview` (up to 4 photos);
- `interiorsPage`: `header`, `livingRoom`, `antiques`, `bedrooms`, `comfort`, `relaxation` (exactly 2), `details` (exactly 4);
- `surroundingsPage`: `header`, `babiaGora`, `slopes`, `trails`, `waterfalls`;
- `galleryPage`: `header`, `photos` (ordered);
- `contactPage`: `header`, `map`.

#### Scenario: Wrong number of detail photos
- **WHEN** an editor puts 3 photos in `interiorsPage.details`
- **THEN** the Studio blocks publishing with a validation error

### Requirement: Seed reproduces the design
The seed SHALL fill every slot with the photo the design shows in that position, and the gallery with the design's 16 photos in the design's order.

#### Scenario: Interiors header photo
- **WHEN** the seeded `interiorsPage.header` is queried
- **THEN** it references the photo made from `apartament-zabytkowy-kredens5.jpg`

#### Scenario: Gallery order
- **WHEN** the seeded `galleryPage.photos` is queried
- **THEN** the first three photos come from `salon-widok2-2048x1152.jpg`, `Sypialnia406.jpg` and `grill01.jpeg`

### Requirement: Typed, cached queries
The app SHALL fetch page media with `defineQuery` queries whose result types come from Sanity TypeGen, through `defineLive`, so published changes appear without a redeploy. The generated types SHALL be committed, and CI SHALL fail when they're out of date.

#### Scenario: Stale types
- **WHEN** a query changes and `npm run typegen` isn't re-run
- **THEN** CI fails at the TypeGen freshness step

### Requirement: Optimized image rendering
Photos SHALL render through a `SanityImage` component that requests a CDN image cropped around the hotspot at the rendered size, in an automatic format, with a blur placeholder from the image's LQIP.

#### Scenario: Header image request
- **WHEN** the Interiors header renders at 1440px wide
- **THEN** the image is served from `cdn.sanity.io/images/oavmm529/production/` with width and crop parameters, and has a blur placeholder
