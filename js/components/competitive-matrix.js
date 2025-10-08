// PCC Yield Optimizer - Competitive Positioning Matrix (Sprint 7.5B)
// Price vs. Amenities scatter plot using Plotly.js

class CompetitivePositioningMatrixComponent {
  /**
   * Create Competitive Positioning Matrix
   * @param {string} containerId - DOM container ID
   * @param {Array} allFacilitiesData - Array of {facility, popularTimes} for all 6 facilities
   */
  constructor(containerId, allFacilitiesData) {
    this.containerId = containerId;
    this.allFacilitiesData = allFacilitiesData;
    this.container = null;
  }

  /**
   * Initialize and render the matrix
   */
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container '${this.containerId}' not found`);
      return;
    }

    this.render();
  }

  /**
   * Calculate amenities score (0-100) from amenities array
   * @param {Array} amenities - Array of amenity strings
   * @returns {number} Score 0-100
   */
  calculateAmenitiesScore(amenities) {
    const weights = {
      'cafe': 12,
      'restaurant': 15,
      'bar': 12,
      'pro_shop': 10,
      'lounge': 10,
      'parking': 15,
      'fitness': 15,
      'event_space': 8,
      'outdoor': 5,
      'snack_bar': 5,
      'equipment_rental': 3
    };

    let totalScore = 0;
    let maxPossibleScore = 0;

    // Calculate actual score
    amenities.forEach(amenity => {
      totalScore += (weights[amenity] || 5); // Default 5 points for unknown amenities
    });

    // Calculate max possible score (all amenities)
    Object.values(weights).forEach(weight => {
      maxPossibleScore += weight;
    });

    // Normalize to 0-100 scale
    const normalized = (totalScore / maxPossibleScore) * 100;
    return Math.round(normalized);
  }

  /**
   * Render the Plotly scatter plot
   */
  render() {
    // Prepare data for each facility
    const facilitiesWithScores = this.allFacilitiesData.map(({ facility }) => ({
      id: facility.id,
      name: facility.name,
      type: facility.type,
      price: facility.pricing.membership_monthly,
      amenitiesScore: this.calculateAmenitiesScore(facility.amenities),
      courts: facility.courts,
      amenities: facility.amenities,
      dropInRate: facility.pricing.drop_in_rate
    }));

    // Separate PCC from competitors
    const pcc = facilitiesWithScores.find(f => f.id === 'pcc');
    const competitors = facilitiesWithScores.filter(f => f.id !== 'pcc');

    // Create traces (one for PCC, one for competitors)
    const pccTrace = {
      x: [pcc.price],
      y: [pcc.amenitiesScore],
      mode: 'markers+text',
      type: 'scatter',
      name: 'PCC (Your Facility)',
      text: ['PCC'],
      textposition: 'top center',
      textfont: {
        size: 13,
        color: '#FFFFFF',
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
      },
      marker: {
        size: pcc.courts * 3, // Bubble size based on court count
        color: '#005DAA', // Brand blue
        line: {
          color: '#FFFFFF',
          width: 3
        },
        opacity: 1
      },
      hovertemplate:
        '<b>%{text}</b><br>' +
        'Monthly Price: $%{x}<br>' +
        'Amenities Score: %{y}/100<br>' +
        'Courts: ' + pcc.courts + '<br>' +
        'Drop-In: $' + pcc.dropInRate +
        '<extra></extra>'
    };

    const competitorsTrace = {
      x: competitors.map(f => f.price),
      y: competitors.map(f => f.amenitiesScore),
      mode: 'markers+text',
      type: 'scatter',
      name: 'Competitors',
      text: competitors.map(f => f.name.split(' ')[0]), // Short name
      textposition: 'top center',
      textfont: {
        size: 11,
        color: '#6B7280'
      },
      marker: {
        size: competitors.map(f => f.courts * 3),
        color: competitors.map(f => f.type === 'private' ? '#9CA3AF' : '#D1D5DB'),
        line: {
          color: '#6B7280',
          width: 2
        },
        opacity: 0.75
      },
      hovertemplate: competitors.map((f, i) =>
        `<b>${f.name}</b><br>` +
        `Monthly Price: $${f.price}<br>` +
        `Amenities Score: ${f.amenitiesScore}/100<br>` +
        `Courts: ${f.courts}<br>` +
        `Type: ${f.type}<br>` +
        `Drop-In: $${f.dropInRate}<extra></extra>`
      )
    };

    const data = [pccTrace, competitorsTrace];

    // Calculate median values for quadrant lines
    const allPrices = facilitiesWithScores.map(f => f.price);
    const allScores = facilitiesWithScores.map(f => f.amenitiesScore);
    const medianPrice = this.median(allPrices);
    const medianScore = this.median(allScores);

    // Layout with quadrants
    const layout = {
      title: {
        text: 'Competitive Positioning: Price vs. Amenities',
        font: { size: 18, color: '#1F2937' }
      },
      xaxis: {
        title: 'Monthly Membership Price ($)',
        range: [-10, Math.max(...allPrices) + 20],
        showgrid: true,
        gridcolor: '#E5E7EB'
      },
      yaxis: {
        title: 'Amenities Score (0-100)',
        range: [-5, 105],
        showgrid: true,
        gridcolor: '#E5E7EB'
      },
      shapes: [
        // Vertical median line
        {
          type: 'line',
          x0: medianPrice,
          y0: 0,
          x1: medianPrice,
          y1: 100,
          line: {
            color: '#9CA3AF',
            width: 2,
            dash: 'dash'
          }
        },
        // Horizontal median line
        {
          type: 'line',
          x0: 0,
          y0: medianScore,
          x1: Math.max(...allPrices),
          y1: medianScore,
          line: {
            color: '#9CA3AF',
            width: 2,
            dash: 'dash'
          }
        }
      ],
      annotations: [
        // Quadrant labels
        {
          x: medianPrice + 25,
          y: 95,
          text: '<b>Premium</b><br>(High Price, High Amenities)',
          showarrow: false,
          font: { size: 11, color: '#6B7280' },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 4
        },
        {
          x: 25,
          y: 95,
          text: '<b>Best Value</b><br>(Low Price, High Amenities)',
          showarrow: false,
          font: { size: 11, color: '#6B7280' },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 4
        },
        {
          x: medianPrice + 25,
          y: 10,
          text: '<b>Value Gap</b><br>(High Price, Low Amenities)',
          showarrow: false,
          font: { size: 11, color: '#6B7280' },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 4
        },
        {
          x: 25,
          y: 10,
          text: '<b>Budget</b><br>(Low Price, Low Amenities)',
          showarrow: false,
          font: { size: 11, color: '#6B7280' },
          bgcolor: 'rgba(255,255,255,0.8)',
          borderpad: 4
        }
      ],
      hovermode: 'closest',
      showlegend: true,
      legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      },
      margin: {
        l: 60,
        r: 20,
        t: 80,
        b: 60
      },
      plot_bgcolor: '#FFFFFF',
      paper_bgcolor: '#F9FAFB',
      font: {
        family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
      }
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      displaylogo: false
    };

    // Render with Plotly
    Plotly.newPlot(this.containerId, data, layout, config);

    // Add click handler for detailed comparison
    this.container.on('plotly_click', (data) => {
      const pointIndex = data.points[0].pointIndex;
      const traceName = data.points[0].data.name;

      if (traceName === 'PCC (Your Facility)') {
        this.showFacilityDetails(pcc);
      } else {
        this.showFacilityDetails(competitors[pointIndex]);
      }
    });
  }

  /**
   * Calculate median of an array
   * @param {Array} arr - Array of numbers
   * @returns {number} Median value
   */
  median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  }

  /**
   * Show detailed facility information
   * @param {Object} facility - Facility data
   */
  showFacilityDetails(facility) {
    const details = `
      <div style="padding: 20px; background: white; border-radius: 8px; max-width: 400px;">
        <h3 style="margin-top: 0;">${facility.name}</h3>
        <div style="margin-bottom: 12px;">
          <strong>Type:</strong> ${facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
        </div>
        <div style="margin-bottom: 12px;">
          <strong>Monthly Membership:</strong> $${facility.price}${facility.price === 0 ? ' (Public - No membership)' : ''}
        </div>
        <div style="margin-bottom: 12px;">
          <strong>Drop-In Rate:</strong> $${facility.dropInRate}
        </div>
        <div style="margin-bottom: 12px;">
          <strong>Courts:</strong> ${facility.courts}
        </div>
        <div style="margin-bottom: 12px;">
          <strong>Amenities Score:</strong> ${facility.amenitiesScore}/100
        </div>
        <div style="margin-bottom: 12px;">
          <strong>Amenities:</strong> ${facility.amenities.map(a => a.replace('_', ' ')).join(', ')}
        </div>
      </div>
    `;

    // Use browser alert for now (can be enhanced with modal later)
    alert(`${facility.name}\n\nType: ${facility.type}\nMonthly: $${facility.price}\nDrop-In: $${facility.dropInRate}\nCourts: ${facility.courts}\nAmenities: ${facility.amenitiesScore}/100`);
  }
}
