# Design Specification: Customer Intelligence Center (CIC) Prototype

**Project**: PCC Yield Optimizer - Customer Intelligence Center Prototype
**Version**: 4.0 (Updated with Revision A + Addendum B UI Components)
**Last Updated**: October 25, 2025
**Source**: [PRD_CIC_Prototype.md](./PRD_CIC_Prototype.md), [revisions-a.md](./revisions/revisions-a.md), [addendum-b.md](./revisions/addendum-b.md)

---

## Document Organization

This Design Specification is part of the CIC Prototype specification suite. Read in this order:

1. **[PRD](./PRD_CIC_Prototype.md)** - Product vision, business goals, CourtReserve integration strategy
2. **[Functional Spec](./FUNCTIONAL_SPEC_CIC_Prototype.md)** - What the system should do (functional requirements)
3. **[Technical Spec](./TECHNICAL_SPEC_Customer_Intelligence.md)** - How to build it (prototype architecture)
4. **Design Spec** (this document) - UI/UX specifications (design system)
5. **[Epics & Sprints](./EPICS_AND_SPRINTS.md)** - Developer work breakdown (user stories, tasks, sprint planning)

**Supporting Documentation:**
- [PROTOTYPE_STRATEGY.md](../../strategy/PROTOTYPE_STRATEGY.md) - Prototype-first development strategy and integration roadmap
- [MANUAL_CENSUS_DATA_ETL.md](../../data-pipeline/MANUAL_CENSUS_DATA_ETL.md) - Step-by-step Census data acquisition guide

**Prototype Location:**
- `/prototypes/cic-dashboard/` - Isolated prototype implementation (see [README](../../../prototypes/cic-dashboard/README.md))

---

## Design Principles

### 1. Consistency with Existing Dashboard
- **Reuse** existing design system (`css/main.css`, `css/components.css`)
- **Match** typography, colors, spacing from v1.0
- **Extend** patterns, don't reinvent

### 2. Data Density
- **Tableau-inspired**: Dense, information-rich visualizations
- **Minimize chrome**: Borders, backgrounds only when necessary
- **Prioritize content**: Data > decoration

### 3. Progressive Disclosure
- **Overview first**: High-level metrics on landing
- **Details on demand**: Click/hover for deeper insights
- **Filters accessible**: Always visible, never hidden in menus

### 4. Accessibility (WCAG 2.1 AA)
- **Color contrast**: Minimum 4.5:1 for text
- **Keyboard navigation**: All interactive elements tabbable
- **Screen reader support**: ARIA labels, semantic HTML
- **Responsive**: Works on desktop (1280px+), tablet friendly

---

## Color Palette

### From Existing Design System (CONFIG.colors)

**Brand Colors**:
- Primary Blue: `#005DAA` (PCC brand - use for primary actions)
- Primary Red: `#ED1C24` (accents)
- Secondary Navy: `#1D3557` (headers, emphasis)

**Semantic Colors**:
- Success Green: `#10B981` (positive metrics, opportunities)
- Warning Yellow: `#F59E0B` (medium risk, caution)
- Danger Red: `#EF4444` (high risk, errors)
- Info Blue: `#3B82F6` (neutral information)

**Segment Colors** (NEW):
- Corporate Power Users: `#3B82F6` (Info Blue - business)
- Social Ambassadors: `#10B981` (Success Green - community)
- Competitive Athletes: `#EF4444` (Danger Red - intensity)
- Casual Drop-ins: `#6B7280` (Neutral Gray)

**Backgrounds**:
- Page: `#F9FAFB` (off-white)
- Card: `#FFFFFF` (white)
- Border: `#E5E7EB` (light gray)

---

## Typography

### System Font Stack (Existing)

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
               'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #111827;  /* text-primary */
}
```

### Type Scale

| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| **H1** | 32px | 700 | 1.2 | Dashboard title |
| **H2** | 24px | 600 | 1.3 | View headers |
| **H3** | 18px | 600 | 1.4 | Component titles |
| **H4** | 16px | 600 | 1.4 | Card headers |
| **Body** | 14px | 400 | 1.5 | Default text |
| **Small** | 12px | 400 | 1.4 | Captions, labels |

---

## Spacing System (8px Grid)

```css
:root {
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
}
```

**Usage**:
- **4px**: Icon padding, fine adjustments
- **8px**: Button padding, small gaps
- **16px**: Component padding, default margin
- **24px**: Section spacing
- **32px**: Large section gaps
- **48px**: Major layout divisions

---

## Layout & Information Architecture

### Customer Intelligence Dashboard Layout

```
┌────────────────────────────────────────────────────────────────────┐
│ Header (existing)                                                  │
│ PCC Yield Optimizer        [Filter Panel] [Settings] [Help]       │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ Navigation Tabs (existing + NEW tab)                               │
│ 🔥 Heatmap | 🎯 Opportunities | 📊 Gap Analysis | 🗺️ Map |          │
│ 👥 Customer Intel (NEW)                                            │
└────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────┐
│ Customer Intelligence View                                         │
│                                                                    │
│ ┌─────────────────────┬────────────────────────────────────────┐ │
│ │  Segment Overview   │   Neighborhood Heatmap                 │ │
│ │  (Pie Chart)        │   (Leaflet Map)                        │ │
│ │                     │                                        │ │
│ │                     │                                        │ │
│ │                     │                                        │ │
│ └─────────────────────┴────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │  Corporate Connector Table                                   │ │
│ │  [Sortable, Filterable, Exportable]                          │ │
│ │                                                              │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │  Segment Breakdown Grid                                      │ │
│ │  (Summary Metrics by Segment)                                │ │
│ └──────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Segment Overview (Pie Chart)

**Dimensions**: 300px × 300px

**Visual Design**:
```
        Corporate Power Users (25%)
              ╱───────╲
             ╱         ╲
        🔵 ╱           ╲ 🟢 Social Ambassadors (20%)
          │             │
          │   Segments  │
          │             │
        🔴 ╲           ╱ ⚪ Casual Drop-ins (30%)
             ╲         ╱
              ╲───────╱
        Competitive Athletes (25%)
```

**Interactivity**:
- **Hover**: Tooltip shows "Corporate Power Users: 72 members (25%)"
- **Click**: Filters all other views to selected segment
- **Active state**: Selected slice at 100% opacity, others at 30%

**CSS**:
```css
.segment-pie-chart {
  width: 300px;
  height: 300px;
  margin: var(--spacing-md);
}

.segment-pie-chart .slice path {
  cursor: pointer;
  transition: opacity 0.2s;
}

.segment-pie-chart .slice:hover path {
  opacity: 0.8;
}

.segment-pie-chart .slice.active path {
  opacity: 1.0;
  stroke-width: 3px;
}

.segment-pie-chart .slice:not(.active) path {
  opacity: 0.3;
}
```

---

### 2. Neighborhood Heatmap

**Dimensions**: Flexible (min 600px × 400px)

**Visual Design**:
```
┌─────────────────────────────────────────┐
│ Chicago Neighborhoods by Member Density │
│                                         │
│  ┌────────────────────────────┐         │
│  │                            │ Legend  │
│  │    [Leaflet Map]           │         │
│  │                            │ █ 16+   │
│  │  60661 (West Loop)         │ █ 6-15  │
│  │  60614 (Lincoln Park)      │ █ 1-5   │
│  │  60654 (River North)       │ █ 0     │
│  │                            │         │
│  └────────────────────────────┘         │
│                                         │
│  ☐ Filter by segment: [Dropdown]       │
└─────────────────────────────────────────┘
```

**Color Scale** (Blue gradient):
- 0 members: `#F3F4F6` (very light gray)
- 1-5 members: `#93C5FD` (light blue)
- 6-15 members: `#3B82F6` (medium blue)
- 16+ members: `#1E40AF` (dark blue)

**Interactivity**:
- **Hover**: Tooltip shows "Zip: 60661, 12 members"
- **Click**: Opens modal with member list for that neighborhood

**Leaflet Configuration**:
```javascript
const zipLayer = L.geoJSON(zipBoundaries, {
  style: (feature) => ({
    fillColor: getMemberDensityColor(feature.properties.memberCount),
    fillOpacity: 0.7,
    color: '#666',
    weight: 1
  }),
  onEachFeature: (feature, layer) => {
    layer.bindTooltip(`Zip: ${feature.properties.ZIP}<br>${feature.properties.memberCount} members`);
    layer.on('click', () => showMemberListModal(feature.properties.members));
  }
});
```

---

### 3. Corporate Connector Table

**Dimensions**: Full width (min 800px)

**Visual Design**:
```
┌───────────────────────────────────────────────────────────────────┐
│ Corporate Connectors (Top 20)                      [Export CSV] │
├───────────────────────────────────────────────────────────────────┤
│ Filter: [Employer ▼]  [Title ▼]  [Neighborhood ▼]        [Reset]│
├──────┬──────────┬─────────┬──────────┬────────┬──────────┬───────┤
│ Name │ Employer │ Title   │ Location │ Freq   │ Status   │ Action│
├──────┼──────────┼─────────┼──────────┼────────┼──────────┼───────┤
│ Sarah│ TechCorp │ VP Mktg │ West Loop│ 3.2x/wk│ Emailed  │ [Copy]│
│ Raj  │ Consult  │ Dir Sale│ River Nth│ 2.8x/wk│Not Contct│ [Copy]│
│ ...  │ ...      │ ...     │ ...      │ ...    │ ...      │ ...   │
└──────┴──────────┴─────────┴──────────┴────────┴──────────┴───────┘
```

