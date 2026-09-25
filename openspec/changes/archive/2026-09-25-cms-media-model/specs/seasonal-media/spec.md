## ADDED Requirements

### Requirement: Site-wide season setting
A `siteSettings` singleton SHALL hold `season`, one of `summer` or `winter`, defaulting to `summer`. It SHALL be the first item in the Studio.

#### Scenario: Default season
- **WHEN** the dataset is seeded
- **THEN** `siteSettings.season` is `summer`

### Requirement: Seasonal slot resolution
Every image slot SHALL have a required default photo and an optional winter photo, and the hero video slot SHALL have a required default video and an optional winter video. When the season is `winter` and a winter variant exists, the app SHALL show it; otherwise it SHALL show the default.

#### Scenario: Winter with a variant
- **WHEN** the season is `winter` and the Interiors header slot has a winter photo
- **THEN** `/pl/interiors` shows the winter photo

#### Scenario: Winter without a variant
- **WHEN** the season is `winter` and the Contact header slot has no winter photo
- **THEN** `/pl/contact` shows the default photo

#### Scenario: Switching takes effect without a deploy
- **WHEN** an editor publishes `season: winter`
- **THEN** a fresh page load shows the winter variants, without a redeploy
