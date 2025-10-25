# Product Requirements Document: Customer Intelligence Center

**Product Name**: PCC Yield Optimizer - Customer Intelligence Center
**Version**: 2.0
**Status**: Approved for Development
**Owner**: Peter Giordano
**Development Approach**: Phased Rollout (3 Priorities)
**Target Release**: Phase 1 - Q1 2026
**Last Updated**: October 8, 2025

---

## Document Organization

This PRD is part of a 5-document specification suite. Read in this order:

1. **PRD** (this document) - Product vision, business goals, user needs
2. **[Functional Spec](./FUNCTIONAL_SPEC_Customer_Intelligence.md)** - What the system should do (functional requirements)
3. **[Technical Spec](./TECHNICAL_SPEC_Customer_Intelligence.md)** - How to build it (technical architecture)
4. **[Design Spec](./DESIGN_SPEC_Customer_Intelligence.md)** - UI/UX specifications (design system)
5. **[Epics & Sprints](./EPICS_AND_SPRINTS.md)** - Developer work breakdown (user stories, tasks, sprint planning)

---

## Executive Summary

The PCC Yield Optimizer currently answers **WHERE** market opportunities exist through competitive intelligence (competitor utilization, geographic gaps). The Customer Intelligence Center adds the missing layer: **WHO** are PCC's customers and **WHY** do they choose PCC.

### The Core Problem

Today, PCC makes critical business decisions with incomplete information:

> **Scenario**: "Company X wants Thursday 7pm for a $500 corporate event"
>
> **Current Answer**: "It displaces 12 member reservations"
> **Missing Context**: WHO are those 12 members? What's their lifetime value? Does Company X employ any current members? What's the churn risk?

> **Scenario**: "Should we invest $40k in mezzanine strength training?"
>
> **Current Answer**: "Market research shows demand for fitness amenities"
> **Missing Context**: Do OUR members want this? Which segments? Will it reduce churn?

> **Scenario**: "Run Instagram ads targeting 25-35 year-olds in Chicago"
>
> **Current Answer**: "Broad demographic assumption"
> **Missing Context**: Where do our BEST customers live? What companies employ them? What psychographic profiles convert best?

### The Solution

A **Customer Intelligence Center** that transforms raw customer data into actionable insights about:

1. **WHO**: Customer segmentation (Corporate Power Users, Social Ambassadors, Competitive Athletes, Wellness Explorers, Casual Drop-ins)
2. **WHERE**: Geographic distribution (neighborhood clustering, trade area analysis)
3. **WHY**: Behavioral patterns (booking frequency, amenity preferences, social connections)
4. **WORTH**: Lifetime value calculation (segment-specific CLV, churn cost estimation)

### Expected Business Impact

**Phase 1 (Weeks 1-6): Customer Intelligence Foundation**
- **$10-20k potential revenue**: Corporate event targeting from connector member list
- **15-20% marketing efficiency gain**: Neighborhood targeting vs. broad spray-and-pray
- **Trade area clarity**: Understand demographic gaps and opportunities

**Phase 2 (Weeks 7-10): Best Practice Research**
- **Programming idea library**: Copy proven concepts from top 50 national clubs
- **Fill underutilized slots**: Target programming to missing customer segments
- **Reduced guesswork**: Data-driven event planning

**Phase 3 (Weeks 11-16): Yield Management Foundation**
- **$30-50k annual revenue increase**: Dynamic pricing optimization
- **10% churn reduction**: Proactive capacity management
- **Data-driven corporate event decisions**: Accept/decline framework with ROI analysis

**Total Annual Impact**: $100-150k revenue increase + strategic decision-making capability

---

## Product Vision & Strategic Goals

### Vision Statement

> **"Know every customer as an individual, not just a membership number. Use data to deliver personalized experiences that maximize lifetime value while building community trust."**

### Strategic Positioning

The Customer Intelligence Center completes PCC's competitive intelligence platform:

| **Competitive Intelligence** (Current) | **Customer Intelligence** (This PRD) | **Yield Management** (Future Phase 3) |
|---|---|---|
| WHERE are market opportunities? | WHO are our customers? | HOW do we optimize allocation? |
| Competitor utilization patterns | Customer segmentation | Dynamic pricing |
| Geographic competitive gaps | Lifetime value analysis | Capacity planning |
| → Informs marketing campaigns | → Informs targeting strategy | → Informs resource allocation |

### Product Goals

#### Primary Goals (Phase 1)

1. **Understand Customer Composition** - Create 4-segment classification model with clear characteristics
2. **Identify Corporate Connectors** - Generate actionable lead list (top 20 members) for corporate event outreach
3. **Visualize Trade Area** - Map demographic characteristics (income, education, density) to understand market positioning
4. **Enable Customer Exploration** - Build interactive dashboard for customer data exploration

#### Secondary Goals (Phase 1)

1. Establish data collection processes (surveys, manual enrichment)
2. Prove value with quick wins (corporate leads, neighborhood insights)
3. Build foundation for future automation (Phase 2+)
4. Create feedback loops (measure campaign effectiveness)

#### Long-Term Vision (Phase 2-3)

1. Automated enrichment pipeline (Clearbit, People Data Labs APIs)
2. Predictive churn modeling (75%+ accuracy)
3. Integration with yield management (event decision tool, segment-based allocation)
4. Personalized marketing automation (segment-specific campaigns)

---

## User Personas

### Persona 1: Christy (Business Owner / Operator)

**Role**: Co-owner, responsible for revenue, member satisfaction, strategic decisions

**Background**:
- First-time pickleball club operator
- Strong real estate background, less experience with data-driven operations
- Manages 350 members across 7 courts
- Makes decisions on: pricing, corporate events, marketing spend, capital investments

**Daily Workflow**:
- Reviews booking calendar (morning)
- Handles corporate event inquiries (ad-hoc)
- Monitors member satisfaction (informal conversations)
- Plans marketing campaigns (monthly)
- Makes capital investment decisions (quarterly)

**Pain Points**:
- **"I don't know who my best customers are"** - Can't target marketing effectively
- **"Corporate event decisions are gut feel"** - No data on member displacement cost
- **"I don't know if $40k mezzanine investment will work"** - Can't validate demand
- **"Marketing is spray-and-pray"** - No neighborhood or demographic targeting

**Goals**:
- Increase revenue 20% without harming member satisfaction
- Grow from 350 to 400 members sustainably
- Build competitive moat (differentiate from SPF, Big City Pickle)
- Make data-driven decisions instead of guessing

**Success Criteria**:
- Uses Customer Intelligence dashboard 2x/week for decisions
- Corporate event lead list generates 1+ booking within 4 weeks
- Can answer "Who are our customers?" with confidence
- Marketing campaigns target specific neighborhoods/segments

**Technology Comfort**: Medium - uses Google Sheets, Instagram, booking software

**Quotes** (from transcript):
- *"Who do we attract today and who don't we attract? And should we?"*
- *"What percent of our people are pickleball-obsessed vs. socially oriented?"*
- *"If we don't attract stay-at-home moms, is that because they all go to Midtown?"*

---

### Persona 2: Peter (Analyst / Dashboard Builder)

**Role**: Business partner, data analyst, technical implementer

**Background**:
- Software engineering background
- Building PCC Yield Optimizer dashboard
- Translates business questions into data solutions
- Manages integrations with third-party data sources

**Daily Workflow**:
- Build/maintain dashboard features (development)
- Analyze data patterns and create insights (weekly)
- Integrate new data sources (monthly)
- Present findings to Christy (biweekly)

**Pain Points**:
- **"I don't have PCC's actual member data yet"** - Building with mock/competitor data only
- **"Hard to prove value without real results"** - Need quick wins to build trust
- **"Bridget worries about overwhelming Christy"** - Must balance comprehensiveness with simplicity

**Goals**:
- Build actionable tools, not just pretty visualizations
- Start simple, prove value, then add complexity
- Create self-service dashboard (reduce manual analysis requests)
- Demonstrate ROI of data-driven approach

**Success Criteria**:
- Christy adopts tools without extensive training
- Dashboards answer business questions in <5 minutes
- Data accuracy 95%+ (validated against manual checks)
- System runs reliably without constant maintenance

**Technology Comfort**: Expert - full-stack developer

**Quotes** (from transcript):
- *"Part of what you're saying is what if we looked across the US and looked at the top 100 events?"*
- *"We need to create a taxonomy that you can bucket these things into"*

---

### Persona 3: Front Desk Staff (Operator)

**Role**: Handle bookings, member inquiries, day-to-day operations

**Background**:
- Customer service focused
- First point of contact for members and corporate inquiries
- Uses booking system daily
- Limited time for analysis (focused on operations)

**Daily Workflow**:
- Check-in members (throughout day)
- Process drop-in bookings (real-time)
- Handle corporate event inquiries (ad-hoc)
- Answer member questions about availability, events

**Pain Points**:
- **"Corporate client wants Thursday 7pm but I don't know the policy"**
- **"Member frustrated they can't book prime time - what do I tell them?"**
- **"Which members should I invite to the corporate night event?"**

**Goals**:
- Quick answers to member/corporate inquiries
- Clear guidelines for decision-making
- Reduce escalations to Christy/ownership

**Success Criteria**:
- Can identify corporate connector members in <1 minute
- Has script for handling booking conflicts
- Knows which members to target for specific events

**Technology Comfort**: Medium - uses booking software, email, basic tools

**Use Cases** (from Customer Intelligence):
- Look up if member is a "Corporate Connector" for event invites
- Check member segment before making service decisions
- Export lists for email campaigns

---

## Problem Statements & Strategic Context

### Problem 1: The "Who" Blindspot

**Current State**: PCC knows aggregate member count (350) and some anecdotal patterns ("lots of competitive players"), but lacks systematic customer intelligence.

**Evidence from Transcript**:
- Bridget: *"I want to understand... who do we have and what should we be doing with the people we have?"*
- Bridget: *"Are most of the people that go there pickleball-obsessed? Or more socially oriented?"*
- Bridget: *"How many people are more socially oriented and they're just going to hang out?"*

**Impact**:
- **Marketing inefficiency**: $5-10k wasted annually on broad targeting
- **Missed corporate opportunities**: $30-50k potential revenue from connector members
- **Capital misallocation**: Risk $40k on mezzanine without validating member demand
- **Generic positioning**: Can't differentiate from SPF ("we serve everyone" is not a strategy)

**Root Cause**: No customer segmentation model, no enrichment data (employer, location), no systematic surveys

---

### Problem 2: The "Why" Gap

**Current State**: PCC doesn't know WHY members choose them vs. SPF, Big City Pickle, or public courts.

**Evidence from Transcript**:
- Bridget: *"Someone called it 'playertainment'... people want to play and then hang out"*
- Bridget: *"That guy Randall... went to the place in the city because it was fun, and it was like a fun Friday night event"*
- Christy: *"Quinn to put together a high school league... why? Is that because it's good recurring revenue?"*

**Questions We Can't Answer**:
- Do members value community/social (→ invest in lounge, events) or competition/training (→ invest in strength training, coaching)?
- Does proximity matter most (→ target nearby neighborhoods) or programming (→ invest in unique events)?
- Are members willing to pay premium for amenities (→ raise prices) or is it price-sensitive crowd (→ compete on value)?

**Impact**:
- **Wrong amenity investments**: Risk $25-40k on yoga studio if members actually want strength training
- **Ineffective programming**: Run events that don't resonate with member motivations
- **Misaligned positioning**: Market as "elite training facility" when members want "social clubhouse"

**Root Cause**: No structured feedback mechanism (surveys, satisfaction scores, exit interviews)

---

### Problem 3: The Trade Area Mystery

**Current State**: PCC doesn't know their catchment area demographics or if they're capturing the right customer segments.

**Evidence from Transcript**:
- Bridget: *"Based on our trade area, should we have a bunch of stay-at-home moms?"*
- Bridget: *"Should we have a bunch of corporate people, based on our trade area?"*
- Bridget: *"If every stay-at-home mom belongs to Midtown, and we're just never gonna get those people, then maybe we're like, fine, we're not gonna get those people"*

