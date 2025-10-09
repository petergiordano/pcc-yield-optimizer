# Functional Specification: Customer Intelligence Center

**Project**: PCC Yield Optimizer - Customer Intelligence Center
**Version**: 2.0
**Status**: Approved for Development
**Last Updated**: October 8, 2025

---

## Document Organization

This Functional Specification is part of a comprehensive specification suite:

- **[PRD](./PRD_Customer_Intelligence_Center_v2.md)**: Product vision, business goals, user needs (**START HERE**)
- **Functional Spec** (this document): What the system should do
- **[Technical Spec](./TECHNICAL_SPEC_Customer_Intelligence.md)**: How to build it
- **[Design Spec](./DESIGN_SPEC_Customer_Intelligence.md)**: What it looks like
- **[Epics & Sprints](./EPICS_AND_SPRINTS.md)**: Work breakdown structure
- **[Project Milestones](./PROJECT_MILESTONES.md)**: Timeline and releases

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Module 1: Customer Profiling & Segmentation](#module-1-customer-profiling--segmentation)
3. [Module 2: Demographics Overlay](#module-2-demographics-overlay)
4. [Module 3: Customer Intelligence Dashboard](#module-3-customer-intelligence-dashboard)
5. [Module 4: Best Practice Research Engine](#module-4-best-practice-research-engine)
6. [Module 5: Yield Management Foundation](#module-5-yield-management-foundation)
7. [Use Cases & User Flows](#use-cases--user-flows)
8. [Business Logic & Rules](#business-logic--rules)
9. [Data Requirements](#data-requirements)
10. [Integration Points](#integration-points)

---

## System Overview

### Purpose

The Customer Intelligence Center transforms raw customer data into actionable business insights through:
1. **Customer segmentation** (4 segments based on behavior + surveys)
2. **Geographic analysis** (demographics overlay + member clustering)
3. **Opportunity identification** (corporate connectors, programming ideas)
4. **Revenue optimization** (yield management scenarios, dynamic pricing)

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                   PCC Yield Optimizer (Frontend)                │
│                                                                  │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ Competitive│  │  Customer    │  │  Yield Management     │  │
│  │ Intel View │  │  Intel View  │  │  View (Phase 3)       │  │
│  │ (Existing) │  │  (NEW)       │  │  (NEW)                │  │
│  └────────────┘  └──────────────┘  └───────────────────────┘  │
│                                                                  │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                  │
│                                                                  │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐  │
│  │ Facilities   │  │  Member Data  │  │  Booking Data      │  │
│  │ (Existing)   │  │  (Google      │  │  (PostgreSQL -     │  │
│  │              │  │   Sheets)     │  │   Phase 3)         │  │
│  └──────────────┘  └───────────────┘  └────────────────────┘  │
│                                                                  │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐  │
│  │ Demographics │  │  National     │  │  Survey Responses  │  │
│  │ (Census      │  │  Clubs DB     │  │  (Google Forms)    │  │
│  │  GeoJSON)    │  │  (JSON)       │  │                    │  │
│  └──────────────┘  └───────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   External APIs                                  │
│                                                                  │
│  • Census Bureau API (demographics)                             │
│  • Google Popular Times API (club utilization - existing)       │
│  • Instagram/Web Scraping (programming ideas - Phase 2)         │
│  • Clearbit/People Data Labs (enrichment - future)              │
└─────────────────────────────────────────────────────────────────┘
```

### System Context

**Existing System** (PCC Yield Optimizer v1.0):
- Competitive intelligence heatmaps
- Opportunity scoring
- Geographic map with facilities
- Gap analysis grid

**New System** (Customer Intelligence Center):
- **Extends** existing dashboard with 3 new modules (Phases 1-3)
- **Integrates** with existing map component (demographics overlay)
- **Reuses** design system, navigation patterns, state management

**Approach**: Incremental enhancement, not replacement

---

## Module 1: Customer Profiling & Segmentation

**Owner**: Christy (business) + Peter (technical)
**Timeline**: Weeks 1-2
**Dependencies**: Member survey, LinkedIn enrichment

---

### FR-1.1: Survey System

**Requirement**: System shall collect customer profile data via survey to enable segmentation

#### Functional Behavior

**1.1.1 Survey Design**
- **Input**: Business requirements (segment criteria)
- **Output**: 10-question survey in Google Forms/Typeform
- **Questions**:
  1. Why did you join PCC? (radio: fitness / social / competitive / convenient location)
  2. How often do you play per week? (number input)
  3. What times do you prefer? (checkboxes: morning / afternoon / evening)
  4. What amenities interest you? (checkboxes: yoga / hot desks / strength training / café / lounge)
  5. Do you typically play with the same partners? (yes / no)
  6. Does your company do team-building events? (yes / no / not applicable)
  7. Employer name (text input - optional)
  8. Job title (text input - optional)
  9. Work location (address - optional)
  10. How did you hear about PCC? (text input)

**1.1.2 Survey Distribution**
- **Trigger**: Manual send by Christy (Week 1)
- **Channel**: Email list from booking system
- **Target Audience**: 50 VIP members (selected by Christy)
- **Reminder Logic**: Send reminder after 7 days to non-respondents
- **Incentive**: $10 credit for completion

**1.1.3 Response Collection**
- **Storage**: Google Sheets (automatic sync from Google Forms)
- **Validation**: All questions optional except #1-2 (critical for segmentation)
- **Deduplication**: Link survey to member ID (prevent multiple submissions)

#### Acceptance Criteria

- ✅ Survey created with 10 questions
- ✅ Survey distributed to 50 members via email
- ✅ Response rate 60%+ (30+ responses)
- ✅ Responses automatically populate Google Sheet
- ✅ Reminder sent to non-respondents after 7 days

#### Data Schema (Survey Responses)

```javascript
{
  memberId: "M00123",
  responseDate: "2025-10-15T14:30:00Z",
  primaryMotivation: "social",  // fitness | social | competitive | convenient
  bookingFrequency: 2.5,  // times per week
  preferredTimes: ["evening"],  // morning | afternoon | evening
  amenityInterests: ["yoga", "cafe"],  // amenities they want
  samePartners: true,  // consistent partners
  companyEvents: true,  // employer does team events
  employer: "TechCorp Inc",  // optional
  jobTitle: "VP Marketing",  // optional
  workLocation: "123 W Madison, Chicago, IL",  // optional
  referralSource: "Instagram ad"
}
```

---

### FR-1.2: Manual Segmentation Model

**Requirement**: System shall classify members into 4 segments using survey + booking data

#### Functional Behavior

**1.2.1 Segment Criteria**

| Segment | Criteria | Data Sources |
|---------|----------|-------------|
| **Corporate Power Users** | • Works in West Loop/River North/Loop<br>• Job title includes VP/Director/Manager<br>• Books 3+ times/week<br>• Company does team events (survey Q6 = yes) | Survey (employer, title, location) + Booking frequency |
| **Social Ambassadors** | • Primary motivation = "social" (survey Q1)<br>• Rotates partners (survey Q5 = no)<br>• Amenity interest includes café/lounge | Survey responses |
| **Competitive Athletes** | • Primary motivation = "competitive"<br>• Books off-peak (morning preference)<br>• Same partners (survey Q5 = yes) | Survey + Booking patterns |
| **Casual Drop-ins** | • Books <1x/week<br>• No survey response (low engagement) | Booking frequency |

**1.2.2 Classification Process**

1. **Export member list** from booking system (50 VIP members)
2. **Calculate booking frequency** (times/week over past 3 months)
3. **Merge survey responses** (match by member ID)
4. **Apply decision tree**:
   ```
   if (bookingFreq >= 3 && jobTitle includes ["VP", "Director", "Manager"] && companyEvents == true)
     → Corporate Power User
   else if (primaryMotivation == "social" && samePartners == false)
     → Social Ambassador
   else if (primaryMotivation == "competitive" && samePartners == true)
     → Competitive Athlete
   else if (bookingFreq < 1)
     → Casual Drop-in
   else
     → Manual review (edge case)
   ```
5. **Manual review** by Christy for edge cases (10-20% of members)

**1.2.3 Segment Assignment**

- **Storage**: Google Sheets with columns:
  - Member ID
  - Name
  - Segment (Corporate Power User | Social Ambassador | Competitive Athlete | Casual Drop-in)
  - Booking Frequency (times/week)
  - Primary Motivation (from survey)
  - Employer (from survey)
  - Confidence (High | Medium | Low) - based on data completeness

#### Acceptance Criteria

- ✅ 50 members classified into 4 segments
- ✅ Decision tree documented (can be explained to team)
- ✅ Confidence score assigned (based on data availability)
- ✅ Christy validates accuracy (spot-check 10 members)

---

### FR-1.3: Corporate Connector Identification

**Requirement**: System shall identify top 20 members most likely to refer corporate events

#### Functional Behavior

**1.3.1 Identification Criteria**

Apply filters to segmented member list:
1. **Segment** = "Corporate Power User" (from FR-1.2)
2. **Employer size** >= 100 employees (LinkedIn lookup or survey)
3. **Work proximity** within 3 miles of PCC (geo-calculation from work address)
4. **Job title** includes decision-making keywords: VP, Director, Manager, Chief, Head of
5. **Engagement** = booking frequency 2+ times/week (demonstrates commitment)

**1.3.2 Enrichment Process**

For each Corporate Power User:
1. **Manual LinkedIn lookup**:
   - Verify employer name
   - Verify job title
   - Check company size (LinkedIn company page)
   - Check work address (company location)
2. **Calculate proximity**:
   ```javascript
   distance = calculateDistance(
     workAddress,
     pccAddress // 4242 N. Elston Ave, Chicago, IL 60618
   )
   if (distance <= 3 miles) → eligible
   ```
3. **Score by priority**:
   ```javascript
   score =
     (bookingFreq / 3) * 40 +  // 40% weight on engagement
     (jobSeniority) * 30 +      // 30% weight on decision-making authority
     (companySize / 500) * 20 + // 20% weight on company size
     (proximity_inverse) * 10   // 10% weight on proximity (closer = higher)
   ```

**1.3.3 List Generation**

- **Output**: Google Sheet with columns:
  - Rank (1-20)
  - Member Name
  - Employer
  - Job Title
  - Work Address
  - Distance from PCC (miles)
  - Booking Frequency (times/week)
  - Company Size (employees)
  - Priority Score (0-100)
  - Outreach Status (Not Contacted | Emailed | Booked | Declined)

- **Export**: CSV for CRM integration (future)

**1.3.4 Outreach Template**

System shall provide email template:
```
Subject: {{MemberName}} - Corporate Pickleball for {{CompanyName}}?

Hi {{MemberName}},

We noticed you're at {{CompanyName}} and a regular at PCC ({{BookingFreq}}x/week - impressive!).

We're expanding our corporate event offerings and thought {{CompanyName}} might be interested in team-building pickleball nights. We can accommodate groups of 10-50 people with:

• Private court time
• Equipment included
• Optional coaching/instruction
• Café/bar for post-game socializing

Would you be open to a quick chat about whether this could be a fit for your team?

Thanks,
Christy

P.S. If you're not the right person, who should I talk to?
```

#### Acceptance Criteria

- ✅ List contains 20+ corporate connector candidates
- ✅ Each member has: employer, title, work address, company size
- ✅ Members ranked by priority score
- ✅ Email template created with merge fields
- ✅ Outreach tracking spreadsheet set up

#### Success Metrics

- At least 1 corporate event lead generated within 4 weeks
- $500-2,000 revenue from booked events

---

## Module 2: Demographics Overlay

**Owner**: Peter (technical)
**Timeline**: Weeks 3-4
**Dependencies**: Census data download, existing map component

---

### FR-2.1: Census Data Integration

**Requirement**: System shall load Census tract demographic data for Cook County, IL

#### Functional Behavior

**2.1.1 Data Acquisition**

1. **Download TIGER/Line Shapefiles**:
   - Source: [U.S. Census Bureau](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)
   - Geography: Cook County, IL Census Tracts
   - Year: 2023 (most recent)
   - Format: Shapefile (.shp + .shx + .dbf)

2. **Download ACS Demographic Data**:
   - Source: [American Community Survey 5-Year Estimates](https://data.census.gov/)
   - Tables:
     - B19013: Median Household Income
     - B15003: Educational Attainment (% bachelor's degree or higher)
     - B01003: Total Population (for density calculation)
   - Geography: Census Tract level
   - Year: 2023

3. **Calculate Derived Fields**:
   ```javascript
   populationDensity = totalPopulation / landAreaSqMiles
   ```

**2.1.2 Data Processing**

1. **Join Demographics to Boundaries**:
   ```python
   # Pseudocode
   shapefile = loadShapefile("cook_county_tracts.shp")
   demographics = loadCSV("acs_demographics.csv")

   joined = merge(
     shapefile,
     demographics,
     on="GEOID"  // Census tract ID
   )
   ```

2. **Convert to GeoJSON**:
   ```python
   geojson = convertToGeoJSON(joined)
   ```

3. **GeoJSON Structure**:
   ```json
   {
     "type": "FeatureCollection",
     "features": [
       {
         "type": "Feature",
         "geometry": {
           "type": "Polygon",
           "coordinates": [[[-87.7010, 41.9590], ...]]
         },
         "properties": {
           "GEOID": "17031081800",
           "medianIncome": 87500,
           "educationBachelors": 0.62,  // 62%
           "populationDensity": 8400,   // people per sq mi
           "landAreaSqMiles": 0.45
         }
       },
       ...
     ]
   }
   ```

4. **Save to Project**:
   - File: `data/geo/demographics.geojson`
   - Size target: <5 MB (for fast loading)

#### Acceptance Criteria

- ✅ Census tract boundaries for Cook County downloaded (GeoJSON)
- ✅ Demographic data joined (income, education, density)
- ✅ File saved to `data/geo/demographics.geojson`
- ✅ Spot-check: PCC's tract (GEOID 17031081800) has correct data

---

### FR-2.2: Choropleth Map Rendering

**Requirement**: System shall render demographic data as color-coded choropleth on map

#### Functional Behavior

**2.2.1 Layer Initialization**

When user toggles "Show Demographics Overlay":
1. **Load GeoJSON**: Fetch `data/geo/demographics.geojson`
2. **Create Leaflet GeoJSON layer**:
   ```javascript
   demographicsLayer = L.geoJSON(demographicsData, {
     style: (feature) => {
       return {
         fillColor: getColor(feature.properties[currentVariable]),
         fillOpacity: 0.6,
         color: '#666',  // border
         weight: 1
       };
     },
     onEachFeature: attachTooltip
   });
   ```
3. **Add to map**: `map.addLayer(demographicsLayer)`

**2.2.2 Color Scale Calculation**

```javascript
function getColor(value) {
  if (currentVariable === 'medianIncome') {
    // Income: Red (low) → Yellow → Green (high)
    if (value >= 100000) return '#10B981';  // green
    if (value >= 75000)  return '#FBBF24';  // yellow
    if (value >= 50000)  return '#F59E0B';  // orange
    return '#EF4444';  // red
  }

  if (currentVariable === 'educationBachelors') {
    // Education: Red (low) → Blue (high)
    if (value >= 0.60) return '#3B82F6';  // blue
    if (value >= 0.40) return '#60A5FA';  // light blue
    if (value >= 0.20) return '#FBBF24';  // yellow
    return '#EF4444';  // red
  }

  if (currentVariable === 'populationDensity') {
    // Density: White (low) → Purple (high)
    if (value >= 15000) return '#7C3AED';  // purple
    if (value >= 10000) return '#A78BFA';  // light purple
    if (value >= 5000)  return '#C4B5FD';  // lighter purple
    return '#FFFFFF';  // white
  }
}
```

**2.2.3 Interactive Controls**

**Toggle Control**:
```html
<label>
  <input type="checkbox" id="demographics-toggle">
  Show Demographics Overlay
</label>
```

**Variable Selector**:
```html
<select id="demographics-variable">
  <option value="medianIncome">Median Income</option>
  <option value="educationBachelors">Education (Bachelor's+)</option>
  <option value="populationDensity">Population Density</option>
</select>
```

**Behavior**:
- When checkbox toggled → show/hide layer
- When dropdown changed → recalculate colors, re-render layer
- When variable changed → update legend

**2.2.4 Tooltips**

On mouse hover over census tract:
```javascript
function attachTooltip(feature, layer) {
  const props = feature.properties;
  const tooltipContent = `
    <strong>Census Tract: ${props.GEOID}</strong><br>
    Median Income: $${props.medianIncome.toLocaleString()}<br>
    Education (Bachelor's+): ${(props.educationBachelors * 100).toFixed(0)}%<br>
    Population Density: ${props.populationDensity.toLocaleString()} /sq mi
  `;
  layer.bindTooltip(tooltipContent);
}
```

**2.2.5 Legend**

```
┌─────────────────────────┐
│ Demographics Legend     │
├─────────────────────────┤
│ Median Income           │
│                         │
│ █ $100k+   (High)      │
│ █ $75k-100k            │
│ █ $50k-75k             │
│ █ <$50k    (Low)       │
└─────────────────────────┘
```

- Legend updates when variable changes
- Shows 4-5 color bins with value ranges

#### Acceptance Criteria

- ✅ Choropleth renders on map with correct colors
- ✅ Toggle control shows/hides overlay
- ✅ Dropdown switches between 3 variables
- ✅ Tooltips display tract-level data on hover
- ✅ Legend updates to match selected variable
- ✅ Layer opacity allows facility markers to remain visible

---

### FR-2.3: Integration with Existing Map

**Requirement**: System shall integrate demographics overlay into existing Geographic Map view

#### Functional Behavior

**2.3.1 Layer Management**

Existing layers (from v1.0):
1. Base map (OpenStreetMap tiles)
2. Facility markers (PCC, SPF, etc.)
3. CTA transit lines (optional overlay)

New layer:
4. **Demographics overlay** (census tracts)

**Layer Order** (bottom to top):
```
1. Base map
2. Demographics overlay (if enabled)
3. CTA transit lines (if enabled)
4. Facility markers (always on top)
```

**2.3.2 UI Integration**

Add controls to existing map sidebar:
```html
<div class="map-controls">
  <!-- Existing controls -->
  <label>
    <input type="checkbox" id="show-cta" checked>
    Show CTA Transit
  </label>

  <!-- NEW: Demographics controls -->
  <label>
    <input type="checkbox" id="show-demographics">
    Show Demographics
  </label>

  <div id="demographics-options" style="display: none;">
    <label>Variable:</label>
    <select id="demographics-variable">
      <option value="medianIncome">Median Income</option>
      <option value="educationBachelors">Education</option>
      <option value="populationDensity">Density</option>
    </select>
  </div>

  <div id="demographics-legend"></div>
</div>
```

**2.3.3 State Management**

```javascript
const mapState = {
  showCTA: true,         // existing
  showDemographics: false,  // NEW
  demographicsVariable: 'medianIncome'  // NEW
};

// When demographics checkbox changes
document.getElementById('show-demographics').addEventListener('change', (e) => {
  mapState.showDemographics = e.target.checked;

  if (mapState.showDemographics) {
    demographicsLayer.addTo(map);
    document.getElementById('demographics-options').style.display = 'block';
  } else {
    map.removeLayer(demographicsLayer);
    document.getElementById('demographics-options').style.display = 'none';
  }
});
```

#### Acceptance Criteria

- ✅ Demographics overlay integrates into existing map view
- ✅ Layer order correct (facilities on top, demographics below)
- ✅ Controls added to map sidebar
- ✅ State management works (toggle on/off, switch variables)
- ✅ No conflicts with existing CTA overlay

---

## Module 3: Customer Intelligence Dashboard

**Owner**: Peter (technical) + Christy (UX feedback)
**Timeline**: Weeks 5-6
**Dependencies**: Segmentation data (Module 1)

---

### FR-3.1: Dashboard Tab Navigation

**Requirement**: System shall add "Customer Intelligence" tab to main dashboard navigation

#### Functional Behavior

**3.1.1 Tab Addition**

Existing tabs:
1. 🔥 Heatmap
2. 🎯 Opportunities
3. 📊 Gap Analysis
4. 🗺️ Geographic Map

New tab:
5. **👥 Customer Intel** (NEW)

Future tabs (Phase 2-3):
6. 💡 Programming Ideas (Phase 2)
7. 💰 Yield Management (Phase 3)

**3.1.2 Tab Switching Logic**

```javascript
document.querySelector('[data-view="customer-intel"]').addEventListener('click', () => {
  // Hide all views
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.style.display = 'none';
  });

  // Show customer intel view
  document.getElementById('customer-intel-view').style.display = 'block';

  // Update active tab
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Initialize components (lazy load)
  if (!customerIntelInitialized) {
    initCustomerIntel();
    customerIntelInitialized = true;
  }
});
```

#### Acceptance Criteria

- ✅ New tab appears in navigation
- ✅ Clicking tab shows Customer Intelligence view
- ✅ Other views hidden when Customer Intel active
- ✅ Tab styling matches existing design system

---

### FR-3.2: Segment Overview (Pie Chart)

**Requirement**: System shall display member distribution across 4 segments as interactive pie chart

#### Functional Behavior

**3.2.1 Data Loading**

```javascript
// Load segmented member data
const segmentData = await fetch('/data/customer-segments.json').then(r => r.json());

// Aggregate by segment
const segmentCounts = {
  'Corporate Power Users': 0,
  'Social Ambassadors': 0,
  'Competitive Athletes': 0,
  'Casual Drop-ins': 0
};

segmentData.members.forEach(member => {
  segmentCounts[member.segment]++;
});
```

**3.2.2 Visualization (D3.js Pie Chart)**

```javascript
const pie = d3.pie()
  .value(d => d.count)
  .sort(null);

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(120);

const svg = d3.select('#segment-overview')
  .append('svg')
  .attr('width', 300)
  .attr('height', 300);

const g = svg.append('g')
  .attr('transform', 'translate(150, 150)');

const slices = g.selectAll('.slice')
  .data(pie(Object.entries(segmentCounts).map(([segment, count]) => ({segment, count}))))
  .enter()
  .append('g')
  .attr('class', 'slice');

// Draw slices
slices.append('path')
  .attr('d', arc)
  .attr('fill', d => getSegmentColor(d.data.segment))
  .attr('stroke', '#fff')
  .attr('stroke-width', 2);

// Add labels (%)
slices.append('text')
  .attr('transform', d => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => `${((d.data.count / totalMembers) * 100).toFixed(0)}%`);
```

**3.2.3 Color Mapping**

```javascript
function getSegmentColor(segment) {
  const colors = {
    'Corporate Power Users': '#3B82F6',  // blue (business)
    'Social Ambassadors': '#10B981',     // green (community)
    'Competitive Athletes': '#EF4444',   // red (intensity)
    'Casual Drop-ins': '#6B7280'         // gray (neutral)
  };
  return colors[segment];
}
```

**3.2.4 Interactivity**

```javascript
slices.on('click', (event, d) => {
  const selectedSegment = d.data.segment;

  // Filter all other views to this segment
  filterBySegment(selectedSegment);

  // Visual feedback
  slices.selectAll('path').attr('opacity', 0.3);
  d3.select(event.target).attr('opacity', 1.0);
});

slices.on('mouseover', (event, d) => {
  showTooltip(event, `
    <strong>${d.data.segment}</strong><br>
    ${d.data.count} members (${((d.data.count / totalMembers) * 100).toFixed(0)}%)
  `);
});
```

#### Acceptance Criteria

- ✅ Pie chart renders with 4 segments
- ✅ Each segment colored distinctly
- ✅ Percentages displayed on slices
- ✅ Clicking segment filters other views
- ✅ Hover shows tooltip with member count

---

### FR-3.3: Neighborhood Heatmap

**Requirement**: System shall display member density by zip code on Chicago map

#### Functional Behavior

**3.3.1 Data Aggregation**

```javascript
// Group members by zip code
const membersByZip = {};

segmentData.members.forEach(member => {
  const zip = member.zipCode;
  if (!membersByZip[zip]) {
    membersByZip[zip] = {
      count: 0,
      members: []
    };
  }
  membersByZip[zip].count++;
  membersByZip[zip].members.push(member);
});
```

**3.3.2 Visualization (Leaflet Choropleth)**

```javascript
// Load Chicago zip code boundaries
const zipBoundaries = await fetch('/data/geo/chicago-zips.geojson').then(r => r.json());

// Create choropleth layer
const neighborhoodLayer = L.geoJSON(zipBoundaries, {
  style: (feature) => {
    const zip = feature.properties.ZIP;
    const count = membersByZip[zip]?.count || 0;

    return {
      fillColor: getMemberDensityColor(count),
      fillOpacity: 0.7,
      color: '#333',
      weight: 1
    };
  },
  onEachFeature: (feature, layer) => {
    const zip = feature.properties.ZIP;
    const data = membersByZip[zip] || {count: 0};

    layer.on('click', () => {
      showMemberList(data.members);
    });

    layer.bindTooltip(`
      <strong>Zip: ${zip}</strong><br>
      ${data.count} members
    `);
  }
});

neighborhoodLayer.addTo(map);
```

**3.3.3 Color Scale**

```javascript
function getMemberDensityColor(count) {
  if (count >= 16) return '#1E40AF';  // dark blue
  if (count >= 6)  return '#3B82F6';  // medium blue
  if (count >= 1)  return '#93C5FD';  // light blue
  return '#F3F4F6';  // gray (no members)
}
```

**3.3.4 Member List Modal**

When user clicks neighborhood:
```javascript
function showMemberList(members) {
  const modal = document.getElementById('member-list-modal');
  const tableBody = modal.querySelector('tbody');

  tableBody.innerHTML = members.map(member => `
    <tr>
      <td>${member.name}</td>
      <td>${member.segment}</td>
      <td>${member.bookingFrequency}x/week</td>
    </tr>
  `).join('');

  modal.style.display = 'block';
}
```

#### Acceptance Criteria

- ✅ Map shows Chicago zip codes colored by member count
- ✅ Color scale: light blue (1-5) → dark blue (16+)
- ✅ Clicking zip code shows member list modal
- ✅ Tooltips show zip code + member count
- ✅ Filter by segment updates map colors

---

### FR-3.4: Corporate Connector Table

**Requirement**: System shall display sortable, filterable table of corporate connector members

#### Functional Behavior

**3.4.1 Table Rendering**

```javascript
const connectors = segmentData.members
  .filter(m => m.segment === 'Corporate Power Users')
  .filter(m => m.employer && m.jobTitle)
  .sort((a, b) => b.priorityScore - a.priorityScore)
  .slice(0, 20);  // top 20

const tableHTML = `
  <table class="corporate-connector-table">
    <thead>
      <tr>
        <th data-sort="name">Member Name</th>
        <th data-sort="employer">Employer</th>
        <th data-sort="title">Job Title</th>
        <th data-sort="location">Work Location</th>
        <th data-sort="frequency">Booking Freq</th>
        <th data-sort="status">Outreach Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${connectors.map(member => `
        <tr>
          <td>${member.name}</td>
          <td>${member.employer}</td>
          <td>${member.jobTitle}</td>
          <td>${member.workAddress}</td>
          <td>${member.bookingFrequency}x/week</td>
          <td>
            <select class="outreach-status" data-member-id="${member.id}">
              <option value="not-contacted" ${member.outreachStatus === 'not-contacted' ? 'selected' : ''}>Not Contacted</option>
              <option value="emailed" ${member.outreachStatus === 'emailed' ? 'selected' : ''}>Emailed</option>
              <option value="booked" ${member.outreachStatus === 'booked' ? 'selected' : ''}>Booked</option>
              <option value="declined" ${member.outreachStatus === 'declined' ? 'selected' : ''}>Declined</option>
            </select>
          </td>
          <td>
            <button class="copy-email-btn" data-member-id="${member.id}">
              Copy Email
            </button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  </table>
`;
```

**3.4.2 Sorting**

```javascript
document.querySelectorAll('th[data-sort]').forEach(th => {
  th.addEventListener('click', () => {
    const sortKey = th.dataset.sort;
    const sortOrder = th.classList.contains('asc') ? 'desc' : 'asc';

    // Toggle sort order
    document.querySelectorAll('th').forEach(t => t.classList.remove('asc', 'desc'));
    th.classList.add(sortOrder);

    // Sort data
    connectors.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    // Re-render table
    renderTable(connectors);
  });
});
```

**3.4.3 Filtering**

```javascript
// Filter by employer
document.getElementById('filter-employer').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  const filtered = connectors.filter(member =>
    member.employer.toLowerCase().includes(query)
  );

  renderTable(filtered);
});
```

**3.4.4 Export to CSV**

```javascript
document.getElementById('export-csv-btn').addEventListener('click', () => {
  const csv = [
    ['Name', 'Employer', 'Job Title', 'Work Location', 'Booking Freq', 'Outreach Status'],
    ...connectors.map(m => [
      m.name,
      m.employer,
      m.jobTitle,
      m.workAddress,
      `${m.bookingFrequency}x/week`,
      m.outreachStatus
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csv], {type: 'text/csv'});
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'corporate-connectors.csv';
  a.click();
});
```

**3.4.5 Copy Email Template**

```javascript
document.querySelectorAll('.copy-email-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const memberId = e.target.dataset.memberId;
    const member = connectors.find(m => m.id === memberId);

    const emailTemplate = `
Subject: ${member.name} - Corporate Pickleball for ${member.employer}?

Hi ${member.name.split(' ')[0]},

We noticed you're at ${member.employer} and a regular at PCC (${member.bookingFrequency}x/week - impressive!).

We're expanding our corporate event offerings and thought ${member.employer} might be interested in team-building pickleball nights.

Would you be open to a quick chat about whether this could be a fit for your team?

Thanks,
Christy
    `.trim();

    navigator.clipboard.writeText(emailTemplate);
    showToast('Email template copied!');
  });
});
```

#### Acceptance Criteria

- ✅ Table displays top 20 corporate connectors
- ✅ Columns: Name, Employer, Title, Location, Frequency, Status, Actions
- ✅ Clicking column header sorts table
- ✅ Filter by employer name works
- ✅ Export to CSV functional
- ✅ "Copy Email" button copies personalized template to clipboard
- ✅ Outreach status dropdown updates data

---

### FR-3.5: Segment Breakdown Grid

**Requirement**: System shall display key metrics for each segment in summary table

#### Functional Behavior

**3.5.1 Metric Calculation**

```javascript
const segments = ['Corporate Power Users', 'Social Ambassadors', 'Competitive Athletes', 'Casual Drop-ins'];

const segmentStats = segments.map(segment => {
  const members = segmentData.members.filter(m => m.segment === segment);

  const avgBookingFreq = members.reduce((sum, m) => sum + m.bookingFrequency, 0) / members.length;

  const neighborhoods = [...new Set(members.map(m => m.neighborhood))]
    .map(n => ({neighborhood: n, count: members.filter(m => m.neighborhood === n).length}))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const avgCLV = calculateCLV(segment);  // from business logic
  const churnRisk = estimateChurnRisk(segment);  // from business logic

  return {
    segment,
    memberCount: members.length,
    avgBookingFreq: avgBookingFreq.toFixed(1),
    topNeighborhoods: neighborhoods.map(n => n.neighborhood).join(', '),
    avgCLV: `$${avgCLV.toLocaleString()}`,
    churnRisk
  };
});
```

**3.5.2 Table Rendering**

```html
<table class="segment-breakdown-grid">
  <thead>
    <tr>
      <th>Segment</th>
      <th>Member Count</th>
      <th>Avg Booking Freq</th>
      <th>Top 3 Neighborhoods</th>
      <th>Avg CLV</th>
      <th>Churn Risk</th>
    </tr>
  </thead>
  <tbody>
    ${segmentStats.map(stat => `
      <tr>
        <td><strong>${stat.segment}</strong></td>
        <td>${stat.memberCount}</td>
        <td>${stat.avgBookingFreq}x/week</td>
        <td>${stat.topNeighborhoods}</td>
        <td>${stat.avgCLV}</td>
        <td>
          <span class="risk-badge risk-${stat.churnRisk.toLowerCase()}">
            ${stat.churnRisk}
          </span>
        </td>
      </tr>
    `).join('')}
  </tbody>
</table>
```

**3.5.3 Visual Indicators**

```css
.risk-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.risk-low {
  background: #D1FAE5;  /* light green */
  color: #065F46;
}

.risk-medium {
  background: #FEF3C7;  /* light yellow */
  color: #92400E;
}

.risk-high {
  background: #FEE2E2;  /* light red */
  color: #991B1B;
}
```

#### Acceptance Criteria

- ✅ Grid displays 4 segments with key metrics
- ✅ Calculations accurate (avg booking freq, top neighborhoods, CLV)
- ✅ Churn risk color-coded (green/yellow/red)
- ✅ Clicking segment name filters other views

---

## Module 4: Best Practice Research Engine

**Owner**: Peter (technical)
**Timeline**: Weeks 7-10
**Dependencies**: None (independent module)

---

### FR-4.1: National Club Discovery

**Requirement**: System shall identify top 50 busiest pickleball clubs using Google Popular Times API

#### Functional Behavior

**4.1.1 Seed List Generation**

```javascript
const nflCities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX',
  'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
  // ... 30 total NFL cities
];

const seedClubs = [];

for (const city of nflCities) {
  // Google Places API search
  const results = await googlePlaces.textSearch({
    query: `pickleball club ${city}`,
    type: 'establishment'
  });

  seedClubs.push(...results.filter(club =>
    club.types.includes('gym') || club.types.includes('sports_club')
  ));
}
```

**4.1.2 Popularity Scoring**

```javascript
for (const club of seedClubs) {
  // Fetch popular times data
  const popularTimes = await googlePlaces.getPopularTimes(club.place_id);

  // Calculate average utilization
  const avgUtilization = calculateAvgUtilization(popularTimes);

  // Calculate peak consistency (how often they hit 90%+)
  const peakConsistency = popularTimes.filter(slot => slot.popularity >= 90).length / popularTimes.length;

  // Rank score
  club.rankScore = (avgUtilization * 0.6) + (peakConsistency * 0.4) * 100;
}

// Sort by rank score
const topClubs = seedClubs
  .sort((a, b) => b.rankScore - a.rankScore)
  .slice(0, 50);
```

**4.1.3 Data Enrichment**

```javascript
for (const club of topClubs) {
  // Get details from Google Places
  const details = await googlePlaces.getDetails(club.place_id);

  club.website = details.website;
  club.phone = details.formatted_phone_number;
  club.rating = details.rating;
  club.reviewCount = details.user_ratings_total;

  // Scrape Instagram handle from website
  if (club.website) {
    const html = await fetch(club.website).then(r => r.text());
    club.instagram = extractInstagramHandle(html);  // regex scrape
  }
}
```

**4.1.4 Data Export**

```javascript
const output = {
  generatedAt: new Date().toISOString(),
  clubs: topClubs.map(club => ({
    id: club.place_id,
    name: club.name,
    city: club.city,
    state: club.state,
    courts: club.courts || null,  // manual enrichment needed
    rating: club.rating,
    reviewCount: club.reviewCount,
    avgUtilization: club.avgUtilization,
    peakUtilization: club.peakUtilization,
    rankScore: club.rankScore,
    website: club.website,
    instagram: club.instagram
  }))
};

fs.writeFileSync('data/national-clubs.json', JSON.stringify(output, null, 2));
```

#### Acceptance Criteria

- ✅ 50 clubs identified across 30 cities
- ✅ Each club has: name, city, rating, utilization, rank score
- ✅ Clubs sorted by rank score (highest first)
- ✅ Social media handles captured (at least 40/50 clubs)
- ✅ Data saved to `data/national-clubs.json`

---

### FR-4.2: Programming Intelligence Scraper

**Requirement**: System shall extract event listings from top clubs' websites and Instagram

#### Functional Behavior

**4.2.1 Web Scraping**

```javascript
for (const club of topClubs) {
  if (!club.website) continue;

  const html = await fetch(club.website).then(r => r.text());
  const $ = cheerio.load(html);

  // Find event calendar (common patterns)
  const events = [];

  // Pattern 1: <div class="event">
  $('.event, .class, .program').each((i, el) => {
    events.push({
      club: club.name,
      eventName: $(el).find('.title, h3').text().trim(),
      description: $(el).find('.description, p').text().trim(),
      dateTime: $(el).find('.date, .time').text().trim(),
      source: club.website
    });
  });

  club.events = events;
}
```

**4.2.2 Instagram Scraping**

```javascript
for (const club of topClubs) {
  if (!club.instagram) continue;

  // Use Instagram Basic Display API (requires access token)
  const posts = await instagramAPI.getUserMedia(club.instagram);

  const eventPosts = posts.filter(post =>
    post.caption.toLowerCase().includes('event') ||
    post.caption.toLowerCase().includes('tournament') ||
    post.caption.toLowerCase().includes('league')
  );

  eventPosts.forEach(post => {
    club.events.push({
      club: club.name,
      eventName: extractEventName(post.caption),  // AI-powered extraction
      description: post.caption,
      engagementRate: (post.like_count + post.comments_count) / club.followers,
      source: post.permalink
    });
  });
}
```

**4.2.3 AI-Powered Categorization**

```javascript
for (const event of allEvents) {
  // Use OpenAI GPT to categorize
  const prompt = `
    Categorize this pickleball event:

    Event: "${event.eventName}"
    Description: "${event.description}"

    Provide JSON output:
    {
      "skillLevel": "Beginner|Intermediate|Advanced|All-Levels",
      "eventType": "League|Tournament|Social|Corporate|Youth|Clinic|Drop-in",
      "timePattern": "Weekly Recurring|Monthly|One-Time|Seasonal",
      "theme": "descriptive theme or null"
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{role: 'user', content: prompt}],
    response_format: {type: 'json_object'}
  });

  const categorization = JSON.parse(response.choices[0].message.content);
  Object.assign(event, categorization);
}
```

**4.2.4 Success Signal Detection**

```javascript
function detectSuccessSignals(event) {
  const signals = [];

  const text = (event.eventName + ' ' + event.description).toLowerCase();

  if (text.includes('sold out') || text.includes('registration full')) {
    signals.push('Registration full');
  }

  if (event.engagementRate && event.engagementRate > 0.05) {
    signals.push('High engagement (5%+ like/comment rate)');
  }

  if (text.match(/week\d+|session \d+/)) {
    signals.push('Recurring event (multi-week series)');
  }

  return signals;
}
```

#### Acceptance Criteria

- ✅ 100+ events collected from top 50 clubs
- ✅ Events categorized by: skill level, type, time pattern
- ✅ Success signals identified (sold out, high engagement, recurring)
- ✅ At least 20 "Beginner" events (addresses target segment)
- ✅ Data saved to `data/programming-ideas.json`

---

### FR-4.3: Programming Idea Generator UI

**Requirement**: System shall provide filterable, searchable interface for event ideas

#### Functional Behavior

**4.3.1 Filter Panel**

```html
<div class="filter-panel">
  <h3>Filters</h3>

  <div class="filter-group">
    <label>Skill Level</label>
    <label><input type="checkbox" value="Beginner"> Beginner</label>
    <label><input type="checkbox" value="Intermediate"> Intermediate</label>
    <label><input type="checkbox" value="Advanced"> Advanced</label>
    <label><input type="checkbox" value="All-Levels" checked> All-Levels</label>
  </div>

  <div class="filter-group">
    <label>Event Type</label>
    <label><input type="checkbox" value="League"> League</label>
    <label><input type="checkbox" value="Tournament"> Tournament</label>
    <label><input type="checkbox" value="Social" checked> Social</label>
    <label><input type="checkbox" value="Corporate"> Corporate</label>
    <label><input type="checkbox" value="Youth"> Youth</label>
    <label><input type="checkbox" value="Clinic"> Clinic</label>
  </div>

  <div class="filter-group">
    <label>Time</label>
    <label><input type="checkbox" value="Weekday" checked> Weekday</label>
    <label><input type="checkbox" value="Weekend"> Weekend</label>
  </div>

  <button id="reset-filters">Reset</button>
</div>
```

**4.3.2 Event Cards**

```javascript
function renderEventCards(events) {
  const container = document.getElementById('event-cards-container');

  container.innerHTML = events.map(event => `
    <div class="event-card">
      <div class="event-header">
        <h4>${event.eventName}</h4>
        <span class="club-badge">${event.club}</span>
      </div>

      <div class="event-meta">
        <span class="badge skill-${event.skillLevel.toLowerCase()}">${event.skillLevel}</span>
        <span class="badge type-${event.eventType.toLowerCase()}">${event.eventType}</span>
        <span class="badge time-${event.timePattern.toLowerCase().replace(/\s/g, '-')}">${event.timePattern}</span>
      </div>

      <p class="event-description">${event.description.substring(0, 150)}...</p>

      ${event.successSignals.length > 0 ? `
        <div class="success-signals">
          <strong>✅ Success Signals:</strong>
          <ul>
            ${event.successSignals.map(signal => `<li>${signal}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="event-actions">
        <button class="copy-template-btn" data-event-id="${event.id}">
          Copy to Campaign Template
        </button>
        <a href="${event.source}" target="_blank" class="view-source-btn">
          View Source
        </a>
      </div>
    </div>
  `).join('');
}
```

**4.3.3 Filtering Logic**

```javascript
function filterEvents() {
  const skillLevels = Array.from(document.querySelectorAll('[value^="Beginner"]:checked, [value^="Intermediate"]:checked, [value^="Advanced"]:checked, [value^="All-Levels"]:checked'))
    .map(cb => cb.value);

  const eventTypes = Array.from(document.querySelectorAll('[value="League"]:checked, [value="Tournament"]:checked, [value="Social"]:checked, [value="Corporate"]:checked, [value="Youth"]:checked, [value="Clinic"]:checked'))
    .map(cb => cb.value);

  const times = Array.from(document.querySelectorAll('[value="Weekday"]:checked, [value="Weekend"]:checked'))
    .map(cb => cb.value);

  const filtered = allEvents.filter(event => {
    return (
      (skillLevels.length === 0 || skillLevels.includes(event.skillLevel)) &&
      (eventTypes.length === 0 || eventTypes.includes(event.eventType)) &&
      (times.length === 0 || times.some(time => event.timePattern.includes(time)))
    );
  });

  renderEventCards(filtered);
}

// Attach to all checkboxes
document.querySelectorAll('.filter-panel input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', filterEvents);
});
```

**4.3.4 Campaign Template Generation**

```javascript
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-template-btn')) {
    const eventId = e.target.dataset.eventId;
    const event = allEvents.find(e => e.id === eventId);

    const template = `
EVENT CAMPAIGN TEMPLATE
Generated: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EVENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${event.eventName}
Inspired by: ${event.club}

Skill Level: ${event.skillLevel}
Event Type: ${event.eventType}
Time Pattern: ${event.timePattern}
${event.theme ? `Theme: ${event.theme}` : ''}

Description:
${event.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUCCESS SIGNALS FROM ORIGINAL EVENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${event.successSignals.map(s => `• ${s}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PCC IMPLEMENTATION PLAN (TO COMPLETE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Date/Time: [FILL IN]
Target Audience: [FILL IN]
Registration Cap: [FILL IN]
Pricing: [FILL IN]

Marketing Copy:
[ADAPT FROM DESCRIPTION ABOVE]

Promotion Channels:
☐ Email blast
☐ Instagram post
☐ Website calendar
☐ In-person flyers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[YOUR NOTES HERE]
    `.trim();

    navigator.clipboard.writeText(template);
    showToast('Campaign template copied to clipboard!');
  }
});
```

#### Acceptance Criteria

- ✅ Filter panel functional (skill level, type, time)
- ✅ Event cards render with all metadata
- ✅ Filtering updates results in real-time
- ✅ "Copy to Campaign Template" generates actionable template
- ✅ Export to CSV functional
- ✅ At least 100 event ideas available

---

## Module 5: Yield Management Foundation

**Owner**: Peter (technical) + Christy (business validation)
**Timeline**: Weeks 11-16
**Dependencies**: PCC booking system access

---

### FR-5.1: Booking Data Integration

**Requirement**: System shall import PCC booking history from booking system

#### Functional Behavior

**5.1.1 Integration Options**

**Option A: API Integration** (preferred)
```javascript
// Example: ClubReady API
async function syncBookings() {
  const response = await fetch('https://api.clubready.com/bookings', {
    headers: {
      'Authorization': `Bearer ${CLUBREADY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    params: {
      startDate: '2024-01-01',
      endDate: '2025-10-08',
      locationId: PCC_LOCATION_ID
    }
  });

  const bookings = await response.json();

  // Transform to internal schema
  const transformed = bookings.map(b => ({
    id: b.bookingId,
    customerId: b.memberId || `guest-${b.guestId}`,
    customerType: b.membershipType === 'member' ? 'member' : 'drop-in',
    dateTime: new Date(b.startTime),
    endTime: new Date(b.endTime),
    courtNumber: b.resourceId,
    price: b.amountPaid || 0,
    bookedAt: new Date(b.createdAt),
    cancelled: b.status === 'cancelled'
  }));

  // Save to database
  await saveBookings(transformed);
}
```

**Option B: CSV Export** (fallback)
```javascript
// Manual CSV upload
async function importCSV(file) {
  const text = await file.text();
  const rows = Papa.parse(text, {header: true}).data;

  const bookings = rows.map(row => ({
    id: row['Booking ID'],
    customerId: row['Member ID'] || row['Guest Name'],
    customerType: row['Type'],
    dateTime: new Date(row['Date'] + ' ' + row['Time']),
    endTime: new Date(row['Date'] + ' ' + row['End Time']),
    courtNumber: parseInt(row['Court']),
    price: parseFloat(row['Amount']),
    bookedAt: new Date(row['Booked On']),
    cancelled: row['Status'] === 'Cancelled'
  }));

  await saveBookings(bookings);
}
```

**5.1.2 Data Validation**

```javascript
function validateBookings(bookings) {
  const errors = [];

  bookings.forEach((b, i) => {
    // Check completeness
    if (!b.customerId) errors.push(`Row ${i}: Missing customer ID`);
    if (!b.dateTime) errors.push(`Row ${i}: Invalid date/time`);
    if (b.courtNumber < 1 || b.courtNumber > 7) errors.push(`Row ${i}: Invalid court number`);

    // Check data quality
    if (b.endTime <= b.dateTime) errors.push(`Row ${i}: End time before start time`);
    if (b.price < 0) errors.push(`Row ${i}: Negative price`);
  });

  return {
    valid: errors.length === 0,
    errors,
    stats: {
      total: bookings.length,
      members: bookings.filter(b => b.customerType === 'member').length,
      dropIns: bookings.filter(b => b.customerType === 'drop-in').length,
      cancelled: bookings.filter(b => b.cancelled).length
    }
  };
}
```

**5.1.3 Database Storage**

```sql
-- PostgreSQL schema
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  customer_type VARCHAR(20) NOT NULL CHECK (customer_type IN ('member', 'drop-in', 'corporate', 'league')),
  date_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  court_number INT NOT NULL CHECK (court_number BETWEEN 1 AND 7),
  price DECIMAL(10,2) DEFAULT 0,
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_date ON bookings(date_time);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_type ON bookings(customer_type);
```

#### Acceptance Criteria

- ✅ 12 months of booking data imported (minimum 6 months)
- ✅ Validation checks pass (95%+ completeness, <5% anomalies)
- ✅ Daily/weekly sync operational (or CSV import process documented)
- ✅ Spot-check validates accuracy (10 random bookings confirmed)
- ✅ Database schema created and populated

---

### FR-5.2: Revenue Scenario Planner

**Requirement**: System shall model court allocation scenarios and calculate revenue + satisfaction trade-offs

#### Functional Behavior

**5.2.1 Scenario Definitions**

```javascript
const scenarios = [
  {
    name: 'Members First',
    memberAllocation: 0.80,  // 80% of prime time for members
    dropInAllocation: 0.15,
    eventAllocation: 0.05,
    description: 'Prioritize member satisfaction over revenue'
  },
  {
    name: 'Balanced Growth',
    memberAllocation: 0.65,
    dropInAllocation: 0.25,
    eventAllocation: 0.10,
    description: 'Balance revenue growth with member satisfaction'
  },
  {
    name: 'Revenue Max',
    memberAllocation: 0.50,
    dropInAllocation: 0.30,
    eventAllocation: 0.20,
    description: 'Maximize short-term revenue'
  }
];
```

**5.2.2 Revenue Calculation**

```javascript
function calculateScenarioRevenue(scenario, memberCount = 350) {
  const COURTS = 7;
  const PRIME_HOURS_PER_WEEK = 15;  // Mon-Fri 6-9pm = 5 days × 3 hours
  const WEEKS_PER_MONTH = 4;

  // Member revenue (recurring)
  const memberRevenue = memberCount * 149;  // $149/month membership

  // Drop-in revenue (variable)
  const dropInSlots = COURTS * PRIME_HOURS_PER_WEEK * scenario.dropInAllocation * WEEKS_PER_MONTH;
  const dropInUtilization = 0.75;  // 75% of drop-in slots book (historical avg)
  const dropInRevenue = dropInSlots * dropInUtilization * (25 / 2);  // $25 per 2-hour session

  // Event revenue (variable)
  const eventSlots = COURTS * PRIME_HOURS_PER_WEEK * scenario.eventAllocation * WEEKS_PER_MONTH;
  const eventBookingRate = 0.60;  // 60% of event slots book (conservative)
  const eventRevenue = (eventSlots / 2) * eventBookingRate * 500;  // $500 per 2-hour event (4 courts)

  return {
    total: memberRevenue + dropInRevenue + eventRevenue,
    breakdown: {
      member: memberRevenue,
      dropIn: dropInRevenue,
      events: eventRevenue
    }
  };
}
```

**5.2.3 Satisfaction Scoring**

```javascript
function calculateSatisfactionScore(scenario, memberCount = 350) {
  const COURTS = 7;
  const PRIME_HOURS_PER_WEEK = 15;

  // Member capacity (court-hours available for members)
  const memberCapacity = COURTS * PRIME_HOURS_PER_WEEK * scenario.memberAllocation;

  // Member demand (reservation attempts)
  const AVG_BOOKINGS_PER_MEMBER = 1.2;  // times per week
  const memberDemand = memberCount * AVG_BOOKINGS_PER_MEMBER;

  // Booking success rate
  const bookingSuccessRate = Math.min(memberCapacity / memberDemand, 1.0);

  // Score (0-100)
  let score;
  let rating;
  let churnRisk;

  if (bookingSuccessRate >= 0.90) {
    score = 95;
    rating = 'Excellent ✅';
    churnRisk = 'Low';
  } else if (bookingSuccessRate >= 0.85) {
    score = 88;
    rating = 'Very Good ✅';
    churnRisk = 'Low';
  } else if (bookingSuccessRate >= 0.70) {
    score = 75;
    rating = 'Good ⚠️';
    churnRisk = 'Medium';
  } else if (bookingSuccessRate >= 0.60) {
    score = 65;
    rating = 'Fair ⚠️';
    churnRisk = 'Medium';
  } else {
    score = 50;
    rating = 'Poor ❌';
    churnRisk = 'High';
  }

  return {
    score,
    rating,
    bookingSuccessRate: (bookingSuccessRate * 100).toFixed(0) + '%',
    churnRisk
  };
}
```

**5.2.4 Comparison Table**

```javascript
function renderScenarioComparison() {
  const results = scenarios.map(scenario => {
    const revenue = calculateScenarioRevenue(scenario);
    const satisfaction = calculateSatisfactionScore(scenario);

    return {
      scenario: scenario.name,
      monthlyRevenue: `$${revenue.total.toLocaleString()}`,
      memberSatisfaction: `${satisfaction.score} (${satisfaction.rating})`,
      utilization: calculateUtilization(scenario),
      churnRisk: satisfaction.churnRisk,
      revPerCourtHour: `$${(revenue.total / (7 * 168)).toFixed(0)}`
    };
  });

  const tableHTML = `
    <table class="scenario-comparison-table">
      <thead>
        <tr>
          <th>Scenario</th>
          <th>Monthly Revenue</th>
          <th>Member Satisfaction</th>
          <th>Utilization</th>
          <th>Churn Risk</th>
          <th>Rev/Court-Hour</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(r => `
          <tr>
            <td><strong>${r.scenario}</strong></td>
            <td>${r.monthlyRevenue}</td>
            <td>${r.memberSatisfaction}</td>
            <td>${r.utilization}</td>
            <td><span class="risk-badge risk-${r.churnRisk.toLowerCase()}">${r.churnRisk}</span></td>
            <td>${r.revPerCourtHour}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('scenario-comparison').innerHTML = tableHTML;
}
```

**5.2.5 Recommendation Engine**

```javascript
function generateRecommendation(results) {
  // Weighted scoring
  const scored = results.map(r => ({
    scenario: r.scenario,
    score: (
      (parseRevenue(r.monthlyRevenue) / 120000) * 0.40 +  // 40% revenue
      (parseSatisfaction(r.memberSatisfaction) / 100) * 0.35 +  // 35% satisfaction
      (parseUtilization(r.utilization) / 100) * 0.15 +  // 15% utilization
      (churnRiskScore(r.churnRisk)) * 0.10  // 10% low churn
    )
  }));

  const best = scored.sort((a, b) => b.score - a.score)[0];

  return `
    <div class="recommendation-panel">
      <h3>📊 Recommendation: "${best.scenario}" Scenario</h3>

      <p><strong>Why this scenario?</strong></p>
      <p>${getRecommendationRationale(best.scenario)}</p>

      <p><strong>Trade-offs:</strong></p>
      <ul>
        ${getTradeoffs(best.scenario).map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>
  `;
}
```

#### Acceptance Criteria

- ✅ 3 scenarios defined with allocation percentages
- ✅ Revenue calculation logic implemented and tested
- ✅ Satisfaction scoring algorithm functional
- ✅ Comparison table renders with all metrics
- ✅ Recommendation engine provides rationale
- ✅ Results within 10% of manual calculation (validation)

---

### FR-5.3: Dynamic Pricing Recommender

**Requirement**: System shall generate optimal drop-in pricing by time slot based on demand

#### Functional Behavior

**5.3.1 Demand Forecasting**

```javascript
// Calculate historical utilization for each time slot
async function calculateDemandForecast() {
  const bookings = await getBookings({ last12Months: true });

  const utilization = {};

  // For each hour of the week (168 slots)
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const slotKey = `${day}-${hour}`;

      // Count bookings for this slot
      const slotBookings = bookings.filter(b => {
        const bookingDay = b.dateTime.getDay();
        const bookingHour = b.dateTime.getHours();
        return bookingDay === day && bookingHour === hour;
      });

      // Calculate utilization (bookings / capacity)
      const weeks = 52;
      const capacity = 7 * weeks;  // 7 courts × 52 weeks
      utilization[slotKey] = slotBookings.length / capacity;
    }
  }

  return utilization;
}
```

**5.3.2 Pricing Algorithm**

```javascript
function calculateOptimalPrice(utilizationRate) {
  const basePrice = 25;

  if (utilizationRate >= 0.90) {
    return 35;  // high demand
  } else if (utilizationRate >= 0.75) {
    return 30;  // medium-high
  } else if (utilizationRate >= 0.50) {
    return 25;  // baseline
  } else if (utilizationRate >= 0.30) {
    return 20;  // fill capacity
  } else {
    return 15;  // low demand (prevent empty courts)
  }
}
```

**5.3.3 Pricing Heatmap Visualization**

```javascript
function renderPricingHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({length: 24}, (_, i) => i);

  const heatmapHTML = `
    <table class="pricing-heatmap">
      <thead>
        <tr>
          <th></th>
          ${hours.map(h => `<th>${h}:00</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${days.map((day, d) => `
          <tr>
            <th>${day}</th>
            ${hours.map(h => {
              const slotKey = `${d}-${h}`;
              const utilization = demandForecast[slotKey];
              const price = calculateOptimalPrice(utilization);
              const color = getPriceColor(price);

              return `
                <td style="background-color: ${color}" data-day="${d}" data-hour="${h}">
                  <span class="price">$${price}</span>
                </td>
              `;
            }).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('pricing-heatmap').innerHTML = heatmapHTML;
}

function getPriceColor(price) {
  if (price >= 35) return '#EF4444';  // red (peak)
  if (price >= 30) return '#F59E0B';  // orange (high)
  if (price >= 25) return '#FBBF24';  // yellow (baseline)
  if (price >= 20) return '#A7F3D0';  // light green (discount)
  return '#10B981';  // green (deep discount)
}
```

**5.3.4 Tooltip with Details**

```javascript
document.querySelectorAll('.pricing-heatmap td').forEach(cell => {
  cell.addEventListener('mouseover', (e) => {
    const day = e.target.dataset.day;
    const hour = e.target.dataset.hour;
    const slotKey = `${day}-${hour}`;

    const utilization = demandForecast[slotKey];
    const currentPrice = 25;
    const recommendedPrice = calculateOptimalPrice(utilization);
    const expectedRevenue = recommendedPrice * utilization * 7 * 52;  // annual

    showTooltip(e, `
      <strong>${days[day]} ${hour}:00</strong><br>
      Current Price: $${currentPrice}<br>
      Recommended: $${recommendedPrice}<br>
      Demand: ${(utilization * 100).toFixed(0)}%<br>
      Expected Annual Revenue: $${expectedRevenue.toLocaleString()}
    `);
  });
});
```

**5.3.5 Export Pricing Schedule**

```javascript
document.getElementById('export-pricing-btn').addEventListener('click', () => {
  const csv = [
    ['Day', 'Hour', 'Current Price', 'Recommended Price', 'Demand %', 'Expected Annual Revenue'],
    ...Object.entries(demandForecast).map(([slotKey, utilization]) => {
      const [day, hour] = slotKey.split('-').map(Number);
      const currentPrice = 25;
      const recommendedPrice = calculateOptimalPrice(utilization);
      const revenue = recommendedPrice * utilization * 7 * 52;

      return [
        days[day],
        `${hour}:00`,
        `$${currentPrice}`,
        `$${recommendedPrice}`,
        `${(utilization * 100).toFixed(0)}%`,
        `$${revenue.toFixed(0)}`
      ];
    })
  ].map(row => row.join(',')).join('\n');

  downloadCSV(csv, 'pricing-recommendations.csv');
});
```

#### Acceptance Criteria

- ✅ Demand forecast generated for all 168 time slots
- ✅ Pricing recommendations calculated
- ✅ Heatmap renders with correct colors
- ✅ Hover tooltip shows detailed breakdown
- ✅ Export to CSV functional
- ✅ Expected revenue increase calculated (vs. flat pricing)

---

### FR-5.4: Corporate Event Decision Tool

**Requirement**: System shall calculate Net Value of corporate event inquiries and provide Accept/Decline/Counter-offer recommendation

**Integration Source**: Gemini specs (critical missing feature)

#### Functional Behavior

**5.4.1 Event Input Form**

```javascript
const eventInquiry = {
  dateTime: "2026-02-15T19:00:00Z",  // Thursday 7pm
  duration: 2,  // hours
  courts: [1, 2, 3, 4],  // courts requested
  revenue: 500  // quoted price
};
```

**5.4.2 Displaced Booking Identification**

```javascript
async function identifyDisplacedBookings(event) {
  const bookings = await db.query(`
    SELECT * FROM bookings
    WHERE date_time >= $1
      AND date_time < $2
      AND court_number = ANY($3)
      AND cancelled = FALSE
  `, [event.dateTime, new Date(event.dateTime.getTime() + event.duration * 3600000), event.courts]);

  // Group by unique members
  const displacedMembers = [...new Set(bookings.map(b => b.customer_id))]
    .map(customerId => {
      const member = getMemberData(customerId);
      return {
        id: customerId,
        name: member.name,
        segment: member.segment,
        estimatedCLV: member.estimated_clv,
        bookingCount: bookings.filter(b => b.customer_id === customerId).length
      };
    });

  return {
    totalBookings: bookings.length,
    members: displacedMembers
  };
}
```

**5.4.3 Churn Cost Calculation**

```javascript
function calculateChurnCost(displacedMembers) {
  // Segment-specific churn probability increase from displacement
  const churnProbabilityIncrease = {
    'Corporate Power Users': 0.05,    // 5% increase (high expectations)
    'Social Ambassadors': 0.02,       // 2% increase (flexible, community-oriented)
    'Competitive Athletes': 0.03,     // 3% increase (schedule-dependent)
    'Casual Drop-ins': 0.01          // 1% increase (low attachment)
  };

  const totalChurnCost = displacedMembers.reduce((sum, member) => {
    const churnIncrease = churnProbabilityIncrease[member.segment] || 0.02;
    const memberChurnCost = member.estimatedCLV * churnIncrease;
    return sum + memberChurnCost;
  }, 0);

  return {
    totalChurnCost: Math.round(totalChurnCost),
    breakdown: displacedMembers.map(member => ({
      name: member.name,
      segment: member.segment,
      clv: member.estimatedCLV,
      churnRisk: churnProbabilityIncrease[member.segment],
      estimatedCost: Math.round(member.estimatedCLV * churnProbabilityIncrease[member.segment])
    }))
  };
}
```

**5.4.4 Net Value Calculation**

```javascript
function calculateNetValue(event, displacedBookings) {
  const churnAnalysis = calculateChurnCost(displacedBookings.members);

  const netValue = event.revenue - churnAnalysis.totalChurnCost;

  return {
    eventRevenue: event.revenue,
    churnCost: churnAnalysis.totalChurnCost,
    netValue: netValue,
    displacedCount: displacedBookings.totalBookings,
    displacedMembers: displacedBookings.members.length,
    breakdown: churnAnalysis.breakdown
  };
}
```

**5.4.5 Recommendation Engine**

```javascript
function generateRecommendation(netValue, event) {
  let recommendation;
  let color;
  let rationale;

  if (netValue.netValue > 200) {
    recommendation = 'Accept';
    color = 'green';
    rationale = `This event generates positive net value ($${netValue.netValue}). The one-time revenue ($${netValue.eventRevenue}) outweighs the estimated churn cost ($${netValue.churnCost}).`;
  } else if (netValue.netValue > -200) {
    recommendation = 'Counter-offer with alternative slot';
    color = 'yellow';
    rationale = `This event has marginal value (Net: $${netValue.netValue}). Consider offering an off-peak alternative slot to avoid displacing ${netValue.displacedMembers} members.`;
  } else {
    recommendation = 'Decline';
    color = 'red';
    rationale = `This event has negative net value ($${netValue.netValue}). It displaces ${netValue.displacedMembers} members with combined CLV risk of $${netValue.churnCost}, which exceeds the one-time revenue of $${netValue.eventRevenue}.`;
  }

  // Find alternative slots
  const alternatives = findAlternativeSlots(event);

  return {
    recommendation,
    color,
    rationale,
    netValue: netValue.netValue,
    alternatives: alternatives.slice(0, 3)  // top 3 alternatives
  };
}
```

**5.4.6 Alternative Slot Finder**

```javascript
async function findAlternativeSlots(event) {
  const alternatives = [];

  // Check same day, different times
  for (let hour = 6; hour <= 21; hour++) {
    const altTime = new Date(event.dateTime);
    altTime.setHours(hour);

    const displaced = await identifyDisplacedBookings({
      ...event,
      dateTime: altTime
    });

    if (displaced.totalBookings <= 3) {  // threshold for "minimal displacement"
      const churnCost = calculateChurnCost(displaced.members).totalChurnCost;
      const netValue = event.revenue - churnCost;

      alternatives.push({
        dateTime: altTime,
        displacedCount: displaced.totalBookings,
        churnCost: churnCost,
        netValue: netValue
      });
    }
  }

  // Sort by highest net value
  return alternatives.sort((a, b) => b.netValue - a.netValue);
}
```

**5.4.7 Email Template Generation**

```javascript
function generateCounterOfferEmail(contactName, event, alternatives) {
  const alt = alternatives[0];  // best alternative
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][alt.dateTime.getDay()];
  const timeStr = alt.dateTime.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});

  return `
Subject: PCC Corporate Event - Alternative Time Slots

Hi ${contactName},

Thank you for your interest in hosting a corporate event at PCC on ${event.dateTime.toLocaleDateString()} at ${event.dateTime.toLocaleTimeString()}.

Unfortunately, that time slot is heavily booked with member reservations. However, we have excellent alternative slots available:

Option 1: ${dayName}, ${alt.dateTime.toLocaleDateString()} at ${timeStr}
- All ${event.courts.length} courts available
- ${alt.displacedCount === 0 ? 'No member displacement' : `Only ${alt.displacedCount} bookings to reschedule`}
- Same $${event.revenue} pricing

${alternatives[1] ? `Option 2: ${formatAlternative(alternatives[1], event)}` : ''}

Would either of these work for your team?

Best regards,
Christy
PCC Management
  `.trim();
}
```

**5.4.8 Decision Logging**

```javascript
async function logEventDecision(event, recommendation, actualDecision, notes) {
  await db.query(`
    INSERT INTO event_decisions (
      event_date, event_revenue, displaced_count, churn_cost, net_value,
      recommendation, actual_decision, notes, created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
  `, [
    event.dateTime,
    event.revenue,
    recommendation.displacedCount,
    recommendation.churnCost,
    recommendation.netValue,
    recommendation.recommendation,
    actualDecision,  // 'accepted', 'declined', 'countered'
    notes
  ]);
}
```

#### Acceptance Criteria

- ✅ User inputs event details (date, time, revenue, courts)
- ✅ System identifies displaced member bookings from database
- ✅ Churn cost calculated using segment-specific CLV and churn probability
- ✅ Net Value displayed prominently (revenue - churn cost)
- ✅ Clear recommendation: "Accept" (green) | "Counter-offer" (yellow) | "Decline" (red)
- ✅ Alternative slot finder suggests up to 3 options with minimal displacement
- ✅ Email template generator pre-fills counter-offer message
- ✅ Decision logged for tracking (recommendation vs. actual decision)

#### Success Metrics

- Front desk staff uses tool for 80%+ of corporate event inquiries
- Decision aligns with tool recommendation 70%+ of the time
- Corporate event revenue increases 10%+ (data confidence → better pricing)
- Member churn from displaced bookings <2% (vs. estimated 5% baseline)

#### Business Rules

**Churn Probability Thresholds** (by segment):
```javascript
const CHURN_PROBABILITY_INCREASE = {
  'Corporate Power Users': 0.05,   // Highest expectations
  'Social Ambassadors': 0.02,      // Flexible, community-oriented
  'Competitive Athletes': 0.03,    // Schedule-dependent
  'Casual Drop-ins': 0.01         // Low attachment
};
```

**Recommendation Thresholds**:
- Net Value > $200 → **Accept** (profitable)
- Net Value -$200 to +$200 → **Counter-offer** (marginal)
- Net Value < -$200 → **Decline** (unprofitable)

**Alternative Slot Criteria**:
- Maximum displaced bookings: 3
- Search window: Same day ±6 hours, or same time next 2 weekends
- Rank by: Highest net value first

---

### FR-5.5: Mezzanine ROI Planner

**Requirement**: System shall compare mezzanine investment options using financial modeling + member survey data

**Integration Source**: Gemini specs (critical missing feature)

#### Functional Behavior

**5.5.1 Investment Option Definitions**

```javascript
const investmentOptions = [
  {
    id: 'hot-desks',
    name: 'Hot Desks (4 desks, Wi-Fi)',
    setupCost: 15000,
    monthlyRevenue: 2500,  // $20/day × 4 desks × 25 days
    monthlyOpCost: 500,    // utilities, maintenance
    targetSegment: 'Corporate Power Users',
    amenitySurveyQuestion: 'hot_desks'
  },
  {
    id: 'yoga-studio',
    name: 'Yoga Studio (mirrors, mats)',
    setupCost: 25000,
    monthlyRevenue: 3000,  // classes + rental
    monthlyOpCost: 800,    // instructor fees
    targetSegment: 'Social Ambassadors',
    amenitySurveyQuestion: 'yoga'
  },
  {
    id: 'strength-training',
    name: 'Strength Training (racks, weights)',
    setupCost: 40000,
    monthlyRevenue: 1500,  // personal training + open use
    monthlyOpCost: 200,    // equipment maintenance
    targetSegment: 'Competitive Athletes',
    amenitySurveyQuestion: 'strength_training'
  },
  {
    id: 'event-space',
    name: 'Event Space (furniture, A/V)',
    setupCost: 10000,
    monthlyRevenue: 1000,  // private event rentals
    monthlyOpCost: 100,    // cleaning
    targetSegment: 'Mixed',
    amenitySurveyQuestion: 'event_space'
  }
];
```

**5.5.2 Financial Metrics Calculation**

```javascript
function calculateFinancialMetrics(option) {
  const monthlyNetRevenue = option.monthlyRevenue - option.monthlyOpCost;
  const annualNetRevenue = monthlyNetRevenue * 12;
  const paybackPeriod = option.setupCost / monthlyNetRevenue;  // in months
  const annualROI = (annualNetRevenue / option.setupCost) * 100;  // percentage

  return {
    monthlyNetRevenue,
    annualNetRevenue,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10,  // 1 decimal place
    annualROI: Math.round(annualROI),
    fiveYearValue: (annualNetRevenue * 5) - option.setupCost
  };
}
```

**5.5.3 Member Interest Analysis**

```javascript
async function calculateMemberInterest(option) {
  // Get survey responses for amenity question
  const surveyResponses = await db.query(`
    SELECT
      amenity_interests,
      segment
    FROM member_survey_responses
    WHERE survey_date >= NOW() - INTERVAL '6 months'
  `);

  // Count members interested in this amenity
  const interested = surveyResponses.filter(r =>
    r.amenity_interests.includes(option.amenitySurveyQuestion)
  );

  const interestRate = interested.length / surveyResponses.length;

  // Segment-specific interest
  const segmentInterest = {};
  ['Corporate Power Users', 'Social Ambassadors', 'Competitive Athletes', 'Casual Drop-ins'].forEach(segment => {
    const segmentResponses = surveyResponses.filter(r => r.segment === segment);
    const segmentInterested = segmentResponses.filter(r =>
      r.amenity_interests.includes(option.amenitySurveyQuestion)
    );
    segmentInterest[segment] = segmentResponses.length > 0
      ? segmentInterested.length / segmentResponses.length
      : 0;
  });

  return {
    overallInterestRate: interestRate,
    interestedCount: interested.length,
    stars: Math.round(interestRate * 5),  // 0-5 stars
    segmentInterest
  };
}
```

**5.5.4 Strategic Alignment Scoring**

```javascript
function calculateStrategicAlignment(option, prioritySegment, memberInterest) {
  let strategicScore = 0;

  // Factor 1: Target segment match (0-40 points)
  if (option.targetSegment === prioritySegment) {
    strategicScore += 40;
  } else if (option.targetSegment === 'Mixed') {
    strategicScore += 20;
  } else {
    strategicScore += 10;
  }

  // Factor 2: Member interest (0-40 points)
  const segmentInterestRate = memberInterest.segmentInterest[prioritySegment] || 0;
  strategicScore += segmentInterestRate * 40;

  // Factor 3: Churn mitigation (0-20 points)
  // Amenities address top churn drivers
  const churnMitigationValue = {
    'hot-desks': 15,         // Adds value for Corporate segment (high churn risk)
    'yoga-studio': 10,       // Moderate churn reduction
    'strength-training': 20,  // Highest churn reduction for Athletes
    'event-space': 5         // Low churn impact
  };
  strategicScore += churnMitigationValue[option.id] || 0;

  return Math.round(strategicScore);  // 0-100 scale
}
```

**5.5.5 Recommendation Algorithm**

```javascript
async function generateMezzanineRecommendation(prioritySegment = 'Mixed') {
  const analysis = [];

  for (const option of investmentOptions) {
    const financials = calculateFinancialMetrics(option);
    const memberInterest = await calculateMemberInterest(option);
    const strategicAlignment = calculateStrategicAlignment(option, prioritySegment, memberInterest);

    // Weighted recommendation score (0-100)
    const recommendationScore = (
      normalize(financials.paybackPeriod, 'inverse', 36) * 0.30 +  // 30% weight (shorter is better, max 36 months)
      normalize(financials.annualROI, 'direct', 200) * 0.30 +      // 30% weight (higher is better)
      (memberInterest.stars / 5) * 0.40                            // 40% weight (member demand)
    ) * 100;

    analysis.push({
      option: option.name,
      setupCost: option.setupCost,
      monthlyNetRevenue: financials.monthlyNetRevenue,
      paybackPeriod: financials.paybackPeriod,
      annualROI: financials.annualROI,
      memberInterest: memberInterest.stars,
      memberInterestRate: (memberInterest.overallInterestRate * 100).toFixed(0) + '%',
      strategicAlignment,
      recommendationScore
    });
  }

  // Sort by recommendation score
  analysis.sort((a, b) => b.recommendationScore - a.recommendationScore);

  const recommended = analysis[0];
  const alternative = analysis[1];

  return {
    analysis,
    recommended,
    alternative,
    rationale: generateRationale(recommended, alternative, prioritySegment)
  };
}

function normalize(value, direction, max) {
  if (direction === 'inverse') {
    // Lower is better (e.g., payback period)
    return 1 - Math.min(value / max, 1);
  } else {
    // Higher is better (e.g., ROI)
    return Math.min(value / max, 1);
  }
}
```

**5.5.6 Rationale Generation**

```javascript
function generateRationale(recommended, alternative, prioritySegment) {
  const reasons = [];

  // Financial reasoning
  if (recommended.paybackPeriod < 12) {
    reasons.push(`Fast payback period (${recommended.paybackPeriod} months) means quick capital recovery`);
  } else if (recommended.annualROI > 100) {
    reasons.push(`Strong ROI (${recommended.annualROI}%) justifies longer payback period`);
  }

  // Member interest reasoning
  if (recommended.memberInterestRate >= '80%') {
    reasons.push(`Very high member interest (${recommended.memberInterestRate}) validates demand`);
  } else if (recommended.memberInterestRate >= '60%') {
    reasons.push(`Strong member interest (${recommended.memberInterestRate}) from ${prioritySegment} segment`);
  }

  // Strategic reasoning
  if (recommended.strategicAlignment >= 70) {
    reasons.push(`High strategic alignment with growth priorities`);
  }

  // Alternative consideration
  const cashFlowNote = alternative.paybackPeriod < recommended.paybackPeriod
    ? `\n\nAlternative: If cash flow is a priority, consider "${alternative.option}" (${alternative.paybackPeriod} month payback, ${alternative.annualROI}% ROI)`
    : '';

  return {
    summary: `"${recommended.option}" is recommended based on balanced scoring across financial returns and member demand.`,
    reasons,
    alternative: cashFlowNote
  };
}
```

**5.5.7 Interactive Assumption Adjustment**

```javascript
function recalculateWithAssumptions(optionId, assumptions) {
  const option = investmentOptions.find(o => o.id === optionId);

  // Allow user to override defaults
  const adjusted = {
    ...option,
    setupCost: assumptions.setupCost || option.setupCost,
    monthlyRevenue: assumptions.monthlyRevenue || option.monthlyRevenue,
    monthlyOpCost: assumptions.monthlyOpCost || option.monthlyOpCost
  };

  return calculateFinancialMetrics(adjusted);
}
```

**5.5.8 Export to PDF/Presentation**

```javascript
function exportAnalysisToPDF(analysis, recommended) {
  const doc = {
    title: 'Mezzanine Investment Analysis',
    generatedDate: new Date().toLocaleDateString(),
    sections: [
      {
        heading: 'Executive Summary',
        content: `Recommended: ${recommended.option}\n\nPayback: ${recommended.paybackPeriod} months | ROI: ${recommended.annualROI}% | Member Interest: ${recommended.memberInterestRate}`
      },
      {
        heading: 'Option Comparison',
        table: analysis.map(a => ({
          'Use Case': a.option,
          'Setup Cost': `$${a.setupCost.toLocaleString()}`,
          'Monthly Net': `$${a.monthlyNetRevenue.toLocaleString()}`,
          'Payback': `${a.paybackPeriod} mo`,
          'Annual ROI': `${a.annualROI}%`,
          'Interest': a.memberInterestRate
        }))
      },
      {
        heading: 'Recommendation Rationale',
        content: recommended.rationale
      }
    ]
  };

  // Generate PDF using library (jsPDF or similar)
  return generatePDF(doc);
}
```

#### Acceptance Criteria

- ✅ 4 investment options defined with costs, revenue, and member interest
- ✅ ROI calculation logic implemented (payback period, annual ROI %)
- ✅ Member interest calculated from survey data and displayed as 5-star rating
- ✅ Interactive table allows Christy to adjust financial assumptions
- ✅ Recommendation engine provides clear rationale weighted 30% financial + 40% member demand + 30% strategy
- ✅ Export analysis to PDF for board presentation

#### Success Metrics

- Christy uses planner before making mezzanine investment decision
- Decision aligns with recommended option (or documented reason for override)
- If implemented: Actual revenue within 20% of projection (validates model)
- Member satisfaction with chosen amenity 4.0+ / 5.0 (survey 3 months post-launch)

#### Business Rules

**Recommendation Weighting**:
- Payback Period: 30% (shorter is better, max 36 months)
- Annual ROI: 30% (higher is better)
- Member Interest: 40% (demand validation from surveys)

**Strategic Alignment Factors**:
- Target segment match: 40 points (matches priority segment)
- Member interest rate: 40 points (% interested × 40)
- Churn mitigation value: 20 points (addresses retention drivers)

**Financial Constraints**:
- Minimum acceptable ROI: 30% annual
- Maximum acceptable payback: 36 months
- Minimum member interest: 40% (avoid building unwanted amenities)

---

## Use Cases & User Flows

### Use Case 1: Corporate Event Targeting

**Actor**: Christy (Business Owner)
**Goal**: Generate corporate event leads from member base
**Precondition**: Survey completed, segmentation done

**Main Flow**:
1. Christy opens Customer Intelligence dashboard
2. Clicks "Corporate Connector" table
3. Sorts by "Priority Score" (highest first)
4. Reviews top 5 members:
   - Sarah (VP Marketing at TechCorp, books 3x/week, office 1 mile away)
   - Raj (Director Sales at Consulting Inc, books 2.5x/week, office 0.5 miles away)
   - ...
5. Clicks "Copy Email" button for Sarah
6. Pastes template into Gmail, personalizes
7. Sends email
8. Marks Sarah as "Emailed" in outreach status dropdown
9. Repeats for top 10 members
10. Sets calendar reminder for follow-up in 1 week

**Expected Outcome**: 1-2 corporate event bookings within 4 weeks ($500-2,000 revenue)

**Alternative Flow**: If no response after 2 weeks, Christy tries calling instead of email

---

### Use Case 2: Targeted Marketing Campaign

**Actor**: Christy
**Goal**: Run neighborhood-targeted Instagram ad campaign
**Precondition**: Member data includes zip codes

**Main Flow**:
1. Christy opens Customer Intelligence dashboard
2. Clicks "Neighborhood Heatmap"
3. Identifies 3 neighborhoods with 0-2 members but high demographics match:
   - West Loop (60661): 0 members, median income $95k, 65% bachelor's+
   - River North (60654): 1 member, median income $105k, 70% bachelor's+
   - Lincoln Park (60614): 2 members, median income $120k, 75% bachelor's+
4. Clicks "Export to CSV" to save zip codes
5. Creates Instagram ad campaign:
   - Audience: 25-45 years old, zip codes 60661, 60654, 60614
   - Creative: "Join PCC - Chicago's premier pickleball club"
   - Budget: $500
6. Runs campaign for 2 weeks
7. Tracks new member sign-ups by zip code

**Expected Outcome**: 5-10 new member inquiries, 2-3 conversions ($300-450 revenue, $150 CAC)

**Success Metric**: CAC <$200 (vs. $250 for broad Chicago targeting)

---

### Use Case 3: Programming Idea Discovery

**Actor**: Christy
**Goal**: Find event ideas to fill Monday 2pm low-utilization slot
**Precondition**: Best Practice Research database populated

**Main Flow**:
1. Christy opens "Programming Ideas" dashboard (Phase 2)
2. Sets filters:
   - Skill Level: **Beginner** (target underserved segment)
   - Event Type: **Clinic** or **Social**
   - Time: **Weekday Afternoon**
3. Reviews filtered results:
   - "Lunch & Learn Pickleball Clinic" (Chicken N Pickle - Kansas City)
   - "Ladies Afternoon Social" (Pickle Haus - Arlington Heights)
   - "Beginner Bootcamp" (Big City Pickle - Denver)
4. Clicks "Lunch & Learn Pickleball Clinic" card
5. Clicks "Copy to Campaign Template"
6. Reviews template:
   - Event: Lunch & Learn Pickleball Clinic
   - Description: 1-hour clinic + 30 min open play, equipment provided
   - Success signals: Registration full 4 weeks in a row, 15 attendees avg
7. Adapts for PCC:
   - Time: Mondays 12pm-2pm
   - Target: Beginner-friendly, nearby office workers
   - Pricing: $15 (includes equipment + light lunch)
8. Creates event in booking system
9. Promotes via email + Instagram
10. Tracks attendance over 4 weeks

**Expected Outcome**: Fill Monday 2pm slot (70%+ capacity), potential member conversions

---

### Use Case 4: Scenario Planning for Growth

**Actor**: Christy + Peter
**Goal**: Plan capacity for growth from 350 to 400 members
**Precondition**: Booking data integrated (Phase 3)

**Main Flow**:
1. Christy opens Yield Management dashboard
2. Clicks "Revenue Scenario Planner"
3. Reviews current state:
   - Monthly revenue: $82,000
   - Member satisfaction: 72 (Fair ⚠️)
   - Booking success rate: 70%
4. Simulates "Balanced Growth" scenario (65% member, 25% drop-in, 10% events)
5. Reviews projected results:
   - Monthly revenue: $98,000 (+20%)
   - Member satisfaction: 84 (Good ⚠️)
   - Booking success rate: 82%
6. Discusses with Peter:
   - "Can we grow to 400 members with this allocation?"
   - Peter: "Yes, but satisfaction drops to 75 at 400 members. Consider limiting prime time to 2 slots/member/week."
7. Christy decides:
   - Adopt "Balanced Growth" allocation
   - Implement 2-slot limit when membership hits 380
   - Monitor booking success rate monthly
8. Peter updates booking system with new rules
9. Christy announces policy change to members (framed as "ensuring access for all")

**Expected Outcome**: Sustainable growth to 400 members without churn spike

---

## Business Logic & Rules

### Segmentation Decision Tree

```
START
  ↓
Does member have survey response?
  ├─ YES → Use survey data + booking frequency
  │   ↓
  │   bookingFreq >= 3 AND jobTitle includes ["VP", "Director", "Manager"] AND companyEvents == true?
  │   ├─ YES → **Corporate Power User**
  │   └─ NO → primaryMotivation == "social" AND samePartners == false?
  │       ├─ YES → **Social Ambassador**
  │       └─ NO → primaryMotivation == "competitive" AND samePartners == true?
  │           ├─ YES → **Competitive Athlete**
  │           └─ NO → **Manual Review**
  │
  └─ NO → Use booking frequency only
      ↓
      bookingFreq < 1?
      ├─ YES → **Casual Drop-in**
      └─ NO → **Manual Review**
```

---

### CLV Calculation Rules

```
CLV = (Monthly Revenue × Gross Margin × Tenure) - CAC

Segment-Specific Parameters:
┌───────────────────────┬──────────────┬────────┬─────────┬──────┬──────────┐
│ Segment               │ Monthly Rev  │ Margin │ Tenure  │ CAC  │ CLV      │
├───────────────────────┼──────────────┼────────┼─────────┼──────┼──────────┤
│ Corporate Power Users │ $189         │ 0.75   │ 24 mo   │ $150 │ $3,543   │
│ Social Ambassadors    │ $149         │ 0.70   │ 20 mo   │ $50  │ $2,036   │
│ Competitive Athletes  │ $174         │ 0.72   │ 18 mo   │ $100 │ $2,159   │
│ Casual Drop-ins       │ $50/mo equiv │ 0.60   │ 6 mo    │ $30  │ $150     │
└───────────────────────┴──────────────┴────────┴─────────┴──────┴──────────┘

Revenue Components:
- Corporate Power Users: $149 base + $40 amenities (café, pro shop)
- Competitive Athletes: $149 base + $25 gear purchases
- Casual Drop-ins: $25/visit × 2 visits/month = $50 effective monthly
```

---

### Churn Risk Estimation

```
Churn Risk = f(Booking Success Rate, Satisfaction Score, Segment)

Rules:
1. IF bookingSuccessRate < 0.60 → High Churn Risk (all segments)
2. IF bookingSuccessRate 0.60-0.70 AND segment == "Corporate Power Users" → High Churn Risk (high expectations)
3. IF bookingSuccessRate 0.70-0.85 → Medium Churn Risk
4. IF bookingSuccessRate >= 0.85 → Low Churn Risk

Segment Modifiers:
- Social Ambassadors: -10% churn risk (community attachment)
- Casual Drop-ins: Churn not applicable (no retention expected)
```

---

### Dynamic Pricing Constraints

```
Pricing Rules:
1. MIN_PRICE = $15 (cost coverage)
2. MAX_PRICE = $40 (demand destruction threshold)
3. PRICE_CHANGE_LIMIT = ±$5 per week (avoid customer confusion)
4. WEEKEND_PREMIUM = 1.2x (Saturday/Sunday multiplier)

Algorithm:
basePrice = $25

if (demandUtilization >= 0.90):
  recommendedPrice = $35
else if (demandUtilization >= 0.75):
  recommendedPrice = $30
else if (demandUtilization >= 0.50):
  recommendedPrice = $25  # baseline
else if (demandUtilization >= 0.30):
  recommendedPrice = $20  # fill capacity
else:
  recommendedPrice = $15  # prevent empty courts

# Apply constraints
recommendedPrice = Math.max(MIN_PRICE, Math.min(MAX_PRICE, recommendedPrice))

# Apply weekend premium
if (isWeekend):
  recommendedPrice = recommendedPrice * WEEKEND_PREMIUM
```

---

## Data Requirements

### Input Data

**Phase 1: Customer Intelligence**
| Data Source | Fields | Format | Update Frequency |
|------------|--------|--------|-----------------|
| **Survey Responses** | memberId, primaryMotivation, bookingFrequency, preferredTimes, amenityInterests, samePartners, companyEvents, employer, jobTitle, workLocation | Google Sheets | One-time (Week 1-2) |
| **Member List** | memberId, name, email, joinDate, zipCode, membershipType | CSV export from booking system | One-time |
| **Census Tract Data** | GEOID, medianIncome, educationBachelors, populationDensity | GeoJSON | Static (2023 ACS) |
| **Chicago Zip Codes** | ZIP, name, boundaries | GeoJSON | Static |

**Phase 2: Best Practices**
| Data Source | Fields | Format | Update Frequency |
|------------|--------|--------|-----------------|
| **National Clubs** | placeId, name, city, state, courts, rating, avgUtilization, website, instagram | JSON | One-time (Week 7) |
| **Event Listings** | club, eventName, description, skillLevel, eventType, timePattern, theme, successSignals | JSON | One-time (Weeks 8-9) |

**Phase 3: Yield Management**
| Data Source | Fields | Format | Update Frequency |
|------------|--------|--------|-----------------|
| **Booking History** | bookingId, customerId, customerType, dateTime, endTime, courtNumber, price, bookedAt, cancelled | PostgreSQL | Daily sync (or weekly CSV) |

---

### Output Data

| Output | Format | Consumer | Update Frequency |
|--------|--------|----------|-----------------|
| **Segmented Member List** | Google Sheets / JSON | Customer Intelligence dashboard | Weekly (manual updates) |
| **Corporate Connector List** | Google Sheets / CSV | Christy (outreach campaigns) | Weekly (manual updates) |
| **Scenario Comparison Results** | JSON (in-memory) | Yield Management dashboard | On-demand |
| **Pricing Recommendations** | JSON / CSV | Christy (pricing decisions) | Monthly |

---

## Integration Points

### External APIs

**Census Bureau API** (Phase 1)
- Endpoint: https://api.census.gov/data/2023/acs/acs5
- Purpose: Fetch demographic data for Census tracts
- Authentication: API key (free, requires registration)
- Rate Limits: 500 requests/day
- Usage: One-time data pull (Week 3)

**Google Popular Times API** (Phase 2)
- Endpoint: Google Places API
- Purpose: Identify busy pickleball clubs nationally
- Authentication: API key (existing, already used for competitor data)
- Rate Limits: $200 credit/month (sufficient for 50 clubs)
- Usage: One-time discovery (Week 7)

**Instagram Basic Display API** (Phase 2)
- Purpose: Scrape event posts from club Instagram accounts
- Authentication: OAuth token (requires app registration)
- Rate Limits: 200 requests/hour
- Usage: One-time scrape (Week 8)

---

### Internal Integrations

**Booking System** (Phase 3)
- Integration Type: API (preferred) or CSV export
- Purpose: Import historical booking data
- Frequency: Daily sync (API) or weekly CSV
- Data Volume: ~18,000 bookings/year

**Email System** (Future)
- Purpose: Automated survey distribution, campaign tracking
- Integration: Mailchimp API or Gmail API
- Trigger: Manual for Phase 1, automated for Phase 2+

**CRM** (Future)
- Purpose: Track corporate event outreach
- Integration: HubSpot API or Google Sheets
- Trigger: Manual for Phase 1

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 8, 2025 | Peter Giordano | Initial functional specification |

---

**End of Functional Specification**
