// PCC Yield Optimizer - State Management (Sprint 10.6)
// Single source of truth for all application data and reactive updates

/**
 * StateManager: Centralized state management with observer pattern
 *
 * Purpose:
 * - Single source of truth for facility data, filters, and calculations
 * - Reactive updates via observer pattern (subscribe/notify)
 * - Eliminates duplicate calculations across components
 * - Prepares for production API integration
 *
 * Phase 1 (Current): Foundation - observer pattern, basic getters/setters
 * Phase 2: Move opportunity calculations from components to StateManager
 * Phase 3-4: Refactor components to consume state instead of calculating
 * Phase 5: Cleanup and optimization
 */
class StateManager {
  /**
   * @param {Array} facilities - Array of facility objects from facilities.json
   */
  constructor(facilities) {
    // Raw data layer (immutable after init, or updated via API)
    this.facilities = facilities || [];
    this.popularTimes = new Map(); // Key: facilityId, Value: popularTimes data

    // Filter state layer (mutable, synchronized with appState)
    this.visibleFacilities = new Set([
      'pcc',
      'spf',
      'big-city-pickle-west-loop',
      'pickle-haus',
      'grant-park',
      'diversey-driving-range'
    ]);

    // Computed state layer (Phase 2+)
    // These will be calculated from raw data + filters
    this.competitorData = null; // Filtered competitor array
    this.opportunityScores = new Map(); // Key: 'monday-9', Value: OpportunityData
    this.gapAnalysis = new Map(); // Key: 'monday-9', Value: GapData
    this.marketGaps = new Map(); // Key: 'monday-9', Value: MarketGapData

    // Observer registry (event name -> array of callbacks)
    this.subscribers = new Map();

    // Initialization flag
    this.initialized = false;

    console.log('[StateManager] Constructor: Initialized with', this.facilities.length, 'facilities');
  }

  /**
   * Initialize state manager - load popular times data for all facilities
   * @returns {Promise<void>}
   */
  async init() {
    console.log('[StateManager] init() started');

    try {
      // Load popular times for all facilities
      const loadPromises = this.facilities.map(async (facility) => {
        try {
          const response = await fetch(`./data/popular-times/${facility.id}.json`);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          const data = await response.json();
          this.popularTimes.set(facility.id, data);
          console.log(`[StateManager] ✓ Loaded popular times for ${facility.id}`);
          return { success: true, id: facility.id };
        } catch (error) {
          console.error(`[StateManager] ✗ Failed to load popular times for ${facility.id}:`, error);
          return { success: false, id: facility.id, error };
        }
      });

      const results = await Promise.all(loadPromises);
      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;

      console.log(`[StateManager] Popular times loaded: ${successCount} succeeded, ${failCount} failed`);

      // Phase 2: Calculate initial opportunity scores here
      // this._recalculateOpportunities();

      this.initialized = true;

      // Notify subscribers that state is ready
      this.notify('state:initialized', {
        facilities: this.facilities.length,
        popularTimesLoaded: successCount,
        visibleFacilities: this.visibleFacilities.size
      });

      console.log('[StateManager] ✓ Initialization complete');
    } catch (error) {
      console.error('[StateManager] ✗ Initialization failed:', error);
      throw error;
    }
  }

  // ============================================================
  // GETTERS - Public API for accessing state
  // ============================================================

  /**
   * Get all facilities (PCC + competitors)
   * @returns {Array} Array of facility objects
   */
  getFacilities() {
    return this.facilities;
  }

  /**
   * Get currently visible facility IDs (respects filter selection)
   * @returns {Set<string>} Set of facility IDs
   */
  getVisibleFacilities() {
    // Return a defensive copy to prevent external mutations
    return new Set(this.visibleFacilities);
  }

  /**
   * Get popular times data for a specific facility
   * @param {string} facilityId - Facility ID
   * @returns {Object|null} Popular times data or null if not found
   */
  getPopularTimes(facilityId) {
    return this.popularTimes.get(facilityId) || null;
  }

  /**
   * Get filtered competitor data (Phase 2)
   * @returns {Array} Array of competitor facility objects
   */
  getCompetitorData() {
    // Phase 2: Will return facilities filtered by visibleFacilities
    // For now, return stub
    return this.competitorData;
  }

  /**
   * Get opportunity scores (Phase 2)
   * @returns {Map<string, Object>} Map of time slot -> opportunity data
   */
  getOpportunityScores() {
    // Phase 2: Will return calculated opportunity scores
    // For now, return empty Map
    return this.opportunityScores;
  }

  /**
   * Get gap analysis data (Phase 2)
   * @returns {Map<string, Object>} Map of time slot -> gap data
   */
  getGapAnalysis() {
    // Phase 2: Will return calculated gap analysis
    // For now, return empty Map
    return this.gapAnalysis;
  }

  /**
   * Get market gap data (Phase 2)
   * @returns {Map<string, Object>} Map of time slot -> market gap data
   */
  getMarketGaps() {
    // Phase 2: Will return calculated market gaps
    // For now, return empty Map
    return this.marketGaps;
  }

  // ============================================================
  // SETTERS - Public API for mutating state
  // ============================================================

