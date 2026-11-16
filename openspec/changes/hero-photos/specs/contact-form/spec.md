## MODIFIED Requirements

### Requirement: Prefill from the booking bar
When the page is opened with `arrival`, `departure` or `guests` query parameters, for example from a link in an ad or a message, the form SHALL prefill arrival, departure and adults with them. Values that are malformed, in the past, or out of range SHALL be ignored. The page SHALL remain static, so the prefill happens in the browser.

#### Scenario: Booking bar hand-off
- **WHEN** a visitor opens `/de/contact?arrival=2026-12-12&departure=2026-12-16&guests=6`
- **THEN** arrival shows 12.12.2026, departure 16.12.2026 and adults 6

#### Scenario: Bad parameters
- **WHEN** a visitor opens `/pl/contact?arrival=yesterday&guests=40`
- **THEN** arrival stays empty and adults keeps its default
