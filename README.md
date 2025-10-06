# PCC Yield Optimizer

A competitive intelligence dashboard for Pickleball Clubhouse Chicago (PCC) that visualizes facility utilization patterns to identify strategic opportunities for membership growth and revenue optimization.

## Sprint 1: Enhanced Multi-Facility Heatmap

### Features
- **Side-by-side heatmaps** comparing PCC and SPF Chicago utilization
- **7-day × 24-hour grids** showing hourly popularity (0-100%)
- **Color-coded cells** with gradient from white (0%) to deep red (100%)
- **Interactive tooltips** showing exact utilization percentages on hover
- **Filter controls** to show/hide facility heatmaps
- **Professional Tableau-quality design** with clean, data-dense aesthetic

### Quick Start

1. **Serve the application locally:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # Or using Node.js
   npx serve .
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

3. **Interact with the dashboard:**
   - Hover over cells to see exact utilization percentages
   - Use checkboxes in the sidebar to show/hide facilities
   - Compare busy times between PCC and SPF

### Project Structure

```
pcc-yield-optimizer/
├── index.html              # Main entry point
├── css/
│   ├── main.css           # Design system, typography, layout
│   ├── components.css     # Reusable UI components
│   └── dashboards.css     # Heatmap-specific styles
├── js/
│   ├── config.js          # Configuration and constants
│   ├── data-loader.js     # Data loading utilities
│   ├── main.js            # Application initialization
│   ├── components/
│   │   └── heatmap.js     # HeatmapComponent class
│   └── utils/
│       └── formatters.js  # Formatting helpers
└── data/
    ├── facilities.json           # Facility metadata
    └── popular-times/            # Hourly utilization data
        ├── pcc.json
        └── spf.json
```

### Technical Details

**Tech Stack:**
- Vanilla JavaScript (ES6+)
- CSS3 with custom properties
- [Tippy.js](https://atomiks.github.io/tippyjs/) for tooltips
- No build process required

**Browser Support:**
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+

**Performance:**
- Page load: < 2 seconds
- Smooth interactions: 60 FPS
- No dependencies beyond Tippy.js

### Design System

**Colors:**
- Primary Blue: `#005DAA` (PCC brand)
- Success Green: `#10B981` (opportunities)
- Heatmap gradient: White → Yellow → Orange → Red

**Typography:**
- System fonts for fast loading
- 8px spacing system (4px, 8px, 16px, 24px, 32px)

**Layout:**
- 280px sticky sidebar for filters
- Responsive grid for heatmaps
- WCAG 2.1 AA compliant

### Data Format

**Popular Times (`data/popular-times/*.json`):**
```json
{
  "facilityId": "pcc",
  "lastUpdated": "2025-10-06T12:00:00Z",
  "weeklyData": [
    {
      "day": "monday",
      "hourly": [
        {"hour": 0, "popularity": 0},
        {"hour": 8, "popularity": 45},
        ...
      ]
    },
    ...
  ]
}
```

### Future Sprints

- **Sprint 2:** Opportunity overlays (green/yellow borders for high-opportunity time slots)
- **Sprint 3:** Geographic competitive map with facility locations
- **Sprint 4:** Gap analysis grid with revenue estimates
- **Sprint 5:** Detailed time slot analysis panels

### Development

**Add a new facility:**
1. Add facility metadata to `data/facilities.json`
2. Create `data/popular-times/{facility-id}.json`
3. Add checkbox to `index.html` sidebar
4. Update `main.js` to include new facility ID in `facilityIds` array

**Customize colors:**
Edit `js/config.js` → `CONFIG.colors`

**Modify layout:**
Edit `css/main.css` → `.dashboard` grid template

### Documentation

- [Functional Specification](./FUNCTIONAL_SPEC.md) - Features and user stories
- [Technical Specification](./TECH_SPEC.md) - Architecture and data models
- [Design Specification](./DESIGN_SPEC.md) - Visual design system
- [Claude Code Guidance](./CLAUDE.md) - AI development context

### License

© 2025 Pickleball Clubhouse Chicago. All rights reserved.

---

**Built with [Claude Code](https://claude.com/claude-code)**
