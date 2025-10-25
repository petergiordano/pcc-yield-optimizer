/**
 * CSV Parser for CourtReserve Data
 *
 * Parses CourtReserve CSV exports into structured JSON objects.
 * Handles comma-separated values with proper escaping and empty fields.
 *
 * Related: FEAT-004 (CourtReserve member list import)
 * Data Conventions: docs/data-pipeline/DATA_HANDLING_CONVENTIONS.md
 */

/**
 * Parse CSV text content into array of JSON objects
 *
 * @param {string} csvText - Raw CSV file content
 * @returns {Array<Object>} Array of parsed member objects
 *
 * @example
 * const csvText = await fetch('data.csv').then(r => r.text());
 * const members = parseCourtReserveCSV(csvText);
 * console.log(members[0]['First Name']); // "Aaron"
 */
export function parseCourtReserveCSV(csvText) {
    if (!csvText || typeof csvText !== 'string') {
        throw new Error('CSV text must be a non-empty string');
    }

    const lines = csvText.trim().split('\n');

    if (lines.length < 2) {
        throw new Error('CSV must contain at least a header row and one data row');
    }

    // Parse header row to get field names
    const headers = parseCSVLine(lines[0]);

    // Parse data rows
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) {
            continue;
        }

        const values = parseCSVLine(line);

        // Ensure we have the right number of values (pad or warn if mismatched)
        if (values.length !== headers.length) {
            console.warn(`Row ${i + 1}: Expected ${headers.length} fields, got ${values.length}`);
        }

        // Build object from headers and values
        const record = {};
        headers.forEach((header, index) => {
            const value = values[index];
            // Convert empty strings and whitespace-only strings to null
            record[header] = (value && value.trim() !== '') ? value.trim() : null;
        });

        records.push(record);
    }

    return records;
}

/**
 * Parse a single CSV line, handling quoted fields and commas within quotes
 *
 * @param {string} line - Single line from CSV file
 * @returns {Array<string>} Array of field values
 *
 * @private
 *
 * Handles:
 * - Simple fields: "value1,value2,value3"
 * - Quoted fields: '"value with, comma","normal value"'
 * - Empty fields: "value1,,value3" -> ["value1", "", "value3"]
 * - Trailing commas: "value1,value2," -> ["value1", "value2", ""]
 */
function parseCSVLine(line) {
    const fields = [];
    let currentField = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (insideQuotes && nextChar === '"') {
                // Escaped quote: "" -> "
                currentField += '"';
                i++; // Skip next quote
            } else {
                // Toggle quote state
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // End of field
            fields.push(currentField);
            currentField = '';
        } else {
            // Regular character
            currentField += char;
        }
    }

    // Add final field
    fields.push(currentField);

    return fields;
}

/**
 * Validate parsed CSV data structure
 *
 * @param {Array<Object>} records - Parsed records from parseCourtReserveCSV
 * @returns {Object} Validation result with status and messages
 *
 * @example
 * const records = parseCourtReserveCSV(csvText);
 * const validation = validateCourtReserveData(records);
 * if (!validation.valid) {
 *   console.error('Validation errors:', validation.errors);
 * }
 */
export function validateCourtReserveData(records) {
    const errors = [];
    const warnings = [];

    if (!Array.isArray(records) || records.length === 0) {
        errors.push('No records found in CSV');
        return { valid: false, errors, warnings };
    }

    // Required fields for member records
    const requiredFields = [
        'Member #',
        'First Name',
        'Last Name',
        'Email',
        'Current Membership',
        'Membership Status'
    ];

    // Check first record for required fields
    const firstRecord = records[0];
    const missingFields = requiredFields.filter(field => !(field in firstRecord));

    if (missingFields.length > 0) {
        errors.push(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // Check for records with missing critical data
    let recordsWithMissingEmail = 0;
    let recordsWithMissingName = 0;

    records.forEach((record, index) => {
        if (!record['Email']) {
            recordsWithMissingEmail++;
        }
        if (!record['First Name'] && !record['Last Name']) {
            recordsWithMissingName++;
        }
    });

    if (recordsWithMissingEmail > 0) {
        warnings.push(`${recordsWithMissingEmail} record(s) missing email address`);
    }

    if (recordsWithMissingName > 0) {
        warnings.push(`${recordsWithMissingName} record(s) missing name`);
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        recordCount: records.length
    };
}

/**
 * Get summary statistics for parsed member data
 *
 * @param {Array<Object>} records - Parsed member records
 * @returns {Object} Summary statistics
 */
export function getDataSummary(records) {
    if (!Array.isArray(records) || records.length === 0) {
        return {
            totalRecords: 0,
            activeMembers: 0,
            membershipTypes: {},
            missingEmails: 0,
            missingNames: 0
        };
    }

    const summary = {
        totalRecords: records.length,
        activeMembers: 0,
        membershipTypes: {},
        missingEmails: 0,
        missingNames: 0
    };

    records.forEach(record => {
        // Count active members
        if (record['Membership Status'] === 'Currently Active') {
            summary.activeMembers++;
        }

        // Count membership types
        const membershipType = record['Current Membership'];
        if (membershipType) {
            summary.membershipTypes[membershipType] =
                (summary.membershipTypes[membershipType] || 0) + 1;
        }

        // Count missing data
        if (!record['Email']) {
            summary.missingEmails++;
        }
        if (!record['First Name'] && !record['Last Name']) {
            summary.missingNames++;
        }
    });

    return summary;
}

/**
 * Example usage (for testing/development)
 *
 * // Load CSV file
 * const response = await fetch('data/courtreserve-import/members/2025-10-25_member-list.csv');
 * const csvText = await response.text();
 *
 * // Parse CSV
 * const members = parseCourtReserveCSV(csvText);
 * console.log(`Parsed ${members.length} member records`);
 *
 * // Validate data
 * const validation = validateCourtReserveData(members);
 * if (validation.valid) {
 *   console.log('Data validation passed');
 *   if (validation.warnings.length > 0) {
 *     console.warn('Warnings:', validation.warnings);
 *   }
 * } else {
 *   console.error('Validation failed:', validation.errors);
 * }
 *
 * // Get summary
 * const summary = getDataSummary(members);
 * console.log('Summary:', summary);
 *
 * // Access individual records
 * members.forEach(member => {
 *   console.log(`${member['Full Name']} - ${member['Current Membership']}`);
 * });
 */
