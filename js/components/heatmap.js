// PCC Yield Optimizer - Heatmap Component
// Displays 7-day × 24-hour utilization grid with color coding and tooltips

class HeatmapComponent {
  /**
   * Create a new heatmap component
   * @param {string} containerId - ID of container element
   * @param {Object} facilityData - Facility metadata
   * @param {Object} popularTimesData - Popular times data (7 days × 24 hours)
   */
  constructor(containerId, facilityData, popularTimesData) {
    this.containerId = containerId;
    this.facility = facilityData;
    this.popularTimes = popularTimesData;
    this.container = null;
    this.opportunities = {}; // Store opportunity scores by day-hour key
    this.allFacilitiesData = null; // Will be set externally for competitive analysis
  }

  /**
   * Initialize and render the heatmap
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with ID '${this.containerId}' not found`);
      return;
    }

    this.render();
    this.attachTooltips();
  }

  /**
   * Render the complete heatmap structure
   */
  render() {
    // Create heatmap container
    const heatmapDiv = document.createElement('div');
    heatmapDiv.className = 'heatmap-container fade-in';
    heatmapDiv.id = `heatmap-${this.facility.id}`;

    // Build header
    heatmapDiv.innerHTML = `
      ${this.renderHeader()}
      ${this.renderGrid()}
      ${this.renderLegend()}
    `;

    this.container.appendChild(heatmapDiv);
  }

  /**
   * Render heatmap header with facility info
   */
  renderHeader() {
    const typeBadge = this.facility.type === 'private' ? 'badge-private' : 'badge-public';

    return `
      <div class="heatmap-header">
        <div>
          <h3 class="facility-name">${this.facility.name}</h3>
          <div class="facility-meta">
            <span class="badge ${typeBadge}">${formatFacilityType(this.facility.type)}</span>
            <span class="facility-rating">${formatRating(this.facility.rating)}</span>
            <span class="text-caption">${formatReviewCount(this.facility.reviewCount)}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render the 7×24 grid with days and hours
   */
  renderGrid() {
    let gridHTML = '<div class="heatmap-grid">';

    // Empty corner cell
    gridHTML += '<div></div>';

    // Hour labels (0-23)
    for (let hour = 0; hour < 24; hour++) {
      gridHTML += `<div class="heatmap-col-label">${formatHour(hour)}</div>`;
    }

    // For each day
    CONFIG.days.forEach((dayName, dayIndex) => {
      const dayData = this.popularTimes.weeklyData[dayIndex];

      // Day label
      gridHTML += `<div class="heatmap-row-label">${dayName}</div>`;

      // Hour cells for this day
      for (let hour = 0; hour < 24; hour++) {
        const hourData = dayData.hourly.find(h => h.hour === hour);
        const popularity = hourData ? hourData.popularity : 0;
        const color = this.getCellColor(popularity);

        gridHTML += `
          <div
            class="heatmap-cell"
            style="background-color: ${color};"
            data-day="${dayData.day}"
            data-hour="${hour}"
            data-popularity="${popularity}"
            data-facility="${this.facility.id}"
          ></div>
        `;
      }
    });

    gridHTML += '</div>';
    return gridHTML;
  }

  /**
   * Render color legend
   */
  renderLegend() {
    return `
      <div class="color-legend">
        <span class="legend-label">Utilization:</span>
        <div style="flex: 1;">
          <div class="legend-gradient"></div>
          <div class="legend-stops">
            <span class="legend-stop">0%</span>
            <span class="legend-stop">25%</span>
            <span class="legend-stop">50%</span>
            <span class="legend-stop">75%</span>
            <span class="legend-stop">100%</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Map popularity (0-100) to color using gradient
   * @param {number} popularity - Popularity value (0-100)
   * @returns {string} Hex color code
   */
  getCellColor(popularity) {
    const colors = CONFIG.colors.heatmap;

    // Define breakpoints
    const breakpoints = [
      { value: 0, color: colors[0] },
      { value: 25, color: colors[25] },
      { value: 50, color: colors[50] },
      { value: 75, color: colors[75] },
      { value: 100, color: colors[100] }
    ];

    // Find the two breakpoints to interpolate between
    for (let i = 0; i < breakpoints.length - 1; i++) {
      const lower = breakpoints[i];
      const upper = breakpoints[i + 1];

      if (popularity >= lower.value && popularity <= upper.value) {
        // Calculate interpolation factor
        const range = upper.value - lower.value;
        const position = popularity - lower.value;
        const factor = position / range;

        // Interpolate between colors
        return this.interpolateColor(lower.color, upper.color, factor);
      }
    }

    // Fallback (shouldn't reach here)
    return colors[0];
  }

  /**
   * Interpolate between two hex colors
   * @param {string} color1 - Start color (hex)
   * @param {string} color2 - End color (hex)
   * @param {number} factor - Interpolation factor (0-1)
   * @returns {string} Interpolated hex color
   */
  interpolateColor(color1, color2, factor) {
    // Convert hex to RGB
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);

    // Interpolate each channel
    const r = Math.round(c1.r + (c2.r - c1.r) * factor);
    const g = Math.round(c1.g + (c2.g - c1.g) * factor);
    const b = Math.round(c1.b + (c2.b - c1.b) * factor);

    // Convert back to hex
    return this.rgbToHex(r, g, b);
  }

