# Sprint 10.5: In-App User Guide System

## Overview
Implement contextual, collapsible user guides for all 6 dashboard tabs to improve feature discoverability, reduce time-to-value, and guide users through the analysis workflow. Each guide appears at the top of its respective dashboard (below the sticky header but above main content) as an accordion that users can expand/collapse and whose state persists across sessions.

**Key Design Philosophy**: Guides are **contextual, actionable, and workflow-oriented**. Rather than explaining features in isolation, each guide provides 3-5 concrete steps that lead the user to a business decision or direct them to the next dashboard in their analysis journey.

### Design Rationale

| Aspect | ❌ Traditional Help Documentation | ✅ In-App Contextual Guides |
|--------|----------------------------------|----------------------------|
| **Discoverability** | Hidden in help menu, rarely accessed | Always visible at top of each dashboard |
| **Context** | Generic explanations | Specific to current dashboard's purpose |
| **Workflow** | Lists features | Guides users through analysis process |
| **Accessibility** | Requires leaving current view | Remains open while working |
| **Persistence** | No state memory | Remembers open/closed preference per tab |
| **Visual Design** | Separate help pages | Integrated accordion matching design system |

## Objectives
- **Reduce learning curve**: New users understand each dashboard's purpose immediately
- **Improve workflow efficiency**: Guide users through multi-dashboard analysis process
- **Increase feature adoption**: Highlight underutilized features in context
- **Reduce support requests**: Provide answers at point of need
- **Maintain clean UI**: Collapsible design doesn't clutter interface when not needed

## Feature Requirements

### FR-10.5.1: Heatmap View User Guide
**Priority**: P0 (Critical)
**Dashboard**: 📊 Heatmap View (`data-view="heatmap"`)

**Purpose Statement**:
"Identify when competitors are at peak capacity while PCC has available courts—these are your prime growth opportunities."

**Step-by-Step Instructions** (5 steps):

1. **🟢 Look for green borders**: High-opportunity time slots where PCC has capacity and 2+ competitors are busy
2. **📊 Compare patterns**: Review PCC's heatmap against competitors to spot systematic gaps (e.g., PCC empty Tuesday evenings while SPF/Big City are full)
3. **👥 Check busy competitor count**: Click the green badge number to see exactly which facilities are at capacity
4. **🎯 Focus on recurring gaps**: Prioritize weekly patterns over one-time occurrences
5. **➡️ Next step**: Visit **Opportunity List** to see these time slots scored and ranked by revenue potential

**Expected Outcome**: User identifies 3-5 recurring time slots worth investigating further

**Acceptance Criteria**:
- ✓ Guide appears immediately below dashboard tabs navigation
- ✓ Default state: Collapsed on first visit
- ✓ Accordion opens/closes smoothly with chevron icon rotation
- ✓ All 5 steps clearly numbered and scannable
- ✓ "Next step" link navigates to Opportunity List tab
- ✓ State persists in localStorage (`userGuide_heatmap_expanded: true/false`)

---

### FR-10.5.2: Opportunity List User Guide
**Priority**: P0 (Critical)
**Dashboard**: ✨ Opportunity List (`data-view="opportunity"`)

**Purpose Statement**:
"Prioritize your marketing and operational efforts by focusing on the highest-scoring opportunities where demand exists but PCC is underutilized."

**Step-by-Step Instructions** (4 steps):

1. **🏆 Start at the top**: Opportunities are pre-sorted by score (0-10). The highest scores represent the easiest wins
2. **📋 Read the WHO/WHERE/HOW/WHY**: Each card breaks down customer segments (WHO), geographic overlap (WHERE), marketing channels (HOW), and conversion drivers (WHY)
3. **✅ Select opportunities to act on**: Click "Create Campaign" or export the top 3-5 opportunities for your marketing plan
4. **➡️ Next step**: Visit **Gap Analysis** to see the revenue potential of filling these time slots

