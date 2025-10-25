# Customer Intelligence Center (CIC) - Prototype

**Status**: 🚧 Prototype Phase (Week 0 of 6)
**Location**: `/prototypes/cic-dashboard/`
**Source Docs**: [../../../docs/PRD/PRD_Customer_Intelligence/](../../../docs/PRD/PRD_Customer_Intelligence/)

---

## Overview

This is an **isolated prototype** of the Customer Intelligence Center, built to validate:
1. CourtReserve data integration workflow
2. Multi-source customer segmentation
3. ICP-scored corporate connector identification
4. Confidence scoring and data coverage tracking

**Key architectural decision**: This prototype is **fully isolated** from the existing PCC Yield Optimizer to allow rapid iteration without risk of breaking existing features.

---

## Getting Started

### Prerequisites

- Modern web browser (Chrome 90+, Safari 14+, Firefox 88+)
- Python 3.11+ (for data processing scripts)
- CourtReserve CSV exports (weekly reports)

### Setup

1. **Copy CSS from main app** (one-time setup):
   ```bash
   cp ../../css/main.css css/
   ```

2. **Open prototype in browser**:
   ```bash
   # Option 1: Open directly
   open index.html

   # Option 2: Use Python HTTP server
   python3 -m http.server 8001
   # Then visit: http://localhost:8001
   ```

3. **Import sample data** (optional):
   ```bash
   # Convert CourtReserve CSV to JSON
   python3 scripts/csv-to-json.py data/courtreserve-import/sample-sales-summary.csv
   ```

---

## Prototype Goals (Weeks 1-6)

### Week 1-2: Foundation
- [ ] Survey design & deployment (Christy)
- [ ] Manual segmentation of 50 VIP members (Christy + Peter)
- [ ] Corporate connector identification (top 20)
- [ ] Deliverable: Google Sheets with 50 classified members

### Week 3-4: Dashboard UI
- [ ] Segment pie chart (D3.js)
- [ ] Corporate connector table (sortable, filterable)
- [ ] Confidence badges (multi-source validation)
- [ ] Data coverage widget
- [ ] Deliverable: Working UI with static JSON data

### Week 5-6: Data Integration
- [ ] CourtReserve CSV import workflow
- [ ] Dynamic confidence scoring
- [ ] Demographics overlay (Census API)
- [ ] Deliverable: End-to-end prototype ready for Christy's validation

---

## File Structure

```
/prototypes/cic-dashboard/
├── index.html                              # Main dashboard page
├── README.md                               # This file
├── css/
│   ├── main.css                            # Core styles (copied from main app)
│   ├── cic-components.css                  # CIC-specific components
│   ├── confidence-indicators.css           # Multi-source confidence UI
│   └── data-coverage.css                   # Data coverage widget
├── js/
│   ├── config.js                           # Configuration
│   ├── main.js                             # Bootstrap application
│   ├── data-loader.js                      # Data loading & CSV import
│   ├── components/
│   │   ├── customer-intelligence.js        # Main controller
│   │   ├── segment-chart.js                # D3 pie chart
│   │   ├── corporate-connector-table.js    # ICP table
│   │   ├── confidence-badge.js             # Confidence indicator
│   │   ├── data-coverage-widget.js         # Coverage dashboard
│   │   └── segment-grid.js                 # Segment metrics
│   └── utils/
│       ├── calculations.js                 # CLV, churn, ICP scoring
│       ├── formatters.js                   # Currency, percentages
│       ├── csv-parser.js                   # CourtReserve CSV parsing
│       └── confidence-scorer.js            # Multi-source confidence
├── data/
│   ├── customer-segments.json              # 50-member dataset
│   ├── courtreserve-import/                # Sample CSV files
│   │   ├── sample-sales-summary.csv
│   │   ├── sample-utilization.csv
│   │   ├── sample-membership.csv
│   │   └── sample-instructor.csv
│   └── geo/
│       └── demographics.geojson            # Census tract data
└── scripts/
    ├── csv-to-json.py                      # CourtReserve CSV → JSON
    └── generate-demographics.py            # Census data ETL
```

