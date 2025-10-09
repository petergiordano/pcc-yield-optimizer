# Product Requirements Document: Yield Management & Revenue Optimization

**Product Name**: PCC Yield Optimizer - Revenue Management Module
**Version**: 1.0
**Status**: Draft - Pre-Development
**Owner**: Peter Giordano
**Target Release**: Q1 2026
**Last Updated**: October 8, 2025

---

## Executive Summary

The current PCC Yield Optimizer dashboard successfully identifies **WHERE** market opportunities exist by analyzing competitor utilization patterns and geographic competitive dynamics. This PRD defines the next evolution: a **Yield Management & Revenue Optimization** module that answers **HOW** to optimally allocate PCC's scarce resources (courts, time slots, mezzanine space) to maximize revenue while maintaining member satisfaction.

This system will enable data-driven decisions on critical trade-offs:
- Members vs. drop-ins vs. corporate events allocation
- Prime time vs. off-peak pricing strategies
- Mezzanine space utilization (hot desks, yoga, strength training, events)
- Member capacity planning (how many members before satisfaction degrades)

**Expected Impact:**
- 15-25% revenue increase through optimized pricing and allocation
- 10% reduction in member churn through proactive capacity management
- Clear ROI framework for capital investments (mezzanine build-out)
- Data-driven decision-making replacing intuition and guesswork

---

## Table of Contents

