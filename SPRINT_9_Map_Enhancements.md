
# Sprint 9: Geographic Map Polish & Interactivity

**Objective:** This sprint focuses on improving the user experience of the Geographic Map by fixing a critical UI bug and adding a key feature for better data visibility.

---

## 1. User Story: Map Filters Should Update Pins

**As a user,** when I uncheck a facility in the filter panel, I expect its corresponding pin to be removed from the map.

**Current Behavior (Bug):** As shown in the provided screenshot, when facilities like "Big City Pickle" or "Grant Park" are deselected, their pins remain visible on the map, leading to a confusing and inaccurate display.

![Bug Screenshot](.gemini-clipboard/clipboard-1759879873314.png)

### Technical Implementation Plan:

1.  **Identify the Map Component:** The logic for rendering map pins is located in `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/js/components/map.js`.
2.  **Connect Filter State to Map:** The global filter state is managed in `appState.visibleFacilities` within `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/js/main.js`. The `MapComponent` needs to react to changes in this state.
3.  **Create an Update Method:** In `MapComponent` (`map.js`), create a public method, e.g., `updateVisibleFacilities(visibleIds)`. This method will be responsible for showing or hiding the map pins.
4.  **Implement Pin Toggling:** Inside `updateVisibleFacilities`, iterate through the facility map markers (pins). For each marker, check if its associated facility ID exists in the `visibleIds` set. Toggle the marker's visibility accordingly (e.g., using `marker.setOpacity(1)` or `marker.setOpacity(0)`, or by adding/removing it from the map layer).
5.  **Trigger Update:** In `/Users/petergiordano/Documents/GitHub/pcc-yield-optimizer/js/main.js`, ensure the `mapComponent.updateVisibleFacilities(appState.visibleFacilities)` method is called whenever a filter change occurs (e.g., within the `handleFilterChange` and `applyQuickFilter` functions).

### Acceptance Criteria:
- [ ] When a facility checkbox is unchecked in the filter panel, its pin is immediately removed from the map.
- [ ] When a facility checkbox is checked, its pin appears on the map.
- [ ] The "Quick Filters" (e.g., "Private Only") correctly update the set of visible pins on the map.

---

## 2. User Story: Add Informative Tooltips to Map Pins

**As a user,** when I hover my mouse over a facility's pin on the map, I want to see a tooltip displaying key information about that location.

### Technical Implementation Plan:

1.  **Bind Tooltips:** In `js/components/map.js`, during the creation of each facility marker, bind a tooltip or popup to it.
2.  **Define Tooltip Content:** The tooltip should contain the following information, formatted for clarity:
    *   **Facility Name:** `facility.name`
    *   **Facility Address:** `facility.address.street`
    *   **Facility Type Tag:** A tag that displays "Public", "Private", or "Premium".
3.  **Implement Tag Logic:** Create a helper function to determine the tag. The logic should be:
    *   If `facility.id` is 'spf' or 'pickle-haus', the tag is **Premium**.
    *   Otherwise, use the `facility.type` property (which will be 'public' or 'private'), capitalized.

    **Example helper function in `map.js`:**
    ```javascript
    getFacilityTag(facility) {
      const premiumIds = ['spf', 'pickle-haus'];
      if (premiumIds.includes(facility.id)) {
        return 'Premium';
      }
      return facility.type.charAt(0).toUpperCase() + facility.type.slice(1);
    }
    ```
4.  **Style the Tooltip:** Add basic styling for the tooltip to `css/components.css` to ensure it is readable and consistent with the application's design.

### Acceptance Criteria:
- [ ] Hovering over any map pin reveals a tooltip.
- [ ] The tooltip correctly displays the facility's name and street address.
- [ ] The tooltip displays the correct tag ('Public', 'Private', or 'Premium') based on the defined logic.
- [ ] The tooltip is styled for readability.
