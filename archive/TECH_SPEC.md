# Technical Specification: PCC Yield Optimizer

**Version**: 1.0  
**Last Updated**: October 6, 2025  
**Author**: Strategic Architecture Team

---

## Executive Summary

The PCC Yield Optimizer is a multi-layered competitive intelligence system that combines facility utilization data, competitive analysis, geographic insights, and customer segmentation to drive strategic decisions for Pickleball Clubhouse Chicago.

**Core Objective**: Enable management to maximize profitable growth (target: 400 members) while maintaining 99th percentile customer satisfaction through data-driven yield optimization.

---

## Architecture Overview

### Design Philosophy
- **Client-side only**: No backend required for demo/prototype
- **Data-driven**: All visualizations powered by JSON data files
- **Modular**: Components can be developed and tested independently
- **Responsive**: Works on desktop (primary) and tablet (secondary)
- **Interactive**: Tableau-level interactivity and polish

### Tech Stack

#### Core Technologies
```
Language: JavaScript (ES6+)
Markup: HTML5
Styling: CSS3 + Tailwind CSS
Build: None (vanilla HTML/CSS/JS for simplicity)
```

#### Visualization Libraries
```
D3.js v7: Custom heatmaps, overlays, advanced charts
Chart.js v4: Line/bar charts, simple visualizations
Plotly.js v2: Interactive charts with hover/zoom
Leaflet.js v1.9: Interactive maps
```

#### Utility Libraries
```
Lodash v4.17: Data manipulation
date-fns v2.30: Date handling
Tippy.js v6: Beautiful tooltips
```

---

## Project Structure

```
pcc-yield-optimizer/
├── index.html                      # Main entry point
├── TECH_SPEC.md                    # This file
├── FUNCTIONAL_SPEC.md              # Feature specifications
├── DESIGN_SPEC.md                  # Design system
├── README.md                       # Project overview
│
├── assets/
│   ├── images/                     # Logos, icons
│   └── fonts/                      # Custom fonts (if needed)
│
├── css/
│   ├── main.css                    # Global styles
│   ├── components.css              # Reusable components
│   ├── dashboards.css              # Dashboard-specific styles
│   └── utilities.css               # Utility classes
│
├── js/
│   ├── main.js                     # App initialization
│   ├── config.js                   # Configuration constants
│   ├── data-loader.js              # Load and parse JSON data
│   │
│   ├── components/
│   │   ├── heatmap.js              # Heatmap visualization
│   │   ├── map.js                  # Geographic map
│   │   ├── charts.js               # Chart components
│   │   ├── filters.js              # Filter controls
│   │   ├── tooltips.js             # Tooltip logic
│   │   └── modals.js               # Modal dialogs
│   │
│   ├── dashboards/
│   │   ├── competitive-intel.js    # Dashboard 1
│   │   ├── opportunity-finder.js   # Dashboard 2
│   │   ├── gap-analysis.js         # Dashboard 3
│   │   └── yield-optimizer.js      # Dashboard 4 (future)
│   │
│   └── utils/
│       ├── calculations.js         # Business logic calculations
│       ├── formatters.js           # Data formatting
│       └── helpers.js              # Generic utilities
│
├── data/
│   ├── facilities.json             # All facility metadata
│   ├── popular-times/              # Popular times data
│   │   ├── pcc.json
│   │   ├── spf.json
│   │   ├── big-city-pickle.json
│   │   └── [other-facilities].json
│   ├── members-mock.json           # Simulated member data
│   └── geo/
│       ├── chicago-boundaries.geojson
│       └── transit-lines.geojson
│
└── docs/
    ├── CHANGELOG.md                # Version history
    └── DEVELOPMENT.md              # Development guide
```

---

## Data Models

### Facility Schema
```json
{
  "id": "pcc",
  "name": "Pickleball Clubhouse Chicago",
  "type": "private",
  "address": {
    "street": "4242 N. Elston Ave",
    "city": "Chicago",
    "state": "IL",
    "zip": "60618"
  },
  "coordinates": {
    "lat": 41.9590,
    "lng": -87.7010
  },
  "rating": 4.9,
  "reviewCount": 72,
  "courts": 7,
  "amenities": ["cafe", "pro_shop", "lounge", "parking"],
  "operatingHours": {
    "monday": { "open": "08:00", "close": "21:00" },
    "tuesday": { "open": "08:00", "close": "21:00" },
    "wednesday": { "open": "08:00", "close": "21:00" },
    "thursday": { "open": "08:00", "close": "21:00" },
    "friday": { "open": "08:00", "close": "21:00" },
    "saturday": { "open": "07:00", "close": "19:00" },
    "sunday": { "open": "07:00", "close": "17:00" }
  },
  "transit": {
    "nearestStation": "Irving Park (Brown Line)",
    "walkTime": 12,
    "busRoutes": ["#80 Irving Park"]
  },
  "parking": {
    "available": true,
    "type": "free_lot",
    "spaces": 45
  },
  "segments": {
    "competitive_players": 0.40,
    "fitness_enthusiasts": 0.30,
    "social_players": 0.20,
    "families": 0.10
  }
}
```

