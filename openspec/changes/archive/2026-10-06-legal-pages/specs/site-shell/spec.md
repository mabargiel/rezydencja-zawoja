## MODIFIED Requirements

### Requirement: Footer
Every page SHALL end with the Footer from design node `vgRjs` (desktop) and `O6EcDO` (mobile). It has the logo, translated address, the phone as a `tel:` link, the email as a `mailto:` link, the nav links, a copyright line with the current year, and translated links to the privacy policy and the rental terms next to the copyright. Links to pages that don't exist yet SHALL be left out.

#### Scenario: Contact links
- **WHEN** the footer renders
- **THEN** "+48 500 290 390" links to `tel:+48500290390` and "biuro@rezydencjazawoja.pl" links to `mailto:biuro@rezydencjazawoja.pl`

#### Scenario: Legal links
- **WHEN** the footer renders on `/en/gallery`
- **THEN** it links to `/en/privacy-policy` and `/en/rental-terms` with English labels
