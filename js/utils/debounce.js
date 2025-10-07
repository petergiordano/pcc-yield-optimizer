// PCC Yield Optimizer - Debounce & Throttle Utilities
// Performance optimization for filter changes and expensive operations

/**
 * Debounce function - delays execution until after wait time has elapsed
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300, immediate = false) {
  let timeout;

  return function executedFunction(...args) {
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function - limits execution to once per wait period
 * @param {Function} func - Function to throttle
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, wait = 300) {
  let timeout;
  let previous = 0;

  return function executedFunction(...args) {
    const context = this;
    const now = Date.now();

    if (!previous) previous = now;

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      func.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

/**
 * Add debounced event listener to element
 * @param {HTMLElement|string} element - Element or selector
 * @param {string} eventType - Event type (e.g., 'input', 'change')
 * @param {Function} handler - Event handler function
 * @param {number} wait - Debounce wait time in ms
 */
function addDebouncedListener(element, eventType, handler, wait = 300) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;

  if (!el) {
    console.error(`Element not found: ${element}`);
    return;
  }

  const debouncedHandler = debounce(handler, wait);
  el.addEventListener(eventType, debouncedHandler);

  // Return cleanup function
  return () => el.removeEventListener(eventType, debouncedHandler);
}

/**
 * Add throttled event listener to element
 * @param {HTMLElement|string} element - Element or selector
 * @param {string} eventType - Event type (e.g., 'scroll', 'resize')
 * @param {Function} handler - Event handler function
 * @param {number} wait - Throttle wait time in ms
 */
function addThrottledListener(element, eventType, handler, wait = 300) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;

  if (!el) {
    console.error(`Element not found: ${element}`);
    return;
  }

  const throttledHandler = throttle(handler, wait);
  el.addEventListener(eventType, throttledHandler);

  // Return cleanup function
  return () => el.removeEventListener(eventType, throttledHandler);
}
