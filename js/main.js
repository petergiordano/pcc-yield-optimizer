// PCC Yield Optimizer - Main Application Entry Point
// Sprint 10.6: Reactive State Management

/**
 * Global application state
 */
const appState = {
  facilities: [], // Array of {facility, popularTimes} objects
  visibleFacilities: [] // Facility IDs currently visible (based on filter selection)
};

/**
 * Component instances
 */
let heatmap;
let opportunityList;
let gapGrid;
let map;
let analysisPanel;
let marketGapHeatmap;
let competitiveMatrix;
let visualTour;
let userGuide;

/**
 * Initialize the application
 */
async function initApp() {
  console.log('🚀 Initializing PCC Yield Optimizer...');

  // Load facilities data
  try {
    const facilitiesData = await preloadFacilities(CONFIG.facilityIds);
    appState.facilities = facilitiesData;

    if (appState.facilities.length === 0) {
      console.error('❌ No facility data loaded. Cannot initialize app.');
      return;
    }

    console.log(`✓ Loaded ${appState.facilities.length} facilities`);

    // Initialize StateManager (Sprint 10.6 Phase 1)
    const facilityObjects = appState.facilities.map(item => item.facility);
    window.state = new StateManager(facilityObjects);
    await window.state.init();

    console.log('✓ StateManager initialized');

    // Set initial visible facilities (all by default)
    const allFacilityIds = appState.facilities.map(item => item.facility.id);
    window.state.setVisibleFacilities(allFacilityIds);

    // Initialize components
    await initComponents();

    // Set up filter panel
    setupFilters();

    // Set up view switching
    setupViewSwitching();

    // Set up URL state management
    if (typeof initURLState === 'function') {
      initURLState();
    }

    // Initialize user guide (Sprint 10.5)
    if (typeof UserGuide !== 'undefined') {
      userGuide = new UserGuide();
    }

    console.log('✅ PCC Yield Optimizer ready!');
  } catch (error) {
    console.error('❌ Error initializing app:', error);
    if (typeof handleError === 'function') {
      handleError(error, {
        component: 'Application Initialization',
        retryCallback: initApp
      });
    }
  }
}

/**
 * Initialize all dashboard components
 */
async function initComponents() {
  console.log('Initializing components...');
  console.log('OpportunityListComponent type:', typeof OpportunityListComponent);
  console.log('GapAnalysisGrid type:', typeof GapAnalysisGrid);

  // 1. Heatmap (Competitive Intelligence Center)
  // NOTE: heatmap.js component not yet created - skipping for now
  // if (typeof Heatmap !== 'undefined') {
  //   heatmap = new Heatmap('heatmaps-container', appState.facilities);
  //   heatmap.subscribeToStateChanges();
  //   heatmap.refresh();
  // }

  // 2. Opportunity List
  console.log('About to initialize OpportunityList...');
  if (typeof OpportunityListComponent !== 'undefined') {
    try {
      opportunityList = new OpportunityListComponent('opportunity-list');
      opportunityList.subscribeToStateChanges(); // Phase 4: Subscribe to state changes
      opportunityList.render('score', { minScore: 3, level: 'all' });
      console.log('✓ OpportunityList initialized and rendered');
    } catch (error) {
      console.error('❌ Error initializing OpportunityList:', error);
    }
  } else {
    console.warn('⚠️ OpportunityListComponent not found');
  }

  // 3. Gap Analysis Grid
  if (typeof GapAnalysisGrid !== 'undefined') {
    try {
      gapGrid = new GapAnalysisGrid('gap-grid-container');
      gapGrid.subscribeToStateChanges(); // Phase 4: Subscribe to state changes
      gapGrid.render();
      console.log('✓ GapGrid initialized and rendered');
    } catch (error) {
      console.error('❌ Error initializing GapGrid:', error);
    }
  } else {
    console.warn('⚠️ GapAnalysisGrid not found');
  }

  // 4. Geographic Map
  if (typeof MapComponent !== 'undefined') {
    map = new MapComponent('map-container', appState.facilities);
    // Note: MapComponent calls init() in constructor, no need to call render()
  }

  // 5. Analysis Panel (Sprint 6)
  if (typeof AnalysisPanel !== 'undefined') {
    analysisPanel = new AnalysisPanel('analysis-panel', appState.facilities);
    window.analysisPanel = analysisPanel;
  }

  // 6. Market Gap Heatmap (Sprint 7.5B)
  if (typeof MarketGapHeatmap !== 'undefined') {
    marketGapHeatmap = new MarketGapHeatmap('market-gap-container', appState.facilities);
    marketGapHeatmap.render();
  }

  // 7. Competitive Matrix (Sprint 7.5B)
  if (typeof CompetitiveMatrix !== 'undefined') {
    competitiveMatrix = new CompetitiveMatrix('competitive-matrix-container', appState.facilities);
    competitiveMatrix.render();
  }

  // 8. Visual Tour (Sprint 8)
  if (typeof VisualTour !== 'undefined') {
    visualTour = new VisualTour();
  }

  console.log('✓ Components initialized');
}

