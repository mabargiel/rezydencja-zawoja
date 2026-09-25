## ADDED Requirements

### Requirement: Photo documents
Every photo used on the site SHALL be a `photo` document holding one image with hotspot enabled, localized alt text for `pl`, `en` and `de`, and a gallery category of `interiors`, `spa`, `terraceGarden` or `surroundings`. Polish alt text SHALL be required, and missing English or German alt text SHALL show a validation warning.

#### Scenario: Missing Polish alt text
- **WHEN** an editor tries to publish a photo without Polish alt text
- **THEN** the Studio blocks publishing with a validation error

#### Scenario: Missing German alt text
- **WHEN** a photo has Polish and English alt text but no German
- **THEN** it can be published and the Studio shows a warning

### Requirement: Photos are reused by reference
Page slots and the gallery SHALL reference `photo` documents rather than embedding images, so a photo used in several places is stored and described once.

#### Scenario: One photo in four places
- **WHEN** the living-room photo is used in the Home intro, the Interiors living-room feature, the Gallery header and the gallery grid
- **THEN** there is exactly one `photo` document and one image asset for it

#### Scenario: Deleting a photo in use
- **WHEN** an editor tries to delete a photo referenced by a page
- **THEN** the Studio prevents the deletion and lists the documents that reference it

### Requirement: Localized alt text in the app
The app SHALL render each photo's alt text in the page's language, falling back to Polish when that language is missing.

#### Scenario: German page
- **WHEN** `/de/interiors` renders a photo with German alt text
- **THEN** the `<img alt>` is the German text

#### Scenario: Missing translation
- **WHEN** a photo has no English alt text and `/en/...` renders it
- **THEN** the `<img alt>` is the Polish text
