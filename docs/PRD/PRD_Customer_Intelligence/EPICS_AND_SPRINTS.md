# Epics & Sprints: Customer Intelligence Center

**Project**: PCC Yield Optimizer - Customer Intelligence Center
**Version**: 2.0
**Last Updated**: October 8, 2025

---

## Document Organization

- **[PRD](./PRD_Customer_Intelligence_Center_v2.md)**: Product vision, business goals
- **[Functional Spec](./FUNCTIONAL_SPEC_Customer_Intelligence.md)**: What the system does
- **[Technical Spec](./TECHNICAL_SPEC_Customer_Intelligence.md)**: How to build it
- **[Design Spec](./DESIGN_SPEC_Customer_Intelligence.md)**: UI/UX specifications
- **Epics & Sprints** (this document): Work breakdown structure
- **[Project Milestones](./PROJECT_MILESTONES.md)**: Timeline and releases

---

## Epic Overview

| Epic # | Epic Name | Priority | Duration | Dependencies |
|--------|-----------|----------|----------|--------------|
| **1** | Customer Profiling Foundation | P0 | 2 weeks | None |
| **2** | Demographics Overlay | P0 | 2 weeks | None (parallel to Epic 1) |
| **3** | Customer Intelligence Dashboard | P0 | 2 weeks | Epic 1 (data) |
| **4** | Best Practice Research Engine | P1 | 4 weeks | None |
| **5** | Yield Management Foundation | P2 | 6 weeks | Booking system access |

**Total Duration**: 16 weeks (4 months)

---

## EPIC 1: Customer Profiling Foundation

**Goal**: Create 4-segment classification for 50 VIP members with corporate connector list

**Business Value**: $10-20k corporate event revenue potential + marketing targeting

**Duration**: 2 weeks (Week 1-2)

**Owner**: Christy (business) + Peter (technical support)

---

### Sprint 1.1: Survey Design & Deployment (3 days)

**Goal**: Design and distribute member survey to 50 VIP members

#### User Stories

**US-1.1.1: Design Survey Questionnaire**
- **Story**: As Christy, I want a 10-question survey that captures member motivations and employer info so that I can segment members effectively
- **Tasks**:
  - Review segmentation criteria from PRD
  - Draft survey questions (10 questions)
  - Review with Peter for data collection needs
  - Finalize question order and wording
- **Acceptance Criteria**:
  - ✅ 10 questions cover: motivation, frequency, times, amenities, employer, job title
  - ✅ Questions aligned with segment criteria (Corporate Power Users, Social Ambassadors, etc.)
  - ✅ All questions optional except #1-2 (minimize abandonment)
- **Effort**: 2 story points
- **Owner**: Christy

**US-1.1.2: Create Survey in Google Forms**
- **Story**: As Peter, I want the survey built in Google Forms so that responses auto-populate in Google Sheets
- **Tasks**:
  - Set up Google Form with 10 questions
  - Configure response destination (Google Sheet)
  - Add PCC branding (logo, colors)
  - Test submission and data flow
- **Acceptance Criteria**:
  - ✅ Survey created with all questions
  - ✅ Responses automatically populate Google Sheet
  - ✅ Test submission successful
- **Effort**: 1 story point
- **Owner**: Peter

**US-1.1.3: Distribute Survey to VIP Members**
- **Story**: As Christy, I want to email the survey to 50 VIP members with an incentive so that I get 60%+ response rate
- **Tasks**:
  - Export email list for 50 VIP members from booking system
  - Draft email copy (friendly tone, $10 credit incentive)
  - Send survey via email
  - Schedule reminder for 7 days later
- **Acceptance Criteria**:
  - ✅ Survey sent to 50 members
  - ✅ Email includes $10 credit incentive
  - ✅ Reminder scheduled
- **Effort**: 1 story point
- **Owner**: Christy

**Sprint 1.1 Definition of Done**:
- Survey live and distributed
- Minimum 15 responses received (30% early response)
- No technical issues reported

---

### Sprint 1.2: Manual Segmentation Model (4 days)

**Goal**: Classify 50 VIP members into 4 segments using survey + booking data

#### User Stories

**US-1.2.1: Export Member Data from Booking System**
- **Story**: As Peter, I want to export member list with booking frequency so that I can merge with survey responses
- **Tasks**:
  - Access PCC booking system
  - Export member list (50 VIP members)
  - Calculate booking frequency (times/week over past 3 months)
  - Save to Google Sheets
