# PCC Yield Optimizer - Project Handoff Document

**Date**: October 6, 2025  
**Project Phase**: Sprints 1-3 Complete, Ready for Sprint 4+  
**Original Chat**: [Link to be added]

---

## Project Overview

**Product**: PCC Yield Optimizer - Competitive Intelligence & Yield Management Dashboard  
**Client**: Pickleball Clubhouse Chicago (4242 N. Elston Ave, Chicago, IL)  
**Goal**: Drive membership from 236 → 400 members while optimizing revenue per court-hour

**Core Value Proposition**: Transform competitive and operational data into actionable strategic decisions using visual analytics that identify when PCC has capacity but competitors are busy.

---

## Strategic Context

### Business Model (Current State)
- **Revenue Mix**: 36.8% Membership | 34.8% Court Reservations | 11.9% Instruction | 10.9% Events | 5% Pro Shop
- **Expense Mix**: 37.2% Payroll | 37.2% Debt Service | 10.6% Marketing
- **Current Members**: 236-240 (Target: 400)
- **Member Tiers**: Casual ($85/mo), Game Changer ($125/mo), Fanatic ($185/mo), Fight Club (legacy)

### Key Business Priorities
1. **Membership Growth**: Identify where potential members play instead of PCC and why
2. **Yield Optimization**: Balance member play vs. non-member revenue (events, instruction, corporate)
3. **Maintain Quality**: Keep member NPS at 92+ (99th percentile)

### Competitive Landscape
**Primary Competitors**:
- **SPF Chicago** (2600 N. Southport): 8 courts, social/lifestyle brand, excellent transit (3 min walk), no parking, strong café/bar
- **Big City Pickle - West Loop** (1015 W. Madison): 10 courts, downtown location, restaurant/bar focus, paid parking
- **Pickle Haus** (Arlington Heights): 12 courts, suburban, family-friendly, large free parking

**PCC Advantages**: Superior courts, free parking (45 spaces), value pricing, true club feel, excellent instruction  
**PCC Challenges**: Limited amenities vs. SPF, parking challenges during highway construction, brand awareness

---

## Technical Architecture

### Tech Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript (ES6+)
- **Visualization**: D3.js (custom viz), Chart.js (standard charts), Plotly.js (interactive), Leaflet.js (maps)
- **Styling**: Tailwind CSS utilities + custom design system
- **Data**: Client-side JSON files (no backend for demo)

### Project Structure
```
pcc-yield-optimizer/
├── TECH_SPEC.md              # Complete technical architecture
├── FUNCTIONAL_SPEC.md        # Feature specs & user stories
├── DESIGN_SPEC.md            # Visual design system (Tableau-quality)
├── data/
│   ├── facilities.json       # 5 facilities with full metadata
│   └── popular-times/        # Weekly utilization data (7 days × 24 hours)
│       ├── pcc.json
│       ├── spf.json
│       └── [others].json
├── css/
│   ├── main.css              # Global styles & design system
│   ├── components.css        # Reusable UI components
│   └── dashboards.css        # Dashboard-specific layouts
├── js/
│   ├── main.js               # App initialization
│   ├── config.js             # Constants & configuration
│   ├── data-loader.js        # JSON data loading
│   ├── components/
│   │   ├── heatmap.js        # Enhanced heatmap with overlays
│   │   └── opportunity-list.js # Opportunity finder component
│   └── utils/
│       ├── calculations.js   # Business logic & scoring
│       └── formatters.js     # Data formatting helpers
└── index.html                # Single-page application
```

### Key Data Models

**Facility Schema** (see `data/facilities.json`):
- Basic info: name, address, coordinates, rating, courts
- Amenities: café, bar, parking, pro shop
- Transit: nearest station, walk time, bus routes
- Segments: breakdown by player type (competitive, fitness, social, families)

**Popular Times Schema** (see `data/popular-times/*.json`):
- Weekly data: 7 days × 24 hours
- Popularity scale: 0-100
- Based on Google Popular Times API patterns

