# hero-video Specification

## Purpose
TBD - created by archiving change landing-page. Update Purpose after archive.
## Requirements
### Requirement: Hero drone video
The Home hero SHALL play the `homePage.hero` video muted, looping and inline, full-bleed at the design heights (900px desktop, 640px mobile), under the design's gradient, with the eyebrow, headline and subhead. When the season is winter and a winter video exists, it SHALL play the winter video.

#### Scenario: Autoplay
- **WHEN** `/pl` loads in a browser that allows muted autoplay
- **THEN** the hero video starts playing without sound and loops

### Requirement: Poster first and LCP
The hero SHALL render the `hero.poster` photo as a priority image before the video loads, so the poster is the page's largest contentful paint and the page is complete without the video. The hero SHALL load without visible flashes:
1. the poster's blurred placeholder shows first;
2. when the poster loads, it sharpens from the blurred state without a swap;
3. the video fades in slowly (about 3 seconds) over the poster, only once it is playing.

The video SHALL stay invisible until it plays. The eyebrow, headline, intro and booking bar SHALL ease in with a short stagger.

#### Scenario: Video fails to load
- **WHEN** the video request fails
- **THEN** the hero still shows the poster photo with the headline over it

#### Scenario: Slow connection
- **WHEN** `/pl` loads on a throttled connection
- **THEN** the hero goes from the dark background to the blurred placeholder, then to the sharp poster, then to the video, each step a smooth transition with no black frame or abrupt swap

#### Scenario: LCP unchanged
- **WHEN** Lighthouse measures `/pl` before and after this change
- **THEN** the LCP element is still the poster image, and LCP doesn't get worse

### Requirement: Reduced motion
When the visitor prefers reduced motion, the hero SHALL NOT render or play the video and SHALL show the poster only.

#### Scenario: Reduced motion preference
- **WHEN** `/pl` loads with `prefers-reduced-motion: reduce`
- **THEN** no `<video>` element is playing and the poster is visible

