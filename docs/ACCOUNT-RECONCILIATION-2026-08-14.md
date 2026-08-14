# JHB Curtain Cleaning — Account Reconciliation

Date: 14 August 2026
Status: sanitized operational reference

This document records account facts that are safe to keep in the public repository. It deliberately excludes passwords, OAuth client secrets, refresh tokens, deploy tokens, API keys, private credential-file paths and other live secrets.

## Production source of truth

- Production repository: `luxrugcare-cmyk/jhb-curtain-cleaning-greenfield`
- Production site: `https://www.jhbcurtaincleaning.co.za`
- Greenfield Vercel project recorded by the current deployment gate: `jhb-curtain-cleaning-greenfield`
- Prior project `my-project` is rollback/history only and must not be treated as current production.
- Current ChatGPT Vercel connector is not authenticated to the account/team that exposes the greenfield production project. Do not recreate or migrate production to work around this access mismatch.

## Google Analytics 4

Business-owned GA4 details supplied by the owner:

- Property: `JHB Curtain Cleaning`
- Measurement ID: `G-E4ZJQ57W4Y`
- Greenfield runtime variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Important:

- The older variable name `NEXT_PUBLIC_GA4_ID` belongs to prior architecture and must not be introduced into the greenfield app.
- GA4 is loaded directly by the current application. Do not add a duplicate GA4 tag through GTM.
- Production Realtime/key-event verification remains required once the correct Google/Vercel account context is accessible.

## Google Tag Manager

- GTM exists for the business but remains dormant by design for GA4.
- Do not activate an additional GA4 configuration tag unless the analytics architecture is intentionally changed and duplicate-counting controls are tested.

## Google Search Console

Owner-supplied live properties:

- Domain property: `sc-domain:jhbcurtaincleaning.co.za`
- URL-prefix property: `https://www.jhbcurtaincleaning.co.za/`

These supersede the earlier assumption that only an old Vercel preview property was available.

Operational use:

- submit/verify the current production sitemap;
- inspect indexing of greenfield canonical routes;
- monitor legacy redirect URL migration;
- capture query/page/impression/click baseline;
- combine GSC evidence with the protected 21 August 2026 rank refresh before Sprint 09 architecture decisions.

No OAuth secrets or refresh tokens are stored in this repository.

## Google Business Profile

Owner-supplied status:

- Profile is verified.
- Primary category currently recorded as `Dry Cleaner`.
- Service areas include Johannesburg, Sandton, Fourways, Roodepoort, Edenvale, Alberton, Rosebank, Pretoria and Midrand.
- Business hours, WhatsApp and core contact data are already configured.

Outstanding local-SEO actions remain account-side verification/optimization rather than profile creation:

- review the primary/secondary category choice against current Google category availability;
- verify exact NAP consistency with production site;
- verify services and service areas;
- add approved real project photos;
- obtain the business review link/Place ID through the authenticated Google account;
- maintain non-incentivized review acquisition and responses.

Do not create fake branches, virtual offices or doorway pages.

## CRM and email

Current connected systems remain:

- Attio: primary CRM/workspace for JHB Curtain Cleaning.
- Resend: verified transactional sending domain `notify.jhbcurtaincleaning.co.za`.
- AgentMail: project inbox `jhb-curtain-cleaning@agentmail.to`.

These remain part of the greenfield operating stack.

## Historical systems not to reintroduce by default

The owner credential reference includes older Supabase/PostgreSQL/Prisma and older GitHub/Vercel project details. Those are not dependencies of the current greenfield application and must not be reintroduced unless a new operational requirement is explicitly approved.

## Security rules

- Never commit `.mcp.json`, OAuth refresh tokens, OAuth client secrets, deploy tokens, API keys, service-account files, private certificates or local credential directories.
- Treat credentials shared in chat as exposed and rotate them through the relevant provider before long-term reuse.
- Prefer least-privilege credentials and separate read-only monitoring credentials from write/deployment credentials.
- Keep public repository documentation limited to non-secret identifiers and architecture facts.
