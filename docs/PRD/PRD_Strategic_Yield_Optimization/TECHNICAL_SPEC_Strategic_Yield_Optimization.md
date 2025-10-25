# Technical Specification: Strategic Yield Optimization Using Popular Times Data

**Project**: PCC Yield Optimizer - Strategic Yield Optimization Module
**Version**: 1.0
**Last Updated**: October 20, 2025

---

## Document Organization

This Technical Specification is part of a 5-document specification suite. Read in this order:

1. **[PRD](./PRD_Strategic_Yield_Optimization.md)** - Product vision, business goals, user needs
2. **[Functional Spec](./FUNCTIONAL_SPEC_Strategic_Yield_Optimization.md)** - What the system should do (functional requirements)
3. **Technical Spec** (this document) - How to build it (technical architecture)
4. **[Design Spec](./DESIGN_SPEC_Strategic_Yield_Optimization.md)** - UI/UX specifications (design system)
5. **[Epics & Sprints](./EPICS_AND_SPRINTS.md)** - Developer work breakdown (user stories, tasks, sprint planning)

---

## Technology Stack

### Frontend
```javascript
{
  "framework": "Vanilla JavaScript (ES6+)",  // Consistency with existing codebase
  "visualization": {
    "charts": "D3.js v7",                    // Session duration bar charts, opportunity scores
    "tables": "Native HTML tables + CSS Grid", // Data tables with sorting
    "interactive": "Custom sliders for scenario modeling"
  },
  "styling": "CSS3 + Custom Properties",      // Existing design system
  "build": "None (static files)",             // Simple deployment
  "browser_support": ["Chrome 90+", "Safari 14+", "Firefox 88+"]
}
```

### Backend / Data Processing
```javascript
{
  "data_collection": "Python 3.11",           // Existing maps-populartimes scripts
  "data_storage": "Static JSON files",        // No database needed for V1
  "apis": {
    "google_places": "Google Places API",     // For place details
    "populartimes": "m-wrzr/populartimes library" // Community library (already in use)
  },
  "processing": {
    "calculations": "JavaScript (client-side)",  // Turnover calc, opportunity scoring
    "aggregation": "Python scripts (one-time)"   // Pre-process popular times data
  }
}
```

### Infrastructure
```javascript
{
  "hosting": "Vercel or GitHub Pages",        // Static site hosting
  "cdn": "Vercel Edge Network",               // Fast global delivery
  "monitoring": "Console logs (V1), Sentry (V2)",
  "version_control": "Git + GitHub"
}
```

---

## System Architecture

### High-Level Architecture (V1)

```
┌──────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │   PCC Yield Optimizer Dashboard                            │ │
│  │   (index.html + js/main.js + css/*.css)                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │   Strategic Yield Optimization View (NEW)                  │ │
│  │   • js/views/strategic-yield.js                            │ │
│  │   • js/components/session-duration-chart.js  (D3)          │ │
│  │   • js/components/turnover-calculator.js                   │ │
│  │   • js/components/opportunity-scorer.js                    │ │
│  │   • js/components/scenario-modeler.js                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│                              │ fetch()                           │
│                              ▼                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                      Static Data Files                           │
│                                                                  │
│  /data/popular-times/                                            │
│    ├── pcc.json                 (PCC popular times)              │
│    ├── spf.json                 (SPF Chicago)                    │
│    ├── big-city-pickle.json     (Big City Pickle)               │
│    ├── pickle-haus.json         (Pickle Haus)                   │
│    ├── grant-park.json          (Grant Park)                    │
│    ├── horner-park.json         (Horner Park)                   │
│    └── union-park.json          (Union Park)                    │
│                                                                  │
│  /data/facilities.json          (Facility metadata)              │
│  /data/yield-analysis.json      (Pre-calculated insights) [NEW]  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                               │
                               │ (Data collection pipeline)
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│              Python Data Collection Scripts                      │
│              (maps-populartimes repo)                            │
│                                                                  │
│  • batch_popular_times.py      (Fetch Google Maps data)         │
│  • process_yield_data.py [NEW] (Calculate turnover, scores)     │
│  • generate_insights.json [NEW](Pre-aggregate analytics)        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Data Flow

```
1. Data Collection (Weekly, Python)
   ↓
   Google Maps API → populartimes library → batch_popular_times.py
   ↓
   Raw JSON with time_spent + populartimes data
   ↓
