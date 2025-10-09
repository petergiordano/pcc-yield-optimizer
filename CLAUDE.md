# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PCC Yield Optimizer is a competitive intelligence and yield management dashboard for Pickleball Clubhouse Chicago (PCC). The goal is to help management maximize membership growth (target: 400 members) and revenue optimization by analyzing competitor facility utilization patterns, geographic data, and customer segments to identify strategic opportunities.

**Tech Stack**: Vanilla JavaScript (ES6+), HTML5, CSS3, Leaflet.js for maps, Plotly.js/Chart.js for charts.

**Architecture**: Client-side only application (no backend). All data is stored in static JSON files in `data/`.

## Development Philosophy: SLC Framework

This project follows the **Simple, Lovable, Complete** framework (see `docs/architecture/SLC-Framework_Simple-Lovable-Complete.md`):

- **Simple**: Focus on core value (competitive intelligence). Ruthlessly prioritize features. Keep UI intuitive.
- **Lovable**: Add delightful touches (smooth animations, helpful tooltips, visual tour). Solve real pain points.
- **Complete**: Each feature fully delivers on its promise. No half-baked releases. Standalone value.

When adding features or making changes, always ask:
1. Is this essential to the core promise?
2. Does it delight users or reduce friction?
3. Is it complete enough to ship without embarrassment?

## Project Structure

```
pcc-yield-optimizer/
├── index.html                  # Main entry point
├── js/
│   ├── main.js                 # Application initialization, view switching
│   ├── config.js               # Configuration constants
│   ├── data-loader.js          # JSON data loading
│   ├── state/
│   │   └── StateManager.js     # Centralized reactive state management (Sprint 10.6)
│   ├── components/             # Reusable UI components
│   │   ├── heatmap.js          # 7x24 facility utilization grids
│   │   ├── opportunity-list.js # Ranked opportunity cards
│   │   ├── gap-analysis-grid.js # 168-hour comparison table
│   │   ├── map.js              # Leaflet geographic map
│   │   ├── analysis-panel.js   # Detailed time slot analysis
│   │   ├── market-gap-heatmap.js # Market-wide gap visualization
│   │   ├── competitive-matrix.js # Price vs amenities scatter plot
│   │   ├── VisualTour.js       # Onboarding tour system
│   │   └── user-guide.js       # Per-dashboard contextual help
│   └── utils/                  # Helper functions
│       ├── calculations.js     # Opportunity scoring, gap analysis
│       ├── formatters.js       # Data formatting (time, currency, %)
│       ├── export.js           # PNG/PDF/Excel export
│       ├── url-state.js        # Shareable URL state management
│       ├── error-handler.js    # Global error handling
│       └── cache.js            # Client-side data caching
├── css/                        # Stylesheets
│   ├── main.css                # Global styles
│   ├── components.css          # Component-specific styles
│   ├── dashboards.css          # Dashboard layouts
│   ├── animations.css          # Transitions and effects
│   ├── loading-states.css      # Skeleton loaders, spinners
│   ├── empty-states.css        # No-data messages
│   ├── error-states.css        # Error display
│   ├── accessibility.css       # WCAG 2.1 AA compliance
│   └── browser-compat.css      # Cross-browser fixes
└── data/
    ├── facilities.json         # Facility metadata (location, amenities, segments)
    ├── popular-times/          # Hourly utilization data (7 days × 24 hours per facility)
    │   ├── pcc.json
    │   ├── spf.json
    │   └── [other-facilities].json
    ├── members-mock.json       # Simulated member data (250 anonymized profiles)
    └── geo/                    # GeoJSON for map overlays
        ├── cta-brown-line.geojson
        ├── cta-red-line.geojson
        └── cta-blue-line.geojson
```

## Architecture Patterns

### Reactive State Management (Sprint 10.6)

**StateManager** (`js/state/StateManager.js`) is the single source of truth for all application data:

- **Observer Pattern**: Components subscribe to state changes and reactively update
- **Centralized Calculations**: Opportunity scores and gap analysis calculated once in StateManager, consumed by all components
- **Filter Synchronization**: Facility filter changes trigger recalculation and notify all subscribers

