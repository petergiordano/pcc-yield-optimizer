// PCC Yield Optimizer - Formatting Utilities
// Helper functions for formatting data display

/**
 * Format day name (capitalize first letter)
 * @param {string} day - Day name (e.g., 'monday')
 * @returns {string} Formatted day (e.g., 'Monday')
 */
function formatDay(day) {
  if (!day) return '';
  return day.charAt(0).toUpperCase() + day.slice(1);
}

/**
 * Format hour to 12-hour time format
 * @param {number} hour - Hour in 24-hour format (0-23)
 * @returns {string} Formatted time (e.g., '12am', '1pm', '12pm')
 */
function formatHour(hour) {
  if (hour === 0) return '12am';
  if (hour < 12) return `${hour}am`;
  if (hour === 12) return '12pm';
  return `${hour - 12}pm`;
}

/**
 * Format popularity value as percentage
 * @param {number} popularity - Popularity value (0-100)
 * @returns {string} Formatted percentage (e.g., '52%')
 */
function formatPopularity(popularity) {
  return `${popularity}%`;
}

/**
 * Format rating with stars
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star representation (e.g., '⭐ 4.9')
 */
function formatRating(rating) {
  return `⭐ ${rating.toFixed(1)}`;
}

/**
 * Format review count
 * @param {number} count - Number of reviews
 * @returns {string} Formatted count (e.g., '(72 reviews)')
 */
function formatReviewCount(count) {
  return `(${count} review${count !== 1 ? 's' : ''})`;
}

/**
 * Get facility type badge text
 * @param {string} type - Facility type ('private' or 'public')
 * @returns {string} Badge text
 */
function formatFacilityType(type) {
  return type === 'private' ? 'Private' : 'Public';
}
