# Alternate Product Requirements: Customer Intelligence Center (CIC)
Built with new information about CourtReserve data availability.

## Product Overview

**Product Name:** Customer Intelligence Center (CIC)  
**Version:** 1.0  
**Target Users:** PCC Management Team (Chris, Christy, Investors)  
**Platform:** Web Application

## Executive Summary

The Customer Intelligence Center is a strategic decision support platform that enables PCC management to maximize profitable growth while maintaining 99th percentile customer satisfaction. The CIC integrates competitive intelligence, customer behavioral data, and demographic insights to drive data-informed decisions about programming, pricing, and capacity optimization.

---

## 1. Core Objectives

### Primary Goals
1. **Drive Membership Growth** - Optimize recurring revenue through targeted member acquisition
2. **Yield Optimization** - Balance court utilization across members, non-members, events, and training
3. **Customer Satisfaction** - Maintain superior experience while maximizing profitability
4. **Competitive Intelligence** - Understand market positioning and identify opportunities

### Success Metrics
- Net Revenue Retention (NRR) increase
- Customer Lifetime Value (LTV) growth
- Member acquisition cost reduction
- Court utilization rate optimization
- Customer satisfaction scores (NPS)

---

## 2. Customer Segmentation Module

### 2.1 Segment Taxonomy

**Primary Segments:**
- **Pickleball Obsessed** (Estimated 75%)
  - Tournament players
  - Multi-club members
  - High-frequency visitors (5+ times/week)
  - Advanced skill level

- **Social Players**
  - Moderate skill level
  - Primary motivation: social interaction
  - Post-play hangout preference
  - 1-3 times/week visitors

- **Stay-at-Home Demographics**
  - Weekday 10am-2pm availability
  - Social + fitness motivation
  - Group/league preference

- **Corporate/B2B**
  - Team building events
  - Flexible scheduling needs
  - Price-insensitive for special events

- **Youth/Student Programs**
  - High school leagues
  - Recurring schedule requirements
  - Parent coordination needed

- **Beginners/Intimidated**
  - Need dedicated beginner times
  - Require welcoming environment
  - Skill development focus

- **Singletons vs. Groups**
  - Solo visitors seeking partners
  - Pre-formed groups/pods
  - Different scheduling needs

### 2.2 Data Collection Requirements
**Existing Data Available (CourtReserve Reports):**

**Court Utilization Data:**

-   Court usage heatmap (by court, date range, time slot)
-   Court utilization percentages
-   Filterable by court type, date, time slot
-   ✅ **Already captures: which courts are used when**
-   ❌ **Does NOT capture: who used them, duration per customer**

**Financial Data:**

-   Sales summary by revenue category
-   Membership revenue (sales and renewals)
-   Individual instructor revenue
-   Cash basis monthly summaries
-   Revenue, expenses, key financial metrics

**Membership Data:**

-   Overall member engagement metrics
-   Membership revenue tracking
-   ✅ **Already captures: member status, revenue**
-   ❌ **Does NOT capture: visit frequency, segment classification, other club memberships**

**NEW Data Collection Needs (To Supplement CourtReserve):**

**Customer Check-In Enhancement:**
-   Link CourtReserve bookings to customer profiles
-   Capture arrival/departure times (total facility time vs. court time)
-   Track: court time vs. social/dining time
-   **Implementation:** Tablet/QR at front desk that links to CourtReserve customer ID

**Customer Profile Enrichment Survey (One-Time + New Member):**
-   Home address *(may be in CourtReserve already - verify)*
-   Work address
-   Other club memberships ("Where else do you play?")
-   Skill level (beginner/intermediate/advanced)
-   Primary motivation (competitive play, social, fitness, other)
-   How did you hear about PCC?
-   Social media handles (optional)

**Ongoing Feedback Collection:**
-   Monthly NPS survey (email to members)
-   Post-event satisfaction survey
-   "Why are you here today?" kiosk question

