# Functional Specification: PCC Yield Optimizer

**Version**: 1.0  
**Last Updated**: October 6, 2025

---

## Product Overview

**Product Name**: PCC Yield Optimizer  
**Product Type**: Competitive Intelligence & Yield Management Dashboard  
**Target Users**: CEO, Operations Manager, Marketing Director, Membership Manager

**Core Value Proposition**: Transform complex competitive and operational data into actionable strategic decisions that drive membership growth and revenue optimization while maintaining superior customer experience.

---

## Strategic Priorities

### Priority 1: Drive Membership Growth
**Goal**: Grow from 236 to 400 members  
**Key Questions**:
- Where are potential members playing instead of PCC?
- Why do they choose competitors?
- What's the optimal membership mix by tier?
- How do we capture overflow demand?

### Priority 2: Yield Optimization
**Goal**: Maximize revenue per court-hour  
**Key Questions**:
- What's the right balance between member play, non-member play, events, and instruction?
- When should we schedule high-margin activities (corporate events)?
- How do we avoid cannibalizing member satisfaction?

---

## User Personas

### Persona 1: Strategic CEO
**Name**: Alex (Investor/Owner)  
**Goals**: Maximize ROI, hit 400-member target, maintain competitive advantage  
**Pain Points**: Too much data, not enough insights; unclear trade-offs  
**Uses Tool For**: Weekly strategic review, board presentations, investor updates  
**Key Question**: "What's the single biggest opportunity this week?"

### Persona 2: Operations Manager
**Name**: Jordan  
**Goals**: Optimize scheduling, reduce costs, maintain member satisfaction  
**Pain Points**: Reactive scheduling, manual competitive research  
**Uses Tool For**: Daily scheduling decisions, maintenance planning, staffing  
**Key Question**: "When should I schedule events vs. leave courts open?"

### Persona 3: Marketing Director
**Name**: Casey  
**Goals**: Increase member acquisition, reduce churn, improve engagement  
**Pain Points**: Unclear which segments to target, when to promote  
**Uses Tool For**: Campaign planning, competitive positioning, targeting  
**Key Question**: "Which competitor's customers should I target and when?"

### Persona 4: Membership Manager
**Name**: Sam  
**Goals**: Retain members, upgrade tiers, maximize LTV  
**Pain Points**: Can't predict churn, unclear tier conversion opportunities  
**Uses Tool For**: Member health monitoring, upgrade campaigns  
**Key Question**: "Which members are at risk and why?"

---

## Dashboard Inventory

### Dashboard 1: Competitive Intelligence Center
**Purpose**: Understand competitive landscape and identify market opportunities  
**Primary User**: Strategic CEO, Marketing Director  
**Update Frequency**: Daily (Popular Times data)

### Dashboard 2: Opportunity Finder
**Purpose**: Identify specific time slots where PCC is underutilized but market has demand  
**Primary User**: Operations Manager, Marketing Director  
**Update Frequency**: Daily

### Dashboard 3: Gap Analysis Grid
**Purpose**: Quantify opportunity size and prioritize actions  
**Primary User**: Strategic CEO, Operations Manager  
**Update Frequency**: Weekly

### Dashboard 4: Member Intelligence (Future Phase)
**Purpose**: Segment analysis, churn prediction, LTV optimization  
**Primary User**: Membership Manager  
**Update Frequency**: Real-time

---

## Core Features

## Feature 1: Enhanced Multi-Facility Heatmap

### Description
Side-by-side weekly heatmaps showing utilization for PCC and all competitors, with intelligent opportunity overlays.

### User Story
**As a** Marketing Director  
**I want to** see when competitors are busy but PCC has capacity  
**So that** I can launch targeted promotions to capture overflow demand

### Functional Requirements

**1.1 Base Heatmap Rendering**
- Display 7-day (Mon-Sun) × 24-hour grid for each facility
- Color intensity represents popularity (0-100 scale)
- Color gradient: White (0) → Light Yellow (25) → Orange (50) → Light Red (75) → Deep Red (100)
- Show facility name, type (Public/Private), rating, and review count
- Grid cells sized for readability (minimum 30px × 30px)