  /**
   * Convert hex color to RGB
   * @param {string} hex - Hex color code
   * @returns {Object} RGB values
   */
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  /**
   * Convert RGB to hex color
   * @param {number} r - Red (0-255)
   * @param {number} g - Green (0-255)
   * @param {number} b - Blue (0-255)
   * @returns {string} Hex color code
   */
  rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  /**
   * Attach Tippy.js tooltips to all cells
   */
  attachTooltips() {
    const cells = this.container.querySelectorAll('.heatmap-cell');

    cells.forEach(cell => {
      const day = cell.dataset.day;
      const hour = parseInt(cell.dataset.hour);
      const popularity = parseInt(cell.dataset.popularity);
      const facilityId = cell.dataset.facility;

      // Add click handler to open analysis panel (Sprint 6)
      cell.addEventListener('click', (e) => {
        console.log(`Cell clicked: ${day}, ${hour}, ${facilityId}`);

        // Hide all tooltips immediately
        document.querySelectorAll('[data-tippy-root]').forEach(el => el.remove());

        if (window.analysisPanel) {
          const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
          window.analysisPanel.open(dayIndex, hour, facilityId);
        }
      });

      // Add cursor pointer style
      cell.style.cursor = 'pointer';

      tippy(cell, {
        content: `
          <div class="tooltip-content">
            <div class="tooltip-header">${formatDay(day)} ${formatHour(hour)}</div>
            <div class="tooltip-body">
              <div class="tooltip-row">
                <span class="tooltip-label">${this.facility.name}:</span>
                <span class="tooltip-value">${formatPopularity(popularity)}</span>
              </div>
            </div>
          </div>
        `,
        allowHTML: true,
        theme: 'pcc',
        placement: 'right',
        arrow: true,
        interactive: false,
        delay: [100, 0],
        hideOnClick: true,
        trigger: 'mouseenter focus'
      });
    });
  }

  /**
   * Show the heatmap
   */
  show() {
    const heatmap = document.getElementById(`heatmap-${this.facility.id}`);
    if (heatmap) {
      heatmap.classList.remove('hidden');
    }
  }

  /**
   * Hide the heatmap
   */
  hide() {
    const heatmap = document.getElementById(`heatmap-${this.facility.id}`);
    if (heatmap) {
      heatmap.classList.add('hidden');
    }
  }

