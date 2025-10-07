// PCC Yield Optimizer - Export Utilities
// Handles PDF, PNG, and Excel export functionality

/**
 * Export Opportunity List as PDF Report
 * @param {Array} opportunities - Array of opportunity objects
 * @param {Object} filters - Current filter settings
 * @returns {Promise<void>}
 */
async function exportOpportunitiesToPDF(opportunities, filters = {}) {
  if (typeof jspdf === 'undefined' || !jspdf.jsPDF) {
    console.error('jsPDF library not loaded');
    if (typeof showErrorToast === 'function') {
      showErrorToast('PDF Export Failed', 'Required library not loaded. Please refresh the page.');
    }
    return;
  }

  try {
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace = 30) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add wrapped text
    const addWrappedText = (text, fontSize, maxWidth, isBold = false) => {
      doc.setFontSize(fontSize);
      if (isBold) doc.setFont(undefined, 'bold');
      else doc.setFont(undefined, 'normal');

      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach(line => {
        checkPageBreak();
        doc.text(line, margin, yPosition);
        yPosition += fontSize * 0.5;
      });
    };

    // === COVER PAGE ===
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('PCC Yield Optimizer', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 12;

    doc.setFontSize(18);
    doc.text('Opportunity Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Generated date
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    doc.text(`Generated: ${today}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Filters applied
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Filters Applied:', margin, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    doc.text(`• Day Filter: ${filters.dayFilter || 'All Days'}`, margin + 5, yPosition);
    yPosition += 5;
    doc.text(`• Minimum Score: ${filters.minScore || 0}`, margin + 5, yPosition);
    yPosition += 5;
    doc.text(`• Sort By: ${filters.sortBy || 'Opportunity Score'}`, margin + 5, yPosition);
    yPosition += 15;

    // Summary
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Summary', margin, yPosition);
    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`${opportunities.length} high-value opportunities identified`, margin + 5, yPosition);
    yPosition += 6;

    const totalRevenue = opportunities.reduce((sum, opp) => sum + (opp.estimatedCustomers || 0) * 15, 0);
    doc.text(`Estimated weekly revenue opportunity: $${totalRevenue.toLocaleString()}`, margin + 5, yPosition);
    yPosition += 20;

    // === OPPORTUNITY PAGES ===
    opportunities.slice(0, 10).forEach((opp, index) => {
      checkPageBreak(50);

      // Opportunity header
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`Opportunity ${index + 1}: ${opp.timeSlot}`, margin, yPosition);
      yPosition += 8;

      // Score badge
      doc.setFillColor(opp.score >= 7 ? 16 : opp.score >= 5 ? 245 : 239,
                       opp.score >= 7 ? 185 : opp.score >= 5 ? 158 : 68,
                       opp.score >= 7 ? 129 : opp.score >= 5 ? 11 : 68);
      doc.roundedRect(margin, yPosition, 30, 8, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`Score: ${opp.score.toFixed(1)}`, margin + 15, yPosition + 5.5, { align: 'center' });
      doc.setTextColor(0, 0, 0);
      yPosition += 12;

      // Details
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Time Slot:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      doc.text(opp.timeSlot, margin + 25, yPosition);
      yPosition += 6;

      doc.setFont(undefined, 'bold');
      doc.text('Customer Segments:', margin, yPosition);
      yPosition += 5;
      doc.setFont(undefined, 'normal');
      (opp.segments || ['General customers']).forEach(segment => {
        doc.text(`• ${segment}`, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 3;

      doc.setFont(undefined, 'bold');
      doc.text('Competitive Landscape:', margin, yPosition);
      yPosition += 5;
      doc.setFont(undefined, 'normal');
      doc.text(`• PCC Utilization: ${opp.pccUtilization}%`, margin + 5, yPosition);
      yPosition += 5;
      doc.text(`• Busy Competitors: ${opp.busyCompetitors}`, margin + 5, yPosition);
      yPosition += 5;
      doc.text(`• Market Gap: ${opp.gap}%`, margin + 5, yPosition);
      yPosition += 8;

      doc.setFont(undefined, 'bold');
      doc.text('Recommendations:', margin, yPosition);
      yPosition += 5;
      doc.setFont(undefined, 'normal');
      (opp.recommendations || [
        'Launch targeted marketing campaign',
        'Offer promotional pricing for this time slot',
        'Create special events or programs'
      ]).forEach(rec => {
        checkPageBreak(10);
        doc.text(`• ${rec}`, margin + 5, yPosition);
        yPosition += 5;
      });
      yPosition += 8;

      doc.setFont(undefined, 'bold');
      doc.text('Revenue Projection:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      const revenue = (opp.estimatedCustomers || 0) * 15;
      doc.text(`$${revenue.toLocaleString()} per week`, margin + 40, yPosition);
      yPosition += 15;

      // Separator line
      if (index < opportunities.length - 1 && index < 9) {
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;
      }
    });

    // === APPENDIX ===
    doc.addPage();
    yPosition = margin;

    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Appendix: Methodology', margin, yPosition);
    yPosition += 12;

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Opportunity Scoring', margin, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    addWrappedText(
      'Opportunity scores (0-10) are calculated based on competitor demand, PCC capacity, ' +
      'customer segment match, geographic overlap, and accessibility. Higher scores indicate ' +
      'time slots with strong market demand but low PCC utilization.',
      10,
      pageWidth - 2 * margin
    );
    yPosition += 10;

    doc.setFont(undefined, 'bold');
    doc.text('Data Sources', margin, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    doc.text('• Google Popular Times data for competitor facilities', margin + 5, yPosition);
    yPosition += 5;
    doc.text('• PCC internal utilization metrics', margin + 5, yPosition);
    yPosition += 5;
    doc.text('• Geographic and demographic analysis', margin + 5, yPosition);
    yPosition += 10;

    doc.setFont(undefined, 'bold');
    doc.text('Assumptions', margin, yPosition);
    yPosition += 6;
    doc.setFont(undefined, 'normal');
    doc.text('• Average revenue per customer: $15', margin + 5, yPosition);
    yPosition += 5;
    doc.text('• Customer segments based on facility amenities and pricing', margin + 5, yPosition);
    yPosition += 5;
    doc.text('• Catchment area: 15-minute drive time (≈3 miles radius)', margin + 5, yPosition);

    // Save PDF
    const filename = `PCC_Opportunities_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);

    if (typeof showErrorToast === 'function') {
      showErrorToast('Report Generated', `Downloaded: ${filename}`, { type: 'success', autoHide: true, duration: 4000 });
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (typeof showErrorToast === 'function') {
      showErrorToast('PDF Export Failed', 'An error occurred while generating the report.');
    }
  }
}

/**
 * Export Heatmap as PNG Image
 * @param {string} containerId - ID of heatmap container to capture
 * @returns {Promise<void>}
 */
async function exportHeatmapToPNG(containerId) {
  if (typeof html2canvas === 'undefined') {
    console.error('html2canvas library not loaded');
    if (typeof showErrorToast === 'function') {
      showErrorToast('Image Export Failed', 'Required library not loaded. Please refresh the page.');
    }
    return;
  }

  try {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container '${containerId}' not found`);
      return;
    }

    // Capture the heatmap
    const canvas = await html2canvas(container, {
      scale: 2, // 2x for Retina displays
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `PCC_Heatmap_${new Date().toISOString().split('T')[0]}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      if (typeof showErrorToast === 'function') {
        showErrorToast('Image Saved', `Downloaded: ${link.download}`, { type: 'success', autoHide: true, duration: 4000 });
      }
    });
  } catch (error) {
    console.error('Error exporting heatmap:', error);
    if (typeof showErrorToast === 'function') {
      showErrorToast('Image Export Failed', 'An error occurred while capturing the heatmap.');
    }
  }
}