/**
 * Set up facility filter panel
 */
function setupFilters() {
  // Facility checkboxes - update analysis whenever any checkbox changes
  const checkboxes = document.querySelectorAll('.facility-checkbox input[type="checkbox"]:not(#filter-pcc)');
  console.log(`✓ Attached change listeners to ${checkboxes.length} facility checkboxes`);

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      console.log(`Checkbox changed: ${checkbox.id}, checked: ${checkbox.checked}`);
      updateVisibleFacilities();
      updateToggleAllButton();
    });
  });

  // Quick Filter buttons
  const quickFilterButtons = document.querySelectorAll('.quick-filter-btn');
  quickFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const allCheckboxes = document.querySelectorAll('.facility-checkbox input[type="checkbox"]:not(#filter-pcc)');

      if (btn.id === 'toggle-all-facilities') {
        // Select All / Deselect All button
        const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);
        allCheckboxes.forEach(cb => {
          cb.checked = !allChecked;
        });
        console.log(`✓ ${allChecked ? 'Deselected' : 'Selected'} all facilities`);
      } else if (filter === 'private-only') {
        // Check only private facilities
        allCheckboxes.forEach(cb => {
          const label = cb.closest('.facility-checkbox');
          const isPrivate = label.querySelector('.facility-type')?.textContent === 'Private';
          cb.checked = isPrivate;
        });
        console.log('✓ Showing only private facilities');
      } else if (filter === 'public-only') {
        // Check only public facilities
        allCheckboxes.forEach(cb => {
          const label = cb.closest('.facility-checkbox');
          const isPublic = label.querySelector('.facility-type')?.textContent === 'Public';
          cb.checked = isPublic;
        });
        console.log('✓ Showing only public facilities');
      } else if (filter === 'premium-only') {
        // Check only premium facilities (private facilities)
        allCheckboxes.forEach(cb => {
          const label = cb.closest('.facility-checkbox');
          const isPrivate = label.querySelector('.facility-type')?.textContent === 'Private';
          cb.checked = isPrivate;
        });
        console.log('✓ Showing only premium facilities');
      }

      updateVisibleFacilities();
      updateToggleAllButton();
    });
  });

  // Set initial button text
  updateToggleAllButton();
}

/**
 * Update the "Select All / Deselect All" button text
 */
function updateToggleAllButton() {
  const toggleAllBtn = document.getElementById('toggle-all-facilities');
  if (!toggleAllBtn) return;

  const allCheckboxes = document.querySelectorAll('.facility-checkbox input[type="checkbox"]:not(#filter-pcc)');
  const allChecked = Array.from(allCheckboxes).every(cb => cb.checked);

  toggleAllBtn.textContent = allChecked ? 'Deselect All' : 'Select All';
}

/**
 * Update visible facilities based on checkbox selections (Sprint 10.6 Phase 4)
 * Always uses checkbox state - no modes
 */
function updateVisibleFacilities() {
  // Get all checked facilities (including PCC which is always checked)
  const checkboxes = document.querySelectorAll('.facility-checkbox input[type="checkbox"]:checked');
  const visibleIds = Array.from(checkboxes).map(cb => cb.id.replace('filter-', ''));

  // Update StateManager (this will trigger recalculation and notify observers)
  window.state.setVisibleFacilities(visibleIds);

  console.log(`✓ Visible facilities updated: ${visibleIds.join(', ')}`);
}

/**
 * Set up view switching
 */
function setupViewSwitching() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const views = document.querySelectorAll('.dashboard-view');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const viewName = btn.dataset.view;
      const targetViewId = `${viewName}-view`;

      // Update active tab button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');

      // Show target view, hide others
      views.forEach(view => {
        if (view.id === targetViewId) {
          view.style.display = 'block';
        } else {
          view.style.display = 'none';
          view.querySelector('[aria-current="page"]')?.removeAttribute('aria-current');
        }
      });

      // Trigger any view-specific rendering
      if (targetViewId === 'map-view' && map && map.map) {
        map.map.invalidateSize(); // Refresh Leaflet map
      }

      console.log(`Switched to view: ${targetViewId}`);
    });
  });
}

/**
 * Initialize app when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
