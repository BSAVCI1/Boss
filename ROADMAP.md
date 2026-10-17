# Boss — simulation development roadmap

**Owner-updated progress (2026-10-17):** v7 Smart Office Assistant, v8 Projects & Customers and sector expansion, v9 Smarter Employees, v10 Company Operating System (continuous pipeline, persistent roles, autonomous work and capability/skill maps), v11 Mobile UI Simplification, v12 Business Intelligence and v13 Organization & Leadership delivered. Owner-approved next priorities: v14 Entrepreneurship Lab, then v15 Advanced Business Economy.

**Product guardrails:** one self-contained `index.html`; free, ad-free, offline, private, with no account, tracking, external libraries, fonts or network calls. Local-browser saves only. Mobile-first. The player remains the boss. No mandatory ending. New saves must import `boss12`, `boss10`, `boss9`, `boss8`, `boss7`, `boss6`, `boss5`, and `tl3`.

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

## Delivered: v10 — Company Operating System
- **Commercial generation:** Employees actively source opportunities, marketing increases demand, and organic/referral leads help sustain a pipeline. Prospects progress visibly through qualification, proposal and negotiation. Contracts start only with capacity and at least eight game days after the previous win; no more random instant projects. Focus mode holds accepted work while leads mature.
- **Explicit organizational roles:** Persistent primary role per employee — Sales, Marketing, Product, Operations or experienced Team Lead. Role controls reside in the employee card. Starting staff span Sales/Product/Operations. Teams can grow and leaders take responsibility for mentoring and coordinating.
- **Autonomous work planning:** Balanced, Growth or Innovation policy and adjustable qualified-pipeline target; global toggle plus per-person switch between autonomous and manual instructions. Idle team members select relevant prospecting, campaigns, development, research, mentoring or rest according to role, workforce health and pipeline. Direct orders always take precedence. Assistant or active Team Lead can pull available autonomous workers into paid customer delivery.
- **Capability knowledge graph:** Replaces the old two-idea guessing game. Discoveries are earned through experimentation and relevant employee work, added to a visual prerequisites map, and applied once automatically when all dependencies are present. Prior seeds, completed breakthroughs and modifiers remain valid.
- **Skills/mentor map:** View the company's comparative skill strengths, candidate mentor-to-learner pairings, roles and evolving hidden talents.
- **Balance:** Existing customer/sector/career systems continue. Verify onboarding, save migration from boss9 and earlier, contract spacing, stable cash flow, no forced pop-ups, mobile single-file offline operation, and long-run accelerated simulation.
- **Future improvements (not automatically approved):** richer sales forecasting and lead-specific negotiations, explicit departmental budgets, deeper manager performance reviews, more nuanced market competition and capability investment decisions.

## Delivered: v11 — Mobile UI Simplification
- **Today / Work / Team / Growth** four-destination mobile-first design with persistent bottom navigation, compact header, and executive briefing. Critical project and wellbeing issues come before routine information; market settings no longer bury current decisions.
- **Compact cards:** projects show customer, owner, payment, progress and deadline by default; employees show role, active task, mood and stress. Open the card for original detailed controls. Recruitment, policies and logs are collapsible.
- **Less visual competition:** speed selector + Pause replace five equally prominent speed/restart buttons. Restart remains confirmed under Today settings; office animation is optional and suspended while closed.
- **State-safe:** preserve expanded project/employee/career panels and per-tab scroll during live simulation updates; keep warning actions clickable at 8× without re-rendering each tick.
- **Standards:** 44px touch controls, meaningful text hierarchy, one primary action per summary, low initial scroll depth and offline single-file operation with no change to `boss10` saves.
- **QA:** DOM structure, syntax, controls, tab navigation, state preservation and v10/v11 accelerated 400-day economy equivalence. Live mobile browser inspection required after Pages deploy.

## Delivered: v12 — Business Intelligence
- Forward-only, in-game financial ledger, with opening cash and documented tracking start day for every migrated save. Track contracted/booked value, earned/collected revenue, payroll expense vs. actually paid payroll, direct and overhead costs, capital investment, operating profit and net cash flow.
- Executive financial KPIs on Today; on Work, one collapsible performance hub with 30/90/all-tracked-day reporting, revenue/cost chart, cost categories and transaction history.
- Sales funnel: sourced leads, stage conversions, decided-opportunity win rate, approximate lead-to-win comparison, estimated acquisition labor cost and source quality.
- Delivery realization: project fee comparison for contracts booked since the reporting start, quality, on-time deliveries, sector outcomes, allocated labor/direct costs and completed project contribution profitability.
- Workforce: delivery utilization, sales/marketing workdays, development days and recovery.
- Historical safeguards: prior game history is **not** reconstructed; existing cash, people, deals and decisions remain intact. Save key migrates to `boss12`; daily records limited to the most recent 366 game days, with lifetime rollups.
- Acceptance: reconcile opening cash + tracked receipts - tracked payments to live game cash; validate full/partial salary handling, saved-game migration, no new external dependencies, and side-by-side gameplay-economic parity with v11.

