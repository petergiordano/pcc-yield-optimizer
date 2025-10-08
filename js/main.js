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
  visibleFacilities: new Set([
    'pcc',
    'spf',
    'big-city-pickle-west-loop',
    'pickle-haus',
    'grant-park',
    'diversey-driving-range'
  ]), // Default: show all 6
  opportunityList: null, // Will be initialized on first view
  gapGrid: null, // Will be initialized on first view
  mapComponent: null, // Will be initialized on first view
  analysisPanel: null, // Analysis panel (Sprint 6)
  marketGapHeatmap: null, // Market gap analysis (Sprint 7.5B)
  competitiveMatrix: null // Competitive positioning matrix (Sprint 7.5B)
};

/**
 * Initialize global keyboard shortcuts
 */
function initKeyboardShortcuts() {
  if (!window.keyboardShortcuts) {
    console.warn('[initKeyboardShortcuts] KeyboardShortcuts not available');
    return;
  }

  // Escape key - Close any open modal or panel
  window.keyboardShortcuts.register('escape', () => {
    // Close analysis panel if open
    if (window.analysisPanel && document.getElementById('analysis-panel').classList.contains('active')) {
      window.analysisPanel.close();
      return;
    }
  }, 'Close open panel or modal');

  // Ctrl/Cmd+E - Export current view
  window.keyboardShortcuts.register('ctrl+e', async () => {
    const activeView = document.querySelector('.dashboard-view:not([style*="display: none"])');
    if (!activeView) return;

    const viewId = activeView.id;

    if (viewId === 'heatmap-view') {
      const exportBtn = document.getElementById('exportHeatmapPNG');
      if (exportBtn) exportBtn.click();
    } else if (viewId === 'opportunity-view') {
      const exportBtn = document.getElementById('exportOpportunitiesPDF');
      if (exportBtn) exportBtn.click();
    } else if (viewId === 'gap-analysis-view') {
      const exportBtn = document.getElementById('exportGapExcel');
      if (exportBtn) exportBtn.click();
    }
  }, 'Export current view');

  // Cmd+E for Mac
  window.keyboardShortcuts.register('cmd+e', async () => {
    const activeView = document.querySelector('.dashboard-view:not([style*="display: none"])');
    if (!activeView) return;

    const viewId = activeView.id;

    if (viewId === 'heatmap-view') {
      const exportBtn = document.getElementById('exportHeatmapPNG');
      if (exportBtn) exportBtn.click();
    } else if (viewId === 'opportunity-view') {
      const exportBtn = document.getElementById('exportOpportunitiesPDF');
      if (exportBtn) exportBtn.click();
    } else if (viewId === 'gap-analysis-view') {
      const exportBtn = document.getElementById('exportGapExcel');
      if (exportBtn) exportBtn.click();
    }
  }, 'Export current view (Mac)');

  // Disable shortcuts when typing in input fields
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('input, textarea, select')) {
      window.keyboardShortcuts.disable();
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.matches('input, textarea, select')) {
      window.keyboardShortcuts.enable();
    }
  });

  // Initialize the keyboard shortcuts system
  window.keyboardShortcuts.init();

  console.log('[initKeyboardShortcuts] Keyboard shortcuts initialized');
}

/**
 * Initialize the application
 */
