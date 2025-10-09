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

This PRD is part of a comprehensive specification suite:

- **PRD** (this document): Product vision, business goals, user needs
- **[Functional Spec](./FUNCTIONAL_SPEC_Customer_Intelligence.md)**: What the system should do
- **[Technical Spec](./TECHNICAL_SPEC_Customer_Intelligence.md)**: How to build it
- **[Design Spec](./DESIGN_SPEC_Customer_Intelligence.md)**: What it looks like
- **[Epics & Sprints](./EPICS_AND_SPRINTS.md)**: Work breakdown structure
- **[Project Milestones](./PROJECT_MILESTONES.md)**: Timeline and releases

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

**Description**: Create 4-segment classification model based on booking behavior and survey responses

**User Story**:
> As Christy, I want to see what % of my members are "Corporate Power Users" vs. "Social Ambassadors" vs. "Competitive Athletes" vs. "Casual Drop-ins" so that I can target marketing and programming appropriately.

**Segments** (based on existing PRD_Customer_Intelligence.md):

| Segment | Defining Characteristics | % of Base (Est.) | CLV | Strategic Value |
|---------|------------------------|------------------|-----|----------------|
| **Corporate Power Users** | Works nearby (West Loop/River North), books 3+ times/week, brings colleagues, high amenity spend | 20-25% | $3,500-4,000 | **Very High** - corporate event referrals, high revenue |
| **Social Ambassadors** | High dwell time (2+ hours), rotates partners, attends events, posts on social media | 15-20% | $2,000-2,500 | **High** - referrals, brand advocacy |
| **Competitive Athletes** | Books off-peak, same training partners, buys premium gear, tournament participation | 25-30% | $2,200-2,500 | **Medium** - stable revenue, specific needs |
| **Casual Drop-ins** | Infrequent (<1x/week), price-sensitive, no social ties | 30-40% | $150-300 | **Low** - fills capacity, low retention |

**Implementation Approach (Phase 1 - Manual)**:
1. **Survey** (Google Forms/Typeform):
   - "Why did you join PCC?" (fitness / social / competitive / convenient)
   - "What amenities interest you?" (yoga / hot desks / strength training / café)
   - "Does your company do team-building events?" (yes / no)
   - "Employer, job title, work location?" (optional)

2. **Manual Segmentation** (Google Sheets):
   - Export member list from booking system
   - Manually classify 50 "VIP" members based on:
     - Booking frequency (from system)
     - Survey responses
     - Observed behavior (anecdotal from Christy/staff)
   - Create segment assignment template

3. **Segment Profile Cards**:
   - For each segment, document:
     - Member count
     - Average booking frequency
     - Top amenities used
     - Geographic concentration (neighborhoods)
     - Example personas

**Acceptance Criteria**:
- ✅ Survey sent to 50 members, 30+ responses (60% rate)
- ✅ 50 members manually classified into 4 segments
- ✅ Segment profile cards created (1 page per segment)
- ✅ Christy can explain each segment to team

**Success Metrics**:
- Survey response rate 60%+
- Segment distribution feels accurate to Christy (validation check)
- At least 3 distinct segment characteristics identified

**Future Enhancement (Phase 2+)**: Automated clustering (k-means) on full 350-member base

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

### Feature 1.3: Demographics Overlay on Map

**Description**: Add Census tract demographic data as choropleth overlay on existing Geographic Map view

**User Story**:
> As Christy, I want to see median income, education level, and population density on the map so that I can understand what demographics surround PCC vs. competitors.

