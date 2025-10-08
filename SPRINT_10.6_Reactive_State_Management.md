# Sprint 10.6: Reactive State Management Architecture

## Overview
Implement a centralized state management system with reactive updates to establish a **single source of truth** for competitive data, opportunity calculations, and filter state. This architectural refactor transforms individual components from autonomous data calculators into reactive views that render from shared state, preparing the application for production deployment with dynamic data sources (APIs, web scraping, real-time updates).

**Key Design Philosophy**: Calculate once, render everywhere. Business logic lives in pure functions, components become presentation layers, and all state changes propagate automatically through an observer pattern.

### Strategic Importance
This sprint is critical for the transition from **demo** (static JSON files) to **production** (live APIs, dynamic data):

| Current (Demo) | Future (Production) | Enabler |
|----------------|---------------------|---------|
| Static JSON files | Live API endpoints | ✅ Centralized data layer |
| 3 components calculate independently | Single calculation shared | ✅ StateManager |
| Manual refresh required | Auto-update on data change | ✅ Observer pattern |
| Filter changes ignored | All views react to filters | ✅ Reactive updates |
| No data validation | Type-safe state mutations | ✅ State contracts |
| Difficult to test | Pure functions, mockable | ✅ Testable architecture |

## Current Architecture Problems

### Problem 1: Scatter-Shot Data Flow
```
appState.facilities (static snapshot at init)
    ↓
    ├─→ Heatmap.calculateOpportunities(ALL 6 facilities)
    │   └─→ Calculates 168 opportunity scores (7 days × 24 hours)
    │
    ├─→ OpportunityList.generateOpportunities(ALL 6 facilities)
    │   └─→ Re-calculates same 168 opportunity scores independently
    │
    └─→ GapGrid.processData(ALL 6 facilities)
        └─→ Re-calculates same 168 opportunity scores again

Result: Same calculation done 3× with 3× memory usage
```