**Opportunity Scoring Algorithm**:
```javascript
// High opportunity = Low PCC utilization + High competitor demand
if (pccUtilization < 60 && competitorMax > 75) {
  score = (competitorMax - pccUtilization) / 5; // 0-10 scale
  level = score > 7 ? 'high' : score > 5 ? 'medium' : 'low';
  estimatedCustomers = gap × 0.6; // Conservative
}
```

---

## Design System

### Brand Colors
- **Primary Blue**: #005DAA (PCC brand)
- **Primary Red**: #ED1C24 (PCC brand)
- **Opportunity Green**: #10B981 (high opportunity)
- **Warning Yellow**: #F59E0B (medium opportunity)
- **Alert Red**: #EF4444 (low opportunity)
- **Win Blue**: #3B82F6 (competitive advantage)

### Heatmap Color Scale
```
0%:   #FFFFFF (white)
25%:  #FEF3C7 (light yellow)
50%:  #FBBF24 (orange)
75%:  #F87171 (light red)
100%: #DC2626 (deep red)
```

### Visual Quality Standard
**Target**: Tableau-level polish - clean, professional, data-dense, instantly readable

---

## Completed Work (Sprints 1-3)

### ✅ Sprint 1: Foundation & Heatmap View
**Deliverables**:
- Project scaffolding complete
- Side-by-side heatmap comparison (PCC vs. SPF)
- 7-day × 24-hour grids with color-coded utilization
- Hover tooltips showing popularity percentages
- Filter panel with facility checkboxes
- Clean, professional UI matching design spec

**Status**: ✅ Complete and working

### ✅ Sprint 2: Competitive Intelligence Layer
**Deliverables**:
- Opportunity scoring algorithm implemented
- Visual overlays on heatmap cells:
  - Green border (3px) = High opportunity
  - Yellow border (2px) = Medium opportunity
  - Red border (1px) = Low opportunity
  - Blue border (3px) = PCC winning
- Corner badges showing count of busy competitors
- Enhanced tooltips with competitive analysis
- Filter controls:
  - "Show Opportunity Overlays" toggle
  - Minimum opportunity score slider (0-10)
  - "Show Only High Opportunities" quick filter

**Key Insight**: Sunday 11am-1pm shows thick green border (SPF at 100%, PCC at 52% = huge opportunity)

**Status**: ✅ Complete and working

### ✅ Sprint 3: Opportunity Finder Dashboard
**Deliverables**:
- Tab navigation (Heatmap View | Opportunity List | Gap Analysis)
- Prioritized opportunity list view:
  - Cards sorted by opportunity score
  - Metrics: PCC %, Market Max %, Gap, Est. Customers
  - Busy competitor chips
  - AI-generated recommendations
  - Action buttons (Create Event, Launch Campaign)
- Filter & sort controls:
  - Sort by: score, customers, gap, day, time
  - Filter by: all days, weekdays, weekends
  - Min score threshold
- Export to CSV functionality

**Key Feature**: Transforms heatmap patterns into actionable "to-do list" with specific revenue opportunities

**Status**: ✅ Complete and working

---

## Remaining Work (Sprints 4-6+)

### 🔨 Sprint 4: Gap Analysis Grid
**Goal**: Numerical comparison table showing quantified revenue opportunities

