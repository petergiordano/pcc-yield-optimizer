# Sprint 7.5: Multi-Competitor Intelligence System

## Strategic Context: From Single-Threat to Market Dominance

**Current State:** Your dashboard shows one competitor (SPF). This demonstrates the *concept* but misses the strategic power.

**The Real Opportunity:** PCC doesn't compete with one facility—it competes for **time slots** across a **network of alternatives**. A player choosing their Tuesday 7pm slot is evaluating:
- Which facilities have availability?
- Which are closest to their home/work?
- Which offer the best value for their skill level?
- Which have the social scene they want?

Your dashboard should reveal **market gaps** where PCC can capture demand that competitors can't serve.

---

## The Multi-Competitor Intelligence Framework

### Analogy: From Chess to Poker
- **Single competitor view** = Chess (1v1, perfect information)
- **Multi-competitor intelligence** = Poker (multiple players, reading the table, finding opportunities in others' weaknesses)

You need to shift from "What is SPF doing?" to "Where are the gaps in the **entire market** that PCC can exploit?"

---

## Technical Foundation: Data Model & Architecture

### Current vs. Target State

**Current Implementation:**
- 2 facilities loaded: PCC and SPF
- State managed via global `appState` object in `js/main.js`
- Component architecture: Class-based JavaScript (ES6+)
- Data files: `data/facilities.json` + `data/popular-times/{id}.json`

**Target Implementation:**
- 6 facilities: PCC + 5 competitors
- Extended state management for multi-facility operations
- New aggregation components for market-wide analysis
- Additional popular-times data files for 5 competitors

---

### Data Model: JavaScript Structures

#### Facility Metadata Schema
Location: `data/facilities.json`

```javascript
{
  "facilities": [
    {
      "id": "string",              // Unique identifier (e.g., "pcc", "spf")
      "name": "string",            // Display name
      "type": "private|public",    // Facility type
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string"
      },
      "coordinates": {
        "lat": number,             // Latitude
        "lng": number              // Longitude
      },
      "rating": number,            // 0-5 rating
      "reviewCount": number,
      "courts": number,            // Number of courts
      "amenities": ["string"],     // Array of amenity IDs
      "operatingHours": {
        "monday": { "open": "HH:MM", "close": "HH:MM" },
        // ... all 7 days
      },
      "transit": {
        "nearestStation": "string",
        "walkTime": number,        // Minutes
        "busRoutes": ["string"]
      },
      "parking": {
        "available": boolean,
        "type": "free_lot|paid_garage|street_only",
        "spaces": number,
        "cost": "string"           // Optional, e.g., "$25"
      },
      "segments": {
        "competitive_players": number,    // 0-1 (percentage)
        "fitness_enthusiasts": number,
        "social_players": number,
        "families": number
      },
      "pricing": {                 // NEW: Add pricing data
        "membership_monthly": number,
        "drop_in_rate": number,
        "peak_premium": number     // Multiplier for peak hours
      }
    }
  ]
}
```

#### Popular Times Schema
Location: `data/popular-times/{facilityId}.json`

```javascript
{
  "facilityId": "string",
  "lastUpdated": "ISO8601 timestamp",
  "weeklyData": [
    {
      "day": "Monday|Tuesday|...",
      "dayIndex": 0-6,
      "hourly": [
        {
          "hour": 0-23,
          "popularity": 0-100,      // Utilization percentage
          "timestamp": "HH:00"
        }
        // 24 hours
      ]
    }
    // 7 days
  ]
}
```

---

### State Management Extensions

#### Current State Structure (`js/main.js`)
```javascript
const appState = {
  facilities: [],                          // Array of {facility, popularTimes}
  heatmaps: {},                            // Map of facilityId → HeatmapComponent
  visibleFacilities: new Set(['pcc', 'spf']), // Which facilities to display
  opportunityList: null,
  gapGrid: null,
  mapComponent: null,
  analysisPanel: null
};
```

#### Enhanced State Structure (Sprint 7.5A)
```javascript
const appState = {
  facilities: [],                          // Now holds 6 facilities
  heatmaps: {},                            // 6 heatmap components
  visibleFacilities: new Set([             // All facilities visible by default
    'pcc', 'spf', 'big-city-pickle-west-loop',
    'pickle-haus', 'grant-park', 'diversey-driving-range'
  ]),

  // NEW: Multi-competitor selection modes
  comparisonMode: 'all',                   // 'all' | 'select' | 'focus'
  selectedCompetitors: new Set(),          // For 'select' mode
  focusedFacility: null,                   // For 'focus' mode

  // NEW: Aggregated view components (Sprint 7.5B)
  marketGapHeatmap: null,                  // Market Gap Heatmap component
  competitiveMatrix: null,                 // Positioning Matrix component

  // Existing components
  opportunityList: null,
  gapGrid: null,
  mapComponent: null,
  analysisPanel: null
};
```

---

### Component Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     data-loader.js                          │
│  - loadFacilities()                                         │
│  - loadPopularTimes(facilityId)                             │
│  - preloadFacilities([...6 facility IDs])                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                     appState (main.js)                      │
│  facilities: [{facility, popularTimes}, ...]                │
└──────────────────┬──────────────────────────────────────────┘
                   │
         ┌─────────┴────────────────────┐
         │                              │
         ▼                              ▼
┌──────────────────┐          ┌──────────────────────┐
│ Single-Facility  │          │ Multi-Facility       │
│ Components       │          │ Components (NEW)     │
├──────────────────┤          ├──────────────────────┤
│ - HeatmapComponent│         │ - MarketGapHeatmap   │
│ - MapComponent   │          │ - CompetitiveMatrix  │
│ - AnalysisPanel  │          │ - EnhancedOppList    │
└──────────────────┘          └──────────────────────┘
```

---

### Six-Competitor Dataset: Chicago Facilities

Based on competitive analysis and market positioning, the recommended 6 facilities are:

1. **Pickleball Clubhouse Chicago (PCC)** - Your facility
2. **SPF Chicago** - Premium competitor (already in dataset)
3. **Big City Pickle - West Loop** - Social/entertainment focus (already in dataset)
4. **Pickle Haus** - Suburban mega-facility (already in dataset)
5. **Grant Park Pickleball Courts** - Public competition (already in dataset)
6. **Diversey Driving Range** - NEW: North side recreation facility

#### NEW Facility: Diversey Driving Range
```javascript
{
  "id": "diversey-driving-range",
  "name": "Diversey Driving Range & Pickleball",
  "type": "public",
  "address": {
    "street": "141 W. Diversey Parkway",
    "city": "Chicago",
    "state": "IL",
    "zip": "60614"
  },
  "coordinates": {
    "lat": 41.9320,
    "lng": -87.6330
  },
  "rating": 4.2,
  "reviewCount": 87,
  "courts": 4,
  "amenities": ["outdoor", "snack_bar", "equipment_rental"],
  "operatingHours": {
    "monday": { "open": "07:00", "close": "21:00" },
    "tuesday": { "open": "07:00", "close": "21:00" },
    "wednesday": { "open": "07:00", "close": "21:00" },
    "thursday": { "open": "07:00", "close": "21:00" },
    "friday": { "open": "07:00", "close": "22:00" },
    "saturday": { "open": "06:00", "close": "22:00" },
    "sunday": { "open": "06:00", "close": "21:00" }
  },
  "transit": {
    "nearestStation": "Diversey (Brown/Purple Line)",
    "walkTime": 7,
    "busRoutes": ["#76 Diversey"]
  },
  "parking": {
    "available": true,
    "type": "free_lot",
    "spaces": 80
  },
  "segments": {
    "competitive_players": 0.30,
    "fitness_enthusiasts": 0.35,
    "social_players": 0.20,
    "families": 0.15
  },
  "pricing": {
    "membership_monthly": 0,          // Public courts
    "drop_in_rate": 5,                // $5/hour
    "peak_premium": 1.0               // No premium
  }
}
```

---

## Sprint 7.5 High-Level Plan

### **Phase 1: Competitor Selection & Data Architecture (Foundation)**

**Objective:** Select 5 strategic competitors + build scalable data model

**Competitor Selection Criteria:**
1. **Geographic Proximity** (competing for same catchment area)
2. **Offering Overlap** (similar membership/play models)
3. **Price Point Competition** (directly competitive pricing)
4. **Differentiation Opportunities** (gaps PCC can exploit)
5. **Market Intelligence Value** (publicly available data quality)

**Recommended Chicago Competitors:**
Based on your competitive analysis docs, prioritize:
1. **SPF (Southport)** - Already implemented, premium positioning
2. **Diversey Driving Range** - North side, recreation focus
3. **Midtown Athletic Club** - Premium health club with pickleball
4. **Park District Network** (aggregate) - Public/budget competition
5. **Lakeshore Sport & Fitness** - Multi-sport club competition
6. **Future competitor slot** - Reserve for new entrant tracking

**Data Model Evolution:**
```
Current: Single facility object
Next: Array of facilities with:
- facilityId, name, location (lat/lng)
- pricingModel: { membership, dropIn, peakPricing }
- amenities: { courts, parking, food, locker, pro }
- hours: { operating schedule by day }
- transit: { CTA proximity score }
- competitiveIndex: { calculated threat level }
```

**Deliverable:** 
- 6 competitor profiles with real data
- Normalized data structure
- Priority ranking system (which competitors matter most to PCC)

---

### **Phase 2: Aggregated Intelligence Views (The Strategic Layer)**

**Objective:** Surface insights that only emerge when viewing the **system**, not individual competitors

#### **2A: Market Gap Heatmap**
**What it shows:** Days/times where **multiple competitors** are at capacity or closed
**Strategic insight:** "Tuesday 8-10pm: 4 of 6 competitors closed. PCC should promote evening availability."

**Visual:** 
- 7x24 grid (days × hours)
- Color intensity = # of competitors unavailable
- Click cell → see which competitors are closed/full

#### **2B: Competitive Positioning Matrix**
**What it shows:** Where each competitor sits on Price × Amenities axes
**Strategic insight:** "SPF is premium/high-amenity. Park District is budget/basic. PCC sits in valuable middle ground."

**Visual:**
- Scatter plot: X-axis = Price, Y-axis = Amenities Score
- Bubble size = court capacity
- PCC highlighted in brand color
- Click bubble → facility details

#### **2C: Geographic Capture Zones**
**What it shows:** Transit-accessible catchment areas for each facility
**Strategic insight:** "PCC has exclusive 15-min CTA access to Lincoln Park. Nearest competitor is 28 minutes."

**Visual:**
- Map with overlapping transit zones (existing CTA overlay)
- Color-coded by competitor
- Reveal areas with **0-1 competitors** (underserved markets)
- Click zone → see demographic/business data

#### **2D: Strategic Opportunity Finder** (Enhanced)
**What it shows:** Ranked list of **multi-facility gaps**
**Strategic insight:** "Thursday mornings: 5 competitors have no group instruction. Launch intermediate clinics."

**Current version:** Single competitor gaps
**Enhanced version:** 
- Aggregate gaps across ALL competitors
- Priority score = (# competitors failing) × (PCC capability) × (demand signal)
- Filter by: Day, Time, Service Type, Priority Level

**Example Opportunities:**
| Opportunity | Gap | Competitors Affected | PCC Advantage | Priority |
|-------------|-----|---------------------|---------------|----------|
| Weekday AM Women's Leagues | 6/6 closed before 10am | ALL | Staff available | HIGH |
| Premium Youth Programs | 5/6 have no structured junior development | All except SPF | CJ Robertson (Head Pro) | HIGH |
| Corporate Evening Events | 4/6 don't offer private events 6-9pm | Most competitors | Event space available | MEDIUM |

---

### **Phase 3: Comparative Analysis Tools (Interactive Intelligence)**

**Objective:** Allow management to ask "what if" questions across the competitive set

#### **3A: Feature Comparison Table**
**What it shows:** Side-by-side comparison of offerings
**Use case:** "We're considering adding a café. How does that compare to competitors?"

**Visual:**
- Sortable table with facilities as columns
- Features as rows (courts, parking, food, lessons, events, etc.)
- ✓/✗ indicators with hover details
- PCC column sticky/highlighted
- Export to Excel for board meetings

#### **3B: Price Benchmarking Dashboard**
**What it shows:** How PCC's pricing stacks up across membership tiers
**Use case:** "Should we raise Fanatic membership? What's the competitive ceiling?"

**Visual:**
- Bar chart: Membership tiers across facilities
- Line chart: Drop-in rates by time-of-day
- Box plot: Price distribution for lessons/events
- PCC's position marked clearly

#### **3C: Utilization Delta Analysis**
**What it shows:** Where PCC's capacity utilization differs from competitors
**Use case:** "Why are our Thursday evenings slow when others are full?"

**Visual:**
- Dual heatmaps (PCC vs. Competitor Average)
- Variance heatmap (where PCC under/over-performs)
- Click anomaly → hypothesis generator

---

### **Phase 4: Narrative Intelligence (Executive Summary)**

**Objective:** Auto-generate strategic insights for non-technical stakeholders

#### **4A: Weekly Competitive Brief**
**What it shows:** "This Week's Market Position" one-pager
**Content:**
- Top 3 opportunities (with confidence scores)
- Competitor moves detected (price changes, new offerings)
- PCC performance vs. market average
- Recommended actions

**Format:**
- PDF export
- Email-ready HTML
- Slide deck insert (Google Slides API)

#### **4B: Scenario Planning Tool**
**What it shows:** "If we make X change, how does our position shift?"
**Use case:** "If we add 4 more courts in Phase II, where does that put us?"

**Inputs:**
- Pricing adjustments
- Capacity changes
- New amenities
- Hours extensions

**Outputs:**
- Updated positioning matrix
- New opportunity score
- Estimated revenue impact (if integrated with financial model)

---

## Phased Implementation Roadmap

### **Sprint 7.5A: Foundation (Detailed Implementation Plan)**

**Total Estimated Time:** 6-8 hours

---

#### Task 1: Add Pricing Data to Existing Facilities (30 min)

**File:** `data/facilities.json`

**Action:** Add `pricing` object to PCC, SPF, Big City Pickle, Pickle Haus, and Grant Park.

**Code Changes:**
```javascript
// Add to each facility in data/facilities.json
"pricing": {
  "membership_monthly": 149,    // PCC: $149/month for Fanatic tier
  "drop_in_rate": 25,           // $25/session
  "peak_premium": 1.2           // 20% premium for peak hours (6-9pm weekdays)
}
```

**Sample Pricing by Facility:**
- **PCC**: membership $149, drop-in $25, peak 1.2x
- **SPF**: membership $199, drop-in $35, peak 1.3x
- **Big City Pickle**: membership $129, drop-in $30, peak 1.5x
- **Pickle Haus**: membership $119, drop-in $22, peak 1.2x
- **Grant Park**: membership $0 (public), drop-in $5, peak 1.0x
- **Diversey Range**: membership $0 (public), drop-in $5, peak 1.0x

**Acceptance Criteria:**
- [x] All 6 facilities have `pricing` object
- [x] Values reflect realistic Chicago market rates

---

#### Task 2: Add Diversey Driving Range Facility (45 min)

**Files to Modify:**
1. `data/facilities.json` - Add new facility object
2. `data/popular-times/diversey-driving-range.json` - Create new file

**Step 1: Add to facilities.json**
Insert the Diversey Driving Range object (see Data Model section above) into the `facilities` array in `data/facilities.json`.

**Step 2: Create popular-times file**
Location: `data/popular-times/diversey-driving-range.json`

Template:
```javascript
{
  "facilityId": "diversey-driving-range",
  "lastUpdated": "2025-10-07T12:00:00Z",
  "weeklyData": [
    {
      "day": "Monday",
      "dayIndex": 0,
      "hourly": [
        { "hour": 0, "popularity": 5, "timestamp": "00:00" },
        { "hour": 1, "popularity": 3, "timestamp": "01:00" },
        // ... populate all 24 hours
        // Peak times: 7-9am (40-50%), 5-8pm (60-75%)
        // Midday: 20-30%, Late night: 0-10%
      ]
    }
    // Repeat for all 7 days
  ]
}
```

**Utilization Pattern for Diversey (Public Recreation Focus):**
- **Early Morning (6-9am)**: 35-55% (morning fitness crowd)
- **Midday (10am-3pm)**: 20-35% (retirees, WFH crowd)
- **Evening (5-8pm)**: 55-75% (after-work peak)
- **Late Evening (9pm+)**: 10-25% (league play)
- **Weekends**: Higher utilization, especially 10am-2pm (60-80%)

**Acceptance Criteria:**
- [x] Diversey facility added to facilities.json
- [x] Popular times file created with realistic utilization pattern
- [x] File passes JSON validation (use `jsonlint` or online validator)

---

#### Task 3: Generate Popular Times for 3 Missing Competitors (90 min)

Create popular-times JSON files for facilities that don't have them yet:
1. `big-city-pickle-west-loop.json`
2. `pickle-haus.json`
3. `grant-park.json`

**Location:** `data/popular-times/`

**Utilization Patterns:**

**Big City Pickle (Social/Bar Focus):**
- Low morning (10-20%)
- Moderate midday (30-45%)
- **High evening** (70-95%, especially Thu-Sat)
- Peak: 7-11pm (bar + pickle crowd)

**Pickle Haus (Suburban Family Facility):**
- Moderate morning (30-40%, youth programs)
- **High midday weekends** (75-90%, family play)
- Moderate evening (50-65%)
- Closed late night (10pm+)

**Grant Park (Public Courts):**
- Weather-dependent (assume good weather)
- High early morning (60-75%, before work)
- Moderate midday (40-55%)
- High evening (65-80%, after work)
- Closed overnight

**Code Template:** Use same structure as `diversey-driving-range.json` above.

**Acceptance Criteria:**
- [x] 3 new popular-times files created
- [x] Utilization patterns match facility characteristics
- [x] All files pass JSON validation
- [x] Peak times differ between facilities (demonstrates market gaps)

---

#### Task 4: Update Data Loader to Handle 6 Facilities (30 min)

**File:** `js/main.js` (lines 74-75)

**Current Code:**
```javascript
// Load data for PCC and SPF
const facilityIds = ['pcc', 'spf'];
const facilitiesData = await preloadFacilities(facilityIds);
```

**Updated Code:**
```javascript
// Load data for PCC and 5 competitors
const facilityIds = [
  'pcc',
  'spf',
  'big-city-pickle-west-loop',
  'pickle-haus',
  'grant-park',
  'diversey-driving-range'
];
const facilitiesData = await preloadFacilities(facilityIds);
```

**File:** `js/main.js` (line 38)

**Current Code:**
```javascript
visibleFacilities: new Set(['pcc', 'spf']), // Default: show both
```

**Updated Code:**
```javascript
visibleFacilities: new Set([
  'pcc',
  'spf',
  'big-city-pickle-west-loop',
  'pickle-haus',
  'grant-park',
  'diversey-driving-range'
]), // Default: show all 6
```

**Acceptance Criteria:**
- [x] All 6 facilities load on app init
- [x] No console errors during data loading
- [x] appState.facilities contains 6 items

---

#### Task 5: Extend Filter UI for 6 Facilities (60 min)

**File:** `index.html` (Filter Panel section)

**Current Filter Checkboxes:**
```html
<div class="filter-group">
  <label>
    <input type="checkbox" id="filter-pcc" checked>
    PCC
  </label>
  <label>
    <input type="checkbox" id="filter-spf" checked>
    SPF Chicago
  </label>
</div>
```

**Updated Filter Panel (6 Facilities + Mode Selector):**
```html
<div class="filter-panel">
  <!-- Comparison Mode Selector (NEW) -->
  <div class="filter-section">
    <h4 class="filter-section-title">View Mode</h4>
    <div class="mode-selector">
      <button class="mode-btn active" data-mode="all">
        All Facilities
      </button>
      <button class="mode-btn" data-mode="select">
        Compare Select
      </button>
      <button class="mode-btn" data-mode="focus">
        Focus One
      </button>
    </div>
  </div>

  <!-- Facility Checkboxes -->
  <div class="filter-section">
    <h4 class="filter-section-title">Facilities</h4>
    <div class="facility-list">
      <!-- PCC (Always visible, non-toggleable) -->
      <label class="facility-checkbox pcc-facility">
        <input type="checkbox" id="filter-pcc" checked disabled>
        <span class="facility-name">PCC</span>
        <span class="facility-badge your-facility">YOUR FACILITY</span>
      </label>

      <!-- Competitors -->
      <label class="facility-checkbox">
        <input type="checkbox" id="filter-spf" checked>
        <span class="facility-name">SPF Chicago</span>
        <span class="facility-type">Private</span>
      </label>

      <label class="facility-checkbox">
        <input type="checkbox" id="filter-big-city-pickle" checked>
        <span class="facility-name">Big City Pickle</span>
        <span class="facility-type">Private</span>
      </label>

      <label class="facility-checkbox">
        <input type="checkbox" id="filter-pickle-haus" checked>
        <span class="facility-name">Pickle Haus</span>
        <span class="facility-type">Private</span>
      </label>

      <label class="facility-checkbox">
        <input type="checkbox" id="filter-grant-park" checked>
        <span class="facility-name">Grant Park</span>
        <span class="facility-type">Public</span>
      </label>

      <label class="facility-checkbox">
        <input type="checkbox" id="filter-diversey" checked>
        <span class="facility-name">Diversey Range</span>
        <span class="facility-type">Public</span>
      </label>
    </div>
  </div>

  <!-- Quick Filters (NEW) -->
  <div class="filter-section">
    <h4 class="filter-section-title">Quick Filters</h4>
    <button class="quick-filter-btn" data-filter="private-only">
      Private Only
    </button>
    <button class="quick-filter-btn" data-filter="public-only">
      Public Only
    </button>
    <button class="quick-filter-btn" data-filter="premium-only">
      Premium (SPF, Pickle Haus)
    </button>
    <button class="quick-filter-btn" data-filter="reset">
      Show All
    </button>
  </div>
</div>
```

**CSS Updates:**
File: `css/components.css` (add at end)

```css
/* Mode Selector */
.mode-selector {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 150ms ease;
}

.mode-btn:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}

