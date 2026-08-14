# Case-study intake checklist — Sprint 07 operations

Use this checklist before any JHB Curtain Cleaning project record is published.

## 1. Source evidence

Record only facts that can be supported by job notes, assessment records, photographs, correspondence or other retained evidence.

Required core fields:
- project title
- property type
- service
- initial condition / scope
- assessment decision
- cleaning method / approach
- documented outcome

Optional context:
- area
- textile / material
- operational constraints
- limitations / remaining marks

Do not add unsupported claims, invented outcomes, inferred customer identities, fabricated testimonials or reconstructed project details.

## 2. Privacy and POPIA screening

Before publication:
- remove personal information that is unnecessary for the case study;
- avoid exact residential addresses unless there is a compelling, authorised reason to publish them;
- record any redaction requirements in `redactionNotes`;
- do not infer publication consent from service delivery consent;
- treat photographs, names, quotations and organisation identifiers as separately reviewable evidence.

## 3. Testimonial approval

A testimonial may appear publicly only when:
- the quotation is accurate;
- attribution is accurate and within the customer's approval;
- `testimonial.publicationApproved == true`.

If approval is absent, the project may still be published without the testimonial if the case-study-level approval requirements are satisfied.

## 4. Image approval

Each evidence image requires:
- the image asset;
- descriptive alt text;
- optional factual caption;
- `publicationApproved == true` for that specific image.

Do not publish an image merely because the overall case study has publication approval.

## 5. Case-study publication gate

The public website query must continue to require BOTH:
- `publicationStatus == "published"`
- `publicationApproved == true`

The CMS schema also prevents a document from being marked Published without the case-study approval flag.

## 6. Final editorial check

Before moving a record to Published:
- factual claims match retained evidence;
- before/after language is descriptive rather than exaggerated;
- limitations and remaining marks are not hidden;
- customer names, business names, identifiable rooms and exact locations have been checked for authorisation;
- testimonial approval is explicit if a testimonial is used;
- every public image has image-level approval;
- SEO title/description do not introduce claims absent from the case-study body.

## 7. Sanity credential dependency

As of 14 August 2026, the production Sanity read token is configured but fails authenticated reads with HTTP 401. The public website remains operational because Sanity reads fail softly to static fallback content.

Credential remediation acceptance criteria:
1. create or rotate a read-only Sanity token for the correct project/dataset;
2. update only the production `SANITY_API_READ_TOKEN` in the correct Vercel project (`bookish-eureka/jhb-curtain-cleaning-greenfield`);
3. trigger the normal Vercel Production Deploy workflow;
4. the non-blocking `Validate Sanity read access` step must report HTTP 200 / PASS;
5. public route smoke tests must remain green;
6. `/results` must remain evidence-gated and must not expose draft/unapproved case studies.

Do not weaken the fail-soft fallback or publication gates to work around an invalid token.
