# i18n-routing Specification

## Purpose
TBD - created by archiving change i18n-and-shell. Update Purpose after archive.
## Requirements
### Requirement: Language-prefixed routes
Every page SHALL be served under exactly one of `/pl`, `/en` or `/de`, and the root layout SHALL set `<html lang>` to that language.

#### Scenario: Prefixed page renders in its language
- **WHEN** a visitor requests `/de/interiors`
- **THEN** the response is 200, `<html lang="de">`, and the navigation labels are German

#### Scenario: Unsupported prefix
- **WHEN** a visitor requests `/fr/interiors`
- **THEN** the proxy redirects to a supported language, because `fr` isn't treated as a language segment

### Requirement: Language detection on unprefixed paths
A request to a path without a supported language prefix SHALL be redirected (307) to the same path under a language chosen in this order: a valid `lng` cookie, then the best `Accept-Language` match among `pl`, `en` and `de`, then `en`. Query strings SHALL be preserved.

#### Scenario: Polish browser
- **WHEN** a visitor with `Accept-Language: pl-PL,pl;q=0.9,en;q=0.8` and no cookie requests `/`
- **THEN** they are redirected to `/pl`

#### Scenario: German browser on a deep link
- **WHEN** a visitor with `Accept-Language: de-AT,de;q=0.9` requests `/gallery?x=1`
- **THEN** they are redirected to `/de/gallery?x=1`

#### Scenario: Unsupported browser language
- **WHEN** a visitor with `Accept-Language: sk-SK,sk;q=0.9` and no cookie requests `/`
- **THEN** they are redirected to `/en`

#### Scenario: Cookie wins over the browser
- **WHEN** a visitor with cookie `lng=de` and `Accept-Language: pl` requests `/`
- **THEN** they are redirected to `/de`

#### Scenario: Static files are not redirected
- **WHEN** a browser requests `/brand/logo-light.svg` or `/_next/static/...`
- **THEN** the proxy doesn't redirect

### Requirement: Remembered language choice
Visiting a prefixed path SHALL set the `lng` cookie to that language (1-year max-age, `SameSite=Lax`) when it differs from the current cookie.

#### Scenario: Switching language is remembered
- **WHEN** a visitor on `/pl/interiors` follows the switcher to `/en/interiors` and later requests `/`
- **THEN** they are redirected to `/en`

### Requirement: SEO language alternates
Every page SHALL declare `<link rel="alternate" hreflang>` entries for `pl`, `en` and `de` pointing to the same page in each language, plus `x-default` pointing to the `en` version, and SHALL have a translated `<title>` and meta description.

#### Scenario: Alternates on a subpage
- **WHEN** the HTML of `/pl/gallery` is inspected
- **THEN** it has alternates for `/pl/gallery`, `/en/gallery`, `/de/gallery` and `x-default` → `/en/gallery`, and a Polish title

### Requirement: Complete, typed translation catalogs
UI text SHALL come from i18next catalogs for `pl`, `en` and `de`, where the Polish catalog is the source and the others must have exactly the same keys. A missing key or an unknown key passed to `t()` SHALL fail `npm run typecheck`.

#### Scenario: Missing German key
- **WHEN** a key exists in `pl` but not in `de`
- **THEN** `npm run typecheck` fails and names the missing key

#### Scenario: Typo in a key
- **WHEN** a component calls `t('nav.intriors')`
- **THEN** `npm run typecheck` fails

### Requirement: Translations render on the server
Translated text SHALL be rendered in Server Components. The client bundle SHALL NOT include i18next or the translation catalogs.

#### Scenario: No i18next in client chunks
- **WHEN** the production build's client JavaScript under `.next/static/chunks` is searched for the German nav label `Innenräume`
- **THEN** there are no matches