**Expected Outcome**: User identifies 2-3 opportunities to pursue with specific marketing actions

**Acceptance Criteria**:
- ✓ Guide appears below dashboard tabs
- ✓ Default state: Expanded on first visit (since this is primary action dashboard)
- ✓ "Create Campaign" button reference matches actual UI
- ✓ Link to Gap Analysis dashboard functional
- ✓ State persists per user preference

---

### FR-10.5.3: Gap Analysis User Guide
**Priority**: P0 (Critical)
**Dashboard**: 📈 Gap Analysis (`data-view="gap-analysis"`)

**Purpose Statement**:
"Quantify the revenue opportunity by comparing PCC's utilization against market maximum. Each percentage point of gap represents potential new memberships."

**Step-by-Step Instructions** (4 steps):

1. **📊 Find the largest gaps**: Red cells show where PCC lags furthest behind market max (e.g., -35% on Thursday mornings = 35% of potential demand unserved)
2. **💰 Calculate potential revenue**: Each 10% utilization increase ≈ 40 new members @ $50/mo = $24k annual recurring revenue
3. **🔍 Cross-reference with Opportunity List**: The biggest gaps should align with top opportunities—if not, investigate why
4. **➡️ Next step**: Visit **Geographic Map** to understand if gaps are due to location/accessibility issues

**Expected Outcome**: User quantifies 2-3 time slots with $15k+ annual revenue potential

**Acceptance Criteria**:
- ✓ Guide appears below dashboard tabs
- ✓ Default state: Collapsed
- ✓ Revenue calculation formula is accurate (based on 400-member target)
- ✓ Cross-reference instruction helps users connect data across dashboards
- ✓ State persists in localStorage

---

### FR-10.5.4: Geographic Map User Guide
**Priority**: P1 (High)
**Dashboard**: 🗺️ Geographic Map (`data-view="map"`)

**Purpose Statement**:
"Understand the geographic dynamics of competition—where your competitors draw members from and how transit accessibility affects market reach."

**Step-by-Step Instructions** (5 steps):

1. **📍 Review facility locations**: PCC (blue) vs. competitors. Note proximity and clustering (e.g., West Loop has 3 facilities within 0.5 miles)
2. **⭕ Examine catchment areas**: 15-minute drive-time circles show each facility's primary market. Look for overlap with PCC
3. **🚇 Check CTA transit lines**: Green/Orange/Blue lines affect accessibility. Facilities near transit capture broader demographics
4. **🔥 View member density heatmap**: Red areas = high pickleball demand. Is PCC positioned in a high-density zone?
5. **➡️ Next step**: Visit **Market Gaps** to find specific times when geographic advantages matter most

**Expected Outcome**: User understands why certain competitors capture more demand and identifies location-based opportunities

**Acceptance Criteria**:
- ✓ Guide appears below dashboard tabs
- ✓ Default state: Collapsed
- ✓ All map features (catchment, transit, heatmap) referenced are implemented
- ✓ Instructions match actual map layer toggle names
- ✓ State persists per user preference

---

### FR-10.5.5: Market Gaps User Guide
**Priority**: P1 (High)
**Dashboard**: 🎯 Market Gaps (`data-view="market-gap"`)

**Purpose Statement**:
"Discover unserved market demand by identifying times when 4+ competitors are closed or at capacity—these are golden opportunities for PCC."

**Step-by-Step Instructions** (4 steps):

1. **🔴 Look for dark red cells**: These indicate 5-6 competitors unavailable simultaneously (e.g., Monday 6am: most competitors closed, but early-bird demand exists)
2. **⏰ Identify systematic patterns**: Weekend mornings, weekday early evenings often show high competitor unavailability
3. **💡 Strategic insight**: If PCC is also closed during high-gap times, consider extended hours. If PCC is open, market aggressively
4. **➡️ Next step**: Visit **Positioning** to understand how to differentiate PCC's messaging when competitors are unavailable

