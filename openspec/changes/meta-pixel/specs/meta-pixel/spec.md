## ADDED Requirements

### Requirement: Pixel only after consent
The Meta Pixel with `tracking.pixelId` SHALL load only when tracking is active and the visitor has accepted. Before that, the page SHALL make no request to Meta.

#### Scenario: Accept
- **WHEN** a visitor chooses "Akceptuję"
- **THEN** `fbevents.js` loads once, the pixel is initialised with `1207988243645288`, and a `PageView` is sent

### Requirement: PageView on every page
With the pixel loaded, every page view SHALL send one `PageView`, including navigation between pages without a full reload.

#### Scenario: Client navigation
- **WHEN** a visitor who accepted goes from `/pl` to `/pl/interiors` through the navbar
- **THEN** exactly one more `PageView` is sent

### Requirement: Lead on a sent inquiry
With the pixel loaded, a successfully sent contact form SHALL send one `Lead` event. No form field values SHALL be sent to Meta.

#### Scenario: Inquiry sent
- **WHEN** a visitor who accepted sends the contact form and sees the confirmation
- **THEN** one `Lead` event is sent, with no name, email, phone or message

### Requirement: Contact on call or email
With the pixel loaded, clicking any `tel:` or `mailto:` link SHALL send a `Contact` event.

#### Scenario: Call from the hero
- **WHEN** a visitor who accepted taps "Zadzwoń" in the hero
- **THEN** one `Contact` event is sent and the phone call starts as usual