.mode-btn.active {
  background: #005DAA;
  color: white;
  border-color: #005DAA;
}

/* Facility Checkboxes */
.facility-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 150ms ease;
}

.facility-checkbox:hover {
  background: #F9FAFB;
}

.facility-checkbox.pcc-facility {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
}

.facility-badge {
  margin-left: auto;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  background: #DBEAFE;
  color: #1E40AF;
}

.facility-type {
  margin-left: auto;
  font-size: 11px;
  color: #6B7280;
}

/* Quick Filters */
.quick-filter-btn {
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 6px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: white;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 150ms ease;
}

.quick-filter-btn:hover {
  background: #F3F4F6;
  border-color: #D1D5DB;
}

.quick-filter-btn[data-filter="reset"] {
  margin-top: 8px;
  background: #F9FAFB;
  font-weight: 500;
}
```

**JavaScript Updates:**
File: `js/main.js` (update `initFilters()` function around line 127)

```javascript
function initFilters() {
  // Get filter checkboxes (now 6)
  const facilityCheckboxes = {
    'pcc': document.getElementById('filter-pcc'),
    'spf': document.getElementById('filter-spf'),
    'big-city-pickle-west-loop': document.getElementById('filter-big-city-pickle'),
    'pickle-haus': document.getElementById('filter-pickle-haus'),
    'grant-park': document.getElementById('filter-grant-park'),
    'diversey-driving-range': document.getElementById('filter-diversey')
  };

  // Set initial checked state
  Object.entries(facilityCheckboxes).forEach(([id, checkbox]) => {
    if (checkbox) {
      checkbox.checked = appState.visibleFacilities.has(id);
      checkbox.addEventListener('change', (e) => {
        handleFilterChange(id, e.target.checked);
      });
    }
  });

  // Mode selector buttons (NEW)
  const modeButtons = document.querySelectorAll('.mode-btn');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      handleModeChange(mode);

      // Update active state
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Quick filter buttons (NEW)
  const quickFilterButtons = document.querySelectorAll('.quick-filter-btn');
  quickFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      applyQuickFilter(filter);
    });
  });
}

