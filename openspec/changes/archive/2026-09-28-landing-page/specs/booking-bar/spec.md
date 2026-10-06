## ADDED Requirements

### Requirement: Booking bar form
The hero SHALL contain the Booking Bar from `MB8Pv` (desktop) and `UedD7` (mobile): an arrival date, a departure date, a guests choice from 1 to 10, and a "Sprawdź termin" button, all labelled and translated. Arrival SHALL NOT accept past dates, and departure SHALL NOT accept dates before arrival when JavaScript is available.

#### Scenario: Labels
- **WHEN** the booking bar renders in English
- **THEN** its fields are labelled "Arrival", "Departure" and "Guests", and the button reads "Check availability"

### Requirement: Hand-off to the contact page
Submitting the booking bar SHALL navigate to `/{lng}/contact` with `arrival`, `departure` and `guests` as query parameters. This SHALL work without JavaScript.

#### Scenario: Submit with dates
- **WHEN** a visitor on `/de` picks 12.12.2026 to 16.12.2026 for 6 guests and submits
- **THEN** the browser navigates to `/de/contact?arrival=2026-12-12&departure=2026-12-16&guests=6`