- **Acceptance Criteria**:
  - ✅ 50 members exported with ID, name, email, booking frequency
  - ✅ Booking frequency calculated accurately (spot-check 5 members)
- **Effort**: 2 story points
- **Owner**: Peter

**US-1.2.2: Define Segment Decision Tree**
- **Story**: As Christy, I want clear rules for assigning segments so that classification is consistent
- **Tasks**:
  - Document decision tree from PRD
  - Create flowchart (visual aid)
  - Review with Peter for implementation
  - Validate with 5 test members
- **Acceptance Criteria**:
  - ✅ Decision tree documented (if-then rules)
  - ✅ Flowchart created
  - ✅ Test cases pass (5/5)
- **Effort**: 2 story points
- **Owner**: Christy + Peter

**US-1.2.3: Classify 50 Members into Segments**
- **Story**: As Christy, I want to manually classify all 50 members using the decision tree
- **Tasks**:
  - Merge survey responses with booking data (Google Sheets)
  - Apply decision tree to each member
  - Flag edge cases for manual review
  - Assign segment to each member
- **Acceptance Criteria**:
  - ✅ All 50 members assigned a segment
  - ✅ Segment distribution documented (e.g., 12 Corporate, 9 Social, 15 Competitive, 14 Casual)
  - ✅ Confidence score noted for edge cases
- **Effort**: 3 story points
- **Owner**: Christy

**US-1.2.4: Create Segment Profile Cards**
- **Story**: As Christy, I want 1-page profile for each segment so that I can explain them to my team
- **Tasks**:
  - Write segment characteristics (1 page per segment)
  - Add example personas (2-3 members per segment)
  - Calculate avg booking freq, CLV, top neighborhoods
  - Format as PDF
- **Acceptance Criteria**:
  - ✅ 4 segment profile cards created
  - ✅ Each card includes: characteristics, example members, key metrics
- **Effort**: 2 story points
- **Owner**: Christy

**Sprint 1.2 Definition of Done**:
- 50 members classified
- Segment profiles documented
- Christy can explain each segment to team

---

### Sprint 1.3: Corporate Connector Identification (3 days)

**Goal**: Generate top 20 corporate connector list for outreach

#### User Stories

**US-1.3.1: Enrich Corporate Power Users with LinkedIn Data**
- **Story**: As Peter, I want to verify employer, job title, and company size via LinkedIn for Corporate Power Users
- **Tasks**:
  - Filter segmented list to "Corporate Power Users" (12-15 members)
  - Manual LinkedIn lookup for each member
  - Record: employer, job title, company size, work address
  - Add to Google Sheet
- **Acceptance Criteria**:
  - ✅ All Corporate Power Users enriched with LinkedIn data
  - ✅ Employer name, title, company size verified
- **Effort**: 3 story points
- **Owner**: Peter

**US-1.3.2: Calculate Priority Score and Rank**
- **Story**: As Peter, I want to rank Corporate Power Users by outreach priority
- **Tasks**:
  - Implement priority scoring formula (booking freq + job seniority + company size + proximity)
  - Calculate score for each member
  - Sort by score (descending)
  - Select top 20
- **Acceptance Criteria**:
  - ✅ Priority score calculated for all Corporate Power Users
  - ✅ Top 20 identified
- **Effort**: 2 story points
- **Owner**: Peter

**US-1.3.3: Create Outreach Template**
- **Story**: As Christy, I want a personalized email template for each corporate connector
- **Tasks**:
  - Draft email template with merge fields
  - Test with 2 example members
  - Finalize template
  - Add to Google Sheet (one column)
- **Acceptance Criteria**:
  - ✅ Email template created with merge fields (name, employer, booking freq)
  - ✅ Template approved by Christy
- **Effort**: 1 story point
- **Owner**: Christy

**US-1.3.4: Set Up Outreach Tracking**
- **Story**: As Christy, I want a spreadsheet to track outreach status so I can follow up systematically
- **Tasks**:
  - Add "Outreach Status" column to Google Sheet
  - Add dropdown values (Not Contacted, Emailed, Booked, Declined)
  - Add "Notes" column
  - Add "Last Contact Date" column
- **Acceptance Criteria**:
  - ✅ Tracking columns added
  - ✅ All members start in "Not Contacted" status
- **Effort**: 1 story point
- **Owner**: Peter