**1.2 Opportunity Overlay System**
- Analyze each time slot to determine opportunity level
- Apply border indicators:
  - **Green border (4px)**: High opportunity (PCC <60%, competitor >80%, high segment match)
  - **Yellow border (3px)**: Medium opportunity (PCC <60%, competitor 60-80%)
  - **Red border (2px)**: Low opportunity (everyone slow or wrong segment)
  - **Blue border (3px)**: Competitive win (PCC >80%, competitors <70%)
- Display corner badge with count of busy competitors

**1.3 Interactive Tooltips**
- **Hover on any cell** to show:
  ```
  [Day] [Time]
  PCC Utilization: XX%
  
  Competitive Activity:
  🔥 SPF Chicago: XX% (PEAK)
  ⚠️  Big City Pickle: XX%
  ✅ Pickle Haus: XX%
  
  Opportunity Score: X.X/10
  Addressable Customers: ~XX
  
  Insight: [AI-generated recommendation]
  ```

**1.4 Click-Through Analysis**
- Click any cell → open detailed analysis panel
- Panel shows:
  - Line graph comparing all facilities at that hour
  - Segment analysis (WHO goes there)
  - Geographic analysis (WHERE they live)
  - Accessibility comparison (HOW they get there)
  - Recommended actions

**1.5 Filtering Controls**
- **Show only high-opportunity slots** toggle
- **Minimum opportunity score** slider (0-10)
- **Day-of-week selector** (checkboxes)
- **Time-of-day range** slider
- **Competitor selection** (multi-select)

**1.6 Export Functions**
- Export as PNG (for presentations)
- Export as CSV (raw data)
- Copy insight summary to clipboard

### Acceptance Criteria
✅ Renders all 10 facilities in < 2 seconds  
✅ Tooltips appear within 100ms of hover  
✅ Opportunity overlays update when filters change  
✅ At least 15 "high opportunity" slots identified per week  
✅ Visual quality matches reference Tableau dashboards

---

## Feature 2: Competitive Opportunity Finder

### Description
Dedicated view that highlights ONLY the time slots where PCC has capacity but competitors are busy, sorted by opportunity size.

### User Story
**As an** Operations Manager  
**I want to** see a prioritized list of our biggest missed opportunities  
**So that** I can quickly decide where to focus programming and promotions

### Functional Requirements

**2.1 Opportunity List View**
- Display sorted list (highest opportunity first)
- Each item shows:
  - Day + Time + Duration
  - Opportunity Score (0-10)
  - Estimated addressable customers
  - Which competitors are busy
  - Recommended action
- Click to expand → full analysis

**2.2 Filtering & Sorting**
- Sort by: Opportunity Score, Day, Time, Estimated Revenue
- Filter by: Day of week, Time of day, Minimum score
- Search by competitor name

**2.3 Action Triggers**
- "Create Event" button → draft event details
- "Launch Promotion" button → draft marketing email
- "Schedule Reminder" button → add to calendar
- "Dismiss" → hide from list (with undo)

**2.4 Opportunity Insights Panel**
For selected opportunity, show:
- **WHO**: Customer segment breakdown
  - "62% Social Players, 28% Competitive, 10% Families"
  - Match with PCC target segments (percentage)
- **WHERE**: Geographic heatmap
  - Density of competitor's customers by neighborhood
  - Overlap with PCC catchment area
- **HOW**: Accessibility comparison
  - Drive time comparison
  - Transit options
  - Parking availability
- **WHY**: Reasons they choose competitor
  - Survey insights
  - Competitive advantages to overcome

**2.5 Success Tracking**
- Mark opportunities as "acted upon"
- Track conversion rate (did we capture customers?)
- A/B testing framework (future)

### Acceptance Criteria
✅ Lists at least 20 opportunities per week  
✅ Sorting/filtering updates in < 200ms  
✅ Insights panel renders in < 500ms  
✅ "Estimated customers" within 20% accuracy (validated post-launch)  
✅ Action buttons generate useful draft content

---

## Feature 3: Gap Analysis Grid

### Description
Numerical comparison grid showing PCC utilization vs. market maximum, with calculated gap sizes.

