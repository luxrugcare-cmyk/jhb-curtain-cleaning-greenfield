# Growth Sprint 07 — Measurement Protection, CMS Diagnostics and Authority Decisions

Date: 2026-08-14
Status: implementation sprint; no paid memberships, listings or outreach submitted.

## Why this sprint is deliberately narrow

The Ubersuggest rank-tracking project has not produced a new ranking collection since 2026-08-14. The report remains final for that date with 12 of 25 tracked keywords in Google's top 100, 13 not ranking, and an average tracked position of 31.25. The next scheduled collection is 2026-08-21.

Because several curtain-intent terms are already close to page one, Sprint 07 does not create additional thin service/location content before the next measurement. Existing ranking pages, permanent redirects and curtain-area architecture remain unchanged.

## Protected 2026-08-14 baseline

| Keyword | Position | Currently attributed URL |
|---|---:|---|
| curtain cleaners johannesburg | 13 | /testimonials (legacy URL, permanently redirects to /results) |
| curtain cleaning sandton | 14 | /blog/curtain-cleaning-sandton-guide (legacy URL, permanently redirects to /areas/sandton) |
| on site curtain cleaning | 16 | /blog/curtain-cleaning-sandton-guide |
| curtain dry cleaning | 17 | /blog/curtain-cleaning-sandton-guide |
| curtain cleaning johannesburg | 18 | /blog/curtain-cleaning-sandton-guide |
| curtain cleaning near me | 18 | homepage |
| curtain cleaning | 23 | homepage |
| curtain cleaners | 26 | homepage |
| curtain cleaning prices | 38 | /pricing (legacy URL, permanently redirects to /advice/curtain-cleaning-prices) |
| persian rug cleaning | 45 | /services/rug-care |
| curtain cleaning randburg | 70 | /services/curtain-blind-cleaning (legacy URL, permanently redirects to /services/curtain-cleaning) |
| curtain cleaning roodepoort | 77 | homepage |

No ranking movement is claimed before the 2026-08-21 collection.

## CMS resilience and credential diagnostics

Sprint 06 proved that the configured production `SANITY_API_READ_TOKEN` can return `401 Session not found` during a Vercel build. The application now fails soft, so Sanity authentication/network/API failures return fallback content rather than breaking production.

Sprint 07 adds a separate production-deployment diagnostic:

- validates an authenticated read against the configured Sanity project/dataset;
- records PASS/WARN in the GitHub Actions job summary;
- does not print the token;
- does not print CMS records;
- does not block production when the CMS credential is invalid because the website is deliberately fail-soft;
- keeps the invalid credential visible to operations until it is rotated.

Credential rotation is still required for live Sanity case-study rendering. The connected Vercel account available in ChatGPT is not the `bookish-eureka` production team used by this repository's deployment workflow, so Sprint 07 does not attempt to modify that secret through a mismatched account.

## Authority decision update — current public evidence checked 2026-08-14

### 1. JCCI — highest execution priority

Current public evidence:
- membership benefits include business contacts, B2B advertising, training and advocacy;
- JCCI states that members can pay for a link from their member-directory listing to their own website;
- the currently published directory-link price is R61 incl. VAT;
- JCCI also sells website advertising, but paid advertising is not recommended merely for SEO.

Recommendation: **INVESTIGATE / LIKELY APPLY** if current membership fee and renewal terms are commercially acceptable. The reason is Johannesburg business-development relevance, not the R61 website link.

### 2. FEDHASA Inland — strongest low-cost sector-specific candidate found this sprint

Current public evidence:
- Gauteng businesses fall under FEDHASA Inland;
- supplier businesses can apply as `Trusted Partners`;
- published Trusted Partner annual fees start at R2,077 for businesses with 1–5 staff, then rise by staff count;
- FEDHASA exposes member directories and a supplier marketplace;
- member benefits include hospitality networking and access to events where decision-makers are present.

Recommendation: **INVESTIGATE / STRONG CANDIDATE** for the hotel/hospitality pipeline, subject to confirming the correct staff band, directory/marketplace profile terms and commercial fit.

### 3. SAFMA — strongest facilities-management fit, higher entry cost

Current public evidence:
- Blue corporate membership is R9,148 incl. VAT per annum;
- Blue membership includes company listing on the SAFMA website and business profiling in the SAFMA directory;
- also includes event/tender/job visibility benefits.

Recommendation: **DEFER PURCHASE UNTIL PIPELINE JUSTIFIES COST**. Strong audience relevance, but materially more expensive than FEDHASA's entry-level Trusted Partner tier.

### 4. SAPOA — excellent property audience, fee still needs confirmation

Current public evidence:
- the public membership directory includes a `Cleaning Services` category;
- member records can include website fields;
- property-owner/manager audience alignment is strong.

Recommendation: **INVESTIGATE** supplier/member eligibility, fee and directory inclusion before any application.

## Execution order

1. Preserve current SEO architecture until the 2026-08-21 rank refresh.
2. Make Sanity credential validity visible in every production deployment.
3. Rotate/restore `SANITY_API_READ_TOKEN` only through the correct production Vercel account or a verified equivalent control path.
4. Obtain current JCCI membership fee and terms before approval.
5. Confirm FEDHASA Trusted Partner staff band and whether directory/marketplace inclusion is automatic.
6. Confirm SAPOA supplier/member class and current fee.
7. Do not purchase SAFMA membership unless facilities-management pipeline value justifies the annual cost.
8. On 2026-08-21, compare the exact baseline above with the fresh Ubersuggest collection and inspect URL migration from legacy redirects to canonical greenfield destinations.

## Hard guardrails

- No bought backlinks.
- No bulk directory submissions.
- No paid association membership solely for ranking manipulation.
- No fabricated case studies, testimonials, reviews or client names.
- No removal of ranking-equity redirects before fresh evidence supports it.
- No new service-by-suburb doorway-page expansion.
- No membership/application submission or outreach without explicit approval.