## Delivered: v12.1 — KPI Section Accordion & Health Signals
- Four independently collapsible Finance / Sales / Delivery / People reports replace fixed always-expanded sections.
- Compact section headers expose meaningful risk status and short reasons; red, amber, green and neutral are accompanied by descriptive text.
- Heuristic business thresholds are explained per KPI, with sample-size gates to avoid false warnings for an empty or newly imported ledger. Selectable period and all financial formulas remain unchanged.
- Today KPI highlights reflect operating loss and profit margin. Save key `boss12`, offline deployment, and existing organization/learning roadmap remain unchanged.
- Regression: independence of accordions, threshold extremes, insufficient-data readiness, 150-day simulation, persistence, single-file source.

## Delivered: v13 — Organization & Leadership
- **Formal departments:** Commercial owns Sales/Marketing and lead conversion; Delivery owns Product/Operations, client work and quality. Explicit employee department, permanent reporting line and manager appointments replace the v10 generic company-wide Team Lead.
- **Promotion path:** eligible manager candidates have Senior rank or ≥10 experience points. Leadership is an appointment to exactly one department, not an arbitrary title; removes their individual billable capacity and adds $0.75/day salary premium.
- **Authority:** managers without an office assistant delegate only relevant work to available autonomous direct reports; office assistant remains cross-company. Coaching/teaching applies only to that department, and manual boss orders always win.
- **Budget and behavioral effects:** $0 / $8 / $16 / $30 coaching allocation per 30 days, with limited $4 weekly coaching actions; improves employees while incurring real costs. Active management offers up to a 7% direct-report performance benefit, decreasing as span increases.
- **Department performance:** new forward-only 30-day stats, reports and goals: Commercial lead target and wins; Delivery deliveries, missed deadlines, on-time rate, coaching investment, and staffing. Completed 30-day reviews persist, including last manager, target result and coaching spend. Founder can leave departments flat until managers become useful.
- **Lifecycle rules:** manager departure or replacement restores the former specialist role and base pay; unappointed leads can still deliver. Safe unassignment on firing, cross-team transfer, assistant appointment or specialist-role change; preserve existing business and financial history and no network dependencies.
- **Validated:** scoped authority, budgets, salary impact, migration, 27 functional checks and unchanged baseline economy during a 360-day flat-organization comparison with v12.1.

## Next: v14 — Entrepreneurship & Leadership Lab
- **Hypothesis and forecast:** player chooses a learning question (pricing, recruiting, marketing mix, industry focus, management structure), specifies an expected outcome, then runs a time-bounded experiment.
- **Scorecard:** compare baseline to subsequent profit, leads, conversion, delivery, workload and customer results. Show both positive and negative consequences, not just prizes.
- **Reflection:** display original hypothesis, measurable outcome, possible confounders and alternative choices; do not claim simulation outcomes prove real-world business causation.
- **Experiment notebook:** retain on-device history and insights; explain underlying game rules without hidden manipulation.
- **Acceptance:** finance/people metrics auditable from v12 ledger; no compulsory popups; replayable learning with balanced tradeoffs.

## Later: v15 — Advanced Business Economy
- Distinguish invoicing, collection and accounts receivable from earnings; customer payment terms, overdue amounts and working-capital cycles.
- Evaluate pricing, discounting, expansion financing and investment ROI; distinguish cash, profit, committed liabilities and capital assets.
- Add fair competition, market demand variability and strategic choices; make future uncertainty visible.
- **Acceptance:** accurate ledger and recoverable saves, realistic business tradeoffs, stable small-company play and no soft-lock due to unavoidable debt.

## Backlog (await owner selection)
- Office expansions and richer multi-level organizations (first department managers delivered v13)
- Reactive rival companies
- Richer team relationships, trust and politics
- Living markets, new industries and seasons (financial dashboards delivered in v12)

## Optional later: conversational AI
- Offline rule-based personalities are the default. Online conversational AI would require network access, cost/privacy decisions and explicit owner approval; do not implement in the offline build without that approval.

## Delivery discipline
Read the latest GitHub `main/index.html`; preserve the complete game; implement on an isolated branch; run syntax, behavior, save and mobile checks; publish through GitHub Pages; update README, CHANGELOG and the Boss Notion page; verify the live URL before claiming completion.
