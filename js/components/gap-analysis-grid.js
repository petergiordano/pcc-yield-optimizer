// PCC Yield Optimizer - Gap Analysis Grid Component (Heatmap Version)
// Visual-first heatmap showing 168-hour competitive gap analysis

class GapAnalysisGrid {
  /**
   * Create a new gap analysis heatmap
   * @param {string} containerId - ID of container element
   * @param {Array} facilitiesData - Array of {facility, popularTimes} for all facilities
   */
  constructor(containerId, facilitiesData) {
    this.container = document.getElementById(containerId);
    this.facilitiesData = facilitiesData;
    this.selectedSlot = null;
    this.filters = {
      showLowActivity: false,
      primeOnly: false,
      opportunitiesOnly: false
    };

    if (!this.container) {
      console.error(`Container with ID '${containerId}' not found`);
      return;
    }

    this.init();
  }

  /**
   * Initialize the heatmap
   */
  init() {
    // Show skeleton loader first
    this.showSkeleton();

    // Simulate async data processing
    setTimeout(() => {
      this.processData();
      this.hideSkeleton();
      this.render();
      this.attachEventListeners();
    }, 200);
  }

  /**
   * Show skeleton loader while data is being processed
   */
  showSkeleton() {
    this.container.setAttribute('data-loading', 'true');

    const skeletonHTML = `
      <div class="skeleton-container">
        <div class="loading-message">Calculating gaps...</div>
        ${this.renderSkeletonTable()}
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
   * Render skeleton table
   * @returns {string} HTML for skeleton table
   */
  renderSkeletonTable() {
    let html = `
      <table class="gap-grid-skeleton">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>PCC %</th>
            <th>Market Max</th>
            <th>Gap</th>
            <th>Score</th>
            <th>Est. Revenue</th>
            <th>Top Competitor</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Render 10 skeleton rows
    for (let i = 0; i < 10; i++) {
      const widthClass = i % 3 === 0 ? 'short' : i % 3 === 1 ? 'medium' : 'long';
      html += `
        <tr class="gap-grid-skeleton-row">
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar ${widthClass}"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar short"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar short"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar short"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar medium"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar short"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar medium"></div>
          </td>
          <td class="gap-grid-skeleton-cell">
            <div class="gap-grid-skeleton-bar long"></div>
          </td>
        </tr>
      `;
    }

    html += `
        </tbody>
      </table>
    `;

    return html;
  }

  /**
   * Process real PCC/SPF data into time slots
   */
  processData() {
    const pccData = this.facilitiesData.find(({ facility }) => facility.id === 'pcc');
    const spfData = this.facilitiesData.find(({ facility }) => facility.id === 'spf');

    if (!pccData || !spfData) {
      console.error('PCC or SPF data not found');
      return;
    }

    this.timeSlots = [];
    this.days = CONFIG.days;

    this.days.forEach((dayName, dayIndex) => {
      const pccDayData = pccData.popularTimes.weeklyData[dayIndex];
      const spfDayData = spfData.popularTimes.weeklyData[dayIndex];

      const daySlots = [];

      for (let hour = 0; hour < 24; hour++) {
        const pccHour = pccDayData.hourly.find(h => h.hour === hour);
        const spfHour = spfDayData.hourly.find(h => h.hour === hour);

        const pccUtilization = pccHour ? pccHour.popularity : 0;
        const spfUtilization = spfHour ? spfHour.popularity : 0;

        const gap = spfUtilization - pccUtilization;
        const isPrime = this.isPrimeTime(dayName, hour);
        const isLowActivity = pccUtilization < 10 && spfUtilization < 10;

        // Calculate opportunity score using existing logic
        const competitorData = [{
          id: 'spf',
          name: 'SPF Chicago',
          popularity: spfUtilization
        }];

        const opportunityData = calculateOpportunityScore(
          pccUtilization,
          competitorData,
          pccDayData.day,
          hour
        );

        const estRevenue = this.calculateRevenue(gap, isPrime);

        daySlots.push({
          day: dayName,
          hour,
          timeLabel: this.formatHour(hour),
          pccUtilization: Math.round(pccUtilization * 10) / 10,
          marketMax: Math.round(spfUtilization * 10) / 10,
          gap: Math.round(gap * 10) / 10,
          opportunityScore: opportunityData.score || 0,
          estRevenue: Math.round(estRevenue),
          topCompetitor: 'SPF Chicago',
          isPrime,
          isLowActivity
        });
      }

      this.timeSlots.push({ day: dayName, hours: daySlots });
    });

    this.calculateSummaryStats();
    this.identifyTopOpportunities();

    console.log(`Processed ${this.timeSlots.length} days with 24 hours each`);
  }

