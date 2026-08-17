#!/usr/bin/env python3
"""Batch Outreach Runner & Scheduler for JHB Curtain Cleaning.

Processes B2B commercial target lists (JSON/CSV) across:
1. Hospitality & Hotel Managers
2. Corporate Facilities Directors
3. Interior Designers & Luxury Estate Managers

Dispatches personalized HTML emailers via AgentMail with configurable rate-limiting.
"""

import argparse
import datetime as dt
import json
import os
import pathlib
import sys
import time
import urllib.request
import urllib.parse

from b2b_campaign_manager import (
    SEQUENCES,
    load_html_template,
    send_agentmail_email,
    log_dispatch,
    DEFAULT_INBOX_ID,
)


def load_prospects(file_path: pathlib.Path):
    if not file_path.exists():
        raise FileNotFoundError(f"Prospects file not found: {file_path}")

    if file_path.suffix == ".json":
        return json.loads(file_path.read_text(encoding="utf-8"))
    elif file_path.suffix == ".csv":
        import csv
        prospects = []
        with open(file_path, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                prospects.append(row)
        return prospects
    else:
        raise ValueError("Unsupported format. Use .json or .csv")


def main():
    parser = argparse.ArgumentParser(description="Run batch automated outreach via AgentMail")
    parser.add_argument("--file", default="data/prospects/target_prospects_seed.json", help="Path to prospects file")
    parser.add_argument("--step", choices=["touch1", "touch2_followup"], default="touch1", help="Sequence step")
    parser.add_argument("--delay", type=float, default=2.0, help="Delay between emails in seconds")
    parser.add_argument("--inbox", default=DEFAULT_INBOX_ID, help="AgentMail Inbox ID")
    parser.add_argument("--dry-run", action="store_true", help="Preview entire batch without sending")
    args = parser.parse_args()

    prospect_file = pathlib.Path(args.file)
    prospects = load_prospects(prospect_file)

    print(f"\n=================================================================")
    print(f"JHB CURTAIN CLEANING — B2B BATCH OUTREACH SCHEDULER")
    print(f"File:       {args.file} ({len(prospects)} prospects)")
    print(f"Step:       {args.step.upper()}")
    print(f"Delay:      {args.delay}s per prospect")
    print(f"Mode:       {'DRY-RUN (No emails sent)' if args.dry_run else 'LIVE DISPATCH (AgentMail)'}")
    print(f"=================================================================\n")

    api_key = os.environ.get("AGENTMAIL_API_KEY", "am_us_inbox_5f01bf0cc1891d1454297ab473334f1628540b4e04cd6028c33702bb2fa636cf")
    success_count = 0

    for idx, p in enumerate(prospects, start=1):
        seq_key = p.get("sequence", "hotel")
        seq_data = SEQUENCES.get(seq_key, SEQUENCES["hotel"])
        step_data = seq_data.get(args.step, seq_data.get("touch1"))

        var_dict = {
            "first_name": p.get("first_name", "Manager"),
            "hotel_name": p.get("company", "your property"),
            "company_name": p.get("company", "your offices"),
            "firm_name": p.get("company", "your design studio"),
            "location": p.get("location", "Johannesburg")
        }

        subject = step_data["subject"].format(**var_dict)
        text_body = step_data["body"].format(**var_dict)
        html_body = load_html_template(seq_data.get("template_file", ""), var_dict)
        recipient = p.get("email")

        print(f"[{idx}/{len(prospects)}] Prospect: {var_dict['first_name']} ({p.get('company')})")
        print(f"      Sequence: {seq_key} | To: {recipient} | Subject: '{subject}'")

        if not args.dry_run:
            try:
                res = send_agentmail_email(recipient, subject, text_body, html_body, api_key, args.inbox)
                print(f"      Status: DISPATCHED ({res.get('message_id', 'ok')})")
                log_dispatch({
                    "timestamp": dt.datetime.now(dt.timezone.utc).isoformat(),
                    "sequence": seq_key,
                    "step": args.step,
                    "mailbox_tag": seq_data["mailbox_tag"],
                    "sender_display": seq_data["sender_display"],
                    "recipient": recipient,
                    "company": p.get("company"),
                    "location": p.get("location"),
                    "subject": subject,
                    "agentmail_response": res
                })
                success_count += 1
            except Exception as e:
                print(f"      Status: FAILED ({e})")
            if idx < len(prospects):
                time.sleep(args.delay)
        else:
            print(f"      Status: [DRY-RUN SIMULATION OK]")
            success_count += 1

    print(f"\n=================================================================")
    print(f"OUTREACH BATCH COMPLETE: {success_count}/{len(prospects)} PROCESSED")
    print(f"=================================================================\n")


if __name__ == "__main__":
    main()
