# Design Specification: PCC Yield Optimizer

**Version**: 1.0  
**Last Updated**: October 6, 2025

---

## Design Philosophy

**Inspiration**: Tableau Public's clean, data-dense aesthetic  
**Principles**:
1. **Data First**: Visual hierarchy prioritizes insights over decoration
2. **Clarity**: Every element has a purpose
3. **Interaction**: Rich interactivity without complexity
4. **Consistency**: Predictable patterns across all views
5. **Accessibility**: WCAG 2.1 AA compliant

**Target Quality**: Executive boardroom presentation-ready

---

## Color Palette

### Brand Colors (PCC)
```
Primary Blue: #005DAA
Primary Red: #ED1C24
Secondary Navy: #1D3557
Secondary Gray: #6C757D
```

### Semantic Colors
```
Success/Opportunity Green: #10B981
Warning Yellow: #F59E0B
Danger/Alert Red: #EF4444
Info Blue: #3B82F6
Neutral Gray: #6B7280
```

### Data Visualization Scale
**Heatmap (Utilization)**
```
0%:   #FFFFFF (white)
25%:  #FEF3C7 (light yellow)
50%:  #FBBF24 (orange)
75%:  #F87171 (light red)
100%: #DC2626 (deep red)
```

**Opportunity Indicators**
```
High:   #10B981 (green)
Medium: #F59E0B (yellow)
Low:    #EF4444 (red)
Win:    #3B82F6 (blue)
```

### Background & Neutrals
```
Page Background: #F9FAFB
Card Background: #FFFFFF
Border Default: #E5E7EB
Border Hover: #D1D5DB
Text Primary: #111827
Text Secondary: #6B7280
Text Disabled: #9CA3AF
```

---

## Typography

### Font Stack
```css
/* Primary (UI) */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Helvetica Neue', Arial, sans-serif;

/* Data/Numbers (monospace for alignment) */
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 
             'Courier New', monospace;
```

### Type Scale
```
Display (Page Title): 32px / 48px / Bold / #111827
Heading 1 (Section): 24px / 36px / Semibold / #111827
Heading 2 (Card Title): 18px / 28px / Semibold / #111827
Heading 3 (Label): 16px / 24px / Medium / #111827
Body (Default): 14px / 20px / Regular / #374151
Caption (Helper): 12px / 18px / Regular / #6B7280
Data (Numbers): 14px / 20px / Medium / Monospace
```

### Usage Examples
```html
<h1 class="text-display">Competitive Intelligence Center</h1>
<h2 class="text-h1">Market Opportunities</h2>
<h3 class="text-h2">Pickleball Clubhouse Chicago</h3>
<p class="text-body">Your utilization is 52%...</p>
<span class="text-caption">Last updated: 10/6/2025</span>
<span class="text-data">$1,847</span>
```

---

## Spacing System

**8px Base Unit (Tailwind-compatible)**
```
xs:  4px   (0.5 × base)
sm:  8px   (1 × base)
md:  16px  (2 × base)
lg:  24px  (3 × base)
xl:  32px  (4 × base)
2xl: 48px  (6 × base)
3xl: 64px  (8 × base)
```

### Component Spacing
```
Card padding: 24px (lg)
Section gap: 32px (xl)
Element gap: 16px (md)
Inline gap: 8px (sm)
Tight gap: 4px (xs)
```

---

## Component Library

### 1. Cards
```html
<!-- Standard Card -->
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
    <button class="card-action">Action</button>
  </div>
  <div class="card-body">
    Content
  </div>
</div>

<!-- Styles -->
.card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}
```

### 2. Buttons

**Primary Button**
```css
.btn-primary {
  background: #005DAA;
  color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: background 150ms ease;
}

.btn-primary:hover {
  background: #004488;
}

.btn-primary:active {
  background: #003366;
  transform: translateY(1px);
}
```

