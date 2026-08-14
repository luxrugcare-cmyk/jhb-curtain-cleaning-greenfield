#!/usr/bin/env python3
"""Read-only Google Search Console audit for JHB Curtain Cleaning.

Reads OAuth credentials from local files only. Never prints client secrets,
refresh tokens, or access tokens. Uses Python standard library only.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import sys
import urllib.error
import urllib.parse
import urllib.request

DEFAULT_CREDENTIALS_DIR = pathlib.Path(r"C:\dev\credentials")
DEFAULT_SITE = "sc-domain:jhbcurtaincleaning.co.za"
DEFAULT_URL_PROPERTY = "https://www.jhbcurtaincleaning.co.za/"
DEFAULT_SITEMAP = "https://www.jhbcurtaincleaning.co.za/sitemap.xml"
DEFAULT_INSPECT_URLS = [
    "https://www.jhbcurtaincleaning.co.za/",
    "https://www.jhbcurtaincleaning.co.za/services/curtain-cleaning",
    "https://www.jhbcurtaincleaning.co.za/results",
    "https://www.jhbcurtaincleaning.co.za/areas/johannesburg",
    "https://www.jhbcurtaincleaning.co.za/areas/sandton",
    "https://www.jhbcurtaincleaning.co.za/areas/roodepoort",
]


def fail(message: str) -> None:
    raise SystemExit(message)


def load_oauth_client(path: pathlib.Path) -> tuple[str, str, str]:
    data = json.loads(path.read_text(encoding="utf-8"))
    cfg = data.get("installed") or data.get("web") or data
    client_id = cfg.get("client_id")
    client_secret = cfg.get("client_secret")
    token_uri = cfg.get("token_uri", "https://oauth2.googleapis.com/token")
    if not client_id or not client_secret:
        fail(f"OAuth client file is missing client_id/client_secret: {path}")
    return client_id, client_secret, token_uri


def load_refresh_token(path: pathlib.Path) -> str:
    token = path.read_text(encoding="utf-8").strip()
    if not token:
        fail(f"Refresh token file is empty: {path}")
    return token


def request_json(
    url: str,
    *,
    method: str = "GET",
    access_token: str | None = None,
    body: dict | None = None,
    form: dict | None = None,
) -> dict:
    headers = {"User-Agent": "JHB-Curtain-Cleaning-GSC-Audit/1.0"}
    data = None
    if access_token:
        headers["Authorization"] = f"Bearer {access_token}"
    if body is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(body).encode("utf-8")
    elif form is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
        data = urllib.parse.urlencode(form).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as response:
            raw = response.read().decode("utf-8")
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode("utf-8", errors="replace")
        try:
            err = json.loads(raw)
            message = err.get("error", {}).get("message") or err.get("error_description") or raw
        except Exception:
            message = raw
        fail(f"HTTP {exc.code} calling {url}: {message[:500]}")
    except urllib.error.URLError as exc:
        fail(f"Network error calling {url}: {exc.reason}")


def exchange_access_token(client_id: str, client_secret: str, refresh_token: str, token_uri: str) -> str:
    data = request_json(
        token_uri,
        method="POST",
        form={
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": refresh_token,
            "grant_type": "refresh_token",
        },
    )
    access_token = data.get("access_token")
    if not access_token:
        fail("OAuth token exchange returned no access_token")
    return access_token


def enc(value: str) -> str:
    return urllib.parse.quote(value, safe="")


def list_sites(access_token: str) -> list[dict]:
    data = request_json(
        "https://www.googleapis.com/webmasters/v3/sites",
        access_token=access_token,
    )
    return data.get("siteEntry", [])


def list_sitemaps(access_token: str, site_url: str) -> list[dict]:
    data = request_json(
        f"https://www.googleapis.com/webmasters/v3/sites/{enc(site_url)}/sitemaps",
        access_token=access_token,
    )
    return data.get("sitemap", [])


def search_analytics(access_token: str, site_url: str, days: int) -> dict:
    end = dt.date.today() - dt.timedelta(days=3)
    start = end - dt.timedelta(days=max(days - 1, 0))
    return request_json(
        f"https://www.googleapis.com/webmasters/v3/sites/{enc(site_url)}/searchAnalytics/query",
        method="POST",
        access_token=access_token,
        body={
            "startDate": start.isoformat(),
            "endDate": end.isoformat(),
            "dimensions": ["query", "page"],
            "rowLimit": 250,
            "dataState": "final",
        },
    )


def inspect_url(access_token: str, site_url: str, inspection_url: str) -> dict:
    return request_json(
        "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
        method="POST",
        access_token=access_token,
        body={
            "inspectionUrl": inspection_url,
            "siteUrl": site_url,
            "languageCode": "en-US",
        },
    )


def summarize_inspection(result: dict) -> dict:
    index = result.get("inspectionResult", {}).get("indexStatusResult", {})
    return {
        "verdict": index.get("verdict"),
        "coverageState": index.get("coverageState"),
        "indexingState": index.get("indexingState"),
        "pageFetchState": index.get("pageFetchState"),
        "robotsTxtState": index.get("robotsTxtState"),
        "googleCanonical": index.get("googleCanonical"),
        "userCanonical": index.get("userCanonical"),
        "lastCrawlTime": index.get("lastCrawlTime"),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Read-only GSC audit; local credential files only.")
    parser.add_argument("--credentials-dir", type=pathlib.Path, default=DEFAULT_CREDENTIALS_DIR)
    parser.add_argument("--client-file", default="gsc-oauth-client.json")
    parser.add_argument("--refresh-token-file", default="gsc-refresh-token.txt")
    parser.add_argument("--site", default=DEFAULT_SITE)
    parser.add_argument("--url-property", default=DEFAULT_URL_PROPERTY)
    parser.add_argument("--sitemap", default=DEFAULT_SITEMAP)
    parser.add_argument("--days", type=int, default=28)
    parser.add_argument("--output", type=pathlib.Path, default=None, help="Optional local JSON output path outside the repo.")
    args = parser.parse_args()

    client_path = args.credentials_dir / args.client_file
    refresh_path = args.credentials_dir / args.refresh_token_file
    if not client_path.exists():
        fail(f"Missing OAuth client file: {client_path}")
    if not refresh_path.exists():
        fail(f"Missing refresh token file: {refresh_path}")

    client_id, client_secret, token_uri = load_oauth_client(client_path)
    refresh_token = load_refresh_token(refresh_path)
    access_token = exchange_access_token(client_id, client_secret, refresh_token, token_uri)
    print("PASS OAuth refresh-token exchange succeeded (tokens not displayed)")

    sites = list_sites(access_token)
    by_url = {x.get("siteUrl"): x.get("permissionLevel") for x in sites}
    required = [args.site, args.url_property]
    missing = [x for x in required if x not in by_url]
    if missing:
        fail("Missing required Search Console properties: " + ", ".join(missing))
    print(f"PASS domain property present: {args.site} ({by_url[args.site]})")
    print(f"PASS URL-prefix property present: {args.url_property} ({by_url[args.url_property]})")

    sitemaps = list_sitemaps(access_token, args.url_property)
    sitemap = next((s for s in sitemaps if s.get("path") == args.sitemap), None)
    if not sitemap:
        fail(f"Production sitemap is not listed in GSC for {args.url_property}: {args.sitemap}")
    print("PASS production sitemap is listed in Search Console")
    if sitemap.get("isPending"):
        print("WARN production sitemap is still pending")
    if sitemap.get("errors") or sitemap.get("warnings"):
        print(f"WARN sitemap reports errors={sitemap.get('errors', 0)} warnings={sitemap.get('warnings', 0)}")
    else:
        print("PASS sitemap reports no API-level errors/warnings")

    analytics = search_analytics(access_token, args.site, args.days)
    rows = analytics.get("rows", [])
    print(f"PASS Search Analytics query returned {len(rows)} top query/page rows for the recent {args.days}-day window")

    inspection_summary = {}
    for url in DEFAULT_INSPECT_URLS:
        result = inspect_url(access_token, args.url_property, url)
        summary = summarize_inspection(result)
        inspection_summary[url] = summary
        verdict = summary.get("verdict") or "UNKNOWN"
        coverage = summary.get("coverageState") or "UNKNOWN"
        user_can = summary.get("userCanonical")
        google_can = summary.get("googleCanonical")
        print(f"INSPECT {url}: verdict={verdict}; coverage={coverage}; userCanonical={user_can}; googleCanonical={google_can}")

    report = {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "site": args.site,
        "urlProperty": args.url_property,
        "properties": {k: by_url[k] for k in required},
        "sitemap": {
            "path": sitemap.get("path"),
            "lastSubmitted": sitemap.get("lastSubmitted"),
            "lastDownloaded": sitemap.get("lastDownloaded"),
            "isPending": sitemap.get("isPending"),
            "errors": sitemap.get("errors"),
            "warnings": sitemap.get("warnings"),
            "contents": sitemap.get("contents", []),
        },
        "searchAnalytics": {
            "days": args.days,
            "rowCount": len(rows),
            "rows": rows,
        },
        "urlInspection": inspection_summary,
    }

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"PASS wrote local audit report: {args.output}")

    print("PASS GSC read-only audit completed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