**Customer Check-In System:**
- Tablet/QR code at front desk
- Capture: arrival time, departure time, court time vs. social time
- Link to customer profile automatically

**Customer Profile Data:**
- Home address (trade area analysis)
- Work address (corporate opportunity identification)
- Age/birthday (demographic segmentation)
- Membership type and start date
- Visit frequency histogram
- Other club memberships (competitive intelligence)
- Reason for visit (event, open play, lesson, social)
- Skill level (self-reported + ladder results)
- Social media handles (engagement tracking)

**Survey Integration:**
- Why did you choose PCC today?
- What other clubs do you play at and why?
- What amenities/programs would increase your visits?
- Net Promoter Score (NPS) collection

### 2.3 Segment Analysis Features

**Dashboard Views:**
- Segment distribution pie chart (current customer base)
- Visit frequency by segment
- Revenue per segment
- Time-of-day preferences by segment
- Conversion funnel: visitors → members by segment

**Gap Analysis:**
- Trade area demographics vs. current customer base
- "Should have" vs. "do have" segments
- Competitor customer segment comparison
- Underserved segment identification

**Actionable Insights:**
- "You're missing stay-at-home moms - 15% of trade area, 3% of customers"
- "Corporate segment opportunity: 23 companies within 2 miles with 50+ employees"
- "High school league potential: 8 schools within 5-mile radius"

---

## 3. Programming Strategy Module

### 3.1 Event Type Taxonomy (MECE)

**Skill-Based Programming:**
- Beginner nights
- Intermediate leagues
- Advanced/competitive play
- All-levels mixers
- Tournament play

**Social/Themed Events:**
- Friday night socials
- Holiday events (Halloween paddle tournament, etc.)
- Themed competitions (chicken finger challenge)
- Corporate networking nights
- Chicago Social Club partnerships

**Structured Programs:**
- High school leagues
- Youth programming
- Round robin ladders
- Seasonal leagues
- Training/clinics

**Revenue Optimization Events:**
- Corporate events (private bookouts)
- Private parties/celebrations
- Pro lessons (1-on-1 and group)
- Tournament hosting

### 3.2 Programming Intelligence

**Top Programs Research:**
- Scan top 100 US pickleball clubs (by Google Maps popularity)
- Identify most successful programs by:
  - Social media engagement
  - Attendance (inferred from popular times spikes)
  - Customer sentiment (reviews, comments)
- Create searchable program library with:
  - Program description
  - Target segment
  - Optimal time slot
  - Success metrics
  - Implementation template

**Program Recommendation Engine:**
- Input: underutilized time slot (e.g., Tuesday 2-6pm)
- Output: 
  - Top 3 program recommendations
  - Target segment match
  - Expected participation
  - Revenue projection
  - Required resources

**Competitive Program Tracking:**
- Monitor local competitor Instagram/Facebook posts
- Identify new event launches
- Track event success indicators (likes, comments, "going" counts)
- Alert when competitor launches successful new program

### 3.3 Programming Calendar

**Visual Planning Interface:**
- 7-day x 24-hour grid
- Color-coded by event type
- Court allocation overlay (7 courts)
- Drag-and-drop scheduling
- Conflict detection

**Optimization Suggestions:**
- "2-6pm Tuesday: Dead time. Suggest: Corporate League"
- "Saturday 10am: High demand, low supply. Suggest: Add tournament"
- "Competitor busy Friday 7pm (events). Suggest: Counter-program social night"

---

## 4. Competitive Intelligence Module

### 4.1 Heat Map View (Already Built)

**Current Capabilities:**
- Google Maps API popular times data
- 10 Chicago facilities tracked
- Hourly granularity (0-100 popularity score)
- 4 visualization types:
  - Weekly heatmap
  - Day comparison chart
  - Competitive comparison
  - Summary dashboard

**Enhanced Features:**
- Winner identification: "Who's winning Saturday morning?"
- Time slot opportunity scoring
- Market capacity indicators
- Export to CSV/JSON/PDF