**Features Needed**:
1. **Data Table View**:
   - Columns: Time Slot | PCC % | Market Max % | Gap | Opportunity Score | Est. Revenue | Top Competitor
   - Sortable columns
   - Color-coded gaps (green = opportunity, red = we're winning)
   
2. **Aggregate Metrics**:
   - Total weekly opportunity: $XX,XXX
   - Average gap across all slots
   - "You're winning XX% of time slots"
   - Top 5 opportunities summary
   
3. **Drill-Down**:
   - Click row → open detailed analysis panel
   - Link to heatmap view (scroll to that cell)
   - Link to opportunity list

**Reference**: See `FUNCTIONAL_SPEC.md` - Feature 3

---

### 🔨 Sprint 5: Geographic Competitive Map
**Goal**: Interactive Chicago map showing facilities, catchment areas, and member density

**Features Needed**:
1. **Base Map** (Leaflet.js):
   - Chicago city boundaries
   - OpenStreetMap tiles
   - Zoom/pan controls
   
2. **Facility Markers**:
   - Color-coded pins (PCC = blue, competitors = red, public = green)
   - Size indicates court count
   - Click → facility details popup
   
3. **Catchment Areas**:
   - 15-minute drive time circles
   - Semi-transparent overlays
   - Overlap analysis: "47% of SPF's catchment overlaps with PCC"
   
4. **Member Density Heatmap**:
   - Show where PCC members live (anonymized)
   - Gradient overlay (blue → red)
   - Click area → count in neighborhood
   
5. **Transit Layer**:
   - CTA Brown/Red Line routes
   - Station markers
   - Walking distance indicators

**Data Needed**:
- Chicago GeoJSON boundaries
- CTA transit line GeoJSON
- Mock member address data (lat/lng only, anonymized)

**Reference**: See `FUNCTIONAL_SPEC.md` - Feature 4

---

### 🔨 Sprint 6: Detailed Analysis Panel
**Goal**: Deep-dive modal that opens when clicking any time slot (WHO/WHERE/HOW/WHY)

**Features Needed**:
1. **Panel Layout**:
   - Slide-in from right (480px width)
   - Scrollable content
   - Sticky header with time slot info
   
2. **Sections**:
   - **Competitive Analysis**: Which competitors are busy, how busy, market demand
   - **WHO** (Segments): Customer breakdown, match with PCC targets, persona cards
   - **WHERE** (Geography): Mini map, member density, overlap %, drive times
   - **HOW** (Accessibility): Transit comparison, parking, bike access
   - **WHY** (Advantages): What competitors have, what PCC can leverage
   
3. **Recommendations**:
   - AI-generated specific actions (e.g., "Launch Sunday Social League")
   - Confidence level
   - Expected revenue
   - Action buttons

**Reference**: See `FUNCTIONAL_SPEC.md` - Feature 5

---

### 🎨 Sprint 7: Polish & Export
**Goal**: Production-ready quality with professional export capabilities

**Features Needed**:
1. **Visual Polish**:
   - Smooth animations (fade-in, slide-in)
   - Skeleton loading states
   - Empty states
   - Error handling
   
2. **Export Features**:
   - Export heatmap as PNG (for presentations)
   - Export opportunity list as PDF report
   - "Share this view" URL generation
   
3. **Accessibility**:
   - Keyboard navigation
   - Screen reader support
   - High contrast mode
   
4. **Performance**:
   - Lazy load data
   - Debounce filters (300ms)
   - Optimize re-renders

**Reference**: See `DESIGN_SPEC.md` - Performance & Accessibility sections

---

## User Personas

### 1. Strategic CEO (Alex)
- **Uses tool for**: Weekly strategic review, board presentations, investor updates
- **Key question**: "What's the single biggest opportunity this week?"
- **Needs**: Executive summary, quick insights, exportable reports

### 2. Operations Manager (Jordan)
- **Uses tool for**: Daily scheduling, maintenance planning, staffing decisions
- **Key question**: "When should I schedule events vs. leave courts open?"
- **Needs**: Detailed time slot analysis, revenue projections, operational recommendations

### 3. Marketing Director (Casey)
- **Uses tool for**: Campaign planning, competitive positioning, targeting
- **Key question**: "Which competitor's customers should I target and when?"
- **Needs**: Segment analysis, geographic insights, messaging recommendations

### 4. Membership Manager (Sam)
- **Uses tool for**: Member retention, tier upgrades, LTV optimization
- **Key question**: "Which members are at risk and why?"
- **Needs**: Member health metrics, churn prediction, upgrade opportunities

---

## Success Metrics

### Demo Success (Immediate)
- ✅ Investors can interact without guidance
- ✅ Generates at least 3 "aha!" moments
- ✅ No bugs during presentation
- ✅ Loads in < 3 seconds
- ✅ Visual quality matches Tableau standards

### Business Impact (6 months post-launch)
- Membership growth: 236 → 400 (+69%)
- Revenue per court-hour: +15%
- Member NPS: Maintained at 92+
- Time to identify opportunities: 30min → 5min
- New member acquisition cost: -25%

---

## Key Insights from Sprints 1-3

### What's Working Well
1. **Visual clarity**: Opportunity overlays make patterns instantly visible
2. **Actionable recommendations**: Specific, time-bound suggestions resonate with users
3. **Filter flexibility**: Users can drill down to exactly what they need
4. **Export functionality**: CSV export enables offline analysis and team sharing

### Lessons Learned
1. **Don't make users think**: The heatmap comparison was overwhelming until we added overlays
2. **Quantify everything**: "~48 potential customers" is more compelling than "high opportunity"
3. **Context matters**: Tooltips need to explain WHY something is an opportunity, not just that it is
4. **Multiple views needed**: Different roles need different lenses on the same data

### Technical Decisions
1. **Vanilla JS over React**: Simpler for demo, faster to build, no build step
2. **Client-side only**: No backend = easier deployment, faster iteration
3. **JSON files**: Real-time API integration deferred to post-demo
4. **Tailwind utilities**: Rapid styling without CSS bloat

---

## Data Sources & References

### Current Data
- **PCC Popular Times**: Based on actual facility heatmap (see original images)
- **SPF Popular Times**: Based on Google Popular Times data
- **Facility Metadata**: Real addresses, ratings from Google, amenities verified

### Future Data Integrations (Post-Demo)
- Google Maps API: Distance Matrix, Geocoding, Places
- CTA Transit API: Real-time train/bus data
- PCC Internal Systems: Member check-ins, court bookings, revenue data
- Survey Data: Member preferences, churn reasons, satisfaction scores

---

## Important Files to Reference

1. **TECH_SPEC.md** (19KB):
   - Complete technical architecture
   - All data schemas with examples
   - Component specifications
   - Business logic formulas
   - Performance requirements

2. **FUNCTIONAL_SPEC.md** (20KB):
   - Feature descriptions with user stories
   - Acceptance criteria for each feature
   - Interaction patterns
   - Non-functional requirements

3. **DESIGN_SPEC.md** (17KB):
   - Complete design system (colors, typography, spacing)
   - All UI component styles with CSS
   - Animation specifications
   - Accessibility guidelines
   - Responsive breakpoints

4. **data/facilities.json**:
   - Master facility database
   - 5 facilities with complete metadata
   - Segment breakdowns, amenities, transit info

5. **data/popular-times/*.json**:
   - Weekly utilization data (7 days × 24 hours)
   - PCC and SPF currently populated
   - Scale: 0-100 popularity

---

## How to Use This Handoff

### For Sprint 4+ Prompts
1. Reference this document for full context
2. Review the "Remaining Work" section for that sprint
3. Check `FUNCTIONAL_SPEC.md` for detailed feature requirements
4. Check `DESIGN_SPEC.md` for visual specifications
5. Generate a detailed Claude Code prompt following the pattern from Sprints 1-3

### For Questions & Decisions
1. Check specs first (likely already documented)
2. Reference "Key Insights" section for lessons learned
3. Review user personas to frame decisions
4. Keep success metrics in mind

### For Debugging
1. Check browser console for errors
2. Verify data files are loading correctly
3. Inspect CSS for styling issues
4. Test across browsers (Chrome, Safari, Firefox)

---

## Contact & Repository

**Project Owner**: Peter Giordano  
**Project Path**: `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer`  
**Repository**: (To be added)  
**Original Conversation**: (Link to be added)

---

## Quick Start for New Chat

**Paste this into a new Claude chat:**

> I'm continuing development on the PCC Yield Optimizer project. I've completed Sprints 1-3 (Heatmap View, Opportunity Overlays, and Opportunity List). 
>
> The complete project specifications are in:
> - `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/TECH_SPEC.md`
> - `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/FUNCTIONAL_SPEC.md`
> - `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/DESIGN_SPEC.md`
> - `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/PROJECT_HANDOFF.md`
>
> Please review these files to understand the project context, then help me create a detailed prompt for Claude Code to build Sprint 4: Gap Analysis Grid.

---

**End of Handoff Document**