I need to implement Sprint 7: Polish & Export for the PCC Yield Optimizer to prepare for an investor demo.

PROJECT CONTEXT:
- Location: /Users/petergiordano/Documents/GitHub/pcc-yield-optimizer
- Current state: Sprints 1-6.5 complete (Heatmap, Opportunity Finder, Gap Grid, Geographic Map, Analysis Panel, CTA Transit)
- Reference: SPRINT_ROADMAP.md, DESIGN_SPEC.md, FUNCTIONAL_SPEC.md
- Goal: Make the dashboard investor-ready with polish, performance, and export features

SPRINT 7 OBJECTIVES:
This sprint focuses on user experience refinement, not new features. Every interaction should feel smooth, professional, and confidence-inspiring.

═══════════════════════════════════════════════════════════════

PHASE 1: LOADING STATES & PERFORMANCE (60 min)
═══════════════════════════════════════════════════════════════

TASK 1.1: Add Loading Skeletons
Create skeleton loaders for each major component while data loads:

1. Heatmap View:
   - Show 7x24 grid of pulsing gray rectangles
   - Display "Loading competitive data..." message
   - Fade in actual heatmap when ready

2. Opportunity Finder:
   - Show 5-6 skeleton cards (gray rectangles with subtle animation)
   - Display "Analyzing opportunities..." message
   - Smooth transition to real cards

3. Gap Analysis Grid:
   - Show table header immediately
   - Display ~10 skeleton rows (animated shimmer effect)
   - Message: "Calculating gaps..."

4. Geographic Map:
   - Show map tile immediately (Leaflet handles this)
   - Display spinner for facility markers: "Loading facilities..."
   - Display spinner for transit layer: "Loading CTA transit..."
   - Fade in each layer as it loads

5. Analysis Panel:
   - Show panel structure immediately when opened
   - Display section-by-section skeleton loaders
   - Message: "Analyzing time slot..."

Implementation approach:
- Create CSS class: .skeleton-loader with pulse animation
- Add data-loading="true" attribute to components during load
- Remove attribute and fade in real content when ready
- Target: <2 seconds for initial page load, <500ms for interactions

TASK 1.2: Add Progress Indicators
For longer operations:

1. Create a subtle top-of-page progress bar (like YouTube/GitHub):
   - Thin blue line (3px) that grows from 0-100% during loads
   - Automatically hide when complete
   - Use for: Initial page load, filter changes, data exports

2. Button loading states:
   - Add spinner inside buttons during async operations
   - Examples: "Export CSV", "Create Event", "Launch Campaign"
   - Disable button and show spinner until operation completes

TASK 1.3: Optimize Performance
Implement these performance improvements:

1. Debounce filter changes:
   - Opportunity score threshold slider: 300ms debounce
   - Search inputs: 300ms debounce
   - Day/customer type filters: immediate (no debounce)

2. Lazy load Popular Times data:
   - Don't fetch all competitor data on page load
   - Load only visible facilities initially
   - Load additional facilities on-demand when:
     * User toggles them visible in filters
     * User clicks on map marker
     * User opens analysis panel for that time slot