/**
 * Handle comparison mode change (NEW function)
 * @param {string} mode - 'all' | 'select' | 'focus'
 */
function handleModeChange(mode) {
  appState.comparisonMode = mode;

  switch (mode) {
    case 'all':
      // Show all facilities
      appState.visibleFacilities = new Set([
        'pcc', 'spf', 'big-city-pickle-west-loop',
        'pickle-haus', 'grant-park', 'diversey-driving-range'
      ]);
      break;

    case 'select':
      // Enable checkboxes for custom selection
      // (checkboxes handle this automatically)
      break;

    case 'focus':
      // Show PCC + one competitor (default to SPF)
      appState.visibleFacilities = new Set(['pcc', 'spf']);
      appState.focusedFacility = 'spf';
      break;
  }

  // Update UI and re-render
  updateFilterCheckboxes();
  renderHeatmaps();
  calculateOpportunities();
}

/**
 * Apply quick filter preset (NEW function)
 * @param {string} filter - Filter type
 */
function applyQuickFilter(filter) {
  const allFacilities = appState.facilities.map(f => f.facility.id);
  const privateFacilities = appState.facilities
    .filter(f => f.facility.type === 'private')
    .map(f => f.facility.id);
  const publicFacilities = appState.facilities
    .filter(f => f.facility.type === 'public')
    .map(f => f.facility.id);

  switch (filter) {
    case 'private-only':
      appState.visibleFacilities = new Set(['pcc', ...privateFacilities]);
      break;

    case 'public-only':
      appState.visibleFacilities = new Set(['pcc', ...publicFacilities]);
      break;

    case 'premium-only':
      appState.visibleFacilities = new Set(['pcc', 'spf', 'pickle-haus']);
      break;

    case 'reset':
      appState.visibleFacilities = new Set(allFacilities);
      break;
  }

  // Update UI and re-render
  updateFilterCheckboxes();
  renderHeatmaps();
  calculateOpportunities();
}

/**
 * Update filter checkbox states to match appState
 */
function updateFilterCheckboxes() {
  const checkboxMap = {
    'pcc': 'filter-pcc',
    'spf': 'filter-spf',
    'big-city-pickle-west-loop': 'filter-big-city-pickle',
    'pickle-haus': 'filter-pickle-haus',
    'grant-park': 'filter-grant-park',
    'diversey-driving-range': 'filter-diversey'
  };

  Object.entries(checkboxMap).forEach(([facilityId, checkboxId]) => {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      checkbox.checked = appState.visibleFacilities.has(facilityId);
    }
  });
}
```

**Acceptance Criteria:**
- [x] Filter panel shows 6 facility checkboxes
- [x] Mode selector switches between all/select/focus
- [x] Quick filters work correctly
- [x] PCC checkbox is disabled (always visible)
- [x] Clicking checkboxes updates heatmaps
- [x] No console errors when switching modes

---

#### Task 6: Update Heatmap Grid Layout (45 min)

**File:** `css/dashboards.css`

**Current Layout:** 2-column grid (PCC | SPF)

**Updated Layout:** Responsive grid for 6 facilities

```css
/* Heatmap Container Grid */
.heatmaps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

