# Google Business Profile Optimisation Packet — 2026-08-14

Status: implementation-ready profile packet. No duplicate profile creation. No category/address change without authenticated in-profile confirmation.

## Current working profile state

Use the existing verified JHB Curtain Cleaning Business Profile. Do not create a second profile.

Known operating details to preserve unless the authenticated profile shows a conflict:

- Business name: JHB Curtain Cleaning
- Website: https://www.jhbcurtaincleaning.co.za
- Phone: +27 75 011 9200
- Primary category currently recorded: Dry Cleaner
- Service areas currently recorded: Johannesburg, Sandton, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, Pretoria, Midrand
- Hours currently recorded: Mon–Fri 07:00–18:00; Sat 08:00–14:00; Sun Closed
- WhatsApp: enabled

## Category decision

Do not change the primary category from `Dry Cleaner` blindly.

Google requires categories to describe what the business *is*, using the most specific available category that holistically fits the business. Before any category change, open the authenticated category picker and verify which South African categories are actually available for this profile.

Decision hierarchy:

1. Prefer a specific curtain/textile-cleaning category if Google exposes one that accurately describes the whole business.
2. If no specialist curtain-cleaning category exists, compare `Cleaning service`, `Upholstery cleaning service`, and the current `Dry Cleaner` based on the actual work mix and available category options.
3. Add only genuinely relevant secondary categories; do not use categories as a keyword list.
4. Because category changes can affect profile state and may trigger reverification, make the change only after the authenticated picker is reviewed.

## Business description — recommended copy

JHB Curtain Cleaning provides specialist on-site curtain and textile care for homes, offices, hotels and managed properties across Johannesburg and surrounding areas. We assess fabric, lining, installation and condition before cleaning, and where suitable clean curtains while they remain hanging to reduce removal, refitting and disruption. Services include curtain and blind cleaning, upholstery and carpet cleaning, mattress sanitisation, fabric protection, fire-retardant treatment and Persian and Oriental rug care. Free assessments are available for residential and commercial properties.

Do not add phone numbers, promotional pricing, unverifiable superlatives, or keyword stuffing to the description.

## Services to add or verify

Use service names that match real offerings and the website architecture:

- On-site curtain cleaning
- Curtain dry cleaning
- Blind cleaning
- Upholstery cleaning
- Couch cleaning
- Carpet cleaning
- Mattress sanitisation
- Persian rug cleaning
- Oriental rug cleaning
- Rug cleaning
- Fabric protection
- Fire-retardant treatment
- Commercial curtain cleaning
- Hotel curtain cleaning
- Office curtain cleaning

Descriptions should focus on scope and suitability rather than ranking phrases. Do not list services that are not actively supplied.

## Service-area configuration

Google allows up to 20 service areas and recommends city/postal-code/area entries rather than radius targeting. The full footprint should remain commercially realistic and generally within about two hours' drive from the business base.

Current areas to retain if genuinely served:

1. Johannesburg
2. Sandton
3. Fourways
4. Roodepoort
5. Edenvale
6. Alberton
7. Rosebank
8. Pretoria
9. Midrand

Potential additions should be added only when they reflect actual service coverage and operational capacity. Do not add a long suburb list solely for rankings.

## Address / business-type rule

If customers do not visit and receive service at the published address during stated opening hours, operate the profile as a service-area business and hide the street address. If the location is a genuine staffed, signed customer-facing premises, a hybrid/storefront configuration may be appropriate.

Do not change address visibility until the real operating model is confirmed in the authenticated profile because address/business-type edits can create reverification risk.

## Hours

Verify that the live profile exactly matches actual customer-contact/service availability:

- Monday–Friday: 07:00–18:00
- Saturday: 08:00–14:00
- Sunday: Closed

Add special hours for public holidays when applicable. Do not leave generic hours that differ from actual availability.

## Photos — first evidence batch

Google recommends clear, realistic JPG/PNG images with minimal alteration. Priority upload set:

1. Brand logo
2. Cover image showing real on-site curtain cleaning
3. Technician/equipment setup on a real job
4. Curtain fabric close-up before treatment
5. Curtain fabric/room result after treatment, where permission exists
6. Blind-cleaning example
7. Upholstery-cleaning example
8. Mattress-sanitisation example
9. Rug-care example
10. Commercial/hotel or office job example where publication permission exists

Avoid stock imagery presented as completed work, fake before/after imagery, excessive filters, text-heavy graphics, or images that imply clients/properties without permission.

Recommended image standard for Google: JPG/PNG, 10 KB–5 MB, ideally around 720×720 px or larger, in focus and well lit.

## Review acquisition

Use Google's own review link/QR workflow once the authenticated profile exposes the review-link control. Do not buy, gate, or fabricate reviews.

Recommended customer request wording:

“Thank you for choosing JHB Curtain Cleaning. If you were happy with the service, would you mind sharing an honest Google review? It helps other Johannesburg customers understand what to expect from our on-site curtain and textile cleaning service.”

Do not offer incentives for positive reviews and do not ask only satisfied customers while suppressing others.

## Review response framework

Positive review response:

“Thank you for the review. We appreciate you choosing JHB Curtain Cleaning and are pleased the on-site service worked well for your property.”

Issue/complaint response:

“Thank you for raising this. We would like to review the job details and resolve the issue properly. Please contact us directly so we can investigate the service and follow up.”

Keep replies factual. Do not disclose customer addresses, fabric problems, health information, phone numbers, or other personal details.

## GBP posts

Use Business Profile posts only for genuine updates, service education, project evidence with permission, and seasonal operational information. Avoid phone numbers inside post copy; use the profile's action button instead.

Suggested recurring themes:

- How on-site curtain cleaning works
- When curtains should be professionally cleaned
- Curtain cleaning vs washing vs dry cleaning
- Blind cleaning guidance
- Mattress and upholstery hygiene
- Commercial low-disruption cleaning
- Approved project evidence / case studies

Do not turn GBP posts into repetitive suburb-keyword content.

## Exact execution order

1. Open the existing verified profile under the owner Google account.
2. Check profile status, pending edits, suspensions/warnings, and verification state.
3. Capture current primary + secondary category options before changing anything.
4. Confirm business type/address visibility matches real customer access.
5. Verify phone, website, WhatsApp and hours.
6. Add/clean up service list.
7. Replace business description with the approved copy if the current version is weaker or inaccurate.
8. Verify the nine current service areas; remove any not genuinely served.
9. Upload the first real-photo evidence batch.
10. Generate the official review link/QR code and store it in the operational credential/reference system.
11. Begin steady review requests after completed jobs; no bulk historical review solicitation without a controlled customer list.
12. Recheck public visibility after edits are approved.

## Guardrails

- No duplicate GBP.
- No fake office/location.
- No virtual-office abuse.
- No keyword-stuffed business name.
- No speculative category change.
- No fake reviews or incentives.
- No stock photos represented as real jobs.
- No service-area expansion purely for ranking.
- No profile edits that contradict website/NAP facts.
