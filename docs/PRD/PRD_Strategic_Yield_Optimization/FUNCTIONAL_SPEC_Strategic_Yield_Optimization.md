# Functional Specification: Strategic Yield Optimization Using Popular Times Data

**Project**: PCC Yield Optimizer - Strategic Yield Optimization Module
**Version**: 1.0
**Last Updated**: October 20, 2025

---

## Document Organization

This Functional Specification is part of a 5-document specification suite. Read in this order:

1. **[PRD](./PRD_Strategic_Yield_Optimization.md)** - Product vision, business goals, user needs
2. **Functional Spec** (this document) - What the system should do (functional requirements)
3. **[Technical Spec](./TECHNICAL_SPEC_Strategic_Yield_Optimization.md)** - How to build it (technical architecture)
4. **[Design Spec](./DESIGN_SPEC_Strategic_Yield_Optimization.md)** - UI/UX specifications (design system)
5. **[Epics & Sprints](./EPICS_AND_SPRINTS.md)** - Developer work breakdown (user stories, tasks, sprint planning)

---

## Purpose of This Document

This Functional Specification describes **WHAT** the Strategic Yield Optimization module must do, without prescribing **HOW** to implement it. It serves as a contract between business stakeholders and the development team.

**Audience**: Product managers, developers, QA engineers, business stakeholders

---

## System Overview

### What This Module Does

The Strategic Yield Optimization module analyzes competitor session duration data from Google Maps Popular Times to help PCC:

1. **Understand** how long competitor customers stay (session duration)
2. **Calculate** court turnover efficiency (sessions per day)
3. **Identify** time slots where competitors have poor turnover (opportunity)
4. **Model** revenue impact of different booking block sizes (scenario planning)

### What This Module Does NOT Do (Out of Scope)

- Does NOT integrate with PCC's booking system (future phase)
- Does NOT automatically adjust pricing (provides data only)
- Does NOT send automated alerts (future phase)
- Does NOT predict future demand (future phase)
- Does NOT collect customer satisfaction data

---

## Functional Requirements

### FR-1: Session Duration Benchmarking

**Requirement ID**: FR-1
**Priority**: P0 (Must Have)
**User Story**: As Christy, I want to see average session duration for all competitors so that I can benchmark PCC's 2-hour blocks against the market.

#### FR-1.1: Display Session Duration for All Competitors

**Description**: System shall display session duration (in hours) for all tracked competitors.

**Input**:
- `time_spent` data from Google Maps (array of [min_minutes, max_minutes])
- Facility metadata (name, type, courts, operating hours)

**Processing**:
- Extract session duration from `time_spent` array
- If min ≠ max, calculate average: `(min + max) / 2`
- Convert minutes to hours (round to 1 decimal place)
- Sort facilities by session duration (longest first)

**Output**:
- Horizontal bar chart showing:
  - Facility name (Y-axis)
  - Session duration in hours (X-axis)
  - Color-coded by efficiency:
    - Green: ≤2.0 hours (excellent)
    - Blue: 2.5 hours (good)
    - Yellow: 3.0 hours (medium)
    - Red: ≥4.0 hours (poor)
  - Industry average line (dashed)
  - PCC target line (solid, highlighted)

**Acceptance Criteria**:
- ✅ All 7 facilities displayed (6 competitors + PCC)
- ✅ Session durations accurate to 1 decimal place
- ✅ Chart loads in <2 seconds
- ✅ Bars color-coded correctly
- ✅ Industry average calculated and displayed
- ✅ PCC target highlighted with star icon

**Edge Cases**:
- If `time_spent` is null → Display "No data" with gray bar
- If `time_spent` array length ≠ 2 → Log error, skip facility
- If min > max → Log error, use min value

---

#### FR-1.2: Show Detailed Session Info on Hover

**Description**: When user hovers over a bar, system shall display detailed session information.

**Input**: Mouse hover event on bar chart

**Processing**: Retrieve facility data for hovered bar

**Output**: Tooltip showing:
- Facility name
- Session duration (hours + minutes)
- Operating hours per day
- Sessions per day (calculated)
- Total daily capacity (sessions/day × courts)

