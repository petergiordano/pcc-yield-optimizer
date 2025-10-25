/**
 * Customer Intelligence Center - Configuration
 *
 * Prototype-specific configuration for CIC dashboard
 */

export const CONFIG = {
  // Application metadata
  app: {
    name: 'Customer Intelligence Center',
    version: '0.1.0-prototype',
    phase: 'Prototype Phase 1',
  },

  // Data sources
  data: {
    customerSegments: './data/customer-segments.json',
    demographics: './data/geo/demographics.geojson',
  },

  // Customer segmentation
  segments: {
    corporatePowerUsers: {
      id: 'corporate',
      name: 'Corporate Power Users',
      color: '#3B82F6', // Info Blue
      description: 'High frequency, work nearby, weekday peak times',
    },
    socialAmbassadors: {
      id: 'social',
      name: 'Social Ambassadors',
      color: '#10B981', // Success Green
      description: 'Moderate frequency, high event attendance, rotates partners',
    },
    competitiveAthletes: {
      id: 'competitive',
      name: 'Competitive Athletes',
      color: '#EF4444', // Danger Red
      description: 'High frequency, tournament participation, follows pro players',
    },
    casualDropins: {
      id: 'casual',
      name: 'Casual Drop-ins',
      color: '#6B7280', // Neutral Gray
      description: 'Low frequency, pay-per-play, sporadic schedule',
    },
  },

  // Multi-source confidence scoring weights
  confidenceScoring: {
    sources: {
      bookingBehavior: { weight: 0.40, name: 'Booking Behavior', icon: '📈' },
      surveyJTBD: { weight: 0.30, name: 'Survey JTBD', icon: '📋' },
      socialSignals: { weight: 0.15, name: 'Social Signals', icon: '📱' },
      demographics: { weight: 0.10, name: 'Demographics', icon: '🗺️' },
      linkedinEmployer: { weight: 0.05, name: 'LinkedIn/Employer', icon: '👔' },
    },
    tiers: {
      high: { min: 85, max: 100, label: 'High Confidence', color: '#D1FAE5', textColor: '#065F46' },
      medium: { min: 65, max: 84, label: 'Medium Confidence', color: '#FEF3C7', textColor: '#92400E' },
      low: { min: 40, max: 64, label: 'Low Confidence', color: '#FEE2E2', textColor: '#991B1B' },
    },
  },

  // ICP (Ideal Customer Profile) scoring
  icpScoring: {
    weights: {
      companySize: { max: 10 },
      jobLevel: { max: 10 },
      engagement: { max: 5 },
      proximity: { max: 5 },
    },
    tiers: {
      prime: { min: 25, max: 30, label: 'Prime', color: '#F59E0B' }, // Gold
      strong: { min: 20, max: 24, label: 'Strong', color: '#9CA3AF' }, // Silver
      potential: { min: 15, max: 19, label: 'Potential', color: '#CD7F32' }, // Bronze
    },
  },

  // UI settings
  ui: {
    tablePageSize: 20,
    chartAnimationDuration: 300,
    exportFilenamePrefix: 'cic_prototype',
  },
};

// Helper function to get segment by ID
export function getSegmentById(id) {
  return Object.values(CONFIG.segments).find(segment => segment.id === id);
}

// Helper function to get confidence tier
export function getConfidenceTier(score) {
  const { tiers } = CONFIG.confidenceScoring;
  if (score >= tiers.high.min) return 'high';
  if (score >= tiers.medium.min) return 'medium';
  return 'low';
}

// Helper function to get ICP tier
export function getICPTier(score) {
  const { tiers } = CONFIG.icpScoring;
  if (score >= tiers.prime.min) return 'prime';
  if (score >= tiers.strong.min) return 'strong';
  return 'potential';
}
