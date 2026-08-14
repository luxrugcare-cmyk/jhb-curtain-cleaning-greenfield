#!/usr/bin/env python3
"""Read-only GSC comparator for protected legacy -> greenfield URL migrations.

Uses the same local OAuth files as gsc-readonly-audit.py. It performs URL
Inspection only; it never submits indexing requests or changes Search Console.
"""

from __future__ import annotations

import argparse
import datetime as dt
import importlib.util
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
BASE_SCRIPT = HERE / "gsc-readonly-audit.py"
DEFAULT_CREDENTIALS_DIR = pathlib.Path(r"C:\dev\credentials")

MIGRATIONS = [
    {
        "legacy": "https://www.jhbcurtaincleaning.co.za/testimonials",
        "destination": "https://www.jhbcurtaincleaning.co.za/results",
        "baseline": "curtain cleaners johannesburg #13",
    },
    {
        "legacy": "https://www.jhbcurtaincleaning.co.za/blog/curtain-cleaning-sandton-guide",
        "destination": "https://www.jhbcurtaincleaning.co.za/areas/sandton",
        "baseline": "curtain cleaning sandton #14 plus related curtain-intent terms",
    },
    {
        "legacy": "https://www.jhbcurtaincleaning.co.za/pricing",
        "destination": "https://www.jhbcurtaincleaning.co.za/advice/curtain-cleaning-prices",
        "baseline": "curtain cleaning prices #38",
    },
    {
        "legacy": "https://www.jhbcurtaincleaning.co.za/services/curtain-blind-cleaning",
        "destination": "https://www.jhbcurtaincleaning.co.za/services/curtain-cleaning",
        "baseline": "curtain cleaning randburg #70",
    },
]


def load_base():
    spec = importlib.util.spec_from_file_location("jhb_gsc_audit", BASE_SCRIPT)
    if spec is None or spec.loader is None:
        raise SystemExit(f"Could not load {BASE_SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def classify(summary: dict, destination: str) -> str:
    coverage = (summary.get("coverageState") or "").lower()
    google_canonical = summary.get("googleCanonical")
    verdict = (summary.get("verdict") or "").upper()

    if "unknown to google" in coverage:
        return "PENDING_DISCOVERY"
    if google_canonical == destination:
        return "MIGRATED_TO_DESTINATION"
    if verdict == "PASS" and google_canonical:
        return "INDEXED_OTHER_CANONICAL"
    if summary.get("pageFetchState") and summary.get("pageFetchState") != "SUCCESSFUL":
        return "FETCH_OR_INDEXABILITY_REVIEW"
    return "OBSERVE"


def main() -> int:
    parser = argparse.ArgumentParser(description="Read-only GSC legacy migration comparator.")
    parser.add_argument("--credentials-dir", type=pathlib.Path, default=DEFAULT_CREDENTIALS_DIR)
    parser.add_argument("--client-file", default="gsc-oauth-client.json")
    parser.add_argument("--refresh-token-file", default="gsc-refresh-token.txt")
    parser.add_argument("--url-property", default="https://www.jhbcurtaincleaning.co.za/")
    parser.add_argument("--output", type=pathlib.Path, default=None)
    args = parser.parse_args()

    base = load_base()
    client_path = args.credentials_dir / args.client_file
    refresh_path = args.credentials_dir / args.refresh_token_file
    if not client_path.exists():
        raise SystemExit(f"Missing OAuth client file: {client_path}")
    if not refresh_path.exists():
        raise SystemExit(f"Missing refresh token file: {refresh_path}")

    client_id, client_secret, token_uri = base.load_oauth_client(client_path)
    refresh_token = base.load_refresh_token(refresh_path)
    access_token = base.exchange_access_token(client_id, client_secret, refresh_token, token_uri)
    print("PASS OAuth refresh-token exchange succeeded (tokens not displayed)")

    report_rows = []
    for migration in MIGRATIONS:
        legacy_result = base.inspect_url(access_token, args.url_property, migration["legacy"])
        destination_result = base.inspect_url(access_token, args.url_property, migration["destination"])
        legacy = base.summarize_inspection(legacy_result)
        destination = base.summarize_inspection(destination_result)

        legacy_state = classify(legacy, migration["destination"])
        destination_state = classify(destination, migration["destination"])
        print(f"MIGRATION {migration['legacy']} -> {migration['destination']}")
        print(f"  legacy: {legacy_state}; coverage={legacy.get('coverageState')}; googleCanonical={legacy.get('googleCanonical')}")
        print(f"  destination: {destination_state}; coverage={destination.get('coverageState')}; googleCanonical={destination.get('googleCanonical')}")

        report_rows.append({
            **migration,
            "legacyState": legacy_state,
            "destinationState": destination_state,
            "legacyInspection": legacy,
            "destinationInspection": destination,
        })

    report = {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "urlProperty": args.url_property,
        "migrations": report_rows,
        "guardrail": "Read-only inspection only; no indexing requests submitted.",
    }

    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"PASS wrote migration report: {args.output}")

    print("PASS GSC migration comparator completed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