### 4.2 Competitive Program Tracking

**Social Media Integration:**
- Track competitor Instagram/Facebook handles
- Parse event announcements
- Identify: event type, date/time, amenities, themes
- Monitor engagement metrics

**Website Monitoring:**
- Automated scraping of competitor event calendars
- Price change detection
- New amenity announcements
- Membership drive tracking

**Success Inference:**
- Cross-reference event announcements with popular times spikes
- Social media hashtag volume around events
- Review sentiment during event periods

### 4.3 Amenity Comparison

**MECE Amenity Framework:**
- Court infrastructure (indoor/outdoor, surfaces)
- Dining & social (café, restaurant/bar, lounge)
- Events (corporate, tournaments, community)
- Work & life (coworking, hot desks)
- Wellness & fitness (gym, classes, pool, sauna)
- Retail (pro shop)

**Gap Analysis:**
- "You have: Courts, café, lounge, pro shop, future coworking"
- "Competitors have (you don't): Full restaurant, fitness classes, corporate event packages"
- "Opportunity: Corporate events - 3 competitors actively marketing, high margins"

---

## 5. Yield Optimization Module

### 5.1 Court Capacity Model

**Core Asset Definition:**
- 7 courts
- Operating hours by day (Monday-Friday: 8am-9pm, Saturday: 7am-7pm, Sunday: 7am-5pm)
- Total weekly court-hours available
- Minus: maintenance, holidays, closed times

**Utilization Tracking (CourtReserve Data):**

**Available Now:**
-   ✅ Court utilization heatmap by hour/day/week
-   ✅ Utilization percentage by court
-   ✅ Revenue by category:
    -   Membership revenue
    -   Instructor/lesson revenue
    -   Court rental revenue (inferred: non-member pay-to-play)
    -   Event revenue
-   ✅ Time slot analysis (when courts are booked)

**Calculations Needed (CIC will compute from CourtReserve data):**
-   Revenue per court-hour by activity type
-   Member vs. non-member utilization ratio
-   Peak vs. off-peak utilization patterns
-   Capacity available for new programming
-   Utilization trend analysis (week-over-week, month-over-month)

**Missing Data (Cannot compute without additional collection):**
-   Customer segment utilization patterns (who uses courts when)
-   No-show rates by booking type
-   Court time vs. social time per customer visit
-   Member satisfaction correlation with utilization rates

**Workaround Strategy:**
-   Export CourtReserve data to CIC database weekly (manual until API available)
-   Match booking data to customer profiles
-   Infer member vs. non-member from membership status
-   Survey-based satisfaction data to overlay on utilization

**Capacity Constraints:**
- Member satisfaction threshold (% of time courts available)
- Maximum event hours per week
- Minimum open play hours
- Staff availability constraints

### 5.2 Trade-Off Decision Support

**Scenario Planning:**
- "Add 2 corporate events/week (4 court-hours each)"
  - Revenue impact: +$X
  - Member satisfaction impact: -Y%
  - Non-member displacement: Z court-hours
  - Net impact: $X minus opportunity cost
  
**Recommendation Algorithm:**
- Input: event opportunity (corporate event Thursday 6-8pm, 2 courts)
- Analysis:
  - Current utilization: 3/7 courts in use (low)
  - Historical demand: typically 4/7 courts
  - Forecast: weather, season, competing events
  - Member impact: Low (courts still available)
- Output: APPROVE - Low impact, high revenue, underutilized slot

### 5.3 Dynamic Pricing Suggestions

**Premium Time Identification:**
- High demand across market (all competitors busy)
- PCC historically at capacity
- Suggestion: Surge pricing or member-priority booking

**Off-Peak Promotions:**
- Low utilization periods identified
- Segment-matched promotions:
  - "Stay-at-home mom special: Tuesday 10am-2pm, 20% off"
  - "Corporate lunch league: Wednesday 12-1pm, package pricing"

