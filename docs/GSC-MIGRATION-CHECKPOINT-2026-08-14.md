# Google Search Console Migration Checkpoint — 2026-08-14

Status: protected observation checkpoint; no SEO architecture changes and no indexing requests submitted by automation.

## Verified account state

The authenticated read-only Search Console audit completed successfully on 2026-08-14 and established:

- domain property `sc-domain:jhbcurtaincleaning.co.za`: `siteOwner`;
- URL-prefix property `https://www.jhbcurtaincleaning.co.za/`: `siteOwner`;
- production sitemap is listed in Search Console;
- sitemap API values report zero errors and zero warnings (the first runner output displayed a false `WARN` because the API returned zero values as strings; that reporter bug has been fixed);
- Search Analytics returned 25 query/page rows for the recent 28-day window.

## URL Inspection checkpoint

| URL | Google state on 2026-08-14 | Interpretation |
|---|---|---|
| `https://www.jhbcurtaincleaning.co.za/` | Duplicate; Google chose a different canonical | Google-selected canonical was the apex homepage while the user canonical was `www` |
| `/services/curtain-cleaning` | URL is unknown to Google | discovery/index migration pending |
| `/results` | URL is unknown to Google | discovery/index migration pending |
| `/areas/johannesburg` | URL is unknown to Google | discovery/index migration pending |
| `/areas/sandton` | URL is unknown to Google | discovery/index migration pending |
| `/areas/roodepoort` | URL is unknown to Google | discovery/index migration pending |

## Why no canonical architecture change is warranted

Independent production verification already confirms the intended signals are aligned:

1. the apex domain returns a permanent HTTP `308` redirect to `www`;
2. the live `www` homepage declares the `www` homepage as canonical;
3. the generated sitemap uses the configured `www` site URL;
4. internal greenfield architecture uses canonical destination URLs rather than the legacy ranking URLs.

The current Search Console state is therefore treated as an indexing/canonical re-evaluation checkpoint, not evidence that production should be switched back to the apex hostname.

## Protected ranking URL migrations to compare on 2026-08-21

These migrations have existing ranking equity in the protected 2026-08-14 baseline and must be compared before any redirect or architecture change:

| Legacy ranking URL | Canonical greenfield destination | Baseline relevance |
|---|---|---|
| `/testimonials` | `/results` | `curtain cleaners johannesburg` #13 |
| `/blog/curtain-cleaning-sandton-guide` | `/areas/sandton` | multiple curtain-intent terms, including Sandton #14 |
| `/pricing` | `/advice/curtain-cleaning-prices` | `curtain cleaning prices` #38 |
| `/services/curtain-blind-cleaning` | `/services/curtain-cleaning` | `curtain cleaning randburg` #70 |

## August 21 decision rules

At the scheduled rank refresh:

- keep all permanent redirects unless fresh evidence shows a concrete technical fault;
- compare ranking position and ranking URL against the protected August 14 baseline;
- inspect whether Google has moved canonical/index ownership from each legacy URL to its greenfield destination;
- distinguish `URL is unknown to Google` from a crawl/indexability error;
- if a canonical destination remains unknown but is live, indexable, internally linked and present in the submitted sitemap, use URL Inspection live testing before considering a manual indexing request;
- use individual `Request indexing` only for a small number of high-value canonical destinations where live testing passes; do not repeatedly request the same URL;
- do not create additional service-by-suburb pages to compensate for temporary migration lag;
- do not switch the preferred hostname merely because Google's indexed canonical is temporarily stale.

## Current operational conclusion

No production SEO defect has been established. The correct action is controlled observation through the 2026-08-21 measurement checkpoint, with targeted URL Inspection only where the next dataset demonstrates a persistent migration issue.
