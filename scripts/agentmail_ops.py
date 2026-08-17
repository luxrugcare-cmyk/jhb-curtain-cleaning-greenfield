#!/usr/bin/env python3
"""AgentMail Operations & Notification Dispatch for JHB Curtain Cleaning."""

import argparse
import os
import sys
from agentmail import AgentMail

DEFAULT_API_KEY = os.environ.get(
    "AGENTMAIL_API_KEY",
    "am_us_inbox_5f01bf0cc1891d1454297ab473334f1628540b4e04cd6028c33702bb2fa636cf",
)
DEFAULT_INBOX = os.environ.get("AGENTMAIL_INBOX_ID", "stephen-1015@agentmail.to")


def get_client(api_key: str | None = None) -> AgentMail:
    key = api_key or DEFAULT_API_KEY
    if not key:
        raise ValueError("Missing AGENTMAIL_API_KEY")
    return AgentMail(api_key=key)


def send_email(
    to: str,
    subject: str,
    text: str,
    html: str | None = None,
    inbox_id: str | None = None,
    api_key: str | None = None,
):
    client = get_client(api_key)
    inbox = inbox_id or DEFAULT_INBOX
    print(f"Sending email from inbox [{inbox}] to [{to}]...")
    result = client.inboxes.messages.send(
        inbox_id=inbox,
        to=[to],
        subject=subject,
        text=text,
        html=html,
    )
    print(f"PASS Email sent successfully: {result}")
    return result


def main():
    parser = argparse.ArgumentParser(description="AgentMail Operations Tool")
    parser.add_argument("--to", help="Recipient email address")
    parser.add_argument("--subject", help="Email subject line", default="JHB Curtain Cleaning Notification")
    parser.add_argument("--text", help="Plain text message body")
    parser.add_argument("--inbox", help="Sender inbox ID", default=DEFAULT_INBOX)
    parser.add_argument("--test", action="store_true", help="Send a verified test email")

    args = parser.parse_args()

    if args.test:
        recipient = args.to or "info@jhbcurtaincleaning.co.za"
        subject = "AgentMail Verification - JHB Curtain Cleaning"
        text = (
            "Hello,\n\n"
            "This is a verified test message sent from your AI Agent inbox (stephen-1015@agentmail.to).\n"
            "AgentMail is now successfully configured for JHB Curtain Cleaning.\n\n"
            "Regards,\n"
            "JHB Curtain Cleaning Operations\n"
            "https://www.jhbcurtaincleaning.co.za"
        )
        send_email(to=recipient, subject=subject, text=text, inbox_id=args.inbox)
        return 0

    if not args.to or not args.text:
        parser.print_help()
        return 1

    send_email(to=args.to, subject=args.subject, text=args.text, inbox_id=args.inbox)
    return 0


if __name__ == "__main__":
    sys.exit(main())
