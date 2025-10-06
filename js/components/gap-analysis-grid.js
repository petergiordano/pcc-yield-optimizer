// PCC Yield Optimizer - Gap Analysis Grid Component
// 168-row data table showing competitive gap analysis with real PCC vs SPF data

class GapAnalysisGrid {
  /**
   * Create a new gap analysis grid
   * @param {string} containerId - ID of container element
   * @param {Array} facilitiesData - Array of {facility, popularTimes} for all facilities
   */
  constructor(containerId, facilitiesData) {
    this.container = document.getElementById(containerId);
    this.facilitiesData = facilitiesData;
    this.timeSlots = [];
    this.filteredSlots = [];
    this.currentSort = { column: 'gap', direction: 'desc' };
    this.filters = { primeOnly: false, opportunitiesOnly: false };

    if (!this.container) {
      console.error(`Container with ID '${containerId}' not found`);
      return;
    }

    this.init();
  }

  /**
   * Initialize the grid
   */
  init() {
    this.generateTimeSlots();
    this.calculateSummaryStats();
    this.render();
  }

  /**
   * Generate all 168 time slots with real data from PCC and SPF
   */
  generateTimeSlots() {
    const pccData = this.facilitiesData.find(({ facility }) => facility.id === 'pcc');
    const spfData = this.facilitiesData.find(({ facility }) => facility.id === 'spf');

    if (!pccData || !spfData) {
      console.error('PCC or SPF data not found');
      return;
    }

    const days = CONFIG.days;

    days.forEach((dayName, dayIndex) => {
      const pccDayData = pccData.popularTimes.weeklyData[dayIndex];
      const spfDayData = spfData.popularTimes.weeklyData[dayIndex];

      for (let hour = 0; hour < 24; hour++) {
        const pccHour = pccDayData.hourly.find(h => h.hour === hour);
        const spfHour = spfDayData.hourly.find(h => h.hour === hour);

        const pccUtilization = pccHour ? pccHour.popularity : 0;
        const spfUtilization = spfHour ? spfHour.popularity : 0;

        // Calculate gap (positive = opportunity, negative = winning)
        const gap = spfUtilization - pccUtilization;

        // Determine if this is prime time
        const isPrime = this.isPrimeTime(dayName, hour);

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

        // Calculate estimated revenue
        const estRevenue = this.calculateRevenue(gap, isPrime);

        this.timeSlots.push({
          timeSlot: `${dayName} ${this.formatHour(hour)}`,
          day: dayName,
          hour: hour,
          dayOfWeek: dayIndex,
          pccUtilization: pccUtilization,
          marketMax: spfUtilization,
          gap: Math.round(gap * 10) / 10,
          opportunityScore: opportunityData.score || 0,
          estRevenue: Math.round(estRevenue),
          topCompetitor: 'SPF Chicago',
          isPrime: isPrime
        });
      }
    });

    this.filteredSlots = [...this.timeSlots];
    console.log(`Generated ${this.timeSlots.length} time slots`);
  }