**Key Methods**:
```javascript
// Getters
window.state.getFacilities()           // All facilities
window.state.getVisibleFacilities()    // Currently filtered facilities
window.state.getOpportunityScores()    // Map<'monday-9', OpportunityData>
window.state.getGapAnalysis()          // Map<'monday-9', GapData>

// Setters (trigger recalculation)
window.state.setVisibleFacilities(['pcc', 'spf', 'grant-park'])

// Observer pattern
window.state.subscribe('filters:changed', (data) => { /* react to change */ })
window.state.subscribe('calculations:complete', (data) => { /* update UI */ })
```

**Component Integration Pattern**:
```javascript
class MyComponent {
  subscribeToStateChanges() {
    window.state.subscribe('filters:changed', this.handleFilterChange.bind(this));
    window.state.subscribe('calculations:complete', this.handleCalculationsComplete.bind(this));
  }

  handleFilterChange(data) {
    // React to filter changes
    this.render();
  }
}
```

### Data Models

**Facilities** (`data/facilities.json`):
- Each facility has: `id`, `name`, `type` (private/public), `coordinates`, `courts`, `amenities`, `segments` (customer breakdown)
- PCC is always `id: "pcc"`

**Popular Times** (`data/popular-times/{facilityId}.json`):
- Schema: `weeklyData` array (7 days), each with `hourly` array (24 hours)
- Each hour: `{ hour: 0-23, popularity: 0-100 }` (0 = empty, 100 = at capacity)

**Opportunity Score Calculation** (`js/utils/calculations.js`):
```javascript
// Only score if PCC has capacity AND competitor is busy
if (pccUtilization > 70 || maxCompetitorDemand < 60) return 0;

score = competitorDemand *
        (1 - pccUtilization/100) *
        segmentMatch *
        geoOverlap *
        accessibility;
```

**Key Metrics**:
- **Opportunity Score** (0-10): How attractive is this time slot?
- **Gap** (percentage points): Market max utilization - PCC utilization
- **Estimated Revenue**: `(gap / 100) × 7 courts × hourly_rate` (prime time $20/hr, off-peak $15/hr)
- **Busy Competitor Count**: Number of competitors >70% utilized

### Component Lifecycle

All components follow this pattern:

1. **Constructor**: Initialize with container ID and data references
2. **init()** or **render()**: Build DOM, fetch data if needed, set up event listeners
3. **subscribeToStateChanges()**: Register with StateManager for reactive updates
4. **handleFilterChange()** / **handleCalculationsComplete()**: React to state changes
5. **cleanup()** (if applicable): Destroy tooltips, remove listeners

**Example**:
```javascript
// In main.js
opportunityList = new OpportunityListComponent('opportunity-list');
opportunityList.subscribeToStateChanges(); // Subscribe to StateManager
opportunityList.render('score', { minScore: 3, level: 'all' });
```

### Filter System

**Filter State Flow**:
1. User clicks checkbox in sidebar
2. `updateVisibleFacilities()` in `main.js` reads all checked boxes
3. Calls `window.state.setVisibleFacilities(visibleIds)`
4. StateManager recalculates opportunities and gaps
5. StateManager notifies all subscribers via `filters:changed` event
6. Components react by calling `render()` with fresh data from StateManager

**Important**: PCC is always visible (checkbox disabled). Only competitors can be toggled.

### Dashboard Views

Six main views, switched via tabs:

1. **Heatmap View**: Side-by-side 7×24 grids for all facilities with opportunity borders
2. **Opportunity List**: Ranked cards with WHO/WHERE/HOW/WHY analysis
3. **Gap Analysis**: 168-row table with PCC vs market max comparison
4. **Geographic Map**: Leaflet map with catchment areas, member density, CTA transit
5. **Market Gaps**: Heatmap showing when competitors are closed/at capacity
6. **Competitive Matrix**: Plotly scatter plot of price vs amenities

View switching handled in `setupViewSwitching()` in `main.js`.

