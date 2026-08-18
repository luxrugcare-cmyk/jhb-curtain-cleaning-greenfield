#!/usr/bin/env python3
"""Multi-Sequence B2B Campaign Dispatcher & Automation Engine.

Implements the 3-Touch Cold-to-Warm Sequence:
- Touch 1 (Day 1): Plain-Text-First Peer Approach (Zero spam triggers, maximum deliverability)
- Touch 2 (Day 4): High-Visual Google Stitch Metallic MJML HTML Emailer (Evidence & Proof)
- Touch 3 (Day 8): Plain-Text Breakup Note (Polite close of loop + direct WhatsApp)

Usage:
  python scripts/b2b_multi_sequence_dispatcher.py --segment hotel --touch 1 --dry-run
  python scripts/b2b_multi_sequence_dispatcher.py --segment hotel --touch 2 --limit 10
  python scripts/b2b_multi_sequence_dispatcher.py --segment corporate --touch 1 --limit 10
  python scripts/b2b_multi_sequence_dispatcher.py --segment design --touch 1 --limit 10
"""

import argparse
import csv
import datetime as dt
import json
import os
import pathlib
import re
import sys
import time
import urllib.request
import urllib.error

AGENTMAIL_API_KEY = os.environ.get("AGENTMAIL_API_KEY", "am_us_inbox_5f01bf0cc1891d1454297ab473334f1628540b4e04cd6028c33702bb2fa636cf")
AGENTMAIL_INBOX = os.environ.get("AGENTMAIL_INBOX_ID", "stephen-1015@agentmail.to")
BASE_URL = f"https://api.agentmail.to/v0/inboxes/{AGENTMAIL_INBOX.replace('@', '%40')}/messages/send"

DATA_DIR = pathlib.Path("data/campaigns_200")
TEMPLATES_DIR = pathlib.Path("templates/email")
AUDIT_LOG_FILE = pathlib.Path("docs/campaigns/outreach-log.json")

SEGMENT_FILES = {
    "hotel": DATA_DIR / "hotels_hospitality_200.csv",
    "corporate": DATA_DIR / "corporate_facilities_200.csv",
    "design": DATA_DIR / "interior_design_trade_200.csv",
    "residential": DATA_DIR / "luxury_residential_200.csv"
}

TOUCH_TEMPLATES = {
    "hotel": {
        1: ("plain_text/touch1_hotel_plain.txt", "plain"),
        2: ("compiled_html/touch2_hotel_visual.html", "html"),
        3: ("plain_text/touch3_hotel_breakup.txt", "plain")
    },
    "corporate": {
        1: ("plain_text/touch1_corporate_plain.txt", "plain"),
        2: ("compiled_html/touch2_corporate_visual.html", "html"),
        3: ("plain_text/touch3_corporate_breakup.txt", "plain")
    },
    "design": {
        1: ("plain_text/touch1_trade_design_plain.txt", "plain"),
        2: ("compiled_html/touch2_trade_design_visual.html", "html"),
        3: ("plain_text/touch3_trade_design_breakup.txt", "plain")
    }
}


def load_template(rel_path: str, format_type: str) -> tuple[str, str]:
    full_path = TEMPLATES_DIR / rel_path
    if not full_path.exists():
        raise FileNotFoundError(f"Template not found: {full_path}")
    raw = full_path.read_text(encoding="utf-8")
    
    subject = "Curtain and Textile Care Enquiry"
    body = raw
    
    if format_type == "plain":
        subj_match = re.search(r"^Subject:\s*(.*)$", raw, re.MULTILINE | re.IGNORECASE)
        if subj_match:
            subject = subj_match.group(1).strip()
            body = re.sub(r"^Subject:\s*.*$\n*", "", raw, flags=re.MULTILINE | re.IGNORECASE).strip()
    else:
        title_match = re.search(r"<title>(.*?)</title>", raw, re.IGNORECASE)
        if title_match:
            subject = title_match.group(1).strip()
            
    return subject, body


def render_content(template_str: str, lead: dict) -> str:
    rendered = template_str
    replacements = {
        "{FirstName}": lead.get("name", "there").split()[0],
        "{recipient_name}": lead.get("name", "there").split()[0],
        "{Company}": lead.get("company", "your property"),
        "{company_name}": lead.get("company", "your property"),
        "{Location}": lead.get("location", "Johannesburg"),
        "{property_location}": lead.get("location", "Johannesburg"),
        "{{recipient_name}}": lead.get("name", "there").split()[0],
        "{{company_name}}": lead.get("company", "your property"),
        "{{cta_url}}": "https://wa.me/27750119200?text=Hi%20Stephen,%20enquiring%20about%20curtain%20cleaning"
    }
    for key, val in replacements.items():
        rendered = rendered.replace(key, str(val))
    return rendered


def log_dispatch(entry: dict):
    AUDIT_LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    logs = []
    if AUDIT_LOG_FILE.exists():
        try:
            logs = json.loads(AUDIT_LOG_FILE.read_text(encoding="utf-8"))
        except Exception:
            logs = []
    logs.append(entry)
    AUDIT_LOG_FILE.write_text(json.dumps(logs, indent=2), encoding="utf-8")


