# JHB Curtain Cleaning — Master Setup Plan

Date: 14 August 2026
Status: active setup / measurement-protection phase
Production source of truth: `luxrugcare-cmyk/jhb-curtain-cleaning-greenfield` on `main`
Production site: `https://www.jhbcurtaincleaning.co.za`

## 1. Operating rule

This plan consolidates the current website, SEO, analytics, CRM, email, local-search and authority setup into one source of truth.

Until the protected SEO rank refresh on 21 August 2026, do not materially change ranking-page architecture, canonicals, permanent redirects or the internal-link concentration that supports the current 25-keyword baseline unless fixing a verified production failure.

Paid acquisition, paid memberships, external applications, third-party outreach and public client evidence remain approval-gated.

## 2. Current setup status

### Website / deployment

- Greenfield production cutover completed on 14 August 2026.
- `www.jhbcurtaincleaning.co.za` is the production host.
- Apex permanently redirects to `www`.
- Greenfield project ID recorded in repo: `prj_lbu1XdtAkiRKAGpAtxBe5voWIkEM`.
- GitHub CI, build, typecheck and smoke-test gates are active.
- Sanity production reads use the public published dataset and do not require `SANITY_API_READ_TOKEN` at website runtime.
- Current ChatGPT Vercel connector is authenticated to team `info-79063000's projects`, which exposes no projects.
- Historical Vercel emails for the business point to team `info-54640290's projects`; an explicit project lookup against that team from the currently connected Vercel credential returns 403.

**Required action:** reconnect the Vercel app/tool under the team/account that owns the greenfield production project before attempting environment-variable or deployment-account changes through ChatGPT.

### Google Analytics 4