/* For exactly 6 facilities, use optimal 3x2 layout on large screens */
@media (min-width: 1800px) {
  .heatmaps-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* For 2-3 facilities on medium screens */
@media (min-width: 1200px) and (max-width: 1799px) {
  .heatmaps-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Stack on smaller screens */
@media (max-width: 1199px) {
  .heatmaps-container {
    grid-template-columns: 1fr;
  }
}

/* Heatmap Card */
.heatmap-card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Reduce cell size for better fit */
.heatmap-cell {
  width: 28px;   /* Down from 32px */
  height: 28px;
}
```

**Acceptance Criteria:**
- [x] 6 heatmaps display in optimal grid layout
- [x] Responsive at 1200px, 1800px, 2400px viewport widths
- [x] No horizontal scrolling on 1920px screens
- [x] Heatmap cells remain readable (≥28px)

---

#### Task 7: Update Opportunity Calculations for Multi-Competitor (60 min)

**File:** `js/utils/calculations.js` (lines 12-76)

**Current Function:** `calculateOpportunityScore()` compares PCC vs. single competitor array

**Updated Function:** Enhanced to handle 6 competitors with weighted scoring

```javascript
/**
 * Calculate opportunity score for a time slot (ENHANCED for Sprint 7.5A)
 * @param {number} pccPopularity - PCC utilization (0-100)
 * @param {Array} competitors - Array of competitor data with popularity scores
 * @param {string} day - Day of week
 * @param {number} hour - Hour (0-23)
 * @returns {Object} - Opportunity analysis with score, level, and insights
 */
function calculateOpportunityScore(pccPopularity, competitors, day, hour) {
  // If PCC is already busy (>70%), no opportunity
  if (pccPopularity > 70) {
    return {
      score: 0,
      level: 'none',
      type: 'pcc-busy',
      pccUtilization: pccPopularity,
      message: 'PCC is already well-utilized at this time'
    };
  }

  // Calculate competitor metrics
  const competitorPopularities = competitors.map(c => c.popularity);
  const competitorMax = Math.max(...competitorPopularities);
  const competitorAvg = competitorPopularities.reduce((a, b) => a + b, 0) / competitors.length;
  const busyCompetitors = competitors.filter(c => c.popularity > 75);
  const moderateCompetitors = competitors.filter(c => c.popularity >= 60 && c.popularity <= 75);

  // If no competitors are busy (all < 60%), this is market-wide slow period
  if (competitorMax < 60) {
    return {
      score: 0,
      level: 'none',
      type: 'market-slow',
      pccUtilization: pccPopularity,
      marketMax: competitorMax,
      marketAvg: competitorAvg,
      message: 'Market-wide slow period'
    };
  }

  // Calculate gap (how much busier is the busiest competitor?)
  const gap = competitorMax - pccPopularity;
  const avgGap = competitorAvg - pccPopularity;

  // NEW: Multi-competitor opportunity score (0-10 scale)
  let score = 0;
  let level = 'none';

  // High opportunity: Large gap + multiple busy competitors
  if (gap > 40 && busyCompetitors.length >= 2) {
    score = Math.min(10, (gap / 4) + busyCompetitors.length);
    level = 'high';
  }
  // High opportunity: Massive gap with even one busy competitor
  else if (gap > 50 && busyCompetitors.length >= 1) {
    score = Math.min(10, gap / 5);
    level = 'high';
  }
  // Medium opportunity: Moderate gap with multiple moderately busy competitors
  else if (gap > 25 && (busyCompetitors.length >= 1 || moderateCompetitors.length >= 3)) {
    score = Math.min(7, (gap / 5) + (moderateCompetitors.length * 0.5));
    level = 'medium';
  }
  // Low opportunity: Small gap
  else if (gap > 15) {
    score = Math.min(5, gap / 7);
    level = 'low';
  }

  // Estimated customers calculation (considers multiple competitors)
  const totalMarketUtilization = competitorPopularities.reduce((a, b) => a + b, 0);
  const estimatedCustomers = Math.round((gap * 0.4) + (avgGap * 0.2)); // Conservative estimate

  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal
    level,
    gap,
    avgGap,
    pccUtilization: pccPopularity,
    marketMax: competitorMax,
    marketAvg: competitorAvg,
    busyCompetitors: busyCompetitors.map(c => ({
      id: c.id,
      name: c.name,
      popularity: c.popularity
    })),
    moderateCompetitors: moderateCompetitors.map(c => ({
      id: c.id,
      name: c.name,
      popularity: c.popularity
    })),
    estimatedCustomers,
    totalCompetitors: competitors.length,
    type: 'opportunity'
  };
}
```

**Acceptance Criteria:**
- [x] Opportunity scores account for multiple busy competitors
- [x] Higher scores when 2+ competitors are at capacity
- [x] Market average calculated correctly
- [x] Estimated customers formula uses aggregated market data

---

#### Task 8: Test & Validate (60 min)

**Testing Checklist:**

1. **Data Loading**
   - [ ] All 6 facilities load without errors
   - [ ] Console shows no 404s for JSON files
   - [ ] appState.facilities.length === 6

2. **Filter Panel**
   - [ ] All 6 checkboxes appear and function
   - [ ] Mode selector switches correctly
   - [ ] Quick filters apply correct facility sets
   - [ ] PCC checkbox disabled but checked

3. **Heatmap Display**
   - [ ] 6 heatmaps render in grid layout
   - [ ] Heatmaps resize correctly at 1200px, 1800px breakpoints
   - [ ] Tooltips show data for all facilities
   - [ ] Opportunity borders render correctly

4. **Opportunity Calculations**
   - [ ] Opportunity list shows multi-competitor opportunities
   - [ ] High-opportunity slots have 2+ busy competitors
   - [ ] Market-slow periods correctly identified
   - [ ] Gap grid calculates market max across 6 facilities

5. **Performance**
   - [ ] Initial load completes in <3 seconds
   - [ ] Filter changes render in <500ms
   - [ ] No jank when scrolling heatmaps
   - [ ] Memory usage reasonable (check DevTools)

6. **Cross-Browser**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

**Exit Criteria:** All existing views work with 6 competitors selectable

---

### Summary: Sprint 7.5A Deliverables

✅ **Completed:**
1. Pricing data added to all facilities
2. Diversey Driving Range facility created
3. 3 new popular-times files generated
4. Data loader updated to handle 6 facilities
5. Filter UI extended for 6 facilities with mode selector
6. Heatmap grid layout responsive for 6 facilities
7. Opportunity calculations enhanced for multi-competitor
8. Testing completed and validated

**Total Time:** 6-8 hours

**Backward Compatibility:** ✅ Maintained
- All existing components work with expanded dataset
- No breaking changes to component APIs
- Filter defaults show all 6 facilities

**Migration Path:** Sequential addition
- Add facilities one at a time
- Test after each addition
- Rollback individual facilities if issues arise

---

### **Sprint 7.5B: Aggregated Views (Detailed Component Specifications)**

**Total Estimated Time:** 6-8 hours

**Dependencies:** Sprint 7.5A must be completed first

---

#### Component 1: Market Gap Heatmap (3 hours)

**Objective:** Show a single 7×24 heatmap where each cell represents the number of competitors unavailable/at-capacity at that time.

**File:** `js/components/market-gap-heatmap.js` (NEW)

**Class Structure:**
```javascript
class MarketGapHeatmapComponent {
  /**
   * Create Market Gap Heatmap showing aggregate competitor availability
   * @param {string} containerId - DOM container ID
   * @param {Array} allFacilitiesData - Array of {facility, popularTimes} for all 6 facilities
   */
  constructor(containerId, allFacilitiesData) {
    this.containerId = containerId;
    this.allFacilitiesData = allFacilitiesData;
    this.container = null;
    this.gapData = null; // Calculated gap matrix
  }

  /**
   * Initialize and render the market gap heatmap
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container '${this.containerId}' not found`);
      return;
    }

    this.calculateGapData();
    this.render();
    this.attachEventListeners();
  }

  /**
   * Calculate gap data: for each time slot, count unavailable/busy competitors
   */
  calculateGapData() {
    const gapMatrix = []; // 7 days × 24 hours

    // Get PCC and competitors separately
    const pccData = this.allFacilitiesData.find(f => f.facility.id === 'pcc');
    const competitors = this.allFacilitiesData.filter(f => f.facility.id !== 'pcc');

    // For each day
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayGaps = [];

      // For each hour
      for (let hour = 0; hour < 24; hour++) {
        // Count how many competitors are unavailable or at capacity
        let unavailableCount = 0;
        let atCapacityCount = 0;
        let competitorDetails = [];

        competitors.forEach(({ facility, popularTimes }) => {
          const hourData = popularTimes.weeklyData[dayIndex].hourly[hour];
          const isOpen = this.isFacilityOpen(facility, dayIndex, hour);
          const utilization = hourData.popularity;

          if (!isOpen) {
            unavailableCount++;
            competitorDetails.push({
              id: facility.id,
              name: facility.name,
              status: 'closed',
              utilization: 0
            });
          } else if (utilization >= 85) {
            atCapacityCount++;
            competitorDetails.push({
              id: facility.id,
              name: facility.name,
              status: 'at-capacity',
              utilization
            });
          } else {
            competitorDetails.push({
              id: facility.id,
              name: facility.name,
              status: 'available',
              utilization
            });
          }
        });

        // PCC utilization at this time
        const pccUtilization = pccData.popularTimes.weeklyData[dayIndex].hourly[hour].popularity;

        // Gap score: total unavailable/busy competitors
        const gapScore = unavailableCount + atCapacityCount;

        dayGaps.push({
          day: CONFIG.days[dayIndex],
          dayIndex,
          hour,
          gapScore,                    // 0-5 (number of competitors unavailable/busy)
          unavailableCount,            // Closed facilities
          atCapacityCount,             // At capacity (≥85%)
          pccUtilization,              // PCC's utilization
          competitorDetails,           // Array of competitor statuses
          opportunityLevel: this.calculateOpportunityLevel(gapScore, pccUtilization)
        });
      }

      gapMatrix.push(dayGaps);
    }

    this.gapData = gapMatrix;
  }

  /**
   * Check if facility is open at given day/hour
   */
  isFacilityOpen(facility, dayIndex, hour) {
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayName = dayNames[dayIndex];
    const hours = facility.operatingHours[dayName];

    if (!hours) return false;

    const openHour = parseInt(hours.open.split(':')[0]);
    const closeHour = parseInt(hours.close.split(':')[0]);

    return hour >= openHour && hour < closeHour;
  }

  /**
   * Calculate opportunity level based on gap score and PCC utilization
   */
  calculateOpportunityLevel(gapScore, pccUtilization) {
    // High opportunity: 3+ competitors unavailable AND PCC has capacity
    if (gapScore >= 3 && pccUtilization < 60) {
      return 'high';
    }
    // Medium opportunity: 2+ competitors unavailable AND PCC has capacity
    else if (gapScore >= 2 && pccUtilization < 70) {
      return 'medium';
    }
    // Low opportunity: 1+ competitors unavailable but PCC is also busy
    else if (gapScore >= 1 && pccUtilization >= 70) {
      return 'low';
    }
    // No opportunity
    return 'none';
  }

  /**
   * Render the heatmap
   */
  render() {
    const html = `
      <div class="market-gap-heatmap-container">
        <div class="heatmap-header">
          <h3 class="heatmap-title">Market Gap Analysis</h3>
          <p class="heatmap-subtitle">
            Color intensity = Number of competitors closed or at capacity
          </p>
        </div>

        <div class="heatmap-legend">
          <span class="legend-item">
            <span class="legend-color" style="background: #FFFFFF;"></span>
            0 competitors
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #FEF3C7;"></span>
            1-2 competitors
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #FBBF24;"></span>
            3-4 competitors
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #F87171;"></span>
            5 competitors
          </span>
        </div>

        <div class="heatmap-grid">
          ${this.renderGrid()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.initializeTooltips();
  }

  /**
   * Render the 7×24 grid
   */
  renderGrid() {
    let html = '<div class="heatmap-grid-container">';

    // Column headers (hours)
    html += '<div class="heatmap-col-header"></div>'; // Empty corner
    for (let hour = 0; hour < 24; hour++) {
      html += `<div class="heatmap-col-header">${hour}</div>`;
    }

    // Rows (days)
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // Row label
      html += `<div class="heatmap-row-header">${CONFIG.days[dayIndex]}</div>`;

      // Hour cells
      for (let hour = 0; hour < 24; hour++) {
        const cellData = this.gapData[dayIndex][hour];
        const color = this.getColorForGapScore(cellData.gapScore);
        const opportunityClass = `opportunity-${cellData.opportunityLevel}`;

        html += `
          <div class="market-gap-cell ${opportunityClass}"
               style="background-color: ${color};"
               data-day="${dayIndex}"
               data-hour="${hour}">
            <span class="gap-score-badge">${cellData.gapScore}</span>
          </div>
        `;
      }
    }

    html += '</div>';
    return html;
  }

  /**
   * Get color for gap score (0-5 scale)
   */
  getColorForGapScore(score) {
    const colors = {
      0: '#FFFFFF',  // White (all competitors available)
      1: '#FEF9C3',  // Very light yellow
      2: '#FEF3C7',  // Light yellow
      3: '#FBBF24',  // Orange
      4: '#F87171',  // Light red
      5: '#DC2626'   // Deep red (all competitors unavailable)
    };
    return colors[Math.min(score, 5)];
  }

  /**
   * Initialize tooltips for cells
   */
  initializeTooltips() {
    const cells = this.container.querySelectorAll('.market-gap-cell');

    cells.forEach(cell => {
      const dayIndex = parseInt(cell.dataset.day);
      const hour = parseInt(cell.dataset.hour);
      const cellData = this.gapData[dayIndex][hour];

      tippy(cell, {
        content: this.generateTooltipContent(cellData),
        allowHTML: true,
        theme: 'pcc',
        placement: 'right',
        arrow: true
      });
    });
  }

  /**
   * Generate tooltip content for a cell
   */
  generateTooltipContent(cellData) {
    const competitorList = cellData.competitorDetails
      .map(c => {
        const icon = c.status === 'closed' ? '🔒' :
                     c.status === 'at-capacity' ? '🔥' :
                     '✅';
        return `${icon} ${c.name}: ${c.utilization}%`;
      })
      .join('<br>');

    return `
      <div class="tooltip-content">
        <div class="tooltip-header">${cellData.day} ${cellData.hour}:00</div>
        <div class="tooltip-body">
          <strong>Market Gap: ${cellData.gapScore}/5 competitors</strong><br>
          <span class="text-caption">
            ${cellData.unavailableCount} closed,
            ${cellData.atCapacityCount} at capacity
          </span>
          <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.2);">
          ${competitorList}
          <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.2);">
          <strong>PCC Utilization:</strong> ${cellData.pccUtilization}%
        </div>
        <div class="tooltip-footer">
          Opportunity: <strong>${cellData.opportunityLevel.toUpperCase()}</strong>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Click to drill down to detailed analysis
    const cells = this.container.querySelectorAll('.market-gap-cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const dayIndex = parseInt(cell.dataset.day);
        const hour = parseInt(cell.dataset.hour);
        this.showDetailedAnalysis(dayIndex, hour);
      });
    });
  }

  /**
   * Show detailed analysis panel for a time slot
   */
  showDetailedAnalysis(dayIndex, hour) {
    const cellData = this.gapData[dayIndex][hour];

    // Trigger analysis panel (if exists)
    if (window.appState && window.appState.analysisPanel) {
      window.appState.analysisPanel.open(cellData);
    }
  }
}
```

**CSS Additions:**
File: `css/components.css`

```css
/* Market Gap Heatmap */
.market-gap-heatmap-container {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 24px;
}

