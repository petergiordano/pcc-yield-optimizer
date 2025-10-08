// PCC Yield Optimizer - Detailed Analysis Panel Component
// Slide-in panel providing deep competitive analysis and actionable recommendations

class AnalysisPanelComponent {
  /**
   * Create a new analysis panel
   * @param {string} containerId - ID of panel container element
   * @param {Array} facilitiesData - Array of {facility, popularTimes} for all facilities
   */
  constructor(containerId, facilitiesData) {
    this.container = document.getElementById(containerId);
    this.facilitiesData = facilitiesData;
    this.chart = null; // Chart.js instance
    this.currentTimeSlot = null;
    this.focusTrap = null; // FocusTrap instance

    if (!this.container) {
      console.error(`Panel container with ID '${containerId}' not found`);
      return;
    }

    // Create the panel structure once
    this.container.innerHTML = `
      <div class="modal-panel">
        <div class="modal-header-container"></div>
        <div class="modal-body-container"></div>
      </div>
    `;

    this.panel = this.container.querySelector('.modal-panel');
    this.headerContainer = this.container.querySelector('.modal-header-container');
    this.bodyContainer = this.container.querySelector('.modal-body-container');

    // Initialize FocusTrap if available
    if (typeof FocusTrap !== 'undefined') {
      this.focusTrap = new FocusTrap(this.panel);
    }

    this.attachEventListeners();
    console.log('Analysis panel initialized');
  }

  /**
   * Open the panel for a specific time slot
   * @param {number} dayIndex - Day index (0=Sunday, 6=Saturday)
   * @param {number} hour - Hour (0-23)
   * @param {string} facilityId - Facility ID (defaults to 'pcc')
   */
  open(dayIndex, hour, facilityId = 'pcc') {
    this.currentTimeSlot = { dayIndex, hour, facilityId };

    // Hide all Tippy tooltips to prevent stacking
    if (window.tippy && window.tippy.hideAll) {
      window.tippy.hideAll({duration: 0});
    }

    // Load and render content
    const data = this.loadTimeSlotData(dayIndex, hour);
    this.render(data);

    // Show panel with animation
    this.container.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    document.body.classList.add('modal-open'); // For accessibility CSS

    // Activate focus trap
    if (this.focusTrap) {
      setTimeout(() => {
        this.focusTrap.activate(true); // Auto-focus first element
      }, 100); // Small delay to allow panel animation to start
    }

    // Announce to screen reader
    if (typeof announceToScreenReader === 'function') {
      const dayName = this.getDayName(dayIndex);
      announceToScreenReader(`Opened detailed analysis for ${dayName} ${hour}:00`, 'assertive');
    }

    console.log(`Opened analysis panel for ${this.getDayName(dayIndex)} ${hour}:00`);
  }

  /**
   * Close the panel
   */
  close() {
    // Deactivate focus trap
    if (this.focusTrap) {
      this.focusTrap.deactivate(); // Returns focus to previously focused element
    }

    this.container.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    document.body.classList.remove('modal-open'); // Remove accessibility class

    // Destroy chart if it exists
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    // Announce to screen reader
    if (typeof announceToScreenReader === 'function') {
      announceToScreenReader('Closed analysis panel', 'polite');
    }

    console.log('Closed analysis panel');
  }

