## MODIFIED Requirements

### Requirement: Inquiry fields
The inquiry form SHALL have these labelled fields:
- name (required);
- phone (optional);
- email (required);
- arrival and departure dates (optional);
- adults (1–10, default 2) and children (0–10, default 0);
- an optional message;
- a required consent checkbox, whose label links to the privacy policy in the current language, opening in a new tab.

It SHALL also have a submit button. Labels, placeholders and the consent text SHALL be translated, and the layout SHALL match the approved design.

#### Scenario: Labels in English
- **WHEN** the form renders on `/en/contact`
- **THEN** the fields are labelled in English and the button reads "Send inquiry"

#### Scenario: Consent link
- **WHEN** a visitor activates the link in the consent label on `/de/contact`
- **THEN** `/de/privacy-policy` opens in a new tab and the checkbox state doesn't change
