# Claude Code Context & Guidelines

**Project**: PCC Yield Optimizer - Customer Intelligence Center
**AI Assistant**: Claude Code (Anthropic)
**Last Updated**: October 25, 2025

---

## Project Overview

This repository contains the **PCC Yield Optimizer** platform for Pickleball Clubhouse Chicago, with current focus on the **Customer Intelligence Center (CIC) Prototype**.

**Current Phase**: Phase 1 - CourtReserve Integration & Customer Segmentation
**Primary Objective**: Build isolated CIC prototype using CourtReserve.com data

---

## Repository Structure

```
pcc-yield-optimizer/
├── docs/
│   ├── PRD/PRD_Customer_Intelligence/      # Core specifications
│   │   ├── PRD_CIC_Prototype.md            # Product requirements
│   │   ├── FUNCTIONAL_SPEC_CIC_Prototype.md
│   │   ├── TECHNICAL_SPEC_Customer_Intelligence.md
│   │   ├── DESIGN_SPEC_Customer_Intelligence.md
│   │   └── EPICS_AND_SPRINTS.md            # Developer work breakdown
│   ├── strategy/                           # Strategic planning
│   │   └── PROTOTYPE_STRATEGY.md
│   ├── data-pipeline/                      # Data acquisition guides
│   │   └── MANUAL_CENSUS_DATA_ETL.md
│   └── GITHUB_INTEGRATION.md               # Issue management guide
├── prototypes/cic-dashboard/               # Isolated CIC prototype
│   ├── README.md
│   ├── index.html
│   ├── js/, css/, data/
│   └── ...
├── .github/
│   ├── workflows/auto-label.yml            # Automatic issue labeling
│   └── ISSUE_TEMPLATE/                     # Issue forms
├── .github-integration/                    # GitHub protocol config
├── scripts/                                # Issue management CLI tools
└── archive/                                # Legacy v1 documentation
```

---

## 🚨 CRITICAL: GitHub Integration Protocol

### Mandatory Issue Tracking

**ALL new features, enhancements, and bugs MUST be tracked via GitHub Issues using the GitHub Integration Protocol.**

**Issue Creation Requirements:**

1. **When to Create Issues:**
   - Any new feature for CIC prototype or future phases
   - Any enhancement to existing functionality
   - Any bug or defect discovered
   - Technical debt or refactoring work
   - Work items from EPICS_AND_SPRINTS.md user stories

2. **Issue Types & Prefixes:**
   - **Features**: `FEAT-XXX` - New functionality
   - **Enhancements**: `ENH-XXX` - Improvements to existing features
   - **Bugs**: `BUG-XXX` - Defects or issues

3. **How to Create Issues:**

   **Method 1: GitHub Web Interface (Recommended)**
   ```
   1. Navigate to: https://github.com/petergiordano/pcc-yield-optimizer/issues/new/choose
   2. Select "Feature Request" or "Bug Report" template
   3. Fill in structured form:
      - Title (auto-prefixed)
      - Description
      - Phase (1-5)
      - Priority (low/medium/high/critical)
      - Acceptance Criteria
      - Technical Notes
   ```

   **Method 2: CLI (Bash 3.2+ compatible)**
   ```bash
   ./scripts/create-feature-issue.sh "Title" "Description" "Phase 1" "high"
   ./scripts/create-bug-issue.sh "Title" "Description" "critical"
   ./scripts/create-enhancement-issue.sh "Title" "Description" "Phase 2" "medium"
   ```

4. **Phase Mapping:**
   - **Phase 1**: CourtReserve data integration + Customer segmentation (current)
   - **Phase 2**: Integration with main Yield Optimizer app
   - **Phase 3**: Best practices research & programming ideas library
   - **Phase 4**: Yield management tools (scenario planner, event decision tool)
   - **Phase 5**: Future enhancements

5. **Issue Content Requirements:**
   - **Clear Title**: Concise, action-oriented
   - **Detailed Description**: What, why, and context
   - **Acceptance Criteria**: Specific, measurable, testable conditions
   - **Technical Notes**: Implementation details, file references, spec links
   - **Spec References**: Link to relevant PRD/Functional/Technical spec sections

6. **Automation:**
   - GitHub Action automatically labels issues based on prefix
   - Issues automatically added to GitHub Project #1
   - Labels applied: type (feature/bug/enhancement), phase, priority

### Issue Workflow