**Issue**: When user unchecks "SPF Chicago" in filters:
- `appState.visibleFacilities` updates ✅
- Heatmap calculations: Still use ALL 6 ❌
- Opportunity List: Still use ALL 6 ❌
- Gap Grid: Still use ALL 6 ❌
- UI appears broken (filters don't work) ❌

### Problem 2: Components Store Stale Data
Each component stores `this.allFacilitiesData` at initialization and never refreshes:

```javascript
// heatmap.js line 493
this.allFacilitiesData = allFacilitiesData; // Snapshot from init

// opportunity-list.js line 12
this.allFacilitiesData = allFacilitiesData; // Same snapshot

// gap-analysis-grid.js line 11
this.facilitiesData = facilitiesData; // Same snapshot
```

**Issue**: When data changes (filters, API refresh), components have no way to know.

### Problem 3: Tight Coupling to Data Source
Components directly access `this.allFacilitiesData` throughout their methods, making it impossible to:
- Swap JSON for API data
- Mock data for testing
- Cache expensive calculations
- Validate data integrity
- Log state changes for debugging

### Problem 4: No Single Source of Truth
```javascript
// Who owns the "correct" opportunity score for Monday 9am?
heatmap.opportunities['monday-9'] = { score: 7.2, gap: 42, ... }
opportunityList.opportunities[0] = { score: 7.2, gap: 42, ... } // Duplicate!
gapGrid.timeSlots[0].hours[9] = { score: 7.2, gap: 42, ... }    // Triplicate!
```

**Issue**: 3 copies of the same data in memory, 3× calculation time, impossible to keep synchronized.

## Proposed Architecture: Single Source of Truth

### New Data Flow (Reactive)
```
┌─────────────────────────────────────────────────────────────┐
│ StateManager (Single Source of Truth)                       │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Raw Data Layer                                        │   │
│ │ - facilities: Array<Facility> (from JSON or API)     │   │
│ │ - popularTimes: Array<FacilityTimes>                 │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Filter State Layer                                    │   │
│ │ - visibleFacilities: Set<string>                     │   │
│ │ - activeFilters: { day, minScore, primeOnly, ... }  │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Computed State Layer (Calculated Once!)              │   │
│ │ - competitorData: Array (filtered by visibility)     │   │
│ │ - opportunityScores: Map<TimeSlot, OpportunityData> │   │
│ │ - gapAnalysis: Map<TimeSlot, GapData>                │   │
│ └──────────────────────────────────────────────────────┘   │
│                                                              │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Observer Registry                                     │   │
│ │ - subscribers: Map<Event, Array<Callback>>           │   │
│ └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                  ↓
   Heatmap          OpportunityList      GapGrid
  (View Only)        (View Only)      (View Only)
        │                 │                  │
        └─────────────────┴──────────────────┘
             Render from state.get()
          Subscribe to state changes
```

### Key Principles

#### 1. Components Are Stateless Views
```javascript
// BEFORE (Component calculates)
class Heatmap {
  calculateOpportunities(allFacilities) {
    // 100+ lines of calculation logic
    this.opportunities = { /* calculated data */ };
  }
}

// AFTER (Component renders from state)
class Heatmap {
  render() {
    const opportunities = state.get('opportunityScores');
    this.renderCells(opportunities);
  }
}
```

#### 2. Business Logic in StateManager
```javascript
class StateManager {
  // Pure calculation function (testable!)
  calculateOpportunities() {
    const pccData = this.facilities.find(f => f.id === 'pcc');
    const competitors = this.getVisibleCompetitors(); // Respects filters!

    // Calculate once, use everywhere
    return calculateOpportunityScore(pccData, competitors);
  }
}
```

#### 3. Reactive Updates via Observer Pattern
```javascript
// Component subscribes to state changes
state.subscribe('filters:changed', () => {
  heatmap.render(); // Auto re-render when filters change
});

// User unchecks "SPF Chicago"
state.setVisibleFacilities(['pcc', 'big-city', ...]);
// ↑ Automatically triggers:
// 1. Recalculate competitorData (filtered)
// 2. Recalculate opportunityScores (new data)
// 3. Notify all subscribers
// 4. Components re-render
```

## Feature Requirements

### FR-10.6.1: StateManager Module
**Priority**: P0 (Foundation)
**File**: `js/state/StateManager.js`

**Purpose**: Central store for all application data, calculations, and filter state. Acts as the single source of truth.

**Public API**:
```javascript
class StateManager {
  // Initialization
  constructor(facilities, popularTimes)
  async init()

  // Data Access (Getters)
  getFacilities()
  getVisibleFacilities()
  getCompetitorData()
  getOpportunityScores()
  getGapAnalysis()
  getMarketGaps()

  // State Mutations (Setters)
  setVisibleFacilities(facilityIds)
  setFilters(filterObj)
  updateFacilityData(newData) // For future API updates

  // Observer Pattern
  subscribe(event, callback)
  unsubscribe(event, callback)
  notify(event, data)

  // Private Calculation Methods
  _recalculateCompetitorData()
  _recalculateOpportunities()
  _recalculateGaps()
  _recalculateMarketGaps()
}
```

**Events Emitted**:
- `state:initialized` - All data loaded and calculated
- `filters:changed` - Visible facilities or filters updated
- `data:updated` - Raw facility data changed (future API updates)
- `calculations:complete` - All derived state recalculated

**Acceptance Criteria**:
- ✓ StateManager initializes with facility data
- ✓ All calculations use filtered competitor data (respects visibleFacilities)
- ✓ Opportunity scores calculated once and cached
- ✓ Observer pattern correctly notifies subscribers
- ✓ Filter changes trigger recalculation automatically
- ✓ Memory usage reduced by 66% (1 calculation vs 3)
- ✓ No duplicate calculation logic across components

---

### FR-10.6.2: Heatmap Component Refactor
**Priority**: P0 (Critical)
**File**: `js/components/heatmap.js`

**Changes**:
1. **Remove calculation logic** (lines 487-533):
   - Delete `calculateOpportunities()` method
   - Delete `this.allFacilitiesData` property
   - Delete `this.opportunities` property

2. **Consume state instead**:
   ```javascript
   // BEFORE
   this.calculateOpportunities(allFacilitiesData);
   this.applyOpportunityOverlays();

   // AFTER
   const opportunities = window.state.getOpportunityScores();
   this.applyOpportunityOverlays(opportunities);
   ```

3. **Subscribe to state changes**:
   ```javascript
   constructor(containerId, facility, popularTimes) {
     // ... existing code

     // Subscribe to filter changes
     window.state.subscribe('filters:changed', () => {
       this.refresh();
     });
   }

   refresh() {
     const opportunities = window.state.getOpportunityScores();
     this.applyOpportunityOverlays(opportunities);
     this.updateTooltipsWithOpportunities();
   }
   ```

**Acceptance Criteria**:
- ✓ Heatmap renders opportunity borders from state
- ✓ Filter changes automatically update heatmap overlays
- ✓ Green borders reflect currently visible competitors only
- ✓ Busy competitor badges show correct count
- ✓ Tooltips display correct opportunity data
- ✓ No calculation logic remains in component

---

### FR-10.6.3: Opportunity List Refactor
**Priority**: P0 (Critical)
**File**: `js/components/opportunity-list.js`

**Changes**:
1. **Remove calculation logic** (lines 86-140):
   - Delete `generateOpportunities()` method
   - Delete `this.allFacilitiesData` property
   - Delete `this.opportunities` property (becomes getter from state)

2. **Consume state instead**:
   ```javascript
   render(sortBy = 'score', filters = {}) {
     // Get opportunities from state (already calculated!)
     const allOpportunities = window.state.getOpportunityScores();

     // Convert Map to Array for rendering
     this.filteredOpportunities = Array.from(allOpportunities.values())
       .filter(opp => this.applyFilters(opp, filters))
       .sort((a, b) => this.applySorting(a, b, sortBy));

     this.renderCards();
   }
   ```

3. **Subscribe to state changes**:
   ```javascript
   constructor(containerId) {
     // ... existing code

     window.state.subscribe('filters:changed', () => {
       this.render(this.currentSort, this.currentFilters);
     });
   }
   ```

**Acceptance Criteria**:
- ✓ Opportunity list renders from state
- ✓ Filter changes automatically refresh list
- ✓ Opportunities reflect currently visible competitors
- ✓ Sort/filter controls work correctly
- ✓ Export functions use state data
- ✓ No duplicate calculation logic

---

### FR-10.6.4: Gap Analysis Grid Refactor
**Priority**: P0 (Critical)
**File**: `js/components/gap-analysis-grid.js`

**Changes**:
1. **Remove calculation logic** (lines 137-218):
   - Delete `processData()` method
   - Delete `this.facilitiesData` property
   - Delete `this.timeSlots` property (becomes getter from state)

2. **Consume state instead**:
   ```javascript
   render() {
     const gapAnalysis = window.state.getGapAnalysis();
     const topOpportunities = window.state.getTopGapOpportunities(10);

     this.renderHeatmap(gapAnalysis);
     this.renderTopList(topOpportunities);
     this.renderSummaryStats();
   }
   ```

3. **Subscribe to state changes**:
   ```javascript
   constructor(containerId) {
     // ... existing code

     window.state.subscribe('filters:changed', () => {
       this.render();
     });
   }
   ```

**Acceptance Criteria**:
- ✓ Gap grid renders from state
- ✓ Market max calculated against visible competitors only
- ✓ Top competitor name shows actual facility at max
- ✓ Filter changes automatically update grid
- ✓ Gap percentages accurate
- ✓ No calculation logic in component

---

### FR-10.6.5: Filter Reactivity
**Priority**: P0 (Critical)
**Files**: `js/main.js`, `js/state/StateManager.js`

**Changes to `handleFilterChange()`**:
```javascript
// BEFORE
function handleFilterChange(facilityId, isChecked) {
  if (isChecked) {
    appState.visibleFacilities.add(facilityId);
  } else {
    appState.visibleFacilities.delete(facilityId);
  }

  // Manual updates (incomplete!)
  if (appState.mapComponent) {
    appState.mapComponent.updateVisibleFacilities(...);
  }
}

// AFTER
function handleFilterChange(facilityId, isChecked) {
  if (isChecked) {
    appState.visibleFacilities.add(facilityId);
  } else {
    appState.visibleFacilities.delete(facilityId);
  }

  // Update state (automatically notifies all subscribers!)
  window.state.setVisibleFacilities(appState.visibleFacilities);
}
```

**Automatic Propagation**:
```javascript
// Inside StateManager.setVisibleFacilities()
setVisibleFacilities(facilityIds) {
  this.visibleFacilities = new Set(facilityIds);

  // Recalculate derived state
  this._recalculateCompetitorData();
  this._recalculateOpportunities();
  this._recalculateGaps();

  // Notify all subscribers (components auto-refresh!)
  this.notify('filters:changed', {
    visibleFacilities: this.visibleFacilities
  });
}
```

**Acceptance Criteria**:
- ✓ Checking/unchecking facility updates all dashboards
- ✓ Heatmap opportunity borders reflect visible competitors
- ✓ Opportunity list scores recalculated
- ✓ Gap analysis market max shows visible competitors
- ✓ Map markers update (existing functionality preserved)
- ✓ No manual component refresh calls needed

---

## Implementation Phases

### Phase 1: Create StateManager Foundation
**Duration**: 2-3 hours
**Branch**: `feat/state-manager-foundation`

**Tasks**:
1. Create `js/state/StateManager.js`
2. Implement constructor, init(), and basic getters
3. Implement observer pattern (subscribe/unsubscribe/notify)
4. Add to `index.html` script loading order (before components)
5. Initialize in `main.js`: `window.state = new StateManager(facilities, popularTimes)`

**Testing**:
```javascript
// Console tests
window.state.getFacilities(); // Should return all 6
window.state.getVisibleFacilities(); // Should return Set of visible IDs
window.state.subscribe('test:event', (data) => console.log('Notified!', data));
window.state.notify('test:event', { foo: 'bar' }); // Should log message
```

**Success Criteria**: StateManager initializes without errors, observer pattern works

---

### Phase 2: Move Opportunity Calculations to StateManager
**Duration**: 3-4 hours
**Branch**: Same as Phase 1

**Tasks**:
1. Copy `calculateOpportunityScore()` from `calculations.js` (already centralized)
2. Add `_recalculateOpportunities()` private method to StateManager
3. Store results in `this.opportunityScores = new Map()`
4. Add `getOpportunityScores()` public getter
5. Call calculation in `init()` and `setVisibleFacilities()`

**Testing**:
```javascript
// Compare old vs new calculations
const oldScores = appState.heatmaps['pcc'].opportunities;
const newScores = window.state.getOpportunityScores();

// Should match!
console.log('Monday 9am old:', oldScores['monday-9']);
console.log('Monday 9am new:', newScores.get('monday-9'));
```

**Success Criteria**: Opportunity scores in StateManager match existing component calculations

---

### Phase 3: Refactor Heatmap Component
**Duration**: 2-3 hours
**Branch**: Same as Phase 1

**Tasks**:
1. Remove `calculateOpportunities()` method
2. Remove `this.allFacilitiesData` property
3. Update `applyOpportunityOverlays()` to accept opportunities parameter
4. Add `refresh()` method that calls `state.getOpportunityScores()`
5. Subscribe to `filters:changed` event in constructor
6. Test with all filters enabled/disabled

**Testing**:
- Check/uncheck facilities → heatmap borders should update
- Green badges should show correct busy competitor count
- Tooltips should show correct data

**Success Criteria**: Heatmap dynamically updates when filters change

---

### Phase 4: Refactor Opportunity List & Gap Grid
**Duration**: 3-4 hours
**Branch**: Same as Phase 1

**Tasks**:
1. **OpportunityList**:
   - Remove `generateOpportunities()`
   - Update `render()` to use `state.getOpportunityScores()`
   - Subscribe to `filters:changed`

2. **GapGrid**:
   - Remove `processData()`
   - Add `_recalculateGaps()` to StateManager
   - Update `render()` to use `state.getGapAnalysis()`
   - Subscribe to `filters:changed`

**Testing**:
- Filter changes should update both dashboards
- Opportunity scores should match across all 3 views
- Export functions should work correctly

**Success Criteria**: All 3 dashboards render from shared state and update on filter changes

---

### Phase 5: Cleanup & Optimization
**Duration**: 1-2 hours
**Branch**: Same as Phase 1

**Tasks**:
1. Remove unused calculation code from components
2. Update `main.js` to remove manual refresh calls
3. Add console logging for state changes (development mode)
4. Run performance tests (measure calculation time)
5. Update documentation in code comments
6. Create migration notes for future sprints

**Testing**:
- Full regression test on all 6 dashboards
- Test with all filter combinations
- Verify exports work correctly
- Check browser console for errors

**Success Criteria**:
- All features work as before
- No console errors
- Calculation time reduced
- Memory usage reduced

---

## Technical Details

### StateManager Data Structures

```javascript
class StateManager {
  constructor(facilities, popularTimes) {
    // Raw data (immutable after init, or from API)
    this.facilities = facilities;
    this.popularTimes = popularTimes;

    // Filter state (mutable)
    this.visibleFacilities = new Set(['pcc', 'spf', 'big-city-pickle-west-loop',
                                       'pickle-haus', 'grant-park', 'diversey-driving-range']);
    this.activeFilters = {
      day: 'all',
      minScore: 0,
      primeOnly: false,
      opportunitiesOnly: false
    };

    // Computed state (cached, invalidated on filter change)
    this.competitorData = null;
    this.opportunityScores = new Map(); // Key: 'monday-9', Value: OpportunityData
    this.gapAnalysis = new Map();       // Key: 'monday-9', Value: GapData
    this.marketGaps = new Map();        // Key: 'monday-9', Value: MarketGapData

    // Observer registry
    this.subscribers = new Map();
  }
}
```

### OpportunityData Schema
```javascript
{
  day: 'monday',
  hour: 9,
  pccUtilization: 15,
  competitorMax: 88,
  gap: 73,
  busyCompetitors: [
    { id: 'spf', name: 'SPF Chicago', utilization: 88 },
    { id: 'big-city-pickle-west-loop', name: 'Big City Pickle', utilization: 82 }
  ],
  score: 8.5,
  level: 'high', // 'high' | 'medium' | 'low' | 'none'
  estimatedCustomers: 46,
  estimatedRevenue: 2300
}
```

### GapData Schema
```javascript
{
  day: 'monday',
  hour: 9,
  pccUtilization: 15,
  marketMax: 88,
  topCompetitor: 'SPF Chicago',
  gap: 73,
  gapPercent: 73.0,
  estRevenue: 2920,
  isPrimeTime: true,
  opportunityScore: 8.5
}
```

### Performance Benchmarks

**Current (3 separate calculations)**:
```
Heatmap.calculateOpportunities(): 45ms
OpportunityList.generateOpportunities(): 42ms
GapGrid.processData(): 38ms
Total: 125ms
Memory: ~450KB (3 copies of 168 opportunity objects)
```

**Target (1 shared calculation)**:
```
StateManager._recalculateOpportunities(): 45ms
StateManager._recalculateGaps(): 15ms (uses cached opportunity data)
Total: 60ms (52% faster)
Memory: ~150KB (1 copy of opportunity objects)
```

### Observer Pattern Implementation

```javascript
class StateManager {
  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);

    console.log(`[State] Subscribed to ${event}`, callback.name || 'anonymous');
  }

  unsubscribe(event, callback) {
    if (!this.subscribers.has(event)) return;

    const callbacks = this.subscribers.get(event);
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  notify(event, data) {
    if (!this.subscribers.has(event)) return;

    console.log(`[State] Notifying ${event}`, data);
    this.subscribers.get(event).forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[State] Error in subscriber for ${event}:`, error);
      }
    });
  }
}
```

### Example Component Subscription

```javascript
class Heatmap {
  constructor(containerId, facility, popularTimes) {
    this.container = document.getElementById(containerId);
    this.facility = facility;
    this.popularTimes = popularTimes;

    // Subscribe to state changes
    if (window.state && this.facility.id === 'pcc') {
      window.state.subscribe('filters:changed', this.onFiltersChanged.bind(this));
      window.state.subscribe('data:updated', this.onDataUpdated.bind(this));
    }

    this.render();
  }