---

## 6. Trade Area Analysis Module

### 6.1 Geographic Intelligence

**Customer Address Mapping:**
- Geocode all customer home/work addresses
- Visualize on map with heat density
- Drive-time isochrones (15, 30, 45-minute zones)

**Demographic Overlay:**
- Census data integration (income, age, household composition)
- Business density (corporate opportunity)
- Competing facility locations
- "White space" identification

**Segment-Geography Match:**
- "Stay-at-home demographic: High concentration within 15-min, low PCC penetration"
- "Corporate addresses: 45 companies, only 3 have any employees as members"

### 6.2 Pattern Recognition

**Location-Based Insights:**
- Morning visitors: residential area concentration
- Lunch visitors: corporate area concentration  
- Evening visitors: mixed residential/work

**Competitor Choice Analysis:**
- Customer also plays at: Competitor X
- Competitor X strength: Better restaurant, themed Friday events
- PCC opportunity: Add Friday social programming

---

## 7. Technical Architecture

### 7.1 Data Sources

**Internal Systems:**

**CourtReserve (Primary - Report Export Access):**

-   ✅ Court utilization data (heatmap, percentages, time slots)
-   ✅ Revenue data (by category: memberships, lessons, court rentals, events)
-   ✅ Membership data (member list, engagement metrics, revenue)
-   ✅ Instructor performance data
-   ✅ Financial metrics (revenue, expenses)
-   ⚠️ Export method: Excel download (manual or scheduled)
-   ⚠️ API access: Not yet available (future enhancement)
-   **Integration approach:** Weekly CSV export → CIC database import

**Payment Gateway:**
-   Stripe or other (verify which PCC uses)
-   ✅ Transaction details beyond CourtReserve summaries
-   ✅ Refund data, payment failures
-   May provide additional customer data

**NEW: Customer Check-In System (To Be Built):**
-   Tablet/QR code at front desk
-   Links to CourtReserve customer ID
-   Captures: arrival time, departure time, visit purpose
-   Simple interface for front desk staff

**External APIs:**
-   Google Maps API (popular times, geocoding) - *already operational*
-   Social media APIs (Instagram, Facebook)
-   Demographic data (Census, ZoomInfo, Clearbit)
-   Weather API (demand forecasting)

**Web Scraping:**
-   Competitor websites (events, pricing)
-   Top US clubs (program research)
-   Industry publications

### 7.2 Database Schema

**CourtReserve Integration Tables:**

**CR\_Customer (Imported from CourtReserve):**
-   courtReserveID (primary key)
-   name, email, phone
-   membershipType, membershipStatus, membershipStartDate
-   address (verify if included in CR export)
-   createdDate, lastModified
-   **Import frequency:** Weekly

**CR\_Booking (Imported from CourtReserve):**
-   bookingID, courtReserveCustomerID
-   bookingDate, startTime, endTime, duration
-   courtNumber, bookingType (open play, lesson, event, tournament)
-   revenue, paymentStatus
-   instructorID (if lesson)
-   **Import frequency:** Weekly (daily during high-activity periods)

**CR\_Revenue (Imported from CourtReserve):**

-   transactionID, date, revenueCategory
-   amount, customerID (if applicable)
-   description, paymentMethod
-   **Import frequency:** Weekly (monthly for accounting reconciliation)

**CR\_CourtUtilization (Imported from CourtReserve):**
-   date, hour, courtNumber
-   utilizationPercentage, bookingCount
-   revenueGenerated
-   **Import frequency:** Weekly

**CIC\_Customer (Enhanced Internal Table):**
-   customerID (CIC internal), courtReserveID (foreign key)
-   All CR fields PLUS:
-   homeAddress\_enriched, workAddress, birthday
-   segments (array: pickleball\_obsessed, social, corporate, etc.)
-   otherClubMemberships (array)
-   skillLevel, primaryMotivation
-   socialHandles (Instagram, Facebook, etc.)
-   **Data source:** CourtReserve export + CIC surveys + enrichment services