**Sprint 1.3 Definition of Done**:
- Top 20 corporate connector list complete
- Outreach template ready
- Christy sends first email batch (verify usability)

---

## EPIC 2: Demographics Overlay

**Goal**: Add Census demographic data as choropleth overlay on existing map

**Business Value**: Trade area understanding, neighborhood targeting for marketing

**Duration**: 2 weeks (Week 3-4)

**Owner**: Peter

---

### Sprint 2.1: Census Data Acquisition & Processing (5 days)

#### User Stories

**US-2.1.1: Download Census Tract Boundaries**
- **Story**: As Peter, I want Census tract boundaries for Cook County as GeoJSON
- **Tasks**:
  - Download TIGER/Line Shapefiles from Census Bureau
  - Filter to Cook County (FIPS 17031)
  - Convert to GeoJSON format
  - Save to `/data/geo/census-tracts.geojson`
- **Acceptance Criteria**:
  - ✅ ~800 Census tracts for Cook County
  - ✅ GeoJSON format valid
- **Effort**: 2 story points

**US-2.1.2: Fetch ACS Demographic Data**
- **Story**: As Peter, I want median income, education, and population data from American Community Survey
- **Tasks**:
  - Register for Census API key
  - Query ACS 5-Year Estimates (2023)
  - Fetch: median income (B19013), education (B15003), population (B01003)
  - Save to CSV
- **Acceptance Criteria**:
  - ✅ Data for all Cook County tracts
  - ✅ 3 variables: median income, % bachelor's+, population
- **Effort**: 2 story points

**US-2.1.3: Calculate Population Density**
- **Story**: As Peter, I want to calculate population density (people per sq mile) for each tract
- **Tasks**:
  - Calculate land area from tract boundaries (sq miles)
  - Calculate: population / land area
  - Add as derived field
- **Acceptance Criteria**:
  - ✅ Population density calculated for all tracts
  - ✅ Spot-check: PCC's tract has ~8,400 people/sq mi (validate with known data)
- **Effort**: 1 story point

**US-2.1.4: Merge Demographics to Boundaries and Export**
- **Story**: As Peter, I want a single GeoJSON file with boundaries + demographics
- **Tasks**:
  - Join demographics CSV to tract boundaries (on GEOID)
  - Merge into single GeoJSON
  - Optimize file size (<5 MB)
  - Save to `/data/geo/demographics.geojson`
- **Acceptance Criteria**:
  - ✅ Single GeoJSON with geometry + demographics
  - ✅ File size <5 MB
  - ✅ All tracts have data (no missing values)
- **Effort**: 2 story points

**Sprint 2.1 Definition of Done**:
- `demographics.geojson` file created
- Spot-check validates accuracy
- File loads in browser without errors

---

### Sprint 2.2: Choropleth Map Implementation (5 days)

#### User Stories

**US-2.2.1: Load Demographics Layer in Map Component**
- **Story**: As Peter, I want to render Census tracts as Leaflet GeoJSON layer
- **Tasks**:
  - Update `js/components/map.js`
  - Add `loadDemographics()` function
  - Create Leaflet GeoJSON layer
  - Add to map (initially hidden)
- **Acceptance Criteria**:
  - ✅ Demographics layer loads
  - ✅ Census tract polygons render
  - ✅ Layer hidden by default
- **Effort**: 2 story points

**US-2.2.2: Implement Color Scale for Choropleth**
- **Story**: As Peter, I want tracts colored by median income (red = low, green = high)
- **Tasks**:
  - Implement `getColor()` function with thresholds
  - Apply fill color based on `medianIncome` property
  - Test with all 3 variables (income, education, density)
  - Adjust color scale for visual clarity
- **Acceptance Criteria**:
  - ✅ Tracts colored correctly by selected variable
  - ✅ Color scale visually distinct (4-5 bins)
- **Effort**: 2 story points

**US-2.2.3: Add Toggle Control and Variable Selector**
- **Story**: As a user, I want to show/hide demographics and switch between income/education/density
- **Tasks**:
  - Add checkbox: "Show Demographics Overlay"
  - Add dropdown: "Median Income | Education | Density"
  - Wire events to show/hide layer and update colors
  - Test interactions
- **Acceptance Criteria**:
  - ✅ Toggle checkbox shows/hides layer
  - ✅ Dropdown changes color scale
  - ✅ No console errors
