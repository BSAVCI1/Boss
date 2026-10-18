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

**PENDING final verified same-head Actions output:** copy measured 30/180/730 summaries and proof links into this section only after CI has produced reconciled artifacts. Initial work and code commits alone do not constitute a passing result. Preserve the prior exact v22.3A figures in their original report. Model choice is provisional **Balanced**, not approved for release until comparisons and founder viability are proven.

### Scope deliberately deferred

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
