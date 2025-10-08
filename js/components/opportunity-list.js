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

        // Skip closed hours (PCC utilization = 0% means facility is closed)
        // Can't capture opportunities when closed!
        if (hourData.popularity === 0) {
          return; // Skip this hour
        }

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

      // Attach event listeners to action buttons using event delegation
      this.attachActionListeners();
    }
  }

  /**
   * Attach event listeners to action buttons
   */
  attachActionListeners() {
    // Remove previous listeners if any
    if (this.actionClickHandler) {
      this.container.removeEventListener('click', this.actionClickHandler);
    }

    // Use event delegation for action buttons
    this.actionClickHandler = (e) => {
      const button = e.target.closest('[data-action]');
      if (!button) return;

      const action = button.dataset.action;
      const dayIndex = parseInt(button.dataset.day);
      const hour = parseInt(button.dataset.hour);

      this.handleAction(action, dayIndex, hour);
    };

    this.container.addEventListener('click', this.actionClickHandler);
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
        <button class="btn-action-primary" data-action="create-event" data-day="${opp.dayOfWeek}" data-hour="${opp.hour}">
          📅 Create Event
        </button>
        <button class="btn-action-secondary" data-action="launch-campaign" data-day="${opp.dayOfWeek}" data-hour="${opp.hour}">
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
   * Determine event type based on time of day
   */
  determineEventType(hour, dayIndex) {
    const isWeekend = dayIndex === 0 || dayIndex === 6;

    if (hour >= 6 && hour < 10) return "Morning Clinic & Drills";
    if (hour >= 10 && hour < 14) {
      return isWeekend ? "Weekend Tournament" : "Midday Social League";
    }
    if (hour >= 14 && hour < 18) return "Afternoon Intermediate Clinic";
    if (hour >= 18 && hour < 22) return "Prime Time League Night";
    return "Late Night Open Play";
  }

  /**
   * Determine event capacity based on opportunity score
   */
  determineEventCapacity(opportunityScore) {
    if (opportunityScore >= 7) return 32;
    if (opportunityScore >= 4) return 20;
    return 12;
  }

  /**
   * Calculate event revenue
   */
  calculateEventRevenue(capacity, hour) {
    const pricePerPerson = (hour >= 17 && hour < 22) ? 35 : 25; // prime time premium
    return capacity * pricePerPerson;
  }

  /**
   * Determine campaign type based on opportunity score
   */
  determineCampaignType(opportunityScore) {
    if (opportunityScore >= 8) return "Competitive Steal Campaign";
    if (opportunityScore >= 5) return "Last-Minute Fill Campaign";
    return "Awareness Building Campaign";
  }

  /**
   * Get day name from index
   */
  getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  /**
   * Format hour for display
   */
  formatHour(hour) {
    const ampm = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}${ampm}`;
  }

  /**
   * Handle action button clicks
   */
  handleAction(action, dayIndex, hour) {
    console.log(`Action triggered: ${action} for ${this.getDayName(dayIndex)} ${hour}:00`);

    // Find the opportunity data for this time slot
    const opportunity = this.opportunities.find(o => o.dayOfWeek === dayIndex && o.hour === hour);
    if (!opportunity) {
      console.error('Opportunity data not found for this time slot');
      return;
    }

    switch (action) {
      case 'create-event':
        const eventType = this.determineEventType(hour, dayIndex);
        const capacity = this.determineEventCapacity(opportunity.score);
        const pricePerPerson = (hour >= 17 && hour < 22) ? 35 : 25;
        const revenue = this.calculateEventRevenue(capacity, hour);
        const timeSlot = `${this.getDayName(dayIndex)} ${this.formatHour(hour)}`;

        const eventContent = `
          <div style="text-align: left;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div>
                <p style="margin: 4px 0;"><strong>Event Type:</strong><br>${eventType}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Time:</strong><br>${timeSlot}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Duration:</strong><br>2 hours</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Participants:</strong><br>${capacity} players</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Price:</strong><br>$${pricePerPerson} per person</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Est. Revenue:</strong><br>$${revenue.toLocaleString()}</p>
              </div>
            </div>
            <div style="background: #F3F4F6; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
              <p style="margin: 0; font-size: 14px;"><strong>Competitive Insight:</strong><br>
                ${opportunity.busyCompetitors && opportunity.busyCompetitors.length > 0
                  ? `High demand at: ${opportunity.busyCompetitors.map(c => `${c.name} (${c.utilization}%)`).join(', ')}`
                  : 'Market gap opportunity - competitors have moderate demand'}
              </p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Target Audience:</p>
              <p style="margin: 0; font-size: 14px;">${opportunity.segments ? opportunity.segments.join(', ') : 'General Audience'}</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Strategic Recommendation:</p>
              <p style="margin: 0; font-size: 14px;">${opportunity.recommendation}</p>
            </div>
            <hr style="margin: 16px 0; border: 0; border-top: 1px solid #E5E7EB;">
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Event would be created in your calendar system</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Booking page would be generated</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Email notifications would be sent</p>
          </div>
        `;

        this.showDemoModal('Create Event', eventContent, opportunity);
        break;

      case 'launch-campaign':
        const campaignType = this.determineCampaignType(opportunity.score);
        const discount = opportunity.score >= 8 ? 15 : opportunity.score >= 5 ? 20 : 25;
        const topCompetitors = opportunity.busyCompetitors && opportunity.busyCompetitors.length > 0
          ? opportunity.busyCompetitors.slice(0, 2).map(c => c.name).join(', ')
          : 'Nearby facilities';
        const estimatedReach = opportunity.score >= 7 ? 1200 : opportunity.score >= 4 ? 800 : 500;
        const estimatedConversions = Math.round(estimatedReach * 0.01);
        const campaignTimeSlot = `${this.getDayName(dayIndex)} ${this.formatHour(hour)}`;

        const campaignContent = `
          <div style="text-align: left;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div>
                <p style="margin: 4px 0;"><strong>Campaign Type:</strong><br>${campaignType}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Target Time:</strong><br>${campaignTimeSlot}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Discount:</strong><br>${discount}% off</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Budget:</strong><br>$${opportunity.score >= 7 ? 150 : 100} ad spend</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Expected Reach:</strong><br>${estimatedReach.toLocaleString()} people</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Est. Conversions:</strong><br>${estimatedConversions}-${estimatedConversions + 4} bookings</p>
              </div>
            </div>
            <div style="background: #F3F4F6; padding: 12px; border-radius: 6px; margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Targeting:</p>
              <p style="margin: 0; font-size: 14px;"><strong>Competitors:</strong> ${topCompetitors}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Segments:</strong> ${opportunity.segments ? opportunity.segments.join(', ') : 'General Audience'}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Radius:</strong> 2 miles from PCC</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Channels:</p>
              <p style="margin: 0; font-size: 14px;">Email, Instagram Ads, Google Ads</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Strategic Recommendation:</p>
              <p style="margin: 0; font-size: 14px;">${opportunity.recommendation}</p>
            </div>
            <hr style="margin: 16px 0; border: 0; border-top: 1px solid #E5E7EB;">
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Campaign would be scheduled</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Promotional emails would be sent 2 hours before</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Conversion tracking would be enabled</p>
          </div>
        `;

        this.showDemoModal('Launch Campaign', campaignContent, opportunity);
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  /**
   * Show a styled demo modal (for investor demo)
   */
  showDemoModal(title, content, opportunityData = null) {
    const modal = document.createElement('div');
    modal.className = 'error-overlay';
    modal.style.cssText = `
      z-index: 10000;
      background: rgba(0, 0, 0, 0.7);
    `;

    // Determine opportunity score badge color
    let opportunityBadgeColor = '#6B7280'; // default gray
    let opportunityScore = 'N/A';

    if (opportunityData && opportunityData.score !== undefined) {
      opportunityScore = opportunityData.score.toFixed(1);
      if (opportunityData.score >= 7) {
        opportunityBadgeColor = '#10B981'; // green for high opportunity
      } else if (opportunityData.score >= 4) {
        opportunityBadgeColor = '#F59E0B'; // yellow for medium
      }
    }

    modal.innerHTML = `
      <div class="error-overlay-content" style="max-width: 600px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="error-overlay-icon" style="margin: 0;">✨</div>
            <h2 class="error-overlay-title" style="margin: 0;">${title}</h2>
          </div>
          ${opportunityData && opportunityData.score !== undefined ? `
            <span style="background: ${opportunityBadgeColor}; color: white; padding: 6px 14px; border-radius: 16px; font-size: 13px; font-weight: 600; white-space: nowrap;">
              Score: ${opportunityScore}/10
            </span>
          ` : ''}
        </div>
        <div style="margin-bottom: 24px;">
          ${content}
        </div>
        <button class="btn-primary" onclick="this.closest('.error-overlay').remove()">
          Got it!
        </button>
        <p style="margin-top: 16px; font-size: 12px; color: #6B7280;">
          <em>Demo Mode: This is a preview of functionality</em>
        </p>
      </div>
    `;
    document.body.appendChild(modal);

    // Auto-remove on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Close on ESC
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
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