### Popular Times Schema
```json
{
  "facilityId": "pcc",
  "lastUpdated": "2025-10-06T12:00:00Z",
  "weeklyData": [
    {
      "day": "monday",
      "hourly": [
        { "hour": 0, "popularity": 0 },
        { "hour": 1, "popularity": 0 },
        { "hour": 8, "popularity": 45 },
        { "hour": 9, "popularity": 52 },
        { "hour": 18, "popularity": 85 },
        { "hour": 19, "popularity": 95 }
      ]
    }
  ]
}
```

### Member Data Schema (Mock)
```json
{
  "memberId": "M12345",
  "tier": "fanatic",
  "joinDate": "2024-11-15",
  "status": "active",
  "homeAddress": {
    "lat": 41.9650,
    "lng": -87.6850,
    "neighborhood": "Lincoln Park"
  },
  "workAddress": {
    "lat": 41.8781,
    "lng": -87.6298,
    "neighborhood": "Loop"
  },
  "demographics": {
    "ageRange": "35-44",
    "incomeRange": "75k-100k",
    "householdSize": 2
  },
  "behavior": {
    "avgVisitsPerMonth": 18,
    "avgHoursPerVisit": 1.5,
    "preferredDays": ["monday", "wednesday", "thursday"],
    "preferredHours": [18, 19, 20],
    "competitiveLevel": "intermediate"
  },
  "competitorVisits": [
    {
      "facilityId": "spf",
      "frequency": "monthly",
      "reason": "social_events",
      "preferredTimes": ["sunday_morning"]
    }
  ],
  "ltv": 2847,
  "churnRisk": "low",
  "nps": 9
}
```

### Opportunity Score Calculation
```javascript
// Formula for "Addressable Opportunity Score"
const calculateOpportunityScore = (timeSlot) => {
  const competitorDemand = timeSlot.competitorPopularity; // 0-100
  const yourUtilization = timeSlot.pccPopularity; // 0-100
  const segmentMatch = timeSlot.segmentOverlap; // 0-1
  const geoOverlap = timeSlot.geographicOverlap; // 0-1
  const accessibility = timeSlot.accessibilityScore; // 0-1
  
  // Only calculate if you have capacity and competitor is busy
  if (yourUtilization > 70 || competitorDemand < 60) {
    return 0;
  }
  
  const opportunityScore = 
    competitorDemand * 
    (1 - yourUtilization/100) * 
    segmentMatch * 
    geoOverlap * 
    accessibility;
  
  return Math.round(opportunityScore);
};
```

---

## Component Specifications

### 1. Enhanced Heatmap Component

**File**: `js/components/heatmap.js`

**Purpose**: Display facility utilization with competitive intelligence overlays

**Features**:
- Render 7-day × 24-hour grid
- Color scale: 0 (white) → 100 (deep red)
- Border overlays: green (opportunity), yellow (moderate), red (no opportunity), blue (winning)
- Hover tooltips with competitive analysis
- Click to drill into detailed view
- Filter by opportunity level

**Dependencies**: D3.js, Tippy.js

**Key Methods**:
```javascript
HeatmapComponent.init(containerId, data, options)
HeatmapComponent.render()
HeatmapComponent.updateOverlay(overlayType)
HeatmapComponent.highlightOpportunities(threshold)
HeatmapComponent.exportPNG()
```

### 2. Interactive Map Component

**File**: `js/components/map.js`

**Purpose**: Geographic visualization of facilities and member distribution

**Features**:
- Chicago base map (Leaflet + OpenStreetMap tiles)
- Facility markers (color-coded by type)
- Catchment area circles (radius = drive time)
- Member density heatmap overlay
- Transit line overlays (CTA Brown/Red Line)
- Click facility → show details + link to heatmap

**Dependencies**: Leaflet.js, GeoJSON data

**Key Methods**:
```javascript
MapComponent.init(containerId, facilities, members)
MapComponent.addFacilityMarkers()
MapComponent.addMemberDensity()
MapComponent.addTransitLines()
MapComponent.setView(lat, lng, zoom)
MapComponent.filterBySegment(segment)
```

### 3. Comparative Analysis Charts

**File**: `js/components/charts.js`

**Purpose**: Line/bar charts for facility comparisons

**Features**:
- Multi-facility day-of-week comparison (like Image 3)
- Overlay 7 days on single graph
- Legend with facility colors
- Interactive hover for exact values
- Click legend to show/hide facilities

**Dependencies**: Chart.js or Plotly.js

