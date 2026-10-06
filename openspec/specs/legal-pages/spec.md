# legal-pages Specification

## Purpose
The privacy policy and rental terms: CMS-managed legal texts in PL/EN/DE, the legal page layout, and the binding-language note.
## Requirements
### Requirement: Legal pages
The site SHALL have a privacy policy at `/{lng}/privacy-policy` and rental terms at `/{lng}/rental-terms` in every language. Each page SHALL show a translated title, the "last updated" date and the body text from the CMS, using the approved legal page layout at 1440px and 390px. Both pages SHALL be prerendered and SHALL have a translated title, description, canonical URL and `hreflang` alternates.

#### Scenario: Pages respond
- **WHEN** each legal page is requested in each of the 3 languages
- **THEN** all 6 responses are 200 and are prerendered statically

#### Scenario: Last updated
- **WHEN** an editor changes the "last updated" date in the Studio
- **THEN** the page shows the new date, formatted for the page language, after revalidation

### Requirement: Legal content in the CMS
Each legal page SHALL be a fixed `legalPage` document in Sanity, pinned in the Studio structure, that can't be deleted or duplicated. It SHALL hold a localized title, an `updatedAt` date, and a rich-text body in Polish, English and German, limited to paragraphs, H2 and H3 headings, bullet and numbered lists, bold and links. The Polish body SHALL be required, and missing English or German SHALL show a warning.

#### Scenario: Editor fixes a clause
- **WHEN** the owner edits a paragraph of the Polish rental terms and publishes
- **THEN** `/pl/rental-terms` shows the change without a deploy

#### Scenario: Seeded content
- **WHEN** the seed runs on an empty dataset
- **THEN** both documents exist with full Polish, English and German text

### Requirement: Binding language
The English and German versions SHALL state, above the text, that they are translations and that the Polish version is binding, and SHALL link to it. When a translation is missing, the page SHALL show the Polish text with the same note.

#### Scenario: German page
- **WHEN** a visitor opens `/de/rental-terms`
- **THEN** a note says the Polish version is binding and links to `/pl/rental-terms`

### Requirement: Accurate privacy policy
The privacy policy SHALL describe the new site as it works:
- the controller and how to contact them;
- the data the inquiry form collects, why, and on which legal basis;
- that inquiries are delivered by email through Resend and not stored by the website;
- the processors (Resend, Vercel) and international transfers;
- retention periods;
- the data subject's rights and the right to complain to the President of UODO;
- that the only cookie is the strictly necessary language preference, with no analytics or advertising cookies.

#### Scenario: Cookies match reality
- **WHEN** the site's cookies are inspected after browsing every page and sending an inquiry
- **THEN** the only cookie set is `lng`, as the policy states

