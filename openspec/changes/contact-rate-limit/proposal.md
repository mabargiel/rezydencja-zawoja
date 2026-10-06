## Why

Every inquiry sends an email to an address the visitor types, so the form is an open door for abuse: a script could flood biuro@ or make the site mail confirmations to strangers. The honeypot only stops naive bots. A per-visitor limit on submissions caps the damage at a few emails, whatever the attacker does.

## What Changes

- **A rate limit on inquiries** through the Vercel Firewall: at most **5 submissions per IP address per 10 minutes**.
  - It's checked in the `sendInquiry` server action with `@vercel/firewall`, against a dashboard rule with the ID `contact-inquiry`.
  - Every submission counts, valid or not, honeypot included, so retrying invalid forms can't bypass it.
- **A "too many attempts" state**: when the limit is hit, nothing is sent. The form keeps the values and shows a translated message ("Za dużo prób, spróbujcie za kilka minut") with the phone and email, reusing the approved failure banner.
- **Fail open**: if the firewall check errors, the inquiry goes through and the error is logged. A misconfigured rule must never stop a real guest from booking. That covers the rule missing, a timeout, or running outside Vercel.
- **Owner step**: create the `contact-inquiry` rule in Vercel → Firewall (instructions in tasks).

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `contact-form`: the Spam protection requirement gains the per-IP rate limit; Sent and failed states gains the "too many attempts" message.

## Impact

- **app/**:
  - the `@vercel/firewall` dependency;
  - a rate-limit check at the start of `sendInquiry`;
  - a `limited` status in `InquiryState`;
  - copy in PL/EN/DE (`pages.contact.errors.limitedTitle`/`limitedBody`).
- **Vercel**: one Firewall rule (`@vercel/firewall` condition, rate-limit ID `contact-inquiry`, fixed window 10 min, 5 requests, keyed by IP). Rate limiting is included in the Pro plan.
- **No design change**: the banner layout already exists.
- **Out of scope**: CAPTCHA or Turnstile, BotID, and limits on other routes.
