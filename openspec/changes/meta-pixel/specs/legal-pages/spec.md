## MODIFIED Requirements

### Requirement: Accurate privacy policy
The privacy policy SHALL describe the new site as it works:
- the controller and how to contact them;
- the data the inquiry form collects, why, and on which legal basis;
- that inquiries are delivered by email through Resend and not stored by the website;
- the processors (Resend, Vercel) and international transfers;
- retention periods;
- the data subject's rights and the right to complain to the President of UODO;
- the strictly necessary `lng` cookie and the stored consent decision;
- the Meta Pixel: that it loads only after consent, its purpose (measuring and targeting ads), its cookies, consent as the legal basis, Meta Platforms Ireland as recipient with transfers to the US, and how to withdraw consent through "Ustawienia cookies".

#### Scenario: Cookies match reality
- **WHEN** the site's cookies are inspected after browsing every page, rejecting cookies and sending an inquiry
- **THEN** the only cookie set is `lng`, as the policy states

#### Scenario: Pixel described
- **WHEN** the privacy policy renders in any language
- **THEN** its cookies section names the Meta Pixel and explains how to withdraw consent