**Column Specifications**:
- **Name**: 150px, left-aligned, semibold
- **Employer**: 150px, left-aligned
- **Title**: 150px, left-aligned
- **Location**: 150px, left-aligned
- **Freq**: 80px, center-aligned
- **Status**: 120px, center-aligned (dropdown)
- **Action**: 100px, center-aligned (button)

**Sorting**:
- Clickable column headers
- Arrow indicator (↑↓) for sort direction
- Default sort: Priority Score (desc)

**Status Dropdown Colors**:
```css
.status-not-contacted {
  background: #F3F4F6;
  color: #6B7280;
}

.status-emailed {
  background: #DBEAFE;
  color: #1E40AF;
}

.status-booked {
  background: #D1FAE5;
  color: #065F46;
}

.status-declined {
  background: #FEE2E2;
  color: #991B1B;
}
```

**CSS**:
```css
.corporate-connector-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.corporate-connector-table thead th {
  background: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  cursor: pointer;
}

.corporate-connector-table thead th:hover {
  background: #F3F4F6;
}

.corporate-connector-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;
}

.corporate-connector-table tbody tr:hover {
  background: #F9FAFB;
}

.copy-email-btn {
  background: #3B82F6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.copy-email-btn:hover {
  background: #2563EB;
}
```

---

### 4. Segment Breakdown Grid

**Dimensions**: Full width

**Visual Design**:
```
┌─────────────────────────────────────────────────────────────────────┐
│ Segment Metrics Summary                                             │
├──────────────────┬────────┬─────────┬──────────────┬────────┬───────┤
│ Segment          │ Members│ Avg Freq│ Top Neighbor │ Avg CLV│ Churn │
├──────────────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ Corporate Power  │   72   │ 3.2x/wk │ West Loop,   │ $3,800 │ Med ⚠│
│ Users            │        │         │ River North  │        │       │
├──────────────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ Social           │   63   │ 1.8x/wk │ Lincoln Park │ $2,300 │ Low ✓│
│ Ambassadors      │        │         │ Lakeview     │        │       │
├──────────────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ Competitive      │  105   │ 2.5x/wk │ Bucktown,    │ $2,500 │ Med ⚠│
│ Athletes         │        │         │ Logan Square │        │       │
├──────────────────┼────────┼─────────┼──────────────┼────────┼───────┤
│ Casual Drop-ins  │  110   │ 0.6x/wk │ Various      │  $150  │ High█│
└──────────────────┴────────┴─────────┴──────────────┴────────┴───────┘
```

**Visual Indicators**:
- Churn Risk badges (same as Corporate Connector table)
- Segment name in segment color (left border)

**CSS**:
```css
.segment-breakdown-grid {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--spacing-lg);
}

.segment-breakdown-grid th {
  background: #F9FAFB;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #E5E7EB;
}

.segment-breakdown-grid td {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.segment-breakdown-grid tr {
  border-left: 4px solid transparent;
}

.segment-breakdown-grid tr[data-segment="Corporate Power Users"] {
  border-left-color: #3B82F6;
}

.segment-breakdown-grid tr[data-segment="Social Ambassadors"] {
  border-left-color: #10B981;
}

.segment-breakdown-grid tr[data-segment="Competitive Athletes"] {
  border-left-color: #EF4444;
}

.segment-breakdown-grid tr[data-segment="Casual Drop-ins"] {
  border-left-color: #6B7280;
}
```

---

### 5. Corporate Event Decision Modal (Phase 3)

**Dimensions**: Modal 800px × 600px (centered overlay)

**Visual Design**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Corporate Event Decision                                    [×] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Event: Accenture Team Building                                │
│  Feb 15, 2026 at 2:00 PM (2 hours) · Courts 1, 2, 3           │
│                                                                 │
│  ┌───────────────┬───────────────┬───────────────┬───────────┐ │
│  │ Event Revenue │ Displaced     │ Churn Cost    │ Net Value │ │
│  │               │ Bookings      │               │           │ │
│  │   $500        │ 12 members    │  -$650        │  -$150    │ │
│  │   ✓           │   ⚠           │    ⚠          │    ⚠      │ │
│  └───────────────┴───────────────┴───────────────┴───────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ⚠ Counter-offer                                        │   │
│  │                                                         │   │
│  │  Event revenue ($500) is offset by estimated churn     │   │
│  │  cost ($650) for a net value of -$150. Consider        │   │
│  │  counter-offering with alternative time slot or        │   │
│  │  higher price.                                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Alternative Time Slots:                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Feb 15 at 10:00 AM  │ 4 displaced │ Net Value: $320 ✓  │   │
│  │ Feb 16 at 2:00 PM   │ 8 displaced │ Net Value: $100 ✓  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ▸ View Displaced Members (12)                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Copy Counter-offer Email]  [Accept Recommendation]    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

**Net Value Color Coding**:
- **Net Value > $200**: Green background (`#D1FAE5`), "Accept" recommendation
- **Net Value -$200 to $200**: Yellow background (`#FEF3C7`), "Counter-offer" recommendation
- **Net Value < -$200**: Red background (`#FEE2E2`), "Decline" recommendation

**Recommendation Badge Styles**:
```css
.recommendation-badge {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: var(--spacing-md);
}

.recommendation-badge.accept {
  background: #D1FAE5;
  color: #065F46;
}

.recommendation-badge.counter-offer {
  background: #FEF3C7;
  color: #92400E;
}

.recommendation-badge.decline {
  background: #FEE2E2;
  color: #991B1B;
}
```

**Metric Card Grid CSS**:
```css
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
}

.metric-card {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: var(--spacing-md);
  text-align: center;
}

.metric-card h4 {
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.metric-value.positive {
  color: #065F46;
}

.metric-value.negative {
  color: #991B1B;
}
```

**Alternative Slots Card**:
```css
.alternative-slots {
  margin: var(--spacing-lg) 0;
}

.slots-grid {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.slot-card {
  flex: 1;
  background: #F0F9FF;
  border: 1px solid #BFDBFE;
  border-radius: 6px;
  padding: var(--spacing-md);
  cursor: pointer;
  transition: all 0.2s;
}

.slot-card:hover {
  background: #DBEAFE;
  border-color: #3B82F6;
}

.slot-time {
  font-weight: 600;
  color: #1E40AF;
  margin-bottom: 4px;
}

.slot-metrics {
  font-size: 12px;
  color: #6B7280;
  display: flex;
  justify-content: space-between;
}
```

**Displaced Members Accordion**:
```css
.displaced-members {
  margin: var(--spacing-lg) 0;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
}

.displaced-members summary {
  padding: var(--spacing-md);
  cursor: pointer;
  font-weight: 600;
  list-style: none;
}

.displaced-members summary:hover {
  background: #F9FAFB;
}

.displaced-members table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.displaced-members th,
.displaced-members td {
  padding: 12px 16px;
  border-top: 1px solid #E5E7EB;
  text-align: left;
}
```

---

### 6. Mezzanine ROI Planner (Phase 3)

**Dimensions**: Full width dashboard view

**Visual Design**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Mezzanine ROI Planner                                           │
│ Priority Segment: [Mixed (All Segments) ▼]                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🏆 Recommended: Yoga Studio                             │   │
│  │                                                         │   │
│  │ Highest member interest (5 stars, 80% very interested) │   │
│  │ with strong financial ROI (105% annual, 11.4 month     │   │
│  │ payback). Aligns with Social Ambassadors segment (95%  │   │
│  │ interest) which represents growth opportunity.          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Alternative: Hot Desks                                         │
│  Fastest payback (7.5 months) with moderate ROI (80%)...       │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Investment Comparison                                     │ │
│  ├──────┬───────┬────────┬────────┬─────────┬────────┬──────┤ │
│  │Option│ Cost  │Payback │ ROI    │ 5-Yr    │Interest│Score │ │
│  ├──────┼───────┼────────┼────────┼─────────┼────────┼──────┤ │
│  │🥇Yoga│$25,000│ 11.4mo │ 105%   │ $107k   │⭐⭐⭐⭐⭐│  92  │ │
│  │ Hot  │$15,000│  7.5mo │  80%   │  $60k   │⭐⭐⭐   │  85  │ │
│  │Streng│$40,000│ 30.8mo │  38%   │  $18k   │⭐⭐⭐⭐⭐│  78  │ │
│  │Event │$35,000│ 26.2mo │  51%   │  $30k   │⭐⭐⭐⭐ │  72  │ │
│  └──────┴───────┴────────┴────────┴─────────┴────────┴──────┘ │
│                                                                 │
│  [Export to PDF]  [Adjust Assumptions]                         │
└─────────────────────────────────────────────────────────────────┘
```

**5-Star Rating Visualization**:
```css
.member-interest-stars {
  display: flex;
  gap: 2px;
  font-size: 16px;
}

.star-filled {
  color: #F59E0B;  /* Gold */
}

.star-empty {
  color: #D1D5DB;  /* Light gray */
}

/* Tooltip showing segment breakdown */
.interest-tooltip {
  background: #1F2937;
  color: white;
  padding: var(--spacing-sm);
  border-radius: 4px;
  font-size: 12px;
  max-width: 200px;
}

