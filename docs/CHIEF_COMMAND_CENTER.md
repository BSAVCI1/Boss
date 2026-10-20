## v22.5B — Smart Management & People Culture (19 October 2026 · DRAFT, NOT DEPLOYED)
- **Branch:** `feature/v22-5b-smart-management-culture` from main `4521087318cd536221a6eb0995a101dc908bb3b8`. Issues [#42](https://github.com/BSAVCI1/Boss/issues/42) and [#52](https://github.com/BSAVCI1/Boss/issues/52). One draft PR, no production merge/deployment authorized.
- **Playable changes:** Today's Executive Assistant briefing uses actual HR/CFO/COO officers, mandates, 30-day delegated hire/recovery/specialist-sharing history and live financial/project risks; unavailable/expired officers cannot appear as authorized. Authorized HR hiring, CFO 30-day reserve veto and GM/COO staffing mechanisms reuse existing game rules. Recommendations do not grant spending authority.
- **Contextual culture:** real stress/morale/loyalty/skill triggers expose optional CEO-approved dinner ($7/person), outing ($12/person), or professional workshop ($16/person) only when relevant. 12/20-day shared and 25/40/45-day activity-specific cooldowns; a 14-day post-cost payroll/premises reserve; distinct morale/loyalty/stress/skill effects; 1/2/3 workdays of reduced delivery speed; one people-ledger cost, transaction rollback on failed save, no autonomous approval. Existing individual HR/GM and legacy team activities retained.
- **Quality gates:** dedicated actual-script permission, cash/ledger, cooldown, skill/ID, old-save and rollback tests added to both focused and full CI; real 390/414px Chromium culture screenshots uploaded as an Actions artifact; existing historical save/IndexedDB and 730-day financial regression remain mandatory. **CI not yet verified as SUCCESS**; actual private Safari save untested. Keep DRAFT until exact-head checks and owner release decision.

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

# BOSS — CHIEF COMMAND CENTER

## Latest development handoff — v22.4.1 (19 October 2026, DRAFT / CI RUNNING)
- Source baseline revalidated: `main` `ef947b958d93e5e3bd7c97c01d1f5c0ae5c9d77a` (deployed combined v22.3/v22.4), no existing development PR; opened [draft PR #53](https://github.com/BSAVCI1/Boss/pull/53) on dedicated `feature/v22-4-1-ceo-decision-clarity`. [Issue #51](https://github.com/BSAVCI1/Boss/issues/51) is targeted; v22.5 [#52](https://github.com/BSAVCI1/Boss/issues/52) is out of scope.
- Implemented in code: CEO action center owns a single market Take/Pass pair; other offer summaries are read-only. No change to actual `worldEventChoice` ledger, $10 acceptance or $0 pass. Reconcile CEO Today DOM without remounting unchanged disclosures/focus; deduplicate eligible $120 company-launch decision and deep-link into real Growth requirements; Executive Assistant strategy briefing displays real CFO/COO/HR facts only as active-mandate reports, otherwise labeled company data.
- Targeted VM tests and real 21-day Chromium disclosure tests added to existing mandatory full suite. Exact-head [CI #39222124999](https://github.com/BSAVCI1/Boss/actions/runs/39222124999) pending final verification; mobile screenshots not yet verified. Do not mark CI PASSED until success on final SHA; no merge, Pages publish or owner Safari sign-off performed.
- Next planned phase after separate owner authorization: v22.5A CEO Management Policies and Work/Team/Growth simplification. Keep v22.5B/C and broader investment economics separately scoped.

**Owner-approved master development program · 18 October 2026**
**Scope:** Planning, release governance, progress audits and self-contained prompts for independent development chats. This command center does **not** edit gameplay by default.
**Project:** https://github.com/BSAVCI1/Boss
**Notion parent:** https://app.notion.com/p/3fbff3ed9aa581e29a02cba3dfcad323
**Detailed player audit:** [Product experience audit](V22_4_CEO_EXPERIENCE_AND_PRODUCT_AUDIT.md) · [Main roadmap](../ROADMAP.md)

## 1. Single source of truth / verified baseline
- **Production main gameplay:** v22.2 Executive Leadership. At initial checkpoint main commit `c4d6f91accbcf554a0060b19c47108ae637672ab` is a docs-only roadmap update. It is NOT proof that v22.3 or v22.4 shipped.
- **v22.3 economic branch:** [draft PR #39](https://github.com/BSAVCI1/Boss/pull/39), `feature/v22-3-economic-balancing`, head `7ab5e09394c47082abfbe1d4f61bf1f7ff54b16d`. Quote policy safety suite passed; holistic 30/180/730-day affordability / margin evaluation [#40](https://github.com/BSAVCI1/Boss/issues/40) still OPEN.
- **v22.4 CEO Experience branch:** [draft PR #44](https://github.com/BSAVCI1/Boss/pull/44), `feature/v22-4-ceo-experience`, head `5360e65ad953f4ec5d186e2a5c32ce597767f05f`. Batches 1–3 PASS [Actions #39120661653](https://github.com/BSAVCI1/Boss/actions/runs/39120661653). These are NOT in production.
- **Owner's real game save:** advanced mobile company near Day 4704, ~$3.3m cash, 28 staff, 689 delivered, two GM units and staffed HR/CFO/COO in observed screenshots. It is *not directly accessible to CI*. Synthetic save tests do not replace actual Safari acceptance.
- **Version state labels:** NOT STARTED / SPECIFIED / IN DEVELOPMENT / CI PASSED (DRAFT) / INTEGRATION TESTED / DEPLOYED / OWNER VERIFIED / BLOCKED. Never equate CI PASSED with DEPLOYED or OWNER VERIFIED.
- Every work session must READ LIVE GitHub/Notion sources. This checkpoint ages. Respect new merged commits, changed PRs and approved scope in the source.

## 2. Product north star and player experience
**Build the company · Develop leaders · Set direction · Watch the organization evolve · Make meaningful decisions.**
The simulation must naturally progress from hands-on **Founder**, to delegating **Business Leader**, to a **Group CEO** allocating capital and setting strategy. Keep detailed/manual controls for players who enjoy them. The default Today should show: company position, one high-impact recommended decision, exact pending CEO approvals, operational matters being handled autonomously, the next earned chapter, and expandable supporting evidence.
**Design safeguards:** no fabricated revenue/workers/benefits, no default financial authority, no retroactive price/cash/payroll changes, no hidden save migration, no disappearing businesses or day regression, no lost input focus on live ticks, and understandable actual decision consequences.

## 3. Program board — one execution chat per version or bounded batch
| Order | Version / independent chat | Status at checkpoint | Mandatory outcome and user-observable payoff | Source |
| --- | --- | --- | --- | --- |
| 0 | v22.2 Production | DEPLOYED, owner save unverified | Current functional baseline: gated HR/CFO/COO, GM ownership, offices, single ledger | [v22.2](V22_2_EXECUTIVES.md) |
| 1 | **v22.3A Economic Proof** | IN DEVELOPMENT | Compare fresh/mature/Day-4704 synthetic scenarios at 30/180/730 days, reputation quote normalization for NEW deals only, total payroll/rent/property return, true group profit, contracts signed vs cash collected; quantify balance targets | [PR #39](https://github.com/BSAVCI1/Boss/pull/39), [#40](https://github.com/BSAVCI1/Boss/issues/40) |
| 2 | **v22.3B Economic Integration & Release** | NOT STARTED | Correct only evidence-backed prospective pricing/cost imbalances; protect every historic deal and cash; reconcile any overlapping v22.4 price preview; full 730-day, mobile and saving tests; deploy only if fully green and expressly approved | [#40](https://github.com/BSAVCI1/Boss/issues/40) |
| 3 | **v22.4A CEO Experience Batches 1–3** | CI PASSED (DRAFT) | Comparable pipeline fees, filled executive recommendations suppressed, CEO office-priority card, accurate CEO approval vs operations counts, brief decision-first EA weekly summary | [PR #44](https://github.com/BSAVCI1/Boss/pull/44), [Actions](https://github.com/BSAVCI1/Boss/actions/runs/39120661653) |
| 4 | **v22.4B Reporting & Career Clarity** | NOT STARTED | One canonical reporting hierarchy from CEO to exec/EA/GM/department manager/staff. Promotions show eligible milestone vs actual authority/budget/role blocker, suggested exact action | [#41](https://github.com/BSAVCI1/Boss/issues/41) |
| 5 | **v22.4C CEO Screen & Office Decision** | PARTLY DESIGNED | Complete executive-facing Today: strategic office options with costs, capacity, benefit, eligibility, CFO/COO commentary; CEO explicit approval; consolidate strategic decisions and business status in 10-sec overview, with no automatic payment | [#41](https://github.com/BSAVCI1/Boss/issues/41) |
| 6 | **v22.4D UX Simplification & Release** | NOT STARTED | Collapse/archived upgrades, remove repetitive reporting, no-focus-loss budget fields, optional advanced tabs, visible outcomes of CEO decisions, no duplicate alerts, integrated v22.3 versioned quote safety, ship after tests | [#41](https://github.com/BSAVCI1/Boss/issues/41) |
| 7 | **v22.5A CEO Policy Presets** | SPECIFIED | **Conservative / Balanced / Aggressive / Custom** backed by real caps per manager/GM/dept/executive role; compare maximum spend and runway, opt-in apply, no silent changing saved grants, mobile draft input works | [#46](https://github.com/BSAVCI1/Boss/issues/46) |
| 8 | **v22.5B HR / COO / CFO Autopilot** | SPECIFIED | HR succession and bounded promotions/recruiting; COO auto-dispatch + staffing negotiations with reason when blocked; CFO budgets, reserve/forecasts, evidence-backed targets, all inside existing approved authority | [#42](https://github.com/BSAVCI1/Boss/issues/42) |
| 9 | **v22.5C Delegated Governance** | SPECIFIED | Time-bounded *optional* policy renewals, cap/hiring limit, CFO stops, exception routing to Today, audit logs, revoke, explain decisions and show outcomes; no CEO bypass | [#42](https://github.com/BSAVCI1/Boss/issues/42), [#46](https://github.com/BSAVCI1/Boss/issues/46) |
| 10 | **v22.6 Adaptive Management Phases** | SPECIFIED (new explicit version label) | Earned Founder → Business Leader → Group CEO UX switch based on real milestones; change default actions and views, keep manual detail, show what player unlocked and why | [#45](https://github.com/BSAVCI1/Boss/issues/45) |
| 11 | **v23A Product & Customer Identity** | SPECIFIED | Each business has distinct products/services, customer segments, reasons for buying and winning, service outcomes; Marketing Studio campaigns versus Product Development prototypes/technical risk rather than same project reskin | [#47](https://github.com/BSAVCI1/Boss/issues/47) |
| 12 | **v23B Investment Portfolio & Capital** | PLANNED | Genuine investment choices, leased vs owned buildings, ROI, borrowing/runway, portfolio allocation; meaningful ongoing costs, CEO/CFO risk analysis and future-only economics | [#43](https://github.com/BSAVCI1/Boss/issues/43) |
| 13 | **v23C Acquisition & Competitive Strategy** | PLANNED | Competitor valuations, diligence, purchase financing, integration/retention risk, adaptive rivals, post-purchase performance; never create revenue just by clicking buy | [#43](https://github.com/BSAVCI1/Boss/issues/43), [#47](https://github.com/BSAVCI1/Boss/issues/47) |
| 14 | **v24A Visual Campus & Org Tree** | SPECIFIED | Interactive capacity-accurate office, actual staff/GM work and organization tree, owned sites and building changes visible, 390/414px accessible lightweight mode | [#48](https://github.com/BSAVCI1/Boss/issues/48) |
| 15 | **v24B Business Empire & Human Stories** | SPECIFIED | Actual map of subsidiaries, sites and acquisitions, earned employee promotion/mentorship/stress/conflict stories that reflect and affect gameplay, contextual choice outcomes | [#48](https://github.com/BSAVCI1/Boss/issues/48) |
| 16 | **v24C Manufacturing & Supply Chain** | PLANNED | Factories gated by capacity/knowledge/capital, input supply, labor and operational risk, differentiated industry mechanics and validated ROI | [#43](https://github.com/BSAVCI1/Boss/issues/43), [#48](https://github.com/BSAVCI1/Boss/issues/48) |
| 17 | **Final CEO Product Quality Gate** | PLANNED | Cross-version restore/save and economic consistency, consequence explanations, performance/accessibility, hands-on long play from new to late CEO; address endgame retention and eliminate administrative overload | This command center |

**Dependencies**: v22.3 and v22.4 branches are independent and must be integrated with tests before either final combined release; their quote calculations overlap. v22.5 needs trustworthy v22.4 decisions; v22.6 may follow v22.5 or run in a *non-overlapping* branch once merged; v23 capital depends on reliable v22.3 economics, player-ready CEO UX and real delegated work; v24 visuals must be driven from underlying truthful persistent model. Every later chat should check prerequisites before editing.

## 4. Traceability — every finding becomes acceptance work
| Audit / lesson | Work unit | Acceptance |
| --- | --- | --- |
| Mismatched indicative vs actual fee, stale executive appointment advice, overcrowding hidden | v22.4A/C | Truthful fee assumptions; never suggest filled HR/CFO/COO; office options, CFO/COO advisory + CEO authority |
| Alerts ≠ decisions, repeated EA reports, long forms, completed R&D clutter | v22.4A/D | Clear approvals/risks/manager handling, concise weekly report, archived mastered tech, advanced controls optional |
| Reporting hierarchy and career stagnation | v22.4B | One person counted once with explicit manager; show real promotion gate and budget authority |
| Automation and simplification | v22.5B/C | HR/COO/CFO and GMs act within proven capped rights; unusual cases to one CEO inbox |
| Four CEO policy strategies | v22.5A | Conservative, Balanced, Aggressive, Custom preview, approval, persistence, revocation |
| Founder vs manager vs Group CEO | v22.6 | Phase changes *actions shown and decisions owned*, not only descriptive titles |
| Tangible growth / visible investment | v24A/B | Physical site/team/assets reflect actual game state |
| Distinct business identity and strategic challenges | v23A | Different mechanics, contracts, people and sector risks |
| Products, buyers' reasons and advantage over competitors | v23A/C | Buyer need, strategy, outcomes, rival capabilities and attributed tradeoffs visible |
| Human entertainment / employee stories | v24B | Real employee performance, mentoring, promotions and difficult personnel decisions drive stories |
| Passive late-game wealth and missing challenge | v22.3 + v23B/C + final gate | Capital remains meaningful; property/investment and enterprise management have measurable trade-offs |
| Fun visuals without UI/mobile overload | v24A/B + final gate | Mobile-first hierarchy/campus/map; reduce-motion and performance option; visual actions match financial ledger |

## 5. Release & engineering safeguards (MANDATORY)
1. Start each child chat by reading live GitHub main, open PRs, last commits, Actions; fetch Boss Notion command center and linked issues. No stale assumptions.
2. One bounded batch per work chat, normally 1–3 coherent changes. Separate branch/PR (or continue an existing scoped draft PR) with exact commit, changed files, tests and result.
3. Backend financial and permission gates MUST enforce UI rules; no feature is complete when it only draws a label. No phantom management staff, fake customers, orders, investments, acquired properties, or compensation.
4. Old device save MUST survive: game day, company cash, business lines, staff IDs/history, team structure, salary and historical fees, owned premises, licenses, delegated limits, ledger and weekly reports.
5. Node actual-script + 730-day finance + 390px/414px browser + IndexedDB reload tests are mandatory. Test focus/input during live ticking; zero new default authority/spend. If CI failed, say BLOCKED and fix first.
6. GitHub PR green is **CI PASSED (DRAFT)**; it is not production. Merge/release/deploy only with explicit owner approval or the current project governance authorizing release. Verify deployment and explicitly distinguish actual owner Safari testing.
7. Update the task's GitHub Issue/PR, roadmap and Notion Chief Command Center when verifiably completed. Record blockers, open risks, next dependent step.
8. Do not create duplicate issues/PRs or rewrite existing unrelated documents; do targeted updates. When user says stop/pause, do not implement.
9. Never promise asynchronous background work; each child chat either finishes its batch or documents exact partial state and why it stopped.
10. No artwork copied from other simulation games; comparisons are design references, not licensed assets.

## 6. Command center operating loop (no implementation inside this chat by default)
- **START / RESUME:** refresh GitHub and Notion, show concise progress board with exact verified status and the next eligible small batch. If v22.3A isn't complete, normally issue its prompt first, while recognizing in-flight v22.4 drafts.
- **GENERATE PROMPT [version/batch]:** produce one standalone copy-ready implementation prompt with repo/Notion links, precise issue(s), upstream branches, all requirements, tests and evidence needed. Do not start the work here.
- **CHILD CHAT:** player pastes that prompt into a new conversation; child performs the actual implementation, tests and documentation within the bounded scope; produces a final **HANDOFF** using the contract below.
- **RETURN TO CHIEF:** player returns to this command center with the child chat handoff or PR link. Chief independently checks *live* GitHub PR, diff, commit, Actions and Notion updates. Mark milestone complete only if release gate met. Resolve blocker, or generate the next full self-contained prompt.
- **ROADMAP CHANGE:** register newly discovered bugs/fun opportunities with explicit version and acceptance criteria; check dependencies and priority before switching scope. Do not discard previously approved lessons.
- **Once per new main-chat:** use latest authoritative GitHub/Notion command center, rather than referring to invisible history from other chats.

## 7. Copy-and-paste HANDOFF contract for each child chat
```text
BOSS CHILD-CHAT HANDOFF
Batch/version:
GitHub repository:
Branch / PR:
Base branch / latest main SHA checked:
Commit SHA(s) / files changed:
Implemented and player-visible behavior:
Rules enforced in backend:
Tests performed + exact GitHub Actions run URL + conclusion:
Old-save/ledger/staff/authority/mobile checks:
Notion + issue/roadmap links updated:
Open issues / technical debt:
Deployment status (draft, merged, Pages, real Safari owner verified):
Recommended next version / dependency:
Do not claim done for items without direct evidence.
```

## 8. What the Chief reports after every handoff
1. **What actually changed** (up to 5 bullets), including tangible player benefit.
2. **Status**: specified / branch committed / CI pass / deployed / owner-verified.
3. **Evidence**: direct PR, commit, CI, Notion URL.
4. **Open risks / incomplete criteria**.
5. **The next child-chat prompt** ONLY when asked to proceed/generate; never auto-launch implementation in this command-center chat.

## 9. Prompt template principle
Every generated child prompt must say: "Act as Chief Game Developer + QA + UX reviewer for this ONE specific Boss batch. Use the live GitHub repo BSAVCI1/Boss and its Notion Chief Command Center. Do not infer the prior chat. Verify existing feature/branch and related rules first; implement only scoped items. Protect old saves, merge nothing unapproved, run strict Actions and document the exact outcome. Return the standardized BOSS CHILD-CHAT HANDOFF."
