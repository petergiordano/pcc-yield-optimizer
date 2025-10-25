# Product Requirements Document: Strategic Yield Optimization Using Popular Times Data

**Product Name**: PCC Yield Optimizer - Strategic Yield Optimization Module
**Version**: 1.0
**Status**: Draft for Review
**Owner**: Peter Giordano
**Development Approach**: Phased Rollout (3 Sprints)
**Target Release**: Q2 2026
**Last Updated**: October 20, 2025

---

## Document Organization

This PRD is part of a 5-document specification suite. Read in this order:

1. **PRD** (this document) - Product vision, business goals, user needs
2. **[Functional Spec](./FUNCTIONAL_SPEC_Strategic_Yield_Optimization.md)** - What the system should do (functional requirements)
3. **[Technical Spec](./TECHNICAL_SPEC_Strategic_Yield_Optimization.md)** - How to build it (technical architecture)
4. **[Design Spec](./DESIGN_SPEC_Strategic_Yield_Optimization.md)** - UI/UX specifications (design system)
5. **[Epics & Sprints](./EPICS_AND_SPRINTS.md)** - Developer work breakdown (user stories, tasks, sprint planning)

---

## Executive Summary

The PCC Yield Optimizer currently provides competitive intelligence through facility utilization heatmaps (WHERE opportunities exist). This module adds a critical missing layer: **HOW LONG** customers stay at facilities and **HOW EFFICIENTLY** PCC can optimize court capacity and pricing.

### The Core Problem

PCC makes capacity and pricing decisions without understanding competitive session dynamics:

> **Scenario**: "SPF Chicago is fully booked Thursday 7-9pm"
>
> **Current Knowledge**: SPF has 100% popularity at that time
> **Missing Context**: How long do SPF customers stay? If they stay 2.5 hours, courts are occupied 7pm-9:30pm. Can PCC offer 2-hour blocks and fit more sessions?

> **Scenario**: "Should we offer 1-hour, 2-hour, or 3-hour booking blocks?"
>
> **Current Answer**: "Industry standard is 2 hours"
> **Missing Context**: What do OUR competitors' customers actually do? Union Park: 4 hours. SPF: 2.5 hours. Grant Park: 3 hours. What's optimal for PCC's positioning?

> **Scenario**: "We have 13 operating hours (8am-9pm) across 7 courts = 91 court-hours/day"
>
> **Current Answer**: "Let's just offer hourly bookings"
> **Missing Context**: If average session is 2.5 hours, we can only fit 5.2 sessions per court per day. With 2-hour blocks, we get 6.5 sessions. That's 25% more revenue potential.

### The Solution

A **Strategic Yield Optimization Module** that leverages Google Maps Popular Times data (including `time_spent`, `populartimes`, `current_popularity`) to provide:

1. **Session Duration Intelligence**: Understand competitor session lengths and industry benchmarks
2. **Court Turnover Analysis**: Calculate maximum sessions per court based on session duration
3. **Capacity Gap Identification**: Find time slots where competitors are fully booked but have poor turnover
4. **Revenue Modeling**: Estimate revenue impact of different booking block sizes
5. **Dynamic Opportunity Scoring**: Identify high-value time slots where PCC can gain market share

### Expected Business Impact

**Sprint 1 (Weeks 1-3): Session Duration Analysis**
- **Competitor Benchmarking**: Understand 2-4 hour session patterns across 6 competitors
- **Booking Block Optimization**: Data-driven decision on 1.5hr vs 2hr vs 2.5hr blocks
- **Revenue Opportunity Sizing**: $15-30k annual upside from better slot density

**Sprint 2 (Weeks 4-6): Turnover & Capacity Analysis**
- **Peak Time Optimization**: Identify 5-8 high-demand hours where better turnover = +20% capacity
- **Competitor Weakness Identification**: Find facilities with long sessions during peak hours (opportunity to steal market share)
- **Pricing Strategy**: Data to support peak/off-peak pricing differentials