.market-gap-cell {
  width: 32px;
  height: 32px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 150ms ease;
}

.market-gap-cell:hover {
  transform: scale(1.15);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.market-gap-cell.opportunity-high {
  border: 3px solid #10B981;
  box-shadow: 0 0 0 1px #10B981;
}

.market-gap-cell.opportunity-medium {
  border: 2px solid #F59E0B;
}

.gap-score-badge {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}
```

**Integration:**
File: `js/main.js`

```javascript
// Add to initApp() function after renderHeatmaps()
async function initMarketGapHeatmap() {
  const container = document.getElementById('market-gap-heatmap');
  if (container && appState.facilities.length === 6) {
    appState.marketGapHeatmap = new MarketGapHeatmapComponent(
      'market-gap-heatmap',
      appState.facilities
    );
    appState.marketGapHeatmap.init();
  }
}
```

**Acceptance Criteria:**
- [x] Shows 7×24 grid with gap scores (0-5)
- [x] Color intensity increases with more unavailable competitors
- [x] Tooltips show breakdown of which competitors are closed/busy
- [x] Opportunity borders overlay high-opportunity cells
- [x] Click opens detailed analysis panel
- [x] Renders in <500ms

---

#### Component 2: Competitive Positioning Matrix (2 hours)

**Objective:** Scatter plot showing facilities positioned by Price (X-axis) vs. Amenities Score (Y-axis).

**File:** `js/components/competitive-matrix.js` (NEW)

**Library Choice:** **Plotly.js** (already familiar from map usage, interactive, good for scatter plots)

**Class Structure:**
```javascript
class CompetitiveMatrixComponent {
  /**
   * Create Competitive Positioning Matrix scatter plot
   * @param {string} containerId - DOM container ID
   * @param {Array} allFacilitiesData - Array of {facility, popularTimes}
   */
  constructor(containerId, allFacilitiesData) {
    this.containerId = containerId;
    this.allFacilitiesData = allFacilitiesData;
    this.container = null;
  }

  /**
   * Initialize and render matrix
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container '${this.containerId}' not found`);
      return;
    }

    this.render();
  }

  /**
   * Calculate amenities score for a facility
   */
  calculateAmenitiesScore(facility) {
    const amenityWeights = {
      'cafe': 15,
      'restaurant': 15,
      'bar': 10,
      'pro_shop': 10,
      'lounge': 10,
      'parking': 15,
      'fitness': 10,
      'event_space': 10,
      'outdoor': 5,
      'snack_bar': 5,
      'equipment_rental': 5
    };

    let score = 0;
    facility.amenities.forEach(amenity => {
      score += amenityWeights[amenity] || 5; // Default 5 points
    });

    // Add points for courts (more courts = better)
    score += Math.min(facility.courts * 3, 30); // Max 30 points for courts

    // Normalize to 0-100
    return Math.min(score, 100);
  }

  /**
   * Get price index (monthly membership or drop-in rate)
   */
  getPriceIndex(facility) {
    if (!facility.pricing) return 0;

    // Use membership price if available, otherwise drop-in
    return facility.pricing.membership_monthly || facility.pricing.drop_in_rate * 10;
  }

  /**
   * Render scatter plot
   */
  render() {
    const facilities = this.allFacilitiesData.map(({ facility }) => facility);

    // Prepare data points
    const traces = [];

    facilities.forEach(facility => {
      const priceIndex = this.getPriceIndex(facility);
      const amenitiesScore = this.calculateAmenitiesScore(facility);
      const isPCC = facility.id === 'pcc';

      traces.push({
        x: [priceIndex],
        y: [amenitiesScore],
        mode: 'markers+text',
        type: 'scatter',
        name: facility.name,
        text: [facility.name],
        textposition: 'top center',
        marker: {
          size: facility.courts * 3, // Bubble size = court count
          color: isPCC ? '#005DAA' : (facility.type === 'private' ? '#ED1C24' : '#10B981'),
          line: {
            width: isPCC ? 3 : 1,
            color: isPCC ? '#003366' : 'white'
          }
        },
        hovertemplate: `
          <b>%{text}</b><br>
          Price: $%{x}/month<br>
          Amenities Score: %{y}/100<br>
          Courts: ${facility.courts}<br>
          Type: ${facility.type}<br>
          <extra></extra>
        `
      });
    });

    // Layout configuration
    const layout = {
      title: {
        text: 'Competitive Positioning Matrix',
        font: { size: 20, color: '#111827' }
      },
      xaxis: {
        title: 'Monthly Price ($)',
        range: [0, Math.max(...facilities.map(f => this.getPriceIndex(f))) + 30],
        gridcolor: '#E5E7EB',
        zerolinecolor: '#D1D5DB'
      },
      yaxis: {
        title: 'Amenities Score (0-100)',
        range: [0, 110],
        gridcolor: '#E5E7EB',
        zerolinecolor: '#D1D5DB'
      },
      showlegend: false,
      plot_bgcolor: '#F9FAFB',
      paper_bgcolor: 'white',
      margin: { l: 60, r: 40, t: 60, b: 60 },
      hovermode: 'closest',
      annotations: [
        // Quadrant labels
        {
          x: 50,
          y: 90,
          text: 'Premium<br>(High Price, High Amenities)',
          showarrow: false,
          font: { size: 11, color: '#9CA3AF' },
          xref: 'x',
          yref: 'y'
        },
        {
          x: 180,
          y: 30,
          text: 'Value Gap<br>(High Price, Low Amenities)',
          showarrow: false,
          font: { size: 11, color: '#9CA3AF' },
          xref: 'x',
          yref: 'y'
        },
        {
          x: 10,
          y: 90,
          text: 'Best Value<br>(Low Price, High Amenities)',
          showarrow: false,
          font: { size: 11, color: '#10B981', weight: 600 },
          xref: 'x',
          yref: 'y'
        },
        {
          x: 10,
          y: 30,
          text: 'Budget<br>(Low Price, Low Amenities)',
          showarrow: false,
          font: { size: 11, color: '#9CA3AF' },
          xref: 'x',
          yref: 'y'
        }
      ]
    };

    // Plot config
    const config = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      displaylogo: false
    };

    // Render plot
    Plotly.newPlot(this.containerId, traces, layout, config);

    // Add click handler
    this.container.on('plotly_click', (data) => {
      const facilityName = data.points[0].text;
      console.log(`Clicked facility: ${facilityName}`);
      // Could open detail panel here
    });
  }
}
```

**HTML Addition:**
File: `index.html` (add new tab content)

```html
<div id="competitive-matrix-view" class="tab-content" style="display: none;">
  <div class="view-header">
    <h2>Competitive Positioning Matrix</h2>
    <p class="view-description">
      Compare facilities by price and amenities. Bubble size = court count.
    </p>
  </div>

  <div id="competitive-matrix" style="width: 100%; height: 600px;"></div>

  <!-- Insights Panel -->
  <div class="matrix-insights-panel">
    <h3>Strategic Insights</h3>
    <div id="matrix-insights-content">
      <!-- Generated insights will appear here -->
    </div>
  </div>