def dispatch_email(to_email: str, to_name: str, subject: str, body: str, is_html: bool, dry_run: bool = False):
    if dry_run:
        print(f"  [DRY-RUN] To: {to_name} <{to_email}>")
        print(f"            Subject: \"{subject}\"")
        print(f"            Format:  {'HTML (MJML Stitch)' if is_html else 'Plain-Text-First'}")
        print(f"            Preview: {body[:100]}...\n")
        return {"ok": True, "message_id": f"dryrun-{int(time.time()*1000)}", "mode": "dry-run"}

    payload = {
        "to": [f"{to_name} <{to_email}>" if to_name else to_email],
        "subject": subject,
    }
    if is_html:
        payload["html"] = body
        payload["text"] = re.sub(r"<[^>]+>", " ", body).strip()[:800]
    else:
        payload["text"] = body

    req = urllib.request.Request(
        BASE_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {AGENTMAIL_API_KEY}",
            "Content-Type": "application/json"
        },
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            data = json.loads(res.read().decode("utf-8"))
            return {"ok": True, "message_id": data.get("id") or data.get("message_id") or "sent", "mode": "live"}
    except urllib.error.HTTPError as e:
        err_msg = e.read().decode("utf-8", errors="replace")
        print(f"  [AGENTMAIL ERROR {e.code}]: {err_msg}", file=sys.stderr)
        return {"ok": False, "error": err_msg, "status": e.code}
    except Exception as e:
        print(f"  [NETWORK ERROR]: {e}", file=sys.stderr)
        return {"ok": False, "error": str(e)}


def main():
    parser = argparse.ArgumentParser(description="Multi-Sequence B2B Outreach Engine for AgentMail")
    parser.add_argument("--segment", choices=["hotel", "corporate", "design", "residential"], required=True, help="Target segment")
    parser.add_argument("--touch", type=int, choices=[1, 2, 3], default=1, help="Touch sequence: 1 (Plain Day 1), 2 (HTML Day 4), 3 (Breakup Day 8)")
    parser.add_argument("--limit", type=int, default=5, help="Number of leads to dispatch")
    parser.add_argument("--skip", type=int, default=0, help="Number of leads to skip in list")
    parser.add_argument("--delay", type=float, default=2.5, help="Delay in seconds between dispatches")
    parser.add_argument("--dry-run", action="store_true", help="Simulate without live API sending")
    args = parser.parse_args()

    csv_path = SEGMENT_FILES.get(args.segment)
    if not csv_path or not csv_path.exists():
        print(f"Error: Segment file {csv_path} not found.", file=sys.stderr)
        sys.exit(1)

    with open(csv_path, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        leads = list(reader)

    target_leads = leads[args.skip : args.skip + args.limit]
    if not target_leads:
        print(f"No leads found in range {args.skip} to {args.skip + args.limit}.")
        sys.exit(0)

    touch_info = TOUCH_TEMPLATES.get(args.segment, {}).get(args.touch)
    if not touch_info:
        print(f"Touch {args.touch} not configured for segment {args.segment}.", file=sys.stderr)
        sys.exit(1)

    rel_tmpl, fmt = touch_info
    raw_subj, raw_body = load_template(rel_tmpl, fmt)
    is_html = (fmt == "html")

    print(f"\n=================================================================")
    print(f"B2B MULTI-SEQUENCE DISPATCHER — {args.segment.upper()} (TOUCH {args.touch})")
    print(f"=================================================================")
    print(f"Target Leads:    {len(target_leads)} (From {args.skip} to {args.skip + len(target_leads)})")
    print(f"Template:        {rel_tmpl} [{fmt.upper()}]")
    print(f"Mode:            {'SIMULATION (DRY-RUN)' if args.dry_run else 'LIVE AGENTMAIL DISPATCH'}")
    print(f"Sending Inbox:   {AGENTMAIL_INBOX}")
    print(f"-----------------------------------------------------------------\n")

    dispatched = 0
    failed = 0

    for idx, lead in enumerate(target_leads, 1):
        subj = render_content(raw_subj, lead)
        body = render_content(raw_body, lead)
        to_email = lead["email"]
        to_name = lead["name"]

        print(f"[{idx}/{len(target_leads)}] Processing {to_name} ({lead['company']})...")
        res = dispatch_email(to_email, to_name, subj, body, is_html, dry_run=args.dry_run)

        log_entry = {
            "timestamp": dt.datetime.now(dt.timezone.utc).isoformat(),
            "segment": args.segment,
            "touch": args.touch,
            "recipient_email": to_email,
            "recipient_name": to_name,
            "company": lead["company"],
            "subject": subj,
            "mode": res.get("mode"),
            "status": "SENT" if res.get("ok") else "FAILED",
            "message_id": res.get("message_id") or res.get("error")
        }
        log_dispatch(log_entry)

        if res.get("ok"):
            dispatched += 1
            if not args.dry_run:
                print(f"  ✓ Dispatched via AgentMail (ID: {res.get('message_id')})")
        else:
            failed += 1
            print(f"  ✗ Delivery Failed: {res.get('error')}")

        if idx < len(target_leads) and not args.dry_run:
            time.sleep(args.delay)

    print(f"\n=================================================================")
    print(f"BATCH RUN COMPLETE: {dispatched} Dispatched, {failed} Failed")
    print(f"Audit Log Updated:  {AUDIT_LOG_FILE}")
    print(f"=================================================================\n")


if __name__ == "__main__":
    main()
