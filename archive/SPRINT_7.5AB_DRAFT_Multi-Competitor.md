# Sprint 7.5: System

## Strategic Context: From Single-Threat to Market Dominance

**Current State:** Your dashboard shows one competitor (SPF). This demonstrates the *concept* but misses the strategic power.

**The Real Opportunity:** PCC doesn't compete with one facility—it competes for **time slots** across a **network of alternatives**. A player choosing their Tuesday 7pm slot is evaluating:
- Which facilities have availability?
- Which are closest to their home/work?
- Which offer the best value for their skill level?
- Which have the social scene they want?

Your dashboard should reveal **market gaps** where PCC can capture demand that competitors can't serve.

---

## The Multi-Competitor Intelligence Framework

### Analogy: From Chess to Poker
- **Single competitor view** = Chess (1v1, perfect information)
- **Multi-competitor intelligence** = Poker (multiple players, reading the table, finding opportunities in others' weaknesses)

You need to shift from "What is SPF doing?" to "Where are the gaps in the **entire market** that PCC can exploit?"

---

## Sprint 7.5 High-Level Plan

### **Phase 1: Competitor Selection & Data Architecture (Foundation)**

**Objective:** Select 5 strategic competitors + build scalable data model

**Competitor Selection Criteria:**
1. **Geographic Proximity** (competing for same catchment area)
2. **Offering Overlap** (similar membership/play models)
3. **Price Point Competition** (directly competitive pricing)
4. **Differentiation Opportunities** (gaps PCC can exploit)
5. **Market Intelligence Value** (publicly available data quality)

**Recommended Chicago Competitors:**
Based on your competitive analysis docs, prioritize:
1. **SPF (Southport)** - Already implemented, premium positioning
2. **Diversey Driving Range** - North side, recreation focus
3. **Midtown Athletic Club** - Premium health club with pickleball
4. **Park District Network** (aggregate) - Public/budget competition
5. **Lakeshore Sport & Fitness** - Multi-sport club competition
6. **Future competitor slot** - Reserve for new entrant tracking

**Data Model Evolution:**
```
Current: Single facility object
Next: Array of facilities with:
- facilityId, name, location (lat/lng)
- pricingModel: { membership, dropIn, peakPricing }
- amenities: { courts, parking, food, locker, pro }
- hours: { operating schedule by day }
- transit: { CTA proximity score }
- competitiveIndex: { calculated threat level }
```

**Deliverable:** 
- 6 competitor profiles with real data
- Normalized data structure
- Priority ranking system (which competitors matter most to PCC)

---

### **Phase 2: Aggregated Intelligence Views (The Strategic Layer)**

**Objective:** Surface insights that only emerge when viewing the **system**, not individual competitors

#### **2A: Market Gap Heatmap**
**What it shows:** Days/times where **multiple competitors** are at capacity or closed
**Strategic insight:** "Tuesday 8-10pm: 4 of 6 competitors closed. PCC should promote evening availability."

**Visual:** 
- 7x24 grid (days × hours)
- Color intensity = # of competitors unavailable
- Click cell → see which competitors are closed/full

#### **2B: Competitive Positioning Matrix**
**What it shows:** Where each competitor sits on Price × Amenities axes
**Strategic insight:** "SPF is premium/high-amenity. Park District is budget/basic. PCC sits in valuable middle ground."

**Visual:**
- Scatter plot: X-axis = Price, Y-axis = Amenities Score
- Bubble size = court capacity
- PCC highlighted in brand color
- Click bubble → facility details

#### **2C: Geographic Capture Zones**
**What it shows:** Transit-accessible catchment areas for each facility
**Strategic insight:** "PCC has exclusive 15-min CTA access to Lincoln Park. Nearest competitor is 28 minutes."

**Visual:**
- Map with overlapping transit zones (existing CTA overlay)
- Color-coded by competitor
- Reveal areas with **0-1 competitors** (underserved markets)
- Click zone → see demographic/business data

#### **2D: Strategic Opportunity Finder** (Enhanced)
**What it shows:** Ranked list of **multi-facility gaps**
**Strategic insight:** "Thursday mornings: 5 competitors have no group instruction. Launch intermediate clinics."

**Current version:** Single competitor gaps
**Enhanced version:** 
- Aggregate gaps across ALL competitors
- Priority score = (# competitors failing) × (PCC capability) × (demand signal)
- Filter by: Day, Time, Service Type, Priority Level

**Example Opportunities:**
| Opportunity | Gap | Competitors Affected | PCC Advantage | Priority |
|-------------|-----|---------------------|---------------|----------|
| Weekday AM Women's Leagues | 6/6 closed before 10am | ALL | Staff available | HIGH |
| Premium Youth Programs | 5/6 have no structured junior development | All except SPF | CJ Robertson (Head Pro) | HIGH |
| Corporate Evening Events | 4/6 don't offer private events 6-9pm | Most competitors | Event space available | MEDIUM |

---

### **Phase 3: Comparative Analysis Tools (Interactive Intelligence)**

**Objective:** Allow management to ask "what if" questions across the competitive set

#### **3A: Feature Comparison Table**
**What it shows:** Side-by-side comparison of offerings
**Use case:** "We're considering adding a café. How does that compare to competitors?"

**Visual:**
- Sortable table with facilities as columns
- Features as rows (courts, parking, food, lessons, events, etc.)
- ✓/✗ indicators with hover details
- PCC column sticky/highlighted
- Export to Excel for board meetings

#### **3B: Price Benchmarking Dashboard**
**What it shows:** How PCC's pricing stacks up across membership tiers
**Use case:** "Should we raise Fanatic membership? What's the competitive ceiling?"

**Visual:**
- Bar chart: Membership tiers across facilities
- Line chart: Drop-in rates by time-of-day
- Box plot: Price distribution for lessons/events
- PCC's position marked clearly

#### **3C: Utilization Delta Analysis**
**What it shows:** Where PCC's capacity utilization differs from competitors
**Use case:** "Why are our Thursday evenings slow when others are full?"

**Visual:**
- Dual heatmaps (PCC vs. Competitor Average)
- Variance heatmap (where PCC under/over-performs)
- Click anomaly → hypothesis generator

---

### **Phase 4: Narrative Intelligence (Executive Summary)**

**Objective:** Auto-generate strategic insights for non-technical stakeholders

#### **4A: Weekly Competitive Brief**
**What it shows:** "This Week's Market Position" one-pager
**Content:**
- Top 3 opportunities (with confidence scores)
- Competitor moves detected (price changes, new offerings)
- PCC performance vs. market average
- Recommended actions

**Format:**
- PDF export
- Email-ready HTML
- Slide deck insert (Google Slides API)

#### **4B: Scenario Planning Tool**
**What it shows:** "If we make X change, how does our position shift?"
**Use case:** "If we add 4 more courts in Phase II, where does that put us?"

**Inputs:**
- Pricing adjustments
- Capacity changes
- New amenities
- Hours extensions

**Outputs:**
- Updated positioning matrix
- New opportunity score
- Estimated revenue impact (if integrated with financial model)

---

## Phased Implementation Roadmap

### **Sprint 7.5A: Foundation (4-6 hours)**
1. Define 6 competitor data schema
2. Collect real data for 5 competitors (use your existing research docs)
3. Update database/state management to handle array of competitors
4. Create competitor selection UI (dropdown/sidebar)
5. Test: Can user switch between competitors without breaking?

**Exit Criteria:** All existing views work with 6 competitors selectable

---

### **Sprint 7.5B: Aggregated Views (6-8 hours)**
1. Build Market Gap Heatmap (aggregate availability)
2. Build Competitive Positioning Matrix (scatter plot)
3. Enhance Opportunity Finder (multi-competitor scoring)
4. Add filtering/sorting by priority

**Exit Criteria:** User can identify opportunities that require viewing >1 competitor

---

### **Sprint 7.5C: Comparative Tools (4-6 hours)**
1. Feature Comparison Table
2. Price Benchmarking Dashboard
3. Export to Excel/PDF

**Exit Criteria:** User can answer "How do we compare?" questions instantly

---

### **Sprint 7.5D: Narrative Layer (Optional - 4-6 hours)**
1. Weekly Brief generator
2. One-pager PDF export
3. Executive summary automation

**Exit Criteria:** Non-technical stakeholders can consume insights without training

---

## Design Patterns for Multi-Competitor Intelligence

### **Pattern 1: Competitor Selector Component**
- Sticky header with competitor chips
- "Compare" mode: Select multiple (checkboxes)
- "Focus" mode: Single deep-dive
- "Market View" mode: All competitors aggregated

### **Pattern 2: Insight Annotations**
- Every gap/opportunity shows: "3 of 6 competitors lack this"
- Hover for list of which competitors
- Click to filter views to just those competitors

### **Pattern 3: Progressive Disclosure**
- Default: High-level market view (all competitors)
- Drill-down: Individual competitor analysis
- Pop-up: Detailed comparison table

### **Pattern 4: Priority Scoring Algorithm**
```
Opportunity Priority Score = 
  (Competitor Gap Weight) × 
  (PCC Capability Score) × 
  (Market Demand Signal) × 
  (Strategic Alignment Factor)

Where:
- Gap Weight = # of competitors failing ÷ total competitors
- Capability Score = 0-10 (do we have resources?)
- Demand Signal = inferred from court bookings, inquiries
- Strategic Alignment = does this serve membership growth goal?
```

---

## Data Sources & Integration Strategy

### **Immediate (Manual Entry)**
From your existing Google Docs research:
1. Facility names, addresses, hours
2. Pricing (membership/drop-in)
3. Amenities checklist
4. Court counts
5. Website URLs

### **Phase 2 (Web Scraping / APIs)**
- CourtReserve public availability
- Google Maps ratings/reviews
- Social media activity (Instagram/Facebook APIs)

### **Phase 3 (Partnerships / Data Purchases)**
- Transit authority APIs (CTA realtime)
- Demographic data (Census/Claritas)
- Credit card transaction data (where legal)

---

## Success Metrics for Sprint 7.5

### **Quantitative:**
1. Time to identify actionable opportunity: <60 seconds
2. Confidence in recommendations: >80% (user survey)
3. Export usage: >50% of sessions
4. Multi-competitor insights discovered: >10 per week

### **Qualitative:**
1. Investor reaction: "This is a real business tool"
2. Management adoption: Used in weekly ops meetings
3. Strategic impact: Drives at least 1 major decision (pricing, hours, programming)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Data Quality:** Competitor data is inaccurate/stale | HIGH | Start with 3 high-confidence competitors; validate manually |
| **Complexity Overload:** Too many views confuse users | MEDIUM | Implement progressive disclosure; default to simplest view |
| **Comparison Paralysis:** More data = harder decisions | MEDIUM | Build opinionated scoring; surface top 3 actions only |
| **Competitive Intel Leakage:** PCC insights visible to competitors | LOW | No public hosting; password-protect; watermark exports |

---

## Next Steps: Your Decision

### **Option A: Full Sprint 7.5 (12-20 hours)**
Execute all phases for comprehensive multi-competitor intelligence

### **Option B: Sprint 7.5A Only (Foundation)**
Get 6 competitors working, defer advanced views to post-demo

### **Option C: Sprint 7.5A + 7.5B (Foundation + Aggregated Views)**
Focus on market gap identification—highest strategic value

### **Option D: Custom Hybrid**
Tell me which phases matter most for your investor demo

### **Option E: Request Detailed Spec**
I'll create a full technical specification document (Google Docs) with wireframes, data models, and implementation steps

---

## Recommended Path (Based on Investor Demo Context)

For maximum impact with limited time, I recommend:

**Sprint 7.5: "MVP Multi-Competitor Intelligence"**
- **Focus:** Foundation (7.5A) + Aggregated Views (7.5B)
- **Time:** 10-14 hours
- **Outcome:** Demo shows PCC finding opportunities across the **entire Chicago market**, not just watching one competitor

**Key Demo Narrative:**
1. Show Market Gap Heatmap: "Here are the 12 time slots where 4+ competitors are unavailable"
2. Show Positioning Matrix: "PCC sits in the sweet spot between premium and budget"
3. Show Enhanced Opportunity Finder: "This week's top opportunity: Thursday AM women's clinics—5 competitors have no offering"
4. Deliver the insight: "By viewing the market systemically, PCC can capture demand that competitors leave unserved"

---

**What's your decision? Reply with a letter (A-E) or tell me your specific needs.**