
# Sprint 12: Performance & Accessibility Enhancements

**Objective:** This sprint addresses advanced performance optimizations and accessibility features that were deferred from the initial polish sprint (Sprint 7). The goal is to improve the application's load times, runtime performance, and support for users with disabilities.

---

## PHASE 1: ADVANCED PERFORMANCE OPTIMIZATIONS

These tasks are critical for ensuring the application remains fast and responsive as more data and features are added.

### TASK 1.1: Lazy Load Popular Times Data

*   **Objective:** Reduce the initial page load time by not fetching all competitor data at once.
*   **Current State:** The application currently loads data for all 6 facilities on initial startup.
*   **Implementation Plan:**
    1.  Modify `initApp()` in `js/main.js` to only load data for facilities that are visible by default (e.g., PCC and SPF).
    2.  Implement on-demand data loading in `js/data-loader.js`.
    3.  Trigger this on-demand loading when a user toggles a facility's visibility in the filter panel for the first time.

### TASK 1.2: Memoize Expensive Calculations

*   **Objective:** Prevent redundant calculations to improve UI responsiveness, especially when filters are applied.
*   **Implementation Plan:**
    1.  Create a simple caching/memoization utility in `/js/utils/cache.js`.
    2.  Apply this utility to cache the results of `calculateOpportunityScore()` in `js/utils/calculations.js`. The cache should be keyed by a combination of the input parameters.
    3.  The cache should be invalidated whenever the underlying facility data changes.

### TASK 1.3: Implement Virtual Scrolling

*   **Objective:** Improve rendering performance for long lists, such as the Gap Analysis Grid and the Opportunity List.
*   **Implementation Plan:**
    1.  Investigate a lightweight virtual scrolling library or implement a simple "windowing" technique.
    2.  Modify the `render` methods in `js/components/gap-analysis-grid.js` and `js/components/opportunity-list.js`.
    3.  Instead of rendering all rows/cards at once, only render the items currently visible in the viewport, plus a small buffer.
    4.  Update the rendered items on scroll events.

---

## PHASE 2: ADVANCED ACCESSIBILITY (A11Y)

These tasks ensure the application is usable by a wider range of users, including those who rely on screen readers.

### TASK 2.1: Dynamic Screen Reader Announcements

*   **Objective:** Provide real-time feedback to screen reader users as they interact with filters and the data changes.
*   **Implementation Plan:**
    1.  Use `aria-live="polite"` regions to announce dynamic content changes.
    2.  When filters are applied in the Opportunity List, the application should announce the results, e.g., "5 opportunities found".
    3.  This requires adding a visually hidden `div` with the `aria-live` attribute and updating its `textContent` when the list is re-rendered.

### TASK 2.2: High Contrast Mode

*   **Objective:** Ensure the dashboard is fully usable in operating system High Contrast Modes.
*   **Implementation Plan:**
    1.  Test the application in Windows High Contrast Mode and macOS Increase Contrast mode.
    2.  Add a dedicated high-contrast stylesheet or use media queries (`@media (forced-colors: active)`) in `css/accessibility.css`.
    3.  Replace color-only indicators with transparent borders, icons, or text labels that will be visible in high contrast.
    4.  **Heatmap:** Add text labels or patterns to cells to indicate utilization level without relying on color.
    5.  **Opportunity Cards:** Ensure status is conveyed by more than just the color of the score.

---

## PHASE 3: FINAL AUDITS

These are manual testing tasks to be completed before the sprint is considered done.

### TASK 3.1: Cross-Browser Testing

*   **Objective:** Manually test and fix UI inconsistencies and bugs in all major browsers.
*   **Browsers:** Chrome (latest), Safari (latest), Firefox (latest), Edge (latest).
*   **Common Issues to Check:** Flexbox/Grid layouts, CSS variable support, map rendering, and export functionality.

### TASK 3.2: Performance Audit

*   **Objective:** Run a final performance audit using browser developer tools.
*   **Tools:** Chrome Lighthouse.
*   **Target Scores:**
    *   Performance: 85+
    *   Accessibility: 95+
    *   Best Practices: 90+