2. Pre-Processing (Weekly, Python)
   ↓
   process_yield_data.py
   ↓
   Calculate: sessions/day, turnover scores, opportunity scores
   ↓
   yield-analysis.json (static file)
   ↓
3. Frontend Display (Real-time, JavaScript)
   ↓
   Fetch yield-analysis.json + facilities.json
   ↓
   Render: charts, tables, scenario modeler
   ↓
   User interactions → client-side recalculations (no server needed)
```

---

## Data Models

### Facility Data Model

**File**: `/data/facilities.json` (EXISTING, extended)

```json
{
  "facilities": [
    {
      "id": "pcc",
      "name": "Pickleball Clubhouse Chicago",
      "type": "private",
      "courts": 7,
      "operatingHours": {
        "monday": { "open": "08:00", "close": "21:00" },
        "...": "..."
      },
      "pricing": {
        "membership_monthly": 149,
        "drop_in_rate": 25
      },

      // NEW FIELDS FOR YIELD ANALYSIS
      "operatingHoursPerDay": 13.0,  // Calculated: 21:00 - 08:00
      "targetSessionDuration": 2.0    // PCC's current booking block (hours)
    },
    {
      "id": "spf",
      "name": "SPF Chicago",
      "type": "private",
      "courts": 8,
      "operatingHours": {
        "monday": { "open": "06:00", "close": "22:00" },
        "...": "..."
      },
      "pricing": {
        "membership_monthly": 199,
        "drop_in_rate": 35
      },

      "operatingHoursPerDay": 16.0,   // 22:00 - 06:00
      "targetSessionDuration": null   // Calculated from time_spent data
    }
  ]
}
```

### Popular Times Data Model

**File**: `/data/popular-times/{facility-id}.json` (EXISTING)

```json
{
  "facilityId": "spf",
  "lastUpdated": "2025-10-20T12:00:00Z",
  "time_spent": [150, 150],  // [min, max] in minutes → 2.5 hours
  "weeklyData": [
    {
      "day": "monday",
      "hourly": [
        { "hour": 0, "popularity": 0 },
        { "hour": 6, "popularity": 44 },
        { "hour": 7, "popularity": 41 },
        // ... 24 hours
      ]
    },
    // ... 7 days
  ]
}
```

### Yield Analysis Data Model (NEW)

**File**: `/data/yield-analysis.json` (PRE-CALCULATED)

This file is **generated by Python scripts** and consumed by the frontend.

```json
{
  "generatedAt": "2025-10-20T15:30:00Z",
  "facilities": [
    {
      "id": "spf",
      "name": "SPF Chicago",
      "sessionDuration": {
        "hours": 2.5,
        "minutes": 150,
        "range": [150, 150],
        "source": "google_maps_time_spent"
      },
      "turnover": {
        "sessionsPerDay": 6.4,         // 16 hours / 2.5 hours
        "totalDailyCapacity": 51.2,    // 6.4 sessions × 8 courts
        "efficiencyScore": 6.4,        // Same as sessionsPerDay (normalized)
        "ranking": 2                   // 2nd best among 7 facilities
      },
      "opportunityScores": {
        "byHour": [
          {
            "day": "thursday",
            "hour": 19,
            "popularity": 100,
            "opportunityScore": 125,    // 100 × (2.5 / 2.0)
            "estimatedRevenue": 2400,   // If PCC captures 20%
            "ranking": 8
          },
          // ... 168 hours
        ],
        "topOpportunities": [
          {
            "rank": 1,
            "day": "thursday",
            "hour": 19,
            "description": "SPF at 100% with 2.5hr sessions",
            "opportunityScore": 125,
            "estimatedRevenue": 2400
          },
          // ... top 10
        ]
      }
    },
    {
      "id": "union-park",
      "name": "Union Park",
      "sessionDuration": {
        "hours": 4.0,
        "minutes": 240,
        "range": [240, 240],
        "source": "google_maps_time_spent"
      },
      "turnover": {
        "sessionsPerDay": 4.0,         // 16 hours / 4 hours (POOR)
        "totalDailyCapacity": 24.0,    // 4.0 sessions × 6 courts
        "efficiencyScore": 4.0,
        "ranking": 7                   // WORST
      },
      "opportunityScores": {
        "byHour": [
          {
            "day": "thursday",
            "hour": 20,
            "popularity": 100,
            "opportunityScore": 200,    // 100 × (4.0 / 2.0) ← HIGHEST
            "estimatedRevenue": 4800,
            "ranking": 1
          },
          // ...
        ]
      }
    },
    // ... all 7 facilities
  ],
  "benchmarks": {
    "industryAverage": {
      "sessionDuration": 2.6,          // Average of all 7 facilities
      "sessionsPerDay": 5.9
    },
    "pccTarget": {
      "sessionDuration": 2.0,
      "sessionsPerDay": 6.5
    }
  }
}
```

---

## Core Calculations

### 1. Session Duration Extraction

**Input**: `time_spent` array from Google Maps
**Output**: Session duration in hours

```javascript
/**
 * Extract session duration from time_spent data
 * @param {Array<number>} timeSpent - [min, max] in minutes
 * @returns {number} - Session duration in hours
 */
