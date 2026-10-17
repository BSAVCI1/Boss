# Boss — simulation development roadmap

**Approved order (2026-10-17):** 1. Smarter Office Assistant (v7, delivered). 2. Smarter Employees (v8, next). 3. Realistic Projects & Customers (v9, after v8). Other features below are backlog and do not displace this order.

**Product guardrails:** one self-contained `index.html`; free, ad-free, offline, private, with no account, tracking, external libraries, fonts or network calls. Local-browser saves only. Mobile-first. The player remains the boss. No mandatory ending. New saves must import `boss6`, `boss5`, and `tl3`.

## Delivered: v7 — Smarter Office Assistant
- A collapsible Delegation Desk. Owner can set automatic task assignment on/off, and choose project order: **balanced urgency and skills**, **earliest deadline**, or **best skill fit**.
- Configure separately whether the assistant shares praise, approves family leave ($5), coaches mistakes (free), or supports experiments ($10). Per-decision automatic-spending cap: $0, $5, $10, or $20. Each routine choice checks actual cash.
- Raises, resignations, rival poaching, and interpersonal conflicts never resolve automatically. Dilemmas about the assistant also escalate.
- Project priority dashboard, even before hiring an assistant: assigned person, current progress, remaining days, estimated completion time, risk/watch labels, and schedule buffer.
- Optional assistant deadline-risk warnings in the company log, deduplicated by project and risk state.
- Retain manual assignment authority, Focus mode, slower client intake, hiring/firing, idea combinations and speed controls. Migrates old progress to `boss7`.
- **QA:** syntax/static offline checks; initial state; configurable rules; capped budgets; high-stakes escalations; protected manual orders; risk-alert deduplication; saved-game migration; restart.

## Next: v8 — Smarter Employees (selected priority 2)
- **Individual goals** such as skill mastery, pay, client ownership, mentoring, creative freedom or work-life balance. Goals should matter to daily behavior, not be merely labels.
- **Stress/burnout:** accumulated workload and deadlines change morale, productivity, retention, mistakes and recovery; recognition and reasonable breaks help but cannot instantly erase chronic burnout.
- **Ambitions:** advancement requests and growth plans with transparent trade-offs; promotions and role changes should connect to demonstrated strengths.
- **Hidden talents:** discoverable through experiments, mentoring, role rotation and observations. Avoid random undisclosed skill changes with no clues.
- **Changing behavior:** consequences of praise, layoffs, coaching and employer decisions accumulate over time, with simple explainable rule-based logic; no external AI dependency.
- **Acceptance:** sensible pacing, understandable staff profiles and explanations, performance under long-running simulation, mobile readability, no regressions, migrated saves.

## Then: v9 — Realistic Projects & Customers (selected priority 3)
- **Negotiation:** scope, fee, deadline and trade-offs in contracts; fair decision paths, no unavoidable spam.
- **Milestones:** defined phases with progress, review and occasional meaningful client checkpoints.
- **Quality vs. speed:** rushed work increases rework and unhappy customers, while strong teams can deliver consistently.
- **Delay handling:** renegotiate deadlines, allocate effort, or communicate with clients; the assistant can flag risks but should not approve contract concessions without authorization.
- **Customer retention:** satisfaction and repeated business react to delivery quality, treatment and reputation.
- **Acceptance:** projects can be finished without interruption overload, with usable planning, understandable economics, and a clear difference between milestones and emergencies.

## Backlog (not selected for the next two releases)
- Departments/managers and office expansions
- Reactive rival companies
- Richer team relationships, trust and politics
- Living markets, financial dashboards, new client industries and seasons

## Optional later: conversational AI
- Offline rule-based personalities are the default. Online conversational AI would require network access, cost/privacy decisions and explicit owner approval; do not implement in the offline build without that approval.

## Delivery discipline
Read the latest GitHub `main/index.html`; preserve the complete game; implement on an isolated branch; run syntax, behavior, save and mobile checks; publish through GitHub Pages; update README, CHANGELOG and the Boss Notion page; verify the live URL before claiming completion.
