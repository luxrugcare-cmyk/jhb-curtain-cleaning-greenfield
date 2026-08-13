# GA4 setup and activation

## Application status

GA4 support is already implemented in `components/analytics/Analytics.tsx`. The Google tag loads only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured.

Conversion/contact events are emitted through the site's analytics event layer. Do not add a second Google tag or duplicate Tag Manager installation without first changing the analytics architecture.

## Google Analytics property

Create or use the Google Analytics account owned by JHB Curtain Cleaning, then create:

- Property name: `JHB Curtain Cleaning`
- Reporting time zone: South Africa / Johannesburg
- Currency: South African Rand (ZAR)
- Web stream name: `JHB Curtain Cleaning Website`
- Website URL at activation: the production website URL

Google Analytics creates a web Measurement ID in the format:

```text
G-XXXXXXXXXX
```

## Vercel environment variable

Configure the Measurement ID as:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The Measurement ID is not a secret, but it must match the intended GA4 web stream exactly.

Redeploy Production after adding or changing it.

## Validation

After deployment:

1. Load the production website in a normal browser session.
2. Confirm the Google tag request uses the configured Measurement ID.
3. Confirm GA4 Realtime shows the visit.
4. Trigger one controlled conversion flow and verify these implemented events where applicable:
   - `generate_lead`
   - `quote_submit`
   - `commercial_submit`
   - Call click
   - WhatsApp click
5. Confirm event parameters contain no customer PII.
6. Mark the desired lead event(s) as key events/conversions in GA4 after collection is verified.

## Launch gate

GA4 is considered active only after Realtime data and at least one controlled conversion event are observed in the correct property. Do not infer activation merely from the environment variable being present.
