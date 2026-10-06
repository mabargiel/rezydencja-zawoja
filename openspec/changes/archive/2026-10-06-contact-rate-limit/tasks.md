## 1. Implementation

- [x] 1.1 Add `@vercel/firewall` to `app/`
- [x] 1.2 In `sendInquiry`, check `contact-inquiry` first: only when `VERCEL` is set, with `headers()` and a 2s timeout. Return `limited` when rate-limited or blocked; on an error, a timeout or `not-found`, log and continue
- [x] 1.3 Add `limited` to `InquiryState`, and show the failure banner with `limitedTitle`/`limitedBody` plus the phone and email, keeping the values
- [x] 1.4 Add the `errors.limitedTitle` and `errors.limitedBody` copy in PL, EN and DE

## 2. Verification

- [x] 2.1 Locally: the inquiry still sends (the check is skipped); the limited banner renders in all three languages (forced state)
- [x] 2.2 Run format:check, lint, lint:styles, typecheck and build; scan for comments; open a PR; confirm CI and the Vercel preview are green, and a preview inquiry still sends (fail-open)
- [x] 2.3 Owner checkpoint: create and publish the `contact-inquiry` Firewall rule (D4)
- [x] 2.4 After merge, in production: 6 honeypot submissions from one IP (no emails), and the 6th shows the limited message; a normal inquiry from another network still sends
