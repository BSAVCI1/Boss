# Boss v22.3B — Prospective Economic Calibration

**Branch:** `feature/v22-3-economic-balancing` · **PR:** [#39](https://github.com/BSAVCI1/Boss/pull/39) · **Issue:** [#40](https://github.com/BSAVCI1/Boss/issues/40).  
**Governance:** DRAFT / PARTIAL until a final-head full CI pass and the CEO's non-destructive Safari acceptance. The v22.2 production build is unchanged. Never confuse a passing CI test with a deployment.

## Economic problem and baseline

[v22.3A actual-engine economic proof](V22_3A_ECONOMIC_PROOF.md) measured 108 checkpoints with four staged companies, three strategies, three seeds, and 30/180/730 days. Balanced 730-day means:

| Stage | Earned revenue | Operating profit | Profit margin | Payroll |
| --- | ---: | ---: | ---: | ---: |
| Founder | $32,213 | $29,624 | 92.0% | $2,589 |
| Developing | $270,645 | $255,134 | 94.3% | $13,101 |
| Mature | $400,264 | $368,281 | 92.0% | $28,929 |
| Grandfathered | $375,228 | $346,476 | 92.3% | $25,698 |

The mature fixture's $3.3 million initial capital was synthetic, **not** organically generated or the owner's accessible Safari game. The old $7,200 HQ purchase therefore cannot be assessed by dividing by that seeded cash alone. Its $3/day upkeep is already in operating expenses and its acquisition is capex. All historical wages/property prices remain binding.

## Financial transaction map: authoritative production engine

| Activity | State/recognition | Cash treatment |
| --- | --- | --- |
| New signed work | `createDeal`, `biBook`, `bookVal`; **bookings**, not revenue | No cash received at signing |
| Client delivery | `biProjectEnd` calls `economyInvoice`; booked fee becomes earned invoice and `bi.totals.revenue` | Collected on 0/7/14/30-day terms through `economyCollect`, not again as new revenue |
| Employee payroll | `dailySalary` and one `biMoney("payroll",...)` per game day | Deduct available cash; excess `bi.unpaidPayroll` remains an obligation |
| Existing project expenses | Real `d.directCost` from optional review/other quality activities | Already expensed/paid when triggered; never repost them |
| New third-party delivery procurement | Frozen `economicVersion=1`, `externalProcurementQuote` on newly created deals; accrue nonpayroll obligation **once** at project close | Pay from available cash after payroll in `contractProcurementSettle`; any shortage stays as `economy.procurementPayable` |
| Owned property | Acquisition via `propertyOpen` and investment/capex | Cash at purchase, periodic noncash depreciation, upkeep as daily operating cost |
| Rented property | Upfront setup and subsequent daily rent | Payment or explicitly accrued property arrears |
| Business-unit result | Unit revenue less unit payroll, attributed shared labor, external costs and development | Reporting attribution only; never a second cash ledger |

**Recognition policy:** external third-party service licences or outsourced specialist inputs represent resources needed to fulfil the contract, not salaries. Fixed agreed price and vendor quote are saved per new contract. A successful delivery recognizes its frozen quote; failed work recognizes only 25% of quote scaled by actual completion. Failure/cancellation should not add future vendor costs for untouched work. `procurementPosted` and `biCompleted` guard duplicate recognition, invoice creation and booking settlement. Payments subsequently reduce payable and cash only; never the operating P&L again.

**Legacy safety:** contracts without the new `economicVersion` have no new vendor promise and do not incur procurement expense at load or completion. The previously signed `agreedFee`, `pricingVersion`, existing `directCost`, employee salary terms, site `price`/`dayCost`/`book`, IDs, reporting, approvals, save revision, and historical ledger are not repriced. `procurementPayable=0` is initialized only as a missing field, not as an invented debt. A separate legacy quote pricing version remains honored.

**Cash identity:** `openingCash + bi.totals.cashIn - bi.totals.cashOut = cash` at all checkpoints within engine rounding tolerance. Do not force additional per-payment two-decimal rounding on an existing fractional daily-payroll cash balance; that caused a measurable 730-day drift on an early draft and was corrected. Working capital deducts open vendor payables, salary arrears, property arrears and debt/interest from cash plus receivables.

**P&L bridge:**

```
GM operating unit contribution
+ earned revenue outside GM units
- unallocated corporate expenses
= consolidated group operating profit
```

Corporate overhead includes genuine unallocated employee payroll and property/other costs; do not call GM contribution “net profit.” The read-only business-unit panel uses the same stored production totals. `bi.totals.laborAllocated` and `directAllocated` now persist per completed project. Allocated direct labor is already within the group payroll posting.

## Three prospective models compared with the frozen baseline

Every model is computed by executing the **production `index.html`/real `tick()`** with a test-only variation of the new-contract vendor rate. Same stages, operating controls, clock horizons and reproducible seeds (20261018, 41, 73003) are used for paired comparisons.

| Case | Future service-line vendor fee component | Future standard contract fee component | Volume/complexity | Use decision |
| --- | --- | --- | --- | --- |
| Baseline | 0% | 0% | none | v22.3A comparable reference; too little activity-related procurement |
| Model 1 — Minimal | 6.5% | 3.5% | work × difficulty × 0.2 | Safest cost level, limited pressure on accumulated mature profits |
| Model 2 — Balanced (current code) | 20–24% | 10–18% | work × difficulty × 1.1 (units) or 0.65 (standard) | Candidate to balance actual delivery procurement while preserving founder viability |
| Model 3 — Higher pressure | 48–56% | 32–42% | work × difficulty × 2.0 (units) or 1.4 (standard) | Stress-test for cash and downside fragility; **not** the default |

The rate and external units are modeling hypotheses representing outside fulfilment inputs, not inferred historical supplier invoices or market-validated real-world percentages. Higher contractual fee bands carry higher external vendor exposure, so gross contract contribution changes without double-charging employees. Candidate margin of 10–35% and HQ payback of 90–360 days remain **research hypotheses**, not acceptance quotas. Model 2 may remain provisional if broad scenarios contradict founder solvency or healthy growth.

## Required actual-engine evidence and regression

- Existing canonical runner: `node tests/v22-3a-economic-proof.cjs` (108 historical **no-procurement** checkpoints, preserved separately).
- Current four-model runner: `node tests/v22-3b-economic-calibration.cjs` (96 matched actual-engine replays, 288 checkpoint observations).
- Contract and ledger invariants: `node tests/v22-3b-integrity.cjs`.
- Additional adverse, organic and capacity scenarios: `BOSS_ECONOMIC_MODEL=baseline|minimal|balanced|pressure node tests/v22-3b-sensitivity.cjs` (each model: 7 fixtures × 3 player assumptions × 3 seeds × 3 checkpoints = 189 observations). Compare real outputs with `node tests/v22-3b-compare.cjs`.
- All executable suites are wired into [required GitHub Actions](../.github/workflows/boss-regression.yml), followed by actual mobile Chromium tests at 390px and 414px, save reload and IndexedDB fallback. Artifacts are uploaded independently; any failed or unexecuted gate keeps the batch PARTIAL.
- Company conditions A/B/C/D are as in v22.3A. E is fresh founder with **only earned** cash for player-authorized candidate recruiting and first studio; F is deliberately low-demand developing company; G is capacity-constrained developing firm. Other variance axes use conservative/balanced/growth demand/prospecting/payment terms, original mature vs small-team utilization, and owned HQ vs rented office. All seeds are synthetic tests, not owner gameplay.
- Results must contain **mean, median, minimum and maximum** rather than only mean; in-game figures must not be confused with real currency, saved personal holdings or real accounting statements.

### Measured before-and-after results / decision

**Verification checkpoint, 18 October 2026 — PARTIAL, not an accepted release.** At [failed run #39129419349](https://github.com/BSAVCI1/Boss/actions/runs/39129419349), actual-engine 96-replay/288-checkpoint four-model calibration ran to completion, and prospective contract/integrity tests passed, but the subsequent seven-fixture sensitivity failed its strict stored-labor reconciliation. Completed project history deliberately rounded labor for UI while cumulative production labor retained its fractional precision. This verification batch adds the *unrounded* project-history audit field without changing payroll, profit, contracts, cash or save migration; the test continues requiring exact reconciliation rather than relaxing the assertion. The new code/documentation HEAD requires a fresh mandatory CI pass. Adverse/organic/low-demand/capacity datasets and Chromium/IndexedDB from the failed run cannot be counted as passed.

**Observed balanced-policy 730-day group operating profit, mean of three seeds (in-game $), from successfully executed calibration sub-suite at #39129419349:**

| Stage | Baseline | Minimal cost | Balanced cost | Higher pressure |
| --- | ---: | ---: | ---: | ---: |
| Founder A, starting $90 | $29,624 | $26,808 | **$22,274** | $13,644 |
| Developing B, synthetic $4,800 start | $255,134 | $236,008 | **$181,730** | $146,621 |
| Mature C, synthetic $3.3m start | $368,281 | $341,791 | **$266,204** | $218,059 |
| Grandfathered D, synthetic $275k start | $346,476 | $321,719 | **$250,971** | $206,074 |

At C +730, selected Balanced: mean revenue $400,264 (median $422,946, range $325,695–$452,152), mean group profit $266,204 (median $283,321, range $209,815–$305,477), mean procurement expense $102,077 (median $107,358, range $84,124–$114,749), mean closing cash $3,555,574 (median $3,572,828, range $3,498,921–$3,594,973, **including $3.3m synthetic opening capital**), payroll $28,929, property recurring $2,190, utilization 4.27%. Mean operating margin is approximately **66.5%** (baseline 92.0%, minimal 85.4%, pressure 54.5%). Revenue and utilization change little between variants; profit reduction is overwhelmingly an assumed external-procurement cost, **not** proved improvement in customer demand/capacity realism. For A +730, selected group profit $22,274 (median $22,340, range $21,830–$22,651), cash $21,909 (median $21,754, range $21,232–$22,741), procurement $7,350 and payroll $2,589. These observations support founder viability under the tested active-CEO policy only, not survival under all adverse conditions.

**Model decision: Balanced remains a provisional candidate, NOT RELEASE-ACCEPTED.** Its direction is economically measurable and it preserves the observed active founder, but ~66.5% synthetic mature margin, ~4.3% delivery-role utilization, non-market-validated vendor price assumptions and missing adverse/organic distributions are insufficient for unconditional acceptance. Do not replace it with the high-pressure formula merely to hit an arbitrary profit target. Do not claim that changing procurement prices alone resolves mature-capacity realism.

**Organic HQ gap:** fixture E begins as a real new founder with $90 and permits player-approved recruitment only while headcount is below 14, whereas HQ eligibility requires at least 20 corporate employees plus a director, two managed units and 50 deliveries. Consequently E cannot demonstrate a genuinely earned and HQ-eligible acquisition even if its cash exceeds the HQ's $7,200 price plus reserves. Assess cash-only threshold separately from milestone readiness; complete a fully organic eligibility/payback replay before property repricing is treated as approved.

**Deferred employee/property conclusion:** Full senior-pay/new-hire redesign is not required to verify procurement recognition; mature baseline 730-day payroll $28,929 versus revenue $400,264 gives a clear underspending signal, but salary changes require immutable per-hire terms and explicit HR/GM/CEO budget authority. Future HQ pricing is not supported by synthetic C's $3.3m opening balance; current HQ quote $7,200 and $3/day upkeep should stay unchanged for existing sites. Defer both future-only repricing proposals until organic cost/payback evidence and authority-safe versioned terms exist. This deferral is safe for historical integrity; v22.3 release still needs satisfactory economic realism evidence and owner acceptance. **The 30/180-day v22.3B distributions remain an open reporting gate until final-head evidence is complete.**

#### Verification evidence-rate alignment (18 October 2026)

Independent verification identified that the shorter 96-replay diagnostic runner had distinct **Minimal** and **Higher-pressure** quote coefficients from the documented seven-stage model. That made their previously published 730-day comparative numbers unsuitable as canonical figures, even though the selected **Balanced** and baseline calculations matched. This verification correction changes **only the test harness**, aligning both sets of prospective vendor rates and volume terms exactly and adding **288 paired A–D/30–180–730 agreement assertions** between the two actual-engine runners. Prior Minimal/Higher-pressure figures from Actions #39129419349/#39131413050 are historical *diagnostic runner outputs* and must be replaced with a **passing final-head canonical comparison** before economic acceptance. The production procurement formula, signed fees, payroll, real cash flow, property terms and game save logic are unchanged. A new Actions pass is mandatory.

## Scope deliberately deferred

- **New-hire economics:** candidate creation, promotion and `dailySalary` were inspected. Changing the global salary calculator would retroactively alter existing staff terms, so no pay-band code changes were made in this scoped pass. Future salary locks require per-person immutable employment terms and recruitment/GM/HR/budget gate validation. Report new-hire affordability in each scenario without pretending the current test harness autonomously staffed a player save.
- **Future premises bands:** the property catalog's studio $75, office $220, building $1,800, HQ $7,200; all locations/capacity/upkeep/depreciation rules were inspected. Old signed site terms must not change. Do not apply blanket repricing before earned-capital and lease-versus-buy payback evidence is sufficient; no future quote adjustment was made.
- **Organic headquarters:** a genuinely fresh founder cannot be assumed HQ-eligible without 20 corporate staff, director appointment, two GM units and 50 deliveries; quote affordability must be separated from milestone eligibility. The synthetic $3.3m fixture does not establish organic HQ payback.
- **Current-market elasticity:** price and demand tests vary existing scenarios; comprehensive reputation extremes, payment delinquency shocks and multi-seed downside tails remain v22.3 release gates.
- **Owner Safari:** no owner game export or private database was opened. Do not migrate or overwrite any existing Safari save. Do not merge or deploy without explicit authorization.

## Non-destructive owner Safari acceptance checklist

1. Back up/export the existing game and independently verify that the backup can be read. Note active Day, cash, revision and current URL before testing. Never overwrite the production storage key as a shortcut.
2. Record staff count and IDs, saved salaries, GM business units, open contracts/agreed fees/payment terms, manager/CEO authority, rented and owned property terms/values and pending obligations.
3. Use an isolated preview/test browser profile for draft changes; **do not** load the owner’s only live save into unapproved code. If intentionally testing a **copy** of the save, retain the original separately.
4. Confirm old signed contracts and salaries retain identical terms and don't acquire procurement charges. Only new signed work displays and accrues the external vendor quote when it closes.
5. Validate one and several game-day advances at 1×/3×/8×; verify bank balance plus receivables less liabilities, save revisions, all business units, people and current Day persist through refresh/IndexedDB fallback.
6. At 390px and 414px, type a multi-digit CEO/GM budget without losing focus; verify dropdown and unfinished numeric input stability. Confirm only real CEO-approval actions can authorize new spending.
7. Review economic effects on a **copy** of the advanced company and roll back to the preserved original if any unexplained difference appears. Owner acceptance must be explicitly reported to Chief; CI cannot assert it.

## Release and governance

Production remains v22.2; PR #39 remains DRAFT, issue #40 remains OPEN. The parallel v22.4 PR #44 is not edited. Even green synthetic CI cannot close the owner's Safari acceptance gate or authorize deployment. No v22.5 player policy presets, v23 investments or v24 visualization were introduced.
