# Prompt for Sprint 10.6: Reactive State Management Architecture

## Context

I'm working on **PCC Yield Optimizer**, a competitive intelligence dashboard for Pickleball Clubhouse Chicago. The app compares PCC's facility utilization against 5 competitors across 6 different dashboard views (Heatmap, Opportunity List, Gap Analysis, Geographic Map, Market Gaps, Positioning Matrix).

## Current Problem

There's a critical architectural issue: **When users check/uncheck facilities in the left filter panel, the dashboards don't update**. The root cause is that each component (Heatmap, OpportunityList, GapGrid) stores its own copy of facility data at initialization and independently calculates the same opportunity scores. There's no single source of truth, so filter changes have no way to propagate.

## What Was Just Completed

I have created a comprehensive sprint specification document:
- **File**: `SPRINT_10.6_Reactive_State_Management.md`
- **Contents**: Complete architectural design for implementing a centralized StateManager with reactive updates using the observer pattern

## Your Task

Please implement **SPRINT_10.6_Reactive_State_Management.md** following the 5-phase plan outlined in the spec:

### Phase 1: StateManager Foundation (2-3 hours)
- Create `js/state/StateManager.js` with observer pattern
- Implement constructor, init(), basic getters, subscribe/unsubscribe/notify
- Add to index.html script loading
- Initialize in main.js

### Phase 2: Move Calculations to StateManager (3-4 hours)
- Implement `_recalculateOpportunities()` in StateManager
- Store results in `this.opportunityScores = new Map()`
- Ensure calculations respect `visibleFacilities` filter

### Phase 3: Refactor Heatmap Component (2-3 hours)
- Remove `calculateOpportunities()` method from heatmap.js
- Make it consume `state.getOpportunityScores()` instead
- Subscribe to `filters:changed` event

### Phase 4: Refactor OpportunityList & GapGrid (3-4 hours)
- Remove calculation logic from both components
- Make them consume state
- Subscribe to filter changes

### Phase 5: Cleanup & Testing (1-2 hours)
- Remove old calculation code
- Test all filter combinations
- Verify all 6 dashboards work correctly

## Important Guidelines

1. **Read the spec first**: Start by reading `SPRINT_10.6_Reactive_State_Management.md` thoroughly
2. **Use Plan Mode**: This is a large refactor - use plan mode to present your implementation approach before coding
3. **Test incrementally**: After each phase, test that both old and new systems work
4. **Branch naming**: Create branch `feat/reactive-state-management`
5. **Preserve backward compatibility**: During phases 1-4, both old and new systems should coexist

## Key Files to Modify

- `js/state/StateManager.js` (NEW - create this)
- `js/components/heatmap.js` (REFACTOR - remove calculations)
- `js/components/opportunity-list.js` (REFACTOR - remove calculations)
- `js/components/gap-analysis-grid.js` (REFACTOR - remove calculations)
- `js/main.js` (UPDATE - initialize StateManager, update handleFilterChange)
- `index.html` (UPDATE - add StateManager script tag)

## Success Criteria

After implementation:
- ✅ Checking/unchecking facilities in filter panel updates ALL dashboards automatically
- ✅ Opportunity scores consistent across Heatmap, Opportunity List, and Gap Analysis
- ✅ Calculation happens once (not 3 times), ~50% performance improvement
- ✅ All existing features still work (exports, tooltips, navigation)
- ✅ No console errors

## Context Files

Before starting, you should read:
1. `SPRINT_10.6_Reactive_State_Management.md` - The complete specification
2. `js/main.js` - Current app initialization and filter handling (lines 34-51 for appState, lines 298-366 for filter handlers)
3. `js/components/heatmap.js` - Current calculation logic (lines 487-533)
4. `js/components/opportunity-list.js` - Current calculation logic (lines 86-140)
5. `js/components/gap-analysis-grid.js` - Current calculation logic (lines 137-218)
6. `js/utils/calculations.js` - Shared calculation function `calculateOpportunityScore()`

## How to Start

Use this exact command to begin:

**"I need to implement SPRINT_10.6_Reactive_State_Management. Please read the sprint spec file first, then enter Plan Mode and present a detailed implementation plan for Phase 1 (StateManager Foundation). After I approve, we'll implement each phase sequentially with testing between phases."**

## Current Branch

We're on branch: `bug_fix_opportunities` (we just fixed a bug where Gap Analysis only compared against SPF instead of all competitors)

Create a new branch for this work: `feat/reactive-state-management`

---

**Note**: This is a foundational refactor that prepares the app for production deployment with API integration, web scraping, and real-time data updates. Take your time and test thoroughly.
