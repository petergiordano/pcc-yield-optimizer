# Sprint 7.6: Enhanced Demo Content for Quick Action Buttons

**Status:** Planning
**Priority:** Medium
**Estimated LOE:** 30-45 minutes
**Dependencies:** Sprint 7 Phase 6 (Complete)

---

## Background

The Analysis Panel currently has two "Quick Action" buttons:
1. **Create Event** (btn-action-primary)
2. **Launch Campaign** (btn-action-secondary)

These buttons currently show generic demo modals with placeholder content. However, the Analysis Panel has access to rich contextual data about each time slot, including:
- PCC utilization percentage
- Opportunity score (0-10)
- Competitor activity and demand
- Customer segment matches
- Geographic overlap
- Accessibility scores
- Strategic recommendations

**Current Implementation:**
- Location: `js/components/analysis-panel.js` lines 860-891
- Method: `handleAction(action)` and `showDemoModal(title, content)`
- Issue: Modals show static, generic content regardless of time slot context

---

## Goals

1. Make demo modals **contextually aware** using actual time slot data
2. Show different event types based on time of day/week (e.g., tournaments vs social leagues vs clinics)
3. Show different campaign types based on opportunity score and competitor activity
4. Display relevant metrics from the time slot analysis (competitor names, segments, opportunity score)
5. Provide realistic revenue estimates and targeting recommendations
6. Maintain investor-demo quality presentation

---

## Implementation Plan

### Phase 1: Refactor Modal Content Generation (15 min)

**File:** `js/components/analysis-panel.js`

Replace static HTML strings with dynamic content generation using `this.currentTimeSlot` data.

#### Create Event Modal Enhancement

**Logic:**
- Use `this.currentTimeSlot.hour` to determine event type:
  - **6am-10am:** Morning Clinics & Drills
  - **10am-2pm:** Weekday Social League (if weekday), Weekend Tournament (if weekend)
  - **2pm-6pm:** After-School Youth Programs / Adult Intermediate Clinics
  - **6pm-10pm:** Prime Time League Night / Evening Tournament

- Use `this.currentTimeSlot.opportunityScore` to set event capacity:
  - Score 7-10: Large event (32+ players)
  - Score 4-7: Medium event (16-24 players)
  - Score 0-4: Small event (8-12 players)

- Use `this.currentTimeSlot.topSegments` to target audience:
  - Show primary customer segment (e.g., "Young Professionals", "Competitive Players")

**Data to Display:**
```javascript
{
  eventType: "Prime Time League Night", // based on hour
  dayTime: "Wednesday 7:00 PM - 9:00 PM", // from dayIndex + hour
  duration: "2 hours",
  maxParticipants: "24 players", // based on opportunity score
  targetAudience: "Young Professionals (25-40)", // from topSegments
  pricePerPerson: "$35", // higher for prime time, lower for off-peak
  estimatedRevenue: "$840", // participants × price
  competitorInsight: "SPF is at 85% capacity at this time", // from competitors array
  opportunityScore: "8.7/10", // actual score
  recommendations: [
    "Market to West Loop residents",
    "Highlight after-work convenience",
    "Promote food & beverage options"
  ] // from this.currentTimeSlot.recommendations
}
```

#### Launch Campaign Modal Enhancement

