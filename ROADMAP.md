## v22.5A2 — Work, Team & Growth simplification (19 October 2026 · DRAFT FEATURE BRANCH / NOT RELEASED)
- **Scope:** [issue #52](https://github.com/BSAVCI1/Boss/issues/52) · `feature/v22-5a2-work-team-growth` based on verified merged main `c7ea477261bf76cd5b700e2878d7dfed949ad4b2`. Work now leads with active projects, real delivery risks, a cash/profit/receivable/liability snapshot and accurately labelled owned toolkits. Credit, payment terms and ledgers remain under Advanced Finance; capital purchases now live in Growth with historical cost rather than unattributed ROI.
- **Team:** real reporting/management capacity and careers take priority; immutable employee IDs remain in saved state, DOM attributes and advanced organization details, not the primary tree; optional vacancies and routine activity are non-urgent. Existing HR, EA and leadership controls remain available as advanced/manual permissions under the existing CEO Today Management policies, without creating new grant pathways. Project deadlines are in Work.
- **Growth:** Expand businesses; Markets and customers; Investments and property. Distinguishes sector, market positioning, future-contract price approach, CEO company direction and individual GM operating strategy. Existing operating units, property and economic mechanics preserved; research, rivalry and innovation stay in an advanced drawer.
- **QA:** new scoped layout tests and real Chromium 390/414 before-and-after screenshot capture plus existing mandatory exact-head financial, save/IndexedDB, ledger, identity and policy regressions. Current status is **unverified until final PR exact-head CI SUCCESS**. No production merge/deployment. v22.5B automation, spending or new economics excluded.

## v22.5A1 — CEO management policies (19 October 2026 · IMPLEMENTED ON FEATURE BRANCH / REVIEW PENDING)

- **Source branch:** `feature/v22-5a1-management-policies` from verified main `ac58ee8ab01dca53e038591551c797b59dbfbfb8`; issues [#46](https://github.com/BSAVCI1/Boss/issues/46) and [#52](https://github.com/BSAVCI1/Boss/issues/52). **Not merged or deployed.**
- **Working code:** CEO Today management policy center proposes Conservative, Balanced, Aggressive, Custom without mutating permissions; shows current/next/historical authority, 30/90-day maximum liabilities and cash/premises/payroll runway. CEO confirmation validates package and commits all corporate hiring, additional leadership salary, department and GM limits and supported EA caps within the existing game's single-transaction, rollback-on-persistence-failure path. Officer mandates and all existing CFO/eligibility/CEO exception controls remain unchanged. 90/180-game-day manual renewal only.
- **Actual-script fast smoke:** fresh $90 founder; sixteen-person developing firm; 27-person, Day-4900 $3.6M mature synthetic company; positive recruiting budget with zero hires; invalid proposals; localStorage failure rollback and successful durable reload. No cash/ledger change on approval. These are focused local checks, **not a substitute for mandatory CI or real Safari test**.
- **CI architecture:** four independent v22.3B economic sensitivity models execute as a parallel Actions matrix; subsequent comparison downloads, validates and reconciles all four model artifacts. Existing full game/730-day tests, mobile/browser checks, every scenario and artifacts remain required. An exact-head acceptance gate rejects failed, skipped or cancelled jobs; obsolete PR runs may cancel, main push jobs cannot. Prior measured complete run [#39231709335](https://github.com/BSAVCI1/Boss/actions/runs/39231709335): 09:39:31–10:54:42 UTC = **75m11s**; post-change total elapsed time **pending first final-head run**.
- **Pending QA:** exact final-head Actions success and complete artifacts; genuine 390/414px selection/preview/approval screenshots (capture code added, PNG artifacts not yet verified); 730-day finance/ledger, IndexedDB, browser tick and full v22.4.1 replays require completed CI evidence. No assertion of engineering release-readiness until all pass.
- **Next authorized development batch:** v22.5A2 Work/Team/Growth relocation/simplification. v22.5B autonomous executive operation explicitly out of scope.

# Boss — simulation development roadmap

> **v22.4.1 CEO Decision Clarity — DRAFT PR #53, 19 October 2026.** Targeted working changes on `feature/v22-4-1-ceo-decision-clarity`: one authoritative optional market Take/Pass decision, stable in-place CEO details, one earned business launch prompt with deep link, and mandate-aware data-grounded Executive Assistant 90-day strategy review. [Issue #51](https://github.com/BSAVCI1/Boss/issues/51) · [Draft PR #53](https://github.com/BSAVCI1/Boss/pull/53) · [full exact-head Actions](https://github.com/BSAVCI1/Boss/actions/runs/39222124999). **QA pending:** all existing 730-day and mobile save/IndexedDB tests remain required, plus new 390/414 real Chromium evidence. Not merged, not deployed; broader [#52](https://github.com/BSAVCI1/Boss/issues/52) / v22.5A deferred.


> **v22.3C4 integrated Day-0 HQ proof (18 October 2026) — IN DEVELOPMENT / PARTIAL, not deployed.** The [three-strategy actual-engine runner](tests/v22-3c4-integrated-growth.cjs) compares paid corporate-first, balanced business-unit and earlier GM growth from $90/three real employees, measures genuine 20-corporate/Director/two-GM-unit/50-delivery/cash/HQ readiness, and tests explicit CEO purchase only when authorized. [Specification and exact verification gate](docs/V22_3C4_INTEGRATED_ORGANIC_GROWTH.md). C3 proved Director separately but not coexisting with the operating units. v22.3 remains [draft PR #39](https://github.com/BSAVCI1/Boss/pull/39) / [open #40](https://github.com/BSAVCI1/Boss/issues/40); production v22.2 and parallel v22.4 PR #44 remain untouched. Final results and latest-head mandatory CI pending.


## BOSS Chief Command Center — permanent program governance

**Central program board:** [Notion Chief Command Center](https://app.notion.com/p/3fdff3ed9aa581db94a9ee2c4b4b9277). **Canonical full roadmap and acceptance gates:** [GitHub Chief Command Center](docs/CHIEF_COMMAND_CENTER.md). **New chat starter prompt:** [Chief Command Center master prompt](docs/CHIEF_COMMAND_CENTER_START_PROMPT.md).

This roadmap now operates **one version or small batch per new development chat**, with explicit GitHub PR/CI and Notion handoff to a separate Chief Command Center chat. The Chief chat should manage status, source-of-truth alignment, cross-version dependencies, quality and the next single development prompt; it does not implement the gameplay itself. One chat per batch prevents long execution streams and intermittent chat capacity interruption.

**Full sequenced work:** v22.3A/B economy evidence/integration; v22.4B–D org/career, CEO office & UI release; v22.5A–C Conservative/Balanced/Aggressive/Custom limits and real HR/CFO/COO delegation; v22.6 earned Founder → Business Leader → Group CEO phase behavior; v23A–C differentiated product/customer/competitive strategy, investment and acquisitions; v24A–C campus/org visualization, human employee stories/empire and manufacturing/supply chains, with an end-to-end release quality gate.

**Known initial state (verify live before each action):** v22.2 is deployed; [v22.3 draft PR #39](https://github.com/BSAVCI1/Boss/pull/39) and [v22.4 draft PR #44](https://github.com/BSAVCI1/Boss/pull/44) are not. The latest v22.4 CI pass at its development branch [#39120661653](https://github.com/BSAVCI1/Boss/actions/runs/39120661653) is not a production release.

## v22.3C3 — organic leadership competency (IN DEVELOPMENT / DRAFT, 18 October 2026)

- **Root cause proved in code:** initialized leadership skills had no reliable high-rank growth through observed real ladder reporting lines; a fresh organically grown Manager could remain below 65 and a Senior below 70 indefinitely despite payroll-funded years of productive management. This is separate from the intact 45/55/65/70 thresholds and company milestones.
- **Draft implementation:** observed productive supervision develops planning/delegation; active coaching and existing 14-day successor mentoring develop people skills at all ladder ranks. A CEO-authorized $12, 14-Study-day, once-per-rank course is an optional bounded development path. All ranks, reporting lines, appointments, salaries, hiring, promotion cash/reserve checks, delegation authority, economic terms and old-save values remain governed by existing rules.
- **Evidence still required:** new real-engine Day-0-to-Day-1460 replay, earned Senior and Director actual eligibility, 20-corporate/two-GM/50-delivery HQ readiness, no unauthorised purchase, full 730-day economic and old-save/mobile/IndexedDB CI, latest SHA GitHub Actions, and owner's original Safari acceptance. A Director and headquarters purchase must NEVER be claimed on cash alone. Draft [PR #39](https://github.com/BSAVCI1/Boss/pull/39) and open [issue #40](https://github.com/BSAVCI1/Boss/issues/40); see [C3 implementation and QA record](docs/V22_3C3_ORGANIC_LEADERSHIP.md).
- **Status:** PARTIAL pending exact-head strict CI and organic Director/HQ proof; v22.3 overall stays unreleased, production v22.2; parallel PR #44 unchanged. No merge/deployment.

**v22.3C3 additional actual-engine proof:** Day-0 $90 founder with paid real recruitment reaches Team Lead Day 140, Manager Day 273, Senior Day 441, Director Day 546 under an independent 730-day corporate-first actual-engine replay (34 corporate people, 184 deliveries and $76,349.71 cash by Day 730). Existing 45/55/65/70 skill thresholds remain intact; managerial auto-work now reflects actual direct-report supervision, successor training is bounded, and Director appointments require meaningful organization span. **Integrated HQ remains BLOCKED:** the corporate-first path has no two managed GM units; a separate HQ-oriented 1460-day replay runs out of cash/headcount. Latest-head strict Actions, 390/414 mobile, IndexedDB, owner Safari and live HQ acquisition still unverified; no release authorization. [Expanded report](docs/V22_3C3_ORGANIC_LEADERSHIP.md).

## v22.4D — UX Simplification & Release Preparation (18 October 2026 · OPEN DRAFT)

**Code delivered on [CEO PR #44](https://github.com/BSAVCI1/Boss/pull/44):** Today keeps the exact CEO priority, real pending approvals and one top-level game toolbar; company narrative/campus, identity, executive officer settings and strategy now expand on request. Work collapses customer-history dossiers; Growth collapses rival research; finance/people/GM/property details remain accessible in their original authorized flows. Unfinished discoveries remain visible; completed capabilities and historic discoveries are archived separately without changing `S.built`, rewards, research rules or purchasing. Duplicate operational cards for required CEO approvals, optional market offers and strategic milestones were removed; the original CEO decision and milestone routes remain. Active input protection now lasts until blur rather than treating a select/change event as the end of editing.

**Regression evidence and required release checks:** Existing real-engine v15–v22.4C, 730-day financial and IndexedDB/390px/414px browser suites remain mandatory. Added v22.4D read-only upgrade/cash archival test and real browser checks of closed/open dossiers, visible game buttons and unique actions; 390/414px Chromium capture produces four new real screenshots in `boss-v22-4d-mobile-evidence`. Only a SUCCESS run on the final PR #44 head can promote engineering status to CI-PASSED DRAFT. Candidate Actions #39163018051 FAILED because a v21.3-era test expected the *removed duplicate* optional offer card; the revised test verifies the authoritative CEO optional inventory. Subsequent Actions #39163147948 FAILED on an incorrectly escaped regex in the new v22.4D unique-control assertion (test-only); corrected on commit `9ab22ac8`. Final follow-up `912870d` also upgrades Chromium to measure actually expanded CEO hierarchy geometry. **No workflow run yet confirmed for this current head; do not mark QA passed.**

**Focused v22.3/v22.4 integration diff — STILL OPEN (NOT separately CI tested):**
- `estimatedFee`, `createDeal`, `worldTenderPreview`: PR #39 adds `reputationPriceFactor(rep, pricingVersion)`, prospective version-23 new contracts, `economicVersion` and `externalProcurementQuote`; PR #44 adds `worldIndicativeFee` parity previews. On an explicitly authorized integration branch, preserve PR #39 forward-only price formula and immutable signed `agreedFee`, then route PR #44 preview through it. Verify new bids vs committed fees at rep 300/1200/3000/10000; never book a preview.
- `ensureEconomy` and economic settlement: PR #39 adds procurement payable and `contractProcurementQuote/Close/Settle`; PR #44 does not. Integrate without zeroing `procurementPayable`, rebooking old debt, changing pre-versioned contracts or changing `load/save` revision/IndexedDB selection. Validate historical signed fee, 730-day group ledger and cash-flow reconciliation together.
- `propertyQuote` contains PR #44 preview state (`propertyDraft`/`decisionFeedback`), while both branches share `propertyReadiness/propertyOpen`. Merge these narrowly and reconcile property quote, affordability, payroll + ongoing premises and v22.3 prospective procurement cost; never rewrite existing owned sites.
- PR #39 earned leader training/supervision (`ladderCoachSuccessors`, `ladderStartTraining`, `ladderDevelopDay`) must integrate with PR #44 `canonicalReporting` read-only people/GM hierarchy and career advice. Do not offer unmerged courses as working actions; retain actual manager appointments, saved reporting and CEO spending safeguards.
- Shared `unitAuthorize`, `executiveDecision`, `executiveMandate`, `save/load`, `propertyOpen` are currently identical between branches at function level; integration must still run combined live behavior, owner Safari non-destructive reload and exact final-head CI. Independent green PRs do **not** establish compatibility.

**Release-readiness matrix:** Implemented UI / focused automated regressions committed to DRAFT PR; real screenshot capture and complete finance/save/browser results require exact-head Actions evidence. Economic PR #39 compatibility, cross-branch regression, owner's actual Safari save verification and final merge/deploy consent remain OPEN gates. Production is v22.2; neither PR merged; no v22.5 authorized.

## v22.4D Final Verification — 18 October 2026 (successful candidate; exact final-head recheck required)

- **Working player UX:** one prominent CEO Today priority and authoritative approval inventory; secondary management, customer, campus and competitor dossiers are expandable; unfinished Growth discoveries remain visible while completed research is archived without rewriting history, effects or spending. Four genuine screenshot images show Today and Growth at **390px** and **414px**.
- **Successful mandatory candidate CI:** [Actions #39165242676](https://github.com/BSAVCI1/Boss/actions/runs/39165242676) returned **SUCCESS** for `a91f00f9678fe503f9036fb62f44f782fbb193b9` after fixing the v22.4 feature branch's missing `push` workflow trigger. Regressions include v22.4D research/archive/unique controls, real Chromium disclosure and 390/414 no-overflow, live focus/input drafts, IndexedDB old-save reload, historic salaries/contracts/property, original executive and spending gates, and the 730-day reconciled economy.
- **Downloaded and visually inspected:** [boss-v22-4d-mobile-evidence, artifact 12149688932](https://github.com/BSAVCI1/Boss/actions/runs/39165242676/artifacts/12149688932) contains four valid PNG files, `boss-simplified-{today,growth}-{390,414}px.png`, with actual visible CEO command centre/priority and unfinished research list; not fabricated Safari screenshots.
- **Final-head rule:** this ROADMAP edit creates a new draft-head SHA. Its own Actions run must finish **SUCCESS** before the batch can be called CI-PASSED DRAFT. See [PR #44](https://github.com/BSAVCI1/Boss/pull/44) and [issue #41](https://github.com/BSAVCI1/Boss/issues/41) for that exact final SHA/run evidence. Do not substitute #39165242676 for a subsequent head's CI.
- **Release blocked:** economic [PR #39](https://github.com/BSAVCI1/Boss/pull/39) is separate/unmerged: integrate forward-only quote/bid parity, procurement liabilities and settlement, property runway/pricing, organic earned leadership/canonical reports, saved-contract integrity and combined 730-day finance in separately approved integration work. Owner real Safari Day-4704 save was NOT tested. Production v22.2; no merge, deployment or v22.5.

## Approved CEO-first experience roadmap — 18 October 2026

**Product direction:** evolve the default experience from founder (hands-on) to business leader (delegate) to group CEO (strategic direction, executive exceptions, capital). Player approved findings from four Day-4704 Today/Work/Team/Growth screenshots. The authoritative [product audit and acceptance criteria](docs/V22_4_CEO_EXPERIENCE_AND_PRODUCT_AUDIT.md) accompany Boss [Notion](https://app.notion.com/p/3fbff3ed9aa581e29a02cba3dfcad323). Never reset the iPhone company or silently reprice history.

- **v22.3A — Economic proof CI PASSED (DRAFT); v22.3B — prospective balancing OPEN:** [draft PR #39](https://github.com/BSAVCI1/Boss/pull/39) covers forward-only pricing and already passed baseline CI, and [108 actual-engine 30/180/730-day financial checkpoints](docs/V22_3A_ECONOMIC_PROOF.md) show unresolved economy imbalance. [Issue #40](https://github.com/BSAVCI1/Boss/issues/40) remains open for v22.3B. Do not call it released.
- **v22.4 — CEO Experience, APPROVED:** consistent bid/contract quote economics; remove duplicate/fulfilled role prompts; separate approvals, delegated issues, strategic opportunity and FYI on Today; surface financial and premises decisions; rebuild short EA briefing and clear reporting hierarchy, career blockers, advanced-mode navigation and historic-upgrades archive.
- **v22.4B — People, Reporting & Career Experience, DRAFT PR #44:** Implemented read-only canonical manager/GM/department/CEO reporting projection keyed to saved employee IDs, mobile organization explorer, compact career blockers and real eligible-only promotion controls. No new authority, cash transactions or automatic promotions. Existing study/coaching/check-in flows remain; v22.3 PR #39 leadership extensions are unmerged. [Draft PR #44](https://github.com/BSAVCI1/Boss/pull/44); Real Chromium organization and on-screen career screenshots captured at 390px and 414px, with no overflow or browser errors; fresh/Day-4704 34-person hierarchy, 730-day finance, live input and IndexedDB recovery passed on code commit `4e03ef6832172ab9b2d400e57cdb1389e681a893` ([Actions #39158977870](https://github.com/BSAVCI1/Boss/actions/runs/39158977870)). Owner's private Safari save remains untested; keep draft, no merge or deployment.
- **v22.5 — Management Autopilot, APPROVED:** HR/COO/CFO act on genuinely authorized routine work with budget caps, 30-day reserve and role-specific evidence; optional guarded renewals, spending policy presets, proposal outcomes and traceable rejections. No default executive spending rights.
- **v23 — Investments & Acquisitions, AFTER ECONOMY/CX:** valuation, diligence, integration, actual risks and differentiated operating units.
- **v24 — Manufacturing / Business World:** gated factories, supply chains, investment world, responsive visual company campus and employee stories.

**Release quality gates:** real 390px/414px UI, live game tick/edit persistence, IndexedDB migration, 730-day financial ledger, single cash and employee identity, old and new contract pricing. Keep each feature branch in a draft PR until verified. Visible progress does not imply production deployment.


## v22.4C — CEO Today & Strategic Decisions (draft candidate; exact-head CI required)

- Extends open draft PR #44, not production: mobile CEO Today highlights real cash versus cumulative operating result, verified approvals versus routine management, one strategic next action, and true company progression prerequisites.
- Office decision compares the currently saved site's actual seats and corporate workforce with existing eligible lease and ownership quote/readiness functions, one-off spending, continuing property charges and payroll/premises runway. Quote review is read-only; CEO confirmation executes the existing authorized transaction and cash ledger only once.
- Contextual decision feedback reflects committed cash/headcount/seats after the existing save gate, never forecasts guaranteed revenue. Actual filled executive officers may provide labelled, calculated advice; vacant officers do not speak. No historic contracts, wages, authority, property ownership, employee IDs, storage format or economic quote formulas are rewritten.
- New mandatory actual-game v22.4C tests and real 390px/414px Chromium Today/property screenshot artifacts are part of the draft regression workflow. Full suite, owner Safari verification, review of separate unmerged v22.3 PR #39 and explicit release approval remain blocking gates. Do not merge/deploy as part of this batch.

## Released v22.2 — HR, CFO & COO executive leadership

- CEO can appoint an existing qualified, idle colleague as HR/Chief People Officer, CFO or COO after explicit company, experience and payroll-runway gates; retain one employee identity and normal historic payroll.
- A 90-day, separate, revocable delegation controls each officer; default OFF in both fresh and migrated saves. HR handles only existing approved recruiting envelopes and idle-staff recovery; CFO can veto delegated discretionary spend below 30 days of full cash runway; COO coordinates shared GM support without new staff ownership or payroll.
- All appointments, mandate controls, evidence-backed 30-day reviews and CEO exceptions appear on Today and in EA weekly briefings. [Executive authority and safeguards](docs/V22_2_EXECUTIVES.md).
- This does **not** implement v23 acquisitions, manufacturing, invented executives or retroactive company revaluation. The separate reputation/pricing inflation issue must be analyzed before v23 finance expansion. [PR #38](https://github.com/BSAVCI1/Boss/pull/38) merged at `f189a529b39dc4d78a70394d00b58e92f0078cbf`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39113283639) and [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39113283272) passed on the same release commit.

## Released v22 — Property, Company Campus & Simulation Pacing

- New CEO premises board: serviced and regional leases; owned offices/group HQ; GM-specific satellite leases; real upfront and per-day cash mechanics and premises capacity effects, aligned with reported teams.
- Choose business-park, city-center or regional premises. Store contract prices and future-work modifiers on the acquired property; never reprice prior leases or old projects.
- Office ledger includes noncash depreciation every 90 game days, explicit closed/unused asset accounting, sale of inactive owned property, and unpaid rental obligations with no double-charge settlement.
- Forward-only migration preserves established company headcount at the starting distributed workspace; existing service lines, day counter, profit and personnel remain untouched.
- Mobile-friendly workplace floor views, EA/CEO premises exceptions; existing live office animation limited to 20 FPS with persistent collapse option.
- 1×/3×/8× playback calibrated to 2.4/0.8/0.3 real seconds per game day. Executive events use game-day spacing. Performance and fairness tests in [v22 documentation](docs/V22_PROPERTY_AND_PACE.md). **Release verified:** [PR #33](https://github.com/BSAVCI1/Boss/pull/33) merged at `921c2ee5378d1957d7b300a902de038445fe0ed1`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39111129733) and [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39111128958) passed on that commit.

## Released v21.5 — Progression & Company Direction

- Hard new-service launch gates (5 delivered / Team Lead / reputation / qualified specialist / 21-day payroll reserve); second, third, fourth businesses add actual service delivery, staffed GM units, month-end reviews and deeper leadership cash reserves.
- Growth lists the missing facts and disables purchases until milestones are earned; serverless mutation enforces the same gate before spending. Old purchased lines, ledgers and contract terms remain untouched.
- Today explains the company's active chapter and next gate. A monthly cost-neutral manager evidence scorecard appears in Team and Executive Assistant reporting.
- [Implementation and safety](docs/V21_5_GROWTH.md). [PR #32](https://github.com/BSAVCI1/Boss/pull/32) merged `583ea00e31af82753d26f6bcc2873f3811c70047`; [regression](https://github.com/BSAVCI1/Boss/actions/runs/39107265404) and [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39107264888) passed. Property/assets remain v22, investment/acquisitions v23, physical operations/factories v24.

## Released v21.4c — Autonomous managers and controlled central staffing

- Corporate managers review actual capacity needs weekly, consider idle staff first, and propose hiring only when overloaded. The Executive Assistant surfaces pending exceptions on Today and weekly reports.
- CEO can approve each $20 hire or delegate 90-day recruiting dollars and hiring slots; delegated authority defaults to zero, expires automatically and requires enough cash for 21 days of future payroll. All employees have unique IDs and recurring single-company wages.
- Temporary 30-day CEO-authorized corporate specialist access lets GMs cover real delivery needs without a permanent staff transfer. The person remains corporate, and unit costs attribute actual shared workdays from existing payroll, not extra costs.
- Regression verified on merged `e2e368c`: [GitHub Actions](https://github.com/BSAVCI1/Boss/actions/runs/39105167550) · [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39105167176) · [PR #30](https://github.com/BSAVCI1/Boss/pull/30).
- **Remaining v21.5:** enforced new-service and new-business progression requirements, clearer corporate divisional autonomy and headquarters/asset readiness. v22 property, v23 acquisitions/investments, v24 factories remain future work.

## Released v21.4b — Evidence-based leadership stages

- New-game ladder: five people → Team Lead, then 3 Team Leads → Manager, 5 Team Leads → Senior Manager, 3 Managers → Director; further Team Leads need three more people each. Skills, work/practice days and unfinished contracts affect candidate selection.
- CEO payroll authorization defaults to zero; appointments above budget become CEO exceptions. Within the ceiling, weekly automatic promotions may proceed when 14 days of full payroll can be funded. No upfront fee or duplicate corporate ledger entries.
- Unique-ID reporting, bounded three-person Team Lead groups, successor mentoring, new CEO Today/Team priorities and suggested business-line expansion readiness; preserve all original saves and existing appointments.
- **Subsequent milestones:** Manager-led hiring and 30-day shared corporate capacity were released in v21.4c. Service/new-business unlock rules and full subordinate manager reviews remain for v21.5. v22 offices/property and v23–v24 investing/manufacturing stay planned.
- **Release verification:** [PR #29](https://github.com/BSAVCI1/Boss/pull/29) merged at `69972b4fe6771478cd38ce82b15e9bc3734dc3e9`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39073362391) and [GitHub Pages](https://github.com/BSAVCI1/Boss/actions/runs/39073362154) passed at that commit. Automated 390/414px Chromium, IndexedDB and 730-day reconciliation tests passed; independent live-site browser run could not start because the browser-provider wallet is out of funds, and no private iPhone Safari save was inspected.


## Released v21.4a — Autonomous manager spending plans and successor training

- Fixed GM authority input resetting after one character by staging numeric drafts locally and applying all valid fields as one save; added **Custom** plus Fresh/Manager/Senior manager budget templates.
- 90-day limits (Fresh / Manager / Senior): coaching $24/$30/$38; successor training $24/$30/$38; wellbeing $12/$15/$19; per-action $8/$10/$13; CEO-defined staff target 1–25.
- Appointing a GM now recommends Fresh but does **not** authorize expense until CEO explicitly applies the preset. Existing saves remain on prior authority.
- GM trains an eligible successor with real $8 expense and 14-day cooldown, builds team for $6 when stress requires it and budget permits, alongside prior $4 weekly coaching.
- Tracks reviews, headcount and successor readiness without fabricating promotions, reporting lines or payroll; all charges reconciled to single group ledger.
- **Follow-on v21.4b:** introduce actual Team Lead 3-person subteams, manager spans of 5 leads, senior manager-to-director gates, Corporate Sales/Marketing/Product/Operations managers and explicit costed central employee-day allocation to unit GMs. [Design](docs/V21_MANAGER_CAREER_PLAN.md).
- **Release evidence:** [PR #28](https://github.com/BSAVCI1/Boss/pull/28) merged as `a4f624d884bab6d0b4abdd05480570e8faef59d8`. [Production regression](https://github.com/BSAVCI1/Boss/actions/runs/39072079093) and [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39072078922) passed. 390px and 414px mobile, 730-day, IndexedDB and accounting checks passed; the owner's original Safari save was not accessed.


## Released v21.3.1 — Repeating mobile controls reliability correction

- Fix the native General Manager / dedicated employee picker closing during 1×/8× game updates; apply shared interaction shield to all editable controls instead of one field.
- Keep model/saves progressing and defer DOM replacement until edit completes. Protect partial numeric entries and disclosure state.
- Add real 390px browser tests simulating multiple ticks while GM select is open, focus on unit numeric draft, release after change, plus regression on financial/saving invariants.
- [UI interaction governance and release checklist](docs/UI_INTERACTION_GOVERNANCE.md) is now mandatory for all future features. **Release verified:** [PR #27](https://github.com/BSAVCI1/Boss/pull/27) merged at `08991ca08b9c6baaed4e40580c7dee727257a5cd`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39070464611), [GitHub Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39070464072) and [real Chromium 390/414px save/interaction checks](https://github.com/BSAVCI1/Boss/actions/runs/39070360831) passed. Owner Safari save not accessed.


## Released v21.3 — Dedicated GM capacity and measurable operating strategies (PR #26)

- Dedicated units assign their customer jobs with an active GM and eligible specialist team; shared corporate dispatch and manual assignment respect unique unit ownership. No silent pooled capacity when a unit is vacant or short staffed.
- CEO selects Balanced / Quality / Speed strategy, affecting actual future delivery progression and quality; no historical contract repricing or guaranteed customer demand.
- Track actual newly measured staff-days and billable-days. Unit-level 30-day reviews disclose forward-only revenue, allocated operating cost, contribution and utilization with explicit CEO-defined revenue/utilization/quality objectives.
- Skill-targeted GM recruiting recommendations still require explicit CEO approval and real recurring wages. The Executive Assistant escalates capacity and outcomes; Today surfaces genuine GM approvals and market opportunities.
- Mandatory gates: all existing finance/save, 730-day, offline and 390/414px tests plus v21.3 ownership, migrations and accounting. No v22 properties until production and owner private-save safety are maintained.
- **Release evidence:** [PR #26](https://github.com/BSAVCI1/Boss/pull/26) merged at `05f3aafbd6ea867981c387a2de07b2b5a364830c`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39068721207), [GitHub Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39068720775) and [isolated live smoke](https://agent.tinyfish.ai/runs/68f10a64-a9c1-4e64-ab8c-7229e2345199) passed. No private iPhone Safari save was opened. [Architecture](docs/V21_IMPLEMENTATION.md).

## Released v21.2 — General Manager autonomy with CEO authorization

[PR #25](https://github.com/BSAVCI1/Boss/pull/25) builds on v21.1, leaving historical staff, contracts, purchased lines, financial ledgers and Safari saves intact.

- Each business unit receives an independent coaching cap, per-action cap, 90/180-day validity and measurable quality target. The default delegated spending is zero.
- General Managers can execute a real $4 coaching decision within available cash and authorized budget, no more than once in seven game days. Renewal does not bypass the cooldown.
- Thirty-day scorecards track unit delivery, missed jobs, quality and spending from real attributed history, identifying insufficient evidence.
- Managers suggest new staff only when real unit backlog justifies it. A CEO approval incurs exactly one $20 recruiting cost plus recurring payroll. Declines and duplicate taps do not hire.
- Save protections remain forward-only, including transactional IndexedDB fallback; unit costs remain analytical slices of one corporate ledger.
- **Release verified:** [PR #25](https://github.com/BSAVCI1/Boss/pull/25) merged at `25e09e0febf22227b44dad1c350f374a88302ed1`. [Production regression](https://github.com/BSAVCI1/Boss/actions/runs/39066315475), [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39066315191) and [live smoke](https://agent.tinyfish.ai/runs/bf1a3d19-6c28-4844-848c-2a98b2106c72) succeeded. The 730-day financial suite, default-zero migration, coaching/hiring no-double-charge, 390px extended-store reload and 414px layout passed. The player's personal Safari save has not been inspected.
- v21.3–v21.4 will add broader GM strategy, dedicated capacity allocation, quarterly CEO portfolio meetings and better visual organization. v22 offices, v23 investments/acquisitions, v24 factories remain future work.

## Released increment — v21.1 Independent Operating Units

**Released:** [PR #24](https://github.com/BSAVCI1/Boss/pull/24) merged at `b59a76e7cab474ec553deffaccb9a00089922177`; [production regression](https://github.com/BSAVCI1/Boss/actions/runs/39065136825) and [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39065136237) passed. v21.2 remains a separate engineering release with unit-specific authority and actual GM autonomy.

[PR #24](https://github.com/BSAVCI1/Boss/pull/24) implements the **first** operating-unit increment, not the full v21 autonomy architecture:
- Convert an existing paid portfolio to one internally managed unit without a second launch payment.
- Appoint a distinct General Manager and assign eligible idle staff; employee IDs are preserved, one primary unit owner per employee, no active-contract disruption, no duplicate department span.
- Record new contract revenue, direct cost, shared external worker contribution and dedicated unit payroll from unit activation forward only. These analytical unit totals do **not** generate additional group income or corporate ledger entries.
- On-device `boss20` / IndexedDB persistence remains; any failed conversion or transfer must roll back atomically. No altered historical terms, payroll, purchase receipts or completed jobs.
- The CEO directs unit formation; GM appointments carry a small transparent additional daily salary. A dedicated unit is not a new legal subsidiary or bank account.

**Unfinished, not implied delivered:** v21.2 unit-specific goals, GM proposals and authority limits; v21.3 realistic dedicated delivery capacity, P&L reconciliation, CEO quarterly unit reviews; v21.4 mobile visual group organization and release polish. v22 premises, v23 capital and acquisitions, and v24 factories remain as sequenced below.

**Release gate:** All previously established financial/save/730-day tests plus manager conflict, no-double-charge, duplicate-name, failed-browser-write rollback, 390px mobile and Safari-style extended-storage reload. Do not merge on a failed branch check. Confirm production Pages and isolated live smoke after merge.

## Next development program — CEO-first multi-business game (approved direction, not implemented)

**Player-confirmed state:** The original iPhone company now saves reliably beyond Day 2864 using extended device storage; business lines include Product Development and Marketing Studio. No original Safari bytes are copied into the repository. **Design rule:** all subsequent migrations must keep saved staffing, signed contracts, accounting and purchased service-line evidence unchanged.

### v20.3 — Leadership/UI consistency and legacy-process audit (released 2026-10-17, PR #23)
- Show appointment titles consistently on Today and Team: Department Manager, Director, Sales/Marketing/Product/Operations Manager and Executive Assistant. Show career grade separately; no implicit promotion, pay rise or new IDs.
- Fix cramped dual-column mobile CEO tree at common 390/414px widths; preserve disclosure state through game ticks. Clearly display CEO direct-report span versus entire department.
- Explain the *real scope* of existing controls: one department-wide spending budget; subordinate managers share only coaching authority; director controls hiring/training/department wellbeing; headcount authorization is not a maximum direct-report count. Retain the existing safe spending gates.
- Differentiate operating service portfolios from independent business units; current core + launched-line totals must not imply extra profit. Display a 90-day strategic review as overdue rather than Day 561 / 90.
- Complete UI/browser regression tests and an explicit legacy-functionality audit; economics and boss20/IndexedDB persistence remain unchanged. Released via [PR #23](https://github.com/BSAVCI1/Boss/pull/23) at `a3ad6e8b031c43d3144bff2057f4505870e79aa5`; production [regression](https://github.com/BSAVCI1/Boss/actions/runs/39062977385) and [GitHub Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39062977282) passed.

### v21 — Independent business units, accountable leaders and CEO strategy (next major release)
- **Separate two concepts:** (A) a service offering such as Website Build within an existing unit; (B) a strategic business unit such as Product Development with dedicated ownership, optional headcount and a forward-only operating P&L. An existing paid line is not purchased again when promoted to a unit. The user must decide which line becomes a unit; no automatic duplication.
- Proposed hierarchy: **CEO → Business Unit Director / GM → functional department heads → team managers → individual employees**, with shared-services option. Every real employee has a unique ID, one primary reporting line and at most one primary payroll owner. Shared employees require explicit tracked allocation of employee-days.
- Business unit leaders propose strategic plans, budgets, recruitment, training, service launches and capacity decisions; functional managers execute approved routine decisions under strict tiered delegation. Each approved envelope has actual category cap, per-decision cap, headcount/recurring-payroll ceiling and expiry. Managers cannot spend from an imaginary duplicate pool.
- Show each unit's backlog, revenue, real direct labor, allocated shared expenses, contribution, delivery quality, customer mix and risks. **One contract contributes revenue to the consolidated ledger exactly once**; unit attribution must reconcile without double counting. Legacy delivered work remains core/unattributed unless authenticated evidence exists.
- Unit launch, investment, internal employee transfers, split operations, merger or closure must be reversible where possible and never erase past deal IDs, salaries, receipts or career records.
- CEO/EA gets a true weekly cross-unit briefing with exceptions, choices and outcomes, not daily approvals. Implement a compact interactive unit hierarchy and real milestones, preserving fun/game pacing.
- QA: migration of 2,500+ game-day, 13+ employee saves and multiple purchased lines, 730-day automated unit economics, permission boundaries, offline mobile 390/414px and failed IndexedDB save handling.

### v22 — Offices, premises and company-world visualization
- Begin from an inexpensive founder workspace; choose **home office, coworking, leased office, purchased office, floors in a headquarters building**, with optional branches after actual growth. Choose capacity, location attractiveness, commute/staff morale, coordination/quality benefit, rent, running costs, security/maintenance and vacancy exposure.
- Renting creates bounded recurring operating expense and optional deposits; buying creates an asset and one-time cash outflow or explicit financing debt, not instant operational profit. Depreciation and resale changes are forward-only, visible and reconciled. No retroactive creation of properties.
- Facilities have realistic capacity constraints, not arbitrary wealth multipliers. Upgrades are gated by company stage, staffing needs and available cash.
- Introduce a responsive **visual company campus**: illustrated office floor/rooms, departments, active projects, manager conversations, unit identity and equipment status. Use embedded SVG/CSS/canvas and offline assets, no network-dependent artwork. CEO can collapse or disable the view for speed.

### v23 — Investment, capital allocation, acquisitions and valuation
- Add controlled long-term allocations: research, technology, financial investments, selected startup/business acquisitions and property portfolios with a distinct investment asset ledger; uncertainty and market cycles matter. Holding cash must remain a valid strategic decision.
- Build explainable and non-spendable enterprise/equity valuations using actual earnings, cash, debt, receivables, customer concentration and unit risk. Mark estimates. Do not turn paper gains into cash without realization.
- Acquisitions involve due diligence, price, integration overhead, leadership/employee retention, compatibility, liabilities and post-deal outcomes. Preserve original group history and financial reconciliation.

### v24 — Product companies, factories and industrial operations
- Permit a deliberate shift from services into physical product lines and manufacturing only after adequate capital, specialist leadership and infrastructure.
- Factory proposals specify property/lease, machinery, skilled workers, material sourcing, capacity, production cycle, inventory, defect rates, quality control, energy/maintenance and delivery/sales channels. Model work in process, unsold stock, COGS, financing exposure and possible obsolescence; production is not guaranteed revenue.
- A visual factory and supply-chain panel should reward good operational choices without creating an administrative spreadsheet simulator.

### Cross-version UX direction
- Today: concise company story, current strategy, CEOs' actual direct reports, one important decision and a compact EA summary.
- Businesses: distinguish service portfolios from true strategic units, with optional unit org chart and coherent financial performance.
- Team: titles, unique IDs, meaningful career progression, scoped hiring/coaching authority and collapsible reporting groups.
- Assets/World: visual office, buildings, equipment and later factory; clear effects from choices.
- Preserve one-file offline HTML, low scrolling, safe mobile text entry, meaningful gameplay and voluntary use of advanced financial reports.

### Legacy-functionality findings to retire deliberately (not silent deletions)
- Functional `Team lead` button is not a management appointment; preserve legacy state while labeling organizational positions accurately.
- Subordinate managers currently coach only, while department heads hire/train and run department wellbeing. Independent tiered manager envelopes are future v21 logic.
- CEO strategic direction keeps affecting priorities past its nominal 90-day review date; show overdue review and keep renewal user-controlled.
- Current service line profitability is tagged forward-only but has **no independently owned employees, unit governance or separate cash**; service-line launch should not pretend to create an autonomous subsidiary.
- Executive Assistant retains older office-routine delegation and project coordination rules; v21 should distinguish Chief of Staff reporting from line management without duplicating approvals.
- Late-stage reputation-based contract multipliers and tiny historic transaction prices can overwhelm realism for a company with hundreds of completed projects; model a forward-only optional scale-balance revision separately, never rewrite signed contract fees.
- Incomplete historical invoices, missing purchase receipts, nonexistent staff tenure and past unit costs must never be fabricated to fill an attractive dashboard.


## v20.2 P0 — Full-game Safari save recovery (released 2026-10-17)

**Source:** Owner's original 14-person company repeatedly reloaded to Day 2642. This is whole-game persistence failure, not merely a form-value defect. iPhone's exact storage exception and quota cannot be remotely examined.

**Implementation in [PR #21](https://github.com/BSAVCI1/Boss/pull/21):** Warn prominently with attempted game day, last local durable day and browser failure type; allow export of the current whole company to JSON. Verify localStorage writes; on rejection, switch to transactional on-device IndexedDB and pause until committed. Boot from the highest verified save revision, never replace older save generations. Protect recovery journal, historical agreements, executive decisions and cash reconciliation. Refuse Restart/Resume/Skip while saves remain unverified. This is an incremental offline safety release, not a change to the simulation's core economy.

**Acceptance:** All inherited regressions + 730-day financial reconciliations; near-390px real Chromium testing of injected storage quota and IndexedDB recovery of a later day, including one business-line purchase with exactly one $120 investment. [PR #21](https://github.com/BSAVCI1/Boss/pull/21) merged as `6f227439f0639a960e6ccd2481ad890c9ed27509` following [passing branch QA](https://github.com/BSAVCI1/Boss/actions/runs/39060395542); [production regressions](https://github.com/BSAVCI1/Boss/actions/runs/39060489413) and [Pages deployment](https://github.com/BSAVCI1/Boss/actions/runs/39060489423) passed. The owner must still confirm the actual Safari game advances beyond its Day 2642 checkpoint across refreshes. The old checkpoint's historical purchases cannot be reconstructed without existing accounting evidence. A future version may add in-game JSON import and richer save diagnostics.

## v20.1 follow-up — Editable player settings reliability (released 2026-10-17)

**Scope:** [PR #20](https://github.com/BSAVCI1/Boss/pull/20) follows the already released [PR #19](https://github.com/BSAVCI1/Boss/pull/19). Numeric manager budgets/targets/spending limits persist on valid input without the Safari blur dependency. Assistant authority, experiment setup and reflections, speed, selected future service and pending CEO draft are saved immediately. A valid pending CEO draft is not automatically enacted. The recurring payroll cap accepts 0.01 increments; a global save indicator differentiates a durable localStorage write, invalid unfinished input, quota/storage failure and cross-tab conflict.

**Acceptance evidence:** Existing v20 save/purchase/recovery/730-day economy tests retained; added all departmental policy value reload tests, invalid and failed input checks, and real Chromium 390px input-to-refresh checks. [Production CI](https://github.com/BSAVCI1/Boss/actions/runs/39058299668) and [Pages](https://github.com/BSAVCI1/Boss/actions/runs/39058299044) succeeded. Live endpoint served the updated page. No change to accounting contracts or legacy migration.

**Open validation:** The actual player's Day 2700+ Safari storage, old purchases with missing financial receipts, Safari eviction/private-browsing storage policy and true simultaneous-tab write races cannot be proven from isolated GitHub CI. Never clear Safari data for testing. Future v20.2: optional non-destructive, user-triggered save diagnostics / export-import and per-line durable receipt verification; improve iPhone-specific test coverage.

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


## In development — v22.3 Economic Balancing (not released)

- Preserve existing signed fees, cash, wages, business ownership and property; newly generated future deals use `pricingVersion:23` to smooth reputation price inflation above 600 while grandfathered deals retain legacy rules.
- Clarify operating-unit contribution as before corporate overhead; benchmark pricing multiples, runway and 30/180/730-game-day scenarios; require all finance, migrations, mobile controls and IndexedDB regressions green before any production merge.
- **v22.3A economic proof (draft CI passed, not released):** production-engine 30/180/730 game-day A/B/C/D scenarios × Conservative/Balanced/Growth × three seeds = 108 reconciled checkpoints; baseline [Actions #39125794859 passed](https://github.com/BSAVCI1/Boss/actions/runs/39125794859) with [full numbers and v22.3B cost/affordability proposals](docs/V22_3_ECONOMIC_BALANCING.md). Founder, developing, mature and legacy all have unusually high economics under active deliveries; approximately 92–94% 730-day group margins for mature/developing. Real 390/414px Chromium/IndexedDB, delegated authority and signed-terms regressions run in CI. Issue #40 stays open for forward-only v22.3B calibration, later review and owner Safari acceptance.
- CFO/HR/COO qualification gates and delegated authority from v22.2 remain untouched. Site and labor recalibration must use measured economic impact, not retroactive changes. [v22.3 economic architecture](docs/V22_3_ECONOMIC_BALANCING.md).


## v22.3B prospective economic calibration — current draft checkpoint (2026-10-18)

[Draft PR #39](https://github.com/BSAVCI1/Boss/pull/39) now contains prospective-only external delivery-procurement accrual, vendor settlement and persistent direct-labor attribution, plus the GM-to-group profit bridge and an explanatory signed-contract detail. [Economic design and Safari acceptance](docs/V22_3B_PROSPECTIVE_ECONOMIC_CALIBRATION.md) preserves all historic salaries, signed fees, properties, approvals and save revisions. Baseline/minimal/balanced/high-pressure actual-engine simulations and organic/adverse/capacity tests are added to the required regression pipeline. **Status is PARTIAL until final-head CI and owner Safari acceptance**; salaries for future hires and premises quotes have not been recalibrated without earned-capital and authority-proof evidence. Production v22.2 is unchanged, [issue #40](https://github.com/BSAVCI1/Boss/issues/40) stays open, and parallel v22.4 PR #44 remains untouched. Do not merge or deploy.


### v22.3B verification-closure audit — 18 October 2026 (NOT release accepted)
- [Actions #39129419349](https://github.com/BSAVCI1/Boss/actions/runs/39129419349) at `ff191a943754487501dde9f04628f2b396f3f02c` **FAILED** after its 288-checkpoint four-model calibration and strict procurement integrity passed: the mandatory seven-stage sensitivity runner exposed an exact-vs-rounded historic project labor reconciliation discrepancy; downstream adversity/organic and mobile/IndexedDB gates did not execute. The minimal audit repair preserves unrounded project labor separately from rounded UI data, retaining strict tests and historical agreements. A newer head must pass fresh CI.
- Matched balanced-policy 730-day group-profit means ($ in-game): mature baseline $368,281, minimal $341,791, selected Balanced $266,204, high pressure $218,059. Selected mature margin remains ~66.5% and delivery utilization ~4.3%; current cost model is provisional, not empirically released. Founder selected profit $22,274 and cash $21,909 with $90 true initial cash, but adverse founder survival remains unverified.
- Earned-only founder scenario E recruits fewer than 14 people against the 20-employee HQ eligibility gate, so the synthetic $3.3m mature fixture cannot validate organic HQ affordability. New-hire bands and future premises prices remain deferred to separately evidenced, immutable future-only terms. Owner Safari acceptance not performed; production v22.2, draft PR #39, open issue #40, no merge/deploy. Details: [v22.3B calibration](docs/V22_3B_PROSPECTIVE_ECONOMIC_CALIBRATION.md).

- **v22.3B calibration verifier correction:** Discovered inconsistent Minimal/High-pressure formula variants between the 96-replay comparator and seven-stage sensitivity. Test harness rates now align to the documented canonical 6.5%/3.5% minimal and 48–56%/32–42% high-pressure fees with volume terms; 288 paired actual-engine checkpoints must agree in required CI. The old alternative-model figures are diagnostic only; selected Balanced gameplay formula unchanged. Release stays BLOCKED/PARTIAL until a green final-head run and owner/organic HQ gates.

### v22.3C1 — organic founder-to-HQ qualification proof (18 October 2026, CI pending)
- Reproduced a genuine earned-only founder path using current game actions: starting Day 0 with $90 and 3 staff, growth-policy seed 20261018 reaches Day 730 with 24 employees, 20 corporate staff, 2 staffed GM units, 67 completions, $8,759 cash and cash/reserve eligibility from Day 710. HQ correctly cannot be purchased because the Director career progression is unmet: Senior Manager candidate leadership capability ~55/65. No fake capital, workers, service completions, rankings or authority injected. A new nine-replay three-cost-model, three-seed strict production-engine test is mandatory. If growth beyond 730 is required, document it without bypassing actual criteria or replacing synthetic QA with a claim of owner acceptance. Owner Safari NOT TESTED, v22.3B economics provisional, PR #39 draft, issue #40 open, production v22.2. See docs/V22_3B_PROSPECTIVE_ECONOMIC_CALIBRATION.md.