  /**
   * Format hour as short label (12a, 1a, ..., 11p)
   */
  formatHour(hour) {
    if (hour === 0) return '12a';
    if (hour < 12) return `${hour}a`;
    if (hour === 12) return '12p';
    return `${hour - 12}p`;
  }

  /**
   * Format hour as full time (12:00 AM, 1:00 PM, etc.)
   */
  formatHourFull(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  }

  /**
   * Determine if time slot is prime time
   */
  isPrimeTime(day, hour) {
    const isWeekend = day === 'Saturday' || day === 'Sunday';
    if (isWeekend) {
      return hour >= 8 && hour <= 20; // 8 AM - 8 PM
    } else {
      return hour >= 17 && hour <= 21; // 5 PM - 9 PM
    }
  }

  /**
   * Calculate estimated weekly revenue opportunity
   */
  calculateRevenue(gap, isPrime) {
    if (gap <= 0) return 0;

    const courts = 7;
    const hourlyRate = isPrime ? 20 : 15;
    const weeks = 1;

    return (gap / 100) * courts * hourlyRate * weeks;
  }

  /**
   * Calculate summary statistics
   */
  calculateSummaryStats() {
    const allSlots = this.timeSlots.flatMap(day => day.hours);
    const opportunities = allSlots.filter(slot => slot.gap > 0);

    this.summary = {
      totalOpportunity: opportunities.reduce((sum, slot) => sum + slot.estRevenue, 0),
      avgGap: opportunities.length > 0
        ? opportunities.reduce((sum, slot) => sum + slot.gap, 0) / opportunities.length
        : 0,
      winRate: (allSlots.filter(slot => slot.gap < 0).length / allSlots.length) * 100,
      highOpportunities: allSlots.filter(slot => slot.gap > 30).length,
      mediumOpportunities: allSlots.filter(slot => slot.gap >= 15 && slot.gap <= 30).length,
      lowActivity: allSlots.filter(slot => slot.isLowActivity).length
    };
  }

  /**
   * Identify top 10 revenue opportunities
   */
  identifyTopOpportunities() {
    const allSlots = this.timeSlots.flatMap(day =>
      day.hours.map(hour => ({ ...hour }))
    );

    this.topOpportunities = allSlots
      .filter(slot => slot.gap > 0)
      .sort((a, b) => b.estRevenue - a.estRevenue)
      .slice(0, 10);
  }

  /**
   * Get color for gap value
   */
  getGapColor(gap, isLowActivity) {
    if (isLowActivity) return '#F3F4F6'; // Gray for low activity
    if (gap > 30) return '#10B981'; // Green - high opportunity
    if (gap > 15) return '#F59E0B'; // Yellow - medium opportunity
    if (gap > 0) return '#6EE7B7'; // Light green - small opportunity
    if (gap < -10) return '#3B82F6'; // Blue - strong lead
    return '#93C5FD'; // Light blue - slight lead
  }

  /**
   * Get opacity intensity for gap value
   */
  getGapIntensity(gap, isLowActivity) {
    if (isLowActivity) return 0.3;
    const absGap = Math.abs(gap);
    if (absGap > 40) return 1.0;
    if (absGap > 30) return 0.85;
    if (absGap > 20) return 0.7;
    if (absGap > 10) return 0.55;
    return 0.4;
  }

  /**
   * Get human-readable label for gap
   */
  getGapLabel(gap, isLowActivity) {
    if (isLowActivity) return 'Low Activity';
    if (gap > 30) return 'High Opportunity';
    if (gap > 15) return 'Medium Opportunity';
    if (gap > 0) return 'Small Opportunity';
    if (gap < -10) return 'Strong Lead';
    return 'Slight Lead';
  }

