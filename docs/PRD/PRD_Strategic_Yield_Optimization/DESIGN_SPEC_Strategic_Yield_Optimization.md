# Design Specification: Strategic Yield Optimization Using Popular Times Data

**Project**: PCC Yield Optimizer - Strategic Yield Optimization Module
**Version**: 1.0
**Last Updated**: October 20, 2025

---

## Document Organization

This Design Specification is part of a 5-document specification suite. Read in this order:

1. **[PRD](./PRD_Strategic_Yield_Optimization.md)** - Product vision, business goals, user needs
2. **[Functional Spec](./FUNCTIONAL_SPEC_Strategic_Yield_Optimization.md)** - What the system should do (functional requirements)
3. **[Technical Spec](./TECHNICAL_SPEC_Strategic_Yield_Optimization.md)** - How to build it (technical architecture)
4. **Design Spec** (this document) - UI/UX specifications (design system)
5. **[Epics & Sprints](./EPICS_AND_SPRINTS.md)** - Developer work breakdown (user stories, tasks, sprint planning)

---

## Design Principles

### 1. Consistency with Existing Dashboard
- **Reuse** existing design system from PCC Yield Optimizer v1.0
- **Match** typography, colors, spacing from `css/main.css`
- **Extend** patterns, don't reinvent

### 2. Data-Driven Decision Making
- **Numbers first**: Lead with quantified insights ("6.5 sessions/day" not "efficient")
- **Visual hierarchy**: Most important metrics largest/boldest
- **Context always**: Show benchmarks alongside raw numbers

### 3. Actionable Insights
- **Highlight opportunities**: Green for advantages, red for competitor weaknesses
- **Show impact**: Always include "$X revenue" or "Y% improvement"
- **Next steps clear**: Buttons/CTAs for scenario modeling

### 4. Tableau-Inspired Density
- **Information-rich**: Don't waste white space
- **Scannable**: User can get insights in 10 seconds
- **Details on demand**: Hover/click for deeper data

### 5. Accessibility (WCAG 2.1 AA)
- **Color contrast**: Minimum 4.5:1 for text
- **Keyboard navigation**: All interactive elements tabbable
- **Screen reader support**: ARIA labels, semantic HTML
- **Responsive**: Works on desktop (1280px+), tablet-friendly (768px+)

---

## Color Palette

### From Existing Design System

**Brand Colors**:
- Primary Blue: `#005DAA` - PCC brand, primary actions
- Primary Red: `#ED1C24` - Accents, warnings
- Secondary Navy: `#1D3557` - Headers, emphasis

**Semantic Colors** (for Yield Optimization):
- **Success Green**: `#10B981` - High efficiency, good turnover, opportunities
- **Warning Yellow**: `#F59E0B` - Medium efficiency, caution areas
- **Danger Red**: `#EF4444` - Poor efficiency, competitor weaknesses
- **Info Blue**: `#3B82F6` - Neutral information, PCC data

**Efficiency Score Colors** (NEW):
- **Excellent (≥6.5)**: `#10B981` (Success Green)
- **Good (5.5-6.4)**: `#3B82F6` (Info Blue)
- **Medium (4.5-5.4)**: `#F59E0B` (Warning Yellow)
- **Poor (<4.5)**: `#EF4444` (Danger Red)

**Backgrounds**:
- Page: `#F9FAFB` (off-white)
- Card: `#FFFFFF` (white)
- Border: `#E5E7EB` (light gray)
- Hover: `#F3F4F6` (light gray)

**Chart Colors**:
- Session Duration Chart: Use efficiency colors (green/blue/yellow/red)
- Opportunity Chart: Gradient from `#10B981` (low) to `#EF4444` (high)

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
| **H1** | 32px | 700 | 1.2 | View title ("Strategic Yield Optimization") |
| **H2** | 24px | 600 | 1.3 | Section headers ("Session Duration Benchmarking") |
| **H3** | 18px | 600 | 1.4 | Component titles ("Top 10 Opportunities") |
| **H4** | 16px | 600 | 1.4 | Card headers, table headers |
| **Body** | 14px | 400 | 1.5 | Default text, table cells |
| **Small** | 12px | 400 | 1.4 | Captions, footnotes, timestamps |
| **Large Numbers** | 36px | 700 | 1.1 | Key metrics (6.5 sessions/day) |

### Number Formatting

