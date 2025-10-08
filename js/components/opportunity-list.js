// PCC Yield Optimizer - Opportunity List Component
// Displays prioritized list of opportunities with filtering and sorting

class OpportunityListComponent {
  /**
   * Create a new opportunity list component
   * @param {string} containerId - ID of container element
   * @param {Array} allFacilitiesData - Array of {facility, popularTimes} for all facilities
   */
  constructor(containerId, allFacilitiesData) {
    this.container = document.getElementById(containerId);
    this.allFacilitiesData = allFacilitiesData;
    this.opportunities = [];
    this.filteredOpportunities = [];

    if (!this.container) {
      console.error(`Container with ID '${containerId}' not found`);
      return;
    }

    // Show skeleton while generating opportunities
    this.showSkeleton();

    // Simulate async processing
    setTimeout(() => {
      this.generateOpportunities();
      this.hideSkeleton();
    }, 150);
  }

  /**
   * Show skeleton loader while opportunities are being generated
   */
  showSkeleton() {
    this.container.setAttribute('data-loading', 'true');

    const skeletonHTML = `
      <div class="skeleton-container">
        <div class="loading-message">Analyzing opportunities...</div>
        ${this.renderSkeletonCards(5)}
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
   * Render skeleton opportunity cards
   * @param {number} count - Number of skeleton cards to show
   * @returns {string} HTML for skeleton cards
   */
  renderSkeletonCards(count) {
    let html = '';
    for (let i = 0; i < count; i++) {
      html += `
        <div class="opportunity-skeleton">
          <div class="opportunity-skeleton-header">
            <div class="opportunity-skeleton-title"></div>
            <div class="opportunity-skeleton-score"></div>
          </div>
          <div class="opportunity-skeleton-details">
            <div class="opportunity-skeleton-line"></div>
            <div class="opportunity-skeleton-line"></div>
            <div class="opportunity-skeleton-line"></div>
          </div>
        </div>
      `;
    }
    return html;
  }

  /**
   * Generate all opportunities from facility data
   */
  generateOpportunities() {
    const pccData = this.allFacilitiesData.find(({ facility }) => facility.id === 'pcc');

    if (!pccData) {
      console.error('PCC data not found');
      return;
    }

    const competitors = this.allFacilitiesData.filter(({ facility }) => facility.id !== 'pcc');

    // For each day
    pccData.popularTimes.weeklyData.forEach((dayData, dayIndex) => {
      // For each hour
      dayData.hourly.forEach(hourData => {
        // Get competitor data for this time slot
        const competitorData = competitors.map(({ facility, popularTimes }) => {
          const compDay = popularTimes.weeklyData[dayIndex];
          const compHour = compDay.hourly.find(h => h.hour === hourData.hour);
          return {
            id: facility.id,
            name: facility.name,
            popularity: compHour ? compHour.popularity : 0
          };
        });

        // Calculate opportunity
        const opp = calculateOpportunityScore(
          hourData.popularity,
          competitorData,
          dayData.day,
          hourData.hour
        );

        // Only include if there's a meaningful opportunity (score >= 3)
        if (opp.level !== 'none' && opp.score >= 3) {
          this.opportunities.push({
            day: dayData.day,
            hour: hourData.hour,
            dayOfWeek: this.getDayOfWeekNumber(dayData.day),
            ...opp,
            recommendation: this.generateRecommendation(dayData.day, hourData.hour, opp)
          });
        }
      });
    });

    this.filteredOpportunities = [...this.opportunities];
    console.log(`Generated ${this.opportunities.length} opportunities`);
  }

  /**
   * Get day of week number for sorting
   * @param {string} day - Day name
   * @returns {number} Day number (0=Sunday, 6=Saturday)
   */
  getDayOfWeekNumber(day) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days.indexOf(day.toLowerCase());
  }

  /**
   * Generate actionable recommendation based on context
   * @param {string} day - Day name
   * @param {number} hour - Hour (0-23)
   * @param {Object} opp - Opportunity object
   * @returns {string} Recommendation text
   */
  generateRecommendation(day, hour, opp) {
    const dayName = formatDay(day);
    const timeSlot = formatHour(hour);
    const dayLower = day.toLowerCase();

    // Weekend morning opportunities (9am-1pm)
    if ((dayLower === 'saturday' || dayLower === 'sunday') && hour >= 9 && hour <= 13) {
      return `Launch "${dayName} Social League" at ${timeSlot}. Partner with local café for brunch package. Target: ${opp.estimatedCustomers} customers.`;
    }

    // Weeknight prime time (6pm-8pm)
    if (dayLower !== 'saturday' && dayLower !== 'sunday' && hour >= 18 && hour <= 20) {
      return `Create "${dayName} Competitive Night" at ${timeSlot}. Host skill-based tournament. Target: ${opp.estimatedCustomers} serious players.`;
    }

    // Weekday daytime (10am-2pm)
    if (dayLower !== 'saturday' && dayLower !== 'sunday' && hour >= 10 && hour <= 14) {
      return `Offer "Lunch Break Pickleball" on ${dayName} at ${timeSlot}. Target downtown workers. Promote parking advantage over SPF.`;
    }

    // Weekend evening
    if ((dayLower === 'saturday' || dayLower === 'sunday') && hour >= 17 && hour <= 20) {
      return `Host "${dayName} Doubles Night" at ${timeSlot}. Create social mixer format. Target: ${opp.estimatedCustomers} social players.`;
    }

    // Early morning (6am-8am)
    if (hour >= 6 && hour <= 8) {
      return `Launch "Morning Warriors" program at ${timeSlot} on ${dayName}. Target fitness-focused players. Market gap: ${opp.gap}%.`;
    }

    // Default recommendation
    return `Schedule special programming for ${dayName} at ${timeSlot}. Market gap of ${opp.gap}% vs. busiest competitor. Estimated opportunity: ${opp.estimatedCustomers} customers.`;
  }

  /**
   * Render the opportunity list with filters and sorting
   * @param {string} sortBy - Sort criteria
   * @param {Object} filters - Filter options
   */
  render(sortBy = 'score', filters = {}) {
    // Apply filters
    this.filteredOpportunities = this.opportunities.filter(opp => {
      if (filters.minScore && opp.score < filters.minScore) return false;

      if (filters.dayFilter === 'weekday') {
        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        if (!weekdays.includes(opp.day.toLowerCase())) return false;
      }

      if (filters.dayFilter === 'weekend') {
        const weekends = ['saturday', 'sunday'];
        if (!weekends.includes(opp.day.toLowerCase())) return false;
      }

      return true;
    });

    // Apply sorting
    this.filteredOpportunities.sort((a, b) => {
      switch(sortBy) {
        case 'score':
          return b.score - a.score;
        case 'customers':
          return b.estimatedCustomers - a.estimatedCustomers;
        case 'gap':
          return b.gap - a.gap;
        case 'day':
          return a.dayOfWeek - b.dayOfWeek || a.hour - b.hour;
        case 'time':
          return a.hour - b.hour || a.dayOfWeek - b.dayOfWeek;
        default:
          return b.score - a.score;
      }
    });

    // Clear container
    this.container.innerHTML = '';

    // Show count banner
    this.renderCountBanner();

    // Render cards
    if (this.filteredOpportunities.length === 0) {
      // Show enhanced empty state
      const emptyState = EmptyStatePresets.noOpportunities();
      this.container.innerHTML += emptyState.render();

      // Attach event listeners
      const emptyStateEl = this.container.querySelector('.empty-state');
      emptyState.attachEventListeners(emptyStateEl.parentElement);
    } else {
      this.filteredOpportunities.forEach(opp => {
        const card = this.createOpportunityCard(opp);
        this.container.appendChild(card);
      });
    }
  }

  /**
   * Render count banner showing total opportunities and customers
   */
  renderCountBanner() {
    const totalCustomers = this.filteredOpportunities.reduce((sum, o) => sum + o.estimatedCustomers, 0);

    const banner = document.createElement('div');
    banner.style.cssText = 'padding: 12px 16px; background: #F0F9FF; border-radius: 6px; margin-bottom: 16px; font-size: 14px;';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <strong>${this.filteredOpportunities.length}</strong> opportunities found
      <span style="color: #6B7280; margin-left: 8px;">
        • Est. <strong>${totalCustomers}</strong> potential customers
      </span>
    `;
    this.container.appendChild(banner);

    // Announce to screen readers
    if (typeof announceToScreenReader === 'function') {
      announceToScreenReader(
        `${this.filteredOpportunities.length} opportunities found with ${totalCustomers} potential customers`,
        'polite'
      );
    }
  }