## Development Commands

This is a vanilla HTML/CSS/JS project with no build process:

```bash
# Serve locally (use any static file server)
python3 -m http.server 8000
# or
npx serve .
# or
open index.html

# No build, lint, or test commands - project is in early stages
```

## Common Tasks

### Adding a New Competitor Facility

1. Add entry to `data/facilities.json` with all required fields
2. Create `data/popular-times/{new-facility-id}.json` with weekly utilization data
3. Add checkbox to sidebar in `index.html`:
   ```html
   <label class="facility-checkbox">
     <input type="checkbox" id="filter-new-facility-id" checked>
     <span class="facility-name">New Facility</span>
     <span class="facility-type">Private</span>
   </label>
   ```
4. Add facility ID to `CONFIG.facilityIds` in `js/config.js`

### Modifying Opportunity Scoring Logic

Edit `calculateOpportunityScore()` in `js/utils/calculations.js`. StateManager will automatically recalculate on next filter change or page load.

### Adding a New Dashboard View

1. Create component file in `js/components/`
2. Add HTML section in `index.html` with class `dashboard-view` and style `display: none`
3. Add tab button with `data-view="your-view-name"`
4. Initialize component in `initComponents()` in `main.js`
5. Subscribe to StateManager: `component.subscribeToStateChanges()`

## Key Features

### Heatmap Overlays
- **Green border (3px, glow)**: High opportunity (gap >30%, score >7)
- **Yellow border (2px)**: Medium opportunity (gap >20%, score >5)
- **Red border (2px)**: Low opportunity (gap >10%, score >3)
- **Blue border (3px, glow)**: Competitive win (PCC >80%, competitors <70%)
- **Corner badge**: Busy competitor count (green/yellow/red)

### Tooltips
- All tooltips use **Tippy.js**
- Global cleanup: `window.destroyAllTooltips()` before re-rendering
- Instances tracked in `window.tippyInstances` array
- Components return instances via `getTippyInstances()`

### Export Features
- **PNG**: Heatmap screenshot (`html2canvas`)
- **CSV**: Opportunity list (`export.js`)
- **Excel**: Gap analysis grid (`SheetJS`)
- **PDF**: Opportunity report (`jsPDF`)

## Design System

**Colors**:
- Primary Blue: `#005DAA` (PCC brand)
- Primary Red: `#ED1C24`
- Success Green: `#10B981`
- Warning Yellow: `#F59E0B`
- Danger Red: `#EF4444`

**Heatmap Scale** (utilization 0-100%):
- 0%: `#FFFFFF` → 100%: `#DC2626` (white to deep red)

**Typography**: System fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'`)

**Spacing**: 8px base unit (use CSS variables: `var(--space-sm)`, `var(--space-md)`, etc.)

## Performance Targets

- Initial page load: < 2 seconds
- Filter/interaction response: < 200ms
- Heatmap render: < 500ms
- Map interaction: 60 FPS

**Optimization Strategies**:
- Lazy load popular times data (already implemented in StateManager)
- Debounce filter changes (300ms)
- Cache calculations in StateManager (avoid re-computing on every component render)
- Destroy/recreate tooltips carefully to avoid memory leaks

## Accessibility

- WCAG 2.1 AA compliance required
- Full keyboard navigation (`js/utils/keyboard-navigation.js`)
- ARIA live regions for screen reader announcements (`#aria-live-polite`, `#aria-live-assertive`)
- Skip link for keyboard users
- All interactive elements have `aria-label` attributes

## References

See detailed specifications:
- `TECH_SPEC.md`: Complete technical architecture, data schemas, component specs
- `FUNCTIONAL_SPEC.md`: All features, user stories, acceptance criteria
- `DESIGN_SPEC.md`: Complete design system, components, interactions
- `SPRINT_ROADMAP.md`: Development progress and remaining work
- `archive/SPRINT_10.6_Reactive_State_Management-completed.md`: StateManager implementation details
- `docs/architecture/SLC-Framework_Simple-Lovable-Complete.md`: Development philosophy
