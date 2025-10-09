# Functional Specifications: Customer Intelligence Center

**Version**: 1.0
**Status**: Draft
**Based on**: PRD v1.0

---

## 1. Introduction

This document describes the functional requirements for the PCC Customer Intelligence Center. It translates the features outlined in the PRD into specific functions the system must perform. These requirements are organized by the three main project phases.

---

## 2. Phase 1: Foundational Customer Insights

**Goal:** To provide initial, actionable insights with minimal technical implementation.

- **FR-1.1: Member Visit Frequency Analysis**
  - **FR-1.1.1:** The system must be able to ingest member booking data from a CSV file.
  - **FR-1.1.2:** The system shall process the booking data to calculate the number of visits per member for a given month.
  - **FR-1.1.3:** The system shall display a histogram visualizing the distribution of member visit frequency (e.g., 0-1 visits, 2-4 visits, 5+ visits).

- **FR-1.2: Manual Customer Survey Module**
  - **FR-1.2.1:** The system must provide a mechanism to import survey response data from a CSV file (exported from Google Forms or similar).
  - **FR-1.2.2:** The imported survey data shall be associated with the corresponding member IDs.
  - **FR-1.2.3:** The system shall display survey responses in a simple tabular format, filterable by member.

- **FR-1.3: Manual Corporate Connector List**
  - **FR-1.3.1:** The system shall display a static list of members identified as "Corporate Connectors".
  - **FR-1.3.2:** The list must contain the member's name, their employer, and their job title.

- **FR-1.4: Competitor Event Research**
  - **FR-1.4.1:** The system shall have a simple data store (e.g., a JSON file) to hold a catalog of event types and programming ideas.
  - **FR-1.4.2:** The system shall display this catalog in a searchable, filterable list for ideation.

---

## 3. Phase 2: Automated Intelligence & Visualization

**Goal:** To automate data pipelines and create interactive dashboards.

- **FR-2.1: Automated Data Enrichment Pipeline**
  - **FR-2.1.1:** The system shall trigger an enrichment process for every new member added.
  - **FR-2.1.2:** The system shall make an API call to a third-party service (e.g., Clearbit) using the member's email.
  - **FR-2.1.3:** The system shall store the returned firmographic data (employer, title) and demographic data (location) in the database, linked to the member.

- **FR-2.2: Dynamic Customer Segmentation Engine**
  - **FR-2.2.1:** The system shall run a monthly batch process to assign all active members to a customer segment.
  - **FR-2.2.2:** The segmentation process must use member behavioral data (visit frequency, spend) and enriched data as inputs.
  - **FR-2.2.3:** The system shall provide a mechanism for an administrator to manually override a member's assigned segment.

- **FR-2.3: Interactive Segment Dashboard**
  - **FR-2.3.1:** The dashboard must display a pie or donut chart showing the percentage breakdown of members in each segment.
  - **FR-2.3.2:** The dashboard must include a summary table detailing the Member Count, Average LTV, and Average Visit Frequency for each segment.
  - **FR-2.3.3:** Users must be able to click on a segment in the chart or table to filter a list of all members within that segment.

- **FR-2.4: Demographic & Member Heatmap**
  - **FR-2.4.1:** The system shall load GeoJSON data representing U.S. Census tracts for the Chicago area.
  - **FR-2.4.2:** The map must render the census tracts as a choropleth layer, with colors corresponding to a selected demographic metric (e.g., median income).
  - **FR-2.4.3:** The user must be able to toggle this demographic layer on and off.
  - **FR-2.4.4:** The user must be able to overlay a heatmap of member home locations, filterable by customer segment.
  - **FR-2.4.5:** Hovering over a census tract shall display a tooltip with its specific demographic data.

---

## 4. Phase 3: Integrated Yield Management

**Goal:** To embed customer intelligence into operational decision-making tools.

- **FR-3.1: Corporate Event Decision Tool**
  - **FR-3.1.1:** The user shall be able to input the details of a corporate event request (date, time, revenue).
  - **FR-3.1.2:** The system shall identify all existing member bookings that would be displaced by the event.
  - **FR-3.1.3:** The system shall calculate the total CLV of the displaced members and the estimated churn cost (Displaced CLV x Churn Probability Increase).
  - **FR-3.1.4:** The system shall present a summary comparing the one-time event revenue with the estimated churn cost.
  - **FR-3.1.5:** The system shall provide a final recommendation: "Accept," "Decline," or "Counter-offer with alternative slot."

- **FR-3.2: Segment-Aware Dynamic Pricing**
  - **FR-3.2.1:** The system shall generate a weekly pricing schedule for drop-in bookings.
  - **FR-3.2.2:** The pricing recommendation for each time slot must be based on historical demand and the typical customer segment that books at that time.
  - **FR-3.2.3:** The output shall be a 7x24 heatmap visualization of the recommended prices.

- **FR-3.3: Segment-Based Court Allocation**
  - **FR-3.3.1:** The system shall allow an administrator to define court allocation percentages for different time blocks (e.g., Weekday Prime Time) across different customer segments.
  - **FR-3.3.2:** The system shall display the projected member "Booking Success Rate" based on the defined allocation, warning the user if the rate falls below a configurable threshold (e.g., 80%).

- **FR-3.4: Data-Driven Mezzanine ROI Planner**
  - **FR-3.4.1:** The system shall allow a user to compare at least four potential mezzanine use cases (e.g., Hot Desks, Yoga Studio, Strength Training, Event Space).
  - **FR-3.4.2:** For each use case, the user can input the estimated setup cost, monthly revenue, and operating costs.
  - **FR-3.4.3:** The system shall calculate and display the Payback Period and ROI for each option.
  - **FR-3.4.4:** The system's final recommendation shall be weighted based on both the financial model and the member interest level imported from survey data.
