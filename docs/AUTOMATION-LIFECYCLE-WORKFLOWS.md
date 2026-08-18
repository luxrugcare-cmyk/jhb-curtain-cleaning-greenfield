# Customer Lifecycle Automation & Trigger Response Architecture

**Platform:** JHB Curtain Cleaning (`jhbcurtaincleaning.co.za`)  
**Operator:** Stephen (+27 75 011 9200 / `info@jhbcurtaincleaning.co.za`)  
**Engine:** Next.js Serverless Services + AgentMail + Attio CRM + Meta CAPI + n8n

---

## 1. Customer Lifecycle Trigger Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       CUSTOMER LIFECYCLE TRIGGER PIPELINE                                       │
└───────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────┘
                                                        │
 ┌───────────────────────┬──────────────────────────────┼──────────────────────────────┬────────────────────────┐
 │                       │                              │                              │                        │
 ▼                       ▼                              ▼                              ▼                        ▼
[RESIDENTIAL QUOTE]   [COMMERCIAL PROTOCOL]   [10% TRADE PARTNER]       [POST-SERVICE REVIEW]     [ANNUAL DUST REMINDER]
• Instant Welcome      • SANS 1423 Protocol   • Studio Referral Code    • 5-Star Google Link      • 11 Months Post-Clean
• Zero Shrinkage Alert • Zero Room Downtime   • 48-Hour EFT Terms       • Fabric Care Guide       • Highveld Winter Prompt
• Stephen Alert        • GM Calendar Booking  • Handover Care Pack      • Thank You Note          • WhatsApp Deep-Link
```

| Lifecycle Trigger | Origin / Route | Immediate Automated Customer Action | Internal Ops Dispatch | Conversion Telemetry |
|---|---|---|---|---|
| **1. Residential Quote** | `/quote`, Photo Upload | Rich Metallic Welcome Email + "Do Not Take Down" Zero Shrinkage Notice | Ingested to Attio CRM + AgentMail Lead Alert to Stephen | Meta CAPI `Lead` (SHA-256) |
| **2. Commercial Assessment** | `/commercial-assessment` | Commercial Protocol Email + SANS 1423 Fire Compliance Summary | Ingested to Attio Commercial Pipeline + AgentMail Priority Alert | Meta CAPI `Lead` (SHA-256) |
| **3. 10% Trade Partner** | `/trade` | Studio Partner Referral Code Generated + Handover Care Pack | Attio Tagged as `Trade Partner (10%)` | Meta CAPI `SubmitApplication` |
| **4. WhatsApp Inbound** | `/api/webhooks/whatsapp` | 3-Button Interactive Menu (`Residential`, `Commercial`, `Trade`) | Instant Lead Alert to Stephen with photo/text preview | WhatsApp Cloud API Event |
| **5. Service Completed** | Attio Status -> `Completed` | 5-Star Google Review Solicitation Email (`https://g.page/r/CbZEjFiE3HjZEBM/review`) | Review logged in Attio customer timeline | Review Funnel |
| **6. Annual Seasonal Dust** | 11 Months Post-Clean | Highveld Winter Dust Season Priority Refresh Email & WhatsApp Link | Attio Retargeting List populated | Repeat Annual Retention |

---

## 2. Trigger Response Code Architecture

- **Trigger Service Engine:** [`lib/automation-triggers.ts`](file:///C:/Users/User/Downloads/JHB-Curtain-Cleaning-Website-Handoff/JHB-Curtain-Cleaning-Full-Handoff-2026-08-17/project/lib/automation-triggers.ts)
- **Lead Acceptance Service:** [`lib/lead-service.ts`](file:///C:/Users/User/Downloads/JHB-Curtain-Cleaning-Website-Handoff/JHB-Curtain-Cleaning-Full-Handoff-2026-08-17/project/lib/lead-service.ts)
- **WhatsApp Webhook:** [`app/api/webhooks/whatsapp/route.ts`](file:///C:/Users/User/Downloads/JHB-Curtain-Cleaning-Website-Handoff/JHB-Curtain-Cleaning-Full-Handoff-2026-08-17/project/app/api/webhooks/whatsapp/route.ts)
- **Automated Test Suite:** [`scripts/test-automation-triggers.ts`](file:///C:/Users/User/Downloads/JHB-Curtain-Cleaning-Website-Handoff/JHB-Curtain-Cleaning-Full-Handoff-2026-08-17/project/scripts/test-automation-triggers.ts)

---

## 3. n8n / Webhook Blueprint

Whenever a trigger fires, `dispatchLeadAutomation(payload, crm)` transmits structured JSON to `process.env.N8N_LEAD_WEBHOOK_URL` with signature `x-jhb-webhook-secret`:

```json
{
  "event": "lead.accepted",
  "eventType": "residential_welcome",
  "payload": {
    "requestId": "RES-1787039577495",
    "kind": "residential",
    "name": "Elena Rostova",
    "email": "elena.rostova@sandhurst.co.za",
    "mobile": "+27 82 123 4567",
    "location": "Sandhurst, Sandton",
    "scope": "Double volume 5.5m velvet curtains in formal lounge"
  },
  "crm": {
    "status": "created",
    "externalId": "attio_lead_99221"
  },
  "sentAt": "2026-08-18T09:43:24.000Z"
}
```

---

## 4. Verification Command

You can run the full automated lifecycle trigger test suite anytime:

```powershell
npm run test:triggers
```
