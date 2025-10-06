// PCC Yield Optimizer - Data Loader
// Handles loading and caching of JSON data files

// Data cache to avoid repeated fetches
const dataCache = {
  facilities: null,
  popularTimes: {}
};

/**
 * Load facilities data from JSON file
 * @returns {Promise<Object>} Facilities data
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
    throw new Error('Failed to load facilities data. Please check that data/facilities.json exists.');
  }
}

/**
 * Load popular times data for a specific facility
 * @param {string} facilityId - Facility ID (e.g., 'pcc', 'spf')
 * @returns {Promise<Object>} Popular times data
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
    throw new Error(`Failed to load popular times for ${facilityId}. Please check that data/popular-times/${facilityId}.json exists.`);
  }
}

/**
 * Load all data needed for a facility (metadata + popular times)
 * @param {string} facilityId - Facility ID
 * @returns {Promise<Object>} Object with facility and popularTimes data
 */
async function loadFacilityData(facilityId) {
  try {
    const facilitiesData = await loadFacilities();
    const facility = facilitiesData.facilities.find(f => f.id === facilityId);

    if (!facility) {
      throw new Error(`Facility with ID '${facilityId}' not found`);
    }

    const popularTimes = await loadPopularTimes(facilityId);

    return {
      facility,
      popularTimes
    };
  } catch (error) {
    console.error(`Error loading data for facility ${facilityId}:`, error);
    throw error;
  }
}

/**
 * Preload data for multiple facilities
 * @param {string[]} facilityIds - Array of facility IDs to preload
 * @returns {Promise<Object[]>} Array of facility data objects
 */
async function preloadFacilities(facilityIds) {
  try {
    const promises = facilityIds.map(id => loadFacilityData(id));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error preloading facilities:', error);
    throw error;
  }
}
