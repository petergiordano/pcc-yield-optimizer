// PCC Yield Optimizer - Main Application
// Initialize app, load data, render heatmaps, handle filters

// ============================================================
// --- START: Tippy.js Centralized Control ---
// ============================================================

// Global registry for all active Tippy instances across all components
window.tippyInstances = [];

/**
 * Destroys all existing Tippy instances and clears the registry.
 * MUST be called before re-initializing any components that create tooltips.
 */
window.destroyAllTooltips = function() {
  console.log(`[destroyAllTooltips] Destroying ${window.tippyInstances.length} Tippy instances.`);
  window.tippyInstances.forEach(instance => instance.destroy());
  window.tippyInstances = [];
};

/**
 * Hides all currently active Tippy instances.
 * This is the function to call on click events.
 */
window.hideAllTooltips = function() {
  console.log(`[hideAllTooltips] Hiding all ${window.tippyInstances.length} tooltips.`);
  window.tippyInstances.forEach(instance => instance.hide());
};

// ============================================================
// --- END: Tippy.js Centralized Control ---
// ============================================================

// Global state
const appState = {
  facilities: [],
  heatmaps: {},
  visibleFacilities: new Set(['pcc', 'spf']), // Default: show both
  opportunityList: null, // Will be initialized on first view
  gapGrid: null, // Will be initialized on first view
  mapComponent: null, // Will be initialized on first view
  analysisPanel: null // Analysis panel (Sprint 6)
};

/**
 * Initialize the application
 */
async function initApp() {
  console.log('Initializing PCC Yield Optimizer...');

  try {
    // Show loading state (if desired)
    showLoading();

    // Load data for PCC and SPF
    const facilityIds = ['pcc', 'spf'];
    const facilitiesData = await preloadFacilities(facilityIds);

    console.log('Data loaded successfully');

    // Store loaded facilities
    appState.facilities = facilitiesData;

    // Hide loading state
    hideLoading();

    // Initialize UI
    initFilters();
    initTabNavigation();
    renderHeatmaps();

    // Calculate and apply opportunity overlays (Sprint 2)
    calculateOpportunities();

    // Initialize analysis panel (Sprint 6) - TODO: Uncomment when Sprint 6 is implemented
    // initAnalysisPanel();

    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showError('Failed to load data. Please refresh the page.');
  }
}

/**
 * Initialize filter controls
 */
function initFilters() {
  // Get filter checkboxes
  const pccCheckbox = document.getElementById('filter-pcc');
  const spfCheckbox = document.getElementById('filter-spf');

  if (!pccCheckbox || !spfCheckbox) {
    console.warn('Filter checkboxes not found');
    return;
  }

  // Set initial checked state
  pccCheckbox.checked = appState.visibleFacilities.has('pcc');
  spfCheckbox.checked = appState.visibleFacilities.has('spf');

  // Add event listeners
  pccCheckbox.addEventListener('change', (e) => {
    handleFilterChange('pcc', e.target.checked);
  });

  spfCheckbox.addEventListener('change', (e) => {
    handleFilterChange('spf', e.target.checked);
  });
}

/**
 * Handle filter checkbox changes
 * @param {string} facilityId - Facility ID
 * @param {boolean} isChecked - Checkbox state
 */
function handleFilterChange(facilityId, isChecked) {
  if (isChecked) {
    appState.visibleFacilities.add(facilityId);
    if (appState.heatmaps[facilityId]) {
      appState.heatmaps[facilityId].show();
    }
  } else {
    appState.visibleFacilities.delete(facilityId);
    if (appState.heatmaps[facilityId]) {
      appState.heatmaps[facilityId].hide();
    }
  }

  console.log('Visible facilities:', Array.from(appState.visibleFacilities));
}

/**
 * Render heatmaps for all loaded facilities
 */
function renderHeatmaps() {
  console.log(`[renderHeatmaps START] About to render ${appState.facilities.length} heatmaps`);

  // CRITICAL: Destroy all old tooltips before creating new ones
  window.destroyAllTooltips();

  const heatmapsContainer = document.getElementById('heatmaps-container');

  if (!heatmapsContainer) {
    console.error('Heatmaps container not found');
    return;
  }

  // Clear existing heatmaps
  heatmapsContainer.innerHTML = '';
  console.log(`[renderHeatmaps] Cleared heatmaps container`);

  // Create a container for each facility
  appState.facilities.forEach(({ facility, popularTimes }) => {
    console.log(`[renderHeatmaps] Creating heatmap for ${facility.id}`);

    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.id = `heatmap-container-${facility.id}`;
    heatmapsContainer.appendChild(containerDiv);

    // Create and initialize heatmap component
    const heatmap = new HeatmapComponent(
      `heatmap-container-${facility.id}`,
      facility,
      popularTimes
    );

    console.log(`[renderHeatmaps] Calling init() for ${facility.id}`);
    heatmap.init();

    // The component now returns its instances, which the controller manages
    console.log(`[renderHeatmaps] Calling getTippyInstances() for ${facility.id}`);
    const newInstances = heatmap.getTippyInstances();
    console.log(`[renderHeatmaps] Got ${newInstances.length} instances from ${facility.id}`);
    window.tippyInstances.push(...newInstances);

    // Store heatmap instance
    appState.heatmaps[facility.id] = heatmap;

    // Apply initial visibility
    if (!appState.visibleFacilities.has(facility.id)) {
      heatmap.hide();
    }
  });

  console.log(`[renderHeatmaps END] Rendered ${appState.facilities.length} heatmaps`);
  console.log(`[renderHeatmaps END] Total Tippy instances managed: ${window.tippyInstances.length}`);
}