```css
.metric-value {
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  font-feature-settings: 'tnum';  /* Tabular numbers for alignment */
}

.metric-label {
  font-size: 12px;
  font-weight: 400;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Layout & Grid System

### Page Layout

```
┌────────────────────────────────────────────────────────────────────┐
│  Header                                                            │
│  PCC Yield Optimizer                                               │
│  [ Popular Times | Strategic Yield | Customer Intelligence ]       │
└────────────────────────────────────────────────────────────────────┘
│
│  ┌──────────────┬────────────────────────────────────────────────┐
│  │              │                                                │
│  │  Sidebar     │  Main Content Area                             │
│  │  (280px)     │                                                │
│  │              │                                                │
│  │  Filters:    │  ┌──────────────────────────────────────────┐ │
│  │  □ SPF       │  │  Session Duration Benchmarking           │ │
│  │  □ Big City  │  │  [Bar Chart: Facility vs Hours]          │ │
│  │  □ Pickle    │  └──────────────────────────────────────────┘ │
│  │  □ Grant     │                                                │
│  │  □ Horner    │  ┌──────────────────────────────────────────┐ │
│  │  □ Union     │  │  Court Turnover Analysis                 │ │
│  │              │  │  [Table: Facility | Sessions/Day | etc]  │ │
│  │  View:       │  └──────────────────────────────────────────┘ │
│  │  ○ All       │                                                │
│  │  ○ Private   │  ┌──────────────────────────────────────────┐ │
│  │  ○ Public    │  │  Top 10 Opportunities                    │ │
│  │              │  │  [Ranked Table]                          │ │
│  └──────────────┘  └──────────────────────────────────────────┘ │
│                                                                    │
│                    ┌──────────────────────────────────────────┐   │
│                    │  Scenario Modeler                        │   │
│                    │  [Interactive Slider Tool]               │   │
│                    └──────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

### Grid System

**12-column grid** (consistent with existing dashboard)

```css
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
}

.sidebar {
  position: sticky;
  top: 24px;
  height: fit-content;
}

.main-content {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}

.full-width {
  grid-column: 1 / -1;
}

.half-width {
  grid-column: span 6;
}

.third-width {
  grid-column: span 4;
}
```

### Spacing System (8px base)

- **4px**: Micro spacing (between icon and text)
- **8px**: Tight spacing (table cell padding)
- **16px**: Standard spacing (card padding, margins)
- **24px**: Section spacing (between components)
- **32px**: Large spacing (between major sections)
- **48px**: Extra-large spacing (page sections)

---

## Component Specifications

### Component 1: Session Duration Benchmarking Chart

**Purpose**: Horizontal bar chart comparing session durations across competitors

**Dimensions**:
- Width: 100% of container (responsive)
- Height: 400px
- Margins: 40px top, 20px right, 60px bottom, 120px left (for facility names)

**Visual Design**:

```
┌─────────────────────────────────────────────────────────────────┐
│  Session Duration Benchmarking                          [?] [⚙] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Union Park         ████████████████████████████  4.0 hrs  🔴  │
│  Grant Park         ██████████████████  3.0 hrs           🟡  │
│  SPF Chicago        ████████████  2.5 hrs                  🔵  │
│  Pickle Haus        ████████████  2.5 hrs                  🔵  │
│  Horner Park        ████████  2.0 hrs                      🟢  │
│  Big City Pickle    ████████  2.0 hrs                      🟢  │
│  -------------------- Industry Avg: 2.6 hrs --------------- │
│  PCC (Target)       ████████  2.0 hrs                      ⭐  │
│                                                                 │
│  🟢 Excellent (<2.5)  🔵 Good (2.5)  🟡 Medium (3.0)  🔴 Poor (≥4.0) │
└─────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.session-duration-chart {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 24px;
}

.session-duration-chart .bar {
  transition: opacity 0.2s;
}

.session-duration-chart .bar:hover {
  opacity: 0.8;
  cursor: pointer;
}

.session-duration-chart .label {
  font-size: 14px;
  font-weight: 600;
  fill: #111827;
}

.session-duration-chart .value-label {
  font-size: 16px;
  font-weight: 700;
  fill: #111827;
}
```

