/**
 * Tour Diagrams Library
 * Self-contained diagram creators for visual tour
 * Generates SVG and DOM replicas of dashboard components
 */

const TourDiagrams = {
  /**
   * Generate realistic sample utilization data
   * @param {number} dayIdx - Day index (0=Sun, 6=Sat)
   * @param {number} hour - Hour (0-23)
   * @returns {number} Utilization percentage (0-100)
   */
  getSampleUtilization(dayIdx, hour) {
    const isWeekend = dayIdx === 0 || dayIdx === 6;

    // Early morning (0-6): Very low
    if (hour < 6) return Math.floor(Math.random() * 15);

    // Morning (6-10): Low-moderate
    if (hour < 10) return 20 + Math.floor(Math.random() * 25);

    // Midday (10-14): Moderate
    if (hour < 14) {
      return isWeekend ? 60 + Math.floor(Math.random() * 25) : 45 + Math.floor(Math.random() * 20);
    }

    // Afternoon (14-17): Moderate-high
    if (hour < 17) {
      return isWeekend ? 70 + Math.floor(Math.random() * 20) : 50 + Math.floor(Math.random() * 20);
    }

    // Peak evening (17-21): High
    if (hour < 21) {
      return isWeekend ? 65 + Math.floor(Math.random() * 20) : 75 + Math.floor(Math.random() * 20);
    }

    // Late night (21-24): Low
    return 15 + Math.floor(Math.random() * 20);
  },

  /**
   * Map utilization percentage to heatmap color
   * @param {number} utilization - Utilization percentage (0-100)
   * @returns {string} Hex color code
   */
  getHeatmapColor(utilization) {
    if (utilization < 25) return '#FFFFFF';
    if (utilization < 50) return '#FEF3C7';
    if (utilization < 75) return '#FBBF24';
    if (utilization < 90) return '#F87171';
    return '#DC2626';
  },

  /**
   * Get element opacity based on highlighting
   * @param {string} elementId - Element identifier
   * @param {string|null} highlightElement - Element to highlight
   * @returns {number} Opacity value (1 or 0.3)
   */
  getElementOpacity(elementId, highlightElement) {
    if (!highlightElement) return 1;
    return highlightElement === elementId ? 1 : 0.3;
  },

  /**
   * Get CSS filter for glow effect
   * @param {string} elementId - Element identifier
   * @param {string|null} highlightElement - Element to highlight
   * @returns {string} CSS filter value
   */
  getElementFilter(elementId, highlightElement) {
    if (highlightElement === elementId) {
      return 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))';
    }
    return '';
  },

  /**
   * Create heatmap diagram (7×24 grid)
   * @param {string|null} highlightElement - Element to highlight (e.g., 'cell-2-18')
   * @returns {SVGElement}
   */
  createHeatmapDiagram(highlightElement) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 280');
    svg.setAttribute('class', 'tour-diagram-heatmap');

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const cellWidth = 30;
    const cellHeight = 35;

    // Create cells
    days.forEach((day, dayIdx) => {
      for (let hour = 0; hour < 24; hour++) {
        const cellId = `cell-${dayIdx}-${hour}`;
        const x = 50 + hour * cellWidth;
        const y = 20 + dayIdx * cellHeight;

        const utilization = this.getSampleUtilization(dayIdx, hour);
        const color = this.getHeatmapColor(utilization);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', cellWidth - 2);
        rect.setAttribute('height', cellHeight - 2);
        rect.setAttribute('fill', color);
        rect.setAttribute('rx', 2);

        const opacity = this.getElementOpacity(cellId, highlightElement);
        const strokeWidth = highlightElement === cellId ? 3 : 1;
        const stroke = highlightElement === cellId ? '#10B981' : '#E5E7EB';

        rect.setAttribute('opacity', opacity);
        rect.setAttribute('stroke', stroke);
        rect.setAttribute('stroke-width', strokeWidth);

        if (highlightElement === cellId) {
          rect.style.filter = this.getElementFilter(cellId, highlightElement);
        }

        svg.appendChild(rect);
      }

      // Add day label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', 10);
      text.setAttribute('y', 35 + dayIdx * cellHeight);
      text.setAttribute('font-size', 12);
      text.setAttribute('fill', '#6B7280');
      text.textContent = day;
      svg.appendChild(text);
    });

    // Add hour labels (every 3 hours)
    for (let hour = 0; hour < 24; hour += 3) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', 50 + hour * cellWidth);
      text.setAttribute('y', 12);
      text.setAttribute('font-size', 10);
      text.setAttribute('fill', '#6B7280');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = `${hour}:00`;
      svg.appendChild(text);
    }

    return svg;
  },

  /**
   * Create opportunity card diagram with WHO/WHERE/HOW/WHY panels
   * @param {string|null} highlightElement - Panel to highlight ('who-panel', 'where-panel', etc.)
   * @returns {HTMLElement}
   */
  createOpportunityCardDiagram(highlightElement) {
    const container = document.createElement('div');
    container.className = 'tour-diagram-opportunity-card';

    const card = document.createElement('div');
    card.className = 'tour-opp-card';
    card.innerHTML = `
      <div style="padding: 16px; border-bottom: 1px solid #E5E7EB;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 14px; color: #6B7280;">Tuesday, 6:00 PM</div>
            <div style="font-size: 12px; color: #9CA3AF; margin-top: 4px;">Prime Time Opportunity</div>
          </div>
          <div style="background: #10B981; color: white; padding: 6px 14px; border-radius: 16px; font-weight: 600;">
            8.7/10
          </div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 16px;">
        <div class="tour-opp-panel ${highlightElement === 'who-panel' ? 'highlighted' : ''}" id="who-panel">
          <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">👥</span>
            <span>WHO</span>
          </div>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563;">
            <li>Corporate Players (42%)</li>
            <li>Competitive Adults (31%)</li>
            <li>Young Professionals (18%)</li>
          </ul>
        </div>
        <div class="tour-opp-panel ${highlightElement === 'where-panel' ? 'highlighted' : ''}" id="where-panel">
          <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">📍</span>
            <span>WHERE</span>
          </div>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563;">
            <li>West Loop (34% overlap)</li>
            <li>River North (28%)</li>
            <li>Near North (22%)</li>
          </ul>
        </div>
        <div class="tour-opp-panel ${highlightElement === 'how-panel' ? 'highlighted' : ''}" id="how-panel">
          <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">📣</span>
            <span>HOW</span>
          </div>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563;">
            <li>Instagram/Facebook ads</li>
            <li>CTA station posters</li>
            <li>Corporate partnerships</li>
          </ul>
        </div>
        <div class="tour-opp-panel ${highlightElement === 'why-panel' ? 'highlighted' : ''}" id="why-panel">
          <div style="font-weight: 600; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">💡</span>
            <span>WHY</span>
          </div>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #4B5563;">
            <li>Competitor at 87% full</li>
            <li>Prime evening time</li>
            <li>High accessibility score</li>
          </ul>
        </div>
      </div>
      <div style="padding: 16px; border-top: 1px solid #E5E7EB;">
        <button style="width: 100%; padding: 10px; background: #005DAA; color: white; border: none; border-radius: 6px; font-weight: 500; cursor: pointer;">
          Create Campaign
        </button>
      </div>
    `;

    container.appendChild(card);
    return container;
  },

  /**
   * Create gap analysis table diagram
   * @param {string|null} highlightElement - Column to highlight ('gap-column', 'revenue-column', etc.)
   * @returns {HTMLElement}
   */
  createGapAnalysisTableDiagram(highlightElement) {
    const container = document.createElement('div');
    container.className = 'tour-diagram-gap-table';

    const table = document.createElement('table');
    table.className = 'tour-gap-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Time Slot</th>
          <th>PCC %</th>
          <th class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">Market Max %</th>
          <th class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">Gap</th>
          <th class="${highlightElement === 'revenue-column' ? 'highlighted' : ''}">Revenue Opp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mon 6:00 PM</td>
          <td>62%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">95%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">33%</td>
          <td class="${highlightElement === 'revenue-column' ? 'highlighted' : ''}">$1,155</td>
        </tr>
        <tr>
          <td>Tue 6:00 PM</td>
          <td>58%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">93%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">35%</td>
          <td class="${highlightElement === 'revenue-column' ? 'highlighted' : ''}">$1,225</td>
        </tr>
        <tr>
          <td>Wed 7:00 PM</td>
          <td>65%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">92%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">27%</td>
          <td class="${highlightElement === 'revenue-column' ? 'highlighted' : ''}">$945</td>
        </tr>
        <tr>
          <td>Sat 11:00 AM</td>
          <td>48%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">88%</td>
          <td class="${highlightElement === 'gap-column' ? 'highlighted' : ''}">40%</td>
          <td class="${highlightElement === 'revenue-column' ? 'highlighted' : ''}">$1,400</td>
        </tr>
      </tbody>
    `;

    container.appendChild(table);
    return container;
  },

  /**
   * Create geographic map diagram
   * @param {string|null} highlightElement - Facility to highlight ('pcc-marker', 'spf-marker', etc.)
   * @returns {SVGElement}
   */
  createMapDiagram(highlightElement) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 600 500');
    svg.setAttribute('class', 'tour-diagram-map');

    // Lake Michigan (right side)
    const lake = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    lake.setAttribute('x', '450');
    lake.setAttribute('y', '0');
    lake.setAttribute('width', '150');
    lake.setAttribute('height', '500');
    lake.setAttribute('fill', '#BFDBFE');
    svg.appendChild(lake);

    // Chicago outline (simplified)
    const city = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    city.setAttribute('x', '50');
    city.setAttribute('y', '50');
    city.setAttribute('width', '400');
    city.setAttribute('height', '400');
    city.setAttribute('fill', '#F3F4F6');
    city.setAttribute('stroke', '#D1D5DB');
    city.setAttribute('stroke-width', '2');
    svg.appendChild(city);

    // Facility markers
    const facilities = [
      { id: 'pcc-marker', x: 250, y: 250, name: 'PCC', color: '#005DAA', size: 20 },
      { id: 'spf-marker', x: 180, y: 180, name: 'SPF', color: '#EF4444', size: 16 },
      { id: 'comp1-marker', x: 320, y: 200, name: 'Big City', color: '#EF4444', size: 14 },
      { id: 'comp2-marker', x: 200, y: 340, name: 'The Dill', color: '#EF4444', size: 14 }
    ];

    facilities.forEach(facility => {
      const isHighlighted = highlightElement === facility.id;

      // Catchment area (only for highlighted facility)
      if (isHighlighted) {
        const catchment = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        catchment.setAttribute('cx', facility.x);
        catchment.setAttribute('cy', facility.y);
        catchment.setAttribute('r', '80');
        catchment.setAttribute('fill', 'none');
        catchment.setAttribute('stroke', facility.color);
        catchment.setAttribute('stroke-width', '2');
        catchment.setAttribute('stroke-dasharray', '5,5');
        catchment.setAttribute('opacity', '0.6');
        svg.appendChild(catchment);
      }

      // Marker circle
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      marker.setAttribute('cx', facility.x);
      marker.setAttribute('cy', facility.y);
      marker.setAttribute('r', facility.size);
      marker.setAttribute('fill', facility.color);
      marker.setAttribute('opacity', this.getElementOpacity(facility.id, highlightElement));

      if (isHighlighted) {
        marker.style.filter = 'drop-shadow(0 0 12px ' + facility.color + ')';
      }

      svg.appendChild(marker);

      // Label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', facility.x);
      label.setAttribute('y', facility.y + facility.size + 15);
      label.setAttribute('font-size', '12');
      label.setAttribute('font-weight', isHighlighted ? '600' : '400');
      label.setAttribute('fill', '#1F2937');
      label.setAttribute('text-anchor', 'middle');
      label.textContent = facility.name;
      svg.appendChild(label);
    });

    return svg;
  },

  /**
   * Create dashboard tabs diagram
   * @param {string|null} highlightElement - Tab to highlight ('competitive', 'opportunity', etc.)
   * @returns {HTMLElement}
   */
  createTabsDiagram(highlightElement) {
    const container = document.createElement('div');
    container.className = 'tour-diagram-tabs';

    const tabs = [
      { id: 'competitive', icon: '📊', label: 'Competitive Intelligence' },
      { id: 'opportunity', icon: '🎯', label: 'Opportunity Finder' },
      { id: 'gap', icon: '📈', label: 'Gap Analysis' },
      { id: 'map', icon: '🗺️', label: 'Geographic Map' }
    ];

    tabs.forEach(tab => {
      const button = document.createElement('button');
      button.className = 'tour-tab-button' + (highlightElement === tab.id ? ' highlighted' : '');
      button.innerHTML = `
        <span style="margin-right: 6px;">${tab.icon}</span>
        <span>${tab.label}</span>
      `;
      container.appendChild(button);
    });

    return container;
  },

  /**
   * Create flowchart diagram (opportunity scoring formula)
   * @param {string|null} highlightElement - Component to highlight
   * @returns {SVGElement}
   */
  createFlowchartDiagram(highlightElement) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 700 300');
    svg.setAttribute('class', 'tour-diagram-flowchart');

    const components = [
      { id: 'comp-demand', x: 50, y: 50, text: 'Competitor\nDemand' },
      { id: 'pcc-capacity', x: 200, y: 50, text: 'PCC\nCapacity' },
      { id: 'segment-match', x: 350, y: 50, text: 'Segment\nMatch' },
      { id: 'geo-overlap', x: 50, y: 150, text: 'Geographic\nOverlap' },
      { id: 'accessibility', x: 200, y: 150, text: 'Accessibility' }
    ];

    // Draw component boxes
    components.forEach(comp => {
      const isHighlighted = highlightElement === comp.id;
      const boxWidth = 120;
      const boxHeight = 60;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', comp.x);
      rect.setAttribute('y', comp.y);
      rect.setAttribute('width', boxWidth);
      rect.setAttribute('height', boxHeight);
      rect.setAttribute('fill', isHighlighted ? '#DBEAFE' : '#F3F4F6');
      rect.setAttribute('stroke', isHighlighted ? '#005DAA' : '#D1D5DB');
      rect.setAttribute('stroke-width', isHighlighted ? '3' : '1');
      rect.setAttribute('rx', '6');
      rect.setAttribute('opacity', this.getElementOpacity(comp.id, highlightElement));

      if (isHighlighted) {
        rect.style.filter = 'drop-shadow(0 0 8px rgba(0, 93, 170, 0.5))';
      }

      svg.appendChild(rect);

      // Text
      const lines = comp.text.split('\n');
      lines.forEach((line, idx) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', comp.x + boxWidth / 2);
        text.setAttribute('y', comp.y + 25 + idx * 16);
        text.setAttribute('font-size', '13');
        text.setAttribute('font-weight', isHighlighted ? '600' : '400');
        text.setAttribute('fill', '#1F2937');
        text.setAttribute('text-anchor', 'middle');
        text.textContent = line;
        svg.appendChild(text);
      });
    });

    // Draw arrows converging to result
    const resultX = 500;
    const resultY = 100;

    components.forEach(comp => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', comp.x + 120);
      line.setAttribute('y1', comp.y + 30);
      line.setAttribute('x2', resultX);
      line.setAttribute('y2', resultY);
      line.setAttribute('stroke', '#9CA3AF');
      line.setAttribute('stroke-width', '2');
      line.setAttribute('marker-end', 'url(#arrowhead)');
      svg.appendChild(line);
    });

    // Arrow marker definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '5');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#9CA3AF');
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Result box
    const resultRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    resultRect.setAttribute('x', resultX);
    resultRect.setAttribute('y', resultY - 30);
    resultRect.setAttribute('width', '140');
    resultRect.setAttribute('height', '60');
    resultRect.setAttribute('fill', '#10B981');
    resultRect.setAttribute('stroke', '#059669');
    resultRect.setAttribute('stroke-width', '2');
    resultRect.setAttribute('rx', '6');
    svg.appendChild(resultRect);

    const resultText1 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    resultText1.setAttribute('x', resultX + 70);
    resultText1.setAttribute('y', resultY - 5);
    resultText1.setAttribute('font-size', '14');
    resultText1.setAttribute('font-weight', '600');
    resultText1.setAttribute('fill', 'white');
    resultText1.setAttribute('text-anchor', 'middle');
    resultText1.textContent = 'Opportunity';
    svg.appendChild(resultText1);

    const resultText2 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    resultText2.setAttribute('x', resultX + 70);
    resultText2.setAttribute('y', resultY + 12);
    resultText2.setAttribute('font-size', '14');
    resultText2.setAttribute('font-weight', '600');
    resultText2.setAttribute('fill', 'white');
    resultText2.setAttribute('text-anchor', 'middle');
    resultText2.textContent = 'Score';
    svg.appendChild(resultText2);

    return svg;
  },

  /**
   * Router function to create appropriate diagram based on type
   * @param {string} diagramType - Type of diagram to create
   * @param {string|null} highlightElement - Element to highlight
   * @returns {HTMLElement|SVGElement}
   */
  createDiagram(diagramType, highlightElement) {
    switch (diagramType) {
      case 'heatmap':
      case 'heatmap-multi':
        return this.createHeatmapDiagram(highlightElement);
      case 'opportunity-card':
        return this.createOpportunityCardDiagram(highlightElement);
      case 'gap-table':
        return this.createGapAnalysisTableDiagram(highlightElement);
      case 'map':
        return this.createMapDiagram(highlightElement);
      case 'tabs':
        return this.createTabsDiagram(highlightElement);
      case 'flowchart':
      case 'formula':
        return this.createFlowchartDiagram(highlightElement);
      default:
        // Placeholder for unimplemented diagram types
        const placeholder = document.createElement('div');
        placeholder.style.cssText = 'padding: 40px; text-align: center; background: #F3F4F6; border-radius: 8px; color: #6B7280;';
        placeholder.innerHTML = `<div style="font-size: 48px; margin-bottom: 16px;">📊</div><div>Diagram: ${diagramType}</div>`;
        return placeholder;
    }
  }
};
