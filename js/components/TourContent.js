/**
 * Tour Content Structure
 * Defines all 4 parts and 18 steps of the visual tour
 */

const TourContent = {
  /**
   * Tour parts metadata
   */
  parts: [
    {
      id: 1,
      title: 'Understanding Competitive Intelligence',
      icon: '🎯',
      stepCount: 6,
      progressStart: 0,
      progressEnd: 25
    },
    {
      id: 2,
      title: 'Dashboard Features',
      icon: '📊',
      stepCount: 5,
      progressStart: 25,
      progressEnd: 50
    },
    {
      id: 3,
      title: 'Taking Action',
      icon: '🚀',
      stepCount: 4,
      progressStart: 50,
      progressEnd: 75
    },
    {
      id: 4,
      title: 'Advanced Features',
      icon: '🎓',
      stepCount: 3,
      progressStart: 75,
      progressEnd: 100
    }
  ],

  /**
   * All tour steps organized by part
   */
  steps: {
    1: [ // Part 1: Understanding Competitive Intelligence
      {
        highlight: null,
        title: 'Welcome to PCC Yield Optimizer',
        description: 'This tool helps you identify high-opportunity time slots by analyzing competitor facility utilization, customer segments, and geographic overlap. Let\'s take a quick tour to get you started.',
        diagramType: 'dashboard-preview'
      },
      {
        highlight: null,
        title: 'The Opportunity Model',
        description: 'We identify opportunities by finding times when PCC has available capacity while competitors are at peak demand with matching customer segments. This creates prime moments to attract new members.',
        diagramType: 'flowchart'
      },
      {
        highlight: null,
        title: 'Data Sources',
        description: 'We track hourly utilization (0-100%) for PCC and 8 competitor facilities across Chicago, updated with real foot traffic patterns. This gives you a complete picture of the competitive landscape.',
        diagramType: 'data-sources'
      },
      {
        highlight: 'cell-2-18',
        title: 'The Heatmap System',
        description: 'Each facility\'s utilization is visualized as a weekly heatmap. White = empty (0%), Yellow = moderate (50%), Red = full (100%). Each cell represents one hour of operation.',
        diagramType: 'heatmap'
      },
      {
        highlight: null,
        title: 'Opportunity Scoring',
        description: 'Opportunity Score = Competitor Demand × PCC Capacity × Segment Match × Geographic Overlap × Accessibility. Higher scores indicate easier wins for attracting new members.',
        diagramType: 'formula'
      },
      {
        highlight: null,
        title: 'Reading the Dashboards',
        description: 'Navigate between 6 dashboards using the tabs: Competitive Intelligence (heatmaps), Opportunity Finder, Gap Analysis, Geographic Map, Market Gaps, and Positioning. Each offers unique insights into market opportunities.',
        diagramType: 'tabs'
      }
    ],
    2: [ // Part 2: Dashboard Features
      {
        highlight: null,
        title: 'Competitive Intelligence Center',
        description: 'View all competitors side-by-side with their weekly utilization patterns. Green borders indicate high opportunities, yellow shows moderate potential, and red highlights competitive threats.',
        diagramType: 'heatmap-multi'
      },
      {
        highlight: 'who-panel',
        title: 'Opportunity Finder',
        description: 'Sorted list of top opportunities with detailed breakdowns: WHO to target, WHERE they are, HOW to reach them, and WHY they\'ll convert. Focus on the highest-scoring opportunities first.',
        diagramType: 'opportunity-card'
      },
      {
        highlight: 'gap-column',
        title: 'Gap Analysis Grid',
        description: 'See exactly how much demand PCC is missing compared to market maximum utilization. Each gap represents revenue potential and shows where competitors are capturing customers you could serve.',
        diagramType: 'gap-table'
      },
      {
        highlight: 'pcc-marker',
        title: 'Geographic Competitive Map',
        description: 'Visualize competitor locations, catchment areas, member density heatmaps, and CTA transit accessibility. Understand the geographic dynamics of competition in Chicago.',
        diagramType: 'map'
      },
      {
        highlight: null,
        title: 'Interactive Features',
        description: 'Click any heatmap cell for detailed analysis. Use filters to focus on specific days, times, or customer segments. Hover over any element for additional information.',
        diagramType: 'filters'
      }
    ],
    3: [ // Part 3: Taking Action
      {
        highlight: null,
        title: 'Identifying Your Best Opportunities',
        description: 'Start with the Opportunity Finder dashboard. The highest-scoring opportunities appear at the top, representing the easiest wins. Focus your marketing efforts on these prime time slots.',
        diagramType: 'opportunity-list'
      },
      {
        highlight: 'why-panel',
        title: 'Understanding the Analysis',
        description: 'Each opportunity shows WHO to target (customer segments), WHERE they\'re located (geographic overlap), HOW to reach them (marketing channels), and WHY they\'ll convert (value drivers).',
        diagramType: 'opportunity-card'
      },
      {
        highlight: null,
        title: 'Campaign Planning',
        description: 'Use the "Create Campaign" button to generate targeted marketing initiatives. The system pre-fills customer segments, messaging angles, and timing recommendations based on competitive analysis.',
        diagramType: 'campaign-modal'
      },
      {
        highlight: null,
        title: 'Measuring Success',
        description: 'Track campaign impact by monitoring utilization changes in targeted time slots. Watch the gap analysis grid to see market share gains as your initiatives drive new member signups.',
        diagramType: 'before-after'
      }
    ],
    4: [ // Part 4: Advanced Features
      {
        highlight: null,
        title: 'Filters and Customization',
        description: 'Customize your view with filters. Focus on specific customer segments (e.g., Corporate Players, Social Beginners) or time windows (weekday mornings, weekend evenings) to find targeted opportunities.',
        diagramType: 'filters'
      },
      {
        highlight: null,
        title: 'Export and Sharing',
        description: 'Export opportunity reports, gap analysis tables, and campaign recommendations to share with your team or present to stakeholders. Multiple formats available including PDF and CSV.',
        diagramType: 'export-menu'
      },
      {
        highlight: null,
        title: 'Getting Help',
        description: 'Revisit this tour anytime by clicking the Tour button in the header. For questions, contact the PCC analytics team at analytics@pccchicago.com.',
        diagramType: 'help-resources',
        showDontShowAgain: true
      }
    ]
  },

  /**
   * Get a specific step
   * @param {number} part - Part number (1-4)
   * @param {number} step - Step number (1-based index)
   * @returns {Object|null}
   */
  getStep(part, step) {
    if (!this.steps[part] || !this.steps[part][step - 1]) {
      return null;
    }
    return this.steps[part][step - 1];
  },

  /**
   * Get part metadata
   * @param {number} part - Part number (1-4)
   * @returns {Object|null}
   */
  getPart(part) {
    return this.parts.find(p => p.id === part) || null;
  },

  /**
   * Calculate progress percentage
   * @param {number} part - Current part (1-4)
   * @param {number} step - Current step within part
   * @returns {number} Progress percentage (0-100)
   */
  calculateProgress(part, step) {
    const partMeta = this.getPart(part);
    if (!partMeta) return 0;

    const partRange = partMeta.progressEnd - partMeta.progressStart;
    const stepProgress = (step / partMeta.stepCount) * partRange;
    return Math.round(partMeta.progressStart + stepProgress);
  },

  /**
   * Get total number of steps across all parts
   * @returns {number}
   */
  getTotalSteps() {
    return this.parts.reduce((sum, part) => sum + part.stepCount, 0);
  },

  /**
   * Get next step coordinates
   * @param {number} currentPart - Current part
   * @param {number} currentStep - Current step
   * @returns {Object|null} {part, step} or null if at end
   */
  getNextStep(currentPart, currentStep) {
    const partMeta = this.getPart(currentPart);
    if (!partMeta) return null;

    if (currentStep < partMeta.stepCount) {
      return { part: currentPart, step: currentStep + 1 };
    } else if (currentPart < 4) {
      return { part: currentPart + 1, step: 1 };
    }
    return null; // At the end
  },

  /**
   * Get previous step coordinates
   * @param {number} currentPart - Current part
   * @param {number} currentStep - Current step
   * @returns {Object|null} {part, step} or null if at start
   */
  getPreviousStep(currentPart, currentStep) {
    if (currentStep > 1) {
      return { part: currentPart, step: currentStep - 1 };
    } else if (currentPart > 1) {
      const prevPartMeta = this.getPart(currentPart - 1);
      return { part: currentPart - 1, step: prevPartMeta.stepCount };
    }
    return null; // At the start
  },

  /**
   * Check if at final step
   * @param {number} part - Current part
   * @param {number} step - Current step
   * @returns {boolean}
   */
  isFinalStep(part, step) {
    return part === 4 && step === 3;
  },

  /**
   * Check if at last step of current part
   * @param {number} part - Current part
   * @param {number} step - Current step
   * @returns {boolean}
   */
  isLastStepOfPart(part, step) {
    const partMeta = this.getPart(part);
    return partMeta && step === partMeta.stepCount;
  }
};