**Logic:**
- Use `this.currentTimeSlot.opportunityScore` to determine campaign type:
  - Score 8-10: **Competitive Steal Campaign** (target competitor's customers)
  - Score 5-8: **Last-Minute Fill Campaign** (discount to fill capacity)
  - Score 0-5: **Awareness Campaign** (build future demand)

- Use `this.currentTimeSlot.competitors` to show specific competitor targeting

- Use `this.currentTimeSlot.geography.catchmentOverlap` to define audience radius

**Data to Display:**
```javascript
{
  campaignType: "Competitive Steal Campaign", // based on score
  targetTime: "Wednesday 7:00 PM - 9:00 PM",
  primaryMessage: "Switch to PCC - Better Courts, Better Vibe",
  discount: "15% off", // higher score = lower discount needed
  targetAudience: "SPF members within 2 miles", // from competitors + geography
  channels: ["Email", "Instagram Ads", "Google Ads"],
  targeting: {
    competitors: "SPF, Big City Pickle",
    segments: "Young Professionals, Competitive Players",
    radius: "2 miles from PCC"
  },
  budget: "$150 ad spend",
  expectedReach: "1,200 people",
  estimatedConversions: "8-12 bookings",
  keyMessages: [
    "Less crowded than SPF at peak times",
    "Premium courts with better lighting",
    "Full bar and lounge area"
  ] // from this.currentTimeSlot.advantages
}
```

### Phase 2: Update Modal UI (10 min)

Enhance modal styling to display data in organized sections:

```html
<div class="demo-modal-content">
  <!-- Header with Opportunity Score Badge -->
  <div class="demo-modal-header">
    <span class="opportunity-badge">Opportunity Score: 8.7/10</span>
  </div>

  <!-- Key Details Grid -->
  <div class="demo-modal-grid">
    <div class="demo-field">
      <label>Event Type:</label>
      <value>Prime Time League Night</value>
    </div>
    <!-- ... more fields ... -->
  </div>

  <!-- Competitive Insight Panel -->
  <div class="demo-insight-panel">
    <strong>Competitive Insight:</strong>
    <p>SPF is at 85% capacity. Big City Pickle West Loop is at 78%.</p>
  </div>

  <!-- Recommendations List -->
  <div class="demo-recommendations">
    <strong>Strategic Recommendations:</strong>
    <ul>
      <li>✓ Market to West Loop residents</li>
      <li>✓ Highlight after-work convenience</li>
    </ul>
  </div>

  <!-- Demo Mode Notice -->
  <div class="demo-notice">
    <em>Demo Mode: This would integrate with your calendar/CRM system</em>
  </div>
</div>
```

### Phase 3: Add Inline Styles for Demo Modal (5-10 min)

Since we want to keep the demo modals visually distinct from error overlays, add specific styling:

```javascript
showDemoModal(title, content, data) {
  const modal = document.createElement('div');
  modal.className = 'error-overlay'; // reuse overlay structure
  modal.style.cssText = `
    z-index: 10000;
    background: rgba(0, 0, 0, 0.7);
  `;

  const opportunityBadgeColor = data.opportunityScore >= 7
    ? '#10B981' // green for high opportunity
    : data.opportunityScore >= 4
    ? '#F59E0B' // yellow for medium
    : '#6B7280'; // gray for low

  modal.innerHTML = `
    <div class="error-overlay-content" style="max-width: 600px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 class="error-overlay-title" style="margin: 0;">${title}</h2>
        <span style="background: ${opportunityBadgeColor}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">
          Score: ${data.opportunityScore}/10
        </span>
      </div>
      ${content}
    </div>
  `;
  // ... rest of modal setup
}
```

---

## Technical Implementation Details

### Data Access

All required data is already available via `this.currentTimeSlot`:

```javascript
// Available in analysis-panel.js after loadTimeSlotData() is called
this.currentTimeSlot = {
  dayIndex: 3,           // 0-6 (Sunday-Saturday)
  hour: 19,              // 0-23
  pccUtilization: 62,    // percentage
  opportunityScore: 8.7, // 0-10
  competitors: [
    { name: "SPF", utilization: 85, distance: 1.2 },
    { name: "Big City Pickle West Loop", utilization: 78, distance: 1.8 }
  ],
  topSegments: ["Young Professionals", "Competitive Players"],
  geography: {
    catchmentOverlap: 0.75,
    distance: 1.5
  },
  accessibility: {
    transitScore: 8,
    parkingScore: 6
  },
  advantages: [
    "Less crowded than SPF at peak times",
    "Premium courts with better lighting",
    "Full bar and lounge area"
  ],
  recommendations: [
    "Market to West Loop residents",
    "Highlight after-work convenience",
    "Promote food & beverage options"
  ]
}
```

### Helper Methods to Add

```javascript
// In analysis-panel.js

determineEventType(hour, dayIndex) {
  const isWeekend = dayIndex === 0 || dayIndex === 6;

  if (hour >= 6 && hour < 10) return "Morning Clinic & Drills";
  if (hour >= 10 && hour < 14) {
    return isWeekend ? "Weekend Tournament" : "Midday Social League";
  }
  if (hour >= 14 && hour < 18) return "Afternoon Intermediate Clinic";
  if (hour >= 18 && hour < 22) return "Prime Time League Night";
  return "Late Night Open Play";
}

determineEventCapacity(opportunityScore) {
  if (opportunityScore >= 7) return 32;
  if (opportunityScore >= 4) return 20;
  return 12;
}

calculateEventRevenue(capacity, hour) {
  const pricePerPerson = (hour >= 17 && hour < 22) ? 35 : 25; // prime time premium
  return capacity * pricePerPerson;
}

determineCampaignType(opportunityScore) {
  if (opportunityScore >= 8) return "Competitive Steal Campaign";
  if (opportunityScore >= 5) return "Last-Minute Fill Campaign";
  return "Awareness Building Campaign";
}

formatCompetitorInsight(competitors) {
  if (!competitors || competitors.length === 0) return "";

  const highDemand = competitors.filter(c => c.utilization > 80);
  if (highDemand.length > 0) {
    const names = highDemand.map(c => `${c.name} (${c.utilization}%)`).join(", ");
    return `High demand at: ${names}`;
  }
  return "Moderate demand at competitor facilities";
}
```

---

## Acceptance Criteria

✅ **Create Event Modal:**
- [ ] Shows contextual event type based on time of day and day of week
- [ ] Displays actual time slot (e.g., "Wednesday 7:00 PM - 9:00 PM")
- [ ] Shows participant capacity based on opportunity score
- [ ] Includes target customer segment from analysis data
- [ ] Displays realistic revenue estimate
- [ ] Shows competitor insight (e.g., "SPF is at 85% capacity")
- [ ] Lists 2-3 strategic recommendations from analysis

✅ **Launch Campaign Modal:**
- [ ] Shows appropriate campaign type based on opportunity score
- [ ] Displays specific competitor names and their utilization
- [ ] Includes target audience radius based on geographic overlap
- [ ] Shows discount percentage inversely proportional to opportunity score
- [ ] Lists relevant customer segments
- [ ] Displays estimated reach and conversions
- [ ] Shows key competitive advantages from analysis

✅ **Both Modals:**
- [ ] Display opportunity score badge with color coding (green/yellow/gray)
- [ ] Maintain professional demo-quality styling
- [ ] Close with ESC key and click-outside
- [ ] Show "Demo Mode" notice at bottom
- [ ] Render in under 100ms (no perceptible delay)

---

## Testing Checklist

1. **Time of Day Variations:**
   - [ ] Morning slot (8am): Shows "Morning Clinic"
   - [ ] Midday weekday (12pm): Shows "Midday Social League"
   - [ ] Midday weekend (12pm): Shows "Weekend Tournament"
   - [ ] Evening slot (7pm): Shows "Prime Time League Night"

2. **Opportunity Score Variations:**
   - [ ] High score (8+): Large capacity, competitive steal campaign, low discount
   - [ ] Medium score (5-7): Medium capacity, fill campaign, moderate discount
   - [ ] Low score (0-4): Small capacity, awareness campaign, higher discount

3. **Data Integration:**
   - [ ] Competitor names appear correctly
   - [ ] Customer segments match analysis panel
   - [ ] Recommendations are relevant to time slot
   - [ ] Revenue calculations are accurate

4. **Edge Cases:**
   - [ ] No competitors: Shows generic campaign
   - [ ] No segments: Shows "General Audience"
   - [ ] No recommendations: Hides recommendations section

---

## Level of Effort Estimate

**Total: 30-45 minutes**

Breakdown:
- Phase 1: Refactor modal content generation - **15 minutes**
  - Add helper methods (5 min)
  - Update handleAction() for Create Event (5 min)
  - Update handleAction() for Launch Campaign (5 min)

- Phase 2: Update modal UI structure - **10 minutes**
  - Add opportunity badge (2 min)
  - Add data grid layout (3 min)
  - Add insight and recommendations sections (5 min)

- Phase 3: Add inline styling - **5-10 minutes**
  - Update showDemoModal() signature (2 min)
  - Add conditional styling for score badge (3 min)
  - Test and refine (5 min)

**Confidence Level:** High
**Risk Level:** Low (isolated changes, no impact on core functionality)

---

## Benefits for Investor Demo

1. **Contextual Realism:** Modals show they're connected to actual analysis, not just static screenshots
2. **Data-Driven Decisions:** Demonstrates how PCC would use competitive intelligence to drive actions
3. **Revenue Focus:** Every modal shows concrete revenue/conversion estimates
4. **Strategic Depth:** Recommendations show sophisticated understanding of market dynamics
5. **Professional Polish:** Dynamic content feels like a real product, not a prototype

---

## Future Enhancements (Post-Demo)

- Connect to actual calendar API (Google Calendar, Outlook)
- Integrate with email marketing platform (Mailchimp, Constant Contact)
- Add campaign performance tracking
- Store event/campaign history in localStorage
- Add "Schedule for Later" functionality
- Generate PDF summaries of recommended actions
