# Prompt for Claude Code: Enrich Sprint 7.5AB Multi-Competitor Specification

I'm working on Sprint 7.5AB for the PCC Yield Optimizer. I need you to:

## 1. Analyze Current Project State
- Read `/SPRINT_7.5AB_DRAFT_Multi-Competitor.md`
- Scan project structure: `/src/types/`, `/src/components/`, `/src/data/`
- Review existing Sprint docs: `SPRINT_ROADMAP.md`, `FUNCTIONAL_SPEC.md`, `DESIGN_SPEC.md`
- Check current data model for facilities/competitors

## 2. Enrich the Sprint 7.5AB Spec with:

### Technical Details
- **Data Model Extensions**: Show exact TypeScript interfaces for multi-competitor data
- **Component Architecture**: List which components need modification vs. creation
- **State Management**: How to handle array of 6 competitors vs. current single competitor
- **File Structure**: Specific files to create/modify with paths

### Implementation Specifics
- **Phase 7.5A (Foundation)**: 
  - Competitor data schema (TypeScript types)
  - Database/state changes needed
  - UI changes for competitor selection
  - Backward compatibility with existing single-competitor views
  
- **Phase 7.5B (Aggregated Views)**:
  - Market Gap Heatmap: Component structure, props, data transformation logic
  - Competitive Positioning Matrix: Chart library to use, data format
  - Enhanced Opportunity Finder: Scoring algorithm pseudocode
  - Integration points with existing dashboard

### Code Examples
- Sample competitor data object (6 Chicago facilities with real data)
- Key component signatures (props/interfaces)
- Data transformation functions (single competitor → aggregated insights)

### Migration Path
- How to add 5 new competitors without breaking current demo
- Feature flags or toggles if needed
- Testing strategy for each phase

## 3. Format Output
Update `SPRINT_7.5AB_DRAFT_Multi-Competitor.md` with:
- Concrete implementation details (not just concepts)
- Code snippets where helpful
- Clear acceptance criteria for each deliverable
- Time estimates per task
- Dependencies between tasks

## 4. Validate Against
- Existing design system and component patterns
- Current state management approach
- Sprint 7 polish requirements (loading states, exports, etc.)

Provide the enriched spec as an updated markdown file ready for implementation.