// PCC Yield Optimizer - Market Gap Heatmap Component (Sprint 7.5B)
// Shows aggregate market gaps across all competitors

class MarketGapHeatmapComponent {
  /**
   * Create Market Gap Heatmap showing aggregate competitor availability
   * @param {string} containerId - DOM container ID
   * @param {Array} allFacilitiesData - Array of {facility, popularTimes} for all 6 facilities
   */
  constructor(containerId, allFacilitiesData) {
    this.containerId = containerId;
    this.allFacilitiesData = allFacilitiesData;
    this.container = null;
    this.gapData = null; // Calculated gap matrix
  }

  /**
   * Initialize and render the market gap heatmap
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container '${this.containerId}' not found`);
      return;
    }

    this.calculateGapData();
    this.render();
    this.attachEventListeners();
  }

  /**
   * Calculate gap data: for each time slot, count unavailable/busy competitors
   */
  calculateGapData() {
    const gapMatrix = []; // 7 days × 24 hours

    // Get PCC data
    const pccData = this.allFacilitiesData.find(f => f.facility.id === 'pcc');

    // Get visible competitors from StateManager (respects filter selection)
    const competitors = window.state
      ? window.state.getCompetitorData()
      : this.allFacilitiesData.filter(f => f.facility.id !== 'pcc');

    // For each day
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayGaps = [];

      // For each hour
      for (let hour = 0; hour < 24; hour++) {
        // Count how many competitors are unavailable or at capacity
        let unavailableCount = 0;
        let atCapacityCount = 0;
        let competitorDetails = [];

        competitors.forEach(({ facility, popularTimes }) => {
          const hourData = popularTimes.weeklyData[dayIndex].hourly[hour];
          const isOpen = this.isFacilityOpen(facility, dayIndex, hour);
          const utilization = hourData.popularity;

          if (!isOpen) {
            unavailableCount++;
            competitorDetails.push({
              id: facility.id,
              name: facility.name,
              status: 'closed',
              utilization: 0
            });
          } else if (utilization >= 85) {
            atCapacityCount++;
            competitorDetails.push({
              id: facility.id,
              name: facility.name,
              status: 'at-capacity',
              utilization
            });
          } else {
            competitorDetails.push({
              id: facility.id,
              name: facility.name,
              status: 'available',
              utilization
            });
          }
        });

        // PCC utilization at this time
        const pccUtilization = pccData.popularTimes.weeklyData[dayIndex].hourly[hour].popularity;

        // Gap score: total unavailable/busy competitors
        const gapScore = unavailableCount + atCapacityCount;

        dayGaps.push({
          day: CONFIG.days[dayIndex],
          dayIndex,
          hour,
          gapScore,                    // 0-5 (number of competitors unavailable/busy)
          unavailableCount,            // Closed facilities
          atCapacityCount,             // At capacity (≥85%)
          pccUtilization,              // PCC's utilization
          competitorDetails,           // Array of competitor statuses
          opportunityLevel: this.calculateOpportunityLevel(gapScore, pccUtilization)
        });
      }

      gapMatrix.push(dayGaps);
    }

