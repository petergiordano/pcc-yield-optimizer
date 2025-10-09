# Design Specifications: Customer Intelligence Center

**Version**: 1.0
**Status**: Draft
**Based on**: PRD v1.0, Functional Spec v1.0

---

## 1. UI/UX Principles

- **Clarity Over Clutter:** Every chart and number must be immediately understandable. Use clear labels, helpful tooltips, and avoid jargon.
- **Action-Oriented Design:** Dashboards should not just present data; they should guide the user toward a decision. Highlight key insights and include clear "Next Step" suggestions.
- **Delightful Interactions:** Use subtle animations, smooth transitions, and satisfying micro-interactions to make data exploration engaging, not a chore.
- **Progressive Disclosure:** Start with a high-level summary. Allow the user to click on any element to drill down for more detail, rather than overwhelming them with all the data at once.

---

## 2. Phase 1: Foundational Customer Insights (UI Mockups)

**Goal:** Simple, static displays of manually compiled data. The UI will be basic HTML and CSS, rendered client-side.

- **DS-1.1: Member Visit Frequency Histogram**
  - **Component:** A simple bar chart (can be generated with Chart.js).
  - **Layout:** X-axis shows visit brackets ("1-2 visits/mo", "3-5", "6+"). Y-axis shows the number of members in each bracket.
  - **Interaction:** Hovering over a bar displays a tooltip with the exact member count.

- **DS-1.2: Survey & Connector Lists**
  - **Component:** A standard HTML `<table>`.
  - **Layout:** Clean, readable rows with clear headings (e.g., "Member Name", "Employer", "Motivation").
  - **Styling:** Alternating row colors for readability. The table should be sortable by clicking on column headers.

---

## 3. Phase 2: Automated Intelligence & Visualization (UI Mockups)

**Goal:** A professional, interactive dashboard experience. This will likely require a more robust frontend framework like React.

- **DS-2.1: Customer Segments Dashboard**
  - **Layout:** A two-column layout. Left side features a large donut chart showing the percentage of members in each segment. The right side contains a summary table.
  - **Donut Chart:** Each segment is a different color from the brand palette. The center of the donut displays the total number of active members.
  - **Summary Table:** Lists each segment, its member count, and its average LTV. Each segment name is a clickable link.
  - **Interaction:** Clicking a segment on the chart or table filters a detailed member list that appears below, animated to slide into view.

- **DS-2.2: Demographic & Member Heatmap**
  - **Component:** A full-screen Leaflet.js map of Chicago.
  - **Controls:** A control panel in the top-right corner with:
    1.  A toggle switch labeled "Show Demographic Overlay".
    2.  A dropdown menu to select the demographic metric (e.g., "Median Income," "Population Density").
    3.  A set of checkboxes to filter the member heatmap by customer segment.
  - **Legend:** A legend in the bottom-left corner clearly explains the color scale for both the demographic layer and the member heatmap.
  - **Tooltip:** A custom-styled tooltip appears on hover over a census tract, displaying its name and the relevant data point in a clean, readable format.

---

## 4. Phase 3: Integrated Yield Management (UI Mockups)

**Goal:** Tools that guide complex business decisions.

- **DS-3.1: Corporate Event Decision Tool**
  - **Layout:** A modal window that appears when a user wants to evaluate an event.
  - **Input Form:** Simple form fields for "Date/Time," "Revenue," and "# of Courts."
  - **Output Display:** A clear, two-sided comparison:
    - **Left Side (Event Revenue):** A large green number showing the event revenue (e.g., "+$500").
    - **Right Side (Churn Cost):** A large red number showing the estimated churn cost (e.g., "-$966"). A sub-line details the calculation: "(12 members displaced x 5% churn risk x $2,682 avg LTV)".
  - **Recommendation Bar:** A prominent bar at the bottom with a clear, color-coded recommendation:
    - **Green (Accept):** "Net Value: +$XXX. This is a profitable decision."
    - **Red (Decline):** "Net Value: -$XXX. High risk of member churn."
    - **Yellow (Counter-Offer):** "Marginal value. Suggest offering an alternative off-peak slot."

- **DS-3.2: Mezzanine ROI Planner**
  - **Component:** An interactive table where each row is a potential mezzanine use case.
  - **Columns:** "Use Case," "Setup Cost," "Monthly Revenue," "Payback Period," and a "Member Interest" score visualized as a 5-star rating (pulled from survey data).
  - **Interaction:** The user can click a button labeled "Calculate Recommendation." The system will highlight the recommended row in green, providing a short text explanation below: "Strength Training is recommended due to its high strategic alignment and strong member interest, despite a longer payback period."
