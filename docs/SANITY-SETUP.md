# Sanity CMS setup

## Architecture

Sanity Content Lake is the CMS backend. The customer-facing Next.js application consumes published content through `next-sanity`.

Sanity Studio is **not embedded in the public website**. The Studio should be deployed separately using Sanity-hosted Studio (`*.sanity.studio`). This keeps CMS administration and its CLI/workbench toolchain out of the public application route surface.

The repository keeps:

- `sanity.config.ts`
- `sanity/schemaTypes/*`
- `integrations/sanity/*`
- `next-sanity` published-content client

The public `/studio` route is intentionally absent.

## Project to create

- Project name: `JHB Curtain Cleaning`
- Dataset: `production`
- Dataset purpose: published website content

Create the project while authenticated to the intended Sanity account. Current Sanity CLI supports:

```bash
npx sanity@latest projects create "JHB Curtain Cleaning" --dataset=production
```

Choose dataset visibility deliberately during project creation. If the production dataset is public, the website can fetch published documents through the CDN without a read token. If it is private, configure a server-side read token before enabling CMS-backed page rendering.

## Website environment variables

Required:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-08-13
```

Only if a private dataset or authenticated server-side reads are introduced:

```text
SANITY_API_READ_TOKEN=<secret-read-token>
```

Never expose `SANITY_API_READ_TOKEN` through a `NEXT_PUBLIC_` variable.

## Studio deployment

After the real project ID is installed in the environment, use the repository's existing `sanity.config.ts` and schemas and deploy the Studio separately:

```bash
npx sanity@latest deploy
```

Choose a dedicated hostname such as `jhb-curtain-cleaning.sanity.studio` if available.

For automated Studio deployments, use a Sanity authorization token stored as a CI secret; never commit it.

## Activation gate

Do not switch public pages from code seed data to Sanity-backed content until:

1. Project and `production` dataset exist.
2. Schema deploy succeeds.
3. Studio login works.
4. Required documents are created and reviewed.
5. Website environment variables are configured.
6. Preview and published-content behavior are tested.
7. No unverified business claim is promoted from seed content into published CMS content.