    this.gapData = gapMatrix;
  }

  /**
   * Check if facility is open at given day/hour
   */
  isFacilityOpen(facility, dayIndex, hour) {
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayName = dayNames[dayIndex];
    const hours = facility.operatingHours[dayName];

    if (!hours) return false;

    const openHour = parseInt(hours.open.split(':')[0]);
    const closeHour = parseInt(hours.close.split(':')[0]);

    return hour >= openHour && hour < closeHour;
  }

  /**
   * Calculate opportunity level based on gap score and PCC utilization
   */
  calculateOpportunityLevel(gapScore, pccUtilization) {
    // High opportunity: 3+ competitors unavailable AND PCC has capacity
    if (gapScore >= 3 && pccUtilization < 60) {
      return 'high';
    }
    // Medium opportunity: 2+ competitors unavailable AND PCC has capacity
    else if (gapScore >= 2 && pccUtilization < 70) {
      return 'medium';
    }
    // Low opportunity: 1+ competitors unavailable but PCC is also busy
    else if (gapScore >= 1 && pccUtilization >= 70) {
      return 'low';
    }
    // No opportunity
    return 'none';
  }

  /**
   * Render the heatmap
   */
  render() {
    const html = `
      <div class="market-gap-heatmap-container">
        <div class="heatmap-header">
          <h3 class="heatmap-title">Market Gap Analysis</h3>
          <p class="heatmap-subtitle">
            Color intensity = Number of competitors closed or at capacity
          </p>
        </div>

        <div class="heatmap-legend">
          <span class="legend-item">
            <span class="legend-color" style="background: #FFFFFF; border: 1px solid #E5E7EB;"></span>
            0 competitors
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #FEF9C3;"></span>
            1-2 competitors
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #FBBF24;"></span>
            3-4 competitors
          </span>
          <span class="legend-item">
            <span class="legend-color" style="background: #F87171;"></span>
            5 competitors
          </span>
        </div>

        <div class="heatmap-grid">
          ${this.renderGrid()}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.initializeTooltips();
  }

  /**
   * Render the 7×24 grid
   */
  renderGrid() {
    let html = '<div class="market-gap-grid-container">';

    // Column headers (hours)
    html += '<div class="market-gap-col-header"></div>'; // Empty corner
    for (let hour = 0; hour < 24; hour++) {
      html += `<div class="market-gap-col-header">${hour}</div>`;
    }

    // Rows (days)
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      // Row label
      html += `<div class="market-gap-row-header">${CONFIG.days[dayIndex]}</div>`;

      // Hour cells
      for (let hour = 0; hour < 24; hour++) {
        const cellData = this.gapData[dayIndex][hour];
        const color = this.getColorForGapScore(cellData.gapScore);
        const opportunityClass = `opportunity-${cellData.opportunityLevel}`;

        html += `
          <div class="market-gap-cell ${opportunityClass}"
               style="background-color: ${color};"
               data-day="${dayIndex}"
               data-hour="${hour}">
            <span class="gap-score-badge">${cellData.gapScore}</span>
          </div>
        `;
      }
    }

    html += '</div>';
    return html;
  }

  /**
   * Get color for gap score (0-5 scale)
   */
  getColorForGapScore(score) {
    const colors = {
      0: '#FFFFFF',  // White (all competitors available)
      1: '#FEF9C3',  // Very light yellow
      2: '#FEF3C7',  // Light yellow
      3: '#FBBF24',  // Orange
      4: '#F87171',  // Light red
      5: '#DC2626'   // Deep red (all competitors unavailable)
    };
    return colors[Math.min(score, 5)];
  }

  /**
   * Initialize tooltips for cells
   */
  initializeTooltips() {
    const cells = this.container.querySelectorAll('.market-gap-cell');

    cells.forEach(cell => {
      const dayIndex = parseInt(cell.dataset.day);
      const hour = parseInt(cell.dataset.hour);
      const cellData = this.gapData[dayIndex][hour];

      tippy(cell, {
        content: this.generateTooltipContent(cellData),
        allowHTML: true,
        theme: 'pcc',
        placement: 'right',
        arrow: true
      });

      // Register with global Tippy registry
      if (window.tippyInstances && cell._tippy) {
        window.tippyInstances.push(cell._tippy);
      }
    });
  }

  /**
   * Generate tooltip content for a cell
   */
  generateTooltipContent(cellData) {
    const competitorList = cellData.competitorDetails
      .map(c => {
        const icon = c.status === 'closed' ? '🔒' :
                     c.status === 'at-capacity' ? '🔥' :
                     '✅';
        return `${icon} ${c.name}: ${c.utilization}%`;
      })
      .join('<br>');

    return `
      <div class="tooltip-content">
        <div class="tooltip-header">${cellData.day} ${cellData.hour}:00</div>
        <div class="tooltip-body">
          <strong>Market Gap: ${cellData.gapScore}/5 competitors</strong><br>
          <span class="text-caption">
            ${cellData.unavailableCount} closed,
            ${cellData.atCapacityCount} at capacity
          </span>
          <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.2);">
          ${competitorList}
          <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.2);">
          <strong>PCC Utilization:</strong> ${cellData.pccUtilization}%
        </div>
        <div class="tooltip-footer">
          Opportunity: <strong>${cellData.opportunityLevel.toUpperCase()}</strong>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Click to drill down to detailed analysis
    const cells = this.container.querySelectorAll('.market-gap-cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const dayIndex = parseInt(cell.dataset.day);
        const hour = parseInt(cell.dataset.hour);
        this.showDetailedAnalysis(dayIndex, hour);
      });
    });
  }

  /**
   * Show detailed analysis panel for a time slot
   */
  showDetailedAnalysis(dayIndex, hour) {
    const cellData = this.gapData[dayIndex][hour];

    // Trigger analysis panel (if exists)
    if (window.appState && window.appState.analysisPanel) {
      window.appState.analysisPanel.open(cellData);
    }
  }

  /**
   * Subscribe to StateManager events (Phase 4)
   * Must be called after StateManager is initialized
   */
  subscribeToStateChanges() {
    if (!window.state) {
      console.warn('[MarketGapHeatmap] StateManager not available for subscription');
      return;
    }

    window.state.subscribe('filters:changed', this.onFiltersChanged.bind(this));
    console.log('[MarketGapHeatmap] ✓ Subscribed to filters:changed event');
  }

  /**
   * Event handler for filter changes (Phase 4)
   * Automatically recalculates and re-renders when filters change
   */
  onFiltersChanged(data) {
    console.log('[MarketGapHeatmap] Filter change detected, recalculating', data);
    this.calculateGapData();
    this.render();
  }
}