**CIC\_Visit (Enhanced Internal Table):**
-   visitID, customerID, bookingID (foreign key to CR\_Booking)
-   checkInTime, checkOutTime (from new check-in system)
-   courtTime (from CR\_Booking), socialTime (calculated: checkOut - checkIn - courtTime)
-   visitReason, courtNumber
-   satisfactionScore (post-visit survey)
-   **Data source:** CR\_Booking + new check-in system + surveys


**Event Table:**
- eventID, eventName, eventType, targetSegment, dateTime, courts allocated
- registrations, revenue, satisfactionScore

**Competitor Table:**
- competitorID, name, address, lat/lng, amenities (array)
- socialHandles, popularTimesData, lastScraped

### 7.3 Tech Stack Recommendations

**Frontend:**
- React.js for interactive dashboards
- D3.js or Chart.js for visualizations
- Mapbox for geographic displays

**Backend:**
- Node.js/Express or Python/Django
- PostgreSQL database
- Redis for caching popular times data

**AI/ML:**
- Python scikit-learn for predictive models
- OpenAI API for natural language insights
- Recommendation engine (collaborative filtering)

---

## 8. User Interface Specifications

### 8.1 Dashboard Home

**Key Metrics Panel (Now Available from CourtReserve):**

-   ✅ **This Week's Revenue** vs. last week/last year (from CR Sales Summary)
-   ✅ **Court Utilization Rate** - current week average (from CR Utilization Report)
-   ✅ **Member Count & Growth** - total members, net new this month (from CR Membership Report)
-   ✅ **Instructor Revenue** - top performers, trends (from CR Instructor Report)
-   ⏳ **NPS Score** - awaiting survey deployment
-   ⏳ **Top 3 Action Items** - Phase 4 AI feature

**Revenue Category Breakdown (CourtReserve Data):**

-   Membership revenue (recurring)
-   Court rental revenue (pay-to-play, non-member)
-   Lesson/instruction revenue
-   Event revenue (corporate, tournaments, etc.)
-   Pro shop revenue (if tracked in CR)
-   Food & beverage revenue (if tracked in CR)
-   **Visualization:** Stacked bar chart by week/month

**Court Utilization Snapshot (CourtReserve Data):**

-   Heatmap: 7 courts x 7 days (current week)
-   Color intensity: utilization percentage
-   Peak hours highlighted
-   Underutilized slots flagged (< 40% utilization)
-   **Click to drill down:** specific court, specific time slot → see bookings

**Membership Metrics (CourtReserve Data):**

-   Total members: current count
-   New members: this month
-   Churn: members who didn't renew (if CR tracks)
-   Engagement: average visits per member per month (needs visit tracking)

**Segment Snapshot:**
- Pie chart: current customer distribution
- "Missing segment" alerts
- Segment revenue contribution

**Calendar Preview:**
- This week's programming
- Utilization forecast
- Alerts: low-utilization slots, high-demand conflicts

### 8.2 Customer Segmentation View

**Segment Explorer:**
- Left sidebar: segment list with filters
- Main panel: selected segment deep-dive
  - Demographics
  - Visit patterns
  - Revenue metrics
  - Program preferences
  - Satisfaction scores

**Gap Analysis Tab:**
- Trade area "should have" vs. current customers
- Competitor customer segments (inferred)
- Action recommendations

### 8.3 Programming Strategy View

**Event Calendar:**
- Weekly grid with drag-and-drop
- Color-coded by event type
- Court allocation overlay
- Conflict warnings

**Program Library:**
- Search/filter: segment, time, success rate
- Program cards: description, requirements, expected outcomes
- "Use this program" button → add to calendar

**Competitive Programs Tab:**
- Competitor event feed (social scraping)
- Success indicators
- "Copy this event" templates