**Acceptance Criteria**:
- ✅ Tooltip appears within 100ms of hover
- ✅ Tooltip follows mouse cursor
- ✅ Tooltip disappears when mouse leaves bar
- ✅ All data fields populated correctly
- ✅ Tooltip does not block chart content

---

#### FR-1.3: Filter Facilities by Type

**Description**: User can filter facilities by type (All / Private / Public).

**Input**: User clicks filter option in sidebar

**Processing**:
- Filter facilities array based on selected type
- Re-render chart with filtered data
- Update "Showing X of Y facilities" counter

**Output**: Chart updates to show only selected facility types

**Acceptance Criteria**:
- ✅ "All" selected by default (shows all 7 facilities)
- ✅ "Private" shows only private clubs (SPF, Big City, Pickle Haus, PCC)
- ✅ "Public" shows only parks (Grant, Horner, Union)
- ✅ Filter applies immediately (<500ms)
- ✅ Chart re-scales if needed to fit filtered data

---

### FR-2: Court Turnover Analysis

**Requirement ID**: FR-2
**Priority**: P0 (Must Have)
**User Story**: As Christy, I want to see how many sessions each competitor can fit per day so that I can identify which competitors have poor turnover efficiency.

#### FR-2.1: Calculate Sessions Per Day

**Description**: System shall calculate maximum sessions per court per day for all facilities.

**Input**:
- Operating hours per day (from facility metadata)
- Session duration (from FR-1)

**Processing**:
```
sessions_per_day = operating_hours / session_duration_hours

Example:
SPF: 16 hours / 2.5 hours = 6.4 sessions/day
PCC: 13 hours / 2.0 hours = 6.5 sessions/day
```

**Output**: Float rounded to 1 decimal place

**Acceptance Criteria**:
- ✅ Calculation accurate for all facilities
- ✅ Handles division by zero gracefully (session duration = 0)
- ✅ Rounds correctly (6.45 → 6.5, 6.44 → 6.4)

---

#### FR-2.2: Display Turnover Analysis Table

**Description**: System shall display sortable table with turnover metrics.

**Input**: Processed turnover data for all facilities

**Processing**:
- Calculate total daily capacity (sessions/day × courts)
- Rank facilities by sessions/day (descending)
- Assign efficiency badges based on sessions/day:
  - Excellent: ≥6.5 (green badge)
  - Good: 5.5-6.4 (blue badge)
  - Medium: 4.5-5.4 (yellow badge)
  - Poor: <4.5 (red badge)

**Output**: Table with columns:
1. Rank (1-7)
2. Facility name
3. Number of courts
4. Operating hours (hrs/day)
5. Session duration (hrs)
6. Sessions per day (bold, highlighted)
7. Total daily capacity (sessions × courts)
8. Efficiency badge (color-coded)

**Acceptance Criteria**:
- ✅ All 7 facilities displayed
- ✅ PCC row highlighted (light blue background)
- ✅ Default sort: descending by sessions/day
- ✅ Efficiency badges color-coded correctly
- ✅ Numbers formatted with 1 decimal place

---

#### FR-2.3: Enable Column Sorting

**Description**: User can click column headers to sort table.

**Input**: User clicks on column header

**Processing**:
- Toggle sort direction (ascending ↔ descending)
- Re-sort table data by selected column
- Update sort indicator (arrow icon)

**Output**: Table re-rendered with sorted data

**Acceptance Criteria**:
- ✅ Sortable columns: Rank, Sessions/Day, Total Capacity, Session Duration
- ✅ First click: sort descending
- ✅ Second click: sort ascending
- ✅ Arrow icon indicates current sort direction
- ✅ Sorted column header highlighted (blue text)
- ✅ Sort persists when filtering facilities

---

#### FR-2.4: Show Row Details on Click

**Description**: User can click a table row to see detailed breakdown.

**Input**: User clicks on table row

**Processing**: Retrieve full facility data including:
- Operating hours by day of week
- Peak hours from popular times data
- Current popularity (if available)
- Pricing information

**Output**: Modal dialog showing:
- Facility name and type
- Detailed operating hours (Mon-Sun with open/close times)
- Session duration analysis
- Turnover efficiency breakdown
- Revenue potential estimate
- Link to view full popular times heatmap