  /**
   * Create opportunity card HTML element
   * @param {Object} opp - Opportunity object
   * @returns {HTMLElement} Card element
   */
  createOpportunityCard(opp) {
    const card = document.createElement('div');
    card.className = `opportunity-card ${opp.level}`;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');

    // Build accessible label
    const ariaLabel = `${opp.level} opportunity: ${formatDay(opp.day)} ${formatHour(opp.hour)}, score ${opp.score.toFixed(1)} out of 10. PCC at ${opp.pccUtilization}%, market peak ${opp.marketMax}%, gap ${opp.gap}%. Estimated ${opp.estimatedCustomers} customers. ${opp.busyCompetitors.length} busy competitors.`;
    card.setAttribute('aria-label', ariaLabel);

    // Get time of day badge
    const timeOfDay = opp.hour < 12 ? '🌅 Morning' : opp.hour < 17 ? '☀️ Afternoon' : '🌙 Evening';

    card.innerHTML = `
      <div class="opp-header">
        <div class="opp-title">
          <h3>${formatDay(opp.day)} ${formatHour(opp.hour)}</h3>
          <span class="opp-time-badge">${timeOfDay}</span>
        </div>
        <div class="opp-score">
          <div class="opp-score-value ${opp.level}">${opp.score.toFixed(1)}</div>
          <div class="opp-score-label">Score</div>
        </div>
      </div>

      <div class="opp-metrics">
        <div class="opp-metric">
          <div class="opp-metric-label">PCC Utilization</div>
          <div class="opp-metric-value">${opp.pccUtilization}%</div>
        </div>
        <div class="opp-metric">
          <div class="opp-metric-label">Market Peak</div>
          <div class="opp-metric-value">${opp.marketMax}%</div>
        </div>
        <div class="opp-metric">
          <div class="opp-metric-label">Gap</div>
          <div class="opp-metric-value" style="color: #10B981;">+${opp.gap}%</div>
        </div>
        <div class="opp-metric">
          <div class="opp-metric-label">Est. Customers</div>
          <div class="opp-metric-value">~${opp.estimatedCustomers}</div>
        </div>
      </div>

      <div class="opp-market-aggregate">
        <div class="aggregate-metric">
          <span class="metric-label">Market Avg:</span>
          <span class="metric-value">${opp.marketAvg ? opp.marketAvg.toFixed(1) : '—'}%</span>
        </div>
        <div class="aggregate-metric">
          <span class="metric-label">Total Competitors:</span>
          <span class="metric-value">${opp.totalCompetitors || 5}</span>
        </div>
      </div>

      <div class="opp-competitors">
        <div class="opp-competitors-label">🔥 Busy (>75%):</div>
        ${opp.busyCompetitors && opp.busyCompetitors.length > 0 ? opp.busyCompetitors.map(comp => `
          <span class="competitor-chip busy">
            ${comp.name} <span class="popularity">${comp.popularity}%</span>
          </span>
        `).join('') : '<span class="no-competitors">None</span>'}
      </div>

      ${opp.moderateCompetitors && opp.moderateCompetitors.length > 0 ? `
        <div class="opp-moderate-competitors">
          <div class="opp-competitors-label">🔶 Moderate (60-75%):</div>
          ${opp.moderateCompetitors.map(comp => `
            <span class="competitor-chip moderate">
              ${comp.name} <span class="popularity">${comp.popularity}%</span>
            </span>
          `).join('')}
        </div>
      ` : ''}

      <div class="opp-insight">
        💡 <strong>Recommendation:</strong> ${opp.recommendation}
      </div>

      <div class="opp-actions">
        <button class="btn-action-primary" onclick="alert('Event creation feature coming soon!')">
          📅 Create Event
        </button>
        <button class="btn-action-secondary" onclick="alert('Marketing campaign feature coming soon!')">
          📢 Launch Campaign
        </button>
      </div>
    `;

    return card;
  }

