/**
 * User Guide Component
 * Provides contextual, collapsible instructions for each dashboard
 */

/**
 * Guide Content for all 6 dashboards
 */
const GuideContent = {
  heatmap: {
    icon: '📊',
    purpose: 'Identify when competitors are at peak capacity while PCC has available courts—these are your prime growth opportunities.',
    steps: [
      { icon: '🟢', text: 'Look for green borders: High-opportunity time slots where PCC has capacity and 2+ competitors are busy' },
      { icon: '📊', text: 'Compare patterns: Review PCC\'s heatmap against competitors to spot systematic gaps (e.g., PCC empty Tuesday evenings while SPF/Big City are full)' },
      { icon: '👥', text: 'Check busy competitor count: Click the green badge number to see exactly which facilities are at capacity' },
      { icon: '🎯', text: 'Focus on recurring gaps: Prioritize weekly patterns over one-time occurrences' }
    ],
    nextAction: {
      text: 'Visit Opportunity List to see these time slots scored and ranked by revenue potential',
      targetView: 'opportunity'
    }
  },
  opportunity: {
    icon: '✨',
    purpose: 'Prioritize your marketing and operational efforts by focusing on the highest-scoring opportunities where demand exists but PCC is underutilized.',
    steps: [
      { icon: '🏆', text: 'Start at the top: Opportunities are pre-sorted by score (0-10). The highest scores represent the easiest wins' },
      { icon: '📋', text: 'Read the WHO/WHERE/HOW/WHY: Each card breaks down customer segments (WHO), geographic overlap (WHERE), marketing channels (HOW), and conversion drivers (WHY)' },
      { icon: '✅', text: 'Select opportunities to act on: Click "Create Campaign" or export the top 3-5 opportunities for your marketing plan' }
    ],
    nextAction: {
      text: 'Visit Gap Analysis to see the revenue potential of filling these time slots',
      targetView: 'gap-analysis'
    }
  },
  'gap-analysis': {
    icon: '📈',
    purpose: 'Quantify the revenue opportunity by comparing PCC\'s utilization against market maximum. Each percentage point of gap represents potential new memberships.',
    steps: [
      { icon: '📊', text: 'Find the largest gaps: Red cells show where PCC lags furthest behind market max (e.g., -35% on Thursday mornings = 35% of potential demand unserved)' },
      { icon: '💰', text: 'Calculate potential revenue: Each 10% utilization increase ≈ 40 new members @ $50/mo = $24k annual recurring revenue' },
      { icon: '🔍', text: 'Cross-reference with Opportunity List: The biggest gaps should align with top opportunities—if not, investigate why' }
    ],
    nextAction: {
      text: 'Visit Geographic Map to understand if gaps are due to location/accessibility issues',
      targetView: 'map'
    }
  },
  map: {
    icon: '🗺️',
    purpose: 'Understand the geographic dynamics of competition—where your competitors draw members from and how transit accessibility affects market reach.',
    steps: [
      { icon: '📍', text: 'Review facility locations: PCC (blue) vs. competitors. Note proximity and clustering (e.g., West Loop has 3 facilities within 0.5 miles)' },
      { icon: '⭕', text: 'Examine catchment areas: 15-minute drive-time circles show each facility\'s primary market. Look for overlap with PCC' },
      { icon: '🚇', text: 'Check CTA transit lines: Green/Orange/Blue lines affect accessibility. Facilities near transit capture broader demographics' },
      { icon: '🔥', text: 'View member density heatmap: Red areas = high pickleball demand. Is PCC positioned in a high-density zone?' }
    ],
    nextAction: {
      text: 'Visit Market Gaps to find specific times when geographic advantages matter most',
      targetView: 'market-gap'
    }
  },
  'market-gap': {
    icon: '🎯',
    purpose: 'Discover unserved market demand by identifying times when 4+ competitors are closed or at capacity—these are golden opportunities for PCC.',
    steps: [
      { icon: '🔴', text: 'Look for dark red cells: These indicate 5-6 competitors unavailable simultaneously (e.g., Monday 6am: most competitors closed, but early-bird demand exists)' },
      { icon: '⏰', text: 'Identify systematic patterns: Weekend mornings, weekday early evenings often show high competitor unavailability' },
      { icon: '💡', text: 'Strategic insight: If PCC is also closed during high-gap times, consider extended hours. If PCC is open, market aggressively' }
    ],
    nextAction: {
      text: 'Visit Positioning to understand how to differentiate PCC\'s messaging when competitors are unavailable',
      targetView: 'competitive-matrix'
    }
  },
  'competitive-matrix': {
    icon: '📈',
    purpose: 'Visualize PCC\'s strategic position in the market on price vs. amenities to identify competitive advantages and inform messaging strategy.',
    steps: [
      { icon: '📌', text: 'Locate PCC (blue bubble): Note your position relative to competitors. Bubble size = court count' },
      { icon: '💵', text: 'Price positioning: Left = budget-friendly, Right = premium. Where does PCC sit? (Target: mid-market at ~$50/mo)' },
      { icon: '⭐', text: 'Amenities comparison: Higher = more amenities. PCC\'s unique features (bar, café, pro shop) should position you higher' },
      { icon: '🎯', text: 'Strategic advantage: If you\'re in the "middle ground" (moderate price, high amenities), message as "premium experience without premium price"' }
    ],
    nextAction: {
      text: 'Return to Opportunity List to apply these insights to campaigns',
      targetView: 'opportunity'
    }
  }
};