```mermaid
User Request → Issue Creation (Web/CLI) → Auto-labeled → Added to Project #1 → Implementation → PR → Closed
```

### Example Issue Creation

**User Request:**
"We need to add a date range filter to the CIC dashboard"

**Claude's Response:**
```markdown
I'll help you create an issue for this enhancement.

**Issue Details:**
- Type: Enhancement (ENH prefix)
- Title: Add date range filter to CIC dashboard
- Phase: Phase 1
- Priority: Medium

**Description:**
The CIC dashboard currently shows all-time data. Adding a date range filter
will allow users to analyze customer behavior patterns within specific time periods.

**Acceptance Criteria:**
- [ ] Date range picker component in sidebar
- [ ] Filter applies to all dashboard charts
- [ ] Presets for common ranges (Last 7 days, Last 30 days, Last 90 days, Custom)
- [ ] State persists in URL query params

**Technical Notes:**
- Update `prototypes/cic-dashboard/js/components/filters.js`
- Integrate with existing segment filter logic
- Reference: FUNCTIONAL_SPEC_CIC_Prototype.md Section FR-1.3 (Filter Requirements)
- Reference: DESIGN_SPEC_Customer_Intelligence.md Section 6.2 (Filter Patterns)

Would you like me to create this issue via the GitHub web interface?
```

---

## Development Guidelines

### Prototype-First Approach

**Current Strategy**: Build isolated prototype in `/prototypes/cic-dashboard/` before integration.

**Why?**
- Validate CourtReserve data model without disrupting production
- Iterate quickly on customer segmentation algorithms
- Demonstrate value before full integration
- Minimize risk (3-4 weeks integration vs. 1-2 weeks prototype)

**See**: `docs/strategy/PROTOTYPE_STRATEGY.md` for detailed phased approach

### Code Organization

**Prototype Development:**
- All CIC prototype work in `/prototypes/cic-dashboard/`
- Vanilla JavaScript (ES6+) + D3.js for consistency
- Static JSON data files (manual CSV → JSON conversion)
- No backend API for Phase 1
- Standalone deployment (no dependencies on main app)

**Integration Phase (Phase 2):**
- Migrate validated prototype components to main app
- Integrate with existing data layer
- Add "Customer Intel" tab to main navigation
- Connect to CourtReserve data pipeline

### Technology Stack

**Frontend:**
- Vanilla JavaScript (ES6+)
- D3.js v7 (charts, visualizations)
- Leaflet 1.9 (geographic visualizations)
- CSS3 + Custom Properties

**Data Sources:**
- CourtReserve CSV exports (weekly)
- Census API (demographics)
- Social media APIs (future)

### Testing Requirements

Before marking any feature as complete:
- [ ] Manual testing in Chrome, Safari, Firefox
- [ ] Mobile responsive testing
- [ ] Accessibility validation (WCAG 2.1 AA)
- [ ] Cross-browser compatibility check
- [ ] Data accuracy validation

---

## Collaboration with Gemini

**Division of Responsibilities:**

**Gemini (Design & Strategy Partner):**
- Product strategy and vision
- User experience design
- Visual design and branding
- Customer segmentation logic
- Business intelligence insights

**Claude Code (Implementation Partner):**
- Technical implementation
- Code architecture decisions
- GitHub workflow management
- Issue tracking and coordination
- Documentation maintenance

**Coordination:**
- Both maintain context files (GEMINI.md, CLAUDE.md)
- GitHub Issues serve as source of truth for work items
- Specs in `docs/PRD/PRD_Customer_Intelligence/` are canonical
- Strategy doc at `docs/strategy/PROTOTYPE_STRATEGY.md` guides phasing

---

## Key Documentation Files

**Must-Read Specs:**
1. `docs/PRD/PRD_Customer_Intelligence/PRD_CIC_Prototype.md` - Product vision
2. `docs/PRD/PRD_Customer_Intelligence/FUNCTIONAL_SPEC_CIC_Prototype.md` - Requirements
3. `docs/PRD/PRD_Customer_Intelligence/TECHNICAL_SPEC_Customer_Intelligence.md` - Architecture
4. `docs/PRD/PRD_Customer_Intelligence/EPICS_AND_SPRINTS.md` - Sprint planning

**Supporting Docs:**
- `docs/strategy/PROTOTYPE_STRATEGY.md` - Phased development approach
- `docs/data-pipeline/MANUAL_CENSUS_DATA_ETL.md` - Census data acquisition
- `docs/GITHUB_INTEGRATION.md` - Issue management system
- `prototypes/cic-dashboard/README.md` - Prototype setup guide