**Acceptance Criteria**:
- ✅ Modal opens within 200ms of click
- ✅ Modal displays all facility data
- ✅ "Close" button (X) and ESC key close modal
- ✅ Click outside modal closes modal
- ✅ Modal is keyboard-accessible (Tab navigation)

---

### FR-3: Opportunity Scoring

**Requirement ID**: FR-3
**Priority**: P0 (Must Have)
**User Story**: As Christy, I want to see ranked list of time slots where PCC can gain market share so that I can focus marketing efforts on high-value opportunities.

#### FR-3.1: Calculate Opportunity Scores

**Description**: System shall calculate opportunity score for each hour of the week for each competitor.

**Input**:
- Competitor popularity data (0-100) for each hour
- Competitor session duration (hours)
- PCC target session duration (2.0 hours)

**Processing**:
```
opportunity_score = popularity × (competitor_session_hours / pcc_session_hours)

Example (Union Park, Thursday 8pm):
popularity = 100
competitor_session = 4.0 hours
pcc_session = 2.0 hours
opportunity_score = 100 × (4.0 / 2.0) = 200
```

**Logic**: Higher scores indicate better opportunities. If competitor is busy (high popularity) AND has long sessions (poor turnover), PCC can offer shorter blocks and capture overflow.

**Output**: Opportunity score (integer, 0-300 range typical)

**Acceptance Criteria**:
- ✅ Scores calculated for all 168 hours/week (7 days × 24 hours)
- ✅ Scores calculated for all 6 competitors
- ✅ Scores exclude hours where popularity = 0 (facility closed)
- ✅ Calculation accurate (matches manual calculation)

---

#### FR-3.2: Display Top 10 Opportunities

**Description**: System shall display top 10 opportunities ranked by score.

**Input**: All calculated opportunity scores (6 competitors × 168 hours)

**Processing**:
- Sort all opportunities by score (descending)
- Take top 10
- Calculate estimated monthly revenue for each:
  ```
  sessions_per_week = (opportunity_score / 100) × 10
  pcc_captured_sessions = sessions_per_week × 0.20  # 20% capture rate
  monthly_revenue = pcc_captured_sessions × $25 × 4 weeks
  ```

**Output**: Table with columns:
1. Rank (1-10)
2. Day of week
3. Hour (24-hour format)
4. Facility name
5. Competitor popularity (%)
6. Competitor session duration (hrs)
7. Opportunity score (color-coded badge)
8. Estimated monthly revenue ($)

**Acceptance Criteria**:
- ✅ Top 10 opportunities displayed
- ✅ Sorted by score (highest first)
- ✅ Revenue calculations accurate
- ✅ Total potential revenue summed at bottom
- ✅ Color-coding: High (>150) red, Medium (100-150) yellow, Low (<100) green

---

#### FR-3.3: Filter Opportunities by Day

**Description**: User can filter opportunities by day of week.

**Input**: User selects day(s) from dropdown or checkbox list

**Processing**:
- Filter opportunities to show only selected days
- Re-rank (top 10 may change)
- Recalculate total revenue

**Output**: Updated top 10 table

**Acceptance Criteria**:
- ✅ "All Days" selected by default
- ✅ User can select multiple days (checkboxes)
- ✅ Table updates immediately (<500ms)
- ✅ Total revenue recalculated for filtered results
- ✅ "Showing opportunities for: Mon, Wed, Fri" label displayed

---

#### FR-3.4: View All Opportunities (168 Hours)

**Description**: User can view full list of all 168 hours ranked.

**Input**: User clicks "View All 168" button

**Processing**:
- Expand table to show all hours with opportunity score > 0
- Enable pagination (20 rows per page)
- Enable search/filter by facility or day

**Output**: Expanded table with pagination controls

**Acceptance Criteria**:
- ✅ All opportunities displayed (typically 100-150 hours have score > 0)
- ✅ Pagination shows 20 rows per page
- ✅ "Previous" and "Next" buttons work
- ✅ User can jump to specific page
- ✅ "Back to Top 10" button returns to summary view

---

### FR-4: Scenario Modeler