async function initApp() {
  console.log('Initializing PCC Yield Optimizer...');

  // Initialize keyboard shortcuts
  initKeyboardShortcuts();

  // Check browser compatibility
  if (typeof checkBrowserCompatibility === 'function') {
    const compat = checkBrowserCompatibility();
    if (!compat.supported) {
      console.warn('Browser compatibility issues detected:', compat.missing);
      if (typeof showErrorOverlay === 'function') {
        const preset = ErrorPresets.browserNotSupported();
        showErrorOverlay(preset.title, preset.message, preset.actions);
      }
      // Continue anyway - don't block the app
    }
  }

  // Start progress bar
  if (window.progressBar) {
    window.progressBar.start();
  }

  try {
    // Show loading state (if desired)
    showLoading();

    // Load data for PCC and 5 competitors
    const facilityIds = [
      'pcc',
      'spf',
      'big-city-pickle-west-loop',
      'pickle-haus',
      'grant-park',
      'diversey-driving-range'
    ];
    const facilitiesData = await preloadFacilities(facilityIds);

    console.log('Data loaded successfully');

    // Store loaded facilities
    appState.facilities = facilitiesData;

    // Update progress
    if (window.progressBar) {
      window.progressBar.setProgress(70);
    }

    // Hide loading state
    hideLoading();

    // Initialize UI
    initFilters();
    initTabNavigation();
    initExportButtons();
    await renderHeatmaps();

    // Calculate and apply opportunity overlays (Sprint 2)
    calculateOpportunities();

    // Initialize analysis panel (Sprint 6)
    initAnalysisPanel();

    // Apply URL state if present (for bookmarked/shared links)
    if (typeof applyURLState === 'function') {
      applyURLState();
    }

    console.log('App initialized successfully');

    // Complete progress bar
    if (window.progressBar) {
      window.progressBar.complete();
    }
  } catch (error) {
    console.error('Failed to initialize app:', error);
    showError('Failed to load data. Please refresh the page.');

    // Reset progress bar on error
    if (window.progressBar) {
      window.progressBar.reset();
    }
  }
}

/**
 * Initialize filter controls (Sprint 7.5A: Enhanced for 6 facilities)
 */
function initFilters() {
  // Get filter checkboxes for all 6 facilities
  const facilityCheckboxes = {
    'pcc': document.getElementById('filter-pcc'),
    'spf': document.getElementById('filter-spf'),
    'big-city-pickle-west-loop': document.getElementById('filter-big-city-pickle-west-loop'),
    'pickle-haus': document.getElementById('filter-pickle-haus'),
    'grant-park': document.getElementById('filter-grant-park'),
    'diversey-driving-range': document.getElementById('filter-diversey-driving-range')
  };

  // Set initial checked state for all facilities
  Object.entries(facilityCheckboxes).forEach(([id, checkbox]) => {
    if (checkbox) {
      checkbox.checked = appState.visibleFacilities.has(id);
      checkbox.addEventListener('change', (e) => {
        handleFilterChange(id, e.target.checked);
      });
    } else {
      console.warn(`Checkbox for facility '${id}' not found`);
    }
  });

  // Mode selector buttons
  const modeButtons = document.querySelectorAll('.mode-btn');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      handleModeChange(mode);

      // Update active state
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Quick filter buttons
  const quickFilterButtons = document.querySelectorAll('.quick-filter-btn');
  quickFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      applyQuickFilter(filter);
    });
  });

  console.log('Filters initialized for 6 facilities');
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

  // Update map pins (Sprint 9)
  if (appState.mapComponent) {
    appState.mapComponent.updateVisibleFacilities(appState.visibleFacilities);
  }

  // Update URL state
  if (typeof updateURLFromFilters === 'function') {
    updateURLFromFilters();
  }

  console.log('Visible facilities:', Array.from(appState.visibleFacilities));
}

/**
 * Handle comparison mode change (Sprint 7.5A)
 * @param {string} mode - 'all' | 'select' | 'focus'
 */
function handleModeChange(mode) {
  console.log(`Switching to mode: ${mode}`);

  switch (mode) {
    case 'all':
      // Show all facilities
      appState.visibleFacilities = new Set([
        'pcc', 'spf', 'big-city-pickle-west-loop',
        'pickle-haus', 'grant-park', 'diversey-driving-range'
      ]);
      break;

    case 'select':
      // Enable checkboxes for custom selection
      // (checkboxes handle this automatically, no action needed)
      console.log('Select mode: use checkboxes to choose facilities');
      break;

    case 'focus':
      // Show PCC + one competitor (default to SPF)
      appState.visibleFacilities = new Set(['pcc', 'spf']);
      console.log('Focus mode: showing PCC and SPF');
      break;

    default:
      console.warn(`Unknown mode: ${mode}`);
      return;
  }

  // Update UI and re-render
  updateFilterCheckboxes();
  updateHeatmapVisibility();
  calculateOpportunities();

  // Update map pins (Sprint 9)
  if (appState.mapComponent) {
    appState.mapComponent.updateVisibleFacilities(appState.visibleFacilities);
  }
}

/**
 * Apply quick filter preset (Sprint 7.5A)
 * @param {string} filter - Filter type
 */