**Expected Outcome**: User finds 3-5 time slots where market demand is unserved and PCC can capture share

**Acceptance Criteria**:
- ✓ Guide appears below dashboard tabs
- ✓ Default state: Collapsed
- ✓ Color scale reference (dark red = 5-6 competitors) matches actual heatmap legend
- ✓ Strategic recommendations are actionable
- ✓ State persists in localStorage

---

### FR-10.5.6: Competitive Positioning User Guide
**Priority**: P1 (High)
**Dashboard**: 📈 Positioning (`data-view="competitive-matrix"`)

**Purpose Statement**:
"Visualize PCC's strategic position in the market on price vs. amenities to identify competitive advantages and inform messaging strategy."

**Step-by-Step Instructions** (5 steps):

1. **📌 Locate PCC (blue bubble)**: Note your position relative to competitors. Bubble size = court count
2. **💵 Price positioning**: Left = budget-friendly, Right = premium. Where does PCC sit? (Target: mid-market at ~$50/mo)
3. **⭐ Amenities comparison**: Higher = more amenities. PCC's unique features (bar, café, pro shop) should position you higher
4. **🎯 Strategic advantage**: If you're in the "middle ground" (moderate price, high amenities), message as "premium experience without premium price"
5. **✅ Final action**: Use these insights to refine your marketing campaigns from the Opportunity List

**Expected Outcome**: User understands PCC's competitive positioning and can articulate differentiation strategy

**Acceptance Criteria**:
- ✓ Guide appears below dashboard tabs
- ✓ Default state: Collapsed
- ✓ Axis labels (Price, Amenities) match actual chart
- ✓ PCC target positioning ($50/mo, high amenities) is accurate per business plan
- ✓ State persists per user preference

---

## Component Architecture

### Component: `UserGuide.js`
**Location**: `js/components/user-guide.js` (NEW)

**Purpose**: Manages user guide accordions across all dashboards, handles expand/collapse state, and persists preferences to localStorage.

**Class Structure**:
```javascript
class UserGuide {
  /**
   * User Guide Component
   * @param {string} dashboardView - The dashboard ID (e.g., 'heatmap', 'opportunity')
   * @param {Object} guideContent - { purpose, steps, nextAction }
   */
  constructor(dashboardView, guideContent) {
    this.dashboardView = dashboardView;
    this.guideContent = guideContent;
    this.storageKey = `userGuide_${dashboardView}_expanded`;
    this.container = null;
    this.isExpanded = this.loadState();
  }

  /**
   * Render the guide accordion into specified container
   * @param {string} containerId - DOM element ID to render into
   */
  render(containerId) {
    // Create accordion HTML
    // Attach event listeners
    // Set initial state
  }

  /**
   * Toggle accordion open/closed
   */
  toggle() {
    this.isExpanded = !this.isExpanded;
    this.updateUI();
    this.saveState();
  }

  /**
   * Update UI to reflect expanded/collapsed state
   */
  updateUI() {
    // Rotate chevron icon
    // Show/hide content with smooth animation
    // Update ARIA attributes
  }

  /**
   * Load state from localStorage
   * @returns {boolean} - True if should be expanded
   */
  loadState() {
    const saved = localStorage.getItem(this.storageKey);
    // Default: expanded for 'opportunity', collapsed for others
    return saved !== null ? saved === 'true' : this.dashboardView === 'opportunity';
  }

  /**
   * Save state to localStorage
   */
  saveState() {
    localStorage.setItem(this.storageKey, this.isExpanded.toString());
  }

  /**
   * Navigate to another dashboard (for "Next step" links)
   * @param {string} targetView - Dashboard to navigate to
   */
  navigateTo(targetView) {
    const tabButton = document.querySelector(`[data-view="${targetView}"]`);
    if (tabButton) tabButton.click();
  }
}
```

