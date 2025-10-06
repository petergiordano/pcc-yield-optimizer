# Sprint Roadmap - Quick Reference

## Completed Sprints ✅

### Sprint 1: Foundation & Heatmap View ✅
- Side-by-side heatmap comparison (PCC vs. SPF)
- 7-day × 24-hour grids with color-coded utilization
- Basic tooltips with popularity percentages
- Filter panel with facility checkboxes

### Sprint 2: Competitive Intelligence Layer ✅
- Opportunity scoring algorithm
- Visual overlays (green/yellow/red/blue borders)
- Corner badges (busy competitor count)
- Enhanced tooltips with competitive insights
- Opportunity filters (threshold slider, quick filters)

### Sprint 3: Opportunity Finder Dashboard ✅
- Tab navigation system
- Prioritized opportunity list cards
- Sort/filter controls (by score, day, customers)
- Actionable recommendations per opportunity
- Export to CSV

---

## Remaining Sprints 🔨

### Sprint 4: Gap Analysis Grid
**Effort**: Medium (1-2 days)  
**Priority**: High  
**Dependencies**: Sprints 1-3

**What to Build**:
- Numerical data table (168 rows = 7 days × 24 hours)
- Columns: Time Slot | PCC % | Market Max % | Gap | Score | Est. Revenue | Top Competitor
- Sortable columns (click header to sort)
- Color-coded gaps (green = opportunity, gray = slow, red = winning)
- Summary metrics panel:
  - Total weekly opportunity: $X,XXX
  - Average gap: XX%
  - Win rate: "You're winning XX% of time slots"
  - Top 5 opportunities (quick summary)
- Drill-down: Click row → open detailed analysis panel
- Export to Excel with formatting

**Key Files**:
- Create: `js/components/gap-grid.js`
- Modify: `index.html` (add Gap Analysis tab content)
- Modify: `css/dashboards.css` (add table styles)

**Reference**: `FUNCTIONAL_SPEC.md` - Feature 3

---

### Sprint 5: Geographic Competitive Map
**Effort**: Large (2-3 days)  
**Priority**: Medium  
**Dependencies**: Sprint 4 (optional)

**What to Build**:
- Interactive Chicago map (Leaflet.js + OpenStreetMap)
- Facility markers (PCC = blue, competitors = red, color-coded by type)
- Catchment area circles (15-min drive time)
- Member density heatmap overlay (anonymized addresses)
- CTA transit lines (Brown/Red Line)
- Station markers with walk times
- Click facility → popup with details + link to heatmap
- Overlap analysis: "X% of SPF catchment overlaps with PCC"

**Data Needed**:
- Chicago GeoJSON boundaries
- CTA transit GeoJSON (from city open data)
- Mock member data (250 anonymized lat/lng points)

**Key Files**:
- Create: `js/components/map.js`
- Create: `data/geo/chicago-boundaries.geojson`
- Create: `data/geo/transit-lines.geojson`
- Create: `data/members-mock.json` (anonymized)
- Modify: `index.html` (add Map view)
- Add: Leaflet.js library

**Reference**: `FUNCTIONAL_SPEC.md` - Feature 4

---

### Sprint 6: Detailed Analysis Panel
**Effort**: Medium (1-2 days)  
**Priority**: High  
**Dependencies**: Sprints 1-5

**What to Build**:
- Slide-in panel from right (480px, scrollable)
- Triggered by: Click any heatmap cell or opportunity card
- Sections:
  1. **Header**: Time slot, opportunity score, quick actions
  2. **Competitive Analysis**: List of busy competitors, market demand
  3. **WHO (Segments)**: Customer breakdown, persona cards
  4. **WHERE (Geography)**: Mini map, overlap stats
  5. **HOW (Accessibility)**: Transit, parking, drive time comparison
  6. **WHY (Advantages)**: What competitors have, what PCC can leverage
  7. **Recommendations**: 2-3 specific actions with confidence levels
- "Create Event" and "Launch Campaign" action buttons

**Key Files**:
- Create: `js/components/analysis-panel.js`
- Modify: `css/components.css` (modal/panel styles)
- Modify: `js/components/heatmap.js` (add click handler)

**Reference**: `FUNCTIONAL_SPEC.md` - Feature 5

---

