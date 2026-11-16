## ADDED Requirements

### Requirement: Art-directed hero photo
The Home hero SHALL show `homePage.heroDesktop` from the `lg` breakpoint up and `homePage.heroMobile` below it, at the full height of the viewport and at least 640px on mobile and 720px on desktop. On desktop the photo SHALL sit to the right of the text and fade out to the left into a sky-coloured background; on phones it SHALL sit below the text and fade out upward. A browser SHALL download only the image for its breakpoint. If one slot has no photo, the hero SHALL use the other.

#### Scenario: Phone
- **WHEN** `/pl` loads at 390px wide
- **THEN** the hero shows the mobile photo below the text and no desktop photo is requested

#### Scenario: Desktop
- **WHEN** `/pl` loads at 1440px wide
- **THEN** the hero shows the desktop photo to the right of the text with the roof in frame, and no mobile photo is requested

### Requirement: Hero content and calls to action
The hero SHALL show, left-aligned and translated, an eyebrow, the headline, a facts line, and two buttons: "Napisz do nas", linking to the contact page, and "Zadzwoń", a `tel:` link to the site phone number. The call button SHALL show the number from `lg` up. The hero SHALL NOT contain a date picker.

#### Scenario: Polish hero
- **WHEN** `/pl` renders
- **THEN** the headline reads "Dom Premium & SPA na wyłączność", the facts line reads "300 m² · 5 sypialni · do 10 osób", and the buttons link to `/pl/contact` and `tel:+48500290390`

### Requirement: Hero loading
The hero photo SHALL be in the initial HTML with high fetch priority and SHALL be the page's largest contentful paint. It SHALL show the blurred placeholder for its breakpoint first, then sharpen smoothly when it loads. The eyebrow, headline, facts line and buttons SHALL ease in with a short stagger, and SHALL NOT animate under reduced motion.

#### Scenario: Slow connection
- **WHEN** `/pl` loads on a throttled connection
- **THEN** the hero goes from the blurred placeholder to the sharp photo with no abrupt swap

### Requirement: Text legibility
The hero text SHALL meet WCAG contrast at 390, 1440 and 1920px wide: at least 3:1 for the headline and eyebrow, and at least 4.5:1 for the facts line and the nav.

#### Scenario: Eyebrow over the sky
- **WHEN** the eyebrow renders at 1440px wide
- **THEN** its contrast with the background behind it is at least 3:1
