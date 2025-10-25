# Customer Intelligence Center (CIC) - Prototype Strategy

**Date**: October 25, 2025
**Status**: 🚧 Prototype Phase Active
**Branch**: `feature/cic-prototype-setup`

---

## Executive Summary

The **Customer Intelligence Center (CIC)** is being developed as an **isolated prototype** at `/prototypes/cic-dashboard/` before integration with the existing PCC Yield Optimizer application.

**Why Prototype First?**
1. **CourtReserve data model is fundamentally different** from existing competitive intelligence architecture
2. **Rapid iteration without risk** of breaking production features
3. **Validate UX with Christy** before committing to full integration
4. **Prove out multi-source confidence scoring** and ICP ranking algorithms

**Timeline**:
- **Phase 1 (Weeks 1-6)**: Build isolated prototype, validate with Christy
- **Phase 2 (Weeks 7-10)**: Integrate validated prototype into main application

---

## The Problem: Why Not Refactor Directly?

### Architectural Incompatibility

| Aspect | Existing Yield Optimizer | CIC Prototype |
|--------|-------------------------|---------------|
| **Data Source** | Google Maps Popular Times (external) | CourtReserve Reports (internal) |
| **Focus** | Competitive intelligence (facilities, market gaps) | Customer intelligence (members, segments, CLV) |
| **Data Model** | Facility-centric (locations, utilization patterns) | Member-centric (individuals, behavioral profiles) |
| **Update Frequency** | Weekly scraping | Weekly CSV imports |
| **Key Entities** | Facilities, time slots, competitors | Members, segments, corporate connectors |

**Integration effort if done now**: 3-4 weeks of careful refactoring + high regression risk
**Integration effort after prototype**: 1-2 weeks (75% lower risk, proven architecture)

---

## Phase 1: Isolated Prototype (Weeks 1-6)

### Directory Structure

```
/prototypes/cic-dashboard/          # Fully isolated from main app
├── index.html                      # Standalone dashboard
├── README.md                       # Prototype setup guide
├── css/                            # Copied from main app, modified freely
├── js/                             # New CIC-specific code
│   ├── components/                 # Segment chart, connector table, etc.
│   └── utils/                      # CLV, ICP scoring, confidence algorithms
├── data/                           # Customer segments JSON, CSV imports
└── scripts/                        # Data processing utilities
```

### Zero Impact on Existing App

**Guarantee**: The existing PCC Yield Optimizer at `/index.html` remains **100% untouched** during prototype development.

**Verification**:
```bash
# No changes to these files during prototype phase:
/index.html
/js/main.js
/js/components/*.js
/css/main.css
```

### Prototype Deliverables (Week 6)

1. **Standalone CIC Dashboard**
   - Accessible at: `file:///...pcc-yield-optimizer/prototypes/cic-dashboard/index.html`
   - Or via HTTP server: `http://localhost:8001` (Python `http.server`)

2. **Core Features**
   - Customer segmentation (4 segments: Corporate, Social, Competitive, Casual)
   - Corporate connector table (ICP-scored, sortable, filterable)
   - Multi-source confidence indicators (5 data sources)
   - Data coverage dashboard (gap analysis)

3. **Data Pipeline**
   - CourtReserve CSV import workflow (manual upload)
   - Google Sheets survey response integration
   - Confidence score recalculation

4. **Validation with Christy**
   - Review 50 VIP member classifications
   - Test corporate connector outreach workflow
   - Validate ICP scoring accuracy
   - Approve UI/UX patterns

---

## Phase 2: Integration (Weeks 7-10)

### Prerequisites

✅ **Prototype validated by Christy** (segmentation, ICP scoring, UI/UX approved)
✅ **All core features working** (no major bugs, confident in architecture)
✅ **Data pipeline proven** (CourtReserve CSV → JSON → dashboard flow works)

### Integration Steps

#### Step 1: Copy Validated Components (1 day)

```bash
# Copy JavaScript components
cp -r prototypes/cic-dashboard/js/components/* js/components/
cp -r prototypes/cic-dashboard/js/utils/calculations.js js/utils/
cp -r prototypes/cic-dashboard/js/utils/confidence-scorer.js js/utils/

# Files to copy:
# - js/components/customer-intelligence.js
# - js/components/segment-chart.js
# - js/components/corporate-connector-table.js
# - js/components/confidence-badge.js
# - js/components/data-coverage-widget.js
# - js/components/segment-grid.js
# - js/utils/calculations.js (CLV, churn risk, ICP scoring)
# - js/utils/confidence-scorer.js
```

