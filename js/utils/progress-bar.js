// PCC Yield Optimizer - Progress Bar Utility
// YouTube/GitHub-style top progress bar for page loads and async operations

class ProgressBar {
  constructor() {
    this.progressElement = null;
    this.currentProgress = 0;
    this.intervalId = null;
    this.init();
  }

  /**
   * Initialize and inject progress bar into DOM
   */
  init() {
    // Create progress bar element
    this.progressElement = document.createElement('div');
    this.progressElement.id = 'global-progress-bar';
    this.progressElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #005DAA, #0080FF);
      z-index: 9999;
      transition: width 0.3s ease-out, opacity 0.2s ease-out;
      opacity: 1;
      box-shadow: 0 0 10px rgba(0, 93, 170, 0.5);
    `;

    // Append to body
    document.body.appendChild(this.progressElement);
  }

  /**
   * Start progress bar (simulates progress)
   */
  start() {
    this.currentProgress = 0;
    this.progressElement.style.width = '0%';
    this.progressElement.style.opacity = '1';

    // Simulate progress increments
    this.intervalId = setInterval(() => {
      if (this.currentProgress < 70) {
        // Quick progress to 70%
        this.currentProgress += Math.random() * 10;
      } else if (this.currentProgress < 90) {
        // Slower progress to 90%
        this.currentProgress += Math.random() * 2;
      } else {
        // Very slow progress after 90%
        this.currentProgress += Math.random() * 0.5;
      }

      // Cap at 95% until complete() is called
      if (this.currentProgress > 95) {
        this.currentProgress = 95;
      }

      this.progressElement.style.width = `${this.currentProgress}%`;
    }, 100);
  }

  /**
   * Set progress to specific percentage
   * @param {number} percent - Progress percentage (0-100)
   */
  setProgress(percent) {
    this.currentProgress = Math.min(100, Math.max(0, percent));
    this.progressElement.style.width = `${this.currentProgress}%`;
  }

  /**
   * Complete progress bar (jump to 100% and fade out)
   */
  complete() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    // Jump to 100%
    this.currentProgress = 100;
    this.progressElement.style.width = '100%';

    // Fade out and reset after delay
    setTimeout(() => {
      this.progressElement.style.opacity = '0';

      setTimeout(() => {
        this.reset();
      }, 200);
    }, 400);
  }

  /**
   * Reset progress bar to initial state
   */
  reset() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.currentProgress = 0;
    this.progressElement.style.width = '0%';
    this.progressElement.style.opacity = '0';
  }

  /**
   * Show indeterminate progress (for operations without known duration)
   */
  showIndeterminate() {
    this.reset();
    this.progressElement.style.opacity = '1';
    this.progressElement.style.width = '30%';
    this.progressElement.style.transition = 'none';
    this.progressElement.style.animation = 'progress-indeterminate 1.5s ease-in-out infinite';

    // Add keyframes if not already defined
    if (!document.getElementById('progress-keyframes')) {
      const style = document.createElement('style');
      style.id = 'progress-keyframes';
      style.innerHTML = `
        @keyframes progress-indeterminate {
          0% { left: -30%; width: 30%; }
          50% { left: 50%; width: 30%; }
          100% { left: 100%; width: 30%; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /**
   * Hide indeterminate progress
   */
  hideIndeterminate() {
    this.progressElement.style.animation = 'none';
    this.progressElement.style.transition = 'width 0.3s ease-out, opacity 0.2s ease-out';
    this.complete();
  }
}

// Create global instance
window.progressBar = new ProgressBar();