### 8.4 Competitive Intelligence View

**Heat Map Dashboard:**
- Facility selector dropdown
- 4 visualization tabs (existing)
- Time-slot winner highlights
- Opportunity scores

**Competitor Detail Pages:**
- Amenity comparison
- Event calendar comparison
- Social media feed
- Popular times overlay
- "What they're doing right" insights

### 8.5 Yield Optimization View

**Capacity Planner:**
- Court utilization grid (7 courts x 168 hours/week)
- Revenue overlay (color intensity)
- Member satisfaction gauge
- Scenario planning tools

**Trade-Off Calculator:**
- Input: proposed event details
- Output: revenue, impact, recommendation
- Comparative analysis: this event vs. alternatives

---

## 9. AI-Powered Features

### 9.1 Natural Language Insights

**Using CourtReserve Data:**

**Query:**

Why is our Wednesday afternoon revenue low?

-   **CIC Analysis:**
    -   CourtReserve utilization data: Wednesday 2-6pm averaging 28% utilization (lowest of week)
    -   Competitor popular times: Grant Park 65% busy, SPF 72% busy same time
    -   Revenue category: mostly member play (low revenue per hour)
-   ## **AI Response:**
    

Wednesday 2-6pm is your lowest utilization slot (28% vs. 68% weekly average). Competitors are busier (60-70%). This is a stay-at-home demographic window based on trade area. Your customer base is 8% stay-at-home segment vs. 22% trade area average. \*\*Recommendation:\*\* Launch 'Ladies League' Wednesday 2-4pm, partner with local café for post-play social. Estimated +$800/week revenue.

**Query:**

Which instructor should I have teach more lessons?

-   **CIC Analysis:**
    -   CourtReserve instructor report: revenue per instructor
    -   Booking data: lessons per week, average lesson revenue
    -   Customer retention: repeat lesson bookings by instructor
-   ## **AI Response:**
    

Instructor Sarah: $3,200/month, 24 lessons, 67% repeat booking rate (highest). Instructor Mike: $2,100/month, 18 lessons, 34% repeat rate. \*\*Recommendation:\*\* Increase Sarah's availability, market her specialty (beginner-friendly). Estimated +$1,000/month revenue with 8 additional Sarah lessons.

---

### 9.2 Predictive Analytics

**Demand Forecasting:**
- Predict next week's utilization by hour
- Inputs: historical patterns, weather, competitor events, holidays
- Alert: "High demand expected Saturday 10am - consider surge pricing"

**Churn Prediction:**
- Identify at-risk members (visit frequency decline)
- Recommend retention interventions
- Segment-specific churn risk models

### 9.3 Recommendation Engine

**Program Recommendations:**
- "Based on your customer segments and competitor gaps, we recommend..."
- Personalized to PCC's specific situation
- Success probability scoring

**Customer Recommendations:**
- "Sarah visits 3x/week, loves advanced play, follows pickleball Instagram accounts"
- Recommend: tournament invitations, advanced clinics, ambassador program

---

## 10. Implementation Phases

### **Phase 0: Data Integration Foundation (Weeks 1-2)**
-   **Week 1:**
    -   Access all CourtReserve reports, document data structure
    -   Design CSV → CIC database import pipeline
    -   Set up automated weekly export from CourtReserve (if possible) or manual process
    -   Create CourtReserve integration tables in CIC database
-   **Week 2:**
    -   Build initial data import scripts (Python/Node.js)
    -   Perform first full historical data import
    -   Data quality check and cleaning
    -   Establish baseline metrics from CourtReserve data

### **Phase 1: Foundation + Quick Wins (Weeks 3-6)**
-   **Week 3:**
    -   Design simple customer check-in interface (tablet/QR)
    -   Create customer profile enrichment survey (one-time for existing, auto for new members)
    -   Basic dashboard with CourtReserve metrics:
        -   Court utilization heatmap (from CR data)
        -   Revenue by category trends
        -   Membership growth trend