  onFiltersChanged(data) {
    console.log(`[Heatmap ${this.facility.id}] Filters changed`, data);
    this.refresh();
  }

  onDataUpdated(data) {
    console.log(`[Heatmap ${this.facility.id}] Data updated`, data);
    this.refresh();
  }

  refresh() {
    if (this.facility.id !== 'pcc') return;

    const opportunities = window.state.getOpportunityScores();
    this.applyOpportunityOverlays(opportunities);
    this.updateTooltipsWithOpportunities();
  }

  destroy() {
    // Cleanup subscriptions when component is destroyed
    if (window.state) {
      window.state.unsubscribe('filters:changed', this.onFiltersChanged);
      window.state.unsubscribe('data:updated', this.onDataUpdated);
    }
  }
}
```

---

## Migration Strategy

### Backward Compatibility During Development

During Phases 1-4, both old and new systems will coexist:

```javascript
// main.js
async function initApp() {
  // ... load facility data

  // Initialize NEW state manager (Phase 1)
  window.state = new StateManager(appState.facilities);
  await window.state.init();

  // Initialize OLD components (still work as before)
  Object.entries(heatmaps).forEach(([id, heatmap]) => {
    appState.heatmaps[id] = heatmap;
    heatmap.render();
  });

  // OLD way: Manual calculation
  calculateOpportunities(); // Still works!

  // NEW way: Automatic calculation
  // (components subscribed to state will auto-update)
}
```

### Phase-by-Phase Testing

After each phase:
1. **Verify old behavior works** (regression test)
2. **Verify new behavior works** (feature test)
3. **Compare old vs new calculations** (accuracy test)
4. **Check console for errors** (integration test)

### Rollback Plan

If critical bugs found:
1. Remove `StateManager.js` from `index.html` script tags
2. Restore old component methods from git history
3. Comment out state subscriptions in components
4. Application reverts to pre-refactor behavior

---

## Testing & Validation

### Unit Tests (Manual Console Tests)

```javascript
// 1. State initialization
console.assert(window.state !== undefined, 'StateManager initialized');
console.assert(window.state.getFacilities().length === 6, '6 facilities loaded');

