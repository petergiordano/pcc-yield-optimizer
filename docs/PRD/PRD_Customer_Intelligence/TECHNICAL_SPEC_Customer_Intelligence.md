# Technical Specification: Customer Intelligence Center

**Project**: PCC Yield Optimizer - Customer Intelligence Center
**Version**: 2.0
**Last Updated**: October 8, 2025

---

## Document Organization

- **[PRD](./PRD_Customer_Intelligence_Center_v2.md)**: Product vision, business goals
- **[Functional Spec](./FUNCTIONAL_SPEC_Customer_Intelligence.md)**: What the system does
- **Technical Spec** (this document): How to build it
- **[Design Spec](./DESIGN_SPEC_Customer_Intelligence.md)**: UI/UX specifications
- **[Epics & Sprints](./EPICS_AND_SPRINTS.md)**: Work breakdown
- **[Project Milestones](./PROJECT_MILESTONES.md)**: Timeline

---

## Technology Stack

### Frontend
```javascript
{
  "framework": "Vanilla JavaScript (ES6+)",  // Consistency with existing codebase
  "visualization": "D3.js v7",               // Charts, maps
  "mapping": "Leaflet 1.9",                  // Geographic visualizations
  "tooltips": "Tippy.js",                    // Existing pattern
  "styling": "CSS3 + Custom Properties",     // Design system
  "build": "None (static files)",            // Simple deployment
  "browser_support": ["Chrome 90+", "Safari 14+", "Firefox 88+"]
}
```

### Backend / Data Processing
```javascript
{
  "phase_1": "Google Sheets API",            // Manual data, quick prototype
  "phase_2": "Node.js + Express",            // API layer for scraping
  "phase_3": "PostgreSQL 14",                // Booking data storage
  "data_processing": "Python 3.11",          // Census data, ETL scripts
  "apis": {
    "census": "Census Bureau API",
    "google_places": "Google Places API",
    "instagram": "Instagram Basic Display API"
  }
}
```

### Infrastructure
```javascript
{
  "hosting": "Vercel (frontend)",
  "database": "Railway or Heroku Postgres",
  "cdn": "Vercel Edge Network",
  "monitoring": "Console logs (Phase 1), Sentry (Phase 2+)"
}
```

---

## System Architecture

### Phase 1: Customer Intelligence Foundation

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
│  │   Customer Intelligence View (NEW)                         │ │
│  │   • js/components/customer-intelligence.js                 │ │
│  │   • js/components/segment-chart.js (D3.js)                 │ │
│  │   • js/components/neighborhood-map.js (Leaflet)            │ │
│  │   • js/components/connector-table.js                       │ │
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
│  /data/customer-segments.json         (50 members, manual)      │
│  /data/geo/demographics.geojson       (Census tracts)           │
│  /data/geo/chicago-zips.geojson       (Zip boundaries)          │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                               │
                               │ (Phase 1: No backend, static files only)
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                    External Data Sources                         │
│                                                                  │
│  • Google Sheets (survey responses - manual export to JSON)     │
│  • Census Bureau (one-time GeoJSON generation)                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Phase 3: Yield Management Foundation (Extended Architecture)

