#!/usr/bin/env python3
"""B2B Commercial Outreach Campaign Manager for JHB Curtain Cleaning.

Autonomous sequencing engine for:
1. Boutique Hotels & Hospitality Managers
2. Corporate Facilities & Office Managers
3. Interior Designers & Luxury Estate Managers

Uses AgentMail (stephen-1015@agentmail.to) with POPIA-compliant, high-converting copy.
"""

import argparse
import datetime as dt
import json
import os
import pathlib
import sys
import urllib.request
import urllib.parse

AGENTMAIL_API_BASE = "https://api.agentmail.to/v0"
DEFAULT_INBOX_ID = "stephen-1015@agentmail.to"
LOG_PATH = pathlib.Path("docs/campaigns/outreach-log.json")

# Sequence 1: Hospitality & Boutique Hotels
HOTEL_SEQUENCE = {
    "name": "hospitality_hotels",
    "touch1": {
        "subject": "Curtain cleaning without room downtime for {hotel_name}",
        "body": """Hi {first_name},

I hope your week is off to a great start.

I'm reaching out from JHB Curtain Cleaning. We specialize in on-site curtain and drape cleaning for boutique hotels and luxury guest houses across {location}.

The biggest challenge general managers share with us is room downtime — having to take heavy drapes down, send them to a dry cleaner for 4-5 days, and take rooms out of inventory.

Our team cleans and sanitizes curtains while they remain hanging on their tracks. Rooms are completely refreshed, allergen-free, and ready for guests within 3-4 hours on the same day.

Would you be open to a quick 10-minute on-site assessment with me this week to inspect a sample room?

Warm regards,

Stephen
JHB Curtain Cleaning
Direct: +27 75 011 9200
Website: https://www.jhbcurtaincleaning.co.za/commercial/hotels-hospitality"""
    },
    "touch2_followup": {
        "subject": "Re: Curtain cleaning without room downtime for {hotel_name}",
        "body": """Hi {first_name},

Following up briefly on my note regarding on-site curtain care for {hotel_name}.

We recently completed a scheduled refresh for guest suites in Sandton where all drapes were treated in-place with zero revenue disruption.

I'd be glad to pop by {hotel_name} for a free evaluation and leave you with an itemized, line-item quotation for your maintenance records.

Are you available for 10 minutes either Thursday or Friday?

Best regards,

Stephen
JHB Curtain Cleaning
+27 75 011 9200"""
    }
}

# Sequence 2: Corporate Facilities & Office Managers
CORPORATE_SEQUENCE = {
    "name": "corporate_facilities",
    "touch1": {
        "subject": "After-hours curtain & blind maintenance for {company_name}",
        "body": """Hi {first_name},

I hope you're having a productive week.

I'm contacting you from JHB Curtain Cleaning regarding commercial textile maintenance for {company_name}'s offices in {location}.

Office drapes, boardroom curtains, and roller blinds collect substantial airborne dust and allergens over time. To avoid workplace distraction, our teams operate after-hours and over weekends to deep clean and sanitize fitted curtains and blinds in-place.

We provide full corporate compliance documentation, itemized invoicing, and POPIA-compliant service logs.

Could we schedule a complimentary 15-minute facility walk-through with me to assess your floor plan?

Warm regards,

Stephen
JHB Curtain Cleaning
Direct: +27 75 011 9200
Commercial Portal: https://www.jhbcurtaincleaning.co.za/commercial/offices-corporate"""
    }
}