- **Effort**: 2 story points

**US-2.2.4: Add Tooltips and Legend**
- **Story**: As a user, I want to hover over a tract to see its demographics and understand the color scale
- **Tasks**:
  - Bind tooltips to each tract polygon
  - Display: GEOID, median income, education %, density
  - Create legend component (4-5 color bins)
  - Position legend in bottom-left corner
- **Acceptance Criteria**:
  - ✅ Tooltips show on hover
  - ✅ Legend displays correct color scale
  - ✅ Legend updates when variable changes
- **Effort**: 2 story points

**US-2.2.5: Ensure Layer Order and Facility Visibility**
- **Story**: As a user, I want facility markers to remain visible on top of demographics overlay
- **Tasks**:
  - Adjust z-index/layer order
  - Test with existing CTA transit layer (ensure compatibility)
  - Verify facility markers clickable
- **Acceptance Criteria**:
  - ✅ Facilities on top layer
  - ✅ CTA layer works alongside demographics
  - ✅ No visual conflicts
- **Effort**: 1 story point

**Sprint 2.2 Definition of Done**:
- Demographics overlay functional on map
- Toggle, dropdown, tooltips, legend working
- Tested on Chrome, Safari, Firefox

---

## EPIC 3: Customer Intelligence Dashboard

**Goal**: Build interactive dashboard tab with 4 visualization components

**Business Value**: Self-service customer data exploration for Christy

**Duration**: 2 weeks (Week 5-6)

**Owner**: Peter

---

### Sprint 3.1: Dashboard Framework & Segment Pie Chart (3 days)

#### User Stories

**US-3.1.1: Add Customer Intel Tab to Navigation**
- **Story**: As a user, I want a "Customer Intel" tab in the main navigation
- **Tasks**:
  - Update `index.html` navigation
  - Add tab button with icon 👥
  - Create `#customer-intel-view` div
  - Wire tab click event
- **Acceptance Criteria**:
  - ✅ Tab appears in navigation
  - ✅ Clicking tab shows Customer Intel view
- **Effort**: 1 story point

**US-3.1.2: Create CustomerIntelligenceComponent (Main Controller)**
- **Story**: As Peter, I want a main controller component that orchestrates child components
- **Tasks**:
  - Create `js/components/customer-intelligence.js`
  - Implement `init()`, `render()`, `loadData()`
  - Set up event listener framework
- **Acceptance Criteria**:
  - ✅ Component initializes on tab click
  - ✅ Loads `customer-segments.json`
- **Effort**: 2 story points

**US-3.1.3: Build Segment Pie Chart (D3.js)**
- **Story**: As a user, I want to see member distribution across 4 segments as a pie chart
- **Tasks**:
  - Create `js/components/segment-chart.js`
  - Implement D3.js pie chart
  - Color slices by segment
  - Add percentage labels
- **Acceptance Criteria**:
  - ✅ Pie chart renders with 4 segments
  - ✅ Colors match design spec
  - ✅ Percentages displayed
- **Effort**: 3 story points

**US-3.1.4: Add Pie Chart Click Interactivity**
- **Story**: As a user, I want to click a segment in the pie chart to filter all other views
- **Tasks**:
  - Implement click event on pie slices
  - Emit `segmentClick` event with segment name
  - Update active state (darken selected, fade others)
- **Acceptance Criteria**:
  - ✅ Clicking slice triggers filter
  - ✅ Visual feedback (active state)
- **Effort**: 2 story points

**Sprint 3.1 Definition of Done**:
- Customer Intel tab functional
- Segment pie chart renders and is interactive

---

### Sprint 3.2: Neighborhood Heatmap (4 days)

#### User Stories

**US-3.2.1: Aggregate Members by Zip Code**
- **Story**: As Peter, I want to count members per zip code for heatmap visualization
- **Tasks**:
  - Group `customer-segments.json` members by `zipCode`
  - Calculate member count per zip
  - Create lookup table: `{ "60661": 12, "60614": 8, ... }`
- **Acceptance Criteria**:
  - ✅ Member counts accurate
- **Effort**: 1 story point

**US-3.2.2: Download Chicago Zip Code Boundaries**
- **Story**: As Peter, I want Chicago zip code boundaries as GeoJSON
- **Tasks**:
  - Download from Chicago Data Portal or Census ZCTA
  - Filter to Chicago zip codes only
  - Save to `/data/geo/chicago-zips.geojson`
