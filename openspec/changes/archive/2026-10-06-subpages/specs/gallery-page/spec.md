## ADDED Requirements

### Requirement: Gallery grid
Below its Page Header, the Galeria page SHALL show every photo in `galleryPage.photos`, in CMS order, as a masonry grid: 4 columns on desktop (`MyEiR`) and 2 on mobile (`mxnI3`). Columns fill top to bottom, and tiles use the design's repeating height pattern. All photos SHALL be present in the server-rendered HTML.

#### Scenario: Seeded gallery
- **WHEN** `/pl/gallery` renders with the seeded dataset
- **THEN** 20 photos appear (the design's 16 followed by 4 surroundings photos), the first being the photo made from `salon-widok2-2048x1152.jpg`, each with Polish alt text

#### Scenario: Without JavaScript
- **WHEN** the page loads with JavaScript disabled
- **THEN** all 20 photos are visible

### Requirement: Category filters
Above the grid, the page SHALL show filter chips for All, Interiors, Spa, Terrace & garden and Surroundings, translated and styled as in `LYvzh`. A category chip SHALL only appear when at least one gallery photo has that category. Selecting a chip SHALL show only photos of that category, mark the chip as pressed, and keep the masonry balanced. "All" SHALL be selected initially.

#### Scenario: Filter to spa
- **WHEN** a visitor selects "Strefa SPA"
- **THEN** only photos with category `spa` remain, the chip has `aria-pressed="true"`, and the other chips have `aria-pressed="false"`

### Requirement: Lightbox
Activating a gallery photo SHALL open it full-screen in a modal dialog matching the approved Lightbox design. It shows the photo uncropped, its alt text as a caption, a position counter, previous/next controls and a close control, all labelled in the page's language. Navigation SHALL stay within the currently filtered photos and wrap at the ends.

#### Scenario: Keyboard use
- **WHEN** a keyboard user opens photo 3 of 20, presses the right arrow, then Escape
- **THEN** photo 4 is shown with the counter "4 / 20", and after Escape the dialog closes with focus back on the photo that opened it

#### Scenario: Swipe on mobile
- **WHEN** a touch user swipes left on the open photo
- **THEN** the next photo is shown

#### Scenario: Filtered navigation
- **WHEN** the "Okolica" filter is active and the visitor opens its last photo and presses next
- **THEN** the lightbox shows the first "Okolica" photo, not a photo from another category
