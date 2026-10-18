# v22.3C3 — Organic Leadership Competency Progression

**State:** IN DEVELOPMENT / draft. This is not evidence that HQ was earned. No merge or deployment authorized. Owner Safari save not accessed.

## Root-cause audit (live draft economic branch, 18 October 2026)

- **Persistence:** each employee's `management.planning`, `delegation`, `coaching`, `communication` survive saves. The managerCompetence score is the arithmetic mean of those four fields. `ensureManagement` derives an initial value from existing career XP/professional skills only when no management record exists; subsequent XP does not improve an initialized leadership score. Historical rank/competencies are unchanged.
- **Promotion:** hard ladder thresholds remain Team Lead 45 after 14 role days and 5 people; Manager 55 after 45 Lead days and 3 extant Team Leads; Senior Manager 65 after 75 Manager days and 5 extant Team Leads; Director 70 after 105 Senior days and 3 extant Managers. Promotions require an existing eligible candidate, no active assigned client contract, leadership progression status, 14 days of payroll cash, and CEO consent or an expressly authorized extra daily leadership payroll ceiling. Each higher promotion replaces rather than clones the prior appointment.
- **Demonstrated gap:** the previous organic 730-day run reached HQ cash readiness at Day ~710 with two staffed units and 67 real completed projects but its senior candidate remained around leadership 55, below 65. After initialization, ladder managers without department-head/GM roles had almost no continuing mechanism to develop planning, delegation or communication from their direct reporting lines. Existing coaching was mainly department-specific, GM-specific, or successor coaching for Team Leads; work XP did not increment initialized management skills. Reaching Director was not demonstrated. This was a missing competency-development mechanism, not evidence that threshold 65/70 was incorrect.
- **Separate constraints:** HQ requires twenty *corporate* employees, an appointed Director, two real managed operating units, 50 delivered projects, available purchase cash/reserves and an explicit CEO purchase. The current team-headcount test does not make 20 workers sufficient to form all tiers of the ladder. Cash alone does not make HQ eligible.

## Second demonstrated progression blocker and independent replay

Directly executing the full in-repo actual game with deterministic seed 20261018 exposed a separate circular **promotion selection** problem: selecting the highest rank currently marked ready converted Team Leads into additional Managers, reducing the number of *remaining* Team Leads below the five required for Senior Manager. The evaluation also chose the highest-scoring employee even if an alternative met the actual experience and capability tests. This was **not** a reason to weaken thresholds.

The C3 source now considers qualified alternative candidates, retains a bench of five genuine Team Leads for Senior advancement, and develops enough real Managers for the Director prerequisite rather than consuming the lower ranks indiscriminately. No candidate is granted skills, experience, a position or extra authority to satisfy this ordering rule.

**Independent actual-engine organic evidence after correction (not final CI):** Day-0 founder, three employees, $90, deterministic seed 20261018, paid CEO hiring/promotions/training and actual company service/GM mechanics, through 1,460 real `tick()` days, with no free staff/capital:
- First Team Lead: Day 154; first Manager: Day 357; first service launch: Day 181. In that replay the second service launch, Senior, Director and HQ purchase **did not occur**.
- Day 730: $858.99 cash, 16 corporate workers, 49 deliveries, 4 Team Leads, 1 Manager, 0 Seniors, 0 Directors; strongest leader capability 79.5. This demonstrates competency can grow past 70 but does **not** establish promotion eligibility or HQ. HQ still needed 20 corporate workers, a Director, two managed business units, 50 deliveries and cash/reserve.
- Day 1460: $0 cash, one corporate worker, 55 deliveries, 0 Team Leads, 1 Manager, 0 Seniors, 0 Directors; score of remaining Manager reached 100 but cash and staffing had failed. C3 therefore remains **PARTIAL**, and the chosen organic economic/recruitment scenario cannot be presented as an end-to-end founder-to-HQ success.
- Six course starts and two completed-course records were observed; training did not grant automatic titles.

**Unproven:** a *combined* two-GM, organically earned Director corporate structure with sufficient cash/HQ eligibility and an actual CEO-authorized HQ purchase in one replay. This is an intertwined financial/demand and organizational-growth blocker, not a justification for free staff/cash or threshold reductions. Full latest-head Actions, owner Safari and property payback remain pending.

## Verified actual-engine leadership ladder — additional corporate-first scenario

The mandatory `tests/v22-3c3-organic-leadership.cjs` now includes **two independent deterministic Day-0 founder strategies**. Both start with **3 existing employees and $90**, using actual paid CEO candidate hiring, legitimate staff work, cash reserve gates, actual promotion eligibility and bounded paid training. No synthetic capital, employees, project deliveries, competencies or leadership titles are injected. Before final CI, the complete test passed an independently executed V8 harness with the repository’s real `tick()`, save and CEO actions.

