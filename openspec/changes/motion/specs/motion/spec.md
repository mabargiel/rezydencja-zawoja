## ADDED Requirements

### Requirement: Reveal on scroll
Section headings, text blocks, images, cards, table rows and gallery tiles SHALL fade in and rise by at most 24px as they enter the viewport, with siblings staggered. The reveal SHALL be driven by CSS scroll-driven animations without client JavaScript. Content that's already in view when the page loads SHALL render in its final state. In browsers without scroll-driven animations, content SHALL be fully visible without animation. The hero, navbar and footer SHALL NOT use reveals.

#### Scenario: Scrolling Home
- **WHEN** a visitor using Chrome or Safari scrolls the Home page down to the Spa section
- **THEN** its heading and photos fade and rise into place as they enter the viewport

#### Scenario: Unsupported browser
- **WHEN** a browser without `animation-timeline: view()` loads any page
- **THEN** every section's content is visible at full opacity with no transform

#### Scenario: No layout shift
- **WHEN** a page is measured with Lighthouse
- **THEN** the reveals add no cumulative layout shift

### Requirement: Page header entrance
Subpage headers SHALL play a one-time entrance on load: the photo settles from a slight zoom, and the eyebrow, title and intro ease up in a short stagger.

#### Scenario: Opening Galeria
- **WHEN** `/pl/gallery` loads
- **THEN** the header photo settles to its resting scale and the title block eases up within about a second

### Requirement: Dialog transitions
The mobile menu and the lightbox SHALL animate when opening and closing: the menu fades and slides in, and the lightbox fades in with a slight scale. Moving between lightbox photos SHALL cross-fade. Where the browser can't animate dialogs, they SHALL open and close instantly, as before.

#### Scenario: Lightbox navigation
- **WHEN** a visitor presses the right arrow in the lightbox
- **THEN** the current photo cross-fades to the next one

### Requirement: Hover feedback
Photo tiles that link or open the lightbox SHALL zoom slightly on hover, and primary and outline buttons SHALL nudge their arrow on hover, matching the existing text links and gallery tiles.

#### Scenario: Feature card hover
- **WHEN** a pointer hovers a Home feature card
- **THEN** its photo scales up slightly within its frame

### Requirement: Consistent motion tokens
All animations and transitions SHALL use the shared easing curve and duration tokens defined in `globals.css`, and SHALL animate only `opacity` and `transform`.

#### Scenario: Token use
- **WHEN** the stylesheet is reviewed
- **THEN** every new keyframe animation and transition uses `--ease-out-soft` and one of `--duration-fast`, `--duration-base` or `--duration-slow`

### Requirement: Reduced motion
With `prefers-reduced-motion: reduce`, no reveal, entrance, hover zoom or dialog movement SHALL run. Content SHALL appear immediately in its final state.

#### Scenario: Reduced motion
- **WHEN** any page loads with `prefers-reduced-motion: reduce` and the visitor scrolls, hovers and opens the lightbox
- **THEN** nothing moves or fades, and all content is visible
