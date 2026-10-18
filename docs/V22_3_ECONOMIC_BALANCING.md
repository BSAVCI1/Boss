# Boss v22.3 — Economic balancing and forward-only price normalization

**Status: development candidate — NOT RELEASED.** Branch: `feature/v22-3-economic-balancing`. Do not merge before strict regression and real mobile tests pass; the owner's iPhone Safari save is not available in CI.

## Scope and discovered gap

The v22.2 model uses an unbounded reputation fee factor `1 + reputation/200`; payroll and property costs are smaller, creating increasingly distorted capital affordability and operating-result optics at large game ages. Marketing Studio screenshots showed $670,858 earned over 62 completed contracts, $3,941 allocated payroll and $144 development/recruiting costs, for $666,773 unit contribution (BEFORE corporate overhead). These are not audited group net earnings.

### Prospective policy: new contract quotes only

- New deals created at v22.3 or later carry `pricingVersion:23`.
- For reputation `r <= 600`, multiplier remains `1+r/200`: founder and normal growth economics stay **unchanged**.
- For `r > 600`, multiplier is `4 + 2.2 * ln(1+(r-600)/600)`, continuous at 600, increasing at diminishing rate with no arbitrary hard cap.
- Existing deals without version 23 use the ORIGINAL `1+r/200` calculation for any quote revisions and keep their persisted `agreedFee` unchanged until explicitly revised under legacy rules. No retroactive payment, booked amount, expense, cash, salary or investment change.
- The unit dashboard calls the measured result **unit contribution before corporate overhead** rather than presenting it as consolidated net profit.

### Comparative multiplier benchmark (per identical base deal / all other modifiers held constant)

| Reputation | Old | v22.3 new deal | Change |
| ---: | ---: | ---: | ---: |
| 0 | 1.00 | 1.00 | 0% |
| 300 | 2.50 | 2.50 | 0% |
| 600 | 4.00 | 4.00 | 0% |
| 1,200 | 7.00 | 5.52 | -21% |
| 3,000 | 16.00 | 7.54 | -53% |
| 10,000 | 51.00 | 10.19 | -80% |
| 30,000 | 151.00 | 12.61 | -92% |

These are pricing-factor scenarios, **not** forecasts of actual revenue or profitability. They isolate one source of inflation. 30/180/730-game-day snapshots are covered in quote-policy regression; full 730-day cost/cash simulation remains covered by the existing game pipeline. Since reputation varies by playstyle, day alone cannot determine realized cash.

## Executive authority remains unchanged

HR unlocked at 15 staff plus appointed manager; CFO at 20 completed contracts and two lines or owned property; COO at two staffed GM units and 15 completed contracts. All need competent existing staff and 30-day payroll coverage. Appointment and 90-day permission gates remain independent. CFO veto remains limited to delegated spend. This balance change must not silently appoint, remove or fund executives.

## Safety and release gates

1. All existing + v22.3 tests green in required GitHub Actions pipeline, including 390px/414px browser and IndexedDB migration.
2. New founder game, advanced 180/730 game-day synthetic saves, and day-2864 grandfathered deals retain saved day, cash, signed fees, staff IDs, properties, executive mandates and payroll.
3. Check that only newly generated unsigned proposals use version 23, and no historical project is revalued due solely to loading the update.
4. Review unit contribution vs consolidated overhead disclosure on mobile.
5. Compare startup / mature / advanced affordability after the quote correction. Evaluate future NEW employment, premises and asset price calibration separately, with a measured cost-to-revenue target; do not reprice already signed sites, alter past payroll, confiscate cash or invent overhead.
6. Do not represent v23 investment/acquisition gameplay as included in this release. Proceed to v23 only when unit- and group-level profit/cash runway remain credible.

**Next quantitative pass:** 30/180/730 full replay by company growth strategy, revenue per delivered contract, payroll+rent as % of revenue, cash runway, property affordability and utilization; identify whether a prospective recurring procurement/contract-delivery cost or higher-cost new properties is needed rather than guessing.


## v22.3A measured economic proof — 18 October 2026 (DRAFT, NOT DEPLOYED)

