# Deployment Gate

## Production cutover status

**COMPLETED — 14 August 2026.** All acceptance gates below passed before the custom domain was moved to the greenfield Vercel project.

- Primary production host: `https://www.jhbcurtaincleaning.co.za`
- Apex: `https://jhbcurtaincleaning.co.za` with permanent `308` redirect to `www`
- Greenfield Vercel project: `jhb-curtain-cleaning-greenfield` (`prj_lbu1XdtAkiRKAGpAtxBe5voWIkEM`)
- Prior production project retained as rollback target: `my-project` (`prj_i1xMGttxRtgrr8GysXfPj4VzH0Mt`)
- Successful guarded cutover workflow: GitHub Actions run `31765744688`
- Cutover validation passed live routes, canonicals, sitemap, robots, apex redirect and production `/api/health`.
- Permanent custom-domain smoke and browser gates must continue to run against the live `www` hostname after cutover.

## Preview first

The production domain must remain untouched until the full Next.js application passes all checks below in a preview environment.

### Required build checks

```bash
npm install
npm run audit:imports
npm run typecheck
npm run build
```

### Required environment variables

Public:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BUSINESS_PHONE`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

Secrets:
- `ATTIO_API_KEY`
- `RESEND_API_KEY`
- `SANITY_API_READ_TOKEN`
- `BLOB_READ_WRITE_TOKEN`
- `N8N_LEAD_WEBHOOK_URL` (optional)
- `N8N_WEBHOOK_SECRET` (optional)

Operational:
- `RESEND_FROM_EMAIL=JHB Curtain Cleaning <website@notify.jhbcurtaincleaning.co.za>`
- `LEAD_NOTIFICATION_EMAIL=info@jhbcurtaincleaning.co.za`
- `ENABLE_FAILURE_ARCHIVE=true`

## Integration acceptance tests

1. Residential quote without photos.
2. Residential quote with 1-3 private photos.
3. Commercial assessment without company domain.
4. Commercial assessment with company domain.
5. Duplicate person upsert by email in Attio.
6. Commercial company upsert by domain.
7. Customer acknowledgement email delivery.
8. Internal lead notification delivery.
9. CRM unavailable: lead still persists through recovery path.
10. Resend unavailable: CRM lead still exists and response does not silently discard enquiry.
11. n8n unavailable: lead remains accepted; downstream automation can replay.
12. UTM/source fields appear in CRM description/data contract.
13. Private Blob URLs are never rendered publicly.
14. Sanity disabled: seed-content fallback renders.
15. Sanity enabled: CMS content renders.
16. `robots.txt`, sitemap, canonical and JSON-LD validate.
17. Mobile sticky actions do not obstruct form controls or consent UI.
18. Keyboard navigation and visible focus pass.
19. No production domain alias until all prior checks pass. **Passed; cutover completed 14 August 2026.**
