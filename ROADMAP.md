# Boss — simulation development roadmap

**Owner-updated progress (2026-10-17):** 1. Smart Office Assistant (v7 delivered). 2. Projects & Customers and sector expansion (v8 delivered first at owner request). 3. Smarter Employees (v9 delivered). Further priorities await owner selection.

**Product guardrails:** one self-contained `index.html`; free, ad-free, offline, private, with no account, tracking, external libraries, fonts or network calls. Local-browser saves only. Mobile-first. The player remains the boss. No mandatory ending. New saves must import `boss8`, `boss7`, `boss6`, `boss5`, and `tl3`.

## Delivered: v7 — Smarter Office Assistant
- A collapsible Delegation Desk. Owner can set automatic task assignment on/off, and choose project order: **balanced urgency and skills**, **earliest deadline**, or **best skill fit**.
- Configure separately whether the assistant shares praise, approves family leave ($5), coaches mistakes (free), or supports experiments ($10). Per-decision automatic-spending cap: $0, $5, $10, or $20. Each routine choice checks actual cash.
- Raises, resignations, rival poaching, and interpersonal conflicts never resolve automatically. Dilemmas about the assistant also escalate.
- Project priority dashboard, even before hiring an assistant: assigned person, current progress, remaining days, estimated completion time, risk/watch labels, and schedule buffer.
- Optional assistant deadline-risk warnings in the company log, deduplicated by project and risk state.
- Retain manual assignment authority, Focus mode, slower client intake, hiring/firing, idea combinations and speed controls. Migrates old progress to `boss7`.
- **QA:** syntax/static offline checks; initial state; configurable rules; capped budgets; high-stakes escalations; protected manual orders; risk-alert deduplication; saved-game migration; restart.

## Delivered: v8 — Projects & Customers, sector specialization
- **Faster starts:** opening projects need about 8–9 units of work instead of 12–17, with higher fees that cover early payroll more comfortably. Complexity grows from actual completions: five stages, about one new stage per five projects.
- **Negotiable contracts:** premium, quick, or customer-first deal terms; visible trade-offs in fees, work, time and quality. One deadline renegotiation and one optional paid quality review per project.
- **Three-phase delivery:** plan, build, review milestones with explicit status and company-log updates; quality scores evolve with skill, engagement and expertise.
- **Customer retention:** project outcomes update loyalty and repeat orders. Customer portfolio makes trust, sector, previous quality and repeat sales visible.
- **Sector strategy:** Hospitality + Retail unlocked initially. Focus awards +12% payout and speed. Permanent in-game expansion: Creative ($55 / rep 6, +12% premium), Logistics ($75 / rep 12, +20%), Technology ($95 / rep 20, +30%).
- **Balanced high speed:** when the active pipeline empties, the next eligible lead does not wait out the real-time cooldown; Focus mode still blocks arrivals. Previous open projects are shortened and repriced once on migration to `boss8`.
- **Validated:** 32 checks, including 180-day 8x simulation, negotiation restrictions, milestones, earnings, sector unlocks, customers, quality control and legacy saves.

## Delivered: v9 — Smarter Employees (selected priority, completed)
- **Individual goals** such as skill mastery, pay, client ownership, mentoring, creative freedom or work-life balance. Goals should matter to daily behavior, not be merely labels.
- **Stress/burnout:** accumulated workload and deadlines change morale, productivity, retention, mistakes and recovery; recognition and reasonable breaks help but cannot instantly erase chronic burnout.
- **Ambitions:** advancement requests and growth plans with transparent trade-offs; promotions and role changes should connect to demonstrated strengths.
- **Hidden talents:** discoverable through experiments, mentoring, role rotation and observations. Avoid random undisclosed skill changes with no clues.
- **Changing behavior:** consequences of praise, layoffs, coaching and employer decisions accumulate over time, with simple explainable rule-based logic; no external AI dependency.
- **Acceptance:** sensible pacing, understandable staff profiles and explanations, performance under long-running simulation, mobile readability, no regressions, migrated saves.

### v9 implementation and validation
- Private individual goal drives satisfaction and subtly influences work performance.
- Stress and burnout accumulate when workloads are sustained. Rest/recovery, conversations, coaching, and activities reduce them; severe stress reduces speed, can lower delivery quality, and sometimes prompts a worker-led four-day recovery pause.
- Visible career panels stay collapsed on mobile; player chooses check-ins, development plans and promotions. Promotions require skill and experience, raise productivity and add recurring payroll costs.
- Hidden, deterministic talent affinity has an explainable clue. Discovery through actual experiences produces one once-only ability increase.
- Existing intelligent assistant respects recovery and manual commands always win.
- Tests covered cooldowns and costs, project delivery and cash-flow, migrated saved games, talent discovery once, promotions, stress recovery and a 400-day accelerated run. Offline single-file source retained.

## Backlog (await owner selection)
- Departments/managers and office expansions
- Reactive rival companies
- Richer team relationships, trust and politics
- Living markets, financial dashboards, new client industries and seasons

## Optional later: conversational AI
- Offline rule-based personalities are the default. Online conversational AI would require network access, cost/privacy decisions and explicit owner approval; do not implement in the offline build without that approval.

## Delivery discipline
Read the latest GitHub `main/index.html`; preserve the complete game; implement on an isolated branch; run syntax, behavior, save and mobile checks; publish through GitHub Pages; update README, CHANGELOG and the Boss Notion page; verify the live URL before claiming completion.
