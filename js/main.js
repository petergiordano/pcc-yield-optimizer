// PCC Yield Optimizer - Main Application
// Initialize app, load data, render heatmaps, handle filters

// Global state
const appState = {
  facilities: [],
  heatmaps: {},
  visibleFacilities: new Set(['pcc', 'spf']) // Default: show both
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
    renderHeatmaps();

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
  const heatmapsContainer = document.getElementById('heatmaps-container');

  if (!heatmapsContainer) {
    console.error('Heatmaps container not found');
    return;
  }

  // Clear existing heatmaps
  heatmapsContainer.innerHTML = '';

  // Create a container for each facility
  appState.facilities.forEach(({ facility, popularTimes }) => {
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

    heatmap.init();

    // Store heatmap instance
    appState.heatmaps[facility.id] = heatmap;

    // Apply initial visibility
    if (!appState.visibleFacilities.has(facility.id)) {
      heatmap.hide();
    }
  });

  console.log(`Rendered ${appState.facilities.length} heatmaps`);
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

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
