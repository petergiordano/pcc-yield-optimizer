// PCC Yield Optimizer - Button Loading State Utility
// Add loading spinners to buttons during async operations

/**
 * Set button to loading state
 * @param {HTMLButtonElement} button - Button element
 * @param {string} loadingText - Optional text to show while loading
 */
function setButtonLoading(button, loadingText = null) {
  if (!button) return;

  // Store original content and state
  button.dataset.originalContent = button.innerHTML;
  button.dataset.originalDisabled = button.disabled;

  // Disable button
  button.disabled = true;

  // Add loading class (CSS will show spinner)
  button.classList.add('btn-loading');

  // Optionally change button text
  if (loadingText) {
    button.innerHTML = loadingText;
  }
}

/**
 * Remove loading state from button
 * @param {HTMLButtonElement} button - Button element
 */
function removeButtonLoading(button) {
  if (!button) return;

  // Remove loading class
  button.classList.remove('btn-loading');

  // Restore original content
  if (button.dataset.originalContent) {
    button.innerHTML = button.dataset.originalContent;
    delete button.dataset.originalContent;
  }

  // Restore original disabled state
  if (button.dataset.originalDisabled !== undefined) {
    button.disabled = button.dataset.originalDisabled === 'true';
    delete button.dataset.originalDisabled;
  } else {
    button.disabled = false;
  }
}

/**
 * Execute async function with button loading state
 * @param {HTMLButtonElement} button - Button element
 * @param {Function} asyncFn - Async function to execute
 * @param {string} loadingText - Optional loading text
 * @returns {Promise} Result of async function
 */
async function withButtonLoading(button, asyncFn, loadingText = null) {
  try {
    setButtonLoading(button, loadingText);
    const result = await asyncFn();
    return result;
  } finally {
    removeButtonLoading(button);
  }
}

/**
 * Add click handler with automatic loading state
 * @param {string|HTMLButtonElement} buttonSelector - Button selector or element
 * @param {Function} asyncFn - Async function to execute on click
 * @param {string} loadingText - Optional loading text
 */
function addLoadingClickHandler(buttonSelector, asyncFn, loadingText = null) {
  const button = typeof buttonSelector === 'string'
    ? document.querySelector(buttonSelector)
    : buttonSelector;

  if (!button) {
    console.error(`Button not found: ${buttonSelector}`);
    return;
  }

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    await withButtonLoading(button, asyncFn, loadingText);
  });
}