Code verified:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` conditionally loads GA4.
- residential flow emits `quote_submit` and `generate_lead` after accepted submission.
- commercial flow emits `commercial_submit` and `generate_lead` after accepted submission.
- analytics event contract includes call, WhatsApp, navigation, quote, commercial, service, sector, area, case-study and review interactions.
- quote and commercial lead payloads capture `utm_source`, `utm_medium`, `utm_campaign` and source URL.

Account evidence verified:
- connected Gmail receives Google Analytics performance reports, confirming a GA account/property exists for the user.

Not yet independently verified:
- production `NEXT_PUBLIC_GA_MEASUREMENT_ID` value;
- that the live greenfield domain is attached to the intended GA4 web stream;
- GA4 Realtime reception from the current production site;
- conversion/key-event configuration for `generate_lead`, `quote_submit`, `commercial_submit`, call and WhatsApp events.

**Required action after correct Vercel/Google account access is available:** confirm live Measurement ID, trigger controlled production events, verify Realtime/DebugView, confirm no PII in event parameters, then mark required lead events as key events.

### Google Search Console

Evidence verified:
- connected Gmail contains Search Console notices for an older Vercel preview property: `curtain-cleaning-website-25g3e6mp5-info-54640290s-projects.vercel.app`.
- no connected-Gmail evidence was found for a `jhbcurtaincleaning.co.za` or `www.jhbcurtaincleaning.co.za` Search Console property.

**Required live-domain setup:**
1. verify/create the domain property for `jhbcurtaincleaning.co.za` under the correct Google account;
2. confirm both apex and `www` consolidate correctly;
3. submit the current production sitemap;
4. inspect homepage, `/services/curtain-cleaning`, `/results`, `/areas/johannesburg`, `/areas/sandton`, `/areas/roodepoort` and redirected legacy URLs;
5. capture indexing status and query/page baseline;
6. monitor legacy-URL migration into canonical destinations;
7. use Search Console evidence to decide geographic/content expansion after the 21 August rank gate.

### Google Business Profile / local SEO

Current repo plan requires account-side verification; no connected GBP management tool is available in this ChatGPT session.

Required setup/verification:
- exact business name and NAP consistency;
- accurate primary and secondary categories;
- service-area configuration without fake locations;
- individual real service entries;
- production website and assessment URL;
- UTM-tagged website/appointment link where operationally appropriate;
- approved real project images;
- non-incentivised review request workflow;
- consistent review responses.

Do not create virtual offices, fake branches or service-area doorway pages.

### Attio CRM

Verified connected and healthy:
- workspace: `JHB Curtain Cleaning`;
- connected user has admin access.

Required operational verification:
- confirm lead fields and source/UTM mapping from website payloads;
- confirm residential/commercial classification and company upsert behaviour;
- confirm lead lifecycle/status conventions;
- confirm consent state is represented separately from ordinary service-enquiry processing;
- later reconcile booked-assessment and booked-work outcomes back to acquisition source.

### Resend

Verified connected and healthy:
- domain: `notify.jhbcurtaincleaning.co.za`;
- status: verified;
- sending: enabled;
- region: EU West;
- open/click tracking disabled.

Use Resend primarily for transactional/service communications and controlled consent-compliant sequences. Do not enable tracking or bulk marketing automatically without a defined measurement/privacy decision.

### AgentMail

Verified connected:
- active project inbox: `jhb-curtain-cleaning@agentmail.to`;
- purpose metadata: website, campaign and customer lead inbox;
- Johannesburg timezone and business phone recorded.

Marketing sends remain governed by consent/compliance status. AgentMail availability does not override POPIA or prior refusal/withdrawal state.

### Sanity / case-study evidence

Operational evidence desk is implemented.

Publication remains gated by:
- real completed work;
- retained supporting evidence;
- privacy/redaction review;
- client/testimonial/image approval where applicable;
- publication approval.

No fabricated client names, reviews, testimonials, case studies or before/after evidence.

### SEO measurement

Protected baseline date: 14 August 2026.
Tracked project: 25 Johannesburg keywords.
Next comparison: 21 August 2026.

On 21 August collect for every keyword:
- previous position;
- current position;
- ranking URL;
- top-10/top-20/top-50/top-100 bucket movement;
- legacy redirect URL versus canonical destination;
- curtain-cluster movement versus adjacent-service movement.

Only then select Sprint 09 changes.

### Authority / industry organisations

Research status:
- FEDHASA Inland: strong candidate; staff band and exact inclusion terms still need business-specific confirmation.
- JCCI: relevant B2B candidate; current base membership commercial terms unresolved.
- SAPOA: relevant property/facilities authority candidate; membership class/current fee and listing terms unresolved.
- SAFMA: defer unless FM pipeline justifies cost.

No application, payment or membership purchase solely for ranking benefit.

## 3. Execution sequence

### Phase A — complete now without ranking changes

1. Keep GitHub `main` green and deployment documentation aligned.
2. Reconnect Vercel to the team/account owning the greenfield production project.
3. Confirm deployed GA4 Measurement ID and web-stream ownership.
4. Verify GA4 Realtime and controlled lead/call/WhatsApp events.
5. Verify/create live-domain Search Console property and submit current sitemap.
6. Capture Search Console indexing/query/page baseline.
7. Verify GBP account, NAP, categories, services, URLs and service areas.
8. Verify Attio website-lead mapping and lifecycle fields.
9. Keep Resend and AgentMail operational but do not start unapproved marketing sends.
10. Begin intake of genuine case-study evidence when eligible jobs exist.

### Phase B — 21 August measurement gate

1. Run full 25-keyword refresh.
2. Compare against 14 August protected baseline.
3. Inspect ranking-URL migration from legacy URLs to canonical greenfield destinations.
4. Combine rank data with Search Console impressions/clicks/query evidence where available.
5. Produce Sprint 09 from evidence only.

### Phase C — post-measurement growth

Depending on evidence, prioritise one or more of:
- existing-page optimisation;
- internal-link authority refinement;
- remaining curtain decision-support guides;
- adjacent service content;
- commercial/hospitality/facilities content;
- verified case studies;
- evidence-backed area expansion;
- authority memberships/outreach after explicit approval;
- GBP content/review programme;
- social/content factory;
- consent-compliant email campaigns;
- paid search only after attribution is proven.

## 4. Current blockers

### Blocker 1 — Vercel account/team mismatch

Current connector team: `info-79063000's projects` with no visible projects.
Historical business team: `info-54640290's projects`.
Lookup of greenfield project under historical team using current credential: 403.

This must be solved by reconnecting/authenticating the Vercel integration to the correct owner/team. Do not redeploy or recreate the greenfield project to work around the credential mismatch.

### Blocker 2 — Google account-side tools not connected

Gmail proves Analytics and an older Search Console property exist, but this session has no direct Google Analytics, Search Console or Google Business Profile management connector.

Do not claim account-side verification until the correct Google property/account is accessible.

## 5. Approval gates

Explicit approval remains required before:
- paying FEDHASA/JCCI/SAPOA/SAFMA or another association;
- submitting a membership/application that creates obligations;
- contacting associations or external prospects on the user's behalf where not already authorised;
- starting or expanding marketing sends beyond the consent/compliance workflow;
- publishing client-identifiable case-study/testimonial/image evidence;
- starting paid media spend.

Routine repo documentation, CI fixes, analytics verification, account-health checks and non-destructive configuration may proceed without separate approval under the current instruction.

## 6. Completion definition

The current setup phase is complete when:
- correct Vercel project/team is connected and production env is verifiable;
- live-domain Search Console property is verified with sitemap accepted;
- GA4 production stream and controlled conversions are observed;
- GBP core profile data is verified;
- website-to-Attio attribution path is validated;
- Resend and AgentMail remain healthy;
- 21 August rank refresh is completed and Sprint 09 is selected from evidence.