function extractSessionDuration(timeSpent) {
  if (!timeSpent || timeSpent.length !== 2) {
    return null;  // No data available
  }

  // If min === max, use that value
  // If range, use average
  const [minMinutes, maxMinutes] = timeSpent;
  const averageMinutes = (minMinutes + maxMinutes) / 2;
  const hours = averageMinutes / 60;

  return Math.round(hours * 10) / 10;  // Round to 1 decimal
}

// Examples:
extractSessionDuration([150, 150]);  // → 2.5 hours
extractSessionDuration([120, 180]);  // → 2.5 hours (average)
extractSessionDuration(null);        // → null
```

### 2. Turnover Calculation

**Input**: Operating hours, session duration
**Output**: Sessions per day

```javascript
/**
 * Calculate sessions per court per day
 * @param {number} operatingHours - Total hours open (e.g., 13)
 * @param {number} sessionDuration - Session length in hours (e.g., 2.5)
 * @returns {number} - Sessions per day per court
 */
function calculateSessionsPerDay(operatingHours, sessionDuration) {
  if (!operatingHours || !sessionDuration || sessionDuration === 0) {
    return null;
  }

  const sessionsPerDay = operatingHours / sessionDuration;
  return Math.round(sessionsPerDay * 10) / 10;  // Round to 1 decimal
}

// Examples:
calculateSessionsPerDay(13, 2.0);   // → 6.5 (PCC)
calculateSessionsPerDay(16, 2.5);   // → 6.4 (SPF)
calculateSessionsPerDay(16, 4.0);   // → 4.0 (Union Park - POOR)
```

### 3. Opportunity Score Calculation

**Input**: Competitor popularity, competitor session duration, PCC session duration
**Output**: Opportunity score (higher = better opportunity)

```javascript
/**
 * Calculate opportunity score for a time slot
 * Logic: High popularity + long sessions = high opportunity
 * @param {number} popularity - Competitor popularity (0-100)
 * @param {number} competitorSessionHours - Competitor session length
 * @param {number} pccSessionHours - PCC's target session length
 * @returns {number} - Opportunity score
 */