- **Acceptance Criteria**:
  - ✅ Chicago zip codes (77 zip codes)
  - ✅ GeoJSON valid
- **Effort**: 1 story point

**US-3.2.3: Build Neighborhood Choropleth Component**
- **Story**: As Peter, I want a Leaflet choropleth showing member density by zip
- **Tasks**:
  - Create `js/components/neighborhood-map.js`
  - Load zip boundaries
  - Color zip codes by member count (blue gradient)
  - Add to dashboard layout
- **Acceptance Criteria**:
  - ✅ Choropleth renders
  - ✅ Color scale correct (0 members = gray, 16+ = dark blue)
- **Effort**: 3 story points

**US-3.2.4: Add Click to View Member List**
- **Story**: As a user, I want to click a zip code to see which members live there
- **Tasks**:
  - Implement click event on zip polygons
  - Open modal with member list
  - Display: name, segment, booking frequency
- **Acceptance Criteria**:
  - ✅ Click opens modal
  - ✅ Member list accurate
- **Effort**: 2 story points

**US-3.2.5: Implement Segment Filter**
- **Story**: As a user, I want the neighborhood map to filter when I click a segment in the pie chart
- **Tasks**:
  - Listen for `segmentClick` event from pie chart
  - Re-aggregate members by zip (filtered)
  - Re-color map
- **Acceptance Criteria**:
  - ✅ Map updates when segment selected
  - ✅ Colors reflect filtered data
- **Effort**: 2 story points

**Sprint 3.2 Definition of Done**:
- Neighborhood heatmap functional
- Click and filter interactions working

---

### Sprint 3.3: Corporate Connector Table (4 days)

#### User Stories

**US-3.3.1: Build HTML Table Component**
- **Story**: As Peter, I want a sortable table displaying top 20 corporate connectors
- **Tasks**:
  - Create `js/components/connector-table.js`
  - Render table with 7 columns
  - Load data from `customer-segments.json`
  - Filter to Corporate Power Users
- **Acceptance Criteria**:
  - ✅ Table renders with correct data
  - ✅ 7 columns displayed
- **Effort**: 2 story points

**US-3.3.2: Implement Column Sorting**
- **Story**: As a user, I want to click column headers to sort the table
- **Tasks**:
  - Add click event to `<th>` elements
  - Implement sort logic (ascending/descending)
  - Add sort direction arrow indicator
- **Acceptance Criteria**:
  - ✅ Clicking header sorts table
  - ✅ Arrow shows sort direction
- **Effort**: 2 story points

**US-3.3.3: Add Filtering by Employer/Title**
- **Story**: As a user, I want to filter the table by employer or job title
- **Tasks**:
  - Add filter inputs above table
  - Implement real-time filter on table rows
  - Show row count ("Showing 8 of 20")
- **Acceptance Criteria**:
  - ✅ Filtering works in real-time
  - ✅ Row count updates
- **Effort**: 2 story points

**US-3.3.4: Implement "Copy Email" Button**
- **Story**: As a user, I want to copy a personalized email template for each member
- **Tasks**:
  - Add "Copy Email" button to each row
  - Generate personalized template (name, employer, booking freq)
  - Copy to clipboard
  - Show toast notification
- **Acceptance Criteria**:
  - ✅ Button copies template
  - ✅ Toast shows "Copied!"
- **Effort**: 2 story points

**US-3.3.5: Add Export to CSV**
- **Story**: As a user, I want to export the filtered table to CSV
- **Tasks**:
  - Add "Export CSV" button
  - Generate CSV from current table data
  - Trigger browser download
- **Acceptance Criteria**:
  - ✅ CSV export works
  - ✅ File named with date
- **Effort**: 1 story point

**Sprint 3.3 Definition of Done**:
- Corporate connector table fully functional
- Sorting, filtering, copy, export all working

---

### Sprint 3.4: Segment Breakdown Grid (2 days)

#### User Stories

**US-3.4.1: Calculate Segment Metrics**
- **Story**: As Peter, I want to calculate avg booking freq, top neighborhoods, CLV, churn risk per segment
- **Tasks**:
  - Implement `calculateSegmentMetrics()` function
  - Calculate for all 4 segments
  - Store in data structure
- **Acceptance Criteria**:
  - ✅ Metrics calculated accurately
- **Effort**: 2 story points

