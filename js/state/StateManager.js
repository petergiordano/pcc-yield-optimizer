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

      // Set initialized flag before calculations (required by _recalculateOpportunities)
      this.initialized = true;

      // Phase 2: Calculate initial opportunity scores
      console.log('[StateManager] Calculating initial opportunity scores...');
      this._recalculateOpportunities();

      // Phase 4: Calculate gap analysis
      console.log('[StateManager] Calculating gap analysis...');
      this._recalculateGaps();

      // Notify subscribers that state is ready
      this.notify('state:initialized', {
        facilities: this.facilities.length,
        popularTimesLoaded: successCount,
        visibleFacilities: this.visibleFacilities.size,
        opportunityScores: this.opportunityScores.size,
        gapAnalysis: this.gapAnalysis.size
      });

      // Notify that calculations are complete
      this.notify('calculations:complete', {
        opportunityScores: this.opportunityScores.size,
        gapAnalysis: this.gapAnalysis.size,
        competitors: this.competitorData.length
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

    // Phase 2: Recalculate derived state based on new filter
    if (this.initialized) {
      console.log('[StateManager] Recalculating opportunities for new filter...');
      this._recalculateOpportunities();
      console.log('[StateManager] Recalculating gaps for new filter...');
      this._recalculateGaps();
    }

    // Notify all subscribers
    this.notify('filters:changed', {
      visibleFacilities: this.visibleFacilities,
      visibleCount: this.visibleFacilities.size,
      opportunityScores: this.opportunityScores.size,
      gapAnalysis: this.gapAnalysis.size,
      timestamp: Date.now()
    });

    // Notify that calculations are complete
    if (this.initialized) {
      this.notify('calculations:complete', {
        opportunityScores: this.opportunityScores.size,
        gapAnalysis: this.gapAnalysis.size,
        competitors: this.competitorData.length
      });
    }
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
   * Filters facilities to only include visible competitors (excludes PCC)
   * @private
   */
  _recalculateCompetitorData() {
    // Filter to visible competitors only (exclude PCC)
    this.competitorData = this.facilities
      .filter(facility => {
        return facility.id !== 'pcc' && this.visibleFacilities.has(facility.id);
      })
      .map(facility => ({
        facility: facility,
        popularTimes: this.popularTimes.get(facility.id)
      }))
      .filter(item => item.popularTimes !== undefined); // Only include if popular times loaded

    console.log('[StateManager] _recalculateCompetitorData: Filtered to', this.competitorData.length, 'visible competitors');
  }

  /**
   * Recalculate opportunity scores (Phase 2)
   * Calculates opportunities for all time slots based on visible competitors
   * @private
   */
  _recalculateOpportunities() {
    if (!this.initialized) {
      console.warn('[StateManager] _recalculateOpportunities: Not initialized yet, skipping');
      return;
    }

    // Get PCC facility and popular times
    const pccFacility = this.facilities.find(f => f.id === 'pcc');
    const pccPopularTimes = this.popularTimes.get('pcc');

    if (!pccFacility || !pccPopularTimes) {
      console.error('[StateManager] _recalculateOpportunities: PCC data not found');
      return;
    }

    // Ensure competitor data is up to date
    this._recalculateCompetitorData();

    // Clear existing opportunities
    this.opportunityScores.clear();

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let calculatedCount = 0;

    // Loop through all time slots (7 days × 24 hours = 168 slots)
    days.forEach((dayName, dayIndex) => {
      const pccDayData = pccPopularTimes.weeklyData[dayIndex];

      if (!pccDayData) {
        console.warn(`[StateManager] Missing day data for ${dayName} at index ${dayIndex}`);
        return;
      }

      // For each hour of the day
      for (let hour = 0; hour < 24; hour++) {
        const pccHourData = pccDayData.hourly.find(h => h.hour === hour);
        const pccPopularity = pccHourData ? pccHourData.popularity : 0;

        // Build competitor array for this time slot
        const competitors = this.competitorData.map(({ facility, popularTimes }) => {
          const competitorDayData = popularTimes.weeklyData[dayIndex];
          const competitorHourData = competitorDayData.hourly.find(h => h.hour === hour);

          return {
            id: facility.id,
            name: facility.name,
            popularity: competitorHourData ? competitorHourData.popularity : 0
          };
        });

        // Calculate opportunity score using global function from calculations.js
        const opportunity = calculateOpportunityScore(
          pccPopularity,
          competitors,
          dayName,
          hour
        );

        // Store in Map with key format: "monday-9", "tuesday-14", etc.
        const key = `${dayName}-${hour}`;
        this.opportunityScores.set(key, {
          ...opportunity,
          day: dayName,
          hour: hour,
          key: key
        });

        calculatedCount++;
      }
    });

    console.log(`[StateManager] _recalculateOpportunities: Calculated ${calculatedCount} opportunity scores (${this.competitorData.length} visible competitors)`);
  }

  /**
   * Recalculate gap analysis (Phase 4)
   * Calculates PCC utilization vs market max for all time slots
   * @private
   */
  _recalculateGaps() {
    if (!this.initialized) {
      console.warn('[StateManager] _recalculateGaps: Not initialized yet, skipping');
      return;
    }

    // Get PCC data
    const pccFacility = this.facilities.find(f => f.id === 'pcc');
    const pccPopularTimes = this.popularTimes.get('pcc');

    if (!pccFacility || !pccPopularTimes) {
      console.error('[StateManager] _recalculateGaps: PCC data not found');
      return;
    }

    // Ensure competitor data and opportunity scores are up to date
    this._recalculateCompetitorData();

    // Clear existing gap analysis
    this.gapAnalysis.clear();

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = CONFIG.days;
    let calculatedCount = 0;

    // Loop through all time slots
    days.forEach((dayName, dayIndex) => {
      const pccDayData = pccPopularTimes.weeklyData[dayIndex];

      if (!pccDayData) {
        console.warn(`[StateManager] Missing day data for ${dayName} at index ${dayIndex}`);
        return;
      }

      for (let hour = 0; hour < 24; hour++) {
        const pccHourData = pccDayData.hourly.find(h => h.hour === hour);
        const pccUtilization = pccHourData ? pccHourData.popularity : 0;

        // Get competitor utilizations for this time slot
        const competitorUtilizations = this.competitorData.map(({ facility, popularTimes }) => {
          const compDayData = popularTimes.weeklyData[dayIndex];
          const compHourData = compDayData.hourly.find(h => h.hour === hour);
          return {
            id: facility.id,
            name: facility.name,
            popularity: compHourData ? compHourData.popularity : 0
          };
        });

        // Find market maximum
        const marketMax = competitorUtilizations.length > 0
          ? Math.max(...competitorUtilizations.map(c => c.popularity))
          : 0;

        // Find top competitor
        const topCompetitorData = competitorUtilizations.find(c => c.popularity === marketMax);

        // Calculate gap
        const gap = marketMax - pccUtilization;
        const gapPercent = marketMax > 0 ? (gap / marketMax) * 100 : 0;

        // Get opportunity score (already calculated)
        const opportunityKey = `${dayName}-${hour}`;
        const opportunityScore = this.opportunityScores.get(opportunityKey)?.score || 0;

        // Determine if prime time (weekday 5pm-10pm or weekend 10am-8pm)
        const isPrimeTime = this._isPrimeTime(dayNames[dayIndex], hour);

        // Estimate revenue (simple calculation: gap * $40/person)
        const estRevenue = Math.round(gap * 40);

        // Store in Map
        const key = `${dayName}-${hour}`;
        this.gapAnalysis.set(key, {
          day: dayName,
          hour: hour,
          pccUtilization: Math.round(pccUtilization * 10) / 10,
          marketMax: Math.round(marketMax * 10) / 10,
          topCompetitor: topCompetitorData ? topCompetitorData.name : 'None',
          gap: Math.round(gap * 10) / 10,
          gapPercent: Math.round(gapPercent * 10) / 10,
          estRevenue: estRevenue,
          isPrimeTime: isPrimeTime,
          opportunityScore: opportunityScore,
          key: key
        });

        calculatedCount++;
      }
    });

    console.log(`[StateManager] _recalculateGaps: Calculated ${calculatedCount} gap analysis entries (${this.competitorData.length} visible competitors)`);
  }

  /**
   * Helper: Determine if a time slot is prime time
   * @private
   */
  _isPrimeTime(dayName, hour) {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const isWeekday = weekdays.includes(dayName);

    if (isWeekday) {
      return hour >= 17 && hour <= 22; // 5pm-10pm weekdays
    } else {
      return hour >= 10 && hour <= 20; // 10am-8pm weekends
    }
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
