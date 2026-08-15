# GBP Browser Execution Handoff

Purpose: resume authenticated Google Business Profile execution in a fresh Codex/browser-enabled session without re-explaining the task.

## Runtime requirement

Use the Codex Chrome extension with the user's existing signed-in Chrome profile, or the Codex in-app browser. The session must have Browser use enabled. For deep Chrome control, Developer mode / Full CDP access must be enabled in the Codex desktop app. If `getTabContext`, `js`, or `js_reset` return `unsupported call`, stop: the browser backend is not attached to that session.

## Target

Existing verified Google Business Profile for **JHB Curtain Cleaning**. Do not create another profile.

## Read first

Read and follow:

- `docs/GBP-OPTIMIZATION-PACKET-2026-08-14.md`
- `docs/GSC-MIGRATION-CHECKPOINT-2026-08-14.md`

## Browser task

1. Attach to the user's signed-in Chrome session.
2. Navigate to the existing JHB Curtain Cleaning Business Profile management surface.
3. Inspect and report before editing:
   - verification/profile status;
   - warnings or pending edits;
   - business name;
   - primary and secondary categories;
   - business type and address visibility;
   - phone;
   - website;
   - WhatsApp;
   - opening hours;
   - service areas;
   - service list;
   - business description;
   - review-link / QR controls;
   - photo inventory.
4. Apply only low-risk approved corrections where the current profile differs from the operating facts in the optimisation packet.
5. Do not create a duplicate profile.
6. Do not change the primary category until the authenticated South African category picker has been inspected and the available relevant categories have been reported.
7. Do not change or expose/hide the street address during the first pass. Report current business type/address visibility instead.
8. Do not upload stock/fabricated images. Only use genuine approved JHB Curtain Cleaning assets.
9. Do not buy, gate, incentivise, or fabricate reviews.
10. Do not start paid ads or paid Google products.
11. Stop if Google shows suspension, reverification, ownership, identity, or policy warnings.
12. Leave the profile open on the category screen after the safe edits and provide a before/after report.

## Known operating facts to preserve unless authenticated account data proves a conflict

- Business name: JHB Curtain Cleaning
- Website: https://www.jhbcurtaincleaning.co.za
- Phone: +27 75 011 9200
- Current recorded primary category: Dry Cleaner
- Hours: Mon-Fri 07:00-18:00; Sat 08:00-14:00; Sun Closed
- Service areas: Johannesburg, Sandton, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, Pretoria, Midrand
- WhatsApp enabled

## Resume prompt

`Read docs/GBP-BROWSER-EXECUTION-HANDOFF.md and execute it using my existing signed-in Chrome session. Inspect first, then apply only the approved low-risk GBP edits. Do not create a duplicate profile or change primary category/address visibility without inspection.`