**Actual-engine evidence:** [GitHub Actions #39125794859](https://github.com/BSAVCI1/Boss/actions/runs/39125794859), commit `0c319c76273bbf22589ab43e92a9e310a495a36d`, **PASS**. CI ran the production `index.html` script and genuine `tick()` for 30, 180 and 730 game days. [Download the full 108-observation artifact from that run](https://github.com/BSAVCI1/Boss/actions/runs/39125794859/artifacts/12135798804). Script: `tests/v22-3a-economic-proof.cjs`. The scenario harness is a **test runner**, not a second accounting engine. Later branch commits must separately pass CI before calling their HEAD green.

Reproduce with `node tests/v22-3a-economic-proof.cjs` on the draft branch, or use the GitHub workflow. Reproducible LCG seeds **20261018, 41, 73003**; three seeds × four company stages × three operating assumptions × three horizons = **108 snapshots**. One sample per seed is **not** a statistically representative adverse-tail stress test. The reported mean and min/max cover just these three draws.

- **A — Founder:** actual `fresh()`, three staff, $90 cash, zero reputation, original signed work; CEO explicitly assigns projects and subsequent eligible delivery using real `assign()`. No invented revenue, new employees or financial gifts.
- **B — Developing:** synthetic earned-history Day 180, 14 staff, $4,800 original fixture cash, reputation 430, 32 prior completed jobs, actual gated first/second services, one staffed GM unit and an office lease. Prior history is *fixture setup*, not revenue generated during the 730-day trial.
- **C — Mature:** synthetic Day 4704, 28 staff, $3.3m original fixture cash, reputation 3,200, 280 prior delivered jobs, two legitimately gated staffed GM units, real HR/CFO/COO appointment validations, and the $7,200 owned HQ with $3/day upkeep. The $3.3m is a test input approximating an owner's observation, **not** a recovered Safari save.
- **D — Grandfathered:** synthetic Day 2864, 24 staff, $275k original fixture cash, prior services/owned HQ, actual HR/CFO/COO gates, original unversioned signed contracts and saved property terms. `load()` keeps historical fees and new deals receive `pricingVersion:23`.

Test-only assumptions: **Conservative** = balanced pipeline/target 2, relationships, standard pricing, pay-now; **Balanced** = target 4, balanced market, standard pricing, 7-day terms; **Growth** = target 6, volume world strategy, competitive fees and 14-day terms. These are chosen *scenario controls*, NOT new management-policy presets or delegated authority. The game continues to decide probabilistic tenders, deliveries, payroll and collections. No owner transactions are performed.

### Balanced strategy: three-seed mean, cumulative **from fixture start**, in-game dollars

| Company | Horizon | Earned revenue | Group operating profit | Closing cash | Consolidated payroll | Unit contribution* |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A Founder | 30 | $273 | $140 | $137 | $133 | $0 |
| A Founder | 180 | $3,734 | $3,006 | $2,863 | $728 | $0 |
| A Founder | 730 | $32,213 | $29,624 | $29,259 | $2,589 | $0 |
| B Developing | 30 | $4,913 | $3,909 | $6,131 | $693 | $890 |
| B Developing | 180 | $55,147 | $50,980 | $52,229 | $3,408 | $24,022 |
| B Developing | 730 | $270,645 | $255,134 | $257,733 | $13,101 | $134,610 |
| C Mature | 30 | $10,002 | $8,536 | $3,296,938 | $1,376 | $9,779 |
| C Mature | 180 | $96,125 | $88,055 | $3,375,711 | $7,314 | $94,938 |
| C Mature | 730 | $400,264 | $368,281 | $3,657,651 | $28,929 | $395,572 |
| D Legacy | 30 | $7,561 | $6,164 | $269,104 | $1,307 | $7,322 |
| D Legacy | 180 | $85,880 | $78,566 | $343,853 | $6,558 | $84,679 |
| D Legacy | 730 | $375,228 | $346,476 | $612,294 | $25,698 | $370,520 |

*The **GM-unit contribution excludes corporate overhead and unallocated payroll**. It must NOT be compared to consolidated group profit as if they were the same accounting measure. C's 730-day gap is approximately **$27,290** ($395,572 less $368,281). The group P&L is `revenue - all operating costs`; the investment in an owned HQ is cash capex, not an immediate operating expense.

**Seed variability / decision differences.** With the Balanced strategy, 730-day founder group profit ranges $29,113–$30,132; developing company group profit ranges **$142,709–$406,655**; mature $293,939–$420,226; grandfathered $279,682–$391,721. This wide developing spread means a single simulation is not a reliable balance target. Conservative/growth scenarios and individual checkpoints are in the full artifact. No claim of population confidence intervals.

### Accounting, property and working-capital reconciliation

- The actual production model distinguishes **signed `booked` contract value**, invoice-based **earned `revenue`**, open receivables, **cash collections** and cash-out. Always reconcile `openingCash + bi.totals.cashIn - bi.totals.cashOut = cash` within the game’s currency-rounding tolerance; all 108 checks passed. Signed bookings are NOT earned or collected revenue.
- **Direct delivery labor** is tracked from the *actual completed-project records* captured daily before the production history cap. `bi.totals.laborAllocated` currently remains zero in these scenarios: it cannot be presented as reliable cumulative delivery labor. Project labor is a subset of consolidated payroll and **must not be added to payroll again**. For seed 20261018, balanced 730-day founder tracked $407 direct labor within $2,492 payroll; mature $1,250 direct labor within $28,872 payroll.
- **C, seed 20261018 at 730 days:** earned $452,152, receipts $448,224, open invoices $3,928, group operating costs $31,926, group profit $420,226, closing cash $3,709,722, $0 payroll arrears, $0 property arrears, $0 debt. The GM-unit result $447,469 differs from group profit by $27,243. Cash also reflects original $3.3m fixture capitalization, separately paid service/HQ acquisitions, collections, and ongoing expenses; it is not a synonym for operating profit.
- C's HQ costs **$7,200 acquisition + $3/game-day upkeep** and has **$6,336 book value** after 730 days (noncash depreciation $864). Premises upkeep totals $2,190; it is already in group costs, and acquisition is not double-counted as an expense. At the seeded mature company's $3.3m cash, HQ purchase is **0.22% of starting cash**. Existing signed property terms are never repriced. B's office lease is $3/game-day and thus $2,190 over 730 days before any outstanding arrears.
- Estimated runway uses **closing cash / (current full daily payroll + active site/day)**; it is not actual liquidity net of taxes, invoices, future capex or unrecorded liabilities. Runway can therefore be enormous when early cash was artificially seeded in an advanced fixture. The working-capital measure subtracts unpaid payroll, loan/interest and property arrears from cash plus receivables. Historic synthetic opening cash must not be described as earned during this trial.
- Unit contribution must subtract only *its own unit payroll, shared labor, direct and development costs*; all corporate overhead remains in group P&L, not an extra cash ledger. No employee payroll is charged twice. The balance is **accrual profit**, distinct from all cash movements.
- Balance is governed by **game days and explicit player actions**, not browser wall time: 1×, 3× and 8× produce identical economics for the same 30 ticks. A later rendering/clock benchmark is separate from accounting.
- Existing strict pricing, property, 730-day, delegated budgets, C-suite authority, save revision and historical migration tests passed in [the same job](https://github.com/BSAVCI1/Boss/actions/runs/39125794859). Real Chromium **390px** and **414px** viewport checks passed; 390px tests exercised active multi-digit manager inputs, native selectors, a game tick while editing, IndexedDB fallbacks and day persistence. This is **not** an owner's iPhone Safari verification or a restored private save.

### Assessment and ranked **v22.3B PROPOSALS ONLY** — no balancing code in v22.3A

| Priority / risk | Measured root issue | Prospective policy for evaluation | Expected effect at 30/180/730 days | Save risk and implementation location | Required future regression |
| --- | --- | --- | --- | --- | --- |
| P0 / medium | Excessive service margin: mature Balanced 730d $368k profit on $400k earned (92%); developing $255k on $271k (94%), with very low delivery-role utilization | Test explicit **future-contract delivery/procurement obligations** tied to actual scope and unit work, in addition to payroll; distinguish costs from existing wages. Optionally recalibrate **future** higher-tier offers if price elasticity is insufficient | Minimal founder disruption at day 30; progressively lower margin and slower excess cash compounding at 180/730; trade-off between pricing, workload and growth | `createDeal`, `tick`, `biProjectEnd`, `biMoney`, `economyInvoice`; never change signed old fees, past payroll, invoices or existing balances | Multi-seed 30/180/730 cash+P&L; ensure no double payroll, noncash accrual and collected cash reconcile |
| P0 / medium | Fixed costs do not scale to activity: mature 730d payroll $28.9k vs $400k earned; manager payroll and premises cheap compared with demand | Benchmark **new-hire wage and new corporate-capacity bands** based on employee rank, productivity and site seat count; no retroactive wage increases; evaluate undercapacity and staffing opportunities | Cost pressure increases only after player-approved hires/leases; clearer growth consequences by day 180/730 | `dailySalary` for new employment terms only, `propertyQuote` and `propertyOpen` for future deals; historic employee/site records untouched | Old save wages/site terms frozen, accurate future payroll and affordability by scenario |
| P1 / medium | $7,200 HQ only 0.22% of mature fixture opening cash; property investment creates little opportunity cost | Reprice only **future unowned sites** with transparent upkeep/capacity alternatives and comparable payback; require CEO confirmation | No change to existing buildings at any horizon; future property ROI and choice become consequential after establishment | `PROPERTY_TYPES`, `propertyQuote`, `propertyReadiness`; preserve signed site `price`, `dayCost`, depreciation baseline and ledger | Lease vs buy vs retained owned assets, future scenario payback, historical non-repricing |
| P1 / low | GM contribution can exceed group profit by $27k+ while displayed as a unit result | Expose a read-only, reconciled **unit contribution → unallocated corporate cost → group operating profit** bridge | Immediate readability without financial impact at 30/180/730 | `ceoLineFinish`, BI/group and unit panels; label-only/read-model correction | Sum of unit and unallocated components reconciles to the single group P&L |
| P1 / medium | Reputation taper reduces quotes beyond 600 but profitability is still excessive; quote-side fix alone insufficient | Evaluate new-deal reputation, win chance and demand elasticity **together** before changing the already-proposed curve | Lower high-reputation new revenue only if economically justified; preserving old fees throughout | `reputationPriceFactor`, `estimatedFee`, `worldResolveTender`; signed `agreedFee` immutable | Legacy vs `pricingVersion:23`; buyer loss/win, revenue, cost and margin 30/180/730 |
| P2 / low | Even three initial employees can earn around $29.6k operating profit in 730 days when the CEO keeps assigning work; hiring/executive unlocks still gated by earned conditions | Balance **demand throughput and assignment effort** against earned capacity, without inventing new recruits or automated authority | Founder remains viable at day 30 but capital growth needs ongoing execution at 180/730 | `pipelineDay`, `bestIdle`, `assign`; **no** new CEO preset UI in this batch | Early liquidity, project milestones, saved assignments and late-game viability |

**Candidate balance guardrails (hypotheses, not enforced constants):** measure positive but nontrivial group operating margins over several years and multiple strategies rather than the current 90–95% at scale; require explicit downside scenarios, meaningful payback periods measured in operational cash-generation days, and sufficient (at least 21–30 game-day) reserves before discretionary transactions. First validate a broad **10–35% mature-group operating margin** and **90–360 game-day HQ payback** as experiment ranges with real game observations, not as industry claims, price floors or guaranteed target outcomes. If initial fixtures or actual customer/competitive behavior make these implausible, revise with evidence instead of forcing them.

**Remaining v22.3B gates:** larger seed/adverse samples, affordability from organically grown *unfunded* companies, attribution of direct labor in persistent BI (currently unavailable), invoice ageing beyond latest open invoices, corporate overhead bridge, full issue #40 acceptance and owner Safari non-destructive smoke. Do not infer the owner’s private saved state or declare v22.3 released.