  /**
   * Update visible facilities (triggers recalculation)
   * @param {Set<string>|Array<string>} facilityIds - Facility IDs to show
   */
  setVisibleFacilities(facilityIds) {
    // Convert to Set if array provided
    const newVisibleFacilities = facilityIds instanceof Set
      ? new Set(facilityIds)
      : new Set(facilityIds);

    // Check if actually changed
    const changed = this.visibleFacilities.size !== newVisibleFacilities.size ||
                    ![...this.visibleFacilities].every(id => newVisibleFacilities.has(id));

    if (!changed) {
      console.log('[StateManager] setVisibleFacilities: No change detected, skipping update');
      return;
    }

    this.visibleFacilities = newVisibleFacilities;

    console.log('[StateManager] ✓ Visible facilities updated:', Array.from(this.visibleFacilities));

    // Phase 2: Recalculate derived state
    // this._recalculateCompetitorData();
    // this._recalculateOpportunities();
    // this._recalculateGaps();

    // Notify all subscribers
    this.notify('filters:changed', {
      visibleFacilities: this.visibleFacilities,
      visibleCount: this.visibleFacilities.size,
      timestamp: Date.now()
    });
  }

  /**
   * Update facility data (for future API integration)
   * @param {Object|Array} newData - New facility data
   */
  updateFacilityData(newData) {
    console.log('[StateManager] updateFacilityData: Not yet implemented (Phase 2+)');

    // Phase 2+: Update this.facilities and/or this.popularTimes
    // Then recalculate and notify

    this.notify('data:updated', {
      timestamp: Date.now()
    });
  }

  // ============================================================
  // OBSERVER PATTERN - Subscribe/Unsubscribe/Notify
  // ============================================================

  /**
   * Subscribe to state change events
   * @param {string} event - Event name ('filters:changed', 'data:updated', etc.)
   * @param {Function} callback - Callback function(data)
   */
  subscribe(event, callback) {
    if (typeof callback !== 'function') {
      console.error('[StateManager] subscribe: callback must be a function');
      return;
    }

    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }

    this.subscribers.get(event).push(callback);

    console.log(`[StateManager] ✓ Subscribed to '${event}' (${this.subscribers.get(event).length} total subscribers)`);
  }

  /**
   * Unsubscribe from state change events
   * @param {string} event - Event name
   * @param {Function} callback - Callback function to remove
   */
  unsubscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      console.warn(`[StateManager] unsubscribe: No subscribers for '${event}'`);
      return;
    }

    const callbacks = this.subscribers.get(event);
    const index = callbacks.indexOf(callback);

    if (index > -1) {
      callbacks.splice(index, 1);
      console.log(`[StateManager] ✗ Unsubscribed from '${event}' (${callbacks.length} remaining)`);
    } else {
      console.warn(`[StateManager] unsubscribe: Callback not found for '${event}'`);
    }
  }

  /**
   * Notify all subscribers of an event
   * @param {string} event - Event name
   * @param {Object} data - Data to pass to subscribers
   */
  notify(event, data = {}) {
    if (!this.subscribers.has(event)) {
      // No subscribers for this event - this is OK
      return;
    }

    const callbacks = this.subscribers.get(event);

    if (callbacks.length === 0) {
      return;
    }

    console.log(`[StateManager] 📢 Notifying '${event}' (${callbacks.length} subscribers)`, data);

    callbacks.forEach((callback, index) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`[StateManager] ✗ Error in subscriber #${index + 1} for '${event}':`, error);
        // Continue notifying other subscribers even if one fails
      }
    });
  }

  // ============================================================
  // PRIVATE METHODS - Calculation Logic (Phase 2+)
  // ============================================================

  /**
   * Recalculate competitor data based on visible facilities (Phase 2)
   * @private
   */
  _recalculateCompetitorData() {
    // Phase 2: Filter facilities by visibleFacilities
    // Exclude PCC, only include competitors
    // Store in this.competitorData
    console.log('[StateManager] _recalculateCompetitorData: Not yet implemented (Phase 2)');
  }

  /**
   * Recalculate opportunity scores (Phase 2)
   * @private
   */
  _recalculateOpportunities() {
    // Phase 2: Use calculateOpportunityScore() from calculations.js
    // Loop through all time slots (7 days × 24 hours)
    // Calculate once, store in this.opportunityScores Map
    console.log('[StateManager] _recalculateOpportunities: Not yet implemented (Phase 2)');
  }

  /**
   * Recalculate gap analysis (Phase 2)
   * @private
   */
  _recalculateGaps() {
    // Phase 2: Calculate PCC vs market max gaps
    // Store in this.gapAnalysis Map
    console.log('[StateManager] _recalculateGaps: Not yet implemented (Phase 2)');
  }

  /**
   * Recalculate market gaps (Phase 2)
   * @private
   */
  _recalculateMarketGaps() {
    // Phase 2: Calculate market-wide gap opportunities
    // Store in this.marketGaps Map
    console.log('[StateManager] _recalculateMarketGaps: Not yet implemented (Phase 2)');
  }
}

// Export to global scope
window.StateManager = StateManager;

console.log('[StateManager] Module loaded ✓');