```
┌──────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                          │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           │ HTTP (fetch)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Backend API (Node.js + Express)               │
│                                                                  │
│  /api/bookings                  → Get booking data              │
│  /api/scenarios/calculate       → Run scenario models           │
│  /api/pricing/recommend         → Generate pricing recs         │
│  /api/yield/event-decision      → Corporate event decision      │
│  /api/yield/mezzanine-roi       → Mezzanine ROI analysis        │
│                                                                  │
└─────────────┬────────────────────────────────────────────────────┘
              │
              │ (delegates to)
              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Calculation Engine (Python)                   │
│                                                                  │
│  event_optimizer.py         → Event decision calculations       │
│  mezzanine_roi.py           → Investment analysis               │
│  scenario_modeler.py        → Revenue scenario modeling         │
│  pricing_optimizer.py       → Dynamic pricing logic             │
│                                                                  │
└─────────────┬────────────────────────────────────────────────────┘
              │
              │ SQL queries + Redis caching
              ▼
┌──────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                           │
│                                                                  │
│  Tables: bookings, members, scenarios, event_decisions          │
│  Views: utilization_by_slot, revenue_by_type                    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
pcc-yield-optimizer/
├── index.html                              (updated: add Customer Intel tab)
├── css/
│   ├── main.css                           (existing)
│   ├── components.css                     (existing)
│   ├── dashboards.css                     (existing)
│   └── customer-intelligence.css          (NEW)
├── js/
│   ├── config.js                          (existing)
│   ├── main.js                            (updated: init Customer Intel)
│   ├── data-loader.js                     (existing)
│   ├── components/
│   │   ├── heatmap.js                     (existing)
│   │   ├── map.js                         (updated: add demographics layer)
│   │   ├── customer-intelligence.js       (NEW - main controller)
│   │   ├── segment-chart.js               (NEW - D3.js pie chart)
│   │   ├── neighborhood-map.js            (NEW - Leaflet choropleth)
│   │   ├── connector-table.js             (NEW - sortable table)
│   │   └── segment-grid.js                (NEW - metrics grid)
│   └── utils/
│       ├── formatters.js                  (existing)
│       └── calculations.js                (NEW - CLV, churn risk)
├── data/
│   ├── facilities.json                    (existing)
│   ├── customer-segments.json             (NEW - Phase 1)
│   ├── national-clubs.json                (NEW - Phase 2)
│   ├── programming-ideas.json             (NEW - Phase 2)
│   └── geo/
│       ├── cta-lines-raw.geojson          (existing)
│       ├── demographics.geojson           (NEW - Census tracts)
│       └── chicago-zips.geojson           (NEW - Zip boundaries)
├── scripts/                                (NEW - data processing)
│   ├── generate-demographics.py           (Census data ETL)
│   ├── scrape-national-clubs.js           (Google Places scraper)
│   └── categorize-events.js               (AI event categorization)
└── backend/                                (NEW - Phase 3)
    ├── server.js                          (Express API server)
    ├── routes/
    │   ├── bookings.js                    (Booking endpoints)
    │   ├── scenarios.js                   (Scenario modeling endpoints)
    │   ├── pricing.js                     (Pricing endpoints)
    │   └── yield.js                       (Event decision + Mezzanine ROI)
    ├── calculation-engine/
    │   ├── event_optimizer.py             (Corporate event decision logic)
    │   ├── mezzanine_roi.py               (Investment analysis logic)
    │   ├── scenario_modeler.py            (Revenue scenario calculations)
    │   └── pricing_optimizer.py           (Dynamic pricing logic)
    ├── models/
    │   ├── booking.js                     (Booking model)
    │   ├── member.js                      (Member model)
    │   └── event_decision.js              (Event decision model)
    └── utils/
        ├── cache.js                       (Redis caching utilities)
        └── db.js                          (PostgreSQL connection pool)
```

---

## API Endpoints (Phase 3)

### POST /api/yield/event-decision

**Description**: Analyzes a corporate event booking request and provides a recommendation (Accept/Counter/Decline) based on revenue vs. churn cost.

**Request Body**:
```json
{
  "eventDetails": {
    "name": "Accenture Team Building",
    "date": "2026-02-15",
    "time": "14:00",
    "duration": 2,
    "courts": [1, 2, 3],
    "headcount": 24,
    "revenue": 500
  }
}
```

**Response**:
```json
{
  "analysis": {
    "eventRevenue": 500,
    "displacedBookings": {
      "count": 12,
      "members": [
        {
          "id": "M00123",
          "name": "Sarah Johnson",
          "segment": "Corporate Power Users",
          "estimatedCLV": 3800,
          "bookingCount": 2
        }
        // ... more members
      ]
    },
    "churnCost": {
      "total": 650,
      "breakdown": [
        {"segment": "Corporate Power Users", "clv": 3800, "churnIncrease": 0.05, "cost": 380},
        {"segment": "Social Ambassadors", "clv": 2150, "churnIncrease": 0.02, "cost": 86}
      ]
    },
    "netValue": -150,
    "recommendation": "Counter-offer",
    "rationale": "Event revenue ($500) is offset by estimated churn cost ($650) for a net value of -$150. Consider counter-offering with alternative time slot or higher price.",
    "alternativeSlots": [
      {
        "date": "2026-02-15",
        "time": "10:00",
        "courts": [1, 2, 3],
        "displacedBookings": 4,
        "estimatedChurnCost": 180,
        "netValue": 320
      }
    ],
    "emailTemplates": {
      "counterOffer": "Hi [Contact Name],\n\nThank you for your interest in hosting a corporate event at PCC...",
      "decline": "Hi [Contact Name],\n\nThank you for considering PCC..."
    }
  }
}
```

**Calculation Flow**:
1. Query database for conflicting bookings in time range
2. Group displaced members by segment
3. Calculate churn cost per segment (CLV × churn_probability_increase)
4. Calculate net_value = event_revenue - total_churn_cost
5. Generate recommendation based on net_value thresholds
6. Find alternative slots with lower displacement (optional)

**Caching**: 1 hour TTL (event details as cache key)

---

### GET /api/yield/mezzanine-roi

**Description**: Analyzes potential mezzanine investments (Hot Desks, Yoga Studio, Strength Training, Event Space) using financial ROI + member interest survey data.

**Query Parameters**:
- `prioritySegment` (optional): "Corporate Power Users" | "Social Ambassadors" | "Competitive Athletes" | "Casual Drop-ins" | "Mixed" (default)

