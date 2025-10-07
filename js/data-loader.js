// PCC Yield Optimizer - Data Loader
// Handles loading and caching of JSON data files

// Data cache to avoid repeated fetches
const dataCache = {
  facilities: null,
  popularTimes: {}
};

/**
 * Load facilities data from JSON file
 * @returns {Promise<Object>} Facilities data or null on error
 */
async function loadFacilities() {
  // Return cached data if available
  if (dataCache.facilities) {
    return dataCache.facilities;
  }

  try {
    const response = await fetch('./data/facilities.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataCache.facilities = data;
    return data;
  } catch (error) {
    console.error('Error loading facilities data:', error);

    // Show user-friendly error
    if (typeof handleError === 'function') {
      handleError(error, {
        component: 'Facilities Data',
        retryCallback: () => {
          dataCache.facilities = null;
          return loadFacilities();
        }
      });
    }

    // Return null instead of throwing to allow rest of app to function
    return null;
  }
}

/**
 * Load popular times data for a specific facility
 * @param {string} facilityId - Facility ID (e.g., 'pcc', 'spf')
 * @returns {Promise<Object>} Popular times data or null on error
 */
async function loadPopularTimes(facilityId) {
  // Return cached data if available
  if (dataCache.popularTimes[facilityId]) {
    return dataCache.popularTimes[facilityId];
  }

  try {
    const response = await fetch(`./data/popular-times/${facilityId}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataCache.popularTimes[facilityId] = data;
    return data;
  } catch (error) {
    console.error(`Error loading popular times for ${facilityId}:`, error);

    // Show user-friendly error (less intrusive for individual facility failures)
    if (typeof showErrorToast === 'function') {
      showErrorToast(
        `Could Not Load ${facilityId.toUpperCase()} Data`,
        'Some facility data is unavailable. The dashboard will continue with available data.',
        { type: 'warning', autoHide: true, duration: 5000 }
      );
    }

    // Return null instead of throwing to allow rest of app to function
    return null;
  }
}

/**
 * Load all data needed for a facility (metadata + popular times)
 * @param {string} facilityId - Facility ID
 * @returns {Promise<Object|null>} Object with facility and popularTimes data, or null on error
 */
async function loadFacilityData(facilityId) {
  try {
    const facilitiesData = await loadFacilities();

    if (!facilitiesData) {
      console.warn(`Cannot load ${facilityId} - facilities metadata unavailable`);
      return null;
    }

    const facility = facilitiesData.facilities.find(f => f.id === facilityId);

    if (!facility) {
      console.warn(`Facility with ID '${facilityId}' not found`);
      return null;
    }

    const popularTimes = await loadPopularTimes(facilityId);

    if (!popularTimes) {
      console.warn(`Popular times data unavailable for ${facilityId}`);
      // Return facility without popular times instead of failing completely
      return {
        facility,
        popularTimes: null
      };
    }

    return {
      facility,
      popularTimes
    };
  } catch (error) {
    console.error(`Error loading data for facility ${facilityId}:`, error);
    return null;
  }
}

/**
 * Preload data for multiple facilities
 * @param {string[]} facilityIds - Array of facility IDs to preload
 * @returns {Promise<Object[]>} Array of facility data objects (null values filtered out)
 */
async function preloadFacilities(facilityIds) {
  try {
    const promises = facilityIds.map(id => loadFacilityData(id));
    const results = await Promise.all(promises);

    // Filter out null values (failed loads) and return only successful loads
    const validResults = results.filter(data => data !== null);

    if (validResults.length < facilityIds.length) {
      console.warn(`Successfully loaded ${validResults.length} of ${facilityIds.length} facilities`);

      // Show warning if critical facilities are missing
      if (validResults.length === 0) {
        if (typeof showErrorOverlay === 'function') {
          showErrorOverlay(
            'Unable to Load Dashboard Data',
            'Critical facility data could not be loaded. Please check your connection and refresh the page.',
            [
              {
                text: 'Refresh Page',
                primary: true,
                onClick: () => window.location.reload()
              }
            ]
          );
        }
      }
    }

    return validResults;
  } catch (error) {
    console.error('Error preloading facilities:', error);

    // Show error overlay for critical failure
    if (typeof showErrorOverlay === 'function') {
      showErrorOverlay(
        'Unable to Load Dashboard',
        'An unexpected error occurred while loading data. Please refresh the page to try again.',
        [
          {
            text: 'Refresh Page',
            primary: true,
            onClick: () => window.location.reload()
          }
        ]
      );
    }

    // Return empty array instead of throwing
    return [];
  }
}