#### Step 2: Merge CSS Styles (1 day)

```bash
# Merge CIC styles into main app
cat prototypes/cic-dashboard/css/cic-components.css >> css/customer-intelligence.css
cat prototypes/cic-dashboard/css/confidence-indicators.css >> css/customer-intelligence.css
cat prototypes/cic-dashboard/css/data-coverage.css >> css/customer-intelligence.css

# Link new stylesheet in /index.html:
# <link rel="stylesheet" href="./css/customer-intelligence.css">
```

#### Step 3: Add Navigation Tab (2 hours)

Update `/index.html`:
```html
<!-- Add new tab to main navigation -->
<nav class="main-navigation">
  <button class="nav-tab" data-view="heatmap">🔥 Heatmap</button>
  <button class="nav-tab" data-view="opportunities">🎯 Opportunities</button>
  <button class="nav-tab" data-view="gap-analysis">📊 Gap Analysis</button>
  <button class="nav-tab" data-view="map">🗺️ Map</button>
  <button class="nav-tab" data-view="customer-intel">👥 Customer Intel</button> <!-- NEW -->
</nav>

<!-- Add new view container -->
<div id="customer-intel-view" class="view-container" style="display: none;">
  <!-- CIC dashboard content goes here -->
</div>
```

#### Step 4: Update Data Loader (2-3 days)

Extend `/js/data-loader.js`:
```javascript
// Add CourtReserve CSV import support
export async function loadCourtReserveData(csvFiles) {
  // Parse CSV files
  // Transform to customer-segments.json structure
  // Calculate derived metrics (booking frequency, CLV, etc.)
  // Return normalized data
}

// Add customer segments endpoint
export async function loadCustomerSegments() {
  const response = await fetch('./data/customer-segments.json');
  return await response.json();
}
```

#### Step 5: Initialize CIC Components (1 day)

Update `/js/main.js`:
```javascript
import { CustomerIntelligenceComponent } from './components/customer-intelligence.js';

// Initialize CIC when tab clicked
document.querySelector('[data-view="customer-intel"]').addEventListener('click', () => {
  const cicComponent = new CustomerIntelligenceComponent('#customer-intel-view');
  cicComponent.init();
});
```

#### Step 6: Test Integration (2 days)

**Testing checklist**:
- [ ] All existing features still work (heatmap, opportunities, gap analysis, map)
- [ ] Customer Intel tab loads without errors
- [ ] Segment chart renders correctly
- [ ] Corporate connector table functional (sorting, filtering, export)
- [ ] Confidence badges display accurately
- [ ] Data coverage widget shows correct stats
- [ ] No console errors
- [ ] No visual regressions in existing views

**Total integration effort**: ~6-8 days (1-2 weeks)

---

## Shared Utilities Strategy

### Reusable Components (Copy from Prototype)

**These utilities will be reused**:
- `calculations.js` (CLV, churn risk, ICP scoring)
- `formatters.js` (currency, percentages) - *may already exist in main app*
- `confidence-scorer.js` (multi-source confidence algorithm)
- `csv-parser.js` (CourtReserve CSV parsing)

**Strategy**: If main app already has `formatters.js`, merge CIC-specific formatters into existing file.

### Components (Fully New)

**These components are CIC-specific**:
- `customer-intelligence.js` (main controller)
- `segment-chart.js` (D3 pie chart)
- `corporate-connector-table.js`
- `confidence-badge.js`
- `data-coverage-widget.js`
- `segment-grid.js`

**Strategy**: Copy directly, no conflicts expected.

---

## Risk Mitigation

### Prototype Phase Risks

| Risk | Mitigation | Status |
|------|------------|--------|
| **Survey response rate too low** | Offer $10 credit incentive, personal outreach | ⚠️ Monitor |
| **CourtReserve CSV format changes** | Document expected structure, add validation | ✅ Planned |
| **Confidence scoring too complex** | Start with 2 sources (booking + survey), add more incrementally | ✅ Planned |
| **Christy rejects segmentation** | Use JTBD survey to validate segments first | ✅ Sprint 1.1 |

### Integration Phase Risks

