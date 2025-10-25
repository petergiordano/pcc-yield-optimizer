# Contributing to PCC Yield Optimizer

Thank you for your interest in contributing to the PCC Yield Optimizer - Customer Intelligence Center! This document provides guidelines for contributing to the project.

---

## 🚨 Required: GitHub Integration Protocol

**ALL contributions MUST follow the GitHub Integration Protocol for issue tracking and project management.**

### Before You Start

1. **Check existing issues**: https://github.com/petergiordano/pcc-yield-optimizer/issues
2. **Review documentation**: Read `CLAUDE.md` and relevant specs in `docs/PRD/PRD_Customer_Intelligence/`
3. **Understand current phase**: We're in Phase 1 (CIC Prototype) - see `docs/strategy/PROTOTYPE_STRATEGY.md`

---

## Creating Issues

### When to Create an Issue

Create an issue for:
- ✅ New features or functionality
- ✅ Enhancements to existing features
- ✅ Bugs or defects
- ✅ Technical debt or refactoring
- ✅ Documentation improvements
- ✅ Questions about architecture or implementation

### How to Create an Issue

**Method 1: Web Interface (Recommended)**

1. Navigate to: https://github.com/petergiordano/pcc-yield-optimizer/issues/new/choose
2. Select the appropriate template:
   - **Feature Request** - For new functionality
   - **Bug Report** - For defects or issues
3. Fill in all required fields:
   - **Title**: Clear, concise, action-oriented (will be auto-prefixed)
   - **Description**: Detailed explanation with context
   - **Phase**: Which development phase (1-5)
   - **Priority**: low, medium, high, or critical
   - **Acceptance Criteria**: Specific, measurable conditions for "done"
   - **Technical Notes**: Implementation details, file references, spec links

**Method 2: CLI (Requires Bash 4.0+)**

```bash
# Feature
./scripts/create-feature-issue.sh "Title" "Description" "Phase 1" "high"

# Enhancement
./scripts/create-enhancement-issue.sh "Title" "Description" "Phase 2" "medium"

# Bug
./scripts/create-bug-issue.sh "Title" "Description" "critical"
```

### Issue Naming Convention

- **Features**: `FEAT-XXX: Add customer segmentation dashboard`
- **Enhancements**: `ENH-XXX: Improve chart loading performance`
- **Bugs**: `BUG-XXX: Fix mobile responsive layout`

The GitHub Action will automatically:
- Add the prefix (FEAT/ENH/BUG) and number
- Apply appropriate labels (type, phase, priority)
- Add the issue to GitHub Project #1

### Issue Content Guidelines

**Good Issue Example**:
```markdown
Title: Add date range filter to CIC dashboard

Description:
The CIC dashboard currently shows all-time data. Adding a date range filter
will allow users to analyze customer behavior patterns within specific time
periods, which is essential for identifying seasonal trends and campaign
effectiveness.

Phase: Phase 1
Priority: Medium

Acceptance Criteria:
- [ ] Date range picker component in sidebar
- [ ] Filter applies to all dashboard charts
- [ ] Presets for common ranges (Last 7 days, Last 30 days, Last 90 days, Custom)
- [ ] State persists in URL query params
- [ ] Mobile-responsive design

Technical Notes:
- Update `prototypes/cic-dashboard/js/components/filters.js`
- Integrate with existing segment filter logic
- Reference: FUNCTIONAL_SPEC_CIC_Prototype.md Section FR-1.3 (Filter Requirements)
- Reference: DESIGN_SPEC_Customer_Intelligence.md Section 6.2 (Filter Patterns)
- Consider using Flatpickr library for date selection
```

**Bad Issue Example**:
```markdown
Title: Add filter

Description:
We need a filter

Acceptance Criteria:
- Add filter
```

---

## Development Workflow

### 1. Find or Create an Issue

Before starting work:
- Search existing issues: https://github.com/petergiordano/pcc-yield-optimizer/issues
- If no issue exists, create one using the templates above
- Comment on the issue to indicate you're working on it

### 2. Set Up Development Environment

```bash
# Clone the repository
git clone https://github.com/petergiordano/pcc-yield-optimizer.git
cd pcc-yield-optimizer

# For prototype work
cd prototypes/cic-dashboard

# Start development server
python3 -m http.server 8001
```

### 3. Create a Feature Branch

```bash
# Branch naming convention: type/short-description
git checkout -b feat/add-date-filter
git checkout -b fix/mobile-layout
git checkout -b enh/improve-performance
```

### 4. Make Your Changes

**Development Guidelines**:
- Follow existing code style (Vanilla JS ES6+)
- Add comments for complex logic
- Update relevant documentation
- Reference issue number in comments
- Test in Chrome, Safari, and Firefox

**File Organization**:
- Prototype work: `/prototypes/cic-dashboard/`
- Specs: `/docs/PRD/PRD_Customer_Intelligence/`
- Strategy docs: `/docs/strategy/`
- Issue management: `.github/`, `scripts/`

### 5. Test Your Changes