  /**
   * Load data for the specified time slot
   * @param {number} dayIndex - Day index (0=Sunday, 6=Saturday)
   * @param {number} hour - Hour (0-23)
   * @returns {Object} - Aggregated time slot data
   */
  loadTimeSlotData(dayIndex, hour) {
    const dayName = this.getDayName(dayIndex);

    // Convert JS day index (0=Sun) to data file index (0=Mon)
    // JS: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
    // Data: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
    const dataIndex = dayIndex === 0 ? 6 : dayIndex - 1;

    // Get PCC data
    const pccData = this.facilitiesData.find(f => f.facility.id === 'pcc');
    const pccHour = pccData.popularTimes.weeklyData[dataIndex].hourly[hour];
    const pccUtilization = pccHour.popularity;

    // Get all competitor data for this time slot
    const competitors = this.facilitiesData
      .filter(f => f.facility.id !== 'pcc')
      .map(({ facility, popularTimes }) => {
        const hourData = popularTimes.weeklyData[dataIndex].hourly[hour];
        return {
          id: facility.id,
          name: facility.name,
          popularity: hourData.popularity,
          estimatedCustomers: Math.round((hourData.popularity / 100) * facility.courts * 4) // 4 players per court
        };
      });

    // Calculate opportunity score using existing utility
    const opportunity = calculateOpportunityScore(pccUtilization, competitors, dayName, hour);

    // Get customer segmentation based on time
    const segments = this.getCustomerSegments(dayIndex, hour);

    // Get geographic data
    const geography = this.getGeographicData();

    // Get accessibility comparison
    const accessibility = this.getAccessibilityData();

    // Get competitive advantages
    const advantages = this.getCompetitiveAdvantages(competitors);

    // Generate recommendations
    const recommendations = this.generateRecommendations(dayIndex, hour, opportunity, segments, advantages);

    return {
      timeSlot: `${dayName} ${this.formatHour(hour)}`,
      dayIndex,
      hour,
      pccUtilization,
      opportunity,
      competitors,
      segments,
      geography,
      accessibility,
      advantages,
      recommendations
    };
  }

  /**
   * Render the panel with loaded data
   * @param {Object} data - Time slot data
   */
  render(data) {
    this.headerContainer.innerHTML = this.renderHeader(data);
    this.bodyContainer.innerHTML = `
      <div class="modal-body">
        ${this.renderCompetitiveAnalysis(data)}
        ${this.renderWhoSection(data)}
        ${this.renderWhereSection(data)}
        ${this.renderHowSection(data)}
        ${this.renderWhySection(data)}
        ${this.renderRecommendations(data)}
      </div>
    `;

    // Attach section-specific event listeners
    this.attachSectionListeners();

    // Render Chart.js pie chart
    setTimeout(() => {
      this.renderSegmentChart(data.segments);
    }, 100);
  }

  /**
   * Render header section
   */
  renderHeader(data) {
    const { timeSlot, opportunity, pccUtilization } = data;
    const badgeClass = `badge-${opportunity.level}`;

    return `
      <div class="modal-header">
        <div class="header-content">
          <h2>${timeSlot} Analysis</h2>
          <div class="header-meta">
            <span class="utilization-badge">PCC: ${pccUtilization}%</span>
            <span class="badge ${badgeClass}">
              Score: ${opportunity.score}/10 - ${opportunity.level.toUpperCase()}
            </span>
          </div>
        </div>
        <button class="modal-close" aria-label="Close panel">&times;</button>
      </div>
      <div class="quick-actions">
        <button class="btn-action-primary" data-action="create-event">
          📅 Create Event
        </button>
        <button class="btn-action-secondary" data-action="launch-promotion">
          📢 Launch Promotion
        </button>
        <button class="btn-action-secondary" data-action="dismiss">
          Dismiss
        </button>
      </div>
    `;
  }

  /**
   * Render competitive analysis section
   */
  renderCompetitiveAnalysis(data) {
    const { competitors, opportunity } = data;
    const totalMarketDemand = competitors.reduce((sum, c) => sum + c.estimatedCustomers, 0);
    const pccShare = totalMarketDemand > 0
      ? Math.round((data.pccUtilization / (data.pccUtilization + competitors.reduce((sum, c) => sum + c.popularity, 0) / competitors.length)) * 100)
      : 0;

    const competitorCards = competitors
      .sort((a, b) => b.popularity - a.popularity)
      .map(comp => {
        const icon = comp.popularity > 80 ? '🔥' : comp.popularity > 60 ? '⚠️' : '📊';
        const statusText = comp.popularity > 80 ? 'CAPACITY' : comp.popularity > 60 ? 'BUSY' : 'MODERATE';

        return `
          <div class="competitor-card ${comp.popularity > 75 ? 'busy' : ''}">
            <div class="competitor-header">
              <span class="competitor-icon">${icon}</span>
              <div class="competitor-info">
                <h4>${comp.name}</h4>
                <span class="competitor-status">${statusText}</span>
              </div>
              <div class="competitor-metrics">
                <div class="metric-large">${comp.popularity}%</div>
                <div class="metric-label">Utilization</div>
              </div>
            </div>
            <div class="competitor-estimate">
              Est. ${comp.estimatedCustomers} customers
            </div>
          </div>
        `;
      }).join('');

    return `
      <section class="panel-section">
        <h3 class="section-title">
          <span class="section-icon">📊</span>
          Competitive Analysis
        </h3>
        <div class="section-content">
          <div class="market-summary">
            <div class="summary-stat">
              <div class="stat-value">${totalMarketDemand}</div>
              <div class="stat-label">Total Market Demand</div>
            </div>
            <div class="summary-stat">
              <div class="stat-value">${pccShare}%</div>
              <div class="stat-label">PCC's Market Share</div>
            </div>
            <div class="summary-stat">
              <div class="stat-value">${opportunity.busyCompetitors?.length || 0}</div>
              <div class="stat-label">Busy Competitors</div>
            </div>
          </div>

          <div class="competitors-list">
            ${competitorCards}
          </div>

          ${opportunity.level !== 'none' ? `
            <div class="insight-box">
              <strong>💡 Insight:</strong> ${getOpportunityInsight(opportunity)}
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }

