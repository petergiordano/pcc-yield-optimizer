# Epics & Sprints: Strategic Yield Optimization Using Popular Times Data

**Project**: PCC Yield Optimizer - Strategic Yield Optimization Module
**Version**: 1.0
**Last Updated**: October 20, 2025

**Audience**: Developers, Sprint Planners
**Purpose**: Detailed work breakdown with user stories, tasks, acceptance criteria, and effort estimates

---

## 📖 Document Organization

This is part of a 5-document specification suite. Read in this order:

1. **[PRD](./PRD_Strategic_Yield_Optimization.md)** - Product vision, business goals, user needs
2. **[Functional Spec](./FUNCTIONAL_SPEC_Strategic_Yield_Optimization.md)** - What the system should do (functional requirements)
3. **[Technical Spec](./TECHNICAL_SPEC_Strategic_Yield_Optimization.md)** - How to build it (technical architecture)
4. **[Design Spec](./DESIGN_SPEC_Strategic_Yield_Optimization.md)** - UI/UX specifications (design system)
5. **Epics & Sprints** (this document) - Developer work breakdown (user stories, tasks, sprint planning)

**When to Use This Document**:
- Sprint planning sessions
- Daily standups (task tracking)
- User story refinement
- Effort estimation
- Acceptance criteria validation

**How This Differs from Other Specs**:
- PRD/Functional/Technical/Design = **WHAT** to build
- Epics & Sprints = **HOW** to break down the work + **WHO** does it + **WHEN** (sprint order)

---

## ⏱️ Project Timeline Summary

**Total Duration**: 10 weeks (November 4, 2025 - January 12, 2026)

```
Sprint 1: Session Duration Analysis     [Weeks 1-3]  ████████████░░░░░░░░░░░░░░░░
Sprint 2: Opportunity Identification    [Weeks 4-6]  ░░░░░░░░░░░░████████████░░░░
Sprint 3: Scenario Modeling             [Weeks 7-10] ░░░░░░░░░░░░░░░░░░░░████████████
```

**Major Deliverables**:
- Week 3: Session duration benchmarking live
- Week 6: Opportunity scoring dashboard live
- Week 10: Full scenario modeling tool live

---

## Epic Overview

| Epic # | Epic Name | Priority | Duration | Dependencies |
|--------|-----------|----------|----------|--------------|
| **1** | Session Duration Analysis | P0 | 3 weeks | Python data pipeline |
| **2** | Opportunity Scoring Dashboard | P0 | 3 weeks | Epic 1 complete |
| **3** | Scenario Modeling Tool | P1 | 4 weeks | Epic 1 complete |

**Total Duration**: 10 weeks (3 sprints)

---

## EPIC 1: Session Duration Analysis

**Goal**: Display competitor session durations and turnover rates

**Business Value**: $15-30k annual revenue from optimized booking blocks

**Duration**: 3 weeks (Sprint 1)

**Owner**: Peter (developer)

---

### Sprint 1.1: Data Pipeline Setup (Week 1)

**Goal**: Build Python script to process popular times data into yield analytics

#### User Stories

**US-1.1.1: Create Yield Analysis Data Model**
- **Story**: As Peter, I want to define the data structure for yield analytics so that frontend can consume it easily
- **Tasks**:
  - Define JSON schema for yield-analysis.json (see Technical Spec Data Models)
  - Document expected fields: sessionDuration, turnover, opportunityScores
  - Add validation for required fields
  - Create example JSON with 2 facilities for testing
- **Acceptance Criteria**:
  - ✅ JSON schema documented in technical spec
  - ✅ All required fields defined (sessionDuration, sessionsPerDay, opportunityScore)
  - ✅ Example JSON validates correctly
  - ✅ Data structure supports 7 facilities + 168 hours of opportunities
- **Effort**: 3 story points
- **Owner**: Peter