**Interactions**:
- **Hover**: Show tooltip with detailed info
  ```
  ┌─────────────────────────────┐
  │  SPF Chicago                │
  │  Session Duration: 2.5 hrs  │
  │  Operating Hours: 16 hrs    │
  │  Sessions/Day: 6.4          │
  │  Total Capacity: 51.2       │
  └─────────────────────────────┘
  ```
- **Click**: Filter opportunity table to show this facility's opportunities

---

### Component 2: Court Turnover Analysis Table

**Purpose**: Display sessions-per-day for all competitors in sortable table

**Dimensions**:
- Width: 100% of container
- Height: Auto (based on rows)
- Max height: 600px (scrollable if needed)

**Visual Design**:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Court Turnover Analysis                                              [Export]  │
├─────┬────────────────────┬────────┬──────────┬──────────┬────────┬──────────┬────┤
│ Rank│ Facility           │ Courts │ Op Hours │ Session  │Sess/Day│  Capacity│ Eff│
│     │                    │        │          │ Duration │        │          │    │
├─────┼────────────────────┼────────┼──────────┼──────────┼────────┼──────────┼────┤
│  ⭐  │ PCC (Target)       │   7    │ 13 hrs   │  2.0 hrs │  6.5   │   45.5   │ 🟢 │
│  1   │ SPF Chicago        │   8    │ 16 hrs   │  2.5 hrs │  6.4   │   51.2   │ 🔵 │
│  2   │ Big City Pickle    │  10    │ 15 hrs   │  2.0 hrs │  7.5   │   75.0   │ 🟢 │
│  3   │ Pickle Haus        │  12    │ 14 hrs   │  2.5 hrs │  5.6   │   67.2   │ 🔵 │
│  4   │ Horner Park        │   4    │ 15 hrs   │  2.0 hrs │  7.5   │   30.0   │ 🟢 │
│  5   │ Grant Park         │   6    │ 16 hrs   │  3.0 hrs │  5.3   │   31.8   │ 🟡 │
│  6   │ Union Park         │   6    │ 16 hrs   │  4.0 hrs │  4.0   │   24.0   │ 🔴 │
└─────┴────────────────────┴────────┴──────────┴──────────┴────────┴──────────┴────┘
   ↑ Click column headers to sort
```

**CSS**:
```css
.turnover-table {
  width: 100%;
  border-collapse: collapse;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
}

.turnover-table thead {
  background: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
}

.turnover-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
}

.turnover-table th:hover {
  background: #F3F4F6;
}

.turnover-table th.sorted {
  color: #005DAA;
}

.turnover-table td {
  padding: 12px 16px;
  font-size: 14px;
  border-top: 1px solid #E5E7EB;
}

.turnover-table tr.best {
  background: #F0F9FF;  /* Light blue highlight for PCC */
  font-weight: 600;
}

.turnover-table .highlight {
  font-weight: 700;
  color: #005DAA;
}

.efficiency-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.efficiency-badge.excellent {
  background: #D1FAE5;
  color: #065F46;
}

.efficiency-badge.good {
  background: #DBEAFE;
  color: #1E40AF;
}

.efficiency-badge.medium {
  background: #FEF3C7;
  color: #92400E;
}

.efficiency-badge.poor {
  background: #FEE2E2;
  color: #991B1B;
}
```

**Interactions**:
- **Click header**: Sort by column (ascending/descending)
- **Hover row**: Highlight row
- **Click row**: Show detailed breakdown in modal

---

### Component 3: Top 10 Opportunities Table

**Purpose**: Display ranked opportunities with revenue estimates

**Visual Design**:

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│  Top 10 Revenue Opportunities                                    [View All 168]  │
├──────┬──────────┬──────┬─────────────┬────────┬───────────┬─────────┬────────────┤
│ Rank │ Day      │ Hour │ Facility    │ Pop    │ Session   │  Score  │ Est Revenue│
│      │          │      │             │        │ Duration  │         │  (Monthly) │
├──────┼──────────┼──────┼─────────────┼────────┼───────────┼─────────┼────────────┤
│   1  │ Thursday │ 8pm  │ Union Park  │  100%  │  4.0 hrs  │   200   │  $1,000    │
│   2  │ Thursday │ 7pm  │ Union Park  │   84%  │  4.0 hrs  │   168   │    $840    │
│   3  │Wednesday │ 9pm  │ Union Park  │   91%  │  4.0 hrs  │   182   │    $910    │
│   4  │ Thursday │ 7pm  │ SPF Chicago │  100%  │  2.5 hrs  │   125   │    $625    │
│   5  │ Thursday │ 6pm  │ Grant Park  │   87%  │  3.0 hrs  │   130   │    $650    │
│   6  │ Monday   │ 6pm  │ Grant Park  │   67%  │  3.0 hrs  │   100   │    $500    │
│   7  │ Tuesday  │ 7pm  │ SPF Chicago │   96%  │  2.5 hrs  │   120   │    $600    │
│   8  │Wednesday │ 7pm  │ SPF Chicago │   97%  │  2.5 hrs  │   121   │    $605    │
│   9  │ Friday   │ 7pm  │ SPF Chicago │  100%  │  2.5 hrs  │   125   │    $625    │
│  10  │ Saturday │ 10am │ Pickle Haus │   64%  │  2.5 hrs  │    80   │    $400    │
├──────┴──────────┴──────┴─────────────┴────────┴───────────┴─────────┴────────────┤
│  Total Potential Revenue (Top 10): $6,755/month = $81,060/year                   │
│  (Assumes PCC captures 20% of competitor overflow demand)                         │
└───────────────────────────────────────────────────────────────────────────────────┘
```