# Sequence 3: Interior Designers & Estate Managers
DESIGNER_SEQUENCE = {
    "name": "interior_designers",
    "touch1": {
        "subject": "Specialist textile care partnership for {firm_name}",
        "body": """Hi {first_name},

I hope you're well.

I'm reaching out from JHB Curtain Cleaning. We partner with leading Gauteng interior designers and luxury estate managers in {location} to provide ongoing care for bespoke drapery, velvet drapes, silk interlinings, and delicate upholstery.

When clients invest significantly in custom window treatments, conventional dry cleaning risks shrinkage, fabric distortion, or damage during removal. We clean high-end drapes on-site while hanging, preserving pleat memory and delicate linings.

I'd love to share our trade partner overview and see if we can assist on your upcoming residential handovers.

Would you be open to a brief introductory chat?

Warm regards,

Stephen
JHB Curtain Cleaning
+27 75 011 9200
Portfolio: https://www.jhbcurtaincleaning.co.za/services/curtain-cleaning"""
    }
}

SEQUENCES = {
    "hotel": HOTEL_SEQUENCE,
    "corporate": CORPORATE_SEQUENCE,
    "designer": DESIGNER_SEQUENCE,
}


def send_agentmail_email(to_email: str, subject: str, body: str, api_key: str, inbox_id: str):
    url = f"{AGENTMAIL_API_BASE}/inboxes/{urllib.parse.quote(inbox_id)}/messages/send"
    payload = json.dumps({
        "to": [to_email],
        "subject": subject,
        "text": body
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        },
        method="POST"
    )

    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


def log_dispatch(record: dict):
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    history = []
    if LOG_PATH.exists():
        try:
            history = json.loads(LOG_PATH.read_text(encoding="utf-8"))
        except Exception:
            history = []
    history.append(record)
    LOG_PATH.write_text(json.dumps(history, indent=2), encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description="Dispatch B2B Outreach Sequences via AgentMail")
    parser.add_argument("--sequence", choices=["hotel", "corporate", "designer"], required=True, help="Campaign sequence")
    parser.add_argument("--to", required=True, help="Recipient email address")
    parser.add_argument("--first-name", default="Manager", help="Prospect First Name")
    parser.add_argument("--company", default="your property", help="Hotel / Company / Firm name")
    parser.add_argument("--location", default="Johannesburg", help="City / Suburb (e.g. Sandton, Rosebank)")
    parser.add_argument("--step", choices=["touch1", "touch2_followup"], default="touch1", help="Sequence step")
    parser.add_argument("--dry-run", action="store_true", help="Preview email without sending")
    args = parser.parse_args()

    seq_data = SEQUENCES[args.sequence]
    step_data = seq_data.get(args.step, seq_data.get("touch1"))

    subject = step_data["subject"].format(
        first_name=args.first_name,
        hotel_name=args.company,
        company_name=args.company,
        firm_name=args.company,
        location=args.location
    )
    body = step_data["body"].format(
        first_name=args.first_name,
        hotel_name=args.company,
        company_name=args.company,
        firm_name=args.company,
        location=args.location
    )

    print(f"\n=======================================================")
    print(f"CAMPAIGN: {seq_data['name'].upper()} ({args.step.upper()})")
    print(f"RECIPIENT: {args.to}")
    print(f"SUBJECT:   {subject}")
    print(f"=======================================================\n")
    print(body)
    print("\n-------------------------------------------------------")

    if args.dry_run:
        print("[DRY-RUN] Email not sent.")
        return

    api_key = os.environ.get("AGENTMAIL_API_KEY", "am_us_inbox_5f01bf0cc1891d1454297ab473334f1628540b4e04cd6028c33702bb2fa636cf")
    inbox_id = os.environ.get("AGENTMAIL_INBOX_ID", DEFAULT_INBOX_ID)

    print(f"Dispatching via AgentMail ({inbox_id})...")
    res = send_agentmail_email(args.to, subject, body, api_key, inbox_id)
    print("Successfully dispatched:", res)

    log_record = {
        "timestamp": dt.datetime.now(dt.timezone.utc).isoformat(),
        "sequence": args.sequence,
        "step": args.step,
        "recipient": args.to,
        "company": args.company,
        "location": args.location,
        "subject": subject,
        "agentmail_response": res
    }
    log_dispatch(log_record)
    print(f"Logged to {LOG_PATH}")


if __name__ == "__main__":
    main()