function calculateOpportunityScore(popularity, competitorSessionHours, pccSessionHours) {
  if (!popularity || !competitorSessionHours || !pccSessionHours) {
    return 0;
  }

  // Higher score if competitor has longer sessions (worse turnover)
  const durationMultiplier = competitorSessionHours / pccSessionHours;
  const score = popularity * durationMultiplier;

  return Math.round(score);
}

// Examples (Thursday 7pm):
calculateOpportunityScore(100, 2.5, 2.0);  // → 125 (SPF)
calculateOpportunityScore(84, 4.0, 2.0);   // → 168 (Union Park - HIGHEST)
calculateOpportunityScore(75, 3.0, 2.0);   // → 112 (Grant Park)
```

### 4. Revenue Estimation

**Input**: Opportunity score, PCC pricing, market capture rate
**Output**: Estimated monthly revenue

```javascript
/**
 * Estimate revenue from capturing competitor overflow
 * @param {number} opportunityScore - Calculated opportunity score
 * @param {number} pricePerSession - PCC's session price (e.g., $25)
 * @param {number} captureRate - % of competitor demand PCC can capture (e.g., 0.20)
 * @returns {number} - Estimated monthly revenue
 */
function estimateRevenue(opportunityScore, pricePerSession, captureRate = 0.20) {
  // Normalize opportunity score to estimated # of sessions
  // Assumption: Score of 100 = ~10 potential sessions/week
  const sessionsPerWeek = (opportunityScore / 100) * 10;
  const pccSessions = sessionsPerWeek * captureRate;  // Capture 20%
  const monthlyRevenue = pccSessions * pricePerSession * 4;  // 4 weeks

  return Math.round(monthlyRevenue);
}

// Example: Union Park Thursday 7pm (score: 168)
estimateRevenue(168, 25, 0.20);  // → $840/month
```

---

## Component Architecture

### Component 1: Session Duration Benchmarking Chart

**File**: `js/components/session-duration-chart.js`

**Purpose**: Bar chart comparing session durations across competitors

**Implementation**:
```javascript
class SessionDurationChart {
  constructor(containerId, data) {
    this.container = d3.select(`#${containerId}`);
    this.data = data;  // Array of { name, sessionDuration, courts }
    this.render();
  }

  render() {
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 60, left: 120 };

    // Sort by session duration (longest first)
    const sortedData = this.data.sort((a, b) =>
      b.sessionDuration.hours - a.sessionDuration.hours
    );

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(sortedData, d => d.sessionDuration.hours)])
      .range([0, width - margin.left - margin.right]);

    const yScale = d3.scaleBand()
      .domain(sortedData.map(d => d.name))
      .range([0, height - margin.top - margin.bottom])
      .padding(0.2);

    // Create SVG
    const svg = this.container
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Draw bars
    g.selectAll('.bar')
      .data(sortedData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', d => yScale(d.name))
      .attr('width', d => xScale(d.sessionDuration.hours))
      .attr('height', yScale.bandwidth())
      .attr('fill', d => {
        // Color by efficiency
        if (d.sessionDuration.hours >= 3.0) return '#EF4444';  // Red (poor)
        if (d.sessionDuration.hours >= 2.5) return '#F59E0B';  // Yellow (medium)
        return '#10B981';  // Green (good)
      });

    // Add labels
    g.selectAll('.label')
      .data(sortedData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => xScale(d.sessionDuration.hours) + 5)
      .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .text(d => `${d.sessionDuration.hours} hrs`);

    // Add axes
    g.append('g').call(d3.axisLeft(yScale));
    g.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  }
}
```

---

### Component 2: Turnover Calculator

**File**: `js/components/turnover-calculator.js`

**Purpose**: Display sessions-per-day for all competitors in sortable table

**Implementation**:
```javascript
class TurnoverCalculator {
  constructor(containerId, facilitiesData, yieldData) {
    this.container = document.getElementById(containerId);
    this.facilities = facilitiesData;
    this.yieldData = yieldData;
    this.render();
  }