**Helper Function**: `GuideContent` object
```javascript
const GuideContent = {
  heatmap: {
    icon: '📊',
    purpose: 'Identify when competitors are at peak capacity while PCC has available courts—these are your prime growth opportunities.',
    steps: [
      { icon: '🟢', text: 'Look for green borders: High-opportunity time slots where PCC has capacity and 2+ competitors are busy' },
      { icon: '📊', text: 'Compare patterns: Review PCC\'s heatmap against competitors to spot systematic gaps' },
      { icon: '👥', text: 'Check busy competitor count: Click the green badge number to see which facilities are at capacity' },
      { icon: '🎯', text: 'Focus on recurring gaps: Prioritize weekly patterns over one-time occurrences' }
    ],
    nextAction: {
      text: 'Visit **Opportunity List** to see these time slots scored and ranked by revenue potential',
      targetView: 'opportunity'
    }
  },
  opportunity: {
    icon: '✨',
    purpose: 'Prioritize your marketing and operational efforts by focusing on the highest-scoring opportunities.',
    steps: [
      { icon: '🏆', text: 'Start at the top: Opportunities are pre-sorted by score (0-10)' },
      { icon: '📋', text: 'Read the WHO/WHERE/HOW/WHY: Each card provides complete context' },
      { icon: '✅', text: 'Select opportunities: Click "Create Campaign" or export the top 3-5 for marketing' }
    ],
    nextAction: {
      text: 'Visit **Gap Analysis** to see the revenue potential of filling these time slots',
      targetView: 'gap-analysis'
    }
  },
  gapAnalysis: {
    icon: '📈',
    purpose: 'Quantify revenue opportunity by comparing PCC utilization against market maximum.',
    steps: [
      { icon: '📊', text: 'Find largest gaps: Red cells show where PCC lags behind market max' },
      { icon: '💰', text: 'Calculate revenue: Each 10% increase ≈ 40 members = $24k annual recurring' },
      { icon: '🔍', text: 'Cross-reference with Opportunity List: Biggest gaps should align with top opportunities' }
    ],
    nextAction: {
      text: 'Visit **Geographic Map** to understand if gaps are location-related',
      targetView: 'map'
    }
  },
  map: {
    icon: '🗺️',
    purpose: 'Understand geographic dynamics: where competitors draw members from and how transit affects reach.',
    steps: [
      { icon: '📍', text: 'Review facility locations: Note proximity and clustering patterns' },
      { icon: '⭕', text: 'Examine catchment areas: 15-min drive circles show primary markets' },
      { icon: '🚇', text: 'Check CTA transit: Facilities near transit capture broader demographics' },
      { icon: '🔥', text: 'View member density: Red areas = high demand. Is PCC well-positioned?' }
    ],
    nextAction: {
      text: 'Visit **Market Gaps** to find when geographic advantages matter most',
      targetView: 'market-gap'
    }
  },
  marketGap: {
    icon: '🎯',
    purpose: 'Discover unserved demand when 4+ competitors are closed or at capacity.',
    steps: [
      { icon: '🔴', text: 'Look for dark red cells: 5-6 competitors unavailable simultaneously' },
      { icon: '⏰', text: 'Identify patterns: Weekend mornings, weekday evenings often show gaps' },
      { icon: '💡', text: 'Strategic insight: Market PCC aggressively when competitors are unavailable' }
    ],
    nextAction: {
      text: 'Visit **Positioning** to craft differentiated messaging',
      targetView: 'competitive-matrix'
    }
  },
  competitiveMatrix: {
    icon: '📈',
    purpose: 'Visualize PCC\'s strategic position on price vs. amenities to inform messaging.',
    steps: [
      { icon: '📌', text: 'Locate PCC (blue bubble): Note position relative to competitors' },
      { icon: '💵', text: 'Price positioning: Mid-market target (~$50/mo) balances access and value' },
      { icon: '⭐', text: 'Amenities comparison: PCC\'s bar/café/pro shop = high amenity score' },
      { icon: '🎯', text: 'Strategic advantage: "Premium experience without premium price"' }
    ],
    nextAction: {
      text: 'Return to **Opportunity List** to apply these insights to campaigns',
      targetView: 'opportunity'
    }
  }
};
```