  /**
   * Render WHO section (customer segmentation)
   */
  renderWhoSection(data) {
    const { segments } = data;
    const matchScore = this.calculateSegmentMatch(segments);

    return `
      <section class="panel-section">
        <h3 class="section-title">
          <span class="section-icon">👥</span>
          WHO - Customer Segmentation
        </h3>
        <div class="section-content">
          <div class="segment-chart-container">
            <canvas id="segment-chart" width="300" height="300"></canvas>
          </div>

          <div class="segment-match">
            <div class="match-score ${matchScore > 70 ? 'high' : matchScore > 50 ? 'medium' : 'low'}">
              <div class="match-value">${matchScore}%</div>
              <div class="match-label">Match with PCC Target Audience</div>
            </div>
            ${matchScore > 70 ? '<div class="match-indicator">✅ This is YOUR audience!</div>' : ''}
          </div>

          <div class="persona-card">
            <h4>${segments.primaryPersona.title}</h4>
            <div class="persona-details">
              <div class="persona-row">
                <strong>Age:</strong> ${segments.primaryPersona.age}
              </div>
              <div class="persona-row">
                <strong>Income:</strong> ${segments.primaryPersona.income}
              </div>
              <div class="persona-row">
                <strong>Values:</strong> ${segments.primaryPersona.values}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render WHERE section (geography)
   */
  renderWhereSection(data) {
    const { geography } = data;

    return `
      <section class="panel-section collapsible">
        <h3 class="section-title">
          <span class="section-icon">📍</span>
          WHERE - Geographic Proximity
        </h3>
        <div class="section-content">
          <div class="geo-stats">
            <div class="geo-stat">
              <div class="geo-icon">🏠</div>
              <div class="geo-info">
                <div class="geo-value">${geography.membersWithinRadius}%</div>
                <div class="geo-label">Live within 3 miles of PCC</div>
              </div>
            </div>
            <div class="geo-stat">
              <div class="geo-icon">🚗</div>
              <div class="geo-info">
                <div class="geo-value">${geography.avgDriveToPCC} min</div>
                <div class="geo-label">Avg drive time to PCC</div>
              </div>
            </div>
            <div class="geo-stat">
              <div class="geo-icon">🎯</div>
              <div class="geo-info">
                <div class="geo-value">${geography.catchmentOverlap}%</div>
                <div class="geo-label">Catchment overlap with SPF</div>
              </div>
            </div>
          </div>

          <div class="geo-note">
            <small>Geographic data based on member density analysis and catchment modeling</small>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render HOW section (accessibility)
   */
  renderHowSection(data) {
    const { accessibility } = data;

    return `
      <section class="panel-section collapsible">
        <h3 class="section-title">
          <span class="section-icon">🚇</span>
          HOW - Accessibility Comparison
        </h3>
        <div class="section-content">
          <div class="accessibility-grid">
            <div class="access-category">
              <h4>🚇 Transit</h4>
              ${accessibility.transit.map(item => `
                <div class="access-item ${item.advantage ? 'advantage' : ''}">
                  ${item.advantage ? '✅' : '➖'} ${item.text}
                </div>
              `).join('')}
            </div>

            <div class="access-category">
              <h4>🅿️ Parking</h4>
              ${accessibility.parking.map(item => `
                <div class="access-item ${item.advantage ? 'advantage' : ''}">
                  ${item.advantage ? '✅' : '❌'} ${item.text}
                </div>
              `).join('')}
            </div>

            <div class="access-category">
              <h4>🚲 Bike & Other</h4>
              ${accessibility.other.map(item => `
                <div class="access-item ${item.advantage ? 'advantage' : ''}">
                  ${item.advantage ? '✅' : '➖'} ${item.text}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render WHY section (competitive advantages)
   */
  renderWhySection(data) {
    const { advantages } = data;

    return `
      <section class="panel-section collapsible">
        <h3 class="section-title">
          <span class="section-icon">⚡</span>
          WHY - Competitive Advantages
        </h3>
        <div class="section-content">
          <div class="advantages-comparison">
            <div class="advantages-column">
              <h4>What Competitors Have</h4>
              <ul class="advantages-list">
                ${advantages.competitorAdvantages.map(adv => `
                  <li>✅ ${adv}</li>
                `).join('')}
              </ul>
            </div>

            <div class="advantages-column highlight">
              <h4>What PCC Can Leverage</h4>
              <ul class="advantages-list">
                ${advantages.pccAdvantages.map(adv => `
                  <li>✅ ${adv}</li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render recommendations section
   */
  renderRecommendations(data) {
    const { recommendations } = data;

    const recommendationCards = recommendations.map((rec, index) => `
      <div class="recommendation-card confidence-${rec.confidence.toLowerCase()}">
        <div class="rec-header">
          <span class="rec-number">${index + 1}</span>
          <h4>${rec.title}</h4>
          <span class="confidence-badge badge-${rec.confidence.toLowerCase()}">${rec.confidence}</span>
        </div>
        <ul class="rec-details">
          ${rec.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
        <button class="btn-recommendation" data-action="${rec.action}">
          ${rec.actionButton}
        </button>
      </div>
    `).join('');

    return `
      <section class="panel-section">
        <h3 class="section-title">
          <span class="section-icon">🎯</span>
          Recommended Actions
        </h3>
        <div class="section-content">
          <div class="recommendations-list">
            ${recommendationCards}
          </div>
        </div>
      </section>
    `;
  }

  /**
   * Render Chart.js pie chart for customer segments
   */
  renderSegmentChart(segments) {
    const canvas = document.getElementById('segment-chart');
    if (!canvas) return;

    // Destroy existing chart if any
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = canvas.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Social Players', 'Competitive', 'Families'],
        datasets: [{
          data: [
            segments.social,
            segments.competitive,
            segments.families
          ],
          backgroundColor: [
            '#10B981', // Green for social
            '#F59E0B', // Amber for competitive
            '#3B82F6'  // Blue for families
          ],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13,
                family: 'system-ui'
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
  }

  /**
   * Get customer segments based on time of day
   */
  getCustomerSegments(dayIndex, hour) {
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    const isWeekday = !isWeekend;

    let social, competitive, families;
    let primaryPersona;

    // Weekday morning (6-9am)
    if (isWeekday && hour >= 6 && hour < 9) {
      competitive = 70;
      social = 20;
      families = 10;
      primaryPersona = {
        title: "Early Bird Competitors",
        age: "25-45",
        income: "$80K+",
        values: "Fitness, competition, routine"
      };
    }
    // Weekday midday (11am-2pm)
    else if (isWeekday && hour >= 11 && hour < 14) {
      social = 50;
      competitive = 30;
      families = 20;
      primaryPersona = {
        title: "Lunch Break Social Players",
        age: "28-50",
        income: "$70K+",
        values: "Flexibility, networking, wellness"
      };
    }
    // Weekend morning/afternoon (10am-2pm)
    else if (isWeekend && hour >= 10 && hour < 14) {
      social = 60;
      competitive = 10;
      families = 30;
      primaryPersona = {
        title: "Social Sunday Brunch Players",
        age: "28-42",
        income: "$75K+",
        values: "Community, Instagram moments, convenience"
      };
    }
    // Weekday evening (5-9pm)
    else if (isWeekday && hour >= 17 && hour < 21) {
      competitive = 40;
      social = 40;
      families = 20;
      primaryPersona = {
        title: "After-Work League Players",
        age: "30-55",
        income: "$75K+",
        values: "Competition, decompression, social connection"
      };
    }
    // Default
    else {
      social = 45;
      competitive = 35;
      families = 20;
      primaryPersona = {
        title: "General Recreation Players",
        age: "25-60",
        income: "$60K+",
        values: "Fun, fitness, social activity"
      };
    }

    return { social, competitive, families, primaryPersona };
  }

  /**
   * Calculate segment match score with PCC target audience
   */
  calculateSegmentMatch(segments) {
    // PCC target: 60% social, 30% competitive, 10% families
    const pccTarget = { social: 60, competitive: 30, families: 10 };

    // Calculate weighted match
    const socialDiff = Math.abs(segments.social - pccTarget.social);
    const competitiveDiff = Math.abs(segments.competitive - pccTarget.competitive);
    const familiesDiff = Math.abs(segments.families - pccTarget.families);

    const totalDiff = socialDiff + competitiveDiff + familiesDiff;
    const matchScore = Math.max(0, 100 - (totalDiff / 2));

    return Math.round(matchScore);
  }

  /**
   * Get geographic data
   */
  getGeographicData() {
    // Pull from map component's catchment analysis if available
    // For now, use realistic estimates
    return {
      membersWithinRadius: 68,
      avgDriveToPCC: 12,
      avgDriveToCompetitor: 15,
      catchmentOverlap: 47
    };
  }

  /**
   * Get accessibility comparison data
   */
  getAccessibilityData() {
    const pccFacility = this.facilitiesData.find(f => f.facility.id === 'pcc').facility;

    return {
      transit: [
        { text: `${pccFacility.transit.walkTime} min walk from ${pccFacility.transit.nearestStation}`, advantage: false },
        { text: "Brown Line serves location", advantage: true },
        { text: "Close to major bus routes", advantage: true }
      ],
      parking: [
        { text: "Free parking lot (45 spaces)", advantage: true },
        { text: "No parking stress or fees", advantage: true },
        { text: "Easy in/out access", advantage: true }
      ],
      other: [
        { text: "Bike racks available", advantage: true },
        { text: `Low traffic at this time`, advantage: true },
        { text: "Safe, well-lit area", advantage: true }
      ]
    };
  }

  /**
   * Get competitive advantages comparison
   */
  getCompetitiveAdvantages(competitors) {
    // Check if main competitor (SPF) has café
    const spf = this.facilitiesData.find(f => f.facility.id === 'spf');
    const hasCafe = spf?.facility.amenities.includes('cafe');

    const pcc = this.facilitiesData.find(f => f.facility.id === 'pcc').facility;

    return {
      competitorAdvantages: [
        "Full café with seating",
        "Established social media presence",
        "Closer to Brown Line station",
        "Longer operating history"
      ],
      pccAdvantages: [
        "Free parking (huge advantage)",
        `${pcc.courts} courts (larger facility)`,
        "Less crowded (shorter wait times)",
        "Newer equipment and facilities",
        "Flexible event space"
      ]
    };
  }

  /**
   * Generate recommendations based on context
   */
  generateRecommendations(dayIndex, hour, opportunity, segments, advantages) {
    const recommendations = [];
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    const dayName = this.getDayName(dayIndex);

    // Recommendation 1: Based on time/segment
    if (isWeekend && hour >= 10 && hour < 14 && segments.social > 50) {
      recommendations.push({
        title: `Launch "${dayName} Social League" ${this.formatHour(hour - 1)}-${this.formatHour(hour + 1)}`,
        details: [
          "Partner with local café (e.g., HotChocolate)",
          "Price: $35/person (play + coffee/pastry)",
          "Target: 40 customers per session",
          "Est. Revenue: $1,400/week",
          "Leverage Instagram for promotion"
        ],
        confidence: "HIGH",
        action: "create-event",
        actionButton: "📅 Create Event"
      });
    } else if (!isWeekend && hour >= 17 && hour < 21 && segments.competitive > 35) {
      recommendations.push({
        title: `Launch "After-Work Tournament Series" ${this.formatHour(hour)}`,
        details: [
          "Weekly competitive ladder",
          "Price: $25/person entry fee",
          "Target: 32 players (8 courts)",
          "Est. Revenue: $800/week",
          "Winner takes 50% of pot"
        ],
        confidence: "HIGH",
        action: "create-event",
        actionButton: "📅 Create Tournament"
      });
    }

    // Recommendation 2: Leverage parking advantage
    if (advantages.pccAdvantages.some(adv => adv.includes("parking"))) {
      recommendations.push({
        title: "Instagram Campaign: Highlight Free Parking",
        details: [
          "Target competitors' followers who mention parking issues",
          'Show parking lot + "No Stress" messaging',
          "Budget: $500/month",
          "Expected reach: 5,000 local players",
          "Include map/directions CTA"
        ],
        confidence: "MEDIUM",
        action: "launch-campaign",
        actionButton: "📢 Launch Campaign"
      });
    }

    // Recommendation 3: Dynamic pricing if high opportunity
    if (opportunity.level === 'high' && opportunity.gap > 40) {
      const discountPercent = 25;
      recommendations.push({
        title: `Flash Promotion: ${discountPercent}% Off This Time Slot`,
        details: [
          `Target: ${opportunity.estimatedCustomers} customers from overflow`,
          `Current: ${opportunity.pccUtilization}% utilization`,
          `Send push notification 2 hours before`,
          `Limited to first 20 bookings`,
          `Track conversion rate and adjust`
        ],
        confidence: "MEDIUM",
        action: "launch-promotion",
        actionButton: "🎉 Launch Promotion"
      });
    }

    return recommendations;
  }

  /**
   * Attach event listeners (called once in constructor)
   */
  attachEventListeners() {
    // Close button click (using event delegation)
    this.panel.addEventListener('click', (e) => {
      // Check if click is on close button or its children
      if (e.target.closest('.modal-close')) {
        this.close();
        return;
      }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.container.classList.contains('active')) {
        this.close();
      }
    });
  }

  /**
   * Attach section-specific event listeners
   */
  attachSectionListeners() {
    // Collapsible sections
    const sectionTitles = this.bodyContainer.querySelectorAll('.panel-section.collapsible .section-title');
    sectionTitles.forEach(title => {
      title.addEventListener('click', () => {
        const section = title.closest('.panel-section');
        section.classList.toggle('collapsed');
      });
    });

    // Action buttons
    const actionButtons = this.panel.querySelectorAll('[data-action]');
    actionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        this.handleAction(action);
      });
    });
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
   * Format competitor insight from competitors array
   */
  formatCompetitorInsight(competitors) {
    if (!competitors || competitors.length === 0) {
      return "Limited competitor data available at this time.";
    }

    const highDemand = competitors.filter(c => c.popularity > 80);
    if (highDemand.length > 0) {
      const names = highDemand.map(c => `${c.name} (${c.popularity}%)`).join(", ");
      return `High demand at: ${names}`;
    }

    // Sort without mutating original array
    const sorted = [...competitors].sort((a, b) => b.popularity - a.popularity);
    const topCompetitor = sorted[0];
    return `${topCompetitor.name} is at ${topCompetitor.popularity}% capacity.`;
  }

  /**
   * Handle action button clicks
   */
  handleAction(action) {
    console.log(`Action triggered: ${action}`);

    // Load current time slot data for contextual modal content
    const data = this.loadTimeSlotData(this.currentTimeSlot.dayIndex, this.currentTimeSlot.hour);

    switch (action) {
      case 'create-event':
        const eventType = this.determineEventType(data.hour, data.dayIndex);
        const capacity = this.determineEventCapacity(data.opportunity.score);
        const pricePerPerson = (data.hour >= 17 && data.hour < 22) ? 35 : 25;
        const revenue = this.calculateEventRevenue(capacity, data.hour);
        const primarySegment = data.segments.primaryPersona ? data.segments.primaryPersona.title : "General Audience";
        const competitorInsight = this.formatCompetitorInsight(data.competitors);

        const eventContent = `
          <div style="text-align: left;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div>
                <p style="margin: 4px 0;"><strong>Event Type:</strong><br>${eventType}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Time:</strong><br>${data.timeSlot}</p>
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
              <p style="margin: 0; font-size: 14px;"><strong>Competitive Insight:</strong><br>${competitorInsight}</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Target Audience:</p>
              <p style="margin: 0; font-size: 14px;">${primarySegment}</p>
            </div>
            ${data.recommendations && data.recommendations.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <p style="margin: 0 0 8px 0; font-weight: 600;">Strategic Recommendations:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                  ${data.recommendations.slice(0, 3).map(rec => `<li>${rec}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <hr style="margin: 16px 0; border: 0; border-top: 1px solid #E5E7EB;">
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Event would be created in your calendar system</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Booking page would be generated</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Email notifications would be sent</p>
          </div>
        `;

        this.showDemoModal('Create Event', eventContent, data);
        break;

      case 'launch-promotion':
      case 'launch-campaign':
        const campaignType = this.determineCampaignType(data.opportunity.score);
        const discount = data.opportunity.score >= 8 ? 15 : data.opportunity.score >= 5 ? 20 : 25;
        const topCompetitors = data.competitors
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 2)
          .map(c => c.name)
          .join(", ");
        const campaignPrimarySegment = data.segments.primaryPersona ? data.segments.primaryPersona.title : "General Audience";

        // Build target segments list from percentages
        const segmentList = [];
        if (data.segments.competitive >= 40) segmentList.push("Competitive Players");
        if (data.segments.social >= 40) segmentList.push("Social Players");
        if (data.segments.families >= 20) segmentList.push("Families");
        const targetSegments = segmentList.length > 0 ? segmentList.join(", ") : campaignPrimarySegment;
        const estimatedReach = data.opportunity.score >= 7 ? 1200 : data.opportunity.score >= 4 ? 800 : 500;
        const estimatedConversions = Math.round(estimatedReach * 0.01); // 1% conversion rate

        const campaignContent = `
          <div style="text-align: left;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div>
                <p style="margin: 4px 0;"><strong>Campaign Type:</strong><br>${campaignType}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Target Time:</strong><br>${data.timeSlot}</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Discount:</strong><br>${discount}% off</p>
              </div>
              <div>
                <p style="margin: 4px 0;"><strong>Budget:</strong><br>$${data.opportunity.score >= 7 ? 150 : 100} ad spend</p>
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
              <p style="margin: 0; font-size: 14px;"><strong>Competitors:</strong> ${topCompetitors || 'Nearby facilities'}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Segments:</strong> ${targetSegments}</p>
              <p style="margin: 0; font-size: 14px;"><strong>Radius:</strong> 2 miles from PCC</p>
            </div>
            <div style="margin-bottom: 16px;">
              <p style="margin: 0 0 8px 0; font-weight: 600;">Channels:</p>
              <p style="margin: 0; font-size: 14px;">Email, Instagram Ads, Google Ads</p>
            </div>
            ${data.advantages && data.advantages.length > 0 ? `
              <div style="margin-bottom: 16px;">
                <p style="margin: 0 0 8px 0; font-weight: 600;">Key Messages:</p>
                <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
                  ${data.advantages.slice(0, 3).map(adv => `<li>${adv}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <hr style="margin: 16px 0; border: 0; border-top: 1px solid #E5E7EB;">
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Campaign would be scheduled</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Promotional emails would be sent 2 hours before</p>
            <p style="color: #10B981; font-weight: 600; margin: 4px 0;">✓ Conversion tracking would be enabled</p>
          </div>
        `;

        this.showDemoModal('Launch Campaign', campaignContent, data);
        break;

      case 'dismiss':
        this.close();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  }

  /**
   * Show a styled demo modal (for investor demo)
   */
  showDemoModal(title, content, data = null) {
    const modal = document.createElement('div');
    modal.className = 'error-overlay';
    modal.style.cssText = `
      z-index: 10000;
      background: rgba(0, 0, 0, 0.7);
    `;

    // Determine opportunity score badge color
    let opportunityBadgeColor = '#6B7280'; // default gray
    let opportunityScore = 'N/A';

    if (data && data.opportunity) {
      opportunityScore = data.opportunity.score.toFixed(1);
      if (data.opportunity.score >= 7) {
        opportunityBadgeColor = '#10B981'; // green for high opportunity
      } else if (data.opportunity.score >= 4) {
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
          ${data && data.opportunity ? `
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
   * Get day name from index
   */
  getDayName(dayIndex) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayIndex];
  }

  /**
   * Format hour as 12-hour time
   */
  formatHour(hour) {
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:00 ${period}`;
  }
}
