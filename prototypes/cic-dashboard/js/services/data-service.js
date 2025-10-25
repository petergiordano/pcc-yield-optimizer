/**
 * Data Service - Abstract Data Layer
 *
 * This module provides a single source of truth for all application data.
 * It abstracts the data source (CSV files, API, etc.) so that dashboard
 * components never need to know where data comes from.
 *
 * FUTURE-PROOF DESIGN:
 * - Phase 1 (Current): Reads from local CSV files
 * - Phase 2 (Future): Will fetch from CourtReserve API
 * - Dashboard components remain unchanged during migration
 *
 * Related: FEAT-004 (CourtReserve member list import)
 */

import { parseCourtReserveCSV, validateCourtReserveData, getDataSummary } from '../utils/csv-parser.js';

// ============================================================================
// Configuration
// ============================================================================

/**
 * Data source configuration
 * Change this to switch between CSV files and API endpoints
 */
const DATA_SOURCE = {
    type: 'csv', // 'csv' or 'api' (future)
    csvBasePath: './data/courtreserve-import/',
    apiBasePath: '/api/v1/', // Future API endpoint
};

/**
 * Cache configuration
 * Prevents redundant fetches/parses of the same data
 */
const CACHE = {
    enabled: true,
    ttl: 5 * 60 * 1000, // 5 minutes in milliseconds
};

// In-memory cache
const cache = new Map();

// ============================================================================
// Private Helper Functions
// ============================================================================

/**
 * Generate cache key for a data request
 * @private
 */
function getCacheKey(resource, params = {}) {
    return `${resource}:${JSON.stringify(params)}`;
}

/**
 * Check if cached data is still valid
 * @private
 */
function isCacheValid(cacheEntry) {
    if (!CACHE.enabled) return false;
    if (!cacheEntry) return false;

    const now = Date.now();
    return (now - cacheEntry.timestamp) < CACHE.ttl;
}

/**
 * Get data from cache if valid
 * @private
 */
function getFromCache(key) {
    const entry = cache.get(key);
    if (isCacheValid(entry)) {
        console.log(`[DataService] Cache HIT: ${key}`);
        return entry.data;
    }
    console.log(`[DataService] Cache MISS: ${key}`);
    return null;
}

/**
 * Store data in cache
 * @private
 */
function setCache(key, data) {
    if (!CACHE.enabled) return;

    cache.set(key, {
        data,
        timestamp: Date.now(),
    });
    console.log(`[DataService] Cached: ${key}`);
}

/**
 * Fetch CSV file from local path
 * @private
 */
async function fetchCSVFile(filePath) {
    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        return csvText;
    } catch (error) {
        console.error(`[DataService] Error fetching CSV file: ${filePath}`, error);
        throw new Error(`Failed to load data file: ${error.message}`);
    }
}

/**
 * Fetch data from API endpoint (future implementation)
 * @private
 */
async function fetchFromAPI(endpoint, params = {}) {
    // FUTURE IMPLEMENTATION:
    // This will be used in Phase 2 when connecting to CourtReserve API

    const url = new URL(endpoint, DATA_SOURCE.apiBasePath);
    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
    });

    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Future: Add authentication headers here
                // 'Authorization': `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`[DataService] API error: ${endpoint}`, error);
        throw new Error(`Failed to fetch from API: ${error.message}`);
    }
}

// ============================================================================
// Public API - Member Data
// ============================================================================

/**
 * Get all members from data source
 *
 * CURRENT (Phase 1): Reads from local CSV file
 * FUTURE (Phase 2): Will fetch from CourtReserve API endpoint
 *
 * @param {Object} options - Query options
 * @param {boolean} options.forceRefresh - Skip cache and fetch fresh data
 * @param {string} options.status - Filter by membership status (e.g., 'Currently Active')
 * @param {string} options.membershipType - Filter by membership type
 * @returns {Promise<Array<Object>>} Array of member objects
 *
 * @example
 * // Get all members (uses cache if available)
 * const members = await getMembers();
 *
 * @example
 * // Force refresh from source
 * const members = await getMembers({ forceRefresh: true });
 *
 * @example
 * // Get only active members (filtering done client-side for now)
 * const activeMembers = await getMembers({ status: 'Currently Active' });
 */
