# Project Plan: Epics, Sprints & Milestones

**Version**: 1.0
**Status**: Draft
**Based on**: PRD v1.0

---

## 1. Project Overview

This document breaks down the Customer Intelligence Center project into a series of phases, epics, and user stories to facilitate agile development and sprint planning. Each phase represents a major milestone that delivers significant, standalone business value.

---

## **Milestone 1: Foundational Customer Insights**

**Goal:** To quickly deliver initial, high-value insights about the PCC customer base using a manual-first approach. This phase is designed to prove the value of the initiative and gather essential data with minimal engineering effort.

### **Epic 1: Manual Data Ingestion & Basic Analysis**

**Description:** This epic covers the work needed to ingest and analyze manually collected data from booking logs and surveys to answer the most basic questions about the customer base.

**User Stories for Sprints 1-2:**

- **Story 1.1:** As Christy, I want to upload a CSV of member bookings so that the system can analyze visit frequency.
- **Story 1.2:** As an Analyst, I want the system to calculate the number of visits per member per month and display it as a histogram so I can identify regulars vs. casual visitors.
- **Story 1.3:** As Christy, I want to upload a CSV of survey results so I can see my members' motivations and amenity preferences in one place.
- **Story 1.4:** As an Analyst, I want to create and display a simple, static table of manually identified "Corporate Connectors" so Christy has an immediate lead list.
- **Story 1.5:** As Christy, I want to view a list of programming ideas sourced from top-tier national pickleball clubs so I can get inspiration for new events.

---

## **Milestone 2: Automated Intelligence & Visualization**

**Goal:** To build the automated data pipelines and interactive dashboards that will form the core of the Customer Intelligence Center. This phase transitions the project from manual analysis to a scalable, automated platform.

### **Epic 2: Automated Data Enrichment & Segmentation**

**Description:** This epic focuses on building the backend processes to automatically enrich member data and classify them into dynamic segments.

**User Stories for Sprints 3-5:**

- **Story 2.1:** As a System, I want to automatically call a third-party API (Clearbit) for every new member so that their profile is enriched with employer and location data.
- **Story 2.2:** As an Analyst, I want to set up a PostgreSQL database with the required schemas for members, bookings, and enriched data.
- **Story 2.3:** As a System, I want to run a monthly script that assigns each member to a customer segment based on their behavioral and enriched data.
- **Story 2.4:** As an Administrator, I need an interface to manually override a member's automatically assigned segment if I have better information.

### **Epic 3: Interactive Intelligence Dashboards**

**Description:** This epic covers the frontend work to build the dashboards that will allow Christy to explore and understand the customer data.

**User Stories for Sprints 6-8:**

- **Story 3.1:** As Christy, I want to see a dashboard that shows me the size, value (LTV), and characteristics of each customer segment so I can understand my member base at a glance.
- **Story 3.2:** As Christy, I want to be able to click on a segment to drill down and see a list of all the members within it.
- **Story 3.3:** As Christy, I want to see a map of Chicago with a demographic overlay (e.g., median income) so I can understand the context of my market.
- **Story 3.4:** As Christy, I want to overlay a heatmap of where my members live on the demographic map, and be able to filter this view by segment, so I can see where my most valuable customers are concentrated.

---

## **Milestone 3: Integrated Yield Management**

**Goal:** To fully integrate customer intelligence into the business's operational and strategic decision-making, transforming the platform from an analytics tool into a revenue-driving engine.

### **Epic 4: Event & Pricing Optimization**

**Description:** This epic focuses on building tools that use customer data to make smarter decisions about one-time revenue opportunities like corporate events and drop-in pricing.

**User Stories for Sprints 9-11:**

- **Story 4.1:** As Christy, when evaluating a corporate event, I want the system to calculate the potential churn cost of displacing members so I can make a profitable trade-off.
- **Story 4.2:** As Christy, I want the event decision tool to give me a clear "Accept," "Decline," or "Counter-Offer" recommendation based on the revenue vs. churn cost analysis.
- **Story 4.3:** As an Analyst, I want the system to generate a weekly schedule of recommended drop-in prices based on historical demand and segment behavior.
- **Story 4.4:** As Christy, I want to see the recommended prices in a 7x24 heatmap so I can easily review and approve them.

### **Epic 5: Strategic Planning & Capacity Management**

**Description:** This epic covers the tools needed for long-term strategic planning, including amenity investments and managing member growth.

**User Stories for Sprints 12-14:**

- **Story 5.1:** As Christy, I want a tool to compare the ROI of different mezzanine investments (e.g., Yoga vs. Strength Training) so I can make a data-driven capital decision.
- **Story 5.2:** As Christy, I want the mezzanine planner to factor in real member interest from surveys when making its recommendation.
- **Story 5.3:** As Christy, I want a capacity model that shows me how our "Member Booking Success Rate" will change as we grow from 350 to 400 members.
- **Story 5.4:** As Christy, I want the capacity model to recommend specific actions (e.g., "limit prime-time bookings," "extend hours") to maintain member satisfaction as we grow.
