## ADDED Requirements

### Requirement: Interiors feature rows
Below its Page Header, the Wnętrza page SHALL show 4 feature rows in this order: living room, antique furniture, bedrooms, and bathrooms. Each row has an eyebrow, a title, body text and a CMS photo. The first three rows also have 3 bullet points. Rows alternate photo sides on desktop (starting with the photo on the left) and stack photo-first on mobile, matching `zQWfy` and `P8SWn`.

#### Scenario: Polish rows
- **WHEN** `/pl/interiors` renders
- **THEN** the row titles read "Widokowy salon z kominkiem", "Kolekcja z minionych stuleci", "Pięć indywidualnych sypialni" and "Wygoda w każdym detalu", and the last row has no bullet list

#### Scenario: Row photos from the CMS
- **WHEN** `/en/interiors` renders with the seeded dataset in summer
- **THEN** the rows show the `livingRoom`, `antiques`, `bedrooms` and `comfort` slot photos with English alt text

### Requirement: Relaxation band
The Wnętrza page SHALL show a dark band with the eyebrow "Rozrywka i fitness", a title, body text and the two `relaxation` photos, matching `R7tmq7` (desktop) and `la8hF` (mobile).

#### Scenario: Two photos
- **WHEN** the relaxation band renders
- **THEN** it shows exactly the two photos from `interiorsPage.relaxation`, in CMS order

### Requirement: Details row
The Wnętrza page SHALL end its body with a "Detale" heading and the four `details` photos in a row on desktop and a 2×2 grid on mobile, matching `X8zj38` and `I0Ck5D`.

#### Scenario: Four details
- **WHEN** the details row renders
- **THEN** it shows the four `interiorsPage.details` photos in CMS order
