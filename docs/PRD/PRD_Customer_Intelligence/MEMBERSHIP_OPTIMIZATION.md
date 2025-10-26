# Membership Optimization: Revenue Strategy & Capacity Model

**Project**: PCC Yield Optimizer - Customer Intelligence Center
**Version**: 1.0
**Last Updated**: October 25, 2025
**Author**: Generated from Addendum B (addendum-b.md)

---

## Executive Summary

This document defines PCC's **membership capacity optimization strategy**, balancing the need for recurring membership revenue with the higher per-hour profitability of non-member (pay-to-play) customers.

**Key Finding**: Non-members generate **2x more revenue per court hour** than members, making capacity reservation for non-members critical for total revenue optimization.

**Core Question**: *What is the maximum number of memberships PCC can sell while preserving sufficient non-member capacity to maximize total revenue?*

---

## Table of Contents

1. [Business Context](#1-business-context)
2. [Revenue Model Comparison](#2-revenue-model-comparison)
3. [Membership Capacity Framework](#3-membership-capacity-framework)
4. [Scenario Analysis](#4-scenario-analysis)
5. [Implementation Strategy](#5-implementation-strategy)
6. [Risk Mitigation](#6-risk-mitigation)
7. [Measurement & Monitoring](#7-measurement--monitoring)

---

## 1. Business Context

### 1.1 Strategic Priorities

**Priority #1: Drive Memberships** (Recurring Revenue)
- Predictable monthly revenue stream
- Customer lifetime value (CLV): $1,800-3,800/year
- Builds loyal community
- Lower churn risk than pay-to-play

**Priority #2: Maximize Total Revenue** (Optimal Mix)
- Non-members pay **2x more per court hour** than members
- Must preserve non-member capacity for higher-margin revenue
- Avoid "membership cannibalization" (selling too many memberships displaces non-members)

**Priority #3: Address Competitive Leakage**
- Customers like Randall going to competitors for themed Friday events
- Social JTBD programming gap causing $6K-11K/year revenue loss
- Need sufficient capacity to add new programming without displacing existing customers

---

### 1.2 Current State (Baseline)

**Facility Specs**:
- 10 pickleball courts
- Operating hours: 6am-9pm (15 hours/day)
- Total court hours/week: 10 courts × 15 hours × 7 days = **1,050 hours/week**

**Current Membership** (as of Oct 25, 2025):
- Total memberships: **125 members**
- Average booking frequency: **2.4 hours/week per member**
- Total member court hours/week: **300 hours**
- Member utilization: **300 / 1,050 = 28.6%**

**Current Non-Member Usage**:
- Estimated non-member hours/week: **200 hours**
- Non-member utilization: **200 / 1,050 = 19.0%**

**Total Current Utilization**: **47.6%**

---

## 2. Revenue Model Comparison

### 2.1 Member Revenue Model

**Membership Tiers** (hypothetical - adjust with actual PCC pricing):

| Tier | Monthly Fee | Hours Included | Marginal Cost/Hour | Effective $/Hour |
|------|-------------|----------------|--------------------|--------------------|
| Basic | $150 | 8 hours | $0 | $18.75 |
| Standard | $250 | Unlimited | $0 | ~$15-20* |
| Premium | $350 | Unlimited + Perks | $0 | ~$12-18* |

*Effective $/hour calculated based on average usage patterns (2.4 hours/week = ~10.4 hours/month)

**Member Revenue Characteristics**:
- ✅ **Predictable**: Monthly recurring revenue
- ✅ **Low Churn**: 85%+ retention year-over-year
- ✅ **Community**: Builds loyal customer base
- ⚠️ **Lower $/Hour**: Members pay $12-20/hour effective rate
- ⚠️ **Fixed Capacity**: Each membership claims ~2.4 hours/week

---

### 2.2 Non-Member (Pay-to-Play) Revenue Model

**Court Rental Pricing** (hypothetical - adjust with actual PCC pricing):

| Time Block | Peak/Off-Peak | Price/Hour | Premium Multiplier |
|------------|---------------|------------|---------------------|
| Early Morning (6-9am) | Off-Peak | $25 | 1.0x |
| Morning (9am-12pm) | Off-Peak | $30 | 1.2x |
| Midday (12-3pm) | Off-Peak | $30 | 1.2x |
| Afternoon (3-6pm) | Peak | $35 | 1.4x |
| Evening (6-9pm) | Peak | $40 | 1.6x |

**Average Non-Member Rate**: **$32/hour**

**Non-Member Revenue Characteristics**:
- ✅ **Higher $/Hour**: $25-40/hour (vs. $12-20 for members)
- ✅ **Peak Pricing**: Capture premium rates during high-demand times
- ✅ **Flexibility**: No fixed capacity commitments
- ⚠️ **Unpredictable**: Revenue varies by season, weather, events
- ⚠️ **Higher Churn**: One-time visitors, less loyalty
- ⚠️ **Acquisition Funnel**: Many non-members eventually convert to members

---

### 2.3 Revenue Comparison: Member vs. Non-Member

**Per-Hour Revenue**:
- **Member**: $12-20/hour (average: ~$16/hour)
- **Non-Member**: $25-40/hour (average: ~$32/hour)
- **Delta**: Non-members generate **2x more revenue per hour**

**Breakeven Analysis**:
- **Question**: How many member hours equal 1 non-member hour?
- **Answer**: $32 non-member / $16 member = **2 member hours = 1 non-member hour**

**Implication**: Selling 1 membership (2.4 hours/week) displaces **1.2 non-member hours/week** in revenue equivalence.

---

### 2.4 Total Revenue Optimization

**Key Insight**: Membership growth must not displace so many non-member hours that total revenue declines.

**Formula**:
```
Total Revenue = (Member Hours × Member $/hr) + (Non-Member Hours × Non-Member $/hr)

Where:
- Member Hours = Memberships × Avg Booking Frequency
- Non-Member Hours = (Total Hours × Target Utilization) - Member Hours - Reserve Buffer
```

**Example Calculation** (current state):
```
Member Revenue: 300 hours/week × $16/hr = $4,800/week = $249,600/year
Non-Member Revenue: 200 hours/week × $32/hr = $6,400/week = $332,800/year
Total Revenue: $582,400/year

Member % of Revenue: 43%
Non-Member % of Revenue: 57%
```

**Optimal Mix**: Maintain **40-50% member revenue, 50-60% non-member revenue** to maximize total revenue while building recurring base.

---

## 3. Membership Capacity Framework

### 3.1 Capacity Constraints

**Hard Constraints**:
1. **Total Court Hours**: 1,050 hours/week (10 courts × 15 hours × 7 days)
2. **Peak Time Bottlenecks**: Friday/Saturday evenings (95%+ utilization already)
3. **Operational Ceiling**: Cannot exceed 100% utilization (physically impossible)

**Soft Constraints**:
1. **Target Utilization**: 80-90% (leave 10-20% buffer for spontaneous bookings, maintenance)
2. **Minimum Non-Member Reserve**: 20% of total hours (to preserve higher-margin revenue)
3. **Member Booking Patterns**: 2.4 hours/week average (varies by tier and JTBD)

---

### 3.2 Membership Capacity Formula

**Calculate Maximum Memberships**:

```
Max Memberships = (Total Hours × Target Utilization - Min Non-Member Reserve) / Avg Member Booking Frequency

Where:
- Total Hours = 1,050 hours/week (10 courts × 15 hours × 7 days)
- Target Utilization = 80-90% (recommendation: 85%)
- Min Non-Member Reserve = 20-30% of total hours (recommendation: 20%)
- Avg Member Booking Frequency = 2.4 hours/week (from historical data)
```

**Example (Balanced Scenario)**:
```
Max Memberships = (1,050 × 0.85 - 1,050 × 0.20) / 2.4
                = (892.5 - 210) / 2.4
                = 682.5 / 2.4
                = 284 memberships

Member Hours: 284 × 2.4 = 681.6 hours/week (65% utilization)
Non-Member Hours: 210 hours/week (20% utilization)
Total Utilization: 85%
```

**Peak Constraint Check**:
- Must verify that **no single time block exceeds 95% utilization**
- Friday/Saturday evenings are bottlenecks (already 95%+)
- **Recommendation**: Cap memberships at level where peak constraints are not violated

---

### 3.3 Utilization Heatmap Analysis

**Critical Time Blocks** (≥95% utilization):
- **Wednesday Evening** (6-9pm): 96% utilized (76% member, 20% non-member)
- **Friday Evening** (6-9pm): 98% utilized (78% member, 20% non-member)

**Implication**: These time blocks are **membership growth bottlenecks**. Adding more members will:
1. Displace non-member bookings in these slots
2. Reduce total revenue (members pay $16/hr, non-members pay $40/hr in evening peak)
3. Create waitlists and customer frustration

**Solution Options**:
1. **Cap Memberships**: Limit total memberships to avoid peak bottlenecks
2. **Peak Pricing for Members**: Charge members premium rates for peak times (hybrid model)
3. **Add Programming**: Shift demand to off-peak times with themed events
4. **Expand Capacity**: Add courts (capital-intensive, long-term solution)

---

## 4. Scenario Analysis

### 4.1 Scenario Definitions

**Scenario A: Aggressive Growth** (90% utilization, 10% non-member reserve)
- **Target**: Maximize memberships, minimize non-member capacity
- **Risk**: High revenue cannibalization, peak bottlenecks
- **Best for**: Clubs prioritizing community/loyalty over revenue

**Scenario B: Balanced** (85% utilization, 20% non-member reserve)
- **Target**: Optimize total revenue, maintain healthy non-member mix
- **Risk**: Moderate growth potential
- **Best for**: PCC's current strategy (recommended)

**Scenario C: Conservative** (75% utilization, 30% non-member reserve)
- **Target**: Preserve non-member revenue, lower membership growth
- **Risk**: Under-utilized courts, slower recurring revenue growth
- **Best for**: Clubs with highly profitable non-member segments

---

### 4.2 Scenario Comparison Table

| Scenario | Target Util | Non-Member Reserve | Max Memberships | Member Hours | Non-Member Hours | Member Revenue | Non-Member Revenue | Total Revenue |
|----------|-------------|---------------------|-----------------|--------------|------------------|----------------|---------------------|---------------|
| **Aggressive** | 90% | 10% | 350 | 840 hrs/wk | 105 hrs/wk | $13,440/wk | $3,360/wk | $16,800/wk ($873,600/yr) |
| **Balanced** | 85% | 20% | 284 | 682 hrs/wk | 210 hrs/wk | $10,912/wk | $6,720/wk | $17,632/wk ($916,864/yr) |
| **Conservative** | 75% | 30% | 202 | 485 hrs/wk | 315 hrs/wk | $7,760/wk | $10,080/wk | $17,840/wk ($927,680/yr) |

**Key Finding**: **Conservative scenario generates highest total revenue** ($927,680/yr) despite lowest membership count.

**Explanation**: Non-member premium ($32/hr vs. $16/hr) more than compensates for lower recurring revenue.

---

### 4.3 Revenue Impact Analysis

**Current State** (125 memberships, 300 member hours, 200 non-member hours):
- Total Revenue: $582,400/year
- Member: 43%, Non-Member: 57%

**Balanced Scenario** (284 memberships):
- **Additional Memberships**: 284 - 125 = **159 new memberships**
- **Additional Member Revenue**: (682 - 300) × $16 × 52 = **$317,696/year**
- **Lost Non-Member Revenue**: (200 - 210) × $32 × 52 = **-$0** (actually gain 10 hours)
- **Net Revenue Impact**: **+$317,696/year**
- **New Total Revenue**: $900,096/year (+54% increase)

**Risk**: If peak constraints violated (Friday/Wed evenings), must cap below 284 memberships.

---

## 5. Implementation Strategy

### 5.1 Phased Membership Growth

**Phase 1: Validate Capacity Model** (Weeks 1-4)
1. Build Membership Capacity Dashboard (FEAT-015)
2. Analyze current utilization by time block
3. Identify peak constraints (≥95% utilization)
4. Calculate phase-safe membership growth (+25 members)

**Phase 2: Controlled Growth** (Weeks 5-12)
1. Add 25-50 new memberships (total: 150-175)
2. Monitor utilization heatmap weekly
3. Track member vs. non-member revenue mix
4. Pause growth if peak constraints emerge

**Phase 3: Programming Optimization** (Weeks 13-24)
1. Launch Social JTBD programs (Glow Pickleball, themed events)
2. Shift demand from peak to off-peak times
3. Re-assess capacity after demand shift
4. Resume controlled growth if headroom available

**Phase 4: Scale to Target** (Weeks 25-52)
1. Continue growth toward Balanced scenario (284 members)
2. Maintain 20% non-member reserve
3. Monitor total revenue vs. membership revenue ratio
4. Implement dynamic pricing if needed

---

### 5.2 Waitlist Management

**When to Implement Waitlist**:
- Peak time blocks reach 95%+ utilization
- Member booking requests exceed available capacity
- New membership applications exceed growth targets

**Waitlist Tiers**:
1. **Priority 1**: Existing members upgrading tiers
2. **Priority 2**: Former members returning
3. **Priority 3**: Non-members with 10+ visits (acquisition funnel)
4. **Priority 4**: New applicants

**Waitlist Communication**:
- Estimated wait time (based on churn rate)
- Alternative options (off-peak memberships, pay-to-play)
- Email notifications when capacity opens

---

### 5.3 Peak Pricing Strategy

**Problem**: Peak times (evening, weekends) are bottlenecks limiting membership growth.

**Solution**: Implement peak pricing for members to manage demand.

**Peak Pricing Models**:
1. **Tiered Memberships**:
   - Off-Peak Membership: $150/month (6-9am, 12-3pm weekdays)
   - Standard Membership: $250/month (any time except Fri/Sat evening)
   - Premium Membership: $350/month (unlimited, includes peak times)

2. **Usage Credits**:
   - Base membership: $200/month + 10 credits
   - Off-peak booking: 1 credit/hour
   - Peak booking: 2-3 credits/hour
   - Buy additional credits: $5/credit

3. **Hybrid Model** (Recommended):
   - Unlimited off-peak access included in membership
   - Peak times require reservation + $10 surcharge
   - Non-members pay full rate ($40/hr peak, $25/hr off-peak)

**Impact**: Shifts member demand to off-peak times, preserves peak capacity for high-paying non-members.

---

## 6. Risk Mitigation

### 6.1 Membership Cannibalization Risk

**Risk**: Selling too many memberships displaces non-member revenue, reducing total revenue.

**Mitigation**:
1. **Hard Cap**: Limit memberships to Balanced scenario (284 max)
2. **Weekly Monitoring**: Track member vs. non-member revenue ratio (target: 40-50% member, 50-60% non-member)
3. **Dynamic Pricing**: Adjust member peak surcharges to balance demand
4. **Waitlist Activation**: Pause new memberships if non-member revenue declines >10%

**Early Warning Indicators**:
- Non-member revenue declines 2 consecutive weeks
- Peak utilization exceeds 98%
- Member revenue surpasses 55% of total revenue

---

### 6.2 Peak Constraint Risk

**Risk**: Friday/Saturday evenings already at 95%+ utilization, limiting growth.

**Mitigation**:
1. **Programming Shifts**: Launch Friday evening themed events to shift demand
2. **Off-Peak Incentives**: Offer discounts for off-peak bookings
3. **Member Education**: Promote benefits of off-peak play (less crowded, more courts available)
4. **Capacity Expansion**: Long-term solution (add courts, extend hours)

**Short-Term Solution**: Cap memberships at level where Wed/Fri evenings stay below 98% (likely ~200-220 members).

---

### 6.3 Competitive Leakage Risk

**Risk**: Customers leaving PCC for competitor Social JTBD programming (Glow Pickleball, themed nights).

**Current Impact**: $6K-11K/year revenue loss (15 customers with unmet Social JTBD).

**Mitigation**:
1. **Immediate**: Launch Glow Pickleball pilot (4-week timeline, $2,300 profit/event)
2. **Short-term**: Add 3-5 Social JTBD programs (1980s Night, Brunch & Bingo, Trivia)
3. **Medium-term**: Build competitive programming library (FEAT-016) to systematically identify and replicate successful programs
4. **Long-term**: Automate competitive monitoring via social media APIs

**Revenue Recovery**: If Social JTBD gap closed, recover $6K-11K/year + gain $27,600/year from monthly Glow Pickleball.

---

## 7. Measurement & Monitoring

### 7.1 Key Performance Indicators (KPIs)

**Revenue KPIs**:
1. **Total Revenue**: Weekly/monthly total (target: +54% YoY)
2. **Member Revenue**: % of total (target: 40-50%)
3. **Non-Member Revenue**: % of total (target: 50-60%)
4. **Revenue per Court Hour**: Average across all bookings (target: $22-28/hr)

**Utilization KPIs**:
1. **Total Utilization**: % of available hours booked (target: 80-90%)
2. **Peak Utilization**: Max utilization in any single time block (threshold: <95%)
3. **Member Utilization**: % of hours booked by members (target: 60-70%)
4. **Non-Member Utilization**: % of hours booked by non-members (target: 20-30%)

**Membership KPIs**:
1. **Total Memberships**: Current count (target: 284 balanced scenario)
2. **Membership Growth Rate**: Month-over-month % change (target: +10-20/month)
3. **Member Churn Rate**: Monthly cancellations (target: <5%)
4. **Member Booking Frequency**: Avg hours/week (current: 2.4, monitor for changes)

**Competitive KPIs**:
1. **Customer Leakage**: # of customers with unmet JTBD (current: 15 Social)
2. **Leakage Revenue Risk**: Estimated annual revenue at risk (current: $6K-11K)
3. **Program Adoption**: # of new programs launched (target: 2-3/quarter)
4. **JTBD Gap Score**: PCC vs. Competitors by JTBD (target: close Social gap from ⭐ to ⭐⭐⭐⭐)

---

### 7.2 Dashboard Monitoring

**Membership Capacity Dashboard** (FEAT-015):
- Utilization Heatmap (7×5 grid, member vs. non-member split)
- Capacity Calculator (scenario modeler)
- Revenue Comparison Chart (member vs. non-member trend)
- Peak Constraint Alerts (≥95% utilization warnings)

**Update Frequency**: Weekly (auto-refresh from CourtReserve CSV imports)

**Review Cadence**:
- **Daily**: Peak constraint alerts
- **Weekly**: Utilization trends, revenue mix
- **Monthly**: Membership growth vs. target, scenario adjustments
- **Quarterly**: Full capacity model review, strategic pivots

---

### 7.3 Decision Triggers

**Trigger 1: Non-Member Revenue Declines >10%**
- **Action**: Pause new memberships, investigate cause
- **Hypothesis**: Membership cannibalization
- **Solution**: Cap memberships at current level, implement peak pricing

**Trigger 2: Peak Utilization Exceeds 98%**
- **Action**: Activate waitlist, stop new memberships
- **Hypothesis**: Capacity bottleneck reached
- **Solution**: Shift demand via programming, consider capacity expansion

**Trigger 3: Member Revenue Exceeds 55% of Total**
- **Action**: Reduce new membership growth rate
- **Hypothesis**: Over-rotation toward members
- **Solution**: Increase non-member marketing, adjust peak pricing

**Trigger 4: Total Utilization Falls Below 70%**
- **Action**: Accelerate membership growth, increase non-member marketing
- **Hypothesis**: Under-utilized capacity
- **Solution**: Promotional campaigns, off-peak discounts

---

## Appendix: Assumptions & Validation

### Assumptions

1. **Member Booking Frequency**: 2.4 hours/week (from historical data)
   - **Validation**: Monitor actual booking patterns, update formula if frequency changes
   - **Sensitivity**: +0.5 hours/week reduces max memberships by ~15%

2. **Non-Member Pricing**: $32/hour average
   - **Validation**: Confirm actual PCC pricing, adjust if different
   - **Sensitivity**: +$5/hour increases non-member revenue by 15%

3. **Member Pricing**: $16/hour effective rate
   - **Validation**: Calculate from actual membership tiers and usage
   - **Sensitivity**: -$2/hour makes members less attractive, widens gap with non-members

4. **Peak Constraints**: Friday/Saturday evenings already at 95%+
   - **Validation**: Verify with utilization heatmap data
   - **Sensitivity**: If peak constraints don't exist, max memberships could be 350+

5. **Churn Rate**: 5% monthly (assumed)
   - **Validation**: Track actual cancellations
   - **Sensitivity**: +2% churn requires faster new membership growth to maintain count

---

### Validation Checklist

Before implementing capacity model:

- [ ] Confirm actual PCC membership pricing tiers
- [ ] Confirm actual non-member court rental rates
- [ ] Validate member booking frequency (2.4 hrs/week assumption)
- [ ] Verify total court hours available (1,050/week assumption)
- [ ] Confirm peak time utilization with heatmap data
- [ ] Validate member churn rate (5% assumption)
- [ ] Test scenario calculations with real CourtReserve data

---

**End of Membership Optimization Document**