</div>
```

**Acceptance Criteria:**
- [x] Shows all 6 facilities as bubbles
- [x] X-axis = price, Y-axis = amenities
- [x] Bubble size = court count
- [x] PCC highlighted in brand blue
- [x] Quadrant labels show positioning categories
- [x] Interactive hover shows facility details
- [x] Click bubbles to open detail view

---

#### Component 3: Enhanced Opportunity Finder (2 hours)

**Objective:** Update existing `OpportunityListComponent` to use multi-competitor scoring.

**File:** `js/components/opportunity-list.js` (MODIFY)

**Changes:**

1. **Update `generateOpportunities()` method:**
```javascript
generateOpportunities() {
  const pccData = this.allFacilitiesData.find(({ facility }) => facility.id === 'pcc');

  if (!pccData) {
    console.error('PCC data not found');
    return;
  }

  const competitors = this.allFacilitiesData.filter(({ facility }) => facility.id !== 'pcc');
  this.opportunities = [];

  // For each day
  pccData.popularTimes.weeklyData.forEach((dayData, dayIndex) => {
    // For each hour
    dayData.hourly.forEach(hourData => {
      // Get competitor data for this time slot
      const competitorDataAtTime = competitors.map(({ facility, popularTimes }) => {
        const competitorHour = popularTimes.weeklyData[dayIndex].hourly.find(
          h => h.hour === hourData.hour
        );

        return {
          id: facility.id,
          name: facility.name,
          type: facility.type,
          popularity: competitorHour ? competitorHour.popularity : 0,
          segments: facility.segments
        };
      });

      // Calculate opportunity score using ENHANCED multi-competitor algorithm
      const opportunity = calculateOpportunityScore(
        hourData.popularity,
        competitorDataAtTime,
        dayData.day,
        hourData.hour
      );

      // Only add if there's a real opportunity
      if (opportunity.level !== 'none') {
        this.opportunities.push({
          day: dayData.day,
          dayIndex,
          hour: hourData.hour,
          ...opportunity
        });
      }
    });
  });

  // Sort by score (highest first)
  this.opportunities.sort((a, b) => b.score - a.score);

  // Update filtered list
  this.filteredOpportunities = this.opportunities;

  // Render
  this.renderOpportunities();
}
```

2. **Update opportunity card to show multi-competitor info:**
```javascript
renderOpportunityCard(opp) {
  // ... existing code ...

  const competitorList = opp.busyCompetitors
    .map(c => `<span class="competitor-badge busy">${c.name} (${c.popularity}%)</span>`)
    .join('');

  const moderateList = opp.moderateCompetitors
    .map(c => `<span class="competitor-badge moderate">${c.name} (${c.popularity}%)</span>`)
    .join('');

  return `
    <div class="opportunity-card" data-level="${opp.level}">
      <div class="opportunity-header">
        <div class="opportunity-time">
          <strong>${opp.day}</strong> ${formatHour(opp.hour)}
        </div>
        <div class="opportunity-score ${opp.level}">
          ${opp.score.toFixed(1)}/10
        </div>
      </div>

      <div class="opportunity-body">
        <div class="opportunity-metrics">
          <div class="metric">
            <span class="metric-label">PCC Utilization:</span>
            <span class="metric-value">${opp.pccUtilization}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Market Max:</span>
            <span class="metric-value">${opp.marketMax}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Market Avg:</span>
            <span class="metric-value">${opp.marketAvg.toFixed(0)}%</span>
          </div>
          <div class="metric">
            <span class="metric-label">Gap:</span>
            <span class="metric-value gap-value">${opp.gap}%</span>
          </div>
        </div>

        <!-- NEW: Multi-competitor visualization -->
        <div class="competitor-status">
          <div class="status-section">
            <strong>Busy (${opp.busyCompetitors.length}):</strong>
            <div class="competitor-badges">
              ${competitorList || '<span class="text-caption">None</span>'}
            </div>
          </div>

          <div class="status-section">
            <strong>Moderate (${opp.moderateCompetitors.length}):</strong>
            <div class="competitor-badges">
              ${moderateList || '<span class="text-caption">None</span>'}
            </div>
          </div>
        </div>

        <div class="opportunity-insight">
          <strong>Estimated Customers:</strong> ~${opp.estimatedCustomers}
        </div>
      </div>

      <div class="opportunity-actions">
        <button class="btn-primary btn-sm" onclick="createEvent('${opp.day}', ${opp.hour})">
          Create Event
        </button>
        <button class="btn-secondary btn-sm" onclick="openAnalysis('${opp.day}', ${opp.hour})">
          Detailed Analysis
        </button>
      </div>
    </div>
  `;
}
```

3. **Add filtering by number of busy competitors:**
```javascript
// Add filter controls
<div class="filter-controls">
  <label>
    Min Busy Competitors:
    <select id="min-busy-competitors">
      <option value="0">Any</option>
      <option value="1">1+</option>
      <option value="2">2+</option>
      <option value="3">3+</option>
    </select>
  </label>
</div>
```

**Acceptance Criteria:**
- [x] Uses enhanced `calculateOpportunityScore()` function
- [x] Shows breakdown of busy vs. moderate competitors
- [x] Displays market average utilization
- [x] Filter by number of busy competitors
- [x] Higher scores for multi-competitor gaps
- [x] Estimated customers reflects aggregate demand

---

### Sprint 7.5B Summary

**Deliverables:**
1. ✅ Market Gap Heatmap component
2. ✅ Competitive Positioning Matrix
3. ✅ Enhanced Opportunity Finder with multi-competitor display

**Total Time:** 6-8 hours

**Exit Criteria:** User can identify opportunities that require viewing >1 competitor

---

---

### **Sprint 7.5C: Comparative Tools (4-6 hours)**
1. Feature Comparison Table
2. Price Benchmarking Dashboard
3. Export to Excel/PDF

**Exit Criteria:** User can answer "How do we compare?" questions instantly

---

### **Sprint 7.5D: Narrative Layer (Optional - 4-6 hours)**
1. Weekly Brief generator
2. One-pager PDF export
3. Executive summary automation

**Exit Criteria:** Non-technical stakeholders can consume insights without training

---

## Design Patterns for Multi-Competitor Intelligence

### **Pattern 1: Competitor Selector Component**
- Sticky header with competitor chips
- "Compare" mode: Select multiple (checkboxes)
- "Focus" mode: Single deep-dive
- "Market View" mode: All competitors aggregated

### **Pattern 2: Insight Annotations**
- Every gap/opportunity shows: "3 of 6 competitors lack this"
- Hover for list of which competitors
- Click to filter views to just those competitors

### **Pattern 3: Progressive Disclosure**
- Default: High-level market view (all competitors)
- Drill-down: Individual competitor analysis
- Pop-up: Detailed comparison table

### **Pattern 4: Priority Scoring Algorithm**
```
Opportunity Priority Score = 
  (Competitor Gap Weight) × 
  (PCC Capability Score) × 
  (Market Demand Signal) × 
  (Strategic Alignment Factor)

