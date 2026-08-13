# Integration Contract

UI components submit to `/api/leads` only. They never call Attio or Resend directly.

`/api/leads` validates and normalizes the payload, then calls the CRM adapter and email adapter.

If no API credentials are configured, adapters operate in stub mode. This permits safe local development without creating test CRM records or sending email.

## Required production environment variables
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GA_MEASUREMENT_ID
- ATTIO_API_KEY
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- LEAD_NOTIFICATION_EMAIL
- NEXT_PUBLIC_BUSINESS_PHONE

## Deferred integrations
- Sanity project ID/dataset/token
- Calendly routing
- WhatsApp Cloud API
- n8n webhooks
- production image storage
