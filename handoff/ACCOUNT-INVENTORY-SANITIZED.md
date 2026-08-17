# JHB Curtain Cleaning — Sanitized Account & Integration Inventory

This inventory deliberately excludes passwords, API keys, private keys, OAuth refresh tokens, cookies, access tokens, and local secret file contents.

## Google owner account

Primary Google owner identity used for the business stack:

- Account: `accsu1983@gmail.com`
- Display name observed: Steve
- Owns/manages the Google Business Profile and related Google properties used by the project.

## Google Business Profile

- Business: JHB Curtain Cleaning
- Status: Verified
- Current primary category at last authenticated inspection: Dry cleaner
- Business model: service-area/home-service
- Public street address: hidden
- Phone: +27 75 011 9200
- Website: https://www.jhbcurtaincleaning.co.za
- WhatsApp: +27 75 011 9200
- Official review URL: https://g.page/r/CbZEjFiE3HjZEBM/review
- Service areas: Johannesburg, Sandton, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, Pretoria, Midrand

## Google Search Console

Known owned properties:

- `sc-domain:jhbcurtaincleaning.co.za`
- `https://www.jhbcurtaincleaning.co.za/`

Authenticated read-only validation succeeded on 2026-08-14.

Credential material is NOT included in this archive. Re-authenticate through the owner account or recreate OAuth credentials as required.

## Google Analytics 4

- Property: JHB Curtain Cleaning
- Measurement ID: `G-E4ZJQ57W4Y`
- Production code uses `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Direct production page-view dispatch has been verified

Do not introduce a second GA4 tag through GTM unless direct instrumentation is intentionally removed.

## Google Tag Manager

A GTM container exists historically, but it is dormant by design for the current production implementation. Do not activate duplicate GA4 tracking.

## GitHub

- Repository: `luxrugcare-cmyk/jhb-curtain-cleaning-greenfield`
- Default branch: `main`
- Authenticated repository owner/collaborator permissions have included admin/push/maintain.

## Vercel

Current production project:

- Project name: `jhb-curtain-cleaning-greenfield`
- Project ID: `prj_lbu1XdtAkiRKAGpAtxBe5voWIkEM`
- Team slug: `bookish-eureka`

Rollback project retained historically:

- Project name: `my-project`
- Project ID: `prj_i1xMGttxRtgrr8GysXfPj4VzH0Mt`

No Vercel token is included in this archive.

## Sanity

Sanity is the current content/evidence platform used by the greenfield codebase.

Runtime design:

- published public reads are tokenless where appropriate
- case-study evidence requires published/approved state
- production website runtime should not require a broad `SANITY_API_READ_TOKEN`

Any project IDs/dataset values required by the code should be obtained from the repository's public configuration or from the Sanity workspace/account. No private Sanity token is included here.

## Attio

Attio is used for CRM and operational task tracking.

Known workspace member ID used for assignment in prior work:

- `14c73ae3-f60a-4ec3-8535-0e4b0dfc52d5`

Do not treat this identifier as an authentication secret; actual Attio credentials are not included.

## Resend

Resend is part of the email infrastructure/communications stack.

No API key is included. Reconnect through the business Resend account and configure secrets in the deployment environment if required.

## Domain / website identity

- Canonical production URL: https://www.jhbcurtaincleaning.co.za
- Apex: https://jhbcurtaincleaning.co.za (redirects to www)
- Email: info@jhbcurtaincleaning.co.za
- Phone: +27 75 011 9200

## Historical / non-authoritative integrations

Older materials may reference Supabase, Prisma, Neon, legacy repositories, old deployment projects, or earlier prototype stacks. They are not authoritative for the current greenfield site unless a new capability requirement explicitly justifies reintroduction.

## Local tooling references

Previously used local tooling has included:

- Windows PowerShell
- Codex CLI / Codex desktop workflows
- Chrome signed-in profile for authenticated Google work
- Windows UI Automation fallback for browser interaction when the native browser plugin backend was unavailable
- Playwright for non-authenticated browser checks only

Do not copy browser cookies or clone authenticated Chrome profiles as a shortcut.
