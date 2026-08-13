# Sanity CMS setup

## Architecture

Sanity Content Lake is the CMS backend. The customer-facing Next.js application consumes published content through `next-sanity`.

Sanity Studio is **not embedded in the public website**. The Studio should be deployed separately using Sanity-hosted Studio (`*.sanity.studio`). This keeps CMS administration and its CLI/workbench toolchain out of the public application route surface.

The repository keeps:

- `sanity.config.ts`
- `sanity/schemaTypes/*`
- `integrations/sanity/*`
- `next-sanity` content delivery

The public `/studio` route has been removed.

## Production project settings

Create one Sanity project with:

- Project name: `JHB Curtain Cleaning Content`
- Dataset: `production`
- Dataset visibility: **private**
- API version: `2026-08-13`

Create a read-only API token for the production website. Do not paste the token into chat or commit it to Git.

## Required Vercel Production variables

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=<project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-13
SANITY_API_READ_TOKEN=<read-only token>
```

`SANITY_API_READ_TOKEN` is server-only. The production Sanity client automatically uses authenticated non-CDN reads when this token is configured.

## Studio deployment

Authenticate the Sanity CLI with the correct Sanity account, then deploy the Studio using the repository schema/configuration. Use Sanity-hosted Studio rather than re-adding `/studio` to the public Vercel application.

For CI-based Studio deployment, use a dedicated Sanity deployment token with the minimum required permissions. Never expose that token through `NEXT_PUBLIC_*` variables.
