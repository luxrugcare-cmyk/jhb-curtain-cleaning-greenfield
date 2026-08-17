# AgentMail & Email Setup Guide (`info@jhbcurtaincleaning.co.za`)

This guide explains how to wire **AgentMail** and connect `info@jhbcurtaincleaning.co.za` for autonomous AI email operations, inbound lead processing, and outreach sequences.

---

## 1. Architecture Overview

```
                               ┌──────────────────────────────────────────────┐
                               │  Customer Enquiries & Form Submissions       │
                               │     (Website /quote & /commercial)           │
                               └──────────────────────┬───────────────────────┘
                                                      │
                                                      ▼
                                         /api/leads Endpoint (Next.js)
                                                      │
                         ┌────────────────────────────┴────────────────────────────┐
                         ▼                                                         ▼
            [Resend / AgentMail Outbound]                             [AgentMail AI Agent Inbox]
           Sends instant acknowledgment to                             Receives new lead alerts &
           customer + dispatch to operations                           allows autonomous follow-ups
                         │                                                         │
                         ▼                                                         ▼
       `info@jhbcurtaincleaning.co.za`                                 AI Agent Workflow & CRM Sync
```

---

## 2. Setting Up AgentMail

### Step 1: Obtain AgentMail API Key & Create Inbox
1. Sign in to your **AgentMail** console ([agentmail.to](https://agentmail.to)).
2. Generate an API Key (format: `am_us_...` or `am_...`).
3. Create your agent inbox:
   - Default shared handle: `jhb-curtain-cleaning@agentmail.to`
   - Or connect custom domain inbox: `info@jhbcurtaincleaning.co.za` (Developer/Startup tier).

### Step 2: Configure Environment Variables
Add the following keys to your [`.env.local`](file:///C:/Users/User/Downloads/JHB-Curtain-Cleaning-Website-Handoff/JHB-Curtain-Cleaning-Full-Handoff-2026-08-17/project/.env.local) and GitHub/Vercel secrets:

```ini
# AgentMail Configuration
AGENTMAIL_API_KEY=am_us_your_api_key_here
AGENTMAIL_INBOX_ID=jhb-curtain-cleaning@agentmail.to

# Target for all operational notifications
LEAD_NOTIFICATION_EMAIL=info@jhbcurtaincleaning.co.za
```

---

## 3. Connecting Custom Domain `info@jhbcurtaincleaning.co.za`

To allow AgentMail or Resend to send and receive directly on behalf of `info@jhbcurtaincleaning.co.za`, configure your domain's DNS records at your registrar / DNS host:

### Required DNS Records:

| Type | Host / Name | Target / Value | Purpose |
|---|---|---|---|
| **TXT** | `@` (or `jhbcurtaincleaning.co.za`) | `v=spf1 include:amazonses.com ~all` | **SPF**: Authorizes mail servers |
| **CNAME** | `agentmail._domainkey` | *(Provided in AgentMail dashboard)* | **DKIM**: Cryptographic email authentication |
| **TXT** | `_dmarc.jhbcurtaincleaning.co.za` | `v=DMARC1; p=quarantine; rua=mailto:info@jhbcurtaincleaning.co.za` | **DMARC**: Protects sender reputation |
| **MX** | `notify.jhbcurtaincleaning.co.za` (or root) | *(Provided for inbound routing)* | **MX**: Routes incoming replies to AgentMail |

---

## 4. How Autonomous AI Agents Work with AgentMail

1. **Lead Alerting**:
   - Every residential quote or commercial assessment triggers an alert to `info@jhbcurtaincleaning.co.za` via the AgentMail adapter ([`integrations/agentmail/client.ts`](file:///C:/Users/User/Downloads/JHB-Curtain-Cleaning-Website-Handoff/JHB-Curtain-Cleaning-Full-Handoff-2026-08-17/project/integrations/agentmail/client.ts)).
2. **AI Email Reading & Triage**:
   - The AI agent reads incoming customer emails using `GET /v0/inboxes/{inbox_id}/messages`.
   - It parses customer questions (e.g. fabric type, room count, scheduling preferences).
3. **Drafting or Sending Quotes**:
   - The agent drafts tailored quote responses or follow-up sequences using the templates in `docs/CUSTOMER-REVIEW-REQUEST-TEMPLATES.md` and commercial playbooks.
4. **Outreach & Campaign Execution**:
   - For B2B hotel and corporate outreach, follow the **14-day warm-up schedule** detailed in the `email-campaign-executor` skill to ensure 100% inbox deliverability.