-   **Week 4:**
    -   Deploy check-in system (pilot with staff)
    -   Begin customer survey distribution (email to existing members)
    -   Build customer profile enrichment workflow
-   **Weeks 5-6:**
    -   Segment taxonomy implementation using survey responses
    -   Initial segment assignment for customers
    -   Revenue per segment calculation (from CR data + segment assignments)
    -   Gap analysis dashboard (segments we have vs. should have)

### **Phase 2: Intelligence (Weeks 7-10)**
-   Competitive heat map integration (already built) ✅
-   Social media monitoring setup
-   Top programs research and library creation
-   Trade area demographic overlay
-   **New:** CourtReserve utilization vs. competitor popular times comparison

### **Phase 3: Optimization (Weeks 11-14)**
-   Yield optimization calculator using CR utilization data
-   Programming calendar with recommendations
-   Scenario planning tools (leverages CR revenue categories)
-   **New:** "Unutilized court-hour" identifier with revenue opportunity calculation

### **Phase 4: AI Enhancement (Weeks 15-18)**
-   Natural language insights
-   Predictive models (using historical CR data)
-   Recommendation engines
-   Automated alerts and actions

### **Phase 5: API Integration (Future - When Available)**
-   Replace CSV import with CourtReserve API
-   Real-time utilization tracking
-   Automated booking-to-visit linking
-   Live dashboard updates

---

## 11. Success Criteria

**Phase 1 Quick Wins (Months 1-2) - CourtReserve Data Only:**

-   ✅ Establish baseline metrics from CR historical data
-   ✅ Identify top 5 underutilized time slots with revenue opportunity
-   ✅ Calculate revenue per court-hour by category
-   ✅ Track week-over-week utilization trend
-   ✅ Member growth rate visibility

**Phase 2 Goals (Months 3-4) - With Customer Enrichment:**

-   50%+ existing customer survey completion (segment assignment)
-   Identify top 3 "missing segments" with addressable action plans
-   Launch 1 new program targeting underserved segment
-   10% improvement in previously underutilized time slot

**Phase 3-4 Goals (Months 5-6) - Full CIC Operational:**

-   20% increase in membership conversion rate
-   15% improvement in court utilization (underutilized hours)
-   25% reduction in customer acquisition cost
-   10-point NPS improvement
-   30% increase in revenue per customer (NRR)

---

## 12. Open Questions for Christy Meeting

1. **Current Customer Knowledge:**
   - Who are your most frequent visitors? (names, patterns)
   - Which segments do you think you're strong in?
   - Which segments do you wish you had more of?

2. **Data Access:**
   - What membership/POS systems are currently in use?
   - Can we export customer lists with visit history?
   - Is there existing check-in data?

3. **Priorities:**
   - If you could answer ONE question about your customers, what would it be?
   - What decision do you struggle with most often?
   - Where do you feel "flying blind"?

4. **Competition:**
   - Which competitors worry you most? Why?
   - What do they do better than PCC?
   - Where do you think PCC has unique advantage?

5. **Website & Marketing:**
   - Who manages website updates currently?
   - What's the biggest website pain point?
   - How do customers find out about events?

**CourtReserve Specific Questions:**

1.  **Data Access & Permissions:**
    
    -   Can you grant me admin/reporting access to CourtReserve?
    -   What reports do you currently export regularly? For what purpose?
    -   Is there a process to automate report exports? (scheduled email, etc.)
    -   Do you have historical data? How far back?
2.  **CourtReserve Usage:**
    
    -   How do customers book? (website, phone, walk-in)
    -   Do all bookings go through CourtReserve? Or some manual/offline?
    -   How are corporate events tracked? As bookings or separate?
    -   Are instructors using CR for lesson bookings?
    -   Is pro shop revenue tracked in CR? F&B revenue?