---

## Data Flow

```
CourtReserve Reports (Weekly)
   ↓ (manual CSV export)
   ↓
data/courtreserve-import/*.csv
   ↓ (scripts/csv-to-json.py)
   ↓
data/customer-segments.json
   ↓ (js/data-loader.js)
   ↓
Customer Intelligence Dashboard
   ↓
Christy validates segmentation
```

---

## Integration Strategy (Phase 2)

**After prototype is validated** (Week 7+), we will:
1. Copy validated components to main app: `/prototypes/cic-dashboard/js/components/` → `/js/components/`
2. Merge CSS styles: `/prototypes/cic-dashboard/css/` → `/css/customer-intelligence.css`
3. Add "Customer Intel" tab to main navigation in `/index.html`
4. Update `/js/data-loader.js` to support CourtReserve CSV imports
5. Deploy integrated version to production

See [PROTOTYPE_STRATEGY.md](../../PROTOTYPE_STRATEGY.md) for details.

---

## Key Design Decisions

1. **Vanilla JS + D3** (no React/Vue)
   - Matches existing tech stack
   - Simplifies integration path
   - Lower learning curve

2. **Static JSON First** (not CSV imports yet)
   - Weeks 1-4: Manual Google Sheets → JSON export
   - Weeks 5-6: Add CSV import logic
   - Validates UI/UX before building data pipeline

3. **Multi-Source Confidence Scoring**
   - 5 data sources: Booking (40%), Survey (30%), Social (15%), Demographics (10%), LinkedIn (5%)
   - Real-time recalculation when new sources added
   - Visual indicators: ✓ available, ✗ missing, ⚠ partial

4. **ICP Scoring (Objective 0-30 Points)**
   - Company size: 0-10 pts
   - Job level: 0-10 pts
   - Engagement: 0-5 pts
   - Proximity: 0-5 pts
   - Tiers: Prime (25-30), Strong (20-24), Potential (15-19)

---

## Testing

### Manual Testing Checklist

**Week 3-4** (Static JSON):
- [ ] Segment pie chart renders with correct percentages
- [ ] Clicking pie slice filters corporate connector table
- [ ] Table sorting works on all columns
- [ ] Confidence badges display with correct colors
- [ ] Data coverage widget shows accurate stats

**Week 5-6** (CSV Import):
- [ ] CSV upload workflow validates file structure
- [ ] Import summary shows correct counts
- [ ] Confidence scores recalculate when data added
- [ ] Export CSV contains correct data

### Browser Compatibility

- ✅ Chrome 90+ (primary)
- ✅ Safari 14+ (secondary)
- ✅ Firefox 88+ (secondary)

---

## Known Limitations (Prototype Phase)

1. **No authentication**: Prototype runs locally only
2. **No backend API**: All processing client-side
3. **Manual CSV → JSON conversion**: Automated pipeline in Phase 2
4. **50-member limit**: Focus on VIP members only
5. **Desktop-only**: Responsive design deferred to integration

---

## Support

**Questions?** See:
- [PRD_CIC_Prototype.md](../../../docs/PRD/PRD_Customer_Intelligence/PRD_CIC_Prototype.md) - Product vision
- [FUNCTIONAL_SPEC_CIC_Prototype.md](../../../docs/PRD/PRD_Customer_Intelligence/FUNCTIONAL_SPEC_CIC_Prototype.md) - Feature requirements
- [TECHNICAL_SPEC_Customer_Intelligence.md](../../../docs/PRD/PRD_Customer_Intelligence/TECHNICAL_SPEC_Customer_Intelligence.md) - Architecture
- [DESIGN_SPEC_Customer_Intelligence.md](../../../docs/PRD/PRD_Customer_Intelligence/DESIGN_SPEC_Customer_Intelligence.md) - UI/UX patterns

---

**Last Updated**: October 25, 2025
**Status**: Ready to begin Sprint 1.1 (Survey Design & Deployment)