**Requirement ID**: FR-4
**Priority**: P1 (Should Have)
**User Story**: As Christy, I want to test different booking block sizes and see revenue impact so that I can make data-driven decisions about session length.

#### FR-4.1: Interactive Session Length Slider

**Description**: User can adjust session length via slider and see real-time impact.

**Input**: User drags slider or clicks on slider track

**Processing**:
- Update session duration value (range: 1.0 - 4.0 hours, 0.5 increments)
- Recalculate:
  - Sessions per day = 13 hours / session_duration
  - Total sessions per day = sessions_per_day × 7 courts
  - Monthly capacity = total_sessions_per_day × 30 days
  - Monthly revenue = monthly_capacity × $25
- Compare to current baseline (2.0 hours)

**Output**: Updated scenario panel showing:
- New session duration
- New sessions/day
- New monthly capacity
- New monthly revenue
- Impact metrics (change vs baseline)

**Acceptance Criteria**:
- ✅ Slider range: 1.0 to 4.0 hours
- ✅ Slider increments: 0.5 hours (1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0)
- ✅ Recalculation occurs immediately (debounced 300ms)
- ✅ All metrics update in sync
- ✅ Slider thumb shows current value on hover

---

#### FR-4.2: Display Impact Analysis

**Description**: System shall show quantified impact of scenario vs current setup.

**Input**: Current scenario settings

**Processing**:
- Calculate differences:
  - Capacity change (sessions)
  - Capacity change (%)
  - Revenue change ($)
  - Revenue change (annual $)
  - Sessions/day change

**Output**: Impact panel showing:
- 📊 Capacity Change: +462 sessions/month (+33.8%)
- 💰 Revenue Impact: +$11,550/month (+$138,600/year)
- ⏱️ Session Density: +2.2 sessions/court/day
- ⚠️ Risks (qualitative assessment)
- ✅ Opportunities (qualitative assessment)

**Acceptance Criteria**:
- ✅ All metrics calculated correctly
- ✅ Positive changes shown in green
- ✅ Negative changes shown in red
- ✅ Percentage changes displayed alongside absolute values
- ✅ Annual revenue projection included

---

#### FR-4.3: Show Contextual Risks and Opportunities

**Description**: System shall display qualitative risks and opportunities based on session length.

**Input**: Selected session duration

**Processing**: Apply business rules:

**If session < 1.5 hours**:
- ⚠️ Risk: "Too short for competitive play"
- ⚠️ Risk: "May frustrate advanced players"

**If session = 1.5 hours**:
- ⚠️ Risk: "Shorter than industry average (2.6 hrs)"
- ✅ Opportunity: "Fits more sessions during 6-9pm peak"
- ✅ Opportunity: "Best turnover efficiency possible"

**If session = 2.0 hours** (current):
- ✅ Opportunity: "Competitive with most facilities"
- ✅ Opportunity: "Good balance of satisfaction and turnover"

**If session = 2.5 hours**:
- ⚠️ Risk: "Matches SPF - no competitive advantage"
- ⚠️ Risk: "Reduces capacity by 20%"

**If session ≥ 3.0 hours**:
- ⚠️ Risk: "Very poor turnover (≤5.2 sessions/day)"
- ⚠️ Risk: "Significant revenue loss vs 2.0 hrs"

**Output**: Bulleted lists of 2-4 risks and 2-4 opportunities

**Acceptance Criteria**:
- ✅ Risks displayed with ⚠️ icon, yellow/red color
- ✅ Opportunities displayed with ✅ icon, green color
- ✅ At least 2 items per category
- ✅ Text updates dynamically as slider moves

---

#### FR-4.4: Save and Compare Scenarios

**Description**: User can save scenarios and compare side-by-side.

**Input**: User clicks "Save Scenario" button

**Processing**:
- Save current scenario to local storage:
  - Session duration
  - Sessions/day
  - Monthly capacity
  - Monthly revenue
  - Timestamp
  - User-provided name (optional)
- Add to saved scenarios list (max 5)

**Output**: Confirmation message "Scenario saved as 'Scenario 3'"

**Acceptance Criteria**:
- ✅ User can save up to 5 scenarios
- ✅ Saved scenarios persist across sessions (localStorage)
- ✅ User can name scenarios (e.g., "1.5hr peak test")
- ✅ User can delete saved scenarios
- ✅ "Compare Scenarios" view shows 2-3 scenarios side-by-side