3.  **Data Quality:**
    
    -   How complete are customer profiles? (address, phone, email)
    -   Do members update their own info? Or staff-managed?
    -   Are there duplicate customer records?
    -   Is membership type accurately categorized? (monthly vs. annual)
4.  **Current Reporting Gaps:**
    
    -   What questions can't you answer with current CR reports?
    -   What decisions do you wish you had better data for?
    -   How do you currently decide what events/programs to run?
5.  **Check-In Process:**
    
    -   Do customers check in when they arrive? Current process?
    -   How do you track walk-ins (non-booked play)?
    -   Is there a waitlist process when courts are full?
6.  **API Future:**
    
    -   Has PCC inquired about API access with CourtReserve?
    -   Cost implications?
    -   Timeline possibility?
---

## 13 - CourtReserve Integration Specifications

**13.1 Data Import Pipeline**

**Weekly Import Process:**

1.  **Export from CourtReserve:**
    -   Sales Summary Report (date range: last 7 days)
    -   Court Utilization Report (date range: last 7 days)
    -   Membership Revenue Report (full member list)
    -   Instructor Performance Report (last 7 days)

2.  **Transform & Load:**
    -   CSV parsing and validation
    -   Data type conversion and normalization
    -   Duplicate detection and resolution
    -   Insert into CIC database (upsert logic for updates)
    
3.  **Data Quality Checks:**
    -   Revenue reconciliation (CR totals vs. CIC totals)
    -   Missing customer data flagging
    -   Utilization calculation validation
    -   Anomaly detection (unusual booking patterns, revenue spikes/drops)

4.  **Error Handling:**
    -   Failed import logging
    -   Email alert to administrator
    -   Retry logic for transient errors
    -   Manual review queue for data conflicts

**13.2 Data Mapping Specifications**

**CourtReserve Revenue Categories → CIC Revenue Types:**

-   "Membership" → Recurring Revenue
-   "Court Rental" → Pay-Per-Use Revenue (Non-Member)
-   "Private Lesson" → Instructor Revenue
-   "Group Clinic" → Instructor Revenue
-   "Tournament Entry" → Event Revenue
-   "Corporate Event" → Event Revenue (High-Value)
-   *(Verify actual CR category names with Christy)*

**CourtReserve Booking Types → CIC Activity Types:**

-   "Open Play" → Member court time or Non-member court rental
-   "Lesson (Private)" → Training
-   "Lesson (Group)" → Training/Event hybrid
-   "Tournament" → Event
-   "Corporate Booking" → Corporate Event
-   "Court Maintenance" → Downtime (exclude from utilization)
-   *(Verify actual CR booking types with Christy)*

**13.3 Manual Process Documentation (Until API Available)**

**Weekly Data Collection Procedure:**

1.  Log into CourtReserve admin panel
2.  Navigate to Reports section
3.  Generate each required report:
    -   Set date range: Last 7 days
    -   Export format: Excel (.xlsx)
4.  Save files with naming convention: `CR_ReportName_YYYYMMDD.xlsx`
5.  Upload to CIC import folder (Google Drive, Dropbox, or S3)
6.  CIC auto-detects new files and triggers import
7.  Review import summary email

**Estimated Time:** 15 minutes per week

**Future Automation (When API Available):**

-   Scheduled nightly import
-   Real-time utilization dashboard
-   Instant booking → customer profile linking
-   Live revenue tracking

## Appendix: Data Dictionary

**Customer Segments:**
- Pickleball Obsessed, Social Players, Stay-at-Home, Corporate, Youth, Beginners, Singletons

**Event Types:**
- Skill-based, Social/Themed, Structured Programs, Revenue Optimization

**Amenities:**
- Courts, Dining, Events, Work/Life, Wellness, Retail

**Time Blocks:**
- Morning (6-11am), Midday (11am-2pm), Afternoon (2-5pm), Evening (5-9pm), Weekend

**Competitive Intelligence Metrics:**
- Popular times score (0-100), social engagement rate, event frequency, amenity count