**Response**:
```json
{
  "analysis": [
    {
      "option": "Yoga Studio",
      "setupCost": 25000,
      "monthlyRevenue": 3000,
      "monthlyOpCost": 800,
      "financials": {
        "monthlyNetRevenue": 2200,
        "annualNetRevenue": 26400,
        "paybackPeriod": 11.4,
        "annualROI": 105,
        "fiveYearValue": 107000
      },
      "memberInterest": {
        "stars": 5,
        "responses": {
          "veryInterested": 80,
          "interested": 15,
          "neutral": 5,
          "notInterested": 0
        },
        "primarySegment": "Social Ambassadors",
        "segmentBreakdown": {
          "Corporate Power Users": 60,
          "Social Ambassadors": 95,
          "Competitive Athletes": 40,
          "Casual Drop-ins": 50
        }
      },
      "strategicAlignment": {
        "retentionImpact": "High",
        "churnMitigation": "Medium",
        "revenueGrowthPotential": "High"
      },
      "recommendationScore": 92,
      "rank": 1
    }
    // ... 3 more options
  ],
  "recommended": {
    "option": "Yoga Studio",
    "rationale": "Highest member interest (5 stars, 80% very interested) with strong financial ROI (105% annual, 11.4 month payback). Aligns with Social Ambassadors segment (95% interest) which represents growth opportunity. Estimated to reduce churn by 2-3% annually."
  },
  "alternative": {
    "option": "Hot Desks",
    "rationale": "Fastest payback (7.5 months) with moderate ROI (80% annual). Strong interest from Corporate Power Users (60%) could drive corporate event leads. Lower setup cost ($15k) reduces risk."
  }
}
```

**Calculation Flow**:
1. Load investment options from config
2. Calculate financial metrics (payback, ROI, 5-year value)
3. Load member survey responses from database
4. Calculate member interest score (5-star rating based on % "very interested")
5. Calculate recommendation score: `(payback_score × 0.30) + (roi_score × 0.30) + (interest_score × 0.40)`
6. Rank options and generate recommendation rationale

**Caching**: 24 hours TTL (survey data changes infrequently)

---

## Data Models

### customer-segments.json

```javascript
{
  "version": "1.0",
  "generatedAt": "2025-10-15T00:00:00Z",
  "totalMembers": 50,
  "segments": {
    "Corporate Power Users": 12,
    "Social Ambassadors": 9,
    "Competitive Athletes": 15,
    "Casual Drop-ins": 14
  },
  "members": [
    {
      "id": "M00123",
      "name": "Sarah Johnson",
      "email": "sarah@example.com",
      "segment": "Corporate Power Users",
      "joinDate": "2024-03-15",
      "zipCode": "60661",
      "neighborhood": "West Loop",
      "bookingFrequency": 3.2,  // times per week
      "employer": "TechCorp Inc",
      "jobTitle": "VP Marketing",
      "workAddress": "123 W Madison St, Chicago, IL 60661",
      "workDistance": 1.2,  // miles from PCC
      "companySize": 250,
      "companyEvents": true,
      "primaryMotivation": "social",
      "preferredTimes": ["evening"],
      "amenityInterests": ["cafe", "hot_desks"],
      "samePartners": false,
      "surveyCompleted": true,
      "priorityScore": 92,  // for corporate connectors (0-100)
      "outreachStatus": "not-contacted",
      "estimatedCLV": 3800
    },
    // ... 49 more members
  ]
}
```

### demographics.geojson

```javascript
{
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [-87.7010, 41.9590],
            [-87.6950, 41.9590],
            // ... polygon coordinates
          ]
        ]
      },
      "properties": {
        "GEOID": "17031081800",
        "NAME": "Census Tract 818",
        "medianIncome": 87500,
        "educationBachelors": 0.62,       // 62% bachelor's+
        "totalPopulation": 3780,
        "landAreaSqMiles": 0.45,
        "populationDensity": 8400,        // people per sq mi
        "medianAge": 34,                  // optional
        "pctAge25to45": 0.48              // optional
      }
    },
    // ... ~800 Census tracts for Cook County
  ]
}
```

### Booking Data Schema (PostgreSQL - Phase 3)