Where:
- Gap Weight = # of competitors failing ÷ total competitors
- Capability Score = 0-10 (do we have resources?)
- Demand Signal = inferred from court bookings, inquiries
- Strategic Alignment = does this serve membership growth goal?
```

---

## Data Sources & Integration Strategy

### **Immediate (Manual Entry)**
From your existing Google Docs research:
1. Facility names, addresses, hours
2. Pricing (membership/drop-in)
3. Amenities checklist
4. Court counts
5. Website URLs

### **Phase 2 (Web Scraping / APIs)**
- CourtReserve public availability
- Google Maps ratings/reviews
- Social media activity (Instagram/Facebook APIs)

### **Phase 3 (Partnerships / Data Purchases)**
- Transit authority APIs (CTA realtime)
- Demographic data (Census/Claritas)
- Credit card transaction data (where legal)

---

## Success Metrics for Sprint 7.5

### **Quantitative:**
1. Time to identify actionable opportunity: <60 seconds
2. Confidence in recommendations: >80% (user survey)
3. Export usage: >50% of sessions
4. Multi-competitor insights discovered: >10 per week

### **Qualitative:**
1. Investor reaction: "This is a real business tool"
2. Management adoption: Used in weekly ops meetings
3. Strategic impact: Drives at least 1 major decision (pricing, hours, programming)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Data Quality:** Competitor data is inaccurate/stale | HIGH | Start with 3 high-confidence competitors; validate manually |
| **Complexity Overload:** Too many views confuse users | MEDIUM | Implement progressive disclosure; default to simplest view |
| **Comparison Paralysis:** More data = harder decisions | MEDIUM | Build opinionated scoring; surface top 3 actions only |
| **Competitive Intel Leakage:** PCC insights visible to competitors | LOW | No public hosting; password-protect; watermark exports |

---

## Next Steps: Your Decision

### **Option A: Full Sprint 7.5 (12-20 hours)**
Execute all phases for comprehensive multi-competitor intelligence

### **Option B: Sprint 7.5A Only (Foundation)**
Get 6 competitors working, defer advanced views to post-demo

### **Option C: Sprint 7.5A + 7.5B (Foundation + Aggregated Views)**
Focus on market gap identification—highest strategic value

### **Option D: Custom Hybrid**
Tell me which phases matter most for your investor demo

### **Option E: Request Detailed Spec**
I'll create a full technical specification document (Google Docs) with wireframes, data models, and implementation steps

---

## Recommended Path (Based on Investor Demo Context)

For maximum impact with limited time, I recommend:

**Sprint 7.5: "MVP Multi-Competitor Intelligence"**
- **Focus:** Foundation (7.5A) + Aggregated Views (7.5B)
- **Time:** 10-14 hours
- **Outcome:** Demo shows PCC finding opportunities across the **entire Chicago market**, not just watching one competitor

**Key Demo Narrative:**
1. Show Market Gap Heatmap: "Here are the 12 time slots where 4+ competitors are unavailable"
2. Show Positioning Matrix: "PCC sits in the sweet spot between premium and budget"
3. Show Enhanced Opportunity Finder: "This week's top opportunity: Thursday AM women's clinics—5 competitors have no offering"
4. Deliver the insight: "By viewing the market systemically, PCC can capture demand that competitors leave unserved"

---

**What's your decision? Reply with a letter (A-E) or tell me your specific needs.**

---

---

## Migration & Testing Strategy

### Migration Approach: Sequential Rollout

**Philosophy:** Add facilities incrementally to catch issues early.

#### **Phase 1: Add Pricing Data (30 min)**
- Update existing 5 facilities with pricing objects
- Test: Verify facilities.json still loads correctly
- Rollback: Remove pricing objects if errors occur

#### **Phase 2: Add Diversey + Popular Times (1 hour)**
- Add Diversey facility to facilities.json
- Create diversey-driving-range.json
- Update main.js to load 3 facilities (pcc, spf, diversey)
- Test: Verify 3 facilities load and render
- Rollback: Remove Diversey from facilityIds array

#### **Phase 3: Add Remaining 3 Competitors (2 hours)**
- Create popular-times files for big-city-pickle, pickle-haus, grant-park
- Update main.js to load all 6 facilities
- Test: Verify 6 facilities load without performance issues
- Rollback: Revert main.js to 3 facilities

#### **Phase 4: Update UI & Calculations (2 hours)**
- Update filter panel for 6 facilities
- Update opportunity calculations
- Update heatmap grid layout
- Test: Verify all UI components work with 6 facilities
- Rollback: Revert specific files that cause issues

---

### Testing Checklist: Sprint 7.5A

**Before Deployment:**

#### Data Integrity
- [ ] facilities.json passes JSON validation
- [ ] All 6 popular-times files exist and validate
- [ ] Pricing data present for all 6 facilities
- [ ] Operating hours cover all 7 days for each facility
- [ ] Coordinates valid (lat/lng within Chicago bounds)

#### Data Loading
- [ ] All 6 facilities load without 404 errors
- [ ] Console shows no JSON parse errors
- [ ] appState.facilities.length === 6
- [ ] Each facility has both metadata and popularTimes
- [ ] Data caching works (second load is instant)

#### UI Components
- [ ] 6 heatmaps render in grid layout
- [ ] Filter panel shows 6 checkboxes
- [ ] Mode selector switches correctly (all/select/focus)
- [ ] Quick filters apply correct facility sets
- [ ] PCC checkbox disabled but checked
- [ ] Tooltips work on all heatmap cells

#### Opportunity Calculations
- [ ] Opportunity scores account for multiple competitors
- [ ] High scores when 2+ competitors busy
- [ ] Market average calculated correctly
- [ ] Opportunity list shows multi-competitor info
- [ ] Gap grid calculates market max across 6 facilities

#### Performance
- [ ] Initial load completes in <3 seconds
- [ ] Filter changes render in <500ms
- [ ] Heatmap rendering <1 second for all 6
- [ ] No memory leaks (run for 5 minutes, check DevTools)
- [ ] Smooth scrolling (60 FPS)

#### Responsive Design
- [ ] Layout works at 1200px viewport
- [ ] Layout works at 1800px viewport
- [ ] Layout works at 2400px viewport
- [ ] Mobile view (tablet minimum) usable
- [ ] No horizontal scrolling on standard resolutions

#### Cross-Browser
- [ ] Chrome (latest): All features work
- [ ] Firefox (latest): All features work
- [ ] Safari (latest): All features work
- [ ] Edge (latest): All features work

---

### Testing Checklist: Sprint 7.5B

#### Market Gap Heatmap
- [ ] Renders 7×24 grid with gap scores
- [ ] Color intensity correct (0=white, 5=red)
- [ ] Tooltips show competitor breakdowns
- [ ] Opportunity borders overlay correctly
- [ ] Click opens analysis panel
- [ ] Renders in <500ms

#### Competitive Matrix
- [ ] All 6 facilities shown as bubbles
- [ ] X-axis (price) and Y-axis (amenities) correct
- [ ] Bubble size reflects court count
- [ ] PCC highlighted in brand blue
- [ ] Quadrant labels visible
- [ ] Interactive hover works
- [ ] Click opens detail view

#### Enhanced Opportunity Finder
- [ ] Uses multi-competitor scoring
- [ ] Shows busy vs. moderate competitors
- [ ] Displays market average
- [ ] Filter by busy competitor count works
- [ ] Higher scores for multi-competitor gaps
- [ ] Estimated customers realistic

#### Integration
- [ ] Tab navigation switches between views
- [ ] Data shared correctly between components
- [ ] Filter changes update all views
- [ ] Export functions work for all views
- [ ] No console errors

---

### Performance Benchmarks

**Target Metrics:**
- Initial load (6 facilities): <3 seconds
- Heatmap render (6 grids): <1 second
- Filter change (re-render): <500ms
- Market Gap Heatmap render: <500ms
- Competitive Matrix render: <300ms
- Opportunity List generation: <200ms

**Memory Usage:**
- Initial: <50MB
- After 5 min interaction: <100MB
- No leaks after 10 filter changes

**Network:**
- 6 facility JSON files: <150KB total
- 6 popular-times files: <300KB total
- Total initial payload: <500KB (acceptable)

---

### Rollback Plan

**If Critical Issues Arise:**

#### Option 1: Rollback to 2 Facilities
```bash
# Revert main.js facilityIds to ['pcc', 'spf']
git checkout HEAD~1 js/main.js