---

## Git Workflow

### Branch Strategy

- **master**: Main development branch (default)
- **feature/[name]**: Feature development branches
- All changes via pull requests (when working with team)
- Direct commits acceptable for solo development with clear commit messages

### Commit Message Format

```
<type>: <subject>

<body (optional)>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process, tooling

### Pull Request Process

1. Create feature branch
2. Implement changes
3. Create PR with clear description
4. Link related GitHub Issues
5. Merge after review
6. Delete feature branch

---

## Issue Reference Format

When implementing features, always reference issues in commits:

```bash
git commit -m "feat: Add date range filter component

Implements ENH-005: Date range filtering for CIC dashboard

- Add DateRangePicker component
- Integrate with filter state management
- Add URL query param persistence
- Add preset options (7d, 30d, 90d, custom)

Closes #5

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
"
```

---

## Documentation Maintenance

### When to Update Docs

**Always update when:**
- New features added (update Functional/Technical specs)
- Architecture changes (update Technical spec)
- UI/UX changes (update Design spec)
- Sprint planning (update EPICS_AND_SPRINTS.md)
- Strategic pivots (update PROTOTYPE_STRATEGY.md)

### Documentation Review Checklist

Before committing spec changes:
- [ ] All cross-references updated
- [ ] Version number incremented
- [ ] Last Updated date changed
- [ ] Document Organization section accurate
- [ ] Links tested (no broken references)
- [ ] Consistent terminology throughout

---

## Common Tasks & Commands

### Issue Management

```bash
# Validate GitHub integration setup
./scripts/validate-workflow.sh

# Create feature issue
./scripts/create-feature-issue.sh "Title" "Description" "Phase 1" "high"

# Create bug issue
./scripts/create-bug-issue.sh "Title" "Description" "critical"

# List all open issues
gh issue list

# View specific issue
gh issue view 5
```

### Development Workflow

```bash
# Start prototype development server
cd prototypes/cic-dashboard
python3 -m http.server 8001

# Validate spec cross-references
grep -r "PROTOTYPE_STRATEGY" docs/PRD/PRD_Customer_Intelligence/

# Check for broken links in markdown
# (manual verification recommended)
```

### Git Operations

```bash
# Create feature branch
git checkout -b feature/add-date-filter

# Stage specific files
git add prototypes/cic-dashboard/js/components/filters.js

# Commit with proper format
git commit -m "feat: Add date range filter component"

# Push changes
git push origin feature/add-date-filter
```

---

## Quality Standards

### Code Quality

- **Readability**: Clear variable names, comments for complex logic
- **Modularity**: Single responsibility functions, reusable components
- **Performance**: Efficient data processing, optimized rendering
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

### Documentation Quality

- **Clarity**: Concise, unambiguous language
- **Completeness**: All requirements documented
- **Consistency**: Uniform terminology and formatting
- **Traceability**: Cross-references between specs

### Issue Quality

- **Specificity**: Clear scope, well-defined requirements
- **Testability**: Measurable acceptance criteria
- **Context**: Links to relevant specs and discussions
- **Priority**: Appropriate urgency and phase assignment

---

## Troubleshooting

### CLI Scripts Not Working

**Problem**: `./scripts/create-feature-issue.sh` fails with syntax errors
**Previous Cause**: macOS Bash 3.2 incompatibility (FIXED as of October 25, 2025)
**Solution**: Scripts now use POSIX-compliant syntax and work with Bash 3.2+
**Note**: If issues persist, use GitHub web interface for issue creation

### Broken Markdown Links

**Problem**: Cross-references not working in specs
**Cause**: Incorrect relative paths after file moves
**Solution**: Use pattern `../../[directory]/[file].md` from spec files

### GitHub Action Not Labeling

**Problem**: New issues not automatically labeled
**Cause**: Action requires proper title prefix (FEAT/ENH/BUG)
**Solution**: Ensure issue title starts with correct prefix

---

## Emergency Contacts

**Repository Owner**: petergiordano
**GitHub Repository**: https://github.com/petergiordano/pcc-yield-optimizer
**GitHub Project**: https://github.com/users/petergiordano/projects/1

---

## Version History

- **v1.0** (Oct 25, 2025): Initial CLAUDE.md creation with GitHub Integration Protocol