  /**
   * Format hour as 12-hour time
   * @param {number} hour - Hour (0-23)
   * @returns {string} Formatted time
   */
  formatHour(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:00 ${period}`;
  }

  /**
   * Determine if time slot is prime time
   * @param {string} day - Day name
   * @param {number} hour - Hour (0-23)
   * @returns {boolean} True if prime time
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
   * @param {number} gap - Utilization gap percentage
   * @param {boolean} isPrime - Whether this is prime time
   * @returns {number} Estimated weekly revenue in dollars
   */
  calculateRevenue(gap, isPrime) {
    // Only count positive gaps (opportunities)
    if (gap <= 0) return 0;

    const courts = 7;
    const hourlyRate = isPrime ? 20 : 15; // $/hour per court
    const weeks = 1;

    // Revenue = (Gap % / 100) × Courts × Rate × Weeks
    return (gap / 100) * courts * hourlyRate * weeks;
  }

  /**
   * Calculate summary statistics
   */
  calculateSummaryStats() {
    const opportunities = this.timeSlots.filter(slot => slot.gap > 0);
    const wins = this.timeSlots.filter(slot => slot.gap < 0);

    this.summary = {
      totalOpportunity: opportunities.reduce((sum, slot) => sum + slot.estRevenue, 0),
      avgGap: opportunities.length > 0
        ? opportunities.reduce((sum, slot) => sum + slot.gap, 0) / opportunities.length
        : 0,
      winRate: (wins.length / this.timeSlots.length) * 100,
      highOpportunities: this.timeSlots.filter(slot => slot.gap > 30).length,
      mediumOpportunities: this.timeSlots.filter(slot => slot.gap >= 15 && slot.gap <= 30).length
    };
  }

  /**
   * Get gap CSS class based on value
   * @param {number} gap - Gap percentage
   * @returns {string} CSS class name
   */
  getGapClass(gap) {
    if (gap > 30) return 'gap-high';
    if (gap >= 15) return 'gap-medium';
    if (gap < 0) return 'gap-winning';
    return 'gap-low';
  }

  /**
   * Sort data by column
   * @param {string} column - Column name to sort by
   */
  sortData(column) {
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'desc';
    }

    this.filteredSlots.sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      // Handle string comparisons
      if (typeof aVal === 'string') {
        return this.currentSort.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Handle numeric comparisons
      return this.currentSort.direction === 'asc'
        ? aVal - bVal
        : bVal - aVal;
    });

    this.renderTable();
    this.attachSortListeners();
  }

  /**
   * Apply filters to time slots
   */
  applyFilters() {
    this.filteredSlots = this.timeSlots.filter(slot => {
      if (this.filters.primeOnly && !slot.isPrime) return false;
      if (this.filters.opportunitiesOnly && slot.gap <= 0) return false;
      return true;
    });

    // Re-apply current sort
    this.sortData(this.currentSort.column);
  }

  /**
   * Render the complete grid
   */
  render() {
    this.container.innerHTML = `
      <div class="gap-grid-wrapper">
        ${this.renderSummary()}
        ${this.renderControls()}
        ${this.renderTable()}
      </div>
    `;

    this.attachEventListeners();
  }

  /**
   * Render summary statistics panel
   * @returns {string} HTML for summary panel
   */
  renderSummary() {
    return `
      <div class="summary-panel">
        <div class="summary-card">
          <div class="summary-label">Weekly Opportunity</div>
          <div class="summary-value">$${this.summary.totalOpportunity.toLocaleString()}</div>
          <div class="summary-subtitle">Potential additional revenue</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Average Gap</div>
          <div class="summary-value">${this.summary.avgGap.toFixed(1)}%</div>
          <div class="summary-subtitle">Utilization vs. market leader</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Win Rate</div>
          <div class="summary-value">${this.summary.winRate.toFixed(1)}%</div>
          <div class="summary-subtitle">Time slots where PCC leads</div>
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
   * Render filter controls and export button
   * @returns {string} HTML for controls
   */
  renderControls() {
    return `
      <div class="grid-controls">
        <div class="filter-group">
          <label class="checkbox-item">
            <input type="checkbox" id="filter-prime" ${this.filters.primeOnly ? 'checked' : ''}>
            <span>Prime Time Only</span>
          </label>
          <label class="checkbox-item">
            <input type="checkbox" id="filter-opportunities" ${this.filters.opportunitiesOnly ? 'checked' : ''}>
            <span>Show Opportunities Only</span>
          </label>
        </div>
        <button id="export-gap-csv" class="btn-secondary">
          📥 Export to CSV
        </button>
      </div>
    `;
  }

  /**
   * Render data table
   * @returns {string} HTML for table
   */
  renderTable() {
    return `
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              ${this.renderHeader('timeSlot', 'Time Slot')}
              ${this.renderHeader('pccUtilization', 'PCC %')}
              ${this.renderHeader('marketMax', 'Market Max %')}
              ${this.renderHeader('gap', 'Gap')}
              ${this.renderHeader('opportunityScore', 'Opp. Score')}
              ${this.renderHeader('estRevenue', 'Est. Revenue')}
              ${this.renderHeader('topCompetitor', 'Top Competitor')}
            </tr>
          </thead>
          <tbody>
            ${this.filteredSlots.map(slot => this.renderRow(slot)).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Render table header cell with sort indicator
   * @param {string} column - Column name
   * @param {string} label - Display label
   * @returns {string} HTML for header cell
   */
  renderHeader(column, label) {
    let sortIcon = '↕';
    if (this.currentSort.column === column) {
      sortIcon = this.currentSort.direction === 'asc' ? '↑' : '↓';
    }

    return `
      <th data-sort="${column}" class="sortable-header">
        ${label} <span class="sort-icon">${sortIcon}</span>
      </th>
    `;
  }

  /**
   * Render table row for time slot
   * @param {Object} slot - Time slot data
   * @returns {string} HTML for table row
   */
  renderRow(slot) {
    const gapClass = this.getGapClass(slot.gap);
    const gapSign = slot.gap > 0 ? '+' : '';

    return `
      <tr class="data-row">
        <td class="cell-time"><strong>${slot.timeSlot}</strong></td>
        <td class="cell-number">${slot.pccUtilization}%</td>
        <td class="cell-number">${slot.marketMax}%</td>
        <td class="cell-number ${gapClass}">${gapSign}${slot.gap}%</td>
        <td class="cell-number">${slot.opportunityScore.toFixed(1)}</td>
        <td class="cell-number">$${slot.estRevenue.toLocaleString()}</td>
        <td class="cell-text">${slot.topCompetitor}</td>
      </tr>
    `;
  }

  /**
   * Attach all event listeners
   */
  attachEventListeners() {
    this.attachSortListeners();
    this.attachFilterListeners();
    this.attachExportListener();
  }

  /**
   * Attach sort listeners to table headers
   */
  attachSortListeners() {
    this.container.querySelectorAll('th[data-sort]').forEach(th => {
      th.addEventListener('click', () => {
        this.sortData(th.dataset.sort);
      });
    });
  }

  /**
   * Attach filter checkbox listeners
   */
  attachFilterListeners() {
    const primeCheckbox = document.getElementById('filter-prime');
    const oppCheckbox = document.getElementById('filter-opportunities');

    if (primeCheckbox) {
      primeCheckbox.addEventListener('change', (e) => {
        this.filters.primeOnly = e.target.checked;
        this.applyFilters();
      });
    }

    if (oppCheckbox) {
      oppCheckbox.addEventListener('change', (e) => {
        this.filters.opportunitiesOnly = e.target.checked;
        this.applyFilters();
      });
    }
  }

  /**
   * Attach CSV export listener
   */
  attachExportListener() {
    const exportBtn = document.getElementById('export-gap-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportToCSV());
    }
  }

  /**
   * Export filtered data to CSV
   */
  exportToCSV() {
    const headers = [
      'Time Slot',
      'PCC %',
      'Market Max %',
      'Gap',
      'Opportunity Score',
      'Est. Revenue',
      'Top Competitor'
    ];

    const rows = this.filteredSlots.map(slot => [
      slot.timeSlot,
      slot.pccUtilization,
      slot.marketMax,
      slot.gap,
      slot.opportunityScore.toFixed(1),
      slot.estRevenue,
      slot.topCompetitor
    ]);

    let csvContent = headers.join(',') + '\n';
    csvContent += rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pcc-gap-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`Exported ${this.filteredSlots.length} time slots to CSV`);
  }
}