```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id VARCHAR(50) NOT NULL,
  customer_type VARCHAR(20) NOT NULL CHECK (customer_type IN ('member', 'drop-in', 'corporate', 'league')),
  date_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  court_number INT NOT NULL CHECK (court_number BETWEEN 1 AND 7),
  price DECIMAL(10,2) DEFAULT 0,
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  cancelled BOOLEAN DEFAULT FALSE,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_bookings_date ON bookings(date_time);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_type ON bookings(customer_type);
CREATE INDEX idx_bookings_cancelled ON bookings(cancelled);

-- Materialized view for utilization analysis
CREATE MATERIALIZED VIEW utilization_by_slot AS
SELECT
  EXTRACT(DOW FROM date_time) AS day_of_week,  -- 0=Sunday, 6=Saturday
  EXTRACT(HOUR FROM date_time) AS hour_of_day,
  COUNT(*) AS booking_count,
  COUNT(*) FILTER (WHERE cancelled = FALSE) AS successful_bookings,
  AVG(price) AS avg_price
FROM bookings
WHERE date_time >= NOW() - INTERVAL '12 months'
GROUP BY day_of_week, hour_of_day;

-- Refresh weekly
REFRESH MATERIALIZED VIEW utilization_by_slot;

-- Event decisions tracking table (Phase 3)
CREATE TABLE event_decisions (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  duration DECIMAL(4,2) NOT NULL,
  courts INT[] NOT NULL,
  headcount INT,
  event_revenue DECIMAL(10,2) NOT NULL,
  displaced_bookings_count INT NOT NULL,
  estimated_churn_cost DECIMAL(10,2) NOT NULL,
  net_value DECIMAL(10,2) NOT NULL,
  recommendation VARCHAR(20) NOT NULL CHECK (recommendation IN ('Accept', 'Counter-offer', 'Decline')),
  rationale TEXT,
  actual_decision VARCHAR(20) CHECK (actual_decision IN ('accepted', 'countered', 'declined', 'pending')),
  decided_by VARCHAR(100),
  decided_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_decisions_date ON event_decisions(event_date);
CREATE INDEX idx_event_decisions_recommendation ON event_decisions(recommendation);
CREATE INDEX idx_event_decisions_actual ON event_decisions(actual_decision);
```

---

## Component Architecture

### CustomerIntelligenceComponent (Main Controller)

```javascript
// js/components/customer-intelligence.js

class CustomerIntelligenceComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.data = null;
    this.activeSegment = null;  // for filtering

    // Child components
    this.segmentChart = null;
    this.neighborhoodMap = null;
    this.connectorTable = null;
    this.segmentGrid = null;
  }

  async init() {
    // Load data
    this.data = await this.loadData();

    // Initialize child components
    this.segmentChart = new SegmentChartComponent('segment-overview', this.data);
    this.neighborhoodMap = new NeighborhoodMapComponent('neighborhood-heatmap', this.data);
    this.connectorTable = new ConnectorTableComponent('connector-table', this.data);
    this.segmentGrid = new SegmentGridComponent('segment-grid', this.data);

    // Render
    this.render();

    // Set up event listeners
    this.setupEventListeners();
  }

  async loadData() {
    const [segments, demographics, zipBoundaries] = await Promise.all([
      fetch('/data/customer-segments.json').then(r => r.json()),
      fetch('/data/geo/demographics.geojson').then(r => r.json()),
      fetch('/data/geo/chicago-zips.geojson').then(r => r.json())
    ]);

    return {
      segments,
      demographics,
      zipBoundaries
    };
  }

  render() {
    this.container.innerHTML = `
      <div class="customer-intel-layout">
        <div class="row-1">
          <div id="segment-overview"></div>
          <div id="neighborhood-heatmap"></div>
        </div>
        <div class="row-2">
          <div id="connector-table"></div>
        </div>
        <div class="row-3">
          <div id="segment-grid"></div>
        </div>
      </div>
    `;

    // Render child components
    this.segmentChart.render();
    this.neighborhoodMap.render();
    this.connectorTable.render();
    this.segmentGrid.render();
  }

  setupEventListeners() {
    // Listen for segment selection from pie chart
    this.segmentChart.on('segmentClick', (segment) => {
      this.activeSegment = segment;
      this.filterBySegment(segment);
    });
  }

  filterBySegment(segment) {
    // Update all child components to filter by segment
    this.neighborhoodMap.filterBySegment(segment);
    this.connectorTable.filterBySegment(segment);
    this.segmentGrid.highlightSegment(segment);
  }
}
```

### SegmentChartComponent (D3.js Pie Chart)

```javascript
// js/components/segment-chart.js

class SegmentChartComponent {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.listeners = {};
  }

  render() {
    const segmentCounts = this.calculateSegmentCounts();

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(this.container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(Object.keys(segmentCounts))
      .range(['#3B82F6', '#10B981', '#EF4444', '#6B7280']);

    const pie = d3.pie()
      .value(d => d.count)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const slices = g.selectAll('.slice')
      .data(pie(Object.entries(segmentCounts).map(([segment, count]) => ({segment, count}))))
      .enter()
      .append('g')
      .attr('class', 'slice');

    slices.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.segment))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('click', (event, d) => {
        this.emit('segmentClick', d.data.segment);
      });

    slices.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-weight', 'bold')
      .text(d => `${((d.data.count / this.getTotalMembers()) * 100).toFixed(0)}%`);
  }

  calculateSegmentCounts() {
    const counts = {};
    this.data.segments.members.forEach(member => {
      counts[member.segment] = (counts[member.segment] || 0) + 1;
    });
    return counts;
  }

  getTotalMembers() {
    return this.data.segments.totalMembers;
  }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event](data);
    }
  }
}
```

