// PCC Yield Optimizer - Empty State Component
// Reusable component for displaying empty states across the dashboard

class EmptyStateComponent {
  /**
   * Create a new empty state component
   * @param {Object} config - Configuration object
   * @param {string} config.icon - Emoji or HTML icon
   * @param {string} config.title - Main title text
   * @param {string} config.description - Description text
   * @param {Array<string>} config.suggestions - Array of suggestion strings
   * @param {string} config.suggestionsTitle - Title for suggestions section (default: "Try:")
   * @param {Array<Object>} config.actions - Array of {text, onClick, primary} objects
   * @param {string} config.variant - Variant class name (e.g., 'opportunities', 'winning', 'map')
   * @param {boolean} config.compact - Use compact layout
   */
  constructor(config) {
    this.icon = config.icon || '📋';
    this.title = config.title || 'No Data Available';
    this.description = config.description || '';
    this.suggestions = config.suggestions || [];
    this.suggestionsTitle = config.suggestionsTitle || 'Try:';
    this.actions = config.actions || [];
    this.variant = config.variant || '';
    this.compact = config.compact || false;
  }

  /**
   * Render the empty state HTML
   * @returns {string} HTML string
   */
  render() {
    const variantClass = this.variant ? `empty-state-${this.variant}` : '';
    const compactClass = this.compact ? 'empty-state-compact' : '';
    const classes = ['empty-state', variantClass, compactClass].filter(c => c).join(' ');

    return `
      <div class="${classes}">
        <div class="empty-state-icon">${this.icon}</div>
        <div class="empty-state-title">${this.title}</div>
        ${this.description ? `<div class="empty-state-description">${this.description}</div>` : ''}
        ${this.renderSuggestions()}
        ${this.renderActions()}
      </div>
    `;
  }

  /**
   * Render suggestions list
   * @returns {string} HTML string
   */
  renderSuggestions() {
    if (this.suggestions.length === 0) return '';

    const listItems = this.suggestions
      .map(suggestion => `<li>${suggestion}</li>`)
      .join('');

    return `
      <div class="empty-state-suggestions">
        <div class="empty-state-suggestions-title">${this.suggestionsTitle}</div>
        <ul class="empty-state-suggestions-list">
          ${listItems}
        </ul>
      </div>
    `;
  }

  /**
   * Render action buttons
   * @returns {string} HTML string
   */
  renderActions() {
    if (this.actions.length === 0) return '';

    const buttons = this.actions
      .map((action, index) => {
        const btnClass = action.primary
          ? 'empty-state-btn empty-state-btn-primary'
          : 'empty-state-btn empty-state-btn-secondary';
        return `<button class="${btnClass}" data-action-index="${index}">${action.text}</button>`;
      })
      .join('');

    return `
      <div class="empty-state-actions">
        ${buttons}
      </div>
    `;
  }

  /**
   * Render and inject into container
   * @param {HTMLElement|string} container - Container element or selector
   * @returns {HTMLElement} The empty state element
   */
  renderTo(container) {
    const el = typeof container === 'string'
      ? document.querySelector(container)
      : container;

    if (!el) {
      console.error('Empty state container not found:', container);
      return null;
    }

    el.innerHTML = this.render();

    // Attach event listeners to action buttons
    this.attachEventListeners(el);

    return el.querySelector('.empty-state');
  }

  /**
   * Attach event listeners to action buttons
   * @param {HTMLElement} container - Container element
   */
  attachEventListeners(container) {
    const buttons = container.querySelectorAll('[data-action-index]');

    buttons.forEach(button => {
      const index = parseInt(button.dataset.actionIndex);
      const action = this.actions[index];

      if (action && typeof action.onClick === 'function') {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          action.onClick(e);
        });
      }
    });
  }
}

/**
 * Predefined empty state configurations
 */
const EmptyStatePresets = {
  /**
   * Opportunity Finder - No opportunities found
   */
  noOpportunities: () => new EmptyStateComponent({
    icon: '🎯',
    title: 'No High-Value Opportunities Right Now',
    description: 'This means your competitors aren\'t showing strong demand patterns, or your filters are too restrictive.',
    suggestions: [
      'Lower the opportunity score threshold',
      'Select different days of the week',
      'Toggle on more competitor facilities'
    ],
    actions: [
      {
        text: 'Reset Filters',
        primary: true,
        onClick: () => {
          // Reset filters to defaults
          if (typeof resetOpportunityFilters === 'function') {
            resetOpportunityFilters();
          }
        }
      }
    ],
    variant: 'opportunities'
  }),

  /**
   * Gap Analysis - Winning everywhere
   */
  winningEverywhere: () => new EmptyStateComponent({
    icon: '🏆',
    title: 'You\'re Dominating the Market!',
    description: 'PCC is at or above market demand across all time slots.',
    suggestions: [
      'Maintaining service quality',
      'Expanding capacity during peak times',
      'Converting drop-ins to members'
    ],
    suggestionsTitle: 'Focus on:',
    actions: [
      {
        text: 'View Heatmap',
        primary: true,
        onClick: () => switchTab('heatmap')
      },
      {
        text: 'View Map',
        primary: false,
        onClick: () => switchTab('map')
      }
    ],
    variant: 'winning'
  }),

  /**
   * Geographic Map - No member data
   */
  noMemberData: () => new EmptyStateComponent({
    icon: '📍',
    title: 'Member Density Data Not Available',
    description: 'Upload member addresses to see geographic distribution and catchment overlap analysis.',
    actions: [
      {
        text: 'Learn How to Upload Data',
        primary: true,
        onClick: () => {
          alert('Data upload documentation coming soon. Please contact support for assistance.');
        }
      }
    ],
    variant: 'map',
    compact: true
  }),

  /**
   * Analysis Panel - No competitive data for time slot
   */
  limitedData: () => new EmptyStateComponent({
    icon: '📊',
    title: 'Limited Data for This Time Slot',
    description: 'Competitors may not publish data for this time, or it\'s outside typical operating hours.',
    suggestions: [
      'View nearby time slots for insights'
    ],
    actions: [
      {
        text: '← Previous Hour',
        primary: false,
        onClick: () => {
          console.log('Navigate to previous hour');
        }
      },
      {
        text: 'Next Hour →',
        primary: false,
        onClick: () => {
          console.log('Navigate to next hour');
        }
      }
    ],
    variant: 'panel',
    compact: true
  })
};
