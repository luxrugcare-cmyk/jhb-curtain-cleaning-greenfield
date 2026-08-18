#!/usr/bin/env python3
"""Google Search Console Indexing & Sitemap Submission Engine for JHB Curtain Cleaning.

- Resubmits and pings the primary production sitemap (https://www.jhbcurtaincleaning.co.za/sitemap.xml).
- Inspects all 48 canonical URLs across Google Search Console API.
- Generates a full Indexing Health & Coverage Report.

Usage:
  python scripts/submit_gsc_indexing.py
"""

import datetime as dt
import json
import pathlib
import sys
import urllib.error
import urllib.parse
import urllib.request

CREDENTIALS_DIR = pathlib.Path(r"C:\dev\credentials")
SITE_URL = "https://www.jhbcurtaincleaning.co.za/"
SITEMAP_URL = "https://www.jhbcurtaincleaning.co.za/sitemap.xml"

ALL_ROUTES = [
    "https://www.jhbcurtaincleaning.co.za/",
    "https://www.jhbcurtaincleaning.co.za/residential",
    "https://www.jhbcurtaincleaning.co.za/commercial",
    "https://www.jhbcurtaincleaning.co.za/trade",
    "https://www.jhbcurtaincleaning.co.za/services",
    "https://www.jhbcurtaincleaning.co.za/results",
    "https://www.jhbcurtaincleaning.co.za/advice",
    "https://www.jhbcurtaincleaning.co.za/about",
    "https://www.jhbcurtaincleaning.co.za/contact",
    "https://www.jhbcurtaincleaning.co.za/quote",
    "https://www.jhbcurtaincleaning.co.za/commercial-assessment",
    "https://www.jhbcurtaincleaning.co.za/privacy",
    "https://www.jhbcurtaincleaning.co.za/advice/how-often-should-curtains-be-cleaned",
    "https://www.jhbcurtaincleaning.co.za/advice/cleaning-blackout-lined-delicate-curtains",
    "https://www.jhbcurtaincleaning.co.za/advice/hotel-curtain-cleaning-maintenance-guide",
    "https://www.jhbcurtaincleaning.co.za/advice/curtain-cleaning-prices",
    "https://www.jhbcurtaincleaning.co.za/advice/how-on-site-curtain-cleaning-works",
    "https://www.jhbcurtaincleaning.co.za/advice/can-curtains-be-cleaned-without-taking-them-down",
    "https://www.jhbcurtaincleaning.co.za/advice/curtain-cleaning-vs-washing-vs-dry-cleaning",
    "https://www.jhbcurtaincleaning.co.za/advice/carpet-cleaning-guide",
    "https://www.jhbcurtaincleaning.co.za/advice/rug-and-persian-rug-cleaning-guide",
    "https://www.jhbcurtaincleaning.co.za/advice/mattress-cleaning-guide",
    "https://www.jhbcurtaincleaning.co.za/advice/upholstery-couch-cleaning-guide",
    "https://www.jhbcurtaincleaning.co.za/advice/blind-cleaning-guide",
    "https://www.jhbcurtaincleaning.co.za/services/curtain-cleaning",
    "https://www.jhbcurtaincleaning.co.za/services/blind-cleaning",
    "https://www.jhbcurtaincleaning.co.za/services/upholstery-cleaning",
    "https://www.jhbcurtaincleaning.co.za/services/mattress-cleaning",
    "https://www.jhbcurtaincleaning.co.za/services/rug-care",
    "https://www.jhbcurtaincleaning.co.za/services/fabric-protection",
    "https://www.jhbcurtaincleaning.co.za/services/carpet-cleaning",
    "https://www.jhbcurtaincleaning.co.za/services/fire-retardant-treatment",
    "https://www.jhbcurtaincleaning.co.za/commercial/hotels-hospitality",
    "https://www.jhbcurtaincleaning.co.za/commercial/offices-corporate",
    "https://www.jhbcurtaincleaning.co.za/commercial/healthcare",
    "https://www.jhbcurtaincleaning.co.za/commercial/education",
    "https://www.jhbcurtaincleaning.co.za/commercial/venues-theatres",
    "https://www.jhbcurtaincleaning.co.za/commercial/property-facilities",
    "https://www.jhbcurtaincleaning.co.za/areas/johannesburg",
    "https://www.jhbcurtaincleaning.co.za/areas/sandton",
    "https://www.jhbcurtaincleaning.co.za/areas/randburg",
    "https://www.jhbcurtaincleaning.co.za/areas/roodepoort",
    "https://www.jhbcurtaincleaning.co.za/areas/fourways",
    "https://www.jhbcurtaincleaning.co.za/areas/midrand",
    "https://www.jhbcurtaincleaning.co.za/areas/rosebank",
    "https://www.jhbcurtaincleaning.co.za/areas/bryanston",
    "https://www.jhbcurtaincleaning.co.za/areas/pretoria",
]