  /**
   * Calculate opportunity scores for all time slots (only for PCC)
   * Compares PCC utilization against all competitor facilities
   * @param {Array} allFacilitiesData - Array of {facility, popularTimes} for all facilities
   */
  calculateOpportunities(allFacilitiesData) {
    // Only calculate opportunities for PCC
    if (this.facility.id !== 'pcc') {
      return;
    }

    this.allFacilitiesData = allFacilitiesData;
    this.opportunities = {};

    // For each day
    CONFIG.days.forEach((dayName, dayIndex) => {
      const pccDayData = this.popularTimes.weeklyData[dayIndex];

      // For each hour
      for (let hour = 0; hour < 24; hour++) {
        const pccHourData = pccDayData.hourly.find(h => h.hour === hour);
        const pccPopularity = pccHourData ? pccHourData.popularity : 0;

        // Get competitor data for this time slot
        const competitors = allFacilitiesData
          .filter(({ facility }) => facility.id !== 'pcc')
          .map(({ facility, popularTimes }) => {
            const competitorDayData = popularTimes.weeklyData[dayIndex];
            const competitorHourData = competitorDayData.hourly.find(h => h.hour === hour);
            return {
              id: facility.id,
              name: facility.name,
              popularity: competitorHourData ? competitorHourData.popularity : 0
            };
          });

        // Calculate opportunity score
        const opportunity = calculateOpportunityScore(
          pccPopularity,
          competitors,
          pccDayData.day,
          hour
        );

        // Store by day-hour key
        const key = `${pccDayData.day}-${hour}`;
        this.opportunities[key] = opportunity;
      }
    });

    console.log(`Calculated ${Object.keys(this.opportunities).length} opportunity scores for PCC`);
  }

  /**
   * Apply opportunity overlays to cells (colored borders and badges)
   * Should be called after calculateOpportunities()
   */
  applyOpportunityOverlays() {
    if (this.facility.id !== 'pcc' || !Object.keys(this.opportunities).length) {
      return;
    }

    const cells = this.container.querySelectorAll('.heatmap-cell');

    cells.forEach(cell => {
      const day = cell.dataset.day;
      const hour = parseInt(cell.dataset.hour);
      const key = `${day}-${hour}`;
      const opportunity = this.opportunities[key];

      if (!opportunity) return;

      // Remove any existing overlay classes
      cell.classList.remove('opportunity-high', 'opportunity-medium', 'opportunity-low', 'competitive-win');

      // Check if this is a competitive win (PCC is busy and beating competitors)
      const pccPopularity = parseInt(cell.dataset.popularity);
      const competitors = this.allFacilitiesData
        .filter(({ facility }) => facility.id !== 'pcc')
        .map(({ facility, popularTimes }) => {
          const dayIndex = CONFIG.days.indexOf(day.charAt(0).toUpperCase() + day.slice(1));
          const competitorDayData = popularTimes.weeklyData[dayIndex];
          const competitorHourData = competitorDayData.hourly.find(h => h.hour === hour);
          return {
            id: facility.id,
            name: facility.name,
            popularity: competitorHourData ? competitorHourData.popularity : 0
          };
        });

      if (isCompetitiveWin(pccPopularity, competitors)) {
        cell.classList.add('competitive-win');
      } else if (opportunity.level === 'high') {
        cell.classList.add('opportunity-high');
        // Add corner badge showing number of busy competitors
        this.addCornerBadge(cell, opportunity.busyCompetitors.length, '#10B981');
      } else if (opportunity.level === 'medium') {
        cell.classList.add('opportunity-medium');
        this.addCornerBadge(cell, opportunity.busyCompetitors.length, '#F59E0B');
      } else if (opportunity.level === 'low') {
        cell.classList.add('opportunity-low');
      }
    });

    console.log('Applied opportunity overlays to PCC heatmap');
  }

  /**
   * Add a corner badge to a cell showing busy competitor count
   * @param {HTMLElement} cell - The heatmap cell
   * @param {number} count - Number to display
   * @param {string} color - Badge background color
   */
  addCornerBadge(cell, count, color) {
    // Remove existing badge if any
    const existingBadge = cell.querySelector('.corner-badge');
    if (existingBadge) {
      existingBadge.remove();
    }

    // Create badge element
    const badge = document.createElement('div');
    badge.className = 'corner-badge';
    badge.style.backgroundColor = color;
    badge.textContent = count;

    cell.style.position = 'relative';
    cell.appendChild(badge);
  }

