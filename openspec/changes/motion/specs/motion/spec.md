## ADDED Requirements

### Requirement: Reveal on scroll
Section headings, text columns, photo frames and cards SHALL slide in from the left or right (at most 64px) and fade in as they enter the viewport. Text beside a photo SHALL come from the opposite side to the photo, and siblings SHALL be staggered. Grids where a side doesn't make sense (gallery masonry, key facts) SHALL rise by at most 40px instead. Reveals SHALL work in current Chrome, Safari and Firefox. Content SHALL be visible without JavaScript, content already in view when the page loads SHALL never be hidden, and reveals SHALL NOT cause horizontal scrolling. The hero, navbar and footer SHALL NOT use reveals.

#### Scenario: Scrolling Home
- **WHEN** a visitor in Chrome or Firefox scrolls the Home page down to the Intro section
- **THEN** its heading slides in from the left and its text from the right as they enter the viewport

#### Scenario: Without JavaScript
- **WHEN** a page loads with JavaScript disabled
- **THEN** every section's content is visible at full opacity with no transform

#### Scenario: No horizontal scroll on mobile
- **WHEN** a page is viewed at 390px wide before any section has revealed
- **THEN** the page can't be scrolled horizontally

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

### Requirement: Smooth photo loading
Every CMS photo SHALL show its blurred placeholder until it loads and then sharpen smoothly, without an abrupt swap from blurred to sharp. The transition SHALL NOT wait for client JavaScript to hydrate, SHALL NOT hide the image (so LCP is measured as without the effect), and photos SHALL display normally without JavaScript.

#### Scenario: Panorama on a slow connection
- **WHEN** a visitor scrolls to the Home "Malownicza lokalizacja" section on a slow connection
- **THEN** the panorama shows blurred until it loads, then sharpens over about 0.7 seconds

#### Scenario: LCP unchanged
- **WHEN** Lighthouse measures Home, Galeria and Okolica before and after this change
- **THEN** LCP is within run-to-run variance of the baseline
