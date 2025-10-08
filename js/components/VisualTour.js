/**
 * Visual Tour Component
 * Main tour modal with navigation, progress tracking, and diagram rendering
 */

class VisualTour {
  constructor() {
    this.currentPart = 1;
    this.currentStep = 1;
    this.isOpen = false;
    this.isTransitioning = false;
    this.modal = null;
    this.keyboardHandler = null;
  }

  /**
   * Initialize tour (attach button listeners)
   */
  init() {
    const tourButton = document.querySelector('.tour-button');
    if (tourButton) {
      tourButton.addEventListener('click', () => this.launch());

      // Add first-visit pulse animation if needed
      if (!TourStorage.getFirstVisitDate() && !TourStorage.isDismissed()) {
        tourButton.classList.add('first-visit');
      }
    }
  }

  /**
   * Launch tour with context awareness
   */
  launch() {
    const startPosition = this.getTourStartPosition();
    this.open(startPosition.part, startPosition.step);
  }

  /**
   * Determine where to start tour based on context
   * @returns {Object} {part, step}
   */
  getTourStartPosition() {
    const hasCompletedTour = TourStorage.isCompleted();
    const savedProgress = TourStorage.getProgress();

    // If user has saved progress and hasn't completed, resume from there
    if (savedProgress && !hasCompletedTour) {
      return { part: savedProgress.part, step: savedProgress.step };
    }

    // Otherwise, always start from the beginning
    // This ensures users see the full tour experience
    return { part: 1, step: 1 };
  }

  /**
   * Get currently active dashboard
   * @returns {string} 'competitive', 'opportunity', 'gap', or 'map'
   */
  getCurrentActiveDashboard() {
    const activeTab = document.querySelector('.dashboard-tab.active');
    if (!activeTab) return 'competitive';

    const tabText = activeTab.textContent.toLowerCase();
    if (tabText.includes('opportunity')) return 'opportunity';
    if (tabText.includes('gap')) return 'gap';
    if (tabText.includes('map') || tabText.includes('geographic')) return 'map';
    return 'competitive';
  }

  /**
   * Open tour modal
   * @param {number} part - Starting part (1-4)
   * @param {number} step - Starting step
   */
  open(part = 1, step = 1) {
    if (this.isOpen) return;

    this.currentPart = part;
    this.currentStep = step;
    this.isOpen = true;

    this.createModal();
    this.renderStep();
    this.attachEventListeners();

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';

    // Remove first-visit animation
    const tourButton = document.querySelector('.tour-button');
    if (tourButton) {
      tourButton.classList.remove('first-visit');
    }
  }

