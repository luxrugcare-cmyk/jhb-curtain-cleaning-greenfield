# JHB Curtain Cleaning Greenfield v0.4

Gate 4 provisioning release.

## Provisioned externally

- Vercel static greenfield preview is live on a Vercel preview URL.
- Resend transactional subdomain `notify.jhbcurtaincleaning.co.za` created in the EU region.
- Resend sender configured with tracking disabled and TLS enforced.
- Sending-only Resend API key created and restricted to the transactional domain; the secret is intentionally not stored in this archive.

## Still requires external setup

- Add Resend DNS records and verify the domain.
- Create/configure Sanity project and dataset.
- Provision private Vercel Blob storage/token.
- Configure Attio custom pipeline/list strategy after approval; existing live Customer Success list is untouched.
- Configure GA4/GTM and Search Console.
- Configure optional n8n workflow.
- Add preview environment variables.

## Build validation status

Internal import audit passes. Full dependency install/typecheck/build could not be certified in the ChatGPT container because package retrieval timed out. The release therefore remains preview-only until CI/local build passes.
