# Custom Agent Team: Project Pulse Dashboard

Build Mona's Project Pulse dashboard using a specialized team of AI agents, each with distinct responsibilities and models. This document describes the agent team architecture, roles, and collaboration model.

## Agent Team Overview

The Project Pulse agent team consists of four specialized agents working in coordination:

| Agent | Model | Role |
|-------|-------|------|
| **Orchestrator** | Claude Opus 4.7 | Coordinates team efforts and manages workflow |
| **Planner** | Claude Opus 4.7 | Creates technical implementation strategies |
| **Coder** | GPT-5.5 | Implements code and logic |
| **Designer** | Gemini 3.1 Pro | Creates UI/UX and visual design |

## Agent Specifications

### 1. Orchestrator
**Configuration File:** `.github/agents/orchestrator.agent.md`  
**Model:** Claude Opus 4.7 (copilot)  
**Tools:** read, agent, memory

**Responsibility:**
- Breaks down complex requests into discrete tasks
- Delegates work to specialist agents (Planner, Coder, Designer)
- Coordinates the overall workflow and manages execution phases
- Prevents file scope conflicts by sequencing overlapping work
- Enables parallel execution when file scopes and dependencies allow
- Verifies integrated results are cohesive and complete
- Reports final outcomes clearly to the learner

**Key Execution Model:**
1. Receives plan from Planner
2. Parses plan into phases with explicit file assignments and dependencies
3. Schedules parallel work for non-overlapping scopes
4. Schedules sequential work for overlapping or dependent tasks
5. Provides explicit file scope to each specialist
6. Validates integrated results
7. Reports completion with detailed change summary

---

### 2. Planner
**Configuration File:** `.github/agents/planner.agent.md`  
**Model:** Claude Opus 4.7 (copilot)  
**Tools:** read, search, web, memory, todo

**Responsibility:**
- Researches repository structure, documentation, and dependencies
- Identifies edge cases, risks, and implicit requirements
- Creates practical, phase-ready technical implementation plans
- Produces structured output the Orchestrator can convert into execution phases
- Does not implement code—focuses on strategy and analysis

**Deliverables Include:**
- Clear summary of work required
- Ordered, step-by-step implementation sequence
- Explicit file assignments for each step
- Dependencies between steps
- Opportunities for parallel work
- Edge cases and error handling scenarios
- Validation expectations
- Open questions needing clarification

---

### 3. Coder
**Configuration File:** `.github/agents/coder.agent.md`  
**Model:** GPT-5.5 (copilot)  
**Tools:** read, edit, search, execute, web, memory, todo

**Responsibility:**
- Implements code within assigned file scope
- Fixes bugs and implements logic according to plan
- Creates support configurations (e.g., `.vscode/launch.json` for runnable apps)
- Follows consistent, predictable project layout and patterns
- Validates all changes before reporting completion

**Project Pulse Responsibilities:**
- Creates HTML structure in `app/index.html`
- Implements JavaScript logic in `app/js/app.js`
- Creates `.vscode/launch.json` for debugging support
- Configures launch with `cwd` set to `${workspaceFolder}/app`
- Ensures `index.html` opens so dashboard is immediately visible
- Uses strict JSON with no comments for configuration files
- Maintains deterministic naming, ports, paths, and URLs

**Coding Principles:**
- Clear, explicit code over clever abstractions
- Simple control flow
- Descriptive naming conventions
- Explicit, informative error handling
- Adherence to existing repository patterns
- Deterministic and testable behavior

---

### 4. Designer
**Configuration File:** `.github/agents/designer.agent.md`  
**Model:** Gemini 3.1 Pro (copilot)  
**Tools:** read, edit, search, web, memory, todo

**Responsibility:**
- Handles UI/UX design within assigned file scope
- Creates polished, professional interfaces
- Ensures accessibility and usability standards
- Manages information hierarchy and interaction flows
- Implements responsive behavior and visual consistency

**Project Pulse Responsibilities:**
- Creates polished dashboard UI (not bare HTML)
- Designs project cards with clear visual hierarchy
- Implements status badges and priority indicators
- Creates readable spacing and responsive layout
- Defines deterministic CSS hooks (`.dashboard`, `.project-card`, etc.)
- Applies visual affordances (rounded corners, shadows, contrast, typography)
- Ensures first view unmistakably looks like a professional dashboard