  calculateTurnover(facility) {
    const yieldInfo = this.yieldData.facilities.find(f => f.id === facility.id);
    if (!yieldInfo) return null;

    return {
      facility: facility.name,
      courts: facility.courts,
      operatingHours: facility.operatingHoursPerDay,
      sessionDuration: yieldInfo.sessionDuration.hours,
      sessionsPerDay: yieldInfo.turnover.sessionsPerDay,
      totalCapacity: yieldInfo.turnover.totalDailyCapacity,
      efficiencyScore: yieldInfo.turnover.efficiencyScore,
      ranking: yieldInfo.turnover.ranking
    };
  }

  render() {
    const rows = this.facilities
      .map(f => this.calculateTurnover(f))
      .filter(r => r !== null)
      .sort((a, b) => b.sessionsPerDay - a.sessionsPerDay);  // Best first

    const html = `
      <table class="turnover-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Facility</th>
            <th>Courts</th>
            <th>Operating Hours</th>
            <th>Session Duration</th>
            <th>Sessions/Day</th>
            <th>Total Daily Capacity</th>
            <th>Efficiency</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr class="${row.ranking === 1 ? 'best' : ''}">
              <td>${row.ranking}</td>
              <td>${row.facility}</td>
              <td>${row.courts}</td>
              <td>${row.operatingHours} hrs</td>
              <td>${row.sessionDuration} hrs</td>
              <td class="highlight">${row.sessionsPerDay}</td>
              <td>${row.totalCapacity}</td>
              <td>
                <span class="efficiency-badge ${this.getEfficiencyClass(row.efficiencyScore)}">
                  ${row.efficiencyScore.toFixed(1)}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    this.container.innerHTML = html;
  }

  getEfficiencyClass(score) {
    if (score >= 6.5) return 'excellent';
    if (score >= 5.5) return 'good';
    if (score >= 4.5) return 'medium';
    return 'poor';
  }
}
```

---

### Component 3: Opportunity Scorer

**File**: `js/components/opportunity-scorer.js`

**Purpose**: Display ranked opportunities (top 10 time slots)

**Implementation**: Similar to TurnoverCalculator but with different data model

---

### Component 4: Scenario Modeler

**File**: `js/components/scenario-modeler.js`

**Purpose**: Interactive slider to test different session lengths

**Key Features**:
- Slider input (1.0 - 4.0 hours, 0.5 increments)
- Real-time recalculation of sessions/day
- Revenue impact calculation
- Save scenarios for comparison

---

## Data Collection Pipeline

### Python Script: `process_yield_data.py` (NEW)

**Purpose**: Pre-calculate turnover and opportunity scores from popular times data

**Location**: `~/Documents/GitHub/maps-populartimes/process_yield_data.py`

```python
#!/usr/bin/env python3
"""
Process popular times data to generate yield analysis.

Input: data/popular-times/*.json (facilities)
Output: data/yield-analysis.json (pre-calculated insights)
"""

import json
import glob
from datetime import datetime

def load_facilities():
    """Load facility metadata"""
    with open('data/facilities.json') as f:
        return json.load(f)['facilities']

def load_popular_times(facility_id):
    """Load popular times data for a facility"""
    with open(f'data/popular-times/{facility_id}.json') as f:
        return json.load(f)

def extract_session_duration(time_spent):
    """Extract session duration from time_spent array"""
    if not time_spent or len(time_spent) != 2:
        return None

    min_min, max_min = time_spent
    avg_min = (min_min + max_min) / 2
    hours = avg_min / 60

    return round(hours, 1)

def calculate_sessions_per_day(operating_hours, session_duration):
    """Calculate sessions per day per court"""
    if not operating_hours or not session_duration:
        return None

    return round(operating_hours / session_duration, 1)

def calculate_opportunity_score(popularity, competitor_session, pcc_session=2.0):
    """Calculate opportunity score for a time slot"""
    if not popularity or not competitor_session:
        return 0

    return round(popularity * (competitor_session / pcc_session))

def process_facility(facility, popular_times_data, pcc_session_duration=2.0):
    """Process a single facility's data"""

    # Extract session duration
    time_spent = popular_times_data.get('time_spent')
    session_hours = extract_session_duration(time_spent)

    if not session_hours:
        return None

    # Calculate turnover
    operating_hours = facility.get('operatingHoursPerDay', 13)
    sessions_per_day = calculate_sessions_per_day(operating_hours, session_hours)
    total_capacity = sessions_per_day * facility['courts']

    # Calculate opportunity scores for all 168 hours
    opportunities = []
    for day_data in popular_times_data.get('weeklyData', []):
        day = day_data['day']
        for hour_data in day_data['hourly']:
            hour = hour_data['hour']
            popularity = hour_data['popularity']

            if popularity > 0:
                score = calculate_opportunity_score(
                    popularity,
                    session_hours,
                    pcc_session_duration
                )

                opportunities.append({
                    'day': day,
                    'hour': hour,
                    'popularity': popularity,
                    'opportunityScore': score
                })

    # Sort opportunities by score
    opportunities.sort(key=lambda x: x['opportunityScore'], reverse=True)

    return {
        'id': facility['id'],
        'name': facility['name'],
        'sessionDuration': {
            'hours': session_hours,
            'minutes': int(session_hours * 60),
            'range': time_spent,
            'source': 'google_maps_time_spent'
        },
        'turnover': {
            'sessionsPerDay': sessions_per_day,
            'totalDailyCapacity': total_capacity,
            'efficiencyScore': sessions_per_day
        },
        'opportunityScores': {
            'byHour': opportunities,
            'topOpportunities': opportunities[:10]
        }
    }

def main():
    facilities = load_facilities()
    results = []

    for facility in facilities:
        try:
            popular_times = load_popular_times(facility['id'])
            processed = process_facility(facility, popular_times)

            if processed:
                results.append(processed)
                print(f"✅ Processed {facility['name']}")
            else:
                print(f"⚠️  No time_spent data for {facility['name']}")

        except FileNotFoundError:
            print(f"❌ Missing data for {facility['name']}")

    # Add rankings
    results.sort(key=lambda x: x['turnover']['sessionsPerDay'], reverse=True)
    for i, result in enumerate(results, 1):
        result['turnover']['ranking'] = i

    # Calculate benchmarks
    avg_session = sum(r['sessionDuration']['hours'] for r in results) / len(results)
    avg_sessions_per_day = sum(r['turnover']['sessionsPerDay'] for r in results) / len(results)

    output = {
        'generatedAt': datetime.utcnow().isoformat() + 'Z',
        'facilities': results,
        'benchmarks': {
            'industryAverage': {
                'sessionDuration': round(avg_session, 1),
                'sessionsPerDay': round(avg_sessions_per_day, 1)
            },
            'pccTarget': {
                'sessionDuration': 2.0,
                'sessionsPerDay': 6.5
            }
        }
    }

    # Write output
    with open('data/yield-analysis.json', 'w') as f:
        json.dump(output, f, indent=2)

    print(f"\n✅ Generated yield-analysis.json with {len(results)} facilities")

if __name__ == '__main__':
    main()
```

---

## Deployment Architecture

### Static Site Deployment (Vercel)

```
pcc-yield-optimizer/
├── index.html                    # Main entry point
├── js/
│   ├── main.js                   # App initialization
│   ├── views/
│   │   └── strategic-yield.js    # Yield optimization view
│   ├── components/
│   │   ├── session-duration-chart.js
│   │   ├── turnover-calculator.js
│   │   ├── opportunity-scorer.js
│   │   └── scenario-modeler.js
│   └── utils/
│       └── calculations.js       # Shared calculation functions
├── css/
│   ├── main.css                  # Design system
│   └── yield-optimizer.css       # Yield-specific styles
├── data/
│   ├── facilities.json
│   ├── popular-times/
│   │   └── *.json
│   └── yield-analysis.json       # Pre-calculated (generated weekly)
└── vercel.json                   # Deployment config
```

**Deployment Process**:
1. Python script runs weekly (local cron or GitHub Actions)
2. Generates fresh `yield-analysis.json`
3. Commit + push to GitHub
4. Vercel auto-deploys (takes ~30 seconds)
5. Dashboard live with updated data

---

## Performance Considerations

### Client-Side Performance

- **Initial Load**: <2 seconds (target)
  - HTML: ~10KB
  - CSS: ~30KB (minified)
  - JS: ~80KB (minified, D3.js included)
  - Data: ~50KB (yield-analysis.json)

- **Rendering**: 60 FPS for interactions
  - Use `requestAnimationFrame` for animations
  - Debounce slider inputs (300ms)
  - Lazy-load charts (render on scroll into view)

### Data Processing

- **Pre-calculation**: All heavy computation done in Python (weekly)
- **Client-side**: Only lightweight filtering/sorting
- **No database**: Static JSON files (fast CDN delivery)

---

## Security & Privacy

### No Sensitive Data

- All data is publicly available (Google Maps popular times)
- No PCC member data stored
- No authentication required (internal tool)

### API Key Management

- Google Maps API key stored in `.env` (local only)
- Never committed to GitHub
- Separate key for production data collection

---

## Testing Strategy

### Unit Tests (Python)

```python
# test_calculations.py
def test_extract_session_duration():
    assert extract_session_duration([150, 150]) == 2.5
    assert extract_session_duration([120, 180]) == 2.5
    assert extract_session_duration(None) == None

def test_calculate_sessions_per_day():
    assert calculate_sessions_per_day(13, 2.0) == 6.5
    assert calculate_sessions_per_day(16, 2.5) == 6.4
    assert calculate_sessions_per_day(16, 4.0) == 4.0
```

### Integration Tests (JavaScript)

```javascript
// Test data loading
QUnit.test('Load yield-analysis.json', async (assert) => {
  const data = await fetch('/data/yield-analysis.json').then(r => r.json());
  assert.ok(data.facilities.length > 0, 'Has facilities');
  assert.ok(data.benchmarks, 'Has benchmarks');
});

// Test calculations
QUnit.test('Opportunity score calculation', (assert) => {
  const score = calculateOpportunityScore(100, 2.5, 2.0);
  assert.equal(score, 125, 'Correct score');
});
```

### Manual Testing Checklist

- [ ] All 7 facilities display in session duration chart
- [ ] Turnover table sorts correctly
- [ ] Opportunity scorer shows top 10
- [ ] Scenario modeler slider works smoothly
- [ ] Revenue calculations accurate
- [ ] Mobile-friendly (tablet view)

---

## Monitoring & Logging

### V1 (Console Logs)

```javascript
console.log('[YieldOptimizer] Loaded facilities:', facilities.length);
console.log('[YieldOptimizer] Calculated opportunities:', opportunities.length);
console.error('[YieldOptimizer] Failed to load data:', error);
```

### V2 (Sentry Integration)

```javascript
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  environment: 'production'
});

try {
  loadYieldData();
} catch (error) {
  Sentry.captureException(error);
}
```

---

## Future Technical Enhancements

### Phase 2: Real-Time Integration

- Connect to PCC's booking system API
- Live availability tracking
- Real-time opportunity alerts

### Phase 3: Machine Learning

- Predictive modeling (forecast demand 2-4 weeks out)
- Dynamic pricing recommendations (based on ML model)
- Anomaly detection (alert when competitor patterns change)

---

## Appendix: API Reference

### Google Maps Popular Times Data Structure

Reference the existing `maps-populartimes` codebase for API details.

Key endpoints used:
- `populartimes.get_id(api_key, place_id)` - Fetch single facility
- `populartimes.get(api_key, types, p1, p2)` - Area search

---

**End of Technical Specification**

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-20 | Peter Giordano | Initial technical spec for Strategic Yield Optimization |
