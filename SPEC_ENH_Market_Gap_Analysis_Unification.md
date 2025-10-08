  Gap Analysis Tab (`gap-analysis-grid.js`)

   * Purpose: To find PCC's specific performance 
     weaknesses against a single, primary competitor
     (in this case, hardcoded to be SPF).
   * Core Question: "How are we doing compared to
     them?"
   * How it Works: It calculates the direct gap
     between SPF's utilization and PCC's utilization
     for every hour of the week (gap = spfUtilization
      - pccUtilization).
   * Value: This view is tactical and inward-facing.
     It helps PCC's operational team answer questions
      like:
       * "Why are our courts empty on Tuesday nights
         when SPF is full?"
       * "Which specific time slots are we losing to
         our main competitor?"
       * It provides a ranked list of the top 10
         revenue opportunities based on closing these
         direct gaps with SPF.

  In short, the Gap Analysis tab is for optimizing
  operations against a known threat.

  Market Gaps Tab (`market-gap-heatmap.js`)

   * Purpose: To find systemic supply shortages
     across the entire competitive landscape,
     irrespective of PCC's own performance.
   * Core Question: "When is the entire market
     unavailable to customers?"
   * How it Works: It ignores the direct PCC vs. SPF
     comparison. Instead, for every hour, it counts
     the total number of competitors (out of 5) that
     are either closed or at capacity (≥85%
     utilization). The number in each cell (from 0 to
      5) represents this count.
   * Value: This view is strategic and 
     outward-facing. It helps PCC's leadership team
     answer much broader questions:
       * "When are there literally no good options
         for players in the city?" (e.g., when the
         heatmap shows a '5').
       * "What are the most underserved time slots
         across the entire market that we could
         target with a major campaign?"
       * It identifies opportunities that exist
         because of market-wide constraints, not just
         because PCC is underperforming one rival.

  In short, the Market Gaps tab is for identifying
  strategic opportunities to capture unmet market
  demand.

  Analogy

   * Gap Analysis is like a coach reviewing game tape
     of their team against their main rival to find
     and fix specific mistakes.
   * Market Gaps is like a scout analyzing the entire
     league to find out that no team has a good player
      for a certain position, representing a major
     opportunity in the next draft.



  The two tabs work together to provide a complete
  competitive picture: one for tactical adjustments
   and one for strategic planning.

╭───────────────────────────────────────────────────╮
│  > how might we make the app more clear that the │
│     two tabs work together? i dont believe they  │
│    reference each other. think deeply about      │
│    this.                                         │
╰───────────────────────────────────────────────────╯

✦ That is an excellent and insightful question. You
  are correct; the two tabs currently function as
  separate, siloed analyses. While both are valuable,
   their true power is unlocked when they are used
  together to tell a complete story about a specific
  time slot.

  Making the app more clear that they work together
   requires building a "bridge" between the
  tactical, PCC-centric view of Gap Analysis and
  the strategic, market-centric view of Market 
  Gaps.

  Here are three proposals, from simple to complex,
   on how we could achieve this.

  ---

  Proposal 1: Contextual Tooltips (Low Effort)

  This is the quickest way to create a connection.
  We can enrich the tooltips in each view with a
  key metric from the other, providing immediate
  context without changing the UI.

  1. On the "Gap Analysis" Tab:

  When a user sees a large gap between PCC and
  SPF, the most important question is: "Is this
  just an SPF problem, or is the whole market
  hot?" We can answer this in the tooltip.

   * Current State: The tooltip shows the PCC vs.
     SPF gap.
   * Proposed Change: Add a "Market Pressure"
     metric.

      Example Tooltip on "Gap Analysis":
      > Gap vs. SPF: +40%
      > Market Pressure: 3 of 5 other competitors 
  are also at capacity.

      This immediately tells the user that not
  only are they losing to SPF, but the market is
  tight, making this a high-priority slot to fix.

  2. On the "Market Gaps" Tab:

  When a user sees a high market gap (e.g., 4
  competitors are full), the key question is:
  "What is PCC's status? Are we capitalizing on
  this?"

   * Current State: The tooltip shows how many
     competitors are unavailable.
   * Proposed Change: Add PCC's current utilization.

      Example Tooltip on "Market Gaps":
      > Market Gap: 4 of 5 competitors unavailable.
      > PCC Status: 35% Utilization (High 
  Opportunity!)


      This instantly connects the strategic market
  event to a tactical, actionable insight for PCC.

  ---

  Proposal 2: A "Strategic Opportunity Matrix" View
   (Medium Effort)

  This approach creates a new, unified
  visualization that plots both analyses
  simultaneously, allowing for powerful,
  at-a-glance insights.

  Concept: A four-quadrant scatter plot where every
   hour of the week is a single dot.

   * X-Axis: The "PCC vs. SPF Gap" (from the Gap
     Analysis tab).
   * Y-Axis: The "Market Gap Score" (the number of
     unavailable competitors from the Market Gaps
     tab).

  This creates four distinct strategic quadrants:

   1. Top-Right (High/High): Critical Opportunities
       * Meaning: We are losing badly to SPF, and
         the rest of the market is also full.
       * Action: Fix this immediately. This is our
         most valuable and vulnerable time slot.

   2. Bottom-Right (High/Low): Direct Competitive 
      Threat
       * Meaning: We are losing to SPF, but the rest
         of the market is open.
       * Action: This is not a market problem; it's
         an SPF-specific problem. We need to analyze
         SPF's programming or pricing for this slot.

   3. Top-Left (Low/High): Blue Ocean Opportunity
       * Meaning: We are performing well against
         SPF, but the overall market is saturated.
       * Action: This is a prime slot for a
         marketing campaign to capture the unmet
         demand from customers who can't get into
         other facilities.

   4. Bottom-Left (Low/Low): Stable / Low Priority
       * Meaning: We are performing well, and the
         market has plenty of supply.
       * Action: Maintain current strategy; no
         immediate action needed.

  ---

  Proposal 3: Integrated Drill-Down Workflow (High 
  Effort)

  This is the most powerful option, turning the two
   tabs into a seamless, interactive analysis tool.

  Concept: Clicking on a cell in one view provides
  a filtered, detailed look in the other.

  Workflow Example:


   1. A user starts on the Market Gaps tab and sees
      that on Friday at 7 PM, 5 competitors are at
      capacity.
   2. They click on that "5" cell.
   3. The app automatically switches to the "Gap 
      Analysis" tab and filters it to show only the
      detailed breakdown for Friday at 7 PM.
   4. The user now sees the specific numbers: PCC's
      utilization, SPF's utilization, the direct gap,
      and the estimated revenue potential for that
      single, high-demand hour.

  This creates a direct, intuitive path from a
  high-level strategic observation ("the market is
  busy") to a tactical, actionable decision
  ("here's exactly what it's worth to us to capture
   that demand").

  Recommendation

  I would recommend implementing Proposal 1 
  (Contextual Tooltips) immediately. It provides
  the most value for the least development effort
  and directly addresses the lack of connection.

  Proposal 2 (Strategic Matrix) could then be
  planned as a new feature for a future sprint, as
  it offers a powerful new way to visualize the
  entire strategic landscape.