  /**
   * Create enhanced tooltip with competitive insights
   * @param {HTMLElement} cell - The heatmap cell
   * @param {string} day - Day name
   * @param {number} hour - Hour (0-23)
   * @param {number} popularity - PCC popularity
   * @returns {string} HTML content for tooltip
   */
  createEnhancedTooltip(cell, day, hour, popularity) {
    const key = `${day}-${hour}`;
    const opportunity = this.opportunities[key];

    // Base tooltip content
    let content = `
      <div class="tooltip-content">
        <div class="tooltip-header">${formatDay(day)} ${formatHour(hour)}</div>
        <div class="tooltip-body">
          <div class="tooltip-row">
            <span class="tooltip-label">${this.facility.name}:</span>
            <span class="tooltip-value">${formatPopularity(popularity)}</span>
          </div>
    `;

    // Add opportunity insights if available
    if (opportunity && opportunity.type === 'opportunity') {
      const levelColor = getOpportunityColor(opportunity.level);
      const insight = getOpportunityInsight(opportunity);

      content += `
          <div class="tooltip-divider"></div>
          <div class="tooltip-row">
            <span class="tooltip-label">Opportunity:</span>
            <span class="tooltip-value" style="color: ${levelColor}; font-weight: 600;">
              ${opportunity.level.toUpperCase()} (${opportunity.score}/10)
            </span>
          </div>
          <div class="tooltip-row">
            <span class="tooltip-label">Gap:</span>
            <span class="tooltip-value">${opportunity.gap}%</span>
          </div>
          <div class="tooltip-row">
            <span class="tooltip-label">Est. Customers:</span>
            <span class="tooltip-value">~${opportunity.estimatedCustomers}</span>
          </div>
      `;

      // Show busy competitors
      if (opportunity.busyCompetitors && opportunity.busyCompetitors.length > 0) {
        content += `
          <div class="tooltip-row">
            <span class="tooltip-label">Busy Competitors:</span>
          </div>
        `;
        opportunity.busyCompetitors.forEach(comp => {
          content += `
            <div class="tooltip-row" style="padding-left: 8px;">
              <span class="tooltip-label">${comp.name}:</span>
              <span class="tooltip-value">${formatPopularity(comp.popularity)}</span>
            </div>
          `;
        });
      }

      // Add insight message
      content += `
          <div class="tooltip-insight">${insight}</div>
      `;
    } else if (opportunity && opportunity.type === 'pcc-busy') {
      content += `
          <div class="tooltip-divider"></div>
          <div class="tooltip-insight" style="color: #10B981;">
            ✓ ${opportunity.message}
          </div>
      `;
    } else if (opportunity && opportunity.type === 'market-slow') {
      content += `
          <div class="tooltip-divider"></div>
          <div class="tooltip-insight" style="color: #6B7280;">
            ${opportunity.message}
          </div>
      `;
    }

    content += `
        </div>
      </div>
    `;

    return content;
  }

  /**
   * Update tooltips with enhanced competitive insights
   * Should be called after applyOpportunityOverlays()
   */
  updateTooltipsWithOpportunities() {
    if (this.facility.id !== 'pcc' || !Object.keys(this.opportunities).length) {
      return;
    }

    const cells = this.container.querySelectorAll('.heatmap-cell');

    cells.forEach(cell => {
      const day = cell.dataset.day;
      const hour = parseInt(cell.dataset.hour);
      const popularity = parseInt(cell.dataset.popularity);

      // Destroy existing tooltip
      if (cell._tippy) {
        cell._tippy.destroy();
      }

      // Create enhanced tooltip
      tippy(cell, {
        content: this.createEnhancedTooltip(cell, day, hour, popularity),
        allowHTML: true,
        theme: 'pcc',
        placement: 'right',
        arrow: true,
        interactive: false,
        delay: [100, 0]
      });
    });

    console.log('Updated tooltips with opportunity insights');
  }
}
