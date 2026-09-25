# cms-editing Specification

## Purpose
TBD - created by archiving change cms-media-model. Update Purpose after archive.
## Requirements
### Requirement: Polish Studio
The Studio SHALL use the Polish UI translation, and every schema type, field and structure item SHALL have a Polish title.

#### Scenario: Editor opens the Studio
- **WHEN** the owner opens https://rezydencja-zawoja.sanity.studio
- **THEN** the navigation, actions and field labels are in Polish

### Requirement: Studio structure with singletons
The Studio desk SHALL list, in order: Sezon (site settings), Strony (the 5 page singletons), Cennik, and Biblioteka zdjęć (photos). Singletons SHALL open their fixed-ID document directly and SHALL NOT be creatable from "new document".

#### Scenario: No duplicate singletons
- **WHEN** an editor opens the "new document" menu
- **THEN** only `photo` can be created

### Requirement: Idempotent seed script
`cms/scripts/seed.ts` SHALL upload the design's photos, create the photo documents with drafted PL/EN/DE alt text and categories, and create every singleton and the pricing from the design. It uses deterministic document IDs, so running it twice leaves the same dataset.

#### Scenario: Re-running the seed
- **WHEN** the seed runs twice
- **THEN** the dataset has the same number of photo documents and image assets as after the first run

