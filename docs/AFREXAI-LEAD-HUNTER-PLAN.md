# AfrexAI Lead Hunter Pro — Customized B2B SDR Engine for JHB Curtain Cleaning

**Target Business:** JHB Curtain Cleaning (`jhbcurtaincleaning.co.za`)  
**Lead Authority:** Stephen (+27 75 011 9200 / `stephen-1015@agentmail.to`)  
**Target Geography:** Greater Johannesburg, Sandton, Rosebank, Midrand, Fourways, Pretoria & Gauteng  
**Core Value Proposition:** On-site in-situ curtain & drape cleaning with **Zero Room Downtime**, **Zero Fabric Shrinkage**, and **Same-Day Turnover**.

---

## 🛠 Phase 1: The Foundation (Custom Ideal Customer Profiles)

We define three distinct commercial buyer personas tailored to the Gauteng commercial textile landscape:

### Profile 1: Luxury Hotels & Boutique Guest Houses (Tier A Focus)
```yaml
company:
  industries: [Luxury Hospitality, Boutique Hotels, Executive Lodges, Serviced Apartments]
  property_size: [20, 350 rooms]
  geography: [Sandton CBD, Rosebank, Melrose Arch, Hyde Park, Pretoria, Lanseria]
  target_brands: [Tsogo Sun / Southern Sun, Legacy Hotels, Sun International, Independent 5-Star Lodges]
  pain_signals:
    - High room downtime from off-site dry cleaners (losing R1,800–R3,500/night/room)
    - High labor burden unhooking and rehanging 100+ meters of heavy drapes
    - Guest complaints regarding dusty curtains or stale room air
buyer_persona:
  titles: [General Manager, Executive Housekeeper, Rooms Division Manager, Operations Director]
  decision_authority: Can approve property maintenance & room turnovers immediately
  trigger_events:
    - Pre-peak tourism season (Sept–Nov) & corporate summit blocks
    - TripAdvisor / OTA reviews mentioning room freshness or dust
```

### Profile 2: Corporate Facilities & Commercial Property Portfolios
```yaml
company:
  industries: [Corporate HQs, Commercial Asset Management, Multi-Tenant Office Towers]
  facility_size: [2,000m² – 50,000m²]
  geography: [Sandton CBD, Oxford Parks Rosebank, Waterfall City, Bryanston]
  property_managers: [Growthpoint, Redefine Properties, Broll, JHI, Cushman & Wakefield SA]
  pain_signals:
    - Boardroom acoustic drapes & roller blinds collecting fine traffic/HVAC dust
    - Workplace disruption during standard business hours
    - Compliance audit requirements (SANS 1423 flame retardancy & POPIA logs)
buyer_persona:
  titles: [Facilities Director, Head of Operations, Commercial Asset Manager, Office Manager]
  decision_authority: Discretionary maintenance budget authorization
  trigger_events:
    - Office lease renewals & tenant make-goods
    - Scheduled annual indoor air quality & facilities maintenance reviews
```

### Profile 3: Interior Designers & Luxury Residential Estate Managers
```yaml
company:
  industries: [Interior Architecture, Luxury Decor, Residential Estate Management]
  niche: [High-End Residential Turnkey Projects, Bespoke Window Treatments]
  geography: [Dainfern, Steyn City, Saddlebrook, Waterfall, Hyde Park, Sandhurst]
  pain_signals:
    - Fabric shrinkage or water marks on custom R100k+ silk/velvet drapes
    - Inability to dismantle complex motorized 5m+ double-volume tracks
buyer_persona:
  titles: [Principal Interior Designer, Decor Director, Estate Operations Manager]
  decision_authority: Direct client referral and trade partner approval
```

---

## 🔍 Phase 2: Multi-Source Discovery Matrix

The AI SDR searches and extracts prospects using high-signal Gauteng data channels:

| Target Channel | Source Mechanism | Search Query Operator / Target | Data Yield |
|---|---|---|---|
| **Hospitality Registries** | FEDHASA / Tourism Grading SA | `"Boutique Hotel" OR "Guest House" "Sandton" OR "Rosebank" site:tripadvisor.co.za` | Verified GMs & Housekeepers |
| **Commercial Property Portfolios** | Property Asset Portals | `"Office Park" OR "Corporate Tower" "Sandton" site:broll.com OR site:growthpoint.co.za` | Facilities Directors |
| **Interior Design Directories** | IID SA / Decorex Directories | `"Interior Design" OR "Decor Studio" "Johannesburg" OR "Sandton" site:iidsa.org.za` | Trade Partners & Designers |
| **Attio CRM Synced Inboxes** | Historical Email Interactions | Internal 4,484 synced records processed via `process_all_attio_contacts.py` | 1,705 Validated Leads |