# Keep new code, just don't load new facilities
# Users see original 2-facility view
```

#### Option 2: Disable Specific Component
```javascript
// In main.js, comment out problematic component
// if (container) {
//   appState.marketGapHeatmap = new MarketGapHeatmapComponent(...);
// }
```

#### Option 3: Feature Flag
```javascript
// Add to config.js
const FEATURE_FLAGS = {
  multiCompetitor: false, // Toggle to disable 6-facility mode
  marketGapHeatmap: false,
  competitiveMatrix: false
};

// In main.js
if (FEATURE_FLAGS.multiCompetitor) {
  const facilityIds = [...6 facilities];
} else {
  const facilityIds = ['pcc', 'spf'];
}
```

---

### Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing (see checklists above)
- [ ] Code reviewed
- [ ] JSON files validated
- [ ] Performance benchmarks met
- [ ] Cross-browser testing complete
- [ ] Demo walkthrough successful

**Deployment Steps:**
1. Backup current production files
2. Deploy data files first (facilities.json, popular-times/)
3. Deploy JavaScript files
4. Deploy CSS files
5. Deploy HTML changes
6. Verify in production environment
7. Monitor for errors (first 15 minutes)

**Post-Deployment:**
- [ ] Verify initial load works
- [ ] Verify 6 facilities display
- [ ] Verify filters work
- [ ] Check console for errors
- [ ] Check Network tab for 404s
- [ ] Monitor performance metrics

**If Issues:**
- Execute rollback plan (Option 1 or 2)
- Document issue
- Fix in development
- Re-test and redeploy

---

## Complete File Structure & Task Dependencies

### Files to Create (NEW)

| File Path | Purpose | Estimated Time | Dependencies |
|-----------|---------|----------------|--------------|
| `data/popular-times/diversey-driving-range.json` | Popular times data for Diversey | 30 min | facilities.json updated |
| `data/popular-times/big-city-pickle-west-loop.json` | Popular times data for Big City Pickle | 30 min | facilities.json updated |
| `data/popular-times/pickle-haus.json` | Popular times data for Pickle Haus | 30 min | facilities.json updated |
| `data/popular-times/grant-park.json` | Popular times data for Grant Park | 30 min | facilities.json updated |
| `js/components/market-gap-heatmap.js` | Market Gap Heatmap component (7.5B) | 3 hours | Sprint 7.5A complete |
| `js/components/competitive-matrix.js` | Competitive Positioning Matrix (7.5B) | 2 hours | Sprint 7.5A complete |

---

### Files to Modify (EXISTING)

| File Path | Section/Lines | Changes Required | Estimated Time | Dependencies |
|-----------|---------------|------------------|----------------|--------------|
| **DATA FILES** |
| `data/facilities.json` | Facility objects | Add pricing to all 5 existing, add Diversey facility | 45 min | None |
| **JAVASCRIPT** |
| `js/main.js` | Line 74 | Update facilityIds array to 6 facilities | 5 min | facilities.json updated |
| `js/main.js` | Line 38 | Update visibleFacilities Set to 6 | 5 min | Above change |
| `js/main.js` | `initFilters()` function (line 127+) | Add 6 facility checkboxes, mode selector, quick filters | 60 min | None |
| `js/main.js` | After `renderHeatmaps()` | Add initMarketGapHeatmap() call | 5 min | market-gap-heatmap.js created |
| `js/main.js` | After above | Add initCompetitiveMatrix() call | 5 min | competitive-matrix.js created |
| `js/utils/calculations.js` | `calculateOpportunityScore()` (lines 12-76) | Enhance for multi-competitor scoring | 45 min | None |
| `js/components/opportunity-list.js` | `generateOpportunities()` method | Update to use multi-competitor data | 30 min | calculations.js updated |
| `js/components/opportunity-list.js` | `renderOpportunityCard()` method | Add multi-competitor visualization | 45 min | Above change |
| **HTML** |
| `index.html` | Filter panel section | Add 6 facility checkboxes, mode selector, quick filters | 45 min | CSS updated |
| `index.html` | Tab navigation | Add Market Gap Heatmap tab | 15 min | None |
| `index.html` | Tab navigation | Add Competitive Matrix tab | 15 min | None |
| **CSS** |
| `css/components.css` | End of file | Add mode selector, facility checkbox, quick filter styles | 30 min | None |
| `css/components.css` | End of file | Add market-gap-heatmap styles | 15 min | None |
| `css/dashboards.css` | `.heatmaps-container` | Update grid layout for 6 facilities | 30 min | None |
| `css/dashboards.css` | `.heatmap-cell` | Reduce cell size from 32px to 28px | 5 min | Above change |

---

### Task Dependency Graph

```
Sprint 7.5A Foundation (6-8 hours)
├─ Task 1: Add Pricing Data (30 min)
│  └─ Input: data/facilities.json
│  └─ Output: Updated facilities.json
│
├─ Task 2: Add Diversey Facility (45 min)
│  ├─ Depends on: Task 1
│  └─ Creates: diversey-driving-range.json
│
├─ Task 3: Generate 3 Popular Times Files (90 min)
│  ├─ Depends on: Task 1
│  └─ Creates: big-city-pickle.json, pickle-haus.json, grant-park.json
│
├─ Task 4: Update Data Loader (30 min)
│  ├─ Depends on: Tasks 2 & 3
│  ├─ Modifies: js/main.js (lines 38, 74)
│  └─ Test: 6 facilities load
│
├─ Task 5: Extend Filter UI (60 min)
│  ├─ Depends on: Task 4
│  ├─ Modifies: index.html, css/components.css, js/main.js
│  └─ Test: 6 checkboxes work
│
├─ Task 6: Update Heatmap Layout (45 min)
│  ├─ Depends on: Task 5
│  ├─ Modifies: css/dashboards.css
│  └─ Test: Responsive grid for 6
│
├─ Task 7: Update Opportunity Calculations (60 min)
│  ├─ Depends on: Task 4
│  ├─ Modifies: js/utils/calculations.js, js/components/opportunity-list.js
│  └─ Test: Multi-competitor scoring works
│
└─ Task 8: Test & Validate (60 min)
   ├─ Depends on: All tasks above
   └─ Output: Sprint 7.5A Complete ✅

Sprint 7.5B Aggregated Views (6-8 hours)
├─ Depends on: Sprint 7.5A Complete
│
├─ Component 1: Market Gap Heatmap (3 hours)
│  ├─ Creates: js/components/market-gap-heatmap.js
│  ├─ Modifies: css/components.css, index.html, js/main.js
│  └─ Test: Gap heatmap renders
│
├─ Component 2: Competitive Matrix (2 hours)
│  ├─ Creates: js/components/competitive-matrix.js
│  ├─ Modifies: index.html, js/main.js
│  └─ Test: Scatter plot displays
│
└─ Component 3: Enhanced Opportunity Finder (2 hours)
   ├─ Modifies: js/components/opportunity-list.js (methods)
   ├─ Adds: Multi-competitor display
   └─ Test: Enhanced cards show correctly

Total: Sprint 7.5A + 7.5B = 12-16 hours
```

---

### Time Estimates Summary

| Phase | Task | Time | Running Total |
|-------|------|------|---------------|
| **7.5A** | Add Pricing Data | 30 min | 0.5 hr |
| | Add Diversey Facility | 45 min | 1.25 hr |
| | Generate 3 Popular Times | 90 min | 2.75 hr |
| | Update Data Loader | 30 min | 3.25 hr |
| | Extend Filter UI | 60 min | 4.25 hr |
| | Update Heatmap Layout | 45 min | 5 hr |
| | Update Calculations | 60 min | 6 hr |
| | Test & Validate | 60 min | **7 hr** |
| **7.5B** | Market Gap Heatmap | 180 min | 10 hr |
| | Competitive Matrix | 120 min | 12 hr |
| | Enhanced Opp Finder | 120 min | **14 hr** |
| **Testing** | Integration Testing | 60 min | **15 hr** |
| **Buffer** | Bug fixes, polish | 60 min | **16 hr** |

**Realistic Estimate:** 14-16 hours total for Sprint 7.5A + 7.5B

---

## Sprint 7.5 Implementation Checklist

### Pre-Implementation
- [ ] Read complete specification
- [ ] Understand current codebase architecture
- [ ] Set up development environment
- [ ] Create git branch: `feature/sprint-7.5-multi-competitor`
- [ ] Back up current working state

### Sprint 7.5A Execution
- [ ] ☑️ Task 1: Add pricing data (30 min)
- [ ] ☑️ Task 2: Add Diversey facility (45 min)
- [ ] ☑️ Task 3: Generate 3 popular-times files (90 min)
- [ ] ☑️ Task 4: Update data loader (30 min)
- [ ] ☑️ Task 5: Extend filter UI (60 min)
- [ ] ☑️ Task 6: Update heatmap layout (45 min)
- [ ] ☑️ Task 7: Update opportunity calculations (60 min)
- [ ] ☑️ Task 8: Test & validate (60 min)

### Sprint 7.5B Execution
- [ ] ☑️ Component 1: Market Gap Heatmap (3 hours)
- [ ] ☑️ Component 2: Competitive Matrix (2 hours)
- [ ] ☑️ Component 3: Enhanced Opportunity Finder (2 hours)
- [ ] ☑️ Integration testing (1 hour)

### Post-Implementation
- [ ] Run full test suite
- [ ] Cross-browser testing
- [ ] Performance profiling
- [ ] Code review
- [ ] Update documentation
- [ ] Create pull request
- [ ] Deploy to staging
- [ ] QA validation
- [ ] Deploy to production

---

**End of Enriched Sprint 7.5AB Specification**

---

