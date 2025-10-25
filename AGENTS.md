# Customer Intelligence Center Agent Workflow

This workflow governs the agentic implementation of the Customer Intelligence Center for the PCC Yield Optimizer. It aligns with the specification suite in `docs/PRD/PRD_Customer_Intelligence/` and supports the 16-week roadmap defined in `EPICS_AND_SPRINTS.md`.

## Agent Roles & Responsibilities

| Agent | Domain Focus | Primary Responsibilities | Key Artifacts & Tools |
|-------|--------------|--------------------------|-----------------------|
| Requirements Analyst | Specification synthesis & validation | Maintain living checklists per PRD/Functional/Design specs, extract acceptance criteria from `EPICS_AND_SPRINTS.md`, capture stakeholder questions, flag scope drift | `docs/PRD/...` suite, Notion/GDoc checklist |
| Data Architect | Data models, ETL, source integration | Design JSON/DDL schemas (`customer-segments.json`, `demographics.geojson`, `metricool-config.json`), author ETL scripts (`scripts/generate-demographics.py`, census ingest), manage Metricool data staging, enforce data quality rules | Python 3.11, Node.js ETL, Google Sheets API |
| Frontend Developer | UI components & visualizations | Implement dashboard files (`js/components/customer-intelligence.js`, `segment-chart.js`, `neighborhood-map.js`, `connector-table.js`), apply design tokens, bind data contracts, ensure accessibility targets | Vanilla JS ES6, D3.js v7, Leaflet 1.9, WCAG checklist |
| Backend Developer (Phase 3) | APIs & computation layer | Stand up Express services (`/api/bookings`, `/api/scenarios/calculate`, etc.), connect PostgreSQL models, expose calculation engines (Python scenario modules), harden auth/logging | Node.js + Express, PostgreSQL 14, Python calculators |
| Integration Specialist | Cross-system data flow & ops tooling | Wire Metricool/Zapier ingestion for Sprint 4.4, manage Google Sheets sync, schedule data refreshes, coordinate with operations for survey exports, validate end-to-end pipelines | Zapier, REST/CSV connectors, cron orchestration |
| QA / Validation | Acceptance testing & regression | Derive test plans from Functional Spec FRs, run story-level validation, own regression packs per quality gate, monitor performance budgets, manage defect triage | Cypress smoke (if introduced), manual scripts, Lighthouse |

## Communication Protocol

- **Sprint Intake (Day 0)**: Requirements Analyst walks Data Architect and Frontend Developer through sprint scope, referencing checklists and open assumptions.
- **Daily Async Standup (Slack thread)**: Each agent posts progress, blockers, next focus; Integration Specialist shares external dependencies.
- **Spec Alignment Review (Twice per sprint)**: Requirements Analyst and QA hold 30-minute sync to reconcile evolving specs and update acceptance criteria.
- **Tech Sync (Phase-dependent)**: Data Architect and Frontend Developer meet mid-sprint; Backend Developer joins starting Epic 5.
- **Decision Log**: All architectural or scope decisions recorded in `docs/decisions/` with owner, rationale, affected specs.
- **Handoff Briefs**: Outgoing agent posts summary + links in shared channel before ownership transfers.

## Quality Gates

| Gate | Timing | Entry Criteria | Exit Criteria |
|------|--------|----------------|---------------|
| QG1 – Data Readiness | End Epic 1 & 2 | Survey response ingestion plan approved; draft schemas reviewed | `customer-segments.json` seeded with confidence scores, `demographics.geojson` validated, data QA checklist signed |
| QG2 – UI Integration | Mid Epic 3 | Static data contracts frozen, component API reviewed | Customer Intelligence dashboard functional with sample data, accessibility spot-check (contrast, keyboard) passed |
| QG3 – Social Signal Enrichment | Sprint 4.4 | Metricool access provisioned, integration scripts code-complete | Enrichment pipeline runs on staging data, Integration Specialist sign-off, QA regression green |
| QG4 – Yield Engine API | Sprint 5.3 (Phase 3) | Backend scaffolding ready, database migrations reviewed | Express endpoints passing contract tests, Python calculators benchmarked, QA smoke pack green |
| QG5 – Go-Live | Final week | All prior gates closed, defect backlog triaged | UAT complete, documentation packaged, rollback plan ready |