1. [Problem Statement & Context](#problem-statement--context)
2. [The Core Yield Management Challenge](#the-core-yield-management-challenge)
3. [Product Vision & Goals](#product-vision--goals)
4. [User Personas & Use Cases](#user-personas--use-cases)
5. [Functional Requirements](#functional-requirements)
6. [Data Requirements](#data-requirements)
7. [Technical Architecture](#technical-architecture)
8. [Implementation Phases](#implementation-phases)
9. [Success Metrics](#success-metrics)
10. [Dependencies & Risks](#dependencies--risks)
11. [Open Questions](#open-questions)

---

## Problem Statement & Context

### Current State

PCC Yield Optimizer (v1.0) provides competitive intelligence:
- Identifies high-opportunity time slots (e.g., Thursday 6pm scores 8.7/10)
- Quantifies revenue gaps ($60-80k annual opportunity)
- Recommends marketing campaigns to capture overflow demand from competitors

**What's Missing:**

The current system tells you **"Thursday 6pm is a huge opportunity - 35 potential customers from SPF overflow"** but doesn't answer:

1. **How many of those 35 customers should be members vs. drop-ins?**
2. **Should we accept a $500 corporate event that blocks Thursday 6pm for existing members?**
3. **What price should we charge for drop-ins when demand is this high?**
4. **How many total members can we support before booking success rates drop and churn increases?**
5. **Should we invest $40k in mezzanine strength training or $25k in a yoga studio?**

These are **yield management questions** that require balancing:
- **Short-term revenue** (corporate events, premium pricing) vs. **Long-term value** (member retention, LTV)
- **Utilization maximization** (fill every slot) vs. **Member satisfaction** (ensure access during prime time)
- **Revenue diversification** (mezzanine uses) vs. **Core competency focus** (pickleball courts)

### Problem Impact

**Without yield management:**
- Revenue left on table due to suboptimal pricing (charging $25 for drop-ins during peak demand)
- Member churn from poor capacity planning (over-selling memberships, members can't book courts)
- Bad corporate event decisions (accepting high-revenue events that displace members and trigger churn)
- Capital misallocation (building mezzanine amenities without ROI analysis)

**Estimated Annual Impact of Poor Yield Management:**
- **$40-60k** lost revenue from flat pricing instead of dynamic pricing
- **$50-70k** lost LTV from preventable member churn (5-8% churn rate increase)
- **$100-150k** opportunity cost from mezzanine space sitting unused or mis-utilized
- **Total**: $190-280k annual impact

---

## The Core Yield Management Challenge

### Multiple Competing Variables

PCC faces a **multi-dimensional optimization problem** with competing objectives and constraints:

#### 1. Court Allocation Trade-offs

Every hour of court time can be allocated to one of four customer types, each with different economics:

| Customer Type | Revenue/Court-Hour | Lifetime Value | Member Satisfaction Impact | Booking Predictability |
|---------------|-------------------|----------------|---------------------------|----------------------|
| **Members** | $0 marginal* | $2,682 (18mo LTV) | ✅ High (expects access) | High (reserve ahead) |
| **Drop-ins** | $12.50 ($25/2hr) | $25 one-time | ⚠️ Neutral (fills gaps) | Medium (day-of bookings) |
| **Corporate Events** | $62.50 ($500/4 courts/2hr) | $500-2000 per event | ❌ Negative (displaces members) | High (books weeks ahead) |
| **Leagues/Tournaments** | $35 ($35/person × 8 players / 2hr) | $140-280 per event | ✅ High (builds community) | High (recurring schedule) |

*Marginal revenue is $0, but members generate $149/month recurring revenue and have 18-month average tenure = $2,682 LTV.

**The Dilemma:**

> **Thursday 7pm, Court 3 is available next week. Four requests:**
>
> 1. **Member Sarah**: Wants to reserve for her regular doubles game (generates $0 marginal revenue)
> 2. **Drop-in John**: Will pay $25 to play (generates $25 revenue)
> 3. **TechCorp**: Wants to book 4 courts for team-building ($500 revenue, but blocks Sarah + 15 other members)
> 4. **Competitive League**: Recurring Thursday league night ($280 revenue, builds community, aligns with Sarah's play time)
>
> **Question**: Who gets the court?
>
> **Answer**: It depends on:
> - How often does Sarah book? (If weekly, she's a power user - losing her = high churn risk)
> - What's our current member booking success rate? (If <85%, members are already frustrated)
> - How much LTV would we lose if Sarah and 15 others churn? (16 members × $2,682 = $42,912)
> - Does TechCorp want to book during off-peak hours instead? (Win-win: they get space, members keep access)
> - Would the league attract Sarah to stay AND bring new members? (Revenue + retention)

**This is yield management.**

#### 2. Space Diversification (Mezzanine)

PCC has 2,000 sq ft of mezzanine space that could be used for multiple purposes:

| Use Case | Setup Cost | Monthly Revenue Potential | Gross Margin | Customer Overlap | Strategic Alignment |
|----------|-----------|-------------------------|--------------|------------------|-------------------|
| **Hot Desks (10 desks)** | $15,000 | $3,000 (10 × $300/mo) | 75% | Medium (WFH members) | Moderate (passive revenue) |
| **Yoga Studio** | $25,000 | $4,500 (30 classes × $150) | 60% | High (fitness members) | High ("wellness club" positioning) |
| **Strength Training** | $40,000 | $2,000 (add-on to membership) | 80% | Very High (competitive players) | Very High (athlete training) |
| **Event Space Rental** | $10,000 | $3,500 (7 events × $500) | 85% | Low (external clients) | Moderate (revenue diversification) |
| **Arcade/Lounge** | $20,000 | $1,500 (increase bar revenue) | 50% | High (social players, families) | High (social "clubhouse" vibe) |

**The Dilemma:**

> **You have $40,000 capital budget and 2,000 sq ft. What do you build?**
>
> - **Revenue maximization**: Yoga studio ($4,500/mo) has highest absolute revenue
> - **ROI maximization**: Event space ($3,500/mo, $10k investment) has fastest payback (3 months)
> - **Strategic alignment**: Strength training reinforces "athlete training club" vs. "just courts"
> - **Member retention**: Yoga + strength = differentiation from SPF, reduces churn to gyms
> - **Risk mitigation**: Hot desks = passive revenue, low operational complexity, fast to launch
>
> **Answer**: Need a model that weights revenue, ROI, strategic fit, and retention impact.

#### 3. Pricing Optimization

Current pricing is **static**: $25 drop-in rate regardless of demand. This leaves revenue on the table.

**Demand Curve Reality:**

| Time Slot | Current Utilization | Current Price | Optimal Price | Revenue Gain |
|-----------|-------------------|---------------|---------------|--------------|
| Monday 2pm | 30% (low demand) | $25 | $15 (fill capacity) | -$10 but +70% volume = net positive |
| Thursday 7pm | 95% (high demand) | $25 | $35-40 (maximize revenue) | +$10-15 per booking |
| Saturday 10am | 88% (high demand) | $25 | $35 (weekend premium) | +$10 per booking |
| Sunday 8am | 40% (moderate) | $25 | $20 (early bird special) | +50% volume |

**Estimated Annual Impact of Dynamic Pricing:**
- Thursday 7pm: 50 weeks × 4 courts × +$10 = **$2,000/court/year** × 7 courts = $14,000
- Saturday 10am: 50 weeks × 4 courts × +$10 = **$14,000**
- Monday 2pm fill rate increase: 50 weeks × 2 additional bookings × $15 = **$1,500**
- **Total**: ~$30,000 annual revenue increase from pricing optimization alone

#### 4. Capacity Planning

**The Member Satisfaction Equation:**

```
Member Satisfaction = f(Booking Success Rate, Wait Time, Court Quality, Amenities)

Booking Success Rate = (Successful Reservations) / (Total Reservation Attempts)
```

**Current State:**
- 300 members
- Prime time capacity: 7 courts × 3 prime hours (6-9pm) × 5 weekdays = 105 court-hours/week
- Average member books 1x/week = 300 reservation attempts
- Booking success rate: ~70% (210 successful / 300 attempts)
- **This is borderline acceptable** (industry benchmark: 80%+)

**What happens at 400 members?** (Growth target)
- 400 reservation attempts / 105 court-hours = **78% overbooking**
- Booking success rate drops to ~56%
- **Churn risk skyrockets** - members leave when they can't get courts

**Solutions:**
1. **Limit prime time reservations** (max 2 prime slots per member per week)
2. **Expand capacity** (add courts, extend hours to 6am-10pm)
3. **Dynamic allocation** (reserve 70% for members, 30% for drop-ins - release unsold member slots 24hr before)
4. **Tiered membership** (premium members get priority booking)

**This requires modeling** to find optimal capacity constraints without harming revenue.

---

### The Hotel Revenue Management Analogy

This problem is not unique to pickleball. **Hotels solved this decades ago.**

#### Hotel Scenario

**The Marriott has 200 rooms for Saturday night:**

**Competing demands:**
1. **Walk-in guest** offers $150 cash tonight
2. **Corporate contract** guarantees 50 rooms/month at $180/room
3. **Loyalty member** expects availability (free room via points, but high lifetime value)
4. **Online booking** shows $200 for this Saturday (weekend premium pricing)

**Hotel's Decision Framework:**

1. **Revenue Management System** predicts:
   - Demand forecast: 85% occupancy likely for Saturday
   - Historical data: Saturdays in October average $220/room
   - Competitor pricing: Nearby hotels charging $195-240

2. **Dynamic Pricing**:
   - 30 days out: Sell at $180 (early bird, fill baseline)
   - 14 days out: Raise to $200 (demand building)
   - 7 days out: Raise to $220 (weekend premium)
   - Day-of: $150 walk-in if rooms left (better than empty room)

3. **Allocation Strategy**:
   - Reserve 20 rooms for loyalty members (ensure access, prevent churn)
   - Block 50 rooms for corporate contract (guaranteed revenue)
   - Sell 130 rooms on open market (maximize revenue)

4. **Overbooking**:
   - Sell 210 rooms for 200 capacity (expecting 5% no-shows)
   - If everyone shows up, offer $300 + free night to volunteers ("bump" policy)

**Result**: Revenue per available room (RevPAR) increases 18-25% vs. flat pricing.

---

#### How This Maps to PCC

| Hotel Revenue Management | PCC Yield Management |
|-------------------------|---------------------|
| **Rooms** | **Court-Hours** |
| Walk-in guests ($150) | Drop-ins ($25) |
| Corporate contracts ($180) | Corporate events ($500) |
| Loyalty members (points) | Members ($149/mo) |
| Weekend premium pricing | Prime time premium (6-9pm) |
| Overbooking with bump policy | Waitlist with priority access |
| RevPAR (Revenue per Available Room) | Revenue per Available Court-Hour |
| Occupancy forecast | Utilization forecast |
| No-show rate | Cancellation rate |

**Key Insight:**

> Hotels don't ask "Should we accept this $150 walk-in or hold the room for a corporate booking?"
>
> They ask: **"What is the probability-weighted expected value of holding this room vs. selling it now?"**
>
> That's a **math problem**, not a guessing game.

**PCC shouldn't ask:**
> "Should we accept this $500 corporate event on Thursday 7pm or keep the courts for members?"

**PCC should ask:**
> "What is the expected value of this decision considering:
> - Immediate revenue: $500 corporate event
> - Churn risk: 12 displaced members × 3% increased churn probability × $2,682 LTV = **$966 expected loss**
> - Member satisfaction: Booking success rate drops from 72% to 68% (below 70% threshold)
> - Alternative: Can we offer corporate client Friday 2pm instead (off-peak, same revenue, zero member impact)?
>
> **Decision**: Decline Thursday 7pm, counter-offer Friday 2pm. If client insists on Thursday, charge $800 (premium for prime time displacement)."

**This is yield management.**

---

## Product Vision & Goals

### Vision Statement

> **"Enable PCC to operate like a data-driven hospitality business, optimizing every court-hour and square foot to maximize revenue while ensuring members receive the premium experience they expect."**

### Product Goals

#### Primary Goals

1. **Increase Revenue 15-25%** through optimized pricing, allocation, and space utilization
2. **Reduce Member Churn 10%** through proactive capacity management and satisfaction monitoring
3. **Improve Decision Quality** by replacing intuition with data-driven recommendations
4. **Enable Strategic Planning** for growth to 400 members with clear capacity roadmap

#### Secondary Goals

1. Provide clear ROI analysis for capital investments (mezzanine build-out)
2. Automate routine allocation decisions (free up management time)
3. Create feedback loops (measure results, iterate strategies)
4. Build competitive moat (competitors don't have this intelligence)

---

## User Personas & Use Cases

### Persona 1: Christy (Business Owner / Operator)

**Role**: Co-owner, responsible for revenue, member satisfaction, strategic decisions

**Key Responsibilities:**
- Set pricing strategy (membership rates, drop-in rates, event pricing)
- Approve corporate event bookings
- Make capital investment decisions (mezzanine build-out)
- Monitor member satisfaction and churn
- Plan capacity expansion (when to add courts, extend hours)

**Pain Points:**
- "I don't know if accepting this corporate event will hurt member satisfaction"
- "Should I raise drop-in rates or will that hurt revenue?"
- "How many members can we add before we need another court?"
- "Which mezzanine use will generate the best return?"

**Use Cases:**

1. **Corporate Event Decision** (Weekly):
   - Receives corporate event inquiry for Thursday 7pm (4 courts, $500)
   - Opens Yield Management dashboard
   - Sees: "⚠️ Warning: This event displaces 12 member reservations, estimated churn cost $966"
   - Sees: "✅ Alternative: Friday 2pm available, zero member impact, same revenue"
   - **Action**: Counter-offers Friday 2pm, preserves member satisfaction

2. **Pricing Strategy** (Monthly):
   - Reviews dynamic pricing recommendations
   - Sees: "Thursday 7pm demand at 95% - recommend raising drop-in rate from $25 to $35"
   - Sees: "Monday 2pm demand at 30% - recommend lowering to $18 to fill capacity"
   - **Action**: Approves pricing changes, monitors results over 4 weeks

3. **Capacity Planning** (Quarterly):
   - Currently at 320 members, considering growth to 400
   - Opens capacity planner
   - Sees: "⚠️ At 400 members, booking success rate drops to 64% (high churn risk)"
   - Sees: "✅ Solutions: (A) Limit prime time to 2 slots/member/week, (B) Extend hours to 6am-10pm, (C) Add 8th court"
   - **Action**: Chooses option B (extend hours), models projected impact

4. **Mezzanine Investment** (One-time):
   - Has $40k budget for mezzanine build-out
   - Compares 4 options (hot desks, yoga, strength training, event space)
   - Sees ROI analysis, strategic alignment scores, member survey interest
   - **Action**: Selects strength training (18-month payback, high strategic fit)

---

### Persona 2: Peter (Analyst / Dashboard Builder)

**Role**: Business partner, data analyst, technical builder

**Key Responsibilities:**
- Build and maintain yield management models
- Integrate data sources (booking system, financial data)
- Create visualizations and dashboards
- Run scenario analyses and provide recommendations

**Pain Points:**
- "I don't have PCC's actual booking data yet"
- "Hard to model member satisfaction without survey data"
- "Need to validate assumptions with real results"

**Use Cases:**

1. **Build Scenario Model** (Phase 1):
   - Integrate PCC booking system data
   - Build revenue projection model
   - Create 3-5 allocation scenarios
   - Present to Christy for feedback

2. **Analyze Results** (Ongoing):
   - Monitor impact of pricing changes
   - Track booking success rates
   - Measure churn correlation with satisfaction metrics
   - Iterate models based on real data

---

### Persona 3: Front Desk Staff (Operator)

**Role**: Handle bookings, member inquiries, day-to-day operations

**Key Responsibilities:**
- Process drop-in bookings
- Handle corporate event inquiries
- Manage member reservations and conflicts

**Pain Points:**
- "Corporate client wants Thursday 7pm but I don't know if it's available for events"
- "Member is frustrated they can't book prime time - what do I tell them?"

**Use Cases:**

1. **Corporate Event Inquiry**:
   - Client calls requesting Thursday 7pm
   - Checks dashboard: "❌ Not available for events (reserved for members)"
   - Sees alternative: "✅ Friday 2pm available"
   - **Action**: Offers Friday, closes booking

2. **Member Booking Conflict**:
   - Member complains they can't get Thursday 7pm slot
   - Checks dashboard: "Member has booked 3 prime slots this week (limit is 2)"
   - Sees: "⚠️ High demand this week - consider Tuesday 7pm (lower demand)"
   - **Action**: Explains policy, offers alternative

---

## Functional Requirements

### Module 1: Revenue Scenario Planner

**Purpose**: Model different allocation strategies and visualize projected outcomes

#### FR-1.1: Scenario Definition

**Requirement**: System shall allow users to define allocation scenarios with configurable parameters

**Inputs:**
- **Member allocation %** (e.g., 70% of prime time reserved for members)
- **Drop-in allocation %** (e.g., 20% available for drop-ins)
- **Event allocation %** (e.g., 10% available for corporate events)
- **Time slot definitions** (prime time: Mon-Fri 6-9pm, off-peak: all other times)
- **Pricing rules** (base rates, premium multipliers)

**Scenarios to Support:**
1. **"Members First"**: 80% members, 15% drop-ins, 5% events
2. **"Revenue Maximization"**: 50% members, 30% drop-ins, 20% events
3. **"Balanced Growth"**: 65% members, 25% drop-ins, 10% events
4. **"Custom"**: User-defined percentages

**Acceptance Criteria:**
- ✅ User can create named scenarios
- ✅ User can edit allocation percentages per time slot type
- ✅ System validates percentages sum to 100%
- ✅ User can save/load scenarios for comparison

---

#### FR-1.2: Revenue Projection

**Requirement**: System shall calculate projected monthly revenue for each scenario

**Calculation Logic:**

```javascript
// Pseudocode
for each scenario:
  monthlyRevenue = 0

  for each time slot (168 hours/week × 4 weeks = 672 court-hours/month):
    memberRevenue = memberAllocation% × 0 (members already paid monthly)
    dropInRevenue = dropInAllocation% × dropInRate × utilizationForecast
    eventRevenue = eventAllocation% × eventRate × eventBookingRate

    slotRevenue = memberRevenue + dropInRevenue + eventRevenue
    monthlyRevenue += slotRevenue

  membershipRevenue = memberCount × $149
  totalRevenue = monthlyRevenue + membershipRevenue
```

**Outputs:**
- **Total Monthly Revenue** (membership + drop-in + events)
- **Revenue by Customer Type** (breakdown)
- **Revenue by Time Slot** (prime vs. off-peak)

**Acceptance Criteria:**
- ✅ Calculations use actual PCC pricing ($149 membership, $25 drop-in, $500 event average)
- ✅ Forecasts use utilization data (historical booking rates)
- ✅ Results update in real-time as user adjusts scenario parameters

---

#### FR-1.3: Member Satisfaction Scoring

**Requirement**: System shall estimate member satisfaction impact for each scenario

**Proxy Metric**: **Booking Success Rate** (% of reservation attempts that succeed)

**Calculation:**

```javascript
primeTimeCapacity = 7 courts × 3 hours × 5 weekdays = 105 court-hours/week
memberAllocation = primeTimeCapacity × memberAllocation%
memberDemand = memberCount × avgBookingsPerMember (e.g., 400 members × 1.2/week = 480 attempts)

bookingSuccessRate = memberAllocation / memberDemand
if bookingSuccessRate >= 0.85: satisfaction = "High ✅"
else if bookingSuccessRate >= 0.70: satisfaction = "Medium ⚠️"
else: satisfaction = "Low ❌ (Churn Risk)"
```

**Satisfaction Score (0-100):**
- **90-100**: Excellent (booking success >90%)
- **80-89**: Good (booking success 80-90%)
- **70-79**: Fair (booking success 70-80%, acceptable)
- **60-69**: Poor (booking success 60-70%, churn risk)
- **<60**: Critical (booking success <60%, high churn)

**Acceptance Criteria:**
- ✅ Displays satisfaction score (0-100) and rating (Excellent/Good/Fair/Poor/Critical)
- ✅ Shows booking success rate percentage
- ✅ Highlights scenarios with churn risk (score <70)

---

#### FR-1.4: Scenario Comparison Table

**Requirement**: System shall display side-by-side comparison of up to 5 scenarios

**Table Columns:**
- Scenario Name
- Monthly Revenue
- Member Satisfaction Score
- Avg Utilization %
- Churn Risk (Low/Medium/High)
- Revenue per Court-Hour

**Example Output:**

| Scenario | Monthly Revenue | Member Satisfaction | Utilization | Churn Risk | Rev/Court-Hr |
|----------|----------------|-------------------|------------|-----------|-------------|
| Members First | $87,000 | 95 (Excellent) | 78% | Low ✅ | $26 |
| Revenue Max | $112,000 | 68 (Poor) | 93% | High ❌ | $34 |
| Balanced Growth | $98,000 | 84 (Good) | 85% | Medium ⚠️ | $29 |
| Current State | $82,000 | 72 (Fair) | 71% | Medium ⚠️ | $24 |

**Acceptance Criteria:**
- ✅ User can select 2-5 scenarios for comparison
- ✅ Table sorts by any column
- ✅ Visual indicators (✅⚠️❌) for quick assessment
- ✅ Export to CSV/PDF

---

#### FR-1.5: Recommendation Engine

**Requirement**: System shall provide data-driven recommendation for optimal scenario

**Recommendation Logic:**

```python
# Weighted scoring
scenarios.forEach(scenario => {
  score =
    (revenue / maxRevenue) * 0.40 +           # 40% weight on revenue
    (satisfaction / 100) * 0.35 +             # 35% weight on satisfaction
    (utilization / 100) * 0.15 +              # 15% weight on utilization
    (1 - churnRisk) * 0.10                    # 10% weight on low churn risk

  if (score > bestScore):
    recommendedScenario = scenario
})
```

**Output:**
> **Recommendation: "Balanced Growth" scenario**
>
> - Projected revenue: $98,000/month (+19% vs. current)
> - Member satisfaction: 84/100 (Good)
> - Utilization: 85% (healthy)
> - Churn risk: Medium (acceptable for growth phase)
>
> **Rationale**: This scenario maximizes revenue while keeping satisfaction above 80 (industry benchmark). "Revenue Max" earns $14k more but churn risk is too high - estimated churn cost would offset gains.

**Acceptance Criteria:**
- ✅ Recommendation includes scenario name and key metrics
- ✅ Rationale explains why this scenario beats alternatives
- ✅ Warnings about trade-offs (e.g., "Higher revenue but lower satisfaction")

---

### Module 2: Dynamic Pricing Optimizer

**Purpose**: Recommend optimal drop-in pricing by time slot based on demand

#### FR-2.1: Demand Forecasting

**Requirement**: System shall forecast demand for each time slot based on historical data

**Data Sources:**
- Historical booking data (6-12 months)
- Seasonal patterns (winter vs. summer)
- Day-of-week patterns (weekday vs. weekend)
- Time-of-day patterns (morning/afternoon/evening)

**Forecast Output:**
- **Expected demand** (% of capacity likely to book)
- **Confidence interval** (e.g., 70-85% demand with 90% confidence)

**Acceptance Criteria:**
- ✅ Forecasts generated for all 168 weekly time slots
- ✅ Accuracy measured against actual bookings (MAE <10%)
- ✅ Updates monthly as new data arrives

---

#### FR-2.2: Price Recommendation

**Requirement**: System shall recommend drop-in price for each time slot to maximize revenue

**Pricing Algorithm:**

```python
# Price elasticity model
basePrice = $25
demandForecast = 0.85  # 85% expected utilization

if demandForecast >= 0.90:
  recommendedPrice = basePrice × 1.40  # $35 (high demand)
elif demandForecast >= 0.75:
  recommendedPrice = basePrice × 1.20  # $30 (medium-high)
elif demandForecast >= 0.50:
  recommendedPrice = basePrice × 1.00  # $25 (baseline)
elif demandForecast >= 0.30:
  recommendedPrice = basePrice × 0.80  # $20 (fill capacity)
else:
  recommendedPrice = basePrice × 0.60  # $15 (low demand, prevent empty courts)
```

**Constraints:**
- Minimum price: $15 (cost coverage)
- Maximum price: $40 (demand destruction threshold)
- Price changes: Max ±$5 per week (avoid customer confusion)

**Acceptance Criteria:**
- ✅ Recommended price for each time slot
- ✅ Expected revenue impact vs. current flat pricing
- ✅ Price change limits enforced

---

#### FR-2.3: Pricing Heatmap Visualization

**Requirement**: System shall display recommended pricing in heatmap format

**Visual Design:**
- 7 rows (days) × 24 columns (hours)
- Color scale:
  - Dark green: $15-19 (discount to fill capacity)
  - Light green: $20-24 (baseline)
  - Yellow: $25-29 (slight premium)
  - Orange: $30-34 (high demand)
  - Red: $35-40 (peak demand)
- Cell content: Recommended price
- Tooltip: Demand forecast, expected revenue, comparison to current price

**Example:**

```
        6am  7am  8am ... 6pm  7pm  8pm  9pm
Monday  $18  $20  $22 ... $30  $35  $35  $28
Tuesday $18  $20  $22 ... $30  $35  $35  $28
...
```

**Acceptance Criteria:**
- ✅ Heatmap renders for full week
- ✅ Click cell to see detailed breakdown
- ✅ Toggle between "Current Price" and "Recommended Price" views
- ✅ Export pricing schedule to CSV

---

#### FR-2.4: A/B Testing Framework

**Requirement**: System shall support A/B testing of pricing strategies

**Test Setup:**
- Select time slot(s) to test (e.g., Thursday 7pm)
- Define test variants (e.g., $25 vs. $30 vs. $35)
- Set test duration (e.g., 4 weeks)
- Define success metric (total revenue, booking rate, or hybrid)

**During Test:**
- Randomly assign bookings to price variants
- Track bookings, revenue, conversion rate per variant

**Post-Test:**
- Statistical significance test (p<0.05 required)
- Recommendation: "Variant B ($30) generated 18% more revenue with 95% confidence. Recommend implementing permanently."

**Acceptance Criteria:**
- ✅ Create A/B test with 2-3 variants
- ✅ Track results in real-time
- ✅ Statistical analysis at test conclusion
- ✅ Auto-implement winning variant (with approval)

---

### Module 3: Customer Lifetime Value (CLV) Calculator

**Purpose**: Quantify long-term value of members vs. short-term revenue from events

#### FR-3.1: CLV Calculation

**Requirement**: System shall calculate CLV for member segments

**Formula:**

```
CLV = (Monthly Revenue × Gross Margin × Average Tenure) - Acquisition Cost

For PCC Members:
CLV = ($149 × 0.70 × 18 months) - $200 CAC
CLV = $1,879 - $200
CLV = $1,679
```

**Segment Breakdowns:**
- **Power Users** (book 3+ times/week): 24-month tenure, CLV = $2,682
- **Regular Users** (book 1-2 times/week): 18-month tenure, CLV = $1,879
- **Casual Users** (book <1 times/week): 12-month tenure, CLV = $1,046

**Acceptance Criteria:**
- ✅ Calculate CLV by member segment
- ✅ Display average CLV across all members
- ✅ Show CLV vs. drop-in customer value ($25 one-time)

---

#### FR-3.2: Churn Cost Estimator

**Requirement**: System shall estimate financial impact of member churn

**Calculation:**

```
Churn Cost = Number of Churned Members × CLV

Example:
- Current member base: 350
- Annual churn rate: 15% (52 members/year)
- Average CLV: $1,879
- Annual churn cost: 52 × $1,879 = $97,708
```

**Churn Risk Factors:**
- Booking success rate <70% → +5% churn risk
- Frequent displacement by corporate events → +3% churn risk
- Wait time >2 weeks for prime slot → +4% churn risk

**Acceptance Criteria:**
- ✅ Displays current annual churn cost
- ✅ Forecasts churn cost under different scenarios
- ✅ Alerts when churn risk increases (e.g., "⚠️ Accepting this corporate event increases churn risk 2%")

---

#### FR-3.3: Event Revenue vs. Churn Trade-off

**Requirement**: System shall compare corporate event revenue against estimated churn cost

**Decision Framework:**

```
Corporate Event Decision:
- Event revenue: $500 (Thursday 7pm, 4 courts, 2 hours)
- Members displaced: 12
- Churn risk increase: 2% (12 members × 2% = 0.24 members)
- Expected churn cost: 0.24 × $1,879 = $451
- Net benefit: $500 - $451 = $49

Recommendation: ⚠️ Marginal benefit. Consider alternatives:
- Offer Friday 2pm instead (same revenue, zero churn cost) ✅
- Charge premium ($800) to justify churn risk
- Decline and keep member satisfaction high
```

**Acceptance Criteria:**
- ✅ Calculates net benefit (event revenue - churn cost)
- ✅ Recommends accept/decline/counter-offer
- ✅ Suggests alternative time slots if available

---

### Module 4: Capacity Allocation Recommender

**Purpose**: Suggest optimal weekly allocation across all customer types

#### FR-4.1: Weekly Planning Template

**Requirement**: System shall provide recommended allocation by day/time

**Output Format:**

```
MONDAY
Prime Time (6-9pm):
  - 70% reserved for members (5 courts)
  - 20% available for drop-ins (1.5 courts)
  - 10% held for events (0.5 courts)
  Expected revenue: $420

Off-Peak (9am-4pm):
  - 40% members (3 courts)
  - 60% drop-ins (4 courts)
  Expected revenue: $180

TUESDAY
...
```

**Visual**: Calendar grid with color-coded blocks

**Acceptance Criteria:**
- ✅ Generates recommended allocation for all 7 days
- ✅ Separates prime time vs. off-peak
- ✅ Shows expected revenue per time block
- ✅ User can adjust and save custom allocation

---

#### FR-4.2: Capacity Constraint Modeling

**Requirement**: System shall model impact of capacity constraints (member limits, court expansion)

**Constraints to Model:**
1. **Member reservation limits** (e.g., max 2 prime slots per member per week)
2. **Court expansion** (add 8th court, impact on revenue and satisfaction)
3. **Extended hours** (6am-10pm vs. current 8am-9pm)
4. **Waitlist policies** (release unsold member slots 24hr before)

**Example Output:**

```
Constraint: Limit members to 2 prime slots/week

Impact:
- Booking success rate: 72% → 85% (improves satisfaction)
- Member revenue: No change ($149/mo unchanged)
- Drop-in opportunity: +15 court-hours/week available (more drop-in revenue)
- Estimated additional revenue: $1,500/month
- Member satisfaction: 84 → 91 (reduces churn)

Recommendation: ✅ Implement. Increases revenue AND satisfaction.
```

**Acceptance Criteria:**
- ✅ Model at least 4 constraint types
- ✅ Show impact on revenue, satisfaction, utilization
- ✅ Recommend best constraint(s) to implement

---

### Module 5: Mezzanine Space Revenue Planner

**Purpose**: Evaluate ROI of different mezzanine uses

#### FR-5.1: Mezzanine Use Case Comparison

**Requirement**: System shall display ROI comparison table for mezzanine options

**Table Columns:**
- Use Case
- Setup Cost (one-time capital)
- Monthly Revenue
- Monthly Operating Costs
- Gross Margin %
- Payback Period (months)
- Customer Overlap (with members)
- Strategic Alignment Score (0-10)

**Example:**

| Use Case | Setup Cost | Monthly Revenue | Op Costs | Margin | Payback | Overlap | Strategic Score |
|----------|-----------|----------------|----------|--------|---------|---------|----------------|
| Hot Desks (10) | $15,000 | $3,000 | $750 | 75% | 7 mo | Medium | 6/10 |
| Yoga Studio | $25,000 | $4,500 | $1,800 | 60% | 9 mo | High | 8/10 |
| Strength Training | $40,000 | $2,000 | $400 | 80% | 25 mo | Very High | 9/10 |
| Event Space | $10,000 | $3,500 | $525 | 85% | 3 mo | Low | 5/10 |

**Acceptance Criteria:**
- ✅ At least 4 use case options
- ✅ ROI metrics calculated accurately
- ✅ Sort by any column
- ✅ Filter by strategic priority (revenue vs. member retention)

---

#### FR-5.2: Member Interest Survey Integration

**Requirement**: System shall incorporate member survey data into recommendation

**Survey Questions:**
- "Would you use hot desk/coworking space if available?" (Yes/No/Maybe)
- "How often would you attend yoga classes?" (Never/Monthly/Weekly/Multiple per week)
- "Would strength training equipment increase your membership value?" (Yes/No)
- "Likelihood to bring guests to event space rentals?" (1-10 scale)

**Weighted Recommendation:**

```
Strength Training:
- Financial ROI: 25-month payback (slow)
- Member interest: 72% said "Yes" (high demand)
- Strategic fit: 9/10 (aligns with competitive player segment)
- Retention impact: +12% average tenure (members don't need separate gym)

Weighted Score: (0.3 × Financial) + (0.3 × Demand) + (0.4 × Strategic) = 8.2/10

Recommendation: ✅ High priority despite slower payback. Increases member stickiness and differentiates from SPF (courts-only).
```

**Acceptance Criteria:**
- ✅ Import survey results (CSV or manual entry)
- ✅ Weight factors: Financial ROI (30%), Demand (30%), Strategic fit (40%)
- ✅ Recommend top option with rationale

---

#### FR-5.3: Phased Build-out Plan

**Requirement**: System shall suggest phased approach if capital is limited

**Example Output:**

```
Available Capital: $40,000

Recommended Phased Plan:

Phase 1 (Months 1-3): Hot Desks - $15,000
- Fastest payback (7 months)
- Low operational complexity
- Generates $2,250/month net revenue
- Use profits to fund Phase 2

Phase 2 (Months 8-12): Strength Training - $40,000 (use $15k from Phase 1 + $25k new capital)
- Highest strategic value
- Increases member retention 12%
- Differentiates from competitors

Phase 3 (Year 2): Yoga Studio - $25,000
- Builds on strength training (wellness package)
- Captures fitness enthusiast segment
- Potential to upsell combined membership (pickleball + yoga + strength)

Total Investment: $80,000 over 18 months
Expected Revenue: $9,500/month by Month 18
ROI: 142% over 3 years
```

**Acceptance Criteria:**
- ✅ Suggests 2-3 phase plan based on available capital
- ✅ Sequences projects by ROI and strategic dependencies
- ✅ Shows cumulative revenue over time

---

## Data Requirements

### Data We Have (Current System)

✅ **Competitor Utilization Data**
- Source: Google Maps Popular Times API
- Coverage: 6 facilities × 7 days × 24 hours = 1,008 data points
- Update frequency: Real-time (Google updates continuously)

✅ **Facility Metadata**
- Source: Manual data entry (facilities.json)
- Fields: Location, pricing, amenities, hours, segments
- Update frequency: As needed (quarterly)

✅ **Geographic Data**
- Source: City of Chicago Open Data (CTA transit)
- Coverage: Brown, Red, Blue lines + stations
- Update frequency: Static (infrastructure changes rarely)

### Data We Need (New Requirements)

❌ **PCC Booking Data** (Critical - Phase 1 requirement)

**Source**: PCC's booking system (ClubReady, Mindbody, or custom system)

**Required Fields:**
- Booking ID (unique identifier)
- Customer ID (link to member or drop-in)
- Customer Type (member, drop-in, corporate event, league)
- Date/Time (start and end time)
- Court(s) booked
- Price paid
- Booking timestamp (when reservation was made)
- Cancellation status (if applicable)
- No-show status

**Historical Depth**: Minimum 6 months, ideally 12-18 months

**Integration Method:**
- Option A: API integration (real-time sync)
- Option B: Daily CSV export
- Option C: Manual export for initial prototype

**Data Volume**: ~300 members × 1.2 bookings/week × 52 weeks = **18,720 bookings/year**

---

❌ **Member Data** (Critical - Phase 1 requirement)

**Source**: PCC's CRM or membership system

**Required Fields:**
- Member ID
- Join date
- Membership type (individual, family, corporate)
- Monthly rate ($149 standard, or custom)
- Status (active, cancelled, suspended)
- Cancellation date (if applicable)
- Cancellation reason (if available)
- Demographic data (age, zip code - optional but helpful)

**Historical Depth**: All historical members (including churned)

**Data Volume**: ~350 current members + ~100 historical = **450 records**

---

❌ **Financial Data** (Important - Phase 2 requirement)

**Source**: PCC's accounting system (QuickBooks, Xero, etc.)

**Required Fields:**
- Monthly revenue by source (memberships, drop-ins, events, bar/café)
- Monthly expenses by category (labor, facilities, marketing)
- Customer acquisition cost (CAC) - marketing spend / new members
- Average customer lifetime value (CLV) - calculated from member tenure

**Historical Depth**: 12-24 months for trend analysis

---

❌ **Member Satisfaction Data** (Important - Phase 2 requirement)

**Source**: Surveys (Net Promoter Score, satisfaction surveys)

**Required Fields:**
- NPS score (0-10)
- Satisfaction drivers (court access, amenities, community)
- Booking frustration data ("How often can you not get your preferred time slot?")
- Likelihood to recommend

**Collection Method:**
- Quarterly email survey (10 questions, 2 min)
- Post-visit survey (SMS or email after each booking)
- Exit survey (when member cancels)

**Response Rate Target**: 30%+ of active members

---

❌ **Corporate Event Pipeline** (Nice to have - Phase 3 requirement)

**Source**: Sales CRM or manual tracking

**Required Fields:**
- Inquiry date
- Company name
- Event type (team building, tournament, social)
- Preferred date/time
- Court requirements (# of courts, duration)
- Budget range
- Conversion status (booked, declined, pending)

**Purpose**: Forecast event demand, optimize pricing

---

### Data Quality Requirements

| Data Source | Update Frequency | Accuracy Requirement | Completeness |
|------------|-----------------|---------------------|--------------|
| Booking Data | Daily (minimum) | 95%+ accurate | 100% (all bookings) |
| Member Data | Weekly | 99%+ accurate | 100% (all members) |
| Financial Data | Monthly | 100% accurate | 100% (audited) |
| Satisfaction Surveys | Quarterly | N/A (self-reported) | 30%+ response rate |
| Event Pipeline | Weekly | 90%+ accurate | 80%+ (some leads untracked) |

---

## Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                  PCC Yield Optimizer v2.0                   │
│                 (Yield Management Module)                    │
└─────────────────────────────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────────┐   ┌─────────────────┐
│   Frontend   │   │   Backend API    │   │  Data Pipeline  │
│  (React/JS)  │   │  (Node.js/Python)│   │   (ETL Jobs)    │
└──────────────┘   └──────────────────┘   └─────────────────┘
        │                    │                    │
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐   ┌──────────────────┐   ┌─────────────────┐
│ Visualization│   │  Calculation     │   │  Data Storage   │
│  Components  │   │   Engines        │   │  (PostgreSQL)   │
│              │   │                  │   │                 │
│ - Scenario   │   │ - Revenue Model  │   │ - Bookings DB   │
│   Comparison │   │ - Pricing Algo   │   │ - Member DB     │
│ - Pricing    │   │ - CLV Calculator │   │ - Financial DB  │
│   Heatmap    │   │ - Capacity Model │   │                 │
│ - ROI Table  │   │                  │   │                 │
└──────────────┘   └──────────────────┘   └─────────────────┘
```

### Data Flow

```
1. Data Ingestion:
   PCC Booking System → ETL Job → PostgreSQL
   (Daily sync via API or CSV)

2. Calculation:
   PostgreSQL → Calculation Engine → Derived Metrics
   (Nightly batch: calculate revenue forecasts, CLV, satisfaction scores)

3. Presentation:
   Backend API → Frontend → User Dashboard
   (Real-time: user requests scenario, API runs model, returns results)

4. Feedback Loop:
   User Decision → Implementation → Actual Results → Update Models
   (Weekly: compare forecasts vs. actuals, tune algorithms)
```

### Technology Stack

**Frontend:**
- Framework: Vanilla JavaScript (consistent with v1.0) or React (for complex interactions)
- Visualization: D3.js (heatmaps), Chart.js (comparison charts), Plotly (interactive tables)
- State Management: Redux or Context API (if React)

**Backend:**
- API Layer: Node.js + Express (simple REST API)
- Calculation Engine: Python + pandas (data manipulation), scikit-learn (forecasting models)
- Scheduler: node-cron or Python APScheduler (nightly batch jobs)

**Database:**
- Primary DB: PostgreSQL (structured data: bookings, members, financials)
- Cache: Redis (frequently accessed calculations, API responses)

**Deployment:**
- Hosting: Vercel (frontend), Heroku or Railway (backend)
- CI/CD: GitHub Actions (automated testing and deployment)

---

## Implementation Phases

### Phase 1: Data Foundation (3-4 weeks)

**Goal**: Integrate PCC's internal data and establish baseline metrics

**Tasks:**

1. **Week 1: Data Discovery & Integration**
   - Meet with PCC team to access booking system
   - Determine integration method (API, CSV export, manual entry)
   - Pull 12 months of historical booking data
   - Pull all member records (active + churned)

2. **Week 2: Database Setup**
   - Set up PostgreSQL database schema
   - Create ETL pipeline (booking system → DB)
   - Build data validation checks (completeness, accuracy)
   - Import historical data

3. **Week 3: Baseline Metrics Dashboard**
   - Calculate current state metrics:
     - Revenue by customer type (members, drop-ins, events)
     - Utilization rate (% of court-hours booked)
     - Booking success rate (proxy for satisfaction)
     - Member churn rate
   - Build simple dashboard to display current state

4. **Week 4: Validation & Stakeholder Review**
   - Validate metrics with PCC team ("Does this match your understanding?")
   - Identify data quality issues
   - Adjust calculations based on feedback

**Deliverable**: "PCC Operations Dashboard" showing current performance baseline

**Success Criteria:**
- ✅ 12 months of booking data imported
- ✅ Baseline metrics calculated and validated
- ✅ Daily data sync operational
- ✅ Stakeholder sign-off on data accuracy

---

### Phase 2: Revenue Scenario Planner (4-5 weeks)

**Goal**: Build interactive tool to model allocation strategies

**Tasks:**

1. **Week 5: Revenue Model Development**
   - Build revenue projection algorithm (Python/JS)
   - Test with historical data (predict past months, compare to actuals)
   - Tune model parameters for accuracy (MAE <10%)

2. **Week 6: Satisfaction Model Development**
   - Build booking success rate calculator
   - Model member demand curves (booking patterns by time slot)
   - Establish satisfaction thresholds (85% = good, 70% = acceptable, <60% = churn risk)

3. **Week 7: Scenario Builder UI**
   - Create scenario definition form (allocation percentages)
   - Build scenario comparison table
   - Implement recommendation engine

4. **Weeks 8-9: Testing & Iteration**
   - User testing with Christy and PCC team
   - Refine based on feedback
   - Add edge case handling (e.g., holidays, special events)

**Deliverable**: Interactive scenario planner with 3 pre-built scenarios + custom option

**Success Criteria:**
- ✅ Revenue forecasts within 10% of actuals
- ✅ User can create and compare scenarios in <5 minutes
- ✅ Recommendation engine provides actionable guidance

---

### Phase 3: Dynamic Pricing Recommender (3-4 weeks)

**Goal**: Suggest optimal drop-in pricing by time slot

**Tasks:**

1. **Week 10: Demand Forecasting Model**
   - Analyze historical booking patterns
   - Build time series forecasting model (ARIMA or Prophet)
   - Validate forecast accuracy (MAPE <15%)

2. **Week 11: Pricing Algorithm**
   - Develop price elasticity model (how demand changes with price)
   - Implement pricing recommendation logic
   - Set min/max price constraints

3. **Week 12: Pricing Heatmap UI**
   - Build 7×24 heatmap visualization
   - Add click-through for detailed view
   - Export pricing schedule to CSV

4. **Week 13: A/B Testing Framework**
   - Design experiment setup UI
   - Build tracking logic
   - Create statistical analysis reports

**Deliverable**: Pricing heatmap with weekly recommendations + A/B testing capability

**Success Criteria:**
- ✅ Pricing recommendations generated for all 168 time slots
- ✅ A/B test framework operational
- ✅ Expected revenue lift >10% from dynamic pricing

---

### Phase 4: CLV & Churn Analysis (2-3 weeks)

**Goal**: Quantify long-term value and churn costs

**Tasks:**

1. **Week 14: CLV Calculation**
   - Calculate average member tenure (cohort analysis)
   - Build CLV model by segment
   - Validate with actual financial data

2. **Week 15: Churn Cost Estimator**
   - Analyze churn patterns (when and why members leave)
   - Build churn risk scoring model
   - Create corporate event trade-off calculator

3. **Week 16: Integration & UI**
   - Add CLV metrics to scenario planner
   - Build event decision tool ("Accept/Decline/Counter-Offer")
   - Create alerts for high churn risk decisions

**Deliverable**: CLV dashboard + event decision tool

**Success Criteria:**
- ✅ CLV calculated accurately (validated against actual tenure)
- ✅ Churn cost estimates within 20% of actuals
- ✅ Event decision tool provides clear recommendations

---

### Phase 5: Mezzanine ROI Analyzer (2 weeks)

**Goal**: Evaluate mezzanine space options

**Tasks:**

1. **Week 17: Market Research & Data Collection**
   - Research Chicago market rates (coworking, yoga, strength training)
   - Get quotes for build-out costs
   - Survey members for interest levels

2. **Week 18: ROI Calculator**
   - Build comparison table
   - Implement weighted recommendation engine
   - Create phased build-out planner

**Deliverable**: Mezzanine ROI comparison tool with recommendations

**Success Criteria:**
- ✅ At least 4 use cases analyzed
- ✅ ROI calculations validated with PCC financial team
- ✅ Recommendation aligns with strategic goals

---

### Phase 6: Capacity Planning Module (3 weeks)

**Goal**: Model growth to 400 members with capacity constraints

**Tasks:**

1. **Week 19: Capacity Model**
   - Build member growth simulator (300 → 400 members)
   - Model impact on booking success rate
   - Test constraint scenarios (reservation limits, extended hours, new courts)

2. **Week 20: Allocation Recommender**
   - Build weekly planning template
   - Create calendar visualization
   - Implement constraint suggestions

3. **Week 21: Integration & Testing**
   - Integrate with scenario planner
   - User testing with PCC team
   - Finalize recommendations

**Deliverable**: Capacity planner showing path to 400 members

**Success Criteria:**
- ✅ Models show booking success rate at different member counts
- ✅ Recommends specific constraints or expansions
- ✅ User can simulate "what if we add 50 members?" scenarios

---

### Phase 7: Integration & Polish (2 weeks)

**Goal**: Unified yield management platform

**Tasks:**

1. **Week 22: Module Integration**
   - Connect all modules (scenario planner ↔ pricing ↔ CLV ↔ capacity)
   - Build executive dashboard (single view of all key metrics)
   - Create navigation and workflows

2. **Week 23: Documentation & Training**
   - Write user guide
   - Create video tutorials
   - Train PCC team on using the system

**Deliverable**: Complete yield management system + training materials

**Success Criteria:**
- ✅ All modules accessible from single dashboard
- ✅ User can complete end-to-end workflow (scenario → pricing → event decision)
- ✅ PCC team trained and comfortable using system

---

### Total Timeline: 23 weeks (~5.5 months)

**Phased Rollout:**
- **Month 1**: Data foundation (immediate value from baseline metrics)
- **Months 2-3**: Scenario planner (enables allocation decisions)
- **Month 4**: Dynamic pricing (revenue optimization)
- **Month 5**: CLV & mezzanine analysis (strategic planning)
- **Month 6**: Capacity planning & integration (complete system)

---

## Success Metrics

### Business Metrics (Primary)

| Metric | Baseline | Target (12 months) | Measurement Method |
|--------|----------|-------------------|-------------------|
| **Monthly Revenue** | $82,000 | $98,000 (+20%) | Financial reports |
| **Member Churn Rate** | 15%/year | 12%/year (-20%) | Member DB analysis |
| **Booking Success Rate** | 72% | 85% | Booking attempt logs |
| **Revenue per Court-Hour** | $24 | $29 (+20%) | Revenue / total court-hours |
| **Member Satisfaction (NPS)** | Unknown | 50+ (promoters > detractors) | Quarterly survey |

### Product Metrics (Secondary)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Scenario Planner Usage** | 2x/month by Christy | Dashboard analytics |
| **Pricing Recommendations Accepted** | 70%+ acceptance rate | Track approved vs. recommended |
| **Event Decision Tool Usage** | 100% of event inquiries | Sales CRM integration |
| **Model Accuracy** | Revenue forecasts within 10% | Monthly validation |

### Leading Indicators (Monitor Weekly)

- **Drop-in bookings** (should increase with dynamic pricing)
- **Member booking attempt rate** (should stay stable or increase)
- **Corporate event bookings** (should shift to off-peak times)
- **Mezzanine space interest** (survey responses, waiting list)

---

## Dependencies & Risks

### Critical Dependencies

| Dependency | Impact if Missing | Mitigation |
|------------|------------------|------------|
| **PCC Booking System Access** | Can't build data foundation (Phase 1 blocked) | Start with manual CSV exports, build API integration later |
| **Historical Data (12 months)** | Can't validate models | Use 6 months if 12 unavailable, increase confidence interval |
| **Member Survey Data** | Satisfaction scores estimated, not measured | Use booking success rate as proxy initially |
| **Christy's Availability** | User testing delayed, feedback loop slower | Schedule regular check-ins (biweekly) in advance |

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Data quality issues** | High | Medium | Build validation checks, manual review process |
| **Model accuracy <80%** | Medium | High | Use ensemble methods, tune parameters, collect more data |
| **Performance issues (slow dashboards)** | Low | Medium | Optimize queries, use Redis caching, pre-calculate metrics |
| **Integration complexity** | Medium | Medium | Start with CSV exports, build API integration in Phase 2 |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **User adoption low** | Low | High | Involve Christy early, train thoroughly, show quick wins |
| **Recommendations ignored** | Medium | High | Track results, prove value with A/B tests, iterate based on feedback |
| **Revenue targets unrealistic** | Medium | Medium | Set conservative estimates, over-deliver, adjust targets quarterly |
| **Competitor copies approach** | Low | Low | This is execution and data, not just features - hard to replicate |

---

## Open Questions

### Business Questions

1. **What is PCC's actual current churn rate?**
   - Need: Historical member cancellation data
   - Why: Baseline for measuring improvement

2. **What is the target member count?** (400 confirmed, or higher?)
   - Need: Strategic growth plan
   - Why: Determines capacity planning targets

3. **Is PCC willing to implement reservation limits?** (e.g., max 2 prime slots/week)
   - Need: Policy decision from ownership
   - Why: May be necessary to maintain satisfaction at 400 members

4. **What is the acceptable churn rate?** (12%? 10%? Lower?)
   - Need: Industry benchmarks + PCC tolerance
   - Why: Determines how much we can push revenue optimization

5. **What is the timeline for mezzanine build-out?** (6 months? 12 months? 2 years?)
   - Need: Capital planning discussion
   - Why: Determines priority of mezzanine ROI module

### Technical Questions

1. **What booking system does PCC use?** (ClubReady? Mindbody? Custom?)
   - Need: System documentation, API access
   - Why: Determines integration approach

2. **Does PCC have a CRM?** (For tracking corporate event pipeline)
   - Need: Access to sales/CRM system
   - Why: Determines event forecasting capability

3. **What financial reporting system?** (QuickBooks? Xero? Manual?)
   - Need: Access to financial data
   - Why: Validates revenue models

4. **Are there seasonal patterns?** (Summer vs. winter demand different?)
   - Need: 12+ months historical data to analyze
   - Why: Impacts forecasting models

5. **What is current pricing strategy?** (Flat $25? Any promotions or discounts?)
   - Need: Pricing history
   - Why: Baseline for dynamic pricing comparison

---

## Appendix: Detailed Calculations

### A. Revenue Projection Formula

```python
def calculate_monthly_revenue(scenario):
    """
    Calculate projected monthly revenue for a given allocation scenario

    Args:
        scenario: Object with allocation percentages and pricing

    Returns:
        total_revenue: Projected monthly revenue ($)
    """

    # Constants
    COURTS = 7
    WEEKS_PER_MONTH = 4
    HOURS_PER_WEEK = 168  # 7 days × 24 hours

    # Pricing
    membership_rate = 149  # $/month
    drop_in_rate = scenario.drop_in_price  # $/2hr session (default $25)
    event_rate = 500  # $/event (4 courts, 2 hours)

    # Member revenue (recurring)
    member_revenue = scenario.member_count * membership_rate

    # Drop-in revenue (variable)
    drop_in_slots = HOURS_PER_WEEK * scenario.drop_in_allocation_pct
    drop_in_utilization = scenario.drop_in_forecast  # % of slots actually booked
    drop_in_bookings = drop_in_slots * drop_in_utilization
    drop_in_revenue = drop_in_bookings * (drop_in_rate / 2) * WEEKS_PER_MONTH  # /2 for hourly rate

    # Event revenue (variable)
    event_slots = HOURS_PER_WEEK * scenario.event_allocation_pct
    event_booking_rate = scenario.event_forecast  # % of available event slots booked
    events_per_month = (event_slots / 2) * event_booking_rate * WEEKS_PER_MONTH  # /2 for 2hr events
    event_revenue = events_per_month * event_rate

    # Total
    total_revenue = member_revenue + drop_in_revenue + event_revenue

    return {
        'total': total_revenue,
        'member': member_revenue,
        'drop_in': drop_in_revenue,
        'events': event_revenue
    }
```

### B. Booking Success Rate Calculation

```python
def calculate_booking_success_rate(member_count, member_allocation_pct):
    """
    Estimate member booking success rate

    Args:
        member_count: Number of active members
        member_allocation_pct: % of prime time reserved for members (0-1)

    Returns:
        success_rate: % of member booking attempts that succeed (0-1)
    """

    # Prime time capacity
    COURTS = 7
    PRIME_HOURS_PER_WEEK = 15  # Mon-Fri 6-9pm = 5 days × 3 hours

    prime_capacity = COURTS * PRIME_HOURS_PER_WEEK
    member_capacity = prime_capacity * member_allocation_pct

    # Member demand
    AVG_BOOKINGS_PER_MEMBER = 1.2  # members book 1.2 times/week on average
    member_demand = member_count * AVG_BOOKINGS_PER_MEMBER

    # Success rate
    success_rate = min(member_capacity / member_demand, 1.0)  # cap at 100%

    return success_rate
```

### C. Customer Lifetime Value (CLV)

```python
def calculate_clv(segment):
    """
    Calculate Customer Lifetime Value for a member segment

    Args:
        segment: Member segment ('power', 'regular', 'casual')

    Returns:
        clv: Lifetime value ($)
    """

    # Segment parameters
    segments = {
        'power': {'tenure_months': 24, 'monthly_revenue': 149, 'margin': 0.70},
        'regular': {'tenure_months': 18, 'monthly_revenue': 149, 'margin': 0.70},
        'casual': {'tenure_months': 12, 'monthly_revenue': 149, 'margin': 0.70}
    }

    params = segments[segment]

    # CLV = (Monthly Revenue × Margin × Tenure) - Acquisition Cost
    gross_ltv = params['monthly_revenue'] * params['margin'] * params['tenure_months']
    acquisition_cost = 200  # CAC from marketing spend

    clv = gross_ltv - acquisition_cost

    return clv
```

---

## Next Steps

### Immediate (Post-Demo with Christy)

1. **Gauge interest** in yield management concept
2. **Discuss data access** (booking system, member records)
3. **Prioritize modules** (which solves biggest pain point first?)
4. **Get budget approval** (development time, potential tools/software)

### Short-term (Weeks 1-4)

1. **Phase 1 kickoff**: Data foundation
2. **Access booking system** and pull historical data
3. **Build baseline metrics dashboard**
4. **Validate with PCC team**

### Long-term (Months 2-6)

1. **Phased rollout** of all modules
2. **A/B testing** of pricing and allocation strategies
3. **Measure impact** on revenue and churn
4. **Iterate** based on results

---

**This PRD is a living document. As we learn from data and user feedback, we'll refine assumptions, adjust models, and add features.**
