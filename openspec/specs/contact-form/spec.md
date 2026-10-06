# contact-form Specification

## Purpose
The inquiry form: fields, prefill from the booking bar, validation, delivery through Resend with a guest confirmation, and spam protection.
## Requirements
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
A valid submission SHALL send two plain-text emails through Resend in one batch: the inquiry to the owner and a confirmation to the guest. If the batch fails, neither counts as sent and the form shows the failure state.

The owner email SHALL be sent:
- **from** the configured `CONTACT_FROM_EMAIL`;
- **to** `CONTACT_TO_EMAIL` when set, otherwise the site email;
- **reply-to** the guest's email;
- **subject** with the dates, the guest count and the name;
- **body** listing every field with Polish labels and the language of the page it was sent from.

The guest confirmation SHALL be sent:
- **from** `CONTACT_FROM_EMAIL`;
- **to** the email the guest entered;
- **reply-to** the site email (`biuro@rezydencjazawoja.pl`);
- **subject and body** in the language of the page the form was sent from.

The body SHALL thank the guest, say availability is confirmed the same day, repeat the dates and the guest counts, and give the phone and email.

The API key SHALL only be read on the server.

#### Scenario: Owner replies
- **WHEN** the owner presses Reply on an inquiry
- **THEN** the reply is addressed to the guest's email

#### Scenario: Language noted
- **WHEN** a guest sends the form from `/en/contact`
- **THEN** the owner email states that the inquiry came from the English site

#### Scenario: Guest confirmation
- **WHEN** a guest sends an inquiry from `/de/contact` for 12.12–16.12.2026, 4 adults and 1 child
- **THEN** they receive a German confirmation listing those dates and guests, and replying to it addresses `biuro@rezydencjazawoja.pl`

#### Scenario: No visitor text in the confirmation
- **WHEN** someone submits a stranger's address with a link in the name and message fields
- **THEN** the confirmation contains neither the name nor the message, only fixed copy, dates and guest counts

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

