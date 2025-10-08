# Sprint 8: Interactive Visual Tour System

## Overview
Implement a comprehensive, multi-part visual tour that introduces users to the PCC Yield Optimizer's features, competitive intelligence model, and strategic positioning framework. The tour provides rich educational content through progressive disclosure, guiding users through the application's core concepts and capabilities.

**Key Design Philosophy**: The tour uses **self-contained, high-quality diagram replicas** of dashboard elements (heatmaps, opportunity cards, tables, maps) rather than highlighting live app elements. This approach ensures the tour remains resilient to UI changes, performs optimally, and provides a controlled educational experience with idealized visualizations.

### Approach Comparison

| Aspect | ❌ Live Element Highlighting | ✅ Self-Contained Diagram Replicas |
|--------|----------------------------|-----------------------------------|
| **Resilience** | Breaks when CSS/HTML changes | Tour independent of app UI changes |
| **Maintenance** | Must update selectors frequently | Quarterly review sufficient |
| **Performance** | DOM queries, reflows | Fast SVG/Canvas rendering |
| **Control** | Shows current data state | Shows ideal examples for learning |
| **Dependencies** | Requires specific DOM structure | Zero dependencies on app DOM |
| **Educational Value** | Varies with user data | Consistent, realistic examples |
| **Complexity** | Z-index layering, positioning | Self-contained SVG generation |
| **Testing** | Brittle, DOM-dependent tests | Stable diagram rendering tests |

## Objectives
- Reduce time-to-value for new users by providing structured onboarding
- Educate users on the competitive intelligence model and opportunity scoring system
- Improve feature discoverability across all four dashboards
- Create context-aware guidance that adapts to the user's current location
- Implement an elegant, accessible tour UI with keyboard navigation and progress tracking

## Feature Requirements

### FR-8.1: Tour Launch Button
**Priority**: P0 (Critical)

**Description**: Add a persistent "Tour" or "Help" button in the application header that's always accessible.

**Location**:
- Position: Top right corner of sticky header, to the right of dashboard tabs
- Visibility: Always visible, regardless of scroll position or active dashboard
- Icon: Question mark circle (?) or compass/tour icon with subtle animation on first visit

**Behavior**:
- Single click launches the visual tour modal
- Tour opens to content relevant to current dashboard/context
- First-time users see a subtle pulse animation to draw attention
- After dismissal, animation stops permanently (tracked in localStorage)

**Acceptance Criteria**:
- ✓ Button remains visible on all dashboards and scroll positions
- ✓ Button has hover/focus states with clear visual feedback
- ✓ Button is keyboard accessible (Tab + Enter)
- ✓ Button has proper ARIA labels for screen readers
- ✓ First-visit pulse animation plays once, then never again

---

### FR-8.2: Tour Modal Structure
**Priority**: P0 (Critical)

**Description**: Create a full-screen modal overlay with rich content presentation capabilities.

**Layout Components**:
1. **Header Section**
   - Title: "Visual Tour" (large, bold)
   - Subtitle: "Discover the power of competitive intelligence" (or context-specific)
   - Progress bar: Visual indicator showing overall completion (0-100%)
   - Close button: X icon in top-right corner

2. **Main Content Area**
   - Left panel: Self-contained SVG/Canvas diagram replicas simulating dashboard views (60% width)
   - Diagrams include: heatmap grids (7×24), opportunity cards, gap analysis tables, geographic maps
   - Progressive highlighting within diagrams using opacity, borders, and glow effects
   - Right panel: Explanatory text, step navigation, and instructions (40% width)
   - Responsive: Single column on mobile/tablet devices
   - **Note**: Diagrams are pre-built replicas, not live DOM manipulation, ensuring tour resilience

3. **Footer Section**
   - Left: Current position indicator (e.g., "Part 2 • Step 3 of 5")
   - Right: Navigation buttons (Back, Continue →, Next Part →, Get Started!)
   - Center: Step dots indicator showing progress within current part