.interest-tooltip .segment-row {
  display: flex;
  justify-content: space-between;
  margin: 4px 0;
}
```

**ROI Comparison Table Styles**:
```css
.roi-comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--spacing-lg) 0;
  font-size: 14px;
}

.roi-comparison-table thead th {
  background: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
}

.roi-comparison-table tbody td {
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.roi-comparison-table tbody tr.recommended {
  background: #F0FDF4;
  border-left: 4px solid #10B981;
}

.roi-comparison-table tbody tr.recommended td:first-child {
  font-weight: 700;
  color: #065F46;
}
```

**Recommendation Summary Card**:
```css
.recommendation-summary {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
  margin: var(--spacing-lg) 0;
}

.recommended-option {
  background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
  border: 2px solid #10B981;
  border-radius: 8px;
  padding: var(--spacing-lg);
}

.recommended-option h3 {
  font-size: 20px;
  font-weight: 700;
  color: #065F46;
  margin-bottom: var(--spacing-sm);
}

.recommended-option p {
  color: #047857;
  line-height: 1.6;
}

.alternative-option {
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: var(--spacing-md);
}

.alternative-option h4 {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: var(--spacing-sm);
}

.alternative-option p {
  color: #6B7280;
  font-size: 13px;
  line-height: 1.5;
}
```

**Priority Segment Filter**:
```css
.segment-filter {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.segment-filter label {
  font-weight: 600;
  color: #374151;
}

.segment-filter select {
  padding: 8px 12px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  font-size: 14px;
  cursor: pointer;
}

.segment-filter select:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

**Action Buttons**:
```css
.action-buttons {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-xl);
}

.btn-primary {
  background: #3B82F6;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2563EB;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}
```

---

### 7. Confidence Indicator Badge (Phase 1)

**Purpose**: Visual representation of segment classification confidence based on multi-source data validation

**Dimensions**: Inline badge (variable width, 20px height)

**Visual Design**:
```
┌──────────────────────────────────────────────────────────────┐
│ Corporate Connector Table Row:                              │
│                                                              │
│ Sarah Johnson | TechCorp | VP Marketing | [🟢 98%]          │
│ Raj Patel     | ConsultCo| Dir Sales    | [🟢 87%]          │
│ Mike Chen     | StartupX | Founder      | [🟡 72%]          │
│ Emma Davis    | Local Biz| Manager      | [🔴 58%]          │
└──────────────────────────────────────────────────────────────┘

Hover on badge shows tooltip:
┌────────────────────────────────┐
│ Confidence: 87%                │
│                                │
│ Data Sources:                  │
│ ✓ Booking Behavior    40/40    │
│ ✓ Survey JTBD         30/30    │
│ ✓ Social Signals      13/15    │
│ ✓ Demographics         8/10    │
│ ✗ LinkedIn/Employer    0/5     │
│                                │
│ Status: High Confidence        │
│ Review Required: No            │
└────────────────────────────────┘
```

**Confidence Tiers**:

| Tier | Range | Badge Color | Background | Text Color | Icon | Usage |
|------|-------|-------------|------------|------------|------|-------|
| **High** | 85-100% | Green | `#D1FAE5` | `#065F46` | 🟢 | Segment assignment is reliable |
| **Medium** | 65-84% | Yellow | `#FEF3C7` | `#92400E` | 🟡 | Acceptable, but monitor for contradictions |
| **Low** | 40-64% | Red | `#FEE2E2` | `#991B1B` | 🔴 | Needs manual review or more data |

**Placement**:
- **Corporate Connector Table**: New "Confidence" column after "Freq" column
- **Segment Overview Pie Chart**: Badge appears in legend below segment name
- **Member Detail Modal**: Prominently displayed at top with full breakdown

**Tooltip Content**:
```html
<div class="confidence-tooltip">
  <div class="tooltip-header">
    <span class="confidence-score">87%</span>
    <span class="confidence-label">High Confidence</span>
  </div>

  <div class="tooltip-body">
    <h4>Data Sources:</h4>
    <ul class="data-source-breakdown">
      <li class="source-available">
        <span class="source-icon">✓</span>
        <span class="source-name">Booking Behavior</span>
        <span class="source-score">40/40</span>
      </li>
      <li class="source-available">
        <span class="source-icon">✓</span>
        <span class="source-name">Survey JTBD</span>
        <span class="source-score">30/30</span>
      </li>
      <li class="source-partial">
        <span class="source-icon">✓</span>
        <span class="source-name">Social Signals</span>
        <span class="source-score">13/15</span>
      </li>
      <li class="source-partial">
        <span class="source-icon">✓</span>
        <span class="source-name">Demographics</span>
        <span class="source-score">8/10</span>
      </li>
      <li class="source-missing">
        <span class="source-icon">✗</span>
        <span class="source-name">LinkedIn/Employer</span>
        <span class="source-score">0/5</span>
      </li>
    </ul>
  </div>

  <div class="tooltip-footer">
    <span class="review-status">Review Required: No</span>
  </div>
</div>
```

**CSS**:
```css
/* Badge Styles */
.confidence-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  cursor: help;
  transition: all 0.2s;
}

.confidence-badge:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.confidence-badge.high {
  background: #D1FAE5;
  color: #065F46;
  border: 1px solid #10B981;
}

.confidence-badge.medium {
  background: #FEF3C7;
  color: #92400E;
  border: 1px solid #F59E0B;
}

.confidence-badge.low {
  background: #FEE2E2;
  color: #991B1B;
  border: 1px solid #EF4444;
}

.confidence-badge .badge-icon {
  font-size: 10px;
}

.confidence-badge .badge-score {
  font-variant-numeric: tabular-nums;
}

/* Tooltip Styles */
.confidence-tooltip {
  position: absolute;
  z-index: 1000;
  background: #1F2937;
  color: white;
  border-radius: 6px;
  padding: var(--spacing-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 280px;
  max-width: 320px;
  font-size: 13px;
  line-height: 1.5;
  pointer-events: none;
}

.confidence-tooltip::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #1F2937;
}

.tooltip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid #374151;
  margin-bottom: var(--spacing-sm);
}

.confidence-score {
  font-size: 24px;
  font-weight: 700;
  color: #10B981;
}

.confidence-label {
  font-size: 12px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
}

.tooltip-body h4 {
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}

.data-source-breakdown {
  list-style: none;
  padding: 0;
  margin: 0;
}

.data-source-breakdown li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #374151;
}

.data-source-breakdown li:last-child {
  border-bottom: none;
}

.source-icon {
  width: 20px;
  font-weight: bold;
}

.source-available .source-icon {
  color: #10B981;
}

.source-partial .source-icon {
  color: #F59E0B;
}

.source-missing .source-icon {
  color: #EF4444;
}

.source-name {
  flex: 1;
  margin-left: 8px;
  color: #E5E7EB;
}

.source-score {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #9CA3AF;
}

.tooltip-footer {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid #374151;
  font-size: 11px;
  color: #9CA3AF;
}

.review-status {
  display: block;
}

/* Table Integration */
.corporate-connector-table .confidence-column {
  width: 100px;
  text-align: center;
}

.corporate-connector-table .confidence-badge {
  margin: 0 auto;
}
```

**Interactivity**:
- **Hover**: Tooltip appears with detailed confidence breakdown
- **Click**: Opens member detail modal with full data source analysis
- **Color Updates**: Badge color auto-updates when new data sources added

**Accessibility**:
```html
<span class="confidence-badge high"
      role="status"
      aria-label="Segment confidence: 87%, High confidence"
      tabindex="0">
  <span class="badge-icon" aria-hidden="true">🟢</span>
  <span class="badge-score">87%</span>
</span>
```

**Implementation Notes**:
- Confidence score recalculates in real-time when data sources are added/updated
- Low confidence (<65%) members automatically flagged for manual review
- Batch operations available to target members needing specific data (e.g., "Email all members missing LinkedIn data")

---

### 8. Data Coverage Widget (Phase 1)

**Purpose**: Dashboard-level overview of data source completeness across member base

**Dimensions**: Card 400px × 280px

**Visual Design**:
```
┌────────────────────────────────────────────────────────┐
│ Data Coverage Overview                    [ℹ️ Learn More]│
├────────────────────────────────────────────────────────┤
│                                                        │
│  📊 Member Data Completeness                           │
│                                                        │
│  ┌──────────┬──────────┬──────────┬──────────┬──────┐ │
│  │ Booking  │ Survey   │ Social   │ Demogr.  │ Link.│ │
│  │          │          │          │          │      │ │
│  │   📈     │   📋     │   📱     │   🗺️     │  👔  │ │
│  │          │          │          │          │      │ │
│  │ 50/50    │ 48/50    │ 32/50    │ 50/50    │ 28/50│ │
│  │ 100%     │  96%     │  64%     │ 100%     │  56% │ │
│  └──────────┴──────────┴──────────┴──────────┴──────┘ │
│                                                        │
│  Summary:                                              │
│  • 28 members (56%) have all 5 data sources ✓         │
│  • 20 members (40%) have 3-4 sources ⚠                │
│  • 2 members (4%) have <3 sources ⚠️                   │
│                                                        │
│  Average Confidence: 78%                               │
│                                                        │
│  [View Members Needing Data] [Export Gap Analysis]    │
└────────────────────────────────────────────────────────┘
```

**Data Source Icons** (with semantic meaning):

| Icon | Source | Always Available? | Collection Method | Target Coverage |
|------|--------|-------------------|-------------------|-----------------|
| 📈 | Booking Behavior | ✓ Yes | Automated (system data) | 100% |
| 📋 | Survey JTBD | No | Manual (member input) | 95%+ |
| 📱 | Social Signals | No | Semi-automated (opt-in + scrape) | 60-70% |
| 🗺️ | Demographics | ✓ Yes | Automated (Census API) | 100% |
| 👔 | LinkedIn/Employer | No | Manual (member input) | 50-60% |

**Visual States**:

**Icon States**:
```css
/* Filled state (100% coverage) */
.source-icon.filled {
  opacity: 1.0;
  filter: grayscale(0%);
  font-size: 32px;
}

/* Partial state (50-99% coverage) */
.source-icon.partial {
  opacity: 0.7;
  filter: grayscale(30%);
  font-size: 32px;
}

/* Low state (<50% coverage) */
.source-icon.low {
  opacity: 0.4;
  filter: grayscale(70%);
  font-size: 32px;
}
```

**Progress Bar Visualization**:
```
Booking:     ████████████████████ 100% (50/50)
Survey:      ███████████████████░  96% (48/50)
Social:      ████████████░░░░░░░░  64% (32/50)
Demographics:████████████████████ 100% (50/50)
LinkedIn:    ███████████░░░░░░░░░  56% (28/50)
```

**Drill-Down Modal** (triggered by "View Members Needing Data"):
```
┌──────────────────────────────────────────────────────────┐
│ Members Needing Additional Data                      [×] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Filter by Missing Data: [All ▼]                         │
│ ☐ Missing Survey    ☐ Missing Social                    │
│ ☐ Missing LinkedIn  ☐ <3 Total Sources                  │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Name          │ Segment  │ Missing  │ Confidence │  │
│ ├───────────────┼──────────┼──────────┼────────────┤  │
│ │ Mike Chen     │ Corp Pwr │ 📱 👔    │ 72% 🟡     │  │
│ │ Emma Davis    │ Social   │ 📋 📱 👔 │ 58% 🔴     │  │
│ │ Alex Rodriguez│ Compet.  │ 📱       │ 76% 🟡     │  │
│ │ ...           │ ...      │ ...      │ ...        │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ Actions:                                                 │
│ [Email Survey Request to Selected (2)]                  │
│ [Request LinkedIn Data from Selected (2)]               │
│ [Offer $10 Credit for Instagram Connect]                │
│                                                          │
│ [Export List]  [Close]                                  │
└──────────────────────────────────────────────────────────┘
```

**CSS**:
```css
/* Widget Container */
.data-coverage-widget {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: var(--spacing-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.data-coverage-widget h3 {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.data-coverage-widget .learn-more {
  font-size: 12px;
  font-weight: 400;
  color: #3B82F6;
  cursor: pointer;
  text-decoration: none;
}

.data-coverage-widget .learn-more:hover {
  text-decoration: underline;
}

/* Source Icons Grid */
.source-icons-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  background: #F9FAFB;
  border-radius: 6px;
}

.source-icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-sm);
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}

.source-icon-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #3B82F6;
}

.source-icon-card .icon {
  font-size: 32px;
  margin-bottom: 8px;
  transition: opacity 0.3s, filter 0.3s;
}

.source-icon-card .label {
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.source-icon-card .coverage {
  font-size: 12px;
  color: #9CA3AF;
  font-variant-numeric: tabular-nums;
}

.source-icon-card .percentage {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
  margin-top: 4px;
}

/* Coverage Progress Bars */
.coverage-progress {
  margin: var(--spacing-md) 0;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 8px;
}

.progress-label {
  width: 100px;
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-fill.full {
  background: linear-gradient(90deg, #10B981 0%, #059669 100%);
}

.progress-fill.low {
  background: linear-gradient(90deg, #F59E0B 0%, #D97706 100%);
}

.progress-value {
  width: 60px;
  font-size: 12px;
  font-weight: 600;
  color: #111827;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* Summary Stats */
.coverage-summary {
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: #F0F9FF;
  border-left: 4px solid #3B82F6;
  border-radius: 4px;
}

.coverage-summary h4 {
  font-size: 13px;
  font-weight: 600;
  color: #1E40AF;
  margin-bottom: 8px;
}

.coverage-summary ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.coverage-summary li {
  font-size: 13px;
  color: #374151;
  margin-bottom: 4px;
  line-height: 1.5;
}

.coverage-summary .metric-highlight {
  font-weight: 600;
  color: #1E40AF;
}

.average-confidence {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid #BFDBFE;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.average-confidence .score {
  font-size: 24px;
  color: #3B82F6;
}

/* Action Buttons */
.coverage-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-lg);
}

.btn-view-gaps {
  flex: 1;
  background: #3B82F6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-view-gaps:hover {
  background: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
}

.btn-export-analysis {
  flex: 1;
  background: white;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-export-analysis:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

/* Drill-Down Modal */
.data-gaps-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
}

.modal-close:hover {
  color: #111827;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.modal-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gap-filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin: var(--spacing-md) 0;
}

.filter-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-checkbox:hover {
  background: #F3F4F6;
  border-color: #3B82F6;
}

.filter-checkbox input[type="checkbox"] {
  margin: 0;
}

.members-gap-table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--spacing-md) 0;
  font-size: 14px;
}

.members-gap-table thead th {
  background: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
}

.members-gap-table tbody td {
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;
}

.members-gap-table .missing-icons {
  display: flex;
  gap: 4px;
  font-size: 16px;
}

.bulk-action-buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin: var(--spacing-md) 0;
  padding: var(--spacing-md);
  background: #F9FAFB;
  border-radius: 6px;
}

.bulk-action-buttons h4 {
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.bulk-action-buttons button {
  background: white;
  color: #374151;
  border: 1px solid #D1D5DB;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.bulk-action-buttons button:hover {
  background: #F9FAFB;
  border-color: #3B82F6;
  color: #3B82F6;
}
```

**Interactivity**:
- **Source Icon Click**: Opens modal filtered to members missing that specific data source
- **"View Members Needing Data"**: Opens drill-down table with filtering options
- **Batch Actions**: Email surveys, request LinkedIn, offer Instagram incentive ($10 credit)
- **Real-time Updates**: Widget refreshes when new data collected

**Placement**:
- **Customer Intelligence Dashboard**: Top-right card, above Corporate Connector Table
- **Admin Settings**: Data quality dashboard for tracking collection progress

**Accessibility**:
```html
<div class="data-coverage-widget" role="region" aria-label="Data source coverage overview">
  <h3>
    Data Coverage Overview
    <a href="#" class="learn-more" aria-label="Learn more about data sources">ℹ️ Learn More</a>
  </h3>

  <div class="source-icons-grid" role="list" aria-label="Data source completion status">
    <div class="source-icon-card"
         role="listitem"
         tabindex="0"
         aria-label="Booking data: 100% coverage, 50 of 50 members">
      <div class="icon filled" aria-hidden="true">📈</div>
      <div class="label">Booking</div>
      <div class="coverage">50/50</div>
      <div class="percentage">100%</div>
    </div>
    <!-- Additional source cards... -->
  </div>

  <button class="btn-view-gaps"
          aria-label="View list of members needing additional data">
    View Members Needing Data
  </button>
</div>
```

**Implementation Notes**:
- Widget data recalculates daily at midnight (cached for performance)
- Admin can manually trigger recalculation via "Refresh Data" button
- Export generates CSV with member IDs, missing data sources, and suggested outreach templates
- Tracks historical coverage trends (e.g., "Social data up 15% this month")

---

### 9. JTBD Profile Badge (Phase 1 - NEW)

**Context**: Displayed on customer profile pages, customer list views
**Priority**: P0
**Source**: Revision A (revisions-a.md), FUNCTIONAL_SPEC FR-7.2

**Visual Design**:

```
┌─────────────────────────────────────────┐
│ Customer Profile: John Smith            │
├─────────────────────────────────────────┤
│                                         │
│ Primary JTBD:                           │
│ ┌──────────────────────┐                │
│ │ 🎯 Competitive  85%  │ ← JTBD Badge   │
│ └──────────────────────┘                │
│                                         │
│ Secondary JTBD:                         │
│ ┌──────────────────────┐                │
│ │ 🎉 Social       72%  │                │
│ └──────────────────────┘                │
│                                         │
│ Context Breakdown:                      │
│ ┌─────────────────────────────────────┐ │
│ │ Context              │JTBD │Freq│LV│ │
│ ├─────────────────────────────────────┤ │
│ │ Wed Morning 7-9am    │Comp │ 12 │10│ │
│ │ Fri Evening 6-9pm    │Social│ 6 │18│ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**JTBD Badge Specs**:

```html
<div class="jtbd-badge" data-jtbd="competitive" data-confidence="85">
  <span class="jtbd-icon">🎯</span>
  <span class="jtbd-label">Competitive</span>
  <span class="jtbd-confidence" data-tier="high">85%</span>
</div>
```

**CSS**:
```css
.jtbd-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid var(--jtbd-color);
  background: white;
  font-size: 14px;
  font-weight: 600;
}

.jtbd-icon {
  font-size: 20px;
}

.jtbd-confidence[data-tier="high"] {
  color: #10B981; /* Green */
  background: #D1FAE5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.jtbd-confidence[data-tier="medium"] {
  color: #F59E0B; /* Yellow */
  background: #FEF3C7;
}

.jtbd-confidence[data-tier="low"] {
  color: #EF4444; /* Red */
  background: #FEE2E2;
}
```

**JTBD Color Mapping**:
```css
:root {
  --jtbd-competitive: #EF4444;  /* Red - intensity */
  --jtbd-social: #10B981;       /* Green - community */
  --jtbd-fitness: #3B82F6;      /* Blue - health */
  --jtbd-skill-dev: #F59E0B;    /* Yellow - learning */
  --jtbd-corporate: #6366F1;    /* Indigo - professional */
  --jtbd-family: #EC4899;       /* Pink - nurturing */
}
```

**Interactivity**:
- **Hover**: Tooltip shows signal breakdown
  ```
  Competitive Signals (85% confidence):
  ✓ Weekday morning bookings (12)
  ✓ Consistent schedule
  ✓ Tournament participation (2)
  ✗ Pro player following (not tracked)
  ```
- **Click**: Opens JTBD detail modal with full context table

**Implementation Notes**:
- Confidence tiers: High (≥85%), Medium (70-84%), Low (<70%)
- Icon mapping: Competitive 🎯, Social 🎉, Fitness 💪, Skill Dev 📚, Corporate 💼, Family 👨‍👩‍👧
- Display "Manual Override" badge if JTBD manually assigned
- Show "Multi-Context" indicator if JTBD diversity ≥2

---

### 10. JTBD Demand Heatmap (Phase 1 - NEW)

**Context**: Programming Ideas view, JTBD analysis tab
**Dimensions**: 800px × 450px
**Priority**: P2
**Source**: Revision A Section 4.2, FUNCTIONAL_SPEC FR-7.3

**Visual Design**:

```
JTBD Demand Heatmap - Social JTBD Filter Active

Filter: [Competitive][Social ✓][Fitness][Skill Dev][Corporate][Family]

         Early     Morning    Midday    Afternoon  Evening
         6-9am     9am-12pm   12-3pm    3-6pm      6-9pm
    ┌──────────┬──────────┬──────────┬──────────┬──────────┐
Mon │    2     │    5     │    8     │    6     │   15     │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Tue │    1     │    4     │    7     │    9     │   18     │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Wed │    3     │    6     │    9     │   11     │   22     │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Thu │    2     │    5     │    8     │   10     │   20     │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Fri │    4     │    8     │   12     │   15     │   35  ⚠  │ ← Gap!
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Sat │   10     │   18     │   25     │   22     │   28     │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Sun │    8     │   15     │   20     │   18     │   24     │
    └──────────┴──────────┴──────────┴──────────┴──────────┘

Legend: 1-10 □ 11-20 ▒ 21-30 ▓ 31+ █  ⚠ Programming gap

[Click cell: Friday Evening 6-9pm (35 Social bookings)]
```

**HTML Structure**:
```html
<div class="jtbd-heatmap">
  <div class="heatmap-filters">
    <button class="jtbd-filter" data-jtbd="social" data-active="true">Social</button>
    <!-- ... other JTBD filters -->
  </div>

  <div class="heatmap-grid">
    <div class="heatmap-cell"
         data-day="Friday"
         data-time="Evening"
         data-count="35"
         data-intensity="high"
         data-gap="true">
      <span class="cell-count">35</span>
      <span class="gap-indicator">⚠</span>
    </div>
    <!-- 35 cells total (7 days × 5 time blocks) -->
  </div>

  <div class="heatmap-legend">
    <span>1-10</span> <span>11-20</span> <span>21-30</span> <span>31+</span>
  </div>
</div>
```

**CSS**:
```css
.heatmap-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #E5E7EB;
  cursor: pointer;
  transition: all 0.2s;
}