**Key Methods**:
```javascript
ChartComponent.renderDayComparison(data, facilities)
ChartComponent.renderGapAnalysis(data)
ChartComponent.renderRevenueWaterfall(data)
ChartComponent.updateDateRange(startDate, endDate)
```

### 4. Filter Panel Component

**File**: `js/components/filters.js`

**Purpose**: Control visibility and filtering across all views

**Features**:
- Date range selector
- Facility multi-select (checkboxes)
- Day-of-week filter
- Time-of-day range slider
- Opportunity threshold slider
- "Show only high-opportunity slots" toggle
- Clear all filters button

**Key Methods**:
```javascript
FilterPanel.init(containerId, onChange)
FilterPanel.getActiveFilters()
FilterPanel.reset()
FilterPanel.savePreset(name)
```

---

## Business Logic Calculations

### Core Metrics

#### 1. Market Opportunity Score
```javascript
// When PCC is underutilized but market has demand
function calculateMarketOpportunity(timeSlot) {
  const competitorMax = Math.max(...competitors.map(c => c.popularity));
  const pccUtilization = timeSlot.pccPopularity;
  const gap = competitorMax - pccUtilization;
  
  if (gap > 30 && pccUtilization < 60) {
    return {
      score: gap,
      level: gap > 50 ? 'high' : 'medium',
      estimatedCustomers: Math.round(gap * 0.7), // Conservative estimate
      competitors: competitors.filter(c => c.popularity > 70)
    };
  }
  
  return { score: 0, level: 'none' };
}
```

#### 2. Segment Match Score
```javascript
// How well does competitor's audience match PCC's target
function calculateSegmentMatch(competitor, timeSlot) {
  const pccSegments = pcc.segments; // from facilities.json
  const competitorSegments = competitor.segments;
  
  // Calculate overlap using cosine similarity
  const dotProduct = 
    pccSegments.competitive_players * competitorSegments.competitive_players +
    pccSegments.fitness_enthusiasts * competitorSegments.fitness_enthusiasts +
    pccSegments.social_players * competitorSegments.social_players +
    pccSegments.families * competitorSegments.families;
  
  return Math.round(dotProduct * 100); // Convert to percentage
}
```

#### 3. Geographic Overlap Score
```javascript
// What % of competitor's catchment overlaps with PCC's
function calculateGeoOverlap(competitor, memberData) {
  const competitorRadius = 3; // miles
  const pccRadius = 3;
  
  // Count members within both catchments
  const membersInBoth = memberData.filter(m => {
    const distToPcc = calculateDistance(m.homeAddress, pcc.coordinates);
    const distToCompetitor = calculateDistance(m.homeAddress, competitor.coordinates);
    return distToPcc <= pccRadius && distToCompetitor <= competitorRadius;
  }).length;
  
  const totalMembers = memberData.length;
  return membersInBoth / totalMembers;
}
```

#### 4. Accessibility Score
```javascript
// How easily can someone reach PCC vs competitor at this time
function calculateAccessibilityScore(timeSlot, competitor) {
  const dayOfWeek = timeSlot.day;
  const hourOfDay = timeSlot.hour;
  
  let pccScore = 1.0;
  let competitorScore = 1.0;
  
  // Parking advantage (PCC has free lot)
  if (!competitor.parking.available || competitor.parking.type !== 'free_lot') {
    pccScore += 0.15;
  }
  
  // Transit access during commute hours
  if ((hourOfDay >= 7 && hourOfDay <= 9) || (hourOfDay >= 17 && hourOfDay <= 19)) {
    pccScore += (competitor.transit.walkTime - pcc.transit.walkTime) * 0.01;
  }
  
  // Weekend accessibility (PCC on main corridor)
  if (dayOfWeek === 'saturday' || dayOfWeek === 'sunday') {
    pccScore += 0.1; // Elston is easier weekend drive than downtown
  }
  
  return Math.min(pccScore / competitorScore, 1.0);
}
```

---

## API Integrations (Future)

### Google Maps API
**Usage**: Distance Matrix, geocoding, reverse geocoding  
**Endpoints**:
- Distance Matrix: Calculate drive times between addresses
- Geocoding: Convert addresses to lat/lng
- Places: Enrich facility data

**Rate Limits**: 40,000 requests/month (free tier)

### CTA Transit API
**Usage**: Real-time train/bus data, schedule information  
**Endpoints**: https://www.transitchicago.com/developers/  
**Rate Limits**: Unlimited for personal use

---

## Performance Considerations

### Data Loading Strategy
```javascript
// Lazy load data as needed
const dataCache = {};

async function loadData(dataType) {
  if (dataCache[dataType]) {
    return dataCache[dataType];
  }
  
  const response = await fetch(`/data/${dataType}.json`);
  const data = await response.json();
  dataCache[dataType] = data;
  return data;
}
```