### User Story
**As a** Strategic CEO  
**I want to** see exactly how much demand we're missing in each time slot  
**So that** I can quantify the revenue opportunity and prioritize investments

### Functional Requirements

**3.1 Grid Layout**
- Rows: Time slots (day + hour)
- Columns:
  1. PCC Utilization (%)
  2. Market Max (highest competitor %)
  3. Gap (difference)
  4. Opportunity Score (0-10)
  5. Est. Revenue Opportunity ($/week)
  6. Top Competitor (who's winning)

**3.2 Visual Encoding**
- Color-code Gap column:
  - Green (>40): High opportunity
  - Yellow (20-40): Medium opportunity
  - Gray (<20): Low opportunity
  - Red (negative): We're winning
- Bold the "Top Competitor" name
- $ amounts formatted with commas

**3.3 Sorting & Grouping**
- Default sort: Largest gap first
- Group by: Day of week, Time of day, Competitor
- Show/hide columns (user preference)

**3.4 Aggregate Summary**
- Total weekly opportunity: $XX,XXX
- Top 5 opportunities (quick summary)
- Average gap: XX%
- "You're winning XX% of time slots"

**3.5 Drill-Down**
- Click any row → open full analysis
- Links to heatmap view (scroll to that cell)
- Links to member data (who could we target?)

### Acceptance Criteria
✅ Renders 168 rows (24hr × 7 days) in < 1 second  
✅ Sorting is instant (< 100ms)  
✅ Revenue estimates based on validated pricing model  
✅ Export to Excel maintains formatting  
✅ Summary metrics match manual calculations

---

## Feature 4: Geographic Competitive Map

### Description
Interactive Chicago map showing all facilities, member density, transit lines, and catchment areas.

### User Story
**As a** Marketing Director  
**I want to** see where our members live relative to competitors  
**So that** I can understand geographic competitive dynamics and target specific neighborhoods

### Functional Requirements

**4.1 Base Map**
- Chicago city boundaries
- Zoom levels: 10-15 (city to neighborhood detail)
- Pan/zoom controls
- Street labels at high zoom

**4.2 Facility Markers**
- Pin for each facility
- Color-coded: PCC (blue), Competitors (red), Public courts (green)
- Size indicates court count
- Click marker → show facility details popup:
  - Name, address, rating
  - Current utilization (if real-time available)
  - Link to heatmap view

**4.3 Catchment Area Circles**
- Radius = 15-minute drive time (estimated)
- Semi-transparent fill
- Toggle on/off per facility
- Overlap analysis: "47% of SPF's catchment overlaps with PCC"

**4.4 Member Density Heatmap**
- Overlay showing where PCC members live (anonymized)
- Gradient: Blue (few) → Red (many)
- Toggle on/off
- Click area → count members in that neighborhood

**4.5 Transit Layer**
- CTA Brown/Red Line routes
- Station markers
- Click station → show facilities within walking distance

**4.6 Filtering**
- Show/hide facility types
- Filter members by tier, status, behavior
- Highlight specific competitors

**4.7 Analysis Tools**
- Measure distance tool
- Draw custom catchment area
- Export map as PNG

### Acceptance Criteria
✅ Loads and renders in < 3 seconds  
✅ Smooth panning/zooming (60 FPS)  
✅ All 10+ facilities visible without overlap  
✅ Member density accurately represents address clusters  
✅ Transit layer data is current

---

## Feature 5: Detailed Time Slot Analysis Panel

### Description
Modal/side panel that appears when clicking any time slot, showing comprehensive WHO/WHERE/HOW/WHEN analysis.

### User Story
**As an** Operations Manager  
**I want to** deeply understand why a specific time slot is an opportunity  
**So that** I can design the perfect intervention (event, promotion, pricing change)

### Functional Requirements

**5.1 Panel Layout**
- Slide-in from right (400px width)
- Close button (X) and dimmed background
- Scrollable content
- Sticky header with time slot info

**5.2 Header Section**
- Time slot: "Sunday 12:00 PM"
- PCC Utilization: 52%
- Opportunity Score: 8.7/10 (HIGH)
- Quick action buttons: "Create Event" | "Promote" | "Dismiss"

**5.3 Competitive Analysis Section**
- List of competitors at this time:
  ```
  🔥 SPF Chicago: 100% (CAPACITY)
     Est. 180 customers
     
  ⚠️  Big City Pickle: 64%
     Est. 95 customers
  ```
- Total market demand: ~275 customers
- PCC share: 18% (low)

**5.4 WHO Section (Customer Segmentation)**
- Pie chart showing segments at competitors
- Match score with PCC target: 72%
- "This is YOUR audience" indicator
- Example persona card:
  ```
  "Social Sunday Brunch Players"
  Age: 28-42
  Income: $75K+
  Values: Community, Instagram moments, convenience
  ```

**5.5 WHERE Section (Geography)**
- Mini map showing:
  - Competitor location
  - PCC location
  - Density of competitor's customers
- Statistics:
  - "68% live within 3 miles of PCC"
  - "Average drive time: 12 min to PCC, 15 min to SPF"
  - Overlap percentage

**5.6 HOW Section (Accessibility)**
- Transit options:
  - "Brown Line serves both (same line)"
  - "PCC: 12 min walk from Irving Park"
  - "SPF: 3 min walk from Armitage"
- Parking:
  - "PCC: Free lot (45 spaces)" ✅
  - "SPF: Street only ($$$)" ❌
- Bike accessibility
- Traffic conditions at this time

**5.7 WHY Section (Competitive Advantages)**
- What SPF has that you don't:
  - ✅ Full café with seating
  - ✅ "Brunch + Pickle" package
  - ✅ Social media presence
- What you could leverage:
  - ✅ Free parking (huge advantage)
  - ✅ Larger courts (better experience)
  - ✅ Less crowded (wait time <5 min)

**5.8 Recommended Actions**
- AI-generated recommendations:
  ```
  1. Launch "Sunday Social League" 11am-1pm
     - Partner with local café (HotChocolate)
     - Price: $35/person (play + coffee/pastry)
     - Target: 40 customers
     - Revenue: $1,400/week
     
  2. Instagram campaign highlighting free parking
     - Target: SPF's followers who complain about parking
     - Budget: $500
     - Expected reach: 5K
  ```
- Confidence level for each recommendation
- "Act Now" button to create event/campaign

### Acceptance Criteria
✅ Panel opens in < 300ms  
✅ All charts render smoothly  
✅ Recommendations are actionable (not generic)  
✅ Data is accurate (validated against source)  
✅ Easy to close/navigate back

---

## Feature 6: Filter & Control Panel

### Description
Persistent sidebar or top bar with all filtering and view control options.

### User Story
**As any user**  
**I want to** quickly filter the data to focus on what matters  
**So that** I'm not overwhelmed and can find insights faster

### Functional Requirements

**6.1 Date Controls**
- Current week (default)
- Date range picker
- "Compare to last week" toggle
- "Historical view" (view past data)

**6.2 Facility Selection**
- "All Facilities" checkbox (master)
- Individual checkboxes per facility
- "Only PCC vs. [competitor]" quick filters
- "Public only" / "Private only" toggles

**6.3 Day & Time Filters**
- Day of week: Mon, Tue, Wed, Thu, Fri, Sat, Sun (checkboxes)
- Time range: Slider (0:00 - 23:59)
- "Prime time only" (6-9pm weekdays, 10am-2pm weekends)
- "Off-peak only"

**6.4 Opportunity Filters**
- "Show only high-opportunity slots" toggle
- Minimum opportunity score slider (0-10)
- "Show where we're winning" toggle
- "Show market-wide slow periods" toggle

**6.5 View Controls**
- Layout: Grid | List | Map
- Color scheme: Default | Colorblind-friendly
- Text size: Small | Medium | Large
- "Export current view" dropdown (PNG, CSV, PDF)

**6.6 Saved Presets**
- "Save current filters" button
- Named presets:
  - "Weekend Opportunities"
  - "Weekday Prime Time"
  - "Public Courts Only"
- Load preset from dropdown

**6.7 Reset & Clear**
- "Clear all filters" button
- Confirmation dialog if filters are complex

### Acceptance Criteria
✅ All filters apply in < 200ms  
✅ Filter state persists across page reloads (localStorage)  
✅ "Clear all" resets to intelligent defaults  
✅ Presets are easy to create and manage  
✅ Filters are visually distinct (active vs. inactive)

---

## Feature 7: Insights & Recommendations Engine

### Description
AI-generated strategic recommendations based on pattern analysis across all data.

### User Story
**As a** Strategic CEO  
**I want to** receive proactive strategic recommendations  
**So that** I don't miss opportunities and stay ahead of competition

### Functional Requirements

**7.1 Insight Categories**
- **High-Priority Opportunities**: Time slots to target immediately
- **Competitive Threats**: Where you're losing ground
- **Operational Efficiencies**: When to schedule maintenance, reduce staff
- **Pricing Opportunities**: Time slots for dynamic pricing
- **Member Retention Risks**: Patterns indicating churn

**7.2 Insight Card Format**
```
[Icon] [Category Badge]
[Headline - action-oriented]

Context: [1-2 sentences explaining the pattern]
Impact: $X,XXX/week potential
Confidence: High | Medium | Low

[Primary Action Button]
[Secondary: "Learn More" | "Dismiss"]
```

**7.3 Prioritization Logic**
- Sort by: Impact (revenue) × Confidence × Urgency
- Urgency factors:
  - Time-sensitive (event approaching)
  - Competitive pressure (competitor launching similar)
  - Member churn risk
- Limit to top 5 insights to avoid overwhelm

**7.4 Recommendation Examples**
```
🎯 OPPORTUNITY: Capture Sunday Brunch Crowd
Context: SPF at capacity 11am-1pm every Sunday. 
68% of their customers live near PCC. You have 48% 
unutilized capacity.

Impact: $5,600/month
Confidence: High

[Launch Sunday Social League]
```

```
⚠️ THREAT: Losing Thursday Competitive Players
Context: Big City Pickle launched Thursday 
tournament night. Your utilization dropped from 
97% to 78% past 3 weeks.

Impact: -$1,200/month
Confidence: High

[Counter with Elite League]
```

**7.5 Action Tracking**
- Mark as "acted upon"
- Track outcome (did revenue increase?)
- Learn from successes/failures (future ML)

**7.6 Insight History**
- Archive of past recommendations
- Success rate dashboard
- "Ignored insights that were right" (humbling reminder)

### Acceptance Criteria
✅ Generates at least 3 actionable insights per week  
✅ 80%+ of "high confidence" insights are valid (user feedback)  
✅ Insights are specific (not generic advice)  
✅ Action buttons lead to useful next steps  
✅ System learns from feedback (future enhancement)

---

## Non-Functional Requirements

### Performance
- Initial load: < 2 seconds (on typical WiFi)
- Filter/interaction: < 200ms
- Map render: < 3 seconds
- No janky scrolling (60 FPS)

### Usability
- Zero training required (intuitive design)
- Accessible (WCAG 2.1 AA compliance)
- Keyboard navigation support
- Mobile-responsive (tablet minimum)

### Reliability
- Graceful degradation if data missing
- Clear error messages
- No crashes during demo

### Maintainability
- Modular code (easy to update)
- Well-commented
- Consistent naming conventions

---

## Out of Scope (Future Phases)

### Not in Initial Demo
- ❌ Real-time data integration (use static JSON)
- ❌ User authentication (single-user demo)
- ❌ Database backend (JSON files only)
- ❌ Email/SMS notifications
- ❌ Mobile native apps
- ❌ Multi-language support
- ❌ A/B testing framework
- ❌ Machine learning models
- ❌ Member portal integration

### Future Roadmap
- **Phase 2**: Live data integration, API connections
- **Phase 3**: Member health dashboard, churn prediction
- **Phase 4**: Automated marketing campaigns
- **Phase 5**: Revenue forecasting, capacity planning AI

---

## Success Metrics

### Demo Success
- ✅ Investors can interact without guidance
- ✅ Generates at least 3 "aha!" moments
- ✅ No bugs during presentation
- ✅ Questions like "when can we have this live?"

### Business Impact (Post-Launch)
- Membership growth: +40% in 6 months
- Revenue per court-hour: +15%
- Member NPS: Maintained at 92+
- Time to identify opportunities: 30min → 5min

---

**End of Functional Specification**