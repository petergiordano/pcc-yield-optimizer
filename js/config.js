// PCC Yield Optimizer - Configuration
// Brand colors, semantic colors, and application constants

const CONFIG = {
  // Brand Colors
  colors: {
    brand: {
      primaryBlue: '#005DAA',
      primaryRed: '#ED1C24',
      secondaryNavy: '#1D3557',
      secondaryGray: '#6C757D'
    },

    // Semantic Colors
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#3B82F6',
      neutral: '#6B7280'
    },

    // Background & Neutrals
    background: {
      page: '#F9FAFB',
      card: '#FFFFFF',
      borderDefault: '#E5E7EB',
      borderHover: '#D1D5DB'
    },

    // Text Colors
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF'
    },

    // Heatmap Color Scale (0-100 utilization)
    heatmap: {
      0: '#FFFFFF',    // White
      25: '#FEF3C7',   // Light Yellow
      50: '#FBBF24',   // Orange
      75: '#F87171',   // Light Red
      100: '#DC2626'   // Deep Red
    },

    // Opportunity Indicators
    opportunity: {
      high: '#10B981',     // Green
      medium: '#F59E0B',   // Yellow
      low: '#EF4444',      // Red
      win: '#3B82F6'       // Blue
    }
  },

  // Day names for labels
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

  // Facility types
  facilityTypes: {
    private: 'Private',
    public: 'Public'
  },

  // Heatmap dimensions
  heatmap: {
    cellSize: 32,        // px
    cellGap: 2,          // px
    labelWidth: 80,      // px
    hoursPerDay: 24,
    daysPerWeek: 7
  },

  // Facility IDs to load
  facilityIds: [
    'pcc',
    'spf',
    'big-city-pickle-west-loop',
    'pickle-haus',
    'grant-park',
    'diversey-driving-range'
  ]
};

// Make CONFIG available globally
window.CONFIG = CONFIG;