**Sprint 3 (Weeks 7-10): Integrated Yield Dashboard**
- **Real-Time Opportunity Alerts**: When competitor hits 100% + has poor turnover
- **What-If Scenario Planning**: Test different session lengths, pricing, capacity changes
- **ROI Calculator**: Measure actual impact of optimization decisions

**Total Annual Impact**: $50-80k revenue increase + competitive positioning advantage

---

## Product Vision & Strategic Goals

### Vision Statement

> **"Use competitor session duration data to optimize PCC's booking structure, maximize court utilization, and capture market share during high-demand windows."**

### Strategic Positioning

This module completes PCC's three-layer competitive intelligence platform:

| **Popular Times** (Current) | **Strategic Yield** (This PRD) | **Customer Intelligence** (Parallel) |
|---|---|---|
| WHEN are competitors busy? | HOW LONG do sessions last? | WHO are our customers? |
| Hourly popularity 0-100 | Session duration in minutes | Customer segmentation |
| Heatmaps by day/hour | Court turnover rates | Lifetime value analysis |
| → Identifies demand patterns | → Optimizes booking structure | → Targets right customers |

### Product Goals

#### Primary Goals (Sprint 1-2)

1. **Benchmark Session Durations** - Calculate average `time_spent` for all 6 tracked competitors
2. **Analyze Court Turnover** - Model sessions-per-day for different booking block sizes
3. **Identify Capacity Gaps** - Find hours where demand (100%) exceeds efficient turnover
4. **Recommend Booking Structure** - Data-driven optimal block size for PCC

#### Secondary Goals (Sprint 2-3)

1. Visualize session duration vs. popularity correlation
2. Build "opportunity scoring" algorithm (high demand + poor turnover = high opportunity)
3. Create competitor comparison dashboard (session length benchmarking)
4. Enable what-if scenario modeling

#### Long-Term Vision (Post-Launch)

1. Integration with PCC booking system (real-time availability + duration tracking)
2. Dynamic pricing based on demand + turnover efficiency
3. Predictive capacity modeling (forecast booking density 2-4 weeks out)
4. Automated competitor monitoring (alert when patterns change)

---

## User Personas

### Persona 1: Christy (Business Owner / Operator)

**Role**: Co-owner, responsible for revenue, operations, strategic decisions

**Background**:
- Manages 7 courts with 13-hour operating day (8am-9pm)
- Current booking structure: 2-hour blocks
- No data on whether 2 hours is optimal
- Competing against SPF (8 courts), Big City Pickle (10 courts), Pickle Haus (12 courts)

**Daily Workflow**:
- Reviews booking calendar (morning) - sees open slots
- Handles pricing decisions (monthly) - unsure if pricing is competitive
- Monitors competitor Facebook pages (weekly) - sees when they're "fully booked"
- Makes operational changes (quarterly) - no data to support changes

**Pain Points**:
- **"I don't know if 2-hour blocks are optimal"** - Is it too long? Too short? Leaving money on the table?
- **"SPF is always fully booked Thursday nights"** - But if their customers stay 2.5 hours, they're inefficient. Can I capitalize?
- **"I see Grant Park is busy 6-8pm"** - But customers stay 3 hours, so courts are occupied 6-9pm. That's poor turnover during peak time.
- **"Should I offer 1.5-hour peak slots?"** - Would that increase revenue or frustrate members?

**Goals**:
- Increase revenue 15-20% without adding courts
- Optimize booking structure based on data, not guesses
- Capture market share from competitors with inefficient turnover
- Make pricing decisions based on competitive session dynamics

**Success Criteria**:
- Know competitor session durations within 30 minutes
- Understand optimal booking block for peak vs. off-peak
- Identify 5-8 time windows where PCC can gain advantage
- Model revenue impact of different booking structures

---

### Persona 2: Peter (Developer / Data Analyst)

**Role**: Technical lead, builds dashboards, analyzes competitive data

