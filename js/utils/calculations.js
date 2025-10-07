// PCC Yield Optimizer - Business Logic Calculations
// Opportunity scoring, competitive analysis, and strategic metrics

/**
 * Calculate opportunity score for a time slot (Sprint 7.5A: Enhanced for multi-competitor)
 * @param {number} pccPopularity - PCC utilization (0-100)
 * @param {Array} competitors - Array of competitor data with popularity scores
 * @param {string} day - Day of week
 * @param {number} hour - Hour (0-23)
 * @returns {Object} - Opportunity analysis with score, level, and insights
 */
function calculateOpportunityScore(pccPopularity, competitors, day, hour) {
  // If PCC is already busy (>70%), no opportunity
  if (pccPopularity > 70) {
    return {
      score: 0,
      level: 'none',
      type: 'pcc-busy',
      pccUtilization: pccPopularity,
      message: 'PCC is already well-utilized at this time'
    };
  }

  // Calculate competitor metrics
  const competitorPopularities = competitors.map(c => c.popularity);
  const competitorMax = Math.max(...competitorPopularities);
  const competitorAvg = competitorPopularities.reduce((a, b) => a + b, 0) / competitors.length;
  const busyCompetitors = competitors.filter(c => c.popularity > 75);
  const moderateCompetitors = competitors.filter(c => c.popularity >= 60 && c.popularity <= 75);

  // If no competitors are busy (all < 60%), this is market-wide slow period
  if (competitorMax < 60) {
    return {
      score: 0,
      level: 'none',
      type: 'market-slow',
      pccUtilization: pccPopularity,
      marketMax: competitorMax,
      marketAvg: competitorAvg,
      message: 'Market-wide slow period'
    };
  }

  // Calculate gap (how much busier is the busiest competitor?)
  const gap = competitorMax - pccPopularity;
  const avgGap = competitorAvg - pccPopularity;

  // NEW: Multi-competitor opportunity score (0-10 scale)
  let score = 0;
  let level = 'none';

  // High opportunity: Large gap + multiple busy competitors
  if (gap > 40 && busyCompetitors.length >= 2) {
    score = Math.min(10, (gap / 4) + busyCompetitors.length);
    level = 'high';
  }
  // High opportunity: Massive gap with even one busy competitor
  else if (gap > 50 && busyCompetitors.length >= 1) {
    score = Math.min(10, gap / 5);
    level = 'high';
  }
  // Medium opportunity: Moderate gap with multiple moderately busy competitors
  else if (gap > 25 && (busyCompetitors.length >= 1 || moderateCompetitors.length >= 3)) {
    score = Math.min(7, (gap / 5) + (moderateCompetitors.length * 0.5));
    level = 'medium';
  }
  // Low opportunity: Small gap
  else if (gap > 15) {
    score = Math.min(5, gap / 7);
    level = 'low';
  }

  // Estimated customers calculation (considers multiple competitors)
  const totalMarketUtilization = competitorPopularities.reduce((a, b) => a + b, 0);
  const estimatedCustomers = Math.round((gap * 0.4) + (avgGap * 0.2)); // Conservative estimate

  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal
    level,
    gap,
    avgGap,
    pccUtilization: pccPopularity,
    marketMax: competitorMax,
    marketAvg: competitorAvg,
    busyCompetitors: busyCompetitors.map(c => ({
      id: c.id,
      name: c.name,
      popularity: c.popularity
    })),
    moderateCompetitors: moderateCompetitors.map(c => ({
      id: c.id,
      name: c.name,
      popularity: c.popularity
    })),
    estimatedCustomers,
    totalCompetitors: competitors.length,
    type: 'opportunity'
  };
}

/**
 * Determine if PCC is "winning" at this time slot
 * (PCC is busy and outperforming all competitors)
 * @param {number} pccPopularity - PCC utilization (0-100)
 * @param {Array} competitors - Array of competitor data with popularity scores
 * @returns {boolean} - True if PCC is winning
 */
function isCompetitiveWin(pccPopularity, competitors) {
  if (pccPopularity < 75) return false;

  const competitorMax = Math.max(...competitors.map(c => c.popularity));
  return pccPopularity > competitorMax;
}

/**
 * Calculate market opportunity score (similar to calculateOpportunityScore but simpler)
 * Used in TECH_SPEC.md example
 * @param {Object} timeSlot - Time slot data
 * @returns {Object} - Market opportunity analysis
 */
function calculateMarketOpportunity(timeSlot) {
  const competitorMax = Math.max(...timeSlot.competitors.map(c => c.popularity));
  const pccUtilization = timeSlot.pccPopularity;
  const gap = competitorMax - pccUtilization;

  if (gap > 30 && pccUtilization < 60) {
    return {
      score: gap,
      level: gap > 50 ? 'high' : 'medium',
      estimatedCustomers: Math.round(gap * 0.7), // Conservative estimate
      competitors: timeSlot.competitors.filter(c => c.popularity > 70)
    };
  }

  return { score: 0, level: 'none' };
}

/**
 * Get opportunity level color
 * @param {string} level - Opportunity level ('high', 'medium', 'low', 'none')
 * @returns {string} - Hex color code
 */
function getOpportunityColor(level) {
  const colors = {
    high: '#10B981',
    medium: '#F59E0B',
    low: '#EF4444',
    none: '#6B7280'
  };
  return colors[level] || colors.none;
}

/**
 * Format opportunity insight message
 * @param {Object} opportunity - Opportunity analysis object
 * @returns {string} - Human-readable insight
 */
function getOpportunityInsight(opportunity) {
  if (opportunity.type === 'pcc-busy') {
    return 'PCC is performing well at this time. Consider maintaining current operations.';
  }

  if (opportunity.type === 'market-slow') {
    return 'Low activity across all facilities. Not a priority time slot.';
  }

  if (opportunity.level === 'high') {
    const compNames = opportunity.busyCompetitors.map(c => c.name).join(' and ');
    return `Strong opportunity! ${compNames} ${opportunity.busyCompetitors.length > 1 ? 'are' : 'is'} at capacity while you have ${100 - opportunity.pccUtilization}% available capacity.`;
  }

  if (opportunity.level === 'medium') {
    return `Moderate opportunity to capture overflow demand from busier competitors.`;
  }

  if (opportunity.level === 'low') {
    return `Small opportunity gap. Monitor for trends.`;
  }

  return '';
}