function applyQuickFilter(filter) {
  console.log(`Applying quick filter: ${filter}`);

  const allFacilities = appState.facilities.map(f => f.facility.id);
  const privateFacilities = appState.facilities
    .filter(f => f.facility.type === 'private')
    .map(f => f.facility.id);
  const publicFacilities = appState.facilities
    .filter(f => f.facility.type === 'public')
    .map(f => f.facility.id);

  switch (filter) {
    case 'private-only':
      // PCC is always included, plus other private facilities
      appState.visibleFacilities = new Set(['pcc', ...privateFacilities.filter(id => id !== 'pcc')]);
      break;

    case 'public-only':
      // PCC plus public facilities
      appState.visibleFacilities = new Set(['pcc', ...publicFacilities]);
      break;

    case 'premium-only':
      // PCC, SPF, and Pickle Haus (premium facilities)
      appState.visibleFacilities = new Set(['pcc', 'spf', 'pickle-haus']);
      break;

    case 'reset':
      // Show all facilities
      appState.visibleFacilities = new Set(allFacilities);
      break;

    default:
      console.warn(`Unknown filter: ${filter}`);
      return;
  }

  // Update UI and re-render
  updateFilterCheckboxes();
  updateHeatmapVisibility();
  calculateOpportunities();

  // Update map pins (Sprint 9)
  if (appState.mapComponent) {
    appState.mapComponent.updateVisibleFacilities(appState.visibleFacilities);
  }
}

/**
 * Update filter checkbox states to match appState (Sprint 7.5A)
 */
function updateFilterCheckboxes() {
  const checkboxMap = {
    'pcc': 'filter-pcc',
    'spf': 'filter-spf',
    'big-city-pickle-west-loop': 'filter-big-city-pickle-west-loop',
    'pickle-haus': 'filter-pickle-haus',
    'grant-park': 'filter-grant-park',
    'diversey-driving-range': 'filter-diversey-driving-range'
  };

  Object.entries(checkboxMap).forEach(([facilityId, checkboxId]) => {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      checkbox.checked = appState.visibleFacilities.has(facilityId);
    }
  });
}

/**
 * Update heatmap visibility based on visibleFacilities state
 */
function updateHeatmapVisibility() {
  Object.entries(appState.heatmaps).forEach(([facilityId, heatmap]) => {
    if (appState.visibleFacilities.has(facilityId)) {
      heatmap.show();
    } else {
      heatmap.hide();
    }
  });
}

/**
 * Render heatmaps for all loaded facilities
 */
