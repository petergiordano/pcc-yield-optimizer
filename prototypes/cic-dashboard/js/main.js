/**
 * Customer Intelligence Center - Main Bootstrap
 *
 * Initializes the CIC prototype dashboard
 */

import { CONFIG } from './config.js';
import { getMembers, getActiveMembers, healthCheck, getCacheStats } from './services/data-service.js';

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  console.log(`Initializing ${CONFIG.app.name} v${CONFIG.app.version}`);
  console.log(`Phase: ${CONFIG.app.phase}`);

  // Display placeholder message
  showPlaceholder();

  // TEST: Load and verify data pipeline
  try {
    console.log('\n========================================');
    console.log('Testing Data Pipeline (FEAT-004)');
    console.log('========================================\n');

    // Health check
    console.log('1. Running health check...');
    const health = await healthCheck();
    console.log('Health check result:', health);

    // Load all members
    console.log('\n2. Loading all members...');
    const allMembers = await getMembers();
    console.log(`✓ Loaded ${allMembers.length} total members`);

    // Load active members only
    console.log('\n3. Loading active members...');
    const activeMembers = await getActiveMembers();
    console.log(`✓ Loaded ${activeMembers.length} active members`);

    // Show sample member data
    if (allMembers.length > 0) {
      console.log('\n4. Sample member record:');
      const sample = allMembers[0];
      console.log({
        'Member #': sample['Member #'],
        'Name': sample['Full Name'],
        'Email': sample['Email'],
        'Membership': sample['Current Membership'],
        'Status': sample['Membership Status'],
        'Reservations': sample['# of Reservations'],
        'Total Paid': sample['Total Paid'],
        'Rating': sample['Pickleball Rating'],
      });
    }

    // Cache stats
    console.log('\n5. Cache statistics:');
    console.log(getCacheStats());

    // Test cached retrieval (should be instant)
    console.log('\n6. Testing cache (second call should be cached)...');
    const cachedMembers = await getMembers();
    console.log(`✓ Loaded ${cachedMembers.length} members (from cache)`);

    console.log('\n========================================');
    console.log('✓ Data Pipeline Test Complete!');
    console.log('========================================\n');

    // Update placeholder with success message
    updatePlaceholderWithDataStats(allMembers, activeMembers);

  } catch (error) {
    console.error('❌ Data pipeline test failed:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
  }

  // TODO: Initialize dashboard components
  // - CustomerIntelligenceComponent
  // - SegmentChart
  // - CorporateConnectorTable
  // - DataCoverageWidget
  // - SegmentGrid
});

/**
 * Show placeholder message while prototype is being built
 */
function showPlaceholder() {
  const mainContent = document.querySelector('.main-content');

  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder-message';
  placeholder.id = 'placeholder-content';
  placeholder.innerHTML = `
    <div style="text-align: center; padding: 60px 20px; color: #6B7280;">
      <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">
        🚧 Customer Intelligence Center - Prototype
      </h2>
      <p style="font-size: 16px; margin-bottom: 24px;">
        This prototype is currently in development (Week 0 of 6).
      </p>
      <div style="text-align: left; max-width: 600px; margin: 0 auto; background: #F9FAFB; padding: 24px; border-radius: 8px;">
        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px;">Next Steps:</h3>
        <ol style="margin-left: 20px; line-height: 1.8;">
          <li><strong>Week 1-2:</strong> Survey design & manual segmentation (50 VIP members)</li>
          <li><strong>Week 3-4:</strong> Build dashboard UI with static JSON data</li>
          <li><strong>Week 5-6:</strong> Add CourtReserve CSV import workflow</li>
        </ol>
        <p style="margin-top: 16px; font-size: 14px; color: #9CA3AF;">
          See <code>README.md</code> for setup instructions and prototype goals.
        </p>
      </div>
    </div>
  `;

  // Replace main content with placeholder
  mainContent.innerHTML = '';
  mainContent.appendChild(placeholder);
}

/**
 * Update placeholder with data pipeline stats
 */
function updatePlaceholderWithDataStats(allMembers, activeMembers) {
  const placeholder = document.getElementById('placeholder-content');
  if (!placeholder) return;

  // Calculate membership type breakdown
  const membershipTypes = {};
  allMembers.forEach(m => {
    const type = m['Current Membership'];
    if (type) {
      membershipTypes[type] = (membershipTypes[type] || 0) + 1;
    }
  });

  // Get top 3 membership types
  const topTypes = Object.entries(membershipTypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const dataStatsHTML = `
    <div style="margin-top: 32px; padding-top: 32px; border-top: 2px solid #E5E7EB;">
      <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #10B981;">
        ✓ Data Pipeline Status: Connected
      </h3>
      <div style="background: #ECFDF5; padding: 20px; border-radius: 8px; border-left: 4px solid #10B981;">
        <p style="font-size: 14px; color: #065F46; margin-bottom: 12px;">
          <strong>CourtReserve Data Successfully Loaded</strong>
        </p>
        <ul style="list-style: none; padding: 0; margin: 0; color: #047857; font-size: 14px; line-height: 1.8;">
          <li>📊 Total Members: <strong>${allMembers.length.toLocaleString()}</strong></li>
          <li>✅ Active Members: <strong>${activeMembers.length.toLocaleString()}</strong></li>
          <li>📁 Data Source: CSV (2025-10-25_member-list.csv)</li>
          <li>🔄 Cache: Enabled (5 min TTL)</li>
        </ul>
        ${topTypes.length > 0 ? `
          <p style="margin-top: 16px; font-size: 13px; color: #065F46;">
            <strong>Top Membership Types:</strong><br>
            ${topTypes.map(([type, count]) => `• ${type}: ${count}`).join('<br>')}
          </p>
        ` : ''}
        <p style="margin-top: 16px; font-size: 12px; color: #059669;">
          💡 Open the browser console to see detailed data pipeline logs
        </p>
      </div>
    </div>
  `;

  placeholder.innerHTML += dataStatsHTML;
}