  /**
   * Render complete heatmap interface
   */
  render() {
    this.container.innerHTML = `
      <div class="gap-grid-heatmap">
        ${this.renderSummary()}
        ${this.renderTopOpportunities()}
        ${this.renderControls()}
        ${this.renderHeatmap()}
        ${this.renderDetailPanel()}
      </div>
    `;
  }

  /**
   * Render summary statistics panel
   */
  renderSummary() {
    return `
      <div class="summary-panel">
        <div class="summary-card">
          <div class="summary-label">Weekly Opportunity</div>
          <div class="summary-value text-green-600">$${Math.round(this.summary.totalOpportunity).toLocaleString()}</div>
          <div class="summary-subtitle">Potential additional revenue</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Average Gap</div>
          <div class="summary-value">${this.summary.avgGap.toFixed(1)}%</div>
          <div class="summary-subtitle">vs. market leader</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Win Rate</div>
          <div class="summary-value text-blue-600">${this.summary.winRate.toFixed(1)}%</div>
          <div class="summary-subtitle">Time slots leading market</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">High Opportunities</div>
          <div class="summary-value">${this.summary.highOpportunities}</div>
          <div class="summary-subtitle">Gaps > 30%</div>
        </div>
      </div>
    `;
  }

  /**
   * Render top 10 revenue opportunities
   */
  renderTopOpportunities() {
    return `
      <div class="top-opportunities">
        <h3 class="section-title">🔥 Top 10 Revenue Opportunities</h3>
        <div class="opportunity-cards">
          ${this.topOpportunities.map((slot, index) => `
            <div class="opportunity-card" data-day="${slot.day}" data-hour="${slot.hour}">
              <div class="opportunity-rank">#${index + 1}</div>
              <div class="opportunity-time">
                <strong>${slot.day}</strong> ${this.formatHourFull(slot.hour)}
              </div>
              <div class="opportunity-metrics">
                <span class="metric-badge gap-high">+${slot.gap.toFixed(1)}% gap</span>
                <span class="metric-badge revenue">$${slot.estRevenue.toFixed(0)}/week</span>
              </div>
              <div class="opportunity-competitor">vs. ${slot.topCompetitor}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render filter controls and export button
   */
  renderControls() {
    return `
      <div class="heatmap-controls">
        <div class="control-group">
          <h3 class="section-title">Filters</h3>
          <label class="checkbox-label">
            <input type="checkbox" id="filter-prime" ${this.filters.primeOnly ? 'checked' : ''}>
            <span>Prime Time Only</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="filter-opportunities" ${this.filters.opportunitiesOnly ? 'checked' : ''}>
            <span>Opportunities Only (Gap > 0)</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" id="show-low-activity" ${this.filters.showLowActivity ? 'checked' : ''}>
            <span>Show Low Activity Hours</span>
          </label>
        </div>

        <div class="legend">
          <h3 class="section-title">Legend</h3>
          <div class="legend-items">
            <div class="legend-item">
              <div class="legend-color" style="background: #10B981; opacity: 0.85;"></div>
              <span>High Opportunity (>30%)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background: #F59E0B; opacity: 0.7;"></div>
              <span>Medium (15-30%)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background: #6EE7B7; opacity: 0.55;"></div>
              <span>Small (0-15%)</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background: #3B82F6; opacity: 0.85;"></div>
              <span>PCC Leading</span>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background: #F3F4F6; opacity: 0.3;"></div>
              <span>Low Activity</span>
            </div>
          </div>
        </div>

        <button id="export-csv" class="btn-export">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Export Full Data (CSV)
        </button>
      </div>
    `;
  }

  /**
   * Render heatmap grid
   */
  renderHeatmap() {
    return `
      <div class="heatmap-container">
        <div class="heatmap-hour-labels">
          <div class="hour-label-spacer"></div>
          ${Array.from({ length: 24 }, (_, i) => `
            <div class="hour-label">${this.formatHour(i)}</div>
          `).join('')}
        </div>

        ${this.timeSlots.map(dayData => this.renderDayRow(dayData)).join('')}
      </div>
    `;
  }

  /**
   * Render a single day row in the heatmap
   */
  renderDayRow(dayData) {
    const visibleHours = this.getVisibleHours(dayData.hours);

    if (visibleHours.length === 0) return '';

    return `
      <div class="heatmap-row">
        <div class="day-label">${dayData.day}</div>
        <div class="hour-cells">
          ${dayData.hours.map(slot => this.renderHourCell(slot, dayData.day)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render a single hour cell in the heatmap
   */
  renderHourCell(slot, day) {
    const visible = this.isSlotVisible(slot);
    const color = this.getGapColor(slot.gap, slot.isLowActivity);
    const intensity = this.getGapIntensity(slot.gap, slot.isLowActivity);
    const isSelected = this.selectedSlot &&
                      this.selectedSlot.day === day &&
                      this.selectedSlot.hour === slot.hour;

    return `
      <div class="hour-cell ${!visible ? 'hidden' : ''} ${isSelected ? 'selected' : ''}"
           data-day="${day}"
           data-hour="${slot.hour}"
           data-gap="${slot.gap}"
           data-pcc="${slot.pccUtilization}"
           data-market="${slot.marketMax}"
           data-revenue="${slot.estRevenue}"
           data-competitor="${slot.topCompetitor}"
           data-label="${this.getGapLabel(slot.gap, slot.isLowActivity)}"
           style="background-color: ${color}; opacity: ${intensity};">
      </div>
    `;
  }

  /**
   * Get visible hours based on filters
   */
  getVisibleHours(hours) {
    return hours.filter(slot => this.isSlotVisible(slot));
  }

  /**
   * Check if slot should be visible based on filters
   */
  isSlotVisible(slot) {
    if (!this.filters.showLowActivity && slot.isLowActivity) return false;
    if (this.filters.primeOnly && !slot.isPrime) return false;
    if (this.filters.opportunitiesOnly && slot.gap <= 0) return false;
    return true;
  }

  /**
   * Render detail panel for selected slot
   */
  renderDetailPanel() {
    if (!this.selectedSlot) {
      return `
        <div class="detail-panel empty">
          <div class="empty-state">
            <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
            </svg>
            <p>Click any time slot to see detailed analysis</p>
          </div>
        </div>
      `;
    }

    const slot = this.selectedSlot;
    const gapClass = slot.gap > 30 ? 'gap-high' : slot.gap > 15 ? 'gap-medium' : slot.gap > 0 ? 'gap-low' : 'gap-winning';

    return `
      <div class="detail-panel">
        <div class="detail-header">
          <h3>${slot.day} ${this.formatHourFull(slot.hour)}</h3>
          <button class="detail-close" id="close-detail">×</button>
        </div>

        <div class="detail-metrics">
          <div class="detail-metric">
            <div class="metric-label">PCC Utilization</div>
            <div class="metric-value">${slot.pccUtilization.toFixed(1)}%</div>
          </div>
          <div class="detail-metric">
            <div class="metric-label">Market Leader</div>
            <div class="metric-value">${slot.marketMax.toFixed(1)}%</div>
            <div class="metric-sublabel">${slot.topCompetitor}</div>
          </div>
          <div class="detail-metric highlight">
            <div class="metric-label">Gap</div>
            <div class="metric-value ${gapClass}">${slot.gap > 0 ? '+' : ''}${slot.gap.toFixed(1)}%</div>
            <div class="metric-sublabel">${this.getGapLabel(slot.gap, slot.isLowActivity)}</div>
          </div>
          <div class="detail-metric">
            <div class="metric-label">Revenue Potential</div>
            <div class="metric-value">$${slot.estRevenue.toFixed(0)}</div>
            <div class="metric-sublabel">per week</div>
          </div>
        </div>

        <div class="detail-recommendations">
          <h4>Strategic Recommendations</h4>
          ${this.generateRecommendations(slot)}
        </div>
      </div>
    `;
  }

  /**
   * Generate strategic recommendations based on slot data
   */
  generateRecommendations(slot) {
    const recommendations = [];

    if (slot.isLowActivity) {
      recommendations.push('📊 <strong>Low Activity Period:</strong> Consider this for facility maintenance or staff scheduling flexibility.');
      recommendations.push('💡 Evaluate if programming during this time would generate enough demand to justify staffing costs.');
    } else if (slot.gap > 30) {
      recommendations.push('🎯 <strong>High Priority:</strong> Significant opportunity to increase utilization through targeted programming or pricing adjustments.');
      recommendations.push('📈 Competitor analysis shows ' + slot.topCompetitor + ' is capturing ' + slot.marketMax.toFixed(0) + '% utilization.');
      recommendations.push('💰 Potential weekly revenue impact: $' + slot.estRevenue.toFixed(0) + ' with 7 courts.');
      recommendations.push('🎪 Consider: themed events, leagues, tournaments, or corporate bookings.');
    } else if (slot.gap > 15) {
      recommendations.push('⚡ <strong>Medium Priority:</strong> Moderate opportunity for growth.');
      recommendations.push('📣 Increase marketing visibility for this time slot.');
      recommendations.push('🎓 Consider instructor-led sessions or clinics to drive attendance.');
    } else if (slot.gap > 0) {
      recommendations.push('✓ <strong>Competitive:</strong> Close to market parity.');
      recommendations.push('🔍 Monitor competitor activity for any changes.');
    } else {
      recommendations.push('🏆 <strong>Market Leader:</strong> PCC is outperforming competitors by ' + Math.abs(slot.gap).toFixed(1) + '%.');
      recommendations.push('💪 Maintain current programming and pricing strategy.');
      recommendations.push('📊 Document what\'s working to replicate in other time slots.');
      if (Math.abs(slot.gap) > 20) {
        recommendations.push('💵 Consider testing modest price increases to optimize revenue.');
      }
    }

    return recommendations.map(rec => `<p>${rec}</p>`).join('');
  }

  /**
   * Attach all event listeners
   */
  attachEventListeners() {
    // Hour cell clicks
    this.container.querySelectorAll('.hour-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const day = cell.dataset.day;
        const hour = parseInt(cell.dataset.hour);
        this.selectSlot(day, hour);

        // Hide all tooltips before opening panel
        this.hideTooltip(); // Hide custom gap analysis tooltip
        if (typeof window.hideAllTooltips === 'function') {
          window.hideAllTooltips(); // Hide any Tippy tooltips
        }

        // Open analysis panel (Sprint 6)
        if (window.analysisPanel) {
          const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
          window.analysisPanel.open(dayIndex, hour, 'pcc');
        }
      });

      // Tooltip on hover
      cell.addEventListener('mouseenter', (e) => {
        if (cell.classList.contains('hidden')) return;
        this.showTooltip(e, cell);
      });

      cell.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });

    // Top opportunity card clicks
    this.container.querySelectorAll('.opportunity-card').forEach(card => {
      card.addEventListener('click', () => {
        const day = card.dataset.day;
        const hour = parseInt(card.dataset.hour);
        this.selectSlot(day, hour);

        // Scroll to heatmap
        this.container.querySelector('.heatmap-container').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      });
    });

    // Filter controls
    ['filter-prime', 'filter-opportunities', 'show-low-activity'].forEach(id => {
      const checkbox = document.getElementById(id);
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          if (id === 'filter-prime') this.filters.primeOnly = checkbox.checked;
          if (id === 'filter-opportunities') this.filters.opportunitiesOnly = checkbox.checked;
          if (id === 'show-low-activity') this.filters.showLowActivity = checkbox.checked;
          this.updateHeatmap();
        });
      }
    });

    // Export button
    const exportBtn = document.getElementById('export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportToCSV());
    }

    // Close detail panel
    const closeBtn = document.getElementById('close-detail');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.selectedSlot = null;
        this.updateDetailPanel();
        this.updateHeatmap();
      });
    }
  }

  /**
   * Select a time slot and show detail panel
   */
  selectSlot(day, hour) {
    const dayData = this.timeSlots.find(d => d.day === day);
    if (!dayData) return;

    const slotData = dayData.hours.find(h => h.hour === hour);
    if (!slotData) return;

    this.selectedSlot = {
      day,
      hour,
      ...slotData
    };

    this.updateDetailPanel();
    this.updateHeatmap();
  }

  /**
   * Show tooltip on hover
   */
  showTooltip(event, cell) {
    const tooltip = document.createElement('div');
    tooltip.className = 'heatmap-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-time"><strong>${cell.dataset.day} ${this.formatHourFull(parseInt(cell.dataset.hour))}</strong></div>
      <div class="tooltip-row">
        <span>PCC:</span>
        <strong>${parseFloat(cell.dataset.pcc).toFixed(1)}%</strong>
      </div>
      <div class="tooltip-row">
        <span>Market:</span>
        <strong>${parseFloat(cell.dataset.market).toFixed(1)}%</strong>
      </div>
      <div class="tooltip-row">
        <span>Gap:</span>
        <strong class="${parseFloat(cell.dataset.gap) > 0 ? 'gap-high' : 'gap-winning'}">
          ${parseFloat(cell.dataset.gap) > 0 ? '+' : ''}${parseFloat(cell.dataset.gap).toFixed(1)}%
        </strong>
      </div>
      <div class="tooltip-row">
        <span>Revenue:</span>
        <strong>$${parseFloat(cell.dataset.revenue).toFixed(0)}</strong>
      </div>
      <div class="tooltip-competitor">${cell.dataset.competitor}</div>
    `;

    document.body.appendChild(tooltip);

    const rect = cell.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 10}px`;

    this.currentTooltip = tooltip;
  }

  /**
   * Hide tooltip
   */
  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }

  /**
   * Update heatmap after filter changes
   */
  updateHeatmap() {
    const heatmapContainer = this.container.querySelector('.heatmap-container');
    const currentScroll = heatmapContainer.scrollTop;

    const newHeatmap = this.renderHeatmap();
    heatmapContainer.innerHTML = newHeatmap;

    heatmapContainer.scrollTop = currentScroll;

    // Re-attach listeners for new cells
    this.container.querySelectorAll('.hour-cell').forEach(cell => {
      cell.addEventListener('click', () => {
        const day = cell.dataset.day;
        const hour = parseInt(cell.dataset.hour);

        // Hide all tooltips before selecting slot
        this.hideTooltip(); // Hide custom gap analysis tooltip
        if (typeof window.hideAllTooltips === 'function') {
          window.hideAllTooltips(); // Hide any Tippy tooltips
        }

        this.selectSlot(day, hour);

        // Open analysis panel (Sprint 6)
        if (window.analysisPanel) {
          const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
          window.analysisPanel.open(dayIndex, hour, 'pcc');
        }
      });

      cell.addEventListener('mouseenter', (e) => {
        if (cell.classList.contains('hidden')) return;
        this.showTooltip(e, cell);
      });

      cell.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  /**
   * Update detail panel after selection changes
   */
  updateDetailPanel() {
    const detailPanel = this.container.querySelector('.detail-panel');
    if (detailPanel) {
      const newPanel = this.renderDetailPanel();
      detailPanel.outerHTML = newPanel;

      const closeBtn = document.getElementById('close-detail');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.selectedSlot = null;
          this.updateDetailPanel();
          this.updateHeatmap();
        });
      }
    }
  }

  /**
   * Export data to CSV
   */
  exportToCSV() {
    const headers = ['Day', 'Time', 'PCC %', 'Market Max %', 'Gap', 'Revenue', 'Competitor'];
    const rows = [];

    this.timeSlots.forEach(dayData => {
      dayData.hours.forEach(slot => {
        rows.push([
          dayData.day,
          this.formatHourFull(slot.hour),
          slot.pccUtilization,
          slot.marketMax,
          slot.gap,
          slot.estRevenue.toFixed(2),
          slot.topCompetitor
        ]);
      });
    });

    let csvContent = headers.join(',') + '\n';
    csvContent += rows.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pcc-gap-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    console.log(`Exported ${rows.length} time slots to CSV`);
  }
}
