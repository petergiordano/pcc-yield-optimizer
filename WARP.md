# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick Start Commands

### Development Server
```bash
# Start local development server (Python 3)
python3 -m http.server 8000

# Alternative using Node.js
npx serve .

# Alternative using custom CORS-enabled server
python3 server.py
```

### View Application
```bash
# Open in browser after starting server
open http://localhost:8000
```

## Architecture Overview

### High-Level Structure
The PCC Yield Optimizer is a **client-side competitive intelligence dashboard** for Pickleball Clubhouse Chicago that visualizes facility utilization patterns to identify strategic opportunities. The application follows a modular vanilla JavaScript architecture with reactive state management.

### Core Architecture Patterns

**1. State Management (StateManager Pattern)**
- Centralized state in `js/state/StateManager.js` using Observer pattern
- Components subscribe to state changes for reactive updates
- Single source of truth for all facility data and calculations

**2. Component-Based Architecture**
- Each dashboard view is a separate component class
- Components follow initialization → render → subscribe pattern
- Located in `js/components/` directory

**3. Multi-Dashboard System**
- **Heatmap View**: 7×24 hour utilization grids with opportunity overlays
- **Opportunity List**: Ranked list of missed opportunities
- **Gap Analysis**: Quantified competitive gaps
- **Geographic Map**: Facility locations with member density
- **Market Gap Heatmap**: Advanced competitive analysis
- **Competitive Matrix**: Positioning analysis

### Key Components

**Main Application (`js/main.js`)**
- Application initialization and component orchestration
- Manages global state (`appState`) and tooltip lifecycle
- Coordinates multiple dashboard components

**Data Layer**
- `js/data-loader.js`: Handles JSON data loading with caching
- `data/facilities.json`: Facility metadata
- `data/popular-times/`: Hourly utilization data per facility

**Component System**
- `js/components/heatmap.js`: Core visualization component
- `js/components/opportunity-list.js`: Opportunity ranking
- `js/components/gap-analysis-grid.js`: Gap analysis
- `js/components/map.js`: Geographic visualization

### Data Flow
1. `StateManager` loads facility data and popular times
2. Components subscribe to state changes
3. Filter changes trigger state updates
4. State updates notify all subscribed components
5. Components reactively re-render with new data

## Development Guidelines

### Adding New Components
1. Create component class in `js/components/`
2. Implement `init()`, `render()`, and `subscribeToStateChanges()` methods
3. Register component in `main.js` `initComponents()` function
4. Add corresponding CSS in appropriate stylesheet

### State Management Integration
- Use `window.state.subscribe('event', callback)` for reactive updates
- Call `window.state.setVisibleFacilities()` to trigger recalculations
- Access data via `window.state.getOpportunityScores()`, etc.

### Adding New Facilities
1. Add facility metadata to `data/facilities.json`
2. Create `data/popular-times/{facility-id}.json`
3. Add facility ID to `CONFIG.facilityIds` in `js/config.js`
4. Add checkbox to sidebar in `index.html`

### Visual Design System
- Colors defined in `js/config.js` under `CONFIG.colors`
- CSS variables and components in `css/` directory
- Follows 8px spacing system (4px, 8px, 16px, 24px, 32px)
- Tableau-quality visual standards

## Technology Stack

### Core Technologies
- **Vanilla JavaScript ES6+** (no build process)
- **HTML5** with semantic markup
- **CSS3** with custom properties and flexbox/grid

### External Libraries
- **Leaflet.js 1.9**: Interactive maps
- **Tippy.js 6**: Beautiful tooltips
- **Plotly.js**: Interactive charts for competitive matrix

### Browser Support
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- No IE11 support

## Sprint System

The codebase follows a 16-sprint roadmap organized into 5 epics:

1. **Epic 1-2**: Customer profiling and demographics (Data foundation)
2. **Epic 3**: Dashboard UI components and visualizations
3. **Epic 4**: Best practice research and social signal enrichment
4. **Epic 5**: Yield management API foundation (future backend)

### Agent Workflow
The repository includes an agent-based development workflow defined in `AGENTS.md`:
- **Requirements Analyst**: Specification synthesis
- **Data Architect**: Data models and ETL
- **Frontend Developer**: UI components and visualizations
- **Backend Developer**: APIs and computation layer (Phase 3)
- **Integration Specialist**: Cross-system data flow
- **QA/Validation**: Testing and acceptance

## File Structure Patterns

### CSS Organization
- `css/main.css`: Global styles and design system
- `css/components.css`: Reusable UI components
- `css/dashboards.css`: Dashboard-specific styles
- `css/*-states.css`: Loading, empty, and error states

### JavaScript Organization
- `js/main.js`: Application entry point
- `js/config.js`: Configuration constants
- `js/components/`: Individual component classes
- `js/state/`: State management system
- `js/utils/`: Utility functions

### Data Organization
- `data/facilities.json`: Master facility list
- `data/popular-times/`: Per-facility utilization data
- `data/members-mock.json`: Simulated member data

## Testing & Quality

### Manual Testing Approach
- Visual regression testing via screenshot comparison
- Cross-browser testing for supported browsers
- Performance testing with Lighthouse (target: 90+ performance score)
- Accessibility compliance (WCAG 2.1 AA)

### Performance Targets
- Initial page load: < 2 seconds
- Filter/interaction response: < 100ms
- Heatmap render: < 500ms
- Smooth interactions: 60 FPS

## Documentation Structure

Key documentation files:
- `README.md`: Project overview and quick start
- `TECH_SPEC.md`: Detailed technical architecture
- `FUNCTIONAL_SPEC.md`: Feature specifications and user stories
- `DESIGN_SPEC.md`: Visual design system
- `AGENTS.md`: Agent workflow and responsibilities

## Common Development Tasks

### Debugging State Issues
- Check `window.state` object in browser console
- Use `window.state.subscribers` to see component subscriptions
- Monitor state change events with `window.state.debug = true`

### Tooltip Management
- All tooltips managed via `window.tippyInstances` array
- Call `window.destroyAllTooltips()` before creating new ones
- Components should return tooltip instances via `getTippyInstances()`

### Adding New Dashboard Views
1. Create component class following existing patterns
2. Add tab button to `index.html` navigation
3. Add view container with `id="{view-name}-view"`
4. Register in `setupViewSwitching()` function
5. Add corresponding CSS styles