**Secondary Button**
```css
.btn-secondary {
  background: #FFFFFF;
  color: #005DAA;
  border: 1px solid #005DAA;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 150ms ease;
}

.btn-secondary:hover {
  background: #F0F9FF;
}
```

**Icon Button**
```css
.btn-icon {
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 150ms ease;
}

.btn-icon:hover {
  background: #F3F4F6;
}
```

### 3. Badges & Tags

**Opportunity Badge**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  gap: 4px;
}

.badge-high {
  background: #D1FAE5;
  color: #065F46;
}

.badge-medium {
  background: #FEF3C7;
  color: #92400E;
}

.badge-low {
  background: #FEE2E2;
  color: #991B1B;
}
```

### 4. Filters

**Checkbox Group**
```html
<div class="filter-group">
  <label class="filter-label">Facilities</label>
  <div class="checkbox-list">
    <label class="checkbox-item">
      <input type="checkbox" checked>
      <span>Pickleball Clubhouse</span>
    </label>
    <label class="checkbox-item">
      <input type="checkbox">
      <span>SPF Chicago</span>
    </label>
  </div>
</div>
```

**Range Slider**
```css
.slider-container {
  padding: 16px 0;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6B7280;
}

input[type="range"] {
  width: 100%;
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  background: #005DAA;
  border-radius: 50%;
  cursor: pointer;
}
```

### 5. Tooltips

**Tooltip Container** (using Tippy.js)
```javascript
tippy(element, {
  content: `
    <div class="tooltip-content">
      <div class="tooltip-header">Sunday 12:00 PM</div>
      <div class="tooltip-body">
        <div class="tooltip-row">
          <span class="tooltip-label">PCC:</span>
          <span class="tooltip-value">52%</span>
        </div>
        <div class="tooltip-row">
          <span class="tooltip-label">SPF:</span>
          <span class="tooltip-value">100% 🔥</span>
        </div>
      </div>
      <div class="tooltip-footer">
        Opportunity Score: 8.7/10
      </div>
    </div>
  `,
  allowHTML: true,
  theme: 'pcc',
  placement: 'right',
  arrow: true,
  interactive: true
});
```

```css
.tippy-box[data-theme~='pcc'] {
  background: #1F2937;
  color: #FFFFFF;
  border-radius: 8px;
  font-size: 13px;
  max-width: 300px;
}

.tooltip-header {
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 8px;
}

.tooltip-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.tooltip-label {
  color: #9CA3AF;
}

.tooltip-value {
  font-weight: 500;
}

.tooltip-footer {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 12px;
  color: #10B981;
}
```

### 6. Modal/Panel

**Slide-in Analysis Panel**
```html
<div class="modal-overlay" id="analysisPanel">
  <div class="modal-panel">
    <div class="modal-header">
      <h2>Sunday 12:00 PM Analysis</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <!-- Content -->
    </div>
  </div>
</div>
```

```css
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 1000;
}

.modal-overlay.active {
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 200ms ease;
}

.modal-panel {
  width: 480px;
  height: 100vh;
  background: #FFFFFF;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  animation: slideIn 300ms ease;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.modal-header {
  position: sticky;
  top: 0;
  background: #FFFFFF;
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
}

.modal-close:hover {
  background: #F3F4F6;
  color: #111827;
}

.modal-body {
  padding: 24px;
}
```

### 7. Data Tables

**Gap Analysis Grid**
```html
<table class="data-table">
  <thead>
    <tr>
      <th>Time Slot</th>
      <th>PCC</th>
      <th>Market Max</th>
      <th>Gap</th>
      <th>Opportunity</th>
    </tr>
  </thead>
  <tbody>
    <tr class="row-high">
      <td>Sun 12:00</td>
      <td class="text-data">52%</td>
      <td class="text-data">100%</td>
      <td class="text-data gap-high">48%</td>
      <td><span class="badge badge-high">8.7/10</span></td>
    </tr>
  </tbody>
</table>
```

```css
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead {
  background: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #6B7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #F3F4F6;
}