**CSS**: Similar to turnover table, with additional styling for revenue column

```css
.revenue-cell {
  font-weight: 700;
  color: #10B981;  /* Success green */
  font-feature-settings: 'tnum';
}

.opportunity-score {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 12px;
  background: linear-gradient(90deg, #10B981 0%, #EF4444 100%);
  color: #FFFFFF;
}

.opportunity-score[data-score="high"] {
  background: #EF4444;  /* >150 */
}

.opportunity-score[data-score="medium"] {
  background: #F59E0B;  /* 100-150 */
}

.opportunity-score[data-score="low"] {
  background: #10B981;  /* <100 */
}
```

---

### Component 4: Scenario Modeler

**Purpose**: Interactive tool to test different session lengths and see revenue impact

**Visual Design**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Session Length Scenario Modeler                              [Save]   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────┬────────────────────────────────┐  │
│  │  Current Setup                  │  Test Scenario                 │  │
│  ├─────────────────────────────────┼────────────────────────────────┤  │
│  │  Session Length: 2.0 hrs        │  Session Length:               │  │
│  │  Operating Hours: 13 hrs/day    │  [========●========] 1.5 hrs   │  │
│  │  Courts: 7                      │    1.0      2.0      3.0       │  │
│  │                                 │                                │  │
│  │  Sessions/Court/Day: 6.5        │  Sessions/Court/Day: 8.7       │  │
│  │  Total Sessions/Day: 45.5       │  Total Sessions/Day: 60.9      │  │
│  │  Monthly Capacity: 1,365        │  Monthly Capacity: 1,827       │  │
│  │                                 │                                │  │
│  │  Revenue @ $25/session:         │  Revenue @ $25/session:        │  │
│  │  $34,125/month                  │  $45,675/month                 │  │
│  └─────────────────────────────────┴────────────────────────────────┘  │
│                                                                         │
│  ┌────────────────────────────────────────────────────────────────┐   │
│  │  IMPACT ANALYSIS                                               │   │
│  ├────────────────────────────────────────────────────────────────┤   │
│  │  📊 Capacity Change:  +462 sessions/month  (+33.8%)            │   │
│  │  💰 Revenue Impact:   +$11,550/month  (+$138,600/year)         │   │
│  │  ⏱️  Session Density:  +2.2 sessions/court/day                 │   │
│  │                                                                │   │
│  │  ⚠️  Risks:                                                     │   │
│  │  • Shorter sessions may reduce customer satisfaction           │   │
│  │  • 1.5 hrs may not be enough for competitive play              │   │
│  │  • Requires clear communication to members                     │   │
│  │                                                                │   │
│  │  ✅ Opportunities:                                              │   │
│  │  • Fits more sessions during 6-9pm peak window                 │   │
│  │  • Better turnover vs. SPF (8.7 vs 6.4 sessions/day)           │   │
│  │  • Can capture overflow from competitors                       │   │
│  └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  [Test Another Scenario]  [Compare Scenarios]  [Export Report]         │
└─────────────────────────────────────────────────────────────────────────┘
```

**CSS**:
```css
.scenario-modeler {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 32px;
}

.scenario-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

.scenario-panel {
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  padding: 24px;
}