### Sprint 7: Polish & Export
**Effort**: Medium (1-2 days)  
**Priority**: Medium (before demo)  
**Dependencies**: All previous sprints

**What to Build**:
- **Animations**: Smooth transitions, fade-ins, slide-ups
- **Loading States**: Skeleton loaders, spinners, progress indicators
- **Empty States**: Friendly messages when no data/opportunities
- **Error Handling**: Graceful failures, retry logic
- **Export Features**:
  - Export heatmap as PNG (for presentations)
  - Export opportunity list as PDF report
  - "Share this view" URL generation (bookmarkable state)
- **Accessibility**:
  - Full keyboard navigation
  - Screen reader support (ARIA labels)
  - Focus management in modals
  - High contrast mode toggle
- **Performance**:
  - Lazy load popular times data
  - Debounce filter changes (300ms)
  - Virtual scrolling for long lists
  - Memoize expensive calculations

**Key Files**:
- Modify: All component files (add animations, loading states)
- Create: `js/utils/export.js` (PNG/PDF export logic)
- Modify: `css/main.css` (loading, empty, error states)

**Reference**: `DESIGN_SPEC.md` - Performance & Accessibility sections

---

### Sprint 8 (Optional): Advanced Features
**Effort**: Large (3+ days)  
**Priority**: Low (post-demo)  
**Dependencies**: All previous sprints

**Ideas to Consider**:
- **Real-Time Data**: Connect to live Popular Times API
- **Historical View**: "Compare this week to last week"
- **Forecasting**: Predict next week's opportunities (simple trend analysis)
- **Member Dashboard**: Churn prediction, tier upgrade opportunities
- **A/B Testing Framework**: Track which recommendations work
- **Mobile Optimization**: Touch-friendly interactions
- **Admin Panel**: Upload new data, configure settings
- **Notification System**: Alert when new opportunities appear
- **Collaborative Features**: Comments, shared annotations

---

## Recommended Build Order

### For MVP Demo (Investor Presentation)
1. ✅ Sprint 1 (Foundation) - **DONE**
2. ✅ Sprint 2 (Intelligence Layer) - **DONE**
3. ✅ Sprint 3 (Opportunity List) - **DONE**
4. 🔨 Sprint 4 (Gap Grid) - **NEXT**
5. 🔨 Sprint 7 (Polish) - **BEFORE DEMO**
6. 🔨 Sprint 6 (Analysis Panel) - **NICE TO HAVE**
7. ⏭️ Sprint 5 (Map) - **SKIP FOR MVP**

**Rationale**: Gap Grid + Polish gives you 3 complete, polished views (Heatmap, List, Grid) that tell the full story. Map is impressive but takes longer and less critical for decision-making.

### For Full Feature Set (Post-Demo)
1. ✅ Sprints 1-3 (complete)
2. 🔨 Sprint 4 (Gap Grid)
3. 🔨 Sprint 5 (Map)
4. 🔨 Sprint 6 (Analysis Panel)
5. 🔨 Sprint 7 (Polish)
6. ⏭️ Sprint 8 (Advanced Features)

---

## Time Estimates

**MVP Demo Ready**: 2-3 more days
- Sprint 4: 1 day
- Sprint 7 (Partial): 1 day
- Buffer/testing: 0.5 days

**Full Feature Set**: 5-7 more days
- Sprint 4: 1 day
- Sprint 5: 2-3 days
- Sprint 6: 1 day
- Sprint 7: 1-2 days

---

## Success Checkpoints

After each sprint, verify:
- [ ] No console errors
- [ ] All interactions work as expected
- [ ] Visual quality matches design spec
- [ ] Performance meets targets (< 2 sec load, < 200ms interactions)
- [ ] Generates at least 1 new "aha!" insight
- [ ] Stakeholders can use without training

---

## Questions to Ask Before Building

For each sprint:
1. What's the core user need this solves?
2. What's the minimum viable version?
3. What can be deferred to a later sprint?
4. What data dependencies exist?
5. What's the biggest technical risk?

---

**Use this roadmap to:**
- ✅ Track progress
- ✅ Decide what to build next
- ✅ Estimate time to demo
- ✅ Communicate with stakeholders
- ✅ Generate sprint prompts

---

**End of Sprint Roadmap**