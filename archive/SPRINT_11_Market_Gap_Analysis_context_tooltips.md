
# Sprint 11: Market Gap & Gap Analysis Unification via Contextual Tooltips

**Objective:** This sprint implements the first phase of unifying the app's analysis tabs. We will bridge the strategic "Market Gaps" view and the tactical "Gap Analysis" view by enriching the tooltips in each with data from the other. This will provide users with immediate, holistic context for any given time slot.

---

## 1. User Story: Enhance "Market Gaps" Tooltip

**As a user,** when I view the **Market Gaps** heatmap and see a time slot with a high number of unavailable competitors, I want the tooltip to instantly show me PCC's own utilization percentage for that same hour.

**Goal:** This allows me to immediately determine if PCC is positioned to capitalize on the market-wide supply shortage.

### Technical Implementation Plan:

1.  **Locate the Tooltip Function:** The tooltip content is generated in the `generateTooltipContent(cellData)` method within `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/js/components/market-gap-heatmap.js`.
2.  **Access Existing Data:** The `cellData` object passed to this function already contains PCC's utilization for the selected time slot under the key `pccUtilization`.
3.  **Update Tooltip HTML:** Modify the HTML string returned by `generateTooltipContent` to include this data. Add a new line that clearly displays PCC's status.

    **Example Addition to Tooltip HTML:**
    ```html
    <hr style="margin: 8px 0; border: 0; border-top: 1px solid rgba(255,255,255,0.2);">
    <strong>PCC Utilization:</strong> ${cellData.pccUtilization}%
    ```

### Acceptance Criteria:
- [ ] When hovering over a cell in the "Market Gaps" heatmap, the tooltip now displays a "PCC Utilization" percentage.
- [ ] The utilization percentage shown is accurate for the selected day and hour.

---

## 2. User Story: Enhance "Gap Analysis" Tooltip

**As a user,** when I view the **Gap Analysis** grid and see a large performance gap between PCC and our main competitor (SPF), I want the tooltip to also tell me the level of pressure in the broader market.

**Goal:** This helps me understand the true nature of the opportunity. A large gap is more significant if many other competitors are also busy.

### Technical Implementation Plan:

1.  **Locate the Tooltip Function:** The tooltip for the Gap Analysis grid is generated in the `showTooltip(event, cell)` method within `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/js/components/gap-analysis-grid.js`.
2.  **Access Market Gap Data:** The `MarketGapHeatmapComponent` instance, which holds the calculated market data, is available on the global `appState` object at `appState.marketGapHeatmap`. This component must be initialized for the data to be available (it is initialized when the "Market Gaps" tab is first clicked).
3.  **Retrieve Market Pressure:** Inside the `showTooltip` method, use the `cell`'s `dataset.day` and `dataset.hour` to look up the corresponding data from the market gap component's data store (`appState.marketGapHeatmap.gapData`).

    **Example Data Retrieval in `showTooltip`:**
    ```javascript
    let marketPressure = 'N/A';
    if (appState.marketGapHeatmap && appState.marketGapHeatmap.gapData) {
      const dayIndex = CONFIG.days.indexOf(cell.dataset.day);
      const hour = parseInt(cell.dataset.hour);
      const marketCellData = appState.marketGapHeatmap.gapData[dayIndex][hour];
      marketPressure = `${marketCellData.gapScore}/5 competitors busy`;
    }
    ```
4.  **Update Tooltip HTML:** Add the retrieved `marketPressure` string to the tooltip's HTML content.

    **Example Addition to Tooltip HTML:**
    ```html
    <div class="tooltip-row">
      <span>Market Pressure:</span>
      <strong>${marketPressure}</strong>
    </div>
    ```

### Acceptance Criteria:
- [ ] When hovering over a cell in the "Gap Analysis" grid, the tooltip now displays a "Market Pressure" metric (e.g., "3/5 competitors busy").
- [ ] The market pressure data is accurate for the selected day and hour.
- [ ] If the "Market Gaps" tab has not yet been viewed, the tooltip should gracefully handle the missing data (e.g., show "N/A").
