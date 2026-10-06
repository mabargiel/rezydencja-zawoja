## MODIFIED Requirements

### Requirement: Poster first and LCP
The hero SHALL render the `hero.poster` photo as a priority image before the video loads, so the poster is the page's largest contentful paint and the page is complete without the video. The hero SHALL load without visible flashes:
1. the poster's blurred placeholder shows first;
2. the sharp poster fades in over it once loaded;
3. the video fades in over the poster only once it is playing.

The video SHALL stay invisible until it plays. The eyebrow, headline, intro and booking bar SHALL ease in with a short stagger.

#### Scenario: Video fails to load
- **WHEN** the video request fails
- **THEN** the hero still shows the poster photo with the headline over it

#### Scenario: Slow connection
- **WHEN** `/pl` loads on a throttled connection
- **THEN** the hero goes from the dark background to the blurred placeholder, then to the sharp poster, then to the video, each step a fade with no black frame or abrupt swap

#### Scenario: LCP unchanged
- **WHEN** Lighthouse measures `/pl` before and after this change
- **THEN** the LCP element is still the poster image, and LCP doesn't get worse
