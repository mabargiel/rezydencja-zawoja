## REMOVED Requirements

### Requirement: Booking bar form
**Reason**: The hero leads with "Napisz do nas" and "Zadzwoń"; marketing wants returning visitors to start a conversation rather than pick dates first.
**Migration**: Dates and guests are entered in the contact form; see `hero-photo` for the hero's calls to action.

### Requirement: Hand-off to the contact page
**Reason**: There's no booking bar to hand off from.
**Migration**: The contact form still accepts `arrival`, `departure` and `guests` query parameters; see `contact-form`.