---

#### FR-4.5: Export Scenario Report

**Description**: User can export scenario analysis as PDF or CSV.

**Input**: User clicks "Export Report" button

**Processing**:
- Generate report containing:
  - Current vs Test scenario comparison
  - Impact metrics
  - Risks and opportunities
  - Turnover comparison vs competitors
  - Top 10 opportunities relevant to scenario
  - Timestamp and user notes

**Output**:
- **PDF**: Multi-page formatted report with charts
- **CSV**: Tabular data for spreadsheet analysis

**Acceptance Criteria**:
- ✅ PDF includes all sections with proper formatting
- ✅ Charts rendered as images in PDF
- ✅ CSV includes all numeric data
- ✅ File named: "PCC_Yield_Scenario_YYYY-MM-DD.pdf"
- ✅ Download starts within 2 seconds

---

### FR-5: Data Management

**Requirement ID**: FR-5
**Priority**: P0 (Must Have)
**User Story**: As Peter, I want the system to load fresh data automatically so that insights are always up-to-date.

#### FR-5.1: Load Popular Times Data

**Description**: System shall load popular times data from JSON files on page load.

**Input**: Page load event

**Processing**:
- Fetch `/data/yield-analysis.json` via AJAX
- Parse JSON
- Validate data structure
- Store in application state

**Output**: Data loaded into memory, ready for rendering

**Acceptance Criteria**:
- ✅ Data loads within 2 seconds
- ✅ Loading spinner displayed while fetching
- ✅ Error message if fetch fails
- ✅ Retry option if fetch fails
- ✅ Cache data for 5 minutes (avoid redundant fetches)

---

#### FR-5.2: Handle Missing Data Gracefully

**Description**: System shall handle cases where `time_spent` data is unavailable.

**Input**: Facility with `time_spent: null`

**Processing**:
- Skip facility in session duration chart
- Show "No data" in turnover table
- Exclude from opportunity calculations
- Log warning to console

**Output**: UI displays graceful fallback

**Acceptance Criteria**:
- ✅ No JavaScript errors thrown
- ✅ "No data available" message shown
- ✅ Other facilities display correctly
- ✅ Warning logged: "Missing time_spent for {facility_name}"

---

#### FR-5.3: Display Last Updated Timestamp

**Description**: System shall show when data was last refreshed.

**Input**: `generatedAt` timestamp from yield-analysis.json

**Processing**:
- Parse ISO 8601 timestamp
- Convert to local timezone
- Format as "Last Updated: Oct 20, 2025 3:30 PM"

**Output**: Timestamp displayed in footer

**Acceptance Criteria**:
- ✅ Timestamp accurate
- ✅ Updates when new data loaded
- ✅ Timezone conversion correct
- ✅ Format readable (no UTC offset shown)

---

#### FR-5.4: Refresh Data on Demand

**Description**: User can manually refresh data.

**Input**: User clicks "Refresh Data" button

**Processing**:
- Re-fetch yield-analysis.json
- Clear cache
- Reload all visualizations
- Show "Data refreshed" confirmation

**Output**: Dashboard updates with latest data

**Acceptance Criteria**:
- ✅ Button visible in header or sidebar
- ✅ Loading spinner during refresh
- ✅ Confirmation toast message
- ✅ All components re-render with new data
- ✅ Refresh completes in <3 seconds

---

### FR-6: Filtering and Search

**Requirement ID**: FR-6
**Priority**: P1 (Should Have)
**User Story**: As Christy, I want to filter and search data so that I can focus on specific competitors or time periods.

#### FR-6.1: Facility Type Filter

**Description**: User can filter by facility type (All / Private / Public).

**Covered by**: FR-1.3 (already defined above)

---

#### FR-6.2: Select/Deselect Individual Facilities

**Description**: User can toggle individual competitors on/off.

**Input**: User clicks checkbox next to facility name in sidebar

**Processing**:
- Add/remove facility from active filter list
- Re-render all visualizations with filtered data
- Update "Showing X of Y facilities" counter

**Output**: Charts and tables update to show only selected facilities

