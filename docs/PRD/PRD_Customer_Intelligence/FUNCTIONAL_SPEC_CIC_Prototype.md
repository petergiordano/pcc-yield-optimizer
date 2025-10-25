# Functional Specification: Customer Intelligence Center (CIC) Prototype

**Project**: PCC Yield Optimizer - Customer Intelligence Center Prototype
**Version**: 1.0
**Last Updated**: October 25, 2025
**Source**: [PRD_CIC_Prototype.md](./PRD_CIC_Prototype.md)

---

## Document Purpose

This functional specification defines **what** the Customer Intelligence Center (CIC) prototype must do to satisfy the requirements in [PRD_CIC_Prototype.md](./PRD_CIC_Prototype.md). It focuses on **Phase 0-1** (Data Integration + Foundation), which represents the isolated prototype scope.

**Key Difference from Previous Spec**: This spec is **prototype-scoped** and built specifically around CourtReserve data integration. It does not reference archived documents.

---

## Document Organization

This Functional Spec is part of the Customer Intelligence Center specification suite:

**Core Specifications:**
1. [PRD_CIC_Prototype.md](./PRD_CIC_Prototype.md) - Product vision, business goals, feature requirements
2. **FUNCTIONAL_SPEC_CIC_Prototype.md** (this document) - Detailed functional requirements
3. [TECHNICAL_SPEC_Customer_Intelligence.md](./TECHNICAL_SPEC_Customer_Intelligence.md) - Architecture and implementation
4. [DESIGN_SPEC_Customer_Intelligence.md](./DESIGN_SPEC_Customer_Intelligence.md) - UI/UX specifications
5. [EPICS_AND_SPRINTS.md](./EPICS_AND_SPRINTS.md) - Developer work breakdown and sprint planning

**Supporting Documentation:**
- [PROTOTYPE_STRATEGY.md](../../../docs/strategy/PROTOTYPE_STRATEGY.md) - Prototype-first development strategy and integration roadmap
- [MANUAL_CENSUS_DATA_ETL.md](../../../docs/data-pipeline/MANUAL_CENSUS_DATA_ETL.md) - Step-by-step Census data acquisition guide