---

## HTML Structure

### Accordion Markup (for each dashboard)

```html
<!-- User Guide Accordion (positioned after dashboard tabs, before content) -->
<div class="user-guide-container" id="user-guide-{dashboardView}">
  <div class="user-guide-accordion">
    <!-- Header (always visible, clickable) -->
    <button class="user-guide-header" aria-expanded="false" aria-controls="user-guide-content-{dashboardView}">
      <div class="user-guide-header-left">
        <span class="user-guide-icon" role="img" aria-label="Guide icon">📖</span>
        <span class="user-guide-title">How to use this dashboard</span>
      </div>
      <div class="user-guide-header-right">
        <svg class="user-guide-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </button>

    <!-- Content (collapsible) -->
    <div class="user-guide-content" id="user-guide-content-{dashboardView}" aria-hidden="true">
      <div class="user-guide-content-inner">
        <!-- Purpose -->
        <div class="user-guide-purpose">
          <p>{purpose}</p>
        </div>

        <!-- Steps -->
        <div class="user-guide-steps">
          <h4 class="user-guide-steps-title">Follow these steps:</h4>
          <ol class="user-guide-steps-list">
            <li class="user-guide-step">
              <span class="step-icon">{icon}</span>
              <span class="step-text">{text}</span>
            </li>
            <!-- Repeat for each step -->
          </ol>
        </div>

        <!-- Next Action -->
        <div class="user-guide-next-action">
          <p>
            <strong>➡️ Next step:</strong>
            <button class="user-guide-link" data-target-view="{targetView}">
              {nextActionText}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Placement in HTML**:
Insert immediately after `<nav class="dashboard-tabs">` closing tag and before dashboard content begins.

Example for Heatmap View:
```html
<nav class="dashboard-tabs">
  <!-- tabs here -->
</nav>

<!-- NEW: User Guide Accordion -->
<div class="user-guide-container" id="user-guide-heatmap">
  <!-- accordion markup -->
</div>

<!-- Existing dashboard content -->
<div id="heatmap-view" class="dashboard-view active">
  <div class="view-header">
    <!-- existing header -->
  </div>
  <!-- rest of content -->
</div>
```

---

## CSS Specifications

### File: `css/user-guide.css` (NEW)

```css
/* ===========================
   User Guide Accordion Styles
   =========================== */

/* Container */
.user-guide-container {
  margin: 0 0 var(--space-lg) 0;
  padding: 0;
}

/* Accordion Card */
.user-guide-accordion {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 150ms ease;
}

.user-guide-accordion:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Header (Clickable) */
.user-guide-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background: linear-gradient(135deg, #F0F7FF 0%, #E8F4FD 100%);
  border: none;
  cursor: pointer;
  transition: background 150ms ease;
}

.user-guide-header:hover {
  background: linear-gradient(135deg, #E3F2FF 0%, #D6EBFA 100%);
}

.user-guide-header:focus {
  outline: 2px solid var(--color-brand-blue);
  outline-offset: -2px;
}

.user-guide-header-left {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.user-guide-icon {
  font-size: 20px;
}

.user-guide-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--color-brand-blue);
}

.user-guide-header-right {
  display: flex;
  align-items: center;
}

.user-guide-chevron {
  color: var(--color-brand-blue);
  transition: transform 200ms ease;
}

/* Chevron rotation when expanded */
.user-guide-header[aria-expanded="true"] .user-guide-chevron {
  transform: rotate(180deg);
}

/* Content (Collapsible) */
.user-guide-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-out;
}

