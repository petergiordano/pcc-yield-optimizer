// PCC Yield Optimizer - Geographic Map Component
// Interactive Leaflet map showing facilities, catchment areas, member density, and CTA transit

class MapComponent {
  /**
   * Create a new geographic map
   * @param {string} containerId - ID of map container element
   * @param {Array} facilitiesData - Array of {facility, popularTimes} for all facilities
   */
  constructor(containerId, facilitiesData) {
    this.container = document.getElementById(containerId);
    this.facilitiesData = facilitiesData;
    this.map = null;
    this.layers = {
      markers: {},
      catchment: {},
      density: null,
      transit: null
    };
    this.controls = {
      catchment: true,
      density: true,
      transit: false
    };

    if (!this.container) {
      console.error(`Container with ID '${containerId}' not found`);
      return;
    }

    this.init();
  }

  /**
   * Initialize the map
   */
  init() {
    this.createMap();
    this.addFacilityMarkers();
    this.addCatchmentAreas();
    this.loadMemberDensity();
    this.attachEventListeners();
    console.log('Map initialized successfully');
  }

  /**
   * Create Leaflet map instance
   */
  createMap() {
    // Chicago center coordinates
    const chicagoCenter = [41.8781, -87.6298];

    this.map = L.map(this.container, {
      center: chicagoCenter,
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
      zoomControl: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);

    console.log('Leaflet map created');
  }

  /**
   * Add facility markers to the map
   */
  addFacilityMarkers() {
    this.facilitiesData.forEach(({ facility, popularTimes }) => {
      const lat = facility.coordinates.lat;
      const lng = facility.coordinates.lng;

      // Determine marker color based on type
      const color = this.getMarkerColor(facility);

      // Create circle marker
      const marker = L.circleMarker([lat, lng], {
        radius: 8 + (facility.courts / 2), // Size based on court count
        fillColor: color,
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      });

      // Create popup content
      const popupContent = this.createPopupContent(facility, popularTimes);
      marker.bindPopup(popupContent);

      // Add to map
      marker.addTo(this.map);

      // Store reference
      this.layers.markers[facility.id] = marker;
    });

    console.log(`Added ${this.facilitiesData.length} facility markers`);
  }

  /**
   * Get marker color based on facility type
   */
  getMarkerColor(facility) {
    if (facility.id === 'pcc') {
      return '#005DAA'; // PCC blue
    } else if (facility.type === 'public') {
      return '#10B981'; // Green for public courts
    } else {
      return '#EF4444'; // Red for competitors
    }
  }

  /**
   * Create popup content for facility marker
   */
  createPopupContent(facility, popularTimes) {
    const address = `${facility.address.street}, ${facility.address.city}, ${facility.address.state} ${facility.address.zip}`;

    // Calculate average utilization
    let avgUtilization = 0;
    if (popularTimes && popularTimes.weeklyData) {
      const allHours = popularTimes.weeklyData.flatMap(day => day.hourly);
      const sum = allHours.reduce((acc, hour) => acc + hour.popularity, 0);
      avgUtilization = Math.round(sum / allHours.length);
    }

    return `
      <div class="facility-popup">
        <h3>${facility.name}</h3>
        <div class="popup-row">
          <strong>Address:</strong> ${address}
        </div>
        <div class="popup-row">
          <strong>Courts:</strong> ${facility.courts}
        </div>
        <div class="popup-row">
          <strong>Rating:</strong> ${facility.rating} ⭐ (${facility.reviewCount} reviews)
        </div>
        <div class="popup-row">
          <strong>Avg Utilization:</strong> ${avgUtilization}%
        </div>
        ${facility.transit.nearestStation ? `
          <div class="popup-row">
            <strong>Transit:</strong> ${facility.transit.nearestStation} (${facility.transit.walkTime} min walk)
          </div>
        ` : ''}
        ${facility.parking.available ? `
          <div class="popup-row">
            <strong>Parking:</strong> ${facility.parking.type.replace('_', ' ')}
            ${facility.parking.spaces ? `(${facility.parking.spaces} spaces)` : ''}
            ${facility.parking.cost ? ` - ${facility.parking.cost}` : ' - Free'}
          </div>
        ` : ''}
      </div>
    `;
  }

  /**
   * Add catchment area circles (15-minute drive time ≈ 3 miles)
   */
  addCatchmentAreas() {
    const catchmentRadius = 4828; // 3 miles in meters

    this.facilitiesData.forEach(({ facility }) => {
      const lat = facility.coordinates.lat;
      const lng = facility.coordinates.lng;
      const color = this.getMarkerColor(facility);

      // Create circle
      const circle = L.circle([lat, lng], {
        radius: catchmentRadius,
        color: color,
        fillColor: color,
        fillOpacity: 0.1,
        weight: 2,
        opacity: 0.5,
        dashArray: '5, 5'
      });

      // Add to map if catchment is enabled
      if (this.controls.catchment) {
        circle.addTo(this.map);
      }

      // Store reference
      this.layers.catchment[facility.id] = circle;
    });

    // Calculate and display overlap
    this.calculateCatchmentOverlap();

    console.log('Catchment areas added');
  }

  /**
   * Calculate catchment overlap between PCC and competitors
   */
  calculateCatchmentOverlap() {
    const pccFacility = this.facilitiesData.find(({ facility }) => facility.id === 'pcc');
    const spfFacility = this.facilitiesData.find(({ facility }) => facility.id === 'spf');

    if (!pccFacility || !spfFacility) return;

    const pccCoords = pccFacility.facility.coordinates;
    const spfCoords = spfFacility.facility.coordinates;

    // Calculate distance using Haversine formula
    const distance = this.haversineDistance(
      pccCoords.lat, pccCoords.lng,
      spfCoords.lat, spfCoords.lng
    );

    const radius = 4.828; // 3 miles in km

    // Calculate overlap percentage (simplified circle intersection)
    let overlapPercent = 0;
    if (distance < radius * 2) {
      // Circles overlap
      const d = distance;
      const r1 = radius;
      const r2 = radius;

      // Circle intersection area formula
      const part1 = r1 * r1 * Math.acos((d * d + r1 * r1 - r2 * r2) / (2 * d * r1));
      const part2 = r2 * r2 * Math.acos((d * d + r2 * r2 - r1 * r1) / (2 * d * r2));
      const part3 = 0.5 * Math.sqrt((-d + r1 + r2) * (d + r1 - r2) * (d - r1 + r2) * (d + r1 + r2));

      const intersectionArea = part1 + part2 - part3;
      const spfArea = Math.PI * r2 * r2;

      overlapPercent = Math.round((intersectionArea / spfArea) * 100);
    }

    console.log(`SPF catchment overlap with PCC: ${overlapPercent}%`);

    // Display in UI (could add to map controls or popup)
    this.overlapData = {
      distance: distance.toFixed(2),
      overlapPercent: overlapPercent
    };
  }

  /**
   * Calculate distance between two coordinates using Haversine formula
   */
  haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  toRad(degrees) {
    return degrees * Math.PI / 180;
  }

  /**
   * Load and display member density heatmap
   */
  async loadMemberDensity() {
    try {
      const response = await fetch('./data/members-mock.json');
      const members = await response.json();

      if (!members || members.length === 0) {
        console.warn('No member data found');
        return;
      }

      // Convert to Leaflet.heat format: [[lat, lng, intensity], ...]
      const heatData = members.map(member => [member.lat, member.lng, 0.5]);

      // Create heat layer
      this.layers.density = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 13,
        max: 1.0,
        gradient: {
          0.0: 'blue',
          0.5: 'lime',
          1.0: 'red'
        }
      });

      // Add to map if density is enabled
      if (this.controls.density) {
        this.layers.density.addTo(this.map);
      }

      console.log(`Member density heatmap loaded with ${members.length} points`);
    } catch (error) {
      console.warn('Could not load member density data:', error.message);
    }
  }

  /**
   * Toggle layer visibility
   */
  toggleLayer(layerName, isVisible) {
    this.controls[layerName] = isVisible;

    if (layerName === 'catchment') {
      Object.values(this.layers.catchment).forEach(circle => {
        if (isVisible) {
          circle.addTo(this.map);
        } else {
          this.map.removeLayer(circle);
        }
      });
    } else if (layerName === 'density') {
      if (this.layers.density) {
        if (isVisible) {
          this.layers.density.addTo(this.map);
        } else {
          this.map.removeLayer(this.layers.density);
        }
      }
    } else if (layerName === 'transit') {
      // TODO: Implement transit layer toggle
      console.log('Transit layer not yet implemented');
    }
  }

  /**
   * Reset map view to Chicago center
   */
  resetView() {
    this.map.setView([41.8781, -87.6298], 11);
  }

  /**
   * Attach event listeners to controls
   */
  attachEventListeners() {
    // Catchment toggle
    const catchmentToggle = document.getElementById('toggle-catchment');
    if (catchmentToggle) {
      catchmentToggle.addEventListener('change', (e) => {
        this.toggleLayer('catchment', e.target.checked);
      });
    }

    // Density toggle
    const densityToggle = document.getElementById('toggle-density');
    if (densityToggle) {
      densityToggle.addEventListener('change', (e) => {
        this.toggleLayer('density', e.target.checked);
      });
    }

    // Transit toggle
    const transitToggle = document.getElementById('toggle-transit');
    if (transitToggle) {
      transitToggle.addEventListener('change', (e) => {
        this.toggleLayer('transit', e.target.checked);
      });
    }

    // Reset view button
    const resetButton = document.getElementById('reset-map-view');
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        this.resetView();
      });
    }
  }

  /**
   * Destroy the map instance
   */
  destroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}