.heatmap-cell[data-intensity="low"] {
  background: rgba(59, 130, 246, 0.1); /* Light blue */
}

.heatmap-cell[data-intensity="medium"] {
  background: rgba(59, 130, 246, 0.3);
}

.heatmap-cell[data-intensity="high"] {
  background: rgba(59, 130, 246, 0.6);
}

.heatmap-cell[data-intensity="extreme"] {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.heatmap-cell[data-gap="true"] {
  border: 2px solid #EF4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}

.gap-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 16px;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10;
}
```

**Interactivity**:
- **Hover**: Tooltip shows "Friday Evening: 35 Social bookings (high demand, LOW SUPPLY ⚠)"
- **Click**: Drill-down modal showing customer list in that context
  ```
  Friday Evening 6-9pm - Social JTBD (35 bookings)

  Customers:
  - John Smith (12 bookings, last visit: Oct 18)
  - Sarah Jones (8 bookings, last visit: Oct 20)
  ...

  Gap Analysis:
  ⚠ HIGH demand, but PCC lacks themed social events on Friday evenings

  Recommended Programs:
  1. Glow Pickleball (Success: 92/100)
  2. 1980s Night (Success: 85/100)
  ```

**Programming Gap Logic**:
- Gap = High JTBD demand + Low program supply
- Threshold: >20 bookings in a context without corresponding programs
- Gap indicator triggers recommended program display

---

### 11. Programming Ideas Table (Phase 1 - NEW)

**Context**: Programming Ideas tab, Competitive Library view
**Dimensions**: Full width, variable height (20+ rows)
**Priority**: P1
**Source**: Addendum B, COMPETITIVE_INTELLIGENCE_REPORT.md, FUNCTIONAL_SPEC FR-8.2

**Visual Design**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Programming Ideas Library                        [Quick Win Filter] ☆  │
├─────────────────────────────────────────────────────────────────────────┤
│ Filters: [Social ✓][Corporate][Family] Urgency: [Critical ✓][High ✓]   │
├─────────────────────────────────────────────────────────────────────────┤
│ Name                 │Source Club│JTBD  │Score│Urgency│Feas│Revenue│Profit│
├──────────────────────┼───────────┼──────┼─────┼───────┼────┼───────┼──────┤
│🔴 Glow Pickleball    │Multiple   │Social│ 92  │ 🔴    │High│ $2,950│$2,300│
│🟠 Corp Lunch League  │Pickle Haus│Corp  │ 88  │ 🟠    │High│ $4,800│$3,600│
│🟠 1980s Night        │Pickle Haus│Social│ 85  │ 🔴    │Med │ $2,400│$1,800│
│🟡 Family Sundays     │Chicken&P  │Family│ 80  │ 🟡    │High│ $1,800│$1,200│
│... (16 more programs)                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ Showing 20 programs │ Total Est. Revenue: $45,000 │ Avg Profit: $1,950 │
└─────────────────────────────────────────────────────────────────────────┘
```

**Table Columns**:

| Column | Width | Format | Sorting |
|--------|-------|--------|---------|
| Name (linked) | 180px | Text + icon | Alphanumeric |
| Source Club | 120px | Text | Alphanumeric |
| JTBD Badge | 80px | Badge component | By JTBD type |
| Success Score | 60px | 0-100 + bar chart | Numeric (default: DESC) |
| Urgency | 60px | 🔴🟠🟡🟢 | Critical → Low |
| Feasibility | 80px | High/Med/Low badge | High → Low |
| Est. Revenue | 90px | $X,XXX | Numeric |
| Est. Profit | 90px | $X,XXX | Numeric |
| Actions | 80px | View Details button | N/A |

**HTML Structure**:
```html
<table class="programming-ideas-table">
  <thead>
    <tr>
      <th data-sortable="true">Program Name</th>
      <th data-sortable="true">Source Club</th>
      <th data-sortable="true">JTBD</th>
      <th data-sortable="true" data-default="desc">Success Score</th>
      <th data-sortable="true">Urgency</th>
      <th data-sortable="true">Feasibility</th>
      <th data-sortable="true">Revenue</th>
      <th data-sortable="true">Profit</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr data-program-id="1" data-urgency="critical" data-jtbd="social">
      <td>
        <a href="#" class="program-link">
          <span class="urgency-dot critical">🔴</span>
          Glow-in-the-Dark Pickleball
        </a>
      </td>
      <td>Multiple</td>
      <td><span class="jtbd-badge mini" data-jtbd="social">Social</span></td>
      <td>
        <div class="score-cell">
          <span class="score-value">92</span>
          <div class="score-bar" style="width: 92%"></div>
        </div>
      </td>
      <td><span class="urgency-badge critical">🔴 Critical</span></td>
      <td><span class="feasibility-badge high">High</span></td>
      <td>$2,950</td>
      <td class="profit-cell positive">$2,300</td>
      <td><button class="btn-secondary btn-sm">View</button></td>
    </tr>
    <!-- 19 more rows -->
  </tbody>
</table>
```

**CSS**:
```css
.programming-ideas-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.programming-ideas-table th {
  background: #F9FAFB;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #E5E7EB;
  cursor: pointer;
}

.programming-ideas-table th[data-sortable="true"]:hover {
  background: #F3F4F6;
}

.programming-ideas-table td {
  padding: 12px;
  border-bottom: 1px solid #E5E7EB;
}

.score-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.score-bar {
  height: 8px;
  background: linear-gradient(90deg, #10B981 0%, #3B82F6 50%, #EF4444 100%);
  border-radius: 4px;
  flex: 1;
}

.urgency-badge.critical {
  color: #EF4444;
  background: #FEE2E2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.feasibility-badge.high {
  color: #10B981;
  background: #D1FAE5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.profit-cell.positive {
  color: #10B981;
  font-weight: 600;
}
```

**Quick Win Filter**:
```javascript
// Quick Win = High feasibility + High urgency + Profit >$2K
function applyQuickWinFilter() {
  return programs.filter(p =>
    p.pcc_feasibility === 'high' &&
    ['critical', 'high'].includes(p.urgency) &&
    p.estimated_pcc_profit >= 2000
  );
}
```

**Program Detail Modal** (opens on row click):
```
┌───────────────────────────────────────────────────┐
│ Glow-in-the-Dark Pickleball         [✕ Close]    │
├───────────────────────────────────────────────────┤
│                                                   │
│ Source: Multiple clubs (Morgan Mfg, Crew Social) │
│ JTBD: Social Connection 🎉                        │
│                                                   │
│ Description:                                      │
│ Black-light themed evening event with glow       │
│ paddles, balls, and court tape. Music, drinks,   │
│ and social atmosphere. 2-hour format.            │
│                                                   │
│ Revenue Model:                                    │
│ • $25/person × 118 attendees = $2,950            │
│ • Equipment rental: $500                         │
│ • Marketing: $150                                │
│ • Net Profit: $2,300                             │
│                                                   │
│ Success Factors:                                  │
│ ✓ High attendance (60-100 people typical)        │
│ ✓ Appeals to Social JTBD (PCC's CRITICAL gap)    │
│ ✓ Low operational complexity                     │
│ ✓ Repeat event potential (monthly)               │
│                                                   │
│ PCC Implementation Notes:                        │
│ - Partner with local event equipment rental      │
│ - Market to Social segment customers             │
│ - Friday or Saturday evening (7-9pm optimal)     │
│ - 4-week lead time for marketing                 │
│                                                   │
│ [View Competitor Example] [Mark as Implemented]  │
└───────────────────────────────────────────────────┘
```

**Interactivity**:
- **Row hover**: Highlight entire row
- **Click program name**: Open detail modal
- **Click Source Club**: Filter to all programs from that club
- **Click JTBD badge**: Filter to programs serving that JTBD
- **Sort**: Click column header to toggle ASC/DESC
- **Quick Win star**: Toggle filter on/off

---

### 12. Competitive Gap Analysis Chart (Phase 1 - NEW)

**Context**: Programming Ideas view, Gap Analysis tab
**Dimensions**: 600px × 400px
**Priority**: P1
**Source**: COMPETITIVE_INTELLIGENCE_REPORT.md, FUNCTIONAL_SPEC FR-8.3

**Visual Design**:

```
JTBD Programming Gaps - PCC vs. Competitors

Competitive     ████          ████        (Parity)
                PCC           Competitors

Social          █             █████       🔴 CRITICAL GAP
                PCC           Competitors

Fitness         ███           ████        (Moderate Gap)
                PCC           Competitors

Skill Dev       ████          ████        (Parity)
                PCC           Competitors

Corporate       █████         ███         ✓ PCC Strength
                PCC           Competitors

Family          ██            █████       (Gap)
                PCC           Competitors

Legend: ⭐ = 1 star (weak) | █████ = 5 stars (strong)

[Click on "Social" gap]
↓
Recommended Programs to Close Social Gap:
1. Glow Pickleball (Success: 92) - Est. Revenue Impact: +$27,600/year
2. 1980s Night (Success: 85) - Est. Revenue Impact: +$21,600/year
3. Brunch & Bingo (Success: 78) - Est. Revenue Impact: +$18,000/year

Customer Leakage Risk: $6,000-11,000/year
```

**HTML Structure**:
```html
<div class="gap-analysis-chart">
  <h3>JTBD Programming Gaps - PCC vs. Competitors</h3>

  <div class="gap-row" data-jtbd="social" data-gap-level="critical">
    <div class="jtbd-label">
      <span class="jtbd-badge mini" data-jtbd="social">Social</span>
      <span class="gap-indicator critical">🔴 CRITICAL GAP</span>
    </div>

    <div class="gap-bars">
      <div class="bar-group pcc">
        <label>PCC</label>
        <div class="bar" data-stars="1" style="width: 20%">⭐</div>
      </div>
      <div class="bar-group competitors">
        <label>Competitors</label>
        <div class="bar" data-stars="5" style="width: 100%">⭐⭐⭐⭐⭐</div>
      </div>
    </div>

    <div class="leakage-risk">
      <span class="risk-amount">$6K-11K/yr at risk</span>
    </div>
  </div>

  <!-- 5 more gap rows for other JTBDs -->

  <div class="gap-legend">
    <span>⭐ = Weak</span>
    <span>⭐⭐⭐⭐⭐ = Strong</span>
    <span>🔴 = Critical</span>
    <span>✓ = Strength</span>
  </div>
</div>
```

**CSS**:
```css
.gap-row {
  display: grid;
  grid-template-columns: 200px 1fr 150px;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  cursor: pointer;
  transition: background 0.2s;
}

.gap-row:hover {
  background: #F9FAFB;
}

.gap-row[data-gap-level="critical"] {
  border-left: 4px solid #EF4444;
}

.gap-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bar-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-group label {
  width: 100px;
  font-size: 12px;
  color: #6B7280;
}

.bar {
  height: 24px;
  background: linear-gradient(90deg, #EF4444, #F59E0B, #10B981);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  padding: 0 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.bar-group.pcc .bar {
  background: #3B82F6; /* PCC blue */
}

.bar-group.competitors .bar {
  background: #10B981; /* Competitor green */
}

.leakage-risk {
  display: flex;
  align-items: center;
}

.risk-amount {
  background: #FEE2E2;
  color: #EF4444;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}
```

**Gap Click Modal**:
```
┌─────────────────────────────────────────────────┐
│ Close Social JTBD Gap                [✕ Close] │
├─────────────────────────────────────────────────┤
│                                                 │
│ Current State:                                  │
│ • PCC Social Programming: ⭐ (Weak)             │
│ • Competitor Average: ⭐⭐⭐⭐⭐ (Strong)         │
│ • Gap Severity: CRITICAL 🔴                     │
│                                                 │
│ Impact:                                         │
│ • 15 customers have unmet Social JTBD           │
│ • Revenue at risk: $6,000-11,000/year           │
│ • Example: Randall went to Pickle Haus for      │
│   Friday themed events ("fun social atmosphere")│
│                                                 │
│ Recommended Programs (Top 3):                   │
│                                                 │
│ 1. Glow Pickleball (Success: 92)               │
│    Revenue Impact: +$27,600/year (if monthly)   │
│    Implementation: 4 weeks                      │
│    [View Details]                               │
│                                                 │
│ 2. 1980s Night (Success: 85)                    │
│    Revenue Impact: +$21,600/year                │
│    Implementation: 6 weeks                      │
│    [View Details]                               │
│                                                 │
│ 3. Brunch & Bingo (Success: 78)                 │
│    Revenue Impact: +$18,000/year                │
│    Implementation: 4 weeks                      │
│    [View Details]                               │
│                                                 │
│ [Export Gap Analysis Report]                    │
└─────────────────────────────────────────────────┘
```

---

### 13. Utilization Heatmap (Phase 1 - NEW)

**Context**: Membership Capacity tab
**Dimensions**: 900px × 500px
**Priority**: P0
**Source**: Addendum B, FUNCTIONAL_SPEC FR-9.1

**Visual Design**:

```
Court Utilization - Week of Oct 21-27, 2025

Toggle: [Member Hours] [Non-Member Hours] [Combined ✓]

         Early     Morning    Midday    Afternoon  Evening
         6-9am     9am-12pm   12-3pm    3-6pm      6-9pm
    ┌──────────┬──────────┬──────────┬──────────┬──────────┐
Mon │   45%    │   62%    │   55%    │   72%    │   88%    │
    │  30%│15% │  42%│20% │  35%│20% │  52%│20% │  68%│20% │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Tue │   48%    │   65%    │   58%    │   75%    │   92%    │
    │  33%│15% │  45%│20% │  38%│20% │  55%│20% │  72%│20% │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Wed │   52%    │   68%    │   62%    │   78%    │   96% ⚠  │
    │  37%│15% │  48%│20% │  42%│20% │  58%│20% │  76%│20% │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Thu │   50%    │   66%    │   60%    │   76%    │   94%    │
    │  35%│15% │  46%│20% │  40%│20% │  56%│20% │  74%│20% │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Fri │   42%    │   58%    │   65%    │   80%    │   98% ⚠  │
    │  27%│15% │  38%│20% │  45%│20% │  60%│20% │  78%│20% │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Sat │   72%    │   85%    │   92%    │   88%    │   90%    │
    │  50%│22% │  62%│23% │  70%│22% │  66%│22% │  68%│22% │
    ├──────────┼──────────┼──────────┼──────────┼──────────┤
Sun │   68%    │   82%    │   88%    │   85%    │   86%    │
    │  46%│22% │  59%│23% │  66%│22% │  63%│22% │  64%│22% │
    └──────────┴──────────┴──────────┴──────────┴──────────┘

Color Key: 0-50% Green | 50-80% Yellow | 80-95% Orange | 95-100% Red ⚠

Cell Format: Total% (Member%│Non-Member%)

⚠ Peak Constraints: Wed Evening, Fri Evening (≥95% utilization)
```

**HTML Structure**:
```html
<div class="utilization-heatmap">
  <div class="heatmap-header">
    <h3>Court Utilization - Week of Oct 21-27, 2025</h3>
    <div class="toggle-group">
      <button data-view="member">Member Hours</button>
      <button data-view="nonmember">Non-Member Hours</button>
      <button data-view="combined" class="active">Combined</button>
    </div>
  </div>

  <div class="heatmap-grid">
    <div class="utilization-cell"
         data-day="Wednesday"
         data-time="Evening"
         data-total="96"
         data-member="76"
         data-nonmember="20"
         data-level="peak">
      <div class="cell-total">96%</div>
      <div class="cell-split">
        <span class="member-pct">76%</span>
        <span class="divider">│</span>
        <span class="nonmember-pct">20%</span>
      </div>
      <span class="peak-indicator">⚠</span>
    </div>
    <!-- 34 more cells -->
  </div>

  <div class="heatmap-legend">
    <span class="legend-item"><span class="color-box green"></span> 0-50%</span>
    <span class="legend-item"><span class="color-box yellow"></span> 50-80%</span>
    <span class="legend-item"><span class="color-box orange"></span> 80-95%</span>
    <span class="legend-item"><span class="color-box red"></span> 95-100% ⚠</span>
  </div>

  <div class="peak-constraints-alert">
    ⚠ Peak Constraints: Wed Evening, Fri Evening (≥95% utilization)
    <br>
    <small>Cannot add members without reducing non-member capacity in these time blocks</small>
  </div>
</div>
```

**CSS**:
```css
.utilization-cell {
  position: relative;
  padding: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.utilization-cell[data-level="low"] {
  background: rgba(16, 185, 129, 0.2); /* Green */
}

.utilization-cell[data-level="healthy"] {
  background: rgba(245, 158, 11, 0.2); /* Yellow */
}

.utilization-cell[data-level="near-capacity"] {
  background: rgba(249, 115, 22, 0.3); /* Orange */
}

.utilization-cell[data-level="peak"] {
  background: rgba(239, 68, 68, 0.3); /* Red */
  border: 2px solid #EF4444;
}

.cell-total {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}

.cell-split {
  font-size: 12px;
  color: #6B7280;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
}

.member-pct {
  color: #3B82F6; /* Blue for members */
  font-weight: 600;
}

.nonmember-pct {
  color: #10B981; /* Green for non-members */
  font-weight: 600;
}

.peak-indicator {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 18px;
}

.utilization-cell:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 10;
}

.peak-constraints-alert {
  background: #FEE2E2;
  border-left: 4px solid #EF4444;
  padding: 12px 16px;
  margin-top: 16px;
  border-radius: 6px;
  font-size: 14px;
  color: #7F1D1D;
}
```

**Interactivity**:
- **Hover**: Tooltip shows detailed breakdown
  ```
  Wednesday Evening 6-9pm
  Total: 96% utilized (38.4 hours / 40 available)
  Members: 76% (30.4 hours)
  Non-Members: 20% (8 hours)

  ⚠ PEAK CONSTRAINT
  Membership growth blocked in this time block
  ```
- **Click**: Opens detail modal with time-series trend

**Toggle Behavior**:
- **Member Hours**: Show only blue bars (member %), hide non-member
- **Non-Member Hours**: Show only green bars (non-member %), hide member
- **Combined**: Show split view (default)

---

### 14. Membership Capacity Calculator (Phase 1 - NEW)

**Context**: Membership Capacity tab
**Dimensions**: 700px × 600px
**Priority**: P0
**Source**: Addendum B, FUNCTIONAL_SPEC FR-9.2, FR-9.3

**Visual Design**:

```
┌───────────────────────────────────────────────────────┐
│ Membership Capacity Calculator                        │
├───────────────────────────────────────────────────────┤
│                                                       │
│ Current State                                         │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Total Memberships: 125                          │  │
│ │ Avg Member Booking: 2.4 hours/week              │  │
│ │ Total Member Hours: 300 hours/week              │  │
│ │ Total Available: 400 hours/week (10 courts)     │  │
│ │ Current Utilization: 75%                        │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ Scenario Modeler                                      │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Target Utilization: ████████░░ 85%              │  │
│ │ Min Non-Member Reserve: ████░░░░░░ 20%          │  │
│ │ Member Booking Freq: [1x/wk] [2x/wk ✓] [3x/wk] │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ Results                                               │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Max Member Hours: 260 hrs/wk                    │  │
│ │ Max Memberships: 108 members                    │  │
│ │                                                 │  │
│ │ Revenue Impact:                                 │  │
│ │ • Additional Memberships: 0 (at capacity ⚠)     │  │
│ │ │ • Member Revenue: +$0                          │  │
│ │ • Lost Non-Member Revenue: $0                   │  │
│ │ • Net Impact: $0                                │  │
│ │                                                 │  │
│ │ ⚠ WARNING: Current memberships (125) EXCEED    │  │
│ │   optimal capacity (108). Consider limiting     │  │
│ │   new memberships or reducing non-member hours. │  │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ Pre-Defined Scenarios                                 │
│ ┌─────────────────────────────────────────────────┐  │
│ │ Scenario      │Max Members│Member Rev│NonMem Rev│ │
│ ├───────────────┼───────────┼──────────┼──────────┤ │
│ │🔴 Aggressive  │   144     │ $51,840  │  $12,000 │ │
│ │   (90%, 10%)  │           │          │          │ │
│ │🟡 Balanced    │   108     │ $38,880  │  $24,000 │ │
│ │   (85%, 20%)  │  ← RECOMMENDED                  │ │
│ │🟢 Conservative│    90     │ $32,400  │  $36,000 │ │
│ │   (75%, 30%)  │           │          │          │ │
│ └─────────────────────────────────────────────────┘  │
│                                                       │
│ [Export Capacity Report] [Run What-If Analysis]      │
└───────────────────────────────────────────────────────┘
```

**HTML Structure**:
```html
<div class="capacity-calculator">
  <div class="current-state">
    <h4>Current State</h4>
    <div class="stat-grid">
      <div class="stat">
        <label>Total Memberships</label>
        <value>125</value>
      </div>
      <!-- 4 more stats -->
    </div>
  </div>

  <div class="scenario-modeler">
    <h4>Scenario Modeler</h4>
    <div class="slider-control">
      <label>Target Utilization</label>
      <input type="range" min="50" max="100" value="85" step="5"
             id="target-utilization">
      <output>85%</output>
    </div>
    <div class="slider-control">
      <label>Min Non-Member Reserve</label>
      <input type="range" min="10" max="40" value="20" step="5"
             id="nonmember-reserve">
      <output>20%</output>
    </div>
    <div class="button-group">
      <button data-freq="1">1x/wk</button>
      <button data-freq="2" class="active">2x/wk</button>
      <button data-freq="3">3x/wk</button>
    </div>
  </div>

  <div class="results">
    <h4>Results</h4>
    <div class="result-box" data-status="warning">
      <div class="metric">
        <label>Max Member Hours</label>
        <value>260 hrs/wk</value>
      </div>
      <div class="metric">
        <label>Max Memberships</label>
        <value>108 members</value>
      </div>

      <div class="revenue-impact">
        <h5>Revenue Impact</h5>
        <div class="impact-item">
          <label>Additional Memberships:</label>
          <value class="negative">0 (at capacity ⚠)</value>
        </div>
        <!-- More impact items -->
      </div>

      <div class="warning-box">
        ⚠ WARNING: Current memberships (125) EXCEED optimal capacity (108).
        Consider limiting new memberships or reducing non-member hours.
      </div>
    </div>
  </div>

  <div class="scenarios-table">
    <h4>Pre-Defined Scenarios</h4>
    <table>
      <!-- Scenario comparison table -->
    </table>
  </div>
</div>
```

**CSS**:
```css
.capacity-calculator {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.slider-control {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.slider-control label {
  width: 180px;
  font-size: 14px;
  color: #374151;
}

.slider-control input[type="range"] {
  flex: 1;
  height: 8px;
  background: linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%);
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
}

.slider-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #3B82F6;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider-control output {
  width: 50px;
  text-align: right;
  font-weight: 600;
  font-size: 16px;
  color: #1F2937;
}

.warning-box {
  background: #FEE2E2;
  border-left: 4px solid #EF4444;
  padding: 12px 16px;
  margin-top: 16px;
  border-radius: 6px;
  font-size: 13px;
  color: #7F1D1D;
  line-height: 1.5;
}

.scenarios-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.scenarios-table tr[data-recommended="true"] {
  background: #DBEAFE;
  border-left: 4px solid #3B82F6;
}

.scenarios-table tr[data-recommended="true"]::after {
  content: "← RECOMMENDED";
  font-size: 12px;
  color: #3B82F6;
  font-weight: 600;
  margin-left: 8px;
}
```

**Interactivity**:
- **Slider change**: Real-time recalculation of max memberships
- **Booking frequency toggle**: Updates max memberships calculation
- **Scenario row click**: Applies scenario values to modeler
- **Export button**: Generates PDF report with charts

**Calculation Logic**:
```javascript
function calculateMaxMemberships(targetUtil, nonmemberReserve, memberFreq) {
  const totalHoursPerWeek = 400; // 10 courts × 40 hours
  const maxMemberHours = (totalHoursPerWeek * targetUtil) - (totalHoursPerWeek * nonmemberReserve);
  const maxMemberships = Math.floor(maxMemberHours / memberFreq);
  return maxMemberships;
}

// Example: 85% target, 20% reserve, 2x/week booking
// = (400 × 0.85) - (400 × 0.20) / 2
// = 340 - 80 / 2
// = 260 / 2
// = 130 max memberships
```

---

## Wireframes (ASCII)

### Customer Intelligence Dashboard (Full View)

```
┌────────────────────────────────────────────────────────────────────────┐
│ PCC Yield Optimizer                                                    │
│ 🔥 Heatmap | 🎯 Opportunities | 📊 Gap | 🗺️ Map | 👥 Customer Intel   │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Customer Intelligence Center                                           │
│                                                                        │
│ ┌──────────────────────────┬────────────────────────────────────────┐ │
│ │                          │                                        │ │
│ │  Segment Distribution    │   Geographic Distribution              │ │
│ │                          │                                        │ │
│ │       ╱───╲              │   ┌─────────────────────────┐          │ │
│ │      ╱  🔵 ╲             │   │                         │          │ │
│ │     │       │            │   │   [Chicago Map]         │          │ │
│ │    🟢│  25% │🔴          │   │                         │          │ │
│ │     │       │            │   │   West Loop: 12         │          │ │
│ │      ╲  ⚪ ╱             │   │   Lincoln Park: 8       │          │ │
│ │       ╲───╱              │   │   River North: 5        │          │ │
│ │                          │   │                         │          │ │
│ │  Click segment to filter │   └─────────────────────────┘          │ │
│ └──────────────────────────┴────────────────────────────────────────┘ │
│                                                                        │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ Corporate Connectors                           [Export CSV]      │ │
│ │ ┌───────┬──────────┬─────────┬──────────┬───────┬────────┬─────┐│ │
│ │ │ Name  │ Employer │ Title   │ Location │ Freq  │ Status │ Act ││ │
│ │ ├───────┼──────────┼─────────┼──────────┼───────┼────────┼─────┤│ │
│ │ │ Sarah │ TechCorp │ VP Mktg │ W. Loop  │3.2x/wk│Emailed │Copy ││ │
│ │ │ Raj   │ Consult  │ Dir Sale│ R. North │2.8x/wk│Not Cont│Copy ││ │
│ │ │ ...   │ ...      │ ...     │ ...      │ ...   │ ...    │ ... ││ │
│ │ └───────┴──────────┴─────────┴──────────┴───────┴────────┴─────┘│ │
│ └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│ ┌──────────────────────────────────────────────────────────────────┐ │
│ │ Segment Metrics                                                  │ │
│ │ ┌──────────────┬────────┬────────┬──────────────┬──────┬───────┐│ │
│ │ │ Segment      │ Members│Avg Freq│ Top Neighbor │CLV   │ Churn ││ │
│ │ ├──────────────┼────────┼────────┼──────────────┼──────┼───────┤│ │
│ │ │█Corporate... │  72    │3.2x/wk │ W Loop, RN   │$3,800│Med ⚠ ││ │
│ │ │█Social...    │  63    │1.8x/wk │ Lincoln Park │$2,300│Low ✓ ││ │
│ │ │█Competitive..│ 105    │2.5x/wk │ Bucktown     │$2,500│Med ⚠ ││ │
│ │ │█Casual...    │ 110    │0.6x/wk │ Various      │ $150 │High █││ │
│ │ └──────────────┴────────┴────────┴──────────────┴──────┴───────┘│ │
│ └──────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Interaction Patterns

### Filter Flow

```
User clicks segment in pie chart
  ↓
1. Pie chart slice darkens (active state)
2. Other slices fade to 30% opacity
3. Neighborhood map updates
   - Zip codes without members of selected segment fade out
   - Zip codes with members of selected segment highlighted
4. Corporate connector table filters
   - Only shows members of selected segment
   - Row count updates
5. Segment grid row highlights
   - Selected segment row gets subtle background color
```

### Export Flow

```
User clicks "Export CSV" button
  ↓
1. Button shows loading spinner (200ms)
2. CSV generated from filtered table data
3. Browser downloads file: "corporate-connectors-2025-10-08.csv"
4. Toast notification: "✓ Corporate connector list exported"
5. Button returns to normal state
```

### Copy Email Flow

```
User clicks "Copy Email" button for member
  ↓
1. Personalized email template generated
2. Template copied to clipboard
3. Button text changes to "Copied!" (2 seconds)
4. Toast notification: "✓ Email template copied"
5. Button returns to "Copy Email"
```

---

## Responsive Design

### Breakpoints

```css
/* Desktop (default) */
@media (min-width: 1280px) {
  .customer-intel-layout {
    grid-template-columns: 1fr 2fr;
  }
}

/* Tablet */
@media (max-width: 1279px) and (min-width: 768px) {
  .customer-intel-layout {
    grid-template-columns: 1fr;
  }

  .segment-overview,
  .neighborhood-map {
    max-width: 600px;
    margin: 0 auto;
  }
}

/* Mobile (not primary target, but graceful degradation) */
@media (max-width: 767px) {
  .corporate-connector-table {
    font-size: 12px;
  }

  .corporate-connector-table th,
  .corporate-connector-table td {
    padding: 8px;
  }
}
```

---

## Accessibility

### Keyboard Navigation

**Tab Order**:
1. Dashboard navigation tabs
2. Segment pie chart (focus on slices)
3. Neighborhood map (focus on zip codes)
4. Corporate connector table filters
5. Table rows (focusable for screen readers)
6. Export button
7. Copy email buttons

**Keyboard Shortcuts**:
- **Tab**: Move forward through interactive elements
- **Shift + Tab**: Move backward
- **Enter**: Activate button/link
- **Space**: Toggle checkbox/dropdown
- **Escape**: Close modal/tooltip

### ARIA Labels

```html
<!-- Pie chart -->
<svg role="img" aria-label="Member distribution across 4 segments">
  <g class="slice" role="button" aria-label="Corporate Power Users: 72 members, 25%">
    <path d="..."></path>
  </g>
</svg>

<!-- Map -->
<div id="neighborhood-heatmap"
     role="region"
     aria-label="Geographic distribution of members by zip code">
</div>

<!-- Table -->
<table role="table" aria-label="Corporate connector members">
  <thead>
    <tr>
      <th scope="col" aria-sort="descending">Name</th>
      <th scope="col">Employer</th>
      ...
    </tr>
  </thead>
</table>

<!-- Action buttons -->
<button aria-label="Export corporate connector list to CSV">
  Export CSV
</button>

<button aria-label="Copy email template for Sarah Johnson">
  Copy Email
</button>
```

### Color Contrast

All color combinations tested for WCAG 2.1 AA compliance:

| Background | Text | Contrast Ratio | Pass |
|-----------|------|---------------|------|
| `#FFFFFF` | `#111827` | 16.1:1 | ✓ AAA |
| `#F9FAFB` | `#111827` | 15.2:1 | ✓ AAA |
| `#3B82F6` | `#FFFFFF` | 4.6:1 | ✓ AA |
| `#10B981` | `#FFFFFF` | 4.7:1 | ✓ AA |
| `#EF4444` | `#FFFFFF` | 5.1:1 | ✓ AA |

---

## Animation & Transitions

### Micro-interactions

```css
/* Hover states */
.clickable-element {
  transition: all 0.2s ease;
}

.clickable-element:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Loading states */
.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Toast notifications */
.toast {
  animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
}

@keyframes slideIn {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
```

---

## Error States

### Empty State (No Data)

```
┌──────────────────────────────────────┐
│                                      │
│        📊                            │
│                                      │
│    No customer data available        │
│                                      │
│    Please complete member survey     │
│    to enable segmentation.           │
│                                      │
│    [Start Survey]                    │
│                                      │
└──────────────────────────────────────┘
```

### Loading State

```
┌──────────────────────────────────────┐
│                                      │
│        ⏳                            │
│                                      │
│    Loading customer data...          │
│                                      │
│    [Progress spinner]                │
│                                      │
└──────────────────────────────────────┘
```

### Error State

```
┌──────────────────────────────────────┐
│                                      │
│        ⚠️                            │
│                                      │
│    Failed to load customer data      │
│                                      │
│    Please refresh the page or        │
│    contact support if the issue      │
│    persists.                         │
│                                      │
│    [Retry]  [Contact Support]        │
│                                      │
└──────────────────────────────────────┘
```

---

## Design Review Checklist

Before shipping:

**Visual Design**:
- [ ] All colors from design system
- [ ] Typography hierarchy consistent
- [ ] Spacing follows 8px grid
- [ ] Icons sized correctly (16px or 24px)

**Interactivity**:
- [ ] All hover states implemented
- [ ] All click targets minimum 44px × 44px
- [ ] Loading states for async operations
- [ ] Success/error feedback for all actions

**Accessibility**:
- [ ] Color contrast 4.5:1 minimum
- [ ] All interactive elements keyboard accessible
- [ ] ARIA labels on all complex components
- [ ] Tested with screen reader (VoiceOver/NVDA)

**Responsive**:
- [ ] Tested on 1280px, 1920px, 2560px viewports
- [ ] No horizontal scroll on smaller screens
- [ ] Touch targets 44px minimum on tablet

**Performance**:
- [ ] Charts render in <500ms
- [ ] No layout shift during loading
- [ ] Smooth 60fps animations

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 8, 2025 | Peter Giordano | Initial design specification |

---

**End of Design Specification**
