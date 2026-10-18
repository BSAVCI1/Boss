# v22.3C4 — Integrated Organic Growth and Headquarters Proof

**State:** IN DEVELOPMENT / PARTIAL until latest-head full GitHub Actions succeeds. **Not released.** Production is v22.2, economic PR [#39](https://github.com/BSAVCI1/Boss/pull/39) remains a draft, issue [#40](https://github.com/BSAVCI1/Boss/issues/40) remains open, CEO-experience PR [#44](https://github.com/BSAVCI1/Boss/pull/44) is deliberately untouched.

## Verified starting evidence

- Before C4, the branch head was `2585ec22e0f8aeb180af387b4425edb24b20ffeb`; [exact-head Actions #39149953456](https://github.com/BSAVCI1/Boss/actions/runs/39149953456) passed. Main's source version remains v22.2 at `15a2b3c060c9aed3812769deb8270de11d052c86`.
- C3's independent real-engine founder / corporate-first path: Team Lead Day 140, Manager Day 273, Senior Day 441, Director Day 546; Day 730 was 34 *corporate* employees, 184 deliveries and $76,349.71 cash, **without two GM operating units**.
- C3's separate early-unit path: Team Lead Day 154, Manager Day 357, first GM Day 185; by Day 1460 it had $0 cash, 8 employees, 60 deliveries, approximately $6,732 obligations, no Director and no second GM.
- Neither pre-C4 journey establishes an organically earned, simultaneously two-unit/Director/affordable HQ company. The Director thresholds of 45/55/65/70 and required direct-report bench were not lowered.

## Actual source-rule root-cause map

1. `ladderNext/ladderEvaluation/ladderPromote` require true competency, role tenure, maintained lower-level managers, organization span, payroll reserves and CEO consent. These are genuine, cumulative development requirements.
2. `companyLaunchReadiness` requires prior deliveries, an eligible Team Lead, reputation and liquid payroll runway. A second business also requires prior business deliveries and a GM-led unit with at least one dedicated specialist, plus a longer payroll reserve.
3. `unitGMEligible/unitAppoint/unitTransfer` use real staff eligibility, idle assignment and no open deal assignment. Moving members into units reduces the **corporate** count available for HQ and the leadership pool.
4. `propertyReadiness('hq')` independently checks **20 corporate people**, a **Director**, **two appointed unit GMs**, **50 genuine deliveries** and purchase funds plus 30 days of payroll/property reserves. `propertyOpen` requires the explicit CEO action, charges the current saved quote once and creates an owned asset.
5. `dailySalary`, candidate fees, $12/14-day CEO-approved Study and $120 real service-line launches compete with procurement, credit terms and fixed property upkeep for the same cash. Corporate-first may earn a Director but miss managed units; early-unit investment can shrink revenue-producing corporate staffing and deplete cash.

These are **mechanistic hypotheses for the integrated divergence** until the C4 tests quantify them. No production rule or economic price, salary, threshold or signed term was changed by this batch.

## Integrated actual-engine test

Added [tests/v22-3c4-integrated-growth.cjs](../tests/v22-3c4-integrated-growth.cjs) to the same [mandatory regression workflow](../.github/workflows/boss-regression.yml) as historical finance/save protection, 390px/414px Chromium and IndexedDB/focus/pace checks. The new harness loads the unmodified draft production game `index.html` functions, uses real `fresh()` then `tick()`, and asserts initial **Day 0, 3 employees, $90, 0 completions**. It does not inject staff, competency, deliveries, manager titles or cash.

All strategies are ordinary explicit CEO decision policies, not source-code rule changes:

| Strategy | Hiring review | Real wage reserve before hiring | Service timing | Continued requirement |
| --- | --- | --- | --- | --- |
| Corporate-first | Every 20 days, max 42 staff | 60 days plus $600 | No first launch before Day 540, $10k cash; second $12k | Actual readiness, earned Director, two genuine GM teams |
| Balanced expansion | Every 20 days, max 42 staff | 60 days plus $600 | First from Day 300, $4.5k; second $7.5k | Same actual readiness and budgets |
| Earlier service / GM | Every 25 days, max 27 staff | 80 days plus $600 | First from Day 90, $2k; second $5k | Same actual readiness and budgets |

All three permit approved, cash-paid studio/office/building transitions only when genuine eligibility and post-purchase wage cover are met. These are **decision thresholds**, not game-engine changes; they do not manufacture customer work or demand. The engine retains its actual $120 line launches and real candidate selection. Service-specific demand remains controlled by production behavior.

Deterministic seeds 20261018 and 41: run all three strategies through **Day 730 in both seeds**, extend the principal seed to **Day 1460**, and record 30/180/365/730/1095/1460 days wherever reached. Seed 41's 1095/1460 results will be absent rather than fabricated. Report each row's real group revenue, operating costs/profit, cash paid/received, procurement accrued/payable, payroll, recruiting, training, property cost, receivables, payroll/loan/property/vendor obligations, employees and corporate people, appointed management levels, unit keys/GM/staff, backlog, deliveries, runway, cash-based HQ readiness and eligibility. Work-assignment occupancy is **assigned client-contract personnel ÷ staffed person-days** as an explicitly labeled proxy; it is not total operational utilization.

The harness protects the cash identity `openingCash + cashIn − cashOut = currentCash` to 6.5 cents; checks unique worker IDs, no cash overdraft, paid hires/courses/launches/premises, real CEO promotions, 730/1460-day reconciliation, saved business units, ID and asset persistence. **Only if** the complete actual `propertyReadiness` returns ready does the synthetic test call the actual explicit CEO `propertyOpen('hq')`; then it tests one exact fee debit, one new owned HQ site, persistence after save/reload and refusal of a duplicate property purchase. No HQ transaction takes place in production.

## Proof results and current verification gates

**C4 measured financial scenario outcomes: PENDING latest-head CI and JSON evidence.** Earlier C3 figures above are historical baselines and **must not** be passed off as C4 results. The latest branch CI must be read against its exact SHA and artifact `v22-3c4-integrated-growth`. The runner writes `reports/v22-3c4-integrated-growth.json` and emits `C4_CHECKPOINT` / `C4_FINAL` ledger summaries into Actions logs.

- [ ] All six integrated strategies/seed runs execute and reconcile.
- [ ] Genuine Director plus two staffed operating units measured within the *same* simulation.
- [ ] HQ independently eligible and cash-affordable, or exact missing readiness checks reported.
- [ ] If purchasable, explicit CEO purchase and save/reload/duplicate guard pass.
- [ ] All mandatory historical, 730-day finance, 390/414 Chromium, IndexedDB/focus, and 1×/3×/8× gates pass on exact final head.
- [ ] Compare adverse strategy failures by revenue, payroll, fees, expansion dates, corporate bench and liabilities; record *actual* numerical distributions.
- [ ] Non-destructive owner Safari export/acceptance (not accessible in CI).
- [ ] Cross-branch future-contract pricing compatibility with PR #44 (no change to that PR, no automatic integration).
- [ ] Economic realism and low mature utilization review outside this C4 batch.

If the HQ route remains impossible, classify **PARTIAL** and report quantified blockers rather than waive Director standards, grant liquidity or change purchase eligibility. If any CI gate fails, keep C4 **PARTIAL**. No merge/deploy, no owner Safari writes.

