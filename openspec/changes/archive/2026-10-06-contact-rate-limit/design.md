## Context

- `sendInquiry` (`app/src/app/[lng]/contact/actions.ts`):
  - returns `sent` silently when the honeypot is filled;
  - validates;
  - then sends the owner email and the guest confirmation in one Resend batch.
- The project is on Vercel Pro, so the WAF's rate limiting is available.
- `@vercel/firewall` (1.2.x) exports `checkRateLimit(id, { headers, rateLimitKey, timeout })`, which returns `{ rateLimited, error? }`. It needs a dashboard rule whose `@vercel/firewall` condition uses the same rate-limit ID. The key defaults to the client IP from `x-real-ip`.
- Behaviour outside Vercel:
  - with `NODE_ENV !== 'production'` and no `firewallHostForDevelopment`, it warns and returns `rateLimited: false`;
  - under a local production build (`npm start`) it throws, because there's no `x-real-ip`.

## Goals / Non-Goals

**Goals:**
- Cap emails per visitor at 5 submissions per 10 minutes, counted before validation.
- Never block a genuine inquiry because the limiter is missing or broken.
- Tell a limited visitor clearly what happened and how to reach the owner instead.

**Non-Goals:**
- CAPTCHA, Turnstile or BotID.
- Limits on other routes.
- A distributed limiter of our own (Redis or Upstash).

## Decisions

### D1. Vercel Firewall SDK in the server action
- At the top of `sendInquiry`, before the honeypot check, so bots that fill it are counted too:
  ```ts
  const { rateLimited, error } = await checkRateLimit('contact-inquiry', { headers: await headers(), timeout: 2000 })
  ```
- `headers()` comes from `next/headers`. Server actions have no `Request`, and the SDK accepts headers.
- The key is the default client IP, so each visitor gets their own bucket.
- *Alternative: a dashboard-only rule on `POST /*/contact`.* Server-action posts go to the page URL, so a path rule would work too. But it answers with a bare 429 the form can't explain to the visitor, and it would also count the page's other POSTs. The SDK lets the form show a proper message.
- *Alternative: Upstash or another Redis rate limiter.* It's another service and account for something the platform already includes.

### D2. Fail open, and only on Vercel
- The check runs only when `process.env.VERCEL` is set. Locally (dev or `npm start`) it's skipped, which avoids the SDK's missing-IP error.
- Any thrown error, a timeout, or `error: 'not-found'` (the rule isn't created yet) logs with `console.error` and lets the inquiry continue.
- `error: 'blocked'` means the firewall already blocked the request. It's treated as limited.
- Preview deployments sit behind Deployment Protection, and the SDK documents that a preview needs Protection Bypass for Automation to reach the firewall. Without it the check errors, and fail-open keeps previews working. The limit is enforced in production.

### D3. A `limited` state in the form
- `InquiryState.status` gains `'limited'`.
- The form renders the existing failure banner with `errors.limitedTitle` and `errors.limitedBody`, followed by the phone and email links. The values are kept.
- Copy:
  - PL: "Za dużo prób wysłania." / "Odczekajcie kilka minut i spróbujcie ponownie albo skontaktujcie się bezpośrednio:"
  - EN and DE are drafted in the same tone.

### D4. The rule settings (owner creates them)
In Vercel → project → Firewall → Configure → New Rule:
- name "Contact inquiries";
- If: `@vercel/firewall`, Rate limit ID `contact-inquiry`;
- Rate limit: fixed window, 10 minutes, 5 requests, keyed by IP;
- Then: the default rate-limit action;
- Save, then Review Changes, then Publish.

Five gives room for honest corrections (a typo, a second inquiry for other dates) while capping abuse at 5 owner emails and 5 confirmations per IP per 10 minutes.

## Risks / Trade-offs

- [Counters are per region] → One attacker hitting several regions could exceed 5. For a small site that's acceptable, and it's still bounded.
- [Shared IPs (a hotel or office NAT) share a bucket] → Five in 10 minutes from one address is rare for real guests, and the limited message gives the phone and email.
- [Fail-open hides a broken rule] → The `console.error` lines show in Vercel logs. Verification checks that the rule triggers in production.

## Migration Plan

1. Merge the code. Until the rule exists, the check returns `not-found` and fails open, so nothing changes for visitors.
2. The owner creates and publishes the rule.
3. Verify in production by sending 6 test submissions with the honeypot filled, so no email is sent: the 6th shows the limited message.

Rollback: delete the rule in the dashboard (the code fails open), or revert the PR.