.user-guide-content[aria-hidden="false"] {
  max-height: 1000px; /* Large enough for any content */
}

.user-guide-content-inner {
  padding: var(--space-lg);
  padding-top: var(--space-md);
}

/* Purpose Statement */
.user-guide-purpose {
  margin-bottom: var(--space-lg);
}

.user-guide-purpose p {
  font-size: var(--font-size-body);
  line-height: 1.6;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* Steps */
.user-guide-steps {
  margin-bottom: var(--space-lg);
}

.user-guide-steps-title {
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
}

.user-guide-steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.user-guide-step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  transition: background 150ms ease;
}

.user-guide-step:hover {
  background: var(--color-bg-hover);
}

.step-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.step-text {
  font-size: var(--font-size-body);
  line-height: 1.5;
  color: var(--color-text-primary);
}

/* Next Action */
.user-guide-next-action {
  padding: var(--space-md);
  background: #FFF4E6;
  border-left: 4px solid var(--color-brand-blue);
  border-radius: var(--radius-md);
}

.user-guide-next-action p {
  font-size: var(--font-size-body);
  line-height: 1.6;
  color: var(--color-text-primary);
  margin: 0;
}

.user-guide-next-action strong {
  color: var(--color-brand-blue);
  font-weight: var(--font-weight-semibold);
}

.user-guide-link {
  background: none;
  border: none;
  color: var(--color-brand-blue);
  font-weight: var(--font-weight-semibold);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  transition: color 150ms ease;
}

.user-guide-link:hover {
  color: #003F7D;
}