**Data Sources**:
1. **U.S. Census Bureau American Community Survey (ACS)**:
   - Median household income (by tract)
   - Educational attainment (% bachelor's degree or higher)
   - Population density (people per square mile)
   - Age distribution (optional: % 25-45 years old)

2. **TIGER/Line Shapefiles**:
   - Census tract boundaries for Cook County, IL
   - Convert to GeoJSON for web rendering

**Visualization**:
- **Choropleth map** (shaded polygons by value)
- **Color scales**:
  - Income: Red (low) → Yellow → Green (high) [$30k - $150k range]
  - Education: Red (low) → Yellow → Blue (high) [0% - 80% bachelor's+]
  - Density: White (low) → Purple (high) [0 - 20k people/sq mi]

**Interactive Controls**:
- **Toggle** (similar to existing "Show CTA Transit"):
  - ☐ Show Demographics Overlay
- **Dropdown** (select variable):
  - Median Income
  - Education Level
  - Population Density
- **Legend** (explains color scale)

**Hover Tooltip**:
```
Census Tract: 17031081800
Median Income: $87,500
Education (Bachelor's+): 62%
Population Density: 8,400 /sq mi
```

**Acceptance Criteria**:
- ✅ Census tract data for Cook County loaded (GeoJSON format)
- ✅ Choropleth renders on map with correct colors
- ✅ Toggle control functional (show/hide overlay)
- ✅ Dropdown switches between 3 demographic variables
- ✅ Legend displays current variable's color scale
- ✅ Tooltips show tract-level data on hover

**Success Metrics**:
- Christy uses overlay to compare PCC location vs. SPF location
- Team identifies 2-3 high-value neighborhoods for targeted marketing

**Implementation Details**: See [TECHNICAL_SPEC.md](./TECHNICAL_SPEC_Customer_Intelligence.md#demographics-overlay-implementation)

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

**Behavioral Patterns**:
- Prime-time dependent (90% of bookings 6-9pm weekdays)
- Consistent schedule (same days/times each week)
- Social play + networking (post-game lounge time)

**Strategic Value**:
- **Highest LTV**: $3,500-4,000 (24-month tenure, premium spend)
- **Corporate event referrals**: 40% refer at least 1 corporate event (avg $800)
- **Churn risk**: Medium (high expectations for court access)

**Marketing Implications**:
- LinkedIn ads targeting VPs/Directors in West Loop
- Corporate concierge outreach
- Referral bonus for corporate events ($100 credit)

**Mezzanine Interest**:
- Hot desks: High (60% interested - work from PCC between calls)
- Strength training: Medium (40% interested)
- Yoga: Low (20% interested)

**Example Personas**:
- Sarah: VP of Marketing at tech startup, books Tue/Thu 7pm, brought 3 colleagues for team event
- Raj: Director of Sales at consulting firm, books Mon/Wed/Fri 6pm, $40/week café spend

---

**Segment 2: Social Ambassadors**

**Defining Characteristics**:
- High dwell time (2+ hours per visit)
- Rotates play partners (plays with different people)
- Attends 80%+ of member events
- Active on social media (tags PCC location)

**Behavioral Patterns**:
- Flexible booking (off-peak friendly)
- Lounge/café usage (pre/post-game socializing)
- Event participation (leagues, tournaments, socials)

**Strategic Value**:
- **Highest referral rate**: 70% refer at least 1 new member (3x average)
- **Brand ambassadors**: Post on social, write reviews, word-of-mouth
- **Churn risk**: Low (deeply embedded in community)

**Marketing Implications**:
- Referral program ($50 credit for referrer + referred)
- Community organizer empowerment (give tools to host events)
- User-generated content (feature Instagram posts)

**Mezzanine Interest**:
- Hot desks: Low
- Strength training: Low
- Yoga: High (80% interested - wellness mindset)
- Event space: Very High (would host personal events)

**Example Personas**:
- Maya: Instagram influencer (5k followers), posts from PCC weekly, organized women's league
- Tom: Retired attorney, plays 2x/week, knows everyone, hosts quarterly socials

---

**Segment 3: Competitive Athletes**

**Defining Characteristics**:
- Books off-peak (6am or 10am) to avoid crowds
- Same training partners (2-3 regular partners)
- Buys premium gear ($200+ paddles)
- Tournament participation

**Behavioral Patterns**:
- Low socializing (focused practice)
- Pro lessons (skill improvement)
- Off-peak preference (focused environment)

**Strategic Value**:
- **Medium LTV**: $2,200-2,500 (18-month tenure, gear purchases)
- **Tournament revenue**: 60% participate ($35-70 entry fees)
- **Churn risk**: Medium (will leave if not challenged)

**Marketing Implications**:
- Tournament marketing ($500 prize pool)
- Pro partnership (USAPA-certified coach)
- Performance tracking (skill ratings, leaderboards)

**Mezzanine Interest**:
- Hot desks: Low
- Strength training: Very High (90% interested - athlete training)
- Yoga: Medium (50% interested - mobility/recovery)

**Example Personas**:
- Alex: 4.5 rated player, books Mon/Wed 6am, $250 paddle, weekly lessons
- Jamie: Tournament regular, travels for regionals, rarely socializes

---

**Segment 4: Casual Drop-ins**

**Defining Characteristics**:
- Infrequent (<1x/week or less)
- Price-sensitive
- No social ties within member base
- Minimal amenity usage

**Behavioral Patterns**:
- Court time only (no café/lounge)
- Sporadic bookings (no pattern)
- One-time or occasional visits

**Strategic Value**:
- **Fill off-peak capacity**: Generate revenue during low-demand slots
- **Conversion potential**: 20% convert to members after 3+ visits
- **Low LTV**: $25-75 (one-time or occasional)
- **Churn risk**: High (no attachment)

**Marketing Implications**:
- Acquisition: Groupon, Google Ads, walk-ins
- First-time experience: Friendly onboarding, intro lesson
- Conversion offer: "Join today, get $25 drop-in credit"

**Mezzanine Interest**:
- All amenities: Low (minimal engagement)

**Example Personas**:
- Tourist visiting Chicago, Googles "pickleball near me", books Saturday drop-in
- Beginner trying pickleball for first time, uncertain if they'll continue

---

### Appendix B: Customer Lifetime Value (CLV) Model

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

### Appendix C: Related Documents

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

---

**End of Product Requirements Document**