  /**
   * Export opportunities to CSV
   */
  exportToCSV() {
    const headers = [
      'Day',
      'Time',
      'Score',
      'Level',
      'PCC %',
      'Market Max %',
      'Gap %',
      'Est. Customers',
      'Busy Competitors',
      'Recommendation'
    ];

    const rows = this.filteredOpportunities.map(opp => [
      formatDay(opp.day),
      formatHour(opp.hour),
      opp.score.toFixed(1),
      opp.level.toUpperCase(),
      opp.pccUtilization,
      opp.marketMax,
      opp.gap,
      opp.estimatedCustomers,
      opp.busyCompetitors.map(c => `${c.name} (${c.popularity}%)`).join('; '),
      opp.recommendation
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pcc-opportunities-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`Exported ${this.filteredOpportunities.length} opportunities to CSV`);
  }

  /**
   * Export opportunities to PDF Report
   */
  async exportToPDF() {
    if (typeof exportOpportunitiesToPDF !== 'function') {
      console.error('exportOpportunitiesToPDF function not found');
      return;
    }

    // Get current filter settings
    const filters = {
      dayFilter: document.getElementById('filterDay')?.value || 'all',
      minScore: parseFloat(document.getElementById('minScore')?.value || 0),
      sortBy: document.getElementById('sortOpportunities')?.value || 'score'
    };

    // Prepare opportunities with all required fields
    const opportunitiesForExport = this.filteredOpportunities.map(opp => ({
      timeSlot: `${formatDay(opp.day)} ${formatHour(opp.hour)}`,
      score: opp.score,
      level: opp.level,
      pccUtilization: opp.pccUtilization,
      marketMax: opp.marketMax,
      gap: opp.gap,
      estimatedCustomers: opp.estimatedCustomers,
      busyCompetitors: opp.busyCompetitors.length,
      segments: opp.segments || ['General customers'],
      recommendations: [
        opp.recommendation,
        'Monitor competitor pricing and adjust accordingly',
        'Track conversion rates and adjust strategy'
      ]
    }));

    await exportOpportunitiesToPDF(opportunitiesForExport, filters);
  }
}