**Acceptance Criteria**:
- ✅ All facilities selected by default
- ✅ Checkbox state persists during session
- ✅ At least 1 facility must remain selected (disable last checkbox)
- ✅ "Select All" / "Deselect All" shortcuts available
- ✅ Filter applies to all visualizations simultaneously

---

#### FR-6.3: Filter Opportunities by Time Range

**Description**: User can filter opportunities by time of day.

**Input**: User selects time range (e.g., "6am-9pm", "Peak Hours: 5pm-9pm")

**Processing**:
- Filter opportunity scores to show only selected hours
- Re-rank top 10
- Recalculate total revenue

**Output**: Filtered opportunity table

**Acceptance Criteria**:
- ✅ Predefined ranges: "All Day", "Morning (6am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-9pm)"
- ✅ Custom range picker available (start hour - end hour)
- ✅ Filter applies immediately
- ✅ "Showing opportunities for 6am-9pm" label displayed

---

### FR-7: User Preferences

**Requirement ID**: FR-7
**Priority**: P2 (Nice to Have)
**User Story**: As Christy, I want to save my preferences so that the dashboard remembers my settings.

#### FR-7.1: Persist Filter Settings

**Description**: System shall remember user's filter selections.

**Input**: User changes filter settings

**Processing**:
- Save to localStorage:
  - Selected facilities (array of IDs)
  - Facility type filter (all/private/public)
  - Sort order preferences
  - Time range filter
- Apply saved settings on page load

**Output**: Dashboard loads with user's last settings

**Acceptance Criteria**:
- ✅ Settings saved to localStorage on change
- ✅ Settings loaded on page load
- ✅ "Reset to Defaults" button available
- ✅ Settings persist across sessions
- ✅ No errors if localStorage unavailable (graceful degradation)

---

#### FR-7.2: Customize Display Units

**Description**: User can choose display units for session duration.

**Input**: User selects "Hours" or "Minutes" from dropdown

**Processing**:
- Convert all session duration displays
- Update chart labels
- Save preference to localStorage

**Output**: All durations shown in selected unit

**Acceptance Criteria**:
- ✅ "Hours" selected by default
- ✅ "Minutes" option available
- ✅ Conversion accurate (2.5 hrs = 150 min)
- ✅ Preference persists
- ✅ Chart tooltips update accordingly

---

## Non-Functional Requirements

### NFR-1: Performance

- **Page Load**: Initial load <2 seconds (on 10 Mbps connection)
- **Data Fetch**: yield-analysis.json fetches in <1 second
- **Chart Rendering**: All charts render in <1 second
- **Interactions**: UI responds to user input within 100ms
- **Slider**: Scenario recalculation debounced to 300ms (smooth dragging)

### NFR-2: Browser Compatibility

**Supported Browsers**:
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

**NOT Supported**:
- Internet Explorer (any version)
- Mobile browsers (V1)

### NFR-3: Accessibility

- **WCAG 2.1 AA** compliance minimum
- **Keyboard Navigation**: All interactive elements tabbable
- **Screen Reader**: ARIA labels on all visualizations
- **Color Contrast**: Minimum 4.5:1 for text
- **Focus Indicators**: Visible focus states on all interactive elements

### NFR-4: Data Accuracy

- **Session Duration**: ±5 minutes acceptable margin of error
- **Turnover Calculations**: Must match manual calculation (100% accuracy)
- **Revenue Estimates**: Based on $25/session (configurable)
- **Opportunity Scores**: Formula must be consistent and documented

### NFR-5: Reliability

- **Uptime**: 99% (static site, minimal downtime)
- **Error Handling**: All errors caught and displayed gracefully
- **Data Validation**: Invalid data does not crash application
- **Fallbacks**: Missing data shows "No data available" not blank screen

---

## User Workflows

### Workflow 1: Benchmark Session Durations

**Goal**: Understand how PCC's 2-hour blocks compare to competitors

**Steps**:
1. User navigates to Strategic Yield Optimization view
2. System loads yield-analysis.json
3. System renders session duration bar chart
4. User views chart (sees Union Park: 4.0 hrs, SPF: 2.5 hrs, PCC: 2.0 hrs)
5. User hovers over SPF bar
6. System shows tooltip: "SPF: 2.5 hrs, 6.4 sessions/day"
7. User concludes: "PCC's 2.0 hrs is competitive (better turnover than SPF)"

