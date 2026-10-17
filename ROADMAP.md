# Boss — simulation development roadmap

**Owner-updated progress (2026-10-17):** v7 Smart Office Assistant, v8 Projects & Customers and sector expansion, v9 Smarter Employees, v10 Company Operating System (continuous pipeline, persistent roles, autonomous work and capability/skill maps), v11 Mobile UI Simplification, v12 Business Intelligence and v13 Organization & Leadership, v14 Entrepreneurship & Leadership Lab and v14.1 Management Coach & Decision Intelligence delivered. v15 Advanced Business Economy delivered, including a role-focused career and hiring map. Future expansions remain in the owner-selected backlog.

**Product guardrails:** one self-contained `index.html`; free, ad-free, offline, private, with no account, tracking, external libraries, fonts or network calls. Local-browser saves only. Mobile-first. The player remains the boss. No mandatory ending. New saves must import `boss14`, `boss13`, `boss12`, `boss10`, `boss9`, `boss8`, `boss7`, `boss6`, `boss5`, and `tl3`.

## v20.1 — Save-failure safety and Executive Assistant briefing completion

**Implementation:** [PR #19](https://github.com/BSAVCI1/Boss/pull/19), a narrowly scoped correction to already-released v20. If writing a newly purchased line to `boss20` fails, roll back the entire in-memory financial transaction and display a storage warning; write the supplementary journal only after persistence succeeds. Seven-day Executive Assistant reporting includes revenue, operating expenses, profit, receipts/payments, delegated authority usage, actual manager/CEO decisions and three CEO priorities. Historical iPhone data is not remotely accessible and cannot be reconstructed without independent receipt evidence. Verify all inherited regression suites, new failure/reconciliation assertions, 390px Chromium and Pages before release.

## Released: v20 — Service Portfolio & Autonomous Business Leadership

**Approved additions from iPhone gameplay at Days 2800–2900:**

1. **Group Team by reporting line and role.** Show CEO direct reports, Commercial → Sales/Marketing and Delivery → Product/Operations, including each manager's actual people. Preserve employee cards, exact identity IDs, expandable state, and appointments after refresh.
2. **Business-line launch persistence / suspected save overwrite.** An investment must be recorded once, survive reload and older-tab writes, and be recoverable when the current financial ledger independently contains evidence of payment. Do not give free launches or charge twice. Distinguish zero line revenue from lost purchases, and track realized contributions from the launch date.
3. **Replace the redundant Review leadership meeting shortcut.** When selected from the mature-company mission, open an Executive Assistant weekly briefing with real current metrics, department health, project risks, service development and outstanding CEO decisions. A button that merely scrolls to an already-visible card is not accepted.

**Original v20 scope:** Individual marketed services rather than generic projects; service tiers, differentiated contract fees/scope, quality-linked repeat business, skill requirements, attributed earnings and margins, and managers who recommend hiring specialists into their own reporting teams. Preserve single-file, offline, game-first UX and consolidated company accounting.

**Implementation:** [PR #17](https://github.com/BSAVCI1/Boss/pull/17) merged to `main` commit `6070dc9e12daa3397618d471f540b2a0340e90d5`; [main CI](https://github.com/BSAVCI1/Boss/actions/runs/39056228682) and [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39056228239) succeeded, plus a successful isolated live-browser smoke test. The owner's personal iOS Safari save is not available to automated QA. Paid line recovery requires a surviving matching financial receipt; absent evidence, don't invent prior lines or refund. v20 saves to `boss20` and imports the exact previous keys. Test brand-new company, at least two previously purchased lines, refresh recovery from paid receipts, no-receipt safety, old-save preservation, multiple-tab stale-save conflict, 730-day economics and true 390px mobile UI. Merge only with complete CI and live Pages verification. Do not claim iOS Safari old-save data inspected by automated Linux Chrome tests.

**Longer-term v21:** Product and subscription businesses, service-unit P&L, acquisition, strategic investment and valuation only after v20 core economics are robust.

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


## Delivered: v15.1 — Career Pathways & Evidence-Based Progression
- Five title levels: Associate → Senior → Lead → Principal Specialist/Department Manager → Distinguished Specialist/Director. Specialist and management paths diverge beyond Lead; managerial promotions require actual authority, management work and measured team performance.
- Employee development can follow targeted Sales, Marketing, Product or Operations learning, but knowledge/XP alone no longer unlock promotions. Each step combines measured time in grade, real role-based practice, proficiency, experience and demonstrated outcomes.
- Time in grade thresholds: 110, 150, 190 and 250 days respectively, plus growing experience and skill requirements; payroll impacts and skill gaps shown in an expandable individual roadmap.
- Existing titles, salaries, legacy XP, financial data, projects and organizational roles retained in `boss151`; no retrospective career practice fabricated. Old `boss15` key remains untouched.
- Acceptance: all v15 finance/play tests pass plus long-running 365+ day simulation, no premature or automatic promotions, distinct leadership eligibility and mobile disclosures.


## Delivered: v16 — Living Business World
- Three locally simulated competitors specialize in value, premium quality or speed. Each evolves every 30 game days, gaining independently simulated business and setbacks; shared customer bids also influence results. Rival history starts forward-only at the upgrade day.
- Customer choices model price, quality, delivery speed and trust. New competitive tenders compare customer priorities, rival capability, corporate strategy, sector specialization, customer loyalty, payment terms and market pressure. Bids lock agreed contract value only when genuinely won; lost bids do not create phantom revenue.
- Four business strategies: Balanced, Premium specialist, Efficient volume and Client partnerships. Each affects future bid odds, price, workload, prospecting, quality and/or returning-customer opportunity. 30-game-day strategy cooldown; no retroactive repricing.
- Every ~55 days, optional no-modal market briefs support major tenders, referrals, downturn research and account renewals. There is no mandatory administrative action; decisions log immediate costs and delayed observations through the existing Decision Journal.
- Save key `boss16` reads `boss151` and older histories without fabricating pre-v16 rivals, bids or events. One local HTML file, no trackers/APIs or external dependencies.
- Acceptance: preserve v15 accounting/career tests; add competition, business strategy, market event, contract lock, migration, 365+ day open-market and 730-day Focus-mode financial reconciliation; verify live Pages navigation and mobile.

## Boss v16.1 — Corrective Release (IMPLEMENTED ON DEVELOPMENT BRANCH)
- Replaced the rigid single-contract-every-eight-days bottleneck with bounded 3–8 day spacing proportional to deployable capacity; changed pipeline saturation handling and corrected commercial manager reviews to distinguish new lead generation from current negotiation wins.
- Added role-specific Delivery Specialist Utilization; companywide billable share is neutral/informational, not a blanket red flag. New numerator/denominator begin forward-only so past staff days are not invented.
- Added real, measurable Product QA and Operations process improvement activity, trackable role-day evidence, bounded quality/process effects and ongoing non-client career development. XP alone still cannot promote an employee.
- Added forward-only employee scorecards tracking project assignment/completion, delivered quality, lead attribution, wages, skill changes and wellbeing. Comparisons are same role and grade, neutral with low sample sizes.
- Added small/medium/large employee idea costs ($5/$20/$60), effort commitment, uncertainty, funding affordability and recorded delayed outcomes. Prior approved ideas, Lab experiments and capability history remain intact.
- Kept employee/career accordions expanded when cards are updated and restored their open states via `boss161` saves; funded-ideas panel is stable and refreshed without reconstructing its details element.
- Regression path: v15 + v16 + v16.1 tests, 365/730+ day cash reconciliation, migration from `boss16` and prior versions, no runtime external dependencies, live mobile Pages smoke. Source issue: https://github.com/BSAVCI1/Boss/issues/3.

## Boss v17 — Game-First Edition (DELIVERED; production Pages and browser interaction verified)
1. **CEO Desk:** day-by-day business story, earned company chapter, clear next mission with progress and a direct action, short achievement feed, visible animated office, optional seven-day time jump.
2. **Work:** Customer projects and next opportunities appear first; financial BI, collections, pricing, liabilities and capital decisions remain intact behind **Business records & money**.
3. **Team:** People are presented ahead of admin, with quick-read mood and wellbeing, while more detailed organizational setup stays under **Managers & organization**.
4. **Growth:** Clearer rival identities, sector/experiment headings and recognizable locked/unlocked capability states. Existing world, industry, ideas and experiment histories untouched.
5. **Learning:** The Management Coach, 3 learning modes, full career and performance details, financial statements and the Leadership Journal remain accessible via disclosures for players who prefer depth.
6. **No economic modifications:** Company chapter progress and notifications read actual game state. No free milestones, invented history or changes to contract values, payroll, receivables, KPIs, employee XP or market outcomes.
7. **Validation:** Run inherited v15/v16/v16.1 automated suites plus v17 checks for save migration, seven-day pacing, 520/730-day economic reconciliation, functionality of all four navigation views and offline mobile usability. Preserve `boss161` save; new `boss17` key reads older versions.

**Potential next iteration after playtesting:** Richer employee narratives and relationships, meaningful rival rematches, more celebratory results and smoother guided first-session learning — without new administrative dashboards.


## Delivered: Boss v18 — CEO & Leadership Edition (production on 2026-10-17; v18.1 corrective update)
- Company identity separates service offer (B2B consulting/delivery), customer industries, and competitive positioning.
- Today starts with reporting structure (Commercial/Delivery directors plus Executive Assistant), 90-day CEO priorities, and executive decision inbox.
- Weekly management meetings surface director requests for training, hiring, pay and cost optimization with forecast cost/risk. CEO approves or declines; journal and manager review record results, while actual expense postings and recurring salaries only change on approval.
- Director-first departmental job allocation with Executive Assistant coordination across departments. Existing employee assignments are preserved.
- Optional $120 new service line: future matching contracts only, shared staff, recorded fees and bounded production effect; no backfilled revenue or duplicate profit.
- Market events clearly presented in CEO inbox and retained for 45 days; opportunities remain optional.
- Mature-game specialist status, renewable strategy objectives, completed upgrade archive, ongoing bounded R&D, fixed office task animation icons.
- Additive boss18 save migration from boss17 and earlier. Preserve signed contracts, employees, customers, project histories, strategy, rivals and experiments. No external APIs.
- **Release evidence:** PR #7 merged and PR #8 fixed the CEO direction selector. On commit `0cc7ab7`, all five inherited v15/v16/v16.1/v17/v18 regression suites passed (including 730-day simulations, financial reconciliation, legacy migration, and no artificial service-line income); GitHub Pages build and deploy completed successfully on 2026-10-17. Separate browser/mobile QA remains an ongoing quality gate and should not be confused with automated DOM assertions. Existing Notion project records both releases.

## Delivered: Boss v19 — Organizational Scaling & Executive Delegation (released 2026-10-17)
**Origin:** Owner's 2026-10-17 iPhone gameplay at about Day 2443, 14 employees and two managers; implementation authorized in the follow-up. The v19 branch contains a functional implementation covering roles, reporting tree, custom 90/180-day authority with explicit CEO renewal, department objectives, delegated training and hiring, and Today market Act/Pass. Preserve offline one-file architecture, economics, historical accounting and previous browser saves. No valuation, tenure or reputation-rebalance changes in v19.

### P0 — defects and misleading communication
1. **Manager vs director title inconsistency:** Today always hardcodes "Director" for the two department managers; Team calls them "Manager". Use actual career/appointment tier and a consistent role label across both views; keep old appointments valid.
2. **Opportunity eligibility and same-screen action:** Executive inbox links to Growth instead of allowing act/pass. Add contextual act/pass to Today, plus clear event type, estimate, deadline, projected outcome and explicit disabled reason. Share one action handler and consume each event once; do not duplicate actions between Today and Growth. Fix global Growth disabled condition: pipeline >= 12 currently blocks referral and slowdown research even though those do not add leads. For actual tenders and renewals, explain full pipeline, unavailable customer or insufficient cash, and offer legitimate mitigation.
3. **Refresh and notification sanity:** Ensure live game-day updates preserve selected choices and disclosures. Show brief but meaningful confirmation/outcome without obstructing the bottom navigation; avoid repeated low-value proposal notifications.

### P1 — growing into a management hierarchy
4. **Optional secondary management tier:** CEO -> Commercial/Delivery Directors -> optional Sales/Marketing/Product/Operations Managers -> employees; Executive Assistant reports to CEO. In small firms the director can manage contributors directly. At high span of control, directors can recommend promoting/hiring a sub-manager and moving existing reports with a cost, authority and productivity business case. Distinguish Director appointment from earned career rank. Show unique employee identifiers or role detail when names repeat. No employee should be counted twice and no silent reassignment of a manual order.
5. **Meaningful span-of-control trade-off:** Existing >5 report warning already corresponds to a measured manager-effectiveness reduction. Explain that effect and give a one-click, non-mandatory remedy through director proposals. Manager capacity, coaching output, leadership progression and payroll overhead must change with hierarchy and business results.
6. **CEO/Director/Manager/Assistant accountability:** Directors own department strategy, staff and proposals; team managers own training, daily allocations and team performance; Assistant tracks CEO briefing, coordination, exceptions and follow-ups. No duplicate assistant/manager spending or competing assignment ownership. Time-bound delegated authority and an auditable decision journal.

### P1 — budgets, proposals and targets
7. **Flexible numeric budgets and objectives:** Replace hard-coded coach budgets 0/8/16/30 and targets 3/5/8 leads or 70/85/95% on-time. CEO sets validated custom positive in-game-dollar amounts, a 90- or 180-game-day period, and measurable numeric targets. Provide meaningful supported KPI/target choices without fake custom metrics. Show original allocation, spent, committed/forecast recurring, available amount and period remaining.
8. **Budget categories:** Separate coaching, training, team-building/wellbeing, and recruiting/hiring (including ongoing payroll guardrails); optionally a retention/salary authorization. Show department and consolidated enterprise exposure, and permit explicit CEO reallocation.
9. **Delegated authority and blanket approvals:** CEO can approve a specific category/role/headcount with max per-action spend, cumulative period budget, payroll run-rate ceiling and an expiry at 90/180 days. Managers perform qualifying routine investments independently and report outcomes; exceptions trigger a single costed replenishment/temporary-overrun request with expected benefit, duration and alternative. Automatic authority must stop safely at limits, insolvency, or expiry and never invent hires or exceed payroll ceilings.
10. **Executive meeting quality:** Current default weekly proposal is $8 training whenever no other issue exists. Replace with strategic, evidence-based manager proposals, diversified actions, quantified benefit/cost/risk/timeframe, and an option for "no CEO decision needed". Review policy outcomes at regular meetings; stop repetitive approval queues.

### P1 — meaningful markets and tenders
11. **Bid sizing and economics:** Fixed $12 major tender cost and default project fee hints do not scale with mature firm size or actual reputation-inflated signed fees. Model tender complexity, project scale, expected contract value, required capacity, rival pressure, preparation cost, timing and uncertain award outcomes. Do not promise a win, allow duplicate booked revenue, reprice existing agreements, or bypass pipeline limits. Give a clear estimate and reason for unavailability before the player chooses.

### P2 — maturity and business value
12. **Reputation explained and rebalanced carefully:** Today reputation influences contract signing price via `1 + rep/200`, sector access, quality/trust bid chance and company chapter. At very high late-game reputation, linear pricing produces strong compounding advantages; assess a forward-only diminishing-returns revision and show understandable benefits of reputation. Preserve signed historical fee amounts and test late-game balance.
13. **Time and employee service:** Game day affects reviews, manager proposals, career time-in-grade and market cycles but the game has no explicit "years in service" metric or service-anniversary consequences. Consider company age (day / 365) plus actual post-hire tenure from each individual's recorded hire date, with safe forward-only legacy migration and no fabricated historical join dates; optional loyalty, retention and service-milestone events.
14. **Company valuation:** No operating company valuation model currently exists. Propose a clearly marked estimated in-game enterprise/equity value based on reproducible trailing operating profit/cash/receivables/debt, adjusted for risks, business-line health and client diversification (never treat cash as equivalent to valuation or company value as spendable money). Make valuation influence meaningful long-term business choices only after an owner-approved design.

### Release acceptance for next batch
- Test new small company, large 14-person and Day 2400+ saves; imported `boss17` and `boss18` saves; independent department managers, promotion roles, reporting correctness, unique IDs, budget validation, expiry, reallocation, payroll and delegated hiring guards.
- Reconcile opening cash + tracked receipts - payments with live cash through at least 730 simulated days, preserving signed fees and historical data. Verify no unapproved $8 auto-training or double-charged expenses.
- Test each opportunity type when pipeline is full, cash is inadequate, retention customers are missing, or no dilemma can interrupt; act/pass directly on Today with reasoned disabled states and no repeated transaction.
- Test actual mobile viewport near 390px for fixed bottom navigation, compact expandable structures, controls, no overlaps, preserved focus during day ticks and useful CEO decision summaries.
- **Branch QA:** seven full regression suites passed on `boss-v19-org-autonomy`, including 730-day reconciliations and migration from legacy saves to forward-only `boss19`. PR #11 merged in main (`8fa6f7051f4f988442c88431a62c869deb5a8b1b`); production [regression checks](https://github.com/BSAVCI1/Boss/actions/runs/39046003370) and [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39046002839) succeeded. Real Chrome mobile device emulation at 390px verified four tabs, no horizontal overflow, supported management fields and no JavaScript errors. Long-running personal-save interactive playtesting remains an optional next validation.
- **Deferred separately:** 2026 company-value simulation, tenure anniversaries and any forward-only reputation pricing recalibration; do not silently change economy or signed fees in this patch.

## Boss v19.1 — Mobile leadership correction (tested; publish after merge)
- Correct Today → Review leadership meeting to scroll to the actual executive inbox.
- Preserve active numeric budget entry during manager/department simulation refresh and verify edit commits.
- Fix promotion price interpolation, Executive Assistant legacy task label and subordinate manager-versus-director titles.
- Document pipeline policy and separate qualified-pipeline target (2/4/6), maximum 16 open leads, and variable 3–6 concurrent delivery capacity.
- Regression addition: preserve Sales and Marketing managers across the `boss19` save/reload cycle; test focused numeric input behavior; verify all seven suites and 390px Chrome smoke before release.

## Proposed next batch — service portfolio, staffing demand and multi-business architecture (NOT IMPLEMENTED)
- Make service offerings distinct from customer industries and from basic skill tags; introduce independently priced, tiered deliverables with demand, difficulty, specialist availability, quality, contribution margins and repeat contracts. Investment alone must not invent revenue.
- Make team managers propose role-specific headcount and coaching against an approved business-line delivery plan. Recruitment should consider Sales vs Marketing and Product vs Operations capacity instead of defaulting new hires to Sales/Operations; clarify all budget/headcount/recurring-payroll blockers in UI.
- Model optional multiple business units only after distinct services and economics exist; proposed structure: CEO / Business-unit leader / Commercial and Delivery / Team managers, with shared-service choices, per-unit leadership, budget, contract attribution and consolidated-but-not-duplicated financials.
- Investigate reported hierarchy change after browser refresh using user-owned saved state and multi-tab-write safeguards. Current automated same-tab save/reload test preserves manager appointments; do not claim the user's particular iPhone state was verified.
- Distinguish aspirational 90-day strategy from actually expired, renewed or achieved strategy reviews, with meaningful leadership outcomes, to avoid showing Day 379/90 without explanation.
- Separate Executive Assistant CEO briefing/exceptions/cross-department coordination from old routine office HR and project-assigning automation; scale realistic costs and authority by company stage.

## Backlog (await owner selection)
- Office expansions and richer multi-level organizations (first department managers delivered v13)
- Reactive rival companies
- Richer team relationships, trust and politics
- Living markets, new industries and seasons (financial dashboards delivered in v12)

## Optional later: conversational AI
- Offline rule-based personalities are the default. Online conversational AI would require network access, cost/privacy decisions and explicit owner approval; do not implement in the offline build without that approval.

## Delivery discipline
Read the latest GitHub `main/index.html`; preserve the complete game; implement on an isolated branch; run syntax, behavior, save and mobile checks; publish through GitHub Pages; update README, CHANGELOG and the Boss Notion page; verify the live URL before claiming completion.