**US-3.4.2: Build Segment Grid Component**
- **Story**: As Peter, I want a 4-row table showing key metrics per segment
- **Tasks**:
  - Create `js/components/segment-grid.js`
  - Render table with segment rows
  - Add colored left border per segment
  - Add churn risk badges
- **Acceptance Criteria**:
  - ✅ Grid renders with 4 segments
  - ✅ Metrics accurate
  - ✅ Visual design matches spec
- **Effort**: 2 story points

**US-3.4.3: Implement Segment Highlight on Click**
- **Story**: As a user, I want the selected segment row to highlight when I click the pie chart
- **Tasks**:
  - Listen for `segmentClick` event
  - Add background highlight to selected row
  - Remove highlight from others
- **Acceptance Criteria**:
  - ✅ Row highlights on click
- **Effort**: 1 story point

**Sprint 3.4 Definition of Done**:
- Segment grid complete
- All 4 dashboard components working together
- End-to-end filter flow tested

---

## EPIC 4: Best Practice Research Engine

**Goal**: Build library of 100+ event ideas from top 50 national clubs

**Business Value**: Reduce guesswork, copy proven programming concepts

**Duration**: 4 weeks (Week 7-10)

**Owner**: Peter

---

### Sprint 4.1: National Club Discovery (5 days)

**User Stories**: (Condensed for brevity)

- US-4.1.1: Create seed list of pickleball clubs in 30 NFL cities (2 pts)
- US-4.1.2: Query Google Places API for club details (3 pts)
- US-4.1.3: Fetch popular times data (3 pts)
- US-4.1.4: Calculate rank score and select top 50 (2 pts)
- US-4.1.5: Export to `national-clubs.json` (1 pt)

**Sprint 4.1 DoD**: 50 clubs identified with utilization data

---

### Sprint 4.2: Programming Intelligence Scraper (7 days)

**User Stories**:

- US-4.2.1: Scrape event calendars from club websites (5 pts)
- US-4.2.2: Scrape Instagram posts for event announcements (5 pts)
- US-4.2.3: Use AI to categorize events (skill level, type, pattern) (5 pts)
- US-4.2.4: Detect success signals (sold out, high engagement) (3 pts)
- US-4.2.5: Export to `programming-ideas.json` (1 pt)

**Sprint 4.2 DoD**: 100+ events cataloged with categories

---

### Sprint 4.3: Programming Idea Generator UI (8 days)

**User Stories**:

- US-4.3.1: Add "Programming Ideas" tab to dashboard (1 pt)
- US-4.3.2: Build filter panel (skill, type, time) (3 pts)
- US-4.3.3: Render event cards with filtering (4 pts)
- US-4.3.4: Implement "Copy to Campaign Template" (3 pts)
- US-4.3.5: Add export to CSV (1 pt)

**Sprint 4.3 DoD**: Programming Ideas dashboard live

---

## EPIC 5: Yield Management Foundation

**Goal**: Integrate booking data and build scenario planner + pricing recommender

**Business Value**: $30-50k annual revenue increase

**Duration**: 6 weeks (Week 11-16)

**Owner**: Peter + Christy

---

### Sprint 5.1: Booking Data Integration (5 days)

**User Stories**:

- US-5.1.1: Access PCC booking system and determine integration method (2 pts)
- US-5.1.2: Set up PostgreSQL database schema (2 pts)
- US-5.1.3: Import 12 months historical booking data (5 pts)
- US-5.1.4: Validate data quality (completeness, accuracy) (3 pts)
- US-5.1.5: Set up daily/weekly sync process (3 pts)

**Sprint 5.1 DoD**: Booking data integrated, validated

---

### Sprint 5.2-5.4: Scenario Planner & Dynamic Pricing (11 days)

**User Stories**: (Multiple sprints condensed)

- Scenario definition and revenue calculation (5 pts)
- Satisfaction scoring algorithm (3 pts)
- Comparison table UI (3 pts)
- Recommendation engine (3 pts)
- Demand forecasting for 168 time slots (5 pts)
- Pricing algorithm implementation (3 pts)
- Pricing heatmap visualization (5 pts)
- Export pricing schedule (1 pt)

**Sprints 5.2-5.4 DoD**: Yield Management dashboard live

---

### Sprint 5.5: Corporate Event Decision Tool (5 days)

**Goal**: Build real-time decision support for corporate event booking requests

#### User Stories

