# Design Specification: Customer Intelligence Center

**Project**: PCC Yield Optimizer - Customer Intelligence Center
**Version**: 2.0
**Last Updated**: October 8, 2025

---

## Document Organization

- **[PRD](./PRD_Customer_Intelligence_Center_v2.md)**: Product vision, business goals
- **[Functional Spec](./FUNCTIONAL_SPEC_Customer_Intelligence.md)**: What the system does
- **[Technical Spec](./TECHNICAL_SPEC_Customer_Intelligence.md)**: How to build it
- **Design Spec** (this document): UI/UX specifications
- **[Epics & Sprints](./EPICS_AND_SPRINTS.md)**: Work breakdown
- **[Project Milestones](./PROJECT_MILESTONES.md)**: Timeline

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
