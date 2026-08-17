# JHB Curtain Cleaning — Master Project Handoff

Date: 2026-08-17
Authoritative repository: `luxrugcare-cmyk/jhb-curtain-cleaning-greenfield`
Production site: `https://www.jhbcurtaincleaning.co.za`
Production branch: `main`
Current production merge SHA at packaging start: `04247efb9bf52afa4b8d3c2bcc4e752e20df19b7`

## 1. Purpose

This document is the authoritative continuation brief for the JHB Curtain Cleaning digital platform, SEO programme, Google Business Profile optimisation, analytics, lead systems, brand assets, and future growth work.

The handoff package intentionally excludes live passwords, access tokens, refresh tokens, private keys, browser cookies, and local credential files. Account identities and configuration references are documented separately in `handoff/ACCOUNT-INVENTORY-SANITIZED.md`.

## 2. Business identity

- Business name: JHB Curtain Cleaning
- Canonical display name: JHB Curtain Cleaning
- Website: https://www.jhbcurtaincleaning.co.za
- Phone: +27 75 011 9200
- Email: info@jhbcurtaincleaning.co.za
- WhatsApp: +27 75 011 9200
- Founder / Managing Director: Stephen Dunlop
- Primary operating region: Johannesburg and surrounds
- Current service-area coverage: Johannesburg, Sandton, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, Pretoria, Midrand

## 3. Positioning

Premium professional on-site curtain and textile care for residential and commercial properties.

Core differentiators already used across the project:

- on-site curtain cleaning
- curtain removal not normally required where suitable
- reduced disruption
- no-shrinkage positioning where process/fabric assessment supports the claim
- residential + commercial capability
- curtain and blind cleaning
- upholstery and carpet cleaning
- mattress sanitisation
- fabric protection
- fire-retardant treatment
- Persian and Oriental rug care

Brand direction:

- premium, restrained, professional
- deep navy + white
- eucalyptus / restrained blue-green accents
- limited champagne/gold accent
- avoid cheap/neon cleaning-company aesthetics
- do not fabricate certifications, jobs, reviews, clients, locations, team members, vehicles, or evidence

## 4. Authoritative technical stack

The current greenfield repository is the source of truth.

Current production architecture:

- Next.js
- React
- TypeScript
- Sanity for approved content/evidence workflows
- Vercel hosting/deployment
- Vercel Blob where used by the current codebase
- GA4 direct production instrumentation
- GitHub Actions CI
- Attio for CRM/operational task tracking
- Resend for email infrastructure where applicable

Do not introduce Supabase, Neon, Prisma, another CMS, or another datastore merely because older project material mentions them. Add infrastructure only for a demonstrated capability gap.

## 5. Production/deployment status

The production cutover to the greenfield project is complete.

Production expectations:

- canonical host: `www.jhbcurtaincleaning.co.za`
- apex redirects to www
- production health endpoint exists
- redirects/canonicals are protected during the current SEO migration observation window
- CI gates include dependency install/security, internal import audit, typecheck, production build, and smoke testing

Do not modify redirects/canonicals or URL architecture casually. Migration behaviour is being measured against a protected SEO baseline.

## 6. SEO Rank Refresh programme

Protected baseline date: 2026-08-14
Next protected measurement date: 2026-08-21

Baseline summary:

- 25 tracked keywords
- 12 ranking in top 100
- 13 not ranking
- average position among ranking terms: 31.25

Important tracked positions from the protected baseline:

- curtain cleaners johannesburg — #13
- curtain cleaning sandton — #14
- on site curtain cleaning — #16
- curtain dry cleaning — #17
- curtain cleaning johannesburg — #18
- curtain cleaning near me — #18
- curtain cleaning — #23
- curtain cleaners — #26
- curtain cleaning prices — #38
- persian rug cleaning — #45
- curtain cleaning randburg — #70
- curtain cleaning roodepoort — #77

Protected migration pairs:

- `/testimonials` -> `/results`
- `/blog/curtain-cleaning-sandton-guide` -> `/areas/sandton`
- `/pricing` -> `/advice/curtain-cleaning-prices`
- `/services/curtain-blind-cleaning` -> `/services/curtain-cleaning`

Do not claim ranking movement before the protected 2026-08-21 refresh.

## 7. Google Search Console status

Authenticated read-only validation succeeded on 2026-08-14.

Confirmed:

- domain property ownership
- www URL-prefix property ownership
- production sitemap listed
- Search Analytics returned data
- URL inspection was performed selectively

Observed migration/canonical state during the checkpoint:

- homepage user canonical points to www
- Google was still selecting the legacy/apex canonical during transition
- several new greenfield destination URLs were not yet known to Google at the initial checkpoint

Interpretation: treat this as migration/canonical re-evaluation, not justification for another architecture change. Preserve redirects and canonical strategy through the protected measurement window.

## 8. GA4 status

Production page-view network dispatch to the correct GA4 measurement ID was verified from the deployed site.

Remaining analytics work is account-side verification where needed:

- Realtime confirmation
- key-event/conversion configuration
- final attribution/reporting design

Google Tag Manager remains dormant by design unless a real tag-management requirement emerges. Avoid duplicate GA4 firing.

## 9. Google Business Profile status

Existing verified profile: JHB Curtain Cleaning.

Authenticated profile pass completed using the signed-in owner account in the existing Chrome profile through Windows UI Automation fallback.

Confirmed profile state:

- verified
- business name: JHB Curtain Cleaning
- primary category: Dry cleaner
- secondary categories: none visible at last inspection
- service-area/home-service listing
- street address hidden publicly
- phone correct
- website correct
- WhatsApp correct
- hours correct
- 9 approved service areas correct

Low-risk changes completed:

- approved business description submitted
- expanded genuine service list submitted

At the time of the pass, Google showed description/services edits as pending review.

No suspension, reverification, ownership dispute, identity verification, or policy warning was observed.

Official review URL:

`https://g.page/r/CbZEjFiE3HjZEBM/review`

Category decision:

- keep `Dry cleaner` temporarily
- `Upholstery cleaning service` was visible in the South African category picker
- no clearly matching `Curtain cleaning` category was observed
- before changing primary category, explicitly test availability of `Cleaning service`, `Carpet cleaning service`, and `Upholstery cleaning service`
- category changes can trigger reverification; avoid speculative edits

Address/business-type decision:

- preserve current service-area configuration
- do not expose/change the street address without a separate operating-model review

## 10. GBP visual pack

Merged through PR #42.

Key paths:

- `docs/gbp/GBP-VISUAL-ASSET-MANIFEST.md`
- `docs/gbp/REAL-PHOTO-INTAKE.md`
- `docs/gbp/GBP-VISUAL-QA-REPORT.md`
- `public/brand/gbp/`

GBP-approved now:

- `public/brand/gbp/logo/gbp-profile-logo-720x720.png`
- `public/brand/gbp/logo/jhb-logo-square.png`

Do not upload generated operational imagery to GBP as real evidence.

Specifically blocked as real evidence:

- synthetic technicians
- synthetic team
- synthetic vehicles
- synthetic customer/property scenes
- synthetic hotel/office jobs
- synthetic cleaning-process images
- synthetic before/after images

Temporary cover and service graphics are website/social/marketing assets only.

Real-photo intake is now the priority evidence programme.

## 11. Real-photo evidence priorities

Collect genuine, permission-cleared images for:

1. cover photo / strong curtain-cleaning hero
2. on-site curtain cleaning
3. blind cleaning
4. upholstery/couch cleaning
5. carpet cleaning
6. mattress sanitisation
7. rug care
8. fabric protection
9. fire-retardant work
10. technician
11. equipment
12. vehicle
13. team
14. commercial jobs
15. hotel jobs
16. office jobs
17. real before/after evidence

Use the intake workflow in `docs/gbp/REAL-PHOTO-INTAKE.md`.

## 12. CRM / operations

Attio is used for operational tracking.

Recent task state included:

Completed:

- production domain routing/source verification
- existing GBP verification
- authenticated GSC validation
- GBP optimisation execution pass

Remaining operational items include:

- account-side GA4 verification
- coordinated credential rotation
- real-photo evidence collection
- final GBP category decision
- authority acquisition only where explicitly approved

## 13. Email / marketing compliance

POPIA consent/compliance is a hard gate.

Previous prospecting state:

- 145 prospects were prepared
- a limited consent-request process was started
- no broad marketing sequence should be sent without consent/deliverability gates
- after a bounce in a subsequent batch, further sending was stopped pending verification/canary controls

Do not resume outbound marketing merely because recipient files exist.

## 14. Social/media roadmap

Planned later-stage system:

- Facebook
- Instagram
- YouTube
- TikTok
- Pinterest
- X
- LinkedIn

The intended long-term direction is a Social Media Matrix Factory / content distribution dashboard, but this remains downstream of evidence collection, attribution, and core SEO/GBP work.

## 15. Authority / off-site SEO guardrails

Do not:

- buy backlinks
- use bulk directory spam
- fabricate reviews
- fabricate case studies
- fabricate client names
- fabricate locations
- mass-create service-by-suburb doorway pages
- buy memberships solely for ranking influence

Potential authority relationships (FEDHASA/JCCI/SAPOA/SAFMA etc.) require explicit commercial approval before outreach/payment/application.

## 16. Security posture

A security hardening pass was completed previously.

Important policy for this package:

- no live secrets are included
- no cookies/browser profile data are included
- no OAuth refresh tokens are included
- no Vercel deploy token is included
- no private keys are included
- no `.env.local` or local secret file is included

Several long-lived credentials were previously pasted into conversational/project material and should be treated as exposed until rotated in a coordinated manner. See `handoff/SECURITY-AND-ROTATION.md`.

## 17. Immediate next actions

Priority order:

1. Pull latest `main` everywhere.
2. Upload the approved GBP square logo after confirming the crop preview.
3. Verify the GBP description/services edits are published.
4. Collect genuine real-photo evidence and replace internal placeholders progressively.
5. Run the protected 2026-08-21 SEO rank refresh and compare against `docs/GROWTH-SPRINT-07.md`.
6. Re-run GSC migration comparison after the protected checkpoint.
7. Make the final GBP primary/secondary category decision only from the live category picker and current operating reality.
8. Verify GA4 account-side Realtime/key events.
9. Continue evidence-led SEO Sprint 09+.
10. Only then expand commercial vertical campaigns, social factory, CRM automation, and compliant email.

## 18. Restore / continuation

See:

- `handoff/RESTORE-AND-DEPLOY.md`
- `handoff/ACCOUNT-INVENTORY-SANITIZED.md`
- `handoff/SECURITY-AND-ROTATION.md`

The handoff archive also includes a Git bundle when built through the delivery workflow. This allows full repository history to be restored offline.
