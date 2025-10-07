// PCC Yield Optimizer - Error Handler Utility
// Centralized error handling with user-friendly messages and actions

/**
 * Show error message to user
 * @param {string} title - Error title
 * @param {string} message - Error description
 * @param {Array<Object>} actions - Array of {text, onClick, primary} objects
 * @param {Object} options - Additional options (autoHide, duration, type)
 */
function showError(title, message, actions = [], options = {}) {
  const {
    autoHide = false,
    duration = 5000,
    type = 'error' // 'error', 'warning', 'toast'
  } = options;

  if (type === 'toast') {
    showErrorToast(title, message, { autoHide, duration });
  } else {
    showErrorMessage(title, message, actions, type);
  }
}

/**
 * Show inline error message in container
 * @param {string} title - Error title
 * @param {string} message - Error description
 * @param {Array<Object>} actions - Action buttons
 * @param {string} type - 'error' or 'warning'
 * @returns {HTMLElement} Error message element
 */
function showErrorMessage(title, message, actions = [], type = 'error') {
  const className = type === 'warning' ? 'warning-message' : 'error-message';
  const icon = type === 'warning' ? '⚠️' : '❌';

  const errorHTML = `
    <div class="${className}">
      <div class="${type}-message-icon">${icon}</div>
      <div class="${type}-message-title">${title}</div>
      <div class="${type}-message-description">${message}</div>
      ${renderErrorActions(actions)}
    </div>
  `;

  // Return HTML string for manual injection
  return errorHTML;
}

/**
 * Render error action buttons
 * @param {Array<Object>} actions - Array of action objects
 * @returns {string} HTML string
 */
function renderErrorActions(actions) {
  if (actions.length === 0) return '';

  const buttons = actions
    .map((action, index) => {
      const btnClass = action.primary ? 'error-btn error-btn-retry' : 'error-btn error-btn-continue';
      return `<button class="${btnClass}" data-error-action="${index}">${action.text}</button>`;
    })
    .join('');

  return `<div class="error-actions">${buttons}</div>`;
}

/**
 * Show error toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {Object} options - Toast options
 */
function showErrorToast(title, message, options = {}) {
  const {
    autoHide = true,
    duration = 5000,
    type = 'error' // 'error', 'warning', 'success'
  } = options;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `error-toast ${type}-toast`;
  toast.innerHTML = `
    <div class="error-toast-icon">${getToastIcon(type)}</div>
    <div class="error-toast-content">
      <div class="error-toast-title">${title}</div>
      <div class="error-toast-message">${message}</div>
    </div>
    <button class="error-toast-close" aria-label="Close">×</button>
  `;

  // Add to DOM
  document.body.appendChild(toast);

  // Attach close handler
  const closeBtn = toast.querySelector('.error-toast-close');
  closeBtn.addEventListener('click', () => hideToast(toast));

  // Auto-hide after duration
  if (autoHide) {
    setTimeout(() => hideToast(toast), duration);
  }

  return toast;
}

/**
 * Get icon for toast type
 * @param {string} type - Toast type
 * @returns {string} Icon emoji
 */
function getToastIcon(type) {
  switch (type) {
    case 'success':
      return '✅';
    case 'warning':
      return '⚠️';
    case 'error':
    default:
      return '❌';
  }
}

/**
 * Hide toast notification
 * @param {HTMLElement} toast - Toast element
 */
function hideToast(toast) {
  toast.classList.add('hiding');
  setTimeout(() => toast.remove(), 300);
}

/**
 * Show error overlay (for critical failures)
 * @param {string} title - Overlay title
 * @param {string} message - Overlay message
 * @param {Array<Object>} actions - Action buttons
 */
function showErrorOverlay(title, message, actions = []) {
  const overlay = document.createElement('div');
  overlay.className = 'error-overlay';
  overlay.innerHTML = `
    <div class="error-overlay-content">
      <div class="error-overlay-icon">⚠️</div>
      <div class="error-overlay-title">${title}</div>
      <div class="error-overlay-description">${message}</div>
      ${renderOverlayActions(actions)}
    </div>
  `;

  document.body.appendChild(overlay);

  // Attach action handlers
  attachActionHandlers(overlay, actions);

  return overlay;
}

/**
 * Render overlay action buttons
 * @param {Array<Object>} actions - Array of action objects
 * @returns {string} HTML string
 */