.scenario-panel.current {
  border-color: #D1D5DB;
}

.scenario-panel.test {
  border-color: #005DAA;
  box-shadow: 0 4px 6px rgba(0, 93, 170, 0.1);
}

.slider-container {
  margin: 24px 0;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%);
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #005DAA;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.impact-analysis {
  background: #FFFBEB;  /* Light yellow for attention */
  border: 2px solid #FCD34D;
  border-radius: 8px;
  padding: 24px;
}

.impact-metric {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 16px;
}

.impact-metric .icon {
  font-size: 24px;
}

.impact-metric .value {
  font-weight: 700;
  color: #111827;
}

.impact-metric .change {
  color: #10B981;  /* Green for positive */
  font-weight: 600;
}

.risk-list,
.opportunity-list {
  list-style: none;
  padding: 0;
  margin: 12px 0;
}

.risk-list li::before {
  content: "•";
  color: #EF4444;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.opportunity-list li::before {
  content: "•";
  color: #10B981;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
```

**Interactions**:
- **Slider drag**: Real-time recalculation (debounced 300ms)
- **Hover metrics**: Show formula in tooltip
- **Save button**: Store scenario for comparison
- **Compare button**: Show side-by-side comparison of 2-3 saved scenarios

---

## Dashboard Layout

### Full Page View

```
┌────────────────────────────────────────────────────────────────────────┐
│  Header: PCC Yield Optimizer                                          │
│  [ Popular Times | → Strategic Yield ← | Customer Intelligence ]      │
└────────────────────────────────────────────────────────────────────────┘

┌──────────────┬─────────────────────────────────────────────────────────┐
│              │                                                         │
│  SIDEBAR     │  MAIN CONTENT                                           │
│  (280px)     │                                                         │
│              │  ┌──────────────────────────────────────────────────┐   │
│  Filters:    │  │  KEY METRICS CARDS                               │   │
│  ☑ SPF       │  ├──────────┬──────────┬──────────┬──────────────┤   │
│  ☑ Big City  │  │  Avg     │ PCC      │ Best     │ Worst        │   │
│  ☑ Pickle    │  │  Session │ Target   │ Turnover │ Turnover     │   │
│  ☑ Grant     │  │  2.6 hrs │ 2.0 hrs  │ 7.5/day  │ 4.0/day      │   │
│  ☑ Horner    │  │          │  (6.5)   │ (Big City│ (Union Park) │   │
│  ☑ Union     │  │          │          │  Pickle) │              │   │
│  ☐ PCC       │  └──────────┴──────────┴──────────┴──────────────┘   │
│              │                                                         │
│  View:       │  ┌──────────────────────────────────────────────────┐   │
│  ● All       │  │  SESSION DURATION BENCHMARKING                   │   │
│  ○ Private   │  │  [Bar Chart]                                     │   │
│  ○ Public    │  └──────────────────────────────────────────────────┘   │
│              │                                                         │
│  Sort By:    │  ┌─────────────────────┬────────────────────────────┐   │
│  ● Turnover  │  │  COURT TURNOVER     │  TOP 10 OPPORTUNITIES      │   │
│  ○ Capacity  │  │  ANALYSIS           │                            │   │
│  ○ Session   │  │  [Table]            │  [Ranked Table]            │   │
│              │  └─────────────────────┴────────────────────────────┘   │
│  [Export]    │                                                         │
│  [Settings]  │  ┌──────────────────────────────────────────────────┐   │
│              │  │  SCENARIO MODELER                                │   │
│              │  │  [Interactive Tool]                              │   │
└──────────────┘  └──────────────────────────────────────────────────┘   │
                                                                          │
                  ┌──────────────────────────────────────────────────┐   │
                  │  INSIGHTS & RECOMMENDATIONS                      │   │
                  │  • Union Park has poorest turnover (4.0/day)     │   │
                  │  • Opportunity: Target Thursday 7-9pm overflow   │   │
                  │  • Consider 1.5hr peak blocks for +33% capacity  │   │
                  └──────────────────────────────────────────────────┘   │
                                                                          │
                  Last Updated: Oct 20, 2025 | Data: Google Maps         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Responsive Design

### Desktop (≥1280px)
- Full 12-column grid
- Sidebar visible
- All components displayed

### Tablet (768px - 1279px)
- Sidebar collapses to hamburger menu
- Single column layout
- Tables scroll horizontally if needed

### Mobile (<768px)
- Out of scope for V1
- Show message: "Best viewed on desktop (1280px+)"

---

## States & Interactions

### Loading States

```html
<div class="loading-skeleton">
  <div class="skeleton-bar" style="width: 80%;"></div>
  <div class="skeleton-bar" style="width: 60%;"></div>
  <div class="skeleton-bar" style="width: 90%;"></div>
</div>
```

```css
.skeleton-bar {
  height: 20px;
  background: linear-gradient(90deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 12px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Empty States

```
┌──────────────────────────────────────────────┐
│                                              │
│              📊                              │
│      No Data Available                       │
│                                              │
│  Unable to load popular times data.          │
│  Please check your internet connection       │
│  or try again later.                         │
│                                              │
│       [Retry]   [View Cached Data]           │
│                                              │
└──────────────────────────────────────────────┘
```

### Error States

```
┌──────────────────────────────────────────────┐
│                                              │
│              ⚠️                               │
│      Calculation Error                       │
│                                              │
│  Could not calculate turnover for            │
│  "Union Park". Missing session duration.     │
│                                              │
│       [Report Issue]   [Dismiss]             │
│                                              │
└──────────────────────────────────────────────┘
```

### Hover States

- **Cards**: Subtle shadow `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Buttons**: Background darkens 10%
- **Table rows**: Background changes to `#F9FAFB`
- **Chart bars**: Opacity 0.8, cursor pointer

### Focus States

```css
button:focus,
input:focus,
select:focus {
  outline: 2px solid #005DAA;
  outline-offset: 2px;
}
```

---

## Accessibility

### ARIA Labels

```html
<div role="region" aria-label="Session Duration Benchmarking">
  <button aria-label="Sort by session duration">Session Duration</button>
  <div role="img" aria-label="Bar chart showing SPF Chicago at 2.5 hours">
    <!-- Chart SVG -->
  </div>
</div>
```

### Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons
- **Arrow keys**: Navigate table cells, adjust sliders
- **Escape**: Close modals, cancel actions

### Screen Reader Support

```html
<span class="sr-only">
  SPF Chicago has 2.5 hour average session duration,
  which is 0.5 hours more than PCC's 2.0 hour target.
  This results in 6.4 sessions per day compared to
  PCC's 6.5 sessions per day.
</span>
```

---

## Animation & Motion

### Transitions

```css
/* Smooth transitions for interactive elements */
* {
  transition: background-color 0.2s ease,
              color 0.2s ease,
              opacity 0.2s ease,
              transform 0.2s ease;
}

/* Chart animations */
.bar-enter {
  transform: scaleX(0);
  transform-origin: left;
}

.bar-enter-active {
  transform: scaleX(1);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Print Styles

```css
@media print {
  .sidebar,
  button,
  .no-print {
    display: none;
  }

  .main-content {
    width: 100%;
  }

  .page-break {
    page-break-after: always;
  }

  body {
    font-size: 12pt;
  }

  table {
    page-break-inside: avoid;
  }
}
```

---

## Design Assets

### Icons

Use **Heroicons** (consistent with existing dashboard):
- `ChartBarIcon` - Session duration chart
- `TableCellsIcon` - Turnover table
- `SparklesIcon` - Opportunities
- `AdjustmentsIcon` - Scenario modeler
- `ArrowTrendingUpIcon` - Revenue increase
- `ExclamationTriangleIcon` - Warnings

### Illustrations

- Empty states: Simple line drawings (80x80px)
- Loading: Animated spinner (24x24px, Primary Blue)

---

## Design QA Checklist

Before shipping:

- [ ] All colors meet WCAG AA contrast requirements
- [ ] Hover states implemented on all interactive elements
- [ ] Loading skeletons shown while data fetches
- [ ] Empty states designed for "no data" scenarios
- [ ] Error states with clear messaging
- [ ] Keyboard navigation works for all components
- [ ] ARIA labels present on all visualizations
- [ ] Print styles tested
- [ ] Responsive layout works at 1280px, 1440px, 1920px
- [ ] Numbers formatted consistently (tabular figures)
- [ ] Tooltips display on hover
- [ ] Transitions smooth (60 FPS)

---

**End of Design Specification**

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-20 | Peter Giordano | Initial design spec for Strategic Yield Optimization |