export async function getMembers(options = {}) {
    const { forceRefresh = false, status = null, membershipType = null } = options;

    // Generate cache key based on filters
    const cacheKey = getCacheKey('members', { status, membershipType });

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }
    }

    let members;

    // Fetch data based on configured source
    if (DATA_SOURCE.type === 'csv') {
        // PHASE 1: Read from local CSV file
        console.log('[DataService] Loading members from CSV file...');

        const csvPath = `${DATA_SOURCE.csvBasePath}members/2025-10-25_member-list.csv`;
        const csvText = await fetchCSVFile(csvPath);

        // Parse CSV
        members = parseCourtReserveCSV(csvText);
        console.log(`[DataService] Parsed ${members.length} member records`);

        // Validate data
        const validation = validateCourtReserveData(members);
        if (!validation.valid) {
            console.error('[DataService] Data validation failed:', validation.errors);
            throw new Error(`Invalid data: ${validation.errors.join(', ')}`);
        }

        if (validation.warnings.length > 0) {
            console.warn('[DataService] Data warnings:', validation.warnings);
        }

        // Log summary
        const summary = getDataSummary(members);
        console.log('[DataService] Data summary:', {
            total: summary.totalRecords,
            active: summary.activeMembers,
            membershipTypes: Object.keys(summary.membershipTypes).length,
        });

    } else if (DATA_SOURCE.type === 'api') {
        // PHASE 2: Fetch from API (future implementation)
        console.log('[DataService] Fetching members from API...');

        const apiParams = {};
        if (status) apiParams.status = status;
        if (membershipType) apiParams.membershipType = membershipType;

        members = await fetchFromAPI('/members', apiParams);
        console.log(`[DataService] Fetched ${members.length} members from API`);
    } else {
        throw new Error(`Unknown data source type: ${DATA_SOURCE.type}`);
    }

    // Apply client-side filters (for CSV mode)
    // In API mode, these filters would be passed to the API
    if (DATA_SOURCE.type === 'csv') {
        if (status) {
            members = members.filter(m => m['Membership Status'] === status);
            console.log(`[DataService] Filtered to ${members.length} members with status: ${status}`);
        }

        if (membershipType) {
            members = members.filter(m => m['Current Membership'] === membershipType);
            console.log(`[DataService] Filtered to ${members.length} members with type: ${membershipType}`);
        }
    }

    // Cache the results
    setCache(cacheKey, members);

    return members;
}

/**
 * Get a single member by ID
 *
 * @param {string|number} memberId - Member # from CourtReserve
 * @returns {Promise<Object|null>} Member object or null if not found
 *
 * @example
 * const member = await getMemberById('6512626');
 * if (member) {
 *   console.log(member['Full Name']);
 * }
 */
export async function getMemberById(memberId) {
    const members = await getMembers();
    return members.find(m => m['Member #'] === String(memberId)) || null;
}

/**
 * Get active members only
 *
 * @returns {Promise<Array<Object>>} Array of active member objects
 *
 * @example
 * const activeMembers = await getActiveMembers();
 * console.log(`${activeMembers.length} active members`);
 */
export async function getActiveMembers() {
    return getMembers({ status: 'Currently Active' });
}

/**
 * Get members by membership type
 *
 * @param {string} membershipType - Membership type name
 * @returns {Promise<Array<Object>>} Array of member objects
 *
 * @example
 * const fightClubMembers = await getMembersByType('Fight Club - AM + PM');
 */
export async function getMembersByType(membershipType) {
    return getMembers({ membershipType });
}

// ============================================================================
// Cache Management
// ============================================================================

/**
 * Clear all cached data
 * Useful when you know data has been updated
 *
 * @example
 * await clearCache();
 * const freshMembers = await getMembers();
 */
export function clearCache() {
    cache.clear();
    console.log('[DataService] Cache cleared');
}

/**
 * Get cache statistics
 *
 * @returns {Object} Cache stats
 */
export function getCacheStats() {
    return {
        enabled: CACHE.enabled,
        ttl: CACHE.ttl,
        entries: cache.size,
        keys: Array.from(cache.keys()),
    };
}

// ============================================================================
// Configuration Updates
// ============================================================================

/**
 * Switch data source type
 * Useful for testing or during Phase 2 migration
 *
 * @param {string} type - 'csv' or 'api'
 *
 * @example
 * // Switch to API mode (when ready)
 * setDataSourceType('api');
 * clearCache();
 * const members = await getMembers(); // Now fetches from API
 */
export function setDataSourceType(type) {
    if (!['csv', 'api'].includes(type)) {
        throw new Error(`Invalid data source type: ${type}. Must be 'csv' or 'api'`);
    }

    DATA_SOURCE.type = type;
    console.log(`[DataService] Data source changed to: ${type}`);
    clearCache(); // Clear cache when switching sources
}

/**
 * Enable or disable caching
 *
 * @param {boolean} enabled - Whether to enable caching
 */
export function setCacheEnabled(enabled) {
    CACHE.enabled = enabled;
    console.log(`[DataService] Cache ${enabled ? 'enabled' : 'disabled'}`);
}

// ============================================================================
// Health Check
// ============================================================================

/**
 * Test data service connectivity and data availability
 *
 * @returns {Promise<Object>} Health check result
 */
export async function healthCheck() {
    try {
        const startTime = Date.now();
        const members = await getMembers({ forceRefresh: true });
        const endTime = Date.now();

        return {
            status: 'healthy',
            dataSource: DATA_SOURCE.type,
            recordCount: members.length,
            responseTime: endTime - startTime,
            timestamp: new Date().toISOString(),
        };
    } catch (error) {
        return {
            status: 'unhealthy',
            error: error.message,
            dataSource: DATA_SOURCE.type,
            timestamp: new Date().toISOString(),
        };
    }
}
