// PCC Yield Optimizer - Cache & Memoization Utilities
// Performance optimization for expensive calculations

/**
 * Simple memoization cache for function results
 */
class MemoizationCache {
  constructor(maxSize = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  /**
   * Get cached value by key
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined
   */
  get(key) {
    return this.cache.get(key);
  }

  /**
   * Set cached value
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   */
  set(key, value) {
    // Prevent cache from growing too large
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value);
  }

  /**
   * Check if key exists in cache
   * @param {string} key - Cache key
   * @returns {boolean} True if key exists
   */
  has(key) {
    return this.cache.has(key);
  }

  /**
   * Clear all cached values
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get cache size
   * @returns {number} Number of cached items
   */
  size() {
    return this.cache.size;
  }
}

/**
 * Memoize a function - cache results based on arguments
 * @param {Function} fn - Function to memoize
 * @param {Function} keyGenerator - Optional custom key generator
 * @returns {Function} Memoized function
 */
function memoize(fn, keyGenerator = null) {
  const cache = new MemoizationCache();

  return function memoized(...args) {
    // Generate cache key
    const key = keyGenerator
      ? keyGenerator(...args)
      : JSON.stringify(args);

    // Return cached result if available
    if (cache.has(key)) {
      return cache.get(key);
    }

    // Calculate and cache result
    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  };
}

/**
 * Create a cache with TTL (time-to-live)
 */
class TTLCache {
  constructor(ttl = 60000) { // Default 1 minute
    this.cache = new Map();
    this.ttl = ttl;
  }

  /**
   * Get cached value if not expired
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined
   */
  get(key) {
    const item = this.cache.get(key);

    if (!item) return undefined;

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return undefined;
    }

    return item.value;
  }

  /**
   * Set cached value with TTL
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} customTTL - Optional custom TTL for this item
   */
  set(key, value, customTTL = null) {
    const expiry = Date.now() + (customTTL || this.ttl);

    this.cache.set(key, {
      value,
      expiry
    });
  }

  /**
   * Check if key exists and is not expired
   * @param {string} key - Cache key
   * @returns {boolean} True if key exists and is valid
   */
  has(key) {
    const item = this.cache.get(key);

    if (!item) return false;

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Clear all cached values
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Remove expired entries
   */
  cleanup() {
    const now = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Global cache instances
window.opportunityScoreCache = new MemoizationCache(500);
window.distanceCache = new MemoizationCache(200);
window.dataCache = new TTLCache(300000); // 5 minutes TTL

/**
 * Memoized opportunity score calculation
 * Use this instead of calling calculateOpportunityScore directly
 */
const memoizedOpportunityScore = memoize(
  calculateOpportunityScore,
  (yourUtilization, competitorData, day, hour) => {
    // Custom key generator for opportunity scores
    const compKey = competitorData
      .map(c => `${c.id}:${c.popularity}`)
      .sort()
      .join('|');
    return `${yourUtilization}|${compKey}|${day}|${hour}`;
  }
);

/**
 * Memoized distance calculation
 * Use this for geographic distance calculations
 */
const memoizedDistance = memoize(
  (lat1, lon1, lat2, lon2) => {
    // Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
  (lat1, lon1, lat2, lon2) => `${lat1.toFixed(4)},${lon1.toFixed(4)},${lat2.toFixed(4)},${lon2.toFixed(4)}`
);

/**
 * Helper: Convert degrees to radians
 */
function toRad(degrees) {
  return degrees * Math.PI / 180;
}
