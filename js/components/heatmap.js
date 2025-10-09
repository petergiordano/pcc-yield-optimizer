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
  }

  /**
   * Initialize and render the heatmap
   * Returns a Promise that resolves when rendering is complete
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with ID '${this.containerId}' not found`);
      return Promise.reject(new Error(`Container '${this.containerId}' not found`));
    }

    // Show skeleton loader first
    this.showSkeleton();

    // Return a Promise that resolves after rendering completes
    return new Promise((resolve) => {
      // Simulate async data loading with small delay to show skeleton
      setTimeout(() => {
        this.render();
        this.hideSkeleton();
        this.attachClickDelegation();
        this.initKeyboardNavigation();
        resolve(); // Resolve after everything is rendered
      }, 100);
    });
    // Note: getTippyInstances() is called by renderHeatmaps() in main.js
    // Do NOT call it here to avoid creating duplicate instances
  }

  /**
   * Subscribe to StateManager events (Phase 3)
   * Must be called after StateManager is initialized
   */
  subscribeToStateChanges() {
    if (this.facility.id !== 'pcc') {
      return; // Only PCC heatmap needs to react to filter changes
    }

    if (!window.state) {
      console.warn('[Heatmap PCC] StateManager not available for subscription');
      return;
    }

    window.state.subscribe('filters:changed', this.onFiltersChanged.bind(this));
    console.log('[Heatmap PCC] ✓ Subscribed to filters:changed event');
  }

  /**
   * Show skeleton loader while heatmap data loads
   */
  showSkeleton() {
    this.container.setAttribute('data-loading', 'true');

    const skeletonHTML = `
      <div class="skeleton-container">
        <div class="loading-message">Loading competitive data...</div>
        <div class="heatmap-skeleton">
          ${this.renderSkeletonGrid()}
        </div>
      </div>
    `;

    this.container.innerHTML = skeletonHTML;
  }

  /**
   * Hide skeleton loader and show real content
   */
  hideSkeleton() {
    this.container.setAttribute('data-loading', 'false');
    const skeleton = this.container.querySelector('.skeleton-container');
    if (skeleton) {
      skeleton.remove();
    }
  }

  /**
   * Render skeleton grid (7 rows × 25 columns including day labels)
   */
  renderSkeletonGrid() {
    let html = '';

    // Header row with hour labels (25 cells: empty corner + 24 hours)
    for (let i = 0; i < 25; i++) {
      html += '<div class="heatmap-skeleton-cell"></div>';
    }

    // 7 day rows (each with 25 cells: day label + 24 hours)
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 25; hour++) {
        html += '<div class="heatmap-skeleton-cell"></div>';
      }
    }

    return html;
  }

  /**
   * Attach click handler using event delegation on container
   * This prevents handlers from being lost when tooltips are updated
   */
  attachClickDelegation() {
    console.log(`[attachClickDelegation] Attaching delegated click handler for ${this.facility.id}`);

    this.container.addEventListener('click', (e) => {
      console.log(`[CLICK EVENT] Container clicked!`);
      console.log(`[CLICK EVENT] e.target:`, e.target);
      console.log(`[CLICK EVENT] e.target.className:`, e.target.className);
      console.log(`[CLICK EVENT] e.currentTarget:`, e.currentTarget);

      const cell = e.target.closest('.heatmap-cell');
      console.log(`[CLICK EVENT] Closest .heatmap-cell:`, cell);

      if (!cell) {
        console.warn(`[CLICK EVENT] Click did not hit a heatmap cell - ignoring`);
        return;
      }

      this.openCellDetails(cell);
    });
  }

  /**
   * Initialize keyboard navigation for heatmap grid
   */
  initKeyboardNavigation() {
    if (typeof GridNavigation === 'undefined') {
      console.warn('[initKeyboardNavigation] GridNavigation class not available');
      return;
    }

    const gridElement = this.container.querySelector('.heatmap-grid');
    if (!gridElement) {
      console.warn('[initKeyboardNavigation] Heatmap grid not found');
      return;
    }

    this.gridNavigation = new GridNavigation(gridElement, {
      rows: 7,
      cols: 24,
      cellSelector: '.heatmap-cell',
      wrapAround: true
    });

    this.gridNavigation.init();

    // Add keyboard handler for Enter/Space to open analysis panel
    gridElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const cell = e.target.closest('.heatmap-cell');
        if (cell) {
          e.preventDefault();
          this.openCellDetails(cell);

          // Announce to screen reader
          if (typeof announceToScreenReader === 'function') {
            const day = cell.dataset.day;
            const hour = parseInt(cell.dataset.hour);
            announceToScreenReader(`Opening details for ${day} ${hour}:00`, 'polite');
          }
        }
      }
    });

    console.log(`[initKeyboardNavigation] Keyboard navigation initialized for ${this.facility.id}`);
  }

  /**
   * Open analysis panel for a specific cell
   * @param {HTMLElement} cell - The heatmap cell
   */
  openCellDetails(cell) {
    console.log(`[openCellDetails] Cell clicked/activated!`);
    console.log(`[openCellDetails] Cell:`, cell);
    console.log(`[openCellDetails] Dataset:`, cell.dataset);

    const day = cell.dataset.day;
    const hour = parseInt(cell.dataset.hour);
    const facilityId = cell.dataset.facility;

    console.log(`[openCellDetails] Parsed: ${day} ${hour}:00, facility: ${facilityId}`);

    // Hide all tooltips
    if (typeof window.hideAllTooltips === 'function') {
      console.log(`[openCellDetails] Calling hideAllTooltips`);
      window.hideAllTooltips();
    } else {
      console.error('[openCellDetails] window.hideAllTooltips not available!');
    }

    // Open analysis panel
    if (window.analysisPanel) {
      console.log(`[openCellDetails] Opening analysis panel`);
      const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
      window.analysisPanel.open(dayIndex, hour, facilityId);
    } else {
      console.error('[openCellDetails] window.analysisPanel not available!');
    }
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
            data-utilization="${popularity}"
            data-facility="${this.facility.id}"
            tabindex="0"
            role="button"
            aria-label="${dayData.day} ${hour}:00, ${popularity}% busy"
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
   * Creates Tippy instances for all cells and returns them for centralized management.
   * @returns {Array} An array of the created Tippy instances.
   */
  getTippyInstances() {
    const instances = [];
    const cells = this.container.querySelectorAll('.heatmap-cell');

    console.log(`[getTippyInstances START] Found ${cells.length} cells for ${this.facility.id}`);

    cells.forEach(cell => {
      const day = cell.dataset.day;
      const hour = parseInt(cell.dataset.hour);
      const popularity = parseInt(cell.dataset.popularity);
      const facilityId = cell.dataset.facility;

      // Create Tippy instance
      const instance = tippy(cell, {
        content: `
          <div class="tooltip-content" role="tooltip">
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
        trigger: 'mouseenter focus', // Trigger on both hover and keyboard focus
        hideOnClick: false, // Don't auto-hide on document click
        popperOptions: {
          modifiers: [
            {
              name: 'eventListeners',
              options: {
                scroll: false,
                resize: false
              }
            }
          ]
        },
        // Accessibility attributes
        role: 'tooltip',
        aria: {
          content: 'describedby',
          expanded: false
        }
      });

      instances.push(instance);

      // Make cell clickable (actual click handler is via event delegation in init())
      cell.style.cursor = 'pointer';
    });

    console.log(`[getTippyInstances END] Created ${instances.length} Tippy instances for ${this.facility.id}`);
    return instances;
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
   * Event handler for filter changes (Phase 3)
   * Automatically refreshes opportunity overlays when filters change
   */
  onFiltersChanged(data) {
    console.log('[Heatmap PCC] Filter change detected, refreshing opportunity overlays', data);
    this.refresh();
  }

  /**
   * Refresh opportunity overlays from StateManager (Phase 3)
   * Called when filters change or manually triggered
   */
  refresh() {
    if (this.facility.id !== 'pcc') {
      return;
    }

    if (!window.state || !window.state.initialized) {
      console.warn('[Heatmap PCC] StateManager not initialized, skipping refresh');
      return;
    }

    console.log('[Heatmap PCC] Refreshing opportunity overlays from state');
    this.applyOpportunityOverlays();
    this.updateTooltipsWithOpportunities();
  }

  /**
   * Apply opportunity overlays to cells (colored borders and badges)
   * Phase 3: Now consumes data from StateManager instead of calculating locally
   */
  applyOpportunityOverlays() {
    if (this.facility.id !== 'pcc') {
      return;
    }

    // Phase 3: Get opportunities from StateManager
    if (!window.state || !window.state.initialized) {
      console.warn('[Heatmap PCC] StateManager not available, skipping overlays');
      return;
    }

    const opportunityScores = window.state.getOpportunityScores();
    if (opportunityScores.size === 0) {
      console.warn('[Heatmap PCC] No opportunity scores available');
      return;
    }

    const cells = this.container.querySelectorAll('.heatmap-cell');

    cells.forEach(cell => {
      const day = cell.dataset.day;
      const hour = parseInt(cell.dataset.hour);
      const key = `${day}-${hour}`;
      const opportunity = opportunityScores.get(key);

      if (!opportunity) return;

      // Remove any existing overlay classes and badges
      cell.classList.remove('opportunity-high', 'opportunity-medium', 'opportunity-low', 'competitive-win');

      // Remove existing badge (will be re-added if needed)
      const existingBadge = cell.querySelector('.corner-badge');
      if (existingBadge) {
        existingBadge.remove();
      }

      // Check if this is a competitive win (PCC is busy and beating competitors)
      const pccPopularity = parseInt(cell.dataset.popularity);

      // Phase 3: Use competitor data from opportunity (already filtered by StateManager)
      const competitors = opportunity.busyCompetitors || [];
      const allCompetitors = [...(opportunity.busyCompetitors || []), ...(opportunity.moderateCompetitors || [])];

      // Update aria-label with opportunity info
      let ariaLabel = `${day} ${hour}:00, ${pccPopularity}% busy`;

      if (isCompetitiveWin(pccPopularity, allCompetitors)) {
        cell.classList.add('competitive-win');
        ariaLabel += ', competitive win - PCC outperforming competitors';
      } else if (opportunity.level === 'high') {
        cell.classList.add('opportunity-high');
        ariaLabel += `, high opportunity, score ${opportunity.score} out of 10, ${competitors.length} busy competitors`;
        // Add corner badge showing number of busy competitors
        this.addCornerBadge(cell, competitors.length, '#10B981');
      } else if (opportunity.level === 'medium') {
        cell.classList.add('opportunity-medium');
        ariaLabel += `, medium opportunity, score ${opportunity.score} out of 10`;
        this.addCornerBadge(cell, competitors.length, '#F59E0B');
      } else if (opportunity.level === 'low') {
        cell.classList.add('opportunity-low');
        ariaLabel += `, low opportunity, score ${opportunity.score} out of 10`;
      }

      cell.setAttribute('aria-label', ariaLabel);
    });

    console.log('[Heatmap PCC] Applied opportunity overlays from StateManager');
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
    // Phase 3: Get opportunity from StateManager
    const opportunityScores = window.state ? window.state.getOpportunityScores() : new Map();
    const opportunity = opportunityScores.get(key);

    // Base tooltip content
    let content = `
      <div class="tooltip-content" role="tooltip">
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
    // Phase 3: Get opportunity count from StateManager
    const opportunityScores = window.state ? window.state.getOpportunityScores() : new Map();
    console.log(`[updateTooltipsWithOpportunities START] facility: ${this.facility.id}, opportunities count: ${opportunityScores.size}`);

    if (this.facility.id !== 'pcc' || opportunityScores.size === 0) {
      console.log(`[updateTooltipsWithOpportunities] Skipping - not PCC or no opportunities`);
      return;
    }

    const cells = this.container.querySelectorAll('.heatmap-cell');
    console.log(`[updateTooltipsWithOpportunities] Found ${cells.length} cells to update`);

    let updatedCount = 0;
    cells.forEach(cell => {
      const day = cell.dataset.day;
      const hour = parseInt(cell.dataset.hour);
      const popularity = parseInt(cell.dataset.popularity);

      // Update existing tooltip content instead of destroying
      if (cell._tippy) {
        cell._tippy.setContent(this.createEnhancedTooltip(cell, day, hour, popularity));
        updatedCount++;
      } else {
        console.warn(`[updateTooltipsWithOpportunities] Cell has no Tippy instance: ${day} ${hour}:00`);
      }
    });

    console.log(`[updateTooltipsWithOpportunities END] Updated ${updatedCount} tooltips with opportunity insights`);
  }
}
