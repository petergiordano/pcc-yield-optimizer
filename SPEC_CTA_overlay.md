  What's Required to Implement CTA Transit Overlay

  1. Data Acquisition & Preparation

  CTA GeoJSON Data Source:
  - Chicago Data Portal:
  https://data.cityofchicago.org/
  - Download: "CTA - 'L' (Rail) Lines" GeoJSON
  - Download: "CTA - 'L' (Rail) Stations" GeoJSON
  - Filter to Brown Line & Red Line only (as per
  spec)

  Data Files to Create:
  - data/geo/transit-lines.geojson - Rail line
  geometries
  - data/geo/transit-stations.geojson - Station
  points with metadata

  Data Structure Needed:
  // transit-lines.geojson
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Brown Line",
          "color": "#62361B"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [[-87.xxxx, 41.xxxx], ...]
        }
      }
    ]
  }

  // transit-stations.geojson
  {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Southport",
          "line": "Brown Line",
          "ada": true
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-87.xxxx, 41.xxxx]
        }
      }
    ]
  }

  2. Code Implementation (js/components/map.js)

  Add Method: loadTransitLayer()
  async loadTransitLayer() {
    try {
      // Load transit lines
      const linesResponse = await
  fetch('./data/geo/transit-lines.geojson');
      const linesData = await linesResponse.json();

      // Load stations
      const stationsResponse = await
  fetch('./data/geo/transit-stations.geojson');
      const stationsData = await
  stationsResponse.json();

      // Create transit layer group
      this.layers.transit = L.layerGroup();

      // Add lines
      L.geoJSON(linesData, {
        style: (feature) => ({
          color: feature.properties.color ||
  '#CC0000',
          weight: 3,
          opacity: 0.8
        })
      }).addTo(this.layers.transit);

      // Add station markers
      L.geoJSON(stationsData, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 6,
            fillColor: '#FFFFFF',
            color: '#CC0000',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
          });
        },
        onEachFeature: (feature, layer) => {

  layer.bindPopup(this.createStationPopup(feature));
        }
      }).addTo(this.layers.transit);

      // Add to map if enabled
      if (this.controls.transit) {
        this.layers.transit.addTo(this.map);
      }

      console.log('Transit layer loaded');
    } catch (error) {
      console.warn('Could not load transit data:',
  error.message);
    }
  }

  Add Method: createStationPopup()
  createStationPopup(feature) {
    const station = feature.properties;

    // Calculate nearby facilities (within 0.5 mile 
  walk)
    const nearbyFacilities =
  this.facilitiesData.filter(({ facility }) => {
      const distance = this.haversineDistance(
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
        facility.coordinates.lat,
        facility.coordinates.lng
      );
      return distance < 0.8; // ~0.5 miles in km
    });

    return `
      <div class="station-popup">
        <h3>${station.name}</h3>
        <div class="popup-row">
          <strong>Line:</strong> ${station.line}
        </div>
        ${nearbyFacilities.length > 0 ? `
          <div class="popup-row">
            <strong>Nearby Facilities:</strong>
            <ul>
              ${nearbyFacilities.map(({ facility }) 
  => 
                `<li>${facility.name} 
  (${facility.transit.walkTime} min walk)</li>`
              ).join('')}
            </ul>
          </div>
        ` : '<div class="popup-row"><em>No 
  facilities within walking distance</em></div>'}
      </div>
    `;
  }

  Update init() method:
  init() {
    this.createMap();
    this.addFacilityMarkers();
    this.addCatchmentAreas();
    this.loadMemberDensity();
    this.loadTransitLayer(); // ADD THIS LINE
    this.attachEventListeners();
    console.log('Map initialized successfully');
  }

  Update toggleLayer() method (replace the TODO):
  } else if (layerName === 'transit') {
    if (this.layers.transit) {
      if (isVisible) {
        this.layers.transit.addTo(this.map);
      } else {
        this.map.removeLayer(this.layers.transit);
      }
    }
  }

  3. UI Updates (index.html)

  Re-enable the transit checkbox:
  <label class="checkbox-label">
    <input type="checkbox" id="toggle-transit">
    <span>Show CTA Transit</span>
  </label>

  Update legend to include transit:
  <div class="legend-item">
    <div style="width: 24px; height: 3px; 
  background: #CC0000;"></div>
    <span>CTA Brown/Red Line</span>
  </div>
  <div class="legend-item">
    <div class="legend-marker" style="background: 
  #FFFFFF; border: 2px solid #CC0000; width: 12px; 
  height: 12px;"></div>
    <span>CTA Stations</span>
  </div>

  4. CSS Styling (css/dashboards.css)

  /* Station popup styles */
  .station-popup h3 {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 12px 0;
  }

  .station-popup .popup-row ul {
    margin: 8px 0 0 0;
    padding-left: 20px;
    font-size: 12px;
  }

  .station-popup .popup-row li {
    margin: 4px 0;
    color: #6B7280;
  }

  5. Effort Estimate

  Time Required: 2-3 hours

  - ✅ 30 min - Download and process CTA GeoJSON
  data
  - ✅ 45 min - Implement loadTransitLayer() and
  createStationPopup()
  - ✅ 30 min - Update UI, legend, and CSS
  - ✅ 30 min - Test and refine (line colors,
  station popup content, performance)

  6. Data Simplification Tips

  The raw CTA GeoJSON can be very large (100+ KB).
  To optimize:

  1. Filter to Brown/Red Lines only - Removes 6
  other lines
  2. Reduce coordinate precision - Round to 4
  decimal places (~11m precision)
  3. Remove unnecessary properties - Keep only:
  name, line, color, ADA
  4. Use online tools: https://mapshaper.org/ to
  simplify line geometries by 50%

  Expected file sizes after optimization:
  - transit-lines.geojson: ~15-20 KB
  - transit-stations.geojson: ~3-5 KB (only ~30
  stations for Brown/Red)

  ---
  TL;DR - Implementation Checklist

  - Download CTA GeoJSON from Chicago Data Portal
  - Filter to Brown/Red lines only, simplify
  geometries
  - Create data/geo/transit-lines.geojson (~15 KB)
  - Create data/geo/transit-stations.geojson (~5 KB)
  - Add loadTransitLayer() method to map.js (~50
  lines)
  - Add createStationPopup() method (~30 lines)
  - Update init() to call loadTransitLayer()
  - Fix toggleLayer() transit section (remove TODO)
  - Re-enable transit checkbox in index.html
  - Add station popup CSS styles
  - Update map legend with transit line/station
  indicators
  - Test performance and visual appearance

  The main blocker is obtaining and formatting the 
  GeoJSON data. Once you have the two data files,
  the code implementation is straightforward (~80
  lines total).