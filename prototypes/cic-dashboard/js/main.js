/**
 * Customer Intelligence Center - Main Bootstrap
 *
 * Initializes the CIC prototype dashboard
 */

import { CONFIG } from './config.js';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  console.log(`Initializing ${CONFIG.app.name} v${CONFIG.app.version}`);
  console.log(`Phase: ${CONFIG.app.phase}`);

  // Display placeholder message
  showPlaceholder();

  // TODO: Load data and initialize components
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
