## MODIFIED Requirements

### Requirement: Studio structure with singletons
The Studio desk SHALL list, in order: Sezon (site settings), Pliki cookies i Piksel Meta (tracking), Strony (the 5 page singletons and the legal pages), Cennik, and Biblioteka zdjęć (photos). Singletons SHALL open their fixed-ID document directly and SHALL NOT be creatable from "new document".

#### Scenario: No duplicate singletons
- **WHEN** an editor opens the "new document" menu
- **THEN** only `photo` can be created