**Visual Style**:
- Background gradient: Blue to purple (#005DAA → #7C3AED)
- Modal background: White with subtle shadow
- Typography: System fonts, clear hierarchy
- Animations: Smooth transitions between steps (300ms ease-in-out)

**Acceptance Criteria**:
- ✓ Modal covers entire viewport with semi-transparent backdrop
- ✓ Content is centered and readable on all screen sizes
- ✓ Progress bar animates smoothly as user progresses
- ✓ Close button (X) is always accessible and visible
- ✓ Modal prevents body scrolling when open

---

### FR-8.3: Tour Content Structure (4 Parts)
**Priority**: P0 (Critical)

**Description**: Organize tour content into 4 major parts, each with multiple steps, covering the PCC Yield Optimizer's core concepts.

#### Part 1: Understanding Competitive Intelligence (6 steps)
**Icon**: 🎯 (Target)
**Progress**: 0-25%

**Steps**:
1. **Welcome & Overview**
   - Diagram: Dashboard preview with key areas highlighted
   - Text: "Welcome to PCC Yield Optimizer. This tool helps you identify high-opportunity time slots by analyzing competitor facility utilization, customer segments, and geographic overlap."

2. **The Opportunity Model**
   - Diagram: Flowchart showing how opportunities are calculated
   - Text: "We identify opportunities by finding times when PCC has available capacity while competitors are at peak demand with matching customer segments."

3. **Data Sources**
   - Diagram: Icons showing facilities.json + popular-times data
   - Text: "We track hourly utilization (0-100%) for PCC and 8 competitor facilities across Chicago, updated with real foot traffic patterns."

4. **The Heatmap System**
   - Diagram: Sample 7×24 heatmap with color scale
   - Text: "Each facility's utilization is visualized as a weekly heatmap. White = empty (0%), Yellow = moderate (50%), Red = full (100%)."

5. **Opportunity Scoring**
   - Diagram: Formula breakdown showing components
   - Text: "Opportunity Score = Competitor Demand × PCC Capacity × Segment Match × Geographic Overlap × Accessibility"

6. **Reading the Dashboards**
   - Diagram: All 4 dashboard icons with descriptions
   - Text: "Navigate between Competitive Intelligence, Opportunity Finder, Gap Analysis, and Geographic Map using the tabs above."

#### Part 2: Dashboard Features (5 steps)
**Icon**: 📊 (Chart)
**Progress**: 25-50%

**Steps**:
1. **Competitive Intelligence Center**
   - Diagram: Screenshot of multi-facility heatmap
   - Text: "View all competitors side-by-side. Green borders = high opportunity, yellow = moderate, red = competitive threat."

2. **Opportunity Finder**
   - Diagram: Screenshot of opportunity list with WHO/WHERE/HOW/WHY panels
   - Text: "Sorted list of top opportunities with detailed breakdowns: who to target, where they are, how to reach them, and why they'll convert."

3. **Gap Analysis Grid**
   - Diagram: Sample gap analysis table
   - Text: "See exactly how much demand PCC is missing compared to market maximum. Each gap represents revenue potential."

4. **Geographic Competitive Map**
   - Diagram: Chicago map with facility markers
   - Text: "Visualize competitor locations, catchment areas, member density heatmaps, and CTA transit accessibility."

5. **Interactive Features**
   - Diagram: Tooltips, filters, and click interactions highlighted
   - Text: "Click any heatmap cell for detailed analysis. Use filters to focus on specific days, times, or customer segments."

#### Part 3: Taking Action (4 steps)
**Icon**: 🚀 (Rocket)
**Progress**: 50-75%

**Steps**:
1. **Identifying Your Best Opportunities**
   - Diagram: Opportunity Finder interface with top 3 highlighted
   - Text: "Start with the Opportunity Finder. The highest-scoring opportunities appear at the top, representing the easiest wins."

2. **Understanding the Analysis**
   - Diagram: WHO/WHERE/HOW/WHY panel breakdown
   - Text: "Each opportunity shows WHO to target (segments), WHERE they're located (geographic overlap), HOW to reach them (channels), and WHY they'll convert (value drivers)."

3. **Campaign Planning**
   - Diagram: "Create Campaign" button and sample campaign details
   - Text: "Use the 'Create Campaign' button to generate targeted marketing initiatives. The system pre-fills customer segments, messaging angles, and timing recommendations."

4. **Measuring Success**
   - Diagram: Before/after utilization comparison
   - Text: "Track campaign impact by monitoring utilization changes in targeted time slots. Watch the gap analysis grid to see market share gains."

#### Part 4: Advanced Features (3 steps)
**Icon**: 🎓 (Graduate Cap)
**Progress**: 75-100%

**Steps**:
1. **Filters and Customization**
   - Diagram: Filter panel showing segment, day, and time filters
   - Text: "Customize your view with filters. Focus on specific customer segments (e.g., Corporate Players, Social Beginners) or time windows (weekday mornings, weekend evenings)."

2. **Export and Sharing**
   - Diagram: Export menu with options (PDF, CSV, Share Link)
   - Text: "Export opportunity reports, gap analysis tables, and campaign recommendations to share with your team or present to stakeholders."

3. **Getting Help**
   - Diagram: Help resources (this tour button, documentation link, support contact)
   - Text: "Revisit this tour anytime by clicking the Tour button. For questions, contact the PCC analytics team at analytics@pccchicago.com."
   - Checkbox: "Don't show this tour again"
   - Button: "Get Started! 🚀"

**Content Structure Format**:
Each substep includes:
- `highlight`: Element ID within the diagram to emphasize (e.g., 'cell-2-18', 'who-panel')
- `title`: Substep heading
- `description`: Educational text (2-3 sentences)
- `diagramCreator`: Function that generates the diagram with highlighting
  ```javascript
  {
    highlight: 'cell-2-18',
    title: 'Reading a Time Slot',
    description: 'Each cell represents one hour...',
    diagramCreator: (highlightElement) => TourDiagrams.createHeatmapDiagram(highlightElement)
  }
  ```

**Acceptance Criteria**:
- ✓ All 4 parts total 18 steps (6 + 5 + 4 + 3)
- ✓ Each step has a self-contained diagram creator function
- ✓ Diagrams are high-quality SVG/Canvas replicas matching app aesthetics
- ✓ Highlighting system works within diagrams (opacity, borders, glows)
- ✓ Text is concise (2-3 sentences per step)
- ✓ Content is specific to PCC Yield Optimizer features
- ✓ Diagrams use realistic sample data for educational value

---

### FR-8.4: Navigation System
**Priority**: P0 (Critical)

**Description**: Implement intuitive, multi-modal navigation allowing users to move through the tour at their own pace.

**Navigation Methods**:

1. **Button Navigation**
   - **Continue → button**: Advances to next step within current part
   - **Next Part → button**: Appears on last step of parts 1-3, advances to next part
   - **Get Started! 🚀 button**: Appears on final step, closes tour
   - **← Back button**: Returns to previous step (appears on all steps except first)

2. **Keyboard Navigation**
   - **Right Arrow**: Advance to next step
   - **Left Arrow**: Return to previous step
   - **Escape**: Close tour (with confirmation if progress > 25%)
   - **Tab**: Focus navigation between interactive elements
   - **Enter/Space**: Activate focused button

3. **Dot Navigation**
   - Display dots below main content showing steps within current part
   - Clicking a dot jumps directly to that step
   - Active dot is highlighted in blue (#005DAA)
   - Inactive dots are gray (#D1D5DB)
   - Completed dots show checkmark icon

4. **Part Navigation**
   - Display 4 part indicators (1, 2, 3, 4) at bottom of modal
   - Clicking a part number jumps to that part's first step
   - Active part is highlighted, completed parts show checkmarks
   - Not-yet-reached parts are disabled (gray, no hover)

**Progress Persistence**:
- Save current step to localStorage on each advance
- On tour re-open, offer to resume from last position or start over
- Track completion status (completed parts, total progress %)

**Acceptance Criteria**:
- ✓ All navigation methods work correctly (buttons, keyboard, dots, parts)
- ✓ Navigation is disabled during transition animations
- ✓ Back button correctly handles transitions between parts
- ✓ Progress is saved and can be resumed
- ✓ Keyboard focus is clearly visible on all interactive elements
- ✓ Navigation instructions are displayed on every step

---

### FR-8.5: Context-Aware Launch
**Priority**: P1 (High)

**Description**: Tour intelligently opens to content relevant to the user's current location in the app.

**Context Detection**:
- If on **Competitive Intelligence dashboard** → Start at Part 1, Step 4 (Heatmap System)
- If on **Opportunity Finder dashboard** → Start at Part 2, Step 2 (Opportunity Finder features)
- If on **Gap Analysis dashboard** → Start at Part 2, Step 3 (Gap Analysis features)
- If on **Geographic Map dashboard** → Start at Part 2, Step 4 (Map features)
- If **first-time visitor** (no localStorage data) → Always start at Part 1, Step 1 (Welcome)
- If **returning user** → Show modal with options: "Resume Tour" or "Start from Current Dashboard"

**Implementation**:
```javascript
function getTourStartPosition() {
  const currentDashboard = getCurrentActiveDashboard(); // 'competitive', 'opportunity', 'gap', 'map'
  const isFirstVisit = !localStorage.getItem('tourProgress');
  const hasCompletedTour = localStorage.getItem('tourCompleted') === 'true';

  if (isFirstVisit) {
    return { part: 1, step: 1 };
  }

  if (hasCompletedTour) {
    // Map dashboard to relevant tour step
    const contextMap = {
      'competitive': { part: 1, step: 4 },
      'opportunity': { part: 2, step: 2 },
      'gap': { part: 2, step: 3 },
      'map': { part: 2, step: 4 }
    };
    return contextMap[currentDashboard] || { part: 1, step: 1 };
  }

  // Resume from last position
  const saved = JSON.parse(localStorage.getItem('tourProgress'));
  return { part: saved.part, step: saved.step };
}
```

**Acceptance Criteria**:
- ✓ First-time users always see Part 1, Step 1
- ✓ Context detection correctly identifies active dashboard
- ✓ Resuming users see appropriate start position
- ✓ Context-aware start is indicated in UI ("Starting from your current view...")

---

### FR-8.6: Visual Design & Animations
**Priority**: P1 (High)

**Description**: Create a polished, professional visual experience with smooth animations and transitions.

**Color Scheme**:
- **Header Gradient**: `linear-gradient(135deg, #005DAA 0%, #7C3AED 100%)`
- **Progress Bar Fill**: `#10B981` (green) with animated width transition
- **Modal Background**: `#FFFFFF`
- **Backdrop**: `rgba(0, 0, 0, 0.5)` with blur effect
- **Text**: `#1F2937` (dark gray) for body, `#FFFFFF` for header
- **Buttons**: Primary `#005DAA`, hover `#004488`

**Typography**:
- **Title**: 32px, bold, white
- **Subtitle**: 18px, regular, white with 80% opacity
- **Body Text**: 16px, line-height 1.6, dark gray
- **Labels**: 14px, medium weight

**Animations**:
1. **Modal Entry**:
   - Backdrop fades in (200ms)
   - Modal scales from 0.95 to 1.0 with fade (300ms, ease-out)
   - Content fades in after modal (200ms delay)

2. **Step Transitions**:
   - Current content fades out (150ms)
   - New content fades in (200ms after fade-out)
   - Progress bar animates to new value (400ms, ease-in-out)
   - Dot indicators update with subtle scale animation

3. **Button Interactions**:
   - Hover: Background color transition (200ms)
   - Click: Scale down to 0.98, then back to 1.0 (100ms each)
   - Disabled state: Opacity 0.5, no hover effects

4. **Progress Bar**:
   - Width animates smoothly on step change
   - Gradient shimmer effect on active portion
   - Percentage text updates with counting animation

**Accessibility**:
- All animations respect `prefers-reduced-motion` media query
- Focus indicators have 3px solid outline in brand blue
- Color contrast ratios meet WCAG AA standards (minimum 4.5:1)
- All interactive elements have minimum 44×44px touch targets

**Acceptance Criteria**:
- ✓ Animations are smooth and performant (60 FPS)
- ✓ Colors match PCC brand guidelines
- ✓ `prefers-reduced-motion` users see instant transitions
- ✓ Modal is visually distinct from underlying content
- ✓ Progress indicators are clear and accurate

---

### FR-8.7: Persistence & Settings
**Priority**: P1 (High)

**Description**: Manage tour state, user preferences, and completion tracking.

**LocalStorage Schema**:
```javascript
{
  "tourProgress": {
    "part": 2,
    "step": 3,
    "lastUpdated": "2025-10-07T14:30:00Z"
  },
  "tourCompleted": true,
  "tourDismissed": false,
  "dontShowAgain": false,
  "firstVisitDate": "2025-10-05T10:00:00Z"
}
```

**Behaviors**:
1. **First Visit**:
   - Tour button has subtle pulse animation
   - No automatic tour launch (user must click button)
   - Track `firstVisitDate` for analytics

2. **"Don't show this tour again" checkbox**:
   - Appears only on final step (Part 4, Step 3)
   - When checked, sets `dontShowAgain: true`
   - Tour button remains visible but shows "Review Tour" instead of pulse

3. **Tour Completion**:
   - When user clicks "Get Started! 🚀" on final step, mark `tourCompleted: true`
   - Clear `tourProgress` object
   - Show completion celebration (confetti animation, optional)
   - Badge or checkmark appears on tour button briefly

4. **Manual Dismissal**:
   - If user closes tour via X button, save current progress
   - Next launch offers: "Resume from Step X" or "Start Over"

5. **Reset Option**:
   - Hidden link in tour footer: "Reset Tour Progress"
   - Clears all tour-related localStorage
   - Useful for testing and re-onboarding

**Acceptance Criteria**:
- ✓ Progress is saved after every step advance
- ✓ "Don't show again" preference is respected
- ✓ Completed tour status is tracked
- ✓ User can resume from last position
- ✓ Reset functionality clears all tour data

---

### FR-8.8: Responsive Design
**Priority**: P1 (High)

**Description**: Ensure tour is fully functional and visually appealing on all device sizes.

**Breakpoints**:
- **Desktop** (≥1024px): Full two-column layout (diagram left, text right)
- **Tablet** (768px - 1023px): Single column, diagram above text, smaller padding
- **Mobile** (≤767px): Compact single column, smaller fonts, simplified diagrams

**Mobile Optimizations**:
- Reduce header title size to 24px
- Stack navigation buttons vertically
- Simplify diagrams or provide mobile-optimized versions
- Increase touch target sizes to minimum 48×48px
- Remove dot navigation on very small screens (≤480px)
- Swipe gestures for navigation (swipe right = back, swipe left = next)

**Tablet Optimizations**:
- Maintain two-column layout in landscape orientation
- Switch to single column in portrait orientation
- Adjust diagram sizes to maintain readability

**Acceptance Criteria**:
- ✓ Tour is fully functional on screens from 320px to 2560px wide
- ✓ All content is readable without horizontal scrolling
- ✓ Touch targets meet minimum size requirements on mobile
- ✓ Swipe gestures work correctly on touch devices
- ✓ Layout adapts smoothly between breakpoints

---

## Diagram Architecture

### Overview
The tour uses a centralized diagram library (`TourDiagrams`) that generates self-contained visual replicas of dashboard components. This architecture ensures **resilience** (tour won't break from UI changes), **performance** (no DOM queries or manipulation), and **educational value** (can show idealized, simplified views).

### TourDiagrams Object Structure

```javascript
const TourDiagrams = {
  // Heatmap diagram creator
  createHeatmapDiagram(highlightElement) {
    // Returns SVG element with 7×24 grid
    // Uses sample data to show realistic utilization patterns
    // Applies highlighting to specific cells via opacity and borders
  },

  // Opportunity card diagram creator
  createOpportunityCardDiagram(highlightElement) {
    // Returns DOM element replicating opportunity card layout
    // Includes WHO/WHERE/HOW/WHY panels
    // Highlights specific panels based on highlightElement parameter
  },

  // Gap analysis table diagram creator
  createGapAnalysisTableDiagram(highlightElement) {
    // Returns HTML table with 3-5 sample rows
    // Highlights specific columns (PCC %, Market Max %, Gap, Revenue)
  },

  // Geographic map diagram creator
  createMapDiagram(highlightElement) {
    // Returns SVG map of Chicago with facility markers
    // Shows catchment area circles for highlighted facilities
    // Includes PCC, SPF, and competitor markers
  },

  // Dashboard tabs diagram creator
  createTabsDiagram(highlightElement) {
    // Returns DOM element with 4 tab buttons
    // Highlights active tab based on highlightElement
  },

  // Flowchart diagram creator (for opportunity scoring)
  createFlowchartDiagram(highlightElement) {
    // Returns SVG flowchart showing formula components
    // Highlights specific formula parts
  },

  // Utility methods
  getSampleUtilization(dayIdx, hour) {
    // Generates realistic utilization percentage
    // Peak hours: 5-9 PM weekdays, 10 AM - 6 PM weekends
  },

  getHeatmapColor(utilization) {
    // Maps utilization (0-100) to color
    // Matches actual heatmap color scale
    if (utilization < 25) return '#FFFFFF';
    if (utilization < 50) return '#FEF3C7';
    if (utilization < 75) return '#FBBF24';
    if (utilization < 90) return '#F87171';
    return '#DC2626';
  },

  getElementOpacity(elementId, highlightElement) {
    // Returns 1 if highlighted, 0.3 if not
    if (!highlightElement) return 1;
    return highlightElement === elementId ? 1 : 0.3;
  },

  getElementFilter(elementId, highlightElement) {
    // Returns CSS filter for glow effect
    if (highlightElement === elementId) {
      return 'drop-shadow(0 0 8px currentColor)';
    }
    return '';
  }
};
```

### Highlighting System

Diagrams use a three-layer highlighting approach:

1. **Opacity**: Non-highlighted elements fade to 30% opacity
   ```javascript
   rect.setAttribute('opacity', this.getElementOpacity(cellId, highlightElement));
   ```

2. **Border/Stroke**: Highlighted elements get colored borders
   ```javascript
   rect.setAttribute('stroke', highlightElement === cellId ? '#10B981' : '#E5E7EB');
   rect.setAttribute('stroke-width', highlightElement === cellId ? 3 : 1);
   ```

3. **Glow Effect**: Highlighted elements get drop-shadow filter
   ```javascript
   if (highlightElement === cellId) {
     rect.style.filter = 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))';
   }
   ```

### Example: Heatmap Diagram Implementation

```javascript
createHeatmapDiagram(highlightElement) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 800 300');
  svg.setAttribute('class', 'tour-diagram-heatmap');

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const cellWidth = 30;
  const cellHeight = 35;

  days.forEach((day, dayIdx) => {
    for (let hour = 0; hour < 24; hour++) {
      const cellId = `cell-${dayIdx}-${hour}`;
      const x = 50 + hour * cellWidth;
      const y = 20 + dayIdx * cellHeight;

      // Generate realistic sample data
      const utilization = this.getSampleUtilization(dayIdx, hour);
      const color = this.getHeatmapColor(utilization);

      // Create cell rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', cellWidth - 2);
      rect.setAttribute('height', cellHeight - 2);
      rect.setAttribute('fill', color);
      rect.setAttribute('rx', 2);

      // Apply highlighting
      const opacity = this.getElementOpacity(cellId, highlightElement);
      const strokeWidth = highlightElement === cellId ? 3 : 1;
      const stroke = highlightElement === cellId ? '#10B981' : '#E5E7EB';

      rect.setAttribute('opacity', opacity);
      rect.setAttribute('stroke', stroke);
      rect.setAttribute('stroke-width', strokeWidth);

      if (highlightElement === cellId) {
        rect.style.filter = 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))';
      }

      svg.appendChild(rect);
    }

    // Add day label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', 10);
    text.setAttribute('y', 35 + dayIdx * cellHeight);
    text.setAttribute('font-size', 12);
    text.setAttribute('fill', '#6B7280');
    text.textContent = day;
    svg.appendChild(text);
  });

  return svg;
}
```

### Benefits of Diagram-Based Approach

1. **Resilience**: Tour never breaks from CSS/HTML changes in main app
   - Diagrams are self-contained and independent
   - UI refactors don't affect tour functionality
   - No brittle DOM selectors

2. **Control**: Can show idealized, simplified states
   - Demonstrate concepts without data dependencies
   - Show "perfect" examples for educational clarity
   - Simplified versions highlight key features

3. **Performance**: No DOM queries or live element manipulation
   - All diagrams generated in memory
   - No reflow/repaint of main app
   - Faster rendering and smoother animations

4. **Educational**: Realistic sample data aids learning
   - Can emphasize specific patterns
   - Consistent examples across user sessions
   - Focus on teaching concepts, not current data

5. **Maintainability**: Centralized diagram code
   - All visual logic in `TourDiagrams.js`
   - Easy to update diagram styles
   - Documented update process for visual changes

### Diagram Update Process

When dashboard visuals change:
1. Review `TourDiagrams.js` for affected diagram creators
2. Update colors, sizing, or layout to match new design
3. Test diagram highlighting still works correctly
4. **Quarterly review** recommended to keep diagrams aligned with app

---

## Technical Implementation

### Phase 8.1: Core Infrastructure (3 days)
**Files to create**:
- `js/components/VisualTour.js` - Main tour component class (~500 lines)
- `js/components/TourDiagrams.js` - All diagram creators (~600 lines)
- `js/components/TourContent.js` - Content data structure and management (~200 lines)
- `css/visual-tour.css` - All tour-specific styles (~300 lines)
- `js/utils/tourStorage.js` - LocalStorage management for tour state (~100 lines)

**Tasks**:
1. Create `VisualTour` class with initialization, open, close, navigate methods
2. Implement modal structure with header, content area, footer
3. Add tour button to header in `index.html`
4. Set up localStorage schema and persistence layer
5. Implement basic show/hide animations

**Testing**:
- Modal opens and closes correctly
- Button is visible on all dashboards
- LocalStorage saves and retrieves tour state
- No conflicts with existing modals or overlays

---

### Phase 8.2: Diagram Library & Visual Replicas (4 days)
**Files to create**:
- `js/components/TourDiagrams.js` - All diagram creator functions (~600 lines)

**Files to modify**:
- `js/components/TourContent.js` - Add all 18 steps with diagram creators
- `js/components/VisualTour.js` - Implement navigation logic and diagram rendering

**Tasks**:
1. **Build Core Diagram Creators (Days 1-2)**:
   - `createHeatmapDiagram()`: 7×24 SVG grid with color scale and cell highlighting
   - `createTabsDiagram()`: Dashboard tabs replica with highlight states
   - `createOpportunityCardDiagram()`: WHO/WHERE/HOW/WHY panel layout with highlights
   - `createFlowchartDiagram()`: Opportunity scoring formula visualization

2. **Build Advanced Diagram Creators (Day 3)**:
   - `createGapAnalysisTableDiagram()`: Simplified gap table with column highlighting
   - `createMapDiagram()`: SVG Chicago map with facility markers and catchment areas
   - `createFiltersDiagram()`: Sidebar filters replica

3. **Implement Highlighting System (Day 3)**:
   - `getElementOpacity()`: Returns opacity based on highlight state (1 or 0.3)
   - `getElementFilter()`: Returns CSS filter for glow effect on highlighted elements
   - Border and shadow styling for highlighted elements within diagrams

4. **Sample Data Generation (Day 4)**:
   - `getSampleUtilization()`: Generates realistic heatmap data by day/hour
   - `getHeatmapColor()`: Maps utilization % to color scale (white → red)
   - Sample opportunity data for cards

5. **Navigation & Content (Day 4)**:
   - Define content structure for all 4 parts (18 steps)
   - Wire up diagram creators to content
   - Implement button navigation (Back, Continue, Next Part, Get Started)
   - Add keyboard navigation (arrow keys, escape)
   - Build dot indicator system for steps
   - Implement progress bar with percentage calculation

**Testing**:
- All diagram creators produce valid SVG/DOM output
- Highlighting works correctly within diagrams (opacity, borders, glows)
- Diagrams scale responsively
- Color mapping matches actual app design system
- Sample data is realistic and educational
- Navigation methods work correctly
- Progress bar updates accurately
- Keyboard shortcuts function as expected

---

### Phase 8.3: Context Awareness (2 days)
**Files to modify**:
- `js/components/VisualTour.js` - Add context detection logic
- `js/utils/tourStorage.js` - Add first-visit and resume logic

**Tasks**:
1. Implement dashboard detection function
2. Create context-to-step mapping
3. Add first-visit detection
4. Build "Resume or Start Over" dialog
5. Add context indicator text in UI

**Testing**:
- Correct context detection for all dashboards
- First-time users always see Step 1
- Resume functionality works correctly
- Context-aware starts land on correct steps

---

### Phase 8.4: Visual Design & Polish (3 days)
**Files to modify**:
- `css/visual-tour.css` - Complete visual styling including diagram styles
- `js/components/TourDiagrams.js` - Refine diagram visuals
- `js/components/VisualTour.js` - Add polished animations

**Tasks**:
1. Apply brand colors and gradient backgrounds to modal
2. **Refine diagram visuals to match actual dashboard aesthetics**:
   - Match heatmap colors exactly (white → yellow → orange → red)
   - Match opportunity card styling (borders, shadows, typography)
   - Match table and map styling
   - Ensure diagrams use design system CSS variables
3. **Add diagram highlighting styles**:
   - Glow effects for highlighted elements
   - Border animations
   - Opacity transitions
4. Implement smooth transition animations between steps
5. Add progress bar animations
6. Create button hover and active states
7. Add focus indicators for accessibility
8. Implement `prefers-reduced-motion` support
9. Add subtle micro-animations (pulse, shimmer, etc.)
10. **Generate realistic sample data** for educational value

**Testing**:
- Diagrams visually match actual dashboard components
- Highlighting is clear and draws attention effectively
- Animations run at 60 FPS
- Colors meet accessibility standards
- Reduced motion preference is respected
- Touch interactions feel responsive
- Diagram transitions are smooth (300ms)

---

### Phase 8.5: Responsive & Mobile (3 days)
**Files to modify**:
- `css/visual-tour.css` - Add responsive styles and media queries
- `js/components/VisualTour.js` - Add touch gesture support

**Tasks**:
1. Create mobile-optimized diagram versions
2. Implement responsive layout breakpoints
3. Add touch gesture navigation (swipe)
4. Optimize button sizes for touch
5. Test on various device sizes
6. Adjust font sizes and spacing for mobile

**Testing**:
- Tour works on devices from 320px to 2560px wide
- Touch gestures function correctly
- All content is readable on small screens
- No horizontal scrolling
- Performance remains smooth on mobile devices

---

### Phase 8.6: Final Integration & Testing (2 days)
**Tasks**:
1. Integration testing with all dashboards
2. Cross-browser testing (Chrome, Firefox, Safari, Edge)
3. Accessibility audit with screen readers
4. Performance profiling and optimization
5. User acceptance testing
6. Bug fixes and refinements

**Testing**:
- Works in all supported browsers
- Screen reader compatible
- No performance regressions
- All acceptance criteria met
- User feedback incorporated

---

## Design Specifications

### Tour Button Design
```css
.tour-button {
  position: relative;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 200ms ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tour-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.tour-button.first-visit::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background: #10B981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}
```

### Modal Structure
```html
<div class="tour-modal-backdrop">
  <div class="tour-modal">
    <div class="tour-header">
      <div class="tour-header-content">
        <h1>Visual Tour</h1>
        <p class="tour-subtitle">Discover the power of competitive intelligence</p>
      </div>
      <button class="tour-close" aria-label="Close tour">×</button>
      <div class="tour-progress-bar">
        <div class="tour-progress-fill" style="width: 43%;"></div>
        <span class="tour-progress-text">43%</span>
      </div>
    </div>

    <div class="tour-content">
      <div class="tour-diagram">
        <!-- SVG or image content -->
      </div>
      <div class="tour-text">
        <div class="tour-part-label">
          <span class="tour-part-icon">📊</span>
          <div>
            <h2>Part 2: Dashboard Features</h2>
            <p class="tour-part-subtitle">Part 2 of 4</p>
          </div>
        </div>
        <h3>Opportunity Finder</h3>
        <p>Sorted list of top opportunities with detailed breakdowns...</p>
        <div class="tour-navigation-help">
          <p><strong>Navigation:</strong></p>
          <ul>
            <li>Arrow keys: Navigate steps</li>
            <li>Escape: Close tour</li>
            <li>Click dots: Jump to step</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="tour-footer">
      <div class="tour-position">Part 2 • Step 2 of 5</div>
      <div class="tour-step-dots">
        <span class="dot completed"></span>
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div class="tour-actions">
        <button class="tour-back">← Back</button>
        <button class="tour-continue">Continue →</button>
      </div>
    </div>
  </div>
</div>
```

### Diagram Component Specifications

#### Heatmap Diagram
- **Size**: 800×300px SVG, viewBox for scalability
- **Grid**: 7 days × 24 hours = 168 cells
- **Cell dimensions**: 30×35px with 2px gap
- **Color scale**: Exact match to app heatmap
  - 0-25%: `#FFFFFF` (white)
  - 25-50%: `#FEF3C7` (light yellow)
  - 50-75%: `#FBBF24` (orange)
  - 75-90%: `#F87171` (light red)
  - 90-100%: `#DC2626` (deep red)
- **Highlighting**: Green border (3px, `#10B981`), glow effect
- **Sample data**: Realistic peaks (weekday evenings, weekend days)

#### Opportunity Card Diagram
- **Container**: 600×400px DOM element
- **Layout**: Header + 4 panels (WHO/WHERE/HOW/WHY) + button
- **Header**: Opportunity score (8.7) + time slot
- **Panels**: 2×2 grid with icons, titles, bullet points
- **Highlighting**: Panel border glow (`box-shadow: 0 0 12px rgba(16, 185, 129, 0.5)`)
- **Styling**: Match actual opportunity card CSS (borders, shadows, spacing)

#### Gap Analysis Table Diagram
- **Size**: 600×200px table
- **Rows**: 3-5 sample time slots
- **Columns**: Time Slot, PCC %, Market Max %, Gap, Revenue Opp
- **Highlighting**: Column header + all cells in column get colored background
- **Data**: Representative gaps (35-50%) with revenue calculations
- **Styling**: Match actual table styles (borders, hover states)

#### Map Diagram
- **Size**: 600×500px SVG
- **Elements**:
  - Simplified Chicago outline (rectangle)
  - Lake Michigan (blue rectangle on right)
  - 3-5 facility markers (circles with labels)
  - Catchment areas (dashed circles, 80px radius)
- **Markers**: Size proportional to court count, color-coded
  - PCC: `#005DAA` (blue), 20px
  - SPF: `#EF4444` (red), 16px
  - Others: `#EF4444` (red), 14px
- **Highlighting**: Facility marker + catchment area glow

#### Dashboard Tabs Diagram
- **Size**: 800×60px DOM element
- **Tabs**: 4 buttons with icons and labels
- **Highlighting**: Active tab blue background, white text
- **Styling**: Match actual tab button CSS exactly

### Diagram CSS Classes

```css
/* Heatmap diagram */
.tour-diagram-heatmap {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: white;
  padding: var(--space-md);
}

/* Opportunity card diagram */
.tour-diagram-opportunity-card {
  max-width: 600px;
  margin: 0 auto;
}

.tour-opp-card {
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  background: white;
  overflow: hidden;
}

.tour-opp-panel {
  padding: var(--space-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  transition: all 300ms ease;
}

.tour-opp-panel.highlighted {
  border-color: var(--color-success);
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5);
  background: var(--color-green-50);
}

/* Gap analysis table diagram */
.tour-gap-table {
  width: 100%;
  border-collapse: collapse;
}

.tour-gap-table th,
.tour-gap-table td {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border-default);
  text-align: left;
}

.tour-gap-table th.highlighted,
.tour-gap-table td:nth-child(3).highlighted {
  background: var(--color-blue-50);
  border-color: var(--color-brand-blue);
  font-weight: var(--font-weight-semibold);
}

/* Map diagram */
.tour-diagram-map {
  max-width: 100%;
  height: auto;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

/* Dashboard tabs diagram */
.tour-diagram-tabs {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-md);
  background: var(--color-gray-50);
  border-radius: var(--radius-lg);
}

.tour-tab-button {
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: white;
  font-size: var(--font-size-body-sm);
  transition: all 200ms ease;
}

.tour-tab-button.highlighted {
  background: var(--color-brand-blue);
  color: white;
  border-color: var(--color-brand-blue);
  box-shadow: 0 0 8px rgba(0, 93, 170, 0.5);
}
```

---

## Acceptance Criteria (Full Sprint)

### Functional Requirements
- [ ] Tour button is visible in header on all dashboards
- [ ] Tour modal opens when button is clicked
- [ ] All 18 steps across 4 parts are implemented with content
- [ ] Navigation works via buttons, keyboard, and dots
- [ ] Progress is saved to localStorage after each step
- [ ] Context-aware launch works for all dashboards
- [ ] First-time users see welcome step
- [ ] Returning users can resume from last position
- [ ] "Don't show again" preference is respected
- [ ] Tour can be closed via X button or Escape key

### Visual Requirements
- [ ] Design matches provided mockups
- [ ] All colors match PCC brand guidelines
- [ ] Animations are smooth (60 FPS)
- [ ] Progress bar updates accurately
- [ ] Responsive design works on all screen sizes
- [ ] **Diagrams are high-quality SVG/Canvas replicas matching actual dashboard components**
- [ ] **Diagram highlighting is clear and draws attention effectively**
- [ ] **Sample data in diagrams is realistic and educational**
- [ ] **Diagrams use design system CSS variables for consistency**

### Accessibility Requirements
- [ ] WCAG 2.1 AA compliance for color contrast
- [ ] Keyboard navigation fully functional
- [ ] Focus indicators are clearly visible
- [ ] Screen reader compatible
- [ ] `prefers-reduced-motion` is respected
- [ ] All interactive elements meet minimum touch target sizes

### Performance Requirements
- [ ] Modal opens in < 200ms
- [ ] **Diagram rendering completes in < 200ms**
- [ ] **SVG animations run at 60 FPS**
- [ ] Step transitions complete in < 300ms (including diagram swap)
- [ ] No layout shifts or jank
- [ ] LocalStorage operations are non-blocking
- [ ] Tour doesn't impact dashboard performance (diagrams are isolated)

---

## Testing Strategy

### Unit Tests
- TourContent.js: Content structure and data validation
- tourStorage.js: LocalStorage operations
- VisualTour.js: Navigation logic, state management
- **TourDiagrams.js: Diagram generation and highlighting**
  - Each diagram creator returns valid SVG/DOM
  - Highlighting correctly applies opacity, borders, filters
  - Sample data generation is realistic and consistent
  - Color mapping matches app design system

### Diagram Rendering Tests
- **Heatmap Diagram**:
  - Generates 168 cells (7×24 grid)
  - Colors match utilization percentages
  - Highlighted cell has green border and glow
  - Day labels are present and correctly positioned
- **Opportunity Card Diagram**:
  - All 4 panels (WHO/WHERE/HOW/WHY) render
  - Highlighted panel has border glow
  - Sample data is realistic and formatted correctly
- **Gap Analysis Table Diagram**:
  - Table has correct columns and sample rows
  - Highlighted column has colored background
  - Numbers are formatted with % and $ signs
- **Map Diagram**:
  - Chicago outline and Lake Michigan render
  - All facility markers appear with correct colors
  - Catchment circles appear for highlighted facilities
  - Labels are readable and positioned correctly
- **Tabs Diagram**:
  - All 4 tabs render with icons and labels
  - Highlighted tab has blue background
  - Styling matches actual dashboard tabs

### Integration Tests
- Tour button integration with header
- Context detection with dashboard navigation
- LocalStorage persistence across sessions
- **Diagram rendering within tour modal**
- **Step transitions with diagram changes**

### User Acceptance Tests
1. First-time user completes full tour
2. Returning user resumes from last position
3. User navigates via keyboard only
4. User launches tour from each dashboard
5. User dismisses and resumes tour
6. User completes tour and checks "Don't show again"

### Cross-Browser Tests
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Device Tests
- Desktop: 1920×1080, 1366×768
- Tablet: iPad (1024×768), Surface (1280×720)
- Mobile: iPhone (375×667), Android (360×640)

---

## Success Metrics
- **Adoption Rate**: % of users who start the tour
- **Completion Rate**: % of users who complete all 4 parts
- **Time to Completion**: Average time to complete tour
- **Engagement**: Average number of steps viewed per session
- **Drop-off Points**: Identify which steps have highest abandonment
- **Feature Discovery**: Increase in usage of advanced features after tour completion

---

## Future Enhancements (Post-Sprint)
- Interactive elements within tour (clickable diagrams, live data previews)
- Video embeds for complex concepts
- Contextual tooltips that appear on actual dashboard elements
- Progressive tour (unlock parts as user engages with features)
- Multi-language support
- Analytics integration to track user behavior
- A/B testing different content variations
- Personalized tour paths based on user role (Manager vs. Analyst)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Content creation takes longer than estimated | High | Start with placeholder content, iterate with stakeholders |
| **Diagrams diverge from actual UI over time** | Medium | Document quarterly review process, version diagrams with app releases |
| **SVG creation is complex and time-consuming** | Medium | Reference existing heatmap code, use helper functions, start simple |
| **Diagrams don't match user's actual data** | Low | Use realistic sample data, add note that diagrams are illustrative examples |
| Performance issues on mobile devices | High | Profile early, optimize animations, lazy-load diagram rendering |
| Conflicts with existing modal systems | Medium | Use unique z-index, namespace CSS classes |
| User confusion with navigation | High | Include clear instructions on every step, user test early |
| Accessibility issues with complex diagrams | Medium | Add ARIA labels to SVG elements, provide descriptive text alongside diagrams |
| **Diagram rendering errors in older browsers** | Low | Test SVG support, provide fallback static images for IE11 |

---

## Dependencies
- No external library dependencies (vanilla JavaScript)
- SVG diagram assets (to be created in Figma)
- Updated header HTML with tour button
- LocalStorage API support (IE11+)

---

## Deliverables
1. Tour button in application header with pulse animation
2. Complete visual tour modal with all 18 steps
3. **Diagram library (`TourDiagrams.js`) with 6+ diagram creators**:
   - Heatmap diagram (7×24 grid)
   - Opportunity card diagram (WHO/WHERE/HOW/WHY)
   - Gap analysis table diagram
   - Geographic map diagram
   - Dashboard tabs diagram
   - Flowchart diagram (opportunity scoring)
4. **Sample data generators** for realistic diagram representations
5. Content configuration for all 4 parts with diagram creators
6. Navigation system (buttons, keyboard, dots, parts)
7. LocalStorage persistence layer with progress tracking
8. Responsive CSS for all screen sizes including diagram styles
9. Accessibility features and ARIA labels (modal + SVG diagrams)
10. Unit and integration tests including diagram rendering tests
11. **Documentation for diagram maintenance and updates**
12. **Quarterly review checklist** for keeping diagrams aligned with app

---

## Timeline
**Total Duration**: 17 days

- Phase 8.1: Core Infrastructure (3 days)
- Phase 8.2: Content & Navigation (4 days)
- Phase 8.3: Context Awareness (2 days)
- Phase 8.4: Visual Design & Polish (3 days)
- Phase 8.5: Responsive & Mobile (3 days)
- Phase 8.6: Final Integration & Testing (2 days)

**Target Completion**: End of Sprint 8

---

## Notes
- This tour is designed to be educational and engaging, not just a feature walkthrough
- **Diagrams are self-contained replicas, ensuring tour resilience to UI changes**
- **Quarterly diagram review recommended** to keep visuals aligned with app updates
- Content should be updated as the application evolves
- Consider recording analytics to understand user behavior and optimize content
- The tour should feel like a natural part of the application, not an afterthought
- Prioritize clarity and conciseness in all content—users want to get to the tool quickly
- **Diagram approach benefits**: Resilience, performance, control over educational examples, centralized maintenance
