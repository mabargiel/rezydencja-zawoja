## ADDED Requirements

### Requirement: Inquiry fields
The inquiry form SHALL have these labelled fields:
- name (required);
- phone (optional);
- email (required);
- arrival and departure dates (optional);
- adults (1–10, default 2) and children (0–10, default 0);
- an optional message;
- a required consent checkbox.

It SHALL also have a submit button. Labels, placeholders and the consent text SHALL be translated, and the layout SHALL match the approved design.

#### Scenario: Labels in English
- **WHEN** the form renders on `/en/contact`
- **THEN** the fields are labelled in English and the button reads "Send inquiry"

### Requirement: Prefill from the booking bar
When the page is opened with `arrival`, `departure` or `guests` query parameters, the form SHALL prefill arrival, departure and adults with them. Values that are malformed, in the past, or out of range SHALL be ignored. The page SHALL remain static, so the prefill happens in the browser.

#### Scenario: Booking bar hand-off
- **WHEN** a visitor opens `/de/contact?arrival=2026-12-12&departure=2026-12-16&guests=6`
- **THEN** arrival shows 12.12.2026, departure 16.12.2026 and adults 6

#### Scenario: Bad parameters
- **WHEN** a visitor opens `/pl/contact?arrival=yesterday&guests=40`
- **THEN** arrival stays empty and adults keeps its default

### Requirement: Server-side validation
The server SHALL validate every submission and reject it with per-field errors when:
- the name is missing or too long;
- the email is invalid;
- the phone has characters other than digits, spaces and `+ ( ) -`;
- departure isn't after arrival, or arrival is in the past;
- there are more than 10 guests in total;
- the message exceeds 2000 characters;
- consent is not given.

The form SHALL show each error next to its field in the current language, and SHALL keep the entered values.

#### Scenario: Missing consent
- **WHEN** a visitor submits a valid form without ticking consent
- **THEN** no email is sent, an error appears next to the checkbox, and the other fields keep their values

#### Scenario: Dates in the wrong order
- **WHEN** departure is the same day as or before arrival
- **THEN** the departure field shows a date-order error

### Requirement: Delivery by email through Resend
A valid submission SHALL send one plain-text email through Resend:
- **from** the configured `CONTACT_FROM_EMAIL`;
- **to** `CONTACT_TO_EMAIL` when set, otherwise the site email;
- **reply-to** the guest's email;
- **subject** with the dates, the guest count and the name;
- **body** listing every field with Polish labels and the language of the page it was sent from.

The API key SHALL only be read on the server.

#### Scenario: Owner replies
- **WHEN** the owner presses Reply on an inquiry
- **THEN** the reply is addressed to the guest's email

#### Scenario: Language noted
- **WHEN** a guest sends the form from `/en/contact`
- **THEN** the email body states that the inquiry came from the English site

### Requirement: Sent and failed states
After a successful send, the form SHALL be replaced by a translated confirmation with a way to send another inquiry, and the confirmation SHALL be announced to screen readers. If sending fails or the email service isn't configured, the form SHALL keep the values and show an error that offers the phone number and email as alternatives. The submit button SHALL show a sending state and SHALL be disabled while a submission is in progress.

#### Scenario: Success
- **WHEN** a valid inquiry is sent
- **THEN** the confirmation replaces the form and focus moves to it

#### Scenario: Resend outage
- **WHEN** Resend returns an error
- **THEN** the visitor sees the failure message with the phone and email, and the form keeps their input

### Requirement: Works without JavaScript
The form SHALL submit, validate and show the error and success states without JavaScript.

#### Scenario: No JavaScript
- **WHEN** JavaScript is disabled and a visitor submits a valid inquiry
- **THEN** the email is sent and the page shows the confirmation

### Requirement: Spam protection
The form SHALL include a hidden honeypot field that is excluded from the accessibility tree and from tab order. A submission with the honeypot filled SHALL be reported as sent without sending any email.

#### Scenario: Bot submission
- **WHEN** a submission arrives with the honeypot filled
- **THEN** no email is sent and the response looks like a success