**Corporate-first / Balanced procurement, seed 20261018** (real engine, no operating-unit purchase yet):
- First Team Lead **Day 140**, Manager **Day 273**, Senior Manager **Day 441**, Director **Day 546** — an actual proof that the established competence thresholds and rank transitions can be earned.
- Day 730: **34 corporate employees**, **184 real completed projects**, **$76,349.71 cash**, with one approved Director rather than unlimited promotions.
- HQ eligibility is *correctly blocked solely by the two genuine managed-unit requirement*. Cash and staffing readiness are **not** proof of ownership. This is not the required integrated HQ path.
- Managers and Seniors autonomously focus on real subordinate reporting duties rather than unrelated individual work when reporting lines exist; mentorship targets named direct reports. A real organizational Director need is enforced: one Director allowed up to 39 corporate staff, a second at 40, etc., without altering existing appointees or competence thresholds.

**HQ-oriented / Balanced procurement, seed 20261018** (real launches/GM operations and training):
- First Team Lead Day 154, Manager Day 357, first service launch Day 181 and first GM Day 185, but Senior/Director and second managed unit were not obtained.
- Day 1460: **$0 cash**, 8 employees, 60 deliveries, ~**$6,732 liabilities**, 0 Seniors/Directors and 0 HQ; the financial and operational combination was not viable under that CEO growth policy.
- This proves a **distinct unsolved integration gap**: organic Director readiness *exists* separately, but sustained two-unit organization with the requisite Director and liquid reserves is **not demonstrated**. Do not grant free capital or retroactive economic changes to hide it.

**Verification status:** the independent V8 check is not equivalent to the mandatory latest-head GitHub Actions or real mobile/IndexedDB/owner Safari. Full release acceptance and owner Safari are still outstanding.

## Implementation: genuine work, mentoring and study

1. On actual simulation ticks, an existing ladder appointee doing productive supervisory work gains at most +0.075 planning and +0.075 delegation *for that day* if at least one **real direct report** is actively doing productive client/operational/development work. Each qualifying day is counted in `career.leadershipPractice.supervisedDays` and relevant actual management practice. Idle, resting, recovering, non-ladder staff, absent/departed reports and leader Study days do not earn these daily gains. Explicit coaching/teaching adds at most +0.045 coaching and +0.045 communication on days with a productive direct report.
2. Existing 14-day successor mentoring expands from Team Leads to real Managers/Senior Managers/Directors. It requires a current leader with a real direct reporting relationship who is active and not recovering/studying; credits +0.45 coaching/+0.40 communication to the leader and +0.25 coaching/one mentoring-practice credit to the named direct-report trainee. Records the real event; no fictional people, money or promotions.
3. A leadership appointee can take **one CEO-approved course per actual ladder rank**: $12 upfront from existing available money plus 14 days of future payroll cash coverage, 14 *performed* Study days, and on completion +1.25 to each of the four bounded 0–100 management competencies. Paid once via the existing development ledger. Incomplete/paused Study earns no completion bonus and a second course at the same rank is refused. Autonomous task cycling cannot silently overwrite an active course. No course grants tenure, promotions, salary or additional delegated authority. Existing GM/department budgets and normal spending limits remain unchanged.
4. The current **Team → Leadership journey → Earned leadership development** panel shows actual leadership competency, next threshold, supervised days, successor sessions, paid course progress and permitted CEO action. No new CEO Today redesign.

All tracking is additive per employee; no invented backfilled practice, no migration reset or historic ledger edits. Unchanged existing career titles and leaders remain entitled to their historical rank.

## Verification and remaining gates

- New actual-engine `tests/v22-3c3-organic-leadership.cjs` repeats the Day-0 $90 founder with paid hires, cash/runway guards, real promotion and launches, 1,460 actual game ticks, CFO-independent cash-ledger identity, save/reload, unique IDs, CEO-paid course and actual Studies. Uses seed 20261018, Balanced procurement, checks 30/180/730/1460. Results are written to `reports/v22-3c3-organic-leadership.json` and uploaded by mandatory CI. It does **not** inject qualified Directors, fake employees, free cash, promotions or deliveries.
- Existing economic proof, four-model finance, past-save compatibility, 390px/414px mobile Chromium, IndexedDB, input focus and pace consistency stay in the mandatory workflow; these MUST pass on the final new head.
- **At time of writing:** JavaScript syntax checked; exact-head CI result and all organic Senior/Director/HQ outcomes **PENDING**. The new test records outcomes instead of asserting artificial endgame success. Any failed proof means PARTIAL/BLOCKED, not completion.
- Remaining scope outside C3: v22.3 mature demand/utilization and profitability, unchanged legacy salary bands and property prices, owner Safari acceptance, cross-branch PR #44 compatibility, and separate Chief approval before release.

Relevant references: [PR #39](https://github.com/BSAVCI1/Boss/pull/39), [issue #40](https://github.com/BSAVCI1/Boss/issues/40), [C1 replay](V22_3B_PROSPECTIVE_ECONOMIC_CALIBRATION.md), [Chief](CHIEF_COMMAND_CENTER.md).