function renderOverlayActions(actions) {
  if (actions.length === 0) return '';

  const buttons = actions
    .map((action, index) => {
      const btnClass = action.primary ? 'error-btn error-btn-retry' : 'error-btn error-btn-continue';
      return `<button class="${btnClass}" data-overlay-action="${index}">${action.text}</button>`;
    })
    .join('');

  return `<div class="error-overlay-actions">${buttons}</div>`;
}

/**
 * Attach event listeners to action buttons
 * @param {HTMLElement} container - Container element
 * @param {Array<Object>} actions - Array of actions
 */
function attachActionHandlers(container, actions) {
  const buttons = container.querySelectorAll('[data-error-action], [data-overlay-action]');

  buttons.forEach(button => {
    const indexAttr = button.dataset.errorAction || button.dataset.overlayAction;
    const index = parseInt(indexAttr);
    const action = actions[index];

    if (action && typeof action.onClick === 'function') {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        action.onClick(e);
      });
    }
  });
}

/**
 * Hide error overlay
 * @param {HTMLElement} overlay - Overlay element (optional, finds automatically if not provided)
 */
function hideErrorOverlay(overlay) {
  const el = overlay || document.querySelector('.error-overlay');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }
}

/**
 * Predefined error configurations
 */
const ErrorPresets = {
  /**
   * Network error - failed to fetch data
   */
  networkError: (retryCallback) => ({
    title: 'Unable to Load Data',
    message: 'We couldn\'t connect to the server. Please check your internet connection and try again.',
    actions: [
      {
        text: 'Retry',
        primary: true,
        onClick: retryCallback || (() => window.location.reload())
      },
      {
        text: 'Continue Anyway',
        primary: false,
        onClick: () => {
          const container = document.querySelector('.error-message');
          if (container) container.remove();
        }
      }
    ]
  }),

  /**
   * Data not found error
   */
  dataNotFound: (resourceName = 'data') => ({
    title: `${resourceName} Not Found`,
    message: `The requested ${resourceName.toLowerCase()} could not be found. It may have been moved or deleted.`,
    actions: [
      {
        text: 'Go Back',
        primary: true,
        onClick: () => window.history.back()
      }
    ]
  }),

  /**
   * Browser not supported
   */
  browserNotSupported: () => ({
    title: 'Browser Not Supported',
    message: 'Your browser doesn\'t support all features required by this dashboard. Please upgrade to the latest version of Chrome, Firefox, Safari, or Edge for the best experience.',
    actions: [
      {
        text: 'Learn More',
        primary: true,
        onClick: () => window.open('https://browsehappy.com/', '_blank')
      },
      {
        text: 'Continue Anyway',
        primary: false,
        onClick: () => hideErrorOverlay()
      }
    ]
  }),

  /**
   * Generic error
   */
  genericError: (details = '') => ({
    title: 'Something Went Wrong',
    message: details || 'An unexpected error occurred. Please try refreshing the page.',
    actions: [
      {
        text: 'Refresh Page',
        primary: true,
        onClick: () => window.location.reload()
      }
    ]
  })
};

/**
 * Check browser compatibility
 * @returns {Object} Compatibility report {supported, missing}
 */
function checkBrowserCompatibility() {
  const required = {
    fetch: typeof fetch !== 'undefined',
    promise: typeof Promise !== 'undefined',
    localStorage: typeof Storage !== 'undefined',
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid')
  };

  const missing = Object.keys(required).filter(feature => !required[feature]);
  const supported = missing.length === 0;

  return { supported, missing };
}

/**
 * Handle error with appropriate UI response
 * @param {Error} error - Error object
 * @param {Object} context - Context object with info about where error occurred
 */
function handleError(error, context = {}) {
  console.error('[Error Handler]', error, context);

  const { component, action, retryCallback } = context;

  // Determine error type and show appropriate message
  if (error.message.includes('fetch') || error.message.includes('network')) {
    const preset = ErrorPresets.networkError(retryCallback);
    showError(preset.title, preset.message, preset.actions);
  } else if (error.message.includes('404') || error.message.includes('not found')) {
    const preset = ErrorPresets.dataNotFound(component);
    showError(preset.title, preset.message, preset.actions);
  } else {
    const preset = ErrorPresets.genericError(error.message);
    showError(preset.title, preset.message, preset.actions);
  }
}

// Export to global scope
window.showError = showError;
window.showErrorToast = showErrorToast;
window.showErrorOverlay = showErrorOverlay;
window.hideErrorOverlay = hideErrorOverlay;
window.handleError = handleError;
window.checkBrowserCompatibility = checkBrowserCompatibility;
window.ErrorPresets = ErrorPresets;
