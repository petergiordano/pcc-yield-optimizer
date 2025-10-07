// PCC Yield Optimizer - Keyboard Navigation Utilities
// Focus management, keyboard shortcuts, focus trapping

/**
 * Focus trap for modals and panels
 * Prevents tab navigation from leaving the specified element
 */
class FocusTrap {
  constructor(element) {
    this.element = element;
    this.focusableElements = [];
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
    this.previouslyFocusedElement = null;
  }

  /**
   * Activate the focus trap
   * @param {boolean} autoFocus - Automatically focus first element
   */
  activate(autoFocus = true) {
    // Save the currently focused element
    this.previouslyFocusedElement = document.activeElement;

    // Get all focusable elements within the trap
    this.updateFocusableElements();

    if (this.focusableElements.length === 0) {
      console.warn('[FocusTrap] No focusable elements found');
      return;
    }

    // Set first and last elements
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];

    // Add event listener for Tab key
    this.element.addEventListener('keydown', this.handleKeyDown);

    // Focus first element if requested
    if (autoFocus && this.firstFocusableElement) {
      setTimeout(() => {
        this.firstFocusableElement.focus();
      }, 100);
    }

    console.log(`[FocusTrap] Activated with ${this.focusableElements.length} focusable elements`);
  }

  /**
   * Deactivate the focus trap and restore focus
   */
  deactivate() {
    this.element.removeEventListener('keydown', this.handleKeyDown);

    // Restore focus to previously focused element
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.focus) {
      setTimeout(() => {
        this.previouslyFocusedElement.focus();
      }, 100);
    }

    console.log('[FocusTrap] Deactivated');
  }

  /**
   * Update list of focusable elements
   */
  updateFocusableElements() {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    this.focusableElements = Array.from(
      this.element.querySelectorAll(selector)
    ).filter(el => {
      // Exclude hidden elements
      return el.offsetParent !== null;
    });
  }

  /**
   * Handle Tab key press
   * @param {KeyboardEvent} e
   */
  handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;

    // Update focusable elements (in case DOM changed)
    this.updateFocusableElements();

    if (this.focusableElements.length === 0) return;

    // Shift + Tab (backward)
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    }
    // Tab (forward)
    else {
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }
}

/**
 * Global keyboard shortcut manager
 */
class KeyboardShortcuts {
  constructor() {
    this.shortcuts = new Map();
    this.enabled = true;
  }

  /**
   * Register a keyboard shortcut
   * @param {string} key - Key combination (e.g., 'Escape', 'Ctrl+E', 'Cmd+E')
   * @param {Function} callback - Function to call when shortcut is pressed
   * @param {string} description - Description of what the shortcut does
   */
  register(key, callback, description = '') {
    this.shortcuts.set(key.toLowerCase(), { callback, description });
    console.log(`[KeyboardShortcuts] Registered: ${key} - ${description}`);
  }

  /**
   * Unregister a keyboard shortcut
   * @param {string} key - Key combination to remove
   */
  unregister(key) {
    this.shortcuts.delete(key.toLowerCase());
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} e
   */
  handleKeyDown = (e) => {
    if (!this.enabled) return;

    // Build key combination string
    let keyCombo = '';

    if (e.ctrlKey || e.metaKey) {
      keyCombo += e.ctrlKey ? 'ctrl+' : 'cmd+';
    }
    if (e.altKey) keyCombo += 'alt+';
    if (e.shiftKey) keyCombo += 'shift+';

    keyCombo += e.key.toLowerCase();

    // Check if this combination is registered
    const shortcut = this.shortcuts.get(keyCombo);

    if (shortcut) {
      e.preventDefault();
      shortcut.callback(e);
      console.log(`[KeyboardShortcuts] Executed: ${keyCombo}`);
    }
  }

  /**
   * Enable keyboard shortcuts
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable keyboard shortcuts (useful when typing in inputs)
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Initialize global keyboard listener
   */
  init() {
    document.addEventListener('keydown', this.handleKeyDown);
    console.log('[KeyboardShortcuts] Initialized');
  }

  /**
   * Get all registered shortcuts
   * @returns {Array} List of shortcuts with descriptions
   */
  getShortcuts() {
    const list = [];
    this.shortcuts.forEach((value, key) => {
      list.push({ key, description: value.description });
    });
    return list;
  }
}

