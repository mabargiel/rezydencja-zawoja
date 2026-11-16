## ADDED Requirements

### Requirement: Consent banner
When tracking is active (see "Studio control") and the visitor has no valid decision, every page SHALL show a cookie banner with a short translated explanation, a link to the privacy policy, and two equally prominent buttons, "Akceptuję" and "Odrzucam" (EN "Accept", "Reject"; DE "Akzeptieren", "Ablehnen"). It SHALL be keyboard accessible, SHALL NOT block the page behind it, and SHALL NOT appear when tracking is inactive.

#### Scenario: First visit
- **WHEN** a visitor opens `/pl` for the first time while tracking is active
- **THEN** the banner shows, and no request goes to `connect.facebook.net` or `facebook.com`

#### Scenario: Tracking switched off
- **WHEN** `tracking.enabled` is off
- **THEN** no banner shows on any page

### Requirement: Remembered decision
The decision SHALL be stored in the browser's localStorage, with its time and the pixel ID it applies to, and SHALL be remembered for `consentMonths` months. After that, or when the pixel ID changes, the banner SHALL ask again.

#### Scenario: Returning visitor
- **WHEN** a visitor who rejected cookies a month ago returns
- **THEN** no banner shows and the pixel doesn't load

#### Scenario: Expired decision
- **WHEN** a decision is older than `consentMonths`
- **THEN** the banner shows again

### Requirement: Changing the decision
The footer link "Ustawienia cookies" SHALL reopen the banner. Choosing Reject after an earlier Accept SHALL stop the pixel from that point on.

#### Scenario: Withdraw consent
- **WHEN** a visitor who accepted opens "Ustawienia cookies" and chooses "Odrzucam"
- **THEN** after the page reloads, no requests go to Meta

### Requirement: Studio control
A `tracking` document, "Pliki cookies i Piksel Meta", SHALL hold `enabled` (default off), `pixelId` (digits only, required when enabled), optional `activeFrom` and `activeUntil` datetimes, and `consentMonths` (1–24, default 12). Tracking SHALL be active only when enabled and the visitor's current time is within the dates that are set. Changes SHALL take effect without a redeploy.

#### Scenario: Scheduled start
- **WHEN** `enabled` is on and `activeFrom` is tomorrow
- **THEN** today no banner shows and no pixel loads, and from tomorrow the banner shows

#### Scenario: End date
- **WHEN** `activeUntil` has passed
- **THEN** no banner shows and the pixel doesn't load, even for visitors who accepted
