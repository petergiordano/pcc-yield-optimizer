# Technical Specifications: Customer Intelligence Center

**Version**: 1.0
**Status**: Draft
**Based on**: PRD v1.0, Functional Spec v1.0

---

## 1. System Architecture

The system will be an extension of the existing PCC Yield Optimizer application, evolving from a simple client-side application to a full-stack platform with a dedicated backend, database, and data processing pipeline.

### Phased Architecture Evolution

- **Phase 1 (Manual First):** The existing architecture (Python SimpleHTTPServer + Vanilla JS frontend) will be used. Data ingestion will be handled by placing manually generated CSV and JSON files in the `/data` directory. All processing will occur on the client side.

- **Phase 2 (Automation):** This phase introduces a robust backend and data persistence layer.
  - **Backend API:** A Node.js server with an Express.js framework will be developed to serve data to the frontend and handle business logic.
  - **Database:** A PostgreSQL database will be introduced to store all member, booking, and enriched data.
  - **Data Pipeline:** A set of Python scripts, orchestrated by a simple cron job, will handle the automated data ingestion and the weekly third-party enrichment process.

- **Phase 3 (Integration):** The architecture will be extended with more advanced models and real-time capabilities.
  - **Calculation Engine:** The Python data pipeline will be expanded into a more formal calculation engine, responsible for running predictive models (churn, LTV) and generating recommendations.
  - **Caching:** A Redis cache will be added to store results from expensive calculations (e.g., scenario planning) to ensure a responsive UI.

### Technology Stack

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 | Maintain consistency with the existing codebase for initial phases. |
| | React (Optional, Phase 2+) | For building complex, stateful dashboard components. |
| **Visualization** | D3.js, Chart.js, Leaflet.js | Proven, powerful libraries for creating the required interactive charts and maps. |
| **Backend API** | Node.js, Express.js | Efficient for I/O-bound operations and a common choice for serving REST APIs to a JS frontend. |
| **Database** | PostgreSQL | Robust, open-source relational database with excellent support for JSON and geospatial data (via PostGIS). |
| **Data Pipeline** | Python (Pandas, Scikit-learn) | Industry standard for data analysis, ETL, and machine learning tasks. |
| **Deployment** | Vercel (Frontend), Railway/Heroku (Backend) | Modern platforms that simplify deployment, scaling, and CI/CD. |

---

## 2. Data Models

### Phase 1: File-Based Data

- `member_visits.json`: `{ "member_id": "M123", "visits_last_month": 5 }`
- `survey_results.json`: `{ "member_id": "M123", "motivation": "social", ... }`
- `corporate_connectors.json`: `[ { "name": "John Doe", "company": "Salesforce" } ]`

### Phase 2/3: PostgreSQL Database Schema

**`members`**
- `id` (VARCHAR, PK)
- `name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `join_date` (TIMESTAMP)
- `status` (VARCHAR, e.g., 'active', 'cancelled')
- `segment` (VARCHAR, FK to `segments.id`) - *Added in Phase 2*

**`bookings`**
- `id` (SERIAL, PK)
- `member_id` (VARCHAR, FK to `members.id`)
- `booking_time` (TIMESTAMP)
- `court_id` (INTEGER)
- `revenue_generated` (DECIMAL)

**`enriched_data`** - *Added in Phase 2*
- `member_id` (VARCHAR, PK, FK to `members.id`)
- `employer` (VARCHAR)
- `title` (VARCHAR)
- `company_size` (INTEGER)
- `home_address` (VARCHAR)
- `home_zip_code` (VARCHAR)
- `linkedin_url` (VARCHAR)
- `last_enriched` (TIMESTAMP)

**`segments`** - *Added in Phase 2*
- `id` (VARCHAR, PK, e.g., 'corporate_power_user')
- `display_name` (VARCHAR, e.g., 'Corporate Power User')
- `description` (TEXT)

**`survey_responses`**
- `id` (SERIAL, PK)
- `member_id` (VARCHAR, FK to `members.id`)
- `survey_name` (VARCHAR, e.g., 'onboarding_q1_2026')
- `question` (VARCHAR)
- `response` (TEXT)

---

## 3. API Endpoints (Phase 2+)

All endpoints will be served from `/api/v1/`.

- **`GET /api/v1/segments`**
  - **Description:** Returns a list of all customer segments and a summary for each (member count, avg. LTV).
  - **Response Body:**
    ```json
    [
      {
        "id": "corporate_power_user",
        "displayName": "Corporate Power Users",
        "memberCount": 45,
        "averageLtv": 3543
      }, ...
    ]
    ```

- **`GET /api/v1/members?segment={id}`**
  - **Description:** Returns a list of all members, optionally filtered by segment.
  - **Response Body:** `[ { "id": "M123", "name": "Sarah", "employer": "Google" }, ... ]`

- **`GET /api/v1/map/member-locations?segment={id}`**
  - **Description:** Returns GeoJSON data for member home locations, filterable by segment, for rendering the map heatmap.
  - **Response Body:** A GeoJSON FeatureCollection.

- **`POST /api/v1/yield/event-decision`**
  - **Description:** Takes event details and returns a recommendation.
  - **Request Body:** `{ "revenue": 500, "dateTime": "2026-02-15T19:00:00Z", "courts": 4 }`
  - **Response Body:** `{ "recommendation": "Counter-offer", "details": "Displaces 2 high-value members...", "estimatedChurnCost": 966 }`

---

## 4. Third-Party Integrations

- **Clearbit / People Data Labs:**
  - **Purpose:** Automated member data enrichment.
  - **Trigger:** A weekly Python script will query the `members` table for entries where `enriched_data` is null or `last_enriched` is > 30 days ago.
  - **Authentication:** API key will be stored securely in an environment variable or secrets manager.

- **US Census Bureau API:**
  - **Purpose:** To fetch demographic data for Chicago census tracts.
  - **Trigger:** One-time data pull to create the `demographics.geojson` file. Will be refreshed annually.

- **Member Booking System:**
  - **Purpose:** Critical data source for member behavior.
  - **Integration:** The primary method will be a daily CSV export placed on a shared server. The Python ETL script will fetch and process this file. An API-based integration is a future enhancement.