async function renderHeatmaps() {
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
  for (const { facility, popularTimes } of appState.facilities) {
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
    await heatmap.init(); // Wait for rendering to complete

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
  }

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
 * Initialize export buttons for all views
 */
function initExportButtons() {
  // Heatmap PNG export
  const heatmapExportBtn = document.getElementById('exportHeatmapPNG');
  if (heatmapExportBtn) {
    heatmapExportBtn.addEventListener('click', async () => {
      if (typeof withButtonLoading === 'function' && typeof exportHeatmapToPNG === 'function') {
        await withButtonLoading(heatmapExportBtn, async () => {
          await exportHeatmapToPNG('heatmaps-container');
        });
      } else if (typeof exportHeatmapToPNG === 'function') {
        await exportHeatmapToPNG('heatmaps-container');
      }
    });
  }

  // Copy Link button
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
      // Update URL with current state first
      if (typeof updateURLFromFilters === 'function') {
        updateURLFromFilters();
      }

      // Copy to clipboard
      if (typeof copyLinkToClipboard === 'function' && window.urlStateManager) {
        await copyLinkToClipboard(window.urlStateManager.getCurrentURL());
      }
    });
  }

  console.log('Export buttons initialized');
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

  // Initialize market gap heatmap on first view (Sprint 7.5B)
  if (viewName === 'market-gap' && !appState.marketGapHeatmap) {
    initMarketGapHeatmap();
  }

  // Initialize competitive matrix on first view (Sprint 7.5B)
  if (viewName === 'competitive-matrix' && !appState.competitiveMatrix) {
    initCompetitiveMatrix();
  }

  // Update URL state
  if (typeof updateURLFromFilters === 'function') {
    updateURLFromFilters();
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
      if (typeof updateURLFromFilters === 'function') updateURLFromFilters();
    });
  }

  // Day filter
  const dayFilter = document.getElementById('filterDay');
  if (dayFilter) {
    dayFilter.addEventListener('change', () => {
      const sortBy = document.getElementById('sortOpportunities').value;
      appState.opportunityList.render(sortBy, getOpportunityFilters());
      if (typeof updateURLFromFilters === 'function') updateURLFromFilters();
    });
  }

  // Min score filter
  const minScore = document.getElementById('minScore');
  if (minScore) {
    minScore.addEventListener('change', () => {
      const sortBy = document.getElementById('sortOpportunities').value;
      appState.opportunityList.render(sortBy, getOpportunityFilters());
      if (typeof updateURLFromFilters === 'function') updateURLFromFilters();
    });
  }

  // Min busy competitors filter (Sprint 7.5B)
  const minBusyCompetitors = document.getElementById('minBusyCompetitors');
  if (minBusyCompetitors) {
    minBusyCompetitors.addEventListener('change', () => {
      const sortBy = document.getElementById('sortOpportunities').value;
      appState.opportunityList.render(sortBy, getOpportunityFilters());
      if (typeof updateURLFromFilters === 'function') updateURLFromFilters();
    });
  }

  // Export CSV button
  const exportCSVButton = document.getElementById('exportOpportunitiesCSV');
  if (exportCSVButton) {
    exportCSVButton.addEventListener('click', () => {
      appState.opportunityList.exportToCSV();
    });
  }

  // Export PDF button
  const exportPDFButton = document.getElementById('exportOpportunitiesPDF');
  if (exportPDFButton) {
    exportPDFButton.addEventListener('click', async () => {
      if (typeof withButtonLoading === 'function') {
        await withButtonLoading(exportPDFButton, async () => {
          await appState.opportunityList.exportToPDF();
        });
      } else {
        await appState.opportunityList.exportToPDF();
      }
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
    minScore: parseFloat(document.getElementById('minScore')?.value || 0),
    minBusyCompetitors: parseInt(document.getElementById('minBusyCompetitors')?.value || 0)
  };
}

/**
 * Initialize gap analysis grid component
 */
function initGapGrid() {
  appState.gapGrid = new GapAnalysisGrid('gap-grid-container', appState.facilities);

  // Wire up Excel export button
  const exportGapBtn = document.getElementById('exportGapExcel');
  if (exportGapBtn) {
    exportGapBtn.addEventListener('click', async () => {
      if (typeof withButtonLoading === 'function') {
        await withButtonLoading(exportGapBtn, async () => {
          await appState.gapGrid.exportToExcel();
        });
      } else {
        await appState.gapGrid.exportToExcel();
      }
    });
  }

  console.log('Gap analysis grid initialized');
}

/**
 * Initialize market gap heatmap component (Sprint 7.5B)
 */
function initMarketGapHeatmap() {
  appState.marketGapHeatmap = new MarketGapHeatmapComponent(
    'market-gap-container',
    appState.facilities
  );
  appState.marketGapHeatmap.init();
  console.log('Market gap heatmap initialized');
}

/**
 * Initialize competitive positioning matrix component (Sprint 7.5B)
 */
function initCompetitiveMatrix() {
  appState.competitiveMatrix = new CompetitivePositioningMatrixComponent(
    'competitive-matrix-container',
    appState.facilities
  );
  appState.competitiveMatrix.init();
  console.log('Competitive positioning matrix initialized');
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

/**
 * Helper function to switch tabs (used by empty states)
 * @param {string} viewName - View name to switch to
 */
function switchTab(viewName) {
  switchView(viewName);
}

/**
 * Reset opportunity filters to defaults
 */
function resetOpportunityFilters() {
  // Reset filter controls
  const sortSelect = document.getElementById('sortOpportunities');
  const dayFilter = document.getElementById('filterDay');
  const minScore = document.getElementById('minScore');

  if (sortSelect) sortSelect.value = 'score';
  if (dayFilter) dayFilter.value = 'all';
  if (minScore) minScore.value = '0';

  // Re-render opportunity list with defaults
  if (appState.opportunityList) {
    appState.opportunityList.render('score', { minScore: 0, dayFilter: 'all' });
  }

  console.log('Opportunity filters reset');
}

// Make helpers globally accessible for empty state components
window.switchTab = switchTab;
window.resetOpportunityFilters = resetOpportunityFilters;

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