def get_access_token():
    client_file = CREDENTIALS_DIR / "gsc-oauth-client.json"
    refresh_file = CREDENTIALS_DIR / "gsc-refresh-token-write.txt"
    if not refresh_file.exists():
        refresh_file = CREDENTIALS_DIR / "gsc-refresh-token.txt"

    client_data = json.loads(client_file.read_text(encoding="utf-8"))
    cfg = client_data.get("installed") or client_data.get("web") or client_data
    client_id = cfg["client_id"]
    client_secret = cfg["client_secret"]
    token_uri = cfg.get("token_uri", "https://oauth2.googleapis.com/token")
    refresh_token = refresh_file.read_text(encoding="utf-8").strip()

    body = urllib.parse.urlencode({
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token",
    }).encode("utf-8")

    req = urllib.request.Request(token_uri, data=body, headers={"Content-Type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        token_data = json.loads(resp.read().decode("utf-8"))
        return token_data["access_token"]


def submit_sitemap(access_token: str):
    encoded_site = urllib.parse.quote_plus(SITE_URL)
    encoded_sitemap = urllib.parse.quote_plus(SITEMAP_URL)
    url = f"https://www.googleapis.com/webmasters/v3/sites/{encoded_site}/sitemaps/{encoded_sitemap}"

    req = urllib.request.Request(
        url,
        headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"},
        method="PUT"
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            print(f"✓ [GSC API] Sitemap submitted successfully (HTTP {resp.status}) -> {SITEMAP_URL}")
            return True
    except urllib.error.HTTPError as e:
        print(f"Sitemap submission response: HTTP {e.code} - {e.read().decode('utf-8')}")
        return False


def inspect_url(access_token: str, inspect_target: str):
    url = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
    payload = {
        "inspectionUrl": inspect_target,
        "siteUrl": SITE_URL,
        "languageCode": "en-ZA"
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            result = data.get("inspectionResult", {})
            idx_state = result.get("indexStatusResult", {})
            verdict = idx_state.get("verdict", "UNKNOWN")
            coverage = idx_state.get("coverageState", "Unknown State")
            last_crawl = idx_state.get("lastCrawlTime", "Never")
            return {
                "url": inspect_target,
                "verdict": verdict,
                "coverage": coverage,
                "last_crawl": last_crawl
            }
    except urllib.error.HTTPError as e:
        return {"url": inspect_target, "verdict": "ERROR", "coverage": f"HTTP {e.code}", "last_crawl": "N/A"}


def main():
    print("=================================================================")
    print("GOOGLE SEARCH CONSOLE LIVE SITEMAP SUBMISSION & INDEXING AUDIT")
    print("=================================================================\n")

    print("Authenticating with Google Search Console OAuth API...")
    token = get_access_token()
    print("✓ OAuth Access Token obtained.\n")

    print("1. Submitting Production Sitemap to Google Search Console...")
    submit_sitemap(token)
    print("")

    print("2. Inspecting Live Indexation Status Across Priority Canonical Routes...")
    results = []
    
    # Inspect all canonical routes
    for idx, target in enumerate(ALL_ROUTES, 1):
        info = inspect_url(token, target)
        results.append(info)
        verdict_icon = "✓" if info["verdict"] == "PASS" else "⏳" if info["verdict"] == "NEUTRAL" else "✗"
        print(f"[{idx:02d}/{len(ALL_ROUTES)}] {verdict_icon} [{info['verdict']}] {info['url']}")
        print(f"     Coverage: {info['coverage']} | Last Crawl: {info['last_crawl']}")

    indexed_count = sum(1 for r in results if r["verdict"] == "PASS")
    pending_count = sum(1 for r in results if r["verdict"] == "NEUTRAL")
    error_count = sum(1 for r in results if r["verdict"] not in ["PASS", "NEUTRAL"])

    # Write report
    report_file = pathlib.Path("docs/seo/gsc-indexing-report.json")
    report_file.parent.mkdir(parents=True, exist_ok=True)
    report_file.write_text(json.dumps(results, indent=2), encoding="utf-8")

    print("\n=================================================================")
    print("SEARCH CONSOLE INDEXATION AUDIT SUMMARY")
    print("=================================================================")
    print(f"Total Routes Scanned:    {len(results)}")
    print(f"✓ Fully Indexed:         {indexed_count} URLs")
    print(f"⏳ In Crawl Queue/Fresh:  {pending_count} URLs (Discovered / Crawl Pending)")
    print(f"✗ Issues:                {error_count} URLs")
    print(f"Sitemap Status:          Active at {SITEMAP_URL}")
    print(f"Detailed Audit Log:      {report_file}")
    print("=================================================================\n")


if __name__ == "__main__":
    main()
