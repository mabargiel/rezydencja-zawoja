## ADDED Requirements

### Requirement: Surroundings intro
Below its Page Header, the Okolica page SHALL show an intro with the eyebrow "Beskid Żywiecki", a heading, a lead paragraph and body text, matching `d5VfA` (desktop) and `c6QbYA` (mobile).

#### Scenario: German intro
- **WHEN** `/de/surroundings` renders
- **THEN** the intro heading, lead and body are in German

### Requirement: Attractions
The Okolica page SHALL show 4 feature rows (Babia Góra, ski slopes, Babia Góra Trails, and waterfalls and chapels), each with an eyebrow, title, body, 3 bullets and its CMS photo, using the same feature row as Wnętrza and matching `fZVdb` and `a4wouB`.

#### Scenario: Attraction photos
- **WHEN** `/pl/surroundings` renders with the seeded dataset in summer
- **THEN** the rows show the photos made from `zimowy-spacer3.jpg`, `wyciag-krzeselkowy.jpeg`, `babia-gora-trails.jpg` and `okolica-promo.jpeg`, in that order

### Requirement: Key figures
The Okolica page SHALL show a dark band with four figures and labels: 100 km from Kraków, 1725 m Babia Góra summit, 20 km of cycling trails, and 18 km length of Zawoja. They're in a row with dividing rules on desktop (`nGbvs`) and a 2×2 grid on mobile (`a8QVU`).

#### Scenario: Figures render
- **WHEN** the key figures band renders in English
- **THEN** it shows "100 km", "1725 m", "20 km" and "18 km" with English labels