---

## 📈 Phase 3: The Enrichment Engine

Every discovered lead undergoes multi-attribute enrichment before sequencing:

1. **Company Enrichment**:
   - Room / Floor count & property grade (4-Star, 5-Star, Commercial A-Grade).
   - Window drop estimation (Standard 2.4m vs Double-Volume 5m+).
   - Existing compliance requirements (e.g., SANS 1423 flame retardancy).
2. **Contact Enrichment**:
   - Verified direct email address (using domain patterns `first.last@southernsun.com` or `gm@hotel.co.za`).
   - Verified switchboard direct-dial / WhatsApp contact line.
   - Decision-maker verification via LinkedIn.

---

## ⚖️ Phase 4: Lead Scoring Algorithm (0–100 Rubric)

```
┌─────────────────────────────────────────────────────────────┬──────────┐
│ Evaluation Criteria                                         │ Max Pts  │
├─────────────────────────────────────────────────────────────┼──────────┤
│ 1. Company Fit (Luxury Hotel, Corporate Tower, Estate)      │ 30 Pts   │
│ 2. Persona Match (General Manager, Facilities Director)      │ 20 Pts   │
│ 3. Pain Signal (Room Downtime Risk, Heavy Drapery Volume)   │ 25 Pts   │
│ 4. Timing / Trigger Event (Pre-Season Refresh, Conference)  │ 15 Pts   │
│ 5. Prior Interaction / Attio Historical Strength            │ 10 Pts   │
├─────────────────────────────────────────────────────────────┼──────────┤
│ TOTAL LEAD SCORE                                            │ 100 Pts  │
└─────────────────────────────────────────────────────────────┴──────────┘
```

---

## 📂 Phase 5: Tiered Segmentation

- **Tier A (Score 80–100): "Hot Priority"**
  - *Who:* 4/5-star hotels (Tsogo Sun, The Leonardo, Saxon, Maslow) and major corporate towers.
  - *Action:* Personalized 3-touch sequence pitching a **Complimentary 10-Minute On-Site Assessment & Trial Room Clean**.
- **Tier B (Score 60–79): "Warm Commercial"**
  - *Who:* Commercial office suites, private clinics, schools, and boutique decor studios.
  - *Action:* Value-first outreach delivering the **Commercial Facilities Maintenance Checklist & SANS Compliance Overview**.
- **Tier C (Score 40–59): "Nurture"**
  - *Who:* General residential prospects and small commercial tenants.
  - *Action:* Added to seasonal Highveld dust-storm maintenance campaigns.

---

## ✉️ Phase 6: Multi-Touch Outreach Sequences

All outreach dispatches through AgentMail (`stephen-1015@agentmail.to`) rendering our **Google Stitch metallic responsive HTML emailers**:

```
[Touch 1: Day 1] Specific Pain Hook
  Subject: Curtain cleaning without room downtime for {Hotel_Name}
  Body: Highlight zero room inventory loss, in-situ hanging extraction, rooms ready in 3-4 hours.
  CTA: Complimentary 10-minute trial room clean with Stephen.

[Touch 2: Day 4] Proof & Local Authority
  Subject: Re: Curtain cleaning without room downtime for {Hotel_Name}
  Body: Case study evidence (24 suites completed at The Leonardo Sandton on tracks).
  CTA: Line-item maintenance quotation.

[Touch 3: Day 8] The Soft Hand-Off
  Subject: Quick question regarding {Hotel_Name} window care
  Body: Offering direct WhatsApp link (+27 75 011 9200) for future refurbishment planning.
```

---

## 📊 Phase 7: CRM & Pipeline Tracking in Attio

Every prospect transitions through structured lifecycle stages in Attio CRM:

```
[PROSPECT] ──▶ [ENRICHED] ──▶ [OUTREACH_SENT] ──▶ [REPLIED] ──▶ [ASSESSMENT_SCHEDULED] ──▶ [WON]
```

- **Automated Logging:** Dispatches, opens, and replies tracked in `docs/campaigns/outreach-log.json`.
- **KPI Metrics Tracked:** Delivery Rate (SES), Reply Rate (Target >18%), On-Site Assessment Booking Rate (Target >8%).

---

## 🤖 Phase 8: SDR Autopilot Machine

To execute this machine autonomously:

1. **Daily Routine (`scripts/run_scheduled_outreach.py`)**:
   - Ingests batch prospects from `data/cleaned_lists/hotel_hospitality_leads.csv` and `commercial_b2b_leads.csv`.
   - Staggers emails with 2–5 second delays to protect inbox reputation.
2. **Weekly Performance Audit**:
   - Evaluates reply sentiment and adjusts follow-up timing.
