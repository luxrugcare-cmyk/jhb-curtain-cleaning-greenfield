# Case Study Evidence Workflow — Sprint 06

Date: 2026-08-14

## Purpose

Turn completed JHB Curtain Cleaning work into useful public case studies without inventing clients, outcomes, photographs, testimonials or technical claims.

The public `/results` page now reads only Sanity `caseStudy` records where both conditions are true:
- `publicationStatus == "published"`
- `publicationApproved == true`

A draft, review-stage or private record cannot appear publicly through this query.

## Required evidence fields

A publishable record should contain:
1. Title
2. Property type
3. Service
4. Area, where publication is appropriate
5. Textile/material, where known
6. Initial condition / scope
7. Assessment decision
8. Method / approach actually used
9. Operational notes where relevant
10. Documented outcome
11. Limitations / remaining marks where applicable
12. Publication approval

Optional evidence:
- testimonial quote and attribution, only when `permissionConfirmed` is true;
- approved project images with useful alt text;
- redaction/privacy notes;
- published/updated dates.

## Intake workflow

### Stage 1 — Capture facts

Immediately after a suitable completed project, capture factual project notes. Separate observable facts from marketing interpretation. Do not convert assumptions into outcomes.

### Stage 2 — Evidence review

Check that the proposed record is supported by one or more of:
- technician/project notes;
- approved before/after photography;
- job scope or quotation;
- client correspondence confirming the completed scope/outcome;
- other reliable project documentation.

Record remaining stains, damage, limitations or areas outside the completed scope rather than hiding them.

### Stage 3 — Privacy and consent

Before public publication:
- decide whether the client/property may be identified;
- remove unnecessary personal information;
- confirm permission for any client quotation/testimonial;
- confirm permission for images when they could identify a person, home, business or other private detail;
- use `redactionNotes` to record what must stay private.

### Stage 4 — Sanity review

Create the `caseStudy` document as `draft` or `review` first. Check every required field for accuracy. `publicationApproved` should remain false during drafting.

### Stage 5 — Publication gate

Only after the factual and privacy review:
1. set `publicationApproved` to true;
2. set `publicationStatus` to `published`;
3. set `publishedAt`;
4. publish the Sanity document.

The website query requires both approval flags, providing a deliberate two-part gate.

## Testimonial rule

A testimonial is displayed only when:
- the case study itself passes the publication gate;
- the testimonial contains a quote; and
- `testimonial.permissionConfirmed == true`.

Do not paraphrase a client statement into a quotation. Do not create placeholder names or roles.

## Image rule

The schema can store approved publication images, but Sprint 06 does not automatically render those images publicly. This is deliberate: public image rendering should be added only after the image pipeline, consent handling, alt-text standard and responsive presentation are verified end to end.

## Evidence quality standard

Prefer records that answer:
- What was the actual property/service context?
- What textile/material was assessed?
- What condition or problem was present?
- Why was the selected method appropriate?
- What operational constraints mattered?
- What changed after the work?
- What did not change or remained limited?

A smaller number of well-evidenced cases is more valuable than a large portfolio of vague or unsupported claims.
