// PCC Yield Optimizer - URL State Manager
// Handles encoding/decoding dashboard state to/from URL parameters

/**
 * URL State Manager
 * Manages dashboard state in URL for bookmarking and sharing
 */
class URLStateManager {
  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }

  /**
   * Get current state from URL
   * @returns {Object} Current dashboard state from URL
   */
  getState() {
    return {
      view: this.params.get('view') || 'heatmap',
      facilities: this.params.get('facilities')?.split(',') || ['pcc', 'spf'],
      dayFilter: this.params.get('dayFilter') || 'all',
      minScore: parseFloat(this.params.get('minScore')) || 0,
      sortBy: this.params.get('sortBy') || 'score',
      mapZoom: parseInt(this.params.get('zoom')) || 12,
      mapCenter: this.params.get('center')?.split(',').map(parseFloat) || [41.95, -87.68],
      showCatchment: this.params.get('catchment') !== 'false',
      showDensity: this.params.get('density') !== 'false',
      showTransit: this.params.get('transit') === 'true'
    };
  }

  /**
   * Update URL with current state
   * @param {Object} state - State object to encode in URL
   * @param {boolean} replace - If true, replace current history entry instead of pushing new one
   */
  setState(state, replace = false) {
    const params = new URLSearchParams();

    // Only add non-default parameters to keep URL clean
    if (state.view && state.view !== 'heatmap') {
      params.set('view', state.view);
    }

    if (state.facilities && JSON.stringify(state.facilities) !== JSON.stringify(['pcc', 'spf'])) {
      params.set('facilities', state.facilities.join(','));
    }

    if (state.dayFilter && state.dayFilter !== 'all') {
      params.set('dayFilter', state.dayFilter);
    }

    if (state.minScore && state.minScore !== 0) {
      params.set('minScore', state.minScore.toString());
    }

    if (state.sortBy && state.sortBy !== 'score') {
      params.set('sortBy', state.sortBy);
    }

    if (state.mapZoom && state.mapZoom !== 12) {
      params.set('zoom', state.mapZoom.toString());
    }

    if (state.mapCenter && JSON.stringify(state.mapCenter) !== JSON.stringify([41.95, -87.68])) {
      params.set('center', state.mapCenter.join(','));
    }

    if (state.showCatchment === false) {
      params.set('catchment', 'false');
    }

    if (state.showDensity === false) {
      params.set('density', 'false');
    }

    if (state.showTransit === true) {
      params.set('transit', 'true');
    }

    // Update URL without page reload
    const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;

    if (replace) {
      window.history.replaceState({}, '', newURL);
    } else {
      window.history.pushState({}, '', newURL);
    }

    this.params = params;
  }

  /**
   * Get current full URL for sharing
   * @returns {string} Current dashboard URL
   */
  getCurrentURL() {
    return window.location.href;
  }

  /**
   * Clear all URL parameters
   */
  clearState() {
    window.history.pushState({}, '', window.location.pathname);
    this.params = new URLSearchParams();
  }

  /**
   * Update a single parameter
   * @param {string} key - Parameter key
   * @param {*} value - Parameter value
   */
  updateParam(key, value) {
    const currentState = this.getState();
    currentState[key] = value;
    this.setState(currentState, true); // Replace history entry
  }

  /**
   * Check if URL has any state parameters
   * @returns {boolean} True if URL contains state parameters
   */
  hasState() {
    return this.params.toString().length > 0;
  }
}

// Create global instance
window.urlStateManager = new URLStateManager();

/**
 * Apply URL state to dashboard on page load
 * Should be called after components are initialized
 */
function applyURLState() {
  const state = window.urlStateManager.getState();

  console.log('[URLState] Applying state from URL:', state);

  // Apply view
  if (state.view && typeof switchView === 'function') {
    switchView(state.view);
  }

  // Apply facility filters
  const pccCheckbox = document.getElementById('filter-pcc');
  const spfCheckbox = document.getElementById('filter-spf');

  if (pccCheckbox) {
    pccCheckbox.checked = state.facilities.includes('pcc');
    if (typeof handleFilterChange === 'function') {
      handleFilterChange('pcc', pccCheckbox.checked);
    }
  }

  if (spfCheckbox) {
    spfCheckbox.checked = state.facilities.includes('spf');
    if (typeof handleFilterChange === 'function') {
      handleFilterChange('spf', spfCheckbox.checked);
    }
  }

  // Apply opportunity filters
  const dayFilter = document.getElementById('filterDay');
  const minScore = document.getElementById('minScore');
  const sortBy = document.getElementById('sortOpportunities');

  if (dayFilter) dayFilter.value = state.dayFilter;
  if (minScore) minScore.value = state.minScore.toString();
  if (sortBy) sortBy.value = state.sortBy;

  // Apply map state (if map is initialized)
  if (state.view === 'map' && window.appState && window.appState.mapComponent) {
    const map = window.appState.mapComponent.map;
    if (map) {
      map.setView(state.mapCenter, state.mapZoom);
    }

    // Apply layer toggles
    const catchmentToggle = document.getElementById('toggle-catchment');
    const densityToggle = document.getElementById('toggle-density');
    const transitToggle = document.getElementById('toggle-transit');

    if (catchmentToggle) catchmentToggle.checked = state.showCatchment;
    if (densityToggle) densityToggle.checked = state.showDensity;
    if (transitToggle) transitToggle.checked = state.showTransit;
  }

  console.log('[URLState] State applied successfully');
}

/**
 * Update URL when filters change
 * Call this function whenever user changes dashboard filters
 */
function updateURLFromFilters() {
  const state = {
    view: document.querySelector('.tab-button.active')?.dataset.view || 'heatmap',
    facilities: [],
    dayFilter: document.getElementById('filterDay')?.value || 'all',
    minScore: parseFloat(document.getElementById('minScore')?.value || 0),
    sortBy: document.getElementById('sortOpportunities')?.value || 'score'
  };

  // Get selected facilities
  const pccCheckbox = document.getElementById('filter-pcc');
  const spfCheckbox = document.getElementById('filter-spf');

  if (pccCheckbox?.checked) state.facilities.push('pcc');
  if (spfCheckbox?.checked) state.facilities.push('spf');

  // Get map state if map is active
  if (state.view === 'map' && window.appState && window.appState.mapComponent) {
    const map = window.appState.mapComponent.map;
    if (map) {
      const center = map.getCenter();
      state.mapCenter = [parseFloat(center.lat.toFixed(4)), parseFloat(center.lng.toFixed(4))];
      state.mapZoom = map.getZoom();
    }

    state.showCatchment = document.getElementById('toggle-catchment')?.checked !== false;
    state.showDensity = document.getElementById('toggle-density')?.checked !== false;
    state.showTransit = document.getElementById('toggle-transit')?.checked === true;
  }

  window.urlStateManager.setState(state, true);
}
