## MODIFIED Requirements

### Requirement: Spam protection
The form SHALL include a hidden honeypot field that is excluded from the accessibility tree and from tab order. A submission with the honeypot filled SHALL be reported as sent without sending any email.

In production, every submission SHALL count against a per-IP limit of 5 submissions per 10 minutes, enforced through the Vercel Firewall rule `contact-inquiry`. This includes invalid and honeypot submissions. A submission over the limit SHALL send no email. If the limit can't be checked (the rule is missing, the check fails or times out, or the site isn't running on Vercel), the submission SHALL be processed normally and the problem logged.

#### Scenario: Bot submission
- **WHEN** a submission arrives with the honeypot filled
- **THEN** no email is sent and the response looks like a success

#### Scenario: Sixth submission
- **WHEN** the same IP submits the form a sixth time within 10 minutes in production
- **THEN** no email is sent and the form shows the "too many attempts" message

#### Scenario: Rule not configured
- **WHEN** the `contact-inquiry` rule doesn't exist in the Vercel Firewall
- **THEN** valid inquiries are still sent, and the missing rule is logged

### Requirement: Sent and failed states
After a successful send, the form SHALL be replaced by a translated confirmation with a way to send another inquiry, and the confirmation SHALL be announced to screen readers. If sending fails or the email service isn't configured, the form SHALL keep the values and show an error that offers the phone number and email as alternatives. If the submission is over the rate limit, the form SHALL keep the values and show a translated "too many attempts" message, also with the phone number and email. The submit button SHALL show a sending state and SHALL be disabled while a submission is in progress.

#### Scenario: Success
- **WHEN** a valid inquiry is sent
- **THEN** the confirmation replaces the form and focus moves to it

#### Scenario: Resend outage
- **WHEN** Resend returns an error
- **THEN** the visitor sees the failure message with the phone and email, and the form keeps their input

#### Scenario: Rate limited
- **WHEN** a German visitor's submission is over the limit
- **THEN** they see the German "too many attempts" message with the phone and email, and the form keeps their input