**Prototype Location:**
- `/prototypes/cic-dashboard/` - Isolated prototype implementation (see [README](../../../prototypes/cic-dashboard/README.md))

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Data Integration Requirements](#2-data-integration-requirements)
3. [Customer Segmentation Module](#3-customer-segmentation-module)
4. [Corporate Connector Module](#4-corporate-connector-module)
5. [Confidence Scoring System](#5-confidence-scoring-system)
6. [Data Coverage Dashboard](#6-data-coverage-dashboard)
7. [User Interface Requirements](#7-user-interface-requirements)
8. [Non-Functional Requirements](#8-non-functional-requirements)

---

## 1. System Overview

### 1.1 Purpose

The CIC prototype is a **standalone web application** that enables PCC management to:
- Classify 50 VIP members into 4 behavioral segments
- Identify top 20 corporate connectors for B2B outreach
- Track data source completeness and confidence levels
- Import and visualize CourtReserve operational data

### 1.2 Scope (Prototype Phase)

**In Scope**:
- Phase 0: CourtReserve data integration (CSV import)
- Phase 1: Customer intelligence foundation (segmentation, corporate connectors)
- Features 2.2-2.6 from PRD (multi-source validation, ICP scoring, data coverage)

**Out of Scope** (Future Phases):
- Phase 2: Best practice research (programming ideas library)
- Phase 3: Yield management (scenario planner, event decision tool, ROI planner)
- Integration with existing Yield Optimizer dashboard

### 1.3 Users

**Primary User**: Christy (PCC Co-Founder & Operations Lead)

**Use Cases**:
1. Import weekly CourtReserve CSV reports
2. Review member segment assignments
3. Identify corporate connectors for outreach
4. Track data source coverage across member base
5. Export corporate connector lists for CRM

---

## 2. Data Integration Requirements

### 2.1 CourtReserve CSV Import

**Requirement ID**: FR-2.1
**Priority**: P0
**Source**: PRD Section 13

#### Functional Requirements

1. **Manual CSV Upload**
   - User can upload 4 CSV files via web UI:
     - Sales Summary Report (`sales_summary_YYYYMMDD.csv`)
     - Court Utilization Report (`court_utilization_YYYYMMDD.csv`)
     - Membership Revenue Report (`membership_revenue_YYYYMMDD.csv`)
     - Instructor Performance Report (`instructor_performance_YYYYMMDD.csv`)

2. **CSV Parsing & Validation**
   - System validates CSV structure (expected columns present)
   - System detects and reports parsing errors (malformed rows, missing required fields)
   - System displays import summary: "Imported 150 bookings, 50 members, $12,500 revenue"

3. **Data Transformation**
   - Map CourtReserve revenue categories → CIC revenue types (PRD Section 13.2)
   - Calculate derived metrics:
     - `bookingFrequency` = count of bookings / weeks since join
     - `peakOffPeakRatio` = % of bookings during 6-9pm weekdays
     - `revenuePerCourtHour` = revenue / duration

4. **Error Handling**
   - Display user-friendly error messages for:
     - Invalid CSV format
     - Missing required columns
     - Duplicate customer IDs (auto-merge strategy)
   - Allow partial import (skip invalid rows, import valid rows)

#### Acceptance Criteria

- ✅ User can upload 4 CSV files in single workflow
- ✅ System validates CSV structure before import
- ✅ Import summary shows counts and errors
- ✅ Imported data appears in Customer Segmentation view within 5 seconds
- ✅ Historical imports tracked (import date, file names, row counts)

---

### 2.2 Customer Profile Enrichment

**Requirement ID**: FR-2.2
**Priority**: P1
**Source**: PRD Section 2.2

#### Functional Requirements

1. **Survey Data Collection**
   - Link to Google Forms survey (10 JTBD questions)
   - Manual export from Google Sheets → CSV upload
   - Map survey responses to customer profiles:
     - `primaryMotivation` (JTBD Q2)
     - `strugglingMoment` (JTBD Q1)
     - `desiredOutcome` (JTBD Q2)
     - `competitiveAlternative` (JTBD Q5)

2. **LinkedIn/Employer Data Enrichment**
   - Manual entry form for corporate members:
     - Employer name
     - Job title
     - Job level (VP, Director, Manager, etc.)
     - Company size (employees)
     - Work address
     - LinkedIn profile URL
   - Auto-calculate `workDistance` (miles from PCC)

3. **Social Media Signals** (Optional - Phase 1B)
   - Manual entry: Instagram/Facebook handle
   - Track location tags, post frequency, hashtags

#### Acceptance Criteria

- ✅ Survey CSV can be uploaded and matched to customer IDs
- ✅ Employer enrichment form accessible from customer detail view
- ✅ Work distance auto-calculated using geocoding API
- ✅ All enrichment data visible in customer profile view

---

## 3. Customer Segmentation Module

### 3.1 Segment Classification

**Requirement ID**: FR-3.1
**Priority**: P0
**Source**: PRD Section 2.1

#### Functional Requirements

1. **4-Segment Taxonomy**
   - **Corporate Power Users**: High freq (3+ x/week), work nearby (<1 mi), weekday peak times
   - **Social Ambassadors**: Moderate freq (1-3 x/week), high event attendance, rotates partners
   - **Competitive Athletes**: High freq, follows pro players, tournament participation
   - **Casual Drop-ins**: Low freq (<1 x/week), pay-per-play, sporadic schedule

2. **Multi-Source Confidence Scoring** (Feature 2.2)
   - Weight booking behavior: 40%
   - Weight survey JTBD: 30%
   - Weight social signals: 15%
   - Weight demographics: 10%
   - Weight LinkedIn/employer: 5%
   - Calculate overall confidence: 0-100%
   - Flag members <70% confidence for manual review

3. **Segment Assignment Algorithm**
   - If confidence ≥85%: Auto-assign segment
   - If confidence 65-84%: Auto-assign with "Review" flag
   - If confidence <65%: Manual review required
   - Store assignment rationale (which data sources matched)

4. **Contradiction Detection** (Feature 2.3)
   - Detect conflicting signals:
     - Survey says "convenience" but lives 5+ miles away
     - High booking freq but low social engagement
     - Claims "competitive" but no tournament participation
   - Flag contradictions for manual review

#### Acceptance Criteria

- ✅ All 50 members assigned a segment
- ✅ Confidence score displayed for each member
- ✅ Contradictions flagged with specific messages
- ✅ Manual review queue shows low-confidence members
- ✅ Segment distribution chart shows counts (e.g., 12 Corporate, 9 Social, 15 Competitive, 14 Casual)

---

### 3.2 Segment Profile Views

**Requirement ID**: FR-3.2
**Priority**: P1
**Source**: PRD Section 2.3

#### Functional Requirements

1. **Segment Overview Dashboard**
   - Pie chart: segment distribution (4 slices)
   - Click slice → filter to that segment
   - Show key metrics per segment:
     - Member count
     - Avg booking frequency
     - Avg CLV
     - Top neighborhoods

2. **Segment Detail Page**
   - Member list (sortable table)
   - Segment characteristics (descriptive text)
   - Revenue contribution
   - Churn risk indicators

#### Acceptance Criteria

- ✅ Pie chart renders with correct percentages
- ✅ Clicking slice filters member table
- ✅ Segment metrics accurate (spot-check with raw data)

---

## 4. Corporate Connector Module

### 4.1 ICP Scoring System

**Requirement ID**: FR-4.1
**Priority**: P0
**Source**: PRD Section 2.5 (Feature)

#### Functional Requirements

1. **Objective 0-30 Point Scoring**
   - Company size: 0-10 points
     - 10 pts: 1000+ employees
     - 7 pts: 500-999 employees
     - 5 pts: 100-499 employees
     - 2 pts: 50-99 employees
     - 0 pts: <50 employees

   - Job level: 0-10 points
     - 10 pts: C-Suite (CEO, CFO, CMO)
     - 8 pts: VP/SVP
     - 6 pts: Director
     - 3 pts: Manager
     - 0 pts: Individual Contributor

   - Engagement: 0-5 points
     - 5 pts: 4+ bookings/week
     - 3 pts: 2-3 bookings/week
     - 1 pt: 1 booking/week
     - 0 pts: <1 booking/week

   - Proximity: 0-5 points
     - 5 pts: <0.5 mi from PCC
     - 3 pts: 0.5-1 mi
     - 1 pt: 1-2 mi
     - 0 pts: >2 mi

2. **ICP Tier Classification**
   - **Prime** (25-30 points): Top priority, immediate outreach
   - **Strong** (20-24 points): High priority, queue for outreach
   - **Potential** (15-19 points): Medium priority, monitor engagement

3. **Outreach Status Tracking**
   - Dropdown states: Not Contacted | Emailed | Booked | Declined
   - Last contact date
   - Notes field (free-form text)

#### Acceptance Criteria

- ✅ ICP score calculated for all Corporate Power Users
- ✅ Tier badge displayed (color-coded: Gold, Silver, Bronze)
- ✅ Table sortable by ICP score (default: descending)
- ✅ Outreach status persisted across sessions

---

### 4.2 Corporate Connector Table

**Requirement ID**: FR-4.2
**Priority**: P0
**Source**: PRD Section 8.3 (UI Spec from Design Spec)

#### Functional Requirements

1. **Table Columns**
   - Name
   - Employer
   - Job Title
   - ICP Score (with tier badge)
   - Booking Frequency
   - Confidence % (with badge)
   - Outreach Status (dropdown)
   - Actions (Copy Email button)

2. **Filtering**
   - Filter by employer (dropdown, multi-select)
   - Filter by job level (VP, Director, Manager)
   - Filter by ICP tier (Prime, Strong, Potential)
   - Filter by outreach status

3. **Sorting**
   - All columns sortable (click header)
   - Default sort: ICP score (descending)
   - Secondary sort: booking frequency (descending)

4. **Export**
   - Export to CSV (filtered results)
   - Include all table columns + email address
   - Filename: `corporate_connectors_YYYYMMDD.csv`

#### Acceptance Criteria

- ✅ Table displays top 20 corporate connectors
- ✅ All filters functional
- ✅ Sorting works on all columns
- ✅ CSV export includes correct data
- ✅ Copy Email button copies personalized template

---

## 5. Confidence Scoring System

### 5.1 Multi-Source Validation

**Requirement ID**: FR-5.1
**Priority**: P1
**Source**: PRD Section 2.2 (Feature)

#### Functional Requirements

1. **5 Data Sources**
   - **Source 1**: Booking Behavior (40% weight)
     - Required fields: `bookingFrequency`, `peakOffPeakRatio`, `partnerCount`, `dwellTime`, `eventAttendance`
     - Match criteria: Booking patterns align with segment characteristics

   - **Source 2**: Survey JTBD (30% weight)
     - Required fields: `primaryMotivation`, `strugglingMoment`, `desiredOutcome`
     - Match criteria: JTBD responses align with segment motivations

   - **Source 3**: Social Signals (15% weight)
     - Required fields: `socialHandles`, `postFrequency`, `locationTags`, `contentTheme`
     - Match criteria: Social media behavior aligns with segment

   - **Source 4**: Demographics (10% weight)
     - Required fields: `censusTract`, `medianIncome`, `educationBachelors`, `populationDensity`
     - Match criteria: Census tract demographics align with segment profile

   - **Source 5**: LinkedIn/Employer (5% weight)
     - Required fields: `employer`, `jobLevel`, `workDistance`
     - Match criteria: Employment data aligns with segment (e.g., Corporate = nearby office)

2. **Confidence Calculation**
   - For each source available:
     - Calculate match score (0-100%)
     - Multiply by source weight
     - Sum across all sources
   - Normalize to available sources (if only 3 sources, redistribute weights)

3. **Confidence Breakdown Display**
   - Show tooltip with source-by-source breakdown
   - Visual indicators: ✓ (available), ✗ (missing), ⚠ (partial match)

#### Acceptance Criteria

- ✅ Confidence score updates when new data sources added
- ✅ Tooltip shows breakdown of all 5 sources
- ✅ Missing sources clearly indicated
- ✅ Score normalized correctly when sources missing

---

### 5.2 Confidence Badge UI

**Requirement ID**: FR-5.2
**Priority**: P1
**Source**: Design Spec Section 7

#### Functional Requirements

1. **Badge Display**
   - Show in Corporate Connector table (new column)
   - Show in customer profile view (prominent placement)
   - Color-coded by tier:
     - Green (85-100%): High confidence
     - Yellow (65-84%): Medium confidence
     - Red (40-64%): Low confidence

2. **Tooltip Interaction**
   - Hover: Show detailed breakdown
   - Click: Open full data source analysis modal

#### Acceptance Criteria

- ✅ Badge color updates in real-time
- ✅ Tooltip displays on hover
- ✅ Modal shows full breakdown on click

---

## 6. Data Coverage Dashboard

### 6.1 Coverage Widget

**Requirement ID**: FR-6.1
**Priority**: P1
**Source**: Design Spec Section 8

#### Functional Requirements

1. **Source Icons Grid**
   - 5 icons (📈 📋 📱 🗺️ 👔)
   - Show count: "50/50" (members with data / total members)
   - Show percentage: "100%"
   - Color-code icon by coverage:
     - 100%: Full color
     - 50-99%: Desaturated
     - <50%: Grayscale

2. **Summary Stats**
   - "X members (Y%) have all 5 data sources"
   - "X members (Y%) have 3-4 sources"
   - "X members (Y%) have <3 sources"
   - Average confidence score across all members

3. **Action Buttons**
   - "View Members Needing Data" → Opens drill-down modal
   - "Export Gap Analysis" → Generates CSV

#### Acceptance Criteria

- ✅ Widget updates daily (cached for performance)
- ✅ Icons accurately reflect coverage
- ✅ Summary stats calculated correctly
- ✅ Drill-down modal shows filterable member list

---

### 6.2 Data Gap Drill-Down

**Requirement ID**: FR-6.2
**Priority**: P1
**Source**: Design Spec Section 8

#### Functional Requirements

1. **Filter Options**
   - Missing survey data
   - Missing social media
   - Missing LinkedIn
   - <3 total sources (high priority)

2. **Member List Table**
   - Name, Segment, Missing Data (icons), Confidence %
   - Sortable by confidence (ascending = worst first)

3. **Bulk Actions**
   - "Email Survey Request to Selected (X)"
   - "Request LinkedIn Data from Selected (X)"
   - "Offer $10 Credit for Instagram Connect"

#### Acceptance Criteria

- ✅ Filters work independently and in combination
- ✅ Bulk actions send emails with personalized templates
- ✅ Member list updates after data added

---

## 7. User Interface Requirements

### 7.1 Navigation

**Requirement ID**: FR-7.1
**Priority**: P0

#### Functional Requirements

1. **Main Navigation Tabs**
   - Dashboard (home)
   - Customer Intelligence (segments, corporate connectors)
   - Data Coverage (gap analysis)

2. **Breadcrumbs**
   - Show current location: "Dashboard > Customer Intelligence > Corporate Connectors"

3. **Filter Panel**
   - Persistent left sidebar
   - Segment filter (4 checkboxes)
   - ICP tier filter (3 checkboxes)
   - Outreach status filter (4 checkboxes)

#### Acceptance Criteria

- ✅ Navigation tabs functional
- ✅ Breadcrumbs update on page change
- ✅ Filters persist across views

---

### 7.2 Responsive Design

**Requirement ID**: FR-7.2
**Priority**: P2

#### Functional Requirements

1. **Desktop (1280px+)**
   - 2-column layout (sidebar + main content)
   - Tables show all columns

2. **Tablet (768-1279px)**
   - Sidebar collapses to hamburger menu
   - Tables show 5 key columns, others hidden

3. **Mobile (<768px)** (graceful degradation, not primary target)
   - Single column layout
   - Tables show 3 key columns
   - Horizontal scroll for full table

#### Acceptance Criteria

- ✅ Layout responsive on all screen sizes
- ✅ No horizontal scroll on desktop/tablet
- ✅ Touch targets ≥44px on tablet/mobile

---

## 8. Non-Functional Requirements

### 8.1 Performance

**Requirement ID**: NFR-8.1
**Priority**: P1

1. **Load Times**
   - Initial page load: <2 seconds (with cached data)
   - CSV import: <5 seconds for 200 rows
   - Segment chart render: <500ms
   - Table filter: <200ms

2. **Data Refresh**
   - Confidence scores recalculate in real-time when data added
   - Coverage widget updates daily at midnight (cached)

#### Acceptance Criteria

- ✅ All load times meet targets on typical hardware
- ✅ No UI blocking during long operations (show loading spinner)

---

### 8.2 Data Quality

**Requirement ID**: NFR-8.2
**Priority**: P0

1. **Validation Rules**
   - Booking frequency: 0-7 bookings/week (cannot exceed 7)
   - Work distance: 0-50 miles (flag outliers)
   - Company size: 1-999,999 employees
   - Confidence score: 0-100%

2. **Duplicate Detection**
   - Detect duplicate customer IDs during CSV import
   - Auto-merge strategy: Keep newest data, preserve historical bookings

#### Acceptance Criteria

- ✅ Invalid data rejected with clear error messages
- ✅ Duplicates merged correctly

---

### 8.3 Accessibility

**Requirement ID**: NFR-8.3
**Priority**: P1

1. **WCAG 2.1 AA Compliance**
   - Color contrast ≥4.5:1 for text
   - All interactive elements keyboard accessible
   - ARIA labels on complex components

2. **Screen Reader Support**
   - Semantic HTML (`<table>`, `<nav>`, `<header>`)
   - ARIA labels on charts and custom controls

#### Acceptance Criteria

- ✅ Passes automated accessibility audit (aXe)
- ✅ Manual keyboard navigation test passes

---

### 8.4 Security & Privacy

**Requirement ID**: NFR-8.4
**Priority**: P0

1. **Data Handling**
   - No email addresses in exported CSVs (use member ID only)
   - Survey responses stored only in Google Sheets (not public)
   - Employer/work address data restricted access

2. **Authentication** (Future Phase)
   - Prototype: No authentication (local only)
   - Production: Will require login

#### Acceptance Criteria

- ✅ Sensitive data not exposed in CSV exports
- ✅ No console logs with PII

---

## Appendix: Feature Mapping

**PRD Section → Functional Spec Mapping**:

| PRD Section | Functional Spec Section |
|-------------|-------------------------|
| Phase 0 (Data Integration) | FR-2.1, FR-2.2 |
| Feature 2.1 (Segments) | FR-3.1, FR-3.2 |
| Feature 2.2 (Multi-source confidence) | FR-5.1, FR-5.2 |
| Feature 2.5 (ICP scoring) | FR-4.1, FR-4.2 |
| Feature 2.6 (Competitor proximity) | FR-3.1 (built into segmentation) |
| Feature 2.7 (Data coverage) | FR-6.1, FR-6.2 |
| UI Specs (Design Spec) | FR-7.1, FR-7.2 |

---

**End of Functional Specification**
