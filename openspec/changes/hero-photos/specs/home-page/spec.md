## MODIFIED Requirements

### Requirement: Home sections in design order
The Home page SHALL render, in order: Hero, Intro, SPA, Interiors teaser, Location panorama, Gallery preview, Pricing, and Booking CTA, followed by the shared Footer. Each section below the hero matches its desktop (`iq1tP`) and mobile (`YCfBW`) design at 1440px and 390px; the hero follows `hero-photo`.

#### Scenario: Section order
- **WHEN** `/pl` renders
- **THEN** the sections appear in the order above, and the section headings read "Odskocznia od codzienności", "Atrakcje na miejscu i SPA", "Dom z duszą", "Magiczne widoki przez cały rok", "Zajrzyj do środka", "Dom w całości, jasne zasady" and "Góry, cisza i dom tylko dla Was"

#### Scenario: Translated page
- **WHEN** `/de` renders
- **THEN** every section heading, body text, label and link is German, and no Polish copy from the catalogs appears