### EventDecisionModal (Phase 3)

```javascript
// js/components/event-decision-modal.js

class EventDecisionModal {
  constructor() {
    this.modal = null;
    this.eventData = null;
  }

  async open(eventData) {
    this.eventData = eventData;
    await this.fetchAnalysis();
    this.render();
    this.setupEventListeners();
  }

  async fetchAnalysis() {
    try {
      const response = await fetch('/api/yield/event-decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventDetails: this.eventData })
      });

      this.analysis = await response.json();
    } catch (error) {
      console.error('Failed to fetch event analysis:', error);
      this.analysis = { error: 'Unable to analyze event' };
    }
  }

  render() {
    const { analysis } = this;

    // Create modal container
    const modalHtml = `
      <div class="modal-overlay" id="event-decision-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Corporate Event Decision</h2>
            <button class="close-btn">&times;</button>
          </div>

          <div class="modal-body">
            <div class="event-summary">
              <h3>${this.eventData.name}</h3>
              <p>${this.eventData.date} at ${this.eventData.time} (${this.eventData.duration} hours)</p>
              <p>${this.eventData.headcount} people · Courts ${this.eventData.courts.join(', ')}</p>
            </div>

            <div class="analysis-grid">
              <div class="metric-card">
                <h4>Event Revenue</h4>
                <div class="metric-value positive">$${analysis.eventRevenue}</div>
              </div>

              <div class="metric-card">
                <h4>Displaced Bookings</h4>
                <div class="metric-value">${analysis.displacedBookings.count} members</div>
              </div>

              <div class="metric-card">
                <h4>Estimated Churn Cost</h4>
                <div class="metric-value negative">-$${analysis.churnCost.total}</div>
              </div>

              <div class="metric-card ${analysis.netValue > 0 ? 'positive' : 'negative'}">
                <h4>Net Value</h4>
                <div class="metric-value">$${analysis.netValue}</div>
              </div>
            </div>

            <div class="recommendation-section">
              <div class="recommendation-badge ${analysis.recommendation.toLowerCase()}">
                ${analysis.recommendation}
              </div>
              <p class="rationale">${analysis.rationale}</p>
            </div>

            ${this.renderAlternativeSlots(analysis.alternativeSlots)}
            ${this.renderDisplacedMembers(analysis.displacedBookings.members)}
          </div>

          <div class="modal-footer">
            <button class="btn-secondary" id="copy-counter-email">Copy Counter-offer Email</button>
            <button class="btn-primary" id="accept-recommendation">Accept Recommendation</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    this.modal = document.getElementById('event-decision-modal');
  }

  renderAlternativeSlots(slots) {
    if (!slots || slots.length === 0) return '';

    return `
      <div class="alternative-slots">
        <h4>Alternative Time Slots</h4>
        <div class="slots-grid">
          ${slots.map(slot => `
            <div class="slot-card">
              <div class="slot-time">${slot.date} at ${slot.time}</div>
              <div class="slot-metrics">
                <span>Displaced: ${slot.displacedBookings}</span>
                <span>Net Value: $${slot.netValue}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderDisplacedMembers(members) {
    if (!members || members.length === 0) return '';

    return `
      <details class="displaced-members">
        <summary>View Displaced Members (${members.length})</summary>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Segment</th>
              <th>CLV</th>
              <th>Bookings</th>
            </tr>
          </thead>
          <tbody>
            ${members.map(m => `
              <tr>
                <td>${m.name}</td>
                <td>${m.segment}</td>
                <td>$${m.estimatedCLV.toLocaleString()}</td>
                <td>${m.bookingCount}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </details>
    `;
  }

  setupEventListeners() {
    this.modal.querySelector('.close-btn').addEventListener('click', () => this.close());
    this.modal.querySelector('#copy-counter-email').addEventListener('click', () => this.copyEmail());
    this.modal.querySelector('#accept-recommendation').addEventListener('click', () => this.logDecision());
  }

  copyEmail() {
    const emailTemplate = this.analysis.emailTemplates.counterOffer;
    navigator.clipboard.writeText(emailTemplate);
    alert('Counter-offer email copied to clipboard!');
  }

  async logDecision() {
    // Log the decision to the database
    await fetch('/api/yield/event-decision/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventDetails: this.eventData,
        analysis: this.analysis,
        decision: this.analysis.recommendation
      })
    });

    this.close();
  }

  close() {
    this.modal.remove();
  }
}
```

### MezzanineROIPlannerComponent (Phase 3)

```javascript
// js/components/mezzanine-roi-planner.js

class MezzanineROIPlannerComponent {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.analysis = null;
    this.prioritySegment = 'Mixed';
  }

  async init() {
    await this.loadAnalysis();
    this.render();
    this.setupEventListeners();
  }

  async loadAnalysis(prioritySegment = 'Mixed') {
    try {
      const response = await fetch(`/api/yield/mezzanine-roi?prioritySegment=${prioritySegment}`);
      this.analysis = await response.json();
    } catch (error) {
      console.error('Failed to load mezzanine ROI analysis:', error);
      this.analysis = { error: 'Unable to load analysis' };
    }
  }

  render() {
    if (!this.analysis || this.analysis.error) {
      this.container.innerHTML = '<p>Error loading analysis</p>';
      return;
    }

    this.container.innerHTML = `
      <div class="mezzanine-roi-planner">
        <div class="planner-header">
          <h2>Mezzanine ROI Planner</h2>
          <div class="segment-filter">
            <label>Priority Segment:</label>
            <select id="priority-segment">
              <option value="Mixed">Mixed (All Segments)</option>
              <option value="Corporate Power Users">Corporate Power Users</option>
              <option value="Social Ambassadors">Social Ambassadors</option>
              <option value="Competitive Athletes">Competitive Athletes</option>
              <option value="Casual Drop-ins">Casual Drop-ins</option>
            </select>
          </div>
        </div>

        <div class="recommendation-summary">
          <div class="recommended-option">
            <h3>🏆 Recommended: ${this.analysis.recommended.option}</h3>
            <p>${this.analysis.recommended.rationale}</p>
          </div>
          <div class="alternative-option">
            <h4>Alternative: ${this.analysis.alternative.option}</h4>
            <p>${this.analysis.alternative.rationale}</p>
          </div>
        </div>

        <div class="options-comparison">
          ${this.renderOptionsTable()}
        </div>

        <div class="action-buttons">
          <button class="btn-secondary" id="export-pdf">Export to PDF</button>
          <button class="btn-primary" id="adjust-assumptions">Adjust Assumptions</button>
        </div>
      </div>
    `;
  }

  renderOptionsTable() {
    const options = this.analysis.analysis;

    return `
      <table class="roi-comparison-table">
        <thead>
          <tr>
            <th>Option</th>
            <th>Setup Cost</th>
            <th>Payback Period</th>
            <th>Annual ROI</th>
            <th>5-Year Value</th>
            <th>Member Interest</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${options.map((option, index) => `
            <tr class="${index === 0 ? 'recommended' : ''}">
              <td>
                ${index === 0 ? '🥇 ' : ''}
                ${option.option}
              </td>
              <td>$${option.setupCost.toLocaleString()}</td>
              <td>${option.financials.paybackPeriod} months</td>
              <td>${option.financials.annualROI}%</td>
              <td>$${option.financials.fiveYearValue.toLocaleString()}</td>
              <td>${this.renderStars(option.memberInterest.stars)}</td>
              <td><strong>${option.recommendationScore}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  renderStars(count) {
    return '⭐'.repeat(count) + '☆'.repeat(5 - count);
  }

  setupEventListeners() {
    document.getElementById('priority-segment').addEventListener('change', async (e) => {
      this.prioritySegment = e.target.value;
      await this.loadAnalysis(this.prioritySegment);
      this.render();
      this.setupEventListeners();
    });

    document.getElementById('export-pdf')?.addEventListener('click', () => this.exportToPDF());
    document.getElementById('adjust-assumptions')?.addEventListener('click', () => this.openAssumptionsModal());
  }

  async exportToPDF() {
    // Export analysis to PDF for board presentation
    const response = await fetch('/api/yield/mezzanine-roi/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis: this.analysis })
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mezzanine_roi_analysis.pdf';
    a.click();
  }

  openAssumptionsModal() {
    // Open modal to adjust revenue/cost assumptions
    alert('Assumptions modal coming soon');
  }
}
```

---

## Data Processing Scripts

### Census Data ETL (Python)

```python
# scripts/generate-demographics.py

import geopandas as gpd
import pandas as pd
import requests
import json

# Census API configuration
CENSUS_API_KEY = 'your_api_key_here'
CENSUS_YEAR = 2023

def download_census_tracts():
    """Download Census tract boundaries for Cook County"""
    url = 'https://www2.census.gov/geo/tiger/TIGER2023/TRACT/tl_2023_17_tract.zip'

    # Download and read shapefile
    tracts = gpd.read_file(url)

    # Filter to Cook County (FIPS: 17031)
    cook_tracts = tracts[tracts['COUNTYFP'] == '031']

    return cook_tracts

def fetch_acs_data():
    """Fetch demographic data from American Community Survey"""
    base_url = f'https://api.census.gov/data/{CENSUS_YEAR}/acs/acs5'

    params = {
        'get': 'NAME,B19013_001E,B15003_022E,B15003_001E,B01003_001E',
        'for': 'tract:*',
        'in': 'state:17 county:031',
        'key': CENSUS_API_KEY
    }

    # B19013_001E: Median household income
    # B15003_022E: Bachelor's degree
    # B15003_001E: Total (for education %)
    # B01003_001E: Total population

    response = requests.get(base_url, params=params)
    data = response.json()

    # Convert to DataFrame
    df = pd.DataFrame(data[1:], columns=data[0])

    # Calculate derived fields
    df['medianIncome'] = pd.to_numeric(df['B19013_001E'])
    df['educationBachelors'] = pd.to_numeric(df['B15003_022E']) / pd.to_numeric(df['B15003_001E'])
    df['totalPopulation'] = pd.to_numeric(df['B01003_001E'])

    # Create GEOID (17 + 031 + tract)
    df['GEOID'] = '17031' + df['tract']

    return df[['GEOID', 'medianIncome', 'educationBachelors', 'totalPopulation']]

def merge_and_export():
    """Merge boundaries with demographics and export as GeoJSON"""
    tracts = download_census_tracts()
    demographics = fetch_acs_data()

    # Merge
    merged = tracts.merge(demographics, on='GEOID')

    # Calculate population density
    merged['landAreaSqMiles'] = merged.geometry.area / 2589988.11  # Convert sq meters to sq miles
    merged['populationDensity'] = merged['totalPopulation'] / merged['landAreaSqMiles']

    # Select final columns
    final = merged[['GEOID', 'NAME', 'medianIncome', 'educationBachelors',
                     'totalPopulation', 'landAreaSqMiles', 'populationDensity', 'geometry']]

    # Export as GeoJSON
    final.to_file('../data/geo/demographics.geojson', driver='GeoJSON')

    print(f'✓ Exported {len(final)} Census tracts to demographics.geojson')

if __name__ == '__main__':
    merge_and_export()
```

### National Clubs Scraper (Node.js)

```javascript
// scripts/scrape-national-clubs.js

const axios = require('axios');
const fs = require('fs');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const NFL_CITIES = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL',
  // ... 30 cities total
];

async function searchPickleballClubs(city) {
  const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
    params: {
      query: `pickleball club ${city}`,
      key: GOOGLE_API_KEY
    }
  });

  return response.data.results;
}

async function getPlaceDetails(placeId) {
  const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
    params: {
      place_id: placeId,
      fields: 'name,rating,user_ratings_total,website,formatted_phone_number,opening_hours',
      key: GOOGLE_API_KEY
    }
  });

  return response.data.result;
}

async function getPopularTimes(placeId) {
  // Note: Popular Times is not officially in the API, need alternative approach
  // Option 1: Use populartimes library (reverse-engineered)
  // Option 2: Manual scraping of Google Maps website
  // Option 3: Use existing PCC Yield Optimizer logic (if applicable)

  // Placeholder for now
  return {
    avgUtilization: Math.random() * 100,
    peakUtilization: Math.random() * 100
  };
}

async function main() {
  const allClubs = [];

  for (const city of NFL_CITIES) {
    console.log(`Searching ${city}...`);

    const clubs = await searchPickleballClubs(city);

    for (const club of clubs) {
      const details = await getPlaceDetails(club.place_id);
      const popularTimes = await getPopularTimes(club.place_id);

      allClubs.push({
        id: club.place_id,
        name: club.name,
        city: city.split(',')[0],
        state: city.split(',')[1].trim(),
        rating: details.rating,
        reviewCount: details.user_ratings_total,
        website: details.website,
        avgUtilization: popularTimes.avgUtilization,
        peakUtilization: popularTimes.peakUtilization,
        rankScore: (popularTimes.avgUtilization * 0.6 + popularTimes.peakUtilization * 0.4)
      });
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Sort by rank score
  allClubs.sort((a, b) => b.rankScore - a.rankScore);

  // Take top 50
  const top50 = allClubs.slice(0, 50);

  // Export
  fs.writeFileSync('../data/national-clubs.json', JSON.stringify({
    generatedAt: new Date().toISOString(),
    clubs: top50
  }, null, 2));

  console.log(`✓ Exported ${top50.length} clubs to national-clubs.json`);
}

main();
```

---

## Performance Optimization

### Lazy Loading Strategy

```javascript
// Only initialize Customer Intelligence components when tab is clicked
let customerIntelInitialized = false;

document.querySelector('[data-view="customer-intel"]').addEventListener('click', async () => {
  if (!customerIntelInitialized) {
    const customerIntel = new CustomerIntelligenceComponent('customer-intel-view');
    await customerIntel.init();
    customerIntelInitialized = true;
  }
});
```

### Data Caching

```javascript
// Cache demographics GeoJSON in localStorage (reduce load time)
async function loadDemographics() {
  const cached = localStorage.getItem('demographics_v1');

  if (cached) {
    return JSON.parse(cached);
  }

  const data = await fetch('/data/geo/demographics.geojson').then(r => r.json());
  localStorage.setItem('demographics_v1', JSON.stringify(data));

  return data;
}
```

### Database Query Optimization (Phase 3)

```sql
-- Index for fast date range queries
CREATE INDEX idx_bookings_date_range ON bookings(date_time, end_time);

-- Partial index for active bookings
CREATE INDEX idx_active_bookings ON bookings(date_time) WHERE cancelled = FALSE;

-- Materialized view refresh schedule
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule('refresh-utilization', '0 2 * * 0',
  'REFRESH MATERIALIZED VIEW utilization_by_slot');
```

---

## Security & Privacy

### Data Handling

**Phase 1 (Google Sheets)**:
- Survey responses contain PII (name, email, employer, work address)
- Google Sheets shared with Christy + Peter only (not public)
- Export to JSON removes email addresses (keep member ID only)

**Phase 3 (PostgreSQL)**:
- Booking data contains customer IDs (linkable to member names)
- Database access restricted (credentials in environment variables)
- No passwords stored (members authenticate via booking system)

### API Security

```javascript
// Backend API (Phase 3)
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet());  // Set security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// CORS (restrict to dashboard domain)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pcc-yield-optimizer.vercel.app');
  next();
});
```

---

## Testing Strategy

### Unit Tests (Phase 3)

```javascript
// tests/calculations.test.js

const { calculateCLV, estimateChurnRisk } = require('../js/utils/calculations');

describe('CLV Calculation', () => {
  test('Corporate Power User CLV', () => {
    const clv = calculateCLV({
      segment: 'Corporate Power Users',
      monthlyRevenue: 189,
      tenure: 24,
      cac: 150
    });

    expect(clv).toBe(3543);
  });

  test('Casual Drop-in CLV', () => {
    const clv = calculateCLV({
      segment: 'Casual Drop-ins',
      monthlyRevenue: 50,
      tenure: 6,
      cac: 30
    });

    expect(clv).toBe(150);
  });
});

describe('Churn Risk Estimation', () => {
  test('High booking success rate = Low churn risk', () => {
    const risk = estimateChurnRisk({
      bookingSuccessRate: 0.90,
      segment: 'Social Ambassadors'
    });

    expect(risk).toBe('Low');
  });

  test('Low booking success rate = High churn risk', () => {
    const risk = estimateChurnRisk({
      bookingSuccessRate: 0.55,
      segment: 'Corporate Power Users'
    });

    expect(risk).toBe('High');
  });
});
```

### Integration Tests

```javascript
// tests/integration/customer-intel.test.js

describe('Customer Intelligence Dashboard', () => {
  beforeEach(() => {
    // Load test data
    global.fetch = jest.fn((url) => {
      if (url.includes('customer-segments.json')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSegmentData)
        });
      }
    });
  });

  test('Renders segment pie chart', async () => {
    const component = new CustomerIntelligenceComponent('test-container');
    await component.init();

    const svg = document.querySelector('#segment-overview svg');
    expect(svg).toBeTruthy();
    expect(svg.querySelectorAll('.slice').length).toBe(4);
  });

  test('Filters by segment when pie slice clicked', async () => {
    const component = new CustomerIntelligenceComponent('test-container');
    await component.init();

    // Simulate click on "Corporate Power Users" slice
    const slice = document.querySelector('.slice');
    slice.click();

    // Check that neighborhood map filtered
    expect(component.activeSegment).toBe('Corporate Power Users');
  });
});
```

---

## Deployment

### Vercel Deployment (Frontend)

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/data/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ]
}
```

### Environment Variables

```bash
# .env (Phase 3 backend)
CENSUS_API_KEY=your_census_api_key
GOOGLE_API_KEY=your_google_api_key
DATABASE_URL=postgresql://user:password@host:5432/pcc_yield_optimizer
NODE_ENV=production
```

---

## Monitoring & Error Handling

### Error Handling Pattern

```javascript
async function loadData() {
  try {
    const response = await fetch('/data/customer-segments.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Failed to load customer segments:', error);

    // Show user-friendly error
    showErrorToast('Unable to load customer data. Please refresh the page.');

    // Log to monitoring (Phase 2+)
    if (window.Sentry) {
      Sentry.captureException(error);
    }

    // Return empty data to prevent crashes
    return { members: [] };
  }
}
```

---

## Migration & Rollback

### Phase 1 → Phase 2 Migration

- No breaking changes (additive only)
- New tabs added, existing functionality untouched
- Rollback: Hide new tabs via CSS if issues

### Phase 2 → Phase 3 Migration

- Backend API introduced (data source changes)
- Frontend updated to fetch from API instead of static files
- Rollback plan: Keep static files, revert fetch URLs

**Rollback Script**:
```javascript
// Switch data source (emergency rollback)
const USE_API = false;  // Set to false to use static files

async function loadBookings() {
  if (USE_API) {
    return fetch('/api/bookings').then(r => r.json());
  } else {
    return fetch('/data/bookings-static.json').then(r => r.json());
  }
}
```

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 8, 2025 | Peter Giordano | Initial technical specification |

---

**End of Technical Specification**