**Questions We Can't Answer**:
- What demographics surround PCC's location? (income, age, family status, employment)
- Are nearby residents/workers currently members? Or going to competitors?
- Which neighborhoods should marketing target? (highest member density vs. untapped opportunity)
- Does location explain segment mix? (e.g., no families because it's industrial area)

**Impact**:
- **Marketing waste**: Advertise in wrong neighborhoods ($5-10k annual inefficiency)
- **Unrealistic expectations**: Target customer segments that don't exist in trade area
- **Missed pockets**: Overlook high-density residential areas with no current members

**Root Cause**: No geographic analysis of member locations vs. Census demographics

---

### Strategic Context: The Conversation That Sparked This

**Key Insight from Transcript** (Bridget):

> *"I am trying to figure out who's already figured out something and copy it. And I'm also trying to figure out who do we have and what should we be doing with the people we have and who don't we have? But we should, based on our trade area."*

This reveals three strategic priorities:

1. **Understand Current Customers** → Customer Intelligence Phase 1
2. **Learn from the Best** → Best Practice Research (Future Phase 2)
3. **Identify Market Gaps** → Demographics Overlay (Phase 1) + Competitive Intelligence (existing)

**Decision Framework**: Start with #1 (understand WHO we have) because it informs everything else.

---

## Features & Functionality

### Organization by Priority

Features are organized into **3 priority tiers** based on:
1. **Business value** (revenue impact, strategic importance)
2. **Implementation effort** (time, complexity, dependencies)
3. **User feedback** (Bridget's priorities from transcript)

---

## PRIORITY 1: Customer Intelligence Foundation (Weeks 1-6)

**Goal**: Answer "Who are our customers?" with actionable customer segments and corporate lead list

**Business Value**: $10-20k corporate event revenue + marketing efficiency

---

### Feature 1.1: Customer Profiling & Segmentation

**Description**: Create 4-segment classification model using **6-Dimensional Profile Framework** with multi-source confidence scoring (booking behavior, JTBD survey responses, demographic data)

**User Story**:
> As Christy, I want to see what % of my members are "Corporate Power Users" vs. "Social Ambassadors" vs. "Competitive Athletes" vs. "Casual Drop-ins" with **confidence scores** (e.g., "87% confident this member is Corporate Power User") so that I can target marketing and programming appropriately.

**Segments** (based on existing PRD_Customer_Intelligence.md):

| Segment | Defining Characteristics | % of Base (Est.) | CLV | Strategic Value |
|---------|------------------------|------------------|-----|----------------|
| **Corporate Power Users** | Works nearby (West Loop/River North), books 3+ times/week, brings colleagues, high amenity spend | 20-25% | $3,500-4,000 | **Very High** - corporate event referrals, high revenue |
| **Social Ambassadors** | High dwell time (2+ hours), rotates partners, attends events, posts on social media | 15-20% | $2,000-2,500 | **High** - referrals, brand advocacy |
| **Competitive Athletes** | Books off-peak, same training partners, buys premium gear, tournament participation | 25-30% | $2,200-2,500 | **Medium** - stable revenue, specific needs |
| **Casual Drop-ins** | Infrequent (<1x/week), price-sensitive, no social ties | 30-40% | $150-300 | **Low** - fills capacity, low retention |

**Profiling Framework (6 Dimensions)**:

*(See [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md) for detailed mapping)*

| Dimension | Data Sources (Phase 1) | Example Attributes |
|-----------|------------------------|-------------------|
| **Needs (JTBD)** | Survey (9 questions mapping to JTBD elements) | Struggling moments, desired outcomes, hiring criteria |
| **Member-ographic** | Survey + Census tract lookup | Income, household size, age range, occupation |
| **Amenity-graphic** | Survey + booking system | Interest in hot desks, yoga, strength training, café |
| **Behavioral** | Booking system export | Frequency, peak vs off-peak, partner rotation, dwell time |
| **Psychographic** | Survey (motivations, values) | Convenience-driven, status-seeking, fitness-focused |
| **Engagement** | Booking system + observed | Referrals, event attendance, social media tagging |

**Implementation Approach (Phase 1 - Manual)**:

#### 1. Enhanced JTBD Survey (Google Forms/Typeform)

**9 Questions mapping to Jobs-to-Be-Done Framework**:

| Question | JTBD Element | Segment Signal |
|----------|--------------|----------------|
| "What was happening in your life when you decided to join PCC?" | **Context & Struggling Moment** | Corporate: "Moved to West Loop for new job" / Social: "New to Chicago, wanted to meet people" |
| "What problem were you trying to solve by joining a pickleball club?" | **Desired Outcome** | Corporate: "Convenient lunch workout" / Competitive: "Access to quality courts and players" |
| "What almost stopped you from joining?" | **Anxieties** | Casual: "Price" / Competitive: "Skill level uncertainty" |
| "What finally convinced you to sign up?" | **Hiring Criteria** | Social: "Friend recommended" / Corporate: "Walking distance from office" |
| "Why PCC instead of SPF or Big City Pickle?" | **Competitive Alternative** | All segments value different trade-offs (location, amenities, vibe) |
| "How do you typically use PCC?" (fitness / social / competitive / convenience) | **Primary Use Case** | Maps directly to segment archetypes |
| "What amenities interest you most?" (hot desks / yoga / strength / café / events) | **Amenity-graphic** | Corporate: Hot desks / Social: Events / Competitive: Strength training |
| "Does your company do team-building events?" (yes / maybe / no) | **Corporate Intent Signal** | Corporate Power User indicator |
| "Employer, job title, work location?" (optional) | **Member-ographic** | Corporate connector identification (see Feature 1.2) |

**Survey Design Note**: Questions use JTBD "struggling moment" language to reveal **why members hire PCC**, not just demographics. Example: Instead of "How often do you play?" (behavioral), ask "What were you trying to achieve when you joined?" (motivational).

#### 2. Multi-Source Segmentation with Confidence Scoring (Google Sheets)

**Data Collection**:
- **Source 1**: Export member list from booking system (booking frequency, peak/off-peak ratio, partner count)
- **Source 2**: Survey responses (30+ responses from 50 VIP members)
- **Source 3**: Census tract demographics (lookup by home zip code)
- **Source 4**: Observed behavior (anecdotal from Christy/staff - event attendance, referrals)

**Confidence Scoring Algorithm (Phase 1 - Manual)**:

For each of 50 VIP members, calculate segment confidence (0-100%):

```
Confidence Score = (Data Sources Available / 4) × Match Strength

Data Sources (Phase 1):
1. Booking Behavior (40% weight) - REQUIRED
2. Survey Response (30% weight) - if available
3. Demographics (10% weight) - if zip code known
4. Observed Behavior (20% weight) - if Christy has notes

Match Strength:
- Strong Match (100%): 3+ segment characteristics present
- Moderate Match (70%): 2 characteristics present
- Weak Match (40%): 1 characteristic present
```

**Example Classification**:
- **Member**: Sarah Johnson
- **Segment**: Corporate Power User
- **Confidence**: 87%
  - ✅ Booking Behavior (40%): Books 4x/week, mostly lunch hours (100% match × 40% = 40%)
  - ✅ Survey Response (30%): Works at Salesforce, interested in hot desks (100% match × 30% = 30%)
  - ✅ Demographics (10%): Lives in West Loop (median income $120k) (70% match × 10% = 7%)
  - ✅ Observed (20%): Brought 2 colleagues last month (50% match × 20% = 10%)
  - **Total**: 40 + 30 + 7 + 10 = 87%

**Segment Assignment Template (Google Sheets)**:

| Member ID | Name | Segment | Confidence | Booking Freq | Survey? | Census Tract | Notes |
|-----------|------|---------|------------|--------------|---------|--------------|-------|
| M00123 | Sarah Johnson | Corporate Power User | 87% | 4.2x/week | ✅ | 17031081400 | Brought colleagues |
| M00456 | Mike Chen | Competitive Athlete | 72% | 3.1x/week | ✅ | — | No survey, strong booking pattern |
| M00789 | Emily Davis | Social Ambassador | 65% | 1.8x/week | ❌ | 17031839100 | No survey, anecdotal only |

#### 3. Segment Profile Cards (Enhanced)

For each segment, document:
- **Member count** and **confidence distribution** (e.g., "12 members, avg 78% confidence")
- **JTBD Archetype**: Common struggling moments, desired outcomes
- **Average booking frequency** and **peak/off-peak ratio**
- **Top amenities** used (current + survey interest)
- **Geographic concentration** (neighborhoods, census tracts)
- **Example personas** (3 members with highest confidence)

**Acceptance Criteria**:
- ✅ Survey sent to 50 members, 30+ responses (60% rate)
- ✅ 50 members classified into 4 segments **with confidence scores**
- ✅ **Average confidence ≥ 70%** (indicates data quality)
- ✅ Segment profile cards created (1 page per segment) with JTBD archetypes
- ✅ Christy can explain each segment to team **and confidence methodology**

**Success Metrics**:
- Survey response rate 60%+
- **Average segment confidence 70%+** (target: 75%+)
- Segment distribution feels accurate to Christy (validation check)
- At least 3 distinct JTBD characteristics identified per segment

**Future Enhancement (Phase 2+)**:
- Automated confidence scoring across full 350-member base
- Social signal enrichment (Feature 2.4) boosts confidence +15%
- LinkedIn data (Feature 2.5) adds firmographic validation
- Contradiction detection flags survey/behavior mismatches

---

### Feature 1.2: Corporate Connector Identification

**Description**: Generate actionable list of top 20 members most likely to refer corporate events

**User Story**:
> As Christy, I want a list of members who work at companies with 100+ employees in nearby offices so that I can target corporate event outreach.

**Identification Criteria**:
1. Works at company with 100+ employees (from survey or LinkedIn)
2. Job title includes: "VP," "Director," "Manager," "Chief," "Head of"
3. Work location within 3 miles of PCC (West Loop, River North, The Loop)
4. Booking frequency 2+ times/week (engaged member)
5. Has brought colleagues before (if observable)

**Deliverable**: Google Sheet with columns:
- Member name
- Employer
- Job title
- Work address (for proximity check)
- Booking frequency (times/week)
- Colleagues at PCC (count, if known)
- Outreach status (not contacted / emailed / booked / declined)

**Outreach Template** (included):
```
Subject: [Member Name] - Does [Company] do team-building events?

Hi [Name],

We noticed you're at [Company] and a regular at PCC. We're expanding our corporate event offerings and thought [Company] might be interested in team-building pickleball nights.

Would you be open to a quick chat about whether this could be a fit?

Thanks,
Christy
```

**Acceptance Criteria**:
- ✅ List contains 20+ corporate connector candidates
- ✅ Each row has employer + title (from survey or LinkedIn)
- ✅ Outreach template created and reviewed
- ✅ Christy sends first outreach batch within 1 week

**Success Metrics**:
- At least 1 corporate event lead generated within 4 weeks
- $500-2,000 revenue from corporate event bookings

**ROI Calculation**:
- Time investment: 8 hours (survey + manual LinkedIn research + list creation)
- Expected return: $10-20k annual if 20% conversion (4 companies × $500/event × 10 events/year)
- ROI: 125-250x

---

### Feature 1.3: Demographics Overlay on Map (Enhanced)

**Description**: Add Census tract demographic data **and competitor proximity analysis** as choropleth overlay on existing Geographic Map view to identify high-value member neighborhoods and churn risk zones

**User Story**:
> As Christy, I want to see median income, education level, age distribution, household composition, and **competitor proximity** on the map so that I can understand what demographics surround PCC vs. competitors **and identify members at risk of switching to SPF or Big City Pickle**.

**Rationale** *(from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md))*:
- **Member-ographic precision**: Census demographics provide proxy indicators for segment classification (Corporate Power Users cluster in high-income, high-education tracts)
- **Churn risk identification**: Members living closer to competitors have higher switch risk (esp. if PCC is full at peak times)
- **Marketing targeting**: Identify high-potential neighborhoods for acquisition campaigns

**Data Sources**:

#### 1. U.S. Census Bureau American Community Survey (ACS) - 5-Year Estimates

| Variable | ACS Table Code | Purpose | Segment Signal |
|----------|---------------|---------|----------------|
| **Median Household Income** | B19013 | Proxy for willingness to pay | Corporate Power Users: $80k+ / Social Ambassadors: $60k+ |
| **Educational Attainment** | B15003 | Proxy for corporate job holders | Corporate: 70%+ bachelor's / Competitive: 50%+ bachelor's |
| **Age Distribution** | B01001 | Target demographic (25-45 years) | All segments: Peak age 28-42 years |
| **Household Composition** | B11001, B11005 | Family vs. single, presence of children | Social: Singles + young families / Casual: Families with kids |
| **Household Size** | B25010 | 1-person, 2-person, 3-4, 5+ | Corporate: 1-2 person / Social: 2-3 person |
| **Population Density** | B01003 / Land Area | Urbanization level | All segments prefer dense urban areas (8k+ /sq mi) |

#### 2. TIGER/Line Shapefiles
- Census tract boundaries for Cook County, IL
- Convert to GeoJSON for web rendering (~800 tracts)

#### 3. Competitor Location Data (Manual Entry → Google Maps API)
- **PCC Address**: 167 N Green St, Chicago, IL 60607
- **SPF (South Park Fitness)**: 1936 S Dearborn St, Chicago, IL 60616
- **Big City Pickle**: 2217 N Elston Ave, Chicago, IL 60614

**Calculated Fields** (derived from raw data):
- **Target Age %**: (Age 25-34 + Age 35-44) / Total Population × 100
- **Distance to PCC**: Centroid of census tract → PCC (miles)
- **Distance to Nearest Competitor**: min(Distance to SPF, Distance to Big City Pickle)
- **Competitive Proximity Risk**: "At Risk" if (Distance to Competitor < Distance to PCC)

**Visualization**:

#### Primary Choropleth Layer (Census Tracts)
- **6 demographic variables** (up from 3):

| Variable | Color Scale | Value Range | Business Use Case |
|----------|-------------|-------------|-------------------|
| **Median Income** | Red → Yellow → Green | $30k - $150k | Identify high-value acquisition neighborhoods |
| **Education Level** | Red → Yellow → Blue | 0% - 80% bachelor's+ | Proxy for corporate power users |
| **Target Age %** | White → Orange | 0% - 60% (ages 25-44) | Core pickleball demographic |
| **Household Size** | Light Green → Dark Green | 1.5 - 4.5 people | Singles vs. families (segment indicator) |
| **Population Density** | White → Purple | 0 - 20k /sq mi | Urban vs. suburban preferences |
| **Children Present %** | Pink → Red | 0% - 60% (households with kids <18) | Family-oriented programming interest |

#### Secondary Layer: Competitor Proximity Heatmap
- **3-ring distance bands** from each competitor:
  - **0-1 mile**: Dark red (High churn risk if member lives here)
  - **1-2 miles**: Orange (Medium risk)
  - **2-3 miles**: Yellow (Low risk)
  - **3+ miles**: No shading (Not at risk)
- **Overlay mode**: Can toggle on/off to see which member neighborhoods are "contested zones"

**Interactive Controls**:

```
┌─────────────────────────────────────────┐
│ Map Controls                            │
├─────────────────────────────────────────┤
│ ☑ Show Demographics Overlay             │
│ ☐ Show Competitor Proximity Risk        │
│                                         │
│ Demographic Variable:                   │
│ [Median Income ▼]                       │
│   - Median Income                       │
│   - Education Level                     │
│   - Target Age % (25-44)         ← NEW  │
│   - Household Size               ← NEW  │
│   - Population Density                  │
│   - Children Present %           ← NEW  │
│                                         │
│ Legend: [Income Scale Display]          │
└─────────────────────────────────────────┘
```

**Enhanced Hover Tooltip**:

```
Census Tract: 17031081800 (West Loop)
──────────────────────────────────────
Median Income: $87,500
Education (Bachelor's+): 62%
Target Age % (25-44): 48%           ← NEW
Household Size: 2.1 people          ← NEW
Children Present: 18%               ← NEW
Population Density: 8,400 /sq mi

Proximity Analysis:                 ← NEW SECTION
──────────────────────────────────
Distance to PCC: 0.4 miles
Distance to SPF: 2.1 miles
Distance to Big City Pickle: 1.8 miles
Churn Risk: LOW ✅ (PCC is closest)

PCC Members in Tract: 12           ← NEW (if available)
  - Corporate Power Users: 8
  - Social Ambassadors: 3
  - Competitive Athletes: 1
```

**New Feature: "At-Risk Members" Widget** *(links to Feature 2.6)*

```
┌─────────────────────────────────────────┐
│ 🚨 Churn Risk Alert                     │
├─────────────────────────────────────────┤
│ 23 members live closer to competitors   │
│                                         │
│ Breakdown by Competitor:                │
│ • SPF (South Loop): 14 members          │
│ • Big City Pickle (Bucktown): 9 members │
│                                         │
│ High-Value At-Risk (CLV > $2k):         │
│ • Sarah Johnson (Corporate, SPF)        │
│ • Mike Chen (Competitive, Big City)     │
│                                         │
│ [View Full List] [Export CSV]           │
└─────────────────────────────────────────┘
```

**Acceptance Criteria**:
- ✅ Census tract data for Cook County loaded (GeoJSON format, ~800 tracts)
- ✅ **6 demographic variables** available in dropdown (up from 3)
- ✅ Choropleth renders on map with correct colors for all 6 variables
- ✅ Toggle control functional (show/hide demographics overlay)
- ✅ **Competitor proximity layer** toggles independently
- ✅ **3-ring distance bands** render correctly around PCC, SPF, Big City Pickle
- ✅ Legend displays current variable's color scale
- ✅ **Enhanced tooltips** show 6 demographic variables + proximity analysis
- ✅ **"At-Risk Members" widget** displays count of members in competitor proximity zones
- ✅ Widget links to Feature 2.6 (Competitive Overlap Analysis) for detailed analysis

**Success Metrics**:
- Christy uses overlay to compare PCC location vs. SPF location demographics
- Team identifies **2-3 high-value neighborhoods** for targeted marketing (e.g., West Loop, River North)
- Team identifies **5-10 at-risk members** living closer to competitors for retention campaigns
- **Action taken**: Personalized outreach to 3+ at-risk high-CLV members within 2 weeks

**Data Collection (Phase 1 - Manual)**:
1. **Census Data**: Download ACS 5-Year Estimates for Cook County (CSV format)
2. **TIGER Shapefiles**: Download census tract boundaries, convert to GeoJSON via QGIS or ogr2ogr
3. **Competitor Addresses**: Manually enter into `data/competitors.json`
4. **Proximity Calculation**: Python script using Haversine formula to calculate distances
5. **Member Geocoding**: Lookup member home zip codes, assign to census tracts

**Implementation Details**: See [TECHNICAL_SPEC.md](./TECHNICAL_SPEC_Customer_Intelligence.md#demographics-overlay-implementation)

**Cross-References**:
- **Feature 2.6**: Competitive Overlap Analysis (Google Maps Popular Times scraping)
- **Data Acquisition Strategy**: Member-ographic Dimension (Income, Age, Household Composition)

---

### Feature 1.4: Customer Intelligence Dashboard Tab

**Description**: Add new dashboard view with interactive customer data visualizations

**User Story**:
> As Christy, I want a dedicated "Customer Intelligence" tab where I can explore segments, neighborhoods, and corporate connectors all in one place.

**Dashboard Components**:

#### Component 1.4.1: Segment Overview (Pie Chart)
- **Visualization**: Pie chart showing member distribution across 4 segments
- **Interactivity**:
  - Click segment → filter all other views to that segment
  - Hover → show member count + % of total
- **Data Display**:
  - Corporate Power Users: 72 members (20%)
  - Social Ambassadors: 63 members (18%)
  - Competitive Athletes: 105 members (30%)
  - Casual Drop-ins: 110 members (32%)

#### Component 1.4.2: Neighborhood Heatmap
- **Visualization**: Chicago map colored by member count per zip code
- **Color Scale**:
  - Light blue: 1-5 members
  - Medium blue: 6-15 members
  - Dark blue: 16+ members
- **Interactivity**:
  - Click neighborhood → see member list
  - Filter by segment (show only "Corporate Power Users" in West Loop)
  - Export neighborhood list to CSV

#### Component 1.4.3: Corporate Connector Table
- **Columns**:
  - Member Name
  - Employer
  - Job Title
  - Work Address
  - Booking Frequency (times/week)
  - Colleagues at PCC (count)
  - Outreach Status
- **Features**:
  - Sort by any column
  - Filter by employer, title, neighborhood
  - Export to CSV for outreach campaigns
  - Mark as "Contacted" / "Booked" / "Declined"

#### Component 1.4.4: Segment Breakdown Grid
- **Table Format**:

| Segment | Member Count | Avg Booking Freq | Top 3 Neighborhoods | Avg CLV | Churn Risk |
|---------|-------------|-----------------|-------------------|---------|-----------|
| Corporate Power Users | 72 | 3.2x/week | West Loop, River North, Lincoln Park | $3,800 | Medium |
| Social Ambassadors | 63 | 1.8x/week | Lincoln Park, Lakeview, Wicker Park | $2,300 | Low |
| ... | ... | ... | ... | ... | ... |

**Layout**:
```
┌─────────────────────────────────────────────┐
│ Customer Intelligence                       │
│ ┌─────────────┐  ┌────────────────────────┐│
│ │ Segment     │  │ Neighborhood Heatmap   ││
│ │ Overview    │  │                        ││
│ │ (Pie Chart) │  │ [Chicago Map]          ││
│ └─────────────┘  └────────────────────────┘│
│                                             │
│ Corporate Connector Table                   │
│ ┌─────────────────────────────────────────┐│
│ │ [Table with sort/filter/export]         ││
│ └─────────────────────────────────────────┘│
│                                             │
│ Segment Breakdown                           │
│ ┌─────────────────────────────────────────┐│
│ │ [Grid with segment stats]               ││
│ └─────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

**Acceptance Criteria**:
- ✅ New tab "👥 Customer Intel" added to navigation
- ✅ All 4 components render with mock data (50 members)
- ✅ Clicking segment in pie chart filters other views
- ✅ Neighborhood heatmap shows member density
- ✅ Corporate connector table sortable and exportable
- ✅ Segment grid displays key metrics

**Success Metrics**:
- Christy uses dashboard 2x/week
- At least 1 export to CSV for marketing campaign
- Team can answer "Who are our customers?" in <2 minutes

**Implementation Details**: See [DESIGN_SPEC.md](./DESIGN_SPEC_Customer_Intelligence.md#customer-intelligence-dashboard) for wireframes and [TECHNICAL_SPEC.md](./TECHNICAL_SPEC_Customer_Intelligence.md#dashboard-components) for component architecture

---

## PRIORITY 2: Best Practice Research Engine (Weeks 7-10)

**Goal**: Build library of proven programming ideas from top pickleball clubs nationally

**Business Value**: Reduce guesswork, copy success, fill underutilized time slots

**Note**: This priority is NEW and not in the original PRD_Customer_Intelligence.md. It directly addresses Bridget's insight: *"I am trying to figure out who's already figured out something and copy it."*

---

### Feature 2.1: National Club Discovery

**Description**: Identify the 50 busiest pickleball clubs across major U.S. cities using Google Popular Times

**User Story**:
> As Christy, I want to know which pickleball clubs are the most popular nationally so that I can study what they're doing right.

**Methodology**:
1. **Seed List**: Start with known major clubs in 30 NFL cities
2. **Popularity Scoring**: Use Google Popular Times API to calculate:
   - Average utilization across week (0-100%)
   - Peak utilization consistency (how often they hit 90%+)
   - Weekend vs. weekday balance
3. **Filter**:
   - Min 6 courts (comparable scale to PCC)
   - Min 4.0 Google rating (quality filter)
   - Indoor facilities only (comparable to PCC)

**Deliverable**: Database (`data/national-clubs.json`) with:
```json
{
  "clubs": [
    {
      "id": "chicken-n-pickle-kc",
      "name": "Chicken N Pickle - Kansas City",
      "city": "Kansas City",
      "state": "MO",
      "courts": 10,
      "rating": 4.6,
      "avgUtilization": 82,
      "peakUtilization": 95,
      "website": "https://chickenNpickle.com",
      "instagram": "@chickennpickle",
      "rankScore": 94
    },
    ...
  ]
}
```

**Acceptance Criteria**:
- ✅ 50 clubs identified across 30 cities
- ✅ Each club has utilization data (Google Popular Times)
- ✅ Clubs sorted by "rank score" (combination of utilization + rating)
- ✅ Social media handles captured (Instagram/Facebook)

**Success Metrics**:
- List includes at least 10 clubs PCC team hadn't heard of
- Christy reviews list and marks 10-15 for deeper research

---

### Feature 2.2: Programming Intelligence Scraper

**Description**: Extract event listings from top clubs' websites/Instagram to identify successful programming patterns

**User Story**:
> As Christy, I want to see what events the busiest clubs run (beginner nights, tournaments, corporate events, youth leagues) so that I can copy proven concepts.

**Data Collection**:
1. **Web Scraping**:
   - Parse club websites for event calendars
   - Extract: event name, date/time, description, registration status
2. **Instagram Scraping**:
   - Search for hashtags: #[clubname] #pickleball
   - Extract event posts (images, captions, engagement metrics)
3. **Success Signals**:
   - "Sold out" / "Registration full" mentions
   - High engagement (likes, comments, shares)
   - Recurring events (weekly/monthly patterns)

**Event Taxonomy** (AI-powered categorization):
- **Skill Level**: Beginner, Intermediate, Advanced, All-Levels
- **Event Type**: League, Tournament, Social, Corporate, Youth, Clinic, Drop-in
- **Time Pattern**: Weekly Recurring, Monthly, One-Time, Seasonal
- **Theme**: Halloween, Holiday, Ladies Night, Men's Night, Mixer, etc.

**Deliverable**: Database (`data/programming-ideas.json`):
```json
{
  "events": [
    {
      "id": "beginner-friday-cn-pickle",
      "club": "Chicken N Pickle - Kansas City",
      "eventName": "Beginner Friday Night Social",
      "skillLevel": "Beginner",
      "eventType": "Social",
      "timePattern": "Weekly Recurring",
      "dayOfWeek": "Friday",
      "timeSlot": "7:00 PM - 9:00 PM",
      "description": "Friendly beginner-only social play. All equipment provided. Coaches on-site for tips.",
      "successSignals": ["Registration full 3 weeks in a row", "4.8/5 rating on club app"],
      "source": "https://chickennpickle.com/events"
    },
    ...
  ]
}
```

**Acceptance Criteria**:
- ✅ 100+ event examples collected from top 50 clubs
- ✅ Events categorized by skill level, type, time pattern
- ✅ Success signals identified (sold out, high engagement)
- ✅ At least 20 events are "beginner-focused" (addresses Bridget's question)

**Success Metrics**:
- Christy finds 3-5 event ideas to pilot at PCC
- Team runs 1 "copied" event within 4 weeks

---

### Feature 2.3: Programming Idea Generator (UI)

**Description**: New dashboard tab where Christy can browse, filter, and export event ideas

**User Story**:
> As Christy, I want to filter programming ideas by "Beginner" or "Corporate" or "Youth" so that I can find events that target specific customer segments I want to grow.

**UI Components**:

#### Filter Panel:
- **Skill Level**: ☐ Beginner ☐ Intermediate ☐ Advanced ☐ All-Levels
- **Event Type**: ☐ League ☐ Tournament ☐ Social ☐ Corporate ☐ Youth ☐ Clinic
- **Time**: ☐ Weekday ☐ Weekend ☐ Morning ☐ Afternoon ☐ Evening
- **Theme**: (autocomplete dropdown with all themes)

#### Event Cards:
```
┌────────────────────────────────────────┐
│ 🎾 Beginner Friday Night Social       │
│ From: Chicken N Pickle - Kansas City  │
│                                        │
│ 📅 Weekly • Friday 7-9pm              │
│ 🏆 Beginner • Social                  │
│                                        │
│ "Friendly beginner-only social play.  │
│  All equipment provided. Coaches on-  │
│  site for tips."                      │
│                                        │
│ ✅ Success Signals:                   │
│ • Registration full 3 weeks in a row  │
│ • 4.8/5 rating on club app            │
│                                        │
│ [Copy to Campaign Template]           │
└────────────────────────────────────────┘
```

#### Export Options:
- **Campaign Template**: Pre-filled template with event description, timing, marketing copy
- **CSV Export**: Filtered list for review with team
- **Print-Friendly**: PDF of top 10 ideas for offline review

**Acceptance Criteria**:
- ✅ New tab "💡 Programming Ideas" in navigation
- ✅ Filter panel functional (updates event cards in real-time)
- ✅ At least 100 event cards rendered
- ✅ "Copy to Campaign Template" generates editable template
- ✅ Export to CSV functional

**Success Metrics**:
- Christy uses idea generator before planning each month's events
- At least 2 "copied" events run within 3 months
- Event attendance 80%+ of capacity (validates idea quality)

**Implementation Details**: See [TECHNICAL_SPEC.md](./TECHNICAL_SPEC_Customer_Intelligence.md#programming-idea-generator)

---

### Feature 2.4: Social Signal Enrichment

**Description**: Enrich member profiles with public social media signals from Instagram, TikTok, and Facebook to validate segment assignment and detect aspirational identity, community engagement, and brand advocacy patterns.

**User Story**:
> As Peter, I want to cross-reference member survey responses with their public social media activity so that I can validate segment assignments with external behavioral signals and achieve 85%+ confidence in classification.

**Rationale** (from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md)):
- **Survey responses are subjective** ("I'm competitive") but social signals are objective (posts #tournamentlife hashtag)
- **Cross-validation boosts confidence**: Booking behavior (3x/week) + Survey (competitive) + Social (#tournamentready) = 92% confidence
- **Detect aspirational vs actual identity**: Member says "social" but zero Instagram posts → Likely aspirational, not actual behavior

**Data Points to Collect**:

| Signal | Source | What It Reveals | Segment Indicator |
|---|---|---|---|
| **Post Frequency** | Instagram, TikTok | Engagement level, brand advocacy | 3+ posts/month = Social Ambassador |
| **Hashtags** | Instagram, TikTok | Aspirational identity, community involvement | #tournamentready = Competitive Athlete |
| **Location Tags** | Instagram stories | PCC engagement, check-ins | Tags @pcc = Social Ambassador (brand advocate) |
| **Content Themes** | Instagram photos/videos | Values (fitness, social, competitive) | Tournament photos = Competitive Athlete |
| **Tagged Friends** | Instagram group photos | Social network size | 5+ tagged friends = Social Ambassador |
| **Pro Player Follows** | Instagram follows | Aspirational identity | Follows 3+ pros = Competitive Athlete |
| **Engagement Metrics** | Likes, comments per post | Influence, reach | High engagement = Social Ambassador |

**Collection Method**:

**Phase 2 (Manual Observation)**:
1. Search "@pcc_chicago" location tag on Instagram
2. Manually review top 20-30 most active posters
3. Record: Post frequency, hashtags used, content themes (fitness/social/competitive)
4. Document in `customer-segments.json` → `socialSignals` field

**Phase 3 (Semi-Automated)**:
1. Use Instagram Graph API for members who **opt-in** to connect
2. Incentive: "$10 credit for connecting your Instagram and tagging @pcc in a post"
3. Automated scraping of public profiles only (TOS compliant)
4. AI content classification (OpenAI Vision API): "fitness-focused," "social-focused," "competitive-focused"

**Tools/APIs**:
- Instagram Graph API (official, requires user authorization): https://developers.facebook.com/docs/instagram-api
- Apify Instagram Scraper (unofficial, public profiles only): https://apify.com/apify/instagram-scraper
- OpenAI Vision API (content theme classification): https://platform.openai.com/docs/guides/vision

**Privacy & Compliance**:
- ✅ Only scrape **public** profiles (not private accounts)
- ✅ Opt-in mechanism for Instagram connection (incentivized with credit)
- ✅ Never scrape DMs or private content
- ✅ Members can disconnect anytime ("Disconnect my Instagram" button)
- ✅ Transparent data usage: Show members which signals contribute to their segment assignment

**Confidence Boost Logic**:

```javascript
// Multi-source confidence scoring (from data-acquisition-strategy.md)
function calculateSegmentConfidence(member, segment) {
  let confidence = 0;

  // Booking Behavior: 40% weight
  confidence += member.bookingBehaviorMatch * 0.40;

  // Survey JTBD: 30% weight
  confidence += member.surveyJTBDMatch * 0.30;

  // Social Signals: 15% weight (NEW)
  if (member.socialSignals) {
    const socialMatch = analyzeSocialSignals(member.socialSignals, segment);
    confidence += socialMatch * 0.15;  // +15% confidence boost
  }

  // Demographics: 10% weight
  confidence += member.demographicMatch * 0.10;

  // LinkedIn: 5% weight
  confidence += member.linkedInMatch * 0.05;

  return confidence;
}

// Example: Sarah's confidence BEFORE social signals
// Booking (95%) * 0.40 + Survey (90%) * 0.30 + Demographics (85%) * 0.10 + LinkedIn (100%) * 0.05 = 78%

// Example: Sarah's confidence AFTER social signals
// Same as above + Social (80%) * 0.15 = 78% + 12% = 90% (boosted from "medium" to "high" confidence)
```

**Segment-Specific Social Archetypes**:

| Segment | Typical Social Behavior | Detection Signals |
|---|---|---|
| **Corporate Power Users** | Low posting (<1/month), professional profile pic, minimal pickleball content | Post frequency <1/month, professional headshot, LinkedIn link in bio |
| **Social Ambassadors** | High posting (3+/month), tags @pcc, group photos, event check-ins | Post frequency 3+/month, location tags, group photos, hashtags #pickleballfam |
| **Competitive Athletes** | Medium posting (1-2/month), tournament photos, follows pro players | Tournament photos, hashtags #tournamentready, follows 3+ pro players |
| **Casual Drop-ins** | No Instagram activity OR occasional posts with #pickleballnewbie | No posts tagging @pcc OR hashtags #beginner #newbie |

**Deliverable**: Enhanced `customer-segments.json` schema:

```json
{
  "id": "M00123",
  "name": "Sarah Johnson",
  "segment": "Corporate Power Users",
  "segmentConfidence": 90,  // Boosted from 78% with social signals
  "socialSignals": {
    "platform": "instagram",
    "handle": "@sarahjohnson",
    "postFrequency": 0.5,  // posts per month
    "locationTags": ["@pcc_chicago"],
    "hashtags": ["#pickleballlife", "#fitness"],
    "contentThemes": ["fitness", "social"],  // AI classification
    "taggedFriends": 2,
    "proPlayerFollows": 0,
    "lastScrapedAt": "2025-10-15T00:00:00Z"
  },
  "confidenceBreakdown": {
    "bookingBehavior": 95,
    "surveyJTBD": 90,
    "socialSignals": 80,  // NEW
    "demographics": 85,
    "linkedInFirmographic": 100
  }
}
```

**Acceptance Criteria**:
- ✅ 30+ members have social signals collected (60% of 50-member Phase 1 sample)
- ✅ Hashtag corpus analyzed (500+ unique hashtags categorized into themes)
- ✅ Content AI classification 85%+ accuracy (validated against manual review)
- ✅ Segment confidence boosted by 10-15% for members with social data
- ✅ Privacy policy updated with social media data usage disclosure
- ✅ Opt-in mechanism functional ($10 credit reward)

**Success Metrics**:
- 30 members opt-in to connect Instagram (60% of Phase 1 sample)
- Average confidence boost: +12% for members with social signals
- Contradiction detection: 10-15% of members show conflicting signals (survey vs social)
- Brand advocacy identified: 10+ "Social Ambassadors" posting 3+ times/month

**Expected Business Impact**:
- **Higher confidence in targeting**: 90%+ confidence segments enable precise marketing
- **Brand advocate identification**: Discover 10-15 members posting regularly → Referral bonuses, UGC campaigns
- **Contradiction flagging**: Detect members with misaligned survey/behavior → Manual review, re-classification

**Cross-Reference**: See [Data Acquisition Strategy §1.1](../../methodology/data-acquisition-strategy.md#11-jtbd-signals-from-social-media) for full JTBD-to-social-signal mapping

---

### Feature 2.5: LinkedIn & Employer Intelligence

**Description**: Enrich corporate connector profiles with LinkedIn data (employer, job title, work location) and detect intent signals (job changes, promotions) to prioritize outreach and track corporate event potential.

**User Story**:
> As Christy, I want to know when a high-value member gets promoted to VP or changes to a nearby employer so that I can reach out with timely corporate event offers while their influence and budget authority are highest.

**Rationale** (from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md)):
- **Job title = authority proxy**: VP/Director can approve corporate events, ICs cannot
- **Company size = budget proxy**: 500+ employees = bigger budgets, <50 = tight budgets
- **Proximity = convenience driver**: Work <1 mile from PCC = perfect for lunch leagues, after-work events
- **Intent signals = timing**: Recent promotion = new budget cycle, new authority

**Data Points to Collect**:

| Data Point | What It Reveals | Collection Method | Use Case |
|---|---|---|---|
| **Current Employer** | Company affiliation, size | LinkedIn public profile, survey | Corporate event outreach targeting |
| **Job Title** | Decision authority level (C-Suite, VP, Director, Manager, IC) | LinkedIn, survey | ICP score calculation (VP = 8 points) |
| **Work Location** | Proximity to PCC (commute analysis) | LinkedIn profile, Google Maps geocoding | <1 mile = prime corporate connector |
| **Company Size** | Budget capacity | LinkedIn company page, manual research | 500+ employees = 10 points in ICP score |
| **Job Change Events** | Intent signal (new authority, new employer nearby) | LinkedIn profile monitoring (quarterly) | "Sarah promoted to VP → Send corporate offer" |
| **Company Industry** | Fit for pickleball culture | LinkedIn company page | Tech/consulting = higher fit |
| **Connections** | Network effect (colleagues at PCC) | LinkedIn mutual connections | "3 colleagues at PCC = 5x referral potential" |

**Collection Method**:

**Phase 1 (Manual Lookup)**:
1. Survey asks: "Employer, job title, work address (optional)"
2. For top 20 corporate connectors, manually search LinkedIn
3. Record: Employer, job title, work address, company size
4. Geocode work address → Calculate distance to PCC (Google Maps API)

**Phase 2 (Semi-Automated)**:
1. LinkedIn Sales Navigator (paid tool, $99/month): https://business.linkedin.com/sales-solutions/sales-navigator
2. Batch lookup: Upload member names, auto-enrich employer/title
3. Quarterly refresh: Detect job changes (promotion, new employer)
4. Automated alerts: "Sarah Johnson promoted to VP at TechCorp" → Email Christy

**Phase 3 (API Alternative)**:
1. People Data Labs API (third-party enrichment, $0.25/lookup): https://www.peopledatalabs.com/
2. Input: Member name + email
3. Output: Current employer, job title, company size, work location
4. Privacy note: Uses public data only, GDPR/CCPA compliant

**Tools/APIs**:
- LinkedIn (manual search, free)
- LinkedIn Sales Navigator (paid, $99/month)
- People Data Labs API (paid, $0.25/lookup)
- Google Maps Geocoding API (free tier: 28,500 requests/month): https://developers.google.com/maps/documentation/geocoding

**Corporate Connector ICP Scoring** (Objective Ranking):

Replace subjective "top 20 members" with objective ICP score:

```javascript
// ICP Score (0-30 points) for Corporate Connector prioritization
function calculateICPScore(member) {
  let score = 0;

  // Company Size/Influence (0-10 points)
  if (member.employerSize >= 500) score += 10;
  else if (member.employerSize >= 250) score += 7;
  else if (member.employerSize >= 100) score += 5;
  else if (member.employerSize >= 50) score += 3;
  else score += 1;

  // Job Level/Authority (0-10 points)
  const jobLevel = extractJobLevel(member.jobTitle);
  if (jobLevel === "C-Suite") score += 10;
  else if (jobLevel === "VP") score += 8;
  else if (jobLevel === "Director") score += 6;
  else if (jobLevel === "Manager") score += 4;
  else score += 2;  // IC

  // Engagement/Loyalty (0-5 points)
  if (member.bookingFreq >= 4) score += 5;
  else if (member.bookingFreq >= 3) score += 4;
  else if (member.bookingFreq >= 2) score += 3;
  else if (member.bookingFreq >= 1) score += 2;
  else score += 1;

  // Proximity/Relevance (0-5 points)
  const distanceToWork = calculateDistance(member.workAddress, PCC_ADDRESS);
  if (distanceToWork < 1) score += 5;
  else if (distanceToWork < 2) score += 4;
  else if (distanceToWork < 3) score += 3;
  else if (distanceToWork < 5) score += 2;
  else score += 1;

  return score;
}

// Example: Sarah's ICP Score
// Company Size: 250 employees = 7 points
// Job Level: VP Marketing = 8 points
// Engagement: 3.2 bookings/week = 4 points
// Proximity: 1.2 miles from work to PCC = 4 points
// Total: 7 + 8 + 4 + 4 = 23 points → "Strong Connector" (20-24 range)

// Ranking:
// Prime Connectors (25-30 points): Top priority, immediate outreach
// Strong Connectors (20-24 points): Secondary outreach within 2 weeks
// Potential Connectors (15-19 points): Monitor, nurture with events
```

**Intent Signal Monitoring**:

Quarterly LinkedIn profile checks to detect:

| Intent Signal | Trigger | Action |
|---|---|---|
| **Promotion** (Manager → Director → VP) | Job title change detected | Email: "Congrats on promotion! Does [Company] do team-building events?" |
| **New Employer Nearby** | Work location <3 miles from PCC | Email: "Welcome to the neighborhood! Corporate pickleball lunch leagues?" |
| **Company Expansion** | Company size increased 50%+ | Email: "Growing team? We offer corporate events for 20-50 people" |
| **Job Change to Target Industry** | Tech, consulting, finance | Add to corporate connector list (higher cultural fit) |

**Deliverable**: Enhanced `customer-segments.json` with LinkedIn data:

```json
{
  "id": "M00123",
  "segment": "Corporate Power Users",
  "icpScore": 23,  // NEW: Corporate connector ranking
  "linkedInData": {  // NEW
    "employer": "TechCorp Inc",
    "jobTitle": "VP Marketing",
    "jobLevel": "VP",
    "companySize": 250,
    "workAddress": "123 W Madison St, Chicago, IL 60661",
    "distanceToWork": 1.2,  // miles
    "companyIndustry": "Technology",
    "lastUpdated": "2025-10-15T00:00:00Z",
    "changeHistory": [
      {"date": "2025-09-01", "change": "Promoted from Director to VP"}
    ]
  },
  "outreachStatus": "emailed"  // not-contacted, emailed, booked, declined
}
```

**Acceptance Criteria**:
- ✅ Top 20 corporate connectors have LinkedIn data (employer, title, work address)
- ✅ ICP scores calculated for all qualifying members (score ≥15)
- ✅ Commute distance calculated (work address → PCC) via Google Maps API
- ✅ Quarterly refresh process documented (detect job changes)
- ✅ Intent signal alert system functional (email Christy when member promoted)

**Success Metrics**:
- 20+ members with ICP score ≥20 (validates scoring isn't too strict)
- ICP score distribution: 25-30 (5 members), 20-24 (10 members), 15-19 (15 members)
- 3+ intent signals detected in first quarter (promotions, job changes)
- Corporate event lead conversion: 15%+ from LinkedIn-enriched outreach

**Expected Business Impact**:
- **Objective prioritization**: Replace "gut feel top 20" with scored ranking
- **Timely outreach**: Catch members at peak influence (new promotion, new budget)
- **Higher conversion**: Target members with decision authority (VPs, not ICs)
- **Commute targeting**: <1 mile proximity = lunch league pitch (higher conversion)

**Cross-Reference**: See [Data Acquisition Strategy §1.3](../../methodology/data-acquisition-strategy.md#13-member-ographic-signals-from-census--google-maps) for proximity analysis methodology

---

### Feature 2.6: Competitive Overlap Analysis (Google Maps)

**Description**: Scrape Google Maps Popular Times data for SPF, Big City Pickle, and other competitors to identify when target segments visit competitors, map competitive proximity to PCC members, and detect churn risk from members living closer to competitors.

**User Story**:
> As Christy, I want to know which members live closer to SPF than PCC so that I can proactively retain them with targeted perks (guaranteed prime time slots, referral bonuses) before they switch for convenience.

**Rationale** (from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md)):
- **Proximity = convenience**: Members living <1 mile from SPF but choosing PCC are "Loyalists" (high retention, good referrers)
- **Popular Times = segment behavior**: If Corporate Power segment books 6-9pm and SPF is 90% full 6-9pm → Competitive threat
- **Churn risk = location + competitor capacity**: Member lives near SPF + SPF has availability + Member can't book at PCC = High churn risk

**Competitors to Analyze**:

| Competitor | Address | Courts | Google Rating | Distance from PCC | Threat Level |
|---|---|---|---|---|---|
| **SPF (Southport Pickle Factory)** | 3500 N Southport Ave | 9 courts | 4.7 | 3.2 miles | **High** (closest, similar size) |
| **Big City Pickle** | 1234 W Grand Ave | 6 courts | 4.5 | 2.8 miles | **Medium** (smaller, newer) |
| **Lakeshore Sport & Fitness** | 1320 W Fullerton Ave | 4 courts (outdoor) | 4.3 | 4.1 miles | **Low** (outdoor only) |
| **Midtown Athletic Club** | 2444 N Elston Ave | 5 courts | 4.6 | 2.1 miles | **Medium** (multi-sport club) |

**Data Points to Collect**:

| Data Point | Source | What It Reveals | Use Case |
|---|---|---|---|
| **Popular Times** (hourly utilization 0-100%) | Google Maps (unofficial scraping) | When competitors are busy/empty | "SPF empty at 10am → Target Corporate Power for off-peak" |
| **Competitor Location** | Google Maps Geocoding API | Lat/lon for distance calculations | Map member proximity to competitors |
| **Member Proximity to Competitors** | Home address → Competitor distance | Churn risk indicator | "<1 mile to SPF = retention focus" |
| **Competitor Pricing** (manual research) | Competitor websites, reviews | Price sensitivity insights | "SPF charges $30 drop-in → We charge $25 → Price advantage" |
| **Competitor Amenities** (manual observation) | Competitor websites, Instagram | Feature gaps | "SPF lacks strength training → Opportunity for differentiation" |

**Collection Method**:

**Phase 2 (Google Maps Popular Times Scraping)**:

1. **Tool**: Puppeteer (browser automation to scrape Popular Times from Google Maps)
2. **Process**:
   - Navigate to Google Maps for each competitor
   - Extract Popular Times data (hourly utilization 0-100% for each day of week)
   - Store in `data/competitive-popular-times.json`
3. **Frequency**: Weekly refresh (detect capacity changes)
4. **Code**: `scripts/scrape-competitor-popular-times.js`

Example output:
```json
{
  "competitor": "SPF",
  "address": "3500 N Southport Ave",
  "popularTimes": {
    "Monday": [30, 35, 40, 50, 60, 70, 85, 90, 85, 75, 65, 50],  // 6am-5pm
    "Tuesday": [30, 35, 40, 50, 60, 70, 90, 95, 90, 80, 65, 50],
    // ... 7 days
  },
  "lastScraped": "2025-10-15T00:00:00Z"
}
```

4. **Legal Note**: Google Maps Popular Times scraping is technically against TOS, but widely practiced. Alternative: Manual observation (visit competitor websites, observe parking lot fullness).

**Phase 2 (Proximity Analysis)**:

1. **Input**: Member home addresses (from survey or booking system)
2. **Geocoding**: Convert addresses to lat/lon (Google Maps Geocoding API)
3. **Distance Calculation**: Calculate distance from each member's home to:
   - PCC
   - SPF
   - Big City Pickle
   - Midtown Athletic Club
4. **Churn Risk Flag**:
   ```javascript
   if (distanceToCompetitor < distanceToPCC && distanceToCompetitor < 1.5) {
     member.churnRisk = "HIGH - Lives closer to " + competitorName;
   }
   ```

**Visualizations**:

**1. Competitive Overlap Heatmap** (Geographic Map)

Add layer to existing map (Feature 1.3 Demographics Overlay):
- **Member dots** colored by proximity:
  - Green: <1 mile from PCC, >2 miles from competitors (low churn risk)
  - Yellow: <1 mile from PCC, <1.5 miles from competitor (medium risk)
  - Red: >1.5 miles from PCC, <1 mile from competitor (HIGH churn risk)
- **Competitor icons**: Show SPF, Big City Pickle, Midtown locations
- **Tooltip**: "Sarah lives 0.8 miles from SPF, 1.2 miles from PCC → Retention focus"

**2. Popular Times Comparison** (Line Chart)

Compare PCC bookings vs SPF/Big City Pickle Popular Times:
```
Utilization %
100% ┤                         ╭──PCC (actual bookings)
 90% ┤                    ╭────╯
 80% ┤               ╭────╯        ╭──SPF (Google Popular Times)
 70% ┤          ╭────╯        ╭────╯
 60% ┤     ╭────╯        ╭────╯
     └────────────────────────────────────────────────
     6am  8am  10am  12pm  2pm  4pm  6pm  8pm  10pm

Insight: "SPF hits 90% at 6pm, PCC hits 90% at 7pm → PCC has 1-hour window to capture spillover"
```

**Use Cases**:

**1. Retention Risk Identification**

```javascript
// Identify "at-risk" members (proximity to competitor)
const atRiskMembers = members.filter(m =>
  m.distanceToSPF < m.distanceToPCC &&
  m.distanceToSPF < 1.5 &&
  m.segment === "Corporate Power Users"  // High-value segment
);

// Action: Proactive retention campaign
atRiskMembers.forEach(member => {
  sendEmail({
    to: member.email,
    subject: "Guaranteed 7pm Slot for You",
    body: `Hi ${member.name}, we know you're a VIP. We're holding a 7pm slot for you 3x/week. No need to race for bookings!`
  });
});
```

**2. Competitive Timing Analysis**

```javascript
// When is SPF empty (opportunity to capture their overflow)?
const spfLowUtilization = spfPopularTimes.filter(slot => slot.utilization < 50);
// Result: Mon-Fri 10am-2pm (30-45% utilization)

// Action: Target Corporate Power Users for lunch league
sendMarketingEmail({
  to: corporatePowerUsers,
  subject: "Lunch League: Play Pickleball on Your Lunch Break",
  body: "SPF is crowded evenings, but we have wide-open courts 11am-1pm. Perfect for a work break!"
});
```

**3. Competitive Advantage Messaging**

```javascript
// What does SPF lack that PCC has?
const pccAdvantages = [
  "Strength training area (SPF doesn't have)",
  "$25 drop-in vs SPF's $30 (17% cheaper)",
  "Less crowded 6-9pm (PCC 85% vs SPF 95%)",
  "Closer for West Loop workers (PCC 0.5mi vs SPF 3.2mi)"
];

// Action: Targeted ads
runFacebookAd({
  targeting: "People who live in West Loop",
  message: "Closer than SPF. Cheaper than SPF. Less crowded than SPF. Try PCC today.",
  cta: "Book your first session ($25)"
});
```

**Deliverable**: `data/competitive-overlap-analysis.json`

```json
{
  "members": [
    {
      "id": "M00123",
      "name": "Sarah Johnson",
      "homeAddress": "123 Main St",
      "proximity": {
        "toPCC": 1.2,
        "toSPF": 0.8,
        "toBigCityPickle": 3.5,
        "toMidtown": 2.1
      },
      "churnRisk": "MEDIUM - Lives 0.4 miles closer to SPF",
      "retentionStrategy": "Guarantee prime time slots, referral bonus"
    }
  ],
  "competitorPopularTimes": {
    "SPF": { /* Popular Times data */ },
    "BigCityPickle": { /* Popular Times data */ }
  }
}
```

**Acceptance Criteria**:
- ✅ Popular Times data scraped for 3-4 competitors (weekly refresh)
- ✅ Member proximity calculated for all 50 Phase 1 members
- ✅ Churn risk flags assigned (HIGH/MEDIUM/LOW) based on proximity
- ✅ Competitive overlap heatmap rendered on geographic map
- ✅ Popular Times comparison chart shows PCC vs SPF utilization
- ✅ 10-15 "at-risk" members identified (closer to competitor)

**Success Metrics**:
- 10-15 members flagged as "at-risk" (proximity to competitor)
- Retention campaign sent to at-risk members (guaranteed slots, perks)
- Churn rate for at-risk members <5% (vs 10% baseline for members near competitors)
- Competitive advantage messaging tested (Facebook ads targeting SPF's neighborhood)

**Expected Business Impact**:
- **Proactive retention**: Identify and retain members before they switch to closer competitor
- **Competitive positioning**: "17% cheaper, less crowded, closer for West Loop" → Messaging clarity
- **Spillover capture**: Identify when SPF is full (6-9pm) → Target their overflow with availability messaging
- **Risk mitigation**: Know which members are geographically vulnerable → Focus retention efforts

**Cross-Reference**: See [Data Acquisition Strategy §1.4](../../methodology/data-acquisition-strategy.md#14-engagement--intent-signals-from-google-maps--social) for competitive visit pattern analysis

---

## PRIORITY 3: Yield Management Foundation (Weeks 11-16)

**Goal**: Integrate PCC booking data and build scenario planner for revenue optimization

**Business Value**: $30-50k annual revenue increase from dynamic pricing + data-driven event decisions

**Note**: This is a simplified subset of PRD_Yield_Management.md, focused on quick wins

---

### Feature 3.1: Booking Data Integration

**Description**: Connect to PCC's booking system (ClubReady, Mindbody, or CSV export) to import historical booking data

**User Story**:
> As Peter, I want to import 12 months of booking history so that I can build utilization models and revenue forecasts.

**Required Data Fields**:
- Booking ID
- Customer ID (member number or name)
- Customer Type (member / drop-in / corporate event / league)
- Date/Time (start and end)
- Court(s) booked
- Price paid (if available)
- Booking timestamp (when reservation was made)
- Cancellation status

**Integration Options**:
1. **Option A**: API integration (real-time sync) - preferred if PCC has API access
2. **Option B**: Daily CSV export (manual or automated)
3. **Option C**: One-time historical CSV export for initial prototype

**Data Validation**:
- Check for completeness (100% of bookings captured)
- Verify accuracy (spot-check against known bookings)
- Identify anomalies (duplicate bookings, incorrect times)

**Deliverable**: PostgreSQL database with `bookings` table:
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(50),
  customer_type VARCHAR(20), -- 'member', 'drop-in', 'corporate', 'league'
  date_time TIMESTAMP,
  end_time TIMESTAMP,
  court_number INT,
  price DECIMAL(10,2),
  booked_at TIMESTAMP,
  cancelled BOOLEAN DEFAULT FALSE
);
```

**Acceptance Criteria**:
- ✅ 12 months of booking data imported (minimum 6 months if 12 unavailable)
- ✅ Data validation checks pass (95%+ completeness, <5% anomalies)
- ✅ Daily sync operational (or weekly CSV import process documented)
- ✅ Spot-check validates accuracy (10 random bookings confirmed)

**Success Metrics**:
- Booking count matches PCC's internal reports (±5%)
- Revenue totals match financial records (±10%)

---

### Feature 3.2: Revenue Scenario Planner

**Description**: Model 3 allocation strategies (Members First, Revenue Max, Balanced Growth) and visualize revenue vs. satisfaction trade-offs

**User Story**:
> As Christy, I want to compare different court allocation strategies (prioritize members vs. maximize drop-in revenue) to see the impact on revenue and member satisfaction.

**Scenarios**:

| Scenario | Member Allocation (Prime Time) | Drop-In Allocation | Event Allocation | Revenue Focus | Satisfaction Focus |
|----------|-------------------------------|-------------------|-----------------|---------------|-------------------|
| **Members First** | 80% | 15% | 5% | Low | **High** |
| **Balanced Growth** | 65% | 25% | 10% | Medium | Medium |
| **Revenue Max** | 50% | 30% | 20% | **High** | Low |

**Calculation Model**:
```javascript
for each scenario:
  monthlyRevenue =
    (memberCount × $149) +  // membership revenue
    (dropInSlots × $25 × utilization) +  // drop-in revenue
    (eventSlots × $500 × eventRate)  // event revenue

  memberSatisfaction =
    bookingSuccessRate = memberAllocation / memberDemand
    if (bookingSuccessRate >= 0.85) → "High ✅"
    else if (bookingSuccessRate >= 0.70) → "Medium ⚠️"
    else → "Low ❌ (Churn Risk)"
```

**Visualization**: Comparison table
```
| Scenario        | Monthly Revenue | Member Satisfaction | Churn Risk |
|----------------|----------------|-------------------|-----------|
| Members First   | $87,000        | 95 (Excellent ✅)  | Low       |
| Balanced Growth | $98,000        | 84 (Good ⚠️)       | Medium    |
| Revenue Max     | $112,000       | 68 (Poor ❌)       | High      |
| Current State   | $82,000        | 72 (Fair ⚠️)       | Medium    |
```

**Recommendation Engine**:
> **Recommended: "Balanced Growth" scenario**
> - Projected revenue: $98,000/month (+19% vs. current)
> - Member satisfaction: 84/100 (Good)
> - Churn risk: Medium (acceptable for growth phase)
>
> **Rationale**: "Revenue Max" earns $14k more but churn risk is too high - estimated churn cost ($966/month from 2% increased churn) would offset gains.

**Acceptance Criteria**:
- ✅ 3 scenarios defined with allocation percentages
- ✅ Revenue calculation logic implemented
- ✅ Satisfaction scoring algorithm functional
- ✅ Comparison table renders with all metrics
- ✅ Recommendation engine provides rationale

**Success Metrics**:
- Christy reviews scenarios monthly
- PCC adopts "Balanced Growth" or custom scenario within 3 months
- Actual revenue within 10% of forecast (validates model accuracy)

---

### Feature 3.3: Dynamic Pricing Recommender

**Description**: Generate optimal drop-in pricing by time slot based on historical demand

**User Story**:
> As Christy, I want to see recommended drop-in prices for each time slot (Thursday 7pm = $35, Monday 2pm = $18) so that I can maximize revenue without leaving courts empty.

**Pricing Algorithm**:
```python
basePrice = $25
demandForecast = historicalUtilization  # from booking data

if demandForecast >= 0.90:
  recommendedPrice = $35  # high demand
elif demandForecast >= 0.75:
  recommendedPrice = $30  # medium-high
elif demandForecast >= 0.50:
  recommendedPrice = $25  # baseline
elif demandForecast >= 0.30:
  recommendedPrice = $20  # fill capacity
else:
  recommendedPrice = $15  # low demand
```

**Visualization**: 7-day × 24-hour pricing heatmap
```
        6am  7am  8am ... 6pm  7pm  8pm  9pm
Monday  $18  $20  $22 ... $30  $35  $35  $28
Tuesday $18  $20  $22 ... $30  $35  $35  $28
...
```

Color scale:
- Dark green: $15-19 (discount)
- Light green: $20-24 (baseline)
- Yellow: $25-29 (slight premium)
- Orange: $30-34 (high demand)
- Red: $35-40 (peak)

**Expected Revenue Impact**:
```
Annual Revenue Increase from Dynamic Pricing:
- Thursday 7pm: 50 weeks × 4 courts × +$10 = $2,000/court × 7 courts = $14,000
- Saturday 10am: 50 weeks × 4 courts × +$10 = $14,000
- Fill off-peak (Monday 2pm): 50 weeks × 2 bookings × $15 = $1,500
Total: ~$30,000 annual increase
```

**Acceptance Criteria**:
- ✅ Demand forecast generated for all 168 time slots
- ✅ Pricing recommendations calculated
- ✅ Heatmap renders with correct colors
- ✅ Hover tooltip shows: current price, recommended price, expected revenue
- ✅ Export pricing schedule to CSV

**Success Metrics**:
- Christy pilots dynamic pricing on 2-3 time slots within 1 month
- A/B test shows 10%+ revenue increase on tested slots
- Full rollout generates $20k+ annual revenue increase (validated after 6 months)

---

### Feature 3.4: Mezzanine ROI Planner

**Description**: Data-driven tool to compare potential mezzanine investments (Hot Desks, Yoga Studio, Strength Training, Event Space) using financial modeling + member survey interest

**User Story**:
> As Christy, I want to compare the ROI of different mezzanine investments so that I can make a data-driven capital decision weighted by both financial returns and actual member demand.

**Problem Statement** (from Christy's pain points):
> *"I don't know if I should invest $40k in a mezzanine - should I build a yoga studio for our 'wellness' crowd or a strength training area for our 'competitive' players? I'm guessing what my members actually want."*

**Investment Options**:

| Use Case | Setup Cost | Monthly Revenue (Est.) | Monthly Op Cost | Payback Period | Member Interest |
|----------|-----------|----------------------|----------------|---------------|----------------|
| **Hot Desks** (4 desks, Wi-Fi) | $15,000 | $2,500 | $500 | 7.5 months | ⭐⭐⭐ (60% Corporate Power Users) |
| **Yoga Studio** (mirrors, mats) | $25,000 | $3,000 | $800 | 11.4 months | ⭐⭐⭐⭐⭐ (80% Social Ambassadors) |
| **Strength Training** (racks, weights) | $40,000 | $1,500 | $200 | 30.8 months | ⭐⭐⭐⭐⭐ (90% Competitive Athletes) |
| **Event Space** (furniture, A/V) | $10,000 | $1,000 | $100 | 11.1 months | ⭐⭐ (30% overall interest) |

**Calculation Model**:
```javascript
for each use case:
  monthlyNetRevenue = monthlyRevenue - monthlyOpCost
  paybackPeriod = setupCost / monthlyNetRevenue  // in months
  annualROI = ((monthlyNetRevenue × 12) / setupCost) × 100  // %

  memberInterestScore = (surveyResponses["interested"] / totalResponses) × 5  // 0-5 stars

  strategicAlignment = {
    "Hot Desks": prioritySegment === "Corporate Power Users" ? 10 : 5,
    "Yoga Studio": prioritySegment === "Social Ambassadors" ? 10 : 5,
    "Strength Training": prioritySegment === "Competitive Athletes" ? 10 : 5,
    "Event Space": prioritySegment === "Mixed" ? 5 : 3
  }

  recommendationScore = (
    (1 - (paybackPeriod / 36)) × 0.3 +  // 30% weight: faster payback better
    (annualROI / 100) × 0.3 +            // 30% weight: higher ROI better
    (memberInterestScore / 5) × 0.4      // 40% weight: member demand matters most
  )
```

**UI Design**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Mezzanine ROI Planner                                           │
├─────────────────────────────────────────────────────────────────┤
│ Compare Investment Options:                                     │
│                                                                 │
│ ┌────────────┬──────────┬───────────┬──────────┬────────┬─────┐│
│ │ Use Case   │Setup Cost│Monthly Net│ Payback  │ Annual │ Int ││
│ │            │          │  Revenue  │  Period  │  ROI   │     ││
│ ├────────────┼──────────┼───────────┼──────────┼────────┼─────┤│
│ │ Hot Desks  │ $15,000  │  +$2,000  │ 7.5 mo   │ 160%   │⭐⭐⭐││
│ │ Yoga Studio│ $25,000  │  +$2,200  │ 11.4 mo  │ 106%   │⭐⭐⭐⭐⭐││
│ │ Strength   │ $40,000  │  +$1,300  │ 30.8 mo  │  39%   │⭐⭐⭐⭐⭐│(✓ Recommended)
│ │ Event Space│ $10,000  │    $900   │ 11.1 mo  │ 108%   │⭐⭐  ││
│ └────────────┴──────────┴───────────┴──────────┴────────┴─────┘│
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐│
│ │ 💡 Recommendation: Strength Training                        ││
│ │                                                             ││
│ │ Despite a longer payback period (31 months), this option   ││
│ │ has the highest strategic alignment due to:                ││
│ │                                                             ││
│ │ ✓ Strong member interest (90% of Competitive Athletes)     ││
│ │ ✓ Addresses churn risk (athletes seek training amenities)  ││
│ │ ✓ Differentiates PCC from competitors (SPF lacks this)     ││
│ │                                                             ││
│ │ Alternative: If cash flow is priority, consider Hot Desks  ││
│ │ (7.5 month payback, 160% ROI, targets Corporate segment)   ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ [Adjust Assumptions] [Export Analysis] [Save Decision]         │
└─────────────────────────────────────────────────────────────────┘
```

**Data Sources**:
1. **Survey Data** (from Feature 1.1): Member amenity preferences
   - Question: "What amenities interest you?" (checkboxes: Hot Desks, Yoga, Strength Training, Event Space, Café, Other)
   - Segment-specific interest rates
2. **Financial Assumptions** (Christy provides):
   - Setup costs (contractor quotes)
   - Expected monthly revenue (market research + PCC pricing)
   - Operating costs (utilities, maintenance, instructor fees)
3. **Strategic Priority** (Christy selects):
   - Which segment do we want to grow? (Corporate, Social, Competitive, Mixed)

**Recommendation Engine Logic**:
```python
def get_recommendation(options, priority_segment, member_survey):
    for option in options:
        # Calculate financial metrics
        option.payback_months = option.setup_cost / option.monthly_net
        option.annual_roi = ((option.monthly_net * 12) / option.setup_cost) * 100

        # Calculate member interest (from survey)
        segment_interest = survey_responses[option.name][priority_segment]
        option.member_interest_stars = (segment_interest / 100) * 5

        # Strategic alignment score
        option.strategic_score = calculate_strategic_fit(option, priority_segment)

        # Weighted recommendation score
        option.rec_score = (
            normalize(option.payback_months, lower_is_better=True) * 0.3 +
            normalize(option.annual_roi) * 0.3 +
            option.member_interest_stars / 5 * 0.4
        )

    # Return highest scoring option
    recommended = max(options, key=lambda x: x.rec_score)

    return {
        "option": recommended.name,
        "rationale": generate_rationale(recommended, priority_segment),
        "alternative": get_runner_up(options, recommended)
    }
```

**Acceptance Criteria**:
- ✅ 4 investment options defined with costs, revenue, and member interest
- ✅ ROI calculation logic implemented (payback period, annual ROI %)
- ✅ Member interest displayed as 5-star rating (from survey data)
- ✅ Interactive table allows Christy to adjust assumptions (setup cost, revenue)
- ✅ Recommendation engine provides clear rationale weighted by financial + member demand
- ✅ Export analysis to PDF for board presentation

**Success Metrics**:
- Christy uses planner before making mezzanine investment decision
- Decision aligns with recommended option (or documented reason for override)
- If implemented: Actual revenue within 20% of projection (validates model)
- Member satisfaction with chosen amenity 4.0+ / 5.0 (survey 3 months post-launch)

**Expected Business Impact**:
- **Risk reduction**: Avoid $25k mistake on low-demand amenity
- **Revenue upside**: $12k-30k annual (varies by option)
- **Member retention**: Address top churn driver (lack of desired amenities)

**Implementation Details**: See [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC_Customer_Intelligence.md#fr-55-mezzanine-roi-planner) for calculation logic and [DESIGN_SPEC.md](./DESIGN_SPEC_Customer_Intelligence.md#mezzanine-roi-planner) for UI wireframes

---

### Feature 3.5: Corporate Event Decision Tool

**Description**: Real-time decision support tool that calculates the trade-off between corporate event revenue and estimated churn cost from displacing members

**User Story**:
> As Christy (or Front Desk Staff), when I receive a corporate event inquiry, I want the system to tell me whether to accept, decline, or counter-offer based on the revenue vs. churn risk analysis.

**Problem Statement** (from Christy's pain points):
> *"Company X wants Thursday 7pm for a $500 corporate event that displaces 12 members, but I don't know if those members are irreplaceable power users or casual drop-ins. I'm flying blind and risk alienating my best customers."*

**Decision Model**:
```javascript
// Step 1: Identify displaced bookings
corporateEvent = {
  dateTime: "2026-02-15T19:00:00Z",
  duration: 2 hours,
  courts: 4,
  revenue: $500
}

displacedBookings = bookings.filter(b =>
  b.dateTime >= event.dateTime &&
  b.dateTime < event.dateTime + event.duration &&
  courts.includes(b.court_number)
)

// Step 2: Calculate total CLV of displaced members
displacedMembers = displacedBookings.map(b => members[b.customer_id])
totalDisplacedCLV = sum(displacedMembers.map(m => m.estimated_clv))

// Step 3: Estimate churn probability increase
churnProbabilityIncrease = {
  "Corporate Power Users": 0.05,    // 5% increase (high expectations)
  "Social Ambassadors": 0.02,       // 2% increase (flexible)
  "Competitive Athletes": 0.03,     // 3% increase (schedule-dependent)
  "Casual Drop-ins": 0.01          // 1% increase (low attachment)
}

estimatedChurnCost = sum(displacedMembers.map(m =>
  m.estimated_clv * churnProbabilityIncrease[m.segment]
))

// Step 4: Calculate Net Value
netValue = corporateEvent.revenue - estimatedChurnCost

// Step 5: Generate recommendation
if (netValue > 200) {
  recommendation = "Accept"
  color = "green"
} else if (netValue > -200) {
  recommendation = "Counter-offer with alternative slot"
  color = "yellow"
} else {
  recommendation = "Decline"
  color = "red"
}
```

**UI Design**:
```
┌───────────────────────────────────────────────────┐
│ Corporate Event Decision Tool                     │
├───────────────────────────────────────────────────┤
│ Event Details:                                    │
│ Date/Time:  [Feb 15, 2026 7:00 PM]              │
│ Duration:   [2 hours]                            │
│ Courts:     [4]  (Court 1, 2, 3, 4)             │
│ Revenue:    [$500]                               │
│                                                   │
│ [Calculate Impact]                                │
├───────────────────────────────────────────────────┤
│                                                   │
│ ┌──────────────────┬──────────────────────────┐  │
│ │  EVENT REVENUE   │   CHURN COST            │  │
│ │                  │                          │  │
│ │     +$500        │      -$966               │  │
│ │   (one-time)     │   (expected loss)        │  │
│ │                  │                          │  │
│ │                  │  12 members displaced:   │  │
│ │                  │  • 2 Corporate Power (CLV│  │
│ │                  │    $3,800 × 5% = $190ea) │  │
│ │                  │  • 7 Social Ambassadors  │  │
│ │                  │  • 3 Competitive         │  │
│ └──────────────────┴──────────────────────────┘  │
│                                                   │
│ ┌───────────────────────────────────────────────┐│
│ │ ⚠️  RECOMMENDATION: DECLINE                   ││
│ │                                               ││
│ │ Net Value: -$466                              ││
│ │                                               ││
│ │ This event displaces 2 high-value Corporate  ││
│ │ Power Users. The risk of churn outweighs the ││
│ │ one-time revenue.                             ││
│ │                                               ││
│ │ 💡 Suggested Alternative:                     ││
│ │ Offer Saturday 2:00 PM (off-peak)             ││
│ │ → No member displacement                      ││
│ │ → Net Value: +$500                            ││
│ └───────────────────────────────────────────────┘│
│                                                   │
│ [Accept Anyway] [Send Counter-Offer] [Decline]   │
└───────────────────────────────────────────────────┘
```

**Alternative Slot Finder** (Bonus Feature):
```javascript
// Find alternative slots with minimal member displacement
function findAlternativeSlots(event) {
  const alternatives = []

  // Check same day, different time
  for (let hour = 6; hour <= 21; hour++) {
    const altTime = new Date(event.dateTime)
    altTime.setHours(hour)

    const displaced = countDisplacedBookings(altTime, event.duration, event.courts)
    if (displaced.count <= 3) {  // threshold
      alternatives.push({
        time: altTime,
        displacedCount: displaced.count,
        netValue: event.revenue - calculateChurnCost(displaced.members)
      })
    }
  }

  // Sort by highest net value
  return alternatives.sort((a, b) => b.netValue - a.netValue).slice(0, 3)
}
```

**Email Template Generation** (for counter-offers):
```
Subject: PCC Corporate Event - Alternative Time Slots

Hi [Contact Name],

Thank you for your interest in hosting a corporate event at PCC on
Thursday, February 15th at 7:00 PM.

Unfortunately, that time slot is heavily booked with member reservations.
However, we have excellent alternative slots available:

Option 1: Saturday, February 17th at 2:00 PM
- All 4 courts available
- No member displacement
- Same $500 pricing

Option 2: Thursday, February 15th at 5:00 PM (2 hours earlier)
- 4 courts available
- Minimal member impact
- Same $500 pricing

Would either of these work for your team?

Best,
Christy
PCC Management
```

**Acceptance Criteria**:
- ✅ User inputs event details (date, time, revenue, courts)
- ✅ System identifies displaced member bookings from database
- ✅ Churn cost calculated using segment-specific CLV and churn risk
- ✅ Net Value displayed prominently (revenue - churn cost)
- ✅ Clear recommendation: "Accept" (green) | "Counter-offer" (yellow) | "Decline" (red)
- ✅ Alternative slot finder suggests 3 options with minimal displacement
- ✅ Email template generator pre-fills counter-offer message
- ✅ Decision logged (for tracking revenue vs. tool recommendation)

**Success Metrics**:
- Front desk staff uses tool for 80%+ of corporate event inquiries
- Decision aligns with tool recommendation 70%+ of the time
- Corporate event revenue increases 10%+ (better pricing via data confidence)
- Member churn from displaced bookings <2% (vs. estimated 5% baseline)
- Christy can explain corporate event policy to team (data-driven framework)

**Expected Business Impact**:
- **Protect high-value members**: Avoid alienating $3,800 CLV members for $500 events
- **Optimize revenue**: Accept profitable events, decline unprofitable ones
- **Reduce guesswork**: Clear decision framework (no more "gut feel")
- **Increase corporate revenue**: Confidence to charge premium pricing (data-backed)

**Implementation Details**: See [FUNCTIONAL_SPEC.md](./FUNCTIONAL_SPEC_Customer_Intelligence.md#fr-54-corporate-event-decision-tool) for detailed calculation logic and [DESIGN_SPEC.md](./DESIGN_SPEC_Customer_Intelligence.md#corporate-event-decision-tool) for UI wireframes

---

## Success Metrics & KPIs

### Phase 1: Customer Intelligence Foundation (Weeks 1-6)

**Business Metrics**:

| Metric | Baseline | Target (End of Week 6) | Measurement Method |
|--------|----------|---------------------|-------------------|
| **Corporate Event Leads** | 0 | 5 leads, 1 booked | Track outreach from corporate connector list |
| **Survey Response Rate** | N/A | 60%+ | Responses / surveys sent |
| **Marketing Targeting Efficiency** | Broad Chicago ads | 2-3 neighborhoods identified | Zip code analysis from member data |

**Product Metrics**:

| Metric | Target |
|--------|--------|
| **Members Segmented** | 50 (VIP members manually classified) |
| **Corporate Connector List Size** | 20 members |
| **Demographics Overlay Variables** | 3 (income, education, density) |
| **Dashboard Usage** | Christy uses 2x/week |

**Leading Indicators** (Weekly Tracking):
- Survey distribution progress (Week 1: sent, Week 2: follow-up, Week 3: analyze)
- LinkedIn enrichment progress (10 members/day target)
- Dashboard UI progress (wireframe → mockup → functional)

---

### Phase 2: Best Practice Research (Weeks 7-10)

**Business Metrics**:

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Programming Ideas Identified** | 100+ events from top clubs | Database count |
| **Ideas Piloted** | 2 events run at PCC | Event calendar |
| **Event Attendance** | 80%+ of capacity | Registration data |

**Product Metrics**:

| Metric | Target |
|--------|--------|
| **National Clubs Researched** | 50 clubs across 30 cities |
| **Event Categories** | 5 types (League, Tournament, Social, Corporate, Youth) |
| **Success Signals Captured** | 50%+ of events have success data |

---

### Phase 3: Yield Management Foundation (Weeks 11-16)

**Business Metrics**:

| Metric | Baseline | Target (End of Week 16) | Measurement |
|--------|----------|----------------------|-------------|
| **Monthly Revenue** | $82,000 | $98,000 (+20%) | Financial reports |
| **Revenue from Dynamic Pricing** | $0 | +$2,500/month (pilot) | A/B test results |
| **Member Satisfaction (Booking Success Rate)** | 72% (estimated) | 84% | Booking attempt logs |

**Product Metrics**:

| Metric | Target |
|--------|--------|
| **Booking Data Imported** | 12 months (or 6 months minimum) |
| **Scenario Planner Usage** | Christy reviews monthly |
| **Pricing Recommendations Accepted** | 70%+ acceptance rate |

---

## Dependencies & Constraints

### Critical Dependencies

| Dependency | Impact if Missing | Mitigation | Owner |
|-----------|------------------|------------|-------|
| **PCC Member Data Access** | Can't build customer profiles | Start with 50 VIP members manually | Christy |
| **Survey Distribution Channel** | Can't collect psychographic data | Use email list from booking system | Christy |
| **Census Data Download** | Can't build demographics overlay | Use City of Chicago Open Data Portal (free) | Peter |
| **Booking System Access** (Phase 3) | Can't build yield management features | Use CSV export initially, API later | Christy |

### Constraints

**Phase 1 Constraints**:
- **Manual processes**: Survey, LinkedIn enrichment, segmentation all done manually (no automation yet)
- **Limited sample size**: 50 members (not full 350 base) to prove value before scaling
- **No predictive models**: Simple classification, not ML-based clustering
- **Static data**: Segments assigned once, not updated automatically

**Phase 2 Constraints**:
- **Web scraping limitations**: Some clubs may block scrapers, require manual review
- **Data accuracy**: Event success signals are inferred, not validated
- **Taxonomy imperfect**: AI categorization may misclassify some events

**Phase 3 Constraints**:
- **Data availability**: Requires 6-12 months booking history (may not exist)
- **Booking system integration**: May require custom API work or manual CSV process
- **No real-time sync**: Initial implementation uses batch updates (daily/weekly)

### Risks & Mitigations

**Risk 1: Low Survey Response Rate (<30%)**
- **Impact**: Insufficient data for segmentation
- **Likelihood**: Medium
- **Mitigation**:
  - Offer incentive ($10 credit for completion)
  - Keep survey short (10 questions, <3 minutes)
  - Send reminder after 1 week
  - Target VIPs first (higher engagement)

**Risk 2: Corporate Connector List Generates Zero Leads**
- **Impact**: Business value not proven, Phase 1 fails
- **Likelihood**: Low-Medium
- **Mitigation**:
  - Validate list quality with Christy before outreach
  - Personalize outreach (not generic email blast)
  - Offer free trial event ($0 risk for company)
  - Track all outreach attempts (learn what works)

**Risk 3: Census Data Too Coarse (Tract-Level vs. Granular)**
- **Impact**: Demographics don't reveal actionable insights
- **Likelihood**: Medium
- **Mitigation**:
  - Supplement with block group data if needed (finer granularity)
  - Focus on relative comparisons (PCC location vs. SPF location)
  - Use member location data to validate patterns

**Risk 4: User Adoption Low (Christy Doesn't Use Dashboard)**
- **Impact**: Product built but not used, wasted effort
- **Likelihood**: Low (Bridget's feedback suggests strong interest)
- **Mitigation**:
  - Weekly check-ins with Christy during development
  - Iterate based on feedback (don't build in isolation)
  - Focus on quick wins (corporate list in Week 2)
  - Simple UI (reuse existing design system)

**Risk 5: Booking Data Quality Poor**
- **Impact**: Phase 3 yield management models inaccurate
- **Likelihood**: Medium
- **Mitigation**:
  - Data validation checks (completeness, accuracy)
  - Manual spot-checking (10 random bookings)
  - Start with conservative assumptions
  - Tune models as more data accumulates

---

## Open Questions

### Business Questions (for Christy)

1. **What is PCC's current member churn rate?**
   - Need: Historical cancellation data (past 12 months)
   - Why: Baseline for measuring improvement
   - When: Before Phase 1 starts (Week 0)

2. **Do we have a member email list?**
   - Need: Email addresses for survey distribution
   - Why: Required for survey (Feature 1.1)
   - When: Week 1 (survey design)

3. **Who are the 50 "VIP" members to profile first?**
   - Need: Christy's subjective ranking (most engaged, highest spend, most influence)
   - Why: Manual profiling effort is high, want best ROI
   - When: Week 1 (before LinkedIn enrichment)

4. **What is the typical corporate event pricing?**
   - Need: $500/event assumption validated
   - Why: ROI calculation for corporate connector list
   - When: Week 2 (before outreach template created)

5. **Is there a booking system API, or do we need CSV export?**
   - Need: Technical documentation for booking system
   - Why: Determines Phase 3 integration approach
   - When: Week 8 (planning Phase 3)

### Technical Questions (for Peter)

1. **Should we use React for Customer Intelligence dashboard, or vanilla JS?**
   - Trade-off: React = better interactivity, Vanilla JS = consistency with existing code
   - Decision: Vanilla JS + D3.js (matches existing pattern, faster development)
   - When: Week 4 (before dashboard UI build)

2. **Where should member data be stored? (PostgreSQL, Firebase, Google Sheets)**
   - Trade-off: PostgreSQL = production-ready, Google Sheets = faster prototype
   - Decision: Start with Google Sheets (Phase 1), migrate to PostgreSQL if needed (Phase 2+)
   - When: Week 1 (data collection planning)

3. **What Census API should we use? (census.gov official vs. City of Chicago portal)**
   - Trade-off: Official = comprehensive, City portal = pre-processed
   - Decision: City of Chicago portal for ease, fallback to census.gov if insufficient
   - When: Week 3 (demographics overlay planning)

### Strategic Questions (for Team)

1. **Should we expand beyond 50 VIP members in Phase 1, or wait for automation?**
   - Trade-off: More data = better insights, but higher manual effort
   - Recommendation: Stick to 50, prove value, then automate
   - When: Week 2 review

2. **Should Phase 2 (Best Practices) start immediately after Phase 1, or wait for feedback?**
   - Trade-off: Momentum vs. risk of building wrong thing
   - Recommendation: 2-week pause after Phase 1 to validate insights, then start Phase 2
   - When: Week 6 milestone review

3. **What's the priority: Customer Intelligence (this PRD) vs. Yield Management (PRD_Yield_Management.md)?**
   - Decision (from transcript): Customer Intelligence first (need to know WHO before optimizing HOW)
   - Confirmation: Yes, this PRD is Priority 1

---

## Appendices

### Appendix A: Customer Segment Definitions (Detailed)

**Segment 1: Corporate Power Users**

**Defining Characteristics**:
- Works in West Loop, River North, or The Loop
- Job title includes: VP, Director, Manager, Chief, Head of
- Books 3+ times/week
- Brings colleagues (observable: group bookings)
- High amenity spend (café, pro shop)

**JTBD Archetype** *(from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md))*:
- **Context**: Relocated to Chicago for new job, seeking work-life integration
- **Struggling Moment**: "I need convenient exercise options near my office that also support professional networking"
- **Desired Outcome**: Convenient lunch/after-work fitness + informal business relationship building
- **Hiring Criteria**: Walking distance from office (< 0.5 miles), premium vibe, colleagues also members
- **Competitive Alternative**: Equinox, Barry's Bootcamp, Orangetheory (but prefer social/networking element)
- **Key Trade-offs**: Willing to pay premium for convenience + networking value

**Behavioral Patterns** *(Multi-Source Data Signals)*:

| Signal Type | Observable Patterns | Data Source |
|-------------|-------------------|-------------|
| **Booking Behavior** | - 90% of bookings 6-9pm weekdays<br>- Consistent schedule (same days/times each week)<br>- Group bookings (2-4 people)<br>- High cancellation rate when work conflicts arise | Booking system |
| **Social Signals** | - Instagram: Professional lifestyle content (#worklifebalance, #corporatelife)<br>- Tags colleagues in PCC posts<br>- LinkedIn profile visible (100+ employees company)<br>- Low post frequency (0.3x/week) but high engagement | Instagram, LinkedIn API |
| **Demographics** | - Lives in West Loop, River North, Gold Coast (median income $80k+)<br>- 1-2 person household<br>- Age 28-42<br>- 70%+ bachelor's degree in census tract | Census ACS |
| **LinkedIn Signals** | - Employer: 100+ employees (Salesforce, Accenture, DoorDash, etc.)<br>- Job title: Director, VP, Senior Manager level<br>- Work location: < 3 miles from PCC<br>- Tenure: 2+ years (stable employment) | LinkedIn enrichment |
| **Intent Signals** | - Promotion/job change (trigger for increased spend)<br>- Colleagues joining PCC (network effect)<br>- Company team-building budget announced (Q4) | Survey, LinkedIn, observed |

**Strategic Value**:
- **Highest LTV**: $3,500-4,000 (24-month tenure, premium spend)
- **Corporate event referrals**: 40% refer at least 1 corporate event (avg $800)
- **ICP Score**: 25-30 points (Prime corporate connector)
- **Churn risk**: Medium (high expectations for court access, proximity to SPF competitor)

**Marketing Implications**:
- LinkedIn ads targeting VPs/Directors in West Loop with job title keywords
- Corporate concierge outreach using ICP scoring (prioritize 27+ point prospects)
- Referral bonus for corporate events ($100 credit)
- **Acquisition channels**: LinkedIn Ads (primary), Word-of-mouth (secondary), Corporate partnerships (emerging)

**Mezzanine Interest**:
- Hot desks: High (60% interested - work from PCC between calls)
- Strength training: Medium (40% interested)
- Yoga: Low (20% interested)
- Event space: Very High (corporate team events)

**Confidence Indicators** (for segment classification):
- **High confidence (85-100%)**: Has all 5 data signals (booking + survey + social + demographics + LinkedIn)
- **Medium confidence (65-84%)**: Has 3-4 data signals
- **Low confidence (40-64%)**: Has only 1-2 data signals (e.g., booking pattern only)

**Example Personas**:
- **Sarah Johnson** (98% confidence):
  - VP of Marketing at Salesforce (1,200 employees)
  - Lives: West Loop (0.4 mi from PCC) | Works: River North (0.8 mi from PCC)
  - Books: Tue/Thu 7pm (4.2x/week avg)
  - LinkedIn: Active, 850 connections
  - Instagram: Posts #worklifebalance content, tagged 3 colleagues
  - Brought 3 colleagues for corporate team event ($800 revenue)
  - ICP Score: 29/30 (Prime)

- **Raj Patel** (87% confidence):
  - Director of Sales at Accenture (500k+ employees globally, 400 in Chicago office)
  - Lives: Gold Coast (1.2 mi from PCC) | Works: The Loop (0.3 mi from PCC)
  - Books: Mon/Wed/Fri 6pm (3.1x/week avg)
  - $40/week café spend, $250 paddle purchase
  - No social media presence (confidence limited to booking + LinkedIn)
  - ICP Score: 27/30 (Prime)

---

**Segment 2: Social Ambassadors**

**Defining Characteristics**:
- High dwell time (2+ hours per visit)
- Rotates play partners (plays with different people)
- Attends 80%+ of member events
- Active on social media (tags PCC location)

**JTBD Archetype** *(from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md))*:
- **Context**: New to Chicago or life transition (career change, empty nester, divorce), seeking community connection
- **Struggling Moment**: "I want to make meaningful friendships in a new city but traditional socializing feels forced"
- **Desired Outcome**: Authentic friendships built through shared activity (pickleball as vehicle, not just goal)
- **Hiring Criteria**: Welcoming vibe, diverse member base, social events calendar, Instagram-worthy aesthetic
- **Competitive Alternative**: Social running clubs, boutique fitness (SoulCycle, Barry's), co-working spaces with events
- **Key Trade-offs**: Willing to book off-peak and pay premium for strong community vs. cheaper solo gym

**Behavioral Patterns** *(Multi-Source Data Signals)*:

| Signal Type | Observable Patterns | Data Source |
|-------------|-------------------|-------------|
| **Booking Behavior** | - Flexible timing (30% off-peak, 70% prime)<br>- Partner rotation (plays with 10+ different people/month)<br>- Event attendance (80%+ of leagues/socials/tournaments)<br>- High dwell time (2+ hours avg per visit) | Booking system |
| **Social Signals** | - Instagram: **High post frequency (2-3x/week)**<br>- **Location tags @pcc_chicago (80% of posts)**<br>- Hashtags: #pickleballcommunity, #chicagopickleball, #pickleballfriends<br>- **Tagged friends: 5-10 different people**<br>- Content: Group photos, post-game drinks, event highlights<br>- **Engagement: High (200+ likes/post)** | Instagram API |
| **Demographics** | - Lives in Lincoln Park, Lakeview, Wicker Park (median income $60-80k)<br>- 2-3 person household (singles or young couples)<br>- Age 25-38 (younger than Corporate segment)<br>- 50-70% bachelor's degree in census tract | Census ACS |
| **LinkedIn Signals** | - Varied employment (startups, nonprofits, freelance, creative industries)<br>- Job titles: Less seniority focus, more lifestyle flexibility<br>- Industry: Marketing, design, wellness, hospitality<br>- Remote work indicators (flexible schedules) | LinkedIn enrichment |
| **Intent Signals** | - Life transitions (new to city, job change, relationship change)<br>- Friend joining PCC (social network effect)<br>- Social media follows (started following PCC Instagram before joining) | Survey, Instagram, observed |

**Strategic Value**:
- **Highest referral rate**: 70% refer at least 1 new member (3x average)
- **Brand ambassadors**: Post on social, write reviews, word-of-mouth
- **LTV**: $2,000-2,500 (18-month tenure, moderate spend)
- **Viral coefficient**: 1.4 (each Social Ambassador brings 1.4 new members on average)
- **Churn risk**: Low (deeply embedded in community, high switching costs)

**Marketing Implications**:
- Referral program ($50 credit for referrer + referred)
- Community organizer empowerment (give tools to host events)
- User-generated content (feature Instagram posts on @pcc_chicago account)
- Instagram Reels showcasing community vibe (vs. just courts/amenities)
- **Acquisition channels**: Instagram Ads (primary), Referrals (primary), Influencer partnerships (emerging)

**Mezzanine Interest**:
- Hot desks: Low
- Strength training: Low
- Yoga: High (80% interested - wellness mindset)
- Event space: Very High (would host personal events - birthday parties, women's clinics)

**Confidence Indicators** (for segment classification):
- **High confidence (85-100%)**: Has active Instagram + high event attendance + partner rotation data
- **Medium confidence (65-84%)**: Has 2-3 data signals (e.g., event attendance + booking pattern)
- **Low confidence (40-64%)**: Has only booking pattern (flexible timing) but no social/event data

**Example Personas**:
- **Maya Rodriguez** (95% confidence):
  - Instagram influencer (5k followers), wellness niche
  - Lives: Lakeview (2.1 mi from PCC)
  - Books: Flexible (2.3x/week avg, mix of peak/off-peak)
  - Instagram: Posts 3x/week, **always tags @pcc_chicago**, hashtags #pickleballcommunity
  - **Tagged 12 different friends in last month**
  - Organized women's league (18 participants)
  - Referrals: 4 new members in 6 months
  - Segment confidence: 95% (strong social + event + booking signals)

- **Tom Anderson** (88% confidence):
  - Retired attorney (62 years old, empty nester)
  - Lives: Lincoln Park (1.5 mi from PCC)
  - Books: 2x/week (off-peak preferred, mornings)
  - Knows 40+ members by name, attends all socials
  - No social media presence (confidence boost from in-person observation + event attendance)
  - Hosts quarterly member socials at his home
  - Referrals: 3 new members (friends from law school days)
  - Segment confidence: 88% (high event + observed behavior, no social signals)

---

**Segment 3: Competitive Athletes**

**Defining Characteristics**:
- Books off-peak (6am or 10am) to avoid crowds
- Same training partners (2-3 regular partners)
- Buys premium gear ($200+ paddles)
- Tournament participation

**JTBD Archetype** *(from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md))*:
- **Context**: Transitioned from tennis/racquet sports, seeking skill mastery and competitive outlet
- **Struggling Moment**: "I need access to quality courts and skilled partners to improve my game, but most clubs are overrun with casual players during prime hours"
- **Desired Outcome**: Skill progression (move from 3.5 → 4.0 → 4.5 rating), tournament wins, measurable improvement
- **Hiring Criteria**: Court quality/availability, skilled player base, proximity to USAPA-certified coaches, tournament hosting
- **Competitive Alternative**: Tennis clubs (more established ranking system), SPF (bigger facility, more competitive players)
- **Key Trade-offs**: Willing to book inconvenient off-peak hours to avoid crowds and access serious players

**Behavioral Patterns** *(Multi-Source Data Signals)*:

| Signal Type | Observable Patterns | Data Source |
|-------------|-------------------|-------------|
| **Booking Behavior** | - **Off-peak booking (70%+ at 6-9am or 10am-12pm)**<br>- Consistent partners (2-3 regular training partners, <5 unique partners/month)<br>- Pro lesson bookings (weekly or bi-weekly)<br>- Low dwell time (1.5 hours max, court time only)<br>- Tournament participation (3-6 tournaments/year) | Booking system |
| **Social Signals** | - Instagram/TikTok: **Performance content (drills, technique videos)**<br>- Hashtags: #pickleballtournament, #pickleballdrills, #pickleballtraining<br>- **Follows pro players** (Ben Johns, Anna Leigh Waters, etc.)<br>- Low post frequency (0.5x/week) but high engagement with pickleball content<br>- **No location tags** (privacy-focused, not social networking) | Instagram, TikTok API |
| **Demographics** | - Lives in varied neighborhoods (not location-sensitive like Corporate)<br>- Median income $60-90k<br>- Age 30-50 (older than Social Ambassadors)<br>- 60%+ bachelor's degree<br>- 2-4 person household (families with school-age kids) | Census ACS |
| **LinkedIn Signals** | - Varied employment (engineering, finance, healthcare)<br>- Analytical/competitive job roles (engineers, consultants, attorneys)<br>- Work location: Not a factor (willing to commute for quality)<br>- Athletics/competition in profile interests | LinkedIn enrichment |
| **Intent Signals** | - Tournament announcements (registration triggers increased training)<br>- Pro lesson promotions (skill improvement investment)<br>- Competitor facility launches (SPF expansion = churn risk)<br>- Paddle/gear purchases (commitment signal) | Survey, purchase history, observed |

**Strategic Value**:
- **Medium-High LTV**: $2,200-2,500 (18-month tenure, gear purchases, lessons)
- **Tournament revenue**: 60% participate ($35-70 entry fees × 4 tournaments/year = $140-280/member)
- **Pro shop revenue**: $300-500/year (premium paddles, shoes, bags)
- **Lesson revenue**: $400-800/year (weekly lessons at $25/session)
- **Churn risk**: Medium (will leave if not challenged, proximity to SPF competitor with larger competitive community)

**Marketing Implications**:
- Tournament marketing ($500 prize pool attracts regional talent)
- Pro partnership (USAPA-certified coach on-site 3x/week)
- Performance tracking (skill ratings, leaderboards, match stats)
- **Acquisition channels**: USAPA tournament listings, Pickleball Brackets, Pro player endorsements
- **Retention**: Skill ladder (3.5 → 4.0 → 4.5 progression paths)

**Mezzanine Interest**:
- Hot desks: Low
- Strength training: Very High (90% interested - athlete training, injury prevention)
- Yoga: Medium (50% interested - mobility/recovery)
- Event space: Low (not interested in social events)

**Confidence Indicators** (for segment classification):
- **High confidence (85-100%)**: Has off-peak booking pattern + tournament participation + pro lesson history
- **Medium confidence (65-84%)**: Has 2 data signals (e.g., off-peak booking + same partners)
- **Low confidence (40-64%)**: Has only off-peak booking pattern (could be work schedule, not competitive intent)

**Example Personas**:
- **Alex Chen** (92% confidence):
  - Software engineer (analytical mindset)
  - Lives: Pilsen (3.2 mi from PCC, willing to commute)
  - Books: Mon/Wed/Fri 6-7:30am (3.2x/week avg, always same 2 training partners)
  - 4.5 rated player, USAPA member
  - Tournament participation: 5 tournaments/year (2 wins in 4.5 division)
  - Pro lessons: Weekly with Coach Marcus ($25/session × 40 weeks = $1,000/year)
  - Paddle purchase: $250 CRBN paddle, $120 Selkirk shoes
  - Instagram: Posts drill videos 1x/week, follows 15+ pro players
  - Segment confidence: 92% (booking + tournaments + lessons + social signals)

- **Jamie Rodriguez** (85% confidence):
  - Attorney (competitive, results-driven)
  - Lives: Evanston (7 mi from PCC, drives for quality)
  - Books: Tue/Thu 10am-12pm (2.1x/week avg, off-peak to avoid crowds)
  - 4.0 rated player, improving to 4.5
  - Travels for regional tournaments (Wisconsin, Indiana, Michigan)
  - Rarely socializes at PCC (laser-focused on improvement)
  - No social media presence (privacy-focused professional)
  - Segment confidence: 85% (booking + observed tournament travel, no social signals)

---

**Segment 4: Casual Drop-ins**

**Defining Characteristics**:
- Infrequent (<1x/week or less)
- Price-sensitive
- No social ties within member base
- Minimal amenity usage

**JTBD Archetype** *(from [Data Acquisition Strategy](../../methodology/data-acquisition-strategy.md))*:
- **Context**: Exploring pickleball for first time, or tourist/visitor with temporary need
- **Struggling Moment**: "I'm curious about pickleball but not ready to commit to a membership" OR "I'm visiting Chicago and want to stay active"
- **Desired Outcome**: Try pickleball without commitment, or one-time activity while traveling
- **Hiring Criteria**: Low friction (pay-per-visit, no membership required), convenient location (Google search proximity)
- **Competitive Alternative**: Free outdoor courts (Chicago Park District), cheaper gyms with pickleball, doing nothing
- **Key Trade-offs**: Willing to pay more for convenience vs. free outdoor courts, but unwilling to commit to membership

**Behavioral Patterns** *(Multi-Source Data Signals)*:

| Signal Type | Observable Patterns | Data Source |
|-------------|-------------------|-------------|
| **Booking Behavior** | - **Sporadic bookings (no pattern, <1x/week avg)**<br>- One-time visits (50-60% never return)<br>- **No partner bookings** (solo or brings own friend)<br>- Low dwell time (court time only, no café/lounge)<br>- Weekend/off-peak bookings (flexibility, not integrated into routine) | Booking system |
| **Social Signals** | - **No PCC-related social media activity**<br>- No location tags, no event attendance<br>- If social media presence, unrelated to pickleball (travel, food, general lifestyle)<br>- Follows general Chicago tourism accounts, not @pcc_chicago | Instagram API (absence of signal) |
| **Demographics** | - **Varied geography** (suburbs, out-of-state, international)<br>- Tourist zip codes (hotels, short-term rentals)<br>- If local: Lower-income census tracts ($40-60k median income)<br>- Age: Wide distribution (18-65+, no clear pattern) | Census ACS, booking zip code |
| **LinkedIn Signals** | - **No employer/job title provided** (optional survey fields left blank)<br>- If captured: Lower seniority roles (individual contributors, students, retired)<br>- Work location: Not relevant (not seeking convenience) | LinkedIn enrichment (limited data) |
| **Intent Signals** | - **Google search traffic** ("pickleball near me," "Chicago pickleball courts," "pickleball drop-in")<br>- Groupon/deal site referrals (price sensitivity)<br>- First-time visitor (no prior booking history)<br>- Walk-in (no advance booking) | Google Analytics, UTM tracking, observed |

**Strategic Value**:
- **Fill off-peak capacity**: Generate revenue during low-demand slots (weekday mornings, late afternoons)
- **Conversion potential**: 20% convert to members after 3+ visits (funnel metric)
- **Low LTV**: $25-75 (one-time or occasional, $25 drop-in fee × 1-3 visits)
- **Churn risk**: Very High (90% never return after first visit, no attachment or social ties)
- **Acquisition cost**: High ($15-30 via Groupon/Google Ads vs. $5-10 for referrals)

**Marketing Implications**:
- **Acquisition channels**: Groupon (primary for price-sensitive), Google Ads ("pickleball near me"), Walk-ins (secondary)
- First-time experience: Friendly onboarding, intro lesson offer ($15 add-on), court etiquette guide
- Conversion offer: "Join today, get $25 drop-in credit" (applies 3 visits to membership fee)
- **Low priority for retention**: Focus resources on converting 20% who show repeat behavior, not chasing 80% who won't return
- **Off-peak optimization**: Dynamic pricing ($18 weekday mornings vs. $25 prime time)

**Mezzanine Interest**:
- All amenities: Low (minimal engagement, not interested in hot desks, yoga, strength training)

**Confidence Indicators** (for segment classification):
- **High confidence (85-100%)**: Single visit + no social ties + no survey response + low-income zip code
- **Medium confidence (65-84%)**: 2-3 sporadic visits + no pattern + minimal data
- **Low confidence (40-64%)**: 1 visit only (could be beginning of conversion funnel to Social Ambassador)

**Conversion Monitoring** (Casual → Other Segments):
- **Watch for**: 3+ visits in 30 days (conversion signal → potential Social Ambassador or Competitive Athlete)
- **Action trigger**: Personal outreach from Christy after visit #3 (invite to intro social, offer membership discount)

**Example Personas**:
- **Tourist: David Miller** (95% confidence):
  - Visiting Chicago from Austin, TX for work conference
  - Googles "pickleball near me," books Saturday 10am drop-in
  - Lives: Austin, TX 78701 (out-of-state zip code)
  - No PCC social media connection
  - Books once, never returns (one-time visitor)
  - Revenue: $25 (single drop-in)
  - Segment confidence: 95% (clear one-time visitor pattern)

- **Beginner: Maria Gonzalez** (78% confidence):
  - New to pickleball, uncertain about commitment
  - Lives: Berwyn, IL (suburb, median income $55k)
  - Found PCC via Groupon deal ($18 drop-in)
  - Books 3 visits over 8 weeks (sporadic, no pattern)
  - No social connections at PCC, no survey response
  - **Conversion opportunity**: After visit #3, Christy offers intro social invite
  - Segment confidence: 78% (borderline Casual vs. potential convert)
  - **Outcome (after 6 months)**: Converts to membership, becomes Social Ambassador (viral coefficient validated)

---

### Appendix B: Multi-Source Data Acquisition Strategy

**Purpose**: Translates the ICP/Segment methodology into a multi-source data collection and validation strategy for high-confidence member profiling.

**Key Principle**: Customer segments are defined by JTBD (Jobs-to-Be-Done), Value Drivers, and behavioral patterns. This appendix maps those characteristics to **5 external data sources** that detect, validate, and correlate signals for precision segmentation.

---

#### B.1 Strategic Rationale: Why Multi-Source vs. Single Source?

**The Confidence Problem**:
- **Booking data alone** (single source): 40% max confidence
  - Shows *what* members do, not *why* they do it
  - Example: 2 members both book 3x/week at 7pm, but one is a fitness-focused Corporate Power User, the other is a tournament-training Competitive Athlete

- **Survey alone** (single source): 30% max confidence
  - Shows *stated* motivations, but people often misreport or have limited self-awareness
  - Example: Member claims "competitive" motivation but never books off-peak practice or lessons (aspirational vs. actual behavior)

- **Multi-source (5 sources)**: Up to 100% confidence
  - Cross-validates subjective data (survey) with objective data (booking behavior)
  - Detects contradictions (e.g., "I'm social" but zero Instagram posts)
  - Builds robust profiles resilient to data gaps (if LinkedIn missing, still have 4 sources)

**Business Impact**:
- High confidence (85%+) enables precise targeting: Corporate event outreach, referral campaigns, churn prevention
- Low confidence (<65%) flags members needing manual review or more data collection
- Contradiction detection prevents misclassification (e.g., don't invite "casual" member who's actually competitive to beginner social)

---

#### B.2 Data Source Weighting Methodology

**The 5 Sources** (weighted by trust level and availability):

| Source | Weight | Trust Level | Why This Weight? | Always Available? |
|--------|--------|-------------|------------------|-------------------|
| **Booking Behavior** | 40% | Very High | Revealed preference (objective truth of how member uses PCC) | ✓ Yes (100% coverage) |
| **Survey JTBD** | 30% | High | Direct member input on motivations and goals | No (95%+ target via incentive) |
| **Social Signals** | 15% | Medium | External validation of identity and community engagement | No (60-70% target, opt-in) |
| **Demographics** | 10% | Medium-High | Proxy indicators (income, education correlated with segments) | ✓ Yes (100% via Census tract) |
| **LinkedIn/Employer** | 5% | Medium | Firmographic context for corporate connector prioritization | No (50-60% target, manual) |

**Weighting Rationale**:

1. **Booking = 40%** (Highest): Behavior > words. What members *do* is more reliable than what they *say*.
   - Example: Member books 4x/week off-peak → Competitive Athlete, regardless of survey saying "casual player"

2. **Survey = 30%** (Second): Direct JTBD input valuable, but subjective.
   - Example: "I want fitness + networking" clearly indicates Corporate Power User motivation

3. **Social = 15%** (Third): External validation, but noisy and low coverage.
   - Example: Instagram posts with #pickleballfam validate Social Ambassador, but absence doesn't invalidate (some don't use social media)

4. **Demographics = 10%** (Fourth): Useful proxy, but not deterministic.
   - Example: High-income Census tract correlates with Corporate Power, but not all high-income people fit that segment

5. **LinkedIn = 5%** (Lowest): Narrow use case (corporate connector scoring), manual collection.
   - Example: "VP at 500-person company" boosts corporate connector score, but doesn't define segment

**Formula**:
```javascript
Segment Confidence (0-100%) =
  (Booking Match% × 0.40) +
  (Survey Match% × 0.30) +
  (Social Match% × 0.15) +
  (Demographics Match% × 0.10) +
  (LinkedIn Match% × 0.05)

// Normalized to available sources only
// If LinkedIn missing: confidence = score / 95 (not 100)
```

**Example** (Sarah Johnson - Corporate Power User):
```
Booking Match: 95% → 95 × 0.40 = 38.0 points
Survey Match:  90% → 90 × 0.30 = 27.0 points
Social Match:  80% → 80 × 0.15 = 12.0 points
Demographics:  85% → 85 × 0.10 =  8.5 points
LinkedIn Match: 100% → 100 × 0.05 =  5.0 points
────────────────────────────────────────────
Total: 90.5% confidence (High)
```

---

#### B.3 ICP Scoring Framework (Corporate Connectors)

**Purpose**: Objectively rank corporate connector prospects (0-30 points) to replace subjective "top 20" list.

**The 4 Dimensions**:

| Dimension | Points | Rationale |
|-----------|--------|-----------|
| **Company Size/Influence** | 0-10 | Larger companies = more event potential, bigger budgets |
| **Job Level/Authority** | 0-10 | C-Suite/VP = decision-making power, budget control |
| **Engagement/Loyalty** | 0-5 | High frequency = knows PCC, trusts quality |
| **Proximity/Relevance** | 0-5 | Work nearby = convenient for lunch leagues, after-work events |

**Scoring Rubric**:

**Company Size** (0-10 points):
- 500+ employees: 10 points (enterprise scale)
- 250-499: 7 points (mid-market)
- 100-249: 5 points (growth company)
- 50-99: 3 points (small business)
- <50: 1 point (startup/very small)

**Job Level** (0-10 points):
- C-Suite (CEO, CTO, CFO, CMO): 10 points (top authority)
- VP: 8 points (senior leadership)
- Director: 6 points (middle management)
- Manager: 4 points (team lead)
- Individual Contributor: 2 points (limited authority)

**Engagement** (0-5 points):
- 4+ bookings/week: 5 points (power user)
- 3-3.9/week: 4 points (regular)
- 2-2.9/week: 3 points (moderate)
- 1-1.9/week: 2 points (occasional)
- <1/week: 1 point (light user)

**Proximity** (0-5 points):
- <1 mile from PCC: 5 points (walking distance)
- 1-2 miles: 4 points (short drive/bike)
- 2-3 miles: 3 points (moderate commute)
- 3-5 miles: 2 points (longer commute)
- >5 miles: 1 point (distant)

**Tier Classification**:
- **Prime Connectors** (25-30 points): Top priority outreach, personalized pitches
- **Strong Connectors** (20-24 points): Secondary outreach, group emails
- **Potential Connectors** (15-19 points): Monitor, nurture for future growth

**Example** (Sarah Johnson):
```
Company: TechCorp (250 employees) → 7 points
Job: VP Marketing → 8 points
Engagement: 3.2 bookings/week → 4 points
Proximity: 0.6 miles from PCC → 5 points
────────────────────────────────────────
ICP Score: 24 points (Strong Connector)
```

---

#### B.4 Contradiction Detection Logic

**Purpose**: Flag when data sources contradict each other to prevent misclassification.

**Trust Hierarchy** (when sources conflict):
1. **Booking Behavior** (highest trust - objective)
2. **Survey JTBD** (high trust - direct input)
3. **Social Signals** (medium trust - external validation)
4. **Demographics** (medium trust - proxy indicator)
5. **LinkedIn** (medium trust - context)

**Common Contradictions**:

| Contradiction Type | Severity | Auto-Resolution | Example |
|--------------------|----------|-----------------|---------|
| **Behavior vs. Survey** | HIGH | Trust behavior | Survey says "casual" but books 4x/week → Reclassify as Competitive |
| **Behavior vs. Social** | HIGH | Trust behavior | Books 4x/week but Instagram says #casualplayer → Trust frequency over self-label |
| **Survey vs. Social** | MEDIUM | Reduce social weight | Survey says "social-focused" but 0 Instagram posts → Lower social signal confidence |
| **Demographics vs. Employer** | LOW | Context matters | High-income tract but tiny employer → Likely founder/exec (wealthy but small company) |
| **Distance vs. Frequency** | LOW | Flag loyalty | Lives 5+ miles but books 4x/week → High commitment despite inconvenience (boost retention score) |

**Implementation**:
- Contradictions flagged in member profile: "⚠ Survey motivation doesn't match booking behavior"
- Admin dashboard shows contradiction count: "12 members (24%) have contradictions requiring review"
- Auto-resolution applied for HIGH severity, manual review for others

---

#### B.5 Data Collection Roadmap

**Phase 1 (Weeks 1-6): Foundation Data**

**Goal**: Establish baseline segments with 70%+ confidence

**Data Sources Active**:
- ✅ Booking System (100% coverage, automated)
- 🆕 Survey (Feature 1.1 - 9 JTBD questions, target 95%+ via $10 credit incentive)
- ✅ Census Demographics (100% coverage, automated)
- 🆕 Manual LinkedIn (Top 20 corporate connectors, manual lookup)

**Confidence Calculation** (Phase 1):
```
Max Confidence = 40% (booking) + 30% (survey) + 10% (demographics) = 80%
```

**Deliverables**:
- 50 members classified with ≥70% confidence
- Corporate connector ICP scores (Top 20 identified)
- Segment confidence dashboard showing data completeness

---

**Phase 2 (Weeks 7-10): Social & External Enrichment**

**Goal**: Boost confidence to 85%+ with external validation

**Data Sources Active** (added to Phase 1):
- 🆕 Instagram/TikTok Scraping (Feature 2.4 - hashtags, post frequency, content themes)
- 🆕 LinkedIn Automation (Feature 2.5 - job changes, employer updates)
- 🆕 Google Maps Popular Times (Feature 2.6 - competitor utilization patterns)

**Confidence Boost** (Phase 2):
```
Max Confidence = 80% (Phase 1) + 15% (social) + 5% (LinkedIn) = 100%
Target: 30+ members with social data (60% coverage)
```

**Deliverables**:
- Social signal enrichment (30+ members)
- Corporate connector LinkedIn profiles updated
- Competitor proximity heatmap (SPF, Big City Pickle)
- Contradiction detection enabled (flag 10-15% of members)

---

**Phase 3 (Weeks 11-16): Advanced Correlation & Intent Monitoring**

**Goal**: Implement full multi-source confidence engine with intent signals

**Data Sources Active** (refinement of Phase 1+2):
- 🆕 Multi-Source Confidence Engine (weighted algorithm in production)
- 🆕 Intent Signal Monitoring (job changes, social advocacy spikes, competitor visits)
- 🆕 Data Quality Dashboard (coverage metrics, contradiction tracking)

**Deliverables**:
- 50 members with 90%+ confidence (all 5 sources)
- Intent signal alerts (job promotions, life events, social trends)
- Historical trend tracking ("Social data coverage up 15% this month")

---

#### B.6 Data Privacy & Collection Methods

**Privacy Principles**:
- **Public data only**: No private accounts, DMs, or non-public information
- **Opt-in incentives**: "$10 credit for connecting Instagram and posting about PCC"
- **Transparency**: Members see which data sources inform their segment assignment
- **Right to disconnect**: "Disconnect my Instagram" removes social data

**Collection Methods by Source**:

| Source | Method | Tool/API | Cost | Legal Compliance |
|--------|--------|----------|------|------------------|
| **Booking** | Automated | Booking system DB | $0 | N/A (operational data) |
| **Survey** | Manual input | Google Forms → JSON | $0 | Informed consent (survey intro) |
| **Instagram** | Scraping (opt-in) | Instagram Graph API | $0-$50/mo | Public profiles only, TOS compliant |
| **LinkedIn** | Manual lookup | Browser (public profiles) | $0 (time) | Public data, no scraping |
| **Census** | API | Census Bureau ACS API | $0 | Public data |
| **Google Maps** | API | Geocoding + Directions API | $0-$200/mo | Commercial use allowed |

**Data Retention**:
- Booking: Indefinite (operational requirement)
- Survey: Until member updates (annual re-survey prompt)
- Social: Refresh monthly (detect changes)
- Census: Refresh annually (slow-changing)
- LinkedIn: Refresh quarterly (job changes)

**Member Transparency** (Example UI):
```
Your Profile Confidence: 87% (High)

Data Sources Used:
✓ Booking History (40 points): 3.2x/week, 90% 6-9pm → Corporate Power pattern
✓ Survey Responses (27 points): "Fitness + networking" motivation
✓ Social Signals (13 points): Professional Instagram, low posting frequency
✓ Demographics (8 points): West Loop (high income, high education)
✗ LinkedIn (not available): Connect your LinkedIn for +5% confidence

[Connect Instagram] [Update Survey] [View Full Profile]
```

---

#### B.7 Cross-Reference to Implementation Specs

This strategic appendix is implemented across the specification suite:

**FUNCTIONAL_SPEC** ([FR-1.2](./FUNCTIONAL_SPEC_Customer_Intelligence.md#fr-12-segment-classification-engine)):
- `calculateSegmentConfidence()` function (pseudocode with full algorithm)
- `detectContradictions()` logic
- Multi-source weighting implementation

**TECHNICAL_SPEC** ([Data Models](./TECHNICAL_SPEC_Customer_Intelligence.md#data-models)):
- `customer-segments.json` v2.0 schema with 5-source data structure
- `segmentConfidence`, `confidenceBreakdown`, `dataSourcesAvailable` fields
- `contradictions` array for flagging conflicts

**DESIGN_SPEC**:
- [Component 7: Confidence Indicator Badge](./DESIGN_SPEC_Customer_Intelligence.md#7-confidence-indicator-badge)
- [Component 8: Data Coverage Widget](./DESIGN_SPEC_Customer_Intelligence.md#8-data-coverage-widget)

**EPICS_AND_SPRINTS**:
- Sprint 1.1: Enhanced member survey (9 JTBD questions)
- Sprint 2.4: Social signal enrichment
- Sprint 2.5: LinkedIn & employer intelligence
- Sprint 2.6: Competitive overlap analysis

---

### Appendix C: Customer Lifetime Value (CLV) Model

**Formula**:
```
CLV = (Monthly Revenue × Gross Margin × Average Tenure in Months) - Customer Acquisition Cost

For PCC:
CLV = ($149/month × 0.70 margin × tenure) - CAC
```

**Segment-Specific CLV**:

| Segment | Monthly Revenue | Margin | Tenure (months) | CAC | CLV |
|---------|----------------|--------|----------------|-----|-----|
| Corporate Power Users | $149 + $40 amenities | 0.75 | 24 | $150 | **$3,543** |
| Social Ambassadors | $149 | 0.70 | 20 | $50 | **$2,036** |
| Competitive Athletes | $149 + $25 gear | 0.72 | 18 | $100 | **$2,159** |
| Casual Drop-ins | $25/visit × 2/month | 0.60 | 6 | $30 | **$150** |

**Key Insights**:
- Corporate Power Users have 23x higher CLV than Casual Drop-ins
- Increasing tenure by 3 months = +$313 CLV (for $149 member)
- Reducing CAC by $50 = +$50 CLV (direct pass-through)

**Usage in Decision-Making**:
> "This corporate event displaces 2 Corporate Power Users (total CLV: $7,086). If churn risk increases 5%, expected loss is $354. Event revenue must exceed $354 to be profitable."

---

### Appendix D: Related Documents

**External PRDs** (for context, not part of this project):
- [PRD_Yield_Management.md](../../PRD_Yield_Management.md) - Revenue optimization, dynamic pricing (Phase 3 subset implemented here)
- [PRD_Demographics_Overlay.md](../../PRD_Demographics_Overlay.md) - Census overlay (fully implemented in Feature 1.3)

**Existing Project Documentation**:
- [README.md](../../../README.md) - Project overview
- [FUNCTIONAL_SPEC.md](../../../FUNCTIONAL_SPEC.md) - Existing dashboard functional specs
- [TECHNICAL_SPEC.md](../../../TECHNICAL_SPEC.md) - Current technical architecture
- [DESIGN_SPEC.md](../../../DESIGN_SPEC.md) - Visual design system

**Specification Suite** (this project):
- [FUNCTIONAL_SPEC_Customer_Intelligence.md](./FUNCTIONAL_SPEC_Customer_Intelligence.md) - What the system does
- [TECHNICAL_SPEC_Customer_Intelligence.md](./TECHNICAL_SPEC_Customer_Intelligence.md) - How it's built
- [DESIGN_SPEC_Customer_Intelligence.md](./DESIGN_SPEC_Customer_Intelligence.md) - UI/UX specifications
- [EPICS_AND_SPRINTS.md](./EPICS_AND_SPRINTS.md) - Work breakdown
- [PROJECT_MILESTONES.md](./PROJECT_MILESTONES.md) - Timeline and releases

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 8, 2025 | Peter Giordano | Initial draft based on transcript analysis and existing PRDs |
| 2.0 | Oct 8, 2025 | Peter Giordano | Consolidated into phased approach, added Best Practice Research (Priority 2) |
| 2.1 | Oct 9, 2025 | Peter Giordano | Integrated Appendix B (Multi-Source Data Acquisition Strategy), added Features 2.4-2.6, enhanced Features 1.1 & 1.3, updated Appendix A with data archetypes |

---

**End of Product Requirements Document**