Before committing:
- [ ] Manual testing in all supported browsers
- [ ] Mobile responsive testing (if UI changes)
- [ ] Accessibility check (WCAG 2.1 AA)
- [ ] No console errors
- [ ] All acceptance criteria met

### 6. Commit Your Changes

**Commit Message Format**:
```
<type>: <subject>

<body (optional)>

Implements FEAT-XXX / Fixes BUG-XXX

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `enh`: Enhancement to existing feature
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process, tooling

**Example**:
```bash
git commit -m "feat: Add date range filter component

Implements FEAT-005: Date range filtering for CIC dashboard

- Add DateRangePicker component with Flatpickr
- Integrate with filter state management
- Add URL query param persistence
- Add preset options (7d, 30d, 90d, custom)
- Mobile-responsive design with bottom sheet on mobile

Closes #5

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
"
```

### 7. Push and Create Pull Request

```bash
# Push your branch
git push origin feat/add-date-filter

# Create PR via GitHub CLI
gh pr create --title "feat: Add date range filter component" \
  --body "Implements FEAT-005. See issue for details."

# Or create PR via web interface
# https://github.com/petergiordano/pcc-yield-optimizer/compare
```

**Pull Request Guidelines**:
- Reference the issue number (Closes #XXX)
- Provide clear description of changes
- Include screenshots for UI changes
- List testing performed
- Update relevant documentation

### 8. Code Review & Merge

- Wait for review and approval
- Address any feedback
- Once approved, PR will be merged
- Branch will be deleted automatically

---

## Code Standards

### JavaScript

```javascript
// Good: Clear names, comments for complex logic
function calculateCustomerLifetimeValue(customer) {
  // CLV = Average Order Value × Purchase Frequency × Customer Lifespan
  const avgOrderValue = customer.totalRevenue / customer.totalOrders;
  const purchaseFrequency = customer.totalOrders / customer.membershipMonths;
  const lifespan = customer.membershipMonths / 12; // Convert to years

  return avgOrderValue * purchaseFrequency * lifespan;
}

// Bad: Unclear names, no comments
function calc(c) {
  const a = c.r / c.o;
  const f = c.o / c.m;
  const l = c.m / 12;
  return a * f * l;
}
```

### CSS

```css
/* Good: BEM-style naming, clear purpose */
.confidence-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.confidence-badge__icon {
  width: 16px;
  height: 16px;
}

.confidence-badge--high {
  background-color: var(--color-success-bg);
  color: var(--color-success-text);
}

/* Bad: Generic names, unclear purpose */
.badge {
  display: flex;
}

.icon {
  width: 16px;
}

.green {
  background: #00ff00;
}
```

### Documentation

- Update specs when changing functionality
- Add inline code comments for complex logic
- Update README files when adding features
- Reference spec sections in code comments

---

## Documentation Updates

### When to Update Docs

**Always update when**:
- Adding new features → Update Functional Spec
- Changing architecture → Update Technical Spec
- Modifying UI → Update Design Spec
- Sprint planning → Update EPICS_AND_SPRINTS.md
- Strategic changes → Update PROTOTYPE_STRATEGY.md

### Documentation Checklist

Before committing spec changes:
- [ ] All cross-references updated
- [ ] Version number incremented
- [ ] "Last Updated" date changed
- [ ] Document Organization section accurate
- [ ] Links tested (no broken references)
- [ ] Consistent terminology throughout

---

## Phase-Specific Guidelines

### Phase 1: CIC Prototype (Current)

**Focus**: Isolated prototype in `/prototypes/cic-dashboard/`

**Guidelines**:
- All work in prototype directory (no main app changes)
- Use static JSON data files
- Manual CSV → JSON conversion
- No backend API required
- Vanilla JS + D3.js only

**Key Files**:
- `PRD_CIC_Prototype.md`
- `FUNCTIONAL_SPEC_CIC_Prototype.md`
- `TECHNICAL_SPEC_Customer_Intelligence.md`

### Phase 2: Integration (Future)

**Focus**: Merge prototype into main app

**Guidelines**:
- Copy validated components to main app
- Integrate with existing data layer
- Add "Customer Intel" navigation tab
- Connect to CourtReserve pipeline
- Full E2E testing

---

## Questions or Problems?

1. **Check documentation**: `CLAUDE.md`, `GEMINI.md`, specs in `docs/PRD/`
2. **Search issues**: https://github.com/petergiordano/pcc-yield-optimizer/issues
3. **Create new issue**: Use "Question" or "Discussion" labels
4. **Contact maintainer**: @petergiordano

---

## Resources

- **GitHub Issues**: https://github.com/petergiordano/pcc-yield-optimizer/issues
- **GitHub Project**: https://github.com/users/petergiordano/projects/1
- **Issue Templates**: `.github/ISSUE_TEMPLATE/`
- **GitHub Integration Guide**: `docs/GITHUB_INTEGRATION.md`
- **AI Assistant Guidelines**: `CLAUDE.md`, `GEMINI.md`

---

## License

By contributing to this project, you agree that your contributions will be licensed under the same terms as the project.

© 2025 Pickleball Clubhouse Chicago. All rights reserved.
