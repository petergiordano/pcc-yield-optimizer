# PCC Yield Optimizer - Customer Intelligence Center

A data-driven platform for Pickleball Clubhouse Chicago (PCC) that transforms CourtReserve booking data into actionable customer intelligence for strategic growth and revenue optimization.

## 🎯 Current Focus: Customer Intelligence Center (CIC) Prototype

**Phase 1** - Building an isolated prototype to validate CourtReserve data integration and customer segmentation before full platform integration.

### CIC Prototype Features

- **Customer Segmentation**: 4-segment classification (Corporate Power Users, Social Ambassadors, Competitive Athletes, Casual Drop-ins)
- **Multi-Source Confidence Scoring**: Weighted scoring across 5 data sources (Booking 40%, Survey 30%, Social 15%, Demographics 10%, LinkedIn 5%)
- **Corporate Connector Intelligence**: ICP scoring system (0-30 points) to identify high-value B2B opportunities
- **Data Coverage Dashboard**: Transparency widget showing data completeness by source
- **CourtReserve Integration**: Weekly CSV imports from PCC's booking system

### Quick Start - CIC Prototype

1. **Navigate to prototype directory:**
   ```bash
   cd prototypes/cic-dashboard
   ```

2. **Serve the prototype locally:**
   ```bash
   python3 -m http.server 8001
   ```

3. **Open in browser:**
   ```
   http://localhost:8001
   ```

4. **See prototype README for setup:**
   ```bash
   cat prototypes/cic-dashboard/README.md
   ```

### Project Structure

```
pcc-yield-optimizer/
├── prototypes/
│   └── cic-dashboard/              # 🎯 Current: CIC Prototype (Phase 1)
│       ├── index.html
│       ├── js/, css/, data/
│       └── README.md
├── docs/
│   ├── PRD/PRD_Customer_Intelligence/  # Core specifications
│   │   ├── PRD_CIC_Prototype.md
│   │   ├── FUNCTIONAL_SPEC_CIC_Prototype.md
│   │   ├── TECHNICAL_SPEC_Customer_Intelligence.md
│   │   ├── DESIGN_SPEC_Customer_Intelligence.md
│   │   └── EPICS_AND_SPRINTS.md
│   ├── strategy/
│   │   └── PROTOTYPE_STRATEGY.md       # Phased development plan
│   ├── data-pipeline/
│   │   └── MANUAL_CENSUS_DATA_ETL.md
│   └── GITHUB_INTEGRATION.md           # Issue management guide
├── .github/
│   ├── workflows/auto-label.yml        # Auto issue labeling
│   └── ISSUE_TEMPLATE/                 # Feature/bug forms
├── .github-integration/                # GitHub protocol config
├── scripts/                            # Issue management CLI
├── archive/                            # Legacy v1 docs
├── CLAUDE.md                           # AI assistant guidelines
└── README.md                           # This file
```

## 📋 GitHub Integration Protocol

**ALL new features, enhancements, and bugs MUST be tracked via GitHub Issues.**

### Creating Issues

**Method 1: Web Interface (Recommended)**
1. Go to: https://github.com/petergiordano/pcc-yield-optimizer/issues/new/choose
2. Select "Feature Request" or "Bug Report" template
3. Fill in the structured form

**Method 2: CLI (Requires Bash 4.0+)**
```bash
./scripts/create-feature-issue.sh "Title" "Description" "Phase 1" "high"
./scripts/create-bug-issue.sh "Title" "Description" "critical"
```

### Issue Types

- **FEAT-XXX**: New features
- **ENH-XXX**: Enhancements to existing features
- **BUG-XXX**: Bugs and defects

### Automatic Labeling

The `.github/workflows/auto-label.yml` workflow automatically:
- Labels issues based on title prefix
- Assigns issues to GitHub Project #1
- Adds phase and priority labels

**See**: `docs/GITHUB_INTEGRATION.md` for complete documentation

## 🔄 Development Phases

- **Phase 1** (Current): CourtReserve data integration + Customer segmentation
- **Phase 2**: Integration with main Yield Optimizer app
- **Phase 3**: Best practices research & programming ideas library
- **Phase 4**: Yield management tools (scenario planner, event decision tool)
- **Phase 5**: Future enhancements

**See**: `docs/strategy/PROTOTYPE_STRATEGY.md` for phased development plan

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+), D3.js v7, Leaflet 1.9
- **Styling**: CSS3 with custom properties
- **Data Sources**: CourtReserve CSV exports, Census API
- **Build**: None required (static files)
- **Browser Support**: Chrome 90+, Safari 14+, Firefox 88+

## 📚 Key Documentation

**Core Specifications** (Customer Intelligence Center):
- [PRD_CIC_Prototype.md](./docs/PRD/PRD_Customer_Intelligence/PRD_CIC_Prototype.md) - Product vision and requirements
- [FUNCTIONAL_SPEC_CIC_Prototype.md](./docs/PRD/PRD_Customer_Intelligence/FUNCTIONAL_SPEC_CIC_Prototype.md) - Functional requirements
- [TECHNICAL_SPEC_Customer_Intelligence.md](./docs/PRD/PRD_Customer_Intelligence/TECHNICAL_SPEC_Customer_Intelligence.md) - Architecture and implementation
- [DESIGN_SPEC_Customer_Intelligence.md](./docs/PRD/PRD_Customer_Intelligence/DESIGN_SPEC_Customer_Intelligence.md) - UI/UX specifications
- [EPICS_AND_SPRINTS.md](./docs/PRD/PRD_Customer_Intelligence/EPICS_AND_SPRINTS.md) - Sprint planning and user stories

**Supporting Documentation**:
- [PROTOTYPE_STRATEGY.md](./docs/strategy/PROTOTYPE_STRATEGY.md) - Phased development approach
- [GITHUB_INTEGRATION.md](./docs/GITHUB_INTEGRATION.md) - Issue management system
- [MANUAL_CENSUS_DATA_ETL.md](./docs/data-pipeline/MANUAL_CENSUS_DATA_ETL.md) - Census data guide
- [Prototype README](./prototypes/cic-dashboard/README.md) - CIC prototype setup

**AI Assistant Context**:
- [CLAUDE.md](./CLAUDE.md) - Claude Code development guidelines
- [GEMINI.md](./GEMINI.md) - Gemini design collaboration context

**Legacy Documentation** (archived):
- See `/archive/` for v1 Yield Optimizer specifications

## 🤝 Contributing

1. **Check existing issues**: https://github.com/petergiordano/pcc-yield-optimizer/issues
2. **Create new issue**: Use templates for features or bugs
3. **Follow conventions**: See `CLAUDE.md` for development guidelines
4. **Reference specs**: Link to relevant PRD/Functional/Technical spec sections

## 📞 Contact

**Repository Owner**: petergiordano
**GitHub Repository**: https://github.com/petergiordano/pcc-yield-optimizer
**GitHub Project**: https://github.com/users/petergiordano/projects/1

## 📄 License

© 2025 Pickleball Clubhouse Chicago. All rights reserved.

---

**Built with [Claude Code](https://claude.com/claude-code) & [Google Gemini](https://gemini.google.com)**