/**
 * UserGuide Component Class
 */
class UserGuide {
  /**
   * Create a user guide accordion
   * @param {string} dashboardView - The dashboard ID (e.g., 'heatmap', 'opportunity')
   * @param {Object} guideContent - Content object with purpose, steps, nextAction
   */
  constructor(dashboardView, guideContent) {
    this.dashboardView = dashboardView;
    this.guideContent = guideContent;
    this.storageKey = `userGuide_${dashboardView}_expanded`;
    this.container = null;
    this.headerButton = null;
    this.contentDiv = null;
    this.chevron = null;
    this.isExpanded = this.loadState();
  }

  /**
   * Render the guide accordion into specified container
   * @param {string} containerId - DOM element ID to render into
   */
  render(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`UserGuide: Container #${containerId} not found`);
      return;
    }

    // Create accordion HTML
    const accordion = this.createAccordionHTML();
    this.container.innerHTML = accordion;

    // Cache DOM references
    this.headerButton = this.container.querySelector('.user-guide-header');
    this.contentDiv = this.container.querySelector('.user-guide-content');
    this.chevron = this.container.querySelector('.user-guide-chevron');

    // Attach event listeners
    this.attachEventListeners();

    // Set initial state
    this.updateUI(false); // false = no animation on initial render
  }

  /**
   * Create accordion HTML structure
   * @returns {string} HTML string
   */
  createAccordionHTML() {
    const { icon, purpose, steps, nextAction } = this.guideContent;
    const contentId = `user-guide-content-${this.dashboardView}`;

    // Build steps HTML
    const stepsHTML = steps.map(step => `
      <li class="user-guide-step">
        <span class="step-icon" role="img" aria-label="${step.icon}">${step.icon}</span>
        <span class="step-text">${step.text}</span>
      </li>
    `).join('');

    return `
      <div class="user-guide-accordion">
        <!-- Header (always visible, clickable) -->
        <button class="user-guide-header"
                aria-expanded="${this.isExpanded}"
                aria-controls="${contentId}"
                type="button">
          <div class="user-guide-header-left">
            <span class="user-guide-icon" role="img" aria-label="Guide icon">📖</span>
            <span class="user-guide-title">How to use this dashboard</span>
          </div>
          <div class="user-guide-header-right">
            <svg class="user-guide-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>

        <!-- Content (collapsible) -->
        <div class="user-guide-content"
             id="${contentId}"
             aria-hidden="${!this.isExpanded}">
          <div class="user-guide-content-inner">
            <!-- Purpose -->
            <div class="user-guide-purpose">
              <p>${purpose}</p>
            </div>

            <!-- Steps -->
            <div class="user-guide-steps">
              <h4 class="user-guide-steps-title">Follow these steps:</h4>
              <ol class="user-guide-steps-list">
                ${stepsHTML}
              </ol>
            </div>

            <!-- Next Action -->
            <div class="user-guide-next-action">
              <p>
                <strong>➡️ Next step:</strong>
                <button class="user-guide-link"
                        data-target-view="${nextAction.targetView}"
                        type="button">
                  ${nextAction.text}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Attach event listeners to interactive elements
   */
  attachEventListeners() {
    // Toggle on header click
    this.headerButton.addEventListener('click', () => this.toggle());

    // Navigate on "Next step" link click
    const nextStepLink = this.container.querySelector('.user-guide-link');
    if (nextStepLink) {
      nextStepLink.addEventListener('click', (e) => {
        const targetView = e.currentTarget.getAttribute('data-target-view');
        this.navigateTo(targetView);
      });
    }

    // Keyboard accessibility: Enter/Space to toggle
    this.headerButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  /**
   * Toggle accordion open/closed
   */
  toggle() {
    this.isExpanded = !this.isExpanded;
    this.updateUI(true); // true = animate transition
    this.saveState();
  }

  /**
   * Update UI to reflect expanded/collapsed state
   * @param {boolean} animate - Whether to animate the transition
   */
  updateUI(animate = true) {
    if (!this.headerButton || !this.contentDiv || !this.chevron) return;

    // Update ARIA attributes
    this.headerButton.setAttribute('aria-expanded', this.isExpanded.toString());
    this.contentDiv.setAttribute('aria-hidden', (!this.isExpanded).toString());

    // Update classes for CSS transitions
    if (this.isExpanded) {
      this.contentDiv.style.maxHeight = this.contentDiv.scrollHeight + 'px';
    } else {
      this.contentDiv.style.maxHeight = '0';
    }

    // Rotate chevron
    if (this.isExpanded) {
      this.chevron.style.transform = 'rotate(180deg)';
    } else {
      this.chevron.style.transform = 'rotate(0deg)';
    }

    // If not animating (initial render), skip transition
    if (!animate) {
      this.contentDiv.style.transition = 'none';
      this.chevron.style.transition = 'none';

      // Force reflow
      void this.contentDiv.offsetHeight;

      // Re-enable transitions
      this.contentDiv.style.transition = '';
      this.chevron.style.transition = '';
    }
  }

  /**
   * Load state from localStorage
   * @returns {boolean} - True if should be expanded
   */
  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);

      // Default: expanded for 'opportunity', collapsed for others
      if (saved !== null) {
        return saved === 'true';
      } else {
        return this.dashboardView === 'opportunity';
      }
    } catch (e) {
      console.warn('UserGuide: localStorage not available', e);
      return this.dashboardView === 'opportunity';
    }
  }

  /**
   * Save state to localStorage
   */
  saveState() {
    try {
      localStorage.setItem(this.storageKey, this.isExpanded.toString());
    } catch (e) {
      console.warn('UserGuide: Could not save to localStorage', e);
    }
  }

  /**
   * Navigate to another dashboard (for "Next step" links)
   * @param {string} targetView - Dashboard to navigate to
   */
  navigateTo(targetView) {
    const tabButton = document.querySelector(`.tab-button[data-view="${targetView}"]`);
    if (tabButton) {
      tabButton.click();

      // Scroll to top of page to ensure guide is visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error(`UserGuide: Tab button for view "${targetView}" not found`);
    }
  }

  /**
   * Destroy the guide (cleanup)
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.container = null;
    this.headerButton = null;
    this.contentDiv = null;
    this.chevron = null;
  }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UserGuide, GuideContent };
}