3. Memoize expensive calculations:
   - Cache opportunity scores (don't recalculate unless filters change)
   - Cache distance calculations for member density
   - Store processed GeoJSON data (don't re-parse)

4. Virtual scrolling for long lists:
   - Gap Analysis Grid: Render only visible rows (~20 at a time)
   - Opportunity List: Render only visible cards (~10 at a time)
   - Implement as user scrolls (windowing technique)

Target metrics:
- [ ] Initial page load: <2 seconds
- [ ] Filter change response: <200ms
- [ ] Panel open/close: <100ms
- [ ] Export operation: <3 seconds

═══════════════════════════════════════════════════════════════

PHASE 2: EMPTY STATES & ERROR HANDLING (30 min)
═══════════════════════════════════════════════════════════════

TASK 2.1: Design Empty States
Create friendly, helpful empty states for each view:

1. Opportunity Finder - No opportunities found:
🎯 No High-Value Opportunities Right Now
This means your competitors aren't showing strong demand patterns,
or your filters are too restrictive.
Try:
• Lower the opportunity score threshold
• Select different days of the week
• Toggle on more competitor facilities
[Reset Filters]

2. Gap Analysis Grid - No gaps (winning everywhere):
🏆 You're Dominating the Market!
PCC is at or above market demand across all time slots.
Focus on:
• Maintaining service quality
• Expanding capacity during peak times
• Converting drop-ins to members
[View Heatmap] [View Map]

3. Geographic Map - No member data:
📍 Member Density Data Not Available
Upload member addresses to see geographic distribution
and catchment overlap analysis.
[Learn How to Upload Data]

4. Analysis Panel - No competitive data for time slot:
📊 Limited Data for This Time Slot
Competitors may not publish data for this time,
or it's outside typical operating hours.
View nearby time slots for insights.
[View Previous Hour] [View Next Hour]

Requirements:
- Center-aligned with icon
- Clear explanation of why it's empty
- 2-3 actionable suggestions
- 1-2 CTA buttons
- Professional but friendly tone

TASK 2.2: Error Handling & Graceful Degradation

1. Network errors:
   - If Popular Times data fails to load:
     * Show error message: "Unable to load competitor data"
     * Offer retry button
     * Allow rest of dashboard to function
   
2. GeoJSON errors:
   - If transit data fails: Hide transit checkbox, log warning
   - If member density fails: Show map without heatmap
   - Never show raw error messages to user

3. Missing data:
   - If competitor has no data for a time slot: Show "—" in grid
   - If facility coordinates missing: Don't break map
   - If score calculation fails: Show "N/A" with tooltip

4. Browser compatibility:
   - Detect if Leaflet not supported: Show message to upgrade browser
   - Detect if localStorage blocked: Disable any persistence features
   - Test in: Chrome, Safari, Firefox, Edge

Error message template:
⚠️ [Friendly Error Title]
[Clear explanation of what went wrong]
[What the user can do about it]
[Retry Button] [Continue Anyway]

═══════════════════════════════════════════════════════════════

PHASE 3: ANIMATIONS & TRANSITIONS (30 min)
═══════════════════════════════════════════════════════════════

TASK 3.1: Add Smooth Transitions
Implement subtle, professional animations:

1. Component transitions:
   - Tab switching: 200ms fade + slide
   - Panel open/close: 300ms slide from right
   - Modal open/close: 250ms fade + scale
   - Tooltip appear: 150ms fade

2. List animations:
   - Opportunity cards: Stagger fade-in (50ms delay between cards)
   - Gap grid rows: Fade in as they're calculated
   - Facility markers: Drop onto map with bounce

3. Interactive feedback:
   - Buttons: Scale down 95% on click (50ms)
   - Checkboxes: Smooth checkmark animation
   - Sliders: Smooth thumb movement with easing
   - Map markers: Pulse on hover

4. Page load sequence:
   - Header: Fade in immediately (0ms)
   - Filters: Slide in from left (100ms delay)
   - Main content: Fade in (200ms delay)
   - Create orchestrated feeling, not jarring

CSS implementation:
```css
/* Use these timing functions */
--ease-out: cubic-bezier(0.33, 1, 0.68, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

/* Standard transition durations */
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 350ms;

/* Apply to all interactive elements */
.button, .card, .panel {
  transition: all var(--duration-base) var(--ease-out);
}
Guidelines:

✅ Animations should feel quick and responsive
✅ Use for feedback and delight, not decoration
❌ Never delay critical interactions
❌ Don't animate large movements (>500px)

TASK 3.2: Micro-interactions
Add subtle polish to interactions:

Heatmap cells:

Hover: Subtle lift (2px) + border glow
Click: Brief scale down then expand
Selected: Persistent border + slight scale


Opportunity cards:

Hover: Lift 4px with shadow
Click: Scale down 98% briefly
Expand: Smooth height transition (not instant)


Filter controls:

Checkbox: Checkmark draws in (100ms)
Radio: Dot grows from center (150ms)
Slider: Thumb scales up on drag


Map interactions:

Marker hover: Scale 120% + drop shadow
Marker click: Pulse animation
Layer toggle: Fade opacity 0-100%



═══════════════════════════════════════════════════════════════
PHASE 4: EXPORT & SHARING FEATURES (45 min)
═══════════════════════════════════════════════════════════════
TASK 4.1: Export Opportunity List as PDF Report
Create professional PDF export for the Opportunity Finder:

Add "Export Report" button to Opportunity Finder

Icon: 📄 Download
Position: Top right near filter controls


PDF should include:

Cover page:

Title: "PCC Yield Optimizer - Opportunity Report"
Generated date: [Today's date]
Filters applied: [List active filters]
Summary: "X high-value opportunities identified"


Opportunity pages (one per opportunity):

Time slot & score
Customer segments
Competitive landscape
2-3 recommendations
Revenue projection


Appendix:

Methodology explanation
Data sources
Assumptions




Implementation approach:

Use library: jsPDF or html2pdf.js
Style: Professional, clean, branded
Include: PCC logo (if available)
Format: Letter size (8.5" x 11")


User experience:

Button shows spinner during generation
Progress indicator: "Generating report... 60%"
Auto-download when complete
Filename: "PCC_Opportunities_2025-10-07.pdf"



TASK 4.2: Export Heatmap as PNG Image
Allow users to save heatmap for presentations:

Add "Export Image" button to Heatmap view

Icon: 📸 Download
Position: Top right of heatmap


Image should capture:

Full heatmap grid (PCC + visible competitors)
Legend
Filters applied (shown as text overlay)
High resolution (2x for Retina displays)


Implementation:

Use library: html2canvas
Capture: .heatmap-container div
Format: PNG with transparency
Size: 1920x1080 or higher


User experience:

Button: "Export as Image"
Click: Shows preview modal
Modal: "Save this image?" with preview
Buttons: [Download] [Cancel]
Filename: "PCC_Heatmap_2025-10-07.png"



TASK 4.3: Export Gap Analysis as Excel
Export Gap Grid data to Excel for deeper analysis:

Add "Export to Excel" button to Gap Analysis

Icon: 📊 Download
Position: Top right of grid


Excel file should include:

Sheet 1: Gap Analysis (full 168-row table)

Columns: Time Slot, Day, Hour, PCC %, Market Max %, Gap %, Score, Est Revenue, Top Competitor
Formatting: Header row bold, % formatted, currency formatted
Conditional formatting: Green (opportunity), Gray (neutral), Red (winning)


Sheet 2: Summary Stats

Total weekly opportunity revenue
Average gap percentage
Win rate (% of slots where PCC is winning)
Top 10 opportunities (sorted by score)


Sheet 3: Methodology

Explanation of scoring
Data sources
Assumptions and caveats




Implementation:

Use library: SheetJS (xlsx)
Format: .xlsx (modern Excel format)
Include: Formulas where appropriate


User experience:

Button: "Export to Excel"
Shows spinner during export
Auto-download when ready
Filename: "PCC_Gap_Analysis_2025-10-07.xlsx"



TASK 4.4: Shareable URL State
Allow users to bookmark and share specific dashboard views:

Encode current state in URL:

Active tab: ?view=heatmap
Applied filters: &facilities=spf,pickle-haus&days=weekday
Opportunity threshold: &threshold=65
Map state: &zoom=12&center=41.95,-87.68


On page load:

Parse URL parameters
Apply filters automatically
Navigate to correct tab
Restore map position


Update URL as user interacts:

Use history.pushState() for smooth updates
Don't trigger page reload
Keep URL clean and readable


Add "Copy Link" button:

Position: Top right of dashboard (global)
Click: Copies current URL to clipboard
Feedback: "Link copied!" toast notification
Use case: "Share this view with your team"



Example URLs:
/dashboard?view=opportunities&threshold=70&days=weekend
/dashboard?view=map&facilities=pcc,spf&transit=true
/dashboard?view=gap-grid&sort=score-desc
═══════════════════════════════════════════════════════════════
PHASE 5: ACCESSIBILITY & KEYBOARD NAVIGATION (30 min)
═══════════════════════════════════════════════════════════════
TASK 5.1: Keyboard Navigation
Make all features keyboard-accessible:

Tab order:

Logical flow: Header → Filters → Main content → Footer
Skip to main content link at top
Focus indicators clearly visible (2px blue outline)


Keyboard shortcuts:

Esc: Close panel/modal
Arrow keys: Navigate heatmap cells
Enter/Space: Activate buttons
Tab/Shift+Tab: Move between controls
Ctrl/Cmd + E: Export current view


Focus management:

When opening panel: Focus first interactive element
When closing panel: Return focus to trigger element
Trap focus inside modals (don't tab outside)


Interactive elements:

All buttons: tabindex="0"
All links: Proper href values
Custom controls: ARIA roles and keyboard handlers



TASK 5.2: Screen Reader Support
Add ARIA labels for screen reader users:

Semantic HTML:

Use <nav>, <main>, <article>, <aside>
Proper heading hierarchy (h1 → h2 → h3)
<button> for actions, <a> for navigation


ARIA labels:

Heatmap cells: aria-label="Tuesday 2pm, 65% busy, opportunity score 78"
Map markers: aria-label="Pickleball Clubhouse, 4242 N Elston"
Filter controls: aria-label="Filter by day of week"
Charts: aria-describedby with data table


Dynamic content:

aria-live="polite" for filter results count
aria-live="assertive" for errors
Announce: "5 opportunities found" when filters change


Tooltips & popovers:

aria-describedby for tooltip content
role="tooltip" on tooltip elements
Don't hide critical info in hover-only tooltips



TASK 5.3: High Contrast Mode
Ensure dashboard works in high contrast mode:

Test in:

Windows High Contrast Mode
MacOS Increase Contrast
Browser forced colors mode


Fixes needed:

Don't rely solely on color for meaning
Add patterns/icons to heatmap cells (not just color)
Ensure text contrast meets WCAG AA (4.5:1 minimum)
Use border outlines in addition to color


Specific areas:

Heatmap: Add text labels or patterns
Opportunity cards: Use icons + color
Status indicators: Icons + text, not just color dots



═══════════════════════════════════════════════════════════════
PHASE 6: FINAL POLISH (30 min)
═══════════════════════════════════════════════════════════════
TASK 6.1: Visual Consistency
Audit and fix visual inconsistencies:

Spacing:

Consistent padding/margin scale: 4, 8, 12, 16, 24, 32, 48px
Component spacing: 24px between major sections
Card padding: 20px on all sides


Typography:

Consistent font sizes: 12, 14, 16, 18, 24, 32px
Line heights: 1.5 for body, 1.2 for headings
Font weights: 400 (normal), 600 (semibold), 700 (bold)


Colors:

Use design system colors consistently
No hardcoded hex values (use CSS variables)
Consistent hover/active states


Borders & shadows:

Border radius: 6px for cards, 4px for buttons
Shadow scale: sm, md, lg (from design system)
Border colors: Use --border-color variable



TASK 6.2: Mobile Responsiveness
Ensure dashboard works on tablets (phones can be deferred):

Breakpoints:

Desktop: 1280px+
Tablet: 768px - 1279px
Mobile: <768px (basic functionality only)


Tablet adjustments:

Heatmap: Scrollable horizontally if needed
Filters: Collapse into drawer/accordion
Analysis panel: Full screen instead of slide-in
Map: Full width, reduce catchment radius


Touch targets:

Minimum 44x44px for all interactive elements
Increased spacing between clickable items
Larger checkboxes and radio buttons



TASK 6.3: Cross-Browser Testing
Test and fix issues in major browsers:

Test in:

Chrome (primary)
Safari (MacOS)
Firefox
Edge


Common issues to check:

Flexbox/Grid layout
CSS variables support
Fetch API (add polyfill if needed)
Leaflet.js map rendering
PDF/Excel export libraries


Graceful degradation:

If feature not supported: Hide it
Show browser upgrade message if critical features missing
Never show broken UI



TASK 6.4: Performance Audit
Run final performance checks:

Lighthouse audit:

Performance: 85+ score
Accessibility: 95+ score
Best Practices: 90+ score


Bundle size:

Total JS: <500KB (gzipped)
Total CSS: <50KB
Images: Optimized and lazy-loaded


Network:

Minimize HTTP requests
Enable compression for all text files
Cache static assets properly


Runtime performance:

No layout thrashing
Smooth 60fps scrolling
No memory leaks



═══════════════════════════════════════════════════════════════
DELIVERABLES & SUCCESS CRITERIA
═══════════════════════════════════════════════════════════════
✅ Sprint 7 is complete when:

Loading & Performance:

 All views have skeleton loaders
 Progress indicators for long operations
 Page loads in <2 seconds
 Interactions respond in <200ms


Empty States & Errors:

 Every view has designed empty state
 All errors handled gracefully
 User never sees raw error messages
 Retry/fallback options available


Animations:

 Smooth transitions throughout (200-300ms)
 Micro-interactions on hover/click
 Orchestrated page load sequence
 No janky or sluggish animations


Exports:

 PDF report generation works
 Heatmap PNG export works
 Gap analysis Excel export works
 Shareable URLs preserve state


Accessibility:

 Full keyboard navigation
 Screen reader compatible
 High contrast mode works
 WCAG AA compliant


Polish:

 Visually consistent throughout
 Works on tablets
 Cross-browser tested
 Lighthouse scores meet targets



═══════════════════════════════════════════════════════════════
IMPLEMENTATION APPROACH
═══════════════════════════════════════════════════════════════
Work in this order for maximum efficiency:

START: Phase 1 (Loading States) - Most user-facing impact
THEN: Phase 2 (Empty States) - Prevents confusion
THEN: Phase 4 (Exports) - Key investor demo feature
THEN: Phase 3 (Animations) - Adds delight
THEN: Phase 5 (Accessibility) - Ensures quality
FINALLY: Phase 6 (Polish) - Final touches

Break work into incremental commits:

One commit per phase
Test thoroughly before moving on
Show me progress after each phase

CRITICAL FOR INVESTOR DEMO:

Prioritize Phases 1, 2, and 4 (loading, errors, exports)
Animations are nice-to-have (Phase 3)
Accessibility is important but can be refined post-demo (Phase 5)

═══════════════════════════════════════════════════════════════
Let's make this dashboard investor-ready. Start with Phase 1 (Loading States) and show me the skeleton loader implementation first before proceeding to the other phases.

---

## What This Sprint Accomplishes

**For the investor demo, this sprint ensures:**

1. **Professional First Impression** - Smooth loading states, no jarring transitions
2. **Confidence Inspiring** - Graceful error handling, nothing breaks
3. **Actionable Outputs** - PDF reports, Excel exports they can analyze offline  
4. **Shareable** - URL state means they can bookmark specific insights
5. **Accessible** - Works for everyone, including keyboard users

**Estimated Timeline:**
- Phase 1 (Loading): 60 min
- Phase 2 (Errors): 30 min  
- Phase 3 (Animations): 30 min
- Phase 4 (Exports): 45 min
- Phase 5 (Accessibility): 30 min
- Phase 6 (Polish): 30 min

**Total: ~3.5 hours** for full sprint, or **~2 hours** if you prioritize just Phases 1, 2, and 4 for demo.

---

## My Recommendation

**For investor demo readiness:**

Run the full prompt, but tell Claude Code to **prioritize Phases 1, 2, and 4** and show you those working before continuing to animations and accessibility.

This gives you:
- ✅ No awkward loading delays
- ✅ No broken states  
- ✅ PDF reports to leave behind
- ✅ Excel for their analysts

Then polish with Phases 3, 5, 6 after you've shown the demo and gotten initial feedback.

Ready to run Sprint 7!