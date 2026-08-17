# JHB Curtain Cleaning — Security & Credential Rotation Handoff

## Package policy

The downloadable handoff archive is intentionally sanitized.

It does NOT include:

- passwords
- API keys
- private keys
- OAuth client secrets
- OAuth refresh tokens
- browser cookies
- Chrome profile data
- Vercel deploy tokens
- Resend API keys
- Sanity private tokens
- local `.env.local` files
- secret-bearing MCP configuration

## Why

Long-lived credentials have previously been pasted into conversational/project material. Any such credential should be treated as potentially exposed until rotated.

Do not preserve exposed secrets inside a handoff ZIP for convenience.

## Recommended coordinated rotation order

1. Google OAuth client secrets / refresh tokens used for Search Console tooling.
2. Vercel deploy/access token.
3. Resend API key(s).
4. Any Sanity private tokens that may have been shared outside their intended environment.
5. Any GitHub personal access token previously pasted or stored outside the supported credential manager.
6. Any other third-party API tokens referenced in historical account sheets.

## Rotation discipline

For each service:

- confirm which production workload currently depends on the credential
- create/reissue the replacement credential
- update deployment/local secret storage
- verify production functionality
- revoke the old credential only after the replacement is proven
- record the rotation date and owner

Avoid rotating all integrations blindly at once because that makes failure isolation harder.

## Environment-variable rules

- keep secret values in the deployment provider or approved local secret store
- commit only `.env.example`/documentation placeholders
- never commit `.env.local`, OAuth token caches, downloaded service-account key files, or browser auth state
- never paste live secrets into Markdown documentation

## Browser authentication

For authenticated Google account work:

- use the existing signed-in browser session when supported
- do not copy cookies
- do not clone Chrome profiles
- do not extract Google authentication files
- do not automate around a reverification, suspension, ownership, identity, or policy warning

## Repository guardrails

Before pushing security-sensitive changes:

- review `git diff`
- run secret scanning if available
- verify `.gitignore`
- ensure generated handoff/export directories do not contain local credentials

## Incident note

If a credential from older material is still active and was ever pasted into chat, a local document, or a public/remote repository, prioritize rotation even if no abuse is observed.