**US-1.1.2: Build process_yield_data.py Script**
- **Story**: As Peter, I want a Python script that calculates turnover and opportunity scores from raw popular times data
- **Tasks**:
  - Create process_yield_data.py in maps-populartimes repo
  - Implement extract_session_duration() function
  - Implement calculate_sessions_per_day() function
  - Implement calculate_opportunity_score() function
  - Load facilities.json and popular-times/*.json files
  - Generate yield-analysis.json output
  - Add unit tests for all calculation functions
- **Acceptance Criteria**:
  - ✅ Script runs without errors
  - ✅ Reads all 7 facility JSON files correctly
  - ✅ Calculates session durations accurately (matches manual calculation)
  - ✅ Calculates sessions/day correctly (operating_hours / session_duration)
  - ✅ Generates valid yield-analysis.json (validates against schema)
  - ✅ Unit tests pass with 100% coverage on calculation functions
- **Effort**: 8 story points
- **Owner**: Peter

**US-1.1.3: Test Data Pipeline End-to-End**
- **Story**: As Peter, I want to verify the complete data pipeline works from raw data to processed output
- **Tasks**:
  - Run batch_popular_times.py to fetch latest data (weekly refresh)
  - Run process_yield_data.py to generate yield-analysis.json
  - Manually verify output:
    - SPF Chicago: 2.5 hrs, 6.4 sessions/day ✓
    - Union Park: 4.0 hrs, 4.0 sessions/day ✓
    - PCC: 2.0 hrs, 6.5 sessions/day ✓
  - Copy yield-analysis.json to pcc-yield-optimizer/data/
  - Commit to Git
- **Acceptance Criteria**:
  - ✅ Fresh data fetched from Google Maps API
  - ✅ yield-analysis.json generated successfully
  - ✅ Manual verification confirms accuracy
  - ✅ File committed to pcc-yield-optimizer repo
  - ✅ Data size <100KB (performance requirement)
- **Effort**: 3 story points
- **Owner**: Peter

---

### Sprint 1.2: Session Duration Visualization (Week 2)

**Goal**: Build session duration benchmarking chart and turnover table

#### User Stories

**US-1.2.1: Create Session Duration Bar Chart Component**
- **Story**: As Christy, I want to see a bar chart comparing session durations so that I can benchmark PCC against competitors
- **Tasks**:
  - Create js/components/session-duration-chart.js
  - Implement D3.js horizontal bar chart
  - Load data from yield-analysis.json
  - Sort facilities by session duration (longest first)
  - Color bars by efficiency (green/blue/yellow/red)
  - Add industry average dashed line
  - Add PCC target line with star icon
  - Style with CSS from design spec
- **Acceptance Criteria**:
  - ✅ Chart renders all 7 facilities
  - ✅ Bars sorted longest to shortest
  - ✅ Colors match design spec (red ≥4hrs, yellow 3hrs, blue 2.5hrs, green ≤2hrs)
  - ✅ Industry average line visible
  - ✅ PCC highlighted with star icon
  - ✅ Chart responsive (width adapts to container)
  - ✅ Loads in <1 second
- **Effort**: 5 story points
- **Owner**: Peter

**US-1.2.2: Add Hover Tooltips**
- **Story**: As Christy, I want to hover over bars to see detailed facility info
- **Tasks**:
  - Implement tooltip using Tippy.js (existing dependency)
  - Show on bar hover:
    - Facility name
    - Session duration (hours + minutes)
    - Operating hours per day
    - Sessions per day
    - Total daily capacity
  - Position tooltip above/beside cursor
  - Hide tooltip on mouse leave
- **Acceptance Criteria**:
  - ✅ Tooltip appears within 100ms of hover
  - ✅ All data fields displayed correctly
  - ✅ Tooltip follows cursor
  - ✅ Tooltip styled per design spec
  - ✅ Accessible (aria-label on bars)
- **Effort**: 3 story points
- **Owner**: Peter

**US-1.2.3: Build Turnover Analysis Table**
- **Story**: As Christy, I want to see a detailed table of turnover metrics for all competitors
- **Tasks**:
  - Create js/components/turnover-calculator.js
  - Build HTML table with columns:
    - Rank, Facility, Courts, Operating Hours, Session Duration, Sessions/Day, Total Capacity, Efficiency
  - Load data from yield-analysis.json
  - Calculate and display all metrics
  - Add efficiency badges (green/blue/yellow/red)
  - Highlight PCC row (light blue background)
  - Default sort: sessions/day descending
- **Acceptance Criteria**:
  - ✅ Table displays all 7 facilities
  - ✅ All columns populated correctly
  - ✅ PCC row highlighted
  - ✅ Efficiency badges color-coded
  - ✅ Default sort correct (best turnover first)
  - ✅ Table styled per design spec
- **Effort**: 5 story points
- **Owner**: Peter

**US-1.2.4: Implement Column Sorting**
- **Story**: As Christy, I want to sort the table by clicking column headers
- **Tasks**:
  - Add click handlers to column headers
  - Implement sort logic (ascending/descending toggle)
  - Update sort indicator (arrow icon ↑↓)
  - Highlight sorted column header
  - Enable sorting on: Rank, Sessions/Day, Total Capacity, Session Duration
  - Persist sort state during session
- **Acceptance Criteria**:
  - ✅ Click header: sort descending
  - ✅ Click again: sort ascending
  - ✅ Arrow icon indicates direction
  - ✅ Sorted column highlighted (blue text)
  - ✅ Sort works on all specified columns
  - ✅ Keyboard accessible (Enter key activates)
- **Effort**: 3 story points
- **Owner**: Peter

---

### Sprint 1.3: Filtering & Polish (Week 3)

**Goal**: Add facility filters and finalize Sprint 1 deliverables

#### User Stories

**US-1.3.1: Create Sidebar Filters**
- **Story**: As Christy, I want to filter facilities by type and individually select/deselect them
- **Tasks**:
  - Build sidebar component (280px fixed width)
  - Add "Facility Type" radio buttons (All / Private / Public)
  - Add individual facility checkboxes
  - Implement filter logic (update all visualizations on change)
  - Add "Select All" / "Deselect All" shortcuts
  - Prevent deselecting last facility (disable checkbox)
  - Style sidebar per design spec
- **Acceptance Criteria**:
  - ✅ Sidebar visible on left side (280px)
  - ✅ Facility type filter works (All/Private/Public)
  - ✅ Individual checkboxes work for each facility
  - ✅ "Select All" selects all facilities
  - ✅ Cannot deselect last facility (disabled + tooltip)
  - ✅ Filters apply to both chart and table simultaneously
  - ✅ Sticky sidebar (scrolls with page)
- **Effort**: 5 story points
- **Owner**: Peter

**US-1.3.2: Display Key Metrics Cards**
- **Story**: As Christy, I want to see summary metrics at the top of the dashboard
- **Tasks**:
  - Create 4 metric cards above main content:
    - Industry Average Session (2.6 hrs)
    - PCC Target Session (2.0 hrs, 6.5 sessions/day)
    - Best Turnover (Big City Pickle: 7.5 sessions/day)
    - Worst Turnover (Union Park: 4.0 sessions/day)
  - Style cards per design spec (white background, borders)
  - Add icons (📊 chart, 🎯 target, ✅ best, ⚠️ worst)
  - Update dynamically based on filtered facilities
- **Acceptance Criteria**:
  - ✅ 4 cards displayed in row
  - ✅ Metrics calculated correctly
  - ✅ Icons displayed
  - ✅ Cards responsive (stack on smaller screens)
  - ✅ Metrics update when filters change
- **Effort**: 3 story points
- **Owner**: Peter

**US-1.3.3: Add Data Loading States**
- **Story**: As Peter, I want to show loading skeletons while data fetches
- **Tasks**:
  - Create loading skeleton components (shimmer effect)
  - Show skeleton for chart (3 bars pulsing)
  - Show skeleton for table (5 rows pulsing)
  - Display loading spinner in center of screen on initial load
  - Add "Last Updated" timestamp in footer
  - Handle fetch errors gracefully (show error message + retry button)
- **Acceptance Criteria**:
  - ✅ Loading skeletons visible while fetching
  - ✅ Shimmer animation smooth (CSS animation)
  - ✅ Error handling shows friendly message
  - ✅ "Retry" button re-fetches data
  - ✅ "Last Updated" timestamp displays correctly
  - ✅ No JavaScript errors if fetch fails
- **Effort**: 3 story points
- **Owner**: Peter

**US-1.3.4: Sprint 1 Integration Testing & Bug Fixes**
- **Story**: As Peter, I want to test Sprint 1 features end-to-end and fix bugs
- **Tasks**:
  - Manual testing checklist:
    - [ ] Chart renders correctly on page load
    - [ ] Tooltips work on all bars
    - [ ] Table displays all data correctly
    - [ ] Column sorting works
    - [ ] Facility type filter works
    - [ ] Individual facility checkboxes work
    - [ ] Metric cards update correctly
    - [ ] Loading states display
    - [ ] Error handling works
  - Browser testing (Chrome, Safari, Firefox)
  - Fix any bugs found
  - Responsive testing (1280px, 1440px, 1920px)
  - Accessibility audit (keyboard nav, screen reader)
- **Acceptance Criteria**:
  - ✅ All manual tests pass
  - ✅ No console errors
  - ✅ Works in Chrome 90+, Safari 14+, Firefox 88+
  - ✅ Keyboard navigation works
  - ✅ Screen reader announces chart data
  - ✅ Page loads in <2 seconds
- **Effort**: 5 story points
- **Owner**: Peter

**US-1.3.5: Deploy Sprint 1 to Vercel**
- **Story**: As Christy, I want to access the dashboard online to review progress
- **Tasks**:
  - Commit all Sprint 1 code to GitHub
  - Push to main branch
  - Vercel auto-deploys (verify deployment successful)
  - Test live site at pcc-yield-optimizer.vercel.app
  - Share link with Christy for feedback
- **Acceptance Criteria**:
  - ✅ Code committed and pushed
  - ✅ Vercel deployment successful
  - ✅ Live site works (all features functional)
  - ✅ Link shared with Christy
  - ✅ Feedback collected
- **Effort**: 2 story points
- **Owner**: Peter

---

## EPIC 2: Opportunity Scoring Dashboard

**Goal**: Identify and rank time slots where PCC can gain market share

**Business Value**: $30-50k annual revenue from targeting high-opportunity time slots

**Duration**: 3 weeks (Sprint 2)

**Owner**: Peter (developer)

---

### Sprint 2.1: Opportunity Score Calculation (Week 4)

**Goal**: Calculate opportunity scores for all 168 hours of the week

#### User Stories

**US-2.1.1: Extend process_yield_data.py with Opportunity Scoring**
- **Story**: As Peter, I want to calculate opportunity scores for every hour of every day for each competitor
- **Tasks**:
  - Add calculate_opportunity_score() function to process_yield_data.py
  - Loop through all 7 days × 24 hours = 168 hours per facility
  - Calculate score for each hour: `popularity × (competitor_session / pcc_session)`
  - Aggregate all opportunities (6 competitors × 168 hours = 1,008 data points)
  - Sort by score (descending)
  - Add top 10 opportunities to yield-analysis.json
  - Add full 168-hour list to separate opportunities.json (optional)
- **Acceptance Criteria**:
  - ✅ Scores calculated for all 168 hours per competitor
  - ✅ Scores exclude hours where popularity = 0
  - ✅ Top 10 opportunities included in yield-analysis.json
  - ✅ Manual verification: Union Park Thu 8pm = 200 (100 × 4.0 / 2.0)
  - ✅ Unit tests pass for opportunity calculation
- **Effort**: 5 story points
- **Owner**: Peter

**US-2.1.2: Add Revenue Estimation**
- **Story**: As Christy, I want to see estimated monthly revenue for each opportunity
- **Tasks**:
  - Add estimateRevenue() function to process_yield_data.py
  - Formula:
    ```
    sessions_per_week = (opportunity_score / 100) × 10
    pcc_captured = sessions_per_week × 0.20  # 20% capture rate
    monthly_revenue = pcc_captured × $25 × 4 weeks
    ```
  - Calculate for all opportunities
  - Add estimatedRevenue field to opportunity objects
  - Sum total revenue for top 10
- **Acceptance Criteria**:
  - ✅ Revenue calculated for all opportunities
  - ✅ Formula documented in code comments
  - ✅ Capture rate configurable (default 20%)
  - ✅ Session price configurable (default $25)
  - ✅ Total revenue for top 10 calculated
  - ✅ Manual verification: Score 200 → ~$1,000/month
- **Effort**: 3 story points
- **Owner**: Peter

**US-2.1.3: Regenerate yield-analysis.json with Opportunities**
- **Story**: As Peter, I want to regenerate the data file with opportunity scores
- **Tasks**:
  - Run updated process_yield_data.py
  - Verify output structure includes opportunities
  - Copy to pcc-yield-optimizer/data/
  - Commit to Git
  - Validate JSON structure
- **Acceptance Criteria**:
  - ✅ yield-analysis.json includes opportunities section
  - ✅ Top 10 opportunities present
  - ✅ All fields populated correctly
  - ✅ File size <150KB
  - ✅ JSON validates
- **Effort**: 2 story points
- **Owner**: Peter

---

### Sprint 2.2: Opportunity Table Visualization (Week 5)

**Goal**: Display ranked opportunities in sortable table

#### User Stories

**US-2.2.1: Build Top 10 Opportunities Table**
- **Story**: As Christy, I want to see the top 10 opportunities ranked by score
- **Tasks**:
  - Create js/components/opportunity-scorer.js
  - Build HTML table with columns:
    - Rank, Day, Hour, Facility, Popularity, Session Duration, Score, Est Revenue
  - Load data from yield-analysis.json opportunityScores.topOpportunities
  - Color-code opportunity scores:
    - High (>150): Red badge
    - Medium (100-150): Yellow badge
    - Low (<100): Green badge
  - Format revenue as currency ($1,000)
  - Add total potential revenue row at bottom
- **Acceptance Criteria**:
  - ✅ Top 10 opportunities displayed
  - ✅ Sorted by score (highest first)
  - ✅ All columns populated correctly
  - ✅ Opportunity score badges color-coded
  - ✅ Revenue formatted as currency
  - ✅ Total revenue summed correctly
- **Effort**: 5 story points
- **Owner**: Peter

**US-2.2.2: Add Day-of-Week Filter**
- **Story**: As Christy, I want to filter opportunities by day of week
- **Tasks**:
  - Add day-of-week checkboxes to sidebar
  - Implement filter logic (filter opportunities array)
  - Re-rank top 10 based on filtered data
  - Recalculate total revenue
  - Show "Showing opportunities for: Mon, Wed, Fri" label
  - Allow "Select All Days" / "Deselect All Days"
- **Acceptance Criteria**:
  - ✅ Day checkboxes work (Mon-Sun)
  - ✅ Filter applies immediately
  - ✅ Top 10 re-ranks correctly
  - ✅ Total revenue recalculated
  - ✅ Label shows selected days
  - ✅ "Select All" / "Deselect All" shortcuts work
- **Effort**: 4 story points
- **Owner**: Peter

**US-2.2.3: Implement "View All 168" Expansion**
- **Story**: As Christy, I want to see all 168 hours ranked (not just top 10)
- **Tasks**:
  - Add "View All 168" button below table
  - Expand table to show all opportunities (score > 0)
  - Implement pagination (20 rows per page)
  - Add pagination controls (Previous, 1, 2, 3, ..., Next)
  - Add search filter (by facility name)
  - Add "Back to Top 10" button
- **Acceptance Criteria**:
  - ✅ "View All 168" button expands table
  - ✅ Pagination shows 20 rows per page
  - ✅ Pagination controls work
  - ✅ Search filter works (real-time)
  - ✅ "Back to Top 10" collapses table
  - ✅ Expansion state persists during session
- **Effort**: 5 story points
- **Owner**: Peter

---

### Sprint 2.3: Time Range Filters & Polish (Week 6)

**Goal**: Add time-of-day filtering and finalize Sprint 2

#### User Stories

**US-2.3.1: Add Time Range Filter**
- **Story**: As Christy, I want to filter opportunities by time of day (e.g., peak hours 5-9pm)
- **Tasks**:
  - Add time range dropdown to sidebar:
    - "All Day" (default)
    - "Morning (6am-12pm)"
    - "Afternoon (12pm-5pm)"
    - "Evening (5pm-9pm)"
    - "Custom Range" (hour picker start-end)
  - Implement filter logic
  - Re-rank opportunities based on time range
  - Update label: "Showing Evening (5pm-9pm) opportunities"
- **Acceptance Criteria**:
  - ✅ Time range dropdown works
  - ✅ Predefined ranges filter correctly
  - ✅ Custom range picker works (start/end hour)
  - ✅ Opportunities re-ranked
  - ✅ Label displays selected range
- **Effort**: 4 story points
- **Owner**: Peter

**US-2.3.2: Add Opportunity Details Modal**
- **Story**: As Christy, I want to click on an opportunity row to see more details
- **Tasks**:
  - Add click handler to table rows
  - Create modal dialog component
  - Show in modal:
    - Opportunity summary (day, hour, facility, score)
    - Competitor popular times chart for that day
    - Session duration comparison (competitor vs PCC)
    - Revenue opportunity breakdown
    - "Target with Marketing" action button (future integration)
  - Style modal per design spec
  - Close on ESC key or click outside
- **Acceptance Criteria**:
  - ✅ Click row opens modal
  - ✅ Modal displays all data correctly
  - ✅ Popular times mini-chart shows competitor's Thursday pattern
  - ✅ Modal keyboard accessible
  - ✅ Close mechanisms work (X button, ESC, click outside)
- **Effort**: 5 story points
- **Owner**: Peter

**US-2.3.3: Integrate Opportunities with Session Duration Chart**
- **Story**: As Christy, I want to click a facility in the session duration chart and see its top opportunities
- **Tasks**:
  - Add click handler to session duration chart bars
  - Filter opportunity table to show only clicked facility
  - Highlight clicked bar
  - Show "Showing opportunities for: SPF Chicago" label
  - Add "Clear Filter" button to return to all facilities
- **Acceptance Criteria**:
  - ✅ Click bar filters opportunity table
  - ✅ Clicked bar highlighted (border + shadow)
  - ✅ Label shows filtered facility
  - ✅ "Clear Filter" button works
  - ✅ Filter persists until cleared
- **Effort**: 3 story points
- **Owner**: Peter

**US-2.3.4: Sprint 2 Integration Testing & Bug Fixes**
- **Story**: As Peter, I want to test Sprint 2 features end-to-end
- **Tasks**:
  - Manual testing checklist:
    - [ ] Opportunity scores calculated correctly
    - [ ] Top 10 table displays
    - [ ] Day filter works
    - [ ] Time range filter works
    - [ ] "View All 168" expansion works
    - [ ] Pagination works
    - [ ] Opportunity modal works
    - [ ] Chart-to-table integration works
  - Cross-browser testing
  - Accessibility audit
  - Fix bugs
- **Acceptance Criteria**:
  - ✅ All manual tests pass
  - ✅ No console errors
  - ✅ Works in all supported browsers
  - ✅ Keyboard navigation works
  - ✅ Performance acceptable (<2 second load)
- **Effort**: 5 story points
- **Owner**: Peter

**US-2.3.5: Deploy Sprint 2 to Vercel**
- **Story**: As Christy, I want to review Sprint 2 features live
- **Tasks**:
  - Commit Sprint 2 code
  - Push to main
  - Verify Vercel deployment
  - Test live site
  - Share with Christy for feedback
- **Acceptance Criteria**:
  - ✅ Deployment successful
  - ✅ All Sprint 2 features work live
  - ✅ Link shared with Christy
  - ✅ Feedback collected
- **Effort**: 2 story points
- **Owner**: Peter

---

## EPIC 3: Scenario Modeling Tool

**Goal**: Interactive tool to model revenue impact of different booking block sizes

**Business Value**: Data-driven decision making on booking structure ($50-80k revenue impact)

**Duration**: 4 weeks (Sprint 3)

**Owner**: Peter (developer)

---

### Sprint 3.1: Scenario Modeler Foundation (Week 7)

**Goal**: Build interactive slider and basic calculations

#### User Stories

**US-3.1.1: Create Scenario Modeler Component**
- **Story**: As Christy, I want to test different session lengths and see impact immediately
- **Tasks**:
  - Create js/components/scenario-modeler.js
  - Build two-panel layout: Current Setup vs Test Scenario
  - Create HTML structure per design spec
  - Load PCC baseline data (2.0 hrs, 13 hrs/day, 7 courts)
  - Display current metrics:
    - Sessions/court/day: 6.5
    - Total sessions/day: 45.5
    - Monthly capacity: 1,365
    - Monthly revenue: $34,125 @ $25/session
- **Acceptance Criteria**:
  - ✅ Component renders below opportunity table
  - ✅ Two panels side-by-side (grid layout)
  - ✅ Current setup panel populated with baseline data
  - ✅ Test scenario panel ready for input
  - ✅ Styled per design spec (border, padding, shadows)
- **Effort**: 4 story points
- **Owner**: Peter

**US-3.1.2: Build Interactive Slider**
- **Story**: As Christy, I want to drag a slider to adjust session length
- **Tasks**:
  - Create HTML range input slider (1.0 - 4.0 hours)
  - Style slider per design spec (gradient background green→yellow→red)
  - Set step increment: 0.5 hours
  - Add value label above slider (shows current selection)
  - Implement onChange handler (debounced 300ms)
  - Update test scenario panel when slider changes
- **Acceptance Criteria**:
  - ✅ Slider range: 1.0 - 4.0 hours
  - ✅ Increments: 0.5 hours (1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0)
  - ✅ Gradient background visible
  - ✅ Value label updates on drag
  - ✅ Debounce works (smooth dragging)
  - ✅ Keyboard accessible (arrow keys adjust)
- **Effort**: 4 story points
- **Owner**: Peter

**US-3.1.3: Implement Scenario Calculations**
- **Story**: As Peter, I want to recalculate all metrics when slider changes
- **Tasks**:
  - Create calculateScenario() function:
    ```javascript
    function calculateScenario(sessionHours) {
      const sessionsPerDay = 13 / sessionHours;
      const totalSessionsDay = sessionsPerDay * 7;
      const monthlyCapacity = totalSessionsDay * 30;
      const monthlyRevenue = monthlyCapacity * 25;
      return { sessionsPerDay, totalSessionsDay, monthlyCapacity, monthlyRevenue };
    }
    ```
  - Update test scenario panel with calculated values
  - Format numbers (1 decimal for sessions, currency for revenue)
- **Acceptance Criteria**:
  - ✅ Calculation accurate (matches manual calculation)
  - ✅ Updates in real-time (<300ms after drag)
  - ✅ Numbers formatted correctly
  - ✅ No rounding errors
- **Effort**: 3 story points
- **Owner**: Peter

---

### Sprint 3.2: Impact Analysis & Insights (Week 8)

**Goal**: Show quantified impact and qualitative insights

#### User Stories

**US-3.2.1: Build Impact Analysis Panel**
- **Story**: As Christy, I want to see the difference between current and test scenarios
- **Tasks**:
  - Create impact analysis section below scenario panels
  - Calculate differences:
    - Capacity change (sessions + %)
    - Revenue change ($ + $ annual)
    - Sessions/day change
  - Display with icons: 📊 Capacity, 💰 Revenue, ⏱️ Session Density
  - Color-code: Green for increases, red for decreases
  - Style panel per design spec (yellow background, yellow border)
- **Acceptance Criteria**:
  - ✅ Impact section displays below scenario panels
  - ✅ All 3 metrics calculated correctly
  - ✅ Positive changes shown in green
  - ✅ Negative changes shown in red
  - ✅ Percentage changes included
  - ✅ Annual revenue projection shown
- **Effort**: 4 story points
- **Owner**: Peter

**US-3.2.2: Add Contextual Risks and Opportunities**
- **Story**: As Christy, I want to see qualitative risks and opportunities for each scenario
- **Tasks**:
  - Implement business rules (see Functional Spec FR-4.3)
  - Display risks with ⚠️ icon (yellow/red)
  - Display opportunities with ✅ icon (green)
  - Update dynamically as slider changes
  - Show 2-4 items per category
- **Acceptance Criteria**:
  - ✅ Risks displayed for session < 2.0 hrs
  - ✅ Opportunities displayed for all scenarios
  - ✅ Updates dynamically (no page reload)
  - ✅ At least 2 items per category
  - ✅ Text clear and actionable
- **Effort**: 3 story points
- **Owner**: Peter

**US-3.2.3: Add Competitor Comparison Insight**
- **Story**: As Christy, I want to see how my test scenario compares to competitors
- **Tasks**:
  - Load competitor turnover data from yield-analysis.json
  - Calculate where PCC ranks with test scenario
  - Show insight: "With 1.5 hrs: PCC has best turnover (8.7 sessions/day)"
  - Highlight if PCC beats all competitors
  - Show competitive advantage: "33% more capacity than SPF"
- **Acceptance Criteria**:
  - ✅ Ranking calculated correctly
  - ✅ Insight text dynamic
  - ✅ Competitive advantage shown
  - ✅ Updates when slider changes
- **Effort**: 3 story points
- **Owner**: Peter

---

### Sprint 3.3: Scenario Management (Week 9)

**Goal**: Save, compare, and export scenarios

#### User Stories

**US-3.3.1: Implement Save Scenario**
- **Story**: As Christy, I want to save scenarios to compare later
- **Tasks**:
  - Add "Save Scenario" button
  - Prompt user for scenario name (optional)
  - Save to localStorage:
    - Session duration
    - All calculated metrics
    - Timestamp
    - User-provided name
  - Add to saved scenarios list (max 5)
  - Show confirmation toast
- **Acceptance Criteria**:
  - ✅ "Save Scenario" button works
  - ✅ User can name scenario
  - ✅ Saved to localStorage
  - ✅ Max 5 scenarios enforced
  - ✅ Confirmation toast displays
  - ✅ Scenarios persist across sessions
- **Effort**: 4 story points
- **Owner**: Peter

**US-3.3.2: Build Scenario Comparison View**
- **Story**: As Christy, I want to compare 2-3 saved scenarios side-by-side
- **Tasks**:
  - Add "Compare Scenarios" button
  - Create comparison modal
  - Load saved scenarios from localStorage
  - Display up to 3 scenarios in columns:
    - Scenario name
    - Session duration
    - Sessions/day
    - Monthly capacity
    - Monthly revenue
    - Impact vs baseline
  - Allow selection of which scenarios to compare
  - Add "Delete Scenario" action
- **Acceptance Criteria**:
  - ✅ "Compare Scenarios" opens modal
  - ✅ Up to 3 scenarios compared side-by-side
  - ✅ All metrics displayed
  - ✅ User can select scenarios to compare
  - ✅ "Delete" removes scenario from localStorage
  - ✅ Modal keyboard accessible
- **Effort**: 5 story points
- **Owner**: Peter

**US-3.3.3: Implement Export Report (PDF)**
- **Story**: As Christy, I want to export scenario analysis as PDF
- **Tasks**:
  - Add "Export Report" button
  - Use jsPDF library (or html2canvas + jsPDF)
  - Generate multi-page PDF:
    - Page 1: Scenario summary (current vs test)
    - Page 2: Impact analysis (metrics + insights)
    - Page 3: Session duration chart (image)
    - Page 4: Turnover table (image)
    - Page 5: Top 10 opportunities (image)
  - Add header/footer with timestamp and "PCC Yield Optimizer" branding
  - Filename: `PCC_Yield_Scenario_YYYY-MM-DD.pdf`
  - Trigger download
- **Acceptance Criteria**:
  - ✅ "Export Report" button works
  - ✅ PDF generates in <3 seconds
  - ✅ All 5 pages included
  - ✅ Charts rendered as images
  - ✅ PDF formatted professionally
  - ✅ Filename correct
  - ✅ Download starts automatically
- **Effort**: 8 story points
- **Owner**: Peter

**US-3.3.4: Implement Export Data (CSV)**
- **Story**: As Christy, I want to export raw data as CSV for spreadsheet analysis
- **Tasks**:
  - Add "Export CSV" button
  - Generate CSV with:
    - All facility turnover data
    - Top 100 opportunities
    - Current scenario metrics
    - Test scenario metrics
  - Include headers
  - Trigger download
  - Filename: `PCC_Yield_Data_YYYY-MM-DD.csv`
- **Acceptance Criteria**:
  - ✅ "Export CSV" button works
  - ✅ CSV generates instantly
  - ✅ All data included
  - ✅ Headers clear
  - ✅ Opens correctly in Excel/Google Sheets
  - ✅ Filename correct
- **Effort**: 3 story points
- **Owner**: Peter

---

### Sprint 3.4: Final Integration & Launch (Week 10)

**Goal**: Polish, test, and launch complete Strategic Yield Optimization module

#### User Stories

**US-3.4.1: Full System Integration Testing**
- **Story**: As Peter, I want to test all 3 sprints working together
- **Tasks**:
  - End-to-end testing checklist:
    - [ ] Data pipeline runs successfully (Python)
    - [ ] Session duration chart works
    - [ ] Turnover table works
    - [ ] Opportunity scorer works
    - [ ] Scenario modeler works
    - [ ] All filters work across all components
    - [ ] Save/compare scenarios works
    - [ ] Export PDF/CSV works
    - [ ] All cross-component interactions work
  - Test user workflows (see Functional Spec workflows)
  - Fix integration bugs
- **Acceptance Criteria**:
  - ✅ All features work together
  - ✅ No console errors
  - ✅ All workflows complete successfully
  - ✅ Cross-browser compatibility verified
  - ✅ Performance acceptable (<2 sec load)
- **Effort**: 8 story points
- **Owner**: Peter

**US-3.4.2: Accessibility Audit & Compliance**
- **Story**: As Peter, I want to ensure WCAG 2.1 AA compliance
- **Tasks**:
  - Run automated accessibility checker (axe DevTools)
  - Manual keyboard navigation testing
  - Screen reader testing (VoiceOver on Mac)
  - Color contrast verification
  - Focus indicator testing
  - ARIA label verification
  - Fix all accessibility issues
- **Acceptance Criteria**:
  - ✅ 0 critical accessibility errors
  - ✅ All interactive elements keyboard accessible
  - ✅ Screen reader announces all content correctly
  - ✅ Color contrast ≥4.5:1 for all text
  - ✅ Focus indicators visible
  - ✅ ARIA labels present on all charts/tables
- **Effort**: 5 story points
- **Owner**: Peter

**US-3.4.3: Performance Optimization**
- **Story**: As Peter, I want to ensure fast page load and smooth interactions
- **Tasks**:
  - Measure performance (Lighthouse audit)
  - Optimize:
    - Minify CSS/JS (if not already)
    - Lazy-load charts (render on scroll into view)
    - Debounce slider to 300ms
    - Cache yield-analysis.json for 5 minutes
  - Target metrics:
    - Page load: <2 seconds
    - First Contentful Paint: <1 second
    - Time to Interactive: <3 seconds
    - All interactions: <100ms response
- **Acceptance Criteria**:
  - ✅ Lighthouse score: >90 performance
  - ✅ Page load: <2 seconds
  - ✅ Charts render: <1 second
  - ✅ Slider dragging smooth (60 FPS)
  - ✅ No layout shifts (CLS <0.1)
- **Effort**: 4 story points
- **Owner**: Peter

**US-3.4.4: User Acceptance Testing with Christy**
- **Story**: As Christy, I want to test the complete dashboard before launch
- **Tasks**:
  - Schedule UAT session with Christy (2 hours)
  - Prepare UAT script with test scenarios:
    1. Benchmark session durations
    2. Identify top opportunity
    3. Test 1.5-hour scenario
    4. Export report
  - Observe Christy using dashboard
  - Collect feedback
  - Document bugs/enhancement requests
  - Fix critical bugs before launch
- **Acceptance Criteria**:
  - ✅ UAT session completed
  - ✅ Christy successfully completes all test scenarios
  - ✅ Feedback documented
  - ✅ Critical bugs fixed
  - ✅ Enhancement requests logged for future sprints
- **Effort**: 5 story points
- **Owner**: Peter + Christy

**US-3.4.5: Documentation & Handoff**
- **Story**: As Peter, I want to document the system for future maintenance
- **Tasks**:
  - Create README.md in PRD directory
  - Document:
    - How to run data pipeline
    - How to update yield-analysis.json
    - How to deploy to Vercel
    - Architecture overview
    - Known limitations
    - Future enhancements
  - Record demo video (5-10 minutes)
  - Create quick reference guide for Christy (1-page PDF)
- **Acceptance Criteria**:
  - ✅ README.md complete
  - ✅ All processes documented
  - ✅ Demo video recorded
  - ✅ Quick reference guide created
  - ✅ Documentation reviewed by Christy
- **Effort**: 3 story points
- **Owner**: Peter

**US-3.4.6: Production Launch**
- **Story**: As Christy, I want to launch the Strategic Yield Optimization module
- **Tasks**:
  - Final code review
  - Commit all Sprint 3 code
  - Push to main branch
  - Verify Vercel deployment
  - Update navigation to include "Strategic Yield" tab
  - Send launch announcement to stakeholders
  - Monitor for issues in first 48 hours
- **Acceptance Criteria**:
  - ✅ Code deployed to production
  - ✅ All features live and functional
  - ✅ Navigation updated
  - ✅ Launch announcement sent
  - ✅ No critical issues in first 48 hours
- **Effort**: 3 story points
- **Owner**: Peter

---

## Sprint Summary & Velocity

### Effort Distribution

| Sprint | Story Points | Duration | Velocity (Points/Week) |
|--------|-------------|----------|------------------------|
| Sprint 1 | 33 points | 3 weeks | 11 points/week |
| Sprint 2 | 34 points | 3 weeks | 11 points/week |
| Sprint 3 | 53 points | 4 weeks | 13 points/week |
| **Total** | **120 points** | **10 weeks** | **12 points/week avg** |

### Developer Allocation

- **Peter**: 100% (full-time on project)
- **Christy**: 5 hours/week (testing, feedback, UAT)

### Risk Mitigation

**Risk**: Data pipeline failures
- **Mitigation**: Build error handling + retry logic in US-1.1.2

**Risk**: Performance issues with 168-hour calculations
- **Mitigation**: Pre-calculate in Python (US-2.1.1), not client-side

**Risk**: Browser compatibility issues
- **Mitigation**: Test in Sprint 1.3, 2.3, 3.4

**Risk**: Christy unavailable for UAT
- **Mitigation**: Schedule UAT early in Week 10, allow buffer time

---

## Post-Launch Success Metrics

### Technical Metrics (Week 1-4 after launch)
- **Page Load Time**: <2 seconds (target: 1.5 seconds)
- **Uptime**: >99% (Vercel hosting)
- **Error Rate**: <1% of user sessions
- **Browser Coverage**: 95%+ users on supported browsers

### Business Metrics (Month 1-3 after launch)
- **Dashboard Usage**: Christy reviews 2-3x per week
- **Scenario Tests**: 10+ scenarios tested
- **Decisions Made**: 3-5 operational changes attributed to insights
- **Revenue Impact**: $15-30k incremental revenue from optimized booking structure (measured in Months 2-3)

### User Satisfaction (Month 1)
- **Christy Satisfaction Score**: 8/10 or higher
- **Time to Insight**: Christy can answer "What's our best opportunity?" in <60 seconds
- **Decision Confidence**: Christy reports higher confidence in booking structure decisions

---

## Future Enhancements (Post-Launch)

### Phase 2: Real-Time Integration (Q2 2026)
- Connect to PCC booking system API
- Live availability tracking
- Real-time opportunity alerts (email/SMS)

### Phase 3: Predictive Analytics (Q3 2026)
- Machine learning model to forecast demand 2-4 weeks out
- Dynamic pricing recommendations
- Anomaly detection (alert when competitor patterns change)

### Phase 4: Competitor Monitoring Automation (Q4 2026)
- Weekly automated data refresh (cron job)
- Change detection (alert if competitor session duration changes >30 min)
- Historical trend analysis (track session duration over time)

---

**End of Epics & Sprints Document**

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-20 | Peter Giordano | Initial epics & sprints for Strategic Yield Optimization |