**Expected Outcome**: User understands PCC is competitive on session length

---

### Workflow 2: Identify Top Opportunity

**Goal**: Find best time slot to target for marketing

**Steps**:
1. User scrolls to "Top 10 Opportunities" table
2. System displays ranked opportunities
3. User sees #1: Thursday 8pm, Union Park, Score: 200, Revenue: $1,000/mo
4. User clicks on row to see details
5. System opens modal showing:
   - Union Park popularity: 100% at 8pm Thursday
   - Session duration: 4.0 hours (very poor turnover)
   - Opportunity: PCC can offer 2-hour blocks and capture overflow
6. User decides: "Target Thursday 7-9pm with Facebook ads aimed at Union Park area"

**Expected Outcome**: User identifies specific opportunity and takes action

---

### Workflow 3: Test Scenario (1.5-Hour Blocks)

**Goal**: Model revenue impact of offering 1.5-hour peak blocks

**Steps**:
1. User clicks on "Scenario Modeler" section
2. User drags slider from 2.0 hours to 1.5 hours
3. System recalculates:
   - Sessions/day: 6.5 → 8.7 (+2.2)
   - Monthly capacity: 1,365 → 1,827 (+462 sessions)
   - Monthly revenue: $34,125 → $45,675 (+$11,550)
4. System displays risks:
   - ⚠️ "Shorter than industry average"
   - ⚠️ "May reduce satisfaction"
5. System displays opportunities:
   - ✅ "Best turnover efficiency possible"
   - ✅ "Fits more sessions during 6-9pm peak"
6. User clicks "Save Scenario" (names it "1.5hr peak test")
7. User clicks "Compare Scenarios" to see 1.5hr vs 2.0hr side-by-side
8. User decides: "Test 1.5hr blocks for 6-9pm Mon-Fri only, keep 2.0hr for off-peak"

**Expected Outcome**: User makes data-driven decision on booking structure

---

### Workflow 4: Export Report for Stakeholders

**Goal**: Share analysis with business partner

**Steps**:
1. User completes scenario analysis (1.5hr blocks)
2. User clicks "Export Report"
3. System prompts: "Export as PDF or CSV?"
4. User selects "PDF"
5. System generates report:
   - Page 1: Executive Summary (key findings)
   - Page 2: Session Duration Benchmarking (chart)
   - Page 3: Turnover Analysis (table)
   - Page 4: Top 10 Opportunities (table)
   - Page 5: Scenario Analysis (1.5hr vs 2.0hr comparison)
6. System downloads "PCC_Yield_Scenario_2025-10-20.pdf"
7. User emails PDF to business partner

**Expected Outcome**: Professional report exported for sharing

---

## Edge Cases and Error Handling

### Edge Case 1: Missing `time_spent` Data

**Scenario**: Big City Pickle has `time_spent: null`

**Expected Behavior**:
- Session duration chart: Show "No data" gray bar with dashed outline
- Turnover table: Show "—" in Session Duration and Sessions/Day columns
- Opportunity table: Exclude Big City Pickle from calculations
- Footer note: "* 1 of 7 facilities missing session duration data"

---

### Edge Case 2: All Facilities Filtered Out

**Scenario**: User deselects all facilities except one, then tries to deselect that one

**Expected Behavior**:
- Disable checkbox (cannot deselect last facility)
- Show tooltip: "At least one facility must be selected"
- Keep last facility checked

---

### Edge Case 3: Network Error Loading Data

**Scenario**: yield-analysis.json fails to load (404 or network timeout)

**Expected Behavior**:
- Show error message: "Unable to load data. Please check your connection."
- Display "Retry" button
- Log error to console
- Show cached data if available (with "Using cached data from [timestamp]" message)

---

### Edge Case 4: Invalid Slider Value

**Scenario**: User manually edits slider value in dev tools to 0.0 hours

**Expected Behavior**:
- Validate input: if value <1.0, reset to 1.0
- Show warning: "Session duration must be between 1.0 and 4.0 hours"
- Prevent division by zero errors

