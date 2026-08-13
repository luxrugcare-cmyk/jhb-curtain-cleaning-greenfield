# JHB Curtain Cleaning — Greenfield v0.2

A clean-room Next.js implementation of the approved residential/commercial architecture. No previous website source code is used.

## Implemented
- Next.js App Router marketing site and dynamic service/sector/area templates
- Separate residential quote and commercial assessment funnels
- Responsive Premium Hybrid design system
- `/api/leads` validation/normalization boundary
- Attio People adapter using only verified workspace attributes
- Resend acknowledgement + internal lead notification adapter
- GA4 dataLayer/event contract
- LocalBusiness and Service JSON-LD helpers
- generated sitemap, robots and web manifest
- vendor-neutral CMS content model for later Sanity implementation
- POPIA-relevant consent fields in lead contract and CRM mapping specification

## Safe development mode
With no Attio/Resend credentials, integrations remain in stub mode. This prevents accidental CRM writes and emails during development.

## Run locally
```bash
npm install
npm run typecheck
npm run build
npm run dev
```

## Production configuration
Copy `.env.example` to `.env.local` and configure verified production credentials. Do not commit secrets.

See `docs/INTEGRATION-CONTRACT.md` and `docs/ATTIO-MAPPING.md`.

## v0.3 additions
Sanity-ready content schemas, private photo upload adapter, recovery archive, n8n downstream adapter, and verified Attio mapping documentation.
