#!/usr/bin/env python3
"""Customer Review Request Dispatcher for JHB Curtain Cleaning.

Dispatches review requests via AgentMail / WhatsApp format using the verified
Google Business Profile link: https://g.page/r/CbZEjFiE3HjZEBM/review
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.parse

GBP_REVIEW_URL = "https://g.page/r/CbZEjFiE3HjZEBM/review"
AGENTMAIL_API_BASE = "https://api.agentmail.to/v0"

WHATSAPP_TEMPLATE = """Hi {name},

Thank you for choosing JHB Curtain Cleaning for your {service} today! We hope you're delighted with the freshness and results.

If you have a quick moment, would you mind leaving us a short review on Google? It really helps other homeowners and businesses across Johannesburg find reliable specialist care:

👉 {link}

Thank you again for your support!
Warm regards,
Stephen
JHB Curtain Cleaning
+27 75 011 9200"""

EMAIL_TEMPLATE = """Dear {name},

Thank you for trusting JHB Curtain Cleaning with your {service}. We take great pride in our on-site specialist process and hope everything looks refreshed and pristine.

Customer feedback is vital to our team. If you have 30 seconds, we would genuinely appreciate it if you could share your experience on our Google Business page:

⭐ Leave a Google Review: {link}

If there is anything about your service that requires follow-up, please reply directly to this email or reach Stephen on WhatsApp at +27 75 011 9200.

Warm regards,

Stephen
JHB Curtain Cleaning
Website: https://www.jhbcurtaincleaning.co.za
Direct Line: +27 75 011 9200"""


def send_email_via_agentmail(to_email: str, subject: str, body: str, api_key: str, inbox_id: str):
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


def main():
    parser = argparse.ArgumentParser(description="Send customer Google Review request")
    parser.add_argument("--name", required=True, help="Customer Name (e.g. 'Sarah')")
    parser.add_argument("--service", default="curtain cleaning", help="Service rendered")
    parser.add_argument("--channel", choices=["whatsapp", "email"], default="whatsapp", help="Dispatch channel")
    parser.add_argument("--email", help="Customer email (required if channel is email)")
    args = parser.parse_args()

    if args.channel == "whatsapp":
        text = WHATSAPP_TEMPLATE.format(name=args.name, service=args.service, link=GBP_REVIEW_URL)
        print("\n==========================================")
        print("WHATSAPP REVIEW REQUEST READY TO SEND")
        print("==========================================")
        print(text)
        print("\nDirect WhatsApp Web URL:")
        encoded_text = urllib.parse.quote(text)
        print(f"https://wa.me/?text={encoded_text}")
    elif args.channel == "email":
        if not args.email:
            print("Error: --email is required when --channel email is selected", file=sys.stderr)
            sys.exit(1)

        api_key = os.environ.get("AGENTMAIL_API_KEY", "am_us_inbox_5f01bf0cc1891d1454297ab473334f1628540b4e04cd6028c33702bb2fa636cf")
        inbox_id = os.environ.get("AGENTMAIL_INBOX_ID", "stephen-1015@agentmail.to")
        subject = f"Thank you from JHB Curtain Cleaning / Google Review"
        body = EMAIL_TEMPLATE.format(name=args.name, service=args.service, link=GBP_REVIEW_URL)

        print(f"Dispatching review request email to {args.email} via AgentMail...")
        res = send_email_via_agentmail(args.email, subject, body, api_key, inbox_id)
        print("Review request sent successfully:", res)


if __name__ == "__main__":
    main()