**US-5.5.1: Build Event Decision API Endpoint**
- **Story**: As Peter, I want an API endpoint that analyzes corporate event requests and calculates net value
- **Tasks**:
  - Create `/api/yield/event-decision` POST endpoint
  - Implement displaced booking query logic (PostgreSQL)
  - Implement churn cost calculation with segment-specific probabilities
  - Calculate net value = event revenue - estimated churn cost
  - Generate Accept/Counter/Decline recommendation
- **Acceptance Criteria**:
  - ✅ API returns analysis with displaced members, churn cost, net value, recommendation
  - ✅ Calculation uses segment-specific churn probabilities (Corporate: 5%, Social: 2%, Athletes: 3%, Casual: 1%)
  - ✅ Response time <2 seconds
- **Effort**: 5 story points
- **Owner**: Peter

**US-5.5.2: Build Alternative Slot Finder Algorithm**
- **Story**: As Peter, I want to suggest alternative time slots that minimize member displacement
- **Tasks**:
  - Query available slots ±3 days from requested date
  - Calculate displacement for each alternative slot
  - Rank by net value (highest first)
  - Return top 3 alternative slots
- **Acceptance Criteria**:
  - ✅ Algorithm finds slots with lower displacement
  - ✅ Alternatives ranked by net value
  - ✅ Maximum 3 alternatives returned
- **Effort**: 3 story points
- **Owner**: Peter

**US-5.5.3: Create Event Decision Modal Component**
- **Story**: As Christy, I want a modal that shows me the full event analysis when I receive a booking inquiry
- **Tasks**:
  - Create `EventDecisionModal` JavaScript component
  - Design 4-metric grid (Event Revenue, Displaced Bookings, Churn Cost, Net Value)
  - Implement recommendation badge with color coding (green=Accept, yellow=Counter, red=Decline)
  - Add alternative slots section
  - Add displaced members accordion (expandable table)
- **Acceptance Criteria**:
  - ✅ Modal opens with event details
  - ✅ All 4 metrics displayed correctly
  - ✅ Recommendation badge colored based on net value
  - ✅ Alternative slots clickable
  - ✅ Displaced members table expandable
- **Effort**: 5 story points
- **Owner**: Peter

**US-5.5.4: Implement Counter-offer Email Template Generation**
- **Story**: As Christy, I want to copy a pre-filled counter-offer email with alternative slots
- **Tasks**:
  - Create email template with merge fields (event name, alternative slots, pricing)
  - Add "Copy Counter-offer Email" button
  - Implement clipboard copy functionality
  - Show toast notification on success
- **Acceptance Criteria**:
  - ✅ Email template includes event details and alternatives
  - ✅ Button copies to clipboard
  - ✅ Toast shows "Copied!"
- **Effort**: 2 story points
- **Owner**: Peter

**US-5.5.5: Add Decision Logging to Database**
- **Story**: As Peter, I want to track all event decisions to measure recommendation accuracy
- **Tasks**:
  - Create `event_decisions` table schema
  - Implement POST `/api/yield/event-decision/log` endpoint
  - Store: event details, analysis results, recommendation, actual decision
  - Add decision tracking to modal "Accept Recommendation" button
- **Acceptance Criteria**:
  - ✅ Table schema created with all required fields
  - ✅ Decisions logged when button clicked
  - ✅ Actual decision vs. recommendation tracked
- **Effort**: 3 story points
- **Owner**: Peter

**Sprint 5.5 Definition of Done**:
- Event Decision API functional
- Modal renders with correct analysis
- Counter-offer email template works
- Decision logging operational
- Christy successfully analyzes 1 test event request

---

### Sprint 5.6: Mezzanine ROI Planner (6 days)

**Goal**: Build investment comparison tool for mezzanine conversion options

#### User Stories

**US-5.6.1: Define Investment Options and Financial Model**
- **Story**: As Christy, I want to compare 4 mezzanine investment options with clear ROI calculations
- **Tasks**:
  - Document 4 investment options (Hot Desks, Yoga Studio, Strength Training, Event Space)
  - Define financial parameters (setup cost, monthly revenue, monthly op cost)
  - Implement financial metrics calculation (payback period, annual ROI, 5-year value)
  - Create configuration file with investment options
- **Acceptance Criteria**:
  - ✅ 4 options defined with realistic costs and revenue estimates
  - ✅ Financial metrics calculated correctly (spot-check: Yoga Studio = 11.4 month payback, 105% ROI)
  - ✅ Configuration file validated
