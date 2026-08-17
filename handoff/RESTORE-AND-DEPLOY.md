# JHB Curtain Cleaning — Restore, Run & Deploy

## Source of truth

Repository: `luxrugcare-cmyk/jhb-curtain-cleaning-greenfield`
Branch: `main`

## Restore from GitHub

```bash
git clone https://github.com/luxrugcare-cmyk/jhb-curtain-cleaning-greenfield.git
cd jhb-curtain-cleaning-greenfield
git switch main
```

## Restore from the bundled Git history

The delivery archive includes `repository-history.bundle` when built through the packaging workflow.

Example:

```bash
git clone repository-history.bundle jhb-curtain-cleaning-greenfield
cd jhb-curtain-cleaning-greenfield
git switch main
```

If needed, verify refs:

```bash
git bundle list-heads ../repository-history.bundle
```

## Install

Use the Node version required by the repository/CI environment.

```bash
npm ci
```

## Validate

Run the same key gates used in CI where available:

```bash
npm run audit:imports
npm run typecheck
npm run build
```

Also run any repository-defined dependency-security and smoke-test scripts/workflows before production deployment.

## Local development

Use the repository's `package.json` scripts as the source of truth.

Typical flow:

```bash
npm run dev
```

Then open the local Next.js URL shown by the dev server.

## Production environment

Current production hosting is Vercel.

Production project:

- name: `jhb-curtain-cleaning-greenfield`
- project ID: `prj_lbu1XdtAkiRKAGpAtxBe5voWIkEM`
- team slug: `bookish-eureka`

Production domain:

- `https://www.jhbcurtaincleaning.co.za`

Apex should redirect to the canonical www hostname.

## Environment variables

Do not copy secrets from old local files blindly.

Reconstruct required environment variables from:

1. repository code/configuration
2. Vercel project settings
3. Sanity project settings
4. approved service dashboards

Known analytics variable naming:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`

Do not add the older `NEXT_PUBLIC_GA4_ID` alias unless the current code explicitly requires it.

## Sanity

Sanity is the current CMS/evidence layer. Preserve the published/approved evidence workflow.

Do not replace Sanity with a historical CMS/database stack without an explicit architecture decision.

## Deployment guardrails

Before deploy/merge:

- CI must pass
- do not alter protected redirects/canonicals without evidence
- do not create speculative suburb doorway pages
- do not introduce duplicate GA4/GTM instrumentation
- do not expose secrets in client-side environment variables
- do not commit credential files

## GBP assets

Approved GBP square logo assets exist under:

`public/brand/gbp/logo/`

Operational generated imagery is not approved as real GBP evidence. Follow:

- `docs/gbp/GBP-VISUAL-ASSET-MANIFEST.md`
- `docs/gbp/REAL-PHOTO-INTAKE.md`
- `docs/gbp/GBP-VISUAL-QA-REPORT.md`

## Recovery verification checklist

After restoring the project:

1. `git status` clean
2. expected `main` HEAD confirmed
3. dependencies install successfully
4. typecheck passes
5. production build passes
6. local homepage renders
7. sitemap/robots are present
8. canonical hostname is www
9. apex redirect behavior remains intact
10. `/api/health` responds in production
11. GA4 direct instrumentation remains single-source
12. no unexpected secrets are present in working tree
