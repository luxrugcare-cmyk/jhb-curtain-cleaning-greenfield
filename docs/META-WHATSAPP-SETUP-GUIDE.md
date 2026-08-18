# Meta (Facebook, Instagram & WhatsApp Business API) Complete Implementation Guide

**Project:** JHB Curtain Cleaning (`jhbcurtaincleaning.co.za`)  
**Primary Contact Number:** Stephen (+27 75 011 9200)  
**Primary Email:** `info@jhbcurtaincleaning.co.za`  
**AgentMail Operations:** `stephen-1015@agentmail.to`

---

## 1. Executive Summary

This architecture connects **Meta's Advertising Ecosystem (Facebook & Instagram Ads)** directly to **WhatsApp Business Cloud API** and our **Server-Side Conversions API (CAPI)**.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        META & WHATSAPP UNIFIED LEAD FUNNEL                             │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
           ┌────────────────────────────────┴────────────────────────────────┐
           │                                                                 │
           ▼                                                                 ▼
[FACEBOOK & INSTAGRAM ADS]                                        [WHATSAPP CLOUD API]
• Click-to-WhatsApp (CTWA) Direct Ads                             • Number: +27 75 011 9200
• Meta Pixel + Server-Side CAPI Tracking                          • Incoming Webhook: /api/webhooks/whatsapp
• SHA-256 Hashed Customer Signals                                • Instant Interactive Greeting & Triage
• Automatic Conversion Attribution                                • Immediate AgentMail Lead Notification
```

---

## 2. WhatsApp Business Cloud API Configuration

### Step A: Configure Webhook in Meta Developer Portal
1. Navigate to **[Meta for Developers Dashboard](https://developers.facebook.com/)** → Select your App → **WhatsApp** → **Configuration**.
2. Under **Webhook**, click **Edit**:
   - **Callback URL:** `https://www.jhbcurtaincleaning.co.za/api/webhooks/whatsapp`
   - **Verify Token:** `jhb_curtain_cleaning_meta_2026`
3. Click **Verify and Save**.
4. In the Webhook Subscription fields, click **Manage** and subscribe to:
   - `messages` (Captures inbound text, photos of curtains, locations, and button clicks).

### Step B: Environment Variables in Vercel / Production
Add the following variables to your production environment:

```env
# Meta WhatsApp Cloud API
WHATSAPP_PHONE_NUMBER_ID="your_phone_number_id_from_meta"
WHATSAPP_BUSINESS_ACCOUNT_ID="your_waba_id_from_meta"
WHATSAPP_API_TOKEN="your_system_user_permanent_token"
WHATSAPP_VERIFY_TOKEN="jhb_curtain_cleaning_meta_2026"
WHATSAPP_API_VERSION="v21.0"
```

---

## 3. Meta Conversions API (CAPI) & Pixel Setup

Server-side Conversions API bypasses iOS ad blockers and cookie restrictions by sending conversion events directly from our Next.js backend to Meta's servers.

### Step A: Generate System Access Token in Meta Events Manager
1. Go to **[Meta Events Manager](https://business.facebook.com/events_manager2/)**.
2. Select your Dataset / Pixel ID.
3. Go to **Settings** → Scroll to **Conversions API** → Click **Generate access token**.
4. Copy the permanent access token.

### Step B: Add Environment Variables
```env
# Meta Conversions API (CAPI) & Pixel
NEXT_PUBLIC_META_PIXEL_ID="your_meta_pixel_id"
META_PIXEL_ID="your_meta_pixel_id"
META_CAPI_ACCESS_TOKEN="your_capi_access_token"
META_API_VERSION="v21.0"
```

### Server-Side Data Hashing Implemented:
All user identifiers (`email`, `phone`, `first_name`, `last_name`, `city`) are automatically normalized and **SHA-256 hashed** in `lib/meta-capi.ts` before reaching Meta, ensuring 100% POPIA and GDPR compliance.

---

## 4. Click-to-WhatsApp (CTWA) Ad Campaign Best Practices

To maximize conversion rate from Facebook & Instagram:

1. **Campaign Objective:** Choose **Leads** or **Engagement** with conversion location set to **Messaging apps (WhatsApp)**.
2. **Targeting:**
   - Location: Sandton, Rosebank, Bryanston, Hyde Park, Fourways, Pretoria East (+15km radius).
   - High-Net-Worth Interests: Interior Design, Luxury Real Estate, Home Improvement, Architecture.
3. **Ad Creative:**
   - Use our Google Stitch metallic photo assets (`/brand/stitch/curtain-cleaning-hero.png`).
   - Headline: *Johannesburg's Specialist On-Site Curtain Cleaning (Zero Shrinkage).*
   - Call to Action: *Send WhatsApp Message*.
4. **Pre-filled WhatsApp Message:**
   - `"Hi Stephen, I saw your ad on Instagram. I'd like an on-site curtain cleaning estimate for my home/business."`

---

## 5. Verification & Testing

You can run the full Meta integration test suite anytime:

```powershell
npm run test:meta
```

**Test Suite Coverage:**
- `TEST 1`: WhatsApp Webhook Challenge Verification (`GET hub.challenge`).
- `TEST 2`: WhatsApp Text Message Dispatcher (`POST`).
- `TEST 3`: WhatsApp Interactive 3-Button Reply Menu.
- `TEST 4`: Meta Conversions API (CAPI) SHA-256 Hashing & Event Formatting.
- `TEST 5`: End-to-End Lead Ingestion with CAPI Event Trigger.