/**
 * Arrow key navigation for grid-like structures
 */
class GridNavigation {
  constructor(container, options = {}) {
    this.container = container;
    this.cells = [];
    this.currentIndex = -1;
    this.rows = options.rows || 7;
    this.cols = options.cols || 24;
    this.cellSelector = options.cellSelector || '.heatmap-cell';
    this.wrapAround = options.wrapAround !== false;
  }

  /**
   * Initialize grid navigation
   */
  init() {
    this.updateCells();
    this.container.addEventListener('keydown', this.handleKeyDown);
    console.log(`[GridNavigation] Initialized with ${this.cells.length} cells`);
  }

  /**
   * Update cell list
   */
  updateCells() {
    this.cells = Array.from(this.container.querySelectorAll(this.cellSelector))
      .filter(cell => cell.offsetParent !== null); // Only visible cells
  }

  /**
   * Handle arrow key navigation
   * @param {KeyboardEvent} e
   */
  handleKeyDown = (e) => {
    // Only handle arrow keys
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Space'].includes(e.key)) {
      return;
    }

    // Update cells in case grid changed
    this.updateCells();

    // Find currently focused cell
    const focusedCell = document.activeElement;
    this.currentIndex = this.cells.indexOf(focusedCell);

    if (this.currentIndex === -1 && e.key.startsWith('Arrow')) {
      // No cell focused, focus first cell
      this.focusCell(0);
      e.preventDefault();
      return;
    }

    let newIndex = this.currentIndex;

    switch (e.key) {
      case 'ArrowUp':
        newIndex = this.currentIndex - this.cols;
        e.preventDefault();
        break;
      case 'ArrowDown':
        newIndex = this.currentIndex + this.cols;
        e.preventDefault();
        break;
      case 'ArrowLeft':
        newIndex = this.currentIndex - 1;
        e.preventDefault();
        break;
      case 'ArrowRight':
        newIndex = this.currentIndex + 1;
        e.preventDefault();
        break;
      case 'Enter':
      case 'Space':
        // Activate the focused cell
        if (this.currentIndex !== -1) {
          this.cells[this.currentIndex].click();
          e.preventDefault();
        }
        return;
    }

    // Wrap around or clamp
    if (this.wrapAround) {
      if (newIndex < 0) newIndex = this.cells.length - 1;
      if (newIndex >= this.cells.length) newIndex = 0;
    } else {
      newIndex = Math.max(0, Math.min(this.cells.length - 1, newIndex));
    }

    this.focusCell(newIndex);
  }

  /**
   * Focus a specific cell
   * @param {number} index - Cell index
   */
  focusCell(index) {
    if (index < 0 || index >= this.cells.length) return;

    // Remove keyboard-focused class from all cells
    this.cells.forEach(cell => cell.classList.remove('keyboard-focused'));

    // Add class and focus
    const cell = this.cells[index];
    cell.classList.add('keyboard-focused');
    cell.focus();

    this.currentIndex = index;
  }

  /**
   * Destroy grid navigation
   */
  destroy() {
    this.container.removeEventListener('keydown', this.handleKeyDown);
  }
}

/**
 * Announce messages to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
function announceToScreenReader(message, priority = 'polite') {
  let liveRegion = document.getElementById(`aria-live-${priority}`);

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `aria-live-${priority}`;
    liveRegion.className = 'aria-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }

  // Clear then set message (ensures it's announced even if same text)
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion.textContent = message;
    console.log(`[Screen Reader] Announced (${priority}): ${message}`);
  }, 100);
}

/**
 * Save currently focused element
 * @returns {Element} Currently focused element
 */
function saveFocus() {
  return document.activeElement;
}

/**
 * Restore focus to a previously saved element
 * @param {Element} element - Element to focus
 */
function restoreFocus(element) {
  if (element && element.focus) {
    setTimeout(() => {
      element.focus();
    }, 100);
  }
}

// Create global keyboard shortcuts instance
window.keyboardShortcuts = new KeyboardShortcuts();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FocusTrap,
    KeyboardShortcuts,
    GridNavigation,
    announceToScreenReader,
    saveFocus,
    restoreFocus
  };
}