**Design Focus Areas:**
- Usability and user outcomes
- Accessibility standards (WCAG compliance)
- Information hierarchy and visual clarity
- Interaction flow and user feedback
- Responsive design across screen sizes
- Consistency with existing product patterns

---

## Team Collaboration Workflow

### How the Team Works Together to Build Project Pulse

**Phase 1: Planning**
- Learner requests dashboard feature via Copilot CLI
- Orchestrator delegates to Planner
- Planner researches requirements, technical constraints, and edge cases
- Planner delivers detailed plan with file assignments and dependencies

**Phase 2: Orchestration**
- Orchestrator parses plan into execution phases
- Determines which tasks can run in parallel (non-overlapping file scopes)
- Determines which tasks must run sequentially (overlapping files or dependencies)
- Assigns explicit file scope to Coder and Designer

**Phase 3: Parallel Implementation (when possible)**
- **Coder** (Phase A): Creates `app/index.html` with project structure and `app/js/app.js` with data logic
- **Coder** (Phase A): Creates `.vscode/launch.json` for debugging support
- Once HTML structure exists:
  - **Coder** (Phase B): Implements interactivity in `app/js/app.js` 
  - **Designer** (Phase B): Creates `app/css/styles.css` with dashboard styling and responsive layout
  - These work **in parallel** since CSS and JS don't directly depend on each other

**Phase 4: Validation**
- Coder validates HTML structure, JavaScript functionality, and launch configuration
- Designer validates CSS, responsive design, and accessibility
- Orchestrator verifies integrated result is cohesive and complete

**Phase 5: Reporting**
- Orchestrator reports final outcome: files created, validations passed, any risks identified
- Learner controls all git operations (commits, pushes) through Copilot CLI
- No automatic git staging—learner maintains version control authority

### Execution Example

```
User: "Build Project Pulse dashboard"
  ↓
Orchestrator: "Planner, create implementation plan"
  ↓
Planner: "Creates plan with HTML/JS/CSS phases and dependencies"
  ↓
Orchestrator: "Phase 1: Coder, create HTML and JS structure"
  ↓
Coder: "Creates app/index.html, app/js/app.js, .vscode/launch.json"
  ↓
Orchestrator: "Phase 2 (Parallel): Coder finalize JS, Designer create CSS"
  ├─ Coder: "Implements interactivity in app/js/app.js"
  └─ Designer: "Creates app/css/styles.css with polished styling"
  ↓
Orchestrator: "Verify integration"
  ├─ Coder: "Validates code and launch config"
  └─ Designer: "Validates UI/UX and accessibility"
  ↓
Orchestrator: "Report completion and changes"
  ↓
Learner: "Review changes and commit when ready"
```

---

## Key Design Principles

**Separation of Concerns:** Each agent owns a specific domain (strategy, code, design)

**Explicit Scope:** Clear file assignments prevent conflicts and enable parallel work

**Deterministic Outputs:** Reproducible configurations and testable code

**User-Centric:** Design prioritizes usability, code prioritizes clarity and correctness

**Learner Control:** Git operations remain under learner's direct authority

---

## Technology Stack

- **Orchestrator & Planner:** Claude Opus 4.7 — Strategic thinking, planning, and analysis
- **Coder:** GPT-5.5 — Code implementation, logic, and technical execution
- **Designer:** Gemini 3.1 Pro — Visual design, UX, and UI implementation

This multi-model approach leverages each model's strengths for optimal results in each domain.

---

## Orchestration in GitHub Copilot CLI

This agent team is orchestrated using **GitHub Copilot CLI** running in a Codespace environment. The CLI:

- Manages agent lifecycle and coordination
- Handles inter-agent communication and file passing
- Enforces file scope boundaries
- Coordinates parallel and sequential execution
- Maintains context across phases
- Reports progress and outcomes

The learner interacts with the Orchestrator through natural language prompts in the CLI, and the entire team works transparently behind the scenes to deliver the complete, integrated Project Pulse dashboard.
