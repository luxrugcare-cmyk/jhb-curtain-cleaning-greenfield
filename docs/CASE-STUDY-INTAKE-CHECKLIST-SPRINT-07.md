# Case-study evidence intake desk — operations

Use this workflow before any JHB Curtain Cleaning project record is published.

## Architecture rule

The Sanity `production` dataset is publicly readable for published content. Treat Sanity as the **publication CMS**, not the private evidence archive.

Keep these outside Sanity unless and until the specific material is approved for public release:
- customer names or private contact details;
- internal job references;
- exact residential addresses;
- raw technician notes;
- unapproved before/after photographs;
- private correspondence;
- consent records or approval evidence;
- internal redaction notes that reveal private information.

Retain raw evidence in an authorised private business system. In Sanity, record only the category of retained evidence and the public-safe facts supported by it.

## 1. Create the case-study intake record

Open the Sanity Studio and create a **Case study** document.

Start with:
- public-safe working title;
- slug;
- work completion date, if known;
- publication status = `Draft intake`;
- publication approval = false.

Do not place private customer identifiers in the title or slug.

## 2. Capture project facts

Record only facts supported by retained evidence.

Required public case-study fields:
- property type;
- service;
- initial condition / scope;
- assessment decision;
- method / approach actually used;
- documented outcome.

Optional public-safe context:
- area/suburb, only where authorised;
- textile/material;
- operational constraints;
- limitations or remaining marks.

Do not add unsupported claims, invented outcomes, inferred customer identities, fabricated testimonials or reconstructed project details.

## 3. Record retained evidence categories

In **Retained evidence sources**, tick the categories actually held privately, such as:
- technician / project notes;
- assessment record;
- quotation / agreed scope;
- private before/after photography;
- client correspondence;
- completion / handover record;
- other retained documentation.

Do not paste the underlying private content, file URLs, job numbers or customer identifiers into Sanity.

After checking every factual claim against that evidence, set **Evidence review completed** to true.

## 4. Privacy and POPIA review

Choose one **Public identity treatment**:
- Anonymous — no identifying client/property details;
- Area only — suburb/area approved, client/property unnamed;
- Named identification approved.

Then verify:
- unnecessary personal information is removed;
- exact residential addresses are not published;
- area/suburb publication is authorised when used;
- customer or business naming is authorised when used;
- quotations have separate publication authority;
- photographs have separate publication authority;
- identifiable people, rooms, documents, vehicle plates, screens and other private details have been reviewed.

Set **Privacy / POPIA review completed** to true only after that review.

The `redactionNotes` field is a temporary drafting aid only. Because the dataset is public, it must be empty before the case can be marked Published. Keep sensitive redaction instructions in the private evidence record instead.

## 5. Testimonial approval

A testimonial may appear publicly only when:
- the quotation is accurate;
- attribution and role/organisation context are accurate;
- the customer has authorised publication of that exact presentation;
- `testimonial.publicationApproved == true`.

Do not paraphrase a customer statement into quotation marks. If approval is absent, remove the testimonial content before publishing the case study.

## 6. Image approval

Raw or unapproved evidence images must remain in private storage.

Only upload an image to Sanity after publication rights/privacy approval is already recorded privately.

For every Sanity image provide:
- evidence stage: Before / After / Detail / Context;
- approved image asset;
- descriptive alt text;
- optional factual caption;
- `publicationApproved == true`.

Sanity image assets are publication assets. Do not use Sanity as a private photo archive.

## 7. Publication gate

The Studio blocks `Published` unless all of the following are true:
- at least one retained evidence-source category is recorded;
- Evidence review completed = true;
- Privacy / POPIA review completed = true;
- Public identity treatment is selected;
- Case-study publication approval = true;
- Published date is present;
- temporary redaction notes are empty;
- any testimonial content has testimonial publication approval;
- every image stored on the case has image publication approval.

The public website independently requires BOTH:
- `publicationStatus == "published"`
- `publicationApproved == true`.

This is a second protection layer; the CMS gate does not replace the website query gate.

## 8. Final editorial check

Before moving a record to Published:
- every factual claim matches retained evidence;
- before/after language is descriptive rather than exaggerated;
- limitations and remaining marks are not hidden;
- identity treatment matches the recorded permission;
- testimonial approval is explicit if testimonial content is used;
- every public image has image-level approval;
- image alt text is factual and useful;
- SEO title/description introduce no claim absent from the case-study body;
- no private job reference, contact information, exact residential address or confidential note appears in the Sanity document.

## 9. Current runtime state

Production no longer requires a Sanity Viewer/read token. The website reads the public published-content dataset anonymously and the production deployment gate requires HTTP 200 from the approved-case query.

The production query remains evidence-gated and currently renders only case studies that pass the two-part publication condition above.

## Evidence quality standard

Prefer records that answer:
- What was the actual property/service context?
- What textile/material was assessed?
- What condition or problem was present?
- Why was the selected method appropriate?
- What operational constraints mattered?
- What changed after the work?
- What did not change or remained limited?

A small portfolio of verified cases is more valuable than a large portfolio of vague or unsupported claims.