- **Effort**: 3 story points
- **Owner**: Christy + Peter

**US-5.6.2: Build Member Interest Survey and Analysis**
- **Story**: As Christy, I want to survey members about mezzanine amenity interest
- **Tasks**:
  - Design 4-question survey (rate interest in each option: Very Interested, Interested, Neutral, Not Interested)
  - Add survey to Google Forms
  - Distribute to 50 segmented members
  - Import responses to database
  - Calculate 5-star rating based on "Very Interested" percentage
- **Acceptance Criteria**:
  - ✅ Survey created and distributed
  - ✅ Responses collected from 30+ members
  - ✅ 5-star ratings calculated (e.g., 80% very interested = 5 stars)
- **Effort**: 3 story points
- **Owner**: Christy + Peter

**US-5.6.3: Build Recommendation Algorithm**
- **Story**: As Peter, I want a weighted scoring algorithm that recommends the best investment option
- **Tasks**:
  - Implement recommendation score formula:
    - Payback period score (30% weight, normalized inverse)
    - Annual ROI score (30% weight, normalized direct)
    - Member interest score (40% weight, 5-star rating normalized)
  - Calculate score for all 4 options
  - Rank by score (highest first)
  - Generate recommendation rationale text
- **Acceptance Criteria**:
  - ✅ Recommendation score calculated for all options
  - ✅ Top option identified (should be Yoga Studio in base case)
  - ✅ Rationale explains why (member interest + ROI + payback)
- **Effort**: 3 story points
- **Owner**: Peter

**US-5.6.4: Create Mezzanine ROI Planner UI Component**
- **Story**: As Christy, I want a dashboard view that shows investment comparison with clear recommendation
- **Tasks**:
  - Create `MezzanineROIPlannerComponent` JavaScript class
  - Build recommendation summary card (green gradient for recommended option)
  - Create ROI comparison table with 7 columns (Option, Cost, Payback, ROI, 5-Yr Value, Interest, Score)
  - Add 5-star rating visualization for member interest
  - Add priority segment filter dropdown
  - Style recommended row (green background, 🥇 medal icon)
- **Acceptance Criteria**:
  - ✅ Planner renders with all 4 options
  - ✅ Recommendation summary displayed prominently
  - ✅ Table sortable by column
  - ✅ Star ratings visible
  - ✅ Segment filter works
- **Effort**: 5 story points
- **Owner**: Peter

**US-5.6.5: Add Interactive Assumption Adjustment**
- **Story**: As Christy, I want to adjust revenue/cost assumptions to see how recommendation changes
- **Tasks**:
  - Create "Adjust Assumptions" modal
  - Add input fields for setup cost, monthly revenue, monthly op cost per option
  - Re-calculate financial metrics on input change
  - Update recommendation in real-time
- **Acceptance Criteria**:
  - ✅ Modal opens with current assumptions
  - ✅ Inputs update calculations
  - ✅ Recommendation updates if top option changes
- **Effort**: 3 story points
- **Owner**: Peter

**US-5.6.6: Add PDF Export for Board Presentation**
- **Story**: As Christy, I want to export the ROI analysis as a PDF to present to the board
- **Tasks**:
  - Implement POST `/api/yield/mezzanine-roi/export` endpoint
  - Generate PDF with comparison table and recommendation
  - Add PCC branding (logo, colors)
  - Add "Export to PDF" button
- **Acceptance Criteria**:
  - ✅ PDF generates with correct data
  - ✅ PDF includes branding
  - ✅ File downloads as `mezzanine_roi_analysis.pdf`
- **Effort**: 3 story points
- **Owner**: Peter

**Sprint 5.6 Definition of Done**:
- Mezzanine ROI Planner functional
- All 4 investment options compared
- Recommendation algorithm working
- PDF export operational
- Christy presents analysis to board (pilot use case)

---

## Story Point Reference

- **1 point**: 1-2 hours (simple UI update, config change)
- **2 points**: 2-4 hours (component with basic logic)
- **3 points**: 4-8 hours (complex component, API integration)
- **5 points**: 1-2 days (full feature, multiple integrations)
- **8 points**: 2-3 days (epic-level feature)

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 8, 2025 | Peter Giordano | Initial epics and sprint breakdown |

---

**End of Epics & Sprints**