  /**
   * Close tour modal
   * @param {boolean} saveProgress - Whether to save current progress
   */
  close(saveProgress = true) {
    if (!this.isOpen) return;

    if (saveProgress && !TourContent.isFinalStep(this.currentPart, this.currentStep)) {
      TourStorage.saveProgress(this.currentPart, this.currentStep);
      TourStorage.markDismissed();
    }

    this.isOpen = false;

    if (this.modal) {
      this.modal.remove();
      this.modal = null;
    }

    // Restore body scrolling
    document.body.style.overflow = '';

    // Remove keyboard listener
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
      this.keyboardHandler = null;
    }
  }

  /**
   * Create modal DOM structure
   */
  createModal() {
    const backdrop = document.createElement('div');
    backdrop.className = 'tour-modal-backdrop';

    const modal = document.createElement('div');
    modal.className = 'tour-modal';

    modal.innerHTML = `
      <div class="tour-header">
        <div class="tour-header-content">
          <h1 class="tour-title">Visual Tour</h1>
          <p class="tour-subtitle">Discover the power of competitive intelligence</p>
        </div>
        <button class="tour-close" aria-label="Close tour">×</button>
        <div class="tour-progress-bar">
          <div class="tour-progress-fill" style="width: 0%;"></div>
          <span class="tour-progress-text">0%</span>
        </div>
      </div>

      <div class="tour-content">
        <div class="tour-diagram"></div>
        <div class="tour-text">
          <div class="tour-part-label">
            <span class="tour-part-icon"></span>
            <div>
              <h2 class="tour-part-title"></h2>
              <p class="tour-part-subtitle"></p>
            </div>
          </div>
          <h3 class="tour-step-title"></h3>
          <p class="tour-step-description"></p>
          <div class="tour-navigation-help">
            <p style="font-weight: 600; margin-bottom: 8px;">Navigation:</p>
            <ul style="font-size: 14px; color: #6B7280; margin: 0; padding-left: 20px;">
              <li>Arrow keys: Navigate steps</li>
              <li>Escape: Close tour</li>
              <li>Click dots: Jump to step</li>
            </ul>
          </div>
          <div class="tour-dont-show-again" style="display: none;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="dontShowAgainCheckbox">
              <span>Don't show this tour again</span>
            </label>
          </div>
        </div>
      </div>

      <div class="tour-footer">
        <div class="tour-position"></div>
        <div class="tour-step-dots"></div>
        <div class="tour-actions">
          <button class="tour-back" style="display: none;">← Back</button>
          <button class="tour-continue">Continue →</button>
        </div>
      </div>

      <div class="tour-reset" style="position: absolute; bottom: 8px; left: 8px;">
        <a href="#" style="font-size: 11px; color: #9CA3AF; text-decoration: none;">Reset Tour Progress</a>
      </div>
    `;

    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    this.modal = backdrop;
  }

  /**
   * Render current step content and diagram
   */
  renderStep() {
    const step = TourContent.getStep(this.currentPart, this.currentStep);
    const part = TourContent.getPart(this.currentPart);

    if (!step || !part) return;

    // Update part label
    const partIcon = this.modal.querySelector('.tour-part-icon');
    const partTitle = this.modal.querySelector('.tour-part-title');
    const partSubtitle = this.modal.querySelector('.tour-part-subtitle');

    partIcon.textContent = part.icon;
    partTitle.textContent = part.title;
    partSubtitle.textContent = `Part ${this.currentPart} of 4`;

    // Update step content
    const stepTitle = this.modal.querySelector('.tour-step-title');
    const stepDescription = this.modal.querySelector('.tour-step-description');

    stepTitle.textContent = step.title;
    stepDescription.textContent = step.description;

    // Update position indicator
    const position = this.modal.querySelector('.tour-position');
    position.textContent = `Part ${this.currentPart} • Step ${this.currentStep} of ${part.stepCount}`;

    // Update progress bar
    const progress = TourContent.calculateProgress(this.currentPart, this.currentStep);
    const progressFill = this.modal.querySelector('.tour-progress-fill');
    const progressText = this.modal.querySelector('.tour-progress-text');

    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    // Render diagram
    this.renderDiagram(step.diagramType, step.highlight);

    // Update navigation buttons
    this.updateNavigationButtons();

    // Update step dots
    this.renderStepDots();

    // Show "don't show again" on final step
    const dontShowAgain = this.modal.querySelector('.tour-dont-show-again');
    if (step.showDontShowAgain) {
      dontShowAgain.style.display = 'block';
    } else {
      dontShowAgain.style.display = 'none';
    }

    // Save progress
    TourStorage.saveProgress(this.currentPart, this.currentStep);
  }

  /**
   * Render diagram for current step
   * @param {string} diagramType - Type of diagram
   * @param {string|null} highlight - Element to highlight
   */
  renderDiagram(diagramType, highlight) {
    const diagramContainer = this.modal.querySelector('.tour-diagram');

    // Clear existing diagram
    diagramContainer.innerHTML = '';

    // Create new diagram
    const diagram = TourDiagrams.createDiagram(diagramType, highlight);
    diagramContainer.appendChild(diagram);
  }

  /**
   * Update navigation button visibility and text
   */
  updateNavigationButtons() {
    const backButton = this.modal.querySelector('.tour-back');
    const continueButton = this.modal.querySelector('.tour-continue');

    // Back button visibility
    if (this.currentPart === 1 && this.currentStep === 1) {
      backButton.style.display = 'none';
    } else {
      backButton.style.display = 'inline-block';
    }

    // Continue button text
    if (TourContent.isFinalStep(this.currentPart, this.currentStep)) {
      continueButton.textContent = 'Get Started! 🚀';
    } else if (TourContent.isLastStepOfPart(this.currentPart, this.currentStep)) {
      continueButton.textContent = 'Next Part →';
    } else {
      continueButton.textContent = 'Continue →';
    }
  }

  /**
   * Render step dots for current part
   */
  renderStepDots() {
    const dotsContainer = this.modal.querySelector('.tour-step-dots');
    dotsContainer.innerHTML = '';

    const part = TourContent.getPart(this.currentPart);
    if (!part) return;

    for (let i = 1; i <= part.stepCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'dot';

      if (i < this.currentStep) {
        dot.classList.add('completed');
        dot.innerHTML = '✓';
      } else if (i === this.currentStep) {
        dot.classList.add('active');
      }

      dot.addEventListener('click', () => {
        if (!this.isTransitioning) {
          this.goToStep(this.currentPart, i);
        }
      });

      dotsContainer.appendChild(dot);
    }
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Close button
    const closeButton = this.modal.querySelector('.tour-close');
    closeButton.addEventListener('click', () => this.close(true));

    // Back button
    const backButton = this.modal.querySelector('.tour-back');
    backButton.addEventListener('click', () => this.navigateBack());

    // Continue button
    const continueButton = this.modal.querySelector('.tour-continue');
    continueButton.addEventListener('click', () => this.navigateForward());

    // Reset link
    const resetLink = this.modal.querySelector('.tour-reset a');
    resetLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Reset all tour progress? This will restart the tour from the beginning.')) {
        TourStorage.reset();
        this.close(false);
        this.open(1, 1);
      }
    });

    // Don't show again checkbox
    const checkbox = this.modal.querySelector('#dontShowAgainCheckbox');
    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        TourStorage.setDontShowAgain(e.target.checked);
      });
    }

    // Keyboard navigation
    this.keyboardHandler = (e) => {
      if (this.isTransitioning) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          this.navigateForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.navigateBack();
          break;
        case 'Escape':
          e.preventDefault();
          const progress = TourContent.calculateProgress(this.currentPart, this.currentStep);
          if (progress > 25) {
            if (confirm('Exit the tour? Your progress will be saved.')) {
              this.close(true);
            }
          } else {
            this.close(true);
          }
          break;
      }
    };
    document.addEventListener('keydown', this.keyboardHandler);

    // Backdrop click to close
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close(true);
      }
    });
  }

  /**
   * Navigate to next step
   */
  navigateForward() {
    if (this.isTransitioning) return;

    // If final step, complete tour and close
    if (TourContent.isFinalStep(this.currentPart, this.currentStep)) {
      TourStorage.markCompleted();
      this.close(false);
      return;
    }

    const next = TourContent.getNextStep(this.currentPart, this.currentStep);
    if (next) {
      this.goToStep(next.part, next.step);
    }
  }

  /**
   * Navigate to previous step
   */
  navigateBack() {
    if (this.isTransitioning) return;

    const previous = TourContent.getPreviousStep(this.currentPart, this.currentStep);
    if (previous) {
      this.goToStep(previous.part, previous.step);
    }
  }

  /**
   * Jump to specific step with transition
   * @param {number} part - Target part
   * @param {number} step - Target step
   */
  goToStep(part, step) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentPart = part;
    this.currentStep = step;

    // Fade out content
    const content = this.modal.querySelector('.tour-content');
    content.style.opacity = '0';
    content.style.transition = 'opacity 150ms ease-out';

    // Fade in new content after transition
    setTimeout(() => {
      this.renderStep();
      content.style.opacity = '1';
      content.style.transition = 'opacity 200ms ease-in';

      setTimeout(() => {
        this.isTransitioning = false;
        content.style.transition = '';
      }, 200);
    }, 150);
  }
}