**Background**:
- Built Popular Times visualization showing competitor busy times
- Has access to Google Maps `time_spent` data for competitors
- Needs to translate raw data into actionable insights for Christy
- Responsible for building decision-support tools

**Daily Workflow**:
- Fetch popular times data (weekly) via Python scripts
- Build visualizations (ad-hoc) when Christy asks questions
- Analyze trends manually in spreadsheets
- Prototype new dashboard features

**Pain Points**:
- **"`time_spent` data exists but isn't surfaced"** - Collected but not visualized
- **"Manual calculations for turnover analysis"** - No automated tool for sessions-per-day math
- **"Can't answer 'what if' questions quickly"** - "What if we did 1.5-hour blocks?" requires recalculating everything
- **"No way to rank opportunities"** - Which competitor weakness should PCC focus on first?

**Goals**:
- Build reusable visualization components for session duration analysis
- Automate turnover calculations (eliminate spreadsheet manual work)
- Create scenario modeling tools that Christy can use self-service
- Surface insights proactively (don't wait for Christy to ask)

**Success Criteria**:
- Session duration data visible in dashboard (no manual exports)
- One-click turnover analysis for any competitor
- Scenario modeling tool (change session length, see revenue impact)
- Automated weekly insights report

---

## Problem Statement

### Current State

**What PCC Has Today**:
- Popular times data (0-100 popularity by hour for 6 competitors)
- Heatmap visualization showing when competitors are busy
- Manual understanding of "SPF is busy Thursday nights"

**What PCC Lacks**:
- Session duration data (how long customers stay)
- Court turnover analysis (sessions per day achievable)
- Capacity efficiency scoring (is 100% popularity efficient or wasteful?)
- Booking structure optimization (what block size maximizes revenue?)

### Quantified Problem

**Example: Thursday 7-9pm Peak Window**

| Competitor | Popularity | time_spent | Effective Hours | Turnover Efficiency |
|------------|-----------|------------|-----------------|---------------------|
| SPF Chicago | 100% | 150 min (2.5 hrs) | 7pm-9:30pm | **Low** (2.5hr blocks) |
| Grant Park | 75% | 180 min (3 hrs) | 7pm-10pm | **Very Low** (3hr blocks) |
| Union Park | 84% | 240 min (4 hrs) | 7pm-11pm | **Terrible** (4hr blocks) |
| Pickle Haus | 70% | 150 min (2.5 hrs) | 7pm-9:30pm | **Low** |
| **PCC (Opportunity)** | ??? | **Target: 120 min (2 hrs)** | 7pm-9pm | **High** (2hr blocks) |

**Opportunity**: If PCC offers **2-hour blocks** during peak time while competitors offer 2.5-4 hour sessions:
- PCC fits **6.5 sessions per court per day** (13 operating hours / 2 hrs)
- SPF fits **5.2 sessions per court per day** (13 hours / 2.5 hrs)
- PCC has **25% more slot density** = **25% more revenue potential**

**Without This Tool**: Christy doesn't know competitor session lengths, can't calculate turnover rates, can't model revenue impact

**With This Tool**: Christy sees "SPF: 2.5 hr sessions, 5.2 sessions/day. PCC: 2 hr sessions, 6.5 sessions/day. **Revenue opportunity: +$22k/year**"

---

## Business Objectives

### Primary Objectives

1. **Optimize Booking Block Size** (Target: Q2 2026)
   - **Current**: 2-hour blocks (assumption-based)
   - **Goal**: Data-driven optimal block size (may be 1.5, 2, or 2.5 hours)
   - **Success Metric**: 15-25% increase in sessions-per-court-per-day vs. closest competitor

2. **Identify Top 5 Capacity Opportunities** (Target: Sprint 2)
   - **Current**: Ad-hoc observations like "SPF is busy Thursday nights"
   - **Goal**: Ranked list of time windows where PCC can gain market share
   - **Success Metric**: Actionable list with estimated revenue impact per opportunity

3. **Model Revenue Impact** (Target: Sprint 3)
   - **Current**: No quantified impact of operational changes
   - **Goal**: "If we change to 1.5-hour peak blocks, revenue increases $30k/year"
   - **Success Metric**: ROI calculator showing booking structure changes

### Secondary Objectives

1. Benchmark PCC against all competitors on session duration
2. Understand correlation between popularity and session length (do busy times = longer stays?)
3. Identify competitor weaknesses (poor turnover during peak demand)
4. Build reusable yield analysis framework for future facilities

---

## Key Features

### Feature 1: Session Duration Benchmarking

**What**: Display `time_spent` data for all competitors in comparative view

**Why**: Christy needs to know "How long do competitor customers stay?" to optimize PCC's booking structure

**User Story**:
> As Christy, I want to see average session duration for all 6 competitors so that I can benchmark PCC's 2-hour blocks against the market.

**Acceptance Criteria**:
- Show `time_spent` in hours (not just raw minutes)
- Display as sortable table: Facility | Type | Session Duration | Courts | Operating Hours
- Highlight outliers (Union Park's 4 hours is extreme)
- Include "industry average" calculation

**Success Metric**: Christy can answer "Is 2 hours competitive?" within 10 seconds

---

### Feature 2: Court Turnover Calculator

**What**: Calculate maximum sessions-per-day for each competitor based on session duration

**Why**: Turnover rate determines revenue capacity. 2-hour sessions fit more per day than 3-hour sessions.

**User Story**:
> As Christy, I want to see how many sessions each competitor can fit per day so that I can identify which competitors have poor turnover efficiency.

**Calculation**:
```
Sessions per day = Operating Hours / Average Session Duration

Example:
SPF Chicago: 16 hours (6am-10pm) / 2.5 hours = 6.4 sessions/day per court
PCC: 13 hours (8am-9pm) / 2.0 hours = 6.5 sessions/day per court
```

**Acceptance Criteria**:
- Calculate sessions-per-day for all competitors
- Display as "Turnover Efficiency Score" (higher = better)
- Show total daily capacity (sessions/day × number of courts)
- Flag competitors with <5 sessions/day (inefficient)

**Success Metric**: Identify 2-3 competitors with <5.5 sessions/day (opportunity targets)

---

### Feature 3: Opportunity Scoring Dashboard

**What**: Rank time slots by "opportunity score" = high demand + poor competitor turnover

**Why**: Not all busy times are equal. If a competitor is 100% booked with 4-hour sessions, that's a bigger opportunity than 100% booked with 1.5-hour sessions.

**Algorithm**:
```
Opportunity Score = Competitor Popularity × (Competitor Session Duration / PCC Session Duration)

Example Thursday 7pm:
SPF: 100 popularity × (2.5 hrs / 2.0 hrs) = 125 opportunity score
Grant Park: 75 popularity × (3.0 hrs / 2.0 hrs) = 112 opportunity score
Union Park: 84 popularity × (4.0 hrs / 2.0 hrs) = 168 opportunity score ← HIGHEST
```

**Acceptance Criteria**:
- Calculate opportunity score for all 168 hours/week (7 days × 24 hours)
- Display top 10 opportunities in ranked table
- Show: Day, Hour, Competitor, Popularity, Session Duration, Opportunity Score
- Include estimated revenue impact if PCC captures 20% of that demand

**Success Metric**: Christy identifies top 5 opportunities and takes action on 2-3 within 30 days

---

### Feature 4: Session Length Scenario Modeler

**What**: Interactive tool to model revenue impact of different booking block sizes

**Why**: Christy needs to answer "What if we offered 1.5-hour blocks during peak times instead of 2 hours?"

**Interface**:
```
┌─────────────────────────────────────────────────────┐
│ Scenario Modeler                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Current Setup:                                      │
│   Session Length: 2.0 hours                        │
│   Operating Hours: 13 hours/day (8am-9pm)          │
│   Courts: 7                                        │
│   → Sessions per court/day: 6.5                    │
│   → Total sessions/day: 45.5                       │
│   → Monthly capacity: 1,365 sessions               │
│                                                     │
│ Test Scenario:                                      │
│   Session Length: [1.5 ▼] hours   ← ADJUSTABLE     │
│   → Sessions per court/day: 8.67                   │
│   → Total sessions/day: 60.7                       │
│   → Monthly capacity: 1,820 sessions               │
│                                                     │
│ IMPACT: +455 sessions/month (+33%)                 │
│         = $11,375/month @ $25/session              │
│         = $136,500/year additional revenue         │
│                                                     │
│ ⚠️  Risk: Shorter sessions may reduce satisfaction │
│ ✅  Opportunity: Fits more sessions during peak    │
└─────────────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- Allow session length adjustment (0.5 hour increments)
- Auto-calculate sessions/day, monthly capacity
- Show revenue impact at configurable price points ($20, $25, $30)
- Include "member satisfaction risk" warning for <2 hour sessions
- Save scenarios for comparison

**Success Metric**: Christy tests 3-5 scenarios and makes data-driven booking structure decision

---

## Non-Goals (Out of Scope for V1)

1. **Real-time booking system integration** - V1 uses static popular times data, not live PCC bookings
2. **Dynamic pricing automation** - V1 provides data for pricing decisions, doesn't auto-adjust prices
3. **Customer satisfaction surveys** - V1 assumes session length preferences, doesn't validate with members
4. **Multi-location expansion** - V1 focuses on PCC's single Chicago location
5. **Competitor social media monitoring** - V1 uses Google Maps data only
6. **Waitlist management** - Future phase

---

## Success Metrics

### Sprint 1-2 Metrics (Development Phase)

- **Data Completeness**: `time_spent` data available for 6/6 competitors (100%)
- **Calculation Accuracy**: Turnover calculations match manual spreadsheet (100% accuracy)
- **Dashboard Performance**: Load time <2 seconds for all visualizations
- **User Testing**: Christy completes 3 scenario analyses in <5 minutes each

### Post-Launch Metrics (Business Impact)

**Primary KPIs** (6 months post-launch):
- **Revenue Increase**: +$50-80k annual revenue from optimized booking structure
- **Session Density**: +15-25% sessions per court per day vs. Q1 2026 baseline
- **Market Share**: Capture 10-15% of competitor overflow during identified opportunities
- **Decision Speed**: Operational decisions made 50% faster (with data vs. without)

**Secondary KPIs**:
- **Dashboard Usage**: Christy reviews dashboard 2-3x/week
- **Scenario Tests**: 10+ scenarios tested in first 3 months
- **Competitor Benchmarking**: 100% awareness of competitor session durations
- **Data-Driven Changes**: 3-5 operational changes directly attributed to insights

---

## Assumptions & Risks

### Assumptions

1. **`time_spent` data accuracy** - Google Maps data reflects actual average session duration (±15 min margin of error acceptable)
2. **Competitor consistency** - Competitors don't drastically change booking structures during analysis period
3. **PCC member flexibility** - Members will adapt to optimized booking blocks (1.5-2.5 hour range)
4. **Revenue calculation** - $25/session average holds for increased capacity
5. **Operating hours stable** - PCC maintains 8am-9pm hours (no expansion/contraction)

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **`time_spent` data unavailable** | Low (75% coverage observed) | High (core feature relies on it) | Manual estimation for missing data; survey competitor members |
| **Session length doesn't correlate with turnover** | Medium | Medium | Validate with 2-week A/B test before full rollout |
| **Members resist shorter blocks** | Medium | High | Offer both 1.5hr and 2hr options; monitor satisfaction |
| **Competitors change pricing** | Medium | Low | Monitor monthly; dashboard alerts on major shifts |
| **Revenue model overly optimistic** | Medium | Medium | Use conservative $20/session estimate; test assumptions |

---

## Dependencies

### Data Dependencies

1. **Popular Times Data Pipeline** - Existing Python scripts fetching Google Maps data weekly
2. **Competitor Facility List** - 6 competitors tracked: SPF, Big City Pickle, Pickle Haus, Grant Park, Horner Park, Union Park
3. **Operating Hours Data** - Manual collection of competitor hours (one-time setup)
4. **Pricing Data** - PCC's current $25/session average (from booking system)

### Technical Dependencies

1. **Existing Dashboard Codebase** - Vanilla JS + D3.js + Leaflet (from v1.0)
2. **Data Storage** - JSON files for static popular times data
3. **Hosting** - Vercel or GitHub Pages for static site
4. **Browser Support** - Chrome 90+, Safari 14+, Firefox 88+

### Business Dependencies

1. **Christy's Availability** - 2-3 hours/week for testing and feedback
2. **Booking System Access** - Future integration requires API access (Phase 2)
3. **Member Communication** - If booking structure changes, requires 2-week notice

---

## Roadmap

### Phase 1: Foundation (Sprints 1-2, Weeks 1-6)

**Sprint 1: Session Duration Analysis** (Weeks 1-3)
- Feature 1: Session Duration Benchmarking
- Feature 2: Court Turnover Calculator
- **Deliverable**: Static dashboard showing competitor session durations + turnover rates

**Sprint 2: Opportunity Identification** (Weeks 4-6)
- Feature 3: Opportunity Scoring Dashboard
- Basic filtering (by day of week, by competitor)
- **Deliverable**: Ranked opportunity list + top 10 time slots

### Phase 2: Scenario Modeling (Sprint 3, Weeks 7-10)

**Sprint 3: What-If Analysis**
- Feature 4: Session Length Scenario Modeler
- Save/compare scenarios
- Export insights to PDF/CSV
- **Deliverable**: Interactive scenario modeling tool

### Phase 3: Automation & Integration (Future, Q3 2026)

- Real-time PCC booking data integration
- Automated weekly insights emails
- Dynamic pricing recommendations
- Competitor change alerts

---

## Appendix: Technical Details

### Data Format: `time_spent`

From Google Maps API via `populartimes` library:

```json
{
  "name": "SPF Chicago",
  "time_spent": [150, 150],  // [min_minutes, max_minutes] in minutes
  "populartimes": [...]
}
```

**Interpretation**:
- `[150, 150]` = 2.5 hours (single value, min = max)
- `[120, 180]` = 2-3 hours (range)
- `null` = No data available (25% of facilities)

### Calculation: Sessions Per Day

```python
def calculate_sessions_per_day(operating_hours, session_duration_hours):
    """
    Calculate maximum sessions per court per day.

    Args:
        operating_hours: Total hours facility is open (e.g., 13 for 8am-9pm)
        session_duration_hours: Average session length (e.g., 2.5)

    Returns:
        Float: Sessions per day per court
    """
    return operating_hours / session_duration_hours

# Example:
pcc_sessions = calculate_sessions_per_day(13, 2.0)  # 6.5 sessions/day
spf_sessions = calculate_sessions_per_day(16, 2.5)  # 6.4 sessions/day
```

### Calculation: Opportunity Score

```python
def calculate_opportunity_score(competitor_popularity,
                                competitor_session_hours,
                                pcc_session_hours):
    """
    Higher score = better opportunity to gain market share.

    Logic: If competitor is busy (high popularity) but has long sessions
    (poor turnover), PCC can offer shorter blocks and capture overflow.
    """
    return competitor_popularity * (competitor_session_hours / pcc_session_hours)

# Example Thursday 7pm:
union_park_score = calculate_opportunity_score(84, 4.0, 2.0)  # 168
spf_score = calculate_opportunity_score(100, 2.5, 2.0)        # 125
grant_park_score = calculate_opportunity_score(75, 3.0, 2.0)  # 112
```

---

**End of PRD**

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-20 | Peter Giordano | Initial draft based on popular times strategic use cases |
