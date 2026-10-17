# Boss — simulation development roadmap

**Owner-updated progress (2026-10-17):** v7 Smart Office Assistant, v8 Projects & Customers and sector expansion, v9 Smarter Employees, v10 Company Operating System (continuous pipeline, persistent roles, autonomous work and capability/skill maps), v11 Mobile UI Simplification, v12 Business Intelligence and v13 Organization & Leadership, v14 Entrepreneurship & Leadership Lab and v14.1 Management Coach & Decision Intelligence delivered. v15 Advanced Business Economy delivered, including a role-focused career and hiring map. Future expansions remain in the owner-selected backlog.

**Product guardrails:** one self-contained `index.html`; free, ad-free, offline, private, with no account, tracking, external libraries, fonts or network calls. Local-browser saves only. Mobile-first. The player remains the boss. No mandatory ending. New saves must import `boss14`, `boss13`, `boss12`, `boss10`, `boss9`, `boss8`, `boss7`, `boss6`, `boss5`, and `tl3`.

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

## Delivered: v14 — Entrepreneurship & Leadership Lab
- Six optional experiment scenarios: demand-generation strategy, client delivery reliability, employee skills, wellbeing, market specialization and custom leadership decisions.
- Choose a forecast change (including negative and zero projections), 15/30/45-day horizon, and optional written hypothesis; the game applies an explicit policy intervention unless the player selects custom.
- Preserve an auditable baseline using recent Finance/Sales/Delivery/People ledger events, or initial team averages for skill/stress outcomes. Simulated results track actual revenue, profit, costs, lead wins, deliveries, cash, delivery timeliness and utilization.
- Publish the realized-vs-forecast scorecard in an offline notebook, including confidence caveats, insufficient historical sample alerts, policy-change confounders and user reflection. Keep at most 12 historical experiments.
- No automatic forced notifications, account, hidden market modifiers or new expenses. Policies are explicitly disclosed and persist unless the user changes them; no surprise reversal.
- Save key `boss14` with automatic migration from `boss13` and earlier. Preserve existing management organization, business intelligence, KPI health signals and self-contained offline game.
- QA: time progression, scorecard under low-sample/high-sample conditions, financial ledger outcomes, local-save persistence, manual control and no-experiment economic parity.

## Delivered: v14.1 — Management Coach & Decision Intelligence
- Three highest management priorities on Today with concise causes, suggestions and navigation; Guided / Challenge / Sandbox explanations; no compulsory action prompts.
- Repair salary raise as a recurring $0.25/day expense, add transparent upfront decision previews and prohibit unaffordable one-time decisions. Settle historical unpaid payroll from cash without expensing wages twice; show weekly/monthly salary obligations and uncertain anticipated client receipts.
- Role-specific staff activity tracking (delivery, sales/marketing, learning, management, rest). Existing overall billable utilization remains a company-wide figure, not a personal grade for commercial or management roles. Per-worker tracking starts on first v14.1 day.
- Fix agreed contract price stability: market focus and reputation changes never retroactively alter existing client fees; renegotiations explicitly update agreed value. Market strategy guide compares entry cost, prerequisites, premiums, skill coverage, reported sector revenue and investment risks.
- Model manager planning/delegation/coaching/communication competencies that evolve with experience, with departmental-only assignments, budgets, direct reports, clear decision rights and 30-day performance results. Manual employee instructions protected.
- Make career progression criteria visible on every employee panel; retain deliberate promotions and show both immediate and recurring costs.
- Experiments preview likely participating staff and operational tradeoffs; report actual participation in project, commercial, training and management time. Offer guarded restoration of original policies after completion, preserving later manual choices.
- Decision journal captures immediate cash/payroll/people consequences, 7/30-day follow-ups and caution about other simultaneous causes. Preserved as private on-device history.
- Save key `boss141` imports `boss14` and prior versions without reconstructing unmeasured historical transactions, competencies, work or outcomes. Preserves compact mobile accordions and standalone offline index.html.
- Validation criteria: syntax, UI boot, 400+ simulated days and financial reconciliation; payroll arrears accounting; recurring raise and affordability; legacy save migration; signed-price lock and renegotiation; manager skill and authority; promotion readiness; experiment participation and policy restore; decision history and mobile navigation.

