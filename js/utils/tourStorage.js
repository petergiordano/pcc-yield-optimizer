/**
 * Tour Storage Utility
 * Manages localStorage for visual tour state, progress, and preferences
 */

const TourStorage = {
  KEYS: {
    PROGRESS: 'tourProgress',
    COMPLETED: 'tourCompleted',
    DISMISSED: 'tourDismissed',
    DONT_SHOW: 'dontShowAgain',
    FIRST_VISIT: 'firstVisitDate'
  },

  /**
   * Initialize tour storage on first visit
   */
  init() {
    if (!this.getFirstVisitDate()) {
      this.setFirstVisitDate();
    }
  },

  /**
   * Save current tour progress
   * @param {number} part - Current part number (1-4)
   * @param {number} step - Current step number within part
   */
  saveProgress(part, step) {
    const progress = {
      part,
      step,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(this.KEYS.PROGRESS, JSON.stringify(progress));
  },

  /**
   * Get saved tour progress
   * @returns {Object|null} Progress object or null if none saved
   */
  getProgress() {
    const data = localStorage.getItem(this.KEYS.PROGRESS);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Clear saved progress
   */
  clearProgress() {
    localStorage.removeItem(this.KEYS.PROGRESS);
  },

  /**
   * Mark tour as completed
   */
  markCompleted() {
    localStorage.setItem(this.KEYS.COMPLETED, 'true');
    this.clearProgress();
  },

  /**
   * Check if tour has been completed
   * @returns {boolean}
   */
  isCompleted() {
    return localStorage.getItem(this.KEYS.COMPLETED) === 'true';
  },

  /**
   * Set "don't show again" preference
   * @param {boolean} value
   */
  setDontShowAgain(value) {
    localStorage.setItem(this.KEYS.DONT_SHOW, value ? 'true' : 'false');
  },

  /**
   * Check if user selected "don't show again"
   * @returns {boolean}
   */
  getDontShowAgain() {
    return localStorage.getItem(this.KEYS.DONT_SHOW) === 'true';
  },

  /**
   * Mark tour as dismissed (closed via X button)
   */
  markDismissed() {
    localStorage.setItem(this.KEYS.DISMISSED, 'true');
  },

  /**
   * Check if tour was dismissed
   * @returns {boolean}
   */
  isDismissed() {
    return localStorage.getItem(this.KEYS.DISMISSED) === 'true';
  },

  /**
   * Set first visit date
   */
  setFirstVisitDate() {
    localStorage.setItem(this.KEYS.FIRST_VISIT, new Date().toISOString());
  },

  /**
   * Get first visit date
   * @returns {string|null}
   */
  getFirstVisitDate() {
    return localStorage.getItem(this.KEYS.FIRST_VISIT);
  },

  /**
   * Check if this is the user's first visit
   * @returns {boolean}
   */
  isFirstVisit() {
    return !this.getFirstVisitDate();
  },

  /**
   * Reset all tour data (for testing or re-onboarding)
   */
  reset() {
    Object.values(this.KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Initialize on load
TourStorage.init();