.data-table tbody tr:hover {
  background: #F9FAFB;
  cursor: pointer;
}

.gap-high {
  color: #10B981;
  font-weight: 600;
}

.gap-medium {
  color: #F59E0B;
  font-weight: 600;
}

.gap-low {
  color: #EF4444;
  font-weight: 600;
}
```

---

## Layout Patterns

### Dashboard Grid
```css
.dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 24px;
}

.sidebar {
  position: sticky;
  top: 24px;
  height: calc(100vh - 48px);
  overflow-y: auto;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
```

### Card Grid
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

### Split View (Heatmap Comparison)
```css
.split-view {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 16px;
}
```

---

## Heatmap Design

### Cell Specifications
```css
.heatmap-cell {
  width: 32px;
  height: 32px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all 150ms ease;
}

.heatmap-cell:hover {
  border-width: 2px;
  border-color: #005DAA;
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Opportunity Overlays */
.heatmap-cell.opportunity-high {
  border: 3px solid #10B981;
  box-shadow: 0 0 0 1px #10B981;
}

.heatmap-cell.opportunity-medium {
  border: 2px solid #F59E0B;
}

.heatmap-cell.opportunity-low {
  border: 1px solid #EF4444;
}

.heatmap-cell.competitive-win {
  border: 3px solid #3B82F6;
  box-shadow: 0 0 0 1px #3B82F6;
}

/* Corner Badge */
.heatmap-cell .badge-corner {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 18px;
  height: 18px;
  background: #10B981;
  color: #FFFFFF;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFFFFF;
}
```

### Heatmap Container
```css
.heatmap-container {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

.heatmap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.facility-name {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.facility-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 14px;
  color: #6B7280;
}

.facility-rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.heatmap-grid {
  display: grid;
  grid-template-columns: 80px repeat(24, 32px);
  gap: 2px;
}

.heatmap-row-label {
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  padding: 8px 12px;
  text-align: right;
}

.heatmap-col-label {
  font-size: 11px;
  color: #6B7280;
  text-align: center;
  padding: 4px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}
```

### Color Legend
```css
.color-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 6px;
}

.legend-label {
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
}

.legend-gradient {
  flex: 1;
  height: 20px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    #FFFFFF 0%,
    #FEF3C7 25%,
    #FBBF24 50%,
    #F87171 75%,
    #DC2626 100%
  );
  border: 1px solid #E5E7EB;
}

.legend-stops {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 4px;
  font-size: 11px;
  color: #9CA3AF;
}
```

---

## Map Design

### Map Container
```css
.map-container {
  width: 100%;
  height: 600px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E5E7EB;
}

/* Leaflet Customization */
.leaflet-popup-content-wrapper {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.leaflet-popup-content {
  margin: 16px;
  font-family: inherit;
}
```

### Facility Marker (Custom)
```css
.facility-marker {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 150ms ease;
}

.facility-marker:hover {
  transform: scale(1.2);
  z-index: 1000;
}

.facility-marker.pcc {
  background: #005DAA;
  color: #FFFFFF;
}

.facility-marker.competitor {
  background: #ED1C24;
  color: #FFFFFF;
}

.facility-marker.public {
  background: #10B981;
  color: #FFFFFF;
}
```

---

## Interaction States

### Focus States
```css
/* Keyboard Navigation */
*:focus-visible {
  outline: 2px solid #005DAA;
  outline-offset: 2px;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #005DAA;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Loading States
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #F3F4F6 0%,
    #E5E7EB 50%,
    #F3F4F6 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E5E7EB;
  border-top-color: #005DAA;
  border-radius: 50%;
  animation: spin 800ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Empty States
```css
.empty-state {
  text-align: center;
  padding: 64px 32px;
}

.empty-state-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  opacity: 0.3;
}

.empty-state-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.empty-state-description {
  font-size: 14px;
  color: #6B7280;
  max-width: 400px;
  margin: 0 auto 24px;
}
```

---

## Animations

### Micro-interactions
```css
/* Hover lift */
.card-hover {
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Click press */
.clickable:active {
  transform: scale(0.98);
}

/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 300ms ease;
}

/* Slide up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 400ms ease;
}
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
:root {
  --sidebar-width: 280px;
  --content-max-width: 1920px;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
  .dashboard {
    grid-template-columns: 240px 1fr;
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .dashboard {
    grid-template-columns: 280px 1fr;
  }
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
  .dashboard {
    padding: 32px;
    gap: 32px;
  }
}

/* Mobile: < 768px */
@media (max-width: 767px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: static;
    height: auto;
  }
  
  .heatmap-container {
    overflow-x: scroll;
  }
}
```

---

## Accessibility

### Color Contrast
All text/background combinations meet WCAG 2.1 AA standards:
- Large text (18px+): 3:1 minimum
- Normal text: 4.5:1 minimum

### Keyboard Navigation
- Tab order follows visual hierarchy
- All interactive elements focusable
- Escape key closes modals
- Arrow keys navigate tables/grids (where applicable)

### Screen Reader Support
```html
<!-- ARIA Labels -->
<button aria-label="Close panel">×</button>

<!-- ARIA Live Regions -->
<div aria-live="polite" aria-atomic="true">
  Filters updated. Showing 23 opportunities.
</div>

<!-- ARIA Expanded -->
<button 
  aria-expanded="false" 
  aria-controls="filter-panel">
  Show Filters
</button>
```

### Focus Management
```javascript
// Trap focus in modal
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

---

## Performance Optimizations

### CSS
```css
/* Use transform instead of position changes */
.animate-transform {
  transform: translateX(0);
  transition: transform 300ms ease;
}

/* Use will-change for expensive animations */
.heatmap-cell {
  will-change: transform;
}

/* Remove will-change after animation */
.heatmap-cell:hover {
  transform: scale(1.1);
}
```

### JavaScript
```javascript
// Debounce filter changes
const debouncedFilter = debounce((filters) => {
  applyFilters(filters);
}, 300);

// Throttle scroll events
const throttledScroll = throttle(() => {
  updateStickyHeader();
}, 100);

// Use requestAnimationFrame for animations
function animateValue(start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = start + (end - start) * progress;
    
    updateDisplay(value);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
```

---

## Print Styles

```css
@media print {
  /* Hide UI elements */
  .sidebar,
  .filter-panel,
  button,
  .modal-overlay {
    display: none !important;
  }
  
  /* Expand content */
  .main-content {
    max-width: 100%;
  }
  
  /* Page breaks */
  .card {
    page-break-inside: avoid;
  }
  
  /* Black & white friendly */
  .heatmap-cell {
    border: 1px solid #000;
  }
}
```

---

## Brand Assets

### Logo Usage
```html
<!-- Standard Logo -->
<img src="/assets/images/pcc-logo.svg" 
     alt="Pickleball Clubhouse Chicago"
     class="logo">

<!-- Logo Dark Background -->
<img src="/assets/images/pcc-logo-white.svg" 
     alt="Pickleball Clubhouse Chicago"
     class="logo-inverse">
```

### Icon System
Use Heroicons (https://heroicons.com/) for consistency:
```
Opportunity: sparkles
Warning: exclamation-triangle
Success: check-circle
Info: information-circle
Map: map-pin
Calendar: calendar
Filter: adjustments-horizontal
Export: arrow-down-tray
Close: x-mark
```

---

## Design Checklist

Before considering a component "done":

- [ ] Matches visual specs (colors, typography, spacing)
- [ ] All interactive states defined (default, hover, active, focus, disabled)
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Responsive across breakpoints
- [ ] Smooth animations (60 FPS)
- [ ] Loading states defined
- [ ] Empty states defined
- [ ] Error states defined
- [ ] Print-friendly
- [ ] Contrast ratio verified (WCAG AA)

---

**End of Design Specification**