/**
 * Export Gap Analysis to Excel
 * @param {Array} timeSlots - Array of time slot data with gaps
 * @returns {Promise<void>}
 */
async function exportGapAnalysisToExcel(timeSlots) {
  if (typeof XLSX === 'undefined') {
    console.error('SheetJS library not loaded');
    if (typeof showErrorToast === 'function') {
      showErrorToast('Excel Export Failed', 'Required library not loaded. Please refresh the page.');
    }
    return;
  }

  try {
    const workbook = XLSX.utils.book_new();

    // === SHEET 1: Gap Analysis ===
    const gapData = [];
    gapData.push(['Time Slot', 'Day', 'Hour', 'PCC %', 'Market Max %', 'Gap %', 'Score', 'Est Revenue', 'Top Competitor']);

    timeSlots.forEach(day => {
      day.hours.forEach(slot => {
        gapData.push([
          slot.timeSlot,
          slot.day,
          slot.hour,
          slot.pccUtilization,
          slot.marketMax,
          slot.gap,
          slot.score || 0,
          `$${((slot.estimatedCustomers || 0) * 15).toFixed(2)}`,
          slot.topCompetitor || 'N/A'
        ]);
      });
    });

    const ws1 = XLSX.utils.aoa_to_sheet(gapData);

    // Set column widths
    ws1['!cols'] = [
      { wch: 20 }, // Time Slot
      { wch: 12 }, // Day
      { wch: 8 },  // Hour
      { wch: 10 }, // PCC %
      { wch: 12 }, // Market Max %
      { wch: 10 }, // Gap %
      { wch: 8 },  // Score
      { wch: 12 }, // Est Revenue
      { wch: 20 }  // Top Competitor
    ];

    XLSX.utils.book_append_sheet(workbook, ws1, 'Gap Analysis');

    // === SHEET 2: Summary Stats ===
    let totalRevenue = 0;
    let totalGap = 0;
    let winCount = 0;
    let totalSlots = 0;
    const topOpportunities = [];

    timeSlots.forEach(day => {
      day.hours.forEach(slot => {
        totalSlots++;
        totalGap += slot.gap;
        if (slot.gap < 0) winCount++;

        const revenue = (slot.estimatedCustomers || 0) * 15;
        totalRevenue += revenue;

        if (slot.gap > 5) {
          topOpportunities.push({
            timeSlot: slot.timeSlot,
            score: slot.score || 0,
            gap: slot.gap,
            revenue
          });
        }
      });
    });

    topOpportunities.sort((a, b) => b.score - a.score);

    const summaryData = [
      ['Summary Statistics', ''],
      ['', ''],
      ['Total Weekly Opportunity Revenue', `$${totalRevenue.toFixed(2)}`],
      ['Average Gap Percentage', `${(totalGap / totalSlots).toFixed(1)}%`],
      ['Win Rate', `${((winCount / totalSlots) * 100).toFixed(1)}%`],
      ['Total Time Slots Analyzed', totalSlots],
      ['', ''],
      ['Top 10 Opportunities', ''],
      ['Time Slot', 'Score', 'Gap %', 'Est Revenue']
    ];

    topOpportunities.slice(0, 10).forEach(opp => {
      summaryData.push([
        opp.timeSlot,
        opp.score.toFixed(1),
        `${opp.gap.toFixed(1)}%`,
        `$${opp.revenue.toFixed(2)}`
      ]);
    });

    const ws2 = XLSX.utils.aoa_to_sheet(summaryData);
    ws2['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 12 }, { wch: 15 }];
    XLSX.utils.book_append_sheet(workbook, ws2, 'Summary');

    // === SHEET 3: Methodology ===
    const methodologyData = [
      ['Methodology & Assumptions', ''],
      ['', ''],
      ['Opportunity Scoring', ''],
      ['Scores are calculated based on:', ''],
      ['• Competitor demand (higher is better)', ''],
      ['• PCC capacity (lower utilization = more opportunity)', ''],
      ['• Customer segment match', ''],
      ['• Geographic overlap with catchment area', ''],
      ['• Accessibility (transit, parking)', ''],
      ['', ''],
      ['Data Sources', ''],
      ['• Google Popular Times for competitor facilities', ''],
      ['• PCC internal utilization metrics', ''],
      ['• Geographic and demographic analysis', ''],
      ['', ''],
      ['Assumptions', ''],
      ['• Average revenue per customer: $15', ''],
      ['• Customer segments based on facility amenities', ''],
      ['• Catchment area: 15-minute drive (≈3 miles)', ''],
      ['• Market max = highest competitor utilization', '']
    ];

    const ws3 = XLSX.utils.aoa_to_sheet(methodologyData);
    ws3['!cols'] = [{ wch: 50 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(workbook, ws3, 'Methodology');

    // Save file
    const filename = `PCC_Gap_Analysis_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);

    if (typeof showErrorToast === 'function') {
      showErrorToast('Excel File Created', `Downloaded: ${filename}`, { type: 'success', autoHide: true, duration: 4000 });
    }
  } catch (error) {
    console.error('Error generating Excel file:', error);
    if (typeof showErrorToast === 'function') {
      showErrorToast('Excel Export Failed', 'An error occurred while generating the file.');
    }
  }
}

/**
 * Copy current dashboard URL to clipboard
 * @param {string} url - URL to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyLinkToClipboard(url) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);

      if (typeof showErrorToast === 'function') {
        showErrorToast('Link Copied!', 'Share this link to show the current dashboard view.', {
          type: 'success',
          autoHide: true,
          duration: 3000
        });
      }
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful && typeof showErrorToast === 'function') {
        showErrorToast('Link Copied!', 'Share this link to show the current dashboard view.', {
          type: 'success',
          autoHide: true,
          duration: 3000
        });
      }
      return successful;
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    if (typeof showErrorToast === 'function') {
      showErrorToast('Copy Failed', 'Please manually copy the URL from your browser.', {
        type: 'warning',
        autoHide: true,
        duration: 4000
      });
    }
    return false;
  }
}