## Handoff Points

1. **Epic 1 → Epic 2**: Requirements Analyst hands segment decision tree artifacts to Data Architect for demographic overlay alignment.
2. **Epic 2 → Epic 3**: Data Architect delivers frozen data schemas and sample datasets to Frontend Developer; Integration Specialist preps map tiles.
3. **Epic 3 → Epic 4**: Frontend Developer hands interaction specs and data binding notes to Integration Specialist for social enrichment hookup.
4. **Epic 4 → Epic 5**: Integration Specialist and Data Architect deliver enriched datasets and pipeline runbooks to Backend Developer.
5. **Pre-Go-Live**: Backend Developer hands API contracts and performance metrics to QA for final regression and stakeholder demo rehearsal.

## Testing Strategy

- **Requirements Analyst**: Trace each user story to acceptance tests; maintain RTM (requirement traceability matrix) updated twice per sprint.
- **Data Architect**: Unit-test ETL scripts (pytest), run schema validation (`jsonschema`), execute data profiling reports before every handoff.
- **Frontend Developer**: Implement component-level Jest tests (if feasible) and manual QA checklists for critical flows (filters, exports, accessibility).
- **Backend Developer**: Write supertest-based API contract tests, integration tests for Python calculators, load test key endpoints (k6 baseline).
- **Integration Specialist**: Perform end-to-end dry runs for pipelines, validate cron schedules, monitor logs for data drift.
- **QA / Validation**: Own regression suites, exploratory testing, Lighthouse performance audits, cross-browser verification (Chrome/Safari/Firefox).

## Documentation Standards

- **Requirements Analyst**: Update `docs/PRD/...` checklist annotations and maintain sprint-specific acceptance notes in `/docs/status/`.
- **Data Architect**: Version schemas in `/data/README.md`, comment ETL scripts, store data dictionaries and quality reports in `/docs/data/`.
- **Frontend Developer**: Document component props/state in JSDoc headers, add interaction notes in `/docs/frontend/` per component.
- **Backend Developer**: Maintain OpenAPI-like endpoint summaries in `/docs/api/`, include ERD updates and migration notes.
- **Integration Specialist**: Publish runbooks and integration diagrams in `/docs/integration/`, including credential rotation procedures.
- **QA / Validation**: Store regression packs, test results, and defect logs in `/docs/qa/`; update RTM links after each quality gate.

## Sprint Workflow (5 Epics, 16 Sprints)

| Epic & Sprints | Duration | Lead Agent(s) | Focus & Key Outputs |
|----------------|----------|---------------|---------------------|
| Epic 1: Customer Profiling Foundation (Sprints 1.1–1.3) | 2 weeks | Requirements Analyst → Data Architect | Survey design, manual segmentation, corporate connector list, initial `customer-segments.json` seed |
| Epic 2: Demographics Overlay (Sprints 2.1–2.2) | 2 weeks | Data Architect | Census ETL (`generate-demographics.py`), geojson assets, segment heatmaps, QA data checks |
| Epic 3: Customer Intelligence Dashboard (Sprints 3.1–3.4) | 2 weeks | Frontend Developer | UI components, D3 visualizations, Leaflet map overlays, export workflows, accessibility compliance |
| Epic 4: Best Practice Research Engine (Sprints 4.1–4.4) | 4 weeks | Integration Specialist (with Data Architect support) | National club scraping, programming ideas library, Sprint 4.4 social signal enrichment via Metricool |
| Epic 5: Yield Management Foundation (Sprints 5.1–5.6) | 6 weeks | Backend Developer (QA co-lead) | Express API build-out, Python calculators (scenario, pricing, ROI), PostgreSQL integration, final UAT |

Sprint ceremonies follow a two-week cadence: planning (Day 0), mid-sprint alignment (Day 5), demo + retro (Day 10). QA signs off at each quality gate before the next epic commences.

