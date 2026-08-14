# Analytics & Search Console Verification Gate

Date: 14 August 2026
Status: account-side verification required

## Purpose

Confirm that the production measurement stack is not only implemented in code, but is actually collecting trustworthy account-side data before SEO, conversion or paid-acquisition decisions are made.

## Code-side status — verified

### GA4 loader

`components/analytics/Analytics.tsx` loads GA4 only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is present and sends normal page views.

### Event layer

`integrations/analytics/events.ts` implements the supported event contract, including:

- `navigation_click`
- `call_click`
- `whatsapp_click`
- `quote_start`
- `quote_step`
- `quote_upload`
- `quote_submit`
- `commercial_start`
- `commercial_submit`
- `generate_lead`
- `booking_view`
- `booking_complete`
- `case_study_view`
- `review_interaction`
- `service_view`
- `sector_view`
- `area_view`

### Residential lead attribution

The residential quote flow captures the current source URL plus `utm_source`, `utm_medium` and `utm_campaign` and submits those values with the lead payload. Successful submissions emit `quote_submit` and `generate_lead`.

### Commercial lead attribution

The commercial assessment flow captures the same source/UTM fields. Successful submissions emit `commercial_submit` and `generate_lead`.

## Account-side checks still required

GA4 is not considered verified until all of the following are confirmed in the account actually used by JHB Curtain Cleaning:

1. The production web stream is for `https://www.jhbcurtaincleaning.co.za`.
2. The deployed `NEXT_PUBLIC_GA_MEASUREMENT_ID` matches that stream.
3. GA4 Realtime receives a controlled production visit.
4. A controlled residential test produces the expected page/session data and successful lead event.
5. A controlled commercial test produces the expected page/session data and successful lead event.
6. Call and WhatsApp click events are observed where implemented.
7. UTM values survive into the lead/CRM data contract.
8. No customer PII is sent to GA4 event parameters.
9. The chosen lead event(s) are marked as GA4 key events/conversions only after event collection is verified.
10. Duplicate Google tags or duplicate Tag Manager installations are not present.

## Search Console checks still required

1. Confirm the active property is the canonical production host/domain.
2. Confirm ownership verification is valid.
3. Submit/verify the current sitemap.
4. Check indexing/page status after the greenfield cutover.
5. Capture the post-cutover baseline for:
   - total clicks
   - total impressions
   - average CTR
   - average position
   - non-brand queries
   - service queries
   - local/suburb queries
   - landing pages
6. Inspect legacy ranking URLs and confirm Google is moving attribution through the permanent redirects to canonical greenfield destinations.
7. Use Search Console evidence together with the scheduled 21 August Ubersuggest refresh before changing ranking architecture.

## Current access limitation

The connected Vercel account available in this ChatGPT session currently returns no projects, so the production environment-variable value cannot be independently verified through that connector. No claim should be made that GA4 is active solely because the code supports it.

No Search Console or Google Analytics account connector is currently available in this session. Account-side verification therefore remains an explicit operational gate rather than an inferred completion.

## Decision rule

Do not scale paid search, perform conversion optimisation based on small/noisy samples, or materially change SEO ranking architecture until account-side measurement is verified and the 21 August rank-refresh evidence is reviewed.
