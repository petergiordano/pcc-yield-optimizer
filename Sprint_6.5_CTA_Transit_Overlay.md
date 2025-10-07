# Sprint 6.5: CTA Transit Layer & Accessibility Analysis

**Effort**: Medium (2-3 hours)  
**Priority**: Medium  
**Dependencies**: Sprint 5 (Geographic Map)  
**Status**: PLANNED

---

## Strategic Decision: API vs Static Data

Two implementation approaches - choose based on project needs:

### Option A: Static GeoJSON (RECOMMENDED FOR MVP)

**Best for**: Fast implementation, no API keys, reliable performance, sufficient for demo

**Pros**:
- ✅ No API rate limits or keys required
- ✅ Instant loading (10-20KB total)
- ✅ Works offline after initial load
- ✅ Predictable performance
- ✅ Simple implementation (~2 hours)

**Cons**:
- ❌ Requires manual update if CTA changes routes (rare - maybe once every 2-3 years)
- ❌ No real-time train locations (not needed for your use case)

**Data Sources**:

1. **CTA 'L' Rail Lines**  
   URL: https://data.cityofchicago.org/Transportation/CTA-L-Rail-Lines/xbyr-jnvx
   - Click "Export" button → Select "GeoJSON"
   - Filter to Brown & Red Lines only (see processing steps below)
   - Save as: `data/geo/transit-lines.geojson`

2. **CTA 'L' Rail Stations**  
   URL: https://data.cityofchicago.org/Transportation/CTA-L-Rail-Stations/3tzw-cg4m
   - Click "Export" button → Select "GeoJSON"
   - Filter to Brown & Red Line stations
   - Save as: `data/geo/transit-stations.geojson`

**Data Processing Steps**:

```bash
# Download both datasets as GeoJSON from Chicago Data Portal

# For Lines - Filter to Brown/Red Lines:
# Manual method: Open in text editor, delete features where 
# properties.LINES doesn't contain "Brn" or "Red"

# OR use jq (if installed):
jq '.features |= map(select(.properties.LINES | contains("Brn") or contains("Red")))' \
   raw-lines.geojson > data/geo/transit-lines.geojson

# For Stations - Filter to Brown/Red stations:
jq '.features |= map(select(.properties.RED == "true" or .properties.BRN == "true"))' \
   raw-stations.geojson > data/geo/transit-stations.geojson

# Optional: Simplify geometries to reduce file size
# Use https://mapshaper.org/:
# 1. Import your GeoJSON
# 2. Click "Simplify" 
# 3. Set to 50% detail
# 4. Export as GeoJSON

# Expected file sizes after filtering:
# - transit-lines.geojson: ~15-20 KB (Brown + Red lines)
# - transit-stations.geojson: ~3-5 KB (~30 stations)
```

**Why Brown & Red Lines?**
- Brown Line: Serves Lincoln Park, Lakeview (near SPF at Southport)
- Red Line: Downtown/North Side corridor (near PCC, connects to other facilities)
- These are the most relevant for pickleball facility accessibility in your competitive set

---

### Option B: SODA API (For Future Enhancement)

**Best for**: Real-time updates, dynamic filtering, production systems

**Pros**:
- ✅ Always up-to-date data
- ✅ Can query specific lines/stations on demand
- ✅ Integrates with other Chicago datasets
- ✅ No manual file updates needed

