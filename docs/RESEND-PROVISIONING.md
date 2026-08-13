# Resend provisioning state

Sender domain: `notify.jhbcurtaincleaning.co.za`

Status at release: pending DNS verification.

Draft templates:
- Residential acknowledgement: `be172493-9ce0-4cd8-bdc4-48db2d2371e3`
- Commercial acknowledgement: `5c62cd77-fbe9-4273-bf50-7f2a62df41de`
- Internal lead notification: `bcb0088f-db89-4046-87df-e8e2ca1ffc4c`

Webhook exists in Resend but is disabled until the full Next.js route is deployed. Keep `RESEND_WEBHOOK_SECRET` only in deployment secrets; it is intentionally not stored in this repository.

The application prefers the template IDs above through environment variables and falls back to inline HTML if those variables are absent.