| Risk | Mitigation | Status |
|------|------------|--------|
| **Breaking existing features** | Comprehensive testing checklist, feature branch isolation | ✅ Planned |
| **CSS conflicts** | Namespace CIC styles (`.cic-*` prefix), load in separate file | ✅ Planned |
| **Data loader conflicts** | Add new endpoints, don't modify existing ones | ✅ Planned |
| **Performance degradation** | Lazy-load CIC components (only when tab clicked) | ✅ Planned |

---

## Success Criteria

### Phase 1 (Prototype) Success

✅ **Christy validates segmentation** - All 50 members classified, <5 disputes
✅ **Corporate connector list actionable** - Top 20 list exported, Christy begins outreach
✅ **Confidence scoring trusted** - Christy agrees with high-confidence (85%+) assignments
✅ **No technical blockers** - CourtReserve CSV import works, no showstoppers

### Phase 2 (Integration) Success

✅ **Zero regressions** - All existing features work exactly as before
✅ **Customer Intel tab functional** - All CIC features work in main app
✅ **Performance maintained** - No noticeable slowdown in load times
✅ **Production-ready** - Deployed to Vercel, accessible to Christy

---

## Rollback Plan

### If Prototype Fails (Week 6)

**Criteria for failure**:
- Christy rejects >30% of segment assignments
- CourtReserve data pipeline doesn't work
- Confidence scoring doesn't make sense

**Action**: Pause integration, iterate on prototype until validated. **No impact on existing app.**

### If Integration Causes Regressions (Week 8)

**Criteria for rollback**:
- Existing features broken (heatmap, opportunities, gap analysis)
- Performance degradation >20%
- Critical bugs in production

**Action**:
```bash
# Revert feature branch
git revert feature/cic-integration
git push origin main

# Or delete CIC files if needed
rm -rf js/components/customer-intelligence.js
rm -rf js/components/segment-chart.js
# ...etc
```

**Result**: Main app restored to pre-integration state within 1 hour.

---

## Communication Plan

### Week 6 Review (Prototype Validation)

**Attendees**: Christy, Peter
**Agenda**:
1. Demo prototype: segment chart, corporate connector table, confidence badges
2. Review 50 VIP member classifications (spot-check 10 members)
3. Validate ICP scoring (top 20 list)
4. Decision: Approve for integration OR iterate on prototype

**Deliverables**:
- Recorded demo video (5-10 minutes)
- 50-member classification spreadsheet (Google Sheets)
- Top 20 corporate connector list (CSV export)

### Week 10 Launch (Integration Complete)

**Attendees**: Christy, Peter
**Agenda**:
1. Demo integrated CIC in main app
2. Walkthrough of Customer Intel tab navigation
3. Training: How to upload CourtReserve CSVs weekly
4. Feedback collection (what's missing, what needs improvement)

**Deliverables**:
- Updated user guide (PDF)
- CourtReserve CSV upload instructions (step-by-step)
- Feedback form (Google Form)

---

## Next Steps

### Immediate (Week 0-1)

- [x] Archive obsolete PRD and Functional Spec documents
- [x] Rename `alt_prd.md` → `PRD_CIC_Prototype.md`
- [x] Create new `FUNCTIONAL_SPEC_CIC_Prototype.md`
- [x] Update Technical Spec and EPICS_AND_SPRINTS
- [x] Create `/prototypes/cic-dashboard/` directory structure
- [x] Create `PROTOTYPE_STRATEGY.md` (this document)
- [ ] Commit all changes to `feature/cic-prototype-setup` branch
- [ ] Create PR for review

### Sprint 1.1 (Week 1)

- [ ] Christy designs 10-question JTBD survey (Google Forms)
- [ ] Peter sets up Google Form with response destination (Google Sheets)
- [ ] Christy emails survey to 50 VIP members ($10 credit incentive)
- [ ] Monitor response rate (target: 30+ responses by end of week)

### Sprint 1.2 (Week 2)

- [ ] Export member data from CourtReserve (booking frequency)
- [ ] Merge survey responses with booking data (Google Sheets)
- [ ] Manual segmentation of 50 members (apply decision tree)
- [ ] Create 4 segment profile cards (1-page summaries)

See [EPICS_AND_SPRINTS.md](./docs/PRD/PRD_Customer_Intelligence/EPICS_AND_SPRINTS.md) for detailed sprint plans.

---

**Document Owner**: Peter Giordano
**Last Updated**: October 25, 2025
**Status**: Active prototype strategy, approved for execution