---

### Edge Case 5: Very Large Opportunity Scores

**Scenario**: Facility has 100% popularity + 5.0 hour sessions → score = 250

**Expected Behavior**:
- Display score normally (no cap)
- Color badge as "high" (red)
- Revenue calculation may exceed typical range (acceptable)

---

## Data Validation Rules

### Input Validation

| Field | Type | Min | Max | Required | Default |
|-------|------|-----|-----|----------|---------|
| time_spent[0] | integer | 30 | 480 | No | null |
| time_spent[1] | integer | 30 | 480 | No | null |
| operatingHoursPerDay | float | 1.0 | 24.0 | Yes | 13.0 |
| courts | integer | 1 | 20 | Yes | 7 |
| popularity | integer | 0 | 100 | Yes | 0 |
| sessionDuration (slider) | float | 1.0 | 4.0 | Yes | 2.0 |

### Business Rules

1. **time_spent[0] ≤ time_spent[1]**: Min cannot exceed max
2. **Sessions/day ≥ 2.0**: Operating hours must allow at least 2 sessions
3. **Opportunity score ≥ 0**: Cannot be negative
4. **Capture rate**: Fixed at 20% for revenue estimates (configurable)
5. **Session price**: Fixed at $25 (configurable in future)

---

## Security Considerations

### V1 (No Sensitive Data)

- **Public data only**: All data from Google Maps (publicly available)
- **No authentication**: Dashboard is internal tool, no login required
- **No PII**: No customer personal information stored
- **Read-only**: No write operations to database

### Future Considerations (V2+)

If integrating with PCC booking system:
- **Authentication**: Require login (Christy + authorized staff)
- **Data encryption**: HTTPS for all API calls
- **API keys**: Secure storage of Google Maps API key (environment variables)

---

## Glossary

| Term | Definition |
|------|------------|
| **Session Duration** | Average time customers spend at facility (from Google Maps `time_spent`) |
| **Turnover** | Number of booking sessions that can fit in one day |
| **Sessions/Day** | Operating hours ÷ Session duration |
| **Opportunity Score** | Popularity × (Competitor session / PCC session) - higher = better opportunity |
| **Capture Rate** | % of competitor overflow demand PCC can realistically capture (default: 20%) |
| **Efficiency Badge** | Color-coded indicator of turnover efficiency (green/blue/yellow/red) |
| **Scenario** | What-if analysis testing different booking block sizes |

---

## Acceptance Criteria Summary

### Sprint 1: Session Duration Analysis

- [ ] FR-1.1: Session duration chart displays all facilities
- [ ] FR-1.2: Hover tooltips work on all bars
- [ ] FR-1.3: Facility type filter works (All/Private/Public)
- [ ] FR-2.1: Sessions/day calculated correctly
- [ ] FR-2.2: Turnover table displays with all columns
- [ ] FR-2.3: Column sorting works on all sortable columns
- [ ] FR-5.1: Data loads from yield-analysis.json
- [ ] FR-5.2: Missing data handled gracefully
- [ ] NFR-1: Page loads in <2 seconds

### Sprint 2: Opportunity Identification

- [ ] FR-3.1: Opportunity scores calculated for all 168 hours
- [ ] FR-3.2: Top 10 opportunities table displays
- [ ] FR-3.3: Day filter works on opportunities
- [ ] FR-3.4: "View All 168" expands full table
- [ ] FR-6.2: Individual facility checkboxes work
- [ ] FR-6.3: Time range filter works
- [ ] NFR-2: Works on Chrome 90+, Safari 14+, Firefox 88+

### Sprint 3: Scenario Modeling

- [ ] FR-4.1: Slider adjusts session duration (1.0-4.0 hrs)
- [ ] FR-4.2: Impact analysis displays correctly
- [ ] FR-4.3: Risks and opportunities update dynamically
- [ ] FR-4.4: Save and compare scenarios works
- [ ] FR-4.5: Export PDF report works
- [ ] FR-7.1: User preferences persist (localStorage)
- [ ] NFR-3: WCAG 2.1 AA accessible

---

**End of Functional Specification**

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-20 | Peter Giordano | Initial functional spec for Strategic Yield Optimization |
