# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PCC Yield Optimizer is a competitive intelligence and yield management dashboard for Pickleball Clubhouse Chicago (PCC). The goal is to help management maximize membership growth (target: 400 members) and revenue optimization by analyzing competitor facility utilization patterns, geographic data, and customer segments to identify strategic opportunities.

**Tech Stack**: Vanilla JavaScript (ES6+), HTML5, CSS3 with Tailwind, D3.js for visualizations, Leaflet.js for maps, Chart.js/Plotly.js for charts.

**Architecture**: Client-side only application (no backend). All data is stored in static JSON files.

## Project Structure

```
pcc-yield-optimizer/
├── index.html                  # Main entry point (not yet created)
├── FUNCTIONAL_SPEC-orig.md     # Product requirements and features
├── TECH_SPEC-orig.md          # Technical architecture
├── DESIGN_SPEC-orig.md        # UI/UX design system
├── css/                       # Stylesheets (to be created)
├── js/                        # JavaScript modules (to be created)
│   ├── components/            # Reusable UI components
│   ├── dashboards/            # Dashboard-specific logic
│   └── utils/                 # Helper functions
└── data/                      # Static JSON data files
    ├── facilities.json        # Facility metadata and coordinates
    └── popular-times/         # Hourly utilization data per facility
```

## Core Concepts

### Competitive Intelligence Model
The system identifies "opportunities" by comparing PCC's utilization against competitors at each time slot:
- **High Opportunity**: PCC <60% utilized, competitor >80% busy, high segment match
- **Competitive Win**: PCC >80%, competitors <70%
- **Addressable Market**: Customers at competitor facilities who match PCC's target segments

### Key Calculations
1. **Opportunity Score** (0-10): Factors in competitor demand, PCC capacity, segment match, geographic overlap, accessibility
2. **Gap Analysis**: Market max utilization minus PCC utilization
3. **Segment Match**: Cosine similarity between competitor's audience and PCC's target segments
4. **Geographic Overlap**: Percentage of competitor's catchment area overlapping with PCC's

## Data Models

### Facilities (`data/facilities.json`)
- Contains metadata for PCC and all competitor facilities
- Includes: coordinates, operating hours, amenities, transit info, parking, customer segments
- Each facility has an `id` (e.g., "pcc", "spf", "big-city-pickle-west-loop")

### Popular Times (`data/popular-times/`)
- One JSON file per facility (e.g., `pcc.json`, `spf.json`)
- Schema: `weeklyData` array with 7 days, each containing 24 hourly popularity values (0-100)
- Popularity represents utilization percentage

## Development Commands

Since this is a vanilla HTML/CSS/JS project with no build process:

```bash
# Serve locally (use any static file server)
python3 -m http.server 8000
# or
npx serve .
# or
open index.html  # (if using file:// protocol)

# No build, lint, or test commands yet - project is in early stages
```

## Key Features to Implement

### Dashboard 1: Competitive Intelligence Center
- Multi-facility heatmaps (7 days × 24 hours)
- Opportunity overlays (green/yellow/red borders on heatmap cells)
- Interactive tooltips showing competitive analysis
- Click-through to detailed time slot analysis

### Dashboard 2: Opportunity Finder
- Sorted list of high-opportunity time slots
- WHO/WHERE/HOW/WHY analysis panels
- Recommended actions for each opportunity

### Dashboard 3: Gap Analysis Grid
- Numerical comparison showing PCC vs. market maximum utilization
- Revenue opportunity estimates

### Dashboard 4: Geographic Competitive Map
- Interactive Chicago map with facility markers
- Member density heatmap overlays
- Catchment area circles
- CTA transit line overlays

## Design System

**Color Palette**:
- Primary Blue: `#005DAA`
- Primary Red: `#ED1C24`
- Success Green: `#10B981`
- Warning Yellow: `#F59E0B`
- Danger Red: `#EF4444`

**Heatmap Color Scale** (utilization 0-100%):
- 0%: `#FFFFFF` (white)
- 25%: `#FEF3C7` (light yellow)
- 50%: `#FBBF24` (orange)
- 75%: `#F87171` (light red)
- 100%: `#DC2626` (deep red)

**Typography**: System fonts (`-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'`)

**Spacing**: 8px base unit (Tailwind-compatible)

**Accessibility**: WCAG 2.1 AA compliance required

## Important Patterns

### Heatmap Component Structure
- Use D3.js for grid rendering and color mapping
- 7×24 grid per facility
- Apply border overlays for opportunities (not background color changes)
- Tooltip shows: PCC util %, competitor comparisons, opportunity score

### Opportunity Scoring Logic
```javascript
// Only score if PCC has capacity AND competitor is busy
if (yourUtilization > 70 || competitorDemand < 60) return 0;

score = competitorDemand *
        (1 - yourUtilization/100) *
        segmentMatch *
        geoOverlap *
        accessibility;
```

### Data Loading
- Lazy load JSON files as needed
- Cache loaded data to avoid repeated fetches
- All data operations are synchronous (no API calls)

## Performance Targets
- Initial page load: < 2 seconds
- Filter/interaction response: < 200ms
- Heatmap render: < 500ms
- Smooth scrolling/panning: 60 FPS

## References
See the detailed specification files for complete requirements:
- `FUNCTIONAL_SPEC-orig.md`: All features, user stories, acceptance criteria
- `TECH_SPEC-orig.md`: Data schemas, calculations, component specs
- `DESIGN_SPEC-orig.md`: Complete design system, components, interactions
