// PCC Yield Optimizer - Browser Detection & Feature Checking
// Detects browser capabilities and provides graceful degradation

/**
 * Browser Detection Utility
 * Checks for required features and browser compatibility
 */
class BrowserDetection {
  constructor() {
    this.features = {
      cssVariables: this.checkCSSVariables(),
      flexboxGap: this.checkFlexboxGap(),
      fetch: this.checkFetch(),
      localStorage: this.checkLocalStorage(),
      modernBrowser: true
    };

    this.browser = this.detectBrowser();
    this.init();
  }

  /**
   * Initialize browser detection
   */
  init() {
    // Add browser class to HTML element
    document.documentElement.classList.add(`browser-${this.browser.name.toLowerCase()}`);

    // Add feature support classes
    if (!this.features.cssVariables) {
      document.documentElement.classList.add('no-cssvar-support');
    }

    // Log browser info (for debugging)
    console.log('Browser Detection:', {
      browser: this.browser,
      features: this.features
    });

    // Check if browser is too old
    if (!this.features.modernBrowser) {
      this.showBrowserUpgradeMessage();
    }

    // Warn about missing features
    this.warnMissingFeatures();
  }

  /**
   * Detect browser name and version
   */
  detectBrowser() {
    const ua = navigator.userAgent;
    let name = 'Unknown';
    let version = 'Unknown';

    // Detect Safari
    if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
      name = 'Safari';
      const match = ua.match(/Version\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    }
    // Detect Chrome
    else if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) {
      name = 'Chrome';
      const match = ua.match(/Chrome\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    }
    // Detect Edge (Chromium)
    else if (ua.indexOf('Edg') > -1) {
      name = 'Edge';
      const match = ua.match(/Edg\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    }
    // Detect Firefox
    else if (ua.indexOf('Firefox') > -1) {
      name = 'Firefox';
      const match = ua.match(/Firefox\/(\d+)/);
      version = match ? match[1] : 'Unknown';
    }

    return { name, version };
  }

  /**
   * Check if CSS Variables are supported
   */
  checkCSSVariables() {
    try {
      return window.CSS && CSS.supports('color', 'var(--test)');
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if Flexbox gap property is supported (Safari 14.1+)
   */
  checkFlexboxGap() {
    try {
      const flex = document.createElement('div');
      flex.style.display = 'flex';
      flex.style.flexDirection = 'column';
      flex.style.rowGap = '1px';

      document.body.appendChild(flex);
      const isSupported = flex.scrollHeight === 1;
      document.body.removeChild(flex);

      return isSupported;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if Fetch API is available
   */
  checkFetch() {
    return typeof fetch !== 'undefined';
  }

  /**
   * Check if localStorage is available
   */
  checkLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if browser is modern enough
   */
  checkModernBrowser() {
    // Check for critical features
    const hasRequiredFeatures =
      this.features.cssVariables &&
      this.features.fetch &&
      typeof Promise !== 'undefined' &&
      typeof Array.prototype.forEach !== 'undefined';

    this.features.modernBrowser = hasRequiredFeatures;
    return hasRequiredFeatures;
  }

  /**
   * Show browser upgrade message if browser is too old
   */
  showBrowserUpgradeMessage() {
    const message = document.createElement('div');
    message.className = 'browser-upgrade-banner';
    message.innerHTML = `
      <div class="browser-upgrade-text">
        <strong>⚠️ Browser Update Recommended</strong><br>
        For the best experience, please update to the latest version of Chrome, Safari, or Edge.
      </div>
    `;

    document.body.insertBefore(message, document.body.firstChild);

    console.warn('Browser may not support all features. Please update to a modern browser.');
  }

  /**
   * Warn about missing features in console
   */
  warnMissingFeatures() {
    const missing = [];

    if (!this.features.cssVariables) {
      missing.push('CSS Variables');
    }
    if (!this.features.flexboxGap) {
      missing.push('Flexbox Gap (using fallback margins)');
    }
    if (!this.features.localStorage) {
      missing.push('localStorage (state persistence disabled)');
    }

    if (missing.length > 0) {
      console.warn('Missing browser features:', missing.join(', '));
      console.warn('Some features may not work optimally. Fallbacks are in place.');
    }
  }

  /**
   * Get current browser info
   */
  getBrowserInfo() {
    return {
      browser: this.browser,
      features: this.features
    };
  }

  /**
   * Check if specific feature is supported
   */
  supportsFeature(featureName) {
    return this.features[featureName] === true;
  }
}

// Initialize browser detection when DOM is ready
let browserDetection;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    browserDetection = new BrowserDetection();
  });
} else {
  browserDetection = new BrowserDetection();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrowserDetection;
}