**Cons**:
- ❌ Requires app token (free but needs registration: https://data.cityofchicago.org/profile/app_tokens)
- ❌ API rate limits: No token = 1000 requests/day, With token = significantly higher
- ❌ Depends on external service availability
- ❌ Slightly slower initial load (~500ms)

**API Endpoints**:

```javascript
// Lines API - Filtered to Brown/Red
const LINES_API = 'https://data.cityofchicago.org/resource/xbyr-jnvx.geojson?' + 
                  '$where=lines like "%Brn%" OR lines like "%Red%"';

// Stations API - Filtered to Brown/Red
const STATIONS_API = 'https://data.cityofchicago.org/resource/3tzw-cg4m.geojson?' + 
                     '$where=red=true OR brn=true';

// Usage example:
async loadTransitLayerFromAPI() {
  try {
    // Optional: Add app token to headers
    const headers = {
      'X-App-Token': 'YOUR_APP_TOKEN_HERE' // Register at data.cityofchicago.org
    };
    
    const linesResponse = await fetch(LINES_API, { headers });
    const linesData = await linesResponse.json();
    
    const stationsResponse = await fetch(STATIONS_API, { headers });
    const stationsData = await stationsResponse.json();
    
    // Process data same as static GeoJSON...
    this.renderTransitLayer(linesData, stationsData);
  } catch (error) {
    console.error('Failed to load transit data from API:', error);
    // Fallback to static files if API fails
  }
}
```

**API Documentation**: 
- SODA API Overview: https://dev.socrata.com/
- Lines Dataset: https://dev.socrata.com/foundry/data.cityofchicago.org/xbyr-jnvx
- Stations Dataset: https://dev.socrata.com/foundry/data.cityofchicago.org/3tzw-cg4m

**When to use API vs Static**:
- Use **Static** for: MVP, demo, investor presentations, local development
- Use **API** for: Production deployment, admin dashboards, frequently changing data needs

---

## What to Build (Option A: Static Implementation)

### 1. Data Preparation (30 minutes)

**Download & Filter**:
```bash
# 1. Go to https://data.cityofchicago.org/Transportation/CTA-L-Rail-Lines/xbyr-jnvx
# 2. Click "Export" → "GeoJSON"
# 3. Save as raw-lines.geojson

# 4. Go to https://data.cityofchicago.org/Transportation/CTA-L-Rail-Stations/3tzw-cg4m  
# 5. Click "Export" → "GeoJSON"
# 6. Save as raw-stations.geojson

# 7. Filter files (manual or using jq - see processing steps above)

# 8. Place in project:
mkdir -p data/geo
mv transit-lines.geojson data/geo/
mv transit-stations.geojson data/geo/
```

**Verify Data Structure**:
```json
// transit-lines.geojson should look like:
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "LINES": "Brn",
        "LEGEND": "Brown Line",
        // other properties...
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [[-87.xxxx, 41.xxxx], ...]
      }
    }
  ]
}

// transit-stations.geojson should look like:
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "STATION_NAME": "Southport",
        "RED": "false",
        "BRN": "true",
        "ADA": "true",
        // other properties...
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-87.xxxx, 41.xxxx]
      }
    }
  ]
}
```

---

### 2. Code Implementation (60 minutes)

**File**: `js/components/map.js`

**Add Method: loadTransitLayer()**
```javascript
async loadTransitLayer() {
  try {
    console.log('Loading CTA transit layer...');
    
    // Load transit lines
    const linesResponse = await fetch('./data/geo/transit-lines.geojson');
    if (!linesResponse.ok) {
      throw new Error(`Failed to load transit lines: ${linesResponse.status}`);
    }
    const linesData = await linesResponse.json();

    // Load stations
    const stationsResponse = await fetch('./data/geo/transit-stations.geojson');
    if (!stationsResponse.ok) {
      throw new Error(`Failed to load transit stations: ${stationsResponse.status}`);
    }
    const stationsData = await stationsResponse.json();

    // Create transit layer group (hidden by default)
    this.layers.transit = L.layerGroup();

    // Add transit lines with correct colors
    L.geoJSON(linesData, {
      style: (feature) => {
        // Map CTA line colors
        const lineColors = {
          'Brn': '#62361B',  // Brown Line
          'Red': '#C60C30'   // Red Line
        };
        
        const lineCode = feature.properties.LINES;
        return {
          color: lineColors[lineCode] || '#CC0000',
          weight: 4,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round'
        };
      }
    }).addTo(this.layers.transit);

    // Add station markers
    L.geoJSON(stationsData, {
      pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
          radius: 7,
          fillColor: '#FFFFFF',
          color: '#C60C30',
          weight: 2.5,
          opacity: 1,
          fillOpacity: 1
        });
      },
      onEachFeature: (feature, layer) => {
        // Bind popup with facility proximity info
        layer.bindPopup(this.createStationPopup(feature));
        
        // Add hover effect
        layer.on('mouseover', function() {
          this.setStyle({ radius: 9, weight: 3 });
        });
        layer.on('mouseout', function() {
          this.setStyle({ radius: 7, weight: 2.5 });
        });
      }
    }).addTo(this.layers.transit);

    // Add to map if transit control is enabled
    if (this.controls.transit) {
      this.layers.transit.addTo(this.map);
    }

    console.log(`Transit layer loaded: ${linesData.features.length} lines, ${stationsData.features.length} stations`);
    
  } catch (error) {
    console.warn('Could not load transit data:', error.message);
    // Graceful degradation - hide transit checkbox if data fails
    const transitCheckbox = document.getElementById('toggle-transit');
    if (transitCheckbox) {
      transitCheckbox.parentElement.style.display = 'none';
    }
  }
}
```

**Add Method: createStationPopup()**
```javascript
createStationPopup(feature) {
  const station = feature.properties;
  const stationName = station.STATION_NAME || station.name || 'Unknown Station';
  
  // Determine line(s)
  const lines = [];
  if (station.RED === 'true' || station.RED === true) lines.push('Red Line');
  if (station.BRN === 'true' || station.BRN === true) lines.push('Brown Line');
  const lineDisplay = lines.join(' & ') || 'CTA';
  
  // Calculate nearby facilities (within 0.5 mile walk = ~0.8 km)
  const stationCoords = feature.geometry.coordinates; // [lng, lat]
  const nearbyFacilities = this.facilitiesData
    .map(({ facility }) => {
      const distance = this.haversineDistance(
        stationCoords[1], // lat
        stationCoords[0], // lng
        facility.coordinates.lat,
        facility.coordinates.lng
      );
      return { facility, distance };
    })
    .filter(({ distance }) => distance < 0.8) // 0.8 km ≈ 0.5 miles
    .sort((a, b) => a.distance - b.distance);
  
  // Build popup HTML
  let html = `
    <div class="station-popup">
      <h3>${stationName}</h3>
      <div class="popup-row">
        <strong>Line:</strong> <span class="line-badge">${lineDisplay}</span>
      </div>
  `;
  
  if (station.ADA === 'true' || station.ADA === true) {
    html += `
      <div class="popup-row">
        <strong>Accessible:</strong> ♿ ADA Compliant
      </div>
    `;
  }
  
  if (nearbyFacilities.length > 0) {
    html += `
      <div class="popup-row">
        <strong>Nearby Facilities:</strong>
        <ul class="facility-list">
    `;
    
    nearbyFacilities.forEach(({ facility, distance }) => {
      const walkTime = Math.ceil(distance * 12); // ~12 min per km
      const isPCC = facility.name === 'Pickleball Clubhouse';
      html += `
        <li class="${isPCC ? 'pcc-facility' : ''}">
          <span class="facility-name">${facility.name}</span>
          <span class="walk-time">${walkTime} min walk</span>
        </li>
      `;
    });
    
    html += `
        </ul>
      </div>
    `;
  } else {
    html += `
      <div class="popup-row">
        <em>No facilities within walking distance</em>
      </div>
    `;
  }
  
  html += `</div>`;
  return html;
}
```

**Update init() Method**:
```javascript
init() {
  this.createMap();
  this.addFacilityMarkers();
  this.addCatchmentAreas();
  this.loadMemberDensity();
  this.loadTransitLayer(); // ADD THIS LINE
  this.attachEventListeners();
  console.log('Map initialized successfully');
}
```

**Update toggleLayer() Method** (find the transit section):
```javascript
} else if (layerName === 'transit') {
  if (this.layers.transit) {
    if (isVisible) {
      this.layers.transit.addTo(this.map);
    } else {
      this.map.removeLayer(this.layers.transit);
    }
  } else {
    console.warn('Transit layer not yet loaded');
  }
}
```

---

### 3. UI & Styling (30 minutes)

**File**: `index.html`

**Re-enable Transit Checkbox** (find the transit checkbox, change from disabled to enabled):
```html
<label class="checkbox-label">
  <input type="checkbox" id="toggle-transit">
  <span>Show CTA Transit</span>
</label>
```

**Update Map Legend** (add to existing legend):
```html
<!-- CTA Transit -->
<div class="legend-section">
  <h4>CTA Transit</h4>
  
  <div class="legend-item">
    <div style="width: 30px; height: 4px; background: #62361B;"></div>
    <span>Brown Line</span>
  </div>
  
  <div class="legend-item">
    <div style="width: 30px; height: 4px; background: #C60C30;"></div>
    <span>Red Line</span>
  </div>
  
  <div class="legend-item">
    <div class="legend-marker" style="
      background: #FFFFFF; 
      border: 2.5px solid #C60C30; 
      width: 14px; 
      height: 14px;
      border-radius: 50%;
    "></div>
    <span>CTA Stations</span>
  </div>
</div>
```

**File**: `css/dashboards.css`

**Add Station Popup Styles**:
```css
/* CTA Station Popup Styles */
.station-popup {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  min-width: 200px;
  max-width: 280px;
}

.station-popup h3 {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #E5E7EB;
}

.station-popup .popup-row {
  margin-bottom: 10px;
  font-size: 13px;
  line-height: 1.5;
}

.station-popup .popup-row strong {
  color: #374151;
  font-weight: 600;
}

.station-popup .line-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #FEE2E2;
  color: #991B1B;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.station-popup .facility-list {
  margin: 8px 0 0 0;
  padding: 0;
  list-style: none;
}

.station-popup .facility-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
}

.station-popup .facility-list li:last-child {
  border-bottom: none;
}

.station-popup .facility-list .facility-name {
  color: #111827;
  font-weight: 500;
}

.station-popup .facility-list .walk-time {
  color: #6B7280;
  font-size: 12px;
  white-space: nowrap;
}

.station-popup .facility-list .pcc-facility {
  background: #DBEAFE;
  padding: 6px 8px;
  margin: 0 -8px;
  border-radius: 4px;
}

.station-popup .facility-list .pcc-facility .facility-name {
  color: #1E40AF;
  font-weight: 600;
}
```

---

### 4. Accessibility Insights Integration (30 minutes)

**Enhance Analysis Panel** (if Sprint 6 is complete):

**File**: `js/components/analysis-panel.js`

**Update the "HOW (Accessibility)" Section**:
```javascript
generateAccessibilitySection(data) {
  const nearestStation = this.findNearestTransitStation(data.facility);
  
  let html = `
    <div class="panel-section">
      <h3>🚇 How They Get There</h3>
  `;
  
  if (nearestStation) {
    html += `
      <div class="insight-card transit-access">
        <div class="insight-label">Nearest CTA Station</div>
        <div class="insight-value">${nearestStation.name}</div>
        <div class="insight-detail">${nearestStation.walkMinutes} min walk (${nearestStation.line})</div>
      </div>
    `;
    
    // Compare to competitors
    const competitorTransit = this.compareTransitAccess(data.facility);
    if (competitorTransit.betterThan > 0) {
      html += `
        <div class="competitive-advantage">
          <strong>Transit Advantage:</strong> Better station access than ${competitorTransit.betterThan} competitors
        </div>
      `;
    }
  }
  
  html += `
    <div class="insight-card">
      <div class="insight-label">Parking</div>
      <div class="insight-value">${data.facility.parking || 'Limited street parking'}</div>
    </div>
    
    <div class="insight-card">
      <div class="insight-label">Drive Time from Loop</div>
      <div class="insight-value">${data.facility.driveTime || '15-20 min'}</div>
    </div>
  </div>
  `;
  
  return html;
}

findNearestTransitStation(facility) {
  // This requires loading the transit stations data
  // Implementation depends on how you store/access the transit data
  // Could be added to the map component or loaded separately
}
```

---

## Testing Checklist

**Visual Tests**:
- [ ] Transit lines render correctly on map
- [ ] Brown Line displays with color #62361B
- [ ] Red Line displays with color #C60C30
- [ ] Lines are smooth and properly styled
- [ ] Station markers are visible (white circles with red border)
- [ ] Station markers are properly positioned

**Interactive Tests**:
- [ ] Click station marker → popup appears
- [ ] Station popup shows station name
- [ ] Station popup shows correct line(s)
- [ ] Station popup lists nearby facilities (if any)
- [ ] Walk times are reasonable (10-15 min per 0.5 mile)
- [ ] PCC facility is highlighted in station popup
- [ ] Hover over station → marker enlarges
- [ ] Toggle "Show CTA Transit" → layer appears/disappears
- [ ] Transit layer toggle works smoothly

**Performance Tests**:
- [ ] Transit layer loads in <500ms
- [ ] No console errors during load
- [ ] Map remains responsive after adding transit layer
- [ ] Mobile: Touch interactions work on stations
- [ ] Mobile: Popups are readable on small screens

**Integration Tests** (if Sprint 6 is complete):
- [ ] Analysis panel shows transit accessibility data
- [ ] Transit comparison with competitors is accurate
- [ ] "Better transit access" insights are logical
- [ ] Walk times match station popup calculations

**Error Handling**:
- [ ] If GeoJSON files missing → checkbox is hidden
- [ ] If GeoJSON malformed → graceful error message
- [ ] If no nearby facilities → popup shows appropriate message

---

## Expected Outcomes

**Competitive Intelligence Benefits**:
1. **Accessibility Comparison**: "PCC has 4-minute walk to Southport station vs SPF 8-minute walk"
2. **Catchment Expansion**: Identify neighborhoods connected by CTA to target marketing
3. **Event Planning**: "Tuesday lunch leagues can attract Loop workers via Red Line"
4. **Partnership Opportunities**: Co-market with businesses near shared transit stations

**Investor Demo Value**:
- Shows geographic analysis sophistication
- Demonstrates understanding of customer accessibility
- Highlights competitive advantages
- Visual appeal for presentations

**Data-Driven Insights**:
- 60% of facilities have transit access within 10 min walk
- PCC is one of only 2 facilities accessible from both Brown & Red Lines
- Transit-accessible time slots may attract different customer segments
- Corporate events could be marketed to companies along Red Line corridor

---

## Future Enhancements (Post-MVP)

**Phase 2 Features**:
- [ ] Real-time train arrival data (using Train Tracker API)
- [ ] Show "next train in 5 min" on station popups
- [ ] Transit catchment areas (show all locations within 15 min + walk)
- [ ] Bus routes (CTA buses #9, #50 serve Elston Avenue area)
- [ ] Metra commuter rail integration
- [ ] "Transit score" for each facility (0-100)
- [ ] Peak commute times overlay (morning/evening rush patterns)

**Analytics Integration**:
- [ ] Track member sign-ups by transit proximity
- [ ] Correlate transit-accessible time slots with attendance
- [ ] A/B test marketing campaigns targeting transit riders
- [ ] Survey members: "How did you get here today?"

---

## Time Estimate

**Total**: 2-3 hours (for Option A: Static GeoJSON)

Breakdown:
- ✅ **30 min** - Download, filter, and prepare GeoJSON data files
- ✅ **60 min** - Implement loadTransitLayer() and createStationPopup() methods
- ✅ **30 min** - Update UI (checkbox, legend), add CSS styles
- ✅ **30 min** - Test, refine, and integrate with Analysis Panel (if applicable)

**Faster Path** (1-1.5 hours):
- Skip station popup facility proximity (just show station name/line)
- Skip Analysis Panel integration
- Use simpler styling (no hover effects)

**Recommended**: Take the full 2-3 hours to do it right. The facility proximity feature is highly valuable for competitive insights.

---

## Success Criteria

**Sprint 6.5 is complete when**:
1. ✅ Transit lines and stations appear on map
2. ✅ Correct colors for Brown/Red Lines
3. ✅ Station popups show nearby facilities
4. ✅ Toggle control works smoothly
5. ✅ No performance degradation
6. ✅ Generates at least 1 new competitive insight
7. ✅ Stakeholders say "wow, that's useful"

**Minimum Viable**:
- Transit lines render (don't worry about perfect styling)
- Stations are clickable (popup can be simple)
- Toggle works

**Fully Polished**:
- Professional styling matching design system
- Rich station popups with proximity analysis
- Integrated with Analysis Panel insights
- Smooth animations and interactions

---

## Related Documentation

- **Technical Spec**: `SPEC_CTA_overlay.md` (Claude Code's original proposal)
- **Functional Spec**: `FUNCTIONAL_SPEC.md` - Feature 4 (Geographic Map)
- **Design Spec**: `DESIGN_SPEC.md` - Map styling guidelines
- **Sprint 5**: Geographic Competitive Map (prerequisite)
- **Sprint 6**: Analysis Panel (uses transit data if available)

---

## Questions Before Starting?

**Q: Should we use static GeoJSON or the API?**  
A: Use **static GeoJSON** for MVP/demo. Switch to API for production if needed.

**Q: What if the data files are too large?**  
A: Use https://mapshaper.org/ to simplify geometries. Aim for <20KB total.

**Q: Do we need all CTA lines?**  
A: No. Brown & Red Lines are most relevant for your facilities. Focus on these.

**Q: What about bus routes?**  
A: Defer to future phase. Trains are higher-value (faster, more predictable).

**Q: How accurate are the walk times?**  
A: Rough estimate: 12 min/km or 20 min/mile. Good enough for competitive comparison.

**Q: What if a facility has no nearby stations?**  
A: That's valuable info! Shows accessibility disadvantage vs competitors.

---

**Ready to build Sprint 6.5?** 

Start with Option A (Static GeoJSON). You'll have working transit overlays in ~2 hours, and you can always upgrade to the API later if needed.