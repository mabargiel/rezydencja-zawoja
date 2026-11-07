## ADDED Requirements

### Requirement: Art-directed hero photo
The Home hero SHALL show `homePage.heroDesktop` from the `lg` breakpoint up and `homePage.heroMobile` below it, full-bleed at the design heights (900px desktop, 640px mobile), under the design's gradient, with the eyebrow, headline and subhead. A browser SHALL download only the image for its breakpoint. If one slot has no photo, the hero SHALL use the other.

#### Scenario: Phone
- **WHEN** `/pl` loads at 390px wide
- **THEN** the hero shows the mobile photo and no desktop photo is requested

#### Scenario: Desktop
- **WHEN** `/pl` loads at 1440px wide
- **THEN** the hero shows the desktop photo and no mobile photo is requested

### Requirement: Hero loading
The hero photo SHALL be in the initial HTML with high fetch priority and SHALL be the page's largest contentful paint. It SHALL show the blurred placeholder for its breakpoint first, then sharpen smoothly when it loads. The eyebrow, headline, intro and booking bar SHALL ease in with a short stagger, and SHALL NOT animate under reduced motion.

#### Scenario: Slow connection
- **WHEN** `/pl` loads on a throttled connection
- **THEN** the hero goes from the blurred placeholder to the sharp photo with no abrupt swap

### Requirement: Text legibility
The hero text SHALL meet WCAG contrast over the photo at 390, 1440, 1920 and 2560px wide: at least 3:1 for the headline and at least 4.5:1 for the intro. The eyebrow SHALL reach at least 3:1, measured against the brightest 3% of the background behind it.

#### Scenario: Bright sky behind the eyebrow
- **WHEN** the eyebrow sits over the brightest part of the sky at 1440px wide
- **THEN** its contrast with the background is at least 3:1