/**
 * Show loading indicator
 */
function showLoading() {
  const heatmapsContainer = document.getElementById('heatmaps-container');
  if (heatmapsContainer) {
    heatmapsContainer.innerHTML = `
      <div class="loading-overlay" style="position: relative; min-height: 200px;">
        <div class="spinner"></div>
      </div>
    `;
  }
}

/**
 * Hide loading indicator
 */
function hideLoading() {
  const heatmapsContainer = document.getElementById('heatmaps-container');
  if (heatmapsContainer) {
    heatmapsContainer.innerHTML = '';
  }
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
  const heatmapsContainer = document.getElementById('heatmaps-container');
  if (heatmapsContainer) {
    heatmapsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-title">Error</div>
        <div class="empty-state-description">${message}</div>
      </div>
    `;
  }
}

/**
 * Calculate and apply opportunity overlays for PCC heatmap
 */
function calculateOpportunities() {
  console.log(`[calculateOpportunities START]`);

  const pccHeatmap = appState.heatmaps['pcc'];

  if (!pccHeatmap) {
    console.warn('[calculateOpportunities] PCC heatmap not found, skipping opportunity calculations');
    return;
  }

  // Calculate opportunity scores
  console.log(`[calculateOpportunities] Calculating opportunity scores`);
  pccHeatmap.calculateOpportunities(appState.facilities);

  // Apply visual overlays
  console.log(`[calculateOpportunities] Applying opportunity overlays`);
  pccHeatmap.applyOpportunityOverlays();

  // Update tooltips with competitive insights
  console.log(`[calculateOpportunities] About to call updateTooltipsWithOpportunities()`);
  pccHeatmap.updateTooltipsWithOpportunities();

  console.log('[calculateOpportunities END] Opportunity system initialized');
}

/**
 * Initialize tab navigation for dashboard views
 */
function initTabNavigation() {
  const tabButtons = document.querySelectorAll('.tab-button');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      switchView(view);
    });
  });

  console.log('Tab navigation initialized');
}

/**
 * Switch between dashboard views
 * @param {string} viewName - View name ('heatmap', 'opportunities', 'gap-analysis')
 */
function switchView(viewName) {
  // Update active tab
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeButton = document.querySelector(`.tab-button[data-view="${viewName}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  // Hide all views
  document.querySelectorAll('.dashboard-view').forEach(view => {
    view.style.display = 'none';
  });

  // Show selected view
  const targetView = document.getElementById(`${viewName}-view`);
  if (targetView) {
    targetView.style.display = 'block';
  } else {
    console.error(`Target view not found: ${viewName}-view`);
  }

  // Initialize opportunity list on first view
  if (viewName === 'opportunity' && !appState.opportunityList) {
    initOpportunityList();
  }

  // Initialize gap grid on first view
  if (viewName === 'gap-analysis' && !appState.gapGrid) {
    initGapGrid();
  }

  // Initialize map on first view
  if (viewName === 'map' && !appState.mapComponent) {
    initMap();
  }

  console.log(`Switched to ${viewName} view`);
}

/**
 * Initialize opportunity list component
 */
function initOpportunityList() {
  appState.opportunityList = new OpportunityListComponent('opportunity-list', appState.facilities);

  // Get initial filter values and render
  const initialFilters = getOpportunityFilters();
  const initialSort = document.getElementById('sortOpportunities')?.value || 'score';
  appState.opportunityList.render(initialSort, initialFilters);

  // Wire up controls
  setupOpportunityControls();

  console.log('Opportunity list initialized');
}

/**
 * Setup opportunity list control event listeners
 */
function setupOpportunityControls() {
  // Sort control
  const sortSelect = document.getElementById('sortOpportunities');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      appState.opportunityList.render(e.target.value, getOpportunityFilters());
    });
  }

  // Day filter
  const dayFilter = document.getElementById('filterDay');
  if (dayFilter) {
    dayFilter.addEventListener('change', () => {
      const sortBy = document.getElementById('sortOpportunities').value;
      appState.opportunityList.render(sortBy, getOpportunityFilters());
    });
  }

  // Min score filter
  const minScore = document.getElementById('minScore');
  if (minScore) {
    minScore.addEventListener('change', () => {
      const sortBy = document.getElementById('sortOpportunities').value;
      appState.opportunityList.render(sortBy, getOpportunityFilters());
    });
  }

  // Export button
  const exportButton = document.getElementById('exportOpportunities');
  if (exportButton) {
    exportButton.addEventListener('click', () => {
      appState.opportunityList.exportToCSV();
    });
  }
}

/**
 * Get current opportunity filter values
 * @returns {Object} Filter options
 */
function getOpportunityFilters() {
  return {
    dayFilter: document.getElementById('filterDay')?.value || 'all',
    minScore: parseFloat(document.getElementById('minScore')?.value || 0)
  };
}

/**
 * Initialize gap analysis grid component
 */
function initGapGrid() {
  appState.gapGrid = new GapAnalysisGrid('gap-grid-container', appState.facilities);
  console.log('Gap analysis grid initialized');
}

/**
 * Initialize map component
 */
function initMap() {
  appState.mapComponent = new MapComponent('map-container', appState.facilities);
  console.log('Map component initialized');
}

/**
 * Initialize analysis panel
 */
function initAnalysisPanel() {
  appState.analysisPanel = new AnalysisPanelComponent('analysis-panel', appState.facilities);

  // Make globally accessible for click handlers
  window.analysisPanel = appState.analysisPanel;

  console.log('Analysis panel initialized');
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
