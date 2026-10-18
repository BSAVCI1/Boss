# v22.3A Economic Proof — 18 October 2026

**Batch:** CI PASSED (DRAFT), economic proof completed for the synthetic test coverage, NOT MERGED OR DEPLOYED. See [PR #39](https://github.com/BSAVCI1/Boss/pull/39), [issue #40](https://github.com/BSAVCI1/Boss/issues/40), [CI pass #39125794859](https://github.com/BSAVCI1/Boss/actions/runs/39125794859) and [108-point JSON report](https://github.com/BSAVCI1/Boss/actions/runs/39125794859/artifacts). Final documentation HEAD still requires successful CI readback.

## Reproducible methodology

From repository root, execute: node tests/v22-3a-economic-proof.cjs. The required CI workflow also runs all existing test suites and the real Chromium browser tests; its uploaded v22-3a-economic-proof artifact contains full results.

The runner evaluates the **actual production index.html JavaScript**, using fresh(), createDeal(), tick(), real assign(), business/GM/executive/property eligibility and transactions, save() and load(). Node supplies a presentation DOM and isolated localStorage; it does NOT substitute illustrative financial arithmetic. Separately, existing Chromium tests exercise real mobile storage, focus, refresh and IndexedDB behavior.

- **Reproducibility:** seeded LCG random generator with seeds 20261018, 41 and 73003. Four company conditions × three policies × three seeds × three horizons (30/180/730 game days) = **108 reconciled financial observations**. Each cell averages n=3; ranges represent small-sample variation, not population confidence limits.
- **A, Founder:** actual fresh Day 0, three employees, $90 initial cash, reputation 0, two signed initial deals. Initial and subsequent appropriate CEO work assignments use the actual in-game action.
- **B, Developing:** **synthetic opening snapshot** Day 180, 14 employees, $4,800 starting cash, reputation 430, 32 pre-completed projects, pre-earned careers, two paid portfolios, one staffed GM unit, corporate office lease. Eligibility for launches/appointments/property is evaluated by real code. The synthetic past is an explicit input, not proof that history was played in this run.
- **C, Mature diversified:** **synthetic opening snapshot** Day 4704, 28 staff, $3.3m cash, reputation 3200, 280 pre-completed projects, two GM operating units, eligible appointed HR/CFO/COO executives with mandates disabled, an owned HQ, salary and capital obligations. This is **not** the owner's private Safari file.
- **D, Grandfathered:** **synthetic v22.2-shaped historical position** Day 2864, 24 staff, $275k cash, reputation 2600, legacy contracts without pricingVersion, original locked fees/30-day collection, paid service lines and historic owned property terms. Future contracts carry version 23; the older agreements are kept unchanged after save/reload.
- **Conservative scenario:** existing balanced pipeline target 2, relationship world strategy, standard fee and immediate cash terms; founder/developing CEO reviews unassigned work every 14 game days.
- **Balanced scenario:** pipeline target 4, balanced world strategy, standard prices and seven-day terms; CEO review every 7 game days.
- **Growth-oriented scenario:** existing growth prospecting with target 6, volume strategy, competitive fees, 14-day customer terms; CEO review every 3 game days.
- These are experimental operating actions within **existing** game controls. They are not new Conservative/Balanced/Aggressive/Custom player policy UI; that belongs to v22.5. No synthetic cash or staff is inserted after each fixture's opening.

## 30 / 180 / 730-day balanced finance — mean of 3 seeds

All amounts in in-game dollars accrued since fixture start. **Group result = earned invoices − model operating costs** (including noncash depreciation, excluding capital purchases); GM contribution is **before corporate costs** and cannot be added again to group result. Rounding to whole dollars.

| Fixture | Days | Earned revenue | Group costs | Group result | Closing cash | Unit contribution |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| A Founder | 30 | $273 | $133 | $140 | $137 | $0 |
| A Founder | 180 | $3,734 | $728 | $3,006 | $2,863 | $0 |
| A Founder | 730 | $32,213 | $2,589 | $29,624 | $29,259 | $0 |
| B Developing | 30 | $4,913 | $1,003 | $3,909 | $6,131 | $890 |
| B Developing | 180 | $55,147 | $4,168 | $50,980 | $52,229 | $24,022 |
| B Developing | 730 | $270,645 | $15,511 | $255,134 | $257,733 | $134,610 |
| C Mature | 30 | $10,002 | $1,466 | $8,536 | $3,296,938 | $9,779 |
| C Mature | 180 | $96,125 | $8,070 | $88,055 | $3,375,711 | $94,938 |
| C Mature | 730 | $400,264 | $31,983 | $368,281 | $3,657,651 | $395,572 |
| D Grandfathered | 30 | $7,561 | $1,397 | $6,164 | $269,104 | $7,322 |
| D Grandfathered | 180 | $85,880 | $7,314 | $78,566 | $343,853 | $84,679 |
| D Grandfathered | 730 | $375,228 | $28,752 | $346,476 | $612,294 | $370,520 |

**Balanced 730-day revenue ranges (three seeds):** A $31,795–$32,726, B $158,144–$422,090, C $325,695–$452,152, D $308,534–$420,272. C group result range $293,939–$420,226; D $279,682–$391,721. These are not simulated forecasts of the real owner company.

### Different policy consequences after 730 days

| Fixture | Conservative group result | Balanced group result | Growth-oriented group result |
| --- | ---: | ---: | ---: |
| Founder | $14,273 | $29,624 | $35,313 |
| Developing | $159,682 | $255,134 | $222,000 |
| Mature | $305,304 | $368,281 | $359,425 |
| Grandfathered | $285,398 | $346,476 | $333,302 |

Growth is not always the most profitable strategy: pricing, terms, sales win probability, delivery scope and reassignment compete. The passive/unmanaged founder control previously exhausted cash and accrued unpaid wages by Day 730; that adverse condition is NOT the balanced active-CEO scenario.

## Finance reconciliation and limits

- **Signed vs invoiced vs collected:** biBook tracks signed deals including subsequently missed or unfinished work; earned revenue occurs only after successful delivery through economyInvoice; cash collection occurs on actual payment through economyCollect. An outstanding invoice is not collected cash. The JSON includes bookings, open signed work, invoices, receivables, collections, backlog and delivery counts.
- **One cash ledger:** openingCash + cumulative cashIn − cumulative cashOut = game cash within engine rounding tolerance ($0.065). Capital buys cost cash, without simultaneously creating a recurring expense. The harness checks ledger on each checkpoint and on save/reload.
- **Payroll and labor:** group payroll is charged once daily. GM payrollCost and recorded completed-project direct delivery labor are **allocations of this same payroll**, NOT extra expenses. During replay the harness accumulates the REAL project records daily to avoid the game's 120-record truncation. The existing cumulative BI laborAllocated counter stays unpopulated even when project labor is nonzero; reading it directly would falsely imply zero delivery labor. This is a future analytics defect, not a license to add fictional expenses.
- **GM vs group bridge:** sum unit revenue − unit payroll/shared labor/direct/development costs is NOT net group profit. The difference from group result includes all **non-unit revenue and corporate net overhead**. C seed 20261018 at +730: unit contribution $447,468.50; group result $420,225.60; bridge **−$27,242.90**. B seed 20261018: unit contribution $217,070.31, group result $406,655.13 because material non-unit customer delivery also earns revenue.
- **Property accounting:** real propertyDay posts leased rents/owned upkeep and quarterly noncash depreciation. Property acquisition is capital spending; lease setup fee is a cash operating setup cost. Synthetic old property prices, location, tenure, depreciation book and arrears persist.
- **Debt and working capital:** open receivables and actual model liabilities (unpaid payroll, premises arrears, principal and accrued interest) are recorded and netted into a working-capital proxy. The sampled balanced cases have zero loan balance and unpaid payroll; this does not prove arbitrary credit stress scenarios. Supplier trade payables, income tax, comprehensive full IFRS debt recognition and historical profit before fixture opening **cannot** be derived from the present ledger.
- **Utilization:** production BI uses delivery workdays divided by delivery-eligible days, not a commercial industry benchmark. At +730, mean active-CEO founder utilization ~26.3%, developing ~13.3%, mature ~4.3%, historical ~4.8%. Delegated mature companies generate revenue with very low per-employee work utilization. Do not equate this to full-time manufacturing capacity.
- **Reputation:** prospective v23 multiplier tapers above reputation 600 and leaves locked old deals untouched. The advanced scenarios still produced ~92% group margins at +730. Do not infer causality from one model component alone.

## Asset and executive affordability

- Founder +30 days mean payroll/property cash runway **33.9 days**; at +730 its $29,259 cash would exceed the HQ cash requirement but the 20-corporate-staff, director, two-GM and 50-delivery eligibility gates are not fulfilled. Money alone cannot unlock a property.
- Developing opening has prior earned workforce/milestone fixtures. The base office lease is $220 up-front + $3/day; building acquisition is base $1,800 plus 30 days of salary and upkeep reserve. Building eligibility can occur near fixture opening. HQ stays blocked by absent director, corporate headcount and staffed GMs despite ample cash.
- Mature and grandfathered fixture already **own** an HQ at opening; a false HQ acquisition readiness is a correct duplicate-ownership safeguard, NOT a liquidity failure. At its original $7,200 up-front price, HQ costs **~0.22% of mature opening cash ($3.3m)**. C+730 mean cash $3,657,651, modeled payroll+property runway **86,469 game days**; D+730 $612,294 and 16,198 game days. Property investment exerts negligible late-game financing pressure.
- HR/CFO/COO are actually appointed in C/D only where gated eligibility is met; all mandates remain **off**. Full reserves and appointments are tested. The CEO never approves new budgets, recruits unapproved people or grants automatic authority. Existing site terms, appointments and budget limits survive save/load.

## Ranked candidates for a separate v22.3B decision

1. **P0, high impact / medium-high risk — deal-to-cost disconnect.** Current mature balanced 730-day mean $400,264 revenue and $31,983 modeled group costs: ~92% profitability; founder and developing also unusually profitable under active management. **Propose** prospective calibration of real scope-based staffing pressure and legitimate procurement/service costs for NEW work only, with differentiated demand/quality and signed-price protection. **Expected:** minor 30-day impact, more realistic 180-day operating burden, less extreme 730-day accumulation. **Locations:** createDeal, estimatedFee, tick, biProjectEnd, dailySalary. **Risk/tests:** stored wages, already signed deals, project cost once, all four fixtures and three horizons, no silent new charges.
2. **P1, high impact / low risk — misleading unit-versus-group profitability.** C single-seed unit contribution $447,469 vs consolidated $420,226. **Propose** explicit bridged unit vs corporate revenue/overhead report; no change to books or cash at any horizon. **Locations:** ceoLineFinish, unitPayrollDay, renderBusinessUnits, group BI. **Tests:** accounting identity and no duplicated cash/expense, mobile widths/focus.
3. **P1, medium impact / low-medium risk — analytic labor counter gap.** Genuine project delivery labor C balanced +730 about $1,259 (mean) while cumulative laborAllocated is zero. **Propose** future-only biProjectEnd attribution, never a second group expense; historical reporting may remain unavailable. **Expected:** corrected future 30/180/730 dashboards, zero cash/profit effect. **Locations:** BI_FIELDS, biProjectEnd, ensureBI. **Tests:** replay and old-save BI migrations, history truncation, one payroll.
4. **P2, high strategic impact / medium risk — mature property too cheap.** $7,200 HQ against $3.3m opening cash; upkeep $3/day. **Propose** prospective site investment and recurring obligations tied to future capacity/landlord value, tested against actual incremental benefit and financial reserves; keep all owned/leased history unchanged. **Expected:** 180/730-day meaningful but discretionary capital decisions, no Day-0 confiscation. **Locations:** PROPERTY_TYPES, propertyQuote, propertyReadiness, propertyDay. **Tests:** readiness, leases, property book/depreciation/arrears, exact save preservation.
5. **P2, medium impact / higher cross-version risk — manual vs delegated work capacity.** Founder economics depend on CEO reviews, while GMs can deliver autonomously; test missed-work root causes separately from fee calibration. Future manager strategy UI stays in v22.5. **Expected:** observable 30/180/730 management trade-offs, no unauthorized hiring. **Locations:** pipelineDay, delegateWork, unitDelegateWork. **Tests:** true budget/policy gates, employee uniqueness, signed contracts and UI editing persistence.

**Defensible *exploratory*, not imposed, design bands:** retain existing 21–30-day payroll/premises cash reserve gates, stress-test founder 30–90 days runway, flag mature group margins persistently greater than 80–90% and payroll-plus-property runway thousands of days as symptoms of inadequate spending decisions. Test a provisional **15–40% mature operating margin** as a *game design hypothesis* after including credible direct delivery/staff/asset costs, rather than unilaterally enforcing it. Ranges are informed by huge measured ~92% margins and the stated goal of meaningful strategic choices; they are **not** external industry benchmarks or shipped parameters.

## QA evidence / outstanding

[Mandatory Actions #39125794859](https://github.com/BSAVCI1/Boss/actions/runs/39125794859) passed the 108-snapshot actual-engine runner, cash and saved-fee invariants, 1×/3×/8× tick parity, all mandatory v15–v22.3 regression suites, the real 390px and 414px Chromium UI (including input focus and unfinished budget drafts), saved business units/authority/property, and extended browser storage/IndexedDB. [Subsequent tip-of-branch pass #39125880253](https://github.com/BSAVCI1/Boss/actions/runs/39125880253) also succeeded with a redundant noncanonical test removed. Exact artifact and full seed results are available in the run. **Not checked:** private owner Safari save or live production deployment; statistical precision beyond n=3, external price benchmarks or unused property investments. Leave v22.3B, merge/deployment and owner verification for Chief approval.


## Subsequent prospective v22.3B comparison (separate draft work)

The figures above remain **unaltered archived v22.3A measurements**, not results of a calibrated release. The original 108-snapshot runner now pins the earlier no-third-party-procurement baseline when invoked from the newer v22.3B branch. Current live prospective design and test-methodology evidence are in [v22.3B calibration](V22_3B_PROSPECTIVE_ECONOMIC_CALIBRATION.md); check the final-head Actions artifact before using any post-calibration numbers. Production remains v22.2.
