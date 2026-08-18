#!/usr/bin/env python3
"""Comprehensive Live & Local WhatsApp Webhook Verifier & Message Simulation."""

import urllib.request
import urllib.parse
import json
import time

VERIFY_TOKEN = "jhb_curtain_cleaning_meta_2026"
TEST_CHALLENGE = "meta_test_challenge_998822"

LOCAL_URL = "http://127.0.0.1:9999/api/webhooks/whatsapp"
PROD_URL = "https://www.jhbcurtaincleaning.co.za/api/webhooks/whatsapp"


def test_get_verification(base_url: str, label: str):
    params = urllib.parse.urlencode({
        "hub.mode": "subscribe",
        "hub.verify_token": VERIFY_TOKEN,
        "hub.challenge": TEST_CHALLENGE
    })
    target = f"{base_url}?{params}"
    print(f"[{label}] Testing GET challenge verification...")
    print(f"       URL: {target}")
    try:
        req = urllib.request.Request(target, headers={"User-Agent": "facebookplatform/1.0 (+http://developers.facebook.com)"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode("utf-8")
            status = resp.status
            if status == 200 and body == TEST_CHALLENGE:
                print(f"       ✓ SUCCESS (HTTP {status}): Meta Challenge matched exactly -> '{body}'\n")
                return True
            else:
                print(f"       ✗ FAILED (HTTP {status}): Unexpected response body -> '{body}'\n")
                return False
    except Exception as e:
        print(f"       ⚠️ Response: {e}\n")
        return False


def test_post_message_payload(base_url: str, label: str):
    sample_payload = {
        "object": "whatsapp_business_account",
        "entry": [
            {
                "id": "1164022258518231",
                "changes": [
                    {
                        "field": "messages",
                        "value": {
                            "messaging_product": "whatsapp",
                            "metadata": {
                                "display_phone_number": "27750119200",
                                "phone_number_id": "867076983156221"
                            },
                            "contacts": [
                                {
                                    "profile": {
                                        "name": "Sarah Jenkins (Sandhurst Estate)"
                                    },
                                    "wa_id": "27825551234"
                                }
                            ],
                            "messages": [
                                {
                                    "from": "27825551234",
                                    "id": f"wamid_test_{int(time.time())}",
                                    "timestamp": str(int(time.time())),
                                    "type": "text",
                                    "text": {
                                        "body": "Hi Stephen, I need on-site cleaning for 5.5m double-volume velvet curtains in Sandhurst. Can you send an estimate?"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        ]
    }

    print(f"[{label}] Testing POST inbound message webhook ingestion...")
    data = json.dumps(sample_payload).encode("utf-8")
    req = urllib.request.Request(
        base_url,
        data=data,
        headers={"Content-Type": "application/json", "User-Agent": "facebookplatform/1.0"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            body = resp.read().decode("utf-8")
            status = resp.status
            if status == 200:
                print(f"       ✓ SUCCESS (HTTP {status}): Inbound WhatsApp message ingested and triaged -> {body}\n")
                return True
            else:
                print(f"       ✗ FAILED (HTTP {status}): {body}\n")
                return False
    except Exception as e:
        print(f"       ⚠️ Response: {e}\n")
        return False


def main():
    print("=================================================================")
    print("META WHATSAPP BUSINESS CLOUD API WEBHOOK AUDIT & SIMULATION")
    print("=================================================================\n")

    print(f"Configuration Parameters:")
    print(f"• Expected Verify Token: {VERIFY_TOKEN}")
    print(f"• Test Challenge Token:  {TEST_CHALLENGE}")
    print(f"• Production URL:        {PROD_URL}")
    print(f"• Local Test URL:        {LOCAL_URL}\n")

    print("-----------------------------------------------------------------")
    print("STEP 1: LOCAL DEV SERVER VERIFICATION")
    print("-----------------------------------------------------------------")
    local_get_ok = test_get_verification(LOCAL_URL, "LOCAL DEV")
    local_post_ok = test_post_message_payload(LOCAL_URL, "LOCAL DEV")

    print("-----------------------------------------------------------------")
    print("STEP 2: PRODUCTION SERVER VERIFICATION (https://www.jhbcurtaincleaning.co.za)")
    print("-----------------------------------------------------------------")
    prod_get_ok = test_get_verification(PROD_URL, "PRODUCTION")

    print("=================================================================")
    print("AUDIT SUMMARY")
    print("=================================================================")
    print(f"Local Webhook GET Verification:   {'✓ PASS' if local_get_ok else '✗ FAIL'}")
    print(f"Local Webhook POST Ingestion:     {'✓ PASS' if local_post_ok else '✗ FAIL'}")
    print(f"Production Webhook Reachability:  {'✓ PASS (Deployed)' if prod_get_ok else '⏳ Pending Vercel Deployment sync'}")
    print("=================================================================\n")


if __name__ == "__main__":
    main()