.user-guide-link:focus {
  outline: 2px solid var(--color-brand-blue);
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .user-guide-header {
    padding: var(--space-sm) var(--space-md);
  }

  .user-guide-title {
    font-size: var(--font-size-body);
  }

  .user-guide-content-inner {
    padding: var(--space-md);
  }

  .step-text {
    font-size: var(--font-size-small);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .user-guide-content,
  .user-guide-chevron,
  .user-guide-step {
    transition: none;
  }
}

/* Print Styles */
@media print {
  .user-guide-accordion {
    border: 1px solid #000;
  }

  .user-guide-content {
    max-height: none !important;
  }

  .user-guide-chevron {
    display: none;
  }
}
```

---

## localStorage Schema

### Storage Keys (per dashboard):
```javascript
{
  "userGuide_heatmap_expanded": "false",          // boolean as string
  "userGuide_opportunity_expanded": "true",       // default expanded
  "userGuide_gap-analysis_expanded": "false",
  "userGuide_map_expanded": "false",
  "userGuide_market-gap_expanded": "false",
  "userGuide_competitive-matrix_expanded": "false"
}
```

**Default Behavior**:
- Opportunity List: Expanded by default (primary action dashboard)
- All others: Collapsed by default (preserve screen space)

**Persistence Logic**:
- On page load: Check localStorage for saved state
- If no saved state: Use default (expanded for opportunity, collapsed for others)
- On toggle: Save new state immediately
- State is per-dashboard (user can have different preferences for each)

---

## Implementation Phases

### Phase 10.5.1: Core Component & CSS (2 hours)
**Objective**: Build reusable UserGuide component and styling

**Tasks**:
1. Create `js/components/user-guide.js` with class structure
2. Create `css/user-guide.css` with complete styling
3. Implement expand/collapse animation with ARIA attributes
4. Add localStorage persistence logic
5. Test in isolation with sample content

**Deliverable**: Functional accordion component

---

### Phase 10.5.2: Content Integration (1.5 hours)
**Objective**: Add guide content for all 6 dashboards

**Tasks**:
1. Create `GuideContent` object with all 6 dashboards
2. Insert HTML containers in `index.html` for each dashboard view
3. Initialize UserGuide instances for each dashboard in `main.js`
4. Verify content accuracy against actual dashboard features
5. Test navigation links between dashboards

**Deliverable**: All 6 guides rendered with correct content

---

### Phase 10.5.3: Integration & Polish (1 hour)
**Objective**: Ensure guides integrate smoothly with existing UI

**Tasks**:
1. Adjust spacing between guide and dashboard content
2. Ensure responsive behavior on mobile/tablet
3. Test keyboard navigation (Tab, Enter, Escape)
4. Verify ARIA labels for screen readers
5. Test localStorage persistence across page reloads

**Deliverable**: Polished, accessible guides

---

### Phase 10.5.4: Testing & Refinement (0.5 hours)
**Objective**: Cross-browser testing and edge case handling

**Tasks**:
1. Test on Chrome, Firefox, Safari
2. Test with screen reader (VoiceOver or NVDA)
3. Test localStorage edge cases (quota exceeded, disabled)
4. Verify print styles work correctly
5. Check prefers-reduced-motion support

**Deliverable**: Production-ready feature

---

## Acceptance Criteria (Full Sprint)

### Functional Requirements
- [ ] User guide appears on all 6 dashboard tabs
- [ ] Accordion expands/collapses smoothly on click
- [ ] Chevron icon rotates 180° when expanded
- [ ] State persists in localStorage per dashboard
- [ ] Default state: Opportunity expanded, others collapsed
- [ ] "Next step" links navigate to correct dashboard
- [ ] Keyboard accessible (Tab, Enter, Escape)
- [ ] No JavaScript errors in console

### Content Requirements
- [ ] All 6 dashboards have complete guide content
- [ ] Purpose statements are clear and concise (1 sentence)
- [ ] Steps are numbered and actionable (3-5 per dashboard)
- [ ] Next action provides clear workflow direction
- [ ] Icons enhance scannability and visual hierarchy
- [ ] Content accuracy verified against actual dashboard features

### Visual Requirements
- [ ] Accordion matches design system (colors, typography, spacing)
- [ ] Hover states provide clear visual feedback
- [ ] Focus states meet accessibility standards (2px outline)
- [ ] Gradient header background matches brand
- [ ] Responsive design works on mobile (320px+)
- [ ] Print styles ensure content is readable when printed

### Accessibility Requirements
- [ ] WCAG 2.1 AA compliance for color contrast
- [ ] ARIA attributes correct (aria-expanded, aria-controls, aria-hidden)
- [ ] Screen reader announces state changes
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators clearly visible
- [ ] prefers-reduced-motion respected

### Performance Requirements
- [ ] Accordion animation runs at 60 FPS
- [ ] localStorage operations non-blocking (<10ms)
- [ ] Component initializes in <50ms per dashboard
- [ ] No memory leaks after multiple expand/collapse cycles
- [ ] Total CSS size <5KB (minified)

---

## Testing Strategy

### Unit Tests
**File**: `tests/user-guide.test.js`

```javascript
describe('UserGuide Component', () => {
  test('initializes with correct default state', () => {
    // Opportunity should be expanded, others collapsed
  });

  test('toggles expanded/collapsed state on click', () => {
    // Click header, verify aria-expanded changes
  });

  test('saves state to localStorage', () => {
    // Toggle, verify localStorage key updated
  });

  test('loads state from localStorage', () => {
    // Set localStorage, initialize, verify state
  });

  test('navigates to target dashboard on next step click', () => {
    // Click next step link, verify tab switch
  });

  test('handles keyboard navigation', () => {
    // Tab to header, press Enter, verify expand
  });
});
```

### Integration Tests
1. **Dashboard Navigation**: Verify guides appear on correct dashboards when tabs switch
2. **State Persistence**: Toggle each guide, reload page, verify states restored
3. **Link Navigation**: Click all "Next step" links, verify correct tab activation
4. **Multi-Dashboard Workflow**: Open multiple guides simultaneously, verify no conflicts

### Accessibility Tests
1. **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)
   - Verify state announcements ("expanded", "collapsed")
   - Verify content is readable when expanded
2. **Keyboard Only**: Navigate using only Tab, Enter, Space
   - All interactive elements reachable
   - Focus indicators visible
3. **Color Contrast**: Use Chrome DevTools Lighthouse
   - All text meets 4.5:1 minimum

### Browser Compatibility
- ✓ Chrome 90+ (primary)
- ✓ Firefox 88+ (primary)
- ✓ Safari 14+ (primary)
- ✓ Edge 90+ (secondary)

---

## Time Estimates

| Phase | Tasks | Time | Cumulative |
|-------|-------|------|------------|
| **10.5.1** | Core component & CSS | 2 hours | 2h |
| **10.5.2** | Content integration (6 dashboards) | 1.5 hours | 3.5h |
| **10.5.3** | Integration & polish | 1 hour | 4.5h |
| **10.5.4** | Testing & refinement | 0.5 hours | 5h |
| **Buffer** | Bug fixes, adjustments | 1 hour | **6h** |

**Total Estimate**: 5-6 hours

**Dependencies**: None (standalone feature)

---

## Files to Create

| File Path | Purpose | Lines (est.) |
|-----------|---------|--------------|
| `js/components/user-guide.js` | UserGuide component class | ~200 |
| `css/user-guide.css` | Complete styling | ~250 |
| `tests/user-guide.test.js` | Unit tests (optional) | ~150 |

## Files to Modify

| File Path | Section | Changes | Time |
|-----------|---------|---------|------|
| `index.html` | After each dashboard tab nav | Insert guide container | 20 min |
| `index.html` | `<head>` section | Add `<link>` for user-guide.css | 2 min |
| `index.html` | Before `</body>` | Add `<script>` for user-guide.js | 2 min |
| `js/main.js` | After dashboard initialization | Initialize UserGuide instances | 15 min |

---

## Success Metrics (Post-Launch)

**Quantitative**:
- **Guide Usage Rate**: % of users who expand at least one guide (target: 60%)
- **Guide Persistence**: % of users who keep guides open across sessions (target: 30%)
- **Workflow Completion**: % of users who follow "Next step" links (target: 40%)
- **Support Ticket Reduction**: Decrease in "How do I..." questions (target: 25%)

**Qualitative**:
- User feedback: "Guides help me understand each dashboard's purpose"
- Reduced onboarding time for new users
- Increased usage of underutilized features (Gap Analysis, Positioning)

---

## Future Enhancements (Out of Scope)

1. **Interactive Tooltips**: Highlight specific UI elements mentioned in steps
2. **Progress Tracking**: Check off completed steps (localStorage)
3. **Video Walkthroughs**: Embed short screencasts for complex workflows
4. **Contextual Help**: Show guide automatically when user seems stuck (analytics)
5. **Customizable Content**: Allow admin to edit guide text without code changes
6. **Multi-Language Support**: Translate guides for non-English users

---

## Definition of Done

- [ ] All 6 dashboard guides implemented and tested
- [ ] Code reviewed and merged to main branch
- [ ] CSS and JS files added to version control
- [ ] No console errors or warnings
- [ ] Accessibility audit passed (Lighthouse score 95+)
- [ ] Cross-browser testing completed
- [ ] localStorage persistence verified
- [ ] Documentation updated (README, if applicable)
- [ ] Deployed to production (Vercel)
- [ ] PM/CEO notified of completion for user testing

---

## References

- **Design System**: `DESIGN_SPEC.md` (cards, typography, colors)
- **Existing Components**: `js/components/analysis-panel.js` (collapsible pattern reference)
- **Sprint Pattern**: `archive/SPRINT-8-VISUAL-TOUR-completed.md` (specification format)
- **Dashboard Structure**: `index.html` (view containers, tab navigation)
- **CSS Variables**: `css/main.css` (design tokens)
