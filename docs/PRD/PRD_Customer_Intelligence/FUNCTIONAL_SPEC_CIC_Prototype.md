# Functional Specification: Customer Intelligence Center (CIC) Prototype

**Project**: PCC Yield Optimizer - Customer Intelligence Center Prototype
**Version**: 2.0 (Updated with Revision A + Addendum B)
**Last Updated**: October 25, 2025
**Source**: [PRD_CIC_Prototype.md](./PRD_CIC_Prototype.md), [revisions-a.md](./revisions/revisions-a.md), [addendum-b.md](./revisions/addendum-b.md)

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
- [PROTOTYPE_STRATEGY.md](../../strategy/PROTOTYPE_STRATEGY.md) - Prototype-first development strategy and integration roadmap
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
7. [JTBD Inference Module](#7-jtbd-inference-module) *(NEW - Revision A)*
8. [Competitive Programming Library](#8-competitive-programming-library) *(NEW - Addendum B)*
9. [Membership Capacity Dashboard](#9-membership-capacity-dashboard) *(NEW - Addendum B)*
10. [User Interface Requirements](#10-user-interface-requirements)
11. [Non-Functional Requirements](#11-non-functional-requirements)

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
- **NEW (Revision A)**: JTBD inference from booking patterns
- **NEW (Addendum B)**: Competitive programming library (manual research)
- **NEW (Addendum B)**: Membership capacity optimization dashboard

**Out of Scope** (Future Phases):
- Phase 2: Explicit JTBD tracking (check-in surveys, kiosk integration)
- Phase 3: Automated competitive intelligence monitoring (social media APIs)
- Phase 4: Multi-asset yield optimization (mezzanine amenities don't exist yet)
- Integration with existing Yield Optimizer dashboard

### 1.3 Users

**Primary User**: Christy (PCC Co-Founder & Operations Lead)

**Use Cases**:
1. Import weekly CourtReserve CSV reports
2. Review member segment assignments
3. Identify corporate connectors for outreach
4. Track data source coverage across member base
5. Export corporate connector lists for CRM
6. **NEW**: Discover why members choose PCC (JTBD inference)
7. **NEW**: Find successful competitor programs to replicate
8. **NEW**: Determine optimal membership capacity without cannibalizing non-member revenue

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
   - **NEW (Revision A)**: Tag bookings with JTBD context:
     - `context_day` = day of week (Monday-Sunday)
     - `context_time_block` = time slot (Early Morning, Morning, Midday, Afternoon, Evening)
     - `context_full` = combined (e.g., "Wednesday Morning 7-9am")
     - `inferred_jtbd` = likely job to be done (competitive, social, fitness, skill_dev, corporate, family)
     - `jtbd_confidence` = inference confidence (0-100%)

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
- ✅ **NEW**: JTBD context fields populated for all bookings
- ✅ **NEW**: Inferred JTBD confidence scores calculated
- ✅ **NEW**: Customer JTBD profiles built from booking patterns

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

## 7. JTBD Inference Module

### 7.1 Context-Based JTBD Inference

**Requirement ID**: FR-7.1
**Priority**: P0
**Source**: Revision A (revisions-a.md), TECHNICAL_SPEC Section 9.8

#### Functional Requirements

1. **Hybrid JTBD Approach (Phase 1: Inferred)**
   - Automatically infer customer JTBD from booking patterns
   - No new operational burden (uses existing CourtReserve data)
   - Defers explicit JTBD tracking (surveys, kiosks) to Phase 2

2. **6 JTBD Taxonomy**
   - **Competitive Performance**: Tournament play, skill improvement, ranking pursuit
   - **Social Connection**: Fun, networking, community belonging, themed events
   - **Fitness & Wellness**: Exercise, health maintenance, stress relief
   - **Skill Development**: Learning technique, gaining confidence, lessons
   - **Corporate/Team Building**: Work events, professional networking, lunch leagues
   - **Family/Youth**: Parent-child bonding, youth development, family activities

3. **Context Tracking Fields** (populated during CSV import)
   - `context_day`: Monday, Tuesday, ..., Sunday
   - `context_time_block`:
     - Early Morning (6-9am)
     - Morning (9am-12pm)
     - Midday (12-3pm)
     - Afternoon (3-6pm)
     - Evening (6-9pm)
   - `context_full`: Combined field (e.g., "Wednesday Morning 7-9am")
   - `inferred_jtbd`: Algorithm-assigned JTBD
   - `jtbd_confidence`: 0-100% confidence in inference

4. **JTBD Inference Algorithm**
   - Analyze booking signals (see TECHNICAL_SPEC Section 9.8.3):
     - Time patterns (weekday morning = competitive/corporate, Friday evening = social)
     - Frequency patterns (regular = fitness, sporadic = skill development)
     - Event attendance (high = social, low = competitive)
     - Partner rotation (high = social, low = competitive)
     - Lesson bookings (skill development signal)
     - Tournament participation (competitive signal)
     - Work proximity (corporate signal)

   - Calculate JTBD scores across all 6 types
   - Assign primary JTBD (highest score)
   - Calculate confidence based on signal strength

   - **Confidence Thresholds**:
     - ≥85%: Auto-assign (high confidence)
     - 70-84%: Auto-assign with "Review" flag
     - <70%: Manual review required

5. **Multi-Context JTBD Profiles**
   - Recognize customers can have different JTBDs at different times
   - Track customer JTBD by context (day × time block)
   - Example: "John = Competitive (Wednesday 7am) + Social (Friday 7pm)"
   - Store JTBD diversity score (1-6, number of unique JTBDs)
   - Identify primary and secondary JTBDs

#### Acceptance Criteria

- ✅ All bookings tagged with `context_day`, `context_time_block`, `context_full`
- ✅ JTBD inference algorithm runs during CSV import
- ✅ Customer JTBD profiles built with contexts array
- ✅ Confidence scores ≥70% for 80%+ of customers
- ✅ Manual review queue shows low-confidence inferences (<70%)
- ✅ Multi-context customers identified (JTBD diversity ≥2)

---

### 7.2 JTBD Profile View

**Requirement ID**: FR-7.2
**Priority**: P1
**Source**: Revision A, Design Spec (future section)

#### Functional Requirements

1. **Customer Profile JTBD Section**
   - Display primary JTBD badge (e.g., "Social Connection 🎉")
   - Display secondary JTBD if diversity ≥2
   - Show confidence percentage with color-coding:
     - Green (≥85%): High confidence
     - Yellow (70-84%): Medium confidence
     - Red (<70%): Low confidence, needs review

2. **JTBD Contexts Table**
   - Show all contexts where customer plays
   - Columns: Context (day + time), JTBD, Frequency, Last Visit
   - Example rows:
     - "Wednesday Morning 7-9am | Competitive | 12 visits | Oct 10"
     - "Friday Evening 6-9pm | Social | 6 visits | Oct 18"
   - Sortable by frequency (default: descending)

3. **JTBD Inference Signals Tooltip**
   - Hover over confidence badge → show signal breakdown
   - Display matched signals (✓) and missing signals (✗)
   - Example:
     ```
     Competitive Signals (85% confidence):
     ✓ Weekday morning bookings (12 instances)
     ✓ Consistent schedule (same time each week)
     ✓ Tournament participation (2 events)
     ✗ Pro player following (not tracked)
     ```

4. **Manual JTBD Override**
   - Allow Christy to manually assign JTBD if algorithm wrong
   - Mark as "Manual Override" with note field
   - Override takes precedence over inferred JTBD
   - Track override reason for algorithm improvement

#### Acceptance Criteria

- ✅ JTBD badge displays on customer profile page
- ✅ Contexts table shows all customer booking contexts
- ✅ Tooltip displays signal breakdown on hover
- ✅ Manual override functional and persists
- ✅ Override reason stored for future algorithm tuning

---

### 7.3 JTBD Demand Heatmap

**Requirement ID**: FR-7.3
**Priority**: P2
**Source**: Revision A Section 4.2

#### Functional Requirements

1. **7x5 Heatmap Grid**
   - Rows: Monday, Tuesday, ..., Sunday (7 days)
   - Columns: Early Morning, Morning, Midday, Afternoon, Evening (5 time blocks)
   - Cells: Color-coded by JTBD demand intensity

2. **JTBD Filter Toggle**
   - Filter by single JTBD type (e.g., "Show only Social JTBD demand")
   - Color intensity = number of bookings with that JTBD in that context
   - Legend: Light blue (1-5 bookings) → Dark blue (20+ bookings)

3. **Cell Click Interaction**
   - Click cell → drill down to customer list
   - Show customers who play in that context with that JTBD
   - Display booking count, last visit, confidence score

4. **Programming Gap Identification**
   - Highlight cells with high demand but low supply (unfulfilled JTBD)
   - Example: Friday Evening Social JTBD (high demand, but PCC lacks themed events)
   - Show warning icon on cells with demand > capacity

#### Acceptance Criteria

- ✅ Heatmap renders with correct data for all 35 cells
- ✅ JTBD filter updates heatmap in real-time
- ✅ Cell click shows customer drill-down
- ✅ Gap identification highlights programming opportunities
- ✅ Color intensity scales correctly with booking volume

---

## 8. Competitive Programming Library

### 8.1 Competitor Program Data Model

**Requirement ID**: FR-8.1
**Priority**: P1
**Source**: Addendum B, COMPETITIVE_INTELLIGENCE_REPORT.md, FEAT-016

#### Functional Requirements

1. **Program Data Structure** (from `competitor-programs.json`)
   - `id`: Unique program ID
   - `name`: Program name (e.g., "Glow-in-the-Dark Pickleball")
   - `source_club`: Where program is run (e.g., "Pickle Haus")
   - `jtbd`: Primary JTBD served (competitive, social, fitness, skill_dev, corporate, family)
   - `program_type`: Category (themed_event, league, corporate, family, tournament, clinic)
   - `pricing`: Pricing model (e.g., "$20-30/person")
   - `estimated_attendance`: Expected turnout (e.g., "60-100 people")
   - `pcc_feasibility`: High, Medium, Low (can PCC replicate this?)
   - `estimated_pcc_revenue`: Revenue estimate for PCC
   - `estimated_pcc_cost`: Cost estimate for PCC
   - `estimated_pcc_profit`: Net profit estimate
   - `success_score`: 0-100 (weighted by feasibility, revenue, urgency)
   - `urgency`: Critical, High, Medium, Low (based on competitive leakage risk)
   - `description`: 2-3 sentence description
   - `implementation_notes`: PCC-specific considerations
   - `source_url`: Link to competitor website/social media

2. **Program Library Size**
   - Phase 1: 20+ manually curated programs (from competitive research)
   - Programs span all 6 JTBD types
   - Mix of local (Chicago clubs) and national (best practices)

3. **Manual Data Entry** (Phase 1)
   - JSON file (`/prototypes/cic-dashboard/data/competitor-programs.json`)
   - Updated via code editor (no admin UI in Phase 1)
   - Versioned via git commits

#### Acceptance Criteria

- ✅ JSON file with ≥20 programs created
- ✅ All required fields populated for each program
- ✅ Programs cover all 6 JTBD types
- ✅ Success scores calculated using consistent methodology
- ✅ Feasibility ratings realistic for PCC context

---

### 8.2 Programming Ideas Table

**Requirement ID**: FR-8.2
**Priority**: P1
**Source**: Addendum B, FEAT-016, COMPETITIVE_INTELLIGENCE_REPORT.md

#### Functional Requirements

1. **Table Columns**
   - Program Name (linked to detail view)
   - Source Club
   - JTBD Badge (color-coded by type)
   - Success Score (0-100, with bar chart)
   - Urgency (badge: 🔴 Critical, 🟠 High, 🟡 Medium, 🟢 Low)
   - PCC Feasibility (High, Medium, Low)
   - Estimated Revenue
   - Estimated Profit
   - Actions (View Details, Mark as Implemented)

2. **Filtering**
   - Filter by JTBD type (multi-select checkboxes)
   - Filter by urgency level (Critical, High, Medium, Low)
   - Filter by feasibility (High, Medium, Low)
   - Filter by program type (themed event, league, corporate, etc.)
   - "Quick Win" filter: High feasibility + High urgency + Estimated profit >$2K

3. **Sorting**
   - Default: Success score (descending)
   - All columns sortable
   - Secondary sort: Urgency (Critical → Low)

4. **Search**
   - Text search across program name, description, source club
   - Real-time filtering as user types

5. **Program Detail Modal**
   - Click program name → modal opens
   - Display full description, implementation notes, source URL
   - Show estimated revenue/cost/profit breakdown
   - Show competitor photos/examples (if available)
   - "Mark as Implemented" button (tracks program adoption)

#### Acceptance Criteria

- ✅ Table displays all 20+ programs
- ✅ All filters functional (can combine multiple filters)
- ✅ Sorting works on all columns
- ✅ Search returns relevant results
- ✅ Detail modal shows complete program information
- ✅ "Quick Win" filter identifies high-priority opportunities

---

### 8.3 Competitive Gap Analysis

**Requirement ID**: FR-8.3
**Priority**: P1
**Source**: COMPETITIVE_INTELLIGENCE_REPORT.md

#### Functional Requirements

1. **JTBD Gap Scoring**
   - Compare PCC programming vs. competitors by JTBD
   - Rating scale: ⭐ (weak) to ⭐⭐⭐⭐⭐ (strong)
   - Based on competitive research findings:
     - **Competitive**: PCC ⭐⭐⭐⭐ vs. Competitors ⭐⭐⭐⭐ (parity)
     - **Social**: PCC ⭐ vs. Competitors ⭐⭐⭐⭐⭐ (CRITICAL GAP)
     - **Fitness**: PCC ⭐⭐⭐ vs. Competitors ⭐⭐⭐⭐ (moderate gap)
     - **Skill Development**: PCC ⭐⭐⭐⭐ vs. Competitors ⭐⭐⭐⭐ (parity)
     - **Corporate**: PCC ⭐⭐⭐⭐⭐ vs. Competitors ⭐⭐⭐ (strength)
     - **Family**: PCC ⭐⭐ vs. Competitors ⭐⭐⭐⭐⭐ (gap)

2. **Gap Visualization**
   - Horizontal bar chart comparing PCC vs. Competitors
   - Red bars = gaps (PCC weaker)
   - Green bars = strengths (PCC stronger)
   - Click bar → show recommended programs to close gap

3. **Customer Leakage Risk**
   - Calculate revenue at risk due to JTBD gaps
   - Formula: (# customers with unmet JTBD) × (avg CLV) × (churn probability)
   - Example: Social JTBD gap = 15 customers × $450 CLV × 50% churn = $3,375 at risk
   - Display total leakage risk across all gaps

4. **Recommended Actions**
   - For each gap, show top 3 recommended programs
   - Sorted by success score
   - Show estimated revenue impact if implemented
   - Example: "Close Social JTBD gap → +$27,600/year from Glow Pickleball"

#### Acceptance Criteria

- ✅ JTBD gap chart displays with accurate ratings
- ✅ Gap calculations based on competitive research data
- ✅ Leakage risk formula validated with historical data
- ✅ Recommended programs relevant to each gap
- ✅ Revenue impact estimates realistic

---

## 9. Membership Capacity Dashboard

### 9.1 Utilization Heatmap

**Requirement ID**: FR-9.1
**Priority**: P0
**Source**: Addendum B, FEAT-015

#### Functional Requirements

1. **7x5 Utilization Grid**
   - Rows: Monday, Tuesday, ..., Sunday
   - Columns: Early Morning, Morning, Midday, Afternoon, Evening
   - Cells: Color-coded by court utilization %
   - Color scale:
     - Green (0-50%): Under-utilized
     - Yellow (50-80%): Healthy utilization
     - Orange (80-95%): Near capacity
     - Red (95-100%): At capacity, bottleneck risk

2. **Member vs. Non-Member Split**
   - Each cell shows split:
     - Member hours (blue)
     - Non-member hours (green)
   - Tooltip: "Wednesday Evening: 75% utilized (60% members, 15% non-members)"

3. **Peak Constraint Identification**
   - Highlight cells ≥95% utilization (red)
   - These are bottlenecks limiting membership growth
   - Show warning: "Cannot add members without reducing non-member capacity"

4. **Historical Comparison** (Optional - Phase 1B)
   - Toggle: "Compare to last month" or "Compare to last year"
   - Show utilization trend (↑ ↓ →)

#### Acceptance Criteria

- ✅ Heatmap renders with accurate utilization data
- ✅ Member/non-member split displayed in each cell
- ✅ Color coding accurately reflects utilization levels
- ✅ Peak constraints (≥95%) highlighted
- ✅ Tooltip shows detailed breakdown on hover

---

### 9.2 Membership Capacity Calculator

**Requirement ID**: FR-9.2
**Priority**: P0
**Source**: Addendum B, FEAT-015

#### Functional Requirements

1. **Current State Summary**
   - Total memberships: [X] (from CourtReserve data)
   - Avg member court hours/week: [Y]
   - Total member court hours/week: [X × Y]
   - Total court hours available/week: [Courts × Hours × 7 days]
   - Current utilization: [%]

2. **Capacity Scenario Modeler**
   - Input fields:
     - Target utilization % (slider: 50-100%, default 85%)
     - Minimum non-member hours/week (input, default 20%)
     - Member booking frequency (dropdown: 1x/week, 2x/week, 3x/week)

   - Calculations:
     - Max member hours = (Total hours × Target utilization) - Min non-member hours
     - Max memberships = Max member hours / Member booking frequency
     - Revenue impact = (New memberships × Membership price) - (Lost non-member revenue)

3. **Scenario Comparison Table**
   - Pre-defined scenarios:
     - **Aggressive Growth**: 90% utilization, 10% non-member reserve
     - **Balanced**: 85% utilization, 20% non-member reserve
     - **Conservative**: 75% utilization, 30% non-member reserve

   - Columns: Scenario, Max Memberships, Member Revenue, Non-Member Revenue, Total Revenue, Risk Level

4. **Growth Recommendation**
   - Algorithm determines optimal membership count
   - Constraints:
     - No time block should exceed 95% utilization
     - Reserve ≥20% non-member capacity (more profitable per hour)
     - Maintain accessibility for drop-ins (important for acquisition funnel)

   - Output: "PCC can support X additional memberships (Y total) while preserving non-member capacity"

#### Acceptance Criteria

- ✅ Current state metrics calculated from CourtReserve data
- ✅ Scenario modeler inputs functional
- ✅ Max membership calculations accurate
- ✅ Revenue impact estimates realistic (validated with historical data)
- ✅ Growth recommendation considers peak constraints
- ✅ Warning displayed if recommendation exceeds capacity

---

### 9.3 Membership vs. Non-Member Revenue Analysis

**Requirement ID**: FR-9.3
**Priority**: P1
**Source**: Addendum B, User requirement (priority #2)

#### Functional Requirements

1. **Revenue Comparison Chart**
   - Stacked bar chart: Member revenue (blue) vs. Non-member revenue (green)
   - X-axis: Week or month
   - Y-axis: Revenue ($)
   - Show trend over time (last 12 weeks)

2. **Per-Hour Revenue Metrics**
   - Member revenue/hour: $ [X]
   - Non-member revenue/hour: $ [Y]
   - Delta: $ [Y - X] (likely positive, non-members more profitable)
   - Callout: "Non-members generate [Z]% more revenue per court hour"

3. **Membership Breakeven Analysis**
   - Calculate: "How many member court hours = 1 non-member court hour?"
   - Example: Non-member pays $30/hour, member pays $15/hour → Need 2 member hours to equal 1 non-member hour
   - Show warning if membership growth reduces total revenue

4. **Cannibalization Risk Calculator**
   - Input: Additional memberships (slider: 0-50)
   - Calculate: Estimated non-member hours displaced
   - Calculate: Net revenue impact (member gain - non-member loss)
   - Display result: "Adding X members = +$[A] member revenue, -$[B] non-member revenue, Net: $[A-B]"

#### Acceptance Criteria

- ✅ Revenue comparison chart displays historical data
- ✅ Per-hour metrics calculated from CourtReserve data
- ✅ Breakeven analysis accurate
- ✅ Cannibalization calculator functional
- ✅ Warning displays if net revenue impact is negative

---

## 10. User Interface Requirements

### 10.1 Navigation

**Requirement ID**: FR-10.1
**Priority**: P0

#### Functional Requirements

1. **Main Navigation Tabs**
   - Dashboard (home)
   - Customer Intelligence (segments, corporate connectors, JTBD profiles)
   - **NEW**: Programming Ideas (competitive library, gap analysis)
   - **NEW**: Membership Capacity (utilization, scenarios, revenue analysis)
   - Data Coverage (gap analysis)

2. **Breadcrumbs**
   - Show current location: "Dashboard > Customer Intelligence > Corporate Connectors"

3. **Filter Panel**
   - Persistent left sidebar
   - Segment filter (4 checkboxes)
   - **NEW**: JTBD filter (6 checkboxes: competitive, social, fitness, skill_dev, corporate, family)
   - ICP tier filter (3 checkboxes)
   - Outreach status filter (4 checkboxes)
   - **NEW**: Urgency filter (4 checkboxes: critical, high, medium, low) - for Programming Ideas view
   - **NEW**: Feasibility filter (3 checkboxes: high, medium, low) - for Programming Ideas view

#### Acceptance Criteria

- ✅ Navigation tabs functional
- ✅ Breadcrumbs update on page change
- ✅ Filters persist across views

---

### 10.2 Responsive Design

**Requirement ID**: FR-10.2
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

## 11. Non-Functional Requirements

### 11.1 Performance

**Requirement ID**: NFR-11.1
**Priority**: P1

1. **Load Times**
   - Initial page load: <2 seconds (with cached data)
   - CSV import: <5 seconds for 200 rows
   - Segment chart render: <500ms
   - Table filter: <200ms
   - **NEW**: JTBD inference: <10 seconds for 200 bookings (runs during CSV import)
   - **NEW**: Heatmap render (7×5 grid): <1 second
   - **NEW**: Membership capacity calculations: <2 seconds

2. **Data Refresh**
   - Confidence scores recalculate in real-time when data added
   - Coverage widget updates daily at midnight (cached)
   - **NEW**: JTBD profiles update when new bookings imported
   - **NEW**: Utilization heatmap refreshes weekly (auto-import from CourtReserve)

#### Acceptance Criteria

- ✅ All load times meet targets on typical hardware
- ✅ No UI blocking during long operations (show loading spinner)

---

### 11.2 Data Quality

**Requirement ID**: NFR-11.2
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

### 11.3 Accessibility

**Requirement ID**: NFR-11.3
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

### 11.4 Security & Privacy

**Requirement ID**: NFR-11.4
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
| **Revision A (JTBD Segmentation)** | **FR-7.1, FR-7.2, FR-7.3** |
| **Addendum B (Competitive Intel)** | **FR-8.1, FR-8.2, FR-8.3** |
| **Addendum B (Membership Capacity)** | **FR-9.1, FR-9.2, FR-9.3** |
| UI Specs (Design Spec) | FR-10.1, FR-10.2 |
| Non-Functional Requirements | NFR-11.1, NFR-11.2, NFR-11.3, NFR-11.4 |

**GitHub Issue Mapping**:

| Issue | Description | Functional Spec Section |
|-------|-------------|-------------------------|
| FEAT-014 | JTBD Inference Algorithm | FR-7.1, FR-7.2, FR-7.3 |
| FEAT-015 | Membership Capacity Dashboard | FR-9.1, FR-9.2, FR-9.3 |
| FEAT-016 | Competitive Programming Library | FR-8.1, FR-8.2, FR-8.3 |

---

**End of Functional Specification**