### Rendering Optimization
- Use D3 enter/update/exit pattern for efficient DOM updates
- Debounce filter changes (300ms delay)
- Virtualize large datasets (only render visible cells)
- Cache calculated metrics to avoid recomputation

### Target Performance Metrics
- Initial page load: < 2 seconds
- Filter/interaction response: < 100ms
- Heatmap render: < 500ms
- Map interaction: 60 FPS

---

## Browser Support

**Primary Targets**:
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+

**No IE11 support** (using modern ES6+ features)

---

## Development Phases

### Phase 1: Foundation (Sprint 1)
- [ ] Project scaffolding
- [ ] Load sample data
- [ ] Basic heatmap component
- [ ] Multi-facility comparison view
- [ ] Simple filter panel

**Deliverable**: Working prototype showing all facilities side-by-side

### Phase 2: Competitive Intelligence (Sprint 2)
- [ ] Opportunity overlay logic
- [ ] Hover tooltips with competitive data
- [ ] "High opportunity" highlighting
- [ ] Gap analysis grid

**Deliverable**: Interactive opportunity finder

### Phase 3: Geographic Layer (Sprint 3)
- [ ] Map component with facility pins
- [ ] Member density overlay
- [ ] Transit line visualization
- [ ] Click-through from map to heatmap

**Deliverable**: Spatial competitive analysis

### Phase 4: Segment Analysis (Sprint 4)
- [ ] Segment match calculations
- [ ] WHO/WHERE/HOW analysis panel
- [ ] Addressable opportunity scoring
- [ ] Action recommendations

**Deliverable**: Full strategic intelligence system

### Phase 5: Polish (Sprint 5)
- [ ] Tableau-quality styling
- [ ] Smooth animations
- [ ] Export features (PNG, PDF)
- [ ] Mobile responsive tweaks
- [ ] Documentation

**Deliverable**: Investor-ready demo

---

## Testing Strategy

### Manual Testing
- Visual regression testing (screenshot comparison)
- Cross-browser testing (BrowserStack)
- User acceptance testing with stakeholders

### Data Validation
- Verify calculations against spreadsheet
- Test edge cases (empty data, extreme values)
- Validate JSON schema compliance

### Performance Testing
- Lighthouse scores (target: 90+ performance)
- Large dataset stress testing
- Memory leak detection

---

## Deployment

### Demo Deployment
**Option 1: GitHub Pages**
- Push to `gh-pages` branch
- Free, automatic SSL
- URL: `https://petergiordano.github.io/pcc-yield-optimizer`

**Option 2: Netlify**
- Drag-and-drop deploy
- Custom domain support
- Instant rollback

**Option 3: Local Presentation**
- Bundle as standalone HTML (single file)
- No internet required
- Load from USB drive

---

## Security & Privacy

### Data Privacy
- All member data is anonymized/mocked
- No PII in version control
- Geodata rounded to block group level

### Content Security
- No inline scripts (CSP-compliant)
- No eval() or Function() constructors
- Sanitize any user input (if forms added)

---

## Future Enhancements (Post-Demo)

### Real-Time Data Integration
- Live Popular Times API polling
- Webhook alerts for opportunities
- Member check-in system integration

### Machine Learning
- Churn prediction model
- Optimal pricing recommendations
- Segment clustering (unsupervised)

### Mobile App
- Native iOS/Android version
- Push notifications for opportunities
- Manager dashboard on-the-go

### Advanced Analytics
- Cohort analysis
- A/B testing framework
- Revenue forecasting

---

## Success Metrics

### Demo Success Criteria
- ✅ Investors can interact with live dashboard
- ✅ Shows at least 3 "aha!" insights per view
- ✅ Visual quality matches Tableau standards
- ✅ No bugs or crashes during presentation
- ✅ Loads in < 3 seconds on conference room WiFi

### Business Impact Metrics (Post-Implementation)
- Membership growth: 236 → 400
- Revenue per court-hour increase: 15%+
- Member NPS maintained: 92+
- New member acquisition cost: -25%

---

## Questions & Decisions Log

### Open Questions
1. Should we use React for better component reusability? (Decision: No, vanilla JS for simplicity)
2. Mock member data: how many records? (Decision: 250 realistic profiles)
3. Map tiles: OpenStreetMap or Mapbox? (Decision: OSM for free tier)

### Decisions Made
- ✅ Client-side only (no backend)
- ✅ Tailwind CSS for rapid styling
- ✅ D3.js for custom visualizations
- ✅ Leaflet for mapping
- ✅ JSON files for data storage

---

## Contact & Resources

**Project Owner**: Peter Giordano  
**Project Repository**: https://github.com/petergiordano/pcc-yield-optimizer  
**Design Inspiration**: Tableau Public Gallery  
**Documentation**: See `/docs` folder

---

**End of Technical Specification**