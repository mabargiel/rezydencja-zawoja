## ADDED Requirements

### Requirement: Hero drone video
The Home hero SHALL play the `homePage.hero` video muted, looping and inline, full-bleed at the design heights (900px desktop, 640px mobile), under the design's gradient, with the eyebrow, headline and subhead. When the season is winter and a winter video exists, it SHALL play the winter video.

#### Scenario: Autoplay
- **WHEN** `/pl` loads in a browser that allows muted autoplay
- **THEN** the hero video starts playing without sound and loops

### Requirement: Poster first and LCP
The hero SHALL render the `hero.poster` photo as a priority image before the video loads, so the poster is the page's largest contentful paint and the page is complete without the video.

#### Scenario: Video fails to load
- **WHEN** the video request fails
- **THEN** the hero still shows the poster photo with the headline over it

### Requirement: Reduced motion
When the visitor prefers reduced motion, the hero SHALL NOT render or play the video and SHALL show the poster only.

#### Scenario: Reduced motion preference
- **WHEN** `/pl` loads with `prefers-reduced-motion: reduce`
- **THEN** no `<video>` element is playing and the poster is visible