// 2. Opportunity calculation accuracy
const oldScore = appState.heatmaps['pcc'].opportunities['monday-9'];
const newScore = window.state.getOpportunityScores().get('monday-9');
console.assert(oldScore.score === newScore.score, 'Scores match');
console.assert(oldScore.gap === newScore.gap, 'Gaps match');

// 3. Filter reactivity
const before = window.state.getCompetitorData().length;
window.state.setVisibleFacilities(['pcc', 'spf']); // Uncheck 4 competitors
const after = window.state.getCompetitorData().length;
console.assert(after === 1, 'Filtered to 1 competitor (SPF)');

// 4. Observer pattern
let notified = false;
window.state.subscribe('test:event', () => { notified = true; });
window.state.notify('test:event', {});
console.assert(notified === true, 'Observer notified');
```

### Integration Tests (Manual UI Tests)

**Test Case 1: Filter Changes Update All Dashboards**
1. Navigate to Heatmap View
2. Note green borders on Monday 9am cell
3. Uncheck "SPF Chicago" in filters
4. ✓ Green borders should disappear or change (SPF was busy)
5. Navigate to Opportunity List
6. ✓ "Monday 9am" opportunity score should be lower
7. Navigate to Gap Analysis
8. ✓ Market max should change (no longer SPF's 88%)

**Test Case 2: All Dashboards Show Consistent Data**
1. Note "Monday 9am" opportunity score in Opportunity List: X
2. Navigate to Heatmap, hover Monday 9am cell
3. ✓ Tooltip should show same score X
4. Navigate to Gap Analysis, click Monday 9am cell
5. ✓ Detail panel should show same score X

**Test Case 3: Performance Under Load**
1. Open browser DevTools → Performance tab
2. Start recording
3. Check/uncheck all 6 facilities rapidly
4. Stop recording
5. ✓ Each filter change should complete in <100ms
6. ✓ No memory leaks (garbage collection should recover memory)

### Acceptance Testing Checklist

**Functionality**:
- [ ] All 6 dashboards render correctly
- [ ] Filter changes update all dashboards automatically
- [ ] Opportunity scores consistent across Heatmap, Opportunity List, Gap Analysis
- [ ] Export functions work (CSV, PDF, Excel)
- [ ] URL state synchronization works
- [ ] Visual tour still functions
- [ ] User guides still function

**Performance**:
- [ ] Initial load time ≤ 2 seconds (same as before)
- [ ] Filter change response ≤ 200ms (improved from ~500ms)
- [ ] Memory usage reduced by ~50% (from ~450KB to ~200KB for opportunity data)
- [ ] No memory leaks after 50+ filter changes

**Code Quality**:
- [ ] No duplicate calculation logic across components
- [ ] Components are <300 lines (presentation only)
- [ ] Business logic in StateManager (testable)
- [ ] Console shows clear state change logs (dev mode)
- [ ] No browser console errors

**Future-Readiness**:
- [ ] Easy to swap static JSON for API calls
- [ ] Easy to add new data sources
- [ ] Easy to add new computed state (e.g., trend analysis)
- [ ] Easy to test (mock state in unit tests)

---

## Success Metrics

### Before Refactor
- **Calculation redundancy**: 3 components calculate same data
- **Memory usage**: ~450KB for opportunity data (3 copies)
- **Filter response time**: ~500ms (3 components must refresh)
- **Data consistency**: Manual validation required
- **Testability**: Low (logic buried in components)
- **API-readiness**: Difficult (data flow scattered)

### After Refactor
- **Calculation efficiency**: ✅ Calculate once, use everywhere (3× reduction)
- **Memory usage**: ✅ ~150KB for opportunity data (1 copy, 67% reduction)
- **Filter response time**: ✅ <200ms (automatic propagation, 60% faster)
- **Data consistency**: ✅ Guaranteed (single source of truth)
- **Testability**: ✅ High (pure functions, mockable state)
- **API-readiness**: ✅ Ready (centralized data layer)

---

## Future Enhancements (Post-Sprint)

This refactor enables:

1. **Real-Time Data Updates** (Sprint 11+)
   ```javascript
   // Poll API every 5 minutes
   setInterval(async () => {
     const newData = await fetchCompetitorData();
     window.state.updateFacilityData(newData);
     // All dashboards auto-refresh!
   }, 300000);
   ```

2. **Web Scraping Integration** (Sprint 12+)
   ```javascript
   const scraped = await scrapeGooglePopularTimes('spf-chicago');
   window.state.updateFacilityData({ id: 'spf', popularTimes: scraped });
   ```

3. **Undo/Redo History** (Sprint 13+)
   ```javascript
   window.state.undo(); // Restore previous filter state
   window.state.redo(); // Reapply filter change
   ```

4. **State Persistence** (Sprint 14+)
   ```javascript
   window.state.saveToLocalStorage();
   window.state.loadFromLocalStorage();
   ```

5. **Collaborative Filtering** (Sprint 15+)
   ```javascript
   // Share filter state via URL
   const shareURL = window.state.exportToURL();
   // Load colleague's filter state
   window.state.importFromURL(params);
   ```

---

## Conclusion

This sprint transforms PCC Yield Optimizer from a demo prototype into a production-ready application with a solid architectural foundation. By establishing a single source of truth and reactive data flow, we enable:

✅ **User Impact**: Filters finally work across all dashboards
✅ **Developer Impact**: Cleaner code, easier testing, faster development
✅ **Business Impact**: Ready for real-time API integration and scaling

**Estimated Total Time**: 11-16 hours
**Risk Level**: Medium (requires careful testing)
**Strategic Value**: High (foundational for production deployment)