## Delivered: v14.1 — Management Coach & Decision Intelligence
- Correct accounting and decision semantics: genuine recurring salary raises, available-cash settlement of recorded unpaid wages without double expense, signed/negotiated client fee locks that cannot be changed by later sector focus or reputation changes.
- Today: Guided / Challenge / Sandbox management coaching and prioritized explanations, 7/14/30-day payroll requirements and estimated (not certain) receipts, immediate outcome snapshot and later decision follow-up journal.
- Work: Contextual KPI diagnoses and management levers across Finance/Sales/Delivery/People; role-specific staff day allocation alongside traditional billable utilization.
- Team: Visible promotion eligibility, XP and skill thresholds; manager planning/coaching/communication/delegation competence develops through managerial practice. Department managers can allocate only eligible autonomous departmental staff and spend coaching budgets, escalating structural staffing choices to CEO. 30-day scorecards and manager recommendations remain visible.
- Growth: Sector focus and expansion guide with investment cost, relevant team skills, actual sector performance and economic trade-offs; experiment preview showing autonomy/manual constraints, actual staff-day participation and optional conflict-aware policy restore.
- Decision Journal: Expected dilemmas explained before approval; direct payroll/cash/role effects logged immediately; 7- or 30-day observation prompts use historical outcomes without misrepresenting causation.
- Preserve 4-tab mobile shell, independently expandable sections, save migration to `boss141`, private offline single-file operation; all reports labeled with measurement limitations.
- Tested with finance reconciliation, actual wage settlements, intervention/manager progression, saved-game migration, price locks, experiments and 400-day gameplay runs.

## Delivered: v15 — Advanced Business Economy & Career Skill Map
- Earned revenue is recorded on completed delivery and an invoice is issued. Cash collection occurs when paid; accounts receivable are displayed independently and automatically resolved by due date, with bounded late settlement. Early collection incurs a 3% expense. Migrated pre-v15 signed deals honor immediate payment.
- New client work receives a user-chosen 0/7/14/30 day payment term with fee premium/discount and prospect-win consequences. Standard/competitive/premium pricing locks on agreement. Market pressure cycles transparently every 45 game days.
- CEO may draw up to $150 credit, repay principal and accrued interest, or invest $65 in a delivery toolkit or $55 in a sales toolkit. Accounting separates financing cash, interest expense, capital investment, receivables and payroll obligations; no invented payables, depreciation or tax.
- Team skill coverage guides internal focused development versus recruitment, maps role-specific expertise and reports bottlenecks. Associate → Senior requires 8 XP and role skill Lv 1.85; Senior → Lead 24 XP and role skill Lv 2.60. Existing ranks and acquired XP carry forward.
- Save key `boss15` reads `boss141` and all earlier supported history, starts forward-only v15 invoice records and preserves signed fees. Offline single-file guardrails remain.
- **Acceptance:** JS game tests for migration, accrual vs collection, credit interest and debt repayment, cash reconciliation, contract price locks, investment P&L, promotion criteria, 365+ days and narrow-screen UX. Historical/causal limits stay transparent.

## Backlog (await owner selection)
- Office expansions and richer multi-level organizations (first department managers delivered v13)
- Reactive rival companies
- Richer team relationships, trust and politics
- Living markets, new industries and seasons (financial dashboards delivered in v12)

## Optional later: conversational AI
- Offline rule-based personalities are the default. Online conversational AI would require network access, cost/privacy decisions and explicit owner approval; do not implement in the offline build without that approval.

## Delivery discipline
Read the latest GitHub `main/index.html`; preserve the complete game; implement on an isolated branch; run syntax, behavior, save and mobile checks; publish through GitHub Pages; update README, CHANGELOG and the Boss Notion page; verify the live URL before claiming